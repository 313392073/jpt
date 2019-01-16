$("#imgs").on("click",function(){
    $("#uploadPhoto").click();
})
var input1 = document.getElementById("uploadPhoto");

if(typeof FileReader==='undefined'){
	//result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
	input1.setAttribute('disabled','disabled');
}else{
	input1.addEventListener('change',readFile,false);
}

function readFile(){
	var file = this.files[0];
	/*console.log(file);  //获取到的文件*/
	if(!/image\/\w+/.test(file.type)){
		alert("文件必须为图片！");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file); //将图片转换成base64编码格式
	reader.onload = function(e){
		var fileData = $('#uploadPhoto')[0].files[0];
        var formData = new FormData();
        formData.append("file", fileData);
        formData.append("token", "");
		console.log(formData)
        $.ajax({
            url: "http://118.31.8.72:85/v1/api/comm/uploadfile",
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                console.log(result)
				$('#imgs').attr('src',result.obj);
            },
            error: function (err) {
				alert("上传头像失败，请重新上传头像")
            }
        });
	}
};


$(".sbtn").on("click",function(){
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
    var account= $.trim($('#account').val());
    var pwd= $.trim($('#pwd').val());
    var email= $.trim($('#email').val());
	var headImage=$.trim($('#imgs').attr('src'));
	var sex=$('.identity-box').find('input[name="identity"]:checked').val();//1是老师 0是学生
    var userType = localStorage.getItem('userType')
    var classId = localStorage.getItem('classId')
    console.log(account,pwd,email,headImage,sex,userType,classId)
    if(userType == '' || account == '' || pwd == '' || email == '' || sex == '' || classId == '' || headImage == '') {
        layer.alert('请将信息填写完整即可注册！');
        return false;
    } else {
        if(!reg.test(email)){
            layer.alert('邮箱校验未通过');
        }else{
            $.ajax({
                type:'post',
                url:'/subReg',
                dataType:'json',
                data:{userLoginname:account,userPassword:pwd,headImage:headImage,userType:userType,classId:classId,sex:sex,email:email},
                success:function(res){
                    if(res.code == 200 && res.success == 1) {
                        layer.alert(res.msg,{
                            title:'温馨提示',
                            time: 2000,
                            yes:function(index){
                                layer.close(index);
                                window.location.href = '/login.html'
                            }
                        })
                        console.log(res)
                    }else{
                        layer.alert(res.msg,{
                            title:'温馨提示'
                        })
                    }
                }
            })
        }
    }  
})