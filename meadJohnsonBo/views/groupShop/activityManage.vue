<template>
    <div class="User-detail">
        <div class="User-detail-top">活动列表</div>
        <div class="User-detail-body">
            <div>
                <div class="body-item">
                    <div style="display:inline-block">
                        活动类型:
                        <select class="select-width" v-model="option.type">
                            <option value=''>全部</option>
                            <option value='0'>1人团</option>
                            <option value='1'>10人团</option>
                            <option value='2'>20人团</option>
                            <option value='3'>30人团</option>
                        </select>
                    </div>
                    <div style="display:inline-block; padding-left: 15px;">
                        开始日期:
                        <datepicker :value.sync="option.beginDate" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="150px" top="0" left="0"></datepicker>
                    </div>
                    <div class="search" style="float: right ;margin: -10px 0px 0;">
                        <button class="search-text" style="padding: 0px;" @click="getact">创建活动</button>
                    </div>
                </div>
                <div class="body-item">
                    <div style="display:inline-block">
                        活动状态:
                        <select class="select-width" v-model="option.tab">
                            <option value=''>全部</option>
                            <option value='1'>未开始</option>
                            <option value='2'>进行中</option>
                            <option value='3'>已结束</option>
                        </select>
                    </div>
                    <div style="display:inline-block; padding-left: 15px;">
                        结束日期:
                        <datepicker :value.sync="option.endDate" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="150px" top="0" left="0"></datepicker>
                    </div>
                    <div class="search" style="float: right">
                        <input type="text" placeholder="活动名称" v-model="option.title" autocomplete="on" style="padding-left: 5px;box-sizing: border-box"></input>
                        <button class="search-text" @click="findActivity"><i></i>搜索</button>
                    </div>
                </div>
            </div>
            <div class="User-detail-body-bottom" style="margin-top: 50px;">
                <table class="User-detail-table table" style="    table-layout: fixed;">
                    <tbody>
                        <tr>
                            <th width="20%">活动名称</th>
                            <th width="16%">活动时间</th>
                            <th width="8%">类型</th>
                            <th width="6%">访问量</th>
                            <th width="6%">销量</th>
                            <th width="8%">库存</th>
                            <th width="8%">状态</th>
                            <th width="30%">操作</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.title}}</td>
                            <td>{{list.begin_time}}</br>{{list.end_time}}</td>
                            <td>{{['1人团', '10人团','20人团','30人团'][list.type]}}</td>
                            <td>pv:{{list.pv}}</br>uv:{{list.uv}}</td>
                            <td>{{list.orderCount}}</td>
                            <td>{{list.stock}}</td>
                            <td>{{['','未开始','进行中','已结束'][list.tab]}}</td>
                            <td>
                                <a href="javascript:;" class="btn1" @click="up(list)" v-if="list.tab == 2">下架</a>
                                <a href="javascript:;" class="btn1" style="background-color: #10e169;color: #0a615d;" v-else>{{list.tab == 3 ? '已结束' : '未开始'}}</a>
                                <a href="javascript:;" class="btn1" style="background-color:#9e9e9e;color: #ffddc2;" v-if="list.tab == 2">编辑内容</a>
                                <a href="javascript:;" class="btn1" @click="sentDetail(list)" v-else>编辑内容</a>
                                <a href="javascript:;" class="btn1" @click="deleteAct(list)">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align: right; margin-top: 20px;">
                <a :href="exportUrl" class="btnExport" @click="Export">导出名单表</a>
            </div>
            <page :config.sync="pageConfig"></page>
            <snackbar :show.sync="show" :text="text"></snackbar>
        </div>
        <Modal :show.sync="ModalShow">
            <div class="form">
                <h2>确认删除？</h2>
                <div class="btnGroup">
                    <a href="javascript:;" class="btn" @click="godelete">确认</a>
                    <a href="javascript:;" class="btn" @click="ModalShow = false">取消</a>
                </div>
                <a href="javascript:;" class="close" @click="ModalShow = false">x</a>
            </div>
        </Modal>
    </div>
</template>
<script>
import {
    router
} from '../../index'
import api from '../../api'
import page from '../../components/page.vue'
import snackbar from '../../components/snackbar.vue'
import Datepicker from '../../components/Datepicker.vue'
import Modal from '../../components/Modal.vue'
import DateUtils from '../../dist/DateUtils.js'
// import utils from '../../../src/utils'
export default {
    components: {
        page,
        snackbar,
        Datepicker,
        Modal
    },
    data() {
        return {
            option: {
                current: '1', // (当前页数)
                title: '', // (null不搜索， 模糊搜索标题)
                type: '', //(null-所有  0-1人团   1-10人团  2-20人团   3-30人团')
                beginDate: '', //活动开始时间
                endDate: '', //活动结束时间
                tab: '' //1未开始、2进行中、3已结束
            },
            pageConfig: {
                total: 1,
                pageSize: '',
                pageNum: 1,
                pageTotal: 1,
            },
            options: {
                id: '',
                beginTime: '', // (活动开始时间 格式：yyyy-MM-dd HH:mm:ss)
                endTime: '', // (活动结束时间 格式：yyyy-MM-dd HH:mm:ss)
            },
            lists: {},
            show: false,
            text: '',
            exportUrl: '',
            ModalShow: false, //退款确认
            deletelist: {},
        }
    },
    created() {
        this.findActivity();
    },
    watch: {
        'pageConfig.pageNum' () {
            this.findActivity();
        }
    },
    methods: {
        /**
         * 获取活动
         */
        findActivity() {
            this.option.current = this.pageConfig.pageNum
            api.findPageActivity(this, this.option, back => {
                console.log(back)
                if (back && back.list) {
                    console.log(back.list)
                    var arr = back.list,
                        len = arr.length;
                    for (var i = 0; i < len; i++) {
                        arr[i].begin_time = DateUtils.formatDate(new Date(arr[i].begin_time), 'yyyy-MM-dd HH:mm:ss');
                        arr[i].end_time = DateUtils.formatDate(new Date(arr[i].end_time), 'yyyy-MM-dd HH:mm:ss');
                    };

                    this.lists = arr;
                }
                this.exportUrl = basePath_3 + 'activity/out/excel/activity?title=' + this.option.title + '&type=' + this.option.type + '&beginDate=' + this.option.beginDate + '&endDate=' + this.option.endDate + '&tab=' + this.option.tab;
                this.pageConfig.total = back.totalCount;
                this.pageConfig.pageSize = back.pageSize;
                this.pageConfig.pageTotal = Math.ceil(this.pageConfig.total / this.pageConfig.pageSize) == 0 ? 1 : Math.ceil(this.pageConfig.total / this.pageConfig.pageSize);

            })
        },
        /**
         * [导出文件 description]
         */
        Export(e) {
            let self = e.srcElement || e.target;
            if (self.href.indexOf('javascript:;') > -1) {
                this.show = true;
                this.text = '暂无数据可导出';
            }
        },
        /**
         * 查看详情
         */
        sentDetail(list) {
            this.$router.go({
                path: '/actUpdate/' + list.id
            });
        },
        /**
         * 添加活动
         */
        getact() {
            this.$router.go({
                path: '/actUpdate'
            });
        },
        /**
         * 上线，下线
         */
        up(list) {
            this.options.id = list.id;
            this.options.beginTime = list.begin_time;
            this.options.endTime = list.begin_time;

            api.updateActivity(this, this.options, (back) => {

                this.findActivity();

            })
        },
        /**
         * 删除活动
         */
        deleteAct(list) {
            this.ModalShow = true;
            this.deletelist = list;
        },
        /**
         * 确认删除
         */
        godelete() {
            api.deleteActivity(this, {
                id: this.deletelist.id
            }, (back) => {
                this.ModalShow = false;
                this.findActivity();
            })
        }

    }
}
</script>
<style scoped lang="scss">
.form {
    position: relative;
    padding: 15px;
    line-height: 30px;
    h2 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400px;
        color: #666;
        border-bottom: 1px solid #d6d6d6;
    }
    .row {
        position: relative;
        padding: 5px 0 5px 70px;
    }
    .label {
        position: absolute;
        top: 5px;
        left: 10px;
    }
    p {
        padding: 10px;
        text-align: center;
        font-size: 16px;
    }
    input {
        width: 97%;
        height: 28px;
        padding-left: 5px;
        border: 1px solid #d6d6d6;
        border-radius: 5px;
    }
    .btn {
        width: 80px;
        height: 30px;
        margin: 15px auto 0;
        line-height: 30px;
        text-align: center;
        color: #ff7201;
        border-radius: 5px;
        background: #ffddc2;
    }
    .updateBtn {
        display: block;
    }
    .close {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 20px;
        color: #999;
    }
    .close:hover {
        color: #333;
    }
    .btnGroup {
        text-align: center;
        a {
            display: inline-block;
            margin: 0 30px;
        }
    }
}

.User-detail .User-detail-body .User-detail-body-bottom .User-detail-table tr {
    th,
    td {
        padding: 0 2px;
        line-height: 20px;
    }
}

.User-detail-body-bottom {
    th,
    td {
        word-break: break-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.body-item {
    select {
        min-width: 110px;
    }
}

.btn1 {
    position: relative;
    display: inline-block;
    width: 53px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background-color: #ffddc2;
    color: #ff7201;
    border-radius: 5px;
}

.form {
    position: relative;
    padding: 15px;
    line-height: 30px;
    h2 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400px;
        color: #666;
        border-bottom: 1px solid #d6d6d6;
    }
    .row {
        position: relative;
        padding: 5px 0 5px 70px;
    }
    .label {
        position: absolute;
        top: 5px;
        left: 10px;
    }
    p {
        width: 97%;
        height: 28px;
        padding-left: 5px;
        border: 1px solid #d6d6d6;
        border-radius: 5px;
    }
    input {
        width: 97%;
        height: 28px;
        padding-left: 5px;
        border: 1px solid #d6d6d6;
        border-radius: 5px;
    }
    .btn {
        width: 80px;
        height: 30px;
        margin: 15px auto 0;
        line-height: 30px;
        text-align: center;
        color: #ff7201;
        border-radius: 5px;
        background: #ffddc2;
    }
    .updateBtn {
        display: block;
    }
    .close {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 20px;
        color: #999;
    }
    .close:hover {
        color: #333;
    }
    .btnGroup {
        text-align: center;
        a {
            display: inline-block;
            margin: 0 30px;
        }
    }
}
</style>
