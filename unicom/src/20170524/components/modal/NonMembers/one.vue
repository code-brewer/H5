<template>
    <Modal :show="show" @close="close">
        <div class="non-members one" slot="content">
            <h3>会员权益</h3>
            <p class="mes">很抱歉,这是会员专享活动,成为沃音乐会员立即参与
                <br/><span>可<span class="red">100%中奖</span>哦～</span>
            </p>
            <img src="../../../images/non-members-one-img1.png" style="display: block; width: 80%; margin: 0 auto;">
            <div class="row">
                <div class="label">手机号码：</div>
                <input type="text" v-model="mobile" placeholder="请输入联通手机号码">
            </div>
            <div class="row row2">
                <div class="label">验<span>证</span>码：</div>
                <input type="text" v-model="code">
                <a href="javascript:;" class="get-code" :style="{background: disabled ? '#999' : 'blue'}" @click="getCode">{{ disabled ? time + 's' : '获取'}}</a>
            </div>
            <div class="center">
                <btn @click.native="login" class="openvip">立即开通，限时免费</btn>
            </div>
            <div class="notice">
                <div class="title">温馨提示：</div>
                <p>1、全国4G用户会员资费：6元/月（本月免费，送炫铃功能）</p>
                <p>2、2G/3G炫铃用户会员资费：1元/月（本月免费）</p>
                <p>3、2G/3G非炫铃用户会员资费：6元/月，即由炫铃功能费（5元/月，本月开始收取）+会员服务费（1元/月，本月免费）构成</p>
                <p>4、仅限开通当月免费，次月将正常收费</p>
                <p>5、已是会员用户输入手机及验证码，不产生重复订购，可直接参与抽奖</p>
            </div>
        </div>
    </Modal>
</template>
<script>
    import utils from '../utils.js'
    import btn from '../../button/button.vue'
    import api from '../../../api/'
    import {
        ajaxHandler,
        validate
    } from '../../../utils/'
    export default {
        mixins: [utils],
        components: {
            btn
        },
        data() {
            return {
                mobile: '',
                code: '',
                disabled: false,
                time: 60,
                loginDisabled: false
            }
        },
        computed: {
            loginStyle() {
                return this.loginDisabled ? {
                    'background': '#999'
                } : '';
            }
        },
        methods: {
            /**
             * [开通会员入口]
             */
            handleClick() {
                /** 统计开通会员按钮点击 */
                this.$parent.$emit('addOperLog', {
                    type: 'button',
                    buttonName: '开通会员',
                    operate: 'order',
                    cls: 'openvip'
                });
                /** 判断是否有炫铃能力 */
                this.$parent.$emit('showLoading');
                api.findUserBasInfo(this, {
                    accessToken: this.$parent.accessToken
                }, back => {

                    if (back.resCode === '0') { //炫铃未开通
                        //订购炫铃能力
                        this.qryUserBasInfo();
                    } else if (back.resCode === '10001') {
                        //开通会员
                        this.openMemberByNet();
                    } else {
                        this.$parent.$emit('hideLoading');
                        this.$parent.$emit('showError', back);
                    }

                })
            },
            /**
             * [开通炫铃功能]
             */
            qryUserBasInfo() {
                api.qryUserBasInfo(this, {
                    aid: aid,
                    source: source
                }, back => {
                    // 需求：不管炫铃是否开通成功，继续开通会员
                    this.openMemberByNet();
                })
            },
            /**
             * [开通会员]
             */
            openMemberByNet() {
                api.openMemberByNet(this, {
                    aid: aid,
                    source: source
                }, back => {
                    this.$parent.$emit('hideLoading');
                    if (back.resCode === '0') {
                        this.$emit('showModal', 'NonMembersTwo', this.options);
                    } else if (back.resCode && back.resCode.match(/^(100002|803009|803011|803012|803013|803032)$/)) {
                        this.$parent.$emit('showError', back);
                    } else {
                        this.$emit('showModal', 'error');
                    }
                })
            },
            /**
             * 获取手机验证码
             */
            getCode() {
                if (this.disabled) {
                    return;
                }
                if (!this.mobile) {
                    this.$parent.$emit('showSnackbar', '请输入手机号码');
                    return;
                } else if (!validate.isMob(this.mobile)) {
                    this.$parent.$emit('showSnackbar', '请输入正确的手机号码格式');
                    return;
                }

                this.disabled = true;
                let timer = null;

                /** 60s倒计时 */
                timer = setInterval(() => {
                    if (this.time === 0) {
                        clearInterval(timer);
                        this.time = 60;
                        this.disabled = false;
                        return;
                    }
                    this.time--;
                }, 1000);

                /** 发送短信验证码 */
                api.sendLoginCode(this, {
                    mobile: this.mobile
                }, back => {
                    ajaxHandler.call(this, back);
                })
            },
            /**
             * [登录]
             */
            login() {
                let error;
                if (this.loginDisabled) {
                    return;
                }
                if (!this.mobile) {
                    error = '请输入手机号码';
                } else if (!validate.isMob(this.mobile)) {
                    error = '请输入正确的手机号码格式';
                }
                if (!this.code) {
                    error = '请输入验证码';
                }
                if (error) {
                    this.$parent.$emit('showError', error);
                    return;
                }

                this.$parent.$emit('showLoading');
                this.loginDisabled = true;
                window.localStorage.setItem('loginMobile', this.mobile);
                api.login(this, {
                    mobile: this.mobile,
                    code: this.code,
                    source: source
                }, back => {
                    this.$parent.$emit('hideLoading');
                    this.loginDisabled = false;
                    ajaxHandler.call(this, back, () => {
                        this.$parent.$emit('loginSuccess');
                        let isMember = this.$parent.checkMember();
                        if (!isMember) {
                            this.handleClick();
                            return;
                        }
                        this.close(false);
                        if (this.options.source === 'myPrize') {
                            this.$parent.$emit('showMyPrize');
                        }
                        if (this.options.source === 'lottery') {
                            this.$parent.$emit('showSnackbar', '您已是会员，可直接参与抽奖哦~');
                        }
                    });
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .one {
        h3 {
            padding-top: 0;
        }
        .mes {
            font-size: 26px;
            text-align: center;
            > span {
                font-weight: 700;
                font-size: 40px;
            }
        }
        .notice {
            width: 90%;
            margin: 0 auto;
            font-size: 11px;
            line-height: 1.5;
            .title {
                color: #989897;
                font-size: 15px;
                font-weight: 700;
            }
            p {
                color: #989897;
            }
        }
        .row {
            position: relative;
            width: 90%;
            margin: 0 auto;
            padding: 10px 0 10px 170px;
            font-size: 34px;
            box-sizing: border-box;
            .label {
                position: absolute;
                top: 10px;
                left: 0;
                line-height: 70px;
                span {
                    padding: 0 17px;
                }
            }
            input {
                width: 100%;
                padding-left: 20px;
                line-height: 66px;
                border: 2px solid black;
                box-sizing: border-box;
                outline: none;
                font-size: inherit;
                box-sizing: border-box;
                background: #eeede8;
            }
        }
        .get-code {
            position: absolute;
            top: 10px;
            right: 0;
            display: inline-block;
            padding: 3px 50px;
            color: white;
            font-size: 34px;
            font-weight: 700;
            text-align: center;
            line-height: 60px;
            border-radius: 40px;
            background: blue;
            box-shadow: 0 6px 0 black;
            transition: all .1s linear;
            &:active {
                transform: translate(0, 6px) translateZ(0);
                box-shadow: none;
            }
        }
        .row2 {
            padding-right: 180px;
        }
    }
</style>
