$(".sbtn").on("click",function(){
    var account= $.trim($('#account').val());
    var pwd= $.trim($('#pwd').val());
    $.ajax({
        type:'post',
        url:'/subLogin',
        dataType:'json',
        data:{userLoginname:account,userPassword:pwd},
        success:function(res){
            if(res.code == 200 && res.success == 1) {
                window.location.href = '/stubeforeclass.html'
            }else{
                layer.alert(res.msg,{
                    title:'温馨提示'
                })
            }
        }
    })
})