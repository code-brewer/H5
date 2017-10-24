<template>
   <div>
   		 <div class="noMask" @click.self="">
          <banner></banner>
          <search></search>
       </div>
       <div class="mask" v-if="showMask" @click="cancelMask">
         
       </div>
       <tab-contaioner></tab-contaioner>
       
   </div>
</template>
<script>
import banner from '../components/banner.vue'
import search from '../components/search.vue'
import tabContaioner from '../components/tabContaioner.vue'
export default {
    data() {
      return {
        showMask : false,//显示遮罩层
      }
    },
    watch () {
     
    },
    
    mounted() {
      this.acceptFocusSearch()
      this.acceptBlurSearch()
      
    },
    components: {
        banner,
        search,
        tabContaioner
    },
    methods: {
	     acceptFocusSearch () {
          this.$bus.on('focusSearch',()=>{
            this.showMask= true;
            document.documentElement.style.height='100%';
            document.documentElement.style.width='100%';
            document.documentElement.style.overflow="hidden"
          })
       },
       acceptBlurSearch(){
         this.$bus.on('blurSearch',()=>{
            this.showMask= false;
            document.documentElement.style.height='auto';
            document.documentElement.style.width='auto';
            document.documentElement.style.overflow="auto"
         })
          
       },
       cancelMask(){
          this.$bus.emit('blurSearch')
       }

    }
}
</script>
<style lang="scss" scoped>
  .noMask {
      position: relative;
      z-index: 999;
  }
  .mask {
    position : absolute;
    z-index: 200;
    width: 100%;
    height: 100%;
    background-color: #7f7f7f;
    opacity:0.5;
  }
</style>
