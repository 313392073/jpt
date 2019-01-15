const api = require('../interface');
const async = require('async');
module.exports = function(router){

    //学生课后
    router.get('/stubeforeclass.html',function(req,res){
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function (done, rest){
                let obj = {
                    batch:rest['res1']['obj'],
                    type:0,
                    token:req.session.token
                }
                api.getStubeforeClass(req,obj,done)
            }]
        },function(err,result) {
            if(err == 'Unauthorized ' || err == 'batcherror'){
                res.send("网络错误")
            }else{
                res.render('stuBeforeClass',{
                    title:'学生课前习题',
                    courseList:result['res2']['obj']
                })
            }
        })
        
    })













    // 学生课前
    router.get('/stuaftercalss.html',function(req,res){
        res.render('stuAfterClass',{
            title:'学生课后'
        })
    })

    

    //学生检验流程
    router.get('/stucheckprocess.html',function(req,res){
        res.render('stuCheckProcess',{
            title:'学生检验流程'
        })
    })
    
    //学生检验流程的答案
    router.get('/stuanswerprocess.html',function(req,res){
        res.render('stuAnswerProcess',{
            title:'学生检验流程的答案'
        })
    })

    //学生VR实验
    router.get('/stuvr.html',function(req,res){
        res.render('stuVR',{
            title:'学生VR实验'
        })
    })

    //学生完善流程
    router.get('/stuimproveprocess.html',function(req,res){
        res.render('stuImproveProcess',{
            title:'学生完善流程'
        })
    })

    //学生讨论
    router.get('/studiscuss.html',function(req,res){
        res.render('stuDiscuss',{
            title:'学生讨论'
        })
    })

    //学生视频
    router.get('/stuvideo.html',function(req,res){
        res.render('stuVideo',{
            title:'学生视频'
        })
    })
     //学生总结
     router.get('/stusummarize.html',function(req,res){
        res.render('stuSummarize',{
            title:'学生总结'
        })
    })
}