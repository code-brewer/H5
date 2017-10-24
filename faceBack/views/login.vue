<template>
    <div>
        <top-logo></top-logo>
        <div class="box">
            <div class="logo">
            </div>
            <div class="login">
                <div class="form-group position">
                    <label for="exampleInputName2">账号：</label>
                    <input type="text" class="form-control myID" id="exampleInputName2" v-el:account>
                </div>
                <div class="form-group position">
                    <label for="exampleInputEmail2">密码：</label>
                    <input type="password" class="form-control myID" id="exampleInputEmail2" @keyup.13="login" v-el:pw>
                </div>
                <!-- <button @click="login">登录</button> -->
                <button type="button" class="btn btn-primary btn-lg btn-block " :class="{disabled : islogining}" @click="login" :disabled="islogining">登录</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.box {
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -212.5px;
    // margin-top: -229px;
    transform: translate( -50% -50%);
    width: 425px;
    height: 458px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    // border-width: 1px;
    // border-style: solid;
    // border-color: rgba(121, 121, 121, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    text-align: center;
    .position {
        transform: translateX(-20px);
        // position: relative;
        // label {
        //  position: absolute;
        //  left: 10px;
        //  top: 6px;
        // }
    }
    .myID {
        width: 70%;
        display: inline-block;
    }
    .logo {
        height: 40%;
        position: relative;
        background: url(../images/logo.png) no-repeat center;
        background-size: 70%;
        margin-bottom: 20px;
        //      img {
        // position: absolute;
        // top: 5px;
        // left: 5px;
        //      }
        p {
            img {
                vertical-align: bottom;
                padding-right: 10px;
                margin-left: 5px;
                margin-top: 6px;
            }
            position: absolute;
            width: 100%;
            bottom:60px;
            height: 42px;
            font-size: 36px;
            text-align: center;
        }
    }
    .Id,
    .password {
        position: relative;
        text-align: center;
        img {
            position: absolute;
            margin-top: 5px;
            margin-left: 6px;
        }
        input {
            width: 300px;
            height: 36px;
            font-family: 'Arial Normal', 'Arial';
            font-weight: 400;
            font-style: normal;
            font-size: 13px;
            text-decoration: none;
            color: #000000;
            color: rgb(153, 153, 153);
            text-align: left;
            border: 1px solid #ccc;
            padding-left: 30px;
            box-sizing: border-box;
        }
    }
    .password {
        margin-top: 20px;
    }
    button {
        width: 236px;
        height: 36px;
        margin: 50px auto;
        line-height: 6px;
    }
}
</style>
<script type="text/javascript">
import topLogo from '../components/top.vue'
import api from '../api/index.js'
export default {
    components: {
        topLogo,
    },
    data() {
        return {
            islogining: false,
        }
    },
    methods: {

        login() {
            this.islogining = true;
            var account = this.$els.account.value;
            var pw = this.$els.pw.value
            if (account.length === 0 || pw.length === 0) alert('请输入账号密码')
            api.login(this, {
                "pkAcct": account, //必填，用户名
                "pass": pw //必填，密码
            }, res => {
                this.islogining = false;
                if (res.repBody === "登录成功") {
                    this.$dispatch('login', account)
                } else {
                    window.alert(res.repBody)
                }

            })

        },
    }
}
</script>
