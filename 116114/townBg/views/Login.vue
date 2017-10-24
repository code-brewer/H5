<template>
    <!-- <div style=" "> -->
        <header class="heading">
            <div class="title"><span class="ddd">丨</span>后台管理系统</div>
        </header>
        <div class="middle">
            <div class="loginConfig">
            <!-- 这是登录页面 -->
            <div class="out">
                <form role="form" @submit="login">
                    <div class="login-bg">
                        <h1 style="text-align:center;font-size:25px;color:#90beea;font-family:'黑体';font-weight: bold;line-height:55px;">登录</h1>
                        <div class="login-box">
                            <div class="login-box-header"></div>
                            <div class="login-name">
                                <input type="text" placeholder="账号" v-model="loginConfig.username"></input>
                            </div>
                            <div class="login-password">
                                <input type="password" placeholder="密码" v-model="loginConfig.password"></input>
                            </div>
                            <div style="text-align:center;">
                                <a class="login-btn" @click="login()" style="margin:15px auto">{{go}}</a>
                            </div>
                            <div class="warn" v-show="errop" style="text-align:center;color:red;" transition="expand">
                                {{erro}}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
        
    <!-- </div> -->

</template>
<script>


import api from '../api'

export default {
    components: {


    },
    data() {
        return {
            loginConfig: {
                username: '',
                password: ''
            },
            go: '登录',
            erro: '',
            errop: false,

        }
    },
    ready() {

    },

    methods: {


        login() {
            // console.log("假装登录了")
            // sessionStorage.setItem('isLogin',{});
            // this.$route.router.go({path:"/accountMag"});
            // return;
            if(this.loginConfig.username === '' || this.loginConfig.password === ''){
              this.errop =true;
              this.erro = 'sorry,账户或密码不能为空！'
            }
            else{
            this.go = '登录中';
            api.login(this,{'username':this.loginConfig.username,'password':this.loginConfig.password}, (back) => {
                if (back.resCode == "000000") {
                    localStorage.setItem('username', this.loginConfig.username)
                    localStorage.setItem('user_type', back.repBody.type)
                        // localStorage.removeItem('ams_user_info')
                    sessionStorage.setItem('isLogin', back.repBody);
                    this.$route.router.go({
                        path: "/creatviews"
                    });
                    window.location.reload();
                    // this.$router.go('/accountMag');
                }else{
                  this.go = '登录';
                    this.errop =true;
                    this.erro = 'sorry,您输入的密码和账户不匹配！'
                }
            })
          }
        }


    }
}
</script>
<style scoped>
.login-name,
.login-password {
    height: 40px;
    line-height: 40px;
    width: 330px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fff;
}

.login-name input {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #fbffbd;
}

.login-password input {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    background-color: #fbffbd;
}

.login-btn {
    width: 330px;
    height: 28px;
    background-color: #15caae;
    border: 1px solid #15caae;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    border-radius: 3px;
    text-decoration: none;
    margin-left: 10px;
    cursor: pointer;
}


/*//*/
.loginConfig{
  width: 385px;
  height: 300px;
  background-color: #fff;
  /*box-shadow: 0px 0px 10px 3px #ccc;*/
  position: absolute;
  /*top: 50%;*/
  left: 80%;
  margin-left: -257px;
  margin-top: 25px;
}

.heading {
    height: 80px;
    background-color: #15caae;
    padding: 0;
    line-height: 80px;
    position: relative;
}

.title {
    font-size: 26px;
    font-family: '黑体';
    color: #fff;
    padding-left: 110px;
    background: url(../images/116114logo.png) 18px 16px no-repeat;
    border-bottom: 1px solid #e3d5ba;

}
.ddd{
    padding-right: 10px;
    color: #fff;
}
.middle{
  width: 100%;
  height: 360px;
  background-color: yellow;
  margin-top: 60px;
  background: url(../images/middleBg.png) 100% no-repeat;
  background-size: cover;
}
.warn{
  background:url(../images/warn.png) no-repeat;
  background-position:55px;
  background-size: 20px
}
.close{
        height: 30px;
        line-height: 30px;
        background-color: #faa354;
        position: relative;

    }
    .actiontong,.nothx,.juzhong{
        width: 73px;
        height: 28px;
        background-color: #f57303;
        border:1px solid #e55c00;
        color: #fff;
        line-height: 28px;
        text-align: center;
        display: inline-block;
        margin:0 auto;
        border-radius: 3px;
        cursor: pointer;

        /*background: url(./images/btnBg.png);*/
    }
    /* 必需 */
.expand-transition {
  transition: all .3s ease;
  /*height: 30px;*/
  /*padding: 10px;*/
  background-color: #fff;
  overflow: hidden;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
.expand-leave{

}
</style>
