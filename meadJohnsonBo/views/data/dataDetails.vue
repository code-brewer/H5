<template>
    <div class="User-detail">
        <div class="User-detail-top">打卡数据</div>
        <div class="User-detail-body" style="text-align: right;">
            <div class="User-detail-body-bottom">
                <table class="User-detail-table table">
                    <tbody>
                        <tr>
                            <th width="15%">用户</th>
                            <th width="15%">打卡时间</th>
                            <th width="10%">连续打卡时间</th>
                        </tr>
                        <tr v-for="value in lists">
                            <td>{{value.nick}}</td>
                            <td>{{value.ctime}}</td>
                            <td>{{value.day_num}}</td>
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
            },
            options: {
                pageSize: 10,
                pageNum: 1,
                flag: '', // 0-10点之前   1-10点之后
                idate: '' //日期不需要时分秒
            },
            lists: [],
            show: false,
            text: ''
        }
    },
    ready() {
        this.cardsigndetail();
    },
    watch: {
        'pageConfig.pageNum' (val) {
            this.cardsigndetail();
        }
    },
    methods: {
        /**
         * [打卡记录某天详情]
         */
        cardsigndetail() {

            this.options['pageSize'] = this.pageConfig.pageSize;
            this.options['pageNum'] = this.pageConfig.pageNum;
            this.options.flag = window.sessionStorage.getItem('flag') || '';
            this.options.idate = window.sessionStorage.getItem('date') || '';
            api.cardsigndetail(this, this.options, (back) => {
                if (back.resCode == "0") {
                    this.lists = back.repBody.list;
                    back.repBody.total === 0 && (this.show = true, this.text = '暂无数据');
                    this.pageConfig.total = back.repBody.total;
                } else {
                    this.$dispatch('errorHandle', '打卡记录列表', back.resCode);
                }
            })

        },
    }
}
</script>
<style lang="scss">
</style>
