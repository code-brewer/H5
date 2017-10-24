<template>
    <div class="box1">
        <div class="top">
            <span style="padding-left: 20px;line-height: 34px; margin-right: 10px;">手机号码 :</span>
            <input v-el:phone class="form-control" v-model="phone" type="text" name="" style="width: 115px" placeholder="手机查询">
            <span style="padding-left: 30px;line-height: 34px">操作结果 :</span>
            <select class="form-control state" v-model="state" v-if="type.indexOf('开户')!=-1">
                <option value="" selected>全部</option>
                <option value="首次开户成功">首次开户成功</option>
                <option value="二次开户成功">二次开户成功</option>
                <option value="二次开户失败">二次开户失败</option>
            </select>
            <select class="form-control state" v-model="state" v-if="type.indexOf('销户')!=-1">
                <option value="" selected>全部</option>
                <option value="销户成功">销户成功</option>
                <option value="销户失败">销户失败</option>
            </select>
            <select class="form-control state" v-model="state" v-if="type.indexOf('转换')!=-1">
                <option value="" selected>全部</option>
                <option value="转换成功">转换成功</option>
                <option value="转换失败">转换失败</option>
            </select>
            <button class="btn btn-primary" style="margin-left: 50px" @click="search">查询</button>
            <button class="btn btn-primary goback" @click="goback">返回</button>
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
                        <td>{{item.idxMobile}}</td>
                        <td>{{item.operationType}}</td>
                        <td>{{item.ctime ? new Date(item.ctime).format('yyyy-MM-dd HH:mm:ss') : ''}}</td>
                        <td>{{item.failureDescription?item.operationResult+';'+item.failureDescription : item.operationResult}}</td>
                        <td>{{item.idxAcct}}</td>
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
        this.type = this.$route.params.type;
        this.search()

    },

    ready() {


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
            type: '', //批次类型
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
        goback() {
            window.history.back()
        },
        search() {
            this.isLoad = true;
            this.searchlist.list = []
            this.searchlist.all = 0;
            api.findbyopid(this, {
                opid: this.pid ? this.pid : null,
                idxphone: this.phone ? this.phone : null,
                size1: this.searchlist.nowPage, //必填，页数
                size2: 12, //必填，条数
                operationType: this.state ? this.state : null,
                ctime1: null,
                ctime2: null,
            }, res => {
                this.isLoad = false;
                this.searchlist.list = []
                this.searchlist.all = 0;
                if (res.resCode === '000000') {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resMsg
                } else {
                    window.alert('请求异常')
                }
            })
        },

        downAll() {
            if (this.searchlist.list.length == 0) return
            window.location.href = basePath + 'batchinfo/exportToExcelbyopid?size1=' + 0 + '&size2=0&idxphone=' + (this.phone ? this.phone : null) + '&ctime1=' + null + '&ctime2=' + null + '&opid=' + (this.pid ? this.pid : null) + '&operationType=' + (this.state ? this.state : null) //接口问题，若没有值则传null

        },
        downLoadCurrent() {
            if (this.searchlist.all == 0) return
            window.location.href = basePath + 'batchinfo/exportToExcelbyopid?size1=' + this.searchlist.nowPage + '&size2=12&idxphone=' + (this.phone ? this.phone : null) + '&ctime1=' + null + '&ctime2=' + null + '&opid=' + (this.pid ? this.pid : null) + '&operationType=' + (this.state ? this.state : null) //接口问题，若没有值则传null
        },


    }
}
</script>
