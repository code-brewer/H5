<template>
    <div class="chat" v-el:wrap>
        <!-- 主体界面 -->
        <div class="content">
            <scroll :bottom-height="btnHeight" :scroller.sync="scroller">
                <ul style="position: absolute;bottom: 0;width: 100%;height: auto;">
                    <li v-for="item in list" :class="item.cls">
                        <img :src="item.headImg" class="head-img">
                        <span class="text" v-if="item.isText">{{{item.messages}}}</span>
                        <span class="img" v-else>
                            <img :src="item.messages" @touchstart="touchstart" @touchend="enlarge($event, item)">
                        </span>
                        <span class="uname">{{item.uname}}</span>
                    </li>
                </ul>
                <ul class="hide-ul">
                    <li v-for="item in list" :class="item.cls">
                        <img :src="item.headImg" class="head-img">
                        <span class="text" v-if="item.isText">{{{item.messages}}}</span>
                        <span class="img" v-else>
                            <img :src="item.messages">
                        </span>
                        <span class="uname">{{item.uname}}</span>
                    </li>
                </ul>
            </scroll>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <div class="more" @click="isMore = !isMore"></div>
            <input type="text" class="input" @keyup="check" @blur="checkInput('blur')" @focus="checkInput('focus')" v-model="text" v-el:input>
            <div class="btns">
                <!-- <div class="text-btn" @click="sendText" @focus="refresh" @blur="refresh"></div> -->
                <div class="img-btn" v-show="!isSendText" @click="selectImg"></div>
                <div class="text-btn" v-show="isSendText" @click="sendText"></div>
            </div>
        
        </div>
        <div class="moreContent" transition="more" v-show="isMore">
            <ul>
                <li v-for="item in moreData" :class="{'money-icon': item.type == '数钱', 'red-icon': item.type == '红包'}" v-link="{path: (item.type == '数钱' ? '/money' : '/weChatRed')}">
                    <span>{{item.type}}</span>
                </li>
                <li class="my-record" v-link="{path: '/myRecord'}"><span>我的记录</span></li>
            </ul>
            <a href="javascript:;" class="close" @click="isMore = false"></a>
        </div>
        <div class="fullMask" v-show="isPreview" transition="preview" @click="hidePreview">
            <img :src="previewImg" :class="{center: isCenter}">
        </div>
    </div>
</template>
<script>
    import scroll from '../../src/scroll.vue'
    import socket from '../../utils/websocket.js'
    import api from '../../api/wapIndex.js'
    import wxUtil from '../../utils/wx.js'
    export default {
        components: {
            scroll
        },
        data() {
            return {
                btnHeight: '0',
                scroller: {},
                isSendText: false, //是否发送文字
                isMore: false, //加号，显示更多活动状态
                text: '', //输入文本信息
                previewImg: '#', //预览图片url
                isPreview: false, //是否显示预览图片
                isCenter: false, //预览图片是否居中
                touch: {
                    x: '',
                    y: ''
                },
                moreData: [], //更多--数钱、红包、我的记录
                list: [],
                scrollTopTimer: null,
                scrollTopCount: 0,
                _socket: {},
                nick: '', //当前用户昵称
                isWxConfig: false, //微信签名成功
                listen: null,
                root: this.$root,
                connectCount: 0
            }
        },
        ready() {
            document.querySelector('.content').addEventListener('touchmove', e => { e.preventDefault(); this.$els.input.blur(); }, false);

            this.obtainJssdk();

            this.selectPluByMoid();

            this.socket();

            this.getUserInfo();

            this._listen();

            // window.onbeforeunload = () => {
            //     console.log('chat')
            //     clearInterval(this.listen);
            //     this._socket&&this._socket.close();
            // }

        },
        beforeDestroy() {
            clearInterval(this.listen);
            // this._socket&&this._socket.close();
        },
        methods: {
            _listen() {
                this.listen = setInterval(() => {
                    // console.log(this._socket)
                    if (!this._socket) {
                        this.socket();
                    }
                }, 5000);
            },
            checkInput(type) {
                setTimeout(() => {
                    this.refresh();
                }, 500);
                if (type === 'focus') {
                    this.isMore = false;
                    this.scrollTopTimer = setInterval(() => {
                        if (this.scrollTopCount === 10) {
                            clearInterval(this.scrollTopTimer);
                            this.scrollTopCount = 0;
                        }
                        this.scrollTopCount++;
                        document.body.scrollTop = document.body.scrollHeight;
                    }, 100);
                } else {
                    this.check();
                }
            },
            /**
             * 刷新页面
             */
            refresh() {
                this.$nextTick(() => {
                    this.scroller.refresh();
                    var el = document.querySelector('.scroller li:nth-child(' + (this.list.length) + ')');
                    this.scroller.scrollToElement(el, 100, null, null);    
                })
            },
            /**
             * 微信签名
             */
            obtainJssdk() {
                api.obtainJssdk(this, {jsurl: basePath + 'wap.jsp'}, back => {
                    if (back.resCode === '000000') {
                        wxUtil.config(back.repBody, () => {
                            this.isWxConfig = true;
                        });

                    }
                })
            },
            /**
             * 发送图片
             */
            selectImg() {
                var self = this;
                if (this.isWxConfig) {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                
                            self.uploadImg(localIds);
                        }
                    });
                } else {
                    this.$dispatch('showTip', '微信签名失败');
                }
            },
            /**
             * 上传图片
             */
            uploadImg(localIds) {
                var self = this;
                var localId = localIds.pop();
                wx.uploadImage({
                    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        self.uploadFileByMediaId(serverId, function() {
                            if (localIds.length > 0) {
                                self.uploadImg(localIds);
                            }
                        })  
                    }
                });
            },
            /**
             * 上传图片到本地服务器
             */
            uploadFileByMediaId(mediaId, callback) {
                api.uploadFileByMediaId(this, {mediaId: mediaId}, back => {
                    if (back.resCode === '000000') {
                        var data = {};
                        data["from"] = uid;
                        data["fromName"] = this.nick;
                        data["to"] = 0;
                        data["type"] = 2;
                        data["text"] = back.repBody.fileUrl;
                        data["no"] = moid;

                        this._socket.send(window.JSON.stringify(data));

                        callback();
                    }
                })
            },
            /**
             * 查询当前用户信息
             */
            getUserInfo() {
                api.getUserInfo(this, {}, back => {
                    if (back.resCode === '000000') {
                        this.nick = back.repBody.nick;
                    } else {
                        this.$dispatch('showTip', back.resMsg, back.resCode);
                    }
                })
            },
            /**
             * 查询主题插件
             */
            selectPluByMoid() {
                api.selectPluByMoid(this, {}, back => {
                    if (back.resCode === '000000') {
                        this.moreData = back.repBody.filter(item => {
                            return item.type !== '抽奖';
                        })
                    } else {
                        this.$dispatch('showTip', back.resMsg, back.resCode);
                    }
                })
            },
            /**
             * 监听socket数据
             */
            socket() {
                // this.list = [];
                var self = this;
                this.connectCount++;
                if (this.connectCount > 30) {
                    return;
                }
                if (this.root.socket) {
                    console.log('close-chat')
                    this.root.socket.close();
                }
                // this.root.isClosed = false;
                this._socket = socket.socket();
                this.root.socket = this._socket;
                this._socket.onmessage = function(data) {

                    data = window.JSON.parse(data.data);


                    if (data.type !== 3) {
                        var cls = data.from === +uid ? 'own' : 'other',
                            isText = '';

                        if (data.type === 1 || data.type === 2) {
                            isText = data.type === 1 ? true : false;
                            var text = window.JSON.parse(data.text);
                            self.list.push({
                                cls: cls,
                                headImg: data.fromHeadimg,
                                messages: isText ? text.messages : file_downloda_url + text.messages,
                                isText: isText,
                                enlarge: false,
                                id: text.id,
                                uname: data.fromName
                            })
                            if (!isText) {
                                var img = new Image();
                                img.src = file_downloda_url + text.messages;
                                img.onload = function() {
                                    self.refresh();
                                }
                            }
                        } else if (data.type === 4) {
                            var text = window.JSON.parse(data.text);
                            if (self.list.length > 0) {
                                let id = self.list[self.list.length - 1].id,
                                    index = 0;
                                for(var i in text) {
                                    if (text[i].id === id) {
                                        index = ++i;
                                        break;
                                    }
                                }
                                text.splice(0, index);
                            }
                            
                            text.forEach(item => {
                                isText = item.type === 1 ? true : false;
                                cls = item.usid === +uid ? 'own' : 'other';
                                self.list.push({
                                    cls: cls,
                                    headImg: item.headimg,
                                    messages: isText ? item.messages : file_downloda_url + item.messages,
                                    isText: isText,
                                    enlarge: false,
                                    id: item.id,
                                    uname: item.uname
                                })
                                if (!isText) {
                                    var img = new Image();
                                    img.src = file_downloda_url + item.messages;
                                    img.onload = function() {
                                        self.refresh();
                                    }
                                }
                            })
                        }

                        self.refresh();
                    } 
                }

                this.reconnect();
            },
            /**
             * 监听意外关闭时重连socket
             */
            reconnect() {
                if (this._socket) {
                    this._socket.onclose = (e) => {
                        console.log('已关闭chat');
                        // this.root.isClosed = true;
                        this._socket = null;
                        if (e.code !== 1000) {
                            this.socket();
                        }
                    }
                    this._socket.onerror = () => {
                        this.socket();
                    }
                } else {
                    this.socket();
                }
            },
            /**
             * 检测是否发送文字
             * 
             */
            check() {
                this.isSendText = this.text ? true : false;
            },
            utf16toEntities(str) { 
                var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则 
                str = str.replace(patt, function(char){ 
                    var H, L, code; 
                    if (char.length===2) { 
                        H = char.charCodeAt(0); // 取出高位 
                        L = char.charCodeAt(1); // 取出低位 
                        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法 
                        return "&#" + code + ";"; 
                    } else { 
                        return char; 
                    } 
                }); 
                return str; 
            },
            /**
             * 发送文字
             */
            sendText() {
                if (this.text) {
                    var data = {};
                    data["from"] = uid; //发送者id
                    data["fromName"] = this.nick; //发送送者昵称
                    data["to"] = 0; //接受者id,群发值为0
                    /**
                     * 消息类型：1文本消息；2图文消息；3系统指令（客户端不展示消息，执行某个指令操作）
                     * operat 操作指令：当type = 3才会有该值
                     * 1、活动开启
                     * 2、活动结束
                     * 3、保存用户游戏得分
                     * 4、查询用户排名；当operat ＝ 4时，text值为json字符串
                     * 5、红包信息
                     * 6、签到信息
                     */
                    data["type"] = 1;
                    data["text"] = this.utf16toEntities(this.text); //发送内容
                    data["no"] = moid; //群号

                    this._socket.send(window.JSON.stringify(data));

                    // this.list.push({
                    //     cls: 'own',
                    //     headImg: 'image/wap/head-img.png',
                    //     text: this.text,
                    //     isText: true,
                    //     enlarge: false
                    // })

                    this.text = '';
                    this.check();
                    this.$els.input.focus();
                }
            },
            touchstart(e) {
                let touch = e.changedTouches[0];
                this.touch.x = touch.clientX;
                this.touch.y = touch.clientY;
            },
            /**
             * 预览图片
             * @param  {element} e    元素节点
             * @param  {json} item 当前对象
             *
             */
            enlarge(e, item) {
                let touch = e.changedTouches[0];
                if (touch.clientX === this.touch.x && touch.clientY === this.touch.y) {
                    if (this.isWxConfig) {
                        wx.previewImage({
                            current: item.messages, // 当前显示图片的http链接
                            urls: [item.messages] // 需要预览的图片http链接列表
                        });
                    } else {
                        let img = new Image(),
                            contentHeight = this.$els.wrap.offsetHeight;
                        img.src = item.messages;
                        img.onload = () => {
                            let ratio = img.width / 640;
                            let height = img.height * ratio;
                            if (height > contentHeight) {
                                this.isCenter = false;
                            } else {
                                this.isCenter = true;
                            }
                            this.previewImg = item.messages;
                            this.isPreview = true;
                        }
                    }
                }
            },
            /**
             * 收起预览图片
             * 
             */
            hidePreview() {
                document.body.scrollTop = 0;
                setTimeout(() => {
                    this.isPreview = false;
                },0)
            }
        }
    }
</script>
<style lang="scss" scoped>

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(540deg);
        }
    }
    .chat {
        height: 100%;
        padding-bottom: 100px;
        background: #ececec;
        overflow-y: auto;
        box-sizing: border-box;
        .content {
            position: relative;
            height: 100%;
            .hide-ul {
                visibility: hidden;
            }
            li {
                position: relative;
                min-height: 80px;
                margin: 30px auto;
                .head-img {
                    position: absolute;
                    top: 0;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
                > span {
                    position: relative;
                    display: inline-block;
                }
                .text {
                    display: inline-block;
                    max-width: 70%;
                    min-height: 40px;
                    margin-top: 30px;
                    padding: 20px;
                    line-height: 1.5;
                    font-size: 26px;
                    letter-spacing: 3px;
                    border-radius: 8px;
                    border: 1px solid #d6d6d6;
                    background: white;
                    word-break: break-all;
                    word-wrap: break-word;
                    &:after {
                        content: '';
                        position: absolute;
                        top: 20px;
                        width: 20px;
                        height: 20px;
                        border: 1px solid transparent;
                        background: white;
                        transform: rotate(45deg);
                    }
                }
                .img {
                    width: 30%;
                    margin-top: 30px;
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                    transition: all .3s linear;
                    vertical-align: middle;
                    // &:before {
                    //     content: '';
                    //     display: inline-block;
                    //     height: 100%;
                    //     vertical-align: middle;
                    // }
                    img {
                        display: inline-block;
                        width: 100%;
                        border-radius: 8px;
                        vertical-align: middle;
                        &.enlarge {
                            position: fixed;
                            top: 50%;
                            left: 0;
                            width: 100%;
                            transform: translate(0, -50%);
                        }
                    }
                }
                .uname {
                    font-size: 18px;
                    color: #666;
                }
                &.other {
                    padding-left: 120px;
                    .head-img {
                        left: 20px;
                    }
                    .text {
                        &:after {
                            left: -11px;
                            border-left-color: #d6d6d6;
                            border-bottom-color: #d6d6d6; 
                        }
                    }
                    .uname {
                        position: absolute;
                        top: 0;
                        left: 125px;
                    }
                }
                &.own {
                    padding-right: 120px;
                    text-align: right;
                    .text {
                        text-align: left;
                        &:after {
                            right: -11px;
                            border-top-color: #d6d6d6;
                            border-right-color: #d6d6d6; 
                        }
                    }
                    .head-img {
                        right: 20px;
                    }
                    .uname {
                        position: absolute;
                        top: 0;
                        right: 125px;
                    }
                }
            }
        }
        .footer {
            position: relative;
            width: 100%;
            height: 100px;
            margin-bottom: -100px;
            padding: 0 120px;
            background: #419ce9;
            box-sizing: border-box;
            z-index: 10;
            .more {
                position: absolute;
                top: 50%;
                left: 30px;
                width: 62px;
                height: 61px;
                margin-top: -30px;
                background: url(../../image/wap/icons1.png) no-repeat;
                &:active {
                    animation: rotate .5s linear;
                }
            }
            input {
                width: 100%;
                height: 68px;
                line-height: 68px;
                margin-top: 15px;
                padding: 15px;
                border-radius: 10px;
                color: #666;
                font-size: 26px;
                background: white;
                box-sizing: border-box;
            }
            .btns {
                > div {
                    position: absolute;
                    top: 50%;
                    right: 30px;
                    width: 62px;
                    height: 60px;
                    margin-top: -30px;
                    background-image: url(../../image/wap/icons1.png);
                    background-repeat: no-repeat;
                }
            }
            .img-btn {
                background-position: 0 -61px;
                input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    z-index: 3;
                }
            }
            .text-btn {
                background-position: 0 -120px;
            }
        
        }
        .footer-fixed {
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .more-transition {
            transition: all .3s ease-out;
            bottom: 100px;
        }
        .more-enter {
            bottom: -100px;
        }
        .more-leave {
            display: none;
        }
        .moreContent {
            position: fixed;
            left: 0;
            width: 100%;
            padding: 80px 0 30px;
            // background: #a4a4a4;
            background: rgba(164, 164, 164, .9);
            z-index: 9;
            ul {
                font-size: 0;
                li {
                    position: relative;
                    display: inline-block;
                    width: 33.2%;
                    padding-top: 130px;
                    padding-bottom: 20px;
                    border-radius: 10px;
                    text-align: center;
                    color: #333;
                    &:after {
                        content: '';
                        position: absolute;
                        top: 20px;
                        left: 50%;
                        width: 97px;
                        height: 97px;
                        margin-left: -48.5px;
                        border-radius: 40px;
                        background: url(../../image/wap/icons2.png) no-repeat;
                        box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
                    }
                    &.money-icon:after {
                        background-position: 0 0;
                    }
                    &.red-icon:after {
                        background-position: 0 -97px;
                    }
                    &.my-record:after {
                        background-position: 0 -194px;
                    }
                    span {
                        display: block;
                        font-size: 26px;
                    }
                    &:active {
                        &:after {
                            box-shadow: none;
                        }
                    }
                }
            }
            .close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 62px;
                height: 60px;
                background: url(../../image/wap/icons1.png) 0 -180px no-repeat;
            }
        }
        .fullMask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 100;
            img {
                display: block;
                width: 100%;
                &.center {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translate(0, -50%);
                }
            }
        }
        .preview-transition {
            transition: all .3s linear;
            transform: scale(1);
        }
        .preview-enter,.preview-leave {
            transform: scale(.4);
        }
    }
</style>