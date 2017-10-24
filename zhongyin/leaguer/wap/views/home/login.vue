<template>
    <div class="login-content">
        <template v-if="logined">
            <i class="logo"></i>
            <h2>身份验证</h2>
            <div class="input">
                <label for="phone">手机号码:</label>
                <input type="tel" v-model="tel" value="" @keyup="verifyTel" placeholder="请输入联通手机号码">
            </div>
            <div class="input">
                <label for="phone">验证码:</label>
                <input type="tel" class="code" v-model="code" value="" placeholder="短信验证码">
                <button class="get-code" v-bind:disabled="disablecode" @click="getCode">{{btnTxt}}</button>
            </div>
            <img class="btn-qulj" src="../../images/btn-login.png" alt="" @click="login">
        </template>
        <template v-if="oldmember">
            <h2>提示</h2>
            <p>
                抱歉，您已是沃音乐会员，第一波会员礼包仅限非会员用户领取哦，参与第二波会员礼包，100%中奖惊喜等你拿！
            </p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="close">
        </template>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import utils from '../../utils/index.js'
    export default {
        props: {
            currentcomp: {
                type: String,
                default: ''
            }
        },
        data() {
            var memberinfo = window.memberinfo
			return {
                memberinfo,
				tel: '',
				logined: false,
				oldmember: false,
                code: '',
                source: '',
                disablecode: true,
                btnTxt: '获取',
                timer: ''
			}
		},
        ready() {
            if(this.memberinfo.membType == "2") {
                this.oldmember = true
            }else{
                this.logined = !memberinfo.logined
            }
        },
		methods: {
			close() {
				this.$parent.close()
			},
            login() {
                if(this.timer) {
                    clearInterval(this.timer)
                    this.disablecode = false
                    this.btnTxt = "获取"
                }

                if(this.tel.length != 11 || !(/^\d+$/.test(this.tel))){
                    alert('请输入正确的手机号码')
					return;
				}
                
				if(this.code == '' || this.code.length == 0){
					alert("请输入验证码")
					return;
				}

                api.loginForH5(this, {mobile: this.tel, code: this.code, channle: window.channle, usid: this.memberinfo.usid}, (back) => {
                    if(back.resCode == "0") { // 登录成功
                        this.memberinfo.logined = true
                        this.memberinfo = memberinfo
                        this.memberinfo.membType = back.repBody.ismember
                        this.memberinfo.award = back.repBody.award
                        this.memberinfo.mobile = back.repBody.mobile
                        this.memberinfo.code = back.repBody.code
                        this.memberinfo.issym = back.repBody.issym
                        this.memberinfo.usid = back.repBody.usid
                        
                        utils.addcookie('memberinfo', window.JSON.stringify(this.memberinfo), 24)

                        // 用户成功验证
                        api.addAcceptLog(this, {type: 'isvalidate', source: 'isvalidate'}, (back)=>{})
                        submitStatInfo(base_url, base_url, 'yanzheng_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
                        this.close()
                        return
                    }

                    if(back.resCode == "40001") {
                        this.memberinfo.logined = false
                        alert("验证码错误或已过时")
                        return
                    }
                    
                })
            },
            getCode() {
                this.disablecode = true
                var seconds = 60
                this.timer = setInterval(()=>{
                    if(seconds == 0) {
                        clearInterval(this.timer)
                        this.disablecode = false
                        this.btnTxt = "获取"
                    }else{
                        seconds--
                        this.btnTxt = seconds+"s"
                    }
                }, 1000)

                api.sendLoginCode(this, {mobile: this.tel, channle: window.channle, usid: this.memberinfo.usid}, (back) => {
                    if(back.resCode == 0) {
                        // this.code = back.repBody.returnCode
                        // this.code = back.returnCode
                    }else{
                        // alert(back.resMsg)
                    }
                })
            },
            verifyTel() {
                if(this.tel.length != 11 || !(/^\d+$/.test(this.tel))){
					this.disablecode = true
				}else{
                    if(this.timer) {
                        clearInterval(this.timer)
                        this.btnTxt = "获取"
                    }
                    this.disablecode = false
                }
            }
		},
        watch: {
            'memberinfo.logined' (v, o) {
                if(v) {
                    this.logined = false
                    this.oldmember = true
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../css/px2rem.scss";
    .login-content {
        .logo {
            position: absolute;
            top: 10px;
            left: 10px;
            width: px2rem(186px);
            height: px2rem(62px);
            background: url(../../images/logo.png) no-repeat center;
            background-size: contain;
        }
        .input {
            width: px2rem(700px);
            margin: px2rem(40px) auto 0;
            overflow: hidden;

            label {
                padding-top: px2rem(8px);
                float: left;
                text-align: right;
                width: px2rem(200px);
                font-size: px2rem(42px);
            }

            input {
                float: left;
                display: block;
                padding: 0 10px;
                margin-left: px2rem(10px);
                width: px2rem(450px);
                height: px2rem(86px);
                font-size: px2rem(32px);
                &.code {
                    width: px2rem(260px);
                }
            }

            .get-code {
                display: block;
                margin-left: px2rem(10px);
                float: left;
                width: px2rem(180px);
                height: px2rem(86px);
                background: #f23027;
                color: #fff;
                border-radius: 4px;
                font-size: px2rem(40px);
                border: none;

                &[disabled] {
                    background: #ccc;
                }
            }
        }
        .btn-qulj {
            margin-top: 40px;
        }

        p {
            margin-top: px2rem(20px);
            font-size: px2rem(46px);
            line-height: 1.8;
        }
    }
</style>