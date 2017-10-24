<template>
    <div class="myCointxt main">
        <section class="texbody">
            <div class="formtxt">
                <div class="row">
                    <span><span style="text-align:center;">姓名</span></span>
                    <div>
                        <input type="text" placeholder="请输入您的姓名" v-model="options.uname.val" @input="setActive" @focus="options.uname.error = false">
                        <p class="error-text" v-show="options.uname.error">姓名不能为空</p>
                    </div>
                </div>
                <div class="row">
                    <span><span style="text-align:center;">电话</span></span>
                    <div>
                        <input type="text" placeholder="请输入您的电话" v-model="options.mobile.val" @input="setActive" @focus="options.mobile.error = false" maxlength="11">
                        <p class="error-text" v-show="options.mobile.error">{{mobileError}}</p>
                    </div>
                </div>
                <div class="row" style="height:220px;">
                    <span><span style="text-align:center;">地址</span></span>
                    <div>
                        <textarea class="texarea" placeholder="请输入您的地址" v-model="options.addr.val" @input="setActive" @focus="options.addr.error = false">
                        </textarea>
                        <p class="error-text" v-show="options.addr.error">地址不能为空</p>
                    </div>
                </div>
                <div class="btn">
                    <a href="javascript:;" :class="{active: active}" @click="submit">提交</a>
                </div>
            </div>
            <div>
                <p style="font-size:27px;color:#3ea4b0;line-height:65px;">活动结束两周内花妈会安排寄送,注意查收哦!</p>
                <p style="font-size:22px;color:#3ea4b0;text-align:left;">如有疑问,请在公众号对话框以 "客服+你的问题" 的格式将你的问题告诉花妈,花妈会争取尽快回复哒!</p>
            </div>
        </section>
    </div>
</template>
<script>
    import api from '../api'
    import util from '../utils'
    export default {
        created() {
            this.options.actid.val = window.localStorage.getItem('actid');
        },
        data() {
            return {
                options: {
                    actid: {
                        val: ''
                    },
                    uname: {
                        val: '',
                        error: false
                    },
                    mobile: {
                        val: '',
                        error: false
                    },
                    addr: {
                        val: '',
                        error: false
                    }
                },
                mobileError: '',
                active: false
            }
        },
        methods: {
            setActive() {
                var bool = false;
                for(let i in this.options){
                    if (!i.match(/actid/)) {
                        this.options[i].val !== '' && (bool = true);
                    }
                }
                bool ? this.active = true : this.active = false;
            },
            submit(e) {
                var self = e.srcElement || e.target,
                    bool = true,
                    options = {};
                if (self.className.indexOf('active') == -1) {
                    return false;
                }
                for(var i in this.options) {
                    options[i] = this.options[i].val;
                    if (i === 'actid') {
                        continue;
                    }
                    if (this.options[i].val == '') {
                        this.mobileError = '手机号码不能为空';
                        this.options[i].error = true;
                        bool = false;
                        break;
                    }
                    if (i === 'mobile') {
                        if (!util.validate.isMob(this.options[i].val)) {
                            this.mobileError = '手机号码格式不正确';
                            this.options[i].error = true;
                            bool = false;
                            break;
                        }
                    }
                }
                if (!bool) {
                    return false;
                }
                this.$dispatch('loading');
                api.getPrize(this, options, (back) => {
                    this.$dispatch('cancelLoading');
                    if (back.resCode == '0') {
                        this.$router.replace({path: '/teamsEnd'});
                    }
                })
            }
        }
    }
</script>
