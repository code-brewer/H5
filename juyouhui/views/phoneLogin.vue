<template>
    <div class="phoneLogin" v-el="phoneLogin">
        <div class="logo">
        </div>
        <div class="inputText">
            <input type="text" name="" id="phone" placeholder="请输入您的手机号码" v-model="Tel" v-el="phone" @blur="blurTel" debounce="500">
            <label for="phone">+86</label>
            <div class="x" v-show="Tel.trim()" @click="Tel = ''">
                <img src="../images/x.png">
            </div>
            <p class="tips" v-if="TelTips">{{TelTips}}</p>
        </div>
        <div class="inputText">
            <input type="password" name="" id="pw" placeholder="请输入密码" v-el:pw @blur="blurPw" v-model="pw">
            <label for="pw">密码</label>
            <div class="x" v-show="pw.trim()" @click="pw = ''" style="right: 100px">
                <img src="../images/x.png">
            </div>
            <div class="eye" @click="clickEye"><img :src="isWatch?'./images/form/watch.png':'./images/form/nowatch.png'"></div>
            <p class="tips" v-if="pwTips">{{pwTips}}</p>
            <span class="forget" v-link="{path : '/phoneLogin/reset'}">忘记密码?</span>
        </div>
        <!-- <div class="inputText" v-if = "isNewUser">
            <input type="text" name="" id="verify" placeholder="请输入验证码">
            <label for="verify">验证码</label>
            <div class="gain active">获取验证码</div>
            <p class="tips"></p>
        </div> -->
        <div class="inputText clearfix">
            <button id="newUser" v-link="{path: '/phoneLogin/register'}">新用户注册</button>
            <button id="login" @click="clickLogin" :class="{ active: checkTel(Tel)&&checkPw(pw) }">登录</button>
            <!-- v-link="{path: '/home/'}" -->
        </div>
        <!-- <div class="inputText clearfix" v-if = "isNewUser">
            <button class="register active">注册</button>

        </div> -->
    </div>
</template>
<script type="text/javascript">
import api from '../api/index.js'
import commonMethods from '../utils/commonMethods.js'
import {
    base64Encode
} from '../utils/base64Encode.js'
import {
    checkTel,
    checkPw,
} from '../utils/checkPhone.js'
export default {
    created() {
            this.$dispatch('closeShow')
            var _this = this
            setTimeout(function() {
                if (_this.$el && _this.$el.style) {
                    _this.$el.style.height = document.body.clientHeight + 'px'
                }
                if (_this.$els && _this.$els.pw) {
                    _this.$els.pw.value = ''
                }

            }, 100)
            if (commonMethods.getId() && commonMethods.getNumber1()) this.$router.go({
                path: '/home/'
            })
        },
        activated() {
            this.$dispatch('closeShow')
        },
        data() {
            return {
                Tel: '',
                TelTips: '',
                pw: '',
                pwTips: '',
                isWatch: false,
                barTitle: '',
            }
        },
        methods: {
            checkTel: function(val) {
                return checkTel(val)
            },
            checkPw(val) {

                return checkPw(val)
            },
            clickEye() {
                this.isWatch ? this.isWatch = false : this.isWatch = true;
                this.isWatch ? this.$els.pw.type = 'text' : this.$els.pw.type = 'password';
            },
            blurTel() {
                this.checkTel(this.Tel) ? this.TelTips = '' : this.TelTips = '*请输入中国大陆11位的手机号'

            },
            blurPw() {
                this.checkPw(this.pw) ? this.pwTips = '' : this.pwTips = '*仅支持6~16位数字/字母/符号，区分大小写'
            },
            clickLogin() {
                if (!(this.checkTel(this.Tel) && this.checkPw(this.pw))) return
                api.phoneLogin(this, {
                    "phone": this.Tel, //必填
                    "password": base64Encode(this.pw), //必填
                }, res => {
                    if (this.checkTel(this.Tel) && this.checkPw(this.pw)) {
                        // res.repBody === '验证码错误' ?  this.verifyTips = '验证码错误' : this.$router.go({path : '/phoneLogin/'})
                        if (res.repBody === '登录成功') {
                            this.$router.go({
                                path: '/home/'
                            })
                        } else {
                            this.pwTips = '账号或密码错误'
                        }
                    }

                })
            },
        }
}
</script>
<style lang="scss" scoped>
// body {
//  background-color: #fff;
// }
.phoneLogin {
    height: 100%;
    background-color: #fff;
}

.logo {
    height: 320px;
    background: url(../images/center/juyouhui.png) no-repeat center;
    background-size: 50%;
    margin-bottom: 20px;
}

.inputText {
    max-width: 640px;
    margin: 0 auto;
    position: relative;
    #phone {
        width: 563px;
        height: 70px;
        font-size: 25px;
        display: block;
        margin: 0 auto;
        box-sizing: border-box;
        border-bottom: 1px solid #929292;
        padding-left: 110px;
        border-radius: 5px;
        background-color: #fff;
        outline: none
    }
    .eye,
    .x,
    .gain {
        position: absolute;
        right: 40px;
        width: 60px;
        top: 50%;
        height: 100%;
        transform: translateY(-50%);
        img {
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
        }
    }
    .gain {
        width: 150px;
        background-color: #bfbfbf;
        color: #fff;
        font-size: 25px;
        line-height: 68px;
        text-align: center;
    }
    .gain.active {
        background-color: #ec5252;
    }
    #pw,
    #verify {
        width: 563px;
        height: 70px;
        font-size: 25px;
        display: block;
        margin: 0 auto;
        box-sizing: border-box;
        border-bottom: 1px solid #929292;
        padding-left: 110px;
        margin-top: 48px;
        border-radius: 5px;
        background-color: #fff;
        outline: none
    }
    label {
        font-size: 25px;
        color: #000;
        position: absolute;
        top: 20px;
        left: 55px;
    }
    input {
        letter-spacing: 0.1em;
    }
    .tips {
        position: absolute;
        left: 45px;
        color: red;
        font-size: 24px;
        margin-top: 10px;
    }
    .register {
        height: 70px;
        width: 563px;
        font-size: 25px;
        line-height: 70px;
        color: #fff;
        display: block;
        margin: 0 auto;
        margin-top: 80px;
        background-color: #bfbfbf;
        letter-spacing: 0.5em;
    }
    .register.active {
        background-color: #ec5252;
    }
    .forget {
        position: absolute;
        bottom: -73px;
        right: 60px;
        font-size: 18px;
        color: #000;
        z-index: 200;
    }
}

#login {
    // background-color: #ec5252;
    background-color: #bfbfbf;
    // width: 480px;
    width: 40%;
    // float: left;
    height: 70px;
    font-size: 25px;
    color: #fff;
    border-radius: 5px;
    text-shadow: 1px 1px 1px #333;
    margin: 100px 45px 10px 0;
    float: right;
    line-height: 70px;
}

#login.active {
    background-color: #ec5252;
}

#newUser {
    width: 40%;
    height: 70px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    font-size: 25px;
    border-radius: 5px;
    margin: 100px 20px 10px 45px;
    border-color: #ec5252;
    background-color: #fff;
    color: #ec5252;
    line-height: 70px;
}

button {
    letter-spacing: 0.1em;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
}
</style>
