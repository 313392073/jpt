module.exports = function(router){
    //学生专业
    router.get('/majorchoose.html',function(req,res){
        res.render('majorChoose',{
            title:'选专业'
        })
    })

     //学生选课程
     router.get('/coursechoose.html',function(req,res){
        res.render('courseChoose',{
            title:'选课程'
        })
    })
}