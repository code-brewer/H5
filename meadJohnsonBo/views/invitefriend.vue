<template>
    <div class="User-detail">
        <div class="User-detail-top">用户信息</div>
        <div class="User-detail-body">
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="15%">名次</th>
                            <th width="20%">用户名</th>
                            <th width="30%">OpenID</th>
                            <th width="20%">日期</th>
                           <th width="15%">渠道</th>
                        </tr>
                        <tr v-for="list in lists">
                        <td>{{list.rn}}</td>
                            <td>{{list.nick}}</td>
                            <td>{{list.openid}}</td>
                            <td>{{list.ctime}}</td>
                            <td>{{list.friendusid}}</td>
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
import api from '../api'
import snackbar from '../components/snackbar.vue'
import DateUtils from '../dist/DateUtils.js'
import page from '../components/page.vue'
export default {
    components: {
        snackbar,
        page,


    },
    data() {
        return {
            lists:[],
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
                idate:'',
            },
        }
    },

    ready() {
        this.openid = this.$route.params.openid;
        this.shareFriendDetailList();
        console.log(window.sessionStorage.getItem('ctime'))
    },
    watch: {
        'pageConfig.pageNum' (val) {
            this.shareFriendDetailList();
        },
        'options.chrenum' (val) {
            this.pageConfig.pageNum = 1;
            this.shareFriendDetailList();
        },
        'options.grade' (val) {
            this.pageConfig.pageNum = 1;
            this.shareFriendDetailList();
        }
    },
    methods: {
        /**
         * [获取用户列表]
         */
        shareFriendDetailList() {
            this.options['pageSize'] = this.pageConfig.pageSize;
            this.options['pageNum'] = this.pageConfig.pageNum;
             this.options.openid = this.$route.params.openid;
            this.options.idate = window.sessionStorage.getItem('ctime');
             
            api.shareFriendDetailList(this, this.options, (back) => {
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
        }
    }
}
</script>
<style>
</style>
