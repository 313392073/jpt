const api = require('../interface');
const async = require('async');
const base = require('../config/base');
module.exports = function(router){
    //学生课后
    router.get('/stubeforeclass.html',function(req,res){
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function (done, rest){
                let obj = {
                    batch:rest['res1']?rest['res1']['obj']:'',
                    type:0*1,
                    token:req.session.token
                }
                api.getStubeforeClass(req,obj,done)
            }]
        },function(err,result) {
            console.log(result['res2'])
            if(err == 'Unauthorized ' || err == 'batcherror'){
                res.send("网络错误")
            }else{
                res.render('stuBeforeClass',{
                    title:'课前习题',
                    courseList:result['res2']?result['res2']['obj']:[],
                    makeOrder:base.makeOrder,
                    batch:result['res1']?result['res1']['obj']:'',
                    token:req.session.token,
                    nowurl:'/stubeforeclass',
                    baseurl:base.publicPath
                })
            }
        })
    })



    //学生检验流程
    router.get('/stucheckprocess.html',function(req,res){
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function (done, rest){
                let obj = {
                    batch:rest['res1']?rest['res1']['obj']:'',
                    type:1*1,
                    token:req.session.token
                }
                api.getStubeforeClass(req,obj,done)
            }]
        },function(err,result) {
            if(err == 'Unauthorized ' || err == 'batcherror'){
                res.send("网络错误")
            }else{
                res.render('stuCheckProcess',{
                    title:'检验流程',
                    userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userLoginname']:''):'',
                    token:req.session.token?req.session.token:'',
                    batch:result['res1']?result['res1']['obj']:'',
                    dataList:result['res2']?result['res2']['obj']:[],
                    nowurl:'/stucheckprocess',
                    baseurl:base.publicPath
                })
            }
        })
    })


    //学生检验流程(VR)的答案学生端统计
    router.get('/stuanswerprocess.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                console.log(params)
               api.stuVr(req,params,done)
            }]
        },function(error,result) {
            // console.log(result['res2']['obj'])
            console.log(result['res2']['obj'].sort(base.sortOrder('handled_answer')))
            res.render('stuAnswerProcess',{
                title:'检验流程的答案',
                trData:result['res2']?result['res2']['obj']:[],
                sortData:result['res2']?result['res2']['obj'].sort(base.sortOrder('handled_answer')):[],
                nowurl:'/stuanswerprocess'
            })
        })
    })

     //学生总结
     router.get('/stusummarize.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
               let params = {
                   token:req.session.token,
                   batch:rest['res1']?rest['res1']['obj']:''
               }
               api.stuSum(req,params,done)
            }]
        },function(error,result) {
            console.log(result['res2'])
           res.render('stuSummarize',{
               title:'总结',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/stusummarize'
           })
        })
    })

    // 老师文件上传
    router.get('/stuupload.html',function(req,res){
        async.auto({
           res1:function(done) {
               api.getBatch(req,done)
            }
        },function(error,result) {
           res.render('stuUpload',{
               title:'视频上传',
               batch:result['res1']?result['res1']['obj']:'',
               token:req.session.token,
               nowurl:'/stuupload',
               baseurl:base.publicPath
           })
        })
   })

      //学生讨论
    router.get('/studiscuss.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
               let params = {
                   token:req.session.token,
                   batch:rest['res1']?rest['res1']['obj']:''
               }
               api.stuVrList(req,params,done)
            }]
        },function(error,result) {
           res.render('stuDiscuss',{
               title:'讨论',
               trData:result['res2']?result['res2']['obj']:[],
               batch:result['res1']?result['res1']['obj']:'',
               token:req.session.token,
               nowurl:'/studiscuss',
               baseurl:base.publicPath
           })
        })
    })


    //学生VR实验
    router.get('/stuvr.html',function(req,res){
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function (done, rest){
                let obj = {
                    batch:rest['res1']?rest['res1']['obj']:'',
                    type:3*1,
                    token:req.session.token
                }
                api.getStubeforeClass(req,obj,done)
            }]
        },function(error,result) {
            res.render('stuVR',{
                title:'VR实验',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userLoginname']:''):'',
                trData:result['res2']?result['res2']['obj']:[],
                batch:result['res1']?result['res1']['obj']:'',
                token:req.session.token?req.session.token:'',
                nowurl:'/stuvr',
                baseurl:base.publicPath
            })
        })
    })


     //学生视频
     router.get('/stuvideo.html',function(req,res){
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params={
                    batch:rest['res1']?rest['res1']['obj']:'',
                    token:req.session.token
                }
                api.getUploadList(req,params,done)
            }]
        },function(error,result) {
            console.log(result['res2'])
            res.render('stuVideo',{
                title:'视频',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/stuvideo'
            })
        })
    })

    //学生视频
    router.get('/videodetail.html',function(req,res){
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params={
                    batch:rest['res1']?rest['res1']['obj']:'',
                    token:req.session.token
                }
                api.getUploadList(req,params,done)
            }]
        },function(error,result) {
            var attid = req.query.attid;
            var datas = {}
            if(result['res2'] && result['res2']['obj'].length>0) {
                result['res2']['obj'].forEach(function(item,index) {
                    if(item.attid == attid) {
                        datas = item;
                    }
                })
            }
            res.render('videodetail',{
                title:'视频',
                trData:datas,
                nowurl:'/stuvideo'
            })
        })
    })

    router.post('/getcomment',function(req,res) {
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    batch:rest['res1']?rest['res1']['obj']:'',
                    token:req.session.token,
                    att:res.body.att
                }
                api.getComment(req,params,done)
            }]
        },function(error,result) {
            console.log(result)
            res.send(result)
        })
    })
    //点赞
    router.post('/getzan',function(req,res) {
        async.auto({
            res1:function(done) {
                console.log(req.body)
                let params={
                    attid:req.body.attid*1,
                    token:req.session.token
                }
                console.log(params)
                api.getZan(req,params,done)
            }
        },function(error,result) {
            console.log(result)
            res.send(result)
        })
    })
    

    // 学生课后
    router.get('/stuaftercalss.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.getvideo(req,params,done)
            }]
        },function(error,result) {
            console.log(result)
            res.render('stuAfterClass',{
                title:'课后',
                batch:result['res1']?result['res1']['obj']:'',
                token:req.session.token,
                nowurl:'/stuaftercalss',
                baseurl:base.publicPath,
                mgs:result['res2']?result['res2']['obj']:{}
            })
        })
    })


    //学生完善流程
    router.get('/stuimproveprocess.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params={
                    batch:rest['res1']?rest['res1']['obj']:'',
                    token:req.session.token,
                    type:2*1
                }
                api.getStubeforeClass(req,params,done)
            }]
        },function(error,result) {
            console.log(result['res2'])
            res.render('stuImproveProcess',{
                title:'完善流程',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userLoginname']:''):'',
                token:req.session.token?req.session.token:'',
                batch:result['res1']?result['res1']['obj']:'',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/stuimproveprocess',
                baseurl:base.publicPath
            })
        })
    })
}