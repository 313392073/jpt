const request = require('superagent');
const publicPath = require('./config/base')['publicPath'];

/**
 * urlReq AJAX请求
 * @param {methods}  请求方法
 * @param {url} 请求路径
 * @param {param}  参数
 */
//登录之后再能调用此方法
function urlReq(methods,url,param,req,done) {
    var paramd = param ? param : {};
    var requestd = '';
    if (methods.toLowerCase() == 'post') {
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
        .query(paramd)
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                done(null,res['body']);
                return;
            }else{
                done('err',res['body']);
            }
        })
        .catch(function (err) {
            console.log(err.message,url,paramd);
            done(err,null)
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
            done('batcherror',res['body']);
        }
    })
    .catch(function(err){
        console.log('错误'+err)
        done(null,null)
    })
}

module.exports = {
    urlReq:urlReq,
    getBatch:getBatch,
    uploadFile:function(req,params,done){ //上传图片
        request
        .get(publicPath+'/v1/api/comm/uploadfile')
        .query(params)
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
        .catch(function(err) {
            console.log('错误'+err)
            done(null,null)
        })
    },
    getMajorCourse:function(req,params,done) { //获取学校
        request
        .get(publicPath+'/v1/api/user/regist_info')
        .query(params)
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
            done(null,null)
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
        .query(params)
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                done(null,res['body']);
            }else{
                done('error',res['body']);
            }
        })
        .catch(function (err) {
            done(null,null)
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
        .query(params)
        .then(function(res) {
            if (res['body']['code'] == 200 && res['body']['success'] == 1) {
                req.session['token'] = res['body']['obj']['token'];
                done(null,res['body']);
            }else{
                done('error',res['body']);
            }
        })
        .catch(function (err) {
            done(null,null)
            console.log('错误'+err)
        }) 
    },
    loginOut:function(req,done){ //退出
        let params = {
            token:req.session.token
        }
        request
        .post(publicPath+'/v1/api/user/logout')
        .query(params)
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
            done(null,null)
            console.log('错误'+err)
        }) 
    },
    testReg:function(req,done){
        var params = {'userLoginname':'test01','userPassword':'Qj123456','headImage':'https://www.55128.cn/static/images/czicon/fcsd.png','userType':0,'classId':1,'sex':1,'email':'313392073@qq.com'}
        request
        .post(publicPath+'/v1/api/user/regist')
        .query(params)
        .set('Content-Type', 'application/json')
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
            done(null,null)
            console.log('错误'+err)
        }) 
    },
    /**
     * methods,url,param,req,done 
     * */
    getStubeforeClass:function(req,params,done){ //获取题型
        urlReq('GET','/v1/api/course/list',params,req,done)
    },
    subAnswer:function(req,params,done) { //提交答案
        console.log(params)
        urlReq('POST','/v1/api/course/submit',params,req,done)
    },
    teaVr:function(req,params,done) { //老师端统计页面
        urlReq('GET','/v1/api/tea/vr/score',params,req,done)
    },
    teaScore:function(req,params,done) { //老师端班级个人成绩
        urlReq('GET','/v1/api/tea/class/score',params,req,done)
    },
    teaClassList:function(req,params,done) { //老师端课前习题
        urlReq('GET','/v1/api/tea/course/list',params,req,done)
    },
    teaGroupData:function(req,params,done) { //老师端小组数据
        urlReq('GET','/v1/api/tea/group/score',params,req,done)
    },
    teaVideoComment:function(req,params,done) { //老师端视频点评
        urlReq('GET','/v1/api/tea/video/comment',params,req,done)
    },
    teaGiveProblem:function(req,params,done) { //老师出题
        urlReq('POST','/v1/api/courseitem/submit',params,req,done)
    },
    teaGroupRepart:function(req,params,done) { //老师获取分配小组
        urlReq('POST','/v1/api/tea/group/repart',params,req,done)
    },
    teaSubmitGroup:function(req,params,done) { //老师分配小组提交
        urlReq('POST','/v1/api/tea/group/repartDiscuss/confirm',params,req,done)
    },
    teaAfterReport:function(req,params,done) { //老师课后报告
        urlReq('GET','/v1/api/tea/afterclass/report',params,req,done)
    },
    stuSum:function(req,params,done) { //学生总结
        urlReq('GET','/v1/api/stu/sum',params,req,done)
    },
    stuVr:function(req,params,done) { //学生VR
        urlReq('GET','/v1/api/stu/vr',params,req,done)
    },
    stuVrList:function(req,params,done) { //学生讨论
        urlReq('GET','/v1/api/stu/vr/list',params,req,done)
    },
    stuSubmitComment:function(req,params,done) { //提交讨论
        urlReq('POST','/v1/api/stu/vrrecord/submit',params,req,done)
    },
    getUploadList:function(req,params,done) {
        urlReq('GET','/v1/api/comm/uploadlist',params,req,done)
    }
}