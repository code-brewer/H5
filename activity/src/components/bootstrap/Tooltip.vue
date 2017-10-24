<template>
  <span v-el:trigger>
    <slot>
    </slot>
  </span>
  <div class="tooltip"
    v-bind:class="{
    'top':    placement === 'top',
    'left':   placement === 'left',
    'right':  placement === 'right',
    'bottom': placement === 'bottom'
    }"
    v-el:popover
    v-show="show"
    :transition="effect"
    role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">
      {{{content}}}
    </div>
  </div>
</template>

<script>
import PopoverMixin from './popoverMixins.js'
  export default {
    mixins: [PopoverMixin],
    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      effect: {
        type: String,
        default: 'scale'
      }
    }
  }
</script>

<style scoped>
  .tooltip {
    opacity: .9
  }
.fadein-enter {
  animation:fadein-in 0.3s ease-in;
}
.fadein-leave {
  animation:fadein-out 0.3s ease-out;
}
@keyframes fadein-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadein-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.scale-transition,
.fade-transition {
  display: block;
}
.scale-enter {
  -webkit-animation:scale-in 0.15s ease-in;
          animation:scale-in 0.15s ease-in;
}
.scale-leave {
  -webkit-animation:scale-out 0.15s ease-out;
          animation:scale-out 0.15s ease-out;
}
@-webkit-keyframes scale-in {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}

</style>
