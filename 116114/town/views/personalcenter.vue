<template>
<div class="app-view">
    <div v-el:views style="padding-bottom: 87px; box-sizing: border-box;height:100%;" >
        <div class="scroll" style="height: 100%; box-sizing: border-box; overflow: hidden;">
            <div transition="view" class="container">
                <div class="detail-top">
                    <a class="detail-back" href="javascript:history.back()"></a><a href="javascript:;" class=" color2 ">个人中心</a>
                </div>
                <div class="personbg">
                    <div style="transform: translate(0%, 28%);">
                        <span class="personImg" :style="{'background': 'url('+person.headImg+') 0 0 / 100% auto no-repeat'}"></span>
                        <p class="color3 height1">{{person.nickName}}</p>
                    </div>
                </div>
                <div class="person-nav">
                    <a href="javascript:;" class="my-fatie" :class="{'active':personNav.type=='1'}" @click="mypost('1')">我的发帖</a><a href="javascript:;" class="my-fatie" :class="{'active':personNav.type=='2'}" @click="mypost('2')">我的参与</a><a href="javascript:;" class="my-fatie" :class="{'active':personNav.type=='3'}" style="border-right:none;" @click="mypost('3')">我的信息</a>
                </div>
                <div v-show="!voteshow">
                    <!-- 我的发帖 -->
                    <div v-show="minepot">
                        <div class="tieba" v-for="item in mypostData" style="margin-bottom:20px;padding: 26px 26px 48px;">
                            <div>
                                <div @click="jumpto(item)">
                                    <div class="head">
                                        <img :src="item.openNameUrl" class="head-left">
                                        <div class="head-right">
                                            <p>{{item.openName}}</p>
                                            <p class="date">{{item.createTime}} 浏览{{item.browse}}</p>
                                        </div>
                                    </div>
                                    <div class="comment-body">
                                        <p>
                                            <span class="zhiding" v-if="item.operationStatus=='2'||item.operationStatus== '3'" :class="{active:item.operationStatus=='2',other:item.operationStatus=='3'}">【{{item.operationStatus == '2'?'精华':'置顶'}}】</span>
                                            <span v-if="item.title" style="font-weight: bold;">{{item.title}}</span>
                                        </p>
                                        <p>
                                            <!-- {{{item.share}}} -->
                                            <span v-for="text in item.sharetext" v-show="$index === 1 ? this.showText : true">{{{text}}}</span>
                                            <a href="javascript:;" v-show="(item.sharetext.length > 1) && !this.showText" style="color:#0640ff">...全文</a>
                                        </p>
                                    </div>
                                </div>
                                <div class="person-comment"><a href="javascript:;" class="person-btn"><span class="comment"></span>评论</a><a href="javascript:;" class="person-btn"><span class="good"  style="background-position: left 2px;"></span>{{item.praiseCount}}</a><a href="javascript:;" @click="delmodel(item)" class="person-btn" style="color:#ca1431;"><span class="del" ></span>删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 我的参与 -->
                    <div v-show="wcyu">
                        <div class="tieba" v-for="item in myinvolvement" style="margin-bottom:20px;padding: 26px 26px 48px;">
                            <div>
                                <div @click="jump(item)">
                                    <div class="head">
                                        <img :src="item.issUrl" class="head-left">
                                        <div class="head-right">
                                            <p>{{item.issName}}</p>
                                            <p class="date">{{item.createDate}} 浏览{{item.browse}}</p>
                                        </div>
                                    </div>
                                    <div class="comment-body">
                                        <p>
                                            <span class="zhiding" v-if="item.operationStatus=='2'||item.operationStatus== '3'" :class="{active:item.operationStatus=='2',other:item.operationStatus=='3'}">【{{item.operationStatus == '2'?'精华':'置顶'}}】</span>
                                            <span v-if="item.title" style="font-weight: bold;">{{item.title}}</span>
                                        </p>
                                        <p>{{{item.issCommenttext[0]}}}</p>
                                    </div>
                                </div>
                                <div class="person-comment"><a href="javascript:;" class="person-btn"><span class="send"></span>转发</a><a href="javascript:;" class="person-btn"><span class="comment"></span>评论</a><a href="javascript:;" class="person-btn"><span class="good"  style="    background-position: left 2px;"></span>{{item.praiseCount}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 我的信息 -->
                    <div v-show="myInfo" style="margin-top:20px;">
                        <div class="tieba" v-for="item in mymessageData" style="margin-bottom:20px;padding: 26px 26px 48px;">
                            <div>
                                <!-- 评论 -->
                                <div class="head" v-if="item.dirffId=='1'">
                                    <img :src="item.commentUrl" class="head-left">
                                    <div class="head-right">
                                        <p>{{item.commentName}}</p>
                                        <p class="date">{{item.createDate}}</p>
                                    </div>
                                </div>
                                <!-- 帖子点赞 -->
                                <div class="head" v-if="item.dirffId=='2'">
                                    <img :src="item.praiseUrl" class="head-left">
                                    <div class="head-right">
                                        <p>{{item.praiseName}}</p>
                                        <p class="date">{{item.createDate}}</p>
                                    </div>
                                </div>
                                <!-- 评论点赞 -->
                                <div class="head" v-if="item.dirffId=='3'">
                                    <img :src="item.commentPraiseUrl" class="head-left">
                                    <div class="head-right">
                                        <p>{{item.commentPraiseName}}</p>
                                        <p class="date">{{item.createDate}}</p>
                                    </div>
                                </div>
                                <div class="comment-body" style="padding:0;">
                                    <p style="line-height:40px;" v-if="item.dirffId=='1'">{{{item.comment}}}</p>
                                    <p style="line-height:40px;" v-if="item.dirffId=='2'">赞了你</p>
                                    <p style="line-height:40px;" v-if="item.dirffId=='3'">赞了你</p>
                                    <div style="background-color:#e9e9e9;padding: 10px;box-sizing: border-box;" @click="mymessgjump(item)">
                                        <img :src="item.issUrl" class="head-left" style="float:left"><span>{{item.issName}}</span>
                                        <p>
                                            <span v-for="text in item.Commenttext" v-show="$index === 1 ? this.Commenttext : true">{{{text}}}</span>
                                            <a href="javascript:;" v-show="(item.Commenttext.length > 1) && !this.Commenttext" style="color:#0640ff">...全文</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="pullUp" v-show="pullUp">正在加载中……</p>
                    <p class="finish-text" v-show="finish">已加载完全部数据</p>
                </div>
                <div v-show="voteshow" style="text-align: center;line-height:100px;line-height:100px;">暂无信息哟</div>
            </div>
        </div>
        <!-- 底部菜单 -->
        <div  class="menu">
            <div class="mymenu">
                <div class="a-btn" v-link="{path:'/index'}">
                    <p><span class="home"></span></p>
                    <p class="color2" style="color:#6a6a6a">首页</p>
                </div>
                <div class="a-btn" v-link="{path:'/fatie'}">
                    <p><span class="fatie"></span></p>
                    <p>发帖</p>
                </div>
                <div class="a-btn" v-link="{path:'/personalcenter'}">
                    <p><span class="me active"></span></p>
                    <p style="color:#15caae">我的</p>
                </div>
            </div>
        </div>
        <model :show.sync="delStatus.showMsg">
            <div class="del-msg">
                <p style="color:red" @click="del()">删除评论</p>
                <p @click="delbtn()">取消</p>
            </div>
        </model>
    </div>
    </div>
</template>
<script>
import getArgs from '../utils/url.js'
import emoji from '../js/emoji/data.js'
import Model from '../components/Model.vue'
import api from '../api/serverapi.js'
import Datautils from '../utils/DateUtils.js'
import IScroll from '../components/utils/isscroll.js'
export default {
    components: {
        Model
    },
    data() {
        return {
            person: {
                nickName: '昵称',
                headImg: ''
            },
            personNav: {
                type: '0'
            },
            comment: [],
            format: ['yyyy-MM-dd'],
            show: '1',
            myInfo: false, //我的信息
            delStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },
            postData: {
                tourist_id:'',
                openid: '',
                "pagenum": "1", //当前页数
                "pagesize": "5" //一页传几个
            },
            deldata: {
                "id": "",
                "openid": "", //必填
                "operation_status": "1正常 2，精华 3，置顶 ，-1 删除",
                "title": "",
                "tourist_id": "" //必填

            },
            voteshow: false,
            //滚动
            pullUp: false,
            iscroll: null,
            initCount: 1,
            isRedraw: true,
            scollShow: false,
            //
            finish: false,
            minepot: true,       //我的发帖
            wcyu: false,         //我的参与
            mypostData: [],     //我的发帖数据
            myinvolvement: [], //我的参与数据
            mymessageData: [], //我的信息数据
            showText: false,
            basePath: basePath,
            viewid:''
        }
    },
    ready() {
        this.$els.views.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);

        var myperson = window.localStorage.getItem('personInfo') 
        this.person = window.JSON.parse(myperson)         //从store获取个人信息
        this.postData.openid = this.person.openid
        this.viewid = getArgs.getArgsFromUrl('tid')
        this.postData.tourist_id = this.viewid
        this.mypost(1);

    },
    methods: {
        delmodel(item) {
            this.delStatus.showMsg = true;
            this.postdetail = item;
        },
        del() {
            this.deldata.tourist_id = this.postdetail.touristId   // 主题id
            this.deldata.id = this.postdetail.id                 //帖子id
            this.deldata.title = this.postdetail.title           //帖子标题
            this.deldata.operation_status = '-1'                 //传删除状态-1
            this.deldata.openid = this.postdetail.openid         //发帖人openid
            api.delmypost(this, this.deldata, (back) => {
                if(back.resCode == '000000'){
                    this.delbtn();                               //关闭弹窗
                    // this.mypostData.splice(index, 1)
                    this.mypostData.$remove(this.postdetail)
                }else{
                    this.$dispatch('handle_server_error', back);
                }
                

            })
        },
        //关闭弹窗
        delbtn() {
            this.delStatus.showMsg = false;
        },
        //传参,触发不同方法
        mypost(type) {
            this.personNav.type = type;
            this.voteshow = false;
            this.$nextTick(() => {
                if (type == '1') {
                    this.myte();
                } else if (type == '2') {
                    this.myparticipation()
                } else {
                    this.mymessage();
                }
            })

        },
        //滚动
        scroll() { //初始化滚动
            var that = this;
            if (this.initCount) {
                this.$nextTick(() => {
                    this.iscroll = new IScroll('.scroll', {
                        fadeScrollbars: false, //禁止滚动条淡入淡出
                        tap: true
                    });
                    this.iscroll.on('scrollStart', () => {
                        if (this.isRedraw) {
                            this.iscroll.maxScrollY -= 70;
                        }
                        this.isRedraw = false;
                    })
                    this.iscroll.on('scrollEnd', () => {
                        if (this.iscroll.directionY && (this.iscroll.y === this.iscroll.maxScrollY)) {
                            if (this.postData.pagenum < this.postData.pageCount) {
                                this.postData.pagenum++;
                                this.pullUp = true;
                                if (this.postData.pagenum == this.postData.pageCount) {
                                    this.pullUp = false;  //加载进度取消
                                    setTimeout(that.loadfinish,2000);
                                    
                                }
                                if (this.personNav.type == '1') {
                                    this.myte();
                                } else if (this.personNav.type == '2') {
                                    this.myparticipation()
                                } else {
                                    this.mymessage()
                                }

                            }

                        }
                    })
                    this.initCount = 0;
                })

            } else {
                this.$nextTick(() => {
                    this.iscroll.refresh();
                    this.isRedraw = true;
                })
            }

        },
        //我的发帖
        myte() {
            this.myInfo = false;
            this.minepot = true;
            this.wcyu = false;
            api.getmypost(this, this.postData, (back) => {
                this.pullUp = false;
                if (back && back.resCode == '000000') {
                    if (back.repBody && back.repBody.length) {
                        this.scollShow = true;
                        back.repBody.forEach(value => {
                            value.createTime = Datautils.format(new Date(value.createTime), 'yyyy-MM-dd HH:mm')

                            //展示前20个字符
                            value.sharetext = []
                            value.sharetext.push(value.share.substr(0, 20))
                            value.share.length > 20 ? value.sharetext.push(value.share.substr(20)) : '';
                            this.showText = false;
                            //

                            //替换表情
                            value.sharetext[0] = Datautils.formatEmoij(value.sharetext[0])
                            
                        })
                        this.mypostData = this.mypostData.concat(back.repBody);
                        this.postData.pageCount = back.resPage.pageCount

                        this.scroll();
                    } else {
                        this.voteshow = true;
                    }

                }else{
                    this.$dispatch('handle_server_error', back);
                }
            })
        },
        //我的参与
        myparticipation() {
            this.myInfo = false;
            this.minepot = false;
            this.wcyu = true;
            api.myparticipate(this, {
                pagenum: this.postData.pagenum,
                pagesize: this.postData.pagesize,
                reply_openid: this.person.openid,
                tourist_id : this.viewid
            }, (back) => {
                if (back && back.resCode == '000000') {
                    if (back.repBody && back.repBody.length) {
                        this.scollShow = true;
                        back.repBody.forEach(value => {
                            value.createDate = Datautils.format(new Date(value.createDate), 'yyyy-MM-dd HH:mm')

                            //展示前20个字符
                            value.issCommenttext = []
                            value.issCommenttext.push(value.issTitle.substr(0, 20))
                            value.issTitle.length > 20 ? value.issCommenttext.push(value.issTitle.substr(20)) : '';
                            this.showText = false;

                            //替换表情
                            value.issCommenttext[0] = Datautils.formatEmoij(value.issCommenttext[0])
                        })
                        this.myinvolvement = this.myinvolvement.concat(back.repBody);

                        this.postData.pageCount = back.resPage.pageCount

                        this.scroll();
                    } else {
                        this.voteshow = true;
                    }

                }else{
                    this.$dispatch('handle_server_error', back);
                }
            })
        },
        //我的信息
        mymessage() {
            this.minepot = false;
            this.wcyu = false;
            this.myInfo = true;
            api.mymessage(this, {
                pagenum: this.postData.pagenum,
                pagesize: this.postData.pagesize,
                openid: this.person.openid,
                tourist_id : this.viewid
            }, (back) => {
                if (back.resCode === '000000') {
                    if (back.repBody && back.repBody.length) {
                        back.repBody.forEach(value => {
                            value.createDate = Datautils.format(new Date(value.createDate), 'yyyy-MM-dd HH:mm')
                            if(value.comment){
                                value.comment = Datautils.formatEmoij(value.comment)
                            }
                            

                            // //展示前20个字符
                            value.Commenttext = []
                            value.Commenttext.push(value.issTitle.substr(0, 20))
                            value.issTitle.length > 20 ? value.Commenttext.push(value.issTitle.substr(20)) : '';
                            this.showText = false;
                            

                            //替换表情
                            value.Commenttext[0] = Datautils.formatEmoij(value.Commenttext[0])
                        })
                        this.mymessageData = this.mymessageData.concat(back.repBody);
                        this.postData.pageCount = back.resPage.pageCount
                        this.scroll();
                    }else{
                        this.voteshow = true;
                    }
                }else{
                    this.$dispatch('handle_server_error', back);
                }
            })

        },
        jumpto(item) {
            window.location = this.basePath + '?tid=' + item.touristId + '#!/detail/' + item.id
        },
        jump(item) {
            window.location = this.basePath + '?tid=' + item.touristId + '#!/detail/' + item.issId
        },
        mymessgjump(item){
            window.location = this.basePath + '?tid=' + item.touristId + '#!/detail/' + item.issId
        },
        loadfinish(){
            this.finish = true;   //加载完成出现
        }
    },
    watch: {
        'personNav.type' (val) {
            this.postData.pagenum = 1;
            this.mymessageData = [];
            this.myinvolvement = [];
            this.mypostData = [];
        }
    }
}
</script>
<style scoped>
/* 必需 */

.expand-transition {
    transition: all .3s ease;
    /*height: 30px;*/
    /*padding: 10px;*/
    background-color: #fff;
    overflow: hidden;
}


/* .expand-enter 定义进入的开始状态 */


/* .expand-leave 定义离开的结束状态 */

.expand-enter,
.expand-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}

.expand-leave {}
</style>
<style scoped>
.del-msg {
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: #fff;
}

.del-msg p {
    height: 90px;
    line-height: 90px;
    text-align: center;
    color: #000;
    border-bottom: 1px solid #eee;
}
</style>
