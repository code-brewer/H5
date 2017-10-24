//未完成：异常情况结束测试，包括卡得太久、用户改变进度等
//未完成：速度单位;测试结束通知调用者，视频播放结束通知调用者
//未完成：评分

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
  updataInterval: 500, //缓冲速率统计周期
  intervalCode: 0, //定时器id
  lastProgress: 0, //上一次统计时的缓冲进度
  lastTime: 0, //上一次统计时间
  maxSpeed: 0, //峰值
  averageSpeed: 0, //平均速率
  score: 0, //总评分 add(加了add都为后来添加的代码)
  catonNumber: 0, //卡顿次数 add
  averageSpeedMs: 0,//每M/s单位的平均速率 add
  averageSpeedKbs: 0,//每Kb/s单位的平均速率 add
  startPlayTime: 0,//卡顿后开始播放的时间 add
  waitingPlayTime: 0,//卡顿开始的时间 add
  failureReason: "none", //失败原因 ，成功"none"、播放出错"playerror"、用户手动改变了进度"usercontrol"、加载太慢"loadslow"、卡顿超10秒“catonLong”
  //初始化，参数：video标签、开始播放（不是实际播放，只是点击播放按钮）回调方法、播放情况更新回调方法(传回实时速率和最大速率)、结束回调方法(传回失败原因、平均速率和评分)
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
    this.readyDuration = 0;
    this.pauseDuration = 0;
    this.waitStart = 0;
    this.catonNumber = 0;
    this.testStatus = "none";
    this.failureReason = "none";
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
    //播放结束，结果回调
    if (this.videoEl.currentTime < this.videoEl.duration) {
      //测试出错
      if (this.failureReason == "none") {
        this.failureReason = "playerror";
      }
      if (typeof this.onEnd == "function") {
        this.onEnd(this.failureReason, 0, 0);
      }
    } else {
      //计算评分 add
      var a = this.start_score();
      var b = this.kartun_score();
      var c = this.videoEl.videoWidth * this.videoEl.videoHeight / (1920 * 1080);
      var d = this.averageSpeed_score();
      this.score = (a+b)*c+d;
      console.log("score:"+this.score);
      // this.score = (this.start_score() + this.kartun_score()) * this.videoEl.videoWidth * this.videoEl.videoHeight / (1920 * 1080) + this.averageSpeed_score();
       //var ttt = this.start_score();//起始缓冲分
      // var lll = this.kartun_score();//卡顿分
      //var kkk = this.averageSpeed_score();//平均速率分
      if (typeof this.onEnd == "function") {
			this.onEnd(this.failureReason, this.averageSpeed,this.score ,this.readyDuration ,this.catonNumber,this.pauseDuration,this.playStart);
      }
    }
  },
  vAbort: function() {
    console.log('音频/视频的加载已放弃');
    this.failureReason = "playerror";
    this.videoEl.pause();
    this.videoEl.currentTime = 0;
  },
  vError: function() {
    console.log('音频/视频加载期间发生错误');
    this.failureReason = "playerror";
    this.videoEl.pause();
    this.videoEl.currentTime = 0;
  },
  vPlay: function() {
    console.log('音频/视频已开始或不再暂停');
  },
  vPlaying: function() {
    //检查测试是不是已经开始
    this.beginTest();
    // console.log('音频/视频在已因缓冲而暂停或停止后已就绪');

    var waitEnd = this.getPos();
    if (waitEnd > this.waitStart && this.waitStart != 0) {
      if (this.testStatus == "ready") {
        //计算起始缓冲时长
        this.readyDuration += waitEnd - this.waitStart;
        console.log('起始缓冲时长：' + this.readyDuration);
        this.waitStart = 0;
        this.testStatus = "play";
      } else if (this.testStatus == "play") {
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
    if (ranges >= 1) {
      this.updata();
    }
  },
  vSuspend: function() {
    // console.log('刻意不获取媒体数据');
  },
  vTimeupdate: function() {
    console.log('目前的播放位置已更改');
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
      console.log('卡顿次数：' + this.catonNumber);
      this.waitingPlayTime = this.getPos();
    }
  },
  vVseeked: function() {
    //用户改变了进度，停止播放，标识测试失败
    this.failureReason = "usercontrol";
    this.videoEl.pause();
    this.videoEl.currentTime = 0;
  },
  //计算缓冲进度
  computeProgress: function() {
    if (!this.videoEl.duration) {
      return 0;
    }
    var ranges = 0;
    for (var i = 0; i < this.videoEl.buffered.length; i++) {
      ranges += this.videoEl.buffered.end(i) - this.videoEl.buffered.start(i);
    }
    return ranges / this.videoEl.duration;
  },
  //定时计算下载速率
  updata: function() {
    if (this.intervalCode == 0) {
      return;
    }
    var ranges = this.computeProgress();
    // console.log(ranges);
    var currentTime = this.getPos();
    var timeDifference = currentTime - this.lastTime;
    var sizeDifference = (ranges - this.lastProgress) * this.videoSize;
    this.lastTime = currentTime;
    this.lastProgress = ranges;
    var speed = sizeDifference / timeDifference;
    if (speed > this.maxSpeed) {
      this.maxSpeed = speed;
    }
    if (ranges >= 1) {
      this.closeInterval();
      this.averageSpeed = this.videoSize / (currentTime - this.playStart);
      this.averageSpeedMs = this.videoSize / ((currentTime - this.playStart)/1000);
      this.averageSpeedKbs = this.averageSpeedMs*1024*1024;
    }
    if (typeof this.onUpdate == "function") {
      this.onUpdate(speed, this.maxSpeed);
    }
    //卡顿超过10秒处理 add
    // console.log("startPlayTime:"+this.startPlayTime);
    // console.log('waitingPlayTime:'+this.waitingPlayTime);
    var pauseDuration_once = this.startPlayTime - this.waitingPlayTime;
    if(pauseDuration_once/1000 >= 10){
      console.log('卡顿超过10秒啦！',pauseDuration_once/1000);
      this.videoEl.pause();
      this.failureReason = "catonLong";
      this.videoEl.currentTime = 0
    }
		//add
		console.log('卡顿次数：'+this.catonNumber);
		console.log('卡顿总时长：'+this.pauseDuration);
    //平均速率分值计算
		// var averageSpeed_num = this.videoSize / (currentTime - this.playStart);
    // this.arr_speed.push(averageSpeed_num);
    // console.log(this.arr_speed);
    // this.averageSpeed_before = this.arr_speed[this.arr_speed.length-2];
    // if(typeof this.averageSpeed_before == "undefined"){
    //   this.averageSpeed_before = 0;
    // }
    // this.averageSpeed_after = this.arr_speed[this.arr_speed.length-1];
    // console.log('time'+currentTime);
    // console.log(this.playStart);
    // console.log('平均速率oldVal'+this.averageSpeed_before);
    // console.log('平均速率newVal'+this.averageSpeed_after);
    // this.averageSpeed_score(this.averageSpeed_before,this.averageSpeed_after);
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
  endTest: function() {
    if (!this.hasInit) {
      return;
    }
    if (this.testStatus == "none" || this.testStatus == "end") {
      return;
    }
    this.testStatus = "end";
    this.closeInterval();
    // if(typeof this.onEnd == "function"){
    // 	this.onEnd();
    // }
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
  //计算卡顿分 add
  kartun_score: function() {
    var num1 = 15;
    num1 -= this.catonNumber;
    num1 -= Math.round(this.pauseDuration / 200);
    if (num1 <= 0) {
      return  num1 = 0;
    }else{
			return num1;
		}

  },
  //计算平均速率分 add
  averageSpeed_score: function() {
    var num2 = 80
    if(this.averageSpeedMs >= 2){
      num2 = 80
    }else if (this.averageSpeedMs >= 1 && this.averageSpeedMs < 2) {
      num2 -= this.averageSpeedKbs/((1024*1024)/10);
    }else if (this.averageSpeedMs >= 0.5 && this.averageSpeedMs < 1) {
      num2 -= this.averageSpeedKbs/((512*1024)/10);
    }else if (this.averageSpeedMs < 0.5) {
      num2 -= this.averageSpeedKbs/(1024/10);
    }
    if(num2 <= 0){
      return 0;
    }else{
      return num2;
    }

  //   if (e > 2) {
  //     this.num2 = 80;
  //   } else if (e > 1 && e <= 2) {
  //     var ratio = 10 / (1024 * 1024);
	// 		this.num2 -= (e - k)/ratio
  //   } else if (e > 0.5 && e <= 1) {
  //     var ratio1 = 10 / (512 * 1024);
	// 		this.num2 -= (e - k)/ratio1
  //   } else if (e <= 0.5) {
  //     var ratio2 = 10 / (1024);
	// 		this.num2 -= (e - k)/ratio2
  //   }
  //   return this.num2;
  }
}
export default waitHandler;
