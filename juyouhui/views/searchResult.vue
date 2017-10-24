<template>
    <div class="searRescult">
        <div class="top">
            <div class="inputSearch">
                <div>
                    <input type="text" name="" @input="changeImage($event)" v-el:searchText placeholder="请输入想比价的商品名称">
                    <img :src="isSearch ? './images/search.png':'./images/x.png'" @click="clickMe($event)">
                </div>
                <button class="searchButton" @click="clickSearch">搜索</button>
            </div>
        </div>
        <div class="range">
            <div class="select" v-for="(index, item) in rangeData" @click.self="clickSelectDetail(item,index,$event)">{{item.nowVla}}<img :src="item.isSelect ? './images/danjiantou.png' :'./images/danjiantou1.png'">
                <div class="selectDetail" v-if="item.isSelect">
                    <div v-for="val in item.val" @click.stop="changeRange(item,val)"><span>{{val}} <img  src="../images/gou.png" v-show = "item.nowVla===val"></span></div>
                </div>
            </div>
        </div>
        <div class="searchContent clearfix" v-if="product.length!=0">
            <div v-for="item in product">
                <hot-box :product='item' @click="goWeb(item)"></hot-box>
            </div>
            <div class="refresh" v-show="!isAll&&isAjax"><img src="../images/refresh.gif">加载中...</div>
            <p class="refresh" v-show="isAll&&product.length==0">加载完成。</p>
        </div>
        <img src="../images/null.png" class="null" v-if="product.length==0">
        <go-top v-show="goTop" transition="fade"></go-top>
    </div>
</template>
<script type="text/javascript">
import hotBox from '../components/hotBox.vue'
import api from '../api/index.js'
import goTop from '../components/goTop.vue'
import {
    getScrollTop,
    getScrollHeight
} from '../utils/checkPhone.js'
export default {
    components: {
        hotBox,
        goTop
    },
    created() {
        this.$dispatch('loadingTrue')
        this.nowSearch = this.$route.params.id;
        api.login(this, {
            "keyword": this.nowSearch,
            "source": this.rangeData['全网渠道'].nowVla === '全网渠道' ? '' : this.rangeData['全网渠道'].nowVla,
            "price": this.rangeData['默认排序'].nowVla === '默认排序' ? '' : this.rangeData['默认排序'].nowVla === '价格从高到低' ? 1 : 0,
            "begin": this.page,
            "end": 20,
        }, res => {
            this.$dispatch('loadingFalse')
            if (res.resCode === "000000" && res.resMsg === "success") {
                this.product = res.repBody
            }
        })
    },
    compiled() {
        window.addEventListener('scroll', this.scrollEvent);
        this.$els.searchtext.value = this.$route.params.id;
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.scrollEvent);
    },
    data() {
        return {
            isSearch: true,
            nowSearch: '',
            page: 1,
            sign: true,
            goTop: false,
            isAll: false,
            isAjax: false, //是否在请求的状态
            rangeData: {
                '默认排序': {
                    val: ['默认排序', '价格从高到低', '价格从低到高'],
                    nowVla: '默认排序',
                    isSelect: false,
                },
                '全网渠道': {
                    val: ['全网渠道', '淘宝', '天猫', '京东商城', '一号店'],
                    nowVla: '全网渠道',
                    isSelect: false,
                },
            },
            product: [],
        }
    },
    methods: {

        changeImage(event) {
            event.target.value.trim().length > 0 ? this.isSearch = false : this.isSearch = true;
        },
        clickMe(event) {
            !this.isSearch ? event.target.parentElement.firstElementChild.value = '' : '';
            this.isSearch = true;
        },
        /**
         *
         * @param  {[type]}
         *
         * @return {[type]}
         */
        clickSearch() {
            this.isAll = false;
            this.nowSearch = this.$els.searchtext.value.trim();
            if (this.nowSearch.length == 0) return;
            this.$dispatch('loadingTrue')
            this.page = 1;
            api.login(this, {
                "keyword": this.nowSearch,
                "source": this.rangeData['全网渠道'].nowVla === '全网渠道' ? '' : this.rangeData['全网渠道'].nowVla,
                "price": this.rangeData['默认排序'].nowVla === '默认排序' ? '' : this.rangeData['默认排序'].nowVla === '价格从高到低' ? 1 : 0,
                "begin": this.page,
                "end": 20,
            }, res => {
                if (res.resCode === "000000" && res.resMsg === "success") {
                    this.product = res.repBody
                    this.$dispatch('loadingFalse')
                }
            })
        },
        clickSelectDetail(val, key, event) {
            for (var k in this.rangeData) {
                if (k !== key) {
                    this.rangeData[k].isSelect = false;
                }
            }
            val.isSelect ? val.isSelect = false : val.isSelect = true;

        },
        ajaxData() {
            this.sign = false;
            this.page++;
            this.isAjax = true;
            api.login(this, {
                "keyword": this.nowSearch,
                "source": this.rangeData['全网渠道'].nowVla === '全网渠道' ? '' : this.rangeData['全网渠道'].nowVla,
                "price": this.rangeData['默认排序'].nowVla === '默认排序' ? '' : this.rangeData['默认排序'].nowVla === '价格从高到低' ? 1 : 0,
                "begin": this.page,
                "end": 20,
            }, res => {
                if (res.resCode === "000000" && res.resMsg === "success") {
                    if (res.repBody.length == 0) this.isAll = true;
                    this.product = this.product.concat(res.repBody)
                    this.sign = true;
                    this.isAjax = false;
                }

            })
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
        goWeb(item) {
            // this.$dispatch('loadingTrue');
            window.location.href = item.web;

        },
        changeRange(item, val) {
            item.nowVla = val;
            item.isSelect = false;
            this.isAll = false;
            this.page = 1;
            api.login(this, {
                "keyword": this.nowSearch,
                "source": this.rangeData['全网渠道'].nowVla === '全网渠道' ? '' : this.rangeData['全网渠道'].nowVla,
                "price": this.rangeData['默认排序'].nowVla === '默认排序' ? '' : this.rangeData['默认排序'].nowVla === '价格从高到低' ? 1 : 0,
                "begin": this.page,
                "end": 20,
            }, res => {
                if (res.resCode === "000000" && res.resMsg === "success") {
                    this.product = res.repBody
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.top {
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
    background-color: #f3f3f3;
}

.range {
    display: flex;
    background-color: #fff;
    .select {
        height: 80px;
        font-size: 28px;
        flex: 1;
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #c1bebe;
        img {
            margin-left: 15px;
            vertical-align: middle;
        }
    }
    .selectDetail {
        position: absolute;
        background-color: #fff;
        z-index: 900;
        top: 188px;
        left: 0;
        width: 100%;
        span {
            position: relative;
            img {
                position: absolute;
                top: 50%;
                transform: translateY(-10px);
            }
        }
        div {
            height: 80px;
            border-bottom: 1px solid #c1bebe;
        }
    }
}

.searchContent {
    padding: 15px 10px 100px 10px;
    background-color: #fff;
    >div {
        width: 50%;
        display: inline-block;
        padding-bottom: 20px;
        .box {
            margin: 0 auto;
        }
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
