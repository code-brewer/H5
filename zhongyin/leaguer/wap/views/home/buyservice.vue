<template>
    <div class="login-content">
        <template v-if="newmemb">
            <h2>沃音乐会员权益</h2>
            <div class="qy-container">
                <div class="qy-item">
                    <span class="thumb thumb-1"></span>
                    <span class="text">歌曲、MV免流量不限量播放下载</span>
                </div>
                <div class="qy-item">
                    <span class="thumb thumb-2"></span>
                    <span class="text">单曲炫铃免费订购、任意更换</span>
                </div>
                <div class="qy-item">
                    <span class="thumb thumb-3"></span>
                    <span class="text">使用WAP门户、手机端流量全免</span>
                </div>
                <div class="qy-item">
                    <span class="thumb thumb-4"></span>
                    <span class="text">明星演唱会、见面会抢先福利</span>
                </div>
            </div>
            <p class="qy-tips">温馨提示: <br>1.活动期间，新用户首次开通可享受首月免会员资费优惠。<br>2.全国4G用户沃音乐会员6元/月，免费送炫铃功能；2/3G炫铃用户沃音乐会员1元/月;<br>3.2/3G非炫铃用户可开通1元沃音乐特惠会员+5元炫铃功能</p>
            <img class="btn-qulj" src="../../images/btn-mskt.png" alt="" @click="openNow">
        </template>
        <template v-if="buyinfo">
            <h2>提示</h2>
            <p class="buyinfo">{{memberinfo.mobile}}您好，欢迎开通沃音乐会员(6元/月，开通当月免费，次月正常收取费用)，开通后可立即享有会员权益。</p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="buyService">
            <p class="buyinfo-tips">（开通会员需默认开通炫铃功能，如您已经支付5元/月炫铃功能费，则需花1元即可成为会员，会员最高收费6元/月）</p>
        </template>
        <template v-if="successinfo">
            <h2>提示</h2>
            <p class="buyinfo">开通会员成功，您已享有音乐会员权益，免费铃音盒已放入你的帐户中，可在官网<a href="http://box.10155.com/Club/portal/omp.do?act=orderManage">个人中心</a>查看，次月续订会员还可参与第二波礼包活动，100%获奖哦~</p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="buySuccess">
            <p class="buyinfo-tips">（由于网络延迟原因，部分用户开通会员无法立即生效，请过段时间再查询）</p>
        </template>
        <template v-if="faild">
            <h2>订购失败</h2>
            <p class="buyinfo">抱歉亲，订购失败了，请重试！（如重试后失败，可拨打客服电话：<a href="tel:10010">10010</a>进行咨询）</p>
            <img class="faild-img" src="../../images/faild.png" alt="">
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="buyFaild">
        </template>
        <template v-if="ismusic">
            <h2>提示</h2>
            <p class="buyinfo">您已是沃音乐会员，请勿重复开通！</p>
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
                newmemb: false,
                buyinfo: false,
                successinfo: false,
                faild: false,  // 开通失败
                ismusic: false  // 重复开通
			}
		},
        ready() {
            if(this.memberinfo.isMusicmemb || this.memberinfo.membType == "2") {
                this.ismusic = true // 已开通会员
            }else{
                this.newmemb = true // 未开通会员
            }
        },
		methods: {
			close() {
				this.$parent.close()
			},
            buyService() {
                // 订购会员
                api.openMemberByNet(this, {channle: window.channle, usid: this.memberinfo.usid}, (back) => {
                    if(back.resCode == "0") {
                        this.buyinfo = false
                        this.faild = false
                        this.successinfo = true
                        this.memberinfo.isMusicmemb = true
                        this.memberinfo.membType = "2"
                        utils.addcookie('memberinfo', window.JSON.stringify(this.memberinfo), 24)
                    }else{
                        this.successinfo = false
                        this.buyinfo = false
                        this.faild = true
                    }
                })

                // 开通信息确认
				api.addAcceptLog(this, {type: 'button', button_name: 'queren'}, (back)=>{})
                submitStatInfo(base_url, base_url, 'queren_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
            },
            openNow() {
                if(this.memberinfo.isMusicmemb) {
                    this.newmemb = false
                    this.ismusic = true
                }else{
                    this.newmemb = false
                    this.buyinfo = true
                }
                // 马上开通
				api.addAcceptLog(this, {type: 'button', button_name: 'kaitong'}, (back)=>{})
                submitStatInfo(base_url, base_url, 'kaitong_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
            },
            buyFaild() {
                this.close()
                this.faild = false
                this.newmemb = true
            },
            buySuccess() {
                this.close()
                this.successinfo = false
                this.ismusic = true
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
            font-size: px2rem(40px);
            line-height: 1.8;
        }

        .qy-container {
            padding: px2rem(30px);
            overflow: hidden;

            .qy-item {
                
                float: left;
                width: 50%;
                text-align: center;

                .thumb {
                    display: block;
                    margin: 0 auto;
                    width: px2rem(140px);
                    height: px2rem(140px);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;

                    &.thumb-1 {
                        background-image: url(../../images/qyi-1.png);
                    }
                    &.thumb-2 {
                        width: px2rem(180px);
                        height: px2rem(140px);
                        background-image: url(../../images/qyi-2.png);
                    }
                    &.thumb-3 {
                        background-image: url(../../images/qyi-3.png);
                    }
                    &.thumb-4 {
                        background-image: url(../../images/qyi-4.png);
                    }
                }

                .text {
                    padding: 0 px2rem(20px) px2rem(20px);
                    display: block;
                    font-size: px2rem(36px);
                }
            }
        }

        .qy-tips {
            text-align: left;
            margin-top: px2rem(10px);
            font-size: px2rem(36px);
        }

        .buyinfo {
            text-align: left;
            font-size: px2rem(42px);

            a {
                color: #f90b12;
                text-decoration: none;
            }
        }
        .buyinfo-tips {
            text-align: left;
            font-size: px2rem(36px);
        }

        .faild-img {
            display: block;
            margin: 0 auto;
        }
    }
</style>