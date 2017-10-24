<template>
    <div class="content-title">活动管理 &gt 签到活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <div class="topic-left" style="margin-right:30px;">活动主题:{{activityTopic}}
            </div>
            <div class="topic-left">统计开始时间:
                <datepicker v-ref:dp :value.sync="luckData.starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
                统计结束时间:
                <datepicker v-ref:dp :value.sync="luckData.endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
            </div>
            <div class="exp">
                <div class="topic-left">
                    用户id: <input type="text" v-model="luckData.accounts"/>
                </div>
                <div class="topic-left" style="margin-left:35px;">
                    用户昵称:<input type="text" v-model="luckData.nickName"/>
                </div>
                <div class="topic-left">
                    <a @click="check" class="check">查询</a>
                    <a @click="luckdao" class="dao">导出</a>
                </div>
            </div>  
        </div>
            <table class="AcountTable" style="margin-top:20px">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <th class="rightTd" style="width:5%;" >序号</th>
                        <th class="rightTd" style="width:8%;">用户id</th>
                        <th class="rightTd" style="width:10%;">用户昵称</th>
                        <th class="rightTd" style="width:10%;">中奖奖品</th>
                        <th class="rightTd" style="width:10%;">中奖时间</th>
                        <th class="rightTd" style="width:10%;">收货人</th>
                        <th class="rightTd" style="width:10%;">联系电话</th>
                        <th class="rightTd" style="width:10%;">收货地址</th>
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!==0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.accounts}}</td>
                        <td class="rightTd" style="width:10%;">{{list.nickname}}</td>
                        <td class="rightTd" style="width:10%;">{{list.pname}}</td>
                        <td class="rightTd" style="width:10%;">{{list.ctime}}</td>
                        <td class="rightTd" style="width:10%;">{{list.username}}</td>
                        <td class="rightTd" style="width:10%;">{{list.mobile}}</td>
                        <td class="rightTd" style="width:10%;">{{list.addr}}</td>
                       
                    </tr>
                    <tr v-show="lists.length==0">
                        <td colspan="8" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
       
    </div>
</template>
<script>
import Datepicker from '../components/Datepicker.vue'
import Vue from 'vue'
import api from '../api/index.js'
export default {
    components: {
        Datepicker
    },
    data() {
        return {
            format: ['yyyy-MM-dd'],
            starttime: '',
            endtime: '',
            lists:[
            // {
            //     "topic":"活动主题XXX",
            //     "time":"1"
            // },
            // {
            //     "topic":"活动主题XXX",
            //     "time":"1"
            // },
            // {
            //     "topic":"活动主题XXX",
            //     "time":"1"
            // }
            ],
            activityTopic:'活动主题AAA',
            luckData:{
                starttime:'',
                endtime:'',
                nickName:'',
                accounts:'',
                cdate:''
            },
            cdate:''
        }
    },
    methods:{
        check(){
            api.getLuckyData(this,this.luckData,(back)=>{
                if(back.resCode == "0"){
                    this.lists = back.repBody
                }
            })
        },
        luckdao(){
            var that = this;
            window.location.href = basePath + 'fmActivityCtrl/getLuckyDataExcel?accounts='+that.luckData.accounts+'&nickName='+that.luckData.nickName+'&starttime='+that.luckData.starttime+'&endtime='+that.luckData.endtime+'&cdate='+that.luckData.cdate
        }
    },
    ready(){
        
        this.activityTopic = sessionStorage.getItem('activityname');
        this.cdate = sessionStorage.getItem('activitycdate');
        this.luckData.cdate = sessionStorage.getItem('activitycdate');
        this.check();
        
    }
    
}

</script>
<style lang="scss" scoped>
.actinput {
    .topic-left {
        display: inline-block;
        height: 100%;
        color: #2f3c4c;
    }
    .topic {
        height: 30px;
        line-height: 30px;
        width: 200px;
    }
}
</style>
