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
    var requestd = '';
    if (methods == 'post') {
        requestd = request.post(publicPath+url)
    } else {
        requestd = request.get(publicPath+url)
    }

    if(!req.session.token){
        done('Unauthorized',null)
    }else{
        requestd
        .timeout({
            response: 40000,
            deadline: 60000,
        })
        .send(paramd)
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                console.log(res['body'],url,paramd);
                done(err,res['body']);
                return;
            }else{
                done(null,res['body']);
            }
        })
        .catch(function (err) {
            console.log(err.message,url,paramd);
            if (err.message == 'Unauthorized') {
                done(err.message,'');
                return;
            }
            done(null,null)
        })
    }
}

//获取batch 
function getBatch(req,done){
    request
    .get(publicPath+'/v1/api/course/batch?token='+req.session.token)
    .timeout({
        response: 8000,
        deadline: 60000,
    })
    .then(function(res){
        if (res['body']['code'] == 200 && res['body']['success'] == 1) {
            done(null,res['body']);
        }else{
            done('error',res['body']);
        }
    })
    .catch(function(err){
        console.log('错误'+err)
    })
}

module.exports = {
    urlReq:urlReq,
    getBatch:getBatch,
    getMajorCourse:function(req,done) { //获取学校
        request
        .get(publicPath+'/v1/api/user/regist_info?userType='+req.body.userType*1+'&majorId='+req.body.majorId*1)
        .timeout({
            response: 8000,
            deadline: 60000,
        })
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                done(null,res['body']);
            }else{
                done('error',res['body']);
            }
        })
        .catch(function (err) {
            console.log('错误'+err)
        }) 
    },
    subReg:function(req,params,done){
        request
        .post(publicPath+'/v1/api/user/regist')
        .timeout({
            response: 8000,
            deadline: 60000,
        })
        .send(params)
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                done(null,res['body']);
            }else{
                done('error',res['body']);
            }
        })
        .catch(function (err) {
            console.log('错误'+err)
        }) 
    },
    subLogin:function(req,params,done){
        request
        .get(publicPath+'/v1/api/user/login')
        .timeout({
            response: 8000,
            deadline: 60000,
        })
        .send(params)
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                req.session['token'] = res['body']['obj']['token'];
                done(null,res['body']);
            }else{
                done('error',res['body']);
            }
        })
        .catch(function (err) {
            console.log('错误'+err)
        }) 
    },
    /**
     * methods,url,param,req,done 
     * */
    getStubeforeClass:function(req,params,done){
        urlReq('GET','/v1/api/course/list',params,req,done)
    }
}