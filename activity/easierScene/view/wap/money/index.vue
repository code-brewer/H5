<template>
    <div class="money-wrap">
        <a href="javascript:;" class="back-chat" v-link="{path: '/'}">返回聊天</a>
        <div class="wait-start" v-if="isWait">
            <h2>游戏未开始</h2>
            <p>请关注大屏幕</p>
        </div>
        <div class="mask" v-show="countDownShow">
            <count-down :style="{background: '#0c8496'}" :show.sync="countDownShow" :count="second"></count-down>
        </div>
        <div v-show="status === 2 && !isWait" style="height: 100%;">
            <div class="count">{{currNum}}</div>
            <slide-money :curr-num.sync="currNum" :state.sync="gameState"></slide-money>
        </div>
    </div>
</template>
<script>
import slideMoney from '../../../../src/templates/components/slide-money/slide-money.vue'
import api from '../../../api/wapIndex.js'
import countDown from '../../../component/wap/countDown.vue'
import socket from '../../../utils/websocket.js'
export default {
    components: {
        slideMoney,
        countDown
    },
    data() {
        return {
            currNum: 0, //游戏分数
            gameState: '1',
            status: '', //活动状态
            countDownShow: false, //开启倒计时
            _socekt: null,
            nick: '', //昵称
            timer: null, //推送游戏分数定时器
            aid: '', //活动id
            nonum: '', //活动轮数
            isWait: false, //等待游戏
            second: 5,
            listen: null,
            root: this.$root,
            connectCount: 0
        }
    },
    created() {
        this.getUserInfo();
        this.socket();
        this._listen();
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        // window.onbeforeunload = () => {
        //     console.log('money')
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
            this.isWait = false;
            this.connectCount++;
            if (this.connectCount > 30) {
                return;
            }
            if (this.root.socket) {
                console.log('close-money')
                this.root.socket.close();
            }
            // this.root.isClosed = false;
            this._socket = socket.socket();
            this.root.socket = this._socket;
            this._socket.onmessage = function(data) {
                
                clearTimeout(timer);

                data = window.JSON.parse(data.data);

                console.log(data)
                if (data.type === 3) {
                    bool = true;
                    switch(data.operat) {
                        case 1:
                            var json = window.JSON.parse(data.text),
                                second = Math.ceil((json.currentTime - json.starttime) / 1000);
                            self.aid = json.aid;
                            self.currNum = parseInt(json.score) || 0;
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
                            if (self.aid && self.nonum !== '') {
                                self.$router.go({path: '/moneyList/'+self.aid+'/'+self.nonum});
                            }
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
                    console.log('已关闭money');
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
                        this.nonum = back.repBody.nonum;
                        this.send(back.repBody.nonum);
                    }
                    document.title = back.repBody.title;
                } else {
                    this.$dispatch('showTip', back.resMsg, back.resCode);
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
         * 推送游戏分数
         */
        send(nonum) {
            if (this._socket) {
                clearTimeout(this.timer);
                var data = {};
                data["from"] = uid;
                data["fromName"] = this.nick;
                data["to"] = 0;
                data["type"] = 3;
                data["operat"] = 3;
                data["text"] = window.JSON.stringify({
                    aid: this.aid,
                    score: this.currNum,
                    types: '数钱',
                    lv: nonum
                });
                data["no"] = moid;
                this._socket.send(window.JSON.stringify(data));
                this.timer = setTimeout(() => {
                    this.send(nonum);
                }, 2000);
            }
        }
    },
    events: {
        countDownEnd() {
            // this.selectInfoByAid();
        }
    }
}
</script>
<style lang="scss">
@import '../../../../src/css/px2rem.scss';
.money-wrap {
	height: 100%;
	background: url(../../../image/wap/bg4.png) no-repeat;
    background-size: cover;
	overflow: hidden;
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(../../../image/wap/bg4.png) no-repeat;
        background-size: cover;
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
        background: #0c8496;
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
    }
	.count {
		position: absolute;
		top: 120px;
		left: 50%;
		width: 285px;
		height: 126px;
		margin-left: -142.5px;
		text-align: center;
		font-size: 60px;
		color: #333;
		line-height: 126px;
		background: url(../../../image/wap/count.png) no-repeat;
	}
	.wap-slide-money {
		position: relative;
        width: 100%;
        height: px2rem(1313px);
        top: 40%;
        bottom: -40%;
	}
    .moneys {
        
        > .money,
        > .money-bg {
            position: absolute;
        }
        > .money-bg {
        	display: none;
        }
        > .money-bg, > .money {
            background-image: url(../../../image/wap/money1.png);
            background-size: 100%;
            width: px2rem(550px);
            height: px2rem(1313px);
            z-index: 0;
            left: 50%;
            bottom: 0;
            margin-left: px2rem(-550px/2);
        }
        > .money {
            z-index: 2;
            &:nth-child(2) {
                z-index: 4;
            }
        }
        .swipe-up-transition {
            transition: all 0.3s ease;
            transform: translate3d(0, 0, 0);
            &.swipe-up-leave {
                transform: translate3d(0, -150%, 0);
                z-index: 5;
            }
        }
    }
}
</style>
