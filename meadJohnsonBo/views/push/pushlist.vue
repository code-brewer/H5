<template>
    <div class="User-detail">
        <div class="User-detail-top">搜索列表</div>
        <div class="User-detail-body">
            <div class="search" style="float: right">
                <input type="text" v-model="options.nickopenid" @keyup.enter="searchData" placeholder="请输入内容进行搜索" autocomplete="on"></input>
                <button class="search-text" @click="searchData"><i></i>搜索</button>
            </div>
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="20%">预设日期</th>
                            <th width="30%">类型</th>
                            <th width="20%">编辑</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.ctime}}</td>
                            <td>{{list.openid}}</td>
                            <td>
                                <a class="link" v-link="{path: '/pushDetails/'+list.ctime}">查看</a>
                            </td>
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
} from '../../index'
import api from '../../api'
import page from '../../components/page.vue'
import snackbar from '../../components/snackbar.vue'

export default {
    components: {
        page,
        snackbar
    },
    data() {
        return {
            lists: [],
            nickopenid: '',
            pageConfig: {
                total: 1,
                pageSize: 10,
                pageNum: 1
            },
            options: {
                nickopenid: '',
                chrenum: '',
                grade: '',
                beginDate: ''
            },
            chrenum: '',
            grade: '',
            show: false,
            text: '',
        }
    },
    ready() {
        this.getUserListUpgrade();
    },
    watch: {
        'pageConfig.pageNum' (val) {
            this.getUserListUpgrade();
        },
        'options.chrenum' (val) {
            this.pageConfig.pageNum = 1;
            this.getUserListUpgrade();
        },
        'options.grade' (val) {
            this.pageConfig.pageNum = 1;
            this.getUserListUpgrade();
        }
    },
    methods: {
        /**
         * [获取用户列表]
         */
        getUserListUpgrade() {
            this.options['pageSize'] = this.pageConfig.pageSize;
            this.options['pageNum'] = this.pageConfig.pageNum;
            api.getUserListUpgrade(this, this.options, (back) => {
                if (back.resCode == "0") {
                    this.lists = back.repBody.list;
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
