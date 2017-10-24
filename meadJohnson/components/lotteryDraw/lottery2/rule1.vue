<template>
    <modal :show.sync="show" :bg="false">
        <div class="choujiang-rule">
            <h2>活动规则</h2>
            <div class="con ">
                 <div class="items">
                    <p>活动时间：</p>
                    <p>即日起至2017年05月31日</p>
                </div>
                <div class="items">
                    <p>活动奖品：</p>
                    <p>一等奖：飞利浦 扫地机器人</p>
                    <p>二等奖：奥佳华 按摩坐垫</p>
                    <p>三等奖：睡眠博士 乳胶枕一对</p>
                    <p>四等奖：德尔玛 家用加湿器</p>
                    <p>五等奖：50元手机话费</p>
                    <p>六等奖：50贝壳币</p>
                </div>
                <div class="items">
                    <p>活动规则</p>
                    <p>1、本月每成功邀请3位好友首次关注花妈，即可获得1次抽奖机会，每月限10次！如完成第3位、第6位、第9位好友（以此类推）邀请后，即可参与抽奖；</p>
                    <p>2、一等奖至四等奖（即实物奖）获得者，花贝妈妈将在用户中奖后，于十五个工作日内安排奖品寄送；</p>
                    <p>3、50元手机话费中奖用户，请认真核对手机号码，如因个人信息提供错误，造成的损失，由本人承担，公众号平台将不予重新充值；</p>
                    <p>4、50贝壳币获得者，系统会在1个工作日内自动发送到您的账号，可在<a v-link="{path: '/myConchCoin'}">【我的贝壳币】</a> 中查询贝壳币明细；首次关注花贝妈妈，每位用户送100贝壳币，所得贝壳币可在<a v-link="{path: '/presentList'}">【贝壳币商城】</a> 免费兑换相应礼品；</p>
                    <p>5、所有中奖用户请在3日内留下你的领奖信息，以便奖品及时派发，逾期不候。</p>
                    
                </div>
                <div class="items">
                    <p>规则如有疑问，请在公众号对话框以:"客服+你的问题"或者添加花妈小助手微信：hbmm_001进行咨询，我们会尽快回复哒。</p>
                </div>
                <div class="items" style="padding:20px 0px 10px;">
                    <p>*本活动最终解释权归花贝妈妈公众号所有。</p>
                </div>
            <a href="javascript:;" class="close" @click="show = false"></a>
        </div>
    </modal>
</template>
<script>
import Modal from '../../Modal.vue'

export default {
    components: {
        Modal
    },
    props: {
        show: false
    },
    watch: {
        show(val) {
            this.$dispatch('setOverflow', val);
        }
    }
}
</script>
<style lang="scss">
.choujiang-rule {
        border-radius: 15px;
        background: white;
        text-align: left;
        h2 {
            padding: 20px 0;
            font-size: 30px;
                background: red;
    color: #fff;
            font-weight: 400;
            text-align: center;
            border-radius: 15px 15px 0 0;
            
        }
        .con {
            height: 600px;
            padding: 0 30px;
            border-radius: 0 0 15px 15px;
            overflow-y: auto;
        }
        .items {
            padding: 10px 0;
            font-size: 24px;
            line-height: 2;
            strong {
                font-weight: 400;
                color: #43a4ae;
            }
            p {
                color: #787878;
                line-height: 1.7;
                padding: 5px 0;
            }
            a {
                color:#f88431;
                word-break: break-all;
                font-size: 24px;
            }
        }
        .close {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 46px;
            height: 46px;
            background: url(../../../images/recommend/recommend_close2.png) no-repeat;
        }
    }
    .modal {
        .modal-content {
            overflow: initial;
        }
    }
</style>
