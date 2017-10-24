//监听视频播放情况的逻辑抽离出来，提供工具给页面使用
var waitHandler = {
  readyDuration: 0, //起始缓冲时长
  pauseDuration: 0, //总卡顿时长
  playStart: 0, //开始播放时间点
  waitStart: 0, //每次卡顿开始时间点
  testStatus: "none", //未开始:none 准备:ready 播放:play 结束:end
  videoEl: null, //video对象
  videoUrl: null, //视频地址
  videoSize: 0, //视频文件大小
  hasInit: false, //是否已经初始化
  onStart: null, //测试开始回调
  onUpdate: null, //测试数据更新回调
  onEnd: null, //测试结束回调
  updataInterval: 1000, //缓冲速率统计周期
  intervalCode: 0, //定时器id
  lastProgress: 0, //上一次统计时的缓冲进度
  lastTime: 0, //上一次统计时间
  maxSpeed: 0, //峰值
  averageSpeed: 0, //平均速率
  playAllTime: 0, //播放阶段总时长
  score: 0, //总评分 add(加了add都为后来添加的代码)
  catonNumber: 0, //卡顿次数 add
  averageSpeedMs: 0, //每M/s单位的平均速率 add
  averageSpeedbs: 0, //每b/s单位的平均速率 add
  startPlayTime: 0, //卡顿后开始播放的时间 add
  waitingPlayTime: 0, //卡顿开始的时间 add
  updataEnd: false, //缓冲完毕状态：true add
  testSmallTime: 20000, //结束最小时间
  testMaxTime: 30000, //结束最大时间
  videoSizeSeq: [
358042,
1047084,
1478898,
1920382,
2325480,
2585721,
3093601,
3436442,
3559952,
4192217,
4674366,
4765475,
5182013,
5930691,
6604741,
6981890,
7277873,
7515931,
7689693,
8098190,
8631182,
8928484,
9425911,
9758892,
10014051,
10186753,
10495318,
10991828,
11421068,
11579764,
11940509,
12449883,
12889934,
13497803,
13871647,
14388814,
14840171,
15306594,
15628313,
15872526,
16276343,
16556617,
16898293,
17132797,
17468923,
17802455,
18158650,
18465980,
18784834,
19078470,
19444776,
19882569,
20285666,
20661083,
21018127,
21496885,
21757685,
22107078,
22392484,
22843472,
23179785,
23517974,
23767528,
24191269,
24580096,
25010448,
25370920,
25811673,
26231580,
26508203,
27113505,
27399454,
27627037,
28306757,
29158594,
30008362,
30640385,
31239734,
31708816,
31952538,
32200889,
32540250,
33345784,
34213032,
34939669,
35596626,
35669634,
35845269,
35979262,
36483619,
37064106,
37603608,
37989667,
38229620,
38464436,
38652893,
38901370,
39144475,
39663286,
40203895,
40476517,
40906594,
41516916,
42280623,
42890487,
43482953,
43916673,
44094600,
44400058,
44815916,
45134246,
45823072,
46359453,
46917739,
47409014,
47692711,
47926342,
48269529,
48559492,
49268019,
49826660,
50371239,
50814391,
51234410,
51811929,
52247288,
52845809,
53197704,
53810027,
53965063,
54075547,
54324988,
54669693,
54866300,
55101352,
55408120,
55808785,
56081371,
56576417,
57044413,
57317110,
57484112,
57758624,
58212923,
58618836,
58824869,
59193521,
59552562,
59754667,
59862469,
60239991,
60616410,
60951265,
61616154,
62281303,
62593427,
62680143,
62698439,
62699843
], //视频按秒切割大小
  failureReason: "none", //失败原因 ，成功"none"、播放出错"playerror"、用户手动改变了进度"usercontrol"、加载太慢"loadslow"、卡顿超10秒“catonLong”
  //初始化，参数：video标签、开始播放（不是实际播放，只是点击播放按钮）回调方法、播放情况更新回调方法(传回实时速率和最大速率)、结束回调方法(传回失败原因、平均速率和评分)
  lastRate: 0,
  init: function(videoEl, onStartBack, onUpdateBack, onEndBack) {
    this.videoEl = videoEl;
    //video标签事件的回调方法前面都加了v
    videoEl.onabort = this.vAbort.bind(this);
    videoEl.onerror = this.vError.bind(this);
    videoEl.onpause = this.vPause.bind(this);
    videoEl.onplay = this.vPlay.bind(this);
    videoEl.onplaying = this.vPlaying.bind(this);
    videoEl.onsuspend = this.vSuspend.bind(this);
    videoEl.onprogress = this.vProgress.bind(this);
    videoEl.ontimeupdate = this.vTimeupdate.bind(this);
    videoEl.onwaiting = this.vWaiting.bind(this);
    videoEl.onseeked = this.vVseeked.bind(this);
    this.onStart = onStartBack;
    this.onUpdate = onUpdateBack;
    this.onEnd = onEndBack;
    this.hasInit = true;
  },
  //测试准备，重新测试也可以调用这个方法。参数：视频地址、视频文件大小
  ready: function(url, videoSize) {
    if (!this.hasInit) {
      return;
    }
    //重置测试的各种参数、状态
    this.isEndTest = false;
    this.maxSpeed = 0;
    this.startPlayTime = 0;
    this.waitingPlayTime = 0;
    this.readyDuration = 0;
    this.pauseDuration = 0;
    this.waitStart = 0;
    this.catonNumber = 0;
    this.lastProgress = 0;
    this.testStatus = "none";
    this.failureReason = "none";
    this.updataEnd = false;
    this.videoSize = videoSize;
    this.videoUrl = url;
    //视频地址后面加上随机数，不让浏览器的缓存功能影响测速
    var rr = Math.random() + "";
    rr = rr.substr(2);
    if (this.videoUrl.indexOf('?') >= 0) {
      this.videoEl.src = this.videoUrl + "&easier=" + rr;
    } else {
      this.videoEl.src = this.videoUrl + "?easier=" + rr;
    }
  },
  vPause: function() {
    console.log('音频/视频已暂停');

    // this.videoEl.play();
    // if (!this.customPause) {
    //   return;
    // }

    //播放结束，结果回调
    // if (this.videoEl.currentTime < this.videoEl.duration) {
    //   //测试出错
    //   if (this.failureReason == "none") {
    //     this.failureReason = "playerror";
    //   }
    //   if (typeof this.onEnd == "function") {
    //     this.onEnd(this.failureReason, 0, 0);
    //   }
    // } else {
    //计算评分 add
    // var start_score = this.start_score(); //起始缓冲分
    // var kartun_score = this.kartun_score(); //卡顿分
    // var higth_score = this.higth_score(); //峰值速率分
    // var averageSpeed_score = this.averageSpeed_score(); //平均速率分
    // console.log("起始缓冲分:" + start_score);
    // console.log("卡顿分:" + kartun_score);
    // console.log("峰值速率分:" + higth_score);
    // console.log("平均速率分:" + averageSpeed_score);
    // this.score = start_score + kartun_score + higth_score + averageSpeed_score;
    // console.log("score:" + this.score);
    // if (typeof this.onEnd == "function") {
    //   // add播放阶段总时长
    //   this.playAllTime = this.getPos() - this.playStart;
    //   // alert('已缓冲总时长'+this.computeProgressDuration());
    //   var katurnDuration = this.playAllTime - this.computeProgressDuration() * 1000 - this.readyDuration;
    //   if (this.pauseDuration > katurnDuration) {
    //     katurnDuration = this.pauseDuration;
    //   };
    //   // this.videoEl.src = "http://www.qqq.com/xxx";
    //   // this.videoEl.currentTime = 159.210667;
    //   // var _parentElement = this.videoEl.parentNode;
    //   //   if(_parentElement){
    //   //          _parentElement.removeChild(this.videoEl);
    //   //   }
    //   // this.videoEl.load();
    //   this.onEnd(this.playAllTime, this.failureReason, this.averageSpeed, this.score, this.readyDuration, this.catonNumber, katurnDuration, this.playStart);
    // };
    // this.videoEl.src = "http://www.qqq.com/xxx";
    // this.videoEl.currentTime = 159.210667;
    // var _parentElement = this.videoEl.parentNode;
    //   if(_parentElement){
    //          _parentElement.removeChild(this.videoEl);
    //   }
    // this.videoEl.load();
    // }
  },
  vAbort: function() {
    console.log('音频/视频的加载已放弃');
    // this.failureReason = "playerror";
    // this.videoEl.pause();
    // this.videoEl.currentTime = 0;
  },
  vError: function() {
    console.log('音频/视频加载期间发生错误');
    // console.log(this.videoEl.error.code);
    // alert(this.videoEl.error.code)
    // this.failureReason = "playerror";
    // this.videoEl.pause();
    // this.videoEl.currentTime = 0;
  },
  vPlay: function() {
    console.log('音频/视频已开始或不再暂停');
  },
  vPlaying: function() {
    //检查测试是不是已经开始
    this.beginTest();
    console.log('音频/视频在已因缓冲而暂停或停止后已就绪');

    var waitEnd = this.getPos();
    if (waitEnd > this.waitStart && this.waitStart != 0) {
      if (this.testStatus == "ready") {
        //计算起始缓冲时长
        this.readyDuration += waitEnd - this.waitStart;
        console.log('起始缓冲时长：' + this.readyDuration);
        this.waitStart = 0;
        this.testStatus = "play";
      } else if (this.testStatus == "play") {
        // alert('waitEnd:'+waitEnd+'this.waitStart:'+this.waitStart);
        // alert('卡顿时长：'+this.pauseDuration);
        //计算卡顿总时长
        this.pauseDuration += waitEnd - this.waitStart;
        // add ⬇️ 卡顿结束的时间
        this.startPlayTime = waitEnd;
        // add ⬆️
        this.waitStart = 0;
      }
    }

  },
  vProgress: function() {
    //为了平均速率精准，如果已经缓冲结束，就不能等定时器回调才算平均速率
    var ranges = this.computeProgress();
    if (ranges >= 0.99) {
      this.updata();
    }
  },
  vSuspend: function() {
    // console.log('刻意不获取媒体数据');
  },
  vTimeupdate: function() {
    // console.log('目前的播放位置已更改');
    var currentTime = this.getPos();
    if (this.computeProgress() >= 0.99 && (currentTime - this.playStart) >= this.testSmallTime) {
      // if((currentTime - this.playStart) >= this.testMaxTime){
      // }
      this.endTest('time');
      // this.videoEl.pause();
      // add
      this.videoEl.currentTime = 0;
    }
    //
    // if(this.computeProgress() >= 1 && (currentTime - this.playStart) >= this.testSmallTime){
    //
    // }else if (this.computeProgress() < 1 && (currentTime - this.playStart) >= this.testMaxTime) {
    //
    // }
  },
  vWaiting: function() {
    //检查测试是不是已经开始
    this.beginTest();
    // console.log('视频由于需要缓冲下一帧而停止');
    // 记录缓冲开始时间
    if (this.testStatus == "play") {
      this.waitStart = this.getPos();
      //记录卡顿次数 add
      this.catonNumber += 1;
      // console.log('卡顿次数：' + this.catonNumber);
      this.waitingPlayTime = this.getPos();
    }
  },
  vVseeked: function() {
    //用户改变了进度，停止播放，标识测试失败
    this.failureReason = "usercontrol";
    this.endTest('seek');
    // this.videoEl.pause();
    this.videoEl.currentTime = 0;
  },
  //计算缓冲进度
  computeProgress: function() {
    if (!this.videoEl.duration) {
      return 0;
    }
    // var ranges = 0;
    // for (var i = 0; i < this.videoEl.buffered.length; i++) {
    //   ranges += this.videoEl.buffered.end(i) - this.videoEl.buffered.start(i);
    // }
    return this.computeProgressDuration() / this.videoEl.duration;
  },
  //add缓冲
  computeProgressDuration: function() {
    // var ranges = 0;
    // for (var i = 0; i < this.videoEl.buffered.length; i++) {
    //   ranges += this.videoEl.buffered.end(i) - this.videoEl.buffered.start(i);
    // }
    // return ranges;
    var ranges = 0;
    if (this.videoEl.buffered.length) {
      ranges = this.videoEl.buffered.end(0);
    }
    return ranges;
  },
  //计算缓冲大小
  computeProgressSize: function() {
    if (!this.videoEl.duration) {
      return 0;
    }
    //目前只考虑从头缓冲到尾的情况，不考虑分段缓冲
    if (this.videoEl.buffered.length == 1) {
      var currentPos = this.computeProgressDuration();
      //还没有缓冲，返回0
      if (currentPos <= 0) {
        return 0;
      }
      var index = Math.floor(currentPos);
      //视频和准备好的视频分段大小（videoSizeSeq）不匹配
      if (index > this.videoSizeSeq.length) {
        alert("出错了！！！");
        return 0;
      }
      var size = 0; //返回的已缓冲大小
      if (index >= 1) {
        //整秒大小，比如缓冲了2.1秒 这里就是2秒钟的大小
        size = this.videoSizeSeq[index - 1];
      }
      if (index < this.videoSizeSeq.length) {
        //小数点后面的大小，比如缓冲了2.1秒 这里就是0.1秒钟的大小
        size += (this.videoSizeSeq[index] - size) * (currentPos - index);
      }
      return size;

    } else {
      console.log('--------------------视频加载方式还没有兼容');
      return 0;
    }
  },
  getMb: function(rate) {
    return rate/1024/1024*1000*8;
  },
  //定时计算下载速率
  updata: function() {
    // var netWork = this.videoEl.networkState;//0.此元素未初始化 1.正常但没有使用网络 2.正在下载数据 3.没有找到资源
    if (this.intervalCode == 0) {
      return
    };
    var ranges = this.computeProgress();
    var progress = this.computeProgressSize();
    var currentTime = this.getPos();
    var timeDifference = currentTime - this.lastTime;
    var sizeDifference = (progress - this.lastProgress);
    // this.lastTime = currentTime; //上次计算的时间
    // this.lastProgress = progress; //上次的缓冲大小
    var speed = sizeDifference / timeDifference;
    var rate = Math.abs(speed - this.lastRate);
    var bool = false;
    if (this.getMb(rate) > 2) {
      bool = true;
      rate -= 262.144;
      rate *= 0.5;
    }
    // 上升
    if (speed > this.lastRate) {
      this.lastRate += (bool ? 262.144 : 0);
      this.lastRate += rate;
    } else if (speed < this.lastRate){
      this.lastRate -= (bool ? 262.144 : 0);
      this.lastRate -= rate;
    }
    bool = false;
    speed = this.lastRate;
    // this.lastRate = (this.lastRate + speed) / 2;
    // speed = this.lastRate;
    // console.log('最终速率：' + speed)
    if (speed > this.maxSpeed) {
      this.maxSpeed = speed;
    }
    if (ranges >= 0.99) {
      this.closeInterval();
      this.averageSpeed = this.videoSizeSeq[this.videoSizeSeq.length - 1] / (currentTime - this.playStart);
      this.averageSpeedMs = this.averageSpeed / 1024 / 1024 * 1000;
      this.averageSpeedbs = this.averageSpeed * 1000;
      //add 缓冲状态
      this.updataEnd = true;
      var endSpeed = this.averageSpeed;
      if ((currentTime - this.playStart) >= this.testSmallTime) {
        this.endTest('out');
        // this.videoEl.pause();
        this.videoEl.currentTime = 0;
      }
    } else {
      // add播放阶段总时长
      // this.playAllTime = currentTime - this.playStart;
      if ((currentTime - this.playStart) >= this.testMaxTime) {
        this.closeInterval();
        this.averageSpeed = (this.videoSizeSeq[this.videoSizeSeq.length - 1] * ranges) / (currentTime - this.playStart);
        this.averageSpeedMs = this.averageSpeed / 1024 / 1024 * 1000;
        this.averageSpeedbs = this.averageSpeed * 1000;
        // this.catonNumber = 100; //卡顿分至为0
        //add 缓冲状态
        this.updataEnd = false;
        this.endTest('success');
        // this.videoEl.pause();
        this.videoEl.currentTime = 0;
      }
    }
    if (typeof this.onUpdate == "function") {
      this.onUpdate(this.videoEl.currentTime, speed, this.maxSpeed, this.updataEnd, endSpeed);
    }
    //卡顿超过10秒处理 add
    // console.log("startPlayTime:"+this.startPlayTime);
    // console.log('waitingPlayTime:'+this.waitingPlayTime);
    var pauseDuration_once = this.startPlayTime - this.waitingPlayTime;
    if (pauseDuration_once / 1000 >= 10) {
      console.log('卡顿超过10秒啦！', pauseDuration_once / 1000);
      this.endTest('ka');
      // this.videoEl.pause();
      this.catonNumber = 100; //卡顿分至为0
      this.videoEl.currentTime = 0;
      this.closeInterval();
      this.failureReason = "catonLong";
      return;
    }
  },
  //停止定时器
  closeInterval: function() {
    if (this.intervalCode != 0) {
      var code = this.intervalCode;
      this.intervalCode = 0;
      clearInterval(code);
    }
  },
  //测试开始，内部调用的方法，外面不要调用
  beginTest: function() {
    //没有初始化直接返回
    if (!this.hasInit) {
      return;
    }
    //测试已经开始，直接返回
    if (this.testStatus == "ready" || this.testStatus == "play") {
      return;
    }
    //标识测试已经开始
    this.testStatus = "ready";
    //记录卡顿开始时间，目的是计算起始缓冲时长和卡顿时长；记录测试开始时间，目的是计算平均下载速率；记录上一次统计缓冲大小时间，目的是计算实时下载速率；
    this.waitStart = this.playStart = this.lastTime = this.getPos();
    //通知使用者测试开始了
    if (typeof this.onStart == "function") {
      this.onStart();
    }
    //定时器走起，用来计算实时下载速率
    if (this.intervalCode == 0) {
      this.intervalCode = setInterval(this.updata.bind(this), this.updataInterval);
    }
  },
  //测试结束，内部调用的方法，外面不要调用
  endTest: function(flag) {
    if (this.testStatus === 'end') {
      return;
    }
    this.testStatus = 'end';
    console.log(flag)
    var start_score = this.start_score(); //起始缓冲分
    var kartun_score = this.kartun_score(); //卡顿分
    var higth_score = this.higth_score(); //峰值速率分
    var averageSpeed_score = this.averageSpeed_score(); //平均速率分
    console.log("起始缓冲分:" + start_score);
    console.log("卡顿分:" + kartun_score);
    console.log("峰值速率分:" + higth_score);
    console.log("平均速率分:" + averageSpeed_score);
    this.score = start_score + kartun_score + higth_score + averageSpeed_score;
    console.log("score:" + this.score);
    if (typeof this.onEnd == "function") {
      // add播放阶段总时长
      this.playAllTime = this.getPos() - this.playStart;
      // alert('已缓冲总时长'+this.computeProgressDuration());
      var katurnDuration = this.playAllTime - this.computeProgressDuration() * 1000 - this.readyDuration;
      // alert(this.playAllTime)
      // alert(this.computeProgressDuration() * 1000)
      // alert(this.readyDuration)
      // alert(katurnDuration)
      if (this.pauseDuration > katurnDuration) {
        katurnDuration = this.pauseDuration;
      };
      // this.videoEl.src = "http://www.qqq.com/xxx";
      // this.videoEl.currentTime = 159.210667;
      // var _parentElement = this.videoEl.parentNode;
      //   if(_parentElement){
      //          _parentElement.removeChild(this.videoEl);
      //   }
      // this.videoEl.load();
      this.onEnd(this.playAllTime, this.failureReason, this.averageSpeed, this.score, this.readyDuration, this.catonNumber, katurnDuration, this.playStart);
    };
  },
  //获取当前时间
  getPos: function() {
    var date = new Date();
    return date.valueOf();
  },
  //起始缓冲分 add
  start_score: function() {
    var num = 0;
    if (this.readyDuration <= 100) {
      num += 5
    } else if (this.readyDuration > 100 && this.readyDuration <= 200) {
      num += 4
    } else if (this.readyDuration > 200 && this.readyDuration <= 300) {
      num += 3
    } else if (this.readyDuration > 300 && this.readyDuration <= 400) {
      num += 2
    } else if (this.readyDuration > 400 && this.readyDuration <= 500) {
      num += 1
    } else if (this.readyDuration > 500) {
      num += 0
    }
    return num
  },
  //峰值速率分 add
  higth_score: function() {
    var num3 = 0;
    var endMaxnum = 0;
    endMaxnum = (this.maxSpeed / 1024 * 1000 / 1024);
    if (endMaxnum > 2) {
      num3 += (endMaxnum - 2);
    }
    //return 结果
    if (num3 >= 10) {
      return num3 = 10;
    } else {
      return num3;
    }
  },
  //计算卡顿分 add
  kartun_score: function() {
    var num1 = 5;
    num1 -= this.catonNumber;
    num1 -= Math.round(this.pauseDuration / 200);
    if (num1 <= 0) {
      return num1 = 0;
    } else {
      return num1;
    }

  },
  //计算平均速率分 add
  averageSpeed_score: function() {
    var num2 = 80
    if (this.averageSpeedMs >= 1 && this.averageSpeedMs < 2) {
      num2 -= (2 - this.averageSpeedMs) * 10;
    } else if (this.averageSpeedMs >= 0.5 && this.averageSpeedMs < 1) {
      num2 -= 10;
      num2 -= (1 - this.averageSpeedMs) * 20;
    } else if (this.averageSpeedMs < 0.5) {
      num2 -= 20;
      num2 -= (0.5 - this.averageSpeedMs) * 100;
    }
    if (num2 <= 0) {
      return 0;
    } else {
      return num2;
    }
  }
}
export default waitHandler;
