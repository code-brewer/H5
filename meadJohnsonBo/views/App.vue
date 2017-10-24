<template>
    <div class="out" style="position: relative">
        <!-- <router-view transition="slide"></router-view> -->
        <div class="MJohnson-BGheader">
            <!-- 顶部 -->
            <a href="javascript:;" class="MJohnson-logo"></a>
            <h1>美赞臣管理后台</h1>
            <a href="" class="UserName">用户名:{{userInfo.nick}}</a>
            <a href="" class="set">设置</a>
            <a href="" class="logout" @click="logout">退出</a>
        </div>
        <div class="system-body clearfix">
            <!-- 数据部分 -->
            <!-- 菜单 -->
            <div class="nav">
                <ul>
                    <li class="UserManager" :class="{active: currentMenu == 'user'}" @click="currentMenu = 'user'" v-link="{path:'/'}">
                        <span class="UserMag-logo"></span>
                        <a class="UserMag">用户管理</a>
                    </li>
                    <li class="CloseOrder-li" :class="{active: currentMenu == 'order'}" v-link="{name:'hexiaoDetail'}">
                        <!--优化修改 v-link="{name:'hexiaoDetail'}" -->
                        <span class="CloseOrder-logo"></span>
                        <a class="CloseOrder">核销订单</a>
                    </li>
                    <li class="CloseOrder-li" :class="{active: currentMenu == 'conMag'}" v-link="{path: '/contentManage'}">
                        <!--优化修改 v-link="{name:'hexiaoDetail'}" -->
                        <span class="content-logo content"></span>
                        <a class="CloseOrder">内容管理</a>
                    </li>
                    <li class="CloseOrder-li" :class="{active: currentMenu == 'present'}" v-link="{path: '/presentManage'}">
                        <!--优化修改 v-link="{name:'hexiaoDetail'}" -->
                        <span class="persent-logo content"></span>
                        <a class="CloseOrder">礼品管理</a>
                    </li>
                    <li class="CloseOrder-li" :class="{active: currentMenu == 'group'}" v-link="{path: '/groupMag'}">
                        <!--优化修改 v-link="{name:'hexiaoDetail'}" -->
                        <span class="activity-logo content"></span>
                        <a class="CloseOrder">团购管理</a>
                    </li>
                    <li class="CloseOrder-li" :class="{active: currentMenu == 'data'}" v-link="{path: '/dataManage'}">
                        <!--优化修改 v-link="{name:'hexiaoDetail'}" -->
                        <span class="data-logo content"></span>
                        <a class="CloseOrder">数据分析</a>
                    </li>
                    <li class="CloseOrder-li">
                        <!--优化修改 v-link="{name:'hexiaoDetail'}" -->
                        <span class="jifen-logo content"></span>
                        <a class="CloseOrder">积分规则</a>
                    </li>
                </ul>
            </div>
            <!-- 列表 -->
            <router-view></router-view>
        </div>
        <!-- 底部 -->
        <div class="MJohnson-foot">
            版权所有:广州易杰数码有限公司
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
    </div>
</template>
<style lang="scss">
.content-logo {
    background: url(../images/ManagerOr.png) no-repeat;
}

.persent-logo {
    background: url(../images/lipin.png) no-repeat;
}

.activity-logo {
    background: url(../images/activity.png) no-repeat;
}

.data-logo {
    background: url(../images/data.png) no-repeat;
}

.jifen-logo {
    background: url(../images/jifen.png) no-repeat;
}
</style>
<script>
import {
    router
} from '../index'
import api from '../api'
import snackbar from '../components/snackbar.vue'

export default {
    components: {
        snackbar
    },
    data() {
        return {
            currentMenu: 'user',
            userInfo: {},
            show: false,
            text: ''
        }
    },

    ready() {
        if (checkLogin()) {
            this.userInfo = eval('(' + localStorage.getItem('ams_user_info') + ')');
        }
        var path = {
            order: ["auditList", "AccountingOrderSearch", "OrderContentPass", "OrderStatus", "OrderPass"],
            conMag: ["contentManage", "gundong", "manage", "bannerMag", 'datapush', 'pushDetails', 'pushlist', 'bannerManage', 'bannerDetails'],
            present: ['presentManage', 'presentMes', 'presentMesUpdate', 'rosterManage'],
            data: ['dataManage', 'dataDetails'],
            group: ['groupMag', 'activityManage','orderManage','userManage','logisticsManage'
            ]
        }
        router.beforeEach((transition) => {
                this.updateCurrentMenu(path, transition.to.path);
                if (checkLogin()) {
                    transition.next()
                }
            })
            /**
             * 监听调取接口非正常状态处理
             */
        let errorText = {
            '10003': '请重新登录',
            '10002': '参数验证错误',
            '400003': 'dao操作错误',
            '600100': '服务器DB操作失败',
            '10001': '系统错误'
        }
        this.$on('errorHandle', (type, code) => {
            this.show = true;
            this.text = type + '-' + errorText[code];
        })
    },
    methods: {
        updateCurrentMenu(path, path_name) {
            for (let i in path) {
                let isBreak = false;
                for (let j = 0, len = path[i].length; j < len; j++) {
                    if (path_name.indexOf(path[i][j]) > -1) {
                        this.currentMenu = i;
                        isBreak = true;
                        break;
                    }
                }
                if (isBreak) {
                    break;
                }
            }
        },
        logout() {
            // console.log(5555)
            localStorage.removeItem('ams_user_info');
            api.logout(this, {}, (back) => {
                checkLogin();
            })
        }



    }

}

function checkLogin() {
    var login = false;
    if (document.cookie.indexOf('admin_token') < 0 || !localStorage['ams_user_info']) {
        location.href = basePath + 'login.jsp';
        localStorage.removeItem('ams_user_info');

    } else {
        login = true;
    }

    return login;
}
</script>
