<template>
    <div class="box1">
        <div class="top" style="min-width: 800px">
            <search-time :searchdate="selectData.searchTime">
                <span style="padding-left: 20px"> 操作类型 </span>
                <select class="form-control" v-model="selectData.type" style="width: 110px;vertical-align: baseline; ">
                    <option value="" selected="">全部</option>
                    <option value="开户">开户</option>
                    <option value="批量开户">批量开户</option>
                    <option value="销户">销户</option>
                    <option value="批量销户">批量销户</option>
                </select>
            </search-time>
        </div>
        <div class="middle">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                        <th>批号</th>
                        <th>操作数</th>
                        <th>成功数</th>
                        <th>失败数</th>
                        <th>操作类型</th>
                        <th>操作日期</th>
                        <th>操作员</th>
                        <th>操作结果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchlist.list">
                        <th scope="row">{{item.opid}}</th>
                        <td>{{item.usetime}}</td>
                        <td>{{item.success}}</td>
                        <td>{{item.fail}}</td>
                        <td>{{item.type}}</td>
                        <td>{{new Date(item.date).format('yyyy-MM-dd HH:mm:ss')}}</td>
                        <td>{{item.username}}</td>
                        <td><a style="cursor: pointer;" v-link="{path:'/home/manage/detail1/'+item.opid}">查看明细</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <load :show="isLoad"></load>
        <div class="bottom1" style="padding-left: 150px;">
            <page :searchlist.sync="searchlist">
                <!-- <div style="float: right">
                    <button type="button" class="btn btn-primary">当前页导出为.txt</button>
                    <button type="button" class="btn btn-success">全部导出为.txt</button>
                </div> -->
            </page>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.box1 {
    height: 100%;
    padding-left: 30px;
    padding-top: 20px;
    padding-right: 50px;
    box-sizing: border-box;
    .top {
        padding-left: 20px;
        display: flex;
    }
    .middle {
        margin-top: 20px;
        display: flex;
        padding-left: 20px;
        a {
            cursor: pointer;
        }
        th,
        td {
            text-align: center;
        }
    }
}

.bottom .pagination {
    padding-left: 0px;
    margin-left: -50px;
}
</style>
<script type="text/javascript">
import searchTime from '../components/search_time.vue'
import api from '../api/index.js'
import page from '../components/page.vue'
import load from '../components/load.vue'
export default {
    components: {
        searchTime,
        page,
        load
    },
    attached() {
        if (this.$root.isRefresh.log) {
            this.log()
            this.$root.isRefresh.log = false
        }
    },
    ready() {
        this.log()
            // api.log(this,{
            //        date1:this.selectData.searchTime.begin,
            //            date2:this.selectData.searchTime.end,
            //            size1:this.searchlist.nowPage,
            //            size2:'12',
            //            type:this.selectData.type ? this.selectData.type : null
            // },res=>{
            //  if (res.resMsg==="success") {
            //      this.searchlist.list = res.repBody
            //      this.searchlist.all = res.resCode


        //  }
        // })


        this.$on('clickPage', function(item) {

            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
            this.searchlist.list = []
            this.log()
        })

        this.$on('gotobtn', (val, allpage) => { //点击分页确定按钮时触发
            if (val == this.searchlist.nowPage) return window.alert('已经是当前页')
            if (val && !isNaN(val)) {
                if (val > 0 && val <= allpage) {
                    this.searchlist.nowPage = val
                    this.searchlist.list = []
                    this.log()
                    return
                }
            }
            window.alert('不在页数范围内')
        })



        this.$on('search', function() { //点击搜索
            console.log('查询了')
            this.log()

        })






    },
    data() {
        return {
            isLoad: false,
            searchlist: {
                list: [],
                all: 0,
                nowPage: 1,
                nowGroup: 1,
            },
            phoneOpen: {
                isShow: false,
                res: '',
            },
            selectData: {
                searchTime: {
                    begin: new Date().format(),
                    end: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
                },
                type: null
            },
        }
    },
    methods: {
        log() {
            this.isLoad = true;
            this.searchlist.list = []
            this.searchlist.all = 0
            api.log(this, {
                date1: this.selectData.searchTime.begin,
                date2: this.selectData.searchTime.end,
                size1: this.searchlist.nowPage,
                size2: '12',
                type: this.selectData.type ? this.selectData.type : null
            }, res => {
                this.searchlist.list = []
                this.searchlist.all = 0
                this.isLoad = false;
                if (res.resMsg === "success") {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resCode


                } else {
                    window.alert(res.resMsg)
                }
            })
        },

    }
}
</script>
