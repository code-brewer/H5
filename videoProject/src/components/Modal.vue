<template>
<div class="modal" v-show="show">
  <div class="modal-content">
    <slot></slot>
  </div>
  <div class="modal_bg">
  </div>
</div>
</template>
<script>
import EventListener from '../assets/js/EventListener'

export default {
  props: {
    show: {
      require: true,
      type: Boolean
    }
  },
  watch: {
    show(val) {
      let body = document.body;
      if (val) {
        body.classList.add('modal-open')
      } else {
        body.classList.remove('modal-open')
      }
    }
  }
}
</script>
<style>
@keyframes zoomInUp {
  from {
    opacity: 0;
    transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
    animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }

  60% {
    opacity: 1;
    transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }
}

.zoomInUp {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: zoomInUp;
}

.modal-open {
  height: 150%;
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

.modal_bg {
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  /*add*/
  background: black;
  opacity: 0.5;
}

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 90px 30px;
  min-width: 320px;
  max-width: 640px;
  /*改动*/
  margin: 160px 0px;
}

.modal-content {
  position: relative;
  z-index: 100;
}

.modal-content .white {
  background-color: #fff;
}

.modal-conten .dialog {
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
</style>
