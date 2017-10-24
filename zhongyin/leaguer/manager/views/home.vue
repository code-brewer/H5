<template>
    <div class="header">
        <h1 class="title">会员活动后台管理系统</h1>
        <div class="welcome">
            <span>欢迎您 {{name}}</span> <a @click="loginout" style="cursor:pointer;">退出</a>
        </div>
    </div>
    <div class="nav">
        <div class="activity-mag" v-link="{path: '/activity'}">活动系统</div>
       
        <li v-for="menu in leftMenus" @click="setIndexFun($index)" class="nav-li navlist" :class="{hasChild: menu.submenus, open: menu.showSub, active:this.setIndex==$index}">
            <accordion-menu :is-open="false">
                <b slot="top">
                    <span  class="alltitle" >{{menu.name}}</span>
                </b>
                <ul slot="content" v-if="menu.submenus">
                    <li v-for="sub in menu.submenus" class="li-a">
                        <a v-link="{path: sub.url}">
                            <span>{{sub.name}}</span>
                        </a>
                    </li>
                </ul>
            </accordion-menu>
        </li>
    </div>
    <div class="content">
        <router-view></router-view>
    </div>
</template>
<script>
import jQuery from 'jquery'
import AccordionMenu from '../components/AccordionMenu.vue'
export default {
    components: {
        AccordionMenu
    },
    data() {
        return {
            setIndex:-1,
            name: 'XXXq',
            showNav: false,
            leftMenus: [{
                name: '数据管理',
                icon: 'fa-shopping-cart',
                url: '/topic',
                submenus: [{
                        name: '.会员活动',
                        icon: 'fa-tasks',
                        url: '/topic'
                    }

                ]
            }],
            leftMenuActive: null,
        }
    },
    created() {

    },
    ready() {
        var self = this;
        // self.leftMenuActive = window.localStorage.getItem('lujing')
    },
    methods: {
        setIndexFun(i){
            this.setIndex=i;
        },
        loginout() {
            sessionStorage.removeItem('isLogin');
            this.$route.router.go({
                path: "/login"
            });
        },
        next(index) {
            var $slide = jQuery('.navlist');
            jQuery($slide[index]).next().animate({
                'display': 'block'
            }, 500)
        },
        checkLogin() {

            if (window.sessionStorage.getItem('isLogin')) {
                this.name = window.sessionStorage.getItem('isLogin');
                //登录了
            } else {
                //未登录
                this.$route.router.go({
                    path: "/login"
                });
            }
        }
    },
    route: {
        data: function(transition) {
            this.checkLogin();
        }
    },

}
</script>
<style lang="scss" scoped>
.header {
    background: url(../images/head.jpg) no-repeat;
    background-size: 100% 100%;
}
</style>
 <!-- <ul>
            <li v-for="menu in leftMenus" class="nav-li">
                <div class="navlist" @click="next($index)">{{menu.name}}</div>
                <ul style="display: block">
                    <li v-for="sub in menu.submenus" :class="{active: leftMenuActive==sub.url}" class="li-a">
                        <a v-link="{path: sub.url}">
                            <span>{{sub.name}}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul> -->
        <!-- //          leftMenus: [
            //              {
            //      name: '活动管理',
            //      icon: 'fa-shopping-cart',
            //      url: '/prize', 
            //      isopen:true,  
            //      submenus: [{
            //          name: '.签到活动',
            //          icon: 'fa-tasks',
            //          url: '/activityMag'
            //      }

            //      ]
            //  },
            //              {
            //      name: '数据管理',
            //      icon: 'fa-pie-chart',
            //      url: '/data',
            //      isopen:true,
            //      submenus: [{
            //          name: '.签到活动',
            //          icon: 'fa-pie-chart',
            //          url: 'topic'
            //      }]
            //  },
            //  {
            //      name: '系统设置',
            //      icon: 'fa-pie-chart',
            //      url: '/data',
            //      isopen:true,
            //      submenus: [{
            //          name: '.密码修改',
            //          icon: 'fa-pie-chart',
            //          url: '/system'
            //      }]
            //  }
            // ], -->