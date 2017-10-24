<template>
    <router-view :mydata="brands"></router-view>
    <load :show="isLoad"></load>
    <div class="barList" v-show="isShow">
        <div class="barDiv" v-for="item in barList" @click="clickBar(item,$index)" v-link="{path: item.routerUrl}" track-by="$index">
            <bar :bar="item"></bar>
        </div>
    </div>
</template>
<script type="text/javascript">
import bar from '../components/bar.vue'
import load from '../components/load.vue'
import api from '../api/index.js'
import resetCss from '../css/reset.css'
import swiperCss from '../css/swiper.min.css'
import commonMethods from '../utils/commonMethods.js'
import {
    getScrollTop,
    getScrollHeight
} from '../utils/checkPhone.js'
// import style from '../css/common.css'
export default {
    components: {
        bar,
        load
    },
    watch: {
        '$route' (to, from) {
            // to.path  /phoneLogin/.test(to.path) ? console.log('打开') : '';
            if (/phoneLogin/.test(to.path) || to.path === '/') {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
            if (/home/.test(to.path) && /phoneLogin/.test(from.path)) {
                this.clickBar(this.barList[0], 0)
            }

        }
    },
    data() {
        return {
            isLoad: false,
            isShow: true,
            barList: [{
                name: '首页',
                imgUrl: './images/bar/home.png',
                slectUrl: './images/bar/homeSelect.png',
                routerUrl: '/home/',
                select: true,
            }, {
                name: '搜索比价',
                imgUrl: './images/bar/compare.png',
                slectUrl: './images/bar/compareSelect.png',
                routerUrl: '/compare/',
                select: false,
            }, {
                name: '优惠券',
                imgUrl: './images/bar/discount.png',
                slectUrl: './images/bar/discountSelect.png',
                routerUrl: '/discount/',
                select: false,
            }, {
                name: '个人中心',
                imgUrl: './images/bar/me.png',
                slectUrl: './images/bar/meSelect.png',
                routerUrl: '/myCenter/',
                select: false,
            }],
            brands: [],
        }
    },
    created() {

        this.isLoad = true;
        api.findbyname(this, {}, res => {

            if (res.resCode === "000000" && res.resMsg === "success") {
                // this.$dispatch('loadingFalse');
                this.isLoad = false;
                this.brands = res.repBody
                    // console.log(this.brands)
            }
        })

        this.initBarImg()


    },
    ready() {
        this.$on('loadingTrue', () => {
            this.isLoad = true;
        });
        this.$on('loadingFalse', () => {
            this.loadTime = setTimeout(() => {
                this.isLoad = false;
            }, 500);
        });
        this.$on('openShow', () => {
            this.isShow = true;
        });
        this.$on('closeShow', () => {
            this.isShow = false;
        });

    },
    methods: {
        clickBar(val, index) {

            this.$broadcast('changePic1', val.name)

        },
        getScrollTop() {
            return getScrollTop()

        },
        getScrollHeight() {

            return getScrollHeight();
        },
        initBarImg() {
            var str = this.$route.path;
            str = str.match(/[/](\S*)[/]/);
            if (str !== null) {
                var selectSign = 0;
                if (str[1] === 'searchResult' || str[1] === 'compare') {
                    selectSign = 1;
                } else if (str[1] === 'discount' || str[1] === 'allDiscount') {
                    selectSign = 2;
                } else if (str[1] === 'myCenter' || str[1] === 'login') {
                    selectSign = 3;
                }
                for (var k = 0; k < this.barList.length; k++) {
                    this.barList[k].select = false;
                    if (k == selectSign) this.barList[k].select = true;
                }
            }
        },


    }
}
</script>
<style lang="scss">
@import '../css/common.scss';
</style>
