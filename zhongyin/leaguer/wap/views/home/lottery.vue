<template>
    <div class="myaward-content">
        <h2>提示</h2>
        <template v-if="success">
            <div class="award-name">恭喜！抽中 <strong>{{pname}}</strong></div>
            <div class="myaward-thumb">
                <img v-if="awardlevel==6" src="../../images/iphone-lg.png" alt="">
                <img v-if="awardlevel==7" src="../../images/huawei-lg.png" alt="">
                <img v-if="awardlevel==10" src="../../images/10yuan-lg.png" alt="">
                <img v-if="awardlevel==5" src="../../images/5yuan-lg.png" alt="">
                <img v-if="awardlevel==1" src="../../images/1yuan-lg.png" alt="">
            </div>
            <img class="btn-qulj" src="../../images/btn_qulj.png" alt="" @click="getAward">
        </template>
        <template v-if="fail">
            <p class="tips">{{lottermsg}}</p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="close">
        </template>
        <template v-if="lottering">
            <p class="tips">正在抽奖，请稍候~~</p>
            <img class="btn-qulj" src="../../images/btn_ok.png" alt="" @click="close">
        </template>
        <template v-if="generaluser">
            <p class="tips">抱歉，该活动仅限会员及首月免会员中次月续订用户参与，现在开通沃音乐会员和免费铃音盒，次月续订会员可以参与抽奖哦~~</p>
            <div class="btns">
                <img class="btn-kthy" src="../../images/btn_kthy.png" alt="" @click="openvip">
                <img class="btn-ok" src="../../images/btn_ok.png" alt="" @click="close">
            </div>
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
                success: false,
                fail: false,
                lottering: false,
                generaluser: false,
                pname: '',
                lottermsg: ''
			}
		},
        ready() {
            if(this.memberinfo.logined) {
                // if(this.memberinfo.membType == "2") {
                //     if(this.memberinfo.issym || this.memberinfo.code == "10005") {
                //         this.generaluser = true
                //         this.lottering = false
                //     }else {
                        
                //     }
                // }else{  
                //     this.generaluser = true
                // }

                // 获取抽奖机会次数
                api.newQueEveryDay(this, {usid: this.memberinfo.usid}, (back)=>{
                    if(back.repBody.code == "0") { // 可以抽奖
                        this.generaluser = false
                        this.lottering = true
                        api.newDoLucky(this, {usid: this.memberinfo.usid}, (back) => {
                            this.lottering = false
                            if(back.resCode == "0") {
                                if(back.repBody.length) {
                                    let award = back.repBody[0]
                                    this.awardlevel = award.prize
                                    this.pname = award.pname
                                    this.memberinfo.awardType = award.types
                                    this.memberinfo.gid = back.resMsg  // 奖品gid
                                    this.success = true
                                    this.fail = false
                                }
                                return
                            }

                            if(back.resCode == "1003") {
                                this.fail = true
                                this.lottermsg = "抱歉，未抽中奖品，请下个月再来参与哦~~"
                                return
                            }
                        })
                        return
                    }

                    if(back.repBody.code == "10005") { // 没有抽奖资格
                        this.generaluser = true
                        return
                    }

                    if(back.repBody.code == "10006") { // 已经抽奖
                        this.fail = true
                        this.lottermsg = "抱歉，您本月已抽过奖了，请下个月再来参与哦~~"
                        return
                    }

                })
            }else{
                this.$dispatch('showmodal', 'login')
            }
        },
		methods: {
			close() {
				this.$parent.close()
			},
            openvip() {
                this.$dispatch('showmodal', 'buyservice')
            },
            getAward() {
                this.$dispatch('showmodal', 'address')
			}
		}
	}
</script>
<style lang="scss">
@import "../../css/px2rem.scss";
.myaward-content {
    .award-name {
        margin-top: 10px;
        font-size: px2rem(48px);
    }

    .myaward-thumb {
        position: relative;
        margin: px2rem(30px) auto;
        width: px2rem(340px);
        height: px2rem(300px);
        background: #f8e3e6;
        box-shadow: -1px 2px 2px rgba(#000, .6);

        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .btn-qulj {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .null-award {
        margin: 50px auto;
        font-size: px2rem(48px);
        color: #ff281d;
    }

    .tips {
        text-align: left;
        margin: 50px auto;
        font-size: px2rem(40px);
    }
    .btns {
        margin-bottom: px2rem(40px);
        overflow: hidden;

        .btn-kthy {
            float: left;
        }

        .btn-ok {
            float: right;
        }
    }
}
</style>