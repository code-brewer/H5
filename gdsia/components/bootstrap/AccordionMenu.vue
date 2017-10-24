<template>
    <a @click="toggleIsOpen()" href="javascript:;">
      <slot name="top" ></slot>
    </a>
    
    <div v-el:menu v-show="isOpen" transition="collapse">
        <slot name="content"></slot>

    </div>

    
</template>

<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        height: 0,
        padding: 0
      }
    },
    methods: {
      toggleIsOpen() {
        this.isOpen = !this.isOpen
        this.$dispatch('isOpenEvent', this)
      }
    },
    ready() {
      const menu = this.$els.menu
      menu.style.display = 'block'
      this.height = menu.offsetHeight
      this.padding = '10px 0'
      // menu.style.maxHeight = this.height + 'px'
      if(menu.getElementsByTagName('ul')[0]) {
        menu.getElementsByTagName('ul')[0].style.padding = this.padding
      }
      
      if (!this.isOpen) menu.style.display = 'none'
    }
  }
</script>

<style>
.accordion-toggle {
  cursor: pointer;
}

.collapse-transition,
.collapse-transition ul {
  transition: all .5s ease;
  overflow: hidden;
}

.collapse-enter, .collapse-leave {
  max-height: 0!important;
  
}
.collapse-enter ul, .collapse-leave ul {
  padding: 0!important;
}

div {
  background: $brand-primary;
}

</style>
