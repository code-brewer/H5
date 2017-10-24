<template>
  	<div class="bannerBox">
        <div class="swiper-container banner">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in bannerList" :key="item.bannerId">
                    <a :href="item.bannerJumpUrl" style="display: block">
                        <img :src="item.bannerImgUrl" width="100%">
                    </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
  	</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import bannerImg from './image.vue';
import swiper111 from '../js/swiper.min.js'
export default {
  data () {
    return {
      bannerList : [
        
      ]
    }
  },

  components: {
    Swipe,
    SwipeItem,
    bannerImg
  },
  created () {
    this.getBanner()
   
   
    
  },
  mounted(){
    
    

  },
  methods:{
    getBanner () {
      // http://域名:端口/tourism/index/indexBannerAd
      var _this = this
      this.axios.post(basePath+'/index/indexBannerAd').then(function(res){
        if(res.data.msg==='请求成功'){
          _this.bannerList = res.data.data
          _this.createSwiper()
        }
      })
    },
    createSwiper(){
       setTimeout(function(){
            var mySwiper = new Swiper('.banner', { //轮播图
            loop: true,
            autoplay: 3000,
            pagination: '.swiper-pagination',
          });
         },200)
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
	.bannerBox {
   height: auto;
	}
</style>
