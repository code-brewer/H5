<template lang="html">
    <div class="content" :style="{background:'url(' + bg_img + ')'}">
        <section class="header" :style="{paddingTop:top_distance}">
            <div class="top_title">
                <div class="wid30 left">
                    <p>{{higth_num}}<span>Mbps</span></p>
                    <p style="font-size:25px">峰值速率</p>
                </div>
                <div class="wid40 center">
                    <!-- <p>{{newWorkNum}}</p> -->
                    <p v-if="!play_on">测速中...</p>
                    <p v-else>测试未开始</p>
                </div>
                <div class="wid30 right">
                    <!-- <p>{{ratio}}<span>p</span></p>
                    <p style="font-size:25px">分辨率</p> -->
                    <p>{{rate}}<span>Mbps</span></p>
                    <p style="font-size:25px">实时速率</p>
                </div>
            </div>
        </section>
        <section class="top1">
            <video id="liveVideo" ref="video" v-show="video_play" type="video/mp4" preload="none" x-webkit-airplay="true" x5-video-player-type='h5' x5-video-player-fullscreen="true" webkit-playsinline="isiPhoneShowPlaysinline" playsinline="isiPhoneShowPlaysinline">
                <!-- <video id="liveVideo" style="object-fit:fill" type="video/mp4" ref="video" width=550 height=260 preload="none" x-webkit-airplay="true" webkit-playsinline playsinline x5-video-player-type='h5' x5-video-player-fullscreen="true"> -->
                您的浏览器不支持html5视频，建议更新浏览器版本
            </video>
            <canvas ref="oLiveCanvas" v-show="canvas" style="width:95%;border: 2px solid #fff;"></canvas>
            <section class="play_btn" v-show="play_on" @click="click_play()" style="color:#fff;font-size:25px">
                <img src="./../assets/img/goPlay.png" alt="">
            </section>
            <!-- 进度条 -->
            <Progress-bar :line_num = 'lineNum' :startNum = 'startNum' :endNum = 'endNum'></Progress-bar>
        </section>
        <!-- 测速表 -->
        <section class="bottom" style="padding-bottom:8%;position:relative">
            <div>
                <img :src="img_url" class="dial_img">
            </div>
            <div class="" style="position: absolute;top: 10%;width: 100%;">
                <!-- <img :src="img_url1" class="img"> -->
                <img class="pointer" :src="img_url1" :style="{transform:'rotate('+degree+'deg)'}">
            </div>
            <div class="font">
                <p>{{rate}}</p>
                <p>Mbps</p>
            </div>
        </section>
        <!-- /测速表 -->
        <section class="footer">
            <div class="foot">
                <!-- <input type="text" name="" v-model="rate" value=""> -->
                <!-- <button type="button" name="button" @click="pause_play">暂停</button> -->
                本次测速约消耗80M流量，此过程约需25秒钟，请耐心等待。
            </div>
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
import waitHandler from '../assets/js/WaithandlerNew'
import wxSet from '../assets/js/Wx'
import api from '../api/config'
import ProgressBar from '../components/ProgressBar'
export default {
    components: {
        VueLoading,
        Modal,
        ProgressBar
    },
    data() {
        return {
            video_play: false,
            canvas: false,
            condition: 0, //刷新状态
            isWx: isWx, //是否在微信打开，默认为true
            interval_code: 0, //实时速率显示假数据定时器
            top_distance: '18%', //顶部样式设置间距
            higth_num: 0, //峰值
            rate: 0, //实时速率
            bg_img: "./static/img/b.png",
            // videoImg: 'http://hackandhuygo.applinzi.com/timg.jpeg',
            // videoUrl: 'http://192.168.0.123:8080/0830.mp4',//本地视频测试
            // videoUrl: 'http://192.168.4.53:8080/vsu/static/video.mp4',//本地视频测试
            // videoUrl: 'http://192.168.4.28:8080/d3/0906.mp4',//本地视频测试
            videoUrl: 'http://114.247.23.21:8080/movie/unicom0906.mp4',
            // videoUrl_online: 'https://api.youku.com/videos/player/file?data=WcEl1oquZdzBNVE0yTlRNMU5nPT18MHwxfDI1MjU5',
            videoUrl_online: '', //视频URL
            video_bg: './static/img/video_bg.png',
            img_url: "./static/img/dial.png",
            img_url1: "./static/img/top_dial.png",
            bLive_video_timer: null, //绘制canvas定时器
            play_on: true, //点击开始测试按钮
            // degree: 193, //初始度数 193
            //max_degree: 438, //最大转动临界值 438
            loading_modal: true, //加载中...
            v_size: '', //视频大小（单位四舍五入保留1位小数）
            old_deg: 0,
            new_deg: 0,
            start_test_time: '', //测试开始时间
            pointer_animation_timer: null, // 指针摆动动画句柄
            lineNum: 0,//进度条宽度
            startNum: '0',//显示当前播放的进度
            endNum: '2:38'//显示总时长
        }
    },

    created() {
        if (isWx) {
            wxSet.hideShare()
        };
        if (isTBS || isTaoBao || isChrome) {
            this.canvas = true
        } else {
            this.video_play = true
        }
        // this.ratio = localStorage.getItem('ratio');
    },
    mounted() {
        if (!window.sessionStorage.getItem('address')) {
            this.getLocation();
        }
        this.$nextTick(function () {
            this.videoList();
            // this.$refs.video.setAttribute("poster", this.videoImg);
        })
    },
    computed: {
        degree: function () {
            //速率：rate (mbps)
            //最大角度440 每个格度30度，总弧度240度，总数值20mbps，每1mbps是0.083度
            //0-1 12du/mbps 1-5 7.5du/mbps 5-7.5 12du/mbps 7.5-10 17du/mbps
            //10-12.5 12du/mbps 12.5-15 12du/mbps 15-17.5 12du/mbps 17.5-20 12du/mbps
            let angle = 0;
            if (this.rate <= 0) {
                angle = 0;
            } else if (0 < this.rate && this.rate <= 1) {
                angle = (this.rate) * 29; //29
            } else if (1 < this.rate && this.rate <= 5) {
                angle = (this.rate - 1) * 7.75 + 29; //31
            } else if (5 < this.rate && this.rate <= 10) {
                angle = (this.rate - 5) * 6.2 + 60; //31
            } else if (10 < this.rate && this.rate <= 20) {
                angle = (this.rate - 10) * 3.1 + 91; //31
            } else if (20 < this.rate && this.rate <= 30) {
                angle = (this.rate - 20) * 3.1 + 122; //31
            } else if (30 < this.rate && this.rate <= 50) {
                angle = (this.rate - 30) * 1.55 + 153; //31
            } else if (50 < this.rate && this.rate <= 75) {
                angle = (this.rate - 50) * 1.24 + 184; //31
            } else if (75 < this.rate && this.rate <= 100) {
                angle = (this.rate - 75) * 1.2 + 215; //30
            } else if (this.rate > 100) {
                angle = 245;
            }
            return 193 + angle;

        }
    },
    methods: {
        //获取当前时间方法
        get_nowTime: function () {
            var d = new Date();
            var str = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            return str
        },
        playAnimation: function () {
            var _this = this;
            var run_deg = _this.new_deg + 183;
            var default_deg = _this.new_deg - _this.old_deg;
            // console.log('default_deg:'+default_deg);
            var runTimer = setInterval(function () {
                if (_this.new_deg > _this.old_deg) {
                    if (_this.new_deg == default_deg) {
                        clearInterval(runTimer);
                        _this.degree = _this.degree + _this.new_deg;
                    } else {
                        _this.degree += 1;
                        if (_this.degree == run_deg) {
                            clearInterval(runTimer);
                            _this.degree = run_deg;
                        }
                    }
                } else if (_this.new_deg < _this.old_deg) {
                    _this.degree -= 1;
                    if (_this.degree == run_deg) {
                        clearInterval(runTimer);
                        _this.degree = run_deg;
                    }
                } else if (_this.new_deg == _this.old_deg) {
                    _this.degree += 0;
                    clearInterval(runTimer);
                }
            }, 5)
        },
        end: function (playAllTime, state, average_speed, grade, start_time, kartun_num, kartun_duration, test_startTime) {
            console.log('播放阶段总时长:' + playAllTime);
            console.log('状态:' + state); //状态
            console.log('平均速率:' + average_speed); //平均速率
            console.log('评分:' + grade); //评分
            console.log('起始缓冲时长:' + start_time); //起始缓冲时间
            console.log('卡顿次数:' + kartun_num); //卡顿次数
            console.log('总卡顿时长:' + kartun_duration); //总卡顿时长
            console.log('测试开始时间:' + test_startTime); //测试开始时间
            if (this.interval_code != 0) {
                clearInterval(this.interval_code);
                this.interval_code = 0
            };
            if (state == "catonLong") {

                this.condition = 1;
                sessionStorage.setItem('condition', this.condition)
                this.$router.push({
                    name: 'End'
                });
            };
            var testData = {
                '播放阶段总时长/S:': playAllTime / 1000,
                '状态:': state,
                '平均速率:': average_speed / 1024 / 1024 * 1000,
                '起始缓冲时长/S:': start_time / 1000,
                '卡顿次数:': kartun_num,
                '总卡顿时长/S:': kartun_duration / 1000,
                '测试开始时间:': this.start_test_time
            };
            localStorage.setItem('testData', JSON.stringify(testData));
            var obj = {
                'play_all_time': playAllTime,
                'avgRate': average_speed,
                'idxScore': grade,
                'sbufferTime': start_time,
                'getStuckNumber': kartun_num,
                'getStuckTime': kartun_duration,
                'idxCtime': test_startTime,
                'vtype': "视频",
                'channel': "优酷"
            };
            // this.$root.back_obj = obj;
            localStorage.setItem('back_obj', JSON.stringify(obj));
            // console.log('视频:'+this.$root.back_obj.vtype);
            clearInterval(this.bLive_video_timer);
            this.condition = 1;
            sessionStorage.setItem('condition', this.condition);
            this.$router.push({
                name: 'End'
            });
        },
        pointerAnimation: function(rate) {
            var _this = this;
            var _rate = Math.abs(rate - _this.rate) / 10;
            clearInterval(this.pointer_animation_timer);
            if (_this.rate - rate > 0) {
                this.pointer_animation_timer = setInterval(function(){
                    if (_this.rate - rate <= 0) {
                        _this.rate = rate;
                        clearInterval(_this.pointer_animation_timer);
                        return;
                    }
                    var num = (parseFloat(_this.rate) - parseFloat(_rate)).toFixed(2);
                    num = num < 0 ? 0 : num;
                    _this.rate = num;
                }, 100)
            } else {
                this.pointer_animation_timer = setInterval(function(){
                    if (_this.rate - rate >= 0) {
                        _this.rate = rate;
                        clearInterval(_this.pointer_animation_timer);
                        return;
                    }
                    _this.rate = (parseFloat(_this.rate) + parseFloat(_rate)).toFixed(2);
                }, 100)
            }
        },
        onUpdate: function (startNum, real_time, peak, buffering, endSpeed) {
            var _this = this;
            //控制条显示和播放时间显示
            _this.startNum = '0:' + Math.round(startNum);
            let chat = 100/278;
            _this.lineNum = startNum * chat;
            // _this.newWorkNum = netWork;
            // console.log('速率:' + real_time); //实时速率
            // console.log('峰值:' + peak); //峰值
            // console.log('缓冲状态:' + buffering); //缓冲状态
            _this.higth_num = (peak / 1024 * 1000 / 1024 * 8)
                .toFixed(2);
            var rate;
            if (buffering) {
                _this.interval_code = setInterval(function () {
                    // _this.rate = ((Math.random() + 1) * (_this.higth_num / 2)).toFixed(2);
                    console.log('缓冲结束平均速率：' + endSpeed);
                    var rate_num = endSpeed / 1024 / 1024 * 1000 * 8;
                    rate = (rate_num + (1 - (Math.random() * 2)))
                        .toFixed(2);
                    _this.pointerAnimation(rate);
                }, 2000);
            } else {
                // _this.rate = (real_time / 1024 * 1000 / 1024).toFixed(2);
                rate = (real_time / 1024 * 1000 / 1024 * 8)
                    .toFixed(2);
                this.pointerAnimation(rate);
            }
            // localStorage.setItem('buffering',buffering);
            localStorage.setItem('peakValue', peak); //峰值
        },
        click_play: function () {
            this.play_on = false;
            sessionStorage.setItem('canSave',"true");
            this.start_test_time = this.get_nowTime();
            localStorage.setItem('getNowTime', this.start_test_time);
            // var ua = navigator.userAgent;
            //判断区分安卓和iOS系统及其他系统不同的视频播放方法
            console.log("ua:" + ua);
            if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                this.$refs.video.load();
                this.$refs.video.play();
            } else if (/Android (\d+\.\d+)/.test(ua)) {
                this.$refs.video.play();
                this.top_distance = '18%';
            } else {
                this.$refs.video.play();
            }
        },
        pause_play: function () {
            this.$refs.video.pause();
        },
        go: function () {
            this.$router.push({
                name: 'End'
            })
        },
        /**
         * 视频渲染到canvas画布
         */
        go_play: function () {
            console.log('开始');
            var _this = this;
            //获取canvas画布
            var oLiveCanvas = _this.$refs.oLiveCanvas;
            //设置画布
            var oLiveCanvas2D = oLiveCanvas.getContext('2d');
            //监听播放
            _this.play_on = false;
            var width = Math.round(document.documentElement.clientWidth * .95);
            oLiveCanvas.width = width;
            oLiveCanvas.height = 306;
            _this.bLive_video_timer = setInterval(function () {
                //在画布上定位图像，并规定图像的宽度和高度drawImage(img或者视频dom元素,x,y,width,height)
                oLiveCanvas2D.drawImage(_this.$refs.video, 0, 0, width, 306);
            }, 20);
        },
        videoList: function () {
            var _this = this;
            var body = {};
            api.vsdisinfo(_this, body, (back) => {
                if (back.data.repBody.address) {
                    _this.loading_modal = false;
                    // var index = back.data.repBody.listVideo.video_links.length - 1;
                    // var back_data = back.data.repBody.listVideo.video_links[index];
                    console.log('测速地址：' + back.data.repBody.address);
                    localStorage.setItem('address', back.data.repBody.address);
                    //测速地址
                };
                // localStorage.setItem('back_data', JSON.stringify(back_data));
                // _this.videoUrl_online = back_data.url;
                // var video_sizeN = 0;
                // video_sizeN = back_data.videosize;
                // _this.v_size = _this.num_computed(video_sizeN);
                waitHandler.init(_this.$refs.video, _this.go_play, _this.onUpdate, _this.end);
                // waitHandler.ready(_this.videoUrl_online, _this.v_size);
                // var tencent = 'http://ugcydzd.qq.com/flv/84/215/p05303jik7w.p712.1.mp4?sdtfrom=v1010&guid=8f9e9a089281d029167d836c1b295bed&vkey=B841824CA5567378B7A62B626C86A65D808B24FB2E377865A0BC718854A56AEC15E51FA84AF36A78958FBF2BE4F773EF890E33DF6D2EF405117ED05F9D044D40622EF6948AAE7184F4D6B8D122FADF8E316F5715E42AF841434B5935BB68276DCA49A65C71BC65F49EF4C20DDABC441983E91C334C376062&platform=2';
                // waitHandler.ready(tencent, _this.v_size);//腾讯视频
                waitHandler.ready(_this.videoUrl); //本地测试视频
            });
        },
        num_computed: function (e) {
            var a;
            a = Math.ceil(e * 10);
            return a * 1.0 / 10;
        },
        getLocation() {
          // var map = new BMap.Map("allmap");
          // var point = new BMap.Point(116.331398,39.897445);
          // map.centerAndZoom(point,12);
          // var geoc = new BMap.Geocoder();
          //
          // map.addEventListener("click", function(e){
          //   var pt = e.point;
          //   geoc.getLocation(pt, function(rs){
          //     var addComp = rs.addressComponents;
          //     alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          //   });
          // });
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var address;
                    address = r.address.province + r.address.city + r.address.district;
                    if (r.address.province === r.address.city) {
                        address = r.address.city + r.address.district;
                    }
                    window.sessionStorage.setItem('address', address);
                }else if(this.getStatus() == BMAP_STATUS_UNKNOWN_LOCATION){//位置结果未知。对应数值“2”
                  window.sessionStorage.setItem('addressNull', '调用百度接口，获取位置结果未知');
                }
            },{enableHighAccuracy: true})
        }
    }
}

</script>
<style lang="scss" scoped>
$small_size: 25px;
$big_size: 32px;
$topSize: 5%;
.play_btn {
    position: absolute;
    top: 33%;
    left: 42%; // left: 38%;
    .playBtn {
        position: relative;
        border: 25px solid #404040;
        color: #404040;
        height: 0;
        width: 0;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        -o-border-radius: 100%;
        border-radius: 100%;
        margin: 0 20px;
        a {
            border-style: solid;
            text-indent: -9999px;
            position: absolute;
            top: -8px;
            left: -3px;
            border-color: transparent transparent transparent #fff;
            border-width: 8px 0 8px 12px;
            width: 0;
            height: 0;
        }
    }
}

.header {
    padding-bottom: 20px;
    .top_title {
        width: 100%;
        overflow: hidden;
        color: #fff;
        .wid30 {
            width: 30%;
        }
        .wid40 {
            width: 40%;
        }
        .left {
            float: left;
            p {
                font-size: $big_size;
                span {
                    font-size: $small_size;
                }
            }
            .center {
                font-size: $small_size;
            }
        }
        .center {
            float: left;
            font-size: $big_size;
            margin-top: 3%;
        }
        .right {
            float: left;
            p {
                font-size: $big_size;
                span {
                    font-size: $small_size;
                }
            }
            .center {
                font-size: $small_size;
            }
        }
    }
}

.content {
    background-size: 101%!important;
    background-repeat: no-repeat!important; // background-size: cover!important;
}

.top1 {
    width: 100%;
    text-align: center; // padding-top: 5%;
    padding-bottom: 5%;
    position: relative;
    #liveVideo {
        border: 2px solid #fff;
        object-fit: fill;
        width: 95%;
        height: 274px;
    } //  padding-bottom:56.25%!important
}

.dial_img {
    // width: 349px;
}

.img {
    width: 474px;
    transform: rotate(200deg);
    animation: _rotate 1s linear alternate infinite;
}
@keyframes _rotate {
    0% {
        transform: rotate(200deg);
    }
    100% {
        transform: rotate(440deg);
    }
}
.top {
    width: 100%;
    padding: 30px 0;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.bottom {
    >div:first-child {
        padding-top: 18px;
    }
    .pointer {
        width: 60%;
        transition: transform .4s linear;
    }
}
.dial_img {
    // width: 349px;
}
.font {
    position: absolute;
    top: 70%;
    left: 25%;
    width: 50%;
    color: #fff;
    p {
        font-size: 40px;
        &:last-child {
            font-size: 30px;
        }
    }
}
.footer {
    padding-bottom: 15%;
    width: 91%;
    margin: 0 auto;
    .foot {
        color: #fff;
        font-size: 25px;
        text-shadow: 3px 3px 3px black;
        text-align: left;
    }
}

</style>
