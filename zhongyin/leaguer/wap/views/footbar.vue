<template>
    <nav class="footer-menu">
        <ul>
            <li class="menu-item" v-link="{path: '/hyjs'}"><i class="icon icon-hyjs"></i><span class="text">会员介绍</span></li>
            <li class="menu-item" v-link="{path: '/kthy'}"><i class="icon icon-kthy"></i><span class="text">开通会员</span></li>
            <li class="menu-item" v-link="{path: '/home'}"><i class="icon icon-hdsy"></i><span class="text">活动首页</span></li>
            <li class="menu-item" v-link="{path: '/hdzb'}"><i class="icon icon-hdzb"></i><span class="text">活动直播</span></li>
            <li class="menu-item" @click="gotoMusic"><i class="icon icon-wyy"></i><span class="text">沃音乐网站</span></li>
        </ul>
    </nav>
</template>
<script>
    import api from '../api/index.js'
    export default {
        data() {
            return  {

            }
        },
        ready() {

        },
        methods: {
            gotoMusic() {
                // 添加访问日志
                api.addAcceptLog(this, {type: 'signin', source: 'woyinyue'}, (back)=>{})
                submitStatInfo(base_url+':all', base_url+':all', 'bottom_home_btn', 'click', '', '', 'wap', window.channle, 'Phone', 'http://box.10155.com/Club/portal/hindex.do?act=idx', '', 'aid=1')
                window.location.href = "http://box.10155.com/Club/portal/hindex.do?act=idx"
            }
        }
    }
</script>
<style lang="scss">
    @import '../css/px2rem.scss';
    .footer-menu {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        ul {
            margin: 0;
            padding: 0;
        }
        .menu-item {
            float: left;
            display: inline-block;
            padding-top: px2rem(50px);
            padding-bottom: px2rem(20px);
            width: 20%;
            background: url(../images/btn_menu_bg.png) no-repeat top left;
            background-size: 100% auto;

            &.v-link-active {
                .text {
                    color: #ee0f37;
                }
            }

            .icon {
                display: block;
                margin: px2rem(10px) auto 0;
                width: px2rem(60px);
                height: px2rem(60px);
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;

                &.icon-hyjs {
                    background-image: url(../images/icon_hyjs.png);
                }
                &.icon-kthy {
                    background-image: url(../images/icon_kthy.png);
                }
                &.icon-hdsy {
                    background-image: url(../images/icon_hdsy.png);
                }
                &.icon-hdzb {
                    background-image: url(../images/icon_hdzb.png);
                }
                &.icon-wyy {
                    background-image: url(../images/icon_wyy.png);
                }
            }

            .text {
                display: block;
                padding-top: px2rem(10px);
                text-align: center;
                font-size: px2rem(36px);
            }
        }
    }
</style>