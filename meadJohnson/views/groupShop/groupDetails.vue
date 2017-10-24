<template>
    <div class="group_details">
        <div class="head lists" v-if="!isGroup">
            <div style="overflow: auto;background: #F4CE5D;border-radius: 10px;">
                <img :src="grouplist.imagerUrl">
                <span>
                <p class="p2">{{grouplist.orName}}</p>
                <p style=" color: red;">团购价：{{grouplist.price}}元</p>
                <p style=" color: red;">实付：{{grouplist.price}}元</p>
                <!-- <a @click="getrefund(grouplist)" class="refund">查看退款详情</a> -->
                <a class="group">{{isSucceed = 1 ? '组团失败':'组团成功'}}</a>
                </span>
            </div>
            <div class="con">
                <p class="p1">组团详情</p>
                <div class="friend">
                    <ul class="clearfix">
                        <li v-for="item in headUrls">
                            <img :src="item.headImg">
                        </li>
                    </ul>
                </div>
                <div class="detail" style="height: 340px;">
                    <ul>
                        <li v-for="item in headUrls"><img :src="item.headImg">
                            <p>{{item.nick}}</p>
                            <p>{{item.orderTime}}</p>
                            <p>参团</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="head lists" v-else>
            <div style="overflow: auto;background: #F4CE5D;border-radius: 10px;">
                <img :src="grouplist.imagerUrl">
                <span>
                    <p class="p2"> {{grouplist.orName}}</p>
                    <p style=" color: red;line-height: 80px;">团购价：{{grouplist.price}}元</p>
                </span>
            </div>
            <div class="con">
                <div class="detail">
                    <ul>
                        <li>
                            <img :src="headUrl.headImg">
                            <p>{{headUrl.nick}}</p>
                            <p>{{headUrl.orderTime}}</p>
                            <p>开团</p>
                        </li>
                    </ul>
                </div>
                <div class="friend">
                    <ul class="clearfix">
                        <li v-for="item in headUrls">
                            <img :src="item.headImg">
                        </li>
                    </ul>
                    <p>还差{{grouplist.totalNumber - grouplist.number}} 人，就可以享受团购优惠啦！</p>
                    <p>拼团时间还有{{time}}</p>
                    <div style="width: 604px; margin: 0 auto;">
                        <a class="btn" v-link="{path:'/groupQRCode/'+ grouplist.id}" v-show="ismember">邀请好友来参团</a>
                        <a class="btn" @click="groupJoinActivity()" v-show="!ismember">参加组团</a>
                    </div>
                </div>
                <p class="p1">组团详情</p>
                <div class="detail" style="height: 300px;">
                    <ul>
                        <li v-for="item in headUrls"><img :src="item.headImg">
                            <p>{{item.nick}}</p>
                            <p>{{item.orderTime}}</p>
                            <p>参团</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--    <div class="share-open" v-show="isShare" @click="isShare=false">
            <img :src="'images/teams-img1.png'" alt="">
            <p>团购好礼，献给最美的妈妈们。
                <br/>分享给你的好友吧！
            </p>
        </div> -->
        <!-- 温馨提示弹窗 -->
        <snackbar :show-snack-bar.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import DateUtils from '../../utils/DateUtils.js'
import snackbar from '../../components/snackbar.vue'
export default {
    components: {
        snackbar
    },
    data() {
        return {
            ismember: false, //是否是团员
            isSucceed: '', //是否成功组团
            isGroup: true, //是否组团进行中
            headUrls: {}, //头像列表
            headUrl: [], //团长头像
            time: '00:00:00', //倒计时
            timer: '',
            grouplist: '', //组团数据
            groupOrderId: '',
            show: false, //提示弹窗
            text: '', //提示文字
            coin: '',
            price: '',
            isShare: false,
        }
    },
    created() {
        document.title = '团购详情';
        this.detailGroupActivity();
        // this.groupJoinActivity();
        // this.setlist();
    },
    ready() {
        document.title = '订单详情';

    },
    methods: {
        /*
        倒计时
        */
        setlist() {
            var ctime = DateUtils.formatDate(new Date(this.grouplist.createTime), 'yyyy-MM-dd HH:mm:ss');
            var time = ctime.split(/[- :]/);
            this.getTime(new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
            // this.detailGroupActivity();
        },
        /*
        倒计时
        */
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
                    return false;
                }
                this.countDown(time - 1000);
            }, 1000);
        },
        getTime(createTime) {
            var afterTime = createTime.setHours(createTime.getHours() + 4),
                time = afterTime - new Date();
            // console.log(time)
            // time > 0 ? this.countDown(afterTime - new Date()) : (this.time = '00:00:00', this.isGroup = false, (this.detailGroupActivity()));
            time > 0 ? this.countDown(afterTime - new Date()) : (this.time = '00:00:00', this.isGroup = false, this.isSucceed = 0);
        },
        /*
        参加组团
        */
        groupJoinActivity() {
            api.groupJoinActivity(this, {
                groupId: this.$route.params.id
            }, back => {
                    this.$router.go({path: '/groupMain/groupOrder/' + back.groupOrderId});
            })
        },
        /*
        拼团详情
        */
        detailGroupActivity() {
            api.detailGroupActivity(this, {
                groupId: this.$route.params.id
            }, back => {
                if (back.success == '1') {
                    if (back.object.groupUser != '') {
                        back.object.groupUser.forEach(value => {
                            value.orderTime = DateUtils.formatDate(new Date(value.orderTime), 'yyyy-MM-dd HH:mm:ss');
                        });
                        this.headUrls = back.object.groupUser;
                        this.headUrl = this.headUrls[0];
                    }
                    this.grouplist = back.object.groupInfo;
                    if (!this.grouplist.number) {
                        this.grouplist.number = 0;
                    }
                    this.grouplist.coin = this.grouplist.money.split(',')[1];
                    this.grouplist.price = this.grouplist.money.split(',')[0];
                    console.log(back.object.groupInfo);
                    if (back.object.groupInfo.number < back.object.groupInfo.totalNumber) {
                        this.isGroup = true;
                    }
                    if (back.object.groupInfo.number == back.object.groupInfo.totalNumber) {
                        this.isGroup = false;
                        this.isSucceed = 1;
                    } else {
                        this.isSucceed = 0;
                    }
                    if (back.object.isAlready == 1) {
                        this.ismember = true;
                    } else {
                        this.ismember = false;
                    }
                    this.setlist()
                } else {
                    this.show = true;
                    this.text = back.remark
                };
                console.log(this.isSucceed)
                this.getSign();
            })
        },
        /*
        查看退款详情
        */
        // getrefund(grouplist) {
        //     console.log(grouplist)
        //     this.$router.go({
        //         path: '/grouprefund/' + grouplist.id
        //     });
        // },
        /**
         * 分享 
         * @return {[type]} [description]
         */
        getSign() {
            this.$dispatch('updateShare', {
                title: '【还差' + (this.grouplist.totalNumber - this.grouplist.number) + '人】 我参加了花呗妈妈' + this.grouplist.totalNumber + '人团————' + this.grouplist.orName,
                sharehref: 'groupDetails/' + this.$route.params.id,
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.group_details {
    overflow: hidden;
    width: 100%;
    font-family: '\9ED1\4F53';
    font-size: 30px;
    background: #FEF4C8;
}

.Left {
    float: left;
}

.btn {
    position: relative;
    display: block;
    width: 280px;
    height: 72px;
    line-height: 72px;
    margin: 0px auto;
    text-align: center;
    color: white;
    font-size: 30px;
    border-radius: 7px;
    box-shadow: 0 5px 10px #9b927f;
    background: #FD272A;
}

.head {
    // background: #F4CE5D;
    // border-radius: 10px;
    width: 604px;
    // margin: 30px auto 0px;
    // height: 200px;
    // box-shadow: 0px 2px 5px #888888;
}

.con {
    background: #fff;
    border-radius: 10px;
    width: 604px;
    margin: 30px auto;
    box-shadow: 0px 2px 5px #888888;
    padding-bottom: 90px;
    height: 610px;
    overflow-y: auto;
}

.p1 {
    padding: 15px;
    color: #7D7D7D;
}

.lists {
    margin: 0 auto;
    // text-align: center;
    margin-top: 10px;
    overflow: hidden;
    img {
        // float: left;
        padding: 10px;
        border-radius: 15px;
        width: 280px;
        height: 280px;
    }
    span {
        background: #fff;
        width: 48%;
        float: right;
        margin: 10px 10px 0px 0px;
        height: 280px;
        border-radius: 5px;
    }
    p {
        font-size: 26px;
        font-family: 黑体;
        margin: 10px;
        // line-height: 40px;
    }
    a {
        border-radius: 25px;
        // padding: 8px 10px 8px 10px;
        // margin: 0px 5px;
    }
}

.p2 {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.refund {
    color: #000;
    background: #FFFC00;
    border: 1px solid #FFFC00;
    padding: 10px;
    margin: 0px 10px;
}

.group {
    color: #fff;
    background: #FD5C34;
    border: 1px solid #FD5C34;
    padding: 10px;
}

.detail {
    overflow-y: auto;
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    ul {
        margin: 0 auto;
        width: 560px;
        margin: 0px auto;
    }
    li {
        width: 560px;
        display: -webkit-inline-box;
        padding: 20px 0px 30px 10px;
        line-height: 80px;
        color: #7C7C7C;
        font-size: 24px;
        border-bottom: 1px solid #7C7C7C;
        height: 80px;
    }
    p {
        color: #7C7C7C;
        margin: 0px 10px;
        line-height: 100px;
    }
}

.friend {
    text-align: center;
    ul {
        margin: 20px auto;
        width: 420px;
    }
    p {
        color: #7C7C7C;
        font-size: 24px;
    }
    li {
        img {
            float: left;
            width: 60px;
            height: 60px;
            margin: 10px;
            border-radius: 50%;
            // background: #f2f2f2;
            border: 5px #399BCB solid;
            padding: 0px;
        }
    }
}

.share-open {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    z-index: 10;
    p {
        padding: 0 20px;
        color: white;
        font-size: 36px;
    }
}
</style>
