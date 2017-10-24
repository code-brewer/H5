<template>
    <div class="bgPage">
        <article-scrap :options="options"></article-scrap>
    </div>
</template>
<script>
import articleScrap from '../components/article.vue'

export default {
    components: {
        articleScrap
    },
    data() {
        return {
            options: {
                title: ['趣', '味', '带', '娃'],
                list: [{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483739&idx=1&sn=262517eb5b02bb44727ba1122de13890&chksm=97b52fbba0c2a6adc45724eddcdfbf5812b36cf9e2de471a66c4c916b7a29b163c48122ce6f3&scene=4#wechat_redirect',
                    text: '姓郑叫“郑大钱”！这些宝宝昵称太搞笑了',
                    id: 58
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485262&idx=1&sn=99a2a4db1523084c31a58b6cf31bb365&chksm=e91ade8dde6d579b55f9690ef6d94c11cdf5ed65bbd96b1025bddced00f4f89b4e691e0e20ed&scene=4#wechat_redirect',
                    text: '万圣节丨这一定是一个父母们报复熊孩子的狂欢节~',
                    id: 58
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485009&idx=1&sn=862102d14c9c2581cd9decc1e583d812&chksm=e91adf92de6d56842842b4974ec6aa628b2748fb4a3ff96f12a26a389a81e4b4212929a14146&scene=21#wechat_redirect',
                    text: '这些判断生男生女的方法你都用过吗？其实真相是这样的。',
                    id: 51
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484939&idx=2&sn=8e571ea0b9ac31207b81202382a0a876&chksm=e91adfc8de6d56de298df86d5eb968c90119380bd652a566e7b9447ed3cc166aa3c40f2ca2ce&scene=21#wechat_redirect',
                    text: '看着就想笑的宝宝搞笑表情包来啦~',
                    id: 50
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484883&idx=3&sn=ccbfbe575b2653c335aee105bf806b8b&chksm=e91adc10de6d55066ee1d447413c888c295ce994d0eb8e91c35a6284ccb5fea97bdf300ed5af#rd',
                    text: '祖国秋色如此美，国庆带娃去看看——秋季旅游最值得去的地方大盘点',
                    id: 47
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484592&idx=2&sn=46e82122ba5387528ffaaaabdb2feef2&scene=0#wechat_redirect',
                    text: '当妈之后易患的高发病症，现在预防还来得及',
                    id: 28
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484499&idx=2&sn=57152c9c061282a0a51e40ab55096033&scene=21#wechat_redirect',
                    text: '小绿植不必买，这么简单就让家里变得生机勃勃美美哒',
                    id: 27
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484378&idx=4&sn=9f41c0e920ee65b18bab854e954eebc6&scene=21#wechat_redirect',
                    text: '生女儿的福利，给她打扮成美美的小妖精',
                    id: 26
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484302&idx=3&sn=1afb5ad97e3b34857c45776157efbcd5&scene=21#wechat_redirect',
                    text: '告别low妈，高逼格晒娃',
                    id: 25
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484178&idx=3&sn=cc86774880bf7f3b52dcd4e5350266c4&scene=21#wechat_redirect',
                    text: '来啊！吐槽啊！你家孩子会什么原因一言不合就撒泼',
                    id: 24
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483989&idx=2&sn=77b305c1ee3291adb77a96eb9f310428&scene=21#wechat_redirect',
                    text: '就你这智商还想跟宝宝斗，做梦！',
                    id: 23
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483989&idx=3&sn=92842288cc5e4f74aebcd28eccfa88ed&scene=21#wechat_redirect',
                    text: '你的宝宝看起来好好吃',
                    id: 22
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483936&idx=3&sn=f8cb771a75ce0bf5308ea4b12ea463df&scene=21#wechat_redirect',
                    text: '一个破奶粉罐能提升家里的情调？没看错！',
                    id: 21
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483883&idx=1&sn=af364c7a28d20ba202cc7b31b0d54753&scene=21#wechat_redirect',
                    text: '趣味带娃丨妈是亲妈，爹是亲爹么',
                    id: 20
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483696&idx=3&sn=7c09768398d69c022d52329871c79977&scene=21#wechat_redirect',
                    text: '连抱娃都不会，你还有什么资格当妈',
                    id: 19
                }]
            }
        }
    }
}
</script>