<template>
    <div class="modal" role="dialog" v-bind:class="{
    'fade':effect === 'fade',
    'slideDown':effect === 'slideDown',
    'zoom':effect === 'zoom'
    }" v-show="show" :transition="animation">
        <div class="modal-dialog" v-bind:style="style">
            <div class="modal-content" :class="{dialog: dialog}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import EventListener from './utils/EventListener.js'

export default {
    props: {
        event: null,
        show: {
            require: true,
            type: Boolean,
            twoWay: true
        },
        callback: {
            type: Function,
            default () {}
        },
        effect: {
            type: String,
            default: 'fade'
        },
        backdrop: {
            type: Boolean,
            default: true
        },
        dialog: {
            type: Boolean,
            default: false
        },
        bg: {
            type: Boolean,
            default: true
        },
        duration: {
            require: true,
            type: String,
            default: ''
        },
        animation: {
            default: 'modal'
        }
    },
    watch: {
        show(val) {
            const el = this.$el
            const body = document.body
            const that = this

            if (val) {
                if (this.duration) {
                    setTimeout(() => {
                        that.show = false;
                    }, this.duration)
                }

                // el.style.display = 'block'
                // setTimeout(()=> el.classList.add('in'), 0)
                body.classList.add('modal-open')

                if (this.backdrop) {
                    this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e) => {
                        if (e.target === el)
                        // this.show = false
                        {
                            //this.close();
                        }
                    })
                }
            } else {
                if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
                    // el.classList.remove('in')
                    // setTimeout(()=> {
                    // el.style.display = 'none'
                body.classList.remove('modal-open')
                body.style.paddingRight = '0'
                    // }, 0)
            }
        }
    },
    methods: {
        close() {
            this.show = false
            if (this.event != null) {
                this.event()
                this.event = null
            }
        }
    }
}
</script>
<style>
.modal-open {
    overflow: hidden;
}

.modal {
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    outline: 0;
}

.modal-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    min-width: 320px;
    max-width: 640px;
    z-index: 1100;
}

@media screen and (min-width: 720px) {
    .modal-dialog {
        margin-left: auto;
        margin-right: auto;
    }
}

.modal-content {
    position: relative;
    background-clip: padding-box;
    outline: 0;
    overflow: hidden;
}

.modal-content.dialog {
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
}

.modal {
    transition: all .3s ease;
    background-color: rgba(0, 0, 0, 0.5);
}
.scale-transition.modal {
    transition: all .1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.modal-enter,
.modal-leave,
.scale-enter,
.scale-leave {
    background-color: rgba(0, 0, 0, 0);
}

.modal-transition .modal-dialog,.scale-transition .modal-dialog {
    -webkit-transform: translate(-50%, -50%) scale(1);
    -ms-transform: translate(-50%, -50%) scale(1);
    -o-transform: translate(-50%, -50%) scale(1);
    transform: translate(-50%, -50%) scale(1);
    -webkit-transition: -webkit-transform .5s ease-out;
    -moz-transition: -moz-transform .5s ease-out;
    -o-transition: -o-transform .5s ease-out;
    transition: transform .5s ease-out;
}

.modal-enter .modal-dialog,
.modal-leave .modal-dialog {
    -webkit-transform: translate(-50%, -75%);
    -ms-transform: translate(-50%, -75%);
    -o-transform: translate(-50%, -75%);
    transform: translate(-50%, -75%);
    opacity: 0;
}
.scale-enter .modal-dialog,
.scale-leave .modal-dialog {
    -webkit-transform: translate(120%, -50%) scale(.2);
    -ms-transform: translate(120%, -50%) scale(.2);
    -o-transform: translate(120%, -50%) scale(.2);
    transform: translate(120%, -50%) scale(.2);
    opacity: 0;
}
</style>
