<template>
    <div class="User-detail">
        <div class="User-detail-top">打卡数据</div>
        <div class="User-detail-body" style="text-align: right;">
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="15%">日期</th>
                            <th width="15%">10:00之前</th>
                            <th width="10%">10:00之后</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.ctime}}</td>
                            <td><a class="link" @click="sent1(list)">{{list.bcount}}</a>
                            </td>
                            <td><a class="link" @click="sent2(list)">{{list.acount}}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <page :config.sync="pageConfig"></page>
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
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
            pageConfig: {
                total: 1,
                pageSize: 10,
                pageNum: 1,
                pageTotal: 1,
                name: ''
            },
            options: {
                pageSize: 10,
                pageNum: 1,
            },
            lists: '', //获取列表
            ctime: '',
            flag: '', //10点前后
        }
    },
    created() {
        this.cardsignlist();
    },
    watch: {
        'pageConfig.pageNum' (val) {
            this.cardsignlist();
        }
    },
    methods: {
        /**
         * [打卡记录列表]
         */
        cardsignlist() {
            this.options['pageSize'] = this.pageConfig.pageSize;
            this.options['pageNum'] = this.pageConfig.pageNum;
            api.cardsignlist(this, this.options, (back) => {
                if (back.resCode == "0") {
                    this.lists = back.repBody.list;
                    back.repBody.total === 0 && (this.show = true, this.text = '暂无数据');
                    this.pageConfig.total = back.repBody.total;
                } else {
                    this.$dispatch('errorHandle', '打卡记录列表', back.resCode);
                }
            })

        },
        sent1(list) {
            this.flag = 0;
            window.sessionStorage.setItem('flag', this.flag);
            window.sessionStorage.setItem('date', list.ctime);
            this.$router.go({
                path: '/dataDetails'
            });
            // console.log(window.sessionStorage.setItem('flag', this.flag);)
        },
        sent2(list) {
            this.flag = 1;
            window.sessionStorage.setItem('flag', this.flag);
            window.sessionStorage.setItem('date', list.ctime);
            this.$router.go({
                path: '/dataDetails'
            });
        },

    }
}
</script>
