<template>
    <div class="app-view">
    <div v-el:views style="padding-bottom: 87px; box-sizing: border-box;height:100%;" >
        <div class="scroll" style="height: 100%; box-sizing: border-box; overflow: hidden;" >
            <div transition="view" class="container">
                <div class="banner" :style="{'background': 'url('+activityData.big_imgurl+') 0 0 / 100% auto no-repeat'}">
                    <div class="banner-title">{{activityData.title}}</div>
                </div>
                <div class="activity-detail">
                    <div class="detail-header">
                        <span class="left">{{activityData.introduction}}</span>
                        <a @click="this.detailshow = !this.detailshow, refresh()" class="detail-text right">详情 <span class="reg" :class="{active:detailshow}"></span></a>
                    </div>
                    <div v-if="detailshow" class="xiangxi" style="overflow-y: scroll;">
                        <p>{{{activityData.scenic}}}</p>
                    </div>
                </div>
                <div v-for="item in tieba" style="background-color:#fff;margin-top:15px;" v-show="!voteshow">
                    <div class="tieba" @click="jump(item.id)">
                        <div>
                            <div class="head">
                                <img :src="item.openNameUrl" class="head-left">
                                <div class="head-right">
                                    <p>{{item.openName}}</p>
                                    <p class="date">{{item.createTime}} <span> 浏览{{item.browse}}</span></p>
                                </div>
                            </div>
                            <div style="padding:10px 0;">
                                <p>
                                    <span class="zhiding" v-if="item.operationStatus=='2'||item.operationStatus== '3'" :class="{active:item.operationStatus=='2',other:item.operationStatus=='3'}">【{{item.operationStatus == '2'?'精华':'置顶'}}】</span>
                                    <span v-if="item.title" style="font-weight: bold;">{{item.title}}</span>
                                </p>
                                <!-- {{{item.share}}} -->
                                <!-- <span >查看全文</span> -->
                                <!--  -->
                                <span v-for="text in item.sharetext" v-show="$index === 1 ? this.showText : true">{{{text}}}</span>
                                    <a href="javascript:;" v-show="(item.sharetext.length > 1) && !this.showText"   style="color:#0640ff">...全文</a>
                                </div>
                            <div style="width:100%;">
                                <div class="showImgs" style="width:100%;">
                                    <div class="img-top" v-if="item.showimages" style="width:100%;">
                                        <div v-for="imag in item.showimages" :style="imag.style" v-if="$index < 3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="color1" style="line-height:45px;font-size: 22px;" v-if="item.location"><span class="address-icon "></span>{{item.location}}</p>
                        </div>
                    </div>
                    <div class="detail-btn">
                        <a href="javascript:;" class="a-btn" @click="jump(item.id)"><span class="send"></span>转发</a>
                        <a href="javascript:;" class="a-btn" @click="jump(item.id)"><span class="comment"></span>评论</a>
                        <a href="javascript:;" class="a-btn">
                            <span class="good" v-if="item.praiseStatus == '1'" :class="{active:item.praiseStatus == '1' }"> {{item.praiseCount}}</span>
                            <span class="good no" @click="like(item)" v-if="item.praiseStatus === 0" :class="{no:item.praiseStatus === '0'}">{{item.praiseCount}}</span>
                        </a>
                    </div>
                </div>
                <div v-show="voteshow" class="novote" style="text-align: center;line-height:100px;line-height:100px;">
                    暂无发帖信息
                </div>
                <p class="pullUp" v-show="pullUp">正在加载中……</p>
                <p class="finish-text" v-show="finish">已加载完全部数据</p>
            </div>
        </div>
        <div style="" class="menu">
            <div class="mymenu">
                <div class="a-btn">
                    <p><span class="home active"></span></p>
                    <p class="color2">首页</p>
                </div>
                <div class="a-btn" v-link="{path:'/fatie'}">
                    <p><span class="fatie"></span></p>
                    <p>发帖</p>
                </div>
                <div class="a-btn" v-link="{path:'/personalcenter'}">
                    <p><span class="me"></span></p>
                    <p>我的</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import emoji from '../js/emoji/data.js'
import api from '../api/serverapi.js'
import getArgs from '../utils/url.js'
import Datautils from '../utils/DateUtils.js'
import IScroll from '../components/utils/isscroll.js'

export default {
    components: {},
    data() {
        return {
            activityData: {
                title: '',
                big_imgurl:'',
                scenic: '',
                introduction: '', //简介
                id: ''

            },
            detailshow: false,
            tieba: [],
            activityId: '',
            format: ['yyyy-MM-dd'],
            Info: {},
            show: 0,
            emoji: emoji,
            voteshow: false,
            //滚动
            pullUp: false,
            iscroll: null,
            initCount: 1,
            isRedraw: true,
            scollShow: false,
            //
            total: {},
            postlistData: {
                pagenum: 1,
                pagesize: 5,
            },
            finish: false,
            showText: false,


        }
    },
    ready() {
        this.$els.views.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        this.activityId = getArgs.getArgsFromUrl('tid');

        // var actidetail = window.localStorage.getItem('actInfo')
        
        // var mytext = window.localStorage.getItem('personInfo')
        // this.Info = window.JSON.parse(mytext)
        this.getactivity()
        this.myselfInfo()


    },
    methods: {
        //获取主题信息
        getactivity() {
            var that = this;
            api.activitiesInfo(this, {
                id: this.activityId
            }, (back) => {
                if (back.resCode == '000000') {

                    this.activityData = back.repBody
                    
                }

            })
        },
        //获取我的个人信息
        myselfInfo(){
            var that = this;
            api.personInfo(this,{},(back)=>{
                if(back.resCode == '000000'){
                    this.Info.openid = back.repBody.openid
                    that.getpostList();
                }
                
            })
        },
        jump(id) {
            this.$route.router.go({
                path: "detail/" + id
            });

        },
        like(item) {
            console.log(item)
            var that = this;
            api.addtimes(this, {
                iss_id: item.id, //帖子id
                tourist_id: this.activityId, //主题id
                iss_openid: item.openid, //发帖者openid
                "dirff_id": "2", //帖子点赞,传2
                "floor": "0", //传0
                "reply_openid": this.Info.openid, //点赞人openid
                "target_id": "0" //传0

            }, (back) => {
                if (back.resCode == '000000') {
                    if (back.repBody == '1') {
                        //未点赞状态
                        item.praiseStatus = '1';
                        item.praiseCount++;
                    }else if(back.repBody == '0'){
                        //已点赞
                        item.praiseStatus = '1';
                    }
                }

            })

        },
        getpostList() {
            this.voteshow = false;
            var that = this;
            this.$nextTick(() => {
                api.getpostList(this, {
                    pagenum: this.postlistData.pagenum,
                    pagesize: this.postlistData.pagesize,
                    tourist_id: this.activityId,
                    open_id: this.Info.openid
                }, (back) => {
                    this.pullUp = false;
                    if (back && back.resCode == '000000') {
                        if (back.repBody && back.repBody.length) {
                            this.scollShow = true;
                            back.repBody.forEach(value => {
                                value.createTime = Datautils.format(new Date(value.createTime), 'yyyy-MM-dd HH:mm')
                                value.imgUrl = value.imgUrl && value.imgUrl.split(';') || '';
                                //
                                value.sharetext = []
                                value.sharetext.push(value.share.substr(0, 20))
                                value.share.length > 20 ? value.sharetext.push(value.share.substr(20)) : '';
                                that.showText = false;
                                //

                                 //替换表情
                                value.sharetext[0] = Datautils.formatEmoij(value.sharetext[0])
                                
                                //图片
                                value.showimages = [];
                                if (value.imgUrl && value.imgUrl.length > 0) {
                                    var len = value.imgUrl.length;
                                    for (var j = 0; j < len; j++) {
                                        value.showimages[j] = {
                                            src: value.imgUrl[j],
                                            style: ''
                                        };
                                        this.imgwh(value.showimages[j]);
                                    }
                                }
                            })
                            this.tieba = this.tieba.concat(back.repBody);
                            this.postlistData.pageCount = back.resPage.pageCount
                            // this.scroll();
                        } else {
                            this.voteshow = true;
                        }
                        this.scroll();

                    }else{
                        this.$dispatch('handle_server_error', back);
                    }

                })
            })
        },
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
                            if (this.postlistData.pagenum < this.postlistData.pageCount) {
                                this.postlistData.pagenum++;
                                this.pullUp = true;
                                if (this.postlistData.pagenum == this.postlistData.pageCount) {
                                    // this.finish = true;
                                    setTimeout(that.loadfinish,2000);
                                }
                                this.getpostList();
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
        refresh() {
            if(this.iscroll) {
                this.$nextTick(() => {
                    this.iscroll.refresh();
                })
            }
        },
        imgwh(ob) {
            var tImg = new Image(),
                that = this;
            tImg.onload = function() {
                var w = tImg.naturalWidth;
                var h = tImg.naturalHeight;
                ob.width = w;
                ob.height = h;
                var backgroundSizex = "100%";
                var backgroundSizey = "100%";
                var backgroundPos = "";
                if (w <= h) {
                    backgroundSizey = "auto";
                    var endh = h * this.h3width / w;
                    backgroundPos = "0 " + ((this.h3width - endh) / 2) + "px";
                } else {
                    backgroundSizex = "auto";
                    var endw = w * this.h3width / h;
                    backgroundPos = ((this.h3width - endw) / 2) + "px" + " 0";
                }
                ob.style = {
                    backgroundImage: "url(" + ob.src + ")",
                    backgroundSize: backgroundSizex + " " + backgroundSizey,
                    backgroundPosition: backgroundPos
                };

            };
            tImg.src = ob.src;
        },
        loadfinish(){
            this.finish = true;   //加载完成出现
        }


    }
}
</script>

