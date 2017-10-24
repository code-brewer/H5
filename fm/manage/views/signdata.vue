<template>
    <div class="content-title">活动管理 &gt 签到活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <div class="topic-left" style="margin-right:30px;">活动主题:{{activityTopic}}
            </div>
            <!-- <div class="exp"> -->
                <div class="topic-left">
                    用户id: <input type="text" style="height:30px" v-model="accounts"/>
                </div>
                <div class="topic-left">
                    用户昵称:<input type="text" style="height:30px;" v-model="nickName" />
                </div>
                <div class="topic-left">
                    <a @click="signcheck" class="check">查询</a>
                    <a @click="signdao" class="dao">导出</a>
                </div>
            <!-- </div>   -->
        </div>
            <table class="AcountTable" style="margin-top:20px">
                <tbody>
                    <tr style="background-color:#2f3c4c;">
                        <th class="rightTd" style="width:5%;" >序号</th>
                        <th class="rightTd" style="width:8%;">用户id</th>
                        <th class="rightTd" style="width:10%;">用户昵称</th>
                        <th class="rightTd" style="width:10%;">签到月份</th>
                        <th class="rightTd" style="width:10%;">本月累计签到次数</th>
                        <th class="rightTd" style="width:10%;">本月最高连续签到数据</th>
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!==0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.accounts}}</td>
                        <td class="rightTd" style="width:10%;">{{list.nickname}}</td>
                        <td class="rightTd" style="width:10%;">{{list.cdate}}</td>
                        <td class="rightTd" style="width:10%;">{{list.cumulative_cn}}</td>
                        <td class="rightTd" style="width:10%;">{{list.max_cnt}}</td>
                        
                       
                    </tr>
                    <tr v-show="lists.length==0">
                        <td colspan="6" style="text-align:center">暂无数据</td>
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
            accounts:'',
            nickName:''
        }
    },
    methods:{
        signcheck(){
            
            api.getSignData(this, {accounts:this.accounts,nickName:this.nickName}, (back) => {
                    if (back.resCode === '0') {
                        this.lists = back.repBody
                    }else{
                    }
                })
        },
        signdao(){
            var that = this;
            window.location.href = basePath + 'fmActivityCtrl/getSignDataExcel?accounts='+that.accounts+'&nickName='+that.nickName
        }
    },
    ready(){
        this.signcheck();
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
