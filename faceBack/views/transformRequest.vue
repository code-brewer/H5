<template>
    <div class="box1">
        <div class="top">
            <search-time :searchdate="selectData.searchTime">
                <change-date :switch-date.sync="selectData.searchTime">
                </change-date>
            </search-time>
        </div>
        <div class="middle">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                        <th>序号</th>
                        <th>手机号码</th>
                        <th>新业务类型</th>
                        <th>请求时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchlist.list ">
                        <th scope="row">{{searchlist.all-$index-(searchlist.nowPage-1)*12}}</th>
                        <td>{{item.pk_mobile}}</td>
                        <td>{{item.grade ==1? '特级会员' : item.grade ==2? '高级会员' : '普通会员'}}</td>
                        <td>{{ new Date(item.upgrade_time).format('yyyy-MM-dd HH:mm:ss')}}</td>
                    </tr>
                </tbody>
            </table>
            <load :show="isLoad"></load>
        </div>
        <div class="bottom">
            <page :searchlist.sync="searchlist">
                <div style="float: right">
                    <button type="button" class="btn btn-primary" @click="down">导出文件.xls</button>
                </div>
            </page>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.box1 {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 50px;
    box-sizing: border-box;
    .top {
        min-width: 700px;
        a {
            margin-left: 20px;
            cursor: pointer;
        }
        a.active {
            color: red;
        }
        button {
            font-size: 12px;
            height: 20px;
            line-height: 8px;
            margin-left: 100px;
        }
        span {
            margin-right: 5px;
            margin-left: 5px;
        }
        input,
        select {
            display: inline-block;
            width: 96px;
            height: 22px;
        }
        select {
            vertical-align: bottom;
        }
    }
    .middle {
        margin-top: 20px;
        a {
            cursor: pointer;
        }
        th,
        td {
            text-align: center;
        }
    }
}
</style>
<script type="text/javascript">
import searchTime from '../components/search_time.vue'
import page from '../components/page.vue'
import api from '../api/index.js'
import load from '../components/load.vue'
import changeDate from '../components/changeDate.vue'
export default {
    components: {
        searchTime,
        page,
        load,
        changeDate
    },
    ready() {
        // this.list()
        this.$on('clickTime', function() {
            this.list()
        })
        this.$on('dateClick', function() {
            this.$broadcast('dateClick')
        })

        this.$on('search', function() { //点击搜索
            this.list()

        })
        this.$on('clickPage', function(item) {
            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
            this.searchlist.list = []

            this.list()
        })

        this.$on('gotobtn', (val, allpage) => { //点击分页确定按钮时触发
            if (val == this.searchlist.nowPage) return window.alert('已经是当前页')
            if (val && !isNaN(val)) {
                if (val > 0 && val <= allpage) {
                    this.searchlist.nowPage = val
                    this.searchlist.list = []

                    this.list()
                    return
                }
            }
            window.alert('不在页数范围内')
        })

    },

    attached() {
        this.list()
    },

    computed: {


    },
    data() {
        return {
            isLoad: false,
            selectData: {
                searchTime: {
                    begin: new Date().format(),
                    end: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
                }
            },
            now: new Date(),
            searchlist: {
                list: [
                    // {
                    //     place : '',
                    //     beginDate : '',
                    //     endDate : '',
                    //     openUser : '',
                    //     deleteUser : '',
                    // }
                ],
                all: 0,
                nowPage: 1,
                nowGroup: 1,
            },
        }
    },
    methods: {

        down() {
            if (this.searchlist.all == 0) return
            window.location.href = basePath + 'memuser/userLevListExcel?starttime=' + this.selectData.searchTime.begin + '&endtime=' + this.selectData.searchTime.end
        },
        list() {
            this.searchlist.list = []
            this.searchlist.all = 0;
            this.isLoad = true;
            api.userLevList(this, {
                starttime: this.selectData.searchTime.begin,
                endtime: this.selectData.searchTime.end,
                page: this.searchlist.nowPage,
                pageSize: 12,
            }, (res) => {
                this.searchlist.list = []
                this.searchlist.all = 0;
                this.isLoad = false;
                if (res && res.resCode === "000000") {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resMsg

                }


            })

        }

    }
}
</script>
