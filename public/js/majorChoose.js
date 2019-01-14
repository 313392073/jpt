$(function(){
    var userType = '';
    var majorId = '';
    $(".choose input[name='identity']").on("click",function(){
        userType = $.trim($(this).val())
        console.log($.trim($(this).val()))
    })
    $("#jpt").on('click',function(){
        majorId = $.trim($(this).val())
        $.ajax({
            type:'get',
            url:'/v1/api/user/regist_info?userType='+userType+'&majorId='+majorId,
            dataType:'json',
            success:function(res){
                console.log(res)
            }
        })
    })
})