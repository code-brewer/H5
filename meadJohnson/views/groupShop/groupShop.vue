<template>
    <div class="group_shop">
        <div id="banners" class="banner" style=" top: 0px;">
            <div class="hd" style=" top: 290px;">
                <ul>
                    <li class="on">&nbsp;</li>
                </ul>
            </div>
            <div class="bd"  @click="groupaddPvUv({tab: 'banner1',type:'6'}, $event, 'banner')">
                <ul>
                    <li >
                        <a :href="banner1Url">
                            <img :id="id1" :src="banner1">
                        </a>
                    </li>
                    <li >
                        <a :href="banner2Url">
                            <img :id="id2" :src="banner2">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab clearfix" :class="{fixed: fixed}">
            <div :class="{active: active===0}" @click="PvUvTime({type: '3',tab:'0'}), active = 0 ,getfindPage()">优惠购</div>
            <div :class="{active: active===1}" @click="PvUvTime({type: '3',tab:'1'}), active = 1,getfindPage()" style="    border-left: 1px dashed #fff;">10人团</div>
            <div :class="{active: active===2}" @click="PvUvTime({type: '3',tab:'2'}), active = 2,getfindPage()" style="    border-left: 1px dashed #fff;">20人团</div>
            <div :class="{active: active===3}" @click="PvUvTime({type: '3',tab:'3'}), active = 3,getfindPage()" style="    border-left: 1px dashed #fff;">30人团</div>
            <div class="touxiang"><img :src="headurl" v-link="{path: '/groupMain/groupAccount'}">
            </div>
        </div>
        <div class="lists">
            <div class="goods_head" v-show="lists.length">
                <h1>本周爆品</h1></div>
            <div class="goods" v-for="list in lists">
                <img :src="list.pictrue_url" @click="groupShopDetails(list),groupaddPvUv({type: '4',activityId:list.id})">
                <span>
                        <span v-if="active===0" @click="groupShopDetails(list),groupaddPvUv({type: '4',activityId:list.id})" style="margin: 0px;height: 180px;">
                            <p class="p1">{{list.title}}</p>
                            <p v-if="list.coin != 0" style=" color: red;text-align: left;">
                            <img :src="'images/groupShop/hmtj.png'" style="margin: -9px 0px;height: auto;width: 30px;">花妈价：{{list.coin}}贝壳币</br><span style="    width: 50px;float: none;margin: 0px 86px; height: 30px;"> +{{list.price}}元</span></p>
                <p v-else style=" color: red;text-align: left;">
                    <img :src="'images/groupShop/hmtj.png'" style="margin: -9px 0px;height: auto;width: 30px;">花妈价：{{list.price}}元</p>
                <p style=" color: #7E7E7E;padding-right: 111px;">市场参考价：{{list.original_price}}元</p>
                </span>
                <span v-else @click="groupShopDetails(list)" style="margin: 0px; height:180px;">
                            <p class="p1">{{list.title}}</p>
                            <p style=" color: red;"><!-- <img :src="'images/groupShop/hmtj.png'" style="    position: absolute;margin: -9px -45px;height: auto;    width: 30px;"> -->团购价：{{list.price}}元</p>
                            <p style=" color: #7E7E7E;padding-right: 52px;">市场参考价：{{list.original_price}}元</p>
                        </span>
                <span style="margin: 0px;height: 60px;" v-if="active===0">
                        <img :src="'images/groupShop/djgm.png'" style="float: none;width: 130px;height: auto;" @click = "getgroupCreate(list),groupaddPvUv({type: '5',activityId:list.id})" >
                        </span>
                <span style="margin: 0px;height: 60px;" v-else> 
                        <img :src="'images/groupShop/btn_group.png'" style="float: none;width: 130px;height: auto;" @click = "getgroupCreate(list),groupaddPvUv({type: '5',activityId:list.id})" >
                        </span>
                </span>
            </div>
            <div v-show="!lists.length" style="text-align: center;font-size: 36px;">暂无数据</div>
        </div>
        <!-- 温馨提示弹窗 -->
        <snackbar :show-snack-bar.sync="show" :text="text"></snackbar>
        <!--  弹窗 -->
        <modal :show.sync="detailsShow">
            <div class="shopDetailShow">
                <ul>
                    <li>
                        <div class="detail">
                            <img :src="pictrue_url">
                            <span>
                            <p class = "p2">{{title}}</p>
                        </span>
                        </div>
                    </li>
                    <li>
                        <div class="group_rule_detail">
                            {{{description}}}
                        </div>
                    </li>
                </ul>
                <a href="javascript:;" class="showclose" @click="ShowClose()"></a>
            </div>
        </modal>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import modal from '../../components/Modal.vue'
import snackbar from '../../components/snackbar.vue'
import DateUtils from '../../utils/DateUtils.js'
import {
    TouchSlide
} from '../../dist/TouchSlide.1.1.js'
export default {
    components: {
        modal,
        snackbar
    },
    data() {
        return {
            active: 0, //tab切换
            personalInfo: {}, //个人信息
            headurl: '', //个人头像
            name: '',
            fixed: false, //计划和规则tab置顶
            lists: [], //礼品列表
            detailsShow: false, //详情弹窗
            pictrue_url: '', //商品图片
            description: '', //商品描述
            title: '',
            options: {
                current: 1, // (当前页数)
                title: "", // (null不搜索， 模糊搜索标题)
                type: '1', //(null-所有  0-1人团   1-10人团  2-20人团   3-30人团')
                beginDate: '', //活动开始时间
                endDate: '', //活动结束时间
                tab: '2' //1未开始、2进行中、3已结束
            },
            grouplist: {
                activityId: '', //活动编号
                beginTime: '', //开始时间
                endTime: '' //结束时间
            },
            show: false, //提示弹窗
            text: '', //提示文字
            openlist: {},
            stayStartTime: new Date(), //停留时长开始时间
        }
    },
    created() {
        this.getfindPage();
        this.bannerlist();
        // this.$dispatch('loading');
        document.title = '团购';
    },
    ready() {
        window.onscroll = this.scroll;
        //banner
        TouchSlide({
            slideCell: "#banners",
            titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell: ".bd ul",
            effect: "leftLoop",
            autoPlay: true, //自动播放
            autoPage: true, //自动分页
            delayTime: 200,
            interTime: 3500,
        });
        this.headurl = window.localStorage.getItem('head_img');
        api.grouppvuv(this, {type: '1'}, (back) => {});
    },
    beforeDestroy() {
        window.onscroll = null;
    },
    methods: {
        /**
         * 团购活动数据统计事件
         */
         groupaddPvUv(options, event, trigerName) {
            if ('banner' == trigerName) {
                options.tab = event.target.id;
            }
             console.log(options)
            this.$dispatch('statistics', options);
        },
        //  groupaddPvUv(options) {
        //      console.log(options)
        //     this.$dispatch('statistics', options);
        // },
        /**
         * 停留时长
         */
          PvUvTime(options) {
            let now = new Date();
            options.times = Math.ceil((now - this.stayStartTime) / 1000);
            this.stayStartTime = now;
            this.$dispatch('statistics', options);
        },
        scroll() {
            var top = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            if (top >= 310) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        },
        /**
         * banner
         */
        bannerlist() {
            var now = new Date().getDate()
            this.banner1Url = '#!/tips'
            this.banner1 = 'images/signIn/banner/banner19.png'
            this.id1 = 'banner'
            this.banner2Url = '#!/recommend1'
            this.banner2 = 'images/signIn/banner/banner31.png'
            this.id2 = 'banner1'
        },
        /**
         *商品详情
         */
        groupShopDetails(list) {
            console.log(list)
            this.pictrue_url = list.pictrue_url;
            this.title = list.title;
            this.description = list.description;
            this.detailsShow = true;
        },
        /**
         *关闭弹窗
         */
        ShowClose() {
            this.detailsShow = false;
        },
        /**
         *获取活动列表
         */
        getfindPage() {
            this.options.type = this.active;
            api.findPageActivity(this, this.options, back => {
                back.list.forEach(value => {
                    value.coin = value.group_price.split(',')[1];
                    value.price = value.group_price.split(',')[0];
                })
                this.lists = back.list;
                console.log(this.lists)
                back.list == '' && (this.show = true, this.text = '暂无数据');
            })
        },
        /**
         *开团
         */
        getgroupCreate(list) {
            this.grouplist.activityId = list.id;
            this.grouplist.beginTime = DateUtils.formatDate(new Date(list.begin_time), 'yyyy-MM-dd HH:mm:ss');
            this.grouplist.endTime = DateUtils.formatDate(new Date(list.end_time), 'yyyy-MM-dd HH:mm:ss');
            api.groupCreateActivity(this, this.grouplist, back => {
                if (back.success == '1') {
                    this.openlist = back.object;
                    this.$router.go({
                        path: '/groupMain/groupOrder/' + this.openlist.groupOrderId
                    });
                    window.localStorage.setItem('groupId', this.openlist.groupId);
                }
                if (back.success == '0') {
                    this.show = true;
                    this.text = back.remark;
                    console.log(this.show)
                    console.log(this.text)
                }
            })

        },
    }
}
</script>
<style lang="scss" scoped>
.group_shop {
    width: 640px;
    min-height: 1136px;
    background: url(../../images/groupShop/group_bj.png) no-repeat !important;
}

.tab {
    background: -webkit-linear-gradient(top, #3BA3D6, #2A5BA3) !important;
    // position: fixed;
    // top: 310px;
    width: 100%;
    font-size: 12px;
    z-index: 4;
    border-image: linear-gradient(to right, #C4AB44 30%, #FBF9E1 60%, #C4AB44 90%) 30 30;
    border-top: 5px #000 solid;
    > div {
        float: left;
        width: 20%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 2.4em;
        &.active {
            color: #FFFF00;
        }
    }
    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        z-index: 100;
        .touxiang {
            position: absolute;
            right: 0;
            img {
                margin: 0px 27px;
            }
        }
    }
}

.touxiang {
    position: absolute;
    right: 0;
    img {
        display: block;
        width: 85px;
        height: 85px;
        border-radius: 50%;
        background: #eee;
        position: absolute;
        margin: -50px 27px;
        border: 5px #75BBC0 solid;
        z-index: 2;
    }
}

.lists {
    position: absolute;
    top: 370px;
    background: #FEF4C8;
    width: 100%;
    img {
        float: left;
        padding: 10px;
        width: 245px;
        height: 245px;
    }
    span {
        background: #fff;
        width: 316px;
        float: right;
        margin: 10px 10px 0px 0px;
        height: 245px;
    }
    p {
        font-size: 22px;
        font-family: 黑体;
        margin-top: 10px;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        line-height: 30px;
    }
}

.p1 {
    font-size: 22px;
    font-family: 黑体;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 30px;
}

.goods {
    width: 93%;
    margin: 0 auto;
    background: #F4CE5D;
    text-align: center;
    margin-top: 10px;
    /* height: 200px; */
    border-radius: 8px;
    overflow: hidden;
}

.goods_head {
    background: url(../../images/groupShop/wp-head.png) no-repeat !important;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin: 30px 0px -15px 23px;
    width: 93%;
    h1 {
        height: 90px;
        line-height: 90px;
        font-size: 30px;
        text-align: center;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#fede0d));
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent;
    }
}

.showclose {
    position: absolute;
    top: -22px;
    right: -55px;
    width: 81px;
    height: 81px;
    background: url(../../images/groupShop/close.png) no-repeat;
}

.shopDetailShow {
    // height: 940px;
    background: #F4CE5D;
    border-radius: 10px;
    padding-bottom: 10px;
    li {
        padding: 10px 10px 0px 10px;
    }
    .p1 {
        font-size: 30px;
        background: #fff;
    }
}

.detail {
    background: url(../../images/groupShop/shopBg.png) no-repeat;
    overflow: hidden;
    border-radius: 5px;
    img {
        float: left;
        padding: 63px 4px 6px 44px;
        width: 160px;
        height: 160px;
    }
    span {
        width: 54%;
        float: right;
        margin: 77px 10px 0px 0px;
        // text-align: center;
    }
    p {
        font-size: 26px;
        font-family: 黑体;
        margin: 5px;
        // background: #fff;
        border-radius: 5px;
    }
    .p2{
        text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    word-wrap: break-word;
    word-break: break-all;
    }
}

.group_rule_detail {
    margin: 0px auto;
    padding: 20px;
    background: #fff;
    font-size: 26px;
    overflow-y: auto;
    height: 600px;
}
</style>
