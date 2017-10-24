<template lang="html">
    <div class="content" :style="{background:'url(' + bg_img + ')'}">
      <section class="center">
          <img :src="img_url" alt="" class="row" :style="{transform:'rotate(' + style_obj + 'deg)'}">
          <div class="font_center">
              <p class="big" style="font-size: 60px;font-weight: bold;">{{end_score}}<span>分</span></p>
              <p style="font-size: 38px;">综合分</p>
          </div>
          <img class="centerImg" :src="center_img">
          <div class="fontPlace">
            <!-- <p class="small">成功击败全国{{score}}%的用户</p> -->
            <div v-show="fast" class="big">
              <p>逆天了，你的网速无人能敌！</p>
              <p>不服来战！</p>
            </div>
            <div v-show="slow" class="big">
              <p>你的网速拖后腿了</p>
              <p>好尴尬啊！</p>
            </div>
          </div>
      </section>
        <section class="footer">
          <Custom-button @click.native="join_in" class="custom_btn">我也来测速</Custom-button>
        </section>
    </div>
</template>
<script>
import wxSet from '../assets/js/Wx'
import ShareBtn from '../components/Share'
import CustomButton from '../components/CustomButton'
export default {
  components: {
    ShareBtn,
    CustomButton
  },
  data() {
    return {
      img_url: "./static/img/bg.png",
      center_img: "./static/img/center.png",
      bg_img: "./static/img/b.png",
      // score:"67",
      end_score:'',
      slow: false,
      fast: false,
      style_obj: 240, //初始度数
      end_obj: 460 //度数临界值，最大值
    }
  },
  created() {
    // if(window.location.search.indexOf('TestScore') > -1){
    //   wxSet.hideShare();
    // };
    this.init();
  },
  mounted() {
    this.$nextTick(function() {
      var endDeg = (Math.round(this.end_score) * this.deg_num_S()) + 240;
      this.style_obj = endDeg;
    })
  },
  methods: {
    init: function(){
      var search = window.location.search;
      var reg = /TestScore=([^&]*)(&|$)/;
      var score = search.match(reg);
      score = score && score[1] || 0;
      if (search.indexOf('TestScore') == -1) {
        score = localStorage.getItem('gameOverScore') * 1;
      }
      this.end_score = score;
      if(this.end_score >= 50){
        this.fast = true ; this.slow = false
      }else {
        this.fast = false ; this.slow = true
      }
    },
    join_in: function() {
      window.location.href = basePath;
    },
    deg_num_S: function() {
      // var end_num1 = Math.round((this.end_obj - this.style_obj) / 100); //每刻的度数
      var end_num =  Math.round((this.end_obj - this.style_obj) / 100); //每刻的度数
      return end_num
    },
  }
}
</script>
<style lang="scss" scoped>
.content {
    // background-size: cover!important;
    background-repeat: no-repeat!important;
    .center {
        color: #fff;
        font-size: 55px;
        padding: 0 10%;
        padding-top: 30%;
        position: relative;
        .font_center{
          position: absolute;
          top: 52%;
          left: 35%;
          width: 30%;
          text-align: center;
        }
        .centerImg{
          position: absolute;
          top: 83%;
          left: 10%;
        }
        .fontPlace{
          position: absolute;;
          top: 132%;
          left:10%;
          width: 83%;
          text-align: center;
          .big{
            font-size:40px
          }
          .small{
            font-size:32px
          }
        }
    }
    .footer {
        width: 100%;
        margin-top: 65%;
        padding-bottom: 15%;
        .custom_btn {
            width: 60%;
            height: 80px;
        }
    }
}
</style>
