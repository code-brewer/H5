<template>
  <div class="modal" role="dialog"
    v-bind:class="{
    'fade':effect === 'fade',
    'slideDown':effect === 'slideDown',
    'zoom':effect === 'zoom'
    }"

    v-show="show"

    transition="modal"
    >
    <div class="modal-dialog" role="document"
      v-bind:style="style">
      <div class="modal-content" :class="{dialog: dialog, white: bg}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import EventListener from './utils/EventListener.js'

  export default {
    props: {
      show: {
        require: true,
        type: Boolean,
        twoWay: true
      },
      style: {
        type: String,
      },
      callback: {
        type: Function,
        default() {}
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
      }
    },
    watch: {
      show(val) {
        const el = this.$el
        const body = document.body
        const that = this

        if (val) {
          if(this.duration) {
              setTimeout(()=> {
                  that.show = false;
              }, this.duration)
          }

          // el.style.display = 'block'
          // setTimeout(()=> el.classList.add('in'), 0)
          body.classList.add('modal-open')

          if (this.backdrop) {
            this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e)=> {
              if (e.target === el) this.show = false
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
  -webkit-overflow-scrolling: touch;
  outline: 0;
}

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-dialog {
  position: relative;
  width: auto;
  // margin: 10px;
  margin: 90px 30px;
  min-width: 320px;
  max-width: 640px;
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
}
.modal-content.white {
  background-color: #fff;
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

.modal-header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  min-height: 11.42857px;
  background-image: -webkit-linear-gradient(top, #fff 0%, #eaeaea 100%);
  background-image: -o-linear-gradient(top, #fff 0%, #eaeaea 100%);
  background-image: linear-gradient(to bottom, #fff 0%, #eaeaea 100%);
  background-repeat: repeat-x;
  text-align: center;
  .close {
    margin-top: -8px;
    font-weight: lighter;
    font-size: 36px;
  }
}

.modal-title {
  margin: 0;
  line-height: 1.42857;
}

.modal-body {
  position: relative;
  padding: 15px;
}

.modal {
  transition: all 0.3s ease;
}

.modal-transition {
  background-color: rgba(0,0,0,0.5);
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);

  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}


.modal-enter,
.modal-leave {
  background-color: rgba(0,0,0,0);
}

.modal-transition .modal-dialog {
  -webkit-transition: -webkit-transform 0.3s ease-out;
  -moz-transition: -moz-transform 0.3s ease-out;
  -o-transition: -o-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
}
.modal-enter .modal-dialog,
.modal-leave .modal-dialog {
    -webkit-transform: translate(0, -25%);
    -ms-transform: translate(0, -25%);
    -o-transform: translate(0, -25%);
    transform: translate(0, -25%);
    opacity: 0;
}



</style>
