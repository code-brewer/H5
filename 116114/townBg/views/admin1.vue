<template>
    <!-- 顶部导航栏 -->
    <header class="heading">
        <div class="title"><span class="ddd">丨</span>后台管理系统 <span style="float:right;font-size: 18px;" @click="logout">退出</span></div>
    </header>
    <!-- 主区域 -->
    <div id="page-container" class="clearfix">
        <nav id="page-leftbar">
            <div style="position: absolute; width: 150px;background-color:#e4c934;height:100%;border-right:1px solid #e3d5ba;">
                <div class="top" @click="menu(1)"><i class="i"></i>景区管理</div>
                <div class="nav-list">
                    <a style="display:block" class="menuList" href="javascript:location.reload();" v-link="{path:'/creatviews'}" :class="this.bg1?'bg':''"><i class="menu1"></i>新建景区</a>
                    <a class="menuList" v-link="{path:'/postlist'}" :class="this.bg2?'bg':''"><i class="menu2"></i>上下线管理</a>
                </div>
                <!-- <ul>
                        <li :class="{active: this.$route.path == list.url }"  v-for="list in lists" class="listMenu" v-link="{path:list.url}" v-if="user_type == 1">
                            <i :style="{'background': 'url('+list.icon+') 15% 50% no-repeat'}" class="iconLeft"></i>
                            <a> {{list.name}}</a>
                        </li>
                        <li :class="{active: this.$route.path == list.url }"  v-for="list in items" class="listMenu" v-link="{path:list.url}" v-if="user_type == 2">
                            <i :style="{'background': 'url('+list.icon+') 15% 50% no-repeat'}" class="iconLeft"></i>
                            <a> {{list.name}}</a>
                        </li>
                        <li :class="{active: this.$route.path == list.url }"  v-for="list in newitems" class="listMenu" v-link="{path:list.url}" v-if="user_type == 3">
                            <i :style="{'background': 'url('+list.icon+') 15% 50% no-repeat'}" class="iconLeft"></i>
                            <a> {{list.name}}</a>
                        </li>
                    </ul> -->
            </div>
        </nav>
        <div id="page-content" class="clearfix" style="margin-left:150px;">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import AccordionMenu from '../components/bootstrap/AccordionMenu.vue'
import Modal from '../components/bootstrap/Modal.vue'
import Dropdown from '../components/bootstrap/Dropdown.vue'

import {
    router
} from '../index'
import api from '../api'


export default {
    components: {
        AccordionMenu,
        Modal,
        Dropdown
    },
    data() {
        return {
            currSubmenus: [],

            progress: false,
            minHeight: null,

            userInfo: null,

            alertModal: {
                show: false,
                title: '提示',
                msg: '',
                btnText: '确定'
            },
            confirmModal: {
                show: false,
                title: '提示',
                msg: '',
                btnText: '确定',
                fn() {}
            },
            username: 'wenmin',
            lists: [{
                name: '2/3G开户管理',
                icon: '../carserve/src/m/images/kaihu.png',
                url: '/accountMag'
            }, {
                name: '2/3G销户管理',
                icon: '../carserve/src/m/images/cexiao.png',
                url: '/accountCancel'
            }, {
                name: '4G开户管理',
                icon: '../carserve/src/m/images/4g.png',
                url: '/accountFour'
            }, {
                name: '开销户结果管理',
                icon: '../carserve/src/m/images/result.png',
                url: '/accountResult'
            }, {
                name: '会员管理',
                icon: '../carserve/src/m/images/member.png',
                url: '/member'
            }, {
                name: '违章查询',
                icon: '../carserve/src/m/images/weizhang.png',
                url: '/illegalQuery'
            }, {
                name: '信息管理',
                icon: '../carserve/src/m/images/xin.png',
                url: '/message'
            }, {
                name: '数据查询',
                icon: '../carserve/src/m/images/data.png',
                url: '/data'
            }, {
                name: '二次营销号码提取',
                icon: '../carserve/src/m/images/num.png',
                url: '/secondaryMarketing'
            }],
            items: [{
                name: '2/3G开户管理',
                icon: '../carserve/src/m/images/kaihu.png',
                url: '/accountMag'
            }, {
                name: '2/3G销户管理',
                icon: '../carserve/src/m/images/cexiao.png',
                url: '/accountCancel'
            }, {
                name: '4G开户管理',
                icon: '../carserve/src/m/images/4g.png',
                url: '/accountFour'
            }, {
                name: '开销户结果管理',
                icon: '../carserve/src/m/images/result.png',
                url: '/accountResult'
            }, {
                name: '会员管理',
                icon: '../carserve/src/m/images/member.png',
                url: '/member'
            }, {
                name: '违章查询',
                icon: '../carserve/src/m/images/weizhang.png',
                url: '/illegalQuery'
            }, {
                name: '信息管理',
                icon: '../carserve/src/m/images/xin.png',
                url: '/message'
            }, {
                name: '二次营销号码提取',
                icon: '../carserve/src/m/images/num.png',
                url: '/secondaryMarketing'
            }],
            newitems: [{
                name: '违章查询',
                icon: '../carserve/src/m/images/weizhang.png',
                url: '/illegalQuery'
            }],
            userData: {},
            personData: [],
            user_type: ''

        }
    },
    ready() {
        // console.log(2)
        this.username = localStorage.getItem('username')
        this.user_type = localStorage.getItem('user_type')


    },
    route: {
        data: function(transition) {
            this.checkLogin();
        }
    },
    router(transition) {

        //登录成功后加入登录的标识
        // sessionStorage.setItem('isLogin',true);



        this.minHeight = (window.innerHeight - 145) + 'px';
        var that = this;



        if (this.checkLogin()) {
            this.userInfo = eval('(' + localStorage.getItem('isLogin') + ')');
        }

        router.beforeEach((transition) => {
            if (this.checkLogin()) {
                transition.next()
            }

        })

        router.afterEach(function(transition) {
            that.leftMenuActive = transition.to.path;

            for (var i = 0; i < that.leftMenus.length; i++) {
                if (that.leftMenuActive.indexOf(that.leftMenus[i].url) > -1) {
                    that.currSubmenus = that.leftMenus[i].submenus;
                }
            };
        });

    },
    methods: {

        logout() {
            //var that = this;
            sessionStorage.removeItem('isLogin');
            this.$route.router.go({
                path: "/login"
            });


        },

        getPathName() {
            var name = '';
            for (var i = 0; i < this.leftMenus.length; i++) {
                if (this.leftMenuActive.indexOf(this.leftMenus[i].url) > -1) {
                    name = this.leftMenus[i].name;
                }
            }
            return name;
        },
        checkLogin() {

            if (sessionStorage.getItem('isLogin')) {
                //登录了
                // console.log("denglule");
            } else {
                //未登录
                // console.log("未登录")
                this.$route.router.go({
                    path: "/login"
                });
            }
            // return login;
        }
    }
}

function checkLogin() {
    var login = true;
    if (document.cookie.indexOf('admin_token') < 0 || !localStorage['ams_user_info']) {
        location.href = basePath + 'login.jsp';
        localStorage.removeItem('ams_user_info');
    } else {
        login = true;
    }

    return login;
}
</script>
<style scoped>
#page-container {
    position: relative;
}

.accordion-transition {
    -webkit-transition: all .2s ease-in;
    -moz-transition: all .2s ease-in;
    -ms-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    transition: all .2s ease-in;
}

.accordion-enter,
.accordion-leave {
    opacity: 0;
    color: $brand-positive;
}

.progress-transition {
    -webkit-transition: opacity .8s ease-in-out;
    -moz-transition: opacity .8s ease-in-out;
    -ms-transition: opacity .8s ease-in-out;
    -o-transition: opacity .8s ease-in-out;
    transition: opacity .8s ease-in-out;
}

.progress-transition .bar {
    width: 75%;
    -webkit-animation-duration: .5s;
    -moz-animation-duration: .5s;
    -o-animation-duration: .5s;
    animation-duration: .5s;
}

.progress-enter {
    opacity: .6;
}

.progress-leave {
    opacity: 0;
}

.progress-enter .bar {
    width: 0;
}

.progress-leave .bar {
    width: 100%;
}

.view-transition {
    -webkit-transition: opacity .3s ease-in;
    -moz-transition: opacity .3s ease-in;
    -ms-transition: opacity .3s ease-in;
    -o-transition: opacity .3s ease-in;
    transition: opacity .3s ease-in;
}

.view-enter,
.view-leave {
    opacity: 0;
}

.view-leave {
    display: none;
}

.navbar-header span {
    line-height: 50px;
}

.heading {
    height: 80px;
    background-color: #fff;
    padding: 0;
    line-height: 80px;
    position: relative;
}

.title {
    font-size: 26px;
    font-family: '黑体';
    color: #000;
    padding-left: 150px;
    padding-right: 20px;
    background: url(../images/116114logo.png) 18px 16px no-repeat;
    border-bottom: 1px solid #e3d5ba;
}

.listMenu {
    border: solid #e3d5ba;
    border-width: 0 0px 1px 0;
    /*border:1px solid #e7e7e7;*/
    box-sizing: border-box;
    line-height: 40px;
    height: 40px;
    padding-left: 40px;
    position: relative;
    border-left: 1px solid #e3d5ba;
}

.listMenu.active {
    background-color: #fdebdf;
}

.listMenu:first-child {
    border-top: 1px solid #e3d5ba;
    /*border-left: 1px solid #e3d5ba;*/
}

.listMenu a {
    color: #ff8b2f;
    text-decoration: none;
}

.listMenu:hover {
    background-color: #fdebdf;
}

.topRight {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 25px;
}

.topRight li {
    margin: 0 15px;
    float: left;
}

.topRight li a {
    color: #faa354;
}

.iconLeft {
    display: inline-block;
    display: block;
    position: absolute;
    left: 16px;
    top: 11px;
    width: 20px;
    height: 15px;
}


/**/

.heading {
    height: 80px;
    background-color: #15caae;
    padding: 0;
    line-height: 80px;
    position: relative;
}

.title {
    font-size: 26px;
    font-family: '黑体';
    color: #fff;
    padding-left: 110px;
    background: url(../images/116114logo.png) 18px 16px no-repeat;
    border-bottom: 1px solid #e3d5ba;
}
</style>
