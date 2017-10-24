<template>
    <div style="height: 100%">
        <top-logo style="position: absolute;width: 100%; z-index: 100;">
            <div class="quite">
                <span class="name">{{account}}</span> |
                <button style="border: none;border-bottom: 1px solid #ddd;height: 100%" type="button" class="btn btn-default" @click="quite">退出</button>
            </div>
        </top-logo>
        <div class="barLeft">
            <div class="list-group">
                <button type="button" class="list-group-item" v-link="{path:item.path}" v-for="item in bar" @click="activeIndex = $index" :class="{active : activeIndex===$index}">
                    <!-- <img src="../images/u54.png"> -->
                    <span class="glyphicon" :class="item.logo" aria-hidden="true"></span> {{item.name}}
                </button>
                <div class="manageChild" v-if="activeIndex===5">
                    <button type="button" class="btn btn-default" v-link="{path:'/home/manage/log'}" :class="{active:manageChildIndex===0}" @click="manageChildIndex=0">操作日志</button>
                    <button type="button" class="btn btn-default" v-link="{path:'/home/manage/account'}" :class="{active:manageChildIndex===1}" @click="manageChildIndex=1">账号管理</button>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view keep-alive></router-view>
        </div>
    </div>
</template>
<style lang="scss">
.quite {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 15px;
}

.barLeft {
    width: 150px;
    height: 100%;
    padding-top: 62px;
    // margin-left: 5px;
    background: inherit;
    // background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    // border-width: 1px;
    // border-style: solid;
    // border-color: rgba(121, 121, 121, 1);
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    // box-shadow: none;
    float: left;
    .list-group {
        padding-left: 5px;
    }
    button {
        margin-top: 1px;
    }
    >div {
        padding-left: 10px;
        cursor: pointer;
        line-height: 46px;
        // border-bottom: 1px solid;
        // border-color: rgba(121, 121, 121, 1);
        img {
            vertical-align: middle;
        }
    }
    >div.active {
        background-color: rgba(204, 204, 204, 1);
    }
    .manageChild {
        button {
            width: 100%;
            display: block;
            box-sizing: border-box;
        }
        button.active {
            background-color: #8bbeea;
            border-color: #8bbeea;
            z-index: 2;
            color: #fff;
        }
    }
}

.content {
    height: 100%;
    padding-top: 62px;
    box-sizing: border-box;
}

.name {
    display: inline-block;
    background: #fff;
    border: 1px solid #ddd;
    border-bottom: none;
    transform: translateY(1px);
    padding: 0 10px;
    border-radius: 5px 5px 0 0;
}
</style>
<script type="text/javascript">
import topLogo from '../components/top.vue'
export default {
    components: {
        topLogo,
    },
    watch: {
        manageChildIndex(val) {
            val === 0 ? this.bar[5].path = '/home/manage/log' : this.bar[5].path = '/home/manage/account'
        },
    },
    ready() {


        //监听初始化路由
        var path = this.$router._currentRoute.path
        switch (path) {
            case '/home/spending':
                this.activeIndex = 0
                break;
            case '/home/message':
                this.activeIndex = 1
                break;
            case '/home/transform':
                this.activeIndex = 2
                break;
            case '/home/request':
                this.activeIndex = 3
                break;
            case '/home/statistics':
                this.activeIndex = 4
                break;
            case '/home/manage/log':
                this.activeIndex = 5
                this.manageChildIndex = 0
                break;
            case '/home/manage/account':
                this.activeIndex = 5
                this.manageChildIndex = 1
                break;
        }
        if (path.indexOf('detail1') != -1) {
            this.activeIndex = 5
            this.manageChildIndex = 0
        } else if (path.indexOf('detail') != -1) {
            this.activeIndex = 1
        }

    },
    data() {
        return {
            bar: [{
                name: '开销户处理',
                path: '/home/spending',
                logo: 'glyphicon-folder-open'
            }, {
                name: '用户信息查询',
                path: '/home/message',
                logo: 'glyphicon-search'
            }, {
                name: '业务类型转换',
                path: '/home/transform',
                logo: 'glyphicon-refresh'
            }, {
                name: '会员升级查询',
                path: '/home/request',
                logo: 'glyphicon-sort'
            }, {
                name: '业务统计查询',
                path: '/home/statistics',
                logo: 'glyphicon-list-alt'
            }, {
                name: '系统管理',
                path: '/home/manage/log',
                logo: 'glyphicon-cog'
                    // path : manageChildIndex === 0 ? '/home/manage/log' :'/home/manage/account'
            }],
            activeIndex: 0,
            manageChildIndex: 0,
            account: this.$root.user,

        }
    },
    methods: {
        // clikcBar (index) {
        //  this
        // }
        quite() {
            this.$dispatch('quite')
        },
    }
}
</script>
