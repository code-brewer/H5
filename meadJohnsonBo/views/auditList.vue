<template>
    <div class="User-detail">
        <div class="User-detail-top">核销订单列表</div>
        <div class="User-detail-body">
            <div class="User-detail-body-top">
                <div class="body-item">
                    获得途径:
                    <select>
                        <option>全部</option>
                        <option>妈咪打卡</option>
                    </select>
                </div>
                <div class="body-item">
                    选择时间:
                    <a class="time-pick"></a>
                    <div class="pick-warp">
                        <input type="text" class="time-range" style="position: absolute; top: 0; width: 150px; padding-left: 5px;box-sizing: border-box;" placeholder="年-月-日" @click="display=true" v-model="timeRange">
                        <double-date :display.sync="display" :value.sync="timeRange"></double-date>
                    </div>
                </div>
                <!--优化  -->
                <div class="search" style="float: right;">
                    订单号:
                    <input type="text" style="width:200px;box-sizing: border-box;" v-model="listData.openid" placeholder="请输入订单号或openId">
                    <button class="search-text" @click="searchlist"><i></i>搜索</button>
                </div>
                <!--优化截止  -->
            </div>
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="10%">用户名</th>
                            <th width="20%">订单号</th>
                            <th width="25%">openId</th>
                            <th width="20%">申请时间</th>
                            <th width="10%">返现状态</th>
                            <th width="5%">操作</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.nick}}</td>
                            <td>{{list.order_num}}</td>
                            <td>{{list.openid}}</td>
                            <td>{{list.ctime}}</td>
                            <!-- <td>{{list.is_pay}}</td> -->
                            <td v-if="list.is_pay==1">未返现</td>
                            <td v-else="list.is_pay==2">已返现</td>
                            <td>
                                <a class="link" v-link="{name: 'orstatus', params:{order_num:list.order_num}}">详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <page :config.sync="pageConfig"></page>
        </div>
    </div>
</template>
<script>
import {
    router
} from '../index'
import api from '../api'
import doubleDate from '../components/doubleDate.vue'
import page from '../components/page.vue'

export default {
    components: {
        doubleDate,
        page
    },
    data() {
        return {
            pageConfig: {
                total: 0,
                pageSize: 12,
                pageNum: 1
            },
            lists: [],
            listData: {
                openid: '',
                is_pay: '',
                order_num: '',
                photo_url: '',
                photo_type: '',
                signDate: '',
                pageNum: 1,
                pageSize: 12
            },
            timeRange: '', //选择时间段
            whereData: {
                state: "" //返现状态
            },
            format: ['yyyy-MM-dd'],
            display: false
        }

    },

    ready() {
        this.getOrderList();
    },
    watch: {
        'pageConfig.pageNum'(val) {
            this.getOrderList();
        },
        'listData.signDate' (val) {
            if (val) {
                this.getOrderList();
            }
        }
    },

    methods: {
        getOrderList() {
            this.listData.pageNum = this.pageConfig.pageNum;
            api.getUserOrder(this, this.listData, (back) => {
                // console.log(back)
                if (back.resCode == "0") {
                    this.lists = back.repBody.list;
                    this.pageConfig.total = back.repBody.total;
                }
            })
        },
        searchlist() {
            this.pageConfig.pageNum = 1;
            this.getOrderList();

        }


    }
}
</script>
