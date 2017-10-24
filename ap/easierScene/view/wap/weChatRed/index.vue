<template>
    <div class="we-chat-red">
        <a href="javascript:;" class="back-chat" v-link="{path: '/'}">返回聊天</a>
        <div class="wait-start" v-if="isWait">
            <h2>红包未开启</h2>
            <p>请关注大屏幕</p>
        </div>
        
        <div class="red-packet" v-show="status === 2 && !isWait">
            <img src="../../../image/wap/weChatRed.png" :class="{shake: isAnimating}" @click="openredpack">
        </div>
        <div class="maskBg" v-show="countDownShow">
            <count-down :style="{background: '#ff7800'}" :show.sync="countDownShow" :count="second"></count-down>
        </div>
        
        <!-- 遮幕 -->
        <div class="mask" v-show="isMask"></div>
        <!-- /遮幕 -->
        <!-- 没抢到红包 -->
        <div class="modal error" v-show="!isHas&&isMask">
            <a href="javascript:;" class="close" @click="isMask = false"></a>
            <p class="text">还差一点就抢到了！</p>
        </div>
        <!-- /没抢到红包 -->
        <!-- 抢到红包 -->
        <div class="modal success" v-show="isHas&&isMask">
            <a href="javascript:;" class="close" @click="isMask = false" v-link="{path: '/weChatList/' + this.aid}"></a>
            <h2>{{money}}元红包</h2>
            <p class="text">恭喜你，抢到了{{money}}元红包！</p>
        </div>
        <!-- /抢到红包 -->
    </div>
</template>
<script>
    import api from '../../../api/wapIndex.js'
    import countDown from '../../../component/wap/countDown.vue'
    import socket from '../../../utils/websocket.js'
    export default {
        components: {
            countDown
        },
        data() {
            return {
                isWait: false,
                second: 5,
                status: '', //红包主题的活动状态
                isAnimating: false, //拆红包动画效果活动状态 
                timer: null, //延时器
                money: '', //抢到的红包金额
                isHas: false, //是否抢到红包
                isMask: false, //是否弹出遮幕
                isOpening: true, //禁止连续重复拆红包
                timer: null,
                countDownShow: false,
                _socekt: null,
                aid: '',
                nonum: '',
                listen: null,
                root: this.$root,
                connectCount: 0
            }
        },
        created() {
            this.socket();
            this.getUserInfo();
            this._listen();
            // window.onbeforeunload = () => {
            //     console.log('weChatRed')
            //     clearInterval(this.listen);
            //     this._socket&&this._socket.close();
            // }
        },
        beforeDestroy() {
            // window.onbeforeunload = null;
            clearInterval(this.listen);
            // this._socket&&this._socket.close();
        },
        methods: {
            _listen() {
                this.listen = setInterval(() => {
                    if (!this._socket) {
                        this.socket();
                    }
                }, 5000);
            },
            /**
             * 监听socket数据
             */
            socket() {
                var self = this,
                    bool = false,
                    timer = null;
                this.connectCount++;
                if (this.connectCount > 30) {
                    return;
                }
                if (this.root.socket) {
                    console.log('close-wechatred')
                    this.root.socket.close();
                }
                // this.root.isClosed = false;
                this._socket = socket.socket();
                this.root.socket = this._socket;
                this._socket.onmessage = function(data) {

                    clearTimeout(timer);

                    data = window.JSON.parse(data.data);

                    // console.log(data)

                    if (data.type === 3) {
                        bool = true;
                        switch(data.operat) {
                            case 1:
                                var json = window.JSON.parse(data.text),
                                    second = Math.ceil((json.currentTime - json.starttime) / 1000);
                                self.aid = json.aid;
                                self.isWait = false;
                                self.selectInfoByAid();
                                if (second < 5) {
                                    setTimeout(() => {
                                        self.countDownShow = true;
                                        self.second = 5 - (second < 0 ? 0 : second);
                                    }, 0);
                                }
                                break;
                            case 2:
                                clearTimeout(self.timer);
                                self.isWait = true;
                                break;
                        }
                    } else {
                        if (!bool) {
                            self.isWait = true;
                            bool = true;
                        }
                    }
                }
                this.reconnect();
                timer = setTimeout(() => {
                    self.isWait = true;
                }, 100);
                    
                    
            },
            /**
             * 监听意外关闭时重连socket
             */
            reconnect() {
                if (this._socket) {
                    this._socket.onclose = (e) => {
                        console.log('已关闭');
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
             * 根据aid查询活动详情
             */
            selectInfoByAid() {
                api.selectInfoByAid(this, {aid: this.aid}, back => {
                    if (back.resCode === '000000') {
                        this.status = back.repBody.stauts;
                        if (this.status === 2) {
                            this.isOpening = false; //允许拆红包
                            this.nonum = back.repBody.nonum;
                        }
                        document.title = back.repBody.title;
                    } else {
                        this.$dispatch('showTip', back.resMsg, back.resCode);
                    }
                })
            },
            /**
             * 拆红包
             */
            openredpack() {

                if (this.isOpening) {
                    return;
                }
                this.isOpening = true;

                /*
                拆红包动画效果
                 */
                this.isAnimating = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.isAnimating = false;
                }, 500);
                /*
                拆红包 动画效果结束
                 */
                
                api.openredpack(this, {aid: this.aid}, back => {
                    if (back.resCode === '000000') {
                        this.money = back.repBody.money;
                        this.isHas = this.isMask = true;
                        
                    } else if (back.resCode === '300001') {
                        this.isMask = true;
                        this.isHas = false;
                    } else {
                        this.$dispatch('showTip', back.resMsg, back.resCode);
                    }

                    this.isOpening = false;
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
            }
        },
        events: {
            countDownEnd() {
                // console.log(1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @keyframes shake {
        0%,100% {
            transform: rotate(0deg);
        }

        10%,30%,50%,70%,90% {
            /*transform: translate3d(-10px,0,0)*/
            transform: rotate(3deg);
        }

        20%,40%,60%,80% {
            /*transform: translate3d(10px,0,0)*/
            transform: rotate(-3deg);
        }
    }
    .alert-sec-circle {
        stroke-dashoffset: 0;
        stroke-dasharray: 735;
        transition: stroke-dashoffset 1s linear;
    }
    .shake {
        animation: shake .5s;
    }
    .we-chat-red {
        position: relative;
        height: 100%;
        overflow: hidden;
        background: url(../../../image/wap/bg2.jpg) repeat-y;
        .maskBg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(../../../image/wap/bg2.jpg) repeat-y;
            z-index: 100;
        }
        .wait-start {
            position: absolute;
            top: 50%;
            left: 15%;
            width: 70%;
            height: 200px;
            margin-top: -100px;
            padding: 30px 0;
            text-align: center;
            color: white;
            border-radius: 10px;
            background: #ff7800;
            h2 {
                padding: 20px;
                padding-right: 0;
                font-size: 54px;
                font-weight: 400;
                color: inherit;
                letter-spacing: 20px;
            }
            p {
                padding-top: 10px;
                font-size: 34px;
                color: inherit;
            }
            .scale {
                animation: scale 1s infinite;
            }
        }
        .red-packet {
            position: absolute;
            top: 50%;
            left: 10%;
            width: 80%;
            -webkit-transform: translate(0, -50%);
            img {
                display: block;
                width: 100%;
            }
        }
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .8);
            z-index: 104;
        }
        .modal {
            position: absolute;
            top: 50%;
            left: 0;
            width: 640px;
            height: 420px;
            margin-top: -210px;
            z-index: 105;
            .text {
                position: absolute;
                left: 0;
                bottom: 25px;
                width: 100%;
                text-align: center;
                color: #d97c00;
                font-size: 26px;
            }
            .close {
                position: absolute;
                top: 0;
                right: 60px;
                width: 38px;
                height: 38px;
                background: url(../../../image/wap/weChat-close.png) no-repeat;
                z-index: 12;
            }
        }
        .error {
            background: url(../../../image/wap/weChat-error.png) no-repeat;
        }
        .success {
            h2 {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 40px;
                font-weight: 400;
                color: #ec4d35;
                line-height: 50px;
                margin-top: -45px;
            }
            background: url(../../../image/wap/weChat-success.png) no-repeat;
        }
    }
</style>