<template lang="html">
  <div class="">
    <!-- <div class="">
      <img :src="a">
    </div> -->
    <video ref="video" width=800 height=500 preload="none" webkit-playsinline playsinline controls="controls" :src="videoUrl">
      <source :src="videoUrl" type="video/mp4">
        您的浏览器不支持html5视频，建议更新浏览器版本
    </video>
    <div class="">
      <p>卡顿次数：<span v-if="count">{{count+'次'}}</span></p>
      <p>总卡顿时长：<span v-if="all_k_time">{{all_k_time+'s'}}</span></p>
      <p>起始缓冲时间：<span v-if="before_time">{{before_time+'s'}}</span></p>
    </div>
    <div class="">
      <button type="button" v-if="start_now" @click="start()">开始测试</button>
      <button type="button" v-else>测试中</button>
      <button type="button" @click="waiting()">进入缓冲</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      all_k_time: 0, //总卡顿时长
      k_time: null, //卡顿当前时间
      kk_time: null, //时间差
      canplay_time: null, //
      continuePlay_time: null, //卡顿之后继续播放的时间
      a: null, //定时器
      b: null, //计时器
      videoEnd: false, //视频结束的状态
      count: 0, //卡顿次数
      video_length: null, //视频总时长
      start_now: true,
      arr: [],
      arr1: [],
      before_time: null, //起始缓冲时间差
      // videoUrl: 'http://hackandhuygo.applinzi.com/oceans.mp4',
      videoUrl: './static/img/oceans.mp4',
      videoImg: 'http://hackandhuygo.applinzi.com/timg.jpeg'
    }
  },
  watch: {
    videoEnd: function(newVal) {
      if (newVal) {
        console.log('结束了！', newVal);
        this.start_now = true;
        window.clearInterval(this.a);
        // window.clearTimeout(this.b);
      }
    }
    // kk_time: function(newVal,oldVal){
    //   newVal += oldVal;
    //   this.all_k_time = new Date(newVal).toLocaleString();
    // }
  },
  computed: {
    // kk_time: function() {
    //   var _this = this;
    //   var date1 = _this.canplay_time;
    //   var date2 = _this.k_time;
    //   var date3 = date1 - date2; //时间差的毫秒数
    //   return date3
    // }
  },
  mounted() {
    var _this = this;
    _this.$nextTick(function() {
      var config = {
        method: 'post',
        url: "http://h5.gmccopen.com/dzp/web/dzp!sendSms.action",
        params: {
          mobile: '18813758371'
        },
        // headers: {
        //   'X-Requested-With': 'XMLHttpRequest'
        // },
        // requestHeader: {
        //   'Content-Type': 'application/json'
        // },
        // responseType: ''
      };
      // _this.$http(config).then(response => {
      //   // success callback
      //   console.log(success);
      // }, error => {
      //   // error callback
      // })
      // _this.axios.post('http://h5.gmccopen.com/dzp/web/dzp!sendSms.action').then(function(res){
      //
      // })
      _this.$refs.video.setAttribute("poster", _this.videoImg);
      // _this.time = _this.$refs.video.onwaiting;
      // _this.eventTester("buffered");
      // _this.buffer = _this.$refs.video.buffered;
      console.log('当前播放时间', _this.$refs.video.currentTime);
      // console.log('缓冲了多少', _this.$refs.video.buffered); //缓冲了多少
      // console.log('百分比的缓冲', _this.$refs.video.bufferedPercent); //百分比的缓冲了
      _this.$refs.video.enterFullScreen; //离开全屏播放
      /* ............................................*/
      _this.eventTester("waiting"); //进入缓冲
      _this.eventTester("pause");
      _this.eventTester("canplay");
      _this.eventTester("canplaythrough"); //不因缓冲而停顿的情况下播放
      _this.eventTester("play");
      _this.eventTester("ended");
      _this.eventTester("seeking"); //当用户开始移动/跳跃到音频/视频中的新位置时触发。


      /** （卡顿）后进入缓冲监听⬇️ **/
      // _this.$refs.video.onwaiting = _this.wating();
    })
  },
  methods: {
    waiting: function() {
      console.log("缓冲!等等。。");
      var _this = this;
      // _this.b = setInterval(function() {
      //   _this.all_k_time += (1 / 1000);
      //   _this.all_k_time = _this.changeTwoDecimal(_this.all_k_time)
      // },0.001);
      _this.count += 1;
      _this.k_time = _this.date_now();
      // console.log(this.k_time);
    },
    date_now: function() {
      var date = new Date();
      return date.valueOf();
    },
    changeTwoDecimal: function(x) {
      var f_x = parseFloat(x);
      if (isNaN(f_x)) {
        // alert('function:changeTwoDecimal->parameter error');
        return false;
      }
      f_x = Math.round(f_x * 1000) / 1000;

      return f_x;
    },
    eventTester: function(e) {
      var _this = this;
      _this.$refs.video.addEventListener(e, function() {
        console.log(new Date().toLocaleString(), e);
        if (e == "ended") {
          _this.videoEnd = true;
          _this.start_now = true;
          window.clearInterval(_this.a);
          // window.clearTimeout(_this.b);
        } else if (e == "play") {
          // _this.nowTime();
          _this.timer()
        } else if (e == "waiting") {
          _this.waiting();
        } else if (e == "canplay") {
          // window.clearTimeout(_this.b);
          _this.video_length = _this.$refs.video.duration;
          console.log("当前视频的总时长：" + _this.video_length);
          _this.timer1();
          _this.time_disposal();
        } else if (e == "canplaythrough") {
          // console.log(_this.canplay_time);
          // _this.time_disposal();
        } else if (e == "seeking") {

        }
      });
    },
    timer: function() {
      var _this = this;
      _this.canplay_time = _this.date_now();
      _this.arr.push(_this.canplay_time);
    },
    timer1: function() {
      var _this = this;
      var bb = _this.date_now();
      _this.arr1.push(bb);
      var aaa = _this.arr1[0] - _this.arr[0];
      _this.before_time = aaa / 1000;
    },
    time_disposal: function() {
      var _this = this;
      _this.continuePlay_time = _this.date_now();
      var date1 = _this.continuePlay_time;
      var date2 = _this.k_time;
      var date3 = date1 - date2;
      var date4 = date3 / 1000;
      console.log('当前卡顿时长：', _this.changeTwoDecimal(date4));
      _this.all_k_time += _this.changeTwoDecimal(date4);
    },
    start: function() {
      var _this = this;
      _this.$refs.video.play();
      _this.nowTime();
    },
    nowTime: function() {
      var _this = this;
      _this.canplay_time = new Date().toLocaleString();
      _this.all_k_time = null;
      _this.count = null;
      _this.start_now = false;
      _this.a = setInterval(function() {
        console.log('当前播放时间', _this.$refs.video.currentTime);
      }, 500);
    },

  }
}
</script>

<style lang="scss" scoped>
Error: Source sample is missing.
</style>
