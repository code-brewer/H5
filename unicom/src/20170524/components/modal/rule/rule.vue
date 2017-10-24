<template>
    <Modal :show="show" @close="close">
        <div class="rule" slot="content">
            <h3>活动规则</h3>
            <p><i>1、</i>活动时间: <span class="red">2017年7月1日至2017年7月31日</span>。</p>
            <p><i>2、</i>本次活动为回馈沃音乐会员福利，仅限会员用户参与获得奖品。</p>
            <p><i>3、</i>活动期间会员用户可获得<span class="red">1次抽奖机会</span>，会员用户<span class="red">中奖概率100%</span>。</p>
            <p><i>4、</i>活动期间新用户首次开通会员首月免会员资费，次月正常收取。开通会员需默认开通炫铃功能，全国4G用户和广东、上海、吉林、甘肃的2G/3G用户可免费开通，其余省的2G/3G未开通炫铃功能的用户确定后将开通炫铃功能（收取5元/月费用）。</p>
            <p><i>5、</i>活动结束<span class="red">10个工作日内</span>，奖品将统一派发给中奖者，奖品派发前取消会员的中奖用户将被取消派奖资格，活动期间请务必在页面填写正确领奖信息。（VR一体机中奖用户领奖时需提供个人身份证明以便核验）</p>
            <p><i>6、</i>如出现违规作弊行为，经查实，取消参加活动资格。</p>
            <p><i>7、</i>本次活动最终解释权归联通沃音乐平台所有。</p>
        </div>
    </Modal>
</template>
<script>
    import utils from '../utils.js'
    export default {
        mixins: [utils]
    }
</script>
<style lang="scss" scoped>
    .rule {
        color: #333;
        font-size: 28px;
        h3 {
            font-size: 34px;
        }
        p {
            position: relative;
            padding-left: 30px;
            padding-bottom: 10px;
            line-height: 1.5;
        }
        i {
            position: absolute;
            top: 0;
            left: 0;
            font-style: normal;
        }
        .red {
            color: red;
        }
    }
</style>
