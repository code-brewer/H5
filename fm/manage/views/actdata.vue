<template>
    <div class="content-title">活动管理 &gt 签到活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <div class="topic-left" style="margin-right:30px;">活动主题:{{activityTopic}}
            </div>
            <div class="topic-left">统计开始时间:
                <datepicker v-ref:dp :value.sync="starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
                统计结束时间:
                <datepicker v-ref:dp :value.sync="endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
            </div>
            <div class="topic-left">
                <a @click="check" class="check">查询</a>
                <a @click="dao" class="dao">导出</a>
            </div>
        </div>
            <table class="AcountTable" style="margin-top:20px">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <th class="rightTd" style="width:5%;" >序号</th>
                        <th class="rightTd" style="width:8%;">统计时间</th>
                        <th class="rightTd" style="width:10%;">活动PV</th>
                        <th class="rightTd" style="width:10%;">活动UV</th>
                        <th class="rightTd" style="width:10%;">签到页PV</th>
                        <th class="rightTd" style="width:10%;">签到页UV</th>
                        <th class="rightTd" style="width:10%;">抽奖页PV</th>
                        <th class="rightTd" style="width:10%;">抽奖页UV</th>
                        <th class="rightTd" style="width:10%;">签到次数</th>
                        <th class="rightTd" style="width:10%;">抽奖次数</th>
                        <th class="rightTd" style="width:10%;">分享次数</th>
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!==0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.cdate}}</td>
                        <td class="rightTd" style="width:10%;">{{list.pv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.uv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.signpv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.signuv}}</td>
                       <td class="rightTd" style="width:10%;">{{list.prizepv}}</td>
                       <td class="rightTd" style="width:10%;">{{list.prizeuv}}</td>
                       <td class="rightTd" style="width:10%;">{{list.signcnt}}</td>
                       <td class="rightTd" style="width:10%;">{{list.prizecnt}}</td>
                       <td class="rightTd" style="width:10%;">{{list.sharecnt}}</td>
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="11" style="text-align:center">暂无数据</td>
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
            lists:[],
            activityTopic:'活动主题AAA',
        }
    },
    methods:{
        check(){
            api.getActivityData(this,{starttime:this.starttime,endtime:this.endtime},(back)=>{
                if(back.resCode == "0"){
                    this.lists = back.repBody
                }else {
                    alert(back.resMsg)
                }
                
            })
        },
        dao(){
            var that = this;
            window.location.href = basePath + 'fmActivityCtrl/getActivityDataExcel?starttime='+that.starttime+'&endtime='+that.endtime
        }
    },
    ready(){
        this.check();
        this.activityTopic = sessionStorage.getItem('activityname');
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
