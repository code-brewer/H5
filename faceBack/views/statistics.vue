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
                        <th>所属地区</th>
                        <th>起始日期</th>
                        <th>截止日期</th>
                        <th>开户数</th>
                        <th>销户数</th>
                        <th>净增长数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchlist.list ">
                        <!-- <th scope="row">1</th> -->
                        <td>{{item.place}}</td>
                        <td>{{item.beginDate}}</td>
                        <td>{{item.endDate}}</td>
                        <td>{{item.openUser}}</td>
                        <td>{{item.deleteUser}}</td>
                        <td>{{item.openUser-item.deleteUser}}</td>
                    </tr>
                </tbody>
            </table>
            <load :show="isLoad"></load>
        </div>
        <!--  <div class="bottom">
            <page :searchlist.sync="searchlist">
                <div style="float: right">
                    <button type="button" class="btn btn-primary">当前页导出为.txt</button>
                    <button type="button" class="btn btn-success">全部导出为.txt</button>
                </div>
            </page>
        </div> -->
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
import changeDate from '../components/changeDate.vue'
import page from '../components/page.vue'
import api from '../api/index.js'
import load from '../components/load.vue'
export default {
    components: {
        searchTime,
        page,
        load,
        changeDate
    },
    ready() {
        this.list()
        this.$on('dateClick', function() {
            this.$broadcast('dateClick')
        })


        this.$on('search', function() { //点击搜索
            this.list()

        })
        this.$on('clickTime', function() {
            this.list()
        })

    },

    attached() {
        if (this.$root.isRefresh.statistics) {
            // this.switchTime(this.activeTime)
            this.list()
            this.$root.isRefresh.statistics = false
        }
    },
    watch: {

    },
    filters: {

    },
    computed: {


    },
    data() {
        return {
            // activeTime: '',
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

        list() {
            this.searchlist.list = []
            this.searchlist.all = 0;
            this.isLoad = true;
            api.findbyplace(this, {
                starttime: this.selectData.searchTime.begin,
                endtime: this.selectData.searchTime.end,
                size1: '0',
                size2: '0',
            }, (res) => {
                this.searchlist.list = []
                this.searchlist.all = 0;
                this.isLoad = false;
                if (res && res.resMsg === "success") {

                    for (var i = 0; i < res.repBody.length; i++) {
                        this.searchlist.all = res.resCode
                        if (res.repBody[i].place) {
                            this.searchlist.list.push({
                                place: res.repBody[i].place,
                                openUser: res.repBody[i].num1,
                                beginDate: this.selectData.searchTime.begin,
                                endDate: this.selectData.searchTime.end,
                                deleteUser: res.repBody[i].num2,
                            })

                        }
                    }
                }


            })

        }

    }
}
</script>
