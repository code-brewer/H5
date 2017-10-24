<template>
    <div :class="direct">
        <router-view transition="slide"></router-view>
        <load :show="isLoad"></load>
    </div>
</template>
<script>
import load from '../components/load.vue'
import wxUtil from '../dist/wx'
import api from '../api/index'
import reg from '../utils/htmlReg.js'
export default {
    components: {
        load
    },
    data() {
        return {
            barTitle: '花贝妈妈',
            routeHistory: [],
            direct: 'right-left',

            loadingdata: {
                loadings: []
            },
            isLoading: true,

            tipModal: {
                show: false
            },
            isLoad: false,
            loadTime: '',
            share: {
                href1: location.href.split('index1')[0],
                href: location.href.split('#')[0],
                title: '@你 一起玩“赚”花妈的秘密花园',
                sharetext: '想“一毛不拔”兑礼品？免费“幸运大抽奖”？来“秘密花园”都能满足你！',
                sharehref: '',

                shareicon: location.href.split('#')[0] + "images/logo.png",
                shareBasePath: ''
            },
            personalInfo: {},
            date: {}
        }
    },
    created() {
        this.getSign();
        this.getPersonalInfo();
        // this.isAttetion();
    },
    ready() {
        var that = this;
        this.$router.afterEach(function(transition) {
            //share
            var to = transition.to.path,
                height = '';
            that.updateHref();
            //统计pv uv
            // that.addPvUv({
            //     path: to
            // });

            if (to.match(reg)) {
                height = '100%';
            }
            that.$el.style.height = height;
            if (to.match(/presentList/)) {
                that.$el.style.overflow = 'inherit';
            }

            var index = that.routeHistory.indexOf(to);
            //左右切换滑动效果
            if (index > -1) {
                that.routeHistory = that.routeHistory.slice(0, index + 1);
                that.direct = 'left-right';
            } else {
                that.routeHistory.push(to);
                that.direct = 'right-left';
            }

        });
        this.$on('title', (title) => {
            document.title = title;
            this.barTitle = title;
        });

        this.$on('loading', () => {
            this.isLoad = true;
            this.loadTime = setTimeout(() => {
                this.isLoad = false;
            }, 4000);
        })

        this.$on('cancelLoading', () => {
            clearTimeout(this.loadTime);
            this.isLoad = false;
        })

        this.$on('tipModal3', () => {
            this.tipModal.show = true;
        })

        this.$on('user_info', (data) => {
            this.date = data
        })

        //分享组团
        // this.$on('shareAct', (share) => {
        //  share.sharehref = this.share.href+'weixin/authorizeGroupRedirect?passurl='+encodeURIComponent(this.share.href)+'&shareOpenid='+openId+'&path='+share.sharehref;
        //  share.title = '@你 一起玩“赚”花妈的秘密花园';
        //  setTimeout(()=>{
        //      wxUtil.share(share.title, share.sharetext, share.sharehref, share.shareicon, (type,state)=>{

        //      });
        //  },300);
        // })

        //监听改变分享文案事件
        this.$on('updateShare', (share) => {
            // console.log(share)
            this.updateHref(share);
        })
        this.share.shareBasePath = this.share.href + 'weixin/authorizeRedirect?passurl=' + encodeURIComponent(this.share.href) + '&shareOpenid=' + openId + '&path=';

        this.share.shareBasePath2 = this.share.href1 + 'weixin/authorizeRedirect?passurl=' + encodeURIComponent(this.share.href) + '&shareOpenid=' + openId + '&path=';

        this.$on('statistics', (options) => {
            this.addPvUv(options);
        })

        //share
        //this.getSign();
        // this.isAttetion();
    },
    methods: {
        addPvUv(options) {
            // this.$dispatch('statistics', options);
            api.grouppvuv(this, options, (back) => {});
        },
        getPersonalInfo() {
            api.getPersonalInfo(this, {}, back => {
                if (back.resCode === '0' && back.repBody.list) {
                    this.personalInfo = back.repBody.list[0];
                    window.localStorage.setItem('head_img', this.personalInfo.head_img);
                    window.localStorage.setItem('name', this.personalInfo.nick);
                }
            });
        },
        getSign() {
            api.getSign(this, {
                jsurl: this.share.href
            }, (back) => {

                if (back.resCode == "0") {
                    wxUtil.config(back.repBody, true, () => {
                        this.updateHref();
                    });
                }
            });
        },
        updateHref(share) {
            // console.log(share)
            if (share) {
                let href = location.href;
                if (href.indexOf('groupDetails') > -1 || href.indexOf('groupQRCode') > -1) {
                   share.title = share.title;
                    share.sharetext = '一起拼团吧';
                    share.sharehref = this.share.shareBasePath + share.sharehref;
                    share.shareicon = location.href.split('#')[0] + "images/logo2.png";
                    console.log(share.sharehref)
                }else{
                    share.sharehref = this.share.shareBasePath + share.sharehref;
                }
            } else {
                share = this.share;
                let href = location.href;
                if (href.indexOf('invitationCard') > -1 || href.indexOf('recommend4') > -1) {
                    share.title = '快点进来拿贝壳币，一大波精美礼品等你来兑换。';
                    share.sharetext = '不花一分钱，免费兑礼品！';
                    share.sharehref = this.share.shareBasePath + 'recommend4/' + openId;
                    share.shareicon = location.href.split('#')[0] + "images/logo2.png";
                    console.log(share.sharehref)
                } else if (href.indexOf('recommend') > -1) {
                    share.title = '邀你加入21天晨起打卡计划，成为更好的自己';
                    share.sharetext = '坚持打卡贝壳币送不停，挑战10个周期拿iPhone 7终极大奖！';
                    share.sharehref = this.share.shareBasePath + 'recommend2/' + openId;
                } else if (href.indexOf('present') > -1) {
                    share.title = '@你一起玩“赚”花妈的贝壳币商城';
                    share.sharetext = '爱疯7、宝宝玩具、个护美妆等各种丰富好礼，不花一分钱，免费兑回家！';
                    share.sharehref = this.share.shareBasePath + 'presentList';
                } else if (href.indexOf('newSignIn') > -1) {
                    share.title = (this.personalInfo.nick || '花贝妈妈') + '邀你加入21天晨起打卡计划，成为更好的自己';
                    share.sharetext = '坚持打卡贝壳币送不停，挑战10个周期拿iPhone 7终极大奖！';
                    share.sharehref = this.share.shareBasePath2 + '/newSignIn/plan/' + openId;
                    share.shareicon = location.href.split('#')[0] + "images/morning-share.jpg";
                } else {
                    share.sharehref = this.share.shareBasePath + location.href.split('#')[1].replace('!/', '');
                }
            }
            if (location.href.indexOf('teamsIndex') > -1 || location.href.indexOf('#!/date') > -1) {

                wxUtil.hide();
            } else {
                wxUtil.share(share.title, share.sharetext, share.sharehref, share.shareicon, (type, state) => {});
            }

        },
        isAttetion() {
            api.isAttetion(this, {}, (back) => {
                if (back.resCode === '0') {
                    if (back.repBody === false) {
                        var href;
                        if (location.href.indexOf('newSignIn') > -1) {
                            href = '/newSignIn/notConcerned/' + this.$route.params.id;
                        } else {
                            href = '/recommend2/' + this.$route.params.id;
                        }
                        this.$router.replace({
                            path: href
                        });
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss">
.view-wrap {
    > div {
        &:first-child {
            height: auto;
            overflow: auto;
        }
    }
}

.modal-open {
    > div {
        &:first-child {
            height: 100%;
            overflow: hidden;
        }
    }
}

.main {
    min-height: 100%;
    background: -webkit-linear-gradient(top, #f7f7f7, #c3e8e8);
    background: -moz-linear-gradient(top, #f7f7f7, #c3e8e8);
    background: linear-gradient(top, #f7f7f7, #c3e8e8);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
