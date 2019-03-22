const api = require('../interface');
const async = require('async');
const base = require('../config/base');
module.exports = function(router){
    //学生课后
    router.get('/stubeforeclass.html',function(req,res){
        async.auto({
            res1:function(done){
                console.log(req.session)
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
            // console.log(result['res2']['obj'])
            if(err == 'Unauthorized ' || err == 'batcherror'){
                res.send("网络错误")
            }else{
                res.render('stuBeforeClass',{
                    title:'学生课前习题',
                    courseList:result['res2']['obj'],
                    makeOrder:base.makeOrder,
                    batch:result['res1']['obj']
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
                    type:1,
                    token:req.session.token
                }
                console.log(req.body)
                // api.getStubeforeClass(req,obj,done)
            }]
        },function(err,result) {
            // console.log(result['res2']['obj'])

            console.log(JSON.parse(req.session.user['user'])['userLoginname'])
            if(err == 'Unauthorized ' || err == 'batcherror'){
                res.send("网络错误")
            }else{
                res.render('stuCheckProcess',{
                    title:'学生检验流程',
                    userLoginname:req.session.user?(req.session.user['user']?JSON.parse(req.session.user['user'])['userLoginname']:''):'',
                    token:req.session.token?req.session.token:'',
                    batch:result['res1']?result['res1']['obj']:'',
                    dataList:result['res2']['obj']
                })
            }
        })
    })



    //提交答案
    router.post('/subAnswer',function(req,res) {
        async.auto({
            res1:function(done) {
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let obj1 = [ { answer: "[ '腹泻', '腹痛' ]",
                    classBatch: "u4iwarmtep",
                    id: 4,
                    courseItemId: 34,
                    isRight: 0,
                    score: '0',
                    userLoginname:"漆静01"},
                { answer: "[ '设备', '试剂' ]",
                    classBatch: "u4iwarmtep",
                    id: 4,
                    courseItemId: 35,
                    isRight: 0,
                    score: '0',
                    userLoginname:"漆静01"},
                { answer: "[ '样品检验区域和对照组检验区域应分离或二次消毒', '样品检验器具应和对照器具分开' ]",
                    classBatch: "u4iwarmtep",
                    id: 4,
                    courseItemId: 36,
                    isRight: 0,
                    score: '0',
                    userLoginname:"漆静01"} ]

                let obj = {
                    batch:rest['res1']['obj'],
                    token:req.session.token,
                    exams:obj1
                }
            
                console.log(JSON.parse(req.body['exams']))
                console.log(obj)
                api.subAnswer(req,obj,done)
            }]
        },function(err,result) {
            console.log(result['res2'])
            res.send(result['res2'])
        })
    })
    

    router.post('/subAnswers',function(req,res) {
        let obj1 = [ { answer: "[ '腹泻', '腹痛' ]",
            classBatch: "u4iwarmtep",
            id: 4,
            courseItemId: 34,
            isRight: 0,
            score: '0',
            userLoginname:"漆静01"},
        { answer: "[ '设备', '试剂' ]",
            classBatch: "u4iwarmtep",
            id: 4,
            courseItemId: 35,
            isRight: 0,
            score: '0',
            userLoginname:"漆静01"},
        { answer: "[ '样品检验区域和对照组检验区域应分离或二次消毒', '样品检验器具应和对照器具分开' ]",
            classBatch: "u4iwarmtep",
            id: 4,
            courseItemId: 36,
            isRight: 0,
            score: '0',
            userLoginname:"漆静01"} ]
        async.auto({
            res1:function(done){
                api.getBatch(req,done)
            },
            res2:['res1',function(done,rest) {
                let params = {
                    batch:rest['res1']['obj'],
                    token:req.session.token,
                    exams:obj1
                }
                console.log(req.body)
                api.urlReq('POST','/v1/api/course/submit',params,req,done)
            }]
        },function(err,result) {
            console.log(result['res1'])
            res.send(result['res1'])
        })
    })

    router.get('/test',function(req,res) {
        res.render('test')
    })

    // router.get('/test',function(req,res) {
    //     async.auto({
    //         res1:function(done){
    //             api.getMajorCourse(req,done)
    //         }
    //     },function(err,result) {
    //         res.send(result['res1'])
    //     })
    // })


































    // 学生课前
    router.get('/stuaftercalss.html',function(req,res){
        res.render('stuAfterClass',{
            title:'学生课后'
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