<template>
    <div class="myaward-content">
        <h2>我的奖品</h2>
        <template v-if="award">
            <div class="award-name">{{awardname}}</div>
            <div class="myaward-thumb">
                <img v-if="awardlevel==6" src="../../images/iphone-lg.png" alt="">
                <img v-if="awardlevel==7" src="../../images/huawei-lg.png" alt="">
                <img v-if="awardlevel==10" src="../../images/10yuan-lg.png" alt="">
                <img v-if="awardlevel==5" src="../../images/5yuan-lg.png" alt="">
                <img v-if="awardlevel==1" src="../../images/1yuan-lg.png" alt="">
            </div>
            <img class="btn-qulj" src="../../images/btn_qulj.png" alt="" @click="getAward">
        </template>
        <template v-if="nullaward">
            <div class="null-award">暂无奖品</div>
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
                award: false,
                nullaward: false,
                getaward: false,
                awardlevel: 0
			}
		},
        ready() {
            this.nullaward = true
            // 获取我的奖品
            api.myPrizeDrawResult(this, {usid: this.memberinfo.usid}, (back) => {
                if(back.resCode == "0") {
                    if(back.repBody.length) { // 奖品不为空
                        let award = back.repBody[0]
                        this.awardlevel = award.prize
                        this.awardname = award.pname
                        this.memberinfo.awardType = award.types
                        this.memberinfo.gid = award.gid
                        this.award = true
                        this.nullaward = false
                    }else{
                        this.award = false 
                        this.nullaward = true
                    }
                }else{
                    this.nullaward = false
                    alert('查询失败，请稍候再试')
                }
                
            })
        },
		methods: {
			getAward() {
                this.$dispatch('showmodal', 'address')
			},
            close(){
                this.$parent.close()
            }
		},
        watch: {
            'memberinfo.award' (v, o) {
                console.log(v)
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
        margin: 40px auto;
        font-size: px2rem(48px);
        color: #ff281d;
    }
}
</style>