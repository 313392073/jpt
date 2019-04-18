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
             console.log(result['res2']['obj']['course_item'].length)
            res.render('tchVR',{
                title:'老师VR实验',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchvr'
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
               nowurl:'/score'
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
               title:'老师课前',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/tchbeforeclass'
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
            console.log(result['res2']['obj'])
           res.render('tchCorrectRate',{
               title:'老师课前习题正确率',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/tchcorrectrate'
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
            console.log(result['res3'])
            res.render('tchVerifyProcess',{
                title:'老师检验流程测试结果',
                step:result['res2']?result['res2']['obj']:[],
                trData:result['res3']?result['res3']['obj']:{},
                nowurl:'/tchverifyprocess'
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
                    batch:rest['res2']?rest['res2']['obj']:''
                }
                api.teaAfterReport(req,params,done)
            }]
        },function(error,result) {
            console.log(result['res2'])
            res.render('tchAfterClass',{
                title:'老师课后',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchafterclass'
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
            console.log(result['res2'])
            res.render('tchImproveProcess',{
                title:'老师完善流程',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchimproveprocess'
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
            console.log(result['res2']['obj'])
            console.log(result['res2']['obj'][0]['comments'])
           res.render('tchPanelData',{
               title:'老师小组数据',
               trData:result['res2']?result['res2']['obj']:[],
               nowurl:'/tchpaneldata'
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
                title:'老师重新分组',
                trData:result['res2']?result['res2']['obj']:[],
                token:req.session.token,
                nowurl:'/tchregroup',
                baseurl:base.publicPath
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
                title:'老师文件上传',
                batch:result['res1']?result['res1']['obj']:'',
                token:req.session.token,
                nowurl:'/tchupload',
                baseurl:base.publicPath
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
             console.log(result['res2']['obj'])
            res.render('tchVideoReview',{
                title:'老师视频点评',
                trData:result['res2']?result['res2']['obj']:[],
                nowurl:'/tchvideoreview'
            })
         })
    })


    // 老师VR考核
    router.get('/tchvrcheck.html',function(req,res){
        res.render('tchvrCheck',{
            title:'老师小组数据',
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

    router.get('/exlce',function(req,res) {
        res.render('exlce')
    })
}