<template lang="html">
    <div class="content" :style="{background:'url(' + bg_img + ')'}">
        <section style="padding-top: 23%;">
            <p style="color:#fff;font-size: 31px;padding-bottom: 5%;">来为你网速打个分吧！</p>
            <!-- <Rate :length="5" :value="0" @afterRate="onAfterRate"></Rate> -->
            <div style="margin-bottom:5%;position:relative">
              <img :src="header_img" alt="" >
              <p style="position:absolute;top: 62%;left: 42%;font-size: 40px;color:red">{{star_num}}颗星</p>
            </div>
            <keep-alive>
              <Rate @getStarNum="getStarNum" style="width: 90%;margin: 0 auto;"></Rate>
            </keep-alive>
            <!-- <Start :kk="star_num"></Start> -->
        </section>
        <section class="center">
              <Custom-button @click.native="go_had()" class="custom_btn">
                <!-- <span v-if="success_end">您已领取</span> -->
                <span>领100M流量</span>
              </Custom-button>
        </section>
        <section style="width:100%;padding-bottom: 8%;">
            <!-- <div class="footer">
                <p class="top">评分细则</p>
                <p class="table"><span class="before"><span style="color:#d66816">（50M以上）</span>火箭速度手游、直播卡顿，网速速度杠杠的！</span><span class="border_none">5星</span><img style="margin: 0 auto;display: block;width: 27%;padding:10px;" :src="star1" alt=""></p>
                <p class="table"><span class="before"><span style="color:#d66816">（10M以上）</span>飞机速度看视频、听音乐不用缓冲啦！</span><span class="border_none">4星</span><img style="margin: 0 auto;display: block;width: 22%;padding:5px;" :src="star2" alt=""></p>
                <p class="table"><span class="before"><span style="color:#d66816">（6M以上）</span>汽车速度，网页、图片加载棒棒哒！</span><span class="border_none">3星</span><img style="margin: 0 auto;display: block;width: 18%;padding:5px;" :src="star3" alt=""></p>
                <p class="table"><span class="before"><span style="color:#d66816">（3M以上）</span>走路速度，页面转呀转，能不能走快点？</span><span class="border_none">2星</span><img style="margin: 0 auto;display: block;width: 14%;padding:5px;" :src="star4" alt=""></p>
                <p class="table bottom_none"><span class="before"><span style="color:#d66816">（3M以下）</span>蜗牛速度我的手机还好吗？</span><span class="border_none">1星</span><img style="margin: 0 auto;display: block;width: 9%;padding:5px;" :src="star5" alt=""></p>
            </div> -->
        </section>
        <Modal :show="show_login" :bg="false" :backdrop="false">
            <div class="model_view white">
                <div class="top">
                    <h3>提示</h3>
                    <img :src="close_img" @click="show_login = false">
                </div>
                <div class="model_center">
                    <label>手机号：
                        <input @click="click_num" :class="{wobble:num_error}" maxlength="11" type="tel" v-model="phone_num" placeholder="请填写领奖联通手机号码">
                    </label>
                    <p class="erro_red" v-if="num_error">*请输入正确的联通手机号</p>
                </div>
                <Custom-button @click.native="draw_now()" class="custom_btn">马上领取</Custom-button>
            </div>
        </Modal>
        <Modal :show="success_msg" :bg="false" :backdrop="false">
            <div class="model_view white">
                <div class="top">
                    <h3>恭喜</h3>
                    <img :src="close_img" @click="success_msg = false">
                </div>
                <div class="model_center none_bottom">
                    <div class="text">
                      您已成功领取100M省内流量，流量将于{{dayMsg}}。留下宝贵意见，私人网络专家为您服务！
                    </div>
                </div>
                <Custom-button @click.native="advise()" class="custom_btn">提意见</Custom-button>
            </div>
        </Modal>
        <Modal :show="had_msg" :bg="false" :backdrop="false">
            <div class="model_view white">
                <div class="top">
                    <h3>提示</h3>
                    <img :src="close_img" @click="had_msg = false">
                </div>
                <div class="model_center none_bottom">
                    <div class="text" v-if="default_num">
                      您本月已领取过100m流量，留下宝贵意见，私人网络专家为您服务，感谢您的参与！
                    </div>
                    <div class="text" v-else>
                      该号码本月已领取过
                    </div>
                </div>
                <Custom-button v-if="default_num" @click.native="advise()" class="custom_btn">提意见</Custom-button>
                <Custom-button v-else @click.native="go_end()" class="custom_btn">确定</Custom-button>
            </div>
        </Modal>
        <Modal :show="no_grade" :bg="false" :backdrop="false">
            <div class="model_view white">
                <div class="top">
                    <h3>提示</h3>
                    <img :src="close_img" @click="no_grade = false">
                </div>
                <div class="model_center none_bottom">
                    <div class="text">请先评分
                    </div>
                </div>
                <Custom-button @click.native="no_grade = false" class="custom_btn">确定</Custom-button>
            </div>
        </Modal>
        <Modal :show="yet_had" :bg="false" :backdrop="false">
            <div class="model_view white">
                <div class="top">
                    <h3>提示</h3>
                    <img :src="close_img" @click="yet_had = false">
                </div>
                <div class="model_center none_bottom">
                  <!-- <div class="text" v-if="default_num && isWx">该号码本月已领取过100M，为感谢你的参与仍可参与摇一摇抽奖活动
                  </div> -->
                  <div class="text" v-if="default_num">该号码本月已领取过100M，为感谢你的参与仍可参与摇一摇抽奖活动
                  </div>
                  <div class="text" v-else>该号码本月已领取过
                  </div>
                </div>
                <!-- <Custom-button v-if="default_num && isWx" @click.native="go_lottery" class="custom_btn">去摇奖</Custom-button> -->
                <Custom-button v-if="default_num" @click.native="go_lottery" class="custom_btn">去摇奖</Custom-button>
                <Custom-button v-else @click.native="go_end()" class="custom_btn">确定</Custom-button>
            </div>
        </Modal>
        <Modal :show="success_had" :bg="false" :backdrop="false">
            <div class="model_view white">
                <div class="top">
                    <h3>恭喜</h3>
                    <img :src="close_img" @click="success_had = false">
                </div>
                <div class="model_center none_bottom">
                    <div class="text">您已成功领取100M省内流量，流量将于{{dayMsg}}。</div>
                </div>
                  <!-- <Custom-button v-if="default_num && isWx" @click.native="go_lottery" class="custom_btn">
                    去摇奖
                  </Custom-button> -->
                  <Custom-button v-if="default_num" @click.native="go_lottery" class="custom_btn">
                    去摇奖
                  </Custom-button>
                  <Share-btn v-else-if="!default_num && isWx" class="btn_close">
                      喊上小伙伴一起来测速
                  </Share-btn>
                  <Custom-button v-else @click.native="success_had = false" class="custom_btn">确定</Custom-button>
            </div>
        </Modal>
        <Modal :show="loading_modal" :bg="false" :backdrop="false">
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
// import Rate from 'iview/src/components/Rate' //按需加载iview里的rate组件
import Rate from '../components/StarComponent'
import wxSet from '../assets/js/Wx'
import Modal from '../components/Modal'
import ShareBtn from '../components/Share'
import CustomButton from '../components/CustomButton'
import VueLoading from 'vue-loading-template'
import api from '../api/config'
export default {
  components: {
    Rate,
    Modal,
    ShareBtn,
    CustomButton,
    VueLoading
  },
  data() {
    return {
      header_img: './static/img/header.png',
      star1: './static/img/star5.png',
      star2: './static/img/star4.png',
      star3: './static/img/star3.png',
      star4: './static/img/star2.png',
      star5: './static/img/star1.png',
      isWx: isWx, //是否在微信打开，默认为true
      success_end: false, //已领取 false为未领取
      join_phoneNum: '', //参与手机号码
      yet_had: false, //已领取过提示弹窗
      no_grade: false, //未评分提示弹窗
      had_msg: false, //第二次打低分提示框
      loading_modal: false, //加载动画
      first_num: true, //参与号码是联通号码，默认为true
      default_num: false, //参与号码是联通号码，默认为false
      star_num: 0, //评价星值
      phone_num: '', //手机号
      bg_img: "./static/img/b.png",
      show_login: false, //判断联通手机号弹框
      num_error: false, //不是联通号码
      success_msg: false, //评分低弹框
      success_had: false, //高评分弹框
      close_img: "./static/img/close.png",
      URL_openid: '',
      share_info: { //分享信息
        link: '',
        title: '',
        desc: '',
        img_url: ''
      },
      dayMsg:'',//显示领取成功后的提示
      advise_url: "http://cump.linkwis.com/vservice/complain?unionfrom=speedtest"
    }
  },
  created() {
    // console.log("asdasasdasdasd:" + basePath);
  },
  mounted() {
    this.init_shareMsg();
    if (isWx) {
      this.getJsSign();
    }
    document.body.style.cssText = 'height: 100%; overflow: hidden;';
    document.getElementById('app').style.height = '100%';
  },
  beforeDestroy() {
    document.body.style.cssText = 'height: auto; overflow: auto;';
    document.getElementById('app').style.height = 'auto';
  },
  methods: {
    go_end: function(){
      this.$router.push({
        name: 'AllEnd'
      })
    },
    getStarNum: function(key){
      this.star_num = key;
    },
    init_shareMsg: function() {
      this.URL_openid = localStorage.getItem('openid');
      this.share_info.title = '我测速后获得'+localStorage.getItem('gameOverScore')+'分，你呢';
      this.share_info.link = basePath+"?TestScore="+localStorage.getItem('gameOverScore')+"#/ShareAfter";
      this.share_info.desc = '测网络速度，赢500M流量';
      this.share_info.img_url = basePath + 'static/img/home_title.jpg'
    },
    advise: function() {
      var _this = this;
      _this.loading_modal = true;
      var body1 = {
        phone: _this.phone_num ? _this.phone_num : _this.join_phoneNum,
        isEntry: 1
      };
      api.insertInfo(_this, body1, (res)=> {
        if(res.data.resCode == "000000"){
          _this.loading_modal = false;
          var phoneNum;
          _this.first_num?phoneNum = _this.join_phoneNum.trim():phoneNum = _this.phone_num.trim();
          window.location.href = _this.advise_url + '&extphone=' + phoneNum + '&exttype=1';
        }else{
          var phoneNum;
          _this.first_num?phoneNum = _this.join_phoneNum.trim():phoneNum = _this.phone_num.trim();
          window.location.href = _this.advise_url + '&extphone=' + phoneNum + '&exttype=1';
        }
      });
    },
    go_lottery: function() {
      // 音频激活
      if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        var audioDom = document.getElementById('appAudio');
        audioDom.muted = true;
        audioDom.play();
      };
      this.$router.push({
        name: 'Lottery'
      })
    },
    click_num: function() {
      this.num_error = false;
    },
    // 参与号码为非联通领取
    draw_now: function() {
      var _this = this;
      _this.first_num = false;
      _this.default_num = false;
      _this.loading_modal = true;
      var body = {
        "phone": _this.phone_num.trim(), //手机号码   		(必填)
      };
      api.checkPhone(_this, body, (res) => {
        if (res.data.resCode == "000000") {
          console.log('是联通号码');
          _this.loading_modal = _this.num_error = _this.show_login = false;
          _this.had_flow(0);
          localStorage.setItem('endPhoneNum',_this.phone_num);
        } else if (res.data.resCode == "200001") {
          console.log('非联通号码');
          _this.loading_modal = false;
          _this.num_error = true;
        }
      });
    },
    // 领取100m
    go_had: function() {
      var _this = this;
      _this.join_phoneNum = localStorage.getItem('join_num');
      console.log(_this.star_num);
      localStorage.setItem('star_num', _this.star_num);
      var content = {
        "pkId":localStorage.getItem('pkId'),
        "grade":_this.star_num
      }
      api.updateGrede(_this,content,(back)=>{
        console.log(back);
      })
      if (_this.star_num == 0) {
        _this.no_grade = true;
      } else if (_this.star_num != 0) {
        _this.loading_modal = true;
        var body = {
          "phone": _this.first_num?_this.join_phoneNum.trim():_this.phone_num.trim(), //参与时的手机号码   		(必填)
        };
        api.checkPhone(_this, body, (res) => {
          console.log(res.data.repBody);
          if (res.data.resCode == "000000") {
            console.log('是联通号码');
            localStorage.setItem('endPhoneNum',_this.join_phoneNum);
            _this.first_num?_this.default_num = true:_this.default_num =false;
            if (1 <= _this.star_num && _this.star_num <= 3) {
              _this.had_flow(1);
            } else if (_this.star_num > 3) {
              _this.had_flow(2);
            }
          } else if (res.data.resCode == "200001") {
            console.log('非联通号码');
            _this.default_num = false;
            _this.first_num = false;
            _this.loading_modal = false;
            _this.show_login = true;
          }
        });
      }
    },
    had_flow: function(e) {
      var _this = this;
      var user_openid = '';
      if (isWx) {
        user_openid = localStorage.getItem('openid');
      } else {
        user_openid = _this.join_phoneNum;
      }
      var body = {
        "mobile": _this.phone_num ? _this.phone_num : _this.join_phoneNum, //手机号码   		(必填)
        "idxUserid": user_openid,
      };
      api.getPrize(_this, body, (res) => {
        if (res.data.resCode == "000000" && res.data.repBody == "领取成功") {
          var body1 = {
            phone: _this.phone_num ? _this.phone_num : _this.join_phoneNum,
            starLevel: _this.star_num?_this.star_num:'',
            pname: _this.phone_num ? _this.phone_num : _this.join_phoneNum,
            isPrize: 1,
            isWin: 1,
            stuckPerc: localStorage.getItem('stuckPerc')
          };
          api.insertInfo(_this, body1, (res)=> {
            if(res.data.resCode == "000000"){
              _this.loading_modal = false;
            }
          });
          console.log(e);
          _this.setDayMsg();
          if (e == 1) {
            _this.success_msg = true;
          } else if (e == 2) {
            _this.success_had = true;
          } else if (e == 0) {
            _this.success_had = true;
            _this.show_login = false;
          }
        } else if (res.data.resCode != "000000") {
          _this.loading_modal = false;
          alert(res.data.resMsg)
        } else if (res.data.resCode == "000000" && res.data.repBody == "该号码本月已领取") {
          _this.loading_modal = false;
          if(e == 1){
            _this.had_msg = true
          }else if(e == 2){
            _this.yet_had = true
          }else if (e == 0) {
            _this.had_msg = true;
            _this.show_login = false
          }
        } else {
          _this.loading_modal = false;
          try {
            alert(res.data.repBody || '出错了')
          }catch(e) {
            alert('出错了')
          }
        }
      });
    },
    //获取数字签名
    getJsSign: function() {
      var _this = this;
      var body = {
        "jsurl": location.href.split('#')[0] //获取当前URL
      };
      api.obtainJssdk(_this, body, (res) => {
        wxSet.config(res.data.repBody, true, function() {
          wxSet.share(_this.share_info.title, _this.share_info.desc, _this.share_info.link, _this.share_info.img_url, (type, status) => {
            console.log('type:' + type);
            console.log('status:' + status);
          });
        })
      });
    },
    //设置流量领取显示文字
    setDayMsg: function(){
      var _this = this;
      var thisTime = new Date().getDate();
      console.log(thisTime);
      if(thisTime >= 1 && thisTime <= 5){
        _this.dayMsg = '当月6日到账'
      }else if(thisTime >= 6 && thisTime <= 20){
        _this.dayMsg = '当日到账'
      }else if(thisTime >= 21 && thisTime <= 31){
        _this.dayMsg = '次月6日到账'
      }
    }

  }
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
    animation-name: wobble;
    animation-duration: 1s;
    animation-fill-mode: both;
}
.content {
    background-size: 100%!important;
    background-repeat: no-repeat!important;
}

.center {
    margin-top: 25%;
    width: 100%;
    padding-bottom: 26%;
    // position: relative;
    // z-index: 99;
    .custom_btn {
        width: 60%;
        height: 75px;
    }
    .center_btn {
        width: 60%;
        height: 120px;
        line-height: 120px;
        margin: 60px auto 0;
        border: 10px solid #4474f2;
        border-radius: 50px;
        background-color: #3fe1fd;
        background-repeat: no-repeat;
        background-size: cover;
        font-size: 45px;
        color: #005fd1;
        font-weight: bolder;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3fe1fd), color-stop(100%, #ffffff));
    }
}

.footer {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    // border: 1px solid #000;
    border-radius: 15px;
    font-size: 31px;
    text-align: center;
    .top {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        width:100%;
        color: #fff;
        font-size: 32px;
        font-weight: bolder;
        padding-top: 3%;
        padding-bottom: 3%;
        letter-spacing: 4px;
        background-color: #4c75b4;
        background: -webkit-gradient(linear, top, #9bb3d9 20%, #6c8ec3 60%, #4c75b4 80%);
        background: -webkit-linear-gradient(top, #9bb3d9 20%, #6c8ec3 60%, #4c75b4 80%);
    }
    .table {
        width: 100%;
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
        // height: 90px;
        .before {
            float: left;
            // display: block;
            text-align: left;
            // height: 90px;
            // line-height: 90px;
            width: 73%;
            // padding: 10px;
            padding: 10px 10px 5px;
            border-right: 1px solid #ddd;
            font-size: 25px;
        }
        .border_none {
            // height: 90px;
            // line-height: 90px;
            color: #d66816;
            border-right: none;
        }
    }
    .bottom_none {
        border-bottom: none;
    }
}

.model_view {
    padding-bottom: 5%;
    border-radius: 20px;
    z-index: 100;
    position: relative;
    width: 90%;
    margin: 50% auto 0;
    .custom_btn {
        // margin-top: 5%;
        width: 70%;
        height: 75px;
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
        height: 150px;
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
