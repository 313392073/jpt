const api = require('../interface');
const async = require('async');
module.exports = function(router){
    //老师出题
    router.get('/teagiveproblem',function(req,res) {
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
                 console.log(req.session)
                 api.getBatch(req,done)
             },
             res2:['res1',function(done,rest) {
                let params = {
                    token:req.session.token,
                    batch:rest['res1']?rest['res1']['obj']:''
                }
                api.teaVr(req,params,done)
             }]
         },function(error,result) {
             console.log(1111)
             console.log(result)
             console.log(result['res2'])
            // res.render('tchVR',{
            //     title:'老师VR实验'
            // })
         })
        
    })





    // 老师课前
    router.get('/tchbeforeclass.html',function(req,res){
        res.render('tchBeforeClass',{
            title:'老师课前'
        })
    })

    // 老师课前习题正确率
    router.get('/tchcorrectrate.html',function(req,res){
        res.render('tchCorrectRate',{
            title:'老师课前习题正确率'
        })
    })


    // 老师检验流程测试结果
    router.get('/tchverifyprocess.html',function(req,res){
        res.render('tchVerifyProcess',{
            title:'老师检验流程测试结果'
        })
    })

     // 老师3D(检验流程测试结果)
    router.get('/tch3d.html',function(req,res){
        res.render('tch3D',{
            title:'老师3D(检验流程测试结果)'
        })
    })

    // 完善流程-老师端
    router.get('/tchimproveprocess.html',function(req,res){
        res.render('tchImproveProcess',{
            title:'老师完善流程'
        })
    })

    

    
    // 老师文件上传
    router.get('/tchupload.html',function(req,res){
        res.render('tchUpload',{
            title:'老师文件上传'
        })
    })

     // 老师重新分组
     router.get('/tchregroup.html',function(req,res){
        res.render('tchRegroup',{
            title:'老师重新分组'
        })
    })

    // 老师小组数据
    router.get('/tchpaneldata.html',function(req,res){
        res.render('tchPanelData',{
            title:'老师小组数据'
        })
    })

    // 老师VR考核
    router.get('/tchvrcheck.html',function(req,res){
        res.render('tchvrCheck',{
            title:'老师小组数据'
        })
    })

     // 老师视频点评
     router.get('/tchvideoreview.html',function(req,res){
        res.render('tchVideoReview',{
            title:'老师视频点评'
        })
    })

    

     // 老师总结
     router.get('/tchsummarize.html',function(req,res){
        res.render('tchSummarize',{
            title:'老师总结'
        })
    })

     // 老师课后
     router.get('/tchafterclass.html',function(req,res){
        res.render('tchAfterClass',{
            title:'老师课后'
        })
    })

    

}