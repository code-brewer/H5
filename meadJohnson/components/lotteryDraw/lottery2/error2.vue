<template>
    <!-- 没有抽奖资格 -->
    <modal :show.sync="show" :bg="false">
        <div class="faile-txt">
            <h2>温馨提示</h2>
            <div class="con" style="padding-top: 40px;">
                <div class="items">
                    <p>亲，你没有抽奖机会哟。本月每成功邀请3位好友首次关注花妈，即可获得1次抽奖机会！
                    </p>
                </div>
                <div class="btns">
                    <btn v-link="{path: '/recommend1'}" class = "btn">邀请好友</btn>
                   <!--  <btn @click="click">赚币秘籍</btn> -->
                </div>
            </div>
            <a href="javascript:;" class="close" @click="show = false"></a>
        </div>
    </modal>
</template>
<script>
import Modal from '../../Modal.vue'
import btn from '../../btn.vue'

export default {
    components: {
        Modal,
        btn
    },
    props: {
        show: false
    },
    watch: {
        show(val) {
            this.$dispatch('setOverflow', val);
        }
    },
    methods: {
        click() {
            window.location.href = 'http://mp.weixin.qq.com/s/iuv-iG0IEwokmL7ach5-8A';
        }
    }
}
</script>
<style lang="scss">
.faile-txt {
    border-radius: 15px;
    background: white;
    text-align: left;
    .con {
        height: 350px;
        padding: 0 30px;
        border-radius: 0 0 15px 15px;
        overflow-y: auto;
        padding-top: 50px;
        box-sizing: border-box;
        text-align: center;
    }
    .items {
        padding: 30px 0;
        // border-bottom: 1px solid #ccc;
        font-size: 36px;
        line-height: 48px;
        strong {
            font-weight: 400;
            color: #43a4ae;
        }
        p {
            color: #787878;
        }
        a {
            font-size: 36px;
            color: #f88431;
            word-break: break-all;
        }
    }
    .close {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 46px;
        height: 46px;
        background: url(../../../images/close-icon1.png) no-repeat;
    }
    .btns {
        text-align: center;
        .btn{
        display: inline-block;
    /* width: 206px; */
    /* height: 74px; */
    line-height: 72px;
    text-align: center;
    color: white;
    // padding: 0px 50px;
    background: red;
    border-radius: 57px;
    font-family: 黑体;
    font-size: 30px;
    /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAABZCAYAAAD4plJDAAAAGXRFW…Q044lZYopMcFFusXaJQnGakt3GpU8Q42SzVLtEoYgM/i/AAHRjKKbKZOuVAAAAAElFTkSuQmCC) no-repeat; */
    /* background-size: 100% 100%; */
    }
    }
}

.modal {
    .modal-content {
        overflow: initial;
    }
}
</style>
<style lang="scss" scoped>
.faile-txt {
    h2 {
        padding: 20px 0;
        font-size: 30px;
                background: red;
    color: #fff;
        font-weight: 400;
        text-align: center;
        border-radius: 15px 15px 0 0;
        
    }
    .close {
       background: url(../../../images/recommend/recommend_close2.png) no-repeat;
    }
    .btn {
        > div {
            margin: 0 20px;
        }
    }
}
</style>
