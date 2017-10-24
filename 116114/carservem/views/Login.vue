<template>
    <!-- <div style=" "> -->
        <header class="heading">
            <div class="title">沃爱车车辆违章查询管理后台</div>
        </header>
        <div style="width:515px;height:320px;background-color:#fff;box-shadow: 0px 0px 10px 3px #ccc;position:absolute;top:50%;left:50%;margin-left:-257px;margin-top:-170px;">
            <!-- 这是登录页面 -->
            <div class="out">
                <form role="form" @submit="login">
                    <div class="login-bg" style="padding-top:40px;">
                        <h1 style="text-align:center;font-size:30px;color:#414141;font-family:'黑体';font-weight: bold;line-height:55px;">管理员登陆</h1>
                        <div class="login-box">
                            <div class="login-box-header"></div>
                            <div class="login-name">
                                <input type="text" placeholder="用户名" v-model="loginConfig.username"></input>
                            </div>
                            <div class="login-password">
                                <input type="password" placeholder="密码" v-model="loginConfig.password"></input>
                            </div>
                            <div class="" v-show="errop" style="text-align:center;color:red;" transition="expand">
                                {{erro}}
                            </div>
                            <div style="text-align:center;">
                                <a class="login-btn" @click="login()" style="margin:30px auto">登录</a>
                            </div>
                        </div>
                    </div>
                </form>
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
           
            erro:'',
            errop:false,

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

            // var that = this;
            api.login(this, this.loginConfig, (back) => {
                if (back.resCode == "0") {
                    localStorage.setItem('username', back.repBody.username)
                    localStorage.setItem('user_type', back.repBody.type)
                        // localStorage.removeItem('ams_user_info')
                    sessionStorage.setItem('isLogin', back.repBody);
                    this.$route.router.go({
                        path: "/accountMag"
                    });
                }else{
                    this.errop =true;
                    this.erro = back.resMsg
                    // this.show(back.resMsg)
                }
            })
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
    background-color: #fbffbd;
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
    width: 73px;
    height: 28px;
    background-color: #f57303;
    border: 1px solid #e55c00;
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

.heading {
    height: 80px;
    background-color: #fff;
    padding: 0;
    line-height: 80px;
    position: relative;
}

.title {
    font-size: 26px;
    font-family: '黑体';
    color: #000;
    padding-left: 150px;
    background: url(../images/116114logo.png) 18px 16px no-repeat;
    border-bottom: 1px solid #e3d5ba;
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
