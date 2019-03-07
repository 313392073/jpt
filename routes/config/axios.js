axios.interceptors.request.use(
    config => {
        var token = ''
        if(typeof Cookies.get('user') === 'undefined') {
            //token 不存在
        }else{
            token = JSON.parse(Cookies.get('user')).token
        }
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/json'
        }
        if(token != '') {
            config.headers.token = token
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        if(response.data.code == 'w_100004' || response.data.message == '未登录') {
            router.push({
                path:'/',
                query:{redirect:router.currentRoute.fullPath}
            })
            return response;
        }
    },
    error => {
        return Promise.reject(error)
    }
)

function fetch(url,params = {}) {
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(response => {
            resolve(response.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

function post(url,data = {}) {
    return new Promise((resolve,reject) => {
        axios.post(url,data).then(response => {
            resolve(response.data)
        },err => {
            reject(err)
        })
    })
}

axios.interceptors.response.use(
    response => {
        if(response.data.data && response.data.data.ecode == '401') {
            loadinginstance.close()
            router.replace({
                path:'/login',
                //登录成功后跳入浏览的当前页面
                query:{redirect:router.currentRoute.fullPath}
            })
        }else{
            loadinginstance.close();
            return response;
        }
    },
    error => {
        loadinginstance.close()
        if(error.response) {
            switch(error.response.status) {
                case 401:
                router.replace({
                    path:'/login'
                })
            }
        }
        return Promise.reject(error.response.data)
    }
)
