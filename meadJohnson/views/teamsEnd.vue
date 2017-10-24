<template>
    <div class="teams teams-count">
        <div>
            <personal></personal>
            <p class="time" v-if="!isSuccess"><span>组团剩余时间</span><span>{{time}}</span></p>
            <div class="con">
                <h2 v-if="isSuccess">恭喜你组团成功</h2>
                <h2 v-else>距离好礼还差<span>{{count}}</span>位妈妈</h2>
                <div>
                    <!-- <p>（以下礼品随机发送一件）</p> -->
                    <div class="gift clearfix">
                        <img :src="'images/teams-gift9.png'" style="display: block; width: 100%;" v-link="{path: '/Welfarechou/shop'}">
                        <!-- <div v-for="value in gifts[type]" track-by="$index">
                            <img :src="value.img" v-link="{path: '/Welfarechou/shop'}">
                            <p>{{{value.text}}}</p>
                        </div> -->
                    </div>
                    <div class="my-teams">
                        <p>我的妈妈团员</p>
                        <ul class="clearfix" v-if="isHasTeams">
                            <li v-for="value in groupusrlist"><img :src="value.head_img"></li>
                        </ul>
                        <ul class="clearfix" v-else>
                            <li v-else v-for="value in count" class="li"></li>
                        </ul>
                    </div>
                    <p style="padding-top: 10px;">{{text}}</p>
                </div>
            </div>
            <p v-if="!isSuccess" style="padding: 50px 0;font-size: 22px;">每位团员妈妈还能获得<span style="color: #ff9946;">100贝壳币</span>哦！</p>
            <div class="btnGroup clearfix" v-if="isSuccess">
                <btn class="btn" v-link="{path: '/myConchCoin'}">我的贝壳币</btn>
                <btn class="btn" @click="reset">重新开团</btn>
            </div>
            <span class="rule" v-if="isSuccess" v-link="{path: '/teamsRule'}">活动详情<i></i></span>
        </div>
        <div class="checkRecord" v-link="{path: '/teamsRecord'}"><img src="../images/openTeams-img1.png"><span>开团纪录</span></div>
        <find-team-des v-if="!isSuccess" :share-img="shareImg" :qr-code="qrCode"></find-team-des>
        <teams-fail :show="!isCreateS"></teams-fail>
    </div>
</template>
<script>
    import findTeamDes from '../components/teams/findTeamDes.vue'
    import teamsFail from '../components/teams/teamsFail.vue'
    import personal from '../components/teams/personal.vue'
    import btn from '../components/btn.vue'
    import api from '../api'
    import util from '../utils'

    export default {
        components: {
            findTeamDes,
            teamsFail,
            personal,
            btn
        },
        data() {
            return {
                shareImg: 'images/recommend-img4.png',
                qrCode: '',
                show: false,
                time: '00:00:00',
                timer: '',
                isSuccess: false,
                isCreateS: true,
                groupusrlist: [],
                type: '',
                count: 10,
                isHasTeams: false,
                text: '',
                gifts: {
                    "10": [
                        {
                            img: 'images/teams-gift3.png',
                            text: '益智发声骰子'
                        },
                        {
                            img: 'images/teams-gift4.png',
                            text: '全棉时代<br/>盒装手帕'
                        },
                        {
                            img: 'images/teams-gift5.png',
                            text: '儿乐宝活力<br/>音乐DJ球'
                        }
                    ],
                    "20": [
                        {
                            img: 'images/teams-gift6.png',
                            text: '充气安全澡盘<br/>鸭子造型'
                        },
                        {
                            img: 'images/teams-gift7.png',
                            text: '小龙哈皮儿童<br/>电动车(LW807)'
                        },
                        {
                            img: 'images/teams-gift8.png',
                            text: '房子走珠迷宫'
                        }
                    ]
                }
            }
        },
        created() {
            this.$dispatch('loading');
            this.getData();
        },
        methods: {
            setMessage(obj) {
                var list = obj.actinfo.list[0],
                    groupusrlist = obj.groupusrlist.list,
                    usrlist = obj.usrlist.list;

                window.localStorage.setItem('actid', list.actid);
                window.localStorage.setItem('oneOpen', '0');

                //分享组团
                this.$dispatch('shareAct', {
                    title: '',
                    sharetext: '马上就可以兑换礼品啦，麻麻们快点进来帮帮我，待会我也帮你拿。',
                    sharehref: 'teamsShare1/'+list.actid,
                    shareicon: location.href.split('#')[0] + "images/share1.jpg"
                });

                //组团规模
                this.type = list.amid;
                this.count = +list.amid;

                //二维码
                this.qrCode = list.imgurl;

                //组团状态
                switch(list.status) {
                    case '0':
                        var time = list.ctime.split(/[- :]/);
                        this.getTime(new Date(time[0], time[1]-1, time[2], time[3], time[4], time[5]));//倒计时
                        break;
                    case '1':
                        this.isSuccess = true;
                        // !!list.mobile ? this.$router.replace({path: '/teamsEnd'}) : '';
                        break;
                    case '2':
                        this.isCreateS = false;
                        break;
                }

                let num = 0;
                //头像
                if (!util.isEmptyObject(groupusrlist)) {
                    this.isHasTeams = true;
                    var count = +this.type - groupusrlist.length,
                        len = groupusrlist.length;
                    this.count = count < 0 ? 0 : count;
                    this.groupusrlist = groupusrlist;
                    this.groupusrlist.length = len > this.type ? this.type : len;
                    num = len;
                } else {
                    this.isHasTeams = false;
                }
                if (!util.isEmptyObject(usrlist)) {
                    num += usrlist.length;
                }
                this.text = '本次共有'+num+'位团员参与';
            },
            getData() {
                var actMes = window.localStorage.getItem('actMes'),
                    oneOpen = window.localStorage.getItem('oneOpen');
                actMes = actMes && window.JSON.parse(actMes);
                if (actMes && oneOpen == '1') {
                    this.$dispatch('cancelLoading');
                    this.setMessage(actMes);
                } else {
                    this.getActInfoById();
                }
            },
            getActInfoById() {
                var id = window.localStorage.getItem('actid');
                api.getActInfoById(this, {actid: id || '0'}, (back) => {
                    this.$dispatch('cancelLoading');
                    if (back && back.resCode == '0') {
                        window.localStorage.setItem('actMes', window.JSON.stringify(back.repBody));
                        this.setMessage(back.repBody);
                    } else {
                        this.$router.replace({path: '/teamsMain/0'})
                    }
                })
            },
            checkTime(time) {
                return time < 10 ? '0' + time : time;
            },
            countDown(time) {
                this.timer = setTimeout(() => {
                    var h = parseInt(time / 1000 / 60 / 60 % 24),
                        m = parseInt(time / 1000 / 60 % 60),
                        s = parseInt(time / 1000 % 60);
                    this.time = this.checkTime(h) + ':' + this.checkTime(m) + ':' + this.checkTime(s);
                    if (time < 1000) {
                        clearTimeout(this.timer);
                        this.getActInfoById();
                        return false;
                    }
                    this.countDown(time - 1000);
                },1000);
            },
            getTime(createTime) {
                var afterTime = createTime.setHours(createTime.getHours()+4),
                    time = afterTime - new Date();
                time > 0 ? this.countDown(afterTime - new Date()) : (this.time = '00:00:00',(this.getActInfoById()));
            },
            reset() {
                window.localStorage.setItem('teamsError', '1');
                this.$router.replace({path: '/teamsMain/0'});
            }
        }
    }
</script>
<style scoped>
    .checkRecord img {
        position: fixed;
        top: 283px;
        right: 30px;
        width: 50px;
        z-index: 10;
    }
    .checkRecord span {
        position: fixed;
        top: 25%;
        right: 10px;
        padding: 5px;
        border-radius: 5px;
        color: white;
        font-size: 20px;
        text-align: center;
        background: rgba(0,0,0,.5);
        animation: opacity 1.3s ease-in infinite alternate;
    }
    .checkRecord span:after {
        position: absolute;
        top: 100%;
        left: 50%;
        content: "";
        width: 0;
        height: 0;
        margin-left: -10px;
        border: 10px solid transparent;
        border-top-color: rgba(0,0,0,.5);
    }
    @keyframes opacity {
        0% {
            opacity: 1;
        }
        100% {
            opacity: .3;
        }
    }
</style>
<style lang="scss">
    .teams-count {
        color: #3da5af;
        text-align: center;
        > div:first-child {
            padding: 30px 5% 0;
            background: -webkit-linear-gradient(top, #f6fcfc, #daf2f2);
            background: -moz-linear-gradient(top, #f6fcfc, #daf2f2);
            background: linear-gradient(top, #f6fcfc, #daf2f2);
        }
        .time {
            line-height: 1.5;
            span {
                display: block;
                &:first-child {
                    font-size: 22px;
                }
                &:last-child {
                    font-size: 36px;
                    font-weight: 700;
                    color: #ff6100;
                }
            }
        }
        .con {
            border-radius: 15px;
            background: white;
            -webkit-box-shadow: 0 10px 30px rgba(61,165,175,.4);
            -moz-box-shadow: 0 10px 30px rgba(61,165,175,.4);
            box-shadow: 0 10px 30px rgba(61,165,175,.4);
            h2 {
                span {
                    font-size: 36px;
                    color: white;
                }
            }
            > div {
                border-radius: 0 0 15px 15px;
                p {
                    padding: 10px 0;
                    font-size: 22px;
                }
            }
            .gift {
                div {
                    float: left;
                    width: 33.2%;
                    min-height: 250px;
                    padding-bottom: 20px;
                    background: url(../images/fenge.png) left top no-repeat;
                    &:first-child {
                        background: none;
                    }
                }
            }
        }
        .find-team-des {
            padding-top: 30px;
            background: -webkit-linear-gradient(top, #cbedef, #c7eceb);
            background: -moz-linear-gradient(top, #cbedef, #c7eceb);
            background: linear-gradient(top, #cbedef, #c7eceb);
        }
        .btn1 {
            display: block;
            margin: 50px auto 0;
        }
        .btnGroup {
            margin: 40px 0 20px;
            .btn:first-child {
                margin-left: 40px;
                float: left;
            }
            .btn:last-child {
                margin-right: 40px;
                float: right;
            }
        }
    }
</style>