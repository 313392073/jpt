var account= $.trim($('#account').val());
var pwd= $.trim($('#pwd').val());
$(".sbtn").on("click",function(){
    $.ajax({
        type:'post',
        url:'/subLogin',
        dataType:'json',
        data:{userLoginname:account,userPassword:pwd},
        success:function(res){
            if(res.code == 200 && res.success == 1) {
                window.location.href = ''
            }else{
                layer.alert('网络错误，请稍后再试')
            }
        }
    })
})