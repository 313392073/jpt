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
                localStorage.setItem('userInfo',JSON.stringify(res.obj))
                window.location.href = '/tchcorrectrate.html'
            }else{
                layer.alert(res.msg,{
                    title:'温馨提示'
                })
            }
        },
        error:function(err) {
            layer.alert('网络错误，请稍后再试',{
                title:'温馨提示'
            })
        }
    })
})