<template>
    <div class="_B-Modal" v-show="visible">
        <transition name="modal">
            <div class="modal-wrap" v-show="visible">
                <div class="content" :style="{'max-height': height}">
                    <slot name="content"></slot>
                </div>
                <slot name="close">
                    <a href="javascript:;" class="default-close" @click="close"></a>
                </slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false,
                height: ''
            }
        },
        watch: {
            show(val) {
                this.visible = val;
                if ( val ) {
                    document.body.style.height = '100%';
                    document.documentElement.style.height = '100%'
                } else {
                    document.body.style.height = 'auto';
                    document.documentElement.style.height = 'auto'
                }
            }
        },
        methods: {
            close() {
                this.visible = false;
                this.$emit('close', false)
            }
        },
        mounted() {
            this.height = (window.innerHeight * .8) + 'px';
        }
    }
</script>
<style lang="scss">
    ._B-Modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        background: rgba(0, 0, 0, .6);
        z-index: 1000;
        .modal-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 640px;
            padding: 18px 0;
            background: url(../../images/modal-tip1.png) top center / 100% auto no-repeat, url(../../images/modal-tip2.png) bottom center / 100% auto no-repeat;
            transform: translate(-50%, -50%) translateZ(0);
        }
        .content {
            padding: 20px;
            border: solid black;
            border-width: 0 6px;
            background: white;
            overflow-y: auto;
            box-sizing: border-box;
            h3 {
                text-align: center;
                font-size: 50px;
                padding: 20px 0;
            }
            .h3 {
                margin-right: -100px;
                letter-spacing: 100px;
            }
        }
        .default-close {
            position: absolute;
            top: -70px;
            right: -10px;
            width: 63px;
            height: 63px;
            background: url(../../images/modal-close.png) no-repeat;
        }
        .modal-enter,.modal-leave {
            transform: translate(-50%, -80%) translateZ(0);
        }
    }
    .modal-enter-active,.modal-leave-active {
        transition: transform .3s ease-out;
    }
</style>
