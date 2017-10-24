<template>
    <div class="header">
        <h1>数据查询</h1>
    </div>
    <div class="head"><span>时间</span>&nbsp;
        <datepicker v-ref:dp :value.sync="starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
        -
        <datepicker v-ref:dp :value.sync="endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a class="check" @click="load()">查看</a>
        <a class="daochu" @click="Excel()">导出excel</a>
    </div>
    <div class="data">
        <ul class="tabs">
            <li :class="{active:dataConfig.type=='WECHAT'}">微信H5数据
                <input type="radio"  id="tab1" v-model="dataConfig.type" value="WECHAT"  />
            </li>
            <li :class="{active:dataConfig.type=='WAP'}">WAP端数据
                <input type="radio"  id="tab2" v-model="dataConfig.type" value="WAP" />
                
            </li>
        </ul>
        <div id="tab-content1" class="tab-content">
                    <table class="User-detail-table">
                        <tbody>
                            <tr style="background-color:#FAA354">
                                <td style="color: #fff;" width="">时间</td>
                                <td style="color: #fff;" width="">pv量</td>
                                <td style="color: #fff;" width="">uv量</td>
                                <td style="color: #fff;" width="">绑定用户数</td>
                                <td style="color: #fff;" width="">开通短信套餐用户数</td>
                                <td style="color: #fff;" width="">代付费用户数</td>
                                <td style="color: #fff;" width="">店面服务点击量</td>
                                <td style="color: #fff;" width="">上门服务点击量</td>
                            </tr>
                            <tr v-for="list in lists">
                                <td width="">{{list.data0}}</td>
                                <td width="">{{list.data1}}</td>
                                <td width="">{{list.data2}}</td>
                                <td width="">{{list.data3}}</td>
                                <td width="">{{list.data4}}</td>
                                <td width="">{{list.data5}}</td>
                                <td width="">{{list.data6}}</td>
                                <td width="">{{list.data7}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    </div>
    <nav style="text-align: right;">
        <pager :config="pageConfig"></pager>
    </nav>
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
        <div class="close"><span @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{UploadStatus.msg}}</p>
                <a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
            </div>
        </div>
    </modale>
    <loading :show="isLoad"></loading>
</template>
<script>
import Modal from '../components/bootstrap/Modal.vue'
import Modale from '../components/newComponts/Modale.vue'
import Datepicker from '../components/bootstrap/Datepicker.vue';
import api from '../api'
import Pager from '../components/Pager.vue'
import loading from '../components/Loading.vue'
import {
    router
} from '../index'

export default {
    components: {
        Modale,
        Modal,
        Pager,
        Datepicker,
        loading
    },
    data() {
        return {
            UploadStatus: { //双重确认
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            format: ['yyyy-MM-dd'],
            lists: [], //信息列表
            dataConfig: {
                type: 'WECHAT',
                starttime: '',
                endtime: '',
                page: '1',
                pagesize: '5'
            },

            data: {
                type: '',
            },
            details: '',
            pageData: {
                page: '1',
                pagesize: '3'
            },
            pageConfig: {
                total: 0,
                curpage: 1,
                totalpage: 1
            },
            starttime: '', //开始时间
            endtime: '', //结束时间
            isLoad: false

        }
    },

    watch: {
        'pageConfig.curpage' (val) {
            if (!isNaN(+val)) {
                this.dataConfig.page = val;
                this.dataShow();
            }
        },
        'starttime ' (val) {
            console.log(val)
        },
        'endtime ' (val) {
            console.log(val)
            if (this.endtime <= this.starttime) {
                this.show("结束时间不能比开始时间前")
            }
        },
        'dataConfig.type'() {
            this.dataShow();
        }

    },

    ready() {
        this.dataShow()
    },

    methods: {
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
        },
        //导出excel
        Excel() {
            var that = this;
            window.location.href = basePath + 'log/export?starttime=' + that.dataConfig.starttime + '&endtime=' + that.dataConfig.endtime;
        },


        //获取列表信息

        dataShow() {
            var that = this;
            this.isLoad = true;
            api.loaddata(this, this.dataConfig, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    that.lists = back.repBody.list
                    that.pageConfig.totalpage = back.repBody.totalpage
                    that.pageConfig.total = back.repBody.total
                    that.pageConfig.curpage = back.repBody.curpage
                } else {
                    this.isLoad = false;
                    this.show(back.resMsg)
                }
            })
        },
        //传数据时,列表信息
        load() {
            var that = this;
            var starttime = new Date(that.starttime).getTime()
            that.dataConfig.starttime = starttime
            var endtime = new Date(that.endtime).getTime()
            that.dataConfig.endtime = endtime

            var mytime = new Date(); //取今天的日期
            var Year = mytime.getFullYear();
            var Month = mytime.getMonth() + 1;
            var getDate = mytime.getDate() + 1;
            mytime = Year + '-' + Month + '-' + getDate;
            console.log(mytime)
            console.log(that.dataConfig.endtime)
            var nowtime = new Date(mytime).getTime()
            if (nowtime < that.dataConfig.endtime) {
                this.show("选取时间必须小于今天");
                return;
            }
            this.dataConfig.page = 1;
            this.dataShow();

        },
    }
}
</script>
<style scoped>
.header {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #B9B7B7;
}

.header h1 {
    color: #ED6D03;
    line-height: 60px;
    margin-top: 0px;
    font-family: 'Microsoft YaHei';
    font-size: 20px;
    margin-left: 45px;
}

.head {
    font-family: 'Microsoft YaHei';
    font-size: 12px;
    width: 900px;
    height: 40px;
    line-height: 40px;
    margin: 56px 74px;
}

.head input {
    height: 25px;
    width: 200px;
}

.head select {
    width: 130px;
    height: 30px;
}

.data {
    margin: 56px 74px;
    height: 200px;
}

.footer {
    font-family: Microsoft YaHei;
    margin-left: 13px;
    margin-top: 182px;
    height: 177px;
    position: relative;
    font-size: 15px;
    font-weight: normal;
}

.check {
    margin-top: 5px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #F57303;
    position: absolute;
    background-color: #F57303;
    width: 90px;
    height: 30px;
    color: #fff;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
}

.daochu {
    margin-top: 5px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #F57303;
    position: absolute;
    background-color: #F57303;
    width: 90px;
    height: 30px;
    color: #fff;
    border-radius: 3px;
    margin-left: 400px;
    cursor: pointer;
}

//
table {
    border-collapse: collapse;
    border-spacing: 0
}

td.first-child {
    color: #fff;
}

.User-detail-table {
    width: 900px;
    color: #000;
    font-size: 12px;
    font-family: '宋体';
}

tr {
    width: 140px;
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
    text-align: left;
}

td {
    width: 140px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    font-size: 12px;
    text-align: center;
}

a {
    color: #000;
}

.tabs {
    position: relative;
}

.tabs li {
    /*float: left;
    display: block;
    margin-top: -12px;*/
        float: left;
    display: block;
    margin-top: -27px;
    width: 224px;
    height: 54px;
    line-height: 54px;
    background-color: #f1c79f;
    border-left-top-radius: 5px;
    text-align: center;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    cursor: pointer;
    position:relative;

}
.tabs li.active{
    background-color:#f5b57e;
}

.tabs input[type="radio"] {
    position: absolute;
        opacity: 0;
            width: 100%;
    height: 100%;
    left: 0;
}

/*.tabs label {
    padding: 20px 80px;
    border-radius: 8px 8px 0 0;
    font-size: 14px;
    font-family: '宋体';
    font-weight: normal;
    text-transform: uppercase;
    background: #F0C69E;
    cursor: pointer;
    position: relative;
    top: 4px;
    width: 220px;
    text-align: center;
    color: #000;
}*/


/*.tabs label:hover {
  background: #703688;
}*/

.tabs .tab-content {
    z-index: 2;
    display: none;
    overflow: hidden;
    width: 100%;
    font-size: 17px;
    line-height: 25px;
    position: absolute;
    top: 53px;
    left: 0;
}

.tabs [id^="tab"]:checked + label {
    background: #F5B57F;
    width: 220px;
    font-size: 14px;
    font-family: '宋体';
    text-align: center;
    color: #fff;
}

.tabs [id^="tab"]:checked ~ [id^="tab-content"] {
    width: 900px;
    margin-top: 1px;
    display: block;
}

.close {
    height: 30px;
    line-height: 30px;
    background-color: #faa354;
    position: relative;
}

.actiontong,
.nothx,
.juzhong {
    width: 73px;
    height: 28px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    border-radius: 3px;
    cursor: pointer;
    /*background: url(./images/btnBg.png);*/
}
</style>
