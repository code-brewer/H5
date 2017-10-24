<template>
    <div class="User-detail">
        <div class="User-detail-top">订单管理</div>
        <div class="User-detail-body">
            <div>
                <div class="body-item">
                    <div style="display:inline-block">
                        活动类型:
                        <select class="select-width" v-model="option.activityType">
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
                </div>
                <div class="body-item">
                    <div style="display:inline-block">
                        订单状态:
                        <select class="select-width" v-model="option.orderType">
                            <option value=''>全部</option>
                            <option value='1'>未付款</option>
                            <option value='2'>已失效</option>
                            <option value='3'>已付款</option>
                            <option value='4'>已发货</option>
                            <option value='5'>配送中</option>
                            <option value='6'>已完成</option>
                            <option value='7'>已退款</option>
                            <option value='8'>申请退款</option>
                            <option value='9'>退款中</option>
                        </select>
                    </div>
                    <div style="display:inline-block; padding-left: 15px;">
                        结束日期:
                        <datepicker :value.sync="option.endDate" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="150px" top="0" left="0"></datepicker>
                    </div>
                    <div class="search" style="float: right">
                        <input type="text" placeholder="活动名称" v-model="option.searchContent" autocomplete="on" style="padding-left: 5px;box-sizing: border-box"></input>
                        <button class="search-text" @click="getOrders"><i></i>搜索</button>
                    </div>
                </div>
                <div class="User-detail-body-bottom" style="margin-top: 50px;">
                    <table class="User-detail-table table" style="table-layout: fixed;">
                        <tbody>
                            <tr>
                                <th width="15%">活动名称</th>
                                <th width="16%">下单时间</th>
                                <th width="8%">呢称</th>
                                <th width="8%">姓名</th>
                                <th width="7%">类型</th>
                                <th width="4%">数量</th>
                                <th width="8%">活动价</th>
                                <th width="5%">实付金额</th>
                                <th width="8%">状态</th>
                                <th width="15%">操作</th>
                            </tr>
                            <tr v-for="list in lists">
                                <td>{{list.title}}</td>
                                <td>{{list.createTime}}</td>
                                <td>{{list.nick}}</td>
                                <td>{{list.name}}</td>
                                <td>{{['1人团 ', '10人团', '20人团', '30人团'][list.type]}}</td>
                                <td>{{list.number}}</td>
                                <td>{{(list.money.split(',')[0])}}元</br>{{(list.money.split(',')[1])}}贝壳币</td>
                                <td>{{list.paidMoney}}</td>
                                <td><a href="javascript:;" class="btn1" @click="logisticsDetail(list)">{{['','未付款','已失效','已付款','已发货','配送中','已完成','已退款','申请退款','退款中'][list.status]}}</a></td>
                                <td>
                                    <a href="javascript:;" class="btn1" @click="sentDetail(list)">查看详情</a>
                                    <a href="javascript:;" class="btn1" @click="refund(list)" v-if="list.isShowRefund == 1">退款</a>
                                    <a href="javascript:;" class="btn1" style="background-color: #9e9e9e;color: #ffddc2;" v-else>退款</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="text-align: right; margin-top: 20px;">
                    <a :href="exportUrl" class="btnExport" @click="Export">导出名单表</a>
                    <a href="javascript:;" class="uploadBtn1">上传Excel<input type="file" @change="upload($event)"  accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></a>
                </div>
                <modal :show.sync="ModalShow">
                    <div class="form">
                        <h2>订单详情</h2>
                        <div class="row">
                            <div class="label">商品名称：</div>
                            <div>
                                <input type="text" v-model="mesList.title">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">订单编号：</div>
                            <div>
                                <input type="text" maxlength="11" v-model="mesList.orderId">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">下单时间：</div>
                            <div>
                                <input type="text" v-model="mesList.createTime">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">花妈价：</div>
                            <div>
                                <input type="text" v-model="mesList.money">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">实付：</div>
                            <div>
                                <input type="text" v-model="mesList.paidMoney">
                            </div>
                        </div>
                        <h2>客户详情</h2>
                        <div class="row">
                            <div class="label">收货人：</div>
                            <div>
                                <input type="text" v-model="address.name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">联系电话：</div>
                            <div>
                                <input type="text" maxlength="11" v-model="address.mobile">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">收货地址：</div>
                            <div>
                                <p type="text">{{address.province}}&nbsp{{address.area}}&nbsp{{address.city}}&nbsp{{address.address}}</p>
                            </div>
                        </div>
                        <h2>用户备注</h2>
                        <div class="row">
                            <div class="label">备注：</div>
                            <div>
                                <input type="text" v-model="content">
                            </div>
                        </div>
                        <a href="javascript:;" class="updateBtn btn" @click="sentDetailUpdate">朕已阅</a>
                        <a href="javascript:;" class="close" @click="ModalShow = false">x</a>
                    </div>
                </modal>
                <modal :show.sync="ModalShow1">
                    <div class="form">
                        <h2>订单详情</h2>
                        <div class="row">
                            <div class="label">商品名称：</div>
                            <div>
                                <input type="text" v-model="mesList.title">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">订单编号：</div>
                            <div>
                                <input type="text" maxlength="11" v-model="mesList.orderId">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">下单时间：</div>
                            <div>
                                <input type="text" v-model="mesList.createTime">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">花妈价：</div>
                            <div>
                                <input type="text" v-model="mesList.money">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">实付：</div>
                            <div>
                                <input type="text" v-model="mesList.paidMoney">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">退款时间：</div>
                            <div>
                                <input type="text" v-model="mesList.createTime">
                            </div>
                        </div>
                        <h2>客户详情</h2>
                        <div class="row">
                            <div class="label">收货人：</div>
                            <div>
                                <input type="text" v-model="address.name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">联系电话：</div>
                            <div>
                                <input type="text" maxlength="11" v-model="address.mobile">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">收货地址：</div>
                            <div>
                                <p type="text">{{address.province}}&nbsp{{address.area}}&nbsp{{address.city}}&nbsp{{address.address}}</p>
                            </div>
                        </div>
                        <h2>退款备注</h2>
                        <div class="row">
                            <div class="label">备注：</div>
                            <div>
                                <input type="text" v-model="content">
                            </div>
                        </div>
                        <a href="javascript:;" class="updateBtn btn" @click=" refundUpdate">同意退款</a>
                        <a href="javascript:;" class="close" @click="ModalShow1 = false">x</a>
                    </div>
                </modal>
                <modal :show.sync="ModalShow2">
                    <div class="form">
                        <h2>是否确认退款？</h2>
                        <div class="btnGroup">
                            <a href="javascript:;" class="btn" @click="submitUpdate">确认</a>
                            <a href="javascript:;" class="btn" @click="ModalShow2 = false">取消</a>
                        </div>
                        <a href="javascript:;" class="close" @click="ModalShow2 = false">x</a>
                    </div>
                </modal>
                <modal :show.sync="ModalShow3">
                    <div class="form">
                        <h2>客户详情</h2>
                        <div class="row">
                            <div class="label">收货人：</div>
                            <div>
                                <input type="text" v-model="address.name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">联系电话：</div>
                            <div>
                                <input type="text" maxlength="11" v-model="address.mobile">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">收货地址：</div>
                            <div>
                                <p type="text">{{address.province}}&nbsp{{address.area}}&nbsp{{address.city}}&nbsp{{address.address}}</p>
                            </div>
                        </div>
                        <h2>物流详情</h2>
                        <div class="row">
                            <div class="label">运单号：</div>
                            <div>
                                <input type="text" v-model="logistics.logisticsNum">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">物流公司：</div>
                            <div>
                                <input type="text" maxlength="11" v-model="logistics.logisticsName">
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">物流信息：</div>
                            <div>
                                <p>{{logistics.logisticsContent}}</p>
                            </div>
                        </div>
                        <a href="javascript:;" class="updateBtn btn" @click="ModalShow3 = false">确定</a>
                        <a href="javascript:;" class="close" @click="ModalShow3 = false">x</a>
                    </div>
                </modal>
                <modal :show.sync="ModalShow4">
                <h2>上传成功</h2>
                    <div class="form">
                        <div v-for="list in errorlist">
                            <div>
                                <p style="width:400px"> {{list}}</p>
                            </div>
                        </div>
                        <a href="javascript:;" class="updateBtn btn" @click="ModalShow4 = false">确定</a>
                    </div>
                </modal>
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
import Datepicker from '../../components/Datepicker.vue'
import Modal from '../../components/Modal.vue'
import DateUtils from '../../dist/DateUtils.js'
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
                current: 1, //当前页数
                searchContent: '', // 活动名、用户名、订单号模糊搜索
                activityType: '', // 0-1人团   1-10人团  2-20人团   3-30人团'
                orderType: '', //1未付款   2已失效   3已付款   4已发货  5配送中   6已完成   7已退款   8申请退款   9退款中
                beginDate: '', // 开始日期
                endDate: '' // 结束日期
            },
            pageConfig: {
                total: 1,
                pageSize: '',
                pageNum: 1,
                pageTotal: 1,
            }, //翻页
            orderRemark: {},
            content: '', //订单描述
            lists: {}, //列表
            address: {}, //地址
            logistics: {}, //物流
            show: false,
            text: '',
            ModalShow: false, //查看详情弹窗
            ModalShow1: false, //退款
            ModalShow2: false, //退款确认
            ModalShow3: false, //物流
            ModalShow4: false, //上传excel
            mesList: {},
            giftType: [],
            exportUrl: '',
            excellist: {},
            errorlist: {},

        }
    },
    created() {
        this.getOrders();
    },
    watch: {
        'pageConfig.pageNum' () {
            this.getOrders();
        }
    },
    methods: {
        /**
         * 获取订单列表
         */
        getOrders() {
            this.option.current = this.pageConfig.pageNum
            api.findOrders(this, this.option, back => {
                if (back && back.list) {
                    var arr = back.list,
                        len = arr.length;
                    for (var i = 0; i < len; i++) {
                        arr[i].createTime = DateUtils.formatDate(new Date(arr[i].createTime), 'yyyy-MM-dd HH:mm:ss');
                    };

                    this.lists = arr;
                    // console.log(this.lists)
                }
                // console.log(basePath_3)
                this.exportUrl = basePath_3 + 'activity/out/excel/order?searchContent=' + this.option.searchContent + '&activityType=' + this.option.activityType + '&orderType=' + this.option.orderType + '&beginDate=' + this.option.beginDate + '&endDate=' + this.option.endDate;
                this.pageConfig.total = back.totalCount;
                this.pageConfig.pageSize = back.pageSize;
                this.pageConfig.pageTotal = Math.ceil(this.pageConfig.total / this.pageConfig.pageSize) == 0 ? 1 : Math.ceil(this.pageConfig.total / this.pageConfig.pageSize);

            })
        },
        /*
        获取地址
        */
        getaddress() {
            console.log(this.mesList)
            this.address = '';
            api.findAddress(this, {
                groupOrderId: this.mesList.orderId
            }, back => {
                if (back.object) {
                    this.address = back.object;
                } else {
                    // this.ModalShow = false;
                    // this.ModalShow1 = false;
                    // this.show = true;
                    // this.text = back.remark;
                }
            });
        },

        /**
        更新编辑信息
         */
        submitUpdate() {
            this.ModalShow2 = false;
            api.orderRefund(this, {
                groupOrderId: this.mesList.orderId
            }, back => {
                if (back.success == '1') {
                    this.show = true;
                    this.text = '退款成功';
                    this.getOrders();
                } else {
                    this.show = true;
                    this.text = back.remark;
                }
            })
        },
        /**
         * 导出Excel
         */
        Export(e) {
            let self = e.srcElement || e.target;
            if (self.href.indexOf('javascript:;') > -1) {
                this.show = true;
                this.text = '暂无数据可导出';
            }
        },

        /**
         * 上传Excel
         */
        upload(e) {
            var self = e.srcElement || e.target,
                files = self.files[0],
                form = new FormData(),
                xhr = new XMLHttpRequest();
            form.append('Content-Type', files.type || 'application/octet-stream');
            form.append('file', files)
            xhr.open('POST', basePath_3 + 'resource/upload/excel', true);
            xhr.send(form);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    var res = JSON.parse(xhr.responseText);
                    this.excellist = res;
                    this.excelcheck();
                }
            }
        },
        /**
         * 物流详情
         */
        logisticsDetail(value) {
            this.mesList = value;
            api.orderDetail(this, {
                groupOrderId: this.mesList.orderId
            }, back => {
                if (back.object) {
                    this.logistics = back.object;
                    console.log(this.logistics)
                }
                this.ModalShow3 = true;
            });
            this.getaddress();
        },
        /**
         * 查看详情
         */
        sentDetail(value) {
            this.mesList = value;
            this.orderRemark.groupOrderId = value.orderId;
            this.orderRemark.status = '1';
            this.content = '',
                api.findOrderRemark(this,
                    this.orderRemark, back => {
                        if (back.success == 1 && back.object) {
                            this.content = back.object.content;
                        }
                    })
            this.ModalShow = true;
            this.getaddress();
        },
        /**
         * 修改用户备注
         */
        sentDetailUpdate() {
            this.orderRemark.content = this.content;
            api.addOrderRemark(this,
                this.orderRemark, back => {
                    if (back.success == 1) {
                        this.ModalShow = false;
                    } else {
                        this.show = true;
                        this.text = back.remark;
                    }
                })
        },
        /**
         * 退款详情
         */
        refund(value) {

            this.mesList = value;
            this.orderRemark.groupOrderId = value.orderId;
            this.orderRemark.status = '2';
            this.content = '',
                api.findOrderRemark(this,
                    this.orderRemark, back => {
                        if (back.success == 1) {
                            this.content = back.object.content;
                        }
                    })
            this.getaddress();
            api.auditRefund(this, {
                groupOrderId: this.orderRemark.groupOrderId
            }, back => {
                if (back.success == 1) {
                    this.ModalShow1 = true;
                }
            })

        },
        /**
         * 审核退款
         */

        /**
         * 修改退款备注
         */
        refundUpdate() {
            this.orderRemark.content = this.content;
            api.addOrderRemark(this,
                this.orderRemark, back => {
                    if (back.success == 1) {
                        this.ModalShow2 = true;
                        this.ModalShow1 = false
                    } else {
                        this.show = true;
                        this.text = back.remark;
                    }
                })
        },
        /**
         * 检测订单与物流excelexcelcheck
         */
        excelcheck() {
            api.excelcheck(this,
                this.excellist, back => {
                    if (back.object != '') {
                        this.errorlist = back.object;
                        this.ModalShow4 = true;
                    } else {
                        this.show = true;
                        this.text = '上传成功';
                    }
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

.uploadBtn,
.uploadBtn1 {
    width: 80px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 0 5px 5px 0;
    border: 1px solid #d6d6d6;
    background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        filter: alpha(opacity=0);
        z-index: 10;
        cursor: pointer;
    }
}

.uploadBtn1 {
    position: relative;
    display: inline-block;
    border-radius: 5px;
}
</style>
