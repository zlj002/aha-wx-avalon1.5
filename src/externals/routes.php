<?php

$routes = [
    'debug'=>'debug.php'
];

// 获取环境参数
function getEnvironmentParam()
{
	static $config = ['path' => '', 'file' => '', 'args' => []];
	if ($config['file']) {
		return $config;
	}
	global $routes;
	$uri = rtrim(explode('?', $_SERVER['REQUEST_URI'])[0], '/');
	$home_page = 'home';
	$uri = ($uri ?: $home_page) . '/';
	$matches = [];
	foreach ($routes as $key => $value) {
		if (stripos($uri, $key . '/') !== FALSE) {
			$matches[$key] = strlen($key);
		}
	}
	if ($matches) {
		arsort($matches);
		$key = key($matches);
		$config['path'] = $key;
		$config['file'] = $routes[$key];
		$str = substr(trim($uri, '/'), strlen($key));
		$arr = $str ? explode('/', ltrim($str, '/')) : [];
		for ($i=0, $l = count($arr) - 1; $i <= $l; $i = $i + 2) {
			$config['args'][$arr[$i]] = $i < $l ? $arr[$i+1] : '';
		}
	}
	else {
		$config['file'] = 'home.php';
		//找		不到路由显示首页
	}
	return $config;
}

// 获取环境变量
function init_env($name)
{
	static $env;
	if (!$env) {
		$dir = dirname(__FILE__);
		if (file_exists($path = $dir . '/../.env') || file_exists($path = $dir . '/.env')) {
			$content = file_get_contents($path);
		}
		else {
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

$param = getEnvironmentParam();
if (!file_exists($file = __dir__ . '/' . $param['file'])) {
	exit($file . ' is not exists!');
}
foreach ($param['args'] as $key => $value) {
	$_GET[$key] = $value;
}
include $file;
