<template>
	<div class="main-container" :class="{'ismember': memberinfo.membType == 2}">
		<div class="openform-container">
            <img src="../images/openform-bg.png" alt="">
            <form id="openform" action="">
                <input type="tel" v-model="tel" @keyup="verifyTel" placeholder="请输入联通手机号码">
                <button type="button" :disabled="disablecode" @click="getCode">{{btnTxt}}</button>
                <input type="tel" v-model="code" placeholder="请输入验证码">
            </form>
            <a href="javascript:;" id="btn-openvip" @click="getMember">立即开通</a>
        </div>
        <div class="products-container">
            <img src="../images/products.png" alt="">
            <p>
                您已经是会员, <br>订购了
                <span v-for="item in productItems">
                    {{products[item]}}
                </span>产品
            </p>
        </div>
        <img src="../images/vip-details.png" alt="" id="vip-details">
        <easier-modal :show.sync="showmodal">
			<component :is="currentmodal"></component>
		</easier-modal>
	</div>
</template>
<script>
    import api from '../api/index.js'
    import easierModal from '../components/Modal/easier-modal.vue'
    import login from './home/login.vue'
	import buyservice from './home/buyservice.vue'
    import utils from '../utils/index.js'

    var products = {
        '0000001620': '沃音乐高级会员-1',
        '0000001623': '沃音乐高级会员-2',
        '0000001622': '沃音乐特惠会员1元-1',
        '0000001625': '沃音乐特惠会员1元-2',
        '0000002109': '沃音乐高级会员（首月免）-1',
        '0000001619': '沃音乐特惠会员1元（首月免）'
    }

	export default {
        components: {
            easierModal,
            login,
            buyservice
        },
		data() {
			var memberinfo = window.memberinfo
			return {
				memberinfo,
				showmodal: false,
				currentmodal: '',
				tel: '',
                code: '',
                disablecode: true,
                btnTxt: '点击获取验证码',
                timer: '',
                productItems: [],
                products: products
			}
		},
		ready() {
            // 添加访问日志
            if(window.memberinfo.aid) {
			    api.addAcceptLog(this, {type: 'signin', source: 'kaitong'}, (back)=>{})
                submitStatInfo(base_url+'kthy', base_url+':all', 'bottom_kthy_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
            }

            if(memberinfo.mobile) {
                this.tel = memberinfo.mobile
                this.disablecode = false
            }

            if(this.memberinfo.membType == "2") {
               this.showUserProduct() 
            }
		},
        methods: {
            showModal(c) {
				this.showmodal = true
				this.currentmodal = c
			},
            getMember() {
                // 立即领取
				api.addAcceptLog(this, {type: 'button', button_name: 'kaitong'}, (back)=>{
					
				})

                if(this.timer) {
                    clearInterval(this.timer)
                    this.disablecode = false
                    this.btnTxt = "点击获取验证码"
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
                        submitStatInfo(base_url+'kthy', base_url+':all', 'yanzheng_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url+'kthy', '', 'aid=1')

                        switch(this.memberinfo.membType) {
                            case "1": // new
                                this.showModal('buyservice')
                                break
                            default: 
                                this.memberinfo.isMusicmemb = true
                                this.showModal('buyservice')
                        }
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
                        this.btnTxt = "点击获取验证码"
                    }else{
                        seconds--
                        this.btnTxt = "重新获取("+seconds+"s)"
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
                        this.btnTxt = "点击获取验证码"
                    }
                    this.disablecode = false
                }
            },
            showUserProduct() {
                api.getUserProductId(this, {mobile: this.memberinfo.mobile, channle: window.channle, usid: this.memberinfo.usid}, (back) => {
                    if(back.resCode == "0") {
                        this.productItems = back.repBody
                    }else{
                        console.log(back.resMsg)
                    }
                })
            }
        },
        watch: {
            'memberinfo.membType' (v, o) {
                if(v=="2") { // 已订购
                    this.showUserProduct()
                }
            }
        }
	}
</script>
<style lang="scss">
	@import "../css/px2rem.scss";
	@import "../css/style.scss";

    .main-container {
        padding-top: px2rem(500px);
        padding-bottom: px2rem(200px);
        height: 100%;

        &.ismember {

            .openform-container {
                display: none;
            }

            .products-container {
                display: block;
            }
        }
    }

    .openform-container,
    .products-container {
        position: relative;
        text-align: center;
    }

    .products-container {
        margin-top: -40px;
        display: none;

        p {
            position: absolute;
            width: 260px;
            top: 160px;
            left: 50%;
            margin-left: -130px;
            text-align: center;
            font-size: 30px;
            color: #652a1e;
            font-size: 25px;
        }
    }
    

    #openform {
        position: absolute;
        top: px2rem(80px);
        left: 50%;
        transform: translateX(-50%);
        width: px2rem(500px);

        input,
        button {
            padding: 0 20px;
            margin-top: px2rem(30px);
            display: block;
            width: 100%;
            height: px2rem(90px);
            border: none;
            border-radius: 10px;
            box-shadow: inset 2px 2px 5px rgba(#000, .3);
            font-size: px2rem(36px);
        }

        button {
            background: linear-gradient(to bottom, #fffac2 0%, #fdb717 100%);
            box-shadow: 2px 2px 5px rgba(#000, .3);
            color: #a4400f;

            &[disabled] {
                background: linear-gradient(to top, #eee 0%, #cacaca 100%);
                color: #949494;
            }
        }
    }
    #btn-openvip {
        display: block;
        position: absolute;
        top: px2rem(500px);
        left: 50%;
        transform: translateX(-50%);
        width: px2rem(360px);
        height: px2rem(90px);
        background: url(../images/btn_ljkt.png) no-repeat center;
        background-size: contain;
        text-indent: -9999em;
    }

    #vip-details {
        display: block;
        margin: px2rem(30px) auto px2rem(180px);
    }
</style>