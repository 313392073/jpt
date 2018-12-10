module.exports = function(router){
    // 老师课前
    router.get('/tchbeforeclass.html',function(req,res){
        res.render('tchBeforeClass',{
            title:'老师课前'
        })
    })

     // 老师课后
     router.get('/tchafterclass.html',function(req,res){
        res.render('tchAfterClass',{
            title:'老师课后'
        })
    })

     // 老师3D
     router.get('/tch3d.html',function(req,res){
        res.render('tch3D',{
            title:'老师3D'
        })
    })

    // 老师文件上传
    router.get('/tchupload.html',function(req,res){
        res.render('tchUpload',{
            title:'老师3D'
        })
    })
}