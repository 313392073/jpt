module.exports = function(router){
    router.get('/user',function(req,res){
        res.render('index',{title:'您好您好'})
    })
}