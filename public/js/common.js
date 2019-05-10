function restart() {
    $.ajax({
        type:'get',
        url:"/getstart",
        dataType:'json',
        success:function(res) {
            if(res.success == 1 && res.code == 200) {
                layer.alert("重新开课成功",{
                    title:'温馨提示',
                    yes:function(){
                      window.location.reload()
                    }
                })
            }else{
                layer.alert("网络错误,重新开课失败",{
                    title:'温馨提示',
                    yes:function(){
                      window.location.reload()
                    }
                })
            }
        }
    })
}