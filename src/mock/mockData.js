var Env = require('env');
var Mock = require('mockjs');
var MockData = {
    mock: function() {
        Mock.mock(new RegExp('^.*/v1/surveys/ranking/minduser'), {
            code: 0,
            message: 'string',
            data: {
                ranking: 46,
                user_id: 100303,
                name: 'bao',
                avatar: null,
                used_time: 120,
                right_count: 3,
                answer_time: '2018-06-30 11:34:26',
                total_time: '140',
                gap: 10
            }
        });
    }
};
var user = {
    visitor_id: 'visitor_id',
    auth_token: 'auth_token',
    openid: 'openid',
    user_id: 1
};
Util.setCookie('visitor_id', user.visitor_id);
Util.setCookie('auth_token', user.auth_token);
Util.setCookie('openid', user.openid);
Util.setCookie('user_id', user.user_id);
Util.log('已mock 的用户' + JSON.stringify(user));
