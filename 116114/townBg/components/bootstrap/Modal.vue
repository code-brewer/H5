<template>
  <div class="modal fade" role="dialog"
    v-bind:class="{
    'fade':effect === 'fade',
    'slideDown':effect === 'slideDown',
    'zoom':effect === 'zoom'
    }"
    >
    <div class="modal-dialog" role="document"
      v-bind:class="{'modal-sm': size === 'sm', 'modal-md': size === 'md', 'modal-lg': size === 'lg'}" v-bind:style="style">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import getScrollBarWidth from './utils/getScrollBarWidth.js'
import EventListener from './utils/EventListener.js'

  export default {
    props: {
      show: {
        require: true,
        type: Boolean,
        twoWay: true
      },
      size: {
        type: String,
        default: 'md'
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
      }
    },
    watch: {
      show(val) {
        const el = this.$el
        const body = document.body
        // const scrollBarWidth =  getScrollBarWidth()
        if (val) {
          // el.querySelector('.modal-content').focus()
          el.style.display = 'block'
          setTimeout(()=> el.classList.add('in'), 0)
          body.classList.add('modal-open')
          // if (scrollBarWidth !== 0) {
          //   body.style.paddingRight = scrollBarWidth + 'px'
          // }
          if (this.backdrop) {
            this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e)=> {
              if (e.target === el) this.show = false
            })
          }
        } else {
          if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
          el.classList.remove('in')
          setTimeout(()=> {
            el.style.display = 'none'
            body.classList.remove('modal-open')
            body.style.paddingRight = '0'
          }, 300)
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
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
    -webkit-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
}

.modal.slideDown .modal-dialog {
    -webkit-transform: translate3d(0, -30px, 0);
    -moz-transform: translate3d(0, -30px, 0);
    -ms-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
    top: 30px;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.modal.slideDown.in .modal-dialog {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
</style>
