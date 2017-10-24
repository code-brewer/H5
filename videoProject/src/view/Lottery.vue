<template>
<div class="lottery_wrap" :style="{'background-image': 'url(' + page_bg + ')'}">
  <div class="title">摇一摇抽取奖品</div>
  <div class="lottery">
    <img src="../assets/img/roke.png" class="lottery_img" :class="{rorate_lottery: is_lottery}">
  </div>
  <div class="footer">用力摇更容易中奖哦！</div>
  <modal :show="bad" :bg="false" :backdrop="false">
    <div class="model_view white">
      <div class="top">
        <h3>很遗憾！</h3>
        <!-- <img :src="close_img" @click="bad = false"> -->
      </div>
      <div class="model_center none_bottom">
        <div class="text">哎呀！您离奖品仅差0.1厘米。</div>
      </div>
      <Share-btn class="btn_close" v-if="isWx">
        喊上小伙伴一起来测速
      </Share-btn>
      <Custom-button v-else @click.native="go_end()" class="custom_btn">确定</Custom-button>
    </div>
  </modal>
  <modal :show="success" :bg="false" :backdrop="false">
    <div class="model_view white">
      <div class="top">
        <h3>恭喜您！</h3>
        <!-- <img :src="close_img" @click="success = false"> -->
      </div>
      <div class="model_center none_bottom">
        <div class="text">您已成功领取500M省内流量，将于下月5日前到账，流量仅限当月使用。</div>
      </div>
      <Share-btn class="btn_close" v-if="isWx">
        晒一晒
      </Share-btn>
      <Custom-button v-else @click.native="go_end()" class="custom_btn">确定</Custom-button>
    </div>
  </modal>
  <audio v-if="audioCtrl" :src="audio" ref="audio"></audio>
</div>
</template>
<script>
import wxSet from '../assets/js/Wx'
import CustomButton from '../components/CustomButton'
import Modal from '../components/Modal'
import ShareBtn from '../components/Share'
import api from '../api/config'
// import '../assets/js/shake'
export default {
  components: {
    CustomButton,
    Modal,
    ShareBtn
  },
  data() {
    return {
      audioDom: '', //音频dom元素
      isWx: isWx, //是否在微信打开，默认为true
      success: false, //成功
      bad: false, //失败
      close_img: "./static/img/close.png",
      is_lottery: false, //摇一摇图片动画控制
      audioCtrl: true, //摇一摇声音控制
      firstPlay: 1, //第一次摇就播放声音和出现摇摇动画
      page_bg: require('../assets/img/lottery_bg.png'),
      audio: './static/shake.wav',
      share_info: {
        link: '',
        title: '',
        desc: '',
        img_url: ''
      },
      url_openid: ''
    }
  },
  mounted() {
    var _this = this;
    document.body.style.cssText = 'height: 100%; overflow: hidden;';
    document.getElementById('app').style.height = '100%';
    this.init_shareMsg();
    this.shake();
    this.getJsSign();
  },
  beforeDestroy() {
    document.body.style.cssText = 'height: auto; overflow: auto;';
    document.getElementById('app').style.height = 'auto';
  },
  methods: {
    go_end: function() {
      this.$router.push({
        name: 'AllEnd'
      })
    },
    init_shareMsg: function() {
      this.URL_openid = localStorage.getItem('openid');
      this.share_info.title = '我测速后获得'+localStorage.getItem('gameOverScore')+'分，你呢';
      this.share_info.link = basePath+"?TestScore="+localStorage.getItem('gameOverScore')+"#/ShareAfter";;
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
        console.log("appid:" + res.data.repBody.appid);
        wxSet.config(res.data.repBody, true, function() {
          wxSet.share(_this.share_info.title, _this.share_info.desc, _this.share_info.link, _this.share_info.img_url, (type, status) => {
            console.log('type:' + type);
            console.log('status:' + status);
          });
        });
      });
    },
    /** 摇一摇 */
    shake: function() {
      var _this = this;

      function lottery() {
        var body = {
          "idxUserid": localStorage.getItem('endPhoneNum')
        };
        api.prize(_this, body, (res) => {
          if (res.data.repBody == '领取成功') {
            _this.success = true;
          } else {
            _this.bad = true;
          }
          _this.is_lottery = false;
          _this.audioCtrl = false;
          _this.firstPlay = 2
        }, (err) => {
          _this.bad = true;
          _this.is_lottery = false;
          _this.audioCtrl = false;
          _this.firstPlay = 2
        });
      }

      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      }
      //获取加速度信息
      //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
      //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
      var SHAKE_THRESHOLD = 15000;
      var last_update = 0;
      var x, y, z, last_x = 0,
        last_y = 0,
        last_z = 0;

      function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 10) {
          var diffTime = curTime - last_update;
          last_update = curTime;
          x = acceleration.x;
          y = acceleration.y;
          z = acceleration.z;
          var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
          if (speed > SHAKE_THRESHOLD) {
            // alert("你中奖啦！"); // Do something
            if (_this.firstPlay == 1) {
              _this.is_lottery = true;
              _this.audioCtrl = true;
              if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                _this.audioDom = document.getElementById('appAudio');
                _this.audioDom.muted = false;
                _this.audioDom.play()
              } else if (/Android (\d+\.\d+)/.test(ua)) {
                _this.$refs.audio.play()
              } else {
                _this.$refs.audio.play()
              };
              var i = 0;
              var timer = setInterval(function() {
                i += 1;
                if (i == 1) {
                  clearInterval(timer);
                  lottery()
                }
              }, 1000)
            }

          }
          last_x = x;
          last_y = y;
          last_z = z;
        }
      }
    },
    //shake event callback
    shakeEventDidOccur: function() {
      //put your own code here etc.
      // alert('Shake!');
    },
    /**
     * 转动转盘
     */
    rotateLottery() {
      this.is_lottery = true;
      setTimeout(() => {
        this.is_lottery = false;
      }, 4000);
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes shake {
    from,
    to {
        transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translate3d(10px, 0, 0);
    }
}
.lottery_wrap {
    padding-top: 25%;
    height: 100%;
    background: #2f88ff 0 0 / 100% 100% no-repeat;
}
.title {
    padding: 40px 0 70px;
    color: white;
    font-size: 36px;
}
.lottery {
    position: relative;
    margin-bottom: 50px;
    .lottery_img {
        display: block;
        width: 533px;
        height: 533px;
        margin: 0 auto;
    }
    .lottery_pointer {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 146px;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
    .rorate_lottery {
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-name: shake;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(1440deg);
        }
    }
}
.footer {
    width: 75%;
    background-color: #0166b2;
    border-radius: 30px;
    margin: 0 auto;
    color: #fff;
    font-size: 36px;
}
.btn {
    width: 65%;
    height: 80px;
}
.model_view {
    padding-bottom: 5%;
    border-radius: 20px;
    z-index: 100;
    position: relative;
    width: 90%;
    margin: 50% auto 0;
    .custom_btn {
        margin-top: 15%;
        width: 70%;
        height: 75px;
    }
    .btn_close {
        width: 70%;
        height: 90px;
        line-height: 90px;
        margin: 60px auto 0;
        border-radius: 50px;
        background-color: #41e7ff;
        background: -webkit-linear-gradient(top, #84ecff 30%, #41e7ff 60%, #26c1f9 100%);
        font-size: 31px;
        color: #005fd1;
        font-weight: bolder;
    }
    .top {
        border-bottom: 1px solid #ddd;
        padding: 5% 0;
        h3 {
            font-size: 31px;
        }
        img {
            position: absolute;
            top: 7%;
            left: 88%;
            width: 5%;
        }
    }
    .model_center {
        font-size: 31px;
        margin-top: 5%;
        .text {
            padding: 0 8%;
        }
        .erro_red {
            margin-top: 3%;
            color: red;
            font-size: 25px;
        }
        label {
            input {
                outline: 0;
                width: 60%;
                height: 75px;
                font-size: 25px;
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
        width: 70%;
        height: 90px;
        line-height: 90px;
        margin: 60px auto 0;
        border-radius: 50px;
        background-color: #41e7ff;
        background: -webkit-linear-gradient(top, #84ecff 30%, #41e7ff 60%, #26c1f9 100%);
        font-size: 31px;
        color: #005fd1;
        font-weight: bolder;
    }
}
</style>
