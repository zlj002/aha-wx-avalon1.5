<?php

function global_header()
{
    header("Content-Type: text/html;charset=utf-8");
    define('EXPIRE', 60 * 24 * 3600);
    //不检查错误，并且api接口返回null
    define('NOCHECKERROR', 2);
    //不检查错误，并且api接口真实数据
    define('NOCHECKERRORRAWDATA', 3);
    // 设置当前域名的顶级域名为全局cookie
    define('MAINDOMAIN', explode('.', $_SERVER['HTTP_HOST'], 2)[1]);
    // 全局cookie版本
    define('VERSION', '1.5');
    //page cache check
    if (defined('PAGECACHE_DISABLE')) {
        header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
    }
}

function global_cookie()
{
    if (defined('MAINDOMAIN')) {
        $gssid = cookie('gssid') ?: md5(uniqid() . microtime(true) . uniqid());
        setcookie('gssid', $gssid, NULL, '/', MAINDOMAIN);
        $guniqid = cookie('guniqid') ?: md5(uniqid() . microtime(true) . uniqid());
        setcookie('guniqid', $guniqid, time() + 86400 * 730, '/', MAINDOMAIN);
    }
}

function check_version()
{
    if (is_wx_browser() && cookie('version') != env('WECHAT_VERSION')) {
        cookie('version', env('WECHAT_VERSION'), time() + EXPIRE);
        clear_cookie();
    }
}

function user_agent()
{
    return isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
}

function is_wx_browser()
{
    return strpos(user_agent(), 'MicroMessenger') ? true : false;
}

function get_appid()
{
    return env('WECHAT_APPID');
}

function clear_cookie()
{
    cookie('user_id', '', -1);
    cookie('visitor_id', '', -1);
    cookie('auth_token', '', -1);
    cookie('openid', '', -1);
    cookie('g_user_id', '', -1);
    cookie('g_visitor_id', '', -1);
    cookie('g_auth_token', '', -1);
    cookie('user_id', '', -1, '/', MAINDOMAIN);
    cookie('visitor_id', '', -1, '/', MAINDOMAIN);
    cookie('auth_token', '', -1, '/', MAINDOMAIN);
    cookie('g_user_id', '', -1, '/', MAINDOMAIN);
    cookie('g_visitor_id', '', -1, '/', MAINDOMAIN);
    cookie('g_auth_token', '', -1, '/', MAINDOMAIN);
}

function repaire_weixin()
{
    // 修复缓存中有用户信息，服和端没有的情况
    if (cookie('openid') && cookie('user_id') && !cookie('wx_bind')) {
        cookie('wx_bind', 'ok', time() + EXPIRE);
        invoke_api('web/repaire/weixin', [
            'openid' => cookie('openid'),
            'user_id' => cookie('user_id'),
        ], 'POST');
    }
}

function sync_cookie()
{
    if (cookie('g_user_id') && cookie('g_visitor_id') && cookie('g_auth_token')) {
        cookie('user_id', cookie('g_user_id'), time() + EXPIRE);
        cookie('visitor_id', cookie('g_visitor_id'), time() + EXPIRE);
        cookie('auth_token', cookie('g_auth_token'), time() + EXPIRE);
    }
}

function get_visitor_auth()
{
    if (cookie('visitor_id')) {
        $visitor_auth = cookie('visitor_id') . ':' . cookie('auth_token');
    } else {
        $visitor_auth = 'visitor:28ad87ef9fdce5d12dea093b860e8772';
    }
    return $visitor_auth;
}

function bind_user_openid($bind_param, $user_id)
{
    $param = base64_decode($bind_param);
    $data = json_decode($param, true);
    $info = [
        'user_id' => $user_id,
        'openid' => $data['openid'],
    ];
    Weixin::put_visitor_wx($info);
    return $data['openid'];
}

function get_user_token($mode, $auth_info)
{
    switch ($mode) {
        case 'DISPLAY_AUTHORIZATION':// 显示授权流程
            if ($auth_info['scope'] == 'snsapi_userinfo') {
                $user_info = Weixin::get_weixin_userinfo($auth_info);
                if ($user_info && isset($user_info['unionid']) && isset($user_info['openid'])) {
                    $ret = Weixin::newwxlogin($user_info, user_agent());
                }
            }
            break;
        default:// 静默授权或强制授权流程
            // 查看用户是否已绑定
            $ret = Weixin::put_visitor_wx($auth_info);
            $data = isset($ret['data']) ? $ret['data'] : [];
            // 强制授权
            if (is_wx_browser() && $data['user_id'] && $auth_info['scope'] == 'snsapi_userinfo') {
                $user_info = Weixin::get_weixin_userinfo($auth_info);
                Weixin::put_user_info($user_info, $data);
            }
    }
    return isset($ret['data']) ? $ret['data'] : [];
}

function init_user_data()
{
    $visitor_auth = base64_decode(VISTOR_AUTH);
    if (substr($visitor_auth, 0, 6) != 'weixin' && substr($visitor_auth, 0, 7) != 'visitor') {
        $ret = invoke_api('v1/visitor/info', ['openid' => cookie('openid')]);
        // 如果有错误，清除cookies
        if ($ret['code'] || !$ret['data']) {
            clear_cookie();
            header('location:/error.php?url=' . urlencode($_SERVER['REQUEST_URI']) . '&desc=账户已过期重新授权');
            exit();
        } else {
            $user = $ret['data'];
            Weixin::user($user);
        }
    }

    if ($openid = cookie('openid')) {
        cookie('openid', $openid, time() + EXPIRE);
    }

    // 处理域名下全局cookie
    if (defined('MAINDOMAIN')) {
        $guserid = g(Weixin::user(), 'user_id', 0);
        setcookie('guserid', $guserid, time() + 86400 * 730, '/', MAINDOMAIN);
    }

    if (isset($_GET['pd']) || isset($_GET['pk']) || isset($_GET['ps'])) {
        $ps = 'up' . md5('hjm?' . md5(json_encode([
                        'pd' => g($_GET, 'pd', ''),
                        'pk' => g($_GET, 'pk', ''),
                    ]) . 'Aha^_^'));
        if ($ps != g($_GET, 'ps', '')) {
            $_GET['pd'] = '';
            $_GET['pk'] = '';
        }
    }

    // 如果pp人为传错，将pp重置为空
    if (isset($_GET['pp']) && $pp = $_GET['pp']) {
        list($text, $hash) = explode('$', base64_decode($pp) . '$');
        $str = 'pp' . md5('hjm?' . md5(json_encode([
                        'pp' => $text,
                    ]) . 'Aha^_^'));
        if ($str != $hash) {
            $_GET['pp'] = '';
        }
    }

    // channel处理
    $share_vars = array_intersect_key($_GET, array_flip(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_key', 'pp', 'pd', 'pk']));
    if ($share_vars) {
        cookie('share_vars', base64_encode(json_encode($share_vars)));
    }
}


// 授权时处理
class Weixin
{
    public static function signature()
    {
        $res = api('v1/supports/signature', [
            'url' => (env('HTTPS') == 'ON' ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],
            'appid' => env('WECHAT_APPID'),
        ]);
        return $res['data'];
    }

    public static function get_weixin_authinfo($code)
    {
        $gateway = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
        $request_data = array(
            'appid' => env('WECHAT_APPID'),
            'secret' => env('WECHAT_SECRET'),
            'code' => $code,
            'grant_type' => 'authorization_code'
        );
        $api_url = $gateway . http_build_query($request_data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $result = curl_exec($ch);
        $data = json_decode($result, true) ?: [];
        if (!isset($data['openid']) || isset($data['errcode'])) {
            write_log([
                'log_type' => 'authorize',
                'curl_errno' => curl_errno($ch),
                'curl_error' => curl_error($ch),
                'http_code' => curl_getinfo($ch, CURLINFO_HTTP_CODE),
                'api_url' => $api_url,
                'data' => $data,
            ], 'error');
        }
        curl_close($ch);
        return $data;
    }

    public static function get_weixin_userinfo($data)
    {
        if ($data['scope'] != 'snsapi_userinfo') {
            return $data;
        }
        $gateway = 'https://api.weixin.qq.com/sns/userinfo?';
        $request_data = array(
            'access_token' => $data['access_token'],
            'openid' => $data['openid'],
            'lang' => 'zh_CN',
        );
        $url = $gateway . http_build_query($request_data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $result = curl_exec($ch);
        return array_merge(json_decode($result, true) ?: [], $data);
    }

    public static function get_notify_url($param)
    {
        $path = isset($_SERVER['WWW_ROOT']) ? $_SERVER['WWW_ROOT'] : $_SERVER['DOCUMENT_ROOT'];
        return (env('HTTPS') == 'ON' ? 'https://' : 'http://') . env('WECHAT_REDIRECT') . '/' . substr(__FILE__, strlen($path) + 1) . '?' . http_build_query($param);
    }

    public static function get_skipurl($url, $state = '')
    {
        $gateway = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
        if (defined('SCOPE_TYPE') && in_array(SCOPE_TYPE, ['FORCED_AUTHORIZATION', 'DISPLAY_AUTHORIZATION'])) {
            $scope_type = 'snsapi_userinfo';
        } else {
            $scope_type = 'snsapi_base';
        }
        $data = array(
            'appid'         => env('WECHAT_APPID'),
            'redirect_uri'  => $url,
            'response_type' => 'code',
            'scope'         => $scope_type,
            'state'         => $state
        );
        return $gateway . http_build_query($data) . '#wechat_redirect';
    }

    public static function user($value = null)
    {
        static $user = null;
        if (!$user && $value) {
            $user = $value;
        }
        return $user;
    }

    public static function newwxlogin($user_info, $user_agent)
    {
        $login_info = [
            'appid' => env('WECHAT_APPID'),
            'openid' => $user_info['openid'],
            'unionid' => $user_info['unionid'],
            'headimgurl' => $user_info['headimgurl'],
            'nickname' => $user_info['nickname'],
            'sex' => $user_info['sex'],
            'hash' => md5('Hjm?' . md5($user_info['openid'] . 'Aha^_^')),
            'client_type' => 3,
            'channel' => env('WECHAT_CHANNEL') ?: 'weixin',
            'session_id' => cookie('guniqid'),
            'session_name' => $user_agent,
        ];
        return invoke_api('mobile/v1/visitor/newwxlogin', $login_info, 'POST', $login_info);
    }

    public static function put_visitor_wx($auth_info)
    {
        $user_id = isset($auth_info['user_id']) ? $auth_info['user_id'] : 0;
        $auth_info['channel'] = $auth_info['channel'] ?: env('WECHAT_CHANNEL');
        $auth_info['app_type'] = $auth_info['app_type'] ?: env('WECHAT_APP_TYPE');
        $info = [
            'appid' => env('WECHAT_APPID'),
            'channel' => $auth_info['channel'],
            'openid' => $auth_info['openid'],
            'hash' => md5('Hjm?' . md5($auth_info['openid'] . 'Aha^_^')),
            'session_id' => cookie('guniqid'),
            'session_name' => $_SERVER['HTTP_USER_AGENT'],
            'client_type' => 3,
            'user_id' => $user_id,
            'app_type' => $auth_info['app_type'],
        ];
        return invoke_api('v1/visitor/wx', $info, 'PUT', $info);
    }

    public static function put_user_info($user_info, $data)
    {
        if ($user_info && isset($user_info['openid']) && $data['user_id']) {
            $visitor_auth = $data['visitor_id'] . ':' . $data['auth_token'];
            define('VISTOR_AUTH', base64_encode($visitor_auth));
            // 更新用户信息
            $user_info = [
                'name' => $user_info['nickname'],
                'avatar' => $user_info['headimgurl'],
            ];
            return invoke_api('v1/users/'.$data['user_id'], $user_info, 'PUT', $user_info);
        }
    }
}

class Helper
{
    public static function encrypt($str)
    {
        if (!function_exists('mcrypt_encrypt')) {
            return '';
        }
        $key = "a4891f1f41ca33e8e40a2757770fd627";
        $str = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $str, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND));
        $str = base64_encode($str);
        return $str;
    }

    public static function decrypt($str)
    {
        if (!function_exists('mcrypt_encrypt')) {
            return [];
        }
        $key = "a4891f1f41ca33e8e40a2757770fd627";
        $str = base64_decode($str);
        $str = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $str, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND));
        return $str;
    }

    public static function encryptParam($obj)
    {
        $key = '!@#456&';
        $str = json_encode($obj) . $key;
        $str = static::encrypt($str);
        return $str;
    }

    public static function decryptParam($str)
    {
        if (!$str) {
            return null;
        }
        $key = '!@#456&';
        $str = static::decrypt($str);
        $obj = json_decode(strchr($str, $key, true), true);
        return $obj;
    }
}

function invoke_api($uri, $data = array(), $method = 'GET', $json = [])
{
    if ($data) {
        $uri .= (stripos($uri, '?') ? '&' : '?') . http_build_query($data);
    }
    if (substr($uri, 0, 4) != 'http') {
        $api_url = env('OPENAPI') . $uri;
    } else {
        $api_url = $uri;
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    $header = ['Accept: application/json'];
    if ($method == 'PUT' || $method == 'POST') {
        $content = json_encode($json);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        $header[] = 'Content-Type: application/json';
        $header[] = 'Content-Length:' . strlen($content);
    }
    $header[] = 'X-Token:' . env('X-Token');
    if (defined('VISTOR_AUTH')) {
        $header[] = 'Authorization: Basic ' . VISTOR_AUTH;
    } else {
        $header[] = 'Authorization: Basic ' . base64_encode('visitor:28ad87ef9fdce5d12dea093b860e8772');
    }
    $header[] = 'X-Env:' . e()['x_env'];
    $header[] = 'X-Request-Page:' . $_SERVER['REQUEST_URI'];
    $header[] = 'X-Forwarded-For:' . (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);
    $header[] = 'X-Requested-With:PHP';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
    $result = curl_exec($ch);
    $errno = curl_errno($ch);
    $errmsg = curl_error($ch);
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($errno > 0) {
        $data = ['code' => $errno, 'message' => $errmsg];
    } else if ($http_status != 200) {
        $data = ['code' => $http_status, 'message' => $result];
    } else if (stripos($result, '{') !== 0) {
        $data = ['code' => -1, 'message' => $result];
    } else {
        $data = json_decode($result, true);
    }
    if ($data['code'] != 0) {
        $logdata = ['method' => $method, 'header' => $header, 'request' => $json, 'response' => $data];
        write_log([
            'log_type' => 'restapi',
            'curl_errno' => $errno,
            'curl_error' => $errmsg,
            'http_status' => $http_status,
            'api_url' => $api_url,
            'data' => $logdata,
        ], $data['code'] < 1000 ? 'error' : 'exception');
    }
    return $data;
}
// 写日志方法
function write_log($message, $type = 'info')
{
    $data = array_merge([
        'time'    => date('Y-m-d H:i:s'),
        'type'    => $type,
        'uniqid'  => cookie('gr_user_id'),
        'ssid'    => cookie('gr_session_id_bb75da58b3ad3389'),
        'openid'  => cookie('openid'),
        'user_id' => g(Weixin::user(), 'user_id', 0)
    ], $message);
    $str = json_encode($data, JSON_UNESCAPED_UNICODE);
    file_put_contents("/data/log/wx/wx_{$type}.log", $str . PHP_EOL, FILE_APPEND);
}
// 调用api获取数据
function call($request, $check_err = 1)
{
    $url  = isset($request['url']) ? $request['url'] : '';
    $data = isset($request['data']) ? $request['data'] : [];
    $data = invoke_api($url, $data);
    if ($check_err) {
        check_err_and_redirect($data);
    }
    return $data;
}
// 获取输入参数
function f($name, $default = null)
{
    $value = isset($_GET[$name]) ? $_GET[$name] : $default;
    if ($value === null || $value === '') {
        return ($default === null) ? $value : $default;
    } else {
        $type = gettype($default);
        if ($type == 'integer') {
            return intval($value);
        } else if ($type == 'array') {
            return (array) $value;
        } else if ($type == 'double') {
            return (double) $value;
        } else {
            return $value;
        }
    }
    return $default;
}
function cookie($name, $value = null, $expire = 0, $domain = '')
{
    if (func_num_args() > 1) {
        setcookie($name, $_COOKIE[$name] = $value, $expire, '/', $domain);
    }
    return isset($_COOKIE[$name]) ? $_COOKIE[$name] : '';
}
function g($data, $key, $default = null)
{
    return (is_array($data) && isset($data[$key])) ? $data[$key] : $default;
}
function e()
{
    $user       = Weixin::user();
    $share_vars = base64_decode(cookie('share_vars'));
    $share_vars = json_decode($share_vars, true) ?: [];
    $pk = base64_decode(g($share_vars, 'pk', ''));
    $pd = g($share_vars, 'pd', '');
    // 解析不正确置空
    if ($pk && $pk{0} != '/') {
        $pk = '';
    }
    $user_id = g($user, 'user_id', 0);
    $last_user_id = intval(ltrim(substr($pk, strripos($pk, '/')), '/'));
    // 重复问题，如果最后一个是自己，则不用追加
    // 匿名问题，保持不变，暂不置空
    if ($user_id && $user_id != $last_user_id) {
        $arr = array_filter(explode('/', $pk));
        if (count($arr) >= 50) {
            array_shift($arr);
        }
        $arr[] = $user_id;
        $pk = '/' . implode('/', $arr);
        // $pk .= '/' . $user_id;
    }
    // 老板本utm_source处理
    $utm_source = g($share_vars, 'utm_source');
    $utm_medium = g($share_vars, 'utm_medium');
    if (!$utm_medium && stripos($utm_source, '_')) {
        $medium_arr = ['wxtimeline', 'wxappmessage', 'wxqq', 'wxqqzone', 'miniwxappmessage', 'poster'];
        foreach ($medium_arr as $key) {
            if (stripos($utm_source, $key) !== FALSE) {
                $share_vars['utm_medium'] = $key;
                break;
            }
        }
    }
    if (stripos($utm_source, '_')) {
        $arr = explode('_', $utm_source, 2);
        $share_vars['utm_source'] = $arr[0];
    } else if (stripos($utm_source, 'wx') === 0) {
        $share_vars['utm_source'] = '';
    }
    $merge_vars = [
        'utm_source'   => g($share_vars, 'utm_source', ''),
        'utm_medium'   => g($share_vars, 'utm_medium', ''),
        'utm_campaign' => g($share_vars, 'utm_campaign', ''),
        'utm_content' => g($share_vars, 'utm_content', ''),
        'utm_key' => g($share_vars, 'utm_key', ''),
        'pp' => g($share_vars, 'pp', ''),
        'pd' => $pd,
        'pk' => base64_encode($pk),
    ];
    $is_main = 0;
    if (strpos(env('AHASCHOOL_DOMAIN'), $_SERVER['SERVER_NAME']) !== false) {
        $is_main = 1;
    }
    $e = [
            'api_domain' => env('API_DOMAIN'),
            'www_domain' => env('WWW_DOMAIN'),
            'share_domain' => env('SHARE_DOMAIN'),
            'appid' => env('WECHAT_APPID'),
            'app_env' => env('APP_ENV'),
            'x_env' => base64_encode(json_encode([
                    'siteid'  => env('X-Siteid', 1),
                    'guniqid' => cookie('guniqid') ?: '',
                    'app_type' => $is_main == 1 ? 1 : 4,
                ] + $merge_vars)),
            'rd' => uniqid() . rand(10000000000, 99999999999),
        ] + $merge_vars;
    $e['ps'] =  'up' . md5('hjm?' . md5(json_encode(['pd' => $e['rd'], 'pk' => $e['pk'],]) . 'Aha^_^'));
    $e['user'] = [
        'user_id'   => g($user, 'user_id', 0),
        'openid'    => g($user, 'openid', ''),
        'name'      => g($user, 'name', ''),
        'mobile'    => g($user, 'mobile', ''),
        'is_vip'    => g($user, 'is_vip', ''),
        'subscribe' => g($user, 'subscribe', ''),
        'province'  => g($user, 'province', ''),
        'country'   => g($user, 'country', ''),
        'city_name' => g($user, 'city_name', '')
    ];
    $e['basic_auth'] = VISTOR_AUTH;
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $e['is_weixin'] = strpos($user_agent, 'MicroMessenger') ? 1 : 0;
    $e['is_visitor'] = VISTOR_AUTH ? (cookie('visitor_id') ? 0 : 1) : 0;
    $e['is_main'] = $is_main;
    $e['is_dragon'] = 1 - $is_main;
    return $e;
}

// 跳转网页
function skip($url, $msg = [])
{
    $arr1 = array_intersect_key($_GET, array_flip(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_key', 'pp', 'pd', 'pk', 'ps']));
    parse_str(parse_url($url, PHP_URL_QUERY), $arr2);
    $arr = array_merge($arr1, $arr2, $msg);
    $url = strchr($url . '?', '?', TRUE);
    header('location:' . $url . '?' . http_build_query($arr));
    exit();
}
// 错误跳转
function check_err_and_redirect($data)
{
    $is_debug = (env('APP_DEBUG') == 'true') ? 1 : 0;
    if (!$data || !is_array($data) || $data['code']) {
        if ($is_debug) {
            $str = print_r($data, true);
            echo str_replace([' ', "\n"], ['&nbsp;', '<br />'], $str);
            debug_print_backtrace();
        } else {
            header('location:/error.php?' . http_build_query($data));
        }
        exit();
    }
}
// 未登录跳转
function check_login_and_redirect()
{
    if (!cookie('user_id')) {
        header('location:/login?return_url=' . urlencode($_SERVER['REQUEST_URI']));
        exit();
    }
}
// 输出script脚本
function out($data = null)
{
    echo "<script>window.BASE_INFO=" . json_encode(e()) . "</script>";
    echo "<script>window.PAGE_DATA=" . json_encode($_GET) . "</script>";
    if ($data) {
        echo "<script>window.INIT_DATA=" . json_encode($data) . "</script>";
    }
}
// 格式化url参数
function url($url, $data)
{
    foreach ($data as $key => $value) {
        $url = str_replace('{$key}', $value, $url);
    }
    return $url;
}
// 获取环境变量
function env($name)
{
    static $env;
    if (!$env) {
        $dir = dirname(__FILE__);
        if (file_exists($path = $dir . '/../.env') || file_exists($path = $dir . '/.env')) {
            $content = file_get_contents($path);
        } else {
            exit('配置文件不存在');
        }
        $items = array_filter(explode("\n", $content));
        foreach ($items as $key => $value) {
            list($k, $v) = explode('=', $value);
            $items[$key] = ['k' => $k, 'v' => $v];
        }
        $env = array_column($items, 'v', 'k');
    }
    return isset($env[$name]) ? $env[$name] : null;
}
// userAgent
function get_client_info() {
    $data = ['os' => 'web', 'version' => ''];
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    if (stripos($user_agent, $prefix = 'Ahaschool') !== false || stripos($user_agent, $prefix = 'AHAKID') !== false) {
        $prefix = strtolower($prefix);
        $user_agent = strstr(strtolower($user_agent), $prefix);
        $user_agent = strchr($user_agent . ' ', ' ', TRUE);
        $arr = explode('/', $user_agent . '//');
        if ($arr[1] == 'android' || $arr[1] == 'ios') {
            $data['os'] = $arr[1];
            $data['version'] = $arr[2];
        }
    }else{
        $data['version'] = 10;
    }
    return $data;
}
// 返回数据对象
class Retdata extends ArrayObject
{
    public function __get($key)
    {
        return $this['data'][$key];
    }

    public function __set($key, $value)
    {
        $this['data'][$key] = $value;
    }

    public function __isset($key)
    {
        return isset($this['data'][$key]);
    }

    public function __unset($key)
    {
        unset($this['data'][$key]);
    }

    public function __toString()
    {
        return json_encode($this);
    }
}
// 调用api
function api($url, $data = [], $check_err = 1)
{
    $data = invoke_api($url, $data);
    if ($check_err == 1) {
        check_err_and_redirect($data);
    }
    $ret = new Retdata($data ?: []);
    if ($check_err == 3) {
        return $ret;
    }
    return ($check_err == NOCHECKERROR && $ret['code'] > 0) ? null : $ret;
}
