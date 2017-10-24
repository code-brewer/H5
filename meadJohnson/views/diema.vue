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
                title: ['爹', '妈', '课', '堂'],
                list: [{
                    url: 'http://mp.weixin.qq.com/s/bIlR4LDavPqXLQN60R9h5Q',
                    text: '为什么一个小瓶盖，让这个小男孩的情绪瞬间从愤怒变开心？',
                    id: 62
                },{
                    url: 'http://mp.weixin.qq.com/s/jnNkluM9WmQHShwQDcLYQw',
                    text: '女人怀胎十月的心理路程，只可惜林丹这样的男人不懂',
                    id: 62
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483736&idx=1&sn=237a20d120bf92aa01a408162a36d3dd&chksm=97b52fb8a0c2a6ae9c7d4d2f3cc8f8d1a3d72d0b7653671aa40e8475d127881254894705df81&scene=4#wechat_redirect',
                    text: '请爸爸们今晚自觉为妈妈们清空宝宝囤货购物车',
                    id: 62
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483716&idx=1&sn=289501c5d0d33981a9da4f2df74b5993&chksm=97b52fa4a0c2a6b2f4001476701842f8a21295a1365044f95ea939cd962cfbe3b46d4f683fbd&scene=4#wechat_redirect',
                    text: '两个当妈的女人为了孩子的早教立场差点打起来',
                    id: 62
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzIxMzU5NzA3MQ==&mid=2247483708&idx=1&sn=348381759d6e661ef814d34d8acae268&chksm=97b52fdca0c2a6ca20146fe21f491dd91af2eca3af0245440ee4e046b272939be52397047a86&scene=4#wechat_redirect',
                    text: '宝宝哭闹不止，试试这个简单的动作吧！',
                    id: 61
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485126&idx=3&sn=efc5db0d7ca6e77581b75a6688b74fd2&chksm=e91adf05de6d56132d4a6e2fe9be45daeab19b393b3c4f33a32c0aeb78aa32afd3f0062f0961&scene=4#wechat_redirect',
                    text: '明星育儿丨你一定不知道的刘涛的育儿秘诀',
                    id: 55
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247485009&idx=4&sn=efe0ba8c68e76beda1223f1550127b76&chksm=e91adf92de6d56840418804d953f069158ef650813fd893f65aeda9b00020b2e447a81a a1f9b&scene=21#wechat_redirect',
                    text: '【漫画】女人醒醒吧！"当妈很辛苦"，不是你的免死金牌',
                    id: 53
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484939&idx=3&sn=f0c51fad252ab424e9ce2218e254337c&chksm=e91adfc8de6d56de51270e0bfda6041ba1e541d064f254918e6c74c39af3854c7d7db65 60d4a&scene=21#wechat_redirect',
                    text: '【漫画】哪个家没一地鸡毛的矛盾事儿？',
                    id: 52
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484883&idx=1&sn=d7bdfa8646683ebfb49cc35cf03140eb&chksm=e91adc10de6d55063bd310e845c95bda52fb11924f773637aa6d51e427711028bf5b7a352c6a#rd',
                    text: '宝宝入园了，你千万别做这样的家长',
                    id: 46
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484755&idx=1&sn=3b9f7bde7682de4364ea4548d5a827f6&chksm=e91adc90de6d55868d0af7d1bcdce486b4a0b7cb38bca4611f5868dcf9cd73c64dcf260e4e0a#rd',
                    text: '为什么黄磊的“育女经”受到如此多的称赞？',
                    id: 43
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484664&idx=2&sn=51b157f7f2a5f5ac53c47c9993aa0a5f&scene=21#wechat_redirect',
                    text: '“败家症”麻麻必学招式！要败家先学砍价！',
                    id: 42
                },{
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484592&idx=1&sn=5f50e6a8acd6f2e658b29bc3aaa1e006&scene=0#wechat_redirect',
                    text: '你的孩子还在“分离焦虑”中？试试这几句话吧',
                    id: 41
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484378&idx=5&sn=2610a20ff9fde1916cc3f6c946b40d4b&scene=21#wechat_redirect',
                    text: '王宝强婚变，这样真的可以保护孩子吗',
                    id: 40
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484302&idx=1&sn=8ee0f390dfdc3f70c2b6d9aa2d537b46&scene=21#wechat_redirect',
                    text: '巴西超模撑起奥运开幕式，她日入13万，她不只是超模，还是超妈',
                    id: 39
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484302&idx=2&sn=d38b272cc1bc8d93036276c5d65006fe&scene=21#wechat_redirect',
                    text: '干货! 我的人生终极目标就是要。白。的。像。日。光。灯。',
                    id: 38
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484178&idx=2&sn=9ea641da273062a1f7d3b0d3226fb68f&scene=21#wechat_redirect',
                    text: '吊炸天的保湿秘籍，让你掐出自己一脸水来 ，美妈们必读！',
                    id: 37
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247484112&idx=2&sn=3744a59e2033727c13143a614ccbcbc7&scene=21#wechat_redirect',
                    text: '你想比同龄美妈老10岁，就千万别搽防晒霜',
                    id: 36
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483989&idx=1&sn=9269d33ed958d9fa98dbca501707c251&scene=21#wechat_redirect',
                    text: '除了宜家召回的夺命衣柜，家里的危险地带还有这些，赶紧大排查!',
                    id: 35
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483883&idx=3&sn=bce2312a54bdbae6407c20cf22c12f09&scene=21#wechat_redirect',
                    text: '生二胎就像买甜筒，第二件半价！',
                    id: 34
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483704&idx=1&sn=8251f4cdd7637dac6501a1e456057489&scene=21#wechat_redirect',
                    text: '产后大胸恼怒症，穿衣能治！',
                    id: 33
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483699&idx=1&sn=2e387949009a2162bc47948e145ef809&scene=21#wechat_redirect',
                    text: '你傻你先买！这些“宝宝必备”纯粹为了满足你的虚荣心',
                    id: 32
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483696&idx=2&sn=1cfd0bb9dea3f7ba029bc575965a6d14&scene=21#wechat_redirect',
                    text: '长辈闭嘴！我要教孕妈偷吃冰淇淋了',
                    id: 31
                }, {
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=2247483683&idx=1&sn=c7dac020114251dd09d51383e90f8faf&scene=21#wechat_redirect',
                    text: '携宝出游，辣妈与大妈差的不是颜也不是钱',
                    id: 30
                }]
            }
        }
    }
}
</script>
