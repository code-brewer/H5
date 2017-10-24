<template>
    <div class="brandBox">
        <div class="fl clearfix">
            <img :src="brand.img" v-on:load="loaded" style="transition: all 1.2s ease;" v-bind:style="{'opacity':ready?1:0}">
        </div>
        <div class="right">
            <p class="brandName">{{brand.keyword}} </p>
            <p class="price">{{'¥'+brand.original_price.toFixed(2)}} <span class="oldPrice" v-if="brand.oldPrice">{{'¥'+brand.oldPrice.toFixed(2)}}</span></p>
            <p class="sales" v-if="brand.sales">销量：{{brand.sales}}件 </p>
            <span class="store">{{brand.source}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        brand: {
            type: Object
        },

    },
    data() {
        return {
            ready: false
        }
    },
    methods: {
        loaded() {
            const self = this;
            setTimeout(function() {
                self.ready = true
            }, 100)
        }
    },

}
</script>
<style lang="scss" scoped>
.brandBox {
    height: 210px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    // border: 1px solid #ccc;
    margin-bottom: 10px;
    img {
        width: 200px;
        height: 200px;
        padding-top: 5px;
        padding-right: 20px;
    }
    .right {
        padding-top: 5px;
        margin-left: 220px;
        height: 100%;
        // box-sizing: border-box;
        border-bottom: 1px solid #a09e9e;
        .brandName {
            padding-top: 10px;
            font-size: 24px;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            letter-spacing: 2px;
            line-height: 32px;
        }
        .price {
            font-size: 30px;
            color: #f30000;
            margin-top: 20px;
            position: absolute;
            bottom: 0;
            max-width: 256px;
        }
        .sales {
            position: absolute;
            bottom: 0;
            font-size: 18px;
            line-height: 41px;
        }
        .store {
            margin-right: 10px;
            position: absolute;
            font-size: 18px;
            line-height: 41px;
            bottom: 0px;
            right: 0px;
            max-width: 138px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .oldPrice {
            font-size: 20px;
            text-decoration: line-through;
            color: #000;
        }
    }
}
</style>
