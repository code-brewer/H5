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
                title: ['宝', '宝', '喂', '养'],
                list: [{
                    url: 'http://mp.weixin.qq.com/s/mABaKpWzjoxIW75cCn1b_w',
                    text: '避免尴尬，文明哺乳，请尊重每位哺乳中的妈妈们',
                    id: 59
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483692&idx=1&sn=28b1c38c5f04df78e31b90d417197ca6&chksm=97b52fcca0c2a6da2eeb027a2c69487e388ddb669a4b1a8936d03142ed4245b9909b436b4c58&scene=4#wechat_redirect',
                    text: '干货丨判断宝宝是否吃饱了的秘诀都在这了',
                    id: 59
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485262&idx=2&sn=b2f32f579809d317a775c8239980f72b&chksm=e91ade8dde6d579b6a220376301833fab42ed673ae68d874a3a3555f4c7710631ab4563ccc59&scene=4#wechat_redirect',
                    text: '值得收藏丨深秋时节，这些食物最适合做给宝宝吃',
                    id: 56
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484755&idx=2&sn=376ba05abb80cbb762f478b478290c67&chksm=e91adc90de6d5586fa838826a1e1b4865ca009ff446c7fbe69a793ef68692959293833c0b174#rd',
                    text: '秋燥时节，这些宝宝喂养的事项麻麻千万要了解',
                    id: 44
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484664&idx=3&sn=af261ac03bc0d68149175d8598ab4678&scene=21#wechat_redirect',
                    text: '关于断奶那些不得不说的事儿',
                    id: 5
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484592&idx=3&sn=92d855490b1b6e1d57183cf7a42b28c8&scene=0#wechat_redirect',
                    text: '原来老娘我身价辣么贵！点开有惊喜。',
                    id: 4
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484499&idx=3&sn=6f1ee004d608b3865680f5ef7efd8898&scene=21#wechat_redirect',
                    text: '背奶族”妈妈最想知道的母乳储存攻略',
                    id: 3
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484112&idx=3&sn=4502967985f27c720b8c6284e0cb2c52&scene=4#wechat_redirect',
                    text: '天热了给宝宝吃什么,快来学习简单的夏日宝宝粥',
                    id: 2
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483683&idx=2&sn=9d86dbdd2a87962deda6a59a3d1687f2&scene=21#wechat_redirect',
                    text: '有些火,不是你想灭就能灭',
                    id: 1
                }]
            }
        }
    }
}
</script>