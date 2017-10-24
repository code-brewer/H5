<template>
	
	<div class="User-detail">
        <div class="User-detail-top">兑礼名单管理</div>
        <div class="User-detail-body">
            <div>
                <div class="body-item">
                    礼品类别:
                    <select v-model="pageConfig.gifttype">
                        <option v-for="list in giftType" :value="list.num">{{list.name}}</option>
                    </select>
                </div>
                <div class="body-item">
                    <div style="display:inline-block">
                        发货状态:
                        <select v-model="pageConfig.state">
                            <option value="">全部</option>
                            <option value="2">是</option>
                            <option value="1">否</option>
                        </select>
                    </div>
                    <div style="display:inline-block; padding-left: 15px;">
                        日期筛选:
                        <datepicker :value.sync="pageConfig.date" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="150px" top="0" left="0" ></datepicker>
                    </div>
                    <div class="search" style="float: right">
                        <input type="text" placeholder="请输入用户名进行搜索" v-model="pageConfig.name" autocomplete="on" style="padding-left: 5px;box-sizing: border-box"></input>
                        <button class="search-text" @click="getExchangeList"><i></i>搜索</button>
                    </div>
                </div>
            </div>
            
            <div class="User-detail-body-bottom">
                <table class="User-detail-table table">
                    <tbody>
                        <tr>
                            <th width="8%">用户名</th>
                            <th width="10%">OpenID</th>
                            <th width="10%">礼品名称</th>
                            <th width="10%">订单编号</th>
                            <th width="10%">礼品类型</th>
                            <th width="9%">兑换时间</th>
                            <th width="6%">姓名</th>
                            <th width="10%">电话</th>
                            <th width="10%">地址</th>
                            <th width="4%">是否发货</th>
                            <th width="8%">物流公司</th>
                            <th width="10%">物流编号</th>
                            <th width="10%">操作</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.nick}}</td>
                            <td>{{list.openid}}</td>
                            <td>{{list.giftname}}</td>
                            <td>{{list.oid}}</td>
                            <td>{{list.name}}</td>
                            <td>{{list.ctime&&(list.ctime.split(' ')[0])}}</td>
                            <td>{{list.username}}</td>
                            <td>{{list.mobile}}</td>
                            <td>{{list.addr}}</td>
                            <td>{{['', '否', '是'][list.state]}}</td>
                            <td>{{list.logisticsname}}</td>
                            <td>{{list.logisticsno}}</td>
                            <td><a href="javascript:;" class="btn btnBase btnDefault" @click="update(list)">修改</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align: right; margin-top: 20px;">
                <a :href="exportUrl" class="btnExport" @click="Export">导出名单表</a>
            </div>
            <modal :show.sync="ModalShow">
                <div class="form">
                    <h2>编辑</h2>
                    <div class="row">
                        <div class="label">姓名：</div>
                        <div>
                            <input type="text" v-model="mesList.username">
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">电话：</div>
                        <div>
                            <input type="text" maxlength="11" v-model="mesList.mobile">
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">地址：</div>
                        <div>
                            <input type="text" v-model="mesList.addr">
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">是否发货：</div>
                        <div>
                            <!-- <input type="text" v-model="mesList.stateText"> -->
                            <select v-model="mesList.state">
                                <option value="1">否</option>
                                <option value="2">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">物流公司：</div>
                        <div>
                            <input type="text" v-model="mesList.logisticsname">
                        </div>
                    </div>
                    <div class="row">
                        <div class="label">物流编号：</div>
                        <div>
                            <input type="text" v-model="mesList.logisticsno">
                        </div>
                    </div>
                    <a href="javascript:;" class="updateBtn btn" @click="ModalShow2 = true, ModalShow = false">确定</a>
                    <a href="javascript:;" class="close" @click="ModalShow = false">x</a>
                </div>
            </modal>
            <modal :show.sync="ModalShow2">
                <div class="form">
                    <p>是否确认提交信息？</p>
                    <div class="btnGroup">
                        <a href="javascript:;" class="btn" @click="submitUpdate">确认</a>
                        <a href="javascript:;" class="btn" @click="ModalShow2 = false">取消</a>
                    </div>
                    <a href="javascript:;" class="close" @click="ModalShow2 = false">x</a>
                </div>
            </modal>
            <page :config.sync="pageConfig"></page>
            <snackbar :show.sync="show" :text="text"></snackbar>
        </div>
    </div>

</template>
<script>
    import Datepicker from '../../components/Datepicker.vue'
    import page from '../../components/page.vue'
    import snackbar from '../../components/snackbar.vue'
    import api from '../../api'
    import Modal from '../../components/Modal.vue'
    export default {
        components: {
            Datepicker,
            page,
            snackbar,
            Modal
        },
        data() {
            return {
                pageConfig: {
                    total: 1,
                    pageSize: 6,
                    pageNum: 1,
                    date: '',
                    name: '',
                    gifttype: '',
                    state: ''
                },
                lists: '',
                show: false,
                text: '',
                ModalShow: false,
                ModalShow2: false,
                mesList: {
                    username: '',
                    mobile: '',
                    addr: ''
                },
                giftType: [],
                exportUrl: ''
            }
        },
        created() {
            this.getExchangeList();
            this.getGiftType();
        },
        watch: {
            'pageConfig.pageNum'() {
                this.getExchangeList();
            }
        },
        methods: {
            /**
             * [获取兑礼信息列表]
             */
            getExchangeList() {
                api.getExchangeList(this, this.pageConfig, back => {
                    if (back.resCode == '0') {
                        if (back.repBody.total !== 0) {
                            this.lists = back.repBody.list;
                            this.exportUrl = basePath + 'gift/downloadExchangeList?name='+this.pageConfig.name+'&gifttype='+this.pageConfig.gifttype+'&state='+this.pageConfig.state+'&date='+this.pageConfig.date;
                        } else {
                            this.show = true;
                            this.text = '暂无数据';
                            this.lists = [];
                            this.exportUrl = 'javascript:;'
                        }
                        this.pageConfig.total = back.repBody.total;
                    } else {
                        this.$dispatch('errorHandle', '获取兑礼列表', back.resCode);
                    }
                })
            },
            update(value) {
                this.mesList = value;
                // this.mesList.stateText = value.state == 2 ? '是' : '否';
                this.ModalShow = true;
            },
            /**
            更新编辑信息
             */
            submitUpdate() {
                this.ModalShow2 = false;
                api.updateAddrLogistics(this, this.mesList, back => {
                    if (back.resCode == '0') {
                        this.show = true;
                        this.text = '编辑成功';
                        this.getExchangeList();
                    } else {
                        this.$dispatch('errorHandle', '编辑信息', back.resCode);
                    }
                })
            },
            /**
             * [获取礼品类型]
             */
            getGiftType() {
                api.getGiftType(this, {}, back => {
                    if (back.resCode == '0') {
                        back.repBody.local.forEach(value => {
                            value.name = '本地-' + value.name;
                            this.giftType.push(value);
                        })
                        back.repBody.interface.forEach(value => {
                            value.name = '接口-' + value.name;
                            this.giftType.push(value);
                        })
                        this.giftType.unshift({name: '全部', num: ''})
                    } else {
                        this.$dispatch('errorHandle', '获取礼品类型', back.resCode);
                    }
                })
            },
            Export(e) {
                let self = e.srcElement || e.target;
                if (self.href.indexOf('javascript:;') > -1) {
                    this.show = true;
                    this.text = '暂无数据可导出';
                }
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
        th, td {
            padding: 0 2px;
            line-height: 20px;
        }
    }
    .User-detail-body-bottom {
        th,td {
            word-break: break-all;
        }
    }
    .body-item {
        select {
            min-width: 110px;
        }
    }
</style>