<template>
    <div class="position" id="position">
        <div class="mask" v-show="!displayAll"></div>
        <div class="top1 clearfix" v-el:scrollDiv>
            <div class="arrow" v-on:click="clickArrow"><img v-el:img src="../images/arrow.png"></div>
            <ul v-show="displayAll">
                <li v-for="(key, val) in lis" v-bind:class="{'active': val.isActive}" v-on:click="clickTop(val,key)">{{key}}</li>
            </ul>
            <div class="all" v-show="!displayAll">
                <p>全部分类</p>
                <div class="sort">
                    <div class="top">
                        <div v-bind:class="{'active':topActive.name==='丽人服饰'?true:false }" v-on:click="clickTopAll($event)">丽人服饰</div>
                        <div v-bind:class="{'active':topActive.name==='美妆护肤'?true:false }" v-on:click="clickTopAll($event)">美妆护肤</div>
                        <div v-bind:class="{'active':topActive.name==='母婴玩具'?true:false }" v-on:click="clickTopAll($event)">母婴玩具</div>
                    </div>
                    <div class="bottom">
                        <div v-bind:class="{'active':topActive.name==='茶酒零食'?true:false }" v-on:click="clickTopAll($event)">茶酒零食</div>
                        <div v-bind:class="{'active':topActive.name==='数码电器'?true:false }" v-on:click="clickTopAll($event)">数码电器</div>
                        <div v-bind:class="{'active':topActive.name==='家具百货'?true:false }" v-on:click="clickTopAll($event)">家具百货</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="swiper-container banner selectDetailTop" v-show="isShowBanner">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in bannerlists">
                    <a :href="item.bannerUrl">
                        <img :src="item.banner">
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="selectDetailTop" v-show="!isShowBanner" id="selectTop">
            <div class="detail" v-for="item in topActive.val" align="center">
                <div class="imgBorder" v-link="{path: '/search/'+item.name}"><img :src="item.imgUrl"></div>
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="todayMessage">
            <ul id="message" v-el:todayMessage>
                <li v-for="item in todayMessage" track-by="$index"><img src="../images/toutiao.png"><span>{{item}}</span></li>
            </ul>
        </div>
        <div class="hot">
            <div class="top">
                <p><img src="../images/hot.png"><span>今日热门</span></p>
            </div>
            <div class="main clearfix">
                <div v-for="item in product" class="mainbox">
                    <hot-box :product='item' :ready="true" @click="goWeb(item)"></hot-box>
                </div>
            </div>
        </div>
        <div class="hot">
            <div class="top">
                <p><img src="../images/favorable.png"><span>大牌特惠</span></p>
            </div>
            <div class="lis">
                <brand v-for="item in mydata" :brand='item' @click="goWeb(item)"> </brand>
                <!-- <brand v-for="item in brands" :brand='item' @click = "goWeb(item)"> </brand> -->
            </div>
        </div>
        <go-top v-show="goTop" transition="fade"></go-top>
    </div>
</template>
<script type="text/javascript">
import hotBox from '../components/hotBox.vue'
import brand from '../components/brand.vue'
import bar from '../components/bar.vue'
import load from '../components/load.vue'
import router from 'vue-router'
import api from '../api/index.js'
import goTop from '../components/goTop.vue'
import swiper from '../utils/swiper.min.js'

import {
    MoveMessage
} from '../utils/MoveMessage.js'

export default {
    components: {
        hotBox,
        brand,
        bar,
        load,
        goTop,
    },
    props: {
        mydata: {
            type: Array
        }
    },
    data() {
        return {
            barTitle: '聚优惠',
            goTop: false,
            nowMouth: new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1), //当前月份
            isShowBanner: true,
            displayAll: true,
            topActive: { //当前选择
                name: '',
                val: [],
            },
            todayMessage: [],
            lis: {
                '推荐': {
                    item: [],
                    isActive: true,
                },
                '丽人服饰': {
                    item: [{
                        name: '内衣打底',
                        imgUrl: './images/liren/liren1.png'
                    }, {
                        name: '休闲百搭',
                        imgUrl: './images/liren/liren2.png'
                    }, {
                        name: '针织时尚',
                        imgUrl: './images/liren/liren3.png'
                    }, {
                        name: '运动健身',
                        imgUrl: './images/liren/liren4.png'
                    }, {
                        name: '外套',
                        imgUrl: './images/liren/liren5.png'
                    }, {
                        name: '卫衣',
                        imgUrl: './images/liren/liren6.png'
                    }, {
                        name: '裙装',
                        imgUrl: './images/liren/liren7.png'
                    }, {
                        name: '裤装',
                        imgUrl: './images/liren/liren8.png'
                    }],
                    isActive: false,
                },
                '美妆护肤': {
                    item: [{
                        name: '面部护理',
                        imgUrl: './images/meizhuang/meizhuang1.png'
                    }, {
                        name: '面膜',
                        imgUrl: './images/meizhuang/meizhuang2.png'
                    }, {
                        name: '彩妆',
                        imgUrl: './images/meizhuang/meizhuang3.png'
                    }, {
                        name: '香水精油',
                        imgUrl: './images/meizhuang/meizhuang4.png'
                    }, {
                        name: '口红唇膏',
                        imgUrl: './images/meizhuang/meizhuang5.png'
                    }, {
                        name: '乳液面霜',
                        imgUrl: './images/meizhuang/meizhuang6.png'
                    }, {
                        name: '身体护体',
                        imgUrl: './images/meizhuang/meizhuang7.png'
                    }, {
                        name: '美妆工具',
                        imgUrl: './images/meizhuang/meizhuang8.png'
                    }],
                    isActive: false,
                },
                '母婴玩具': {
                    item: [{
                        name: '纸尿裤',
                        imgUrl: './images/muying/muying1.png'
                    }, {
                        name: '玩具',
                        imgUrl: './images/muying/muying2.png'
                    }, {
                        name: '奶粉',
                        imgUrl: './images/muying/muying3.png'
                    }, {
                        name: '童车童床',
                        imgUrl: './images/muying/muying4.png'
                    }, {
                        name: '童书',
                        imgUrl: './images/muying/muying5.png'
                    }, {
                        name: '妈妈用品',
                        imgUrl: './images/muying/muying6.png'
                    }, {
                        name: '童鞋',
                        imgUrl: './images/muying/muying7.png'
                    }, {
                        name: '营养辅食',
                        imgUrl: './images/muying/muying8.png'
                    }],
                    isActive: false,
                },
                '茶酒零食': {
                    item: [{
                        name: '坚果蜜饯',
                        imgUrl: './images/chajiu/chajiu1.png'
                    }, {
                        name: '粮油调味',
                        imgUrl: './images/chajiu/chajiu2.png'
                    }, {
                        name: '营养保健',
                        imgUrl: './images/chajiu/chajiu3.png'
                    }, {
                        name: '茶叶冲饮',
                        imgUrl: './images/chajiu/chajiu4.png'
                    }, {
                        name: '糕点饼干',
                        imgUrl: './images/chajiu/chajiu5.png'
                    }, {
                        name: '充饥即食',
                        imgUrl: './images/chajiu/chajiu6.png'
                    }, {
                        name: '休闲零食',
                        imgUrl: './images/chajiu/chajiu7.png'
                    }, {
                        name: '乳类饮品',
                        imgUrl: './images/chajiu/chajiu8.png'
                    }],
                    isActive: false,
                },
                '数码电器': {
                    item: [{
                        name: '手提电脑',
                        imgUrl: './images/shuma/shuma1.png'
                    }, {
                        name: '家庭电脑',
                        imgUrl: './images/shuma/shuma2.png'
                    }, {
                        name: '生活家电',
                        imgUrl: './images/shuma/shuma3.png'
                    }, {
                        name: '个人护理',
                        imgUrl: './images/shuma/shuma4.png'
                    }, {
                        name: '手机配件',
                        imgUrl: './images/shuma/shuma5.png'
                    }, {
                        name: '液晶平板',
                        imgUrl: './images/shuma/shuma6.png'
                    }, {
                        name: '厨房电器',
                        imgUrl: './images/shuma/shuma7.png'
                    }, {
                        name: '创意科技',
                        imgUrl: './images/shuma/shuma8.png'
                    }],
                    isActive: false,
                },
                '家具百货': {
                    item: [{
                        name: '床品套件',

                        imgUrl: './images/jiaju/jiaju1.png'
                    }, {
                        name: '被子毯子',
                        imgUrl: './images/jiaju/jiaju2.png'
                    }, {
                        name: '布艺毛巾',
                        imgUrl: './images/jiaju/jiaju3.png'
                    }, {
                        name: '架类归类',
                        imgUrl: './images/jiaju/jiaju4.png'
                    }, {
                        name: '枕头床垫',
                        imgUrl: './images/jiaju/jiaju5.png'
                    }, {
                        name: '办公用品',
                        imgUrl: './images/jiaju/jiaju6.png'
                    }, {
                        name: '餐碗厨具',
                        imgUrl: './images/jiaju/jiaju7.png'
                    }, {
                        name: '精美装饰',
                        imgUrl: './images/jiaju/jiaju8.png'
                    }],
                    isActive: false,
                }
            },
            bannerlists: [{
                bannerUrl: '#',
                banner: './images/banner/banner1.png',
            }, {
                bannerUrl: '#',
                banner: './images/banner/banner2.png',
            }, {
                bannerUrl: '#',
                banner: './images/banner/banner3.png',
            }],
            product: [{
                'createtime': 1489459320000,
                'id': 4864,
                'img': "http://d8.yihaodianimg.com/N04/M0A/B1/FB/CgQDrVNsrv2AE6dQAAGAVYnjhHM82101_230*230.jpg",
                'keyword': '三角牌 不粘 电饭煲 电饭锅CFXB-Z15 1号店 (自营)',
                'original_price': 69,
                'source': '1号店 (自营)',
                'type1': '数码电器',
                'type2': '生活家电',
                'web': 'http://item.jd.com/3489112.html'
            }, {
                'createtime': 1489459320000,
                'id': 4864,
                'img': "http://img12.360buyimg.com/n7/jfs/t3202/215/4013781464/267552/33b86e5/57fc77d5Nca12dc4d.jpg",
                'keyword': '雅鹿·自由自在男士内衣套装棉质薄款提花棉毛衫圆领打底秋衣秋裤8606-10 L 170/95 京东商城 (自营)',
                'original_price': 119,
                'source': '京东商城 (自营)',
                'type1': '丽人服饰',
                'type2': '内衣打底',
                'web': 'http://item.jd.com/3489112.html'
            }, ],
            brands: []
        }
    },
    ready() {
        var mySwiper = new Swiper('.banner', { //轮播图
            loop: true,
            autoplay: 3000,
            pagination: '.swiper-pagination',
        });
        document.title = this.barTitle;
        this.swipe(document.querySelector('#selectTop')) // 滑动顶部的菜单栏也会切换效果
        this.getTodayMessage()


    },
    created() {

    },
    computed: {

    },
    compiled() {
        window.addEventListener('scroll', this.scrollEvent);
        var nowSelect = this.$route.params.id
        if (nowSelect) {
            this.$route.params.id = '';
            this.isShowBanner = false;
            var sign = 0;
            for (var k in this.lis) {
                this.lis[k].isActive = false;
                sign++;
                for (var j = 0; j < this.lis[k].item.length; j++) {
                    if (this.lis[k].item[j].name === nowSelect) {
                        this.topActive.name = k;
                        this.topActive.val = this.lis[k].item;
                        this.lis[k].isActive = true;
                        var distance = 105 + (sign - 2) * 145
                        setTimeout(function() {
                            document.querySelector('.top1').scrollLeft = distance;
                        }, 100)
                    }
                }

            }
        }

    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollEvent);
    },
    methods: {
        swipe(dom, fn) { //左右滑动
            var _this = this;
            var timerStart, distanceX, distanceY, time;
            dom.addEventListener('touchstart', function(e) {
                timerStart = new Date();
                distanceX = e.touches[0].pageX;
                distanceY = e.touches[0].pageY;

            }, true)
            dom.addEventListener('touchmove', function(e) {
                // console.log(213)
                e.preventDefault()
            }, true)
            dom.addEventListener('touchend', function(e) {
                time = new Date() - timerStart;
                distanceX = e.changedTouches[0].pageX - distanceX;
                distanceY = e.changedTouches[0].pageY - distanceY;
                var key;
                if (time <= 300 && distanceX < -150) {
                    var sign = false;
                    for (var k in _this.lis) {
                        if (sign) key = k;
                        _this.topActive.name === k ? sign = true : sign = false;
                    }
                    if (key) _this.clickTopAll(key)
                } else if (time <= 300 && distanceX > 150) {
                    var arr = [];
                    var sign = true;
                    for (var k in _this.lis) {
                        _this.topActive.name === k ? sign = false : '';
                        if (sign) arr.push(k)
                    }
                    key = arr[arr.length - 1]
                    if (key && key !== '推荐') _this.clickTopAll(key)

                }
                // if (key) _this.clickTopAll(key)


            }, true)

        },
        clickArrow() {

            if (this.$els.img.style.transform === 'rotate(180deg)') {
                this.$els.img.style.transform = '';
                this.displayAll = true;
                document.body.style.height = 'auto';
                // document.body.style.overflow = 'auto';
                // document.documentElement.style.overflow = 'auto';


            } else {
                this.$els.img.style.transform = 'rotate(180deg)';
                this.displayAll = false;
                // document.body.style.overflow = 'hidden';
                document.body.style.height = '100%';
                // document.documentElement.style.overflow = 'hidden';

            }
        },
        clickTop(val, key) {
            document.body.scrollTop = 0;
            for (var k in this.lis) {
                this.lis[k].isActive = false;
            }
            val.isActive = true;
            this.topActive.name = key;
            this.topActive.val = val.item;
            val.item.length == 0 ? this.isShowBanner = true : this.isShowBanner = false;
        },
        getTodayMessage() {
            this.todayMessage = ['黄健浩已领取麦当劳' + this.nowMouth + '月优惠券', '黄健浩已领取肯德基' + this.nowMouth + '月优惠券', '黄健浩已领取汉堡王' + this.nowMouth + '月优惠券']
            MoveMessage(this) //今日头条移动效果
        },
        clickTopAll(event) {
            document.body.scrollTop = 0;
            event.target ? this.topActive.name = event.target.innerText : this.topActive.name = event
            var sign = 0;
            for (var k in this.lis) {
                this.lis[k].isActive = false;
                sign++
                if (this.topActive.name === k) {
                    this.topActive.val = this.lis[k].item;
                    this.lis[k].isActive = true;
                    this.isShowBanner = false;
                    this.displayAll = true;
                    document.body.style.height = 'auto';
                    document.body.style.overflow = 'auto';
                    var distance = 105 + (sign - 2) * 145
                    setTimeout(function() {
                        document.querySelector('.top1').scrollLeft = distance; //顶部移动到当前位置的效果
                    }, 100)
                }
            }
        },
        scrollEvent(event) {
            var scrolltop = this.$parent.getScrollTop();
            if (scrolltop > 500) {
                this.goTop = true
            } else {
                this.goTop = false
            };
        },
        goWeb(item) {
            // this.$dispatch('loadingTrue');
            window.location.href = item.web;

        },

    },

}
</script>
<style lang="scss">
.top1 {
    width: 100%;
    max-width: 1024px;
    background-color: #fff;
    overflow: auto;
    position: fixed;
    top: 0;
    // position: relative;
    z-index: 110;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .all {
        width: 100%;
        p {
            border-bottom: 1px solid #dedbdb;
        }
        .sort {
            background-color: #fff;
            height: 165px;
            width: 100%;
            .active {
                color: #f30000;
                font-weight: normal !important;
            }
            .top {
                border-top: 1px solid #bab9b9;
                border-bottom: 1px solid #d8d5d5;
            }
            .top,
            .bottom {
                height: 50%;
                display: flex;
                div {
                    flex: 1;
                    text-align: center;
                    line-height: 82.5px;
                    font-size: 25px;
                    // font-weight: bold;
                    border-right: 1px solid #d8d5d5;
                }
                div:last-of-type {
                    border-right: none;
                }
            }
        }
        p {
            text-align: center;
            font-size: 25px;
            line-height: 70px;
            color: #f30000;
        }
    }
    .arrow {
        height: 70px;
        width: 60px;
        position: fixed;
        top: 0;
        right: 0;
        vertical-align: middle;
        background-color: #fff;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -11px;
            margin-top: -6px;
        }
    }
    ul {
        width: 1020px;
        height: 70px;
        box-sizing: border-box;
        .active {
            border-bottom: 3px solid #f30000;
            color: #f30000;
        }
    }
    li {
        margin-right: 15px;
        padding-right: 15px;
        padding-left: 15px;
        font-size: 25px;
        font-weight: bold;
        display: inline-block;
        height: 70px;
        line-height: 70px;
        box-sizing: border-box;
    }
    li:first-of-type {
        margin-left: 10px;
        padding-left: 15px;
    }
    li:last-of-type {
        margin-right: 25px;
        padding-right: 15px;
    }
}

.banner {
    // position: relative;
    // height: 304px;
}

.selectDetailTop {
    height: 375px;
    padding-top: 71px;
    box-sizing: border-box;
    background-color: #fff;
    .detail {
        float: left;
        width: 25%;
        height: 50%;
        box-sizing: border-box;
    }
    .imgBorder {
        width: 82px;
        height: 82px;
        border-radius: 56px;
        overflow: hidden;
        -moz-border-radius: 25px;
        border: 2px solid #fff6f6;
    }
    p {
        font-size: 25px;
    }
}

.todayMessage {
    height: 50px;
    background-color: #f3f3f3;
    overflow: hidden;
    position: relative;
    ul {
        width: 100%;
        height: 100%;
        position: absolute;
        li {
            height: 100%;
            line-height: 50px;
            text-align: center;
            img {
                vertical-align: sub;
                padding-right: 10px;
            }
            span {
                padding-left: 10px;
                border-left: 1px solid #ccc;
                font-size: 22px;
                font-weight: 700;
            }
        }
    }
}

.hot {
    .top {
        height: 60px;
        border-bottom: 1px solid #a09e9e;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        p {
            box-sizing: border-box;
            padding-top: 6px;
        }
        img {
            margin-top: 5px;
            vertical-align: top;
            padding-right: 10px;
        }
        span {
            font-size: 25px;
            font-weight: 700;
        }
    }
    .main {
        padding: 25px 10px 20px;
        border-bottom: 30px solid #f3f3f3;
        background-color: #fff;
        .mainbox {
            width: 50%;
            .box {
                margin: 0 auto;
            }
        }
    }
    .main > div:nth-of-type(odd) {
        float: left;
    }
    .main > div:nth-of-type(even) {
        float: right;
    }
}

.lis {
    padding: 25px 20px 100px 20px;
    border-bottom: 1px solid #a09e9e;
    background-color: #fff;
}

.lis > .brandBox > .right:last-of-type {
    // border-bottom: none;
}

.barList {
    height: 90px;
    width: 100%;
    max-width: 1024px;
    background-color: #fff;
    padding-bottom: 5px;
    position: fixed;
    bottom: 0px;
    display: flex;
    border-top: 1px solid #a09e9e;
    .barDiv {
        flex: 1;
        height: 100px;
    }
}

.fade-transition {
    transition: all 2s;
}

.fade-enter {
    opacity: 1;
}

.fade-leave {
    opacity: 0;
}

.swiper-slide {
    line-height: 300px;
    color: #fff;
    font-size: 36px;
    text-align: center;
}
</style>
