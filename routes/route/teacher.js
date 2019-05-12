const api = require('../interface');
const async = require('async');
const qs = require('qs');
const base = require('../config/base')
module.exports = function(router){
    //老师出题
    router.get('/teagiveproblem.html',function(req,res) {
        async.auto({
            res1:function(done) {
                let obj = {
                    token:req.session.token,
                    course:'',
                    exams:req.body['exams']
                }
                api.teaGiveProblem(req,obj,done)
            }
        },function(err,result) {
            res.send(result['res1'])
        })
    })

    router.get('/getstart',function(req,res) {
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.getstart(req,params,done)
            }]
        },function(error,result) {
            res.send(result['res2']?result['res2']:{})
        })
    })

     // VR实验-老师端
     router.get('/tchvr.html',function(req,res){
         async.auto({
             res1:function(done) {
                 api.getBatch(req,done)
             },
             res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    courseType:3*1,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.teaScore(req,params,done)
             }]
         },function(error,result) {
            res.render('tchVR',{
                title:'VR实验',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchvr',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
         })
        
    })


     // 班级个人成绩-老师端
     router.get('/score.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
               let params = {
                   token:req.session.token,
                   batch:rest['res1']?rest['res1']['obj']:''
               }
               api.teaScore(req,params,done)
            }]
        },function(error,result) {
           res.render('tchVR',{
               title:'个人成绩',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/score',
               userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
               usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
           })
        })
   })
    // 老师课前
    router.get('/tchbeforeclass.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
               let params = {
                   token:req.session.token,
                   batch:rest['res1']?rest['res1']['obj']:''
               }
               api.teaClassList(req,params,done)
            }]
        },function(error,result) {
            console.log(result['res2']['obj'])
           res.render('tchBeforeClass',{
               title:'课前习题',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/tchbeforeclass',
               userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
               usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
           })
        })
    })

    // 老师课前习题正确率
    router.get('/tchcorrectrate.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
               let params = {
                   token:req.session.token,
                   batch:rest['res1']?rest['res1']['obj']:''
               }
               api.teaClassList(req,params,done)
            }]
        },function(error,result) {
           res.render('tchCorrectRate',{
               title:'课前习题-正确率统计',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/tchcorrectrate',
               userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
               usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
           })
        })
    })


    // 老师检验流程测试结果
    router.get('/tchverifyprocess.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    type:1*1,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.getStubeforeClass(req,params,done);
            }],
            res3:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.teaVr(req,params,done)
            }]
        },function(error,result) {
            var crr = [];
            if(result['res2'] && result['res2']['obj']) {
                result['res2']['obj'].forEach((function(item) {
                    crr.push(item['course_item'])
                }))
            }
            res.render('tchVerifyProcess',{
                title:'检验流程',
                step:result['res2']?result['res2']['obj'].sort(base.sortOrder('answer')):[],
                crr:crr,
                trData:result['res3']?result['res3']['obj']:{},
                nowurl:'/tchverifyprocess',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
        })
    })


      // 老师课后
    router.get('/tchafterclass.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.teaAfterReport(req,params,done)
            }]
        },function(error,result) {
            res.render('tchAfterClass',{
                title:'课后报告',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchafterclass',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
        })
    })

     // 完善流程-老师端
     router.get('/tchimproveprocess.html',function(req,res){
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                var params = {
                    token:req.session.token,
                    courseType:2*1,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.teaScore(req,params,done)
            }]
        },function(error,result) {
            console.log(req.session.user['user'])
            res.render('tchImproveProcess',{
                title:'完善流程',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchimproveprocess',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
        })
    })
     // 老师小组数据
     router.get('/tchpaneldata.html',function(req,res){
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
               api.teaGroupData(req,params,done)
            }]
        },function(error,result) {
           res.render('tchPanelData',{
               title:'小组数据',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/tchpaneldata',
               userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
           })
        })
    })

    
     // 老师重新分组
     router.get('/tchregroup.html',function(req,res){
         async.auto({
             res1:function(done) {
                api.getBatch(req,done)
             },
             res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                 }
                api.teaGroupRepart(req,params,done)
             }]
         },function(error,result) {
            res.render('tchRegroup',{
                title:'分组',
                trData:result['res2']?result['res2']['obj']:[],
                token:req.session.token,
                nowurl:'/tchregroup',
                baseurl:base.publicPath,
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
         })
    })

     // 老师文件上传
     router.get('/tchupload.html',function(req,res){
         async.auto({
            res1:function(done) {
                api.getBatch(req,done)
             }
         },function(error,result) {
            res.render('tchUpload',{
                title:'上传视频',
                batch:result['res1']?result['res1']['obj']:'',
                token:req.session.token,
                nowurl:'/tchupload',
                baseurl:base.publicPath,
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
         })
    })

    //学生视频列表
    router.get('/tchvideo.html',function(req,res){
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
            res.render('tchVideo',{
                title:'视频',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchvideo',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
        })
    })

     // 老师视频点评
     router.get('/tchvideoreview.html',function(req,res){
         async.auto({
            res1:function(done) {
                api.getBatch(req,done)
             },
             res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                 }
                api.teaVideoComment(req,params,done)
             }]
         },function(error,result) {
            res.render('tchVideoReview',{
                title:'视频点评',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchvideoreview',
                userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userName']:''):'',
                usertype:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userType']:''):''
            })
         })
    })


    // 老师VR考核
    router.get('/tchvrcheck.html',function(req,res){
        res.render('tchvrCheck',{
            title:'VR考核',
            nowurl:'/tchvrcheck'
        })
    })

    
     // 老师3D(检验流程测试结果)
    router.get('/tch3d.html',function(req,res){
        res.render('tch3D',{
            title:'老师3D(检验流程测试结果)'
        })
    })
    
     // 老师总结
     router.get('/tchsummarize.html',function(req,res){
        res.render('tchSummarize',{
            title:'老师总结'
        })
    })
}