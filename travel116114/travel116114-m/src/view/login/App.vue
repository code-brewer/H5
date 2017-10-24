<template>
    <div id="app">
        <div class="login">
            <img src="../../img/login_logo.png" alt="" style="margin-top: 54px;">
            <br/>
            <img src="../../img/login_txt.png" alt="" style="margin: 10px 0;">
            <!-- <img src="" alt=""> -->
            <div class="login_form">
                <span class="txt">账号：</span>
                <input type="txt" id='account' placeholder="请输入登录账号" class="login_input" v-model="username">
                <span class="txt">密码：</span>
                <input type="password" id='password' placeholder="请输入8-16位包含字母加数字的密码" class="login_input" v-model="password">
                <span class="login_input" style="display: block;background-color: #ffcc1d;color: #FFF;height:30px;width: 100%;line-height:30px;border:none" @click="loginfun()">登录</span>
                <span style="display: inline-block;width: 100%;text-align: left;"><input type="checkbox" id="rem" style="vertical-align: middle;">记住密码</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
    components: {

    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    mounted: function() {
        //读取cookie
        var _this = this;
        var namelist = ['user', 'pw']
        for (let i = 0; i < namelist.length; i++) {
            var arr, reg = new RegExp("(^| )" + namelist[i] + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                // alert(unescape(arr[2]));
                window.location.href = location.href.split("dist")[0] + "dist/pages.html";

            }

        }
    },
    methods: {
        //设置Cookie  
        SetCookie(name, value, time) {
            var exp = new Date();
            exp.setTime(exp.getTime() + time* 60 * 1000); //3天过期  
            document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
            return true;
        },
       
        loginfun() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../user/login',
                    data: {
                        username: _this.username,
                        password: _this.password,
                    },
                    transformRequest: [function(data) {
                        // Do whatever you want to transform the data
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        _this.$message.success('登录成功！');
                        // _this.SetCookie('user', _this.username);
                        // _this.SetCookie('pw', _this.password);
                        // alert(_this.getCookie('user'));



                        if (document.getElementById("rem").checked) {
                            _this.SetCookie('user', _this.username, "120");
                            _this.SetCookie('pw', _this.password, "120");
                            //     var date = new Date();
                            //     date.setTime(date.getTime() + 120 * 60 * 1000); //设置date为当前时间+30分
                            //     document.cookie = "user=" + _this.username + ";expires=" + date.toGMTString();
                            //     document.cookie = "pw=" + _this.password + ";expires=" + date.toGMTString();
                            //     console.log(document.cookie);
                            //     // localStorage.checked = document.getElementById("rem").checked;

                        } else {
                            _this.SetCookie('user', _this.username, "2");
                            _this.SetCookie('pw', _this.password, "2");
                            //     var date = new Date();
                            //     date.setTime(date.getTime() + 1 * 60 * 1000); //设置date为当前时间+30分
                            //     document.cookie = "user=" + _this.username + ";expires=" + date.toGMTString();
                            //     document.cookie = "pw=" + _this.password + ";expires=" + date.toGMTString();
                            //     alert(document.cookie);
                        }
                        window.location.href = location.href.split("dist")[0] + "dist/pages.html";
                    } else {
                        _this.$message.error('请确认账号或密码！');

                    }
                })
                .catch(function(err) {
                    _this.$message.error('请确认账号或密码！');
                })

        }
    }

}
</script>
<style lang='sass'>
body,
html {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: "微软雅黑", sans-serif;
}

span {
    padding: 0;
    margin: 0;
}

#app {
    height: 100%;
    .login {
        background: url(../../img/login_bg.png) 0 0 no-repeat;
        background-size: 100% 100%;
        height: 100%;
        text-align: center;
        .login_form {
            background-color: #FFF;
            width: calc(33.3% - 180px);
            border-radius: 10px;
            margin: 0 auto;
            padding: 40px 80px;
            .login_input {
                width: 100%;
                height: 11%;
                margin-bottom: 28px;
                padding: 5px 10px;
                border: 1px solid #d3d3d3;
                background-color: #fcfcfc;
            }
            .txt {
                display: block;
                font-size: 12px;
                text-align: left;
            }
            input::-webkit-input-placeholder {
                color: #d3d3d3;
                opacity: 1;
            }
        }
    }
}
</style>
