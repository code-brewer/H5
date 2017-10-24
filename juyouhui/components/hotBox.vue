<template>
    <div class="box">
        <div class="image">
            <img :src="product.img" v-on:load="loaded" style="width: 100%; transition: all 1.2s ease;" v-bind:style="{'opacity':ready?1:0}">
        </div>
        <p class="name">{{product.keyword}}</p>
        <p class="price">{{'¥'+product.original_price.toFixed(2)}}<span>{{product.source}}</span></p>
    </div>
</template>
<script>
export default {
    props: {
        product: {
            type: Object
        },
        ready: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            // ready: false
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
    attached() {
        // this.$el.firstElementChild.style.backgroundImage = 'url(' + this.product.img + ')'
    }
}
</script>
<style lang="scss" scoped>
.box {
    height: 430px;
    width: 290px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 10px 10px 15px #f1efef;
    overflow: hidden;
    margin-bottom: 15px;
    p {
        padding: 0 10px;
    }
    .image {
        height: 290px;
        // background-image: url(../images/hotPicture/hotBox1.png);
        background-position: bottom center;
        overflow: hidden;
        margin-bottom: 20px;
        background-repeat: no-repeat;
    }
    .name {
        text-align: center;
        font-size: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 5px;
    }
    .price {
        font-size: 30px;
        color: #f30000;
        span {
            float: right;
            margin-right: 10px;
            color: #000;
            font-size: 18px;
            line-height: 41px;
            max-width: 125.5px;
            height: 41px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
