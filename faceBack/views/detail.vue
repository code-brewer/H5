<template>
    <div class="box1">
        <div class="top">
            <span style="padding-left: 20px;line-height: 34px; margin-right: 10px;">手机号码 :</span>
            <input v-el:phone class="form-control" v-model="phone" type="text" name="" style="width: 115px" placeholder="手机查询">
            <button class="btn btn-primary goback" v-link='{path : "/home/message"}'>返回</button>
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
                        <th scope="row">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>
                        <td>{{item.idxMobile}}</td>
                        <td>{{ item.operationType}}</td>
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
                    <button type="button" class="btn btn-primary" @click="down">当前页导出为.xls</button>
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

    ready() {


        this.$on('clickPage', function(item) {

            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
            this.searchlist.list = []
            this.isLoad = true;
            this.search()
        })
        this.$on('changeNumber', number => {
            this.phone = number
        })
        this.$on('gotobtn', (val, allpage) => { //点击分页确定按钮时触发
            if (val == this.searchlist.nowPage) return window.alert('已经是当前页')
            if (val && !isNaN(val)) {
                if (val > 0 && val <= allpage) {
                    this.searchlist.nowPage = val
                    this.searchlist.list = []
                    this.isLoad = true;
                    this.search()
                    return
                }
            }
            window.alert('不在页数范围内')
        })

    },
    attached() {
        this.phone = this.$route.params.phone;
        this.search()
    },
    data() {
        return {
            phone: '',
            state: '',
            pid: '',
            isLoad: false,
            downLoad: {
                current: '',
            },
            searchlist: {
                list: [],
                all: 0,
                nowPage: 1,
                nowGroup: 1,
            },

        }
    },
    methods: {
        downAll() {
            window.location.href = basePath + 'acceptLog/exportToExcel?size1=' + '0' + "&size2=" + '0' + "&phone=" + this.$els.phone.value.trim();
        },
        down() {
            window.location.href = basePath + 'acceptLog/exportToExcel?size1=' + this.searchlist.nowPage + "&size2=" + 12 + "&phone=" + this.$els.phone.value.trim();
        },
        search() {
            this.searchlist.list = []
            this.searchlist.all = 0
            this.isLoad = true;
            api.phoneDetail(this, {
                phone: this.phone ? this.phone : null,
                size1: this.searchlist.nowPage,
                size2: '12',
            }, res => {
                this.searchlist.list = []
                this.searchlist.all = 0
                this.isLoad = false
                if (res.resMsg === 'success') {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resCode
                } else {
                    window.alert('请求异常')
                }
            })
        },

    }
}
</script>
