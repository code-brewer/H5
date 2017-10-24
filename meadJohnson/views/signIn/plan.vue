<template>
    <div class="plan-wrap">
        <plan-head></plan-head>
        <div class="plan" v-el:plan>
            <div class="con">
                <!-- <div class="load2" v-show="isLoad">
                    <load2 :show.sync="isLoad"></load2>
                </div> -->
                <div class="tab clearfix" :class="{fixed: fixed}">
                    <div :class="{active: active===0}" @click="PvUvTime({type:'18'}),active = 0">打卡计划</div>
                    <div :class="{active: active===1}" @click="PvUvTime({type:'19'}),active = 1">打卡规则</div>
                    <div :class="{active: active===2}" @click="PvUvTime({type:'10'}),active = 2,updateCard">邀请卡</div>
                </div>
                <div class="list" v-show="active===0">
                    <ul>
                        <li v-for="item in recordList" @click="goSetUp($index)" :style="{background: item.isTomorrow ? '#eee' : 'none'}" v-show="item.isSpread !== 0">
                            <i :style="{background: item.isTomorrow ? '#78c5cd' : '#bbb'}">{{($index%21)+1}}</i>
                            <p>{{item.date}}</p>
                            <p>晨起打卡21天计划<a href="javascript:;" @click="goSetUp($index)" v-show="item.isTomorrow">闹钟设置</a></p>
                            <span :class="{orange: item.isTomorrow, green: item.isSign}">{{{item.status}}}</span>
                        </li>
                    </ul>
                    <!--    <p class="clearfix" v-show="recordList.length > 3"><a href="javascript:;" class="spread-btn" @click="sendStatistics(isSpread ? {key: 'sqjh'} : {key: 'zkjh'}), isSpread = !isSpread, spreadClick()">{{isSpread ? '收起计划' : '展开计划'}}>></a></p> -->
                    <p class="clearfix" v-show="recordList.length > 2"><a href="javascript:;" class="spread-btn" @click="groupaddPvUv({type:'12'}), isSpread = !isSpread, spreadClick()">{{isSpread ? '收起计划' : '展开计划'}}>></a></p>
                    <p class="cancel" v-show="isPartake" @click="modalShow = true">- 点击退出晨起打卡21天计划 -</p>
                    <!--  <div class="btns" style="z-index:1;">
                        <a href="javascript:;" class="btn btn-success btn-circle" @click="addCardSignin">{{signText}}</a>
                    </div> -->
                    <div class="btns" style="z-index:3;">
                        <!-- <a href="javascript:;" class="btn btn-error" v-show="((isPartake && !isSignTime)&&(isPartake && !isRepairSignTime))">未开始</a> -->
                        <!-- <a href="javascript:;" class="btn btn-error" v-show="(isPartake && (!isSignTime) && !isRepairSignTime)">未开始</a> -->
                        <a href="javascript:;" class="btn btn-error" v-show="(isPartake &&(!isSignTime) && !isRepairSignTime)">未开始</a>
                        <a href="javascript:;" class="btn btn-success btn-circle" v-if="isPartake === false" @click="groupaddPvUv({type:'13'}),updateCardStatus('1')">我要参加</a>
                        <a href="javascript:;" class="btn btn-success btn-circle" v-if="isPartake && isSignTime" @click="addCardSignin">{{signText}}</a>
                        <!-- <a href="javascript:;" class="btn btn-successbdk" v-if="isPartake === false&& isRepairSignTime" @click="updateCardStatus('1'),sendStatistics({key:'kbdk'})">可补打卡</a> -->
                        <a href="javascript:;" class="btn btn-successbdk" v-if="isPartake && isRepairSignTime" @click="addCardSignin">{{signText2}}</a>
                    </div>
                </div>
                <div class="rule" v-show="active===1">
                    <sign-in-rule></sign-in-rule>
                </div>
                <div class="" v-show="active===2">
                    <yqk></yqk>
                </div>
                <!-- <div class="plan-icon"></div>
                <div class="plan-rule-icon"></div> -->
            </div>
        </div>
        <div id="banner" class="banner">
            <div class="hd">
                <ul>
                    <li class="on">&nbsp;</li>
                </ul>
            </div>
            <div class="bd" @click="groupaddPvUv({tab: 'banner1',type:'6'}, $event, 'banner')">
                <ul>
                    <li v-for="list in bannerlists">
                        <a :href="list.link">
                            <img :id="list.sort" :src="list.url">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
         <!-- <div id="banner" class="banner">
            <div class="hd">
                <ul>
                    <li class="on">&nbsp;</li>
                </ul>
            </div>
            <div class="bd" @click="sendStatistics({key: 'banner1'}, $event, 'banner')">
                <ul>
                    <li>
                        <a :href="bannerlists.banner1Url">
                            <img :id="id1" :src="bannerlists.banner1">
                        </a>
                    </li>
                    <li>
                        <a :href="bannerlists.banner2Url">
                            <img :id="id2" :src="bannerlists.banner2">
                        </a>
                    </li>
                    <li>
                        <a :href="bannerlists.banner3Url">
                            <img :id="id3" :src="bannerlists.banner3">
                        </a>
                    </li>
                </ul>
            </div>
         </div>-->
        <!-- 刷新按钮 -->
        <a href="javascript:;" v-show="isRefreshShow" class="refresh-btn" @click="refresh()"><i :class="{'refresh-rotate': isRefresh}"></i></a>
        <!-- 温馨提示弹窗 -->
        <snackbar :show-snack-bar.sync="snackbarShow" :text="snackbarText"></snackbar>
        <!--  退订计划确认弹窗 -->
        <modal :show.sync="modalShow">
            <div class="open">
                <h2>温馨提示</h2>
                <div class="con" style="height: 250px;">
                    <p>是否确认取消？</p>
                    <div class="btnGroups">
                        <div class="yes btn-success" @click="groupaddPvUv({type:'14'}), updateCardStatus('0'), modalShow = false">是的</div>
                        <div class="no btn-error" @click="modalShow = false">再考虑考虑</div>
                    </div>
                </div>
                <a href="javascript:;" class="close" @click="modalShow = false"></a>
            </div>
        </modal>
        <!--  弹窗 -->
        <modal :show.sync="planShow">
            <div class="planOk ">
                <!-- <div><img :src="'images/signIn/bg.png'" ></div> -->
                <div class="con">
                    <p>获得{{coin}}贝壳币</p>
                    <!-- <a style="bottom: 58px;color: #000000;text-decoration: none;">{{open1}}</a>
                    <br/>
                    <a href="{{openUrl}}" @click="sent()">{{open2}}>></a> -->
                    <a href="javascript:;" @click="sent()"><img :src="'images/signIn/btn.png'"></a>
                </div>
                <a href="javascript:;" class="close" @click="planShowClose()"></a>
            </div>
        </modal>
        <modal :show.sync="planShow2">
            <div class="planOk planOk2">
                <div class="con">
                    <p style="bottom:298px;color:#000;">连续打卡第{{daynum}}天</p>
                    <img :src="'images/signIn/plan-bdk.png'" style="position: absolute;bottom: 207px;left: 77px;">
                    <p style="bottom: 134px;left: 166px;">答应花妈明天要晨起打卡</p>
                    <p>啊HO HO HO ~</p>
                    <a href="javascript:;" @click="planShowClose2()">
                        <img :src="'images/signIn/plan-bdk-close.png'">
                    </a>
                </div>
            </div>
        </modal>
        <p class="templateImgP" v-if="showTemplateImg">长按图片即可分享给好友</p>
        <img :src="templateImg" v-if="showTemplateImg" @click="showTemplateImg = !showTemplateImg" transition="templateImg">
    </div>
</template>
<script>
import api from '../../api/index1.js'
import signInRule from '../../components/signIn/signInRule.vue'
import snackbar from '../../components/snackbar.vue'
import modal from '../../components/Modal.vue'
import planHead from '../../components/signIn/planHead.vue'
import load2 from '../../components/load/load2.vue'
import yqk from '../../components/signIn/yqk.vue'
import DateUtils from '../../utils/DateUtils.js'
import {
    MergeImg
} from '../../dist/mergeImg.js'
import {
    TouchSlide
} from '../../dist/TouchSlide.1.1.js'
export default {
    components: {
        snackbar,
        modal,
        planHead,
        load2,
        signInRule,
        yqk
    },
    data() {
        return {
            active: 0, //tab切换
            modalShow: false, //确认退订活动窗口状态
            snackbarShow: false, //提示窗口状态
            snackbarText: '', //提示窗口文本
            isSpread: false, //是否展开计划
            fixed: false, //计划和规则tab置顶
            isLoad: false, //加载活动状态
            isPartake: null, //是否参与活动
            recordList: [], //用户打卡信息列表
            showRule: false, //显示规则tab
            fixedIcon: false, //打卡计划和规则图标置顶
            currentDate: new Date(), //当前时间
            templateImg: '', //模版图片
            showTemplateImg: false, //显示模版图片
            daynum: '', //连续打卡天数
            destroyShow: false, //关闭浏览器窗口活动状态
            surplusTime: '', //离下次打卡的剩余时间
            isSign: true, //是否已经打卡
            stayStartTime: new Date(), //停留时长开始时间
            isRefreshShow: false, //刷新按钮活动状态
            isRefresh: false, //是否刷新
            refreshTime: null, //刷新状态定时器
            signText: '我要打卡', //打卡按钮文字
            signText2: '可补打卡', //打卡按钮文字
            btnDisabled: false, // 打卡按钮禁止重复
            planShow: false, //打卡成功弹窗
            planShow2: false, //补打卡成功弹窗
            coin: '', //每天获得的贝壳币
            // openUrl: '',//弹窗跳转地址
            // open1: '',//弹窗内容1
            // open2: '',//弹窗内容2
            // id1: '', //轮播1ID
            // banner1Url: '', //轮播1跳转地址
            // banner1: '', //轮播图片1地址
            // id2: '', //轮播2ID
            // banner2Url: '', //轮播2跳转地址
            // banner2: '', //轮播图片2地址
            // id3: '', //轮播3ID
            // banner3Url: '', //轮播3跳转地址
            // banner3: '', //轮播图片3地址
            bannerlists: [],
            i: '0',
            playCardByToday:'',
        }
    },
    created() {
        this.getCardStatus();
        // this.getUserRecordList();
        // this.getActCardInfo();
        // this.openlist();
        this.bannerlist();
        this.groupaddPvUv({type:'9'})
        // this.$route.params.id;
        // console.log(this.$route.params.id)
        if (this.$route.params.id == 'yqk') {
            this.active = 2;
        } else {
            this.active = 0;
        }


    },
    ready() {
        window.onscroll = this.scroll;
        //banner
        // TouchSlide({
        //     slideCell: "#banner",
        //     titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        //     mainCell: ".bd ul",
        //     effect: "leftLoop",
        //     autoPlay: true, //自动播放
        //     autoPage: true, //自动分页
        //     delayTime: 200,
        //     interTime: 3500,
        // });

        // let state = window.localStorage.getItem('template-state');
        // if (state === '1') {
        //     //弹窗并设置状态为非1
        // this.getActCardInfo(true);
        //     // this.showTemplateImg = true;
        //     window.localStorage.setItem('template-state', 0)
        // }

    },
    beforeDestroy() {
        window.onscroll = null;
    },
    watch() {},
    computed: {
        isSignTime() { //是否处于打卡时间
            // return true;//测试后删除
            if (this.isPartake && this.currentDate) {
                let now = new Date(this.currentDate),
                    lower = new Date(this.currentDate);
                lower.setHours('5');
                lower.setMinutes('0');
                lower.setSeconds('0');
                let hours = (now - lower) / 1000 / 60 / 60;
                if (hours >= 0 && hours <= 5 && !this.playCardByToday) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        },
        isRepairSignTime() { //是否处于补打卡时间
            // return true;//测试后删除
            console.log(this.playCardByToday)
            if (this.isPartake && this.currentDate) {
                let now = new Date(this.currentDate),
                    lower = new Date(this.currentDate);
                lower.setHours('5');
                lower.setMinutes('0');
                lower.setSeconds('0');
                let hours = (now - lower) / 1000 / 60 / 60;
                if (hours > 5 && hours < 19 && !this.playCardByToday) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        },
    },
    methods: {
        /**
         * banner数据统计事件
         */
       
        /**
         * 派发数据统计事件
         */
         groupaddPvUv(options, event, trigerName) {
            if ('banner' == trigerName) {
                options.tab = event.target.id;
            }
            this.$dispatch('statistics', options);
        },
        // sendStatistics(options) {
        //     this.$dispatch('statistics', options);
        // },
        /**
         * 派发打卡计划和打卡规则停留时长
         */
        // sendStayTime(options) {
        //     let now = new Date();
        //     //不足一分钟按一分钟计算
        //     options.stayTime = Math.ceil((now - this.stayStartTime) / 1000);
        //     this.stayStartTime = now;
        //     this.$dispatch('statistics', options);
        // },
         PvUvTime(options) {
            let now = new Date();
            options.times = Math.ceil((now - this.stayStartTime) / 1000);
            this.stayStartTime = now;
            this.$dispatch('statistics', options);
        },
        /**
         * 获取个人信息
         */
        getActCardInfo() {
            this.isLoad = true;
            api.getImage(this, {}, back => {
                if (back.success == '1') {
                    var obj = back.object;
                    obj.ctime = DateUtils.formatDate(new Date(obj.ctime), 'yyyy-MM-dd HH:mm:ss');
                    this.mergeImg(obj)
                }
            })
        },
        /**
         * 合并图片
         */
        mergeImg(obj) {
            var self = this;
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
                    font: '48px bold',
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
                    x: 354,
                    y: 760,
                    color: '#ff3838',
                    font: 'italic 100px bold',
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
                    self.templateImg = arr[0];
                    // self.showTemplateImg = !!type;
                    // self.planShow = true;
                    // self.showTemplateImg = true;
                    self.$nextTick(() => {
                            self.isLoad = false;
                        })
                        // setTimeout(() => {
                        //  self.destroyShow = true;
                        // }, 500);
                }
            }
            let list = obj ? obj : {};
            // 计算百分比
            if (list.ctime) {
                var time = list.ctime.split(/[- :]/),
                    lower = new Date('2016', '11', '1', '5', '0', '0'),
                    ctime = new Date('2016', '11', '1', time[3], time[4], time[4]);
                options.percent.text = ['98%', '97%', '92%', '89%', '78%'][Math.ceil((ctime - lower) / 1000 / 60 / 60) - 1];
                options.percent.text = options.percent.text || '60%';
            } else {
                options.percent.text = '0%';
            }
            //昵称
            options.nick.text = obj.nick || '';
            if (obj.flag == '1') {
                //排名
                options.rn.text = list.rn;
                //连续打卡天数
                options.daynum.text = list.daynum;
                //日期文本
                let time = list.ctime.split(/[- :]/);
                options.date.text = '晨起打卡时间：' + time[1] + '月' + time[2] + '日 ' + time[3] + ':' + time[4] + ':' + time[5];
                options.daynum2.text = '连续打卡第' + list.daynum + '天';
            }
            var template;
            // console.log(obj.flag)
            if (obj.flag == '0') {
                template = '3';
            } else if (+list.rn >= 1 && +list.rn <= 9) {
                template = '1';
            } else if (+list.rn > 9) {
                template = '2';
            }
            // 模版定制
            var isOFF = [],
                bgSum = 1;
            this.flip = ['flip-prev', 'flip-current', 'flip-next'];
            if (template === '1') {
                isOFF = ['daynum'];
            } else if (template === '2') {
                isOFF = ['rn', 'daynum2'];
                options['percent'].x = 380;
                options['percent'].y = 840;
                options['date'].y = 620;
                if (+time[3] > 6) {
                    isOFF.push('date')
                }
            }
            isOFF.forEach(item => {
                options[item].isOn = false;
            })
            var now = new Date().getDate(),
                nowhour = new Date().getHours(),
                day = list.daynum;
            options.bg.img = [];
            for (let j = 1; j <= bgSum; j++) {
                if (template === '3') {
                    options['custom'] = {
                        headurl: {
                            y: 377
                        },
                        nick: {
                            y: 560
                        }
                    }
                }
                var num = Math.round(Math.random() * 2 + 1);
                options.bg.img.push('images/template/bg' + template + '-' + num + '.png');
                // options.bg.img.push('images/template/bg' + template + '-' +  '2.png');
                // var json = {
                //     "8": "3_8",
                // }
                // if (!json[now]) {
                //     options.bg.img.push('images/template/bg' + template + '-' + num + '.png');
                // } else {
                //     options.bg.img.push('images/template/' + json[now] + '/bg' + template + '-1.png');
                // }
            }
            let mergeImg = new MergeImg(options);
        },
        /**
         * 跳转到设置界面
         * @param { number } index 下标
         */
        goSetUp(index) {
            if (!this.recordList[index].isMiss) {
                this.$router.go({
                    path: '/newSignIn/setUp/' + (index + 1)
                });
            }
        },

        scroll() {
            var top = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            if (top >= 370) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        },
        /**
         * 查询用户是否参加21天打卡计划
         */
        getCardStatus() {
            api.isPlanCheck(this, {}, back => {
                if (back) {
                    if (back.success == 1) {
                        this.isPartake = !!(back.object.playCardStatus);
                        this.playCardByToday = !!(back.object.playCardByToday)
                        console.log(this.playCardByToday)
                        this.currentDate = back.object.nowTime;
                        this.getUserRecordList();
                    } else {
                        this.snackbarShow = true;
                        if (back.code === '501' || back.code === '502') {
                            this.snackbarText = '亲，请重新进去页面哦';
                        } else if (back.code === '503') {
                            this.snackbarText = '亲，请先参与打卡计划';
                        } else if (back.code === '504') {
                            this.snackbarText = '亲，打卡时间还没到呢~';
                        } else if (back.code === '505') {
                            this.snackbarText = '亲，你今天已完成打卡，明天继续哈';
                        } else if (back.code === '555') {
                            this.snackbarText = '花妈在飞，你等等~~~';
                        } else {
                            this.snackbarText = '亲，请重新进去页面哦';
                        }
                    }
                } else {
                    this.snackbarShow = true;
                    this.snackbarText = '亲，请重新进去页面哦';
                }

            });
        },
        /**
         * 刷新页面信息
         */
        refresh() {

            clearTimeout(this.refreshTime);
            this.isRefresh = true;

            this.i++;
            if (this.i < 3) {
                this.getCardStatus();
            } else {
                this.snackbarShow = true; //提示窗口状态
                this.snackbarText = '正在刷新中，请不要重复点击'; //提示窗口文本
            }

            this.refreshTime = setTimeout(() => {
                this.i = 0;
                this.isRefresh = false;
            }, 1200);
        },
        /**
         * 获取用户打卡信息
         */
        getUserRecordList() {
            this.currentDate = this.currentDate || new Date().getTime();
            // this.isLoad = true;
            this.currentDate = new Date().getTime(); //测试
            api.userRecordList(this, {}, back => {
                if (back.resCode === '0') {
                    // this.isLoad = false;
                    this.isSign = false;
                    if (back.repBody.list && back.repBody.list.length && this.isPartake) {
                        let list = back.repBody.list,
                            acttime = list[0].acttime ? list[0].acttime.split(/[- :]/) : '',
                            first = '',
                            len = list[0].ctime ? list.length : 0,
                            arr = [],
                            now = new Date(this.currentDate),
                            tomorrow = new Date(this.currentDate);
                        if (acttime) {
                            first = new Date(acttime[0], (+acttime[1] - 1), acttime[2]);
                        }
                        // 设置明天打卡开始时间
                        if (now.getHours() > 4) {
                            tomorrow.setDate(tomorrow.getDate() + 1);
                        }
                        tomorrow.setHours('5');
                        tomorrow.setMinutes('0');
                        tomorrow.setSeconds('0');
                        // 设置今日打卡截止时间
                        let nowSignInTime = new Date(this.currentDate);
                        nowSignInTime.setHours('10');
                        nowSignInTime.setMinutes('0');
                        nowSignInTime.setSeconds('0');
                        var dayNum = Math.ceil((now - first) / 1000 / 60 / 60 / 24) + 1;
                        dayNum = Math.ceil(dayNum / 21) * 21;

                        var currentDateIndex = 0;
                        for (let i = 1; i <= dayNum; i++) {

                            var firstDay = first.getDate(),
                                firstMonth = first.getMonth(),
                                tomorrowDay = tomorrow.getDate(),
                                nowDay = now.getDate(),
                                nowMonth = now.getMonth();
                            // nowhour = new Date().getHours();
                            /* 与打过卡的日期相比较 */
                            if (len > 0) {
                                var time = list[list.length - len].ctime.split(/[- :]/),
                                    date = new Date(time[0], (+time[1] - 1), time[2]),
                                    datehour = time[3];
                                if (first.getTime() === date.getTime()) {
                                    if (datehour >= 5 && datehour < 10) {
                                        arr.push({
                                            date: (date.getMonth() + 1) + '月' + date.getDate() + '日 05:00-10:00',
                                            status: '打卡成功'
                                        });
                                    } else if (datehour >= 10 && datehour < 24) {
                                        arr.push({
                                            date: (date.getMonth() + 1) + '月' + date.getDate() + '日 10:00-23:59',
                                            status: '补打卡成功'
                                        });
                                    }

                                    if (now.getMonth() == date.getMonth() && now.getDate() == date.getDate()) {
                                        this.isSign = true;
                                    }

                                    if (firstMonth === nowMonth && firstDay === nowDay) {
                                        currentDateIndex = arr.length - 1;
                                    }

                                    // if (firstMonth < nowMonth || firstMonth == 11) {
                                    //     arr[arr.length - 1].isSpread = 0;
                                    // }
                                    // if (firstDay < nowDay) {
                                    //     arr[arr.length - 1].isSpread = 0;
                                    // }
                                    len--;
                                    first.setDate(first.getDate() + 1);
                                    continue;
                                }
                            }
                            /* 设置当前月的下个月全部为未开始 */
                            if (firstMonth > nowMonth && firstMonth != 11) {
                                if (firstDay === tomorrowDay) { // 计算距离第二天打卡时间的剩余小时
                                    let ms = tomorrow.getTime() - now.getTime(),
                                        Minutes = Math.ceil(ms / 1000 / 60),
                                        hours = Math.round(ms / 1000 / 60 / 60);
                                    if (hours < 1 && Minutes < 4) {
                                        // setTimeout(() => {
                                        //     this.isRefreshShow = true;
                                        // }, 2000);
                                        this.isRefreshShow = true;
                                    } else {
                                        this.isRefreshShow = false;
                                    }
                                    arr.push({
                                        status: (hours > 0 ? hours + '小时' : Minutes + '分钟') + '后<br/>开始',
                                        isTomorrow: !0,
                                    })
                                    window.localStorage.setItem('surplusTime', (hours > 0 ? hours + '小时' : Minutes + '分钟') + '后开始');
                                } else {
                                    arr.push({
                                        status: '未开始'
                                    });
                                }
                            } else if (firstMonth < nowMonth || firstMonth == 11) { /* 设置当前月的上个月全部为已结束 */
                                arr.push({
                                    status: '已结束',
                                    isMiss: true
                                });
                            } else {
                                /* 设置当前月每天的打卡状态 */
                                if (firstDay > nowDay || (firstDay == nowDay && now.getHours() < 5)) {

                                    if (firstDay === tomorrowDay) { // 计算距离第二天打卡时间的剩余小时
                                        let ms = tomorrow.getTime() - now.getTime(),
                                            Minutes = Math.ceil(ms / 1000 / 60),
                                            hours = Math.round(ms / 1000 / 60 / 60);
                                        if (hours < 1 && Minutes < 4) {
                                            this.isRefreshShow = true;
                                        } else {
                                            this.isRefreshShow = false;
                                        }
                                        arr.push({
                                            status: (hours > 0 ? hours + '小时' : Minutes + '分钟') + '后<br/>开始',
                                            isTomorrow: !0,
                                        })
                                        window.localStorage.setItem('surplusTime', (hours > 0 ? hours + '小时' : Minutes + '分钟') + '后开始');
                                    } else {
                                        arr.push({
                                            status: '未开始'
                                        });
                                    }
                                    if (firstMonth === nowMonth && firstDay === nowDay) {
                                        currentDateIndex = arr.length - 1;
                                    }
                                } else if (firstDay < nowDay) {

                                    /* 当天之前的日期均已结束打卡 */
                                    arr.push({
                                        status: '已结束',
                                        isMiss: true
                                    });

                                } else if (firstDay === nowDay) {

                                    /* 循环到当天，设置当天是否错过打卡时间段 */
                                    if (now.getTime() > nowSignInTime.getTime()) {
                                        arr.push({
                                            status: '已结束',
                                            isMiss: true
                                        });
                                    } else {
                                        arr.push({
                                            status: '可打卡',
                                            isSign: !0,

                                        });
                                    }
                                    if (firstMonth === nowMonth && firstDay === nowDay) {
                                        currentDateIndex = arr.length - 1;
                                    }
                                }
                            }
                            if (firstMonth === nowMonth && firstDay === nowDay) {
                                arr[arr.length - 1].isNow = !0;
                            }
                            // if (firstMonth === nowMonth && (firstDay === nowDay || firstDay === nowDay + 1 || firstDay === nowDay + 2)) {} else {
                            //     arr[arr.length - 1].isSpread = 0;
                            // }
                            // if(firstDay === nowDay || firstDay === ((nowDay + 1)%31) || firstDay === ((nowDay + 2)%31)) {} else {
                            //     arr[arr.length - 1].isSpread = 0;
                            // }
                            arr[arr.length - 1].date = (firstMonth + 1) + '月' + first.getDate() + '日 05:00-10:00';
                            first.setDate(firstDay + 1);
                        }
                        arr.forEach((item, index) => {
                            if (index - currentDateIndex < 3 && index - currentDateIndex >= 0) {
                                // console.log(currentDateIndex)
                                item.isSpread = 1;
                            } else {
                                item.isSpread = 0;
                            }
                        })
                        this.recordList = arr;

                    } else { // 暂无打卡信息
                        this.recordList = [];
                        let now = new Date(this.currentDate);
                        for (let i = 0; i < 21; i++) {
                            this.recordList.push({
                                status: '未开始',
                                isMiss: true,
                                date: (now.getMonth() + 1) + '月' + now.getDate() + '日 05:00-10:00',
                                isSpread: i > 2 ? 0 : ''
                            });
                            now.setDate(now.getDate() + 1);
                        }
                    }
                }
            })
        },
        /**
         * 更新用户是否参加21天打卡计划
         */
        updateCardStatus(flag) {
            api.updateCardStatus(this, {
                cardActStatus: flag
            }, back => {
                if (back.resCode === '0') {
                    this.isPartake = !!(+flag);
                    this.snackbarShow = true;
                    this.snackbarText = flag === '1' ? '参加成功' : '取消成功';
                    this.getCardStatus()
                    // this.getUserRecordList();
                    this.$broadcast('getCount');
                }
            })
        },
        /**
         * 用户打卡操作
         */
        addCardSignin() {
            if (this.btnDisabled) {
                return false;
            }
            this.signText = '打卡中';
            this.btnDisabled = true;
            var time = new Date().getHours();
            api.getplayCard(this, {}, back => {
                this.snackbarShow = true;
                this.btnDisabled = false;
                if (back.success == 1) {
                    this.getCardStatus();
                    this.getActCardInfo();
                    this.snackbarText = '打卡成功';
                    console.log(time)
                    if (time >= 5 && time < 10) {
                        this.planShow = true;
                        this.signText = '打卡成功';
                        this.coin = back.object.score;
                    } else {
                        this.planShow2 = true;
                        this.signText2 = '打卡成功';
                        this.daynum = back.object.dayNum;
                    }
                } else {
                    if (back.code === '501' || back.code === '502') {
                        this.snackbarText = '亲，请重新进去页面哦';
                    } else if (back.code === '503') {
                        this.snackbarText = '亲，请先参与打卡计划';
                    } else if (back.code === '504') {
                        this.snackbarText = '亲，打卡时间还没到呢~';
                    } else if (back.code === '505') {
                        this.snackbarText = '亲，你今天已完成打卡，明天继续哈';
                    } else if (back.code === '555') {
                        this.snackbarText = '花妈在飞，你等等~~~';
                    }
                }
            })
        },
        /**
         * 销毁浏览器会话
         */
        destroyBrowser() {
            if (window.WeixinJSBridge) {
                window.WeixinJSBridge.call('closeWindow');
            }
        },
        /**
         * 展开计划和收起计划事件
         */
        spreadClick() {
            var flag;
            if (this.isSpread) {
                flag = 1;
            } else {
                flag = 0;
            }
            this.recordList.forEach(item => {
                if (item.isSpread != 1) {
                    item.isSpread = !!flag ? 2 : flag;
                }
            })
        },
        /**
         * 关闭弹窗
         */
        planShowClose() {
            this.planShow = false;
        },
        planShowClose2() {
            this.planShow2 = false;
        },
        sent() {
            // window.localStorage.setItem('template-state', 1);
            setTimeout(() => {
                this.showTemplateImg = true;
            }, 500);
            // this.showTemplateImg = true;
            this.planShow = false;

        },
        /*
        跟新卡片
        */
        updateCard() {
            this.$broadcast('getCard');
        },
        /**
        banner
        */
        bannerlist() {
            var time = DateUtils.formatDate(new Date(), 'yyyy-MM-dd')
            api.getbanner(this, {
                pushTime: time,
                type: '1'
            }, back => {
                if (back.success == '1') {
                    this.bannerlists = back.object;
                    this.$nextTick(function() {
                        TouchSlide({
                            slideCell: "#banner",
                            titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                            mainCell: ".bd ul",
                            effect: "leftLoop",
                            autoPlay: true, //自动播放
                            autoPage: true //自动分页
                        });
                    })

                }
            })
        },
        //   bannerlist() {
        //     var now = new Date().getDate()
        //     var json = {
        //         "11": {
        //             banner1: 'images/signIn/banner/banner19.png',
        //             banner2: 'images/signIn/banner/banner25.png',
        //             banner3: 'images/signIn/banner/57.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: '#!/tips',
        //             banner3Url: 'https://h5.youzan.com/v2/showcase/goods?alias=2fmna25f4pwr2&reft=1494399865710&spm=f47161319&redirect_count=1',
                   
        //         },
        //         "12": {
        //             banner1: 'images/signIn/banner/55.png',
        //             banner2: 'images/signIn/banner/54.png',
        //             banner3: 'images/signIn/banner/57.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: 'https://sale.jd.com/m/act/0U2XRzBekTy.html',
        //              banner3Url: 'https://h5.youzan.com/v2/showcase/goods?alias=2fmna25f4pwr2&reft=1494399865710&spm=f47161319&redirect_count=1',
        //         },
        //         "13": {
        //             banner1: 'images/signIn/banner/banner36.png',
        //             banner2: 'images/signIn/banner/banner18.png',
        //             banner3: 'images/signIn/banner/58.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: 'http://shop.suning.com/30000238/index.html',
        //             banner3Url: 'https://h5.youzan.com/v2/showcase/goods?alias=2xmiyyxnko2ge&reft=1494399910245&spm=f47161319',
        //         },
        //         "14": {
        //             banner1: 'images/signIn/banner/55.png',
        //             banner2: 'images/signIn/banner/banner25.png',
        //             banner3: 'images/signIn/banner/53.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: '#!/tips',
        //             banner3Url: '#!/recommend1',
        //         },
        //         "15": {
        //             banner1: 'images/signIn/banner/banner36.png',
        //             banner2: 'images/signIn/banner/54.png',
        //             banner3: 'images/signIn/banner/53.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: 'https://sale.jd.com/m/act/0U2XRzBekTy.html', 
        //             banner3Url: '#!/recommend1',
        //         },
        //         "16": {
        //              banner1: 'images/signIn/banner/55.png',
        //             banner2: 'images/signIn/banner/banner18.png',
        //             banner3: 'images/signIn/banner/56.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: 'http://shop.suning.com/30000238/index.html', 
        //             banner3Url: 'https://h5.youzan.com/v2/showcase/goods?alias=1ydutmuur0sem&reft=1494399883053&spm=f47161319',
        //         },
        //         "17": {
        //            banner1: 'images/signIn/banner/banner36.png',
        //             banner2: 'images/signIn/banner/banner25.png',
        //             banner3: 'images/signIn/banner/56.png',
        //             banner1Url: '#!/huamayuer',
        //             banner2Url: '#!/tips',
        //             banner3Url: 'https://h5.youzan.com/v2/showcase/goods?alias=276dwvhfrtnam&reft=1493776896710&spm=f47161319',
        //         },
        //     }
        //     this.id1 = 'banner'
        //     this.id2 = 'banner1'
        //     this.id3 = 'banner2'
        //     if (!json[now]) {
        //         this.bannerlists = json[17]
        //     } else {
        //         this.bannerlists = json[now]
        //     }
        // }
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

@keyframes refreshRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(720deg);
    }
}

.plan-wrap {
    // padding-bottom: 100px;
    background: url(../../images/signIn/plan-bj.png);
    min-height: 900px;
    .plan {
        padding-top: 20px;
        // background: #f3f3f3;
        .con {
            position: relative;
            font-size: 10px;
            padding-top: 60px;
            margin: 0px 8px;
            background: white;
            padding-bottom: 300px;
            min-height: 300px;
            .load2 {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin-top: -10px;
                z-index: 1001;
            }
            .tab {
                margin-top: -60px;
                background: white;
                > div {
                    float: left;
                    width: 33%;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    color: #686868;
                    font-size: 2.4em;
                    &.active {
                        color: #78c5cd;
                        border-bottom: 1PX #78c5cd solid;
                    }
                }
                &.fixed {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    margin: 0;
                    z-index: 100;
                }
            }
            .list {
                position: relative;
                padding: 20px 0 40px;
                font-size: 2.4em;
                li {
                    position: relative;
                    padding: 5px 70px 15px 90px;
                    color: #686868;
                    border-bottom: 1px dashed #eee;
                    i {
                        position: absolute;
                        top: 50%;
                        left: 20px;
                        width: 50px;
                        height: 50px;
                        line-height: 50px;
                        border-radius: 50%;
                        text-align: center;
                        color: white;
                        transform: translate(0, -50%);
                    }
                    span {
                        position: absolute;
                        top: 50%;
                        right: 30px;
                        text-align: right;
                        transform: translate(0, -50%);
                        &.orange {
                            color: #ff9946;
                        }
                        &.green {
                            color: #ff9946;
                        }
                    }
                    a {
                        padding-left: 10px;
                        font-size: inherit;
                        color: #78c5cd;
                    }
                }
                .cancel {
                    padding: 10px 0px;
                    color: #78c5cd;
                    text-align: center;
                    margin: 0 auto;
                    width: 60%;
                }
                .spread-btn {
                    float: right;
                    margin: 5px 30px;
                    color: #f80;
                    font-size: inherit;
                    text-decoration: underline;
                }
            }
            .plan-icon {
                position: absolute;
                top: 10px;
                left: 25px;
                width: 135px;
                height: 105px;
                background: url(../../images/signIn/icon1.png) no-repeat -294px 0;
            }
            .plan-rule-icon {
                position: absolute;
                top: 25px;
                right: 30px;
                width: 32px;
                height: 38px;
                background: url(../../images/signIn/icon1.png) no-repeat -429px 0;
            }
        }
    }
    .btns {
        position: fixed;
        left: 8px;
        bottom: 310px;
        width: 97.5%;
        background: white;
        z-index: 3;
    }
    .btn {
        position: relative;
        display: block;
        width: 50%;
        height: 60px;
        line-height: 60px;
        margin: 15px auto;
        text-align: center;
        color: white;
        font-size: 36px;
        border-radius: 30px;
        -webkit-box-shadow: 0 5px 10px #9b927f;
        box-shadow: 0 5px 10px #9b927f;
    }
    .btn.btn-circle:after {
        content: '';
        position: absolute;
        top: -7px;
        right: 0;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: red;
    }
    .btn-success {
        background: linear-gradient(177deg, #ffb67b 50%, #ff9946 50%);
    }
    .btn-successbdk {
        background: #FFCC66
    }
    .btn-error {
        background: linear-gradient(177deg, #999 50%, #666 50%);
    }
    .refresh-btn {
        position: fixed;
        top: 50%;
        right: 15px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        z-index: 1049;
        box-shadow: 2px 4px 12px rgba(0, 0, 0, .5);
        background: white;
        i {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 50px;
            margin: -25px 0 0 -25px;
            background: white url(../../images/refresh-icon.png) center center / 50px auto no-repeat;
        }
    }
    .refresh-rotate {
        animation: refreshRotate 1s linear infinite;
    }
    .modal {
        p {
            font-size: 30px;
            color: #686868;
            text-align: center;
            padding: 20px 0;
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
    .templateImg-transition {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1200;
        transition: transform .3s linear;
        transform: scale(1);
    }
    .templateImg-enter,
    .templateImg-leave {
        transform: scale(0);
    }
}

.banner {
    height: 310px;
    position: fixed;
    bottom: 0px;
}

.banner .hd {
    bottom: 8px;
    ;
}

.planOk {
    .con {
        width: 100%;
        height: 520px;
        text-align: center;
        background: url(../../images/signIn/bg.png) center center/571px auto no-repeat;
        margin: 0 auto;
        p {
            color: rgb(255, 190, 0);
            position: absolute;
            bottom: 100px;
            left: 183px;
            font-size: 36px;
            font-family: '微软雅黑';
        }
        a {
            position: absolute;
            font-size: 25px;
            bottom: 24px;
            left: 95px;
            color: blue;
            text-decoration: underline;
            left: 95px;
            width: 67%;
            margin: 0 auto;
        }
    }
    .close {
        position: absolute;
        top: -7px;
        right: 65px;
        width: 81px;
        height: 81px;
        background: url(../../images/signIn/close.png) center center/80px auto no-repeat;
    }
}

.planOk2 {
    .con {
        background: url(../../images/signIn/bg2.png) center center/571px auto no-repeat;
        p {
            bottom: 98px;
            left: 207px;
            font-size: 24px;
        }
    }
}
</style>
