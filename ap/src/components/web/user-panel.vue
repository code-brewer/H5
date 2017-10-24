<template>
<div class="user-panel">
    <div class="user-panel-heading">
      <h4 class="user-panel-title">
        <span style="width: 16.8%;display: inline-block;">
           {{ header }}
        </span></slot><span class="user-panel-title-value"><slot name="header"></span>
        <img class="user-arrow" v-el:userarrow src="../../assets/user-icon-arrow.png" alt="">
        <a style="float: right;" class="accordion-toggle"
          @click="isOpen=!isOpen">
           {{ btntext }}
        </a>

      </h4>
    </div>
    <div class="user-panel-collapse"
      v-el:panel
      v-show="isOpen"
      transition="collapse"
    >
      <div class="user-panel-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      header: {
        type: String
      },
      toggleText: {
        type: String,
        default: "修改"
      },
      collapseText: {
        type: String,
        default: "收起"
      }
    },
    watch:{
    	isOpen(value){
    		this.changeStatus();
    	}
    },
    data() {
      return {
        height: 0,
        btntext:"",
      }
    },
    methods: {
      toggleIsOpen() {
        this.isOpen = !this.isOpen;
        this.changeStatus();
        this.$dispatch('isOpenEvent', this);
      },
      changeStatus() {
        const arrow = this.$els.userarrow;
        if (this.isOpen){
          this.btntext = this.collapseText;
          arrow.style.transform = 'rotate(180deg)';
        }
        else{
          this.btntext = this.toggleText;
          arrow.style.transform = 'rotate(0deg)';
        }
      }
    },
    ready() {
      const panel = this.$els.panel;
      panel.style.display = 'block';
      this.height = panel.offsetHeight;
      panel.style.maxHeight = this.height + 'px';
      if (!this.isOpen)panel.style.display = 'none';
      this.changeStatus();
    }
  }
</script>

<style>
.user-panel{
  border-top-color: #e8e8e8;
  border-top-style: solid;
  border-top-width: 1px;
  padding-left: 30px;
  padding-right: 30px;
}
.user-panel-title{
  font-size: 14px;
  line-height: 40px;
}
.user-panel-collapse{
  border-top-color: #e8e8e8;
  border-top-style: dashed;
  border-top-width: 1px;
}
.user-panel-body{
  padding: 20px 0 20px 16.8%;
}
.user-arrow{
  float: right;
  margin-top: 16px;
  margin-left: 8px;
  transform: rotate(0deg);
  transition-duration: 500ms;
}
.accordion-toggle {
  cursor: pointer;
}

.collapse-transition {
transition: max-height .5s ease;
overflow: hidden;
}

.collapse-enter, .collapse-leave {
  max-height: 0!important;
}

</style>
