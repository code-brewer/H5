<template lang="html">
    <div class="content" :style="{background:'url(' + bg_img + ')', 'background-size': '100% 100%'}">
        <div class="mask" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 1000;"  v-show="show_page"></div>
        <section class="top" :style="{paddingTop:top_distance}">
            <p>测速时间：{{test_time}}</p>
            <p>测速地点：{{test_place}}</p>
            <p>平均速率：{{rate_num*8}}Mbps</p>
            <!-- <p>初始缓冲时延：{{startTimeLater}}s</p>
            <p>视频纯播放时长：{{videoPlayDuration}}s</p>
            <p>卡顿时长占比：{{stallingRatio}}</p> -->
            <!-- <table>
              <thead>
                <th class="border_line">测速时间</th>
                <th class="border_line">平均速率</th>
                <th class="border_line border_rightnone">测速地点</th>
              </thead>
              <tbody>
                <tr>
                  <td class="wid">{{test_time}}</td>
                  <td class="wid">{{rate_num*8}}Mbps</td>
                  <td class="wid border_rightnone">{{test_place}}</td>
                </tr>
                <tr>
                  <th class="border_line1">初始缓冲时延</th>
                  <th class="border_line1">视频播放时长</th>
                  <th class="border_line1 border_rightnone">卡顿占比</th>
                </tr>
                <tr>
                  <td class="wid1">{{startTimeLater}}s</td>
                  <td class="wid1">{{videoPlayDuration}}s</td>
                  <td class="wid1 border_rightnone">{{stallingRatio}}</td>
                </tr>
              </tbody>
            </table> -->
        </section>
        <section class="center">
            <img :src="img_url" alt="" class="row" :style="{transform:'rotate(' + style_obj + 'deg)'}">
            <div class="font_center">
                <p class="big">{{end_score}}<span>分</span></p>
                <p style="font-size: 20px;">视频体验评分(0-100分)</p>
            </div>
        </section>
        <!-- <section class="a">
            <p>成功击败全国{{percent_num}}%的用户</p>
        </section> -->
        <section class="btn">
            <Custom-button @click.native="go_grade" style="margin-top: 40px">评分领流量</Custom-button>
            <Custom-button @click.native="reset" style="margin-top: 40px">重新测速</Custom-button>
        </section>
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
import Modal from '../components/Modal'
import VueLoading from 'vue-loading-template'
import CustomButton from '../components/CustomButton'
import wxSet from '../assets/js/Wx'
import api from '../api/config'
export default {
  components: {
    CustomButton,
    Modal,
    VueLoading
  },
  created() {
    if (isWx) {
      wxSet.hideShare()
    };
    var back_obj = JSON.parse(localStorage.getItem('back_obj'));
    this.rate_num = (back_obj.avgRate / 1024 / 1024 * 1000).toFixed(2)
    // this.item_score = back_obj.idxScore;
  },
  mounted() {
    var _this = this;
    _this.refresh = sessionStorage.getItem("condition");
    if (_this.refresh == 1) {
      _this.show_page = true;
      _this.loading_modal = true;
      sessionStorage.setItem("condition", 2);
      _this.getPhpInfo();
      location.reload();
    }else if (_this.refresh == 2) {
      _this.show_page = false;
      _this.loading_modal = false;
      _this.getPhpInfo()
    };
    _this.setTop();
    // _this.get_nowTime();
    var address = window.sessionStorage.getItem('address');
    if (address) {
        _this.test_place = address;
        _this.isaddress = "位置来源于百度接口"
    } else {
        _this.test_place = localStorage.getItem("address");
        _this.isaddress = "位置来源于后端接口"
    };
    var addressNull = window.sessionStorage.getItem('addressNull');
    if(addressNull){
      _this.isaddress = addressNull
    };
    _this.test_time = localStorage.getItem("getNowTime")
    // _this.hight_number = (localStorage.getItem("peakValue") / 1024 * 1000 / 1024).toFixed(2)
  },
  data() {
    return {
      show_page: true,//刷新之前的页面显示状态
      refresh: 0, //刷新状态
      loading_modal: false,
      // hight_number: '', //峰值
      top_distance: '25%', //顶部样式设置间距
      percent_num: "", //百分比
      test_time: "", //测试时间
      test_place: "", //测试地址
      rate_num: 0, //平均速率
      img_url: "./static/img/bg.png",
      timer: 0, //定时器
      style_obj: 240, //初始度数
      end_obj: 460, //度数临界值，最大值
      item_score: 0, //总分数
      end_score: 0, //结束总分
      bg_img: "./static/img/b.png",
      videoPlayDuration:'',//视频纯播放时长
      stallingRatio:'',//卡顿占比
      startTimeLater:'',//初始缓冲时延
      isaddress: ''//识别位置获取的路径，是百度的还是接口的信息
    }
  },
  computed: {

  },
  methods: {
    getPhpInfo: function() {
      var _this = this;
      // _this.loading_modal = true;
      var back_obj = JSON.parse(localStorage.getItem('back_obj'));
      var initialBufferTime = back_obj.sbufferTime / 1000;
      var stuckTime = back_obj.getStuckTime / 1000;
      var playAllTime = back_obj.play_all_time / 1000;
      // alert('1---'+initialBufferTime + ':' + stuckTime + ':' + playAllTime);
      var videoPlayDurationOld = playAllTime - initialBufferTime - stuckTime;

      /** 计算卡顿占比 */
      var katurnNum = 0;
      if (videoPlayDurationOld == 0) {
        katurnNum = "--";
      } else if (stuckTime == 0) {
        katurnNum = 0;
      } else {
        katurnNum = (stuckTime / videoPlayDurationOld).toFixed(3);
      }
      _this.stallingRatio = katurnNum;
      /** 计算卡顿占比 */

      _this.videoPlayDuration = _this.changeTwoDecimal_f(videoPlayDurationOld);
      _this.startTimeLater = _this.changeTwoDecimal_f(initialBufferTime);
      if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        _this.startTimeLater *= 0.5;
      }

      if (_this.videoPlayDuration <= 10) {
        _this.item_score = 1;
        console.log('vmos:' + _this.item_score);
        if (_this.item_score) {
          _this.time_play();
          // _this.get_percentNum();
          if(sessionStorage.getItem('canSave') == 'true'){
            _this.save_data()
          }
        }
        return
      };

      var body = {
        "act": "getVMOS",
        "initialBufferTime": _this.startTimeLater, //初始缓冲时长(s)1.0
        "videoPlayDuration": videoPlayDurationOld,
        //视频纯播放时长 播放阶段总时长-初始缓冲时长-播放过程缓冲总时长
        "stallingRatio": katurnNum,
        //卡顿时长占比 播放过程中缓冲总时长／（播放阶段总时长-初始缓冲时长-播放过程中缓冲总时长）
        "videoBitrate": 8453.446106991525, //视频码率 视频大小/视频时长
        "videoResolution": 2, //视频清晰度
        "videoCode": 0, //视频编码算法
        "codeProfile": 2 //视频编码等级
      };
      localStorage.setItem('stuckPerc',katurnNum);
      api.getPhpInfo(_this, body, (back) => {
        _this.item_score = back.data.repBody.data.vmos;
        console.log('vmos:' + _this.item_score);
        var vmos_num = _this.changeTwoDecimal_f(_this.item_score);
        localStorage.setItem('vmos',vmos_num);
        if (_this.item_score) {
          _this.time_play();
          // _this.get_percentNum();
          if(sessionStorage.getItem('canSave') == "true"){
            _this.save_data()
          }
        }
      })
    },
    deg_num_S: function() {
      // var end_num1 = Math.round((this.end_obj - this.style_obj) / 100); //每刻的度数
      var end_num1 = (this.end_obj - this.style_obj) / 4; //每刻的度数
      return end_num1
    },
    //保存一位小数算法
    num_computed: function(e) {
      var a;
      a = Math.ceil(e * 10);
      return a * 1.0 / 10
    },
    //安卓设备全屏后设置页面往下拉10%，默认3%
    setTop: function() {
      // var ua = navigator.userAgent;
      console.log("ua:" + ua);
      if (/Android (\d+\.\d+)/.test(ua)) {
        this.top_distance = '25%';
      } else {
        this.top_distance = '25%';
      }
    },
    save_data: function() {
      var _this = this;
      var user_openid = '';
      if (isWx) {
        user_openid = localStorage.getItem('openid');
      } else {
        user_openid = localStorage.getItem('join_num');
      }
      var back_obj = JSON.parse(localStorage.getItem('back_obj'));
      // var back_data = JSON.parse(localStorage.getItem('back_data'));
      var test_Data = localStorage.getItem('testData');
      console.log('test_Data:'+test_Data);
      var body = {
        "isaddress": _this.isaddress,//识别位置获取的路径，是百度的还是接口的
        "idxUserid": user_openid, //用户id				(必填)
        "sbufferTime": back_obj.sbufferTime, //起始缓冲时长			(必填)
        "getStuckNumber": back_obj.getStuckNumber, //卡顿次数				(必填)
        "getStuckTime": back_obj.getStuckTime, //卡顿总时长，单位毫秒		(必填)
        // "idxVideoName": back_data.name, //视频名称				(必填)
        "idxVideoName": "联通之歌", //视频名称				(必填)
        // "videoUrl": back_data.url, //视频URL				(必填)
        "videoUrl": "http://114.247.23.21:8080/movie/unicom.mp4", //视频URL				(必填)
        // "videoTime": back_data.duration, //视频时长，单位毫秒		(必填)
        "videoTime": 59000, //视频时长，单位毫秒		(必填)
        // "videoSize": Math.round(back_data.videosize / 1024 / 1024), //视频大小，单位B
        "videoSize": 63840425, //视频大小，单位B
        // "videoRate": back_data.datarate, //视频码率
        "videoRate": 8453, //视频码率
        // "videoClarity": back_data.framewidth * back_data.frameheight, //视频清晰度			(必填)
        "videoClarity": 720, //视频清晰度			(必填)
        "testAddress": sessionStorage.getItem('address'),
        "voms": _this.item_score,
        "idxCtime": back_obj.idxCtime, //测速时间
        "idxScore": _this.videoPlayDuration < 1 ? 0 : Math.round(_this.item_score*25), //测速得分				(必填)
        "avgRate": Math.round(back_obj.avgRate * 1000 / 1024 / 1024 * 1024 * 8), //平均速率，单位kbps		(必填)
        "peakValue": Math.round(localStorage.getItem("peakValue") / 1024 * 1000 / 1024 * 8), //峰值，单位ms			(必填)
        "vresult": localStorage.getItem("idxScore") != 0 ? 1 : 2, //测速结果，1：成功；2失败；默认值2		(必填)
        "vtype": back_obj.vtype ? 1 : 2, //类型，1：视频；2：文件；默认值1			(必填)
        "channel": back_obj.channel, //渠道，目前只有爱奇艺和优酷				(必填)
        "reason": test_Data //保存必要的测试数据
      };
      api.insert(_this, body, (res) => {
        // _this.loading_modal = false;
        sessionStorage.setItem('canSave',"false");
        localStorage.setItem('pkId',res.data.repBody.id);
      });
    },
    time_play: function() {
      var _this = this;
      // _this.item_score = _this.changeTwoDecimal_f(_this.item_score);
      if(_this.videoPlayDuration < 1){
        _this.end_score = 0
      }else{
        _this.end_score = Math.round(_this.item_score*25)
      };
      localStorage.setItem('gameOverScore',_this.end_score);

      // 分享文案
      var score = _this.end_score;
      if (this.$root.$children[0].is_sign) {
          var title = '我测速后获得'+score+'分，你呢';
          var link = basePath+"?TestScore="+score+"#/ShareAfter";
          var desc = '测网络速度，赢500M流量';
          var img_url = basePath + 'static/img/home_title.jpg'
          wxSet.share(title, desc, link, img_url, (type, status) => {

          });
      }

      var endDeg = (Math.round(_this.item_score) * _this.deg_num_S()) + 240;
      _this.style_obj = endDeg;
      // if (_this.item_score > 1) {
      //   _this.timer = setInterval(function() {
      //     _this.end_score = (parseFloat(_this.end_score) + 0.01).toFixed(2);
      //     _this.style_obj += 2;
      //     if (_this.end_score == _this.item_score) {
      //       _this.style_obj = endDeg;
      //       if (_this.timer != 0) {
      //         clearInterval(_this.timer);
      //         _this.timer = 0;
      //       }
      //     }
      //   }, 10)
      // } else {
      //   _this.end_score = 1;
      //   _this.style_obj = 240;
      // }
    },
    reset: function() {
      sessionStorage.setItem('canSave',"true");
      this.$router.push({
        name: 'Flash'
      })
    },
    go_grade: function() {
      this.$router.push({
        name: 'Grade'
      })
    },
    get_percentNum: function() {
      var _this = this;
      var back_obj = JSON.parse(localStorage.getItem('back_obj'));
      var body = {
        "idxScore": Math.round(_this.item_score*25)
      };
      api.getAchievement(_this, body, (res) => {
        _this.percent_num = res.data.repBody;
        localStorage.setItem('percent_num', _this.percent_num)
      });
    },
    //获取当前时间方法
    // get_nowTime: function() {
    //   var d = new Date();
    //   var str = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    //   this.test_time = str;
    // },
    //强制保留两位小数
    changeTwoDecimal_f: function(x) {
      var s_x = x + "";
      var index = s_x.indexOf(".");
      if (s_x.length - index > 3) {
        s_x = s_x.substr(0, index + 3);
      }
      return s_x;
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
    position: relative;
    margin: 30px;
    width: 300px;
    height: 300px;
}

.content {
    background-repeat: no-repeat!important;
    // background-size: cover!important;
}

.top {
    font-size: 29px;
    color: #fff;
    text-align: left;
    padding-top: 25%;
    p {
        padding: 15px 0 0px 50px;
        font-size: 32px;
    }
    table{
      width: 95%;
      margin: 0 auto;
      text-align: center;
      border: 1px solid #fff;
      .wid{
        width: 20%;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
      }
      .wid1{
        width: 20%;
        border-right: 1px solid #fff;
      }
      .border_rightnone{
        border-right: none!important
      }
      .border_line{
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff;
      }
      .border_line1{
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
      }
    }

}

.center {
    position: relative;
    margin-top: 30px;
    // margin-top: 20px;
    img {
        border-radius: 50%;
    }
    .font_center {
        font-size: 31px;
        color: #fff;
        position: absolute;
        top: 32%;
        left: 25%;
        width: 50%;
        text-align: center;
        .big {
            font-size: 68px;
            span {
                font-size: 32px;
            }
        }
    }
}

.a {
    font-size: 31px;
    color: #fff;
}

.btn {
    // margin-top: 10%;
    width: 100%;
    padding-bottom: 180px;
    .custom_button {
        width: 60%;
        height: 80px;
        margin: 60px auto 0;
    }
}
</style>
