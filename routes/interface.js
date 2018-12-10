const request = require('superagent');
const publicPath = require('./config/base')['publicPath'];

/**
 * urlReq AJAX请求
 * @param {methods}  请求方法
 * @param {url} 请求路径
 * @param {param}  参数
 * @param {resultType} 1 返回的是状态结果 
 */
function urlReq(methods,url,param,req,done) {
    var paramd = param ? param : {};
    paramd['t'] = new Date().getTime();

    var named = req.session.UserId ? req.session.UserId : 'Berry.Guest';
    var repwd = req.session.UserAccount ? req.session.UserAccount :'Berry.Guest';
    var requestd = '';
    if (methods == 'post') {
        requestd = request.post(publicPath+url)
    } else {
        requestd = request.get(publicPath+url)
    }

    requestd
        .set({
            "Authorization": req.session['token'],
            "Expect": named+','+repwd
        })
        .timeout({
            response: 40000,
            deadline: 60000,
        })
        .send(paramd)
        .then(function(res) {
            if (res['body'].Status != 2000) {
                console.log(res['body'],url,paramd);
                done(err,res['body']);
                return;
            }else{
                done(null,res['body']['Data']);
            }
        })
        .catch(function (err) {
            console.log(err.message,url,paramd);
            if (err.message == 'Unauthorized') {
                done(err.message,'');
                return;
            }
            if (!req.session['token']) {
                getToken(req,function () {
                    urlReq(methods,url,param,req,done);
                })
            } else {
                done(null,null);
            }
        })
}

//获取全局的token
function getToken(req,done) {
    var userId = req.session.UserId ? req.session.UserId:'Berry.Guest';
    var userAccount = req.session.UserAccount ? req.session.UserAccount:'Berry.Guest';
    request
        .post(publicPath + "/api/JWT/CreateToken")
        .timeout({
            response: 8000,
            deadline: 60000,
        })
        .send({
            "KeyValue": KeyValue,
            "UserId": userId,
            "UserAccount": userAccount,
            "t": new Date().getTime()
        })
        .then(function (res) {
            if (JSON.parse(res['body'])['Status'] !== 2000) {
                console.log(res['body']);
                return;
            }else{
                req.session['token'] = JSON.parse(res['body'])['Data'];
                done();
            }
        })
        .catch(function (err) {
            getToken(req, done);
        })
}


module.exports = {
    getToken:getToken,
    urlReq:urlReq,
    test:function(req,param,done){
        // urlReq('post', '/api/Dish/GetDisSearch', param, req, done)
    }
}