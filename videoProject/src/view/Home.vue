<template lang="html">
  <div class="content" :style="{backgroundImage:'url('+bg_img+')'}">
    <section class="center">
      <!-- <img :src="img_url" class="row"> -->
    </section>
    <section class="bottom">
      <div :class="{wobble:num_error}" style="height:150px">
        <input class="input" @click="press" maxlength="11" type="tel" v-model="phone_num" placeholder="请输入您参与测试的号码" />
        <p class="erro_red" v-show="num_error">*请输入您参与测试的号码</p>
      </div>
      <div class="btn_content">
        <Custom-button @click.native="participate_in()" class="custom_btn">立即参与</Custom-button>
        <Custom-button @click.native="show_rule = true" class="custom_btn">查看规则</Custom-button>
      </div>
      <!-- <button type="button" name="button" @click="gogoing()">111111</button> -->
    </section>
    <Modal :show="show_rule" :bg="false" :backdrop="false">
        <div class="model_view white">
            <div class="top1">
              <p>活动规则</p>
              <img :src="close_img" @click="show_rule = false">
            </div>
            <div class="model_center">
              <div class="footer">
                <p class="top">活动时间：</p>
                <p class="mrtop">2017年9月22日至2017年12月31日</p>
                <p class="top">活动对象：</p>
                <p class="mrtop">所有手机用户</p>
                <p class="top">活动内容：</p>
                <p class="mrtop">1、进入活动页面进行视频测速，然后评分领取流量及抽奖；</p>
                <p class="mrtop">2、参与联通用户均可获赠100M省内流量，每个号码每月限赠送1次；</p>
                <p class="mrtop">3、评分后联通用户即有机会抽中500M省内流量，每个号码每月限中奖1次，年末更有终极大奖---多款手机等你来拿；</p>
                <p class="top">奖品详情：</p>
                <p class="mrtop">1、赠送流量为省内流量，以您提供号码的手机号码归属地为准。</p>
                <p class="mrtop">2、每月6日至20日参与活动的流量可实时到账，其他时间则在次月6日前到账，到账后会有短信通知。</p>
                <p class="mrtop">3、赠送流量当月有效，不可结转。</p>
              </div>
            </div>
            <div class="footer_btn">
              <!-- <custom-button @click.native="start_test()" class="custom_btn">开始测速</custom-button> -->
            </div>
        </div>
    </Modal>
    <Modal :show="loading_model" :bg="false" :backdrop="false">
        <div class="model_view">
            <div class="model_center" style="margin-top:50%">
              <!-- loading -->
              <Vue-loading type="bars" color="#fff" :size="{ width: '80px', height: '80px' }"></Vue-loading>
            </div>
        </div>
    </Modal>
  </div>
</template>

<script>
import CustomButton from '../components/CustomButton'
import wxSet from '../assets/js/Wx'
import Modal from '../components/Modal'
import VueLoading from 'vue-loading-template'
import api from '../api/config'
export default {
  components: {
    CustomButton,
    Modal,
    VueLoading
  },
  data() {
    return {
      isWx: isWx, //是否在微信打开，默认为true
      wx_name: '', //用户微信名
      loading_model: false,
      num_error: false, //手机号错误提示文字
      picked: '',
      show_rule: false, //
      phone_num: null, //参与手机号
      bg_img: require("../../static/img/home_bg.png"),
      img_url: "./static/img/home_title.png",
      close_img: "./static/img/close.png"
    }
  },
  created() {
    if (isWx) {
      wxSet.hideShare();
    }
    console.log('是否wx:' + isWx);
  },
  mounted() {
    this.$nextTick(function() {
      this.get_userMsg();
    })
  },

  watch: {
    aiqiyi: function(val) {
      console.log('aiqiyi:' + val);
    },
    youku: function(val) {
      console.log("youku:" + val);
    },
    picked: function(val) {
      console.log(val);
      // this.$bus.emit('ratio',val);
      localStorage.setItem('ratio', val);
    },
  },
  methods: {
    press: function() {
      this.num_error = false;
    },
    get_userMsg: function() {
      var _this = this;
      api.start(_this, {}, (back) => {
        localStorage.setItem('openid', back.data.repBody.openid);
        _this.wx_name = back.data.repBody.nickname;
        console.log('openid:' + back.data.repBody.openid);
      });
    },
    participate_in: function() {
      var _this = this;
      if (!(/^1[34578]\d{9}$/.test(_this.phone_num))) {
        _this.num_error = true;
      } else {
        _this.loading_model = true;
        _this.num_error = false;
        var body = {
          "phone": _this.phone_num.trim(),
          "name": isWx ? _this.wx_name : 'undefined',
        }
        api.login(_this, body, (res) => {
          _this.loading_model = false
          if (res.data.resCode == '000000') {
            // console.log('号码与微信名正确');
            localStorage.setItem('join_num', _this.phone_num)
            _this.$router.push({
              name: 'Flash'
            });
          } else if (res.data.resCode == '200001') {
            // console.log('号码正确，微信名为空');
          } else if (res.data.resCode == '200002') {
            // console.log('号码为空，微信正确');
            _this.num_error = true;
          } else if (res.data.resCode == '200003') {
            // console.log('号码为空，微信名都为空');
          }
        });
      }
    },

  },
}
</script>

<style lang="scss" scoped>
@keyframes wobble {
    from {
        transform: none;
    }

    15% {
        transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }

    30% {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }

    45% {
        transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }

    60% {
        transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }

    75% {
        transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }

    to {
        transform: none;
    }
}

.wobble {
    -webkit-transform: transition3d(0,0,0);
    animation-name: wobble;
    animation-duration: 1s;
    animation-fill-mode: both;
}
.content {
    width: 100%;
    // background-repeat: no-repeat !important;
    padding-top: 10%;
    background-size: cover!important;
    background-position: center;
}
.center {
    width: 100%;
    img {
        width: 100%;
    }
}
.bottom {
    margin-top: 83%;
    width: 100%;
    height: 340px;
    font-size: 60px;
    color: #fff;
    padding-bottom: 85%;
    .btn_content {
        width: 100%;
        margin-top: 10%;
        // margin: 50px auto 0;
        .custom_btn {
            width: 45%;
            height: 85px;
            display: inline-block;
        }
    }
    .input {
        width: 85%;
        height: 80px;
        border-radius: 15px;
        font-size: 33px;
        text-align: left;
        padding-left: 5%;
        outline: 0;
    }
    .erro_red {
        color: red;
        font-size: 25px;
    }
    .btn_place {
        // margin-top: 10%;
        width: 60%;
        height: 120px;
        margin: 60px auto 0;
        padding: 10px;
        border-radius: 70px;
        background-color: #2d68f2;
        background: -webkit-linear-gradient(top, #a4c8fe, #2d68f2);
        background: linear-gradient(top, #a4c8fe, #2d68f2);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        .btn {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 45px;
            color: #005fd1;
            font-weight: 700;
            border-radius: 60px;
            outline: none;
            background-color: #41e7ff;
            background: -webkit-linear-gradient(top, #84ecff 30%, #41e7ff 60%, #26c1f9 100%);
            background: linear-gradient(top, #84ecff 30%, #41e7ff 60%, #26c1f9 100%);
        }
    }
}
.footer {
    width: 85%;
    margin: 0 auto;
    background-color: #fff;
    // border: 1px solid #000;
    // border-radius: 15px;
    // padding: 30px 25px 25px;
    padding: 20px 0 0;
    font-size: 25px;
    text-align: left;

    .top {
        // color: #005fd1;
        color: #e1690e;
        font-size: 27px;
        padding-bottom: 3%;
    }
    .mrtop {
        padding-bottom: 1%;
    }
}
.model_view {
    padding-bottom: 1%;
    border-radius: 20px;
    z-index: 100;
    position: relative;
    width: 90%;
    margin: 10% auto 0;
    .top1 {
        border-bottom: 1px solid #ddd;
        padding: 3% 0;
        p {
            font-size: 35px;
        }
        img {
            position: absolute;
            top: 3%;
            left: 88%;
            width: 5%;
        }
    }
    .model_center {
        font-size: 36px;
        // margin-top: 5%;
        .text {
            overflow: hidden;
            padding: 0 10% 2%;
            .img1 {
                border: 2px solid #ddd;
                border-radius: 20px;
                box-shadow: 3px 10px 10px #ddd;
                width: 40%;
                float: left;
            }
            .img2 {
                border: 2px solid #ddd;
                border-radius: 20px;
                box-shadow: 3px 10px 10px #ddd;
                width: 42%;
                float: right;
            }
        }
        .checkbox {
            overflow: hidden;
            // .one {
            //     // background: url("../../static/img/true.png") no-repeat;
            // }
            #checkbox1 {
                width: 8%;
                height: 40px;
                border: 1px solid #000;
                border-radius: 10px;
                float: left;
                margin-left: 22%;
                margin-top: 3%;
            }
            #checkbox2 {
                float: left;
                width: 8%;
                height: 40px;
                border: 1px solid #000;
                border-radius: 10px;
                margin-left: 39%;
                margin-top: 3%;
            }
        }
        .p {
            margin-top: 8%;
        }
        .foot_text {
            // margin-top: 10%;
            font-size: 25px;
            color: red;
            text-align: left;
            padding-left: 7%;
        }
        .erro_red {
            margin-top: 3%;
            color: red;
        }
        label {
            input {
                outline: 0;
                width: 65%;
                height: 100px;
                font-size: 36px;
                border: 2px solid #ddd;
                border-radius: 20px;
                padding-left: 5%;
            }
        }

    }
    .none_bottom {
        padding-bottom: 0;
    }
    .btn_close {
        width: 60%;
        height: 120px;
        line-height: 120px;
        margin: 60px auto 0;
        // border: 10px solid #4474f2;
        border-radius: 50px;
        background-color: #3fe1fd;
        background-repeat: no-repeat;
        background-size: cover;
        font-size: 45px;
        color: #005fd1;
        font-weight: bolder;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3fe1fd), color-stop(100%,#ffffff));
    }
    .footer_btn {
        width: 70%;
        margin: 7% auto 0;
        .custom_btn {
            height: 70px;
        }
    }
}
</style>
