<template>
    <div class="app-view">
    <div style="padding-bottom:76px; box-sizing: border-box;">
        <div class="detail-top">
             <a class="detail-back" href="javascript:history.back()"></a>

            <a href="javascript:;" class="color2" style="float:right;" @click="lookposter" v-if="onlylook=='1'" >只看楼主</a> 
            <a href="javascript:;" class="color2" style="float:right;color:#ccc" @click="getissue" v-if="onlylook=='2'" >只看楼主</a> 
        </div>
        <div style="background-color:#fff;margin:15px 0;">
            <div class="tieba">
                <div>
                    <div class="head">
                        <img :src="posttopdetails.openNameUrl" class="head-left">
                        <div class="head-right">
                            <p>{{posttopdetails.openName}}</p>
                            <p class="date">{{posttopdetails.createTime}} <span> 浏览{{posttopdetails.browse}}</span></p>
                        </div>
                    </div>
                    <div class="tieba-body">
                        <p>
                            <span class="zhiding" v-if="posttopdetails.operationStatus=='2'||posttopdetails.operationStatus== '3'" :class="{active:posttopdetails.operationStatus=='2',other:posttopdetails.operationStatus=='3'}">【{{posttopdetails.operationStatus == '2'?'精华':'置顶'}}】</span>
                            <span v-if="posttopdetails.title" style="font-weight: bold;">{{posttopdetails.title}}</span>
                        </p>
                        <p v-for="item in posttopdetails.share">{{{item}}}</p>
                    </div>
                    <!-- <div>
                        <img v-for="imag in postdetails.imgUrl" style="width:100%;min-height:320px;margin-bottom:5px" :style="{'background': 'url('+imag+') 0 0 / 100% auto no-repeat'}">
                    </div> -->
                    <div style="width:100%;">
                        <div class="showImgs" style="width:100%;">
                            <div class="img-top" v-if="posttopdetails.showimages" style="width:100%;">
                                <div style="width:100%;height:360px;background-size:100%;" v-for="imag in posttopdetails.showimages" :style="imag.style" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bothComment">
            <span class="bothComment-head">全部评论</span>
        </div>
        <div style="background-color:#fff;" v-if="allcomment">
            <div class="tieba" style="" v-for="(index, item) in postdetails.firstList" v-if="postdetails.firstList">
                <div style="border-bottom:1px solid #ccc;">
                    <div class="head">
                        <img :src="item.replyUrl" class="head-left">
                        <div class="head-right">
                            <p>{{item.replyName}} <span class="louzhu" v-if="item.replyOpenid == this.postdetails.openid">楼主</span></p>
                            <p class="date">{{item.createTime}} {{index+1}}楼</p>
                        </div>
                    </div>
                    <div class="comment-body">
                        <p>{{{item.comment}}}</p>
                    </div>
                    <div>
                        <p class="pinlun-box">
                            <a href="javascript:;" class="pinglun-btn" @click="discuss(item, index)"><span class="comment "></span>评论</a>
                            <a href="javascript:;" class="pinglun-btn" @click="contentpin(item)"><span class="good" :class="{active:item.praiseCommentStatus=='1'}" style="padding-left:0;background-position: left 12px;"></span>{{item.commentPraise}}</a>
                            <a class="pinglun-btn" style="margin-right:0px;color:#ca1431;" @click="delmodel({obj: item, type: 1, first: index})" v-if="item.replyOpenid == this.Info.openid">删除</a>
                        </p>
                        <!-- v-if="!item.secondList.length" item.secondList -->
                        <div class="pinlun-box" v-for="(secondIndex, list) in item.secondList" >
                            <p class="height2" @click="discuss(list, index)">
                                <span class="color4">{{list.replyName}}</span><span>:</span><span>{{{list.comment}}}</span> <span class="color5">{{list.createTime}}</span> <span @click.stop="delmodel({obj: list, type: 2, first: index})" style="color:#ca1431; position: relative; z-index: 100;" v-if="list.replyOpenid == this.Info.openid">删除</span>
                            </p>
                            <template v-for="third in list.thirdList">
                                <p class="height2" @click="discuss(third, index)">
                                    <span class="color4">{{third.replyName}}</span><span>回复{{third.issOpenName}}:</span><span>{{{third.comment}}}</span> <span class="color5">{{third.createTime}}</span> <span @click.stop="delmodel({obj: third, type: 3, first: index, second: secondIndex})" style="color:#ca1431; position: relative; z-index: 100;" v-if="third.replyOpenid == this.Info.openid">删除</span>
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="pb" v-show="plpl[index]">
                        <textarea placeholder="{{placeholderText}}" v-model="comment" @focus="gq"></textarea>
                        <div>
                            <p style="padding:10px 0;">
                                <a class="biaoqing" @click="this.biaoqingmodel=true"></a>
                                <!-- <a class="pic" style="position:relative;">
                                    <input @change="inputc()" class="inputbutton" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" multiple="true" v-el:inputimg/>
                                </a> -->
                                <a class="cancel" @click="cancel(index)">取消</a>
                                <a class="fabiao" @click="huifuComment(index)">发表</a>
                            </p>
                        </div>
                        <div class="showImgs">
                            <div class="img-top" v-if="ImgData.length" @click="openPhotoSwipe(showimage)">
                                <div :style="imag.style" class="" style="background-size: contain;background-repeat: no-repeat;position:relative;display:inline-block;margin-right:8px;margin-bottom:5px;" v-for="imag in ImgData">
                                    <i @click="delimg(imag,index)">X</i>
                                </div>
                            </div>
                        </div>
                        <div v-if="biaoqingmodel">
                            <div class="biaoqingbao">
                                <!-- <span :style="{'background-position':val.dingwei} " v-for="val in emoji.data" @click="enter(val.name)"></span> -->
                                <span :style="{'background-image':'url('+val.img+')'} " v-for="val in emoji.data" @click="enter(val.name)"></span>
                            </div>
                            <div class="biaoqing-bottom">
                                <span class="smile-fix"></span>
                                <a class="cancel" style="position:absolute;top:7px;right:20px;margin:0;" @click="this.biaoqingmodel=false">完成</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="nocomment" style="text-align:center;line-height:100px;">
                暂无评论
            </div>
        </div>
        <div style="background-color:#fff;" v-if="mycomment">
            <div class="tieba" style="" v-for="(index, item) in postdetails.firstList" v-if="postdetails.firstList">
                <div style="border-bottom:1px solid #ccc;">
                    <div class="head">
                        <img :src="item.replyUrl" class="head-left">
                        <div class="head-right">
                            <p>{{item.replyName}} <span class="louzhu" v-if="item.replyOpenid == this.postdetails.openid">楼主</span></p>
                            <p class="date">{{item.createTime}} {{index+1}}楼</p>
                        </div>
                    </div>
                    <div class="comment-body">
                        <p>{{{item.comment}}}</p>
                    </div>
                    <div>
                        <p class="pinlun-box">
                            <a href="javascript:;" class="pinglun-btn" @click="discuss(item, index)"><span class="comment "></span>评论</a>
                            <a href="javascript:;" class="pinglun-btn" @click="contentpin(item)"><span class="good" :class="{active:item.praiseCommentStatus=='1'}" style="padding-left:0;background-position: left 12px;"></span>{{item.commentPraise}}</a>
                            <a class="pinglun-btn" style="margin-right:0px;color:#ca1431;" @click="delmodel({obj: item, type: 1, first: index})" v-if="item.replyOpenid == this.Info.openid">删除</a>
                        </p>
                        
                        <!-- youccan -->
                        <!-- v-if="secondIndex < 5" -->
                        <div class="pinlun-box tet" v-for="(secondIndex, list) in item.secondList" v-if="secondIndex < 5">
                            <p class="height2" @click="discuss(list, index)">
                                <span class="color4">{{list.replyName}}</span><span>:</span><span>{{{list.comment}}}</span> <span class="color5">{{list.createTime}}</span> <span @click.stop="delmodel({obj: list, type: 2, first: index})" style="color:#ca1431; position: relative; z-index: 100;" v-if="list.replyOpenid == this.Info.openid">删除</span>
                            </p>
                            <template v-for="third in list.thirdList">
                                <p class="height2" @click="discuss(third, index)">
                                    <span class="color4">{{third.issOpenName}}</span><span>回复{{third.replyName}}:</span><span>{{{third.comment}}}</span> <span class="color5">{{third.createTime}}</span> <span @click.stop="delmodel({obj: third, type: 3, first: index, second: secondIndex})" style="color:#ca1431; position: relative; z-index: 100;" v-if="third.replyOpenid == this.Info.openid">删除</span>
                                </p>
                            </template>
                                <!-- <p v-if="$index > 5">查看更多评论</p> -->
                        </div>
                    </div>
                    <div class="pb" v-show="plpl[index]">
                        <textarea placeholder="{{placeholderText}}" v-model="comment" @focus="gq"></textarea>
                        <div>
                            <p style="padding:10px 0;">
                                <a class="biaoqing" @click="this.biaoqingmodel=true"></a>
                                <!-- <a class="pic" style="position:relative;">
                                    <input @change="inputc()" class="inputbutton" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" multiple="true" v-el:inputimg/>
                                </a> -->
                                <a class="cancel" @click="cancel(index)">取消</a>
                                <a class="fabiao" @click="huifuComment(index)">发表</a>
                            </p>
                        </div>
                        <div class="showImgs">
                            <div class="img-top" v-if="ImgData.length" @click="openPhotoSwipe(showimage)">
                                <div :style="imag.style" class="" style="background-size: contain;background-repeat: no-repeat;position:relative;display:inline-block;margin-right:8px;margin-bottom:5px;" v-for="imag in ImgData">
                                    <i @click="delimg(imag,index)">X</i>
                                </div>
                            </div>
                        </div>
                        <div v-if="biaoqingmodel">
                            <div class="biaoqingbao">
                                <!-- <span :style="{'background-position':val.dingwei} " v-for="val in emoji.data" @click="enter(val.name)"></span> -->
                                <span :style="{'background-image':'url('+val.img+')'} " v-for="val in emoji.data" @click="enter(val.name)"></span>
                            </div>
                            <div class="biaoqing-bottom">
                                <span class="smile-fix"></span>
                                <a class="cancel" style="position:absolute;top:7px;right:20px;margin:0;" @click="this.biaoqingmodel=false">完成</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="nocomment" style="text-align:center;line-height:100px;">
                暂无评论
            </div>
        </div>
    </div>
    <div class="review" v-show="Isay">
        <div class="review-box">
            <input placeholder="我来说两句" class="review-input" @focus="reply" type="text" />
            <a href="javascript:;" class="lei">
                <span class="double" v-if="postdetails.praiseStatus === 1" :class="{active:postdetails.praiseStatus === 1 }"> {{postdetails.praiseCount}}</span>
                <span class="double no" @click="like()" v-if="postdetails.praiseStatus === 0" :class="{no:postdetails.praiseStatus === 0}">{{postdetails.praiseCount}}</span>
            </a>
            <!-- <span class="review-good" :class="{active:postdetails.praiseStatus=='1'}">
            <i style="right:34px;" @click="like()"></i> {{postdetails.praiseCount}}</span> -->
        </div>
    </div>
    <div class="huifu" v-show="tanchu">
        <textarea placeholder="回复帖子:" v-model="comment" @focus="gq"></textarea>
        <div>
            <p style="padding:10px 0;">
                <a class="biaoqing" @click="this.biaoqingmodel=true"></a>
                <!-- <a class="pic" style="position:relative;">
                    <input @change="inputc()" class="inputbutton" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" multiple="true" v-el:inputimg/>
                </a> -->
                <a class="cancel" @click="cancele">取消</a>
                <a class="fabiao" @click="sendComment">发表</a>
            </p>
        </div>
        <div class="showImgs">
            <div class="img-top" v-if="ImgData.length" @click="openPhotoSwipe(showimage)">
                <div :style="imag.style" class="" style="background-size: contain;background-repeat: no-repeat;position:relative;display:inline-block;margin-right:8px;margin-bottom:5px;" v-for="imag in ImgData">
                    <i @click="delimg(imag,$index)">X</i>
                </div>
            </div>
        </div>
        <div v-if="biaoqingmodel">
            <div class="biaoqingbao">
                <span :style="{'background-image':'url('+val.img+')'} " v-for="val in emoji.data" @click="enter(val.name)"></span>
            </div>
            <div class="biaoqing-bottom">
                <span class="smile-fix"></span>
                <a class="cancel" style="position:absolute;top:7px;right:20px;margin:0;" @click="this.biaoqingmodel=false">完成</a>
            </div>
        </div>
    </div>
    <model :show.sync="delStatus.showMsg">
        <div class="del-msg">
            <p style="color:red" @click="del($index)">删除评论</p>
            <p @click="delbtn()">取消</p>
        </div>
    </model>
    </div>
</template>
<script>
import emoji from '../js/emoji/data.js'
import api from '../api/serverapi.js'
import Datautils from '../utils/DateUtils.js'
import Model from '../components/Model.vue'
import getArgs from '../utils/url.js'
export default {
    components: {
        Model
    },
    data() {
        return {
            placeholderText: '回复评论:',
            item: {
                headImg: basePath + 'src/m/static/img/head-icon.png'

            },
            argued: '',
            comment: '',
            likes: '22',
            Isay: true,
            tanchu: false,
            //上传图片
            h3width: (window.innerWidth) / 3,
            h3style: {
                width: (window.innerWidth) / 3 + "px",
                height: (window.innerWidth) / 3 + "px"
            },
            file: "",
            showadd: true,
            showimage: {
                has: false
            },
            biaoqingmodel: false,
            emoji: emoji,
            pingluntie: '',
            ImgData: [],
            Info: {}, //个人信息
            actInfo: {}, //活动信息
            id: '', //帖子id
            postdetails: {}, // 帖子详情
            posttopdetails:{},
            format: ['yyyy-MM-dd'],
            posterId: '', //楼主id
            fatieData: {
                "comment": "评论内容", //必填
                "iss_id": "发帖id", //必填
                "iss_openid": "发起评论者openid", //必填
                "pid": "父节点", //回复主贴传0 //必填
                "reply_openid": "发帖人openid", //必填
                "tourist_id": "景区id", //必填
                "pid": ""
            },
            dianzan: {
                "comment_id": "评论id", //必填
                "iss_id": "发帖id", //必填
                "iss_openid": "发帖openid", //必填
                "praise_openid": "点赞openid", //必填
                "tourist_id": "点赞openid" //必填
            },
            plpl: [],
            nocomment: false, //无评论
            delStatus: { //删除弹窗
                msg: "",
                showMsg: false,
                errorShow: true
            },
            viewid: '',
            temp: {},
            allcomment:false,
            mycomment:false,
            onlylook:1,
            isClick:false

        }
    },
    ready() {
        this.viewid = getArgs.getArgsFromUrl('tid')
        this.id = this.$route.params.id;
        var persondata = window.localStorage.getItem('personInfo')
        this.Info = JSON.parse(persondata)
        var actdata = window.localStorage.getItem('actInfo')
        this.actInfo = JSON.parse(actdata)
        this.getissue();
        this.$dispatch('ChannelLog', {
            'iss_id': this.id,
            'user_id': this.Info.id
        })

    },

    methods: {
        delte_() {
            console.log(23412)
        },
        gq() {
            this.biaoqingmodel = false;
        },
        reply() {
            this.Isay = false;
            this.tanchu = true;
        },
        cancel(index) {
            this.Isay = true;
            console.log(index)
            if (index != undefined) {
                this.plpl.$set(index, false);
            } else {
                this.tanchu = false;
            }
        },
        cancele() {
            this.Isay = true;
            this.tanchu = false;

        },
        delimg(img, index) {
            var that = this;
            // var ab = index
            that.ImgData.splice(index, 1)
            this.showadd = true;
        },
        inputc() {

            this.biaoqingmodel = false;
            if (this.ImgData.length > 8) {
                this.showadd = false; //不能继续上传
            }
            var files = this.$els.inputimg.files;
            if (files && files.length > 0) {
                // this.$dispatch('loading', {
                //     name: 'loading_img',
                //     icon: true,
                //     text: '加载中...',
                //     show: true,
                //     duration: 20 * 1000
                // });
                this.loadFiles(files);
            }
        },
        loadFiles(files) {
            var that = this;
            var i = 1;
            setTimeout(function() {
                var addlength = files.length;
                for (var i = 0; i < addlength; i++) {
                    var file = files[i];
                    var output_format = file.name;
                    var FILESIZE = 10;
                    var scale = 0.5;
                    if (file.size > (FILESIZE * 1024 * 1024)) {
                        scale = 0.2;
                    }
                    var reader = new FileReader();
                    reader.onload = function(f) {
                        var mime_type = "image/jpeg";
                        if (output_format != undefined && output_format.indexOf('.png') >= 0 && output_format.indexOf('.png') == output_format.length - 4) {
                            mime_type = "image/png";
                        }
                        that.imgScale(this.result, scale, mime_type, function(s, f, w, h) {
                            var backgroundSizex = "100%";
                            var backgroundSizey = "100%";
                            var backgroundPos = "";
                            if (w <= h) {
                                backgroundSizey = "auto";
                                var endh = h * that.h3width / w;
                                backgroundPos = "0 " + ((that.h3width - endh) / 2) + "px";
                            } else {
                                backgroundSizex = "auto";
                                var endw = w * that.h3width / h;
                                backgroundPos = ((that.h3width - endw) / 2) + "px" + " 0";
                            }
                            that.ImgData.push({
                                src: s,
                                file: f,
                                name: output_format,
                                style: {
                                    backgroundImage: "url(" + s + ")",
                                    backgroundSize: backgroundSizex + " " + backgroundSizey,
                                    backgroundPosition: backgroundPos,
                                    width: (window.innerWidth) + "px",
                                    height: 320 + "px",
                                },
                                width: w,
                                height: h,
                                has: true
                            });



                            // that.$dispatch('cancelloading', 'loading_img');
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }, 500);
        },
        imgScale(src, scale, type, cbk) {
            var that = this;
            if (!src) {
                return cbk(false);
            }
            var _canvas = document.createElement('canvas');
            var tImg = new Image;
            tImg.onload = function() {
                var iwidth = tImg.naturalWidth;
                var iheight = tImg.naturalHeight;
                _canvas.width = iwidth;
                _canvas.height = iheight;
                var _context = _canvas.getContext('2d');
                _context.drawImage(tImg, 0, 0);
                src = _canvas.toDataURL(type, scale);
                var blob = that.dataURItoBlob(src);
                cbk(src, blob, iwidth, iheight);
            };
            tImg.src = src;
        },
        dataURItoBlob(dataURI) {
            var byteString, mimestring;
            if (dataURI.split(',')[0].indexOf('base64') !== -1) {
                byteString = atob(dataURI.split(',')[1]);
            } else {
                byteString = decodeURI(dataURI.split(',')[1]);
            }
            mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var content = new Array();
            for (var i = 0; i < byteString.length; i++) {
                content[i] = byteString.charCodeAt(i);
            }
            return new Blob([new Uint8Array(content)], {
                type: mimestring
            });
        },
        openPhotoSwipe(item) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var items = [];
            if (item.width) {
                items.push({
                    src: item.src,
                    w: 640,
                    h: item.height * 640 / item.width
                });
            }
            if (items.length <= 0) return;
            var options = {
                index: 1,
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };

            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        },
        imgwh(ob) {
            ob.style = {};
            var that = this;
            var tImg = new Image;
            tImg.onload = function() {
                that.imgload(tImg, ob);
            };
            tImg.src = ob.src;
        },
        imgload(tImg, ob) {
            var that = this;
            var w = tImg.naturalWidth;
            var h = tImg.naturalHeight;
            ob.width = w;
            ob.height = h;
            var backgroundSizex = "100%";
            var backgroundSizey = "100%";
            var backgroundPos = "";
            // if (w <= h) {
            //     backgroundSizey = "auto";
            //     var endh = h * that.h3width / w;
            //     backgroundPos = "0 " + ((that.h3width - endh) / 2) + "px";
              
               
            // } else {
            //     backgroundSizey = "auto";
            //     var endh = h * that.h3width / w;
            //     backgroundPos = "0 " + ((that.h3width - endh) / 2) + "px";
            //     // backgroundSizex = "auto";
            //     // var endw = w * that.h3width / h;
            //     // backgroundPos = ((that.h3width - endw) / 2) + "px" + " 0";
            // }
            ob.style = {
                backgroundImage: "url(" + ob.src + ")",
                // backgroundSize: backgroundSizex + " " + backgroundSizey,
                // backgroundPosition: backgroundPos
            };
        },
        uploadimage(form, bf, pr) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState < 4) {
                        return;
                    }
                    if (xhr.status < 400) {
                        var ret = JSON.parse(xhr.responseText);
                        ret.status = xhr.status;
                        ret.statusText = xhr.statusText;
                        if (bf) {
                            bf(ret);
                        }
                    } else {
                        var err = JSON.parse(xhr.responseText);
                        err.status = xhr.status;
                        err.statusText = xhr.statusText;
                        if (bf) {
                            bf(err);
                        }
                    }
                };
                xhr.upload.addEventListener('progress', function(e) {
                    if (pr) {
                        pr(e);
                    }
                }, false);
                xhr.open("post", "upload", true);
                xhr.onload = function() {};
                xhr.send(form);
            } catch (e) {
                console.log(e);
            }
        },
        enter(val) {
            var newicon = val
            this.comment += newicon
        },
        getissue() {
            this.onlylook = '1'
            this.mycomment = false;
            this.allcomment = true;
            api.getissue(this, {
                tourist_id: this.actInfo.id,
                id: this.id,
                open_id: this.Info.openid
            }, (back) => {
                if (back && back.resCode === '000000') {

                    this.posterId = back.repBody.openid
                    console.log(this.posterId)

                    var list = back.repBody;
                    list.createTime = Datautils.format(new Date(list.createTime), 'yyyy-MM-dd HH:mm:ss');
                    list.imgUrl = list.imgUrl && list.imgUrl.split(';') || '';
                    //替换表情
                    list.share = Datautils.formatEmoij(list.share)
                    list.share = list.share.split('\n')
                        //图片
                    list.showimages = [];
                    if (list.imgUrl && list.imgUrl.length > 0) {
                        var len = list.imgUrl.length;
                        for (var j = 0; j < len; j++) {
                            list.showimages[j] = {
                                src: list.imgUrl[j],
                                style: ''
                            };
                            this.imgwh(list.showimages[j]);
                        }
                    }
                    //遍历帖子的评论
                    if (Datautils.isEmptyObject(list.firstList)) {
                        this.nocomment = true;
                    } else {
                        this.nocomment = false;
                        list.firstList.forEach((value) => {
                            // console.log(value)
                            value.createTime = Datautils.format(new Date(value.createTime), 'yyyy-MM-dd HH:mm');

                            //替换评论里的表情
                            value.comment = Datautils.formatEmoij(value.comment)

                            value.secondList.forEach(item => {
                                item.createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm');
                                //替换评论里的表情
                                item.comment = Datautils.formatEmoij(item.comment)
                                item.thirdList.forEach(item => {
                                    item.createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm');
                                    item.comment = Datautils.formatEmoij(item.comment)
                                })
                            })


                        })
                    }


                    this.postdetails = list;
                    this.posttopdetails = list;
                    console.log(list)
                    console.log(1)
                } else {
                    // this.$dispatch('handle_server_error', back);
                }
            })
        },
        //查看楼主的参与
        lookposter() {
            this.onlylook = '2'
            this.allcomment = false;
            this.mycomment = true;
            api.gethost(this, {
                tourist_id: this.actInfo.id,
                id: this.id,
                openid: this.Info.openid,
                host_openid: this.posterId //发帖人openid
            }, (back) => {
                if (back && back.resCode === '000000') {
                    // var otherlist = back.repBody;
                    // this.posterId = back.repBody.openid
                    // console.log(this.posterId)

                    var otherlist = back.repBody;
                    // otherlist.createTime = Datautils.format(new Date(otherlist.createTime), 'yyyy-MM-dd HH:mm:ss');
                    // otherlist.imgUrl = otherlist.imgUrl && otherlist.imgUrl.split(';') || '';
                    // //替换表情
                    // otherlist.share = Datautils.formatEmoij(otherlist.share)
                    //     //图片
                    // otherlist.showimages = [];
                    // if (otherlist.imgUrl && otherlist.imgUrl.length > 0) {
                    //     var len = otherlist.imgUrl.length;
                    //     for (var j = 0; j < len; j++) {
                    //         otherlist.showimages[j] = {
                    //             src: otherlist.imgUrl[j],
                    //             style: ''
                    //         };
                    //         this.imgwh(otherlist.showimages[j]);
                    //     }
                    // }
                    //遍历帖子的评论
                    if (Datautils.isEmptyObject(otherlist.firstList)) {
                        this.nocomment = true;
                    } else {
                        this.nocomment = false;
                        otherlist.firstList.forEach((value) => {
                            // console.log(value)
                            value.createTime = Datautils.format(new Date(value.createTime), 'yyyy-MM-dd HH:mm');

                            //替换评论里的表情
                            value.comment = Datautils.formatEmoij(value.comment)

                            value.secondList.forEach(item => {
                                item.createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm');
                                //替换评论里的表情
                                item.comment = Datautils.formatEmoij(item.comment)
                                item.thirdList.forEach(item => {
                                    item.createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm');
                                    item.comment = Datautils.formatEmoij(item.comment)
                                })
                            })


                        })
                    }


                    this.postdetails.firstList = otherlist.firstList;
                }else {
                    // this.$dispatch('handle_server_error', back);
                }
            })
        },
        //对帖子评论
        sendComment() {
            if(this.comment == ''){
                this.$dispatch('loading', {text: '评论不能为空!', show: true, duration: 2000});
                return;
            }
            if (this.isClick) {
                return;
            }
            var that = this;
            // that.publishing = '发表中'
            that.$dispatch('loading', {name:'comment',text: '发表评论中', show: true, duration: 20*1000});
            that.isClick = true;
            api.addComment(this, {
                comment: this.comment, //评论内容
                tourist_id: this.actInfo.id, //主题id
                dirff_id: '1', //状态 评论传1
                floor: '0', //回复主贴传0
                target_id: '0', //回复主贴传0
                iss_id: this.id, //帖子id
                iss_openid: this.posterId, //发帖者openid
                reply_openid: this.Info.openid, //评论者openid
            }, (back) => {
                if (back.resCode == '000000') {
                    that.$dispatch('cancelloading', 'comment');
                    this.clear();
                    this.tanchu = false;
                    this.Isay = true;
                    this.getissue();
                    that.isClick = false;
                }else {
                    this.$dispatch('handle_server_error', back);
                    that.isClick = false;
                }
            })
        },
        clear() {
            this.comment = ''
            this.text = ''
        },
        //对评论点赞
        contentpin(item) {
            console.log(item)
            api.addtimes(this, {
                iss_id: this.postdetails.id, //帖子id
                tourist_id: this.viewid, //主题id
                iss_openid: this.postdetails.openid, //发帖者openid
                dirff_id: "3", //评论点赞,传3
                floor: "1", //传1
                reply_openid: this.Info.openid, //点赞人openid
                target_id: item.id, //传评论id
                UUID: item.uUID
            }, (back) => {
                if (back.resCode == '000000') {
                    if (back.repBody === 1) {
                        //未点赞状态
                        item.praiseCommentStatus = 1;
                        item.commentPraise++;
                    } else if (back.repBody === 0) {
                        //已点赞
                        item.praiseCommentStatus = 1;
                    }
                }
            })
        },
        discuss(item, index) {
            console.log(item)
            this.Isay = false;
            this.plpl.$set(index, true);
            this.placeholderText = '回复' + item.replyName + ':';
            this.argued = item;
        },
        //对评论进行评论
        huifuComment(index) {
            console.log(this.argued)
            if(this.comment == ''){
                // alert('评论不能为空!')
                this.$dispatch('loading', {text: '评论不能为空!', show: true, duration: 2000});
                return;
            }
            if (this.isClick) {
                return;
            }
            var that = this;
            that.$dispatch('loading', {name:'comment',text: '发表评论中', show: true, duration: 20*1000});
            that.isClick = true;
            api.addComment(this, {
                comment: this.comment, //评论内容
                tourist_id: this.viewid, //主题id
                dirff_id: '1', //状态 评论传1
                floor: "10", //对评论进行评论传0
                target_id: this.argued.id, //回复评论传评论id
                iss_id: this.id, //帖子id
                // iss_openid: this.posterId, //发帖者openid
                iss_openid: this.argued.replyOpenid, //对方openid
                reply_openid: this.Info.openid, //评论者openid
                UUID: this.argued.uUID
            }, (back) => {
                if (back.resCode == '000000') {
                    that.$dispatch('cancelloading', 'comment');
                    this.clear();
                    this.tanchu = false;
                    this.Isay = true;
                    this.getissue();
                    this.plpl.$set(index, false)
                    that.isClick = false;
                }else{
                    that.isClick = false;
                    this.$dispatch('handle_server_error', back);
                }
            })
        },
        //对帖子点赞
        like() {
            var that = this;
            api.addtimes(this, {
                iss_id: this.postdetails.id, //帖子id
                tourist_id: this.viewid, //主题id
                iss_openid: this.postdetails.openid, //发帖者openid
                "dirff_id": "2", //帖子点赞,传2
                "floor": "0", //传0
                "reply_openid": this.Info.openid, //点赞人openid
                "target_id": "0" //传0

            }, (back) => {
                if (back.resCode == '000000') {
                    if (back.repBody === 1) {
                        //未点赞状态
                        this.postdetails.praiseStatus = 1;
                        this.postdetails.praiseCount++;
                    } else if (back.repBody === 0) {
                        //已点赞
                        this.postdetails.praiseStatus = 1;
                    }
                }

            })
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
                    // backgroundSize: backgroundSizex + " " + backgroundSizey,
                    // backgroundPosition: backgroundPos
                };

            };
            tImg.src = ob.src;
        },
        delmodel(options) {

            this.delStatus.showMsg = true;
            this.temp = options;
        },
        del() {
            var d = this.temp;
            api.delcomment(this, {
                id: d.obj.id, //评论id
                status: '-1',
                tourist_id: d.obj.touristId, //主题id    
            }, (back) => {
                if (back.resCode == '000000') {
                    this.delStatus.showMsg = false;

                    switch (d.type) {
                        case 1:
                            this.postdetails.firstList.$remove(d.obj);
                            break;
                        case 2:
                            this.postdetails.firstList[d.first].secondList.$remove(d.obj);
                            break;
                        case 3:
                            this.postdetails.firstList[d.first].secondList[d.second].thirdList.$remove(d.obj);
                            break;
                    }
                }
            })
        },
        //关闭弹窗
        delbtn() {
            this.delStatus.showMsg = false;
        },
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
.showImgs .img-top > div {
    width: 100%;
    height:360px;
    background-size: 100%;
}
</style>
