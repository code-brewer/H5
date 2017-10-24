<template>
    <div class="easier-modal" v-show="show" v-on:scroll.prevent="true">
        <div class="backdrop"></div>
        <modal v-show="show">
            <slot></slot>
            <a href="javascript:;" class="btn-close" @click="close">关闭</a> 
        </modal>
    </div>
</template>

<script>
    import modal from '../bootstrap/Modal.vue'
    export default {
        components: {
            modal
        },
        props: {
            show: {
                require: true,
                type: Boolean,
                default: false
            },
            backdrop: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {}
        },
        ready() {
            
        },
        methods: {
            close() {
                this.show = false
            }
        },
        watch: {
            
        }
    }
</script>

<style lang="scss">
    .easier-modal {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .modal {
            position: absolute;
            top: 50%;
            left:50%;
            transform: translate(-50%, -50%);
            width: 80%;
            min-height: 300px;
            background: #ffe63d;
            border: 4px solid #ee0f37;
            border-radius: 5px;
            z-index: 1000;

            .btn-close {
                position: absolute;
                right: -20px;
                top: -20px;
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ee0f37;
                text-indent: -9999em;

                &::before,
                &::after {
                    display: block;
                    position: absolute;
                    content: ' ';
                    width: 30px;
                    height: 3px;
                    background: #fff;
                    border-radius: 2px;
                }

                &::before {
                    transform: rotate(135deg);
                    left: 4px;
                    top: 18px;
                }

                &::after {
                    left: 4px;
                    transform: rotate(45deg);
                }
            }
        }

        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(#000, .6);
            z-index: 99;
        }
    }
    
</style>