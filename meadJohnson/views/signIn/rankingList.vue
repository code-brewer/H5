<template>
    <div class="ranking-list">
        <div class="sport" @click="groupaddPvUv({type:'15'})">
            <canvas class="con" id='wcMotion'></canvas>
            <div class="mes1">
                <div>
                    <p>第{{personalInfo.daynum}}天</p>
                    <p>连续打卡天数</p>
                </div>
                <div>
                    <p style="height: 31px;">{{personalInfo.ctime}}</p>
                    <p>今日打卡时间</p>
                </div>
                <div>
                    <p>第{{personalInfo.rn}}名</p>
                    <p>好友排名</p>
                </div>
            </div>
            <div class="mes2">
                <p><span>{{percent}}</span><i></i></p>
                <p>击败平台用户</p>
            </div>
            <p class="text">晨起打卡时间
                <br/>一起成为更好的自己！</p>
            <span class="on-off" :class="isWeek ? 'on' : 'off'" @click="isWeek = !isWeek"><span class="text"></span>
            <label><i class="line"></i></label>
            </span>
        </div>
        <div class="mes clearfix">
            <div class="head">
                <!-- <span></span> -->
                <img :src="headurl">
            </div>
            <div class="con">
                <p>{{personalInfo.nick}}</p>
                <p>贝壳币：{{v_score}}<a href="#!/presentList" @click="groupaddPvUv({type:'20'})">礼品兑换</a></p>
            </div>
            <div class="nowScore">
                <p>今日贝壳币</p>
                <p>{{personalInfo.score}}</p>
            </div>
        </div>
        <!-- <div style="padding: 10px 30px;">
            <p class="plan-sum">已有<span>{{num}}</span>位用户参与打卡计划</p>
        </div> -->
        <div class="head-list" v-else>
            <p class="plan-sum">已有<span>{{num}}</span>位用户参与打卡计划</p>
            <div>
                <ul class="clearfix">
                    <li v-for="item in headUrls">
                        <img :src="item.headurl">
                </ul>
                <a href="javascript:;" v-show="!!headUrls.length">&middot;&middot;&middot;</a>
            </div>
        </div>
        <div class="list">
            <div class="tab clearfix" :class="{fixedTab: fixedTab}">
                <div :class="{active: active}" @click="PvUvTime({type:'21'}), active = true">好友排名</div>
                <div :class="{active: !active}" @click="PvUvTime({type:'22'}), active = false">总排名</div>
            </div>
            <div class="load2" v-show="isLoad">
                <load2 :show.sync="isLoad"></load2>
            </div>
            <div v-if = "active == true">
            <ul>
                <li v-for="item in friendGradeList" :class="[['first', 'second', 'third'][active ? $index : personalInfo.ctime ? $index - 1 : $index]]" :style="{background: !active && personalInfo.ctime && !$index && '#eee' || 'none'}">
                    <img :src="item.headurl">
                    <i>{{item.rn}}</i>
                    <span>{{item.nick}}</span>
                    <span>{{item.ctime}}</span>
                </li>
            </ul>
            <p v-show="isMore" @click="moreLoad" style="text-align: center; color: #666; line-height: 70px; font-size: 26px;">{{moreText}}</p>
            </div>
            <div v-if = "active == false">
            <ul>
                <li v-for="item in allGradeList" :class="[['first', 'second', 'third'][active ? $index : personalInfo.ctime ? $index - 1 : $index]]" :style="{background: !active && personalInfo.ctime && !$index && '#eee' || 'none'}">
                    <img :src="item.headurl">
                    <i>{{item.rn}}</i>
                    <span>{{item.nick}}</span>
                    <span>{{item.ctime}}</span>
                </li>
            </ul>
            <p v-show="isMore" @click="moreLoad" style="text-align: center; color: #666; line-height: 70px; font-size: 26px;">{{moreText}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import '../../dist/wc-motion-chart.js'
import api from '../../api/index1.js'
import load2 from '../../components/load/load2.vue'
export default {
    components: {
        load2
    },
    data() {
        return {
            active: true,
            fixedTab: false,
            personalInfo: {}, //个人信息
            num: '', //参与打卡人数
            isMore: false, //查看更多
            isLoad: false,
            moreText: '查看更多', //更多加载的文本信息
            friendGradeList: [], //好友排名列表
            allGradeList: [], //总排名列表
            list: [], //展示在页面的排名列表--根据tab分类切换内容
            friendGradePage: { //好友排名列表分页参数
                pageSize: 20,
                pageNum: 1,
                totalPage: 1,
                total: 1,
                load: true
            },
            allGradePage: { //总排名列表分页参数
                pageSize: 20,
                pageNum: 1,
                totalPage: 1,
                total: 1,
                load: true
            },
            v_score: '', //总贝壳币
            percent: '', //击败的百分比
            ownList: '', //用户个人打卡信息
            isWeek: true,
            headurl: '', //个人头像
            stayStartTime: new Date(), //停留时长的开始时间
            headUrls: [] //前11位头像
        }
    },
    created() {
        this.getPersonalInfo();
        this.getCardCount();
        this.getFriendGradeList();
        this.getUserRecordList();
        this.getAllOwnGradeInfo();
        this.getHeadurl();
        this.getAllGradeList();
        this.groupaddPvUv({type:'24'})
    },
    ready() {
        window.onscroll = this.scroll;
    },
    beforeDestroy() {
        window.onscroll = null;
    },
    watch: {
        // active(val) {
        //     val ? this.getFriendGradeList() : this.getAllGradeList();
        // },
        isWeek(val) {
            this.initEcharts();
        }
    },
    computed: {
        rnShow() {
            if (!this.active && this.personalInfo.ctime) {
                return true;
            }
            return false;
        }
    },
    methods: {
        /**
         * 派发数据统计事件
         */
        groupaddPvUv(options) {
            this.$dispatch('statistics', options);
        },
        // sendStatistics(options) {
        //     this.$dispatch('statistics', options);
        // },
        /**
         * 派发好友排名和总排名停留时长
         */
         PvUvTime(options) {
            let now = new Date();
            options.times = Math.ceil((now - this.stayStartTime) / 1000);
            this.stayStartTime = now;
            this.$dispatch('statistics', options);
        },
        // sendStayTime(options) {
        //     let now = new Date();
        //     //不足一分钟按一分钟计算
        //     options.stayTime = Math.ceil((now - this.stayStartTime) / 1000);
        //     this.stayStartTime = now;
        //     this.$dispatch('statistics', options);
        // },
        /**
         * 滚动时排名标题置顶
         */
        scroll() {
            var top = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                clientH = Math.max(document.documentElement.clientHeight, document.body.clientHeight),
                scrollH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            if (top >= 534) {
                this.fixedTab = true;
            } else {
                this.fixedTab = false;
            }
            // if (top + clientH + 20 >= scrollH) {
            //     this.isMore = true;
            // }
        },
        /**
         * 获取最新参与打卡计划的前11位头像
         */
        getHeadurl() {
            api.getHeadurl(this, {}, back => {
                if (back.resCode === '0') {
                    this.headUrls = back.repBody.list || [];
                }
            })
        },
        /**
         * 获取用户个人信息
         */
        getPersonalInfo() {
            api.getPersonalInfo(this, {}, back => {
                if (back.resCode === '0') {
                    this.v_score = back.repBody.list[0].v_score;
                    this.headurl = back.repBody.list[0].head_img;
                }
            });
            api.ownGradeInfo(this, {}, back => {
                if (back.resCode === '0') {
                    let list = back.repBody.list;
                    list = list ? list[0] : {};
                    this.personalInfo = list;
                    if (!this.personalInfo.ctime) {
                        this.percent = '0%';
                        this.personalInfo.score = '0';
                        this.personalInfo.rn = '0';
                    }
                }
            })
        },
        /**
         * 获取用户打卡信息
         */
        getUserRecordList() {
            api.userRecordList(this, {}, back => {
                if (back.resCode === '0') {
                    let list = back.repBody.list;
                    this.ownList = list || {};
                    this.initEcharts();
                }
            })
        },
        /**
         * 获取打卡活动的参与人数
         */
        getCardCount() {
            api.getCardCount(this, {}, back => {
                if (back.resCode === '0' && back.repBody.list) {
                    this.num = +back.repBody.list[0].num;
                }
            })
        },
        /**
         * 加载更多逻辑代码
         *
         */
        moreLoad() {
            this.active ? this.getFriendGradeList() : this.getAllGradeList();
        },
        setPage(key, total) {
            let obj = this[key];
            obj.totalPage = Math.ceil(total / obj.pageSize);
            obj.pageNum++;
            this.isMore = true;
            if (obj.pageNum > obj.totalPage) {
                obj.load = false;
                this.moreText = '没有更多数据了';
            } else {
                obj.load = true;
                this.moreText = '查看更多';
            }
        },
        /**
         * 获取打卡好友列表
         */
        getFriendGradeList() {
            // if (this.friendGradePage.pageNum === 1) {
            //     this.isLoad = true;
            // }
            if (!this.friendGradePage.load) {
                this.moreText = '没有更多数据了';
                // this.list = this.friendGradeList;
                return;
            }
            api.getFriendGradeList(this, this.friendGradePage, back => {
                this.isLoad = false;
                if (back.resCode === '0' && back.repBody.list) {
                    if (back.repBody.list) {
                        this.friendGradeList = this.friendGradeList.concat(back.repBody.list);
                        // this.list = this.friendGradeList;

                        // 设置分页参数
                        this.setPage('friendGradePage', back.repBody.total);

                        // 加载更多
                        // this.more(0, this.friendGradePage);
                    } else {
                        if (this.friendGradePage.pageNum === 1 && !back.repBody.total) {
                            // this.list = this.friendGradeList;
                            this.isMore = true;
                            this.moreText = '暂无排名';
                        }
                    }
                }
            })
        },
        /**
         * 获取打卡总列表
         */
        getAllGradeList() {
            // if (this.friendGradePage.pageNum === 1) {
            //     this.isLoad = true;
            // }
            if (!this.allGradePage.load) {
                this.moreText = '没有更多数据了';
                // this.list = this.allGradeList;
                return;
            }
            api.getAllGradeList(this, this.allGradePage, back => {
                this.isLoad = false;
                if (back.resCode === '0' && back.repBody.list) {
                    if (back.repBody.list) {
                        var obj = {},
                            arr = [],
                            list = back.repBody.list,
                            len = list.length;
                        for (let i = 0; i < len; i++) {
                            if (!obj[list[i].headurl]) {
                                arr.push(list[i]);
                                obj[list[i].headurl] = 1;
                            }
                        }
                        this.allGradeList = this.allGradeList.concat(arr);
                        // this.list = this.allGradeList;

                        // 设置分页参数
                        this.setPage('allGradePage', back.repBody.total);

                        // 加载更多
                        // this.more(0, this.allGradePage);
                    } else {
                        if (this.allGradePage.pageNum === 1 && !back.repBody.total) {
                            // this.list = this.allGradeList;
                            this.isMore = true;
                            this.moreText = '暂无排名';
                        }
                    }
                }
            })
        },
        /**
         * 获取总排名自己的排名
         */
        getAllOwnGradeInfo() {
            api.getAllOwnGradeInfo(this, {}, back => {
                if (back.resCode === '0' && back.repBody.list) {
                    if (back.repBody.list) {
                        this.allGradeList.unshift(back.repBody.list[0]);
                        let list = back.repBody.list;
                        list = list ? list[0] : {};
                        if (list.ctime) {
                            var time = list.ctime.split(/[- :]/),
                                lower = new Date('2016', '11', '1', '5', '0', '0'),
                                ctime = new Date('2016', '11', '1', time[0], time[1], time[2]),
                                index = Math.ceil((ctime - lower) / 1000 / 60 / 60);
                            this.percent = ['98%', '97%', '92%', '89%', '78%'][index == 0 ? 0 : index - 1];

                            this.percent = this.percent || '0%';
                            if (list.rn === '1') {
                                this.percent = '100%';
                            }
                        } else {
                            this.percent = '0%';
                        }
                    }
                }
            })
        },
        /**
         * 初始化打卡折线图
         */
        initEcharts() {
            let len = this.ownList[0].ctime ? this.ownList.length : 0,
                acttime = len > 0 ? this.ownList[0].acttime.split(/[- :]/) : '',
                actday = '';
            if (acttime) {
                actday = new Date(acttime[0], (+acttime[1] - 1), acttime[2], '07', '0', '0');
            } else {
                actday = new Date();
            }

            let num = this.isWeek ? 7 : 21,
                arr = [],
                sign = [],
                ownList = [];
            if (this.isWeek) {
                var now = new Date(),
                    date = Math.floor((now.getTime() - actday.getTime()) / 1000 / 60 / 60 / 24 - 6);
                if (date > 0) {
                    actday.setDate(actday.getDate() + date);
                }
            }
            let day = actday.getTime();
            this.ownList.forEach((item, index) => {
                var time = item.ctime.split(/[- :]/),
                    date = new Date(time[0], (+time[1] - 1), time[2], time[3], time[4], time[5]);
                if (date.getTime() > day) {
                    ownList.push(item);
                }
            })
            len = ownList.length;
            let l = len;
            for (var i = 0; i < num; i++) {
                if (l > 0) {
                    var time = ownList[len - l].ctime.split(/[- :]/),
                        date = new Date(time[0], (+time[1] - 1), time[2], time[3], time[4], time[5]),
                        datehour = time[3],
                        time2 = '10' + ':' + '00' + ':' + '00';
                     
                        //该日期有打卡，记录数据
                    if (date.getDate() === actday.getDate()) {
                        if (datehour >= 5 && datehour < 10) {
                            sign.push(date.toTimeString().split(' ')[0]);
                        
                            arr.push((Math.round((date - actday) / 1000 + 10000)));
                           
                            l--;
                            actday.setDate(actday.getDate() + 1);
                            continue;
                        } 
                        else if (datehour >= 10 && datehour < 24) {
                            sign.push(date.toTimeString().split(' ')[0]);
                     
                            arr.push(20800);
                            
                            l--;
                            actday.setDate(actday.getDate() + 1);
                            continue;
                        }
                        
                        // sign.push(date.toTimeString().split(' ')[0]);
                        //     arr.push((Math.round((date - actday) / 1000 + 10000)));
                        //     l--;
                        //     actday.setDate(actday.getDate() + 1);
                        //     continue;
                    }

                }
             
                sign.push('');
                arr.push('');
                actday.setDate(actday.getDate() + 1);
            }
            window.setTimeout(function() {

                $('#wcMotion').wcChart({
                    fill: {
                        gradient: [
                            ["#21B881", .1],
                            ["#0E8FA2", .9]
                        ],
                        gradientAngle: Math.PI * -45 / 180
                    },
                    width: 640,
                    height: 320, // width and height must be set if change
                    day: new Date(day),
                    data: arr,
                    sign: sign,
                    quadRadius: 0
                });

            }, 0);
        }
    }
}
</script>
<style lang="scss" scoped>
.ranking-list {
    .sport {
        position: relative;
        .con {
            width: 100%;
            height: 320px;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        p {
            text-align: center;
            color: white;
            font-size: 26px;
            opacity: .8;
            &:last-child {
                font-size: 20px;
            }
        }
        .mes1 {
            position: absolute;
            top: 0;
            left: 10px;
            height: 100%;
            width: 120px;
            div {
                position: absolute;
                left: 0;
                width: 100%;
                &:nth-child(1) {
                    top: 40px;
                }
                &:nth-child(2) {
                    top: 50%;
                    transform: translate(0, -50%);
                }
                &:nth-child(3) {
                    bottom: 40px;
                }
            }
        }
        .mes2 {
            position: absolute;
            bottom: 40px;
            right: 10px;
            line-height: 1.5;
            p {
                position: relative;
            }
            i {
                position: absolute;
                top: 50%;
                left: 70%;
                width: 19px;
                height: 37px;
                margin-top: -22px;
                background: url(../../images/rankingListIcon.png) no-repeat;
            }
        }
        > .text {
            position: absolute;
            top: 10px;
            left: 45%;
            font-size: 20px;
            color: white;
            opacity: .6;
            width: 200px;
            text-align: center;
        }
        .on-off {
            position: absolute;
            top: 20px;
            left: 150px;
            width: 90px;
            height: 30px;
            border-radius: 15px;
            background: linear-gradient(top, #666 10%, #999, #666 90%);
            &.off {
                .text:after {
                    content: "月";
                    right: 24px;
                }
                label {
                    left: 1px;
                }
            }
            &.on {
                .text:after {
                    content: "周";
                    left: 24px;
                }
                label {
                    right: 1px;
                }
            }
            .text {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                &:after {
                    position: absolute;
                    top: 0;
                    font-size: 24px;
                    line-height: 30px;
                    color: white;
                    opacity: .8;
                    font-weight: 700;
                }
            }
            label {
                position: absolute;
                top: 1px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                transition: all .3s linear;
                background: linear-gradient(top, #fdfdfd, #ddd);
                .line {
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    width: 1px;
                    height: 16px;
                    background: #dedede;
                    &:before,
                    &:after {
                        content: '';
                        position: absolute;
                        top: 0;
                        width: 1px;
                        height: 16px;
                        background: #dedede;
                    }
                    &:before {
                        left: -5px;
                    }
                    &:after {
                        right: -5px;
                    }
                }
            }
        }
    }
    .head-list {
        position: relative;
        padding: 10px 20px;
        border-bottom: 1px solid #e1e1e1;
        background: white;
        top: 0px;
        div {
            position: relative;
            padding-right: 50px;
        }
        li {
            img {
                float: left;
                width: 40px;
                height: 40px;
                margin-right: 10px;
                border-radius: 50%;
                background: #f2f2f2;
            }
        }
        a {
            position: absolute;
            top: 50%;
            right: 10px;
            margin-top: -15px;
            font-size: 26px;
        }
    }
    .mes {
        position: relative;
        padding: 30px 100px 30px 140px;
        font-size: 26px;
        color: #686868;
        border-bottom: 1px solid #e1e1e1;
        .head {
            position: absolute;
            top: 50%;
            left: 30px;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            transform: translate(0, -50%);
            img {
                display: block;
                width: 85px;
                height: 85px;
                border-radius: 50%;
                background: #eee;
            }
        }
        .con {
            p {
                line-height: 1.5;
            }
            a {
                position: relative;
                margin-left: 50px;
                color: #fd4f48;
                border-bottom: 1px solid #fd4f48;
                font-size: inherit;
                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -28px;
                    width: 26px;
                    height: 26px;
                    margin-top: -15px;
                    background: url(../../images/signIn/icon2.png) no-repeat -93px 0;
                }
            }
        }
        .nowScore {
            position: absolute;
            top: 50%;
            right: 20px;
            width: 150px;
            text-align: center;
            transform: translate(0, -50%);
            p {
                &:first-child {
                    font-size: 30px;
                }
                &:last-child {
                    color: #fd4f48;
                    font-weight: 700;
                    font-size: 36px;
                }
            }
        }
    }
    .list {
        border-top: 1px solid #e1e1e1;
        .tab {
            &.fixedTab {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1000;
            }
            div {
                float: left;
                width: 50%;
                line-height: 60px;
                text-align: center;
                color: #333;
                font-size: 26px;
                border-bottom: 1px solid white;
                box-sizing: border-box;
                background: white;
                &:first-child {
                    border-right: 1px solid #e1e1e1;
                }
                &.active {
                    color: white;
                    border-bottom: 1px solid #e1e1e1;
                    background: #7ac7cf;
                }
            }
        }
        ul {
            li {
                position: relative;
                padding: 20px 150px 20px 110px;
                border-bottom: 1px dashed #e1e1e1;
                &.first,
                &.second,
                &.third {
                    &:before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 45px;
                        width: 31px;
                        height: 43px;
                        margin-top: -22.5px;
                        z-index: 2;
                        background: url(../../images/signIn/icon2.png) no-repeat;
                    }
                }
                &.first:before {
                    background-position: 0 0;
                }
                &.second:before {
                    background-position: -31px 0;
                }
                &.third:before {
                    background-position: -62px 0;
                }
                img {
                    display: inline-block;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: #eee;
                }
                i {
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    width: 80px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    margin-top: -20px;
                    font-size: 26px;
                }
                span {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 70px;
                    &:nth-child(3) {
                        width: 80%;
                        padding-left: 20px;
                        font-size: 28px;
                        color: #7ac7cf;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        box-sizing: border-box;
                    }
                    &:last-child {
                        position: absolute;
                        top: 50%;
                        right: 50px;
                        margin-top: -35px;
                        font-size: 22px;
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>
