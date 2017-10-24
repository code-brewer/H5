<template>
    <div class="template">
        <img :src="'images/signIn/banner.jpg'">
        <div class="con">
            <a href="javascript:;" class="template-icon"></a>
            <div class="scroll" @touchstart="touchstart" @touchend="touchend">
                <div class="load2" v-show="isLoad">
                    <load2 :show.sync="isLoad"></load2>
                </div>
                <ul v-el:ul>
                    <li class="flip-item" :class="[flip[$index]]" @click="click($event, item.template)" v-for="item in imgs" track-by="$index">
                        <img :src="item.img">
                    </li>
                </ul>
            </div>
            <p>点击图片即可预览</p>
        </div>
        <p class="templateImgP" v-if="showPreview">长按图片即可分享给好友</p>
        <img class="preview" v-if="showPreview" transition="preview" :src="imgSrc" @click="showPreview = false">
    </div>
    
</template>
<script>
import api from '../../api/index1.js'
import {
    MergeImg
} from '../../dist/mergeImg.js'
import load2 from '../../components/load/load2.vue'
export default {
    components: {
        load2
    },
    data() {
        return {
            flip: ['flip-prev', 'flip-current', 'flip-next'], //图片切换活动状态
            touches: {
                x1: '',
                y1: ''
            }, //手指触摸起点坐标
            imgSrc: '', //预览图片路径
            showPreview: false, //预览图片活动状态
            personalInfo: '', //个人打卡信息
            imgs: [], //模版列表
            isLoad: false, //加载活动状态
            stayStartTime: new Date() //停留时长的开始时间
        }
    },
    ready() {
        // this.getActCardInfo();
    },
    beforeDestroy() {
        this.sendStayTime({
            key: 'template'
        });
    },
    methods: {
        /**
         * 派发数据统计事件
         */
        sendStatistics(options) {
            this.$dispatch('statistics', options);
        },
        /**
         * 派发页面停留时长
         */
        sendStayTime(options) {
            let now = new Date();
            //不足一分钟按一分钟计算
            options.stayTime = Math.ceil((now - this.stayStartTime) / 1000);
            this.$dispatch('statistics', options);
        },
        /**
         * 获取个人信息
         */
        getActCardInfo() {
            this.isLoad = true;
            api.actCardInfo(this, {}, back => {
                if (back.resCode === '0') {

                    this.mergeImg(back.repBody);

                }
            })
        },
        /**
         * 合并图片
         */
        mergeImg(obj) {
            var self = this;
            // this.imgs = [];
            var options = {
                headurl: {
                    img: obj.headUrl,
                    isImg: true,
                    x: 460,
                    y: 232,
                    scaleW: 152,
                    scaleH: 152
                },
                bg: {
                    img: [],
                    isImg: true,
                    x: 0,
                    y: 0,
                    scaleW: 640,
                    scaleH: 1136
                },
                qrcode: {
                    img: obj.qrcodePath,
                    isImg: true,
                    x: 142,
                    y: 935,
                    scaleW: 150,
                    scaleH: 150
                },
                percent: {
                    text: '',
                    isImg: false,
                    x: 385,
                    y: 850,
                    color: '#ff3838',
                    font: '44px bold',
                    isOn: true,
                    maxWidth: 200
                },
                rn: {
                    text: '',
                    isImg: false,
                    x: 320,
                    y: 790,
                    color: '#ff3838',
                    font: 'italic 140px bold',
                    isOn: true,
                    maxWidth: 200
                },
                date: {
                    text: '',
                    isImg: false,
                    x: 320,
                    y: 640,
                    color: '#666',
                    font: '28px',
                    isOn: true,
                    maxWidth: 500
                },
                nick: {
                    text: '',
                    isImg: false,
                    x: 530,
                    y: 420,
                    color: '#000',
                    font: '22px',
                    isOn: true,
                    maxWidth: 200
                },
                daynum: {
                    text: '',
                    isImg: false,
                    x: 352,
                    y: 770,
                    color: '#ff3838',
                    font: 'italic 140px bold',
                    isOn: true,
                    maxWidth: 200
                },
                daynum2: {
                    text: '',
                    isImg: false,
                    x: 40,
                    y: 345,
                    color: '#ac9f97',
                    font: '26px',
                    isOn: true,
                    maxWidth: 300,
                    textAlign: 'left'
                },
                fn: function(arr) {
                    self.imgs = [];
                    arr.forEach((item, index) => {
                        self.imgs.push({
                            img: item,
                            template: this.bg.img[index]
                        })
                    })
                    self.$nextTick(() => {
                        self.isLoad = false;
                        self.imgSrc = arr[1];
                        self.showPreview = true;
                    })
                }
            }
            let list = obj.list ? obj.list[0] : {};
            // 计算百分比
            if (list.ctime) {
                var time = list.ctime.split(/[- :]/),
                    lower = new Date('2016', '11', '1', '5', '0', '0'),
                    ctime = new Date('2016', '11', '1', time[3], time[4], time[5]),
                    index = Math.ceil((ctime - lower) / 1000 / 60 / 60);
                options.percent.text = ['98%', '97%', '92%', '89%', '78%'][index == 0 ? 0 : index - 1];

                options.percent.text = options.percent.text || '60%';
                if (list.rn === '1') {
                    options.percent.text = '100%';
                }
            } else {
                options.percent.text = '0%';
            }

            //昵称
            options.nick.text = obj.nick || '';
            if (!obj.flag) {
                //排名
                options.rn.text = list.rn;
                //连续打卡天数
                options.daynum.text = list.daynum
                    //日期文本
                let time = list.ctime.split(/[- :]/);
                options.date.text = '晨起打卡时间：' + time[1] + '月' + time[2] + '日 ' + time[3] + ':' + time[4] + ':' + time[5];

                options.daynum2.text = '连续打卡第' + list.daynum + '天';
            }


            var template;
            if (obj.flag) {
                template = '3';
            } else if (+list.rn >= 1 && +list.rn <= 9) {
                template = '1';
            } else if (+list.rn > 9) {
                template = '2';
            }
            var num = list.daynum;
            
            function random() {
                return Math.round(Math.random() * 9 + 1);
            }
            // 模版定制
            var isOFF = [],
                bgSum = 3,
                arr = [];
            this.flip = ['flip-prev', 'flip-current', 'flip-next'];
            if (template === '1') {
                isOFF = ['daynum'];
            } else if (template === '2') {
                isOFF = ['rn', 'daynum2'];
                options['percent'].x = 380;
                options['percent'].y = 840;
                options['date'].y = 620;
                if (+time[3] > 6) {
                    isOFF.push('date');
                }
                var set = new Set();
                do {
                    set.add(random());
                } while (set.size < 3);
                set.forEach(value => {
                    arr.push(value);
                })
            } else if (template === '3') {
                isOFF = ['percent', 'rn', 'date', 'daynum', 'daynum2'];
                options['headurl'].x = 247;
                options['headurl'].y = 417;
                options['nick'].x = 320;
                options['nick'].y = 600;
            }
            isOFF.forEach(item => {
                options[item].isOn = false;
            })
            var now = new Date().getDate();
            var nowhour = new Date().getHours();
            // var num = list.daynum;
            // if (now == '23' || now == '24' || now == '25') {
            //     for (let j = 1; j <= bgSum; j++) {
            //         options.bg.img.push('images/template/bg' + template + '-' + (arr[j - 1] || j) + '.png?v2');
            //         if (j >= 4) {
            //             this.flip.push('flip-hidden');
            //         }
            //     }
            //     if (template == 2) {
            //         if(nowhour<7){
            //         	options.bg.img[1] = 'images/template/christmas/bg2-2.png?v2';
            //         }else{
            //         	options.bg.img[1] = 'images/template/christmas/bg2-1.png?v2';
            //         }
            //     } else {
            //          options.bg.img[1] = 'images/template/christmas/bg' + template + '-' + '1' + '.png?v2';
            //     }
            // }
            if (now == '1') {
                for (let j = 1; j <= bgSum; j++) {
                    options.bg.img.push('images/template/newyear/bg' + template + '-' + (arr[j - 1] || j) + '.png?v2');
                    if (j >= 4) {
                        this.flip.push('flip-hidden');
                    }
                }
            }
            else if (num == '21') {
                for (let j = 1; j <= bgSum; j++) {
                    options.bg.img.push('images/template/21/bg' + template + '-' + (arr[j - 1] || j) + '.png?v2');
                    if (j >= 4) {
                        this.flip.push('flip-hidden');
                    }
                }
            }  
            else {
                for (let j = 1; j <= bgSum; j++) {
                    options.bg.img.push('images/template/bg' + template + '-' + (arr[j - 1] || j) + '.png?v2');
                    if (j >= 4) {
                        this.flip.push('flip-hidden');
                    }
                }
            }
            // for (let j = 1; j <= bgSum; j++) {
            // 	options.bg.img.push('images/template/bg'+template+'-'+(arr[j - 1] || j)+'.png?v2');
            // 	if (j >= 4) {
            // 		this.flip.push('flip-hidden');
            // 	}
            // }
            let mergeImg = new MergeImg(options);

        },
        /**
         * 左点击或者向右滑动
         */
        prev() {
            this.flip.push(this.flip.shift(this.flip.length));
        },
        /**
         * 右点击或者向左滑动
         */
        next() {
            this.flip.unshift(this.flip.pop(this.flip.length));
        },
        /**
         * 点击所有图片事件
         */
        click(e, template) {
            let self = e.target || e.srcElement,
                cls = self.parentNode.className;
            if (cls.indexOf('next') > -1) {
                this.next();
            } else if (cls.indexOf('prev') > -1) {
                this.prev();
            } else {
                this.imgSrc = self.src;
                this.showPreview = true;
                this.sendStatistics({
                    key: template.substr(16).split('.')[0]
                });
            }
        },
        /**
         * 手指触摸屏幕
         */
        touchstart(e) {
            this.touches.x1 = e.touches[0].clientX;
            this.touches.y1 = e.touches[0].clientY;
        },
        /**
         * 手指离开屏幕
         */
        touchend(e) {
            let x2 = e.changedTouches[0].clientX,
                y2 = e.changedTouches[0].clientY;
            if ((x2 && Math.abs(this.touches.x1 - x2) > 30) ||
                (y2 && Math.abs(this.touches.y - y2) > 30)) {
                var direction = this._swipeDirection(this.touches.x1, x2, this.touches.y1, y2);
                if (direction === 'Left') {
                    this.next();
                } else if (direction === 'Right') {
                    this.prev();
                }
            }
        },
        /**
         * 计算手指滑动方向
         * @param  {number} x1 [手指触摸点的坐标X]
         * @param  {number} x2 [手指触摸点的坐标Y]
         * @param  {number} y1 [手指离开时触摸点的坐标X]
         * @param  {number} y2 [手指离开时触摸点的坐标Y]
         *
         * @return {string}    返回手指滑动的方向
         */
        _swipeDirection: function(x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },
     
    }
}
</script>
<style lang="scss" scoped>
@keyframes down {
    from {
        top: -100%;
    }
    to {
        top: 0;
    }
}

// @keyframes scale {
// 	from {
// 		transform: scale(.1);
// 	}
// 	to {
// 		transform: scale(1);
// 	}
// }
.template {
    .con {
        position: relative;
        padding-top: 80px;
        .scroll {
            overflow: hidden;
            ul {
                position: relative;
                width: 224px;
                height: 398px;
                margin: 0 auto;
            }
            li {
                position: absolute;
                transition: all .35s ease-out;
            }
            .flip-prev {
                transform: translate(-110%, 0) scale(.8);
                z-index: 999;
            }
            .flip-current {
                transform: translate(0, 0) scale(1);
                z-index: 1000;
            }
            .flip-next {
                transform: translate(110%, 0) scale(.8);
                z-index: 999;
            }
            .flip-hidden {
                transform: translate(0, 0) scale(0);
                z-index: 999;
            }
        }
        .template-icon {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 115px;
            height: 90px;
            background: url(../../images/signIn/icon3.png) no-repeat;
        }
        p {
            padding: 30px 0;
            text-align: center;
            font-size: 28px;
        }
    }
    .templateImgP {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 60px;
        font-size: 26px;
        color: white;
        text-align: center;
        background: rgba(0, 0, 0, .7);
        animation: down 1s linear .5s;
        animation-fill-mode: backwards;
        z-index: 1201;
    }
    .preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1001;
        transition: transform .3s linear;
        // animation: scale .5s;
    }
    .preview-transition {
        transform: scale(1);
    }
    .preview-enter,
    .preview-leave {
        transform: scale(.4);
    }
}
</style>
