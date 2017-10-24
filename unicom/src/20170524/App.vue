<template>
    <div id="wrap" class="wrap" :style="wrapStyle">
        <!-- 置顶活动主题图 -->
        <div class="top_img">
            <div class="top"></div>
            <img src="./images/top-img.png" class="full_img img1" alt="音乐行动派1">
        </div>
        <!-- /置顶活动主题图 -->
        <img src="./images/logo.png" class="logo" alt="沃音乐">
        <img src="./images/rule-img.png" class="rule_img" alt="活动规则" @click="showModal('rule')">
        <div class="container" ref="container" :style="containerStyle">
            <!-- 半屏活动 -->
            <div class="half_img">
                <img src="./images/half-img.png" class="full_img" alt="">
            </div>
            <!-- /半屏活动 -->
            <!-- 转盘和中奖信息 -->
            <div class="wrap_content">
                <img src="./images/img1.png" class="full_img" alt="">
                <div class="lottery">
                    <img src="./images/lottery1.png" class="lottery_img" height="564" width="564" :style="lotteryStyle">
                    <img src="./images/pointer.png" class="pointer_img" height="212" width="212" @click="rotateLottery">
                </div>
                <div class="lottery_mes">
                    <img src="./images/my-prize.png" height="133" width="102" alt="我的奖品" class="my_prize" @click="showMyPrize">
                    <div class="con">
                        <div style="overflow: hidden;" ref="lotteryMes">
                            <ul ref="lotteryMes" :style="lotteryMesStyle">
                                <li v-for="item in lotteryMesList" :class="{deep_color: item.isDeepColor}">
                                    <p>用户{{item.mobile}}<span>抽中</span><span class="red">{{item.prize}}</span></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /转盘和中奖信息 -->
        </div>
        <!-- 温馨提示 -->
        <snackbar :options="snackbarOptions"></snackbar>
        <!-- loading -->
        <loading :show="isShowLoading"></loading>
        <!-- 弹窗 -->
        <component :is="currentModal" :show="isModalShow" @close="close" @showModal="showModal" :options="modalOptions"></component>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Modal from './components/modal/index.js'
    import snackbar from './components/snackbar'
    import loading from './components/loading/loading.vue'
    import {
        getTime,
        customClick,
        checkLogin,
        getCookie,
        ajaxHandler
    } from './utils'
    import api from './api/'
    import './css/style.scss'
    export default {
        mixins: [Modal, snackbar],
        components: {
            loading
        },
        data() {
            return {
                wrapStyle: {},
                containerStyle: {
                    transition: '',
                    transform: ''
                },
                lotteryStyle: {
                    transform: '',
                    transition: ''
                },
                lotteryMesStyle: {
                    transform: 'translate(0, 0) translateZ(0)'
                },
                lotteryMesList: [],
                rotateLotteryTimer: null,

                // loading-data
                isShowLoading: false,

                accessToken: ''
            }
        },
        mounted() {
            var self = this;
            // this.$nextTick(() => {
            // 	this.initScroll();
            // })
            /** 监听loading显示状态事件 */
            this.$on('showLoading', () => {
                this.isShowLoading = true;
            })
            this.$on('hideLoading', () => {
                this.isShowLoading = false;
            })

            /** 监听snackbar显示状态事件 */
            this.$on('showSnackbar', (text) => {
                this.snackbarOptions.show = true;
                this.snackbarOptions.text = text;
            })

            /** 处理接口返回失败数据 */
            this.$on('showError', (error) => {
                let text;
                if (Object.prototype.toString.call(error) === '[object Object]') {
                    text = error.resMsg || '';
                    if (error.resCode === '10003') {
                        text = '请重新登录';
                        this.showModal('login');
                    }
                } else if (typeof error === 'string') {
                    text = error;
                }
                text ? this.$emit('showSnackbar', text) : '';
            })

            /** 监听登录成功的事件 */
            this.$on('loginSuccess', () => {
                    this.loginSuccess();
                })
                /** 初始化触发检测是否登录 */
            if (checkLogin()) {
                this.loginSuccess();
            }
            this.getPrizeDrawResult();
            /** 监听调用我的奖品 */
            this.$on('showMyPrize', () => {
                this.showMyPrize();
            })

            /** 数据统计pv,uv */
            this.addOperLog({
                type: 'signin',
                operate: 'click'
            });
            /** 监听调用数据统计 */
            this.$on('addOperLog', (options) => {
                if (!options) {
                    return;
                }
                this.addOperLog(options);
            })
        },
        watch: {
            isModalShow(val) {
                this.setWrapStyle(val)
            },
            'snackbarOptions.show' (val) {
                this.setWrapStyle(val)
            }
        },
        methods: {
            /**
             * [弹窗时设置顶级容器为屏幕百分百]
             */
            setWrapStyle(flag) {
                if (flag) {
                    this.wrapStyle = {
                        height: '100%',
                        overflow: 'hidden'
                    }
                } else {
                    this.wrapStyle = {}
                }
            },
            /**
             * [手指拖动/离开屏幕时展示/收起半屏活动]
             */
            initScroll() {
                let _top = 0;
                let pageX = 0;
                let pageY = 0;

                function scroll(_this) {
                    let isMoved = null;
                    let endTime = getTime();

                    _this.$refs.container.addEventListener('touchstart', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        let target = e.target || e.srcElement;
                        isMoved = false;
                        pageX = e.touches[0].pageX;
                        pageY = e.touches[0].pageY;
                    }, false);
                    _this.$refs.container.addEventListener('touchmove', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        let y = 0;
                        let touches = e.touches[0];
                        let offsetX = touches.pageX - pageX;
                        let offsetY = touches.pageY - pageY;
                        let timestamp = getTime();

                        if (timestamp - endTime > 300 && (Math.abs(offsetX) < 10 && Math.abs(offsetY) < 10)) {
                            return;
                        }

                        isMoved = true;

                        y = _top + offsetY;

                        y = y >= 0 ? 0 : y;

                        _this.containerStyle.transition = '';
                        _this.containerStyle.transform = 'translate(0,' + y + 'px) translateZ(0)';
                    }, false);
                    _this.$refs.container.addEventListener('touchend', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        endTime = getTime();
                        if (!isMoved) {
                            customClick(e);
                        }
                        _top = -580;
                        _this.containerStyle.transition = 'transform .6s cubic-bezier(0.1, 0.57, 0.1, 1)';
                        _this.containerStyle.transform = 'translate(0,' + (_top) + 'px) translateZ(0)';

                    }, false);
                }
                scroll(this);
            },
            /**
             * [全部用户中奖信息展示]
             */
            getPrizeDrawResult() {
                let self = this,
                    y = 0;
                let count = 0;
                api.getPrizeDrawResult(this, {}, back => {
                    if (back.resCode === '0') {
                        if (back.repBody.length) {

                            this.lotteryMesList = back.repBody.map((item, index) => {
                                return {
                                    mobile: item.mobile,
                                    prize: item.pname,
                                    isDeepColor: index % 2 === 0 ? false : true
                                }
                            })

                        }
                        this.$refs.lotteryMes.style.height = Math.min(240, this.lotteryMesList.length * 80) + 'px';
                        this.lotteryMesList.length > 3 ? scroll() : '';
                    } else {
                        this.$emit('showError', back);
                    }
                })

                function scroll() {
                    y -= 2;
                    if (y <= -80) {
                        y = 0;
                        self.lotteryMesList.push(self.lotteryMesList.shift());
                    }
                    self.lotteryMesStyle.transform = 'translate(0, ' + y + 'px) translateZ(0)';
                    setTimeout(scroll, 60);
                }

            },
            /**
             * [获取抽奖次数]
             */
            getLotteryNum() {
                api.queEveryDay(this, {}, back => {
                    if (back.resCode === '0') {
                        /** 抽奖次数为0 */
                        if (back.repBody[0].player === '0') {
                            this.$emit('hideLoading');
                            this.showModal('MembersIsLottery');
                        } else {
                            this.lottery();
                        }
                    } else {
                        this.$emit('showError', back);
                    }
                })
            },
            /**
             * [开始抽奖]
             */
            lottery() {
                api.doLucky(this, {}, back => {
                    this.$emit('hideLoading');
                    if (back.resCode === '0') {
                        let data = back.repBody[0] || {};
                        /** 根据奖品计算转盘旋转角度 */
                        let angle;
                        switch (data.pname.match(/智能|耳机|星巴克|话费/)[0]) {
                            case '智能':
                                angle = 0;
                                break;
                            case '星巴克':
                                angle = 1;
                                break;
                            case '话费':
                                angle = 2;
                                break;
                            case '耳机':
                                angle = 3;
                                break;
                        }
                        if (angle === undefined) {
                            this.$emit('showError', '系统错误');
                            return;
                        }
                        this.lotteryStyle.transform = 'rotate(' + (2160 + (90 * angle + 45)) + 'deg)';
                        this.lotteryStyle.transition = 'transform 5s cubic-bezier(0.22, 0.61, 0.36, 1)';

                        this.rotateLotteryTimer = setTimeout(() => {
                            clearTimeout(this.rotateLotteryTimer);
                            this.rotateLotteryTimer = null;
                            this.lotteryStyle.transform = '';
                            this.lotteryStyle.transition = '';
                            this.lotterySuccess(data);
                        }, 5500);
                    } else {
                        this.$emit('showError', back);
                    }
                })
            },
            /**
             * [大转盘动画效果]
             */
            rotateLottery() {
                /** 统计抽奖按钮点击 */
                this.addOperLog({
                    type: 'button',
                    buttonName: '抽奖按钮',
                    operate: 'click',
                    cls: 'pointer_img'
                });
                /** 判断是否登录--true: 已登录 */
                if (checkLogin()) {
                    /** 会员 */
                    if (this.checkMember()) {
                        /** 获取抽奖次数 */
                        api.saveClearanceRecord(this, {
                            source: source
                        }, back => {
                            ajaxHandler.call(this, back, () => {
                                this.$emit('showLoading');
                                this.getLotteryNum();
                            })
                        });
                    } else {
                        this.showModal('NonMembersOne');
                    }
                } else {
                    this.showModal('NonMembersOne', {
                        source: 'lottery'
                    });
                }
            },
            /**
             * [展示抽中奖时的奖品]
             */
            lotterySuccess(data) {

                this.showModal('MembersSuccess', {
                    prizeName: data.pname,
                    prizeImg: data.imgurl,
                    gid: data.gid,
                    isInvented: data.types === '实物' ? false : true
                });

            },
            /**
             * [展示我的奖品]
             */
            showMyPrize() {
                /** 判断是否登录--返回true：已登录 */
                if (checkLogin()) {
                    /** 获取我的奖品信息 */
                    this.$emit('showLoading');
                    api.getMyPrizeDrawResult(this, {}, back => {
                        this.$emit('hideLoading');
                        ajaxHandler.call(this, back, () => {
                            /** 没有奖品信息 */
                            if (!back.repBody.length) {
                                this.showModal('myPrizeNone');
                            } else {
                                let data = back.repBody[0];
                                this.showModal('myPrizeSuccess', {
                                    prizeName: data.pname,
                                    prizeImg: data.imgurl,
                                    gid: data.gid,
                                    isInvented: data.types === '实物' ? false : true
                                })
                            }
                        })
                    })
                } else {
                    this.showModal('NonMembersOne', {
                        source: 'myPrize'
                    });
                }
            },
            /**
             * [登录成功]
             */
            loginSuccess() {
                this.accessToken = getCookie('cn.easier.wmpo.tone.accesstoken') || '';
            },
            /**
             * [检测用户是否会员]
             */
            checkMember() {
                let cookieVip = getCookie('cn.easier.wmpo.tone.user') || '';
                return cookieVip === '0000000000';
            },
            /**
             * [数据统计]
             */
            addOperLog(options) {
                let currenturl = window.location.href;
                let mobile = window.localStorage.getItem('loginMobile');
                submitStatInfo(currenturl, currenturl, options.cls || currenturl, options.operate, "", (mobile || ''), "WAP", "3000005217", "Phone", "");
                // api.addOperLog(this, {
                // 	aid: aid,
                // 	source: source,
                // 	type: options.type,
                // 	button_name: options.buttonName || ''
                // });
            }
        }
    }
</script>
<style>
    @import url(../css/base.css);
</style>
