<template>
    <div class="User-detail">
        <div class="User-detail-top">用户列表</div>
        <div class="User-detail-body">
        <div>
                <div class="body-item">
            <div class="search" style="float: right">
                <input type="text" v-model="options.nickopenid" @keyup.enter="searchData" placeholder="请输入用户名进行搜索" autocomplete="on" style="padding-left: 5px;box-sizing: border-box"></input>
                <button class="search-text" @click="searchData"><i></i>搜索</button>
            </div> 
             </div>
            </div>
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="20%">用户名</th>
                            <th width="30%">OpenID</th>
                            <th width="20%">日期</th>
                            <th width="15%">邀请好友人数</th>
                            <th width="15%">满三抽奖</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>
                                {{list.nick}}
                            </td>
                            <td>{{list.openid}}</td>
                            <td>{{list.ctime}}</td>
                            <td><a class="link" @click = "sendfriend(list)">{{list.friendnum}}</a></td>
                            <td><a class="link" @click = "sendlottery(list)">{{list.lotterynum}}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <page :config.sync="pageConfig"></page>
            <snackbar :show.sync="show" :text="text"></snackbar>
        </div>
    </div>
</template>
<script>
import {
    router
} from '../index'
import api from '../api'
import page from '../components/page.vue'
import snackbar from '../components/snackbar.vue'

export default {
    components: {
        page,
        snackbar
    },
    data() {
        return {
            lists: [],
             show: false,
            text: '',
            pageConfig: {
                total: 1,
                pageSize: 10,
                pageNum: 1
            },
            options: {
                pageSize: '',
                pageNum: '',
                openid: '',
            },
        }
    },
    ready() {
        this.getshareLotteryNum();
         console.log(this.$route.params.openid)
    },
    watch: {
        'pageConfig.pageNum' (val) {
            this.getshareLotteryNum();
        },
        'options.chrenum' (val) {
            this.pageConfig.pageNum = 1;
            this.getshareLotteryNum();
        },
        'options.grade' (val) {
            this.pageConfig.pageNum = 1;
            this.getshareLotteryNum();
        }
    },
    methods: {
        /**
         * [获取用户列表]
         */
        getshareLotteryNum() {
            this.options['pageSize'] = this.pageConfig.pageSize;
            this.options['pageNum'] = this.pageConfig.pageNum;
             this.options.openid = this.$route.params.openid;
             // console.log(this.options.openid)
            api.shareLotteryNum(this, this.options, (back) => {
                if (back.resCode == "0") {
                    this.lists = back.repBody.list;
                    back.repBody.total === 0 && (this.show = true, this.text = '暂无数据');
                    this.pageConfig.total = back.repBody.total;
                } else {
                    this.$dispatch('errorHandle', '获取用户列表', back.resCode);
                }
            })

        },
        /**
         * [搜索]
         */
        searchData() {
            this.pageConfig.pageNum = 1;
            this.getUserListUpgrade();
        },
        sendfriend(list){
            window.sessionStorage.setItem('ctime', list.ctime);
                this.$router.go({
                   path: '/invitefriend/'+list.openid
                });
        },
        sendlottery(list){
            window.sessionStorage.setItem('ctime', list.ctime);
                this.$router.go({
                  path: '/lottery/'+list.openid
                });
        }
    }
}
</script>
<style>
</style>
