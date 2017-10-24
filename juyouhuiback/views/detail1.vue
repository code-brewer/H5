<template>
    <div class="box1">
        <div class="top">
            <span style="padding-left: 20px;line-height: 34px; margin-right: 10px;">手机号码 :</span>
            <input v-el:phone class="form-control" v-model="phone" type="text" name="" style="width: 115px" placeholder="手机查询">
            <span style="padding-left: 30px;line-height: 34px">操作结果 :</span>
            <select class="form-control state" v-model="state">
                <option value="" selected>全部</option>
                <option value="成功">成功</option>
                <option value="失败">失败</option>
            </select>
            <button class="btn btn-primary" style="margin-left: 50px" @click="search">查询</button>
            <button class="btn btn-primary goback" v-link='{path : "/home/manage/log"}'>返回</button>
        </div>
        <div class="middle">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                        <th>序号</th>
                        <th>手机号</th>
                        <th>操作类型</th>
                        <th>操作日期</th>
                        <th>操作结果</th>
                        <th>操作人</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchlist.list">
                        <th scope="row">{{searchlist.all-$index-(searchlist.nowPage-1)*12}}</th>
                        <td>{{item.phone}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.usetime ? new Date(item.usetime).format('yyyy-MM-dd HH:mm:ss') : ''}}</td>
                        <td>{{item.result}}</td>
                        <td>{{item.username}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <load :show="isLoad"></load>
        <div class="bottom1" style="padding-left: 150px;">
            <page :searchlist.sync="searchlist">
                <div style="float: right">
                    <!-- v-link="{path : basePath}" -->
                    <button type="button" class="btn btn-primary" @click="downLoadCurrent">当前页导出为.xls</button>
                    <button type="button" class="btn btn-success" @click="downAll">全部导出为.xls</button>
                </div>
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
    .state {
        display: inline-block;
        width: 80px;
        margin-left: 10px;
    }
    .top {
        padding-left: 20px;
        display: flex;
        position: relative;
        button.goback {
            position: absolute;
            right: 10px;
        }
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
        this.pid = this.$route.params.phone;
        this.search()
    },

    ready() {
        // this.phone = this.$route.params.phone;
        this.pid = this.$route.params.phone;
        this.search()


        this.$on('clickPage', function(item) {
            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
            this.searchlist.list = []

            this.search()
        })

        this.$on('gotobtn', (val, allpage) => { //点击分页确定按钮时触发
            if (val == this.searchlist.nowPage) return window.alert('已经是当前页')
            if (val && !isNaN(val)) {
                if (val > 0 && val <= allpage) {
                    this.searchlist.nowPage = val
                    this.searchlist.list = []

                    this.search()
                    return
                }
            }
            window.alert('不在页数范围内')
        })

    },
    data() {
        return {
            phone: '',
            pid: '',
            state: '',
            downLoad: {
                current: '',
                all: '',
            },
            isLoad: false,
            searchlist: {
                list: [],
                all: 0,
                nowPage: 1,
                nowGroup: 1,
            },

        }
    },
    methods: {
        search() {
            this.isLoad = true;
            this.searchlist.list = []
            this.searchlist.all = 0;
            api.findbyopid(this, {
                opid: this.pid ? this.pid : null,
                phone: this.phone ? this.phone : null,
                start: this.searchlist.nowPage, //必填，页数
                end: 12, //必填，条数
                result: this.state ? this.state : null,
            }, res => {
                this.isLoad = false;
                this.searchlist.list = []
                this.searchlist.all = 0;
                if (res.resMsg === 'success') {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resCode
                } else {
                    window.alert('请求异常')
                }
            })
        },

        downAll() {


            if (this.searchlist.all == 0) return
            window.location.href = basePath + 'dateil/down?opid=' + (this.pid ? this.pid : 0) + '&phone=' + (this.phone ? this.phone : 0) + '&start=' + 0 + '&end=0'

        },
        downLoadCurrent() {

            if (this.searchlist.list.length == 0) return
            window.location.href = basePath + 'dateil/down?opid=' + (this.pid ? this.pid : 0) + '&phone=' + (this.phone ? this.phone : 0) + '&start=' + this.searchlist.nowPage + '&end=12'


        },


    }
}
</script>
