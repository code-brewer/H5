<template>
    <div class="introduce-container">
        <div class="intr-content">
            <p>开通沃音乐会员后，您将享受到下列权益：在沃音乐门户上免费播放、下载歌曲和MV；订购炫铃单曲免费，获得1个免费的会员专享铃音盒；免流量使用沃音乐手机客户端和沃音乐wap门户；优先获得沃音乐提供的明星演唱会、歌友会、见面会的机会。
            </p>
            <ul>
                <li>
                    <p>全国2/3G炫铃用户开通沃音乐会员资费1元/月，全国2/3G非炫铃用户和全国4G用户开通会员资费6元/月。</p>
                </li>
                <li>
                    <p>目前4G用户退订沃音乐高级会员会将炫铃功能一同退订，需要炫铃功能的4G用户只需在沃音乐门户上单独开通即可。</p>
                </li>
                <li>
                    <p>除广东、上海、吉林、甘肃以外的2/3G非炫铃用户开通沃音乐会员产品，话单上会显示“5元炫铃功能”和“1元沃音乐特惠会员”两项产品。</p>
                </li>
                <li>
                    <p>用户开通“沃音乐会员”业务生效后，根据不同省分的不同网络收取相应的包月信息费，包月权益按自然月为用户提供服务；用户当月重复开通、退订，只收取1次包月费用。</p>
                </li>
                <li>
                    <p>会员用户在沃音乐wap门户和客户端上享受流量包月服务，2G/3G用户上网流量上限为6G，当月流量超出上限后，联通将自动关闭上网功能，下月自动开通；4G用户包含6G定向流量包，超出部分按照用户所选套餐标准收取流量费。</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import api from '../api/index.js'
export default {
    data() {
        return {}
    },
    ready() {
        // 添加访问日志
        if (window.memberinfo.aid) {
            api.addAcceptLog(this, { type: 'signin', source: 'jieshao' }, (back) => { })
            submitStatInfo(base_url, base_url + ':all', 'bottom_hyjs_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
        }
    }
}
</script>
<style lang="scss">
@import "../css/px2rem.scss";
@import "../css/style.scss";

.introduce-container {
    background: url(../images/introduce-bg.jpg) no-repeat top left;
    background-size: 100% auto;
    overflow: hidden;
}

.intr-content {
    margin: px2rem(1560px) px2rem(100px) px2rem(200px);

    p {
        margin-bottom: px2rem(20px);
        font-size: px2rem(36px);
        line-height: 1.8;
        color: #fff;
    }

    li {
        position: relative;

        &::before {
            position: absolute;
            left: -15px;
            top: 13px;
            content: ' ';
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fff;
        }
    }
}
</style>