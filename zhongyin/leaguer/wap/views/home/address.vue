<template>
    <div class="login-content">
        <template v-if="addresstmpl">
            <h2>收货信息</h2>
            <div class="input">
                <label for="phone">姓名:</label>
                <input type="text" v-model="username" value="" placeholder="">
            </div>
            <div class="input">
                <label for="phone">手机号码:</label>
                <input type="tel" v-model="mobile" value="" placeholder="">
            </div>
            <div class="input">
                <label for="phone">收货地址:</label>
                <textarea v-model="address"></textarea>
            </div>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="addAddress">
        </template>
        <template v-if="sendinfo">
            <h2>提示</h2>
            <p>话费奖品于中奖后五个工作日内充值到用户手机号码中、手机奖品下个月15前统一发放。</p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="close">
        </template>
        <template v-if="gotaward">
            <h2>提示</h2>
            <p>您已经领过奖了~</p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="close">
        </template>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    export default {
		data() {
            var memberinfo = window.memberinfo
			return {
                memberinfo,
                username: '',
                mobile: '',
                address: '',
                sendinfo: false,
                addresstmpl: false,
                gotaward: false
			}
		},
        ready() {
            // 获取奖品是否领取状态
            api.bindPrizeMobile(this, {gid: this.memberinfo.gid, mobile: this.mobile, username: this.username, addr: this.address, usid: this.memberinfo.usid}, (back) => {
                if(back.resCode == "0"){ // 未领取
                    if(this.memberinfo.awardType != '虚拟') {  // 实物
                        this.addresstmpl = true
                    }else{
                        // 领取虚拟奖品
                        api.getPrize(this, {gid: this.memberinfo.gid, mobile: this.mobile, username: this.username, addr: this.address, usid: this.memberinfo.usid}, (back) => {
                            this.sendinfo = true
                            this.addresstmpl = false
                            this.gotaward = false
                        })
                    }
                }else{ // 已领取
                    this.sendinfo = false
                    this.addresstmpl = false
                    this.gotaward = true
                }
            })
        },
		methods: {
			addAddress() {
                // 添加收货地址
                if(this.username == "" || this.username.trim().length == 0){
                    alert('请填写姓名')
					return;
				}

                if(this.mobile.length != 11 || !(/^\d+$/.test(this.mobile))){
                    alert('请填写正确的手机号码')
					return;
				}

                if(this.address == "" || this.address.trim().length == 0){
                    alert('请填写收货地址')
					return;
				}
                // 领取实物奖品
                api.getPrize(this, {gid: this.memberinfo.gid, mobile: this.mobile, username: this.username, addr: this.address, usid: this.memberinfo.usid}, (back) => {
                    this.addresstmpl = false
                    this.sendinfo = true  
                })
			},
            close(){
                this.$parent.close()
            }
		}
	}
</script>
<style lang="scss">
@import "../../css/px2rem.scss";
.login-content {
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

        input,
        textarea {
            float: left;
            display: block;
            padding: 0 10px;
            margin-left: px2rem(10px);
            width: px2rem(450px);
            height: px2rem(86px);
            font-size: px2rem(32px);
        }

        textarea {
            height: px2rem(186px);
        }
    }
    .btn-qulj {
        margin-top: 40px;
    }
    p {
        text-align: left;
        margin-top: px2rem(20px);
        font-size: px2rem(46px);
        line-height: 1.8;
    }
}   
</style>