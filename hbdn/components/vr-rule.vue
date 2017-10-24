<template>
    <section class="model" v-show="isShow" style="background: rgba(0,0,0,0.5)">
        <div class="panel">
            <div class="msg" style="top: 20px;">
                <div class="messagebg" style="font-size: 26px">
                    <h2>VR体验券使用规则</h2>
                    <p class="p" style="margin-top: 30px;">
                        用户凭借收到的券码或所填手机号码至逸度<br>空间 VR 主题公园前台验证，通过验证后即<br>可免费体验。（每人限用一张，不可叠加使用，该券仅限指定项目使用。）
                    </p>
                    <p class="p">营业时间：9:00-21:00</p>
                    <p class="p">逸度空间VR主题公园地址：湖北武汉市龟山北路1号汉阳造创意产业园22栋</p>
                    <p class="p">1. 公园内所有游乐项目均需排队，建议周一到周五前来体验，避免因周末游客过多导致排队时间太长，影响您的游戏体验</p>
                    <p class="p">2. 园内部分体验项目不适合50岁以上人员，高血压、动脉硬化、心脏病患者、孕妇、脊椎及颈椎病、癫痫病、带石膏者、外伤缝合者、头晕者、习惯性流鼻血、畏高症以及使用麻醉止痛药物和饮酒者乘坐。有上述病情或症状者，请自行确认,选择其他适合项目，否则，如导致不良后果，公园不负担任何责任。详情请见具体项目提示。</p>
                    <a class="btn" style="background: url(images/btnbg.png)" @click="closeMsg">
							确定
		   				</a>
                    <img :src="'images/xx.png'" @click="closeMsg" class="close">
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        isShow: {
            Boolean,
            default: false,
        }
    },
    methods: {
        closeMsg() {
            this.isShow = false;
        }
    },

}
</script>
<style lang="sass" scoped>
video {
    width: 100%;
}
.model .panel .msg p.p {
	padding-left: 20px;
	padding-right: 20px;
	text-align: left;
}
</style>
