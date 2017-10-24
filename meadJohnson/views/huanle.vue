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
                title: ['欢', '乐', '成', '长'],
                list: [{
                    url: 'http://mp.weixin.qq.com/s/aB_EmG978oyEpXmoyXRLzQ',
                    text: '冬季到了，宝宝们的羽绒服千万别乱买',
                    id: 60
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483727&idx=1&sn=a7a188b77af1c56c9f3e5de06ea33899&chksm=97b52fafa0c2a6b9f4e444fcf70a5602ff38d5738109bbea5d41ab61427493c1207043fccdfd&scene=4#wechat_redirect',
                    text: '宝宝一直干咳好遭罪，这些日常护理赶紧学起来',
                    id: 60
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483674&idx=1&sn=00e722fabc900141259db319542e19df&chksm=97b52ffaa0c2a6ec995f4a80e63c581062a22cdd13731b9d247d71dfde1be5ab8378041342b3&scene=4#wechat_redirect',
                    text: '想让宝宝变得聪明又健康，从给他抚触开始！',
                    id: 60
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485262&idx=3&sn=ab4f13f6107c17d4978d0ade730d166e&chksm=e91ade8dde6d579bd4d07f9dfade50f82b7eb8301dcf13c1cd0268cc88fd55d9929bcbc6d970&scene=4#wechat_redirect',
                    text: '阅读好习惯从小开始丨宝宝成长过程中不可错过的好绘本精选',
                    id: 57
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485126&idx=2&sn=6d2ec19be5ecc7fa67fd6523b0b03856&chksm=e91adf05de6d561300788644f41dc7de22abf3f170f2509ba9d89589d51302cffaa3eb4389d6&scene=4#wechat_redirect',
                    text: '育娃最烦人的这个阶段，粑粑麻麻快看看你有木有经历过？',
                    id: 54
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485009&idx=2&sn=70d06bcd662ca0e93e3e35949006b091&chksm=e91adf92de6d5684083a53c8f0419aac4ee831f0c5c279756a657789cfcbfe3da95e1f9a38f5&scene=21#wechat_redirect',
                    text: '秋季腹泻手足口……明明做好这件事就可以预防',
                    id: 49
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484939&idx=1&sn=9139d95ea65ab9ac6df4dc3436f6dbbd&chksm=e91adfc8de6d56dec743fdeb1dc1f4f98e5c50547be6cfc413c1aa302afe4e6b391b2cf40289&scene=21#wechat_redirect',
                    text: '太有爱!孩子都能如此爱小动物们,我们也可以!',
                    id: 48
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484755&idx=3&sn=500a228f43673d02dbec56137bde3445&chksm=e91adc90de6d5586c20ff2f4a82c40815b35967bdc0e91e63509ebe30d66c8631bbfbb418d51#rd',
                    text: '想拥有一口迷倒一片的美牙，请从宝宝抓起！',
                    id: 45
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484499&idx=4&sn=765af7ecf10db3792f8e815500df57d5&scene=21#wechat_redirect',
                    text: '秋天了，精明的妈妈快给宝宝买这些',
                    id: 18
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484378&idx=3&sn=a88e620820b79dbc1593b3bf5a7da9a7&scene=21#wechat_redirect',
                    text: '千万别给孩子上这样的幼儿园',
                    id: 17
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484378&idx=2&sn=4eed417c8eca48084c21e9437a6ce92e&scene=21#wechat_redirect',
                    text: '秋季悄悄到来,这些小儿常见疾病不得不防',
                    id: 16
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484302&idx=4&sn=3b9c3ce9cce1574910e127b5cde16926&scene=21#wechat_redirect',
                    text: '心灵还得手巧,10个发展孩子精细动作的小活动拿走不谢',
                    id: 15
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484302&idx=5&sn=d847b7a6a936d01f341e4c71d9266ada&scene=21#wechat_redirect',
                    text: '一场完美的亲子游应该是这样的',
                    id: 14
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484178&idx=1&sn=c1120bccb8915054485f498502c49fa8&scene=21#wechat_redirect',
                    text: '动物园老虎袭人后，还能带孩子去动物园吗？',
                    id: 13
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484178&idx=4&sn=20152581dba35c4326b696af625c0069&scene=21#wechat_redirect',
                    text: '又地震！快和孩子一起学学这几个能救命的小动作',
                    id: 12
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484112&idx=1&sn=c079befe0511c6884073cf43b0634cb0&scene=21#wechat_redirect',
                    text: '对付淘气的熊孩子，这些吓唬的话千万别说',
                    id: 11
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484112&idx=4&sn=4eb6b3b049ec2415738084c1cc96eb5e&scene=21#wechat_redirect',
                    text: '不看不知道，宝宝内裤竟如此重要',
                    id: 10
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483936&idx=1&sn=474e555a59828c4295801a7b542295e2&scene=21#wechat_redirect',
                    text: '绝招！原来熊孩子竟害怕剪头发',
                    id: 9
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483936&idx=2&sn=b0d67c308d2776f08ae553f4e4772065&scene=21#wechat_redirect',
                    text: '儿童意外急救大法丨父母们快收藏吧',
                    id: 8
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483883&idx=2&sn=068557f32d63537975fdaad7e5e71aed&scene=21#wechat_redirect',
                    text: '宝宝的手真的那么好吃吗？是的！',
                    id: 7
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483696&idx=1&sn=f3215cc4f5cc0dabbce8da6eb7493c32&scene=21#wechat_redirect',
                    text: '全球抵制！这个包包竟招来99%妈妈的恨',
                    id: 6
                }]
            }
        }
    }
}
</script>