$(function(){
    var userType = '';
    var majorId = '';
    $(".choose input[name='identity']").on("click",function(){
        userType = $.trim($(this).val())
    })
    $("#jpt").on('click',function(){
        localStorage.setItem('userType',userType) //0 学生  1 老师
        majorId = $.trim($(this).val())
        $.ajax({
            type:'post',
            url:'/majorchoose/getMajorChoose',
            data:{userType:userType,majorId:majorId},
            dataType:'json',
            success:function(res){
                if(res.code == 200 && res.success == 1) {
                    var str = '';
                    for(var i=0;i<res.obj.length;i++){
                        if(userType == 1){
                            str += "<option value="+res.obj[i]['schoolId']+">"+res.obj[i]['schoolName']+"</option>"
                        }else if(userType == 0){
                            str += "<option value="+res.obj[i]['sys_class_id']+">"+res.obj[i]['classname']+"</option>"
                        }
                    }
                    $("#classId").html(str)
                }else{
                    layer.alert('网络错误，请稍后再试')
                }
            }
        })
    })
})

$(".sbtn").on("click",function(){
    var classId = $.trim($("#classId").val());
    localStorage.setItem('classId',classId)
    window.location.href = '/reg.html'
})