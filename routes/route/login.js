const api = require('../interface');
const async = require('async');
module.exports = function(router) {
    router.get('/reg.html',function(req,res) {
        res.render('reg',{
            title:'注册'
        })
    })

    router.post('/subReg',function(req,res) {
        async.auto({
            res1:function(done){
                let params = {
                    userLoginname:req.body.userLoginname,
                    userPassword:req.body.userPassword,
                    headImage:req.body.headImage,
                    userType:req.body.userType*1,
                    classId:req.body.classId*1,
                    sex:req.body.sex*1,
                    email:req.body.email
                }
                api.subReg(req,params,done)
            }
        },function(err,result) {
            res.send(result['res1'])
        })
    })

    router.get('/login.html',function(req,res) {
        res.render('login',{
            title:'登录'
        })
    })

    router.post('/subLogin',function(req,res){
        async.auto({
            res1:function(done){
                let params = {
                    userLoginname:req.body.userLoginname,
                    userPassword:req.body.userPassword,
                }
                api.subLogin(req,params,done)
            }
        },function(err,result) {
            if(result['res1']['success'] == 1 && result['res1']['code'] == 200) {
                req.session.user = result['res1']['obj']
                req.session.token = result['res1']['obj']?result['res1']['obj']['token']:''
                req.session.batch = result['res1']['obj']?result['res1']['obj']['batch']:''
            }
            res.send(result['res1'])
        })
    })

    router.get('/loginout.html',function(){
        async.auto({
            res1:function(done) {
                api.loginOut(req,done)
            }
        },function(err,result) {
            res.send(result['res1'])
        })
    })
}