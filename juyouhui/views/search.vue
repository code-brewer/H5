<template>
    <div class="search" id="searchBox">
        <div class="searchTop">
            <div class="fl goback" v-link="{path: '/home/'+nowSector}"><img src="../images/fanhui.png"></div>
            <span>{{nowSector}}</span>
            <div class="fr arrange" @click="changeRange"><img :src="arrange?'./images/cross.png' : './images/vertical.png'"></div>
        </div>
        <div v-if="arrange">
            <div class="searchBox clearfix box" v-if="product.length!=0">
                <hot-box v-for="item in product" :product='item' @click="goWeb(item)"></hot-box>
            </div>
            <div class="refresh" v-show="!isAll&&isAjax"><img src="../images/refresh.gif">加载中...</div>
            <p class="refresh" v-show="isAll&&product.length==0">加载完成。</p>
        </div>
        <div v-if="!arrange">
            <div class="searchBox clearfix box" v-if="product.length!=0">
                <brand v-for="item in product" :brand='item' @click="goWeb(item)"> </brand>
            </div>
            <div class="refresh" v-show="!isAll&&isAjax"><img src="../images/refresh.gif">加载中...</div>
            <p class="refresh" v-show="isAll&&product.length==0">加载完成。</p>
        </div>
        <img src="../images/null.png" class="null" v-if="product.length==0">
        <go-top v-show="goTop" transition="fade"></go-top>
    </div>
</template>
<script type="text/javascript">
// import hotBox from '../components/hotBox.vue'
import router from 'vue-router'
import api from '../api/index.js'
import goTop from '../components/goTop.vue'
import hotBox from '../components/hotBox.vue'
import brand from '../components/brand.vue'
import {
    getScrollTop,
    getScrollHeight
} from '../utils/checkPhone.js'
export default {
    components: {
        hotBox,
        brand,
        goTop,
    },
    created() {
        this.$dispatch('loadingTrue');
        this.nowSector = this.$route.params.id;
        api.findbypage(this, {
            "type2": this.nowSector, //必填
            "begin": this.page,
            "end": "20",
        }, res => {
            if (res.resCode === "000000" && res.resMsg === "success") {
                this.product = res.repBody
            }
            this.$dispatch('loadingFalse');


        })
    },
    compiled() {
        window.addEventListener('scroll', this.scrollEvent);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollEvent);
    },
    data() {
        return {
            nowSector: '',
            arrange: true, //为true时,网格形式排列
            sign: true, //请求过滤器
            page: 1,
            goTop: false,
            isAll: false,
            isAjax: false,
            product: [
                // {
                // 	'createtime' : 1489459320000,
                // 	'id' : 4864,
                // 	'img' : "http://img12.360buyimg.com/n7/jfs/t3202/215/4013781464/267552/33b86e5/57fc77d5Nca12dc4d.jpg",
                // 	'keyword': '雅鹿·自由自在男士内衣套装棉质薄款提花棉毛衫圆领打底秋衣秋裤8606-10 L 170/95 京东商城 (自营)',
                // 	'original_price':'119.00 ',
                // 	'source': '京东商城 (自营)',
                // 	'type1': '丽人服饰',
                // 	'type2':'内衣打底',
                // 	'web' : 'http://item.jd.com/3489112.html'
                // }
            ],
        }
    },
    methods: {
        changeRange() {
            this.arrange ? this.arrange = false : this.arrange = true;
        },
        scrollEvent(event) {
            var missDistance = 1136; //最大scrollTop和scrollHeight的差距
            var scrollHeight = this.getScrollHeight();
            var scrolltop = this.getScrollTop();
            if (scrolltop > 500) {
                this.goTop = true
            } else {
                this.goTop = false
            }
            if (scrollHeight - missDistance - scrolltop < 800 && this.sign) {
                this.ajaxData()
            }
        },
        getScrollTop() {
            return getScrollTop()

        },
        getScrollHeight() {

            return getScrollHeight();
        },
        ajaxData() {
            this.sign = false;
            this.page++;
            this.isAjax = true;
            api.findbypage(this, {
                "type2": this.nowSector, //必填
                "begin": this.page,
                "end": "20",
            }, res => {
                if (res.resCode === "000000" && res.resMsg === "success") {
                    if (res.repBody.length == 0) this.isAll = true;
                    this.product = this.product.concat(res.repBody)
                    this.sign = true;
                    this.isAjax = false;
                }

            })
        },
        goWeb(item) {
            // this.$dispatch('loadingTrue');
            window.location.href = item.web;

        }


    }
}
</script>
<style lang="scss" scoped>
.searchTop {
    height: 75px;
    line-height: 75px;
    font-size: 25px;
    color: #f30000;
    text-align: center;
    border-bottom: 1px solid #a09e9e;
    .goback {
        padding-left: 8px;
        width: 75px;
        position: absolute;
        img {
            margin-top: 20px;
            vertical-align: middle;
        }
    }
    .arrange {
        width: 75px;
        position: absolute;
        height: 75px;
        right: 0;
        top: 0;
        padding-right: 8px;
        img {
            margin-top: 20px;
            vertical-align: middle;
        }
    }
}

.box {
    background-color: #fff;
}

.searchBox {
    padding: 25px 20px 0 20px;
    padding-bottom: 80px;
    border-bottom: 30px solid #f3f3f3;
    > div:nth-of-type(odd) {
        float: left;
    }
    > div:nth-of-type(even) {
        float: right;
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
</style>
