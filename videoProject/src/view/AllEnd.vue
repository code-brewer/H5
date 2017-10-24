<template lang="html">
    <div class="content" :style="{background:'url(' + bg_img + ')'}">
        <section style="padding-top: 30%;">
            <p v-show="share_msg.grade >= 2.5" style="color:#fff;font-size: 31px;margin-bottom: 5%;">网络速度杠杠的！</p>
            <p v-show="share_msg.grade < 2.5" style="color:#fff;font-size: 31px;margin-bottom: 5%;">呜，怎么又卡了！</p>
            <div style="position:relative">
              <keep-alive>
                <Rate :keyVal="share_msg.star_num" style="font-size:100px"></Rate>
              </keep-alive>
              <!-- <Rate style="font-size: 100px;" :disabled="true" :length="5" :value="share_msg.star_num"></Rate> -->
              <!-- <Rate v-model="share_msg.star_num" style="font-size:90px"></Rate> -->
              <!-- <Star v-model="share_msg.star_num" style="font-size:90px"></Star> -->
              <div style="position: absolute;width: 100%;height: 200px;top: 0%;z-index: 100;"></div>
            </div>
            <!-- <img :src="rocket" style="margin-top:5%"> -->
        </section>
        <!-- <section class="center">
          <p>您已成功击败全国{{share_msg.score}}%的用户</p>
        </section> -->
        <section class="footer">
          <Custom-button @click.native="join_in" class="custom_btn">回到首页</Custom-button>
        </section>
    </div>
</template>
<script>
import wxSet from '../assets/js/Wx'
// import Rate from 'iview/src/components/Rate' //按需加载iview里的rate组件
import Rate from '../components/StarComponent'
import ShareBtn from '../components/Share'
import CustomButton from '../components/CustomButton'
import api from '../api/config'
export default {
  components: {
    Rate,
    ShareBtn,
    CustomButton
  },
  data() {
    return {
      share_msg: {
        score: '', //排名百分比 调百分比接口获取
        grade: '',//分数
        star_num: '' //星级
      },
      share_info: {
        link: '',
        title: '',
        desc: '',
        img_url: ''
      },
      bg_img: "./static/img/end_bg.png",
      rocket: "./static/img/rocket.png",
      isWx: isWx, //是否在微信打开，默认为true
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(function() {
      if(isWx){
        this.init_shareMsg();//初始化分享信息
        this.getJsSign();//获取微信数字签名
      }
    })
  },
  methods: {
    init_shareMsg: function() {
      this.URL_openid = localStorage.getItem('openid');
      this.share_info.title = '我测速后获得'+localStorage.getItem('gameOverScore')+'分，你呢';
      this.share_info.link = basePath+"?TestScore="+localStorage.getItem('gameOverScore')+"#/ShareAfter";
      this.share_info.desc = '测网络速度，赢500M流量';
      this.share_info.img_url = basePath + 'static/img/home_title.jpg'
    },
    //获取数字签名
    getJsSign: function() {
      var _this = this;
      var body = {
        "jsurl": location.href.split('#')[0] //获取当前URL
      };
      api.obtainJssdk(_this, body, (res) => {
        console.log("appid:"+res.data.repBody.appid);
        wxSet.config(res.data.repBody,true,function(){
          wxSet.share(_this.share_info.title, _this.share_info.desc, _this.share_info.link, _this.share_info.img_url, (type, status) => {
            console.log('type:'+type);
            console.log('status:'+status);
          });
        });
      });
    },
    init: function(){
      this.share_msg.grade = localStorage.getItem("vmos");
      // this.share_msg.score = localStorage.getItem('percent_num');
      this.share_msg.star_num = localStorage.getItem('star_num');
    },
    join_in: function() {
      this.$router.push({
        name: 'Home'
      });
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
        margin-top: 80%;
        padding: 0 10%;
    }
    .footer {
        width: 100%;
        margin-top: 70%;
        padding-bottom: 37%;
        .custom_btn {
            width: 60%;
            height: 80px;
        }
    }
}
</style>
