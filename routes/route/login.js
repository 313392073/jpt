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
                // console.log(params)
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
            res.send(result['res1'])
        })
    })
}