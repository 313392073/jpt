const api = require('../interface');
const async = require('async');
module.exports = function(router){
    //学生专业
    router.get('/majorchoose.html',function(req,res){
        res.render('majorChoose',{
            title:'选专业'
        })
    })
    //选课
    router.use('/majorchoose/getMajorChoose',function(req,res) {
        async.auto({
            res1:function(done){
                let params = {
                    userType:req.body.userType*1,
                    majorId:req.body.majorId*1
                }
                api.getMajorCourse(req,params,done)
            }
        },function(err,result) {
            res.send(result['res1'])
        })
    })
     //学生选课程
     router.get('/coursechoose.html',function(req,res){
        res.render('courseChoose',{
            title:'选课程'
        })
    })
}