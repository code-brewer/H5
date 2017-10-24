<template>
    <div class="content-title">活动管理 &gt 会员活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <div class="topic-left" style="margin-right:30px;">活动主题:{{activityTopic}}
            </div>
            <div class="topic-left">统计开始时间:
                <datepicker v-ref:dp :value.sync="activitylist.starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
                统计结束时间:
                <datepicker v-ref:dp :value.sync="activitylist.endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
            </div>
            <div class="topic-left">
                <a @click="check" class="check">查询</a>
                <a @click="dao" class="dao">导出</a>
            </div>
            <div class="topic-left">活动数据:
                <select v-model="activityType" @change="selectList(1)" style="font-size: 14px; vertical-align: middle; width: 100px; height: 30px;">
                    <option value="">选择类型</option>
                    <option v-for="item in typeList" value="{{item.tid}}">{{item.title}}</option>
                </select>
            </div>
        </div>
        <div class="main-con"  v-if="activityType == 'activity'">
            <table class="AcountTable" style="margin-top:20px" id="stats_datatable1">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <td class="rightTd color-f" style="width:5%;" >序号</td>
                        <td class="rightTd color-f" style="width:8%;">统计时间</td>
                        <td class="rightTd color-f" style="width:10%;">首页PV</td>
                        <td class="rightTd color-f" style="width:10%;">首页UV</td>
                        <td class="rightTd color-f" style="width:10%;">活动介绍PV</td>
                        <td class="rightTd color-f" style="width:10%;">活动介绍UV</td>
                        <td class="rightTd color-f" style="width:10%;">开通会员PV</td>
                        <td class="rightTd color-f" style="width:10%;">开通会员UV</td>
                        <td class="rightTd color-f" style="width:10%;">活动直播PV</td>
                        <td class="rightTd color-f" style="width:10%;">活动直播UV</td>
                        <td class="rightTd color-f" style="width:10%;">沃音乐网站PV</td>
                        <td class="rightTd color-f" style="width:10%;">沃音乐网站UV</td>
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!=0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.cdate}}</td>
                        <td class="rightTd" style="width:8%;">{{list.homepv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.homeuv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.jieshaopv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.jieshaouv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.kaitongpv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.kaitonguv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.zhibopv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.zhibouv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.woyinyuepv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.woyinyueuv}}</td>
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="12" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="main-con"  v-if="activityType == 'prize'">
            <table class="AcountTable" style="margin-top:20px" id="stats_datatable2">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <td class="rightTd color-f" style="width:5%;" >序号</td>
                        <td class="rightTd color-f" style="width:10%;">中奖手机号</td>
                        <td class="rightTd color-f" style="width:10%;">领奖手机号</td>
                        <td class="rightTd color-f" style="width:10%;">奖品类型</td>
                        <td class="rightTd color-f" style="width:10%;">奖品名称</td>
                        <td class="rightTd color-f" style="width:10%;">姓名</td>
                        <td class="rightTd color-f" style="width:10%;">地址</td>
                        <td class="rightTd color-f" style="width:8%;">中奖时间</td>
                       
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!=0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.mobile}}</td>
                        <td class="rightTd" style="width:10%;">{{list.pmobile}}</td>
                        <td class="rightTd" style="width:10%;">{{list.types}}</td>
                        <td class="rightTd" style="width:10%;">{{list.pname}}</td>
                        <td class="rightTd" style="width:10%;">{{list.username}}</td>
                        <td class="rightTd" style="width:10%;">{{list.addr}}</td>
                        <td class="rightTd" style="width:8%;">{{list.ctime}}</td>
                     
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="8" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="main-con"  v-if="activityType == 'buyfail'">
            <table class="AcountTable" style="margin-top:20px" id="stats_datatable3">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <td class="rightTd color-f" style="width:5%;" >序号</td>
                        <td class="rightTd color-f" style="width:10%;">活动时间</td>
                        <td class="rightTd color-f" style="width:10%;">手机号</td>
                        <td class="rightTd color-f" style="width:10%;">开通时间</td>
                        <td class="rightTd color-f" style="width:10%;">失败原因</td>
                        <td class="rightTd color-f" style="width:10%;">产品id</td>
                      
                       
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!=0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.atime}}</td>
                        <td class="rightTd" style="width:10%;">{{list.mobile}}</td>
                        <td class="rightTd" style="width:10%;">{{list.opentime}}</td>
                        <td class="rightTd" style="width:10%;">{{list.type}}</td>
                        <td class="rightTd" style="width:10%;">{{list.prid}}</td>
                      
                     
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="6" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="main-con"  v-if="activityType == 'member'">
            <table class="AcountTable" style="margin-top:20px" id="stats_datatable4">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <td class="rightTd color-f" style="width:5%;" >序号</td>
                        <td class="rightTd color-f" style="width:10%;">活动时间</td>
                        <td class="rightTd color-f" style="width:10%;">立即领取按钮PV</td>
                        <td class="rightTd color-f" style="width:10%;">立即领取按钮UV</td>
                        <td class="rightTd color-f" style="width:10%;">用户成功验证UV</td>
                        <td class="rightTd color-f" style="width:10%;">沃音乐会员权益页马上开通按钮PV</td>
                        <td class="rightTd color-f" style="width:10%;">沃音乐会员权益页马上开通按钮UV</td>
                        <td class="rightTd color-f" style="width:10%;">开通信息确认按钮PV</td>
                        <td class="rightTd color-f" style="width:10%;">开通信息确认按钮UV</td>
                       <!--  <td class="rightTd color-f" style="width:10%;">
                        会员成功开通数</td> -->
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!=0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.cdate}}</td>
                        <td class="rightTd" style="width:10%;">{{list.lingqupv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.lingquuv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.isvalidateuv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.kaitongpv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.kaitonguv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.querenpv}}</td>
                        <td class="rightTd" style="width:10%;">{{list.querenuv}}</td>
                        <!-- <td class="rightTd" style="width:10%;">{{list.querenuv}}</td>  -->
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="9" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="main-con"  v-if="activityType == 'dolucky'">
            <table class="AcountTable" style="margin-top:20px" id="stats_datatable5">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <td class="rightTd color-f" style="width:5%;" >序号</td>
                        <td class="rightTd color-f" style="width:10%;">活动时间</td>
                       <!--  <td class="rightTd color-f" style="width:10%;">用户成功验证数</td> -->
                        <td class="rightTd color-f" style="width:10%;">抽奖次数</td>
                        <td class="rightTd color-f" style="width:10%;">抽奖人数</td>
                        <td class="rightTd color-f" style="width:10%;">中奖用户数</td>
                        
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!=0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.ctime}}</td>
                        <!-- <td class="rightTd" style="width:10%;">{{list.rn}}</td> -->
                        <td class="rightTd" style="width:10%;">{{list.cishu}}</td>
                        <td class="rightTd" style="width:10%;">{{list.renshu}}</td>
                        <td class="rightTd" style="width:10%;">{{list.zhongjiangshu}}</td>
                        
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="5" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="main-con"  v-if="activityType == 'openvip'">
            <table class="AcountTable" style="margin-top:20px" id="stats_datatable6">
                <tbody>
                <tr style="background-color:#2f3c4c;">
                        <td class="rightTd color-f" style="width:5%;" >序号</td>
                        <td class="rightTd color-f" style="width:10%;">活动时间</td>
                        <td class="rightTd color-f" style="width:10%;">用户标识</td>
                        <td class="rightTd color-f" style="width:10%;">开通手机号码</td>
                        <td class="rightTd color-f" style="width:10%;">开通时间</td>
                        <td class="rightTd color-f" style="width:10%;">产品ID</td>
                        
                    </tr>
                    <tr v-for="list in lists" v-show="lists.length!=0">
                        <td class="rightTd" style="width:5%;" >{{$index + 1}}</td>
                        <td class="rightTd" style="width:8%;">{{list.ctime}}</td>
                        <td class="rightTd" style="width:10%;">{{list.userid}}</td>
                        <td class="rightTd" style="width:10%;">{{list.prmobile}}</td>
                        <td class="rightTd" style="width:10%;">{{list.opertime}}</td>
                        <td class="rightTd" style="width:10%;">{{list.prid}}</td>
                        
                    </tr>
                    <tr v-show="lists.length==0">
                        <td  colspan="6" style="text-align:center">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
            <pager :pagenum.sync="activitylist.pageNum" :pagesize="activitylist.pageSize" :total.sync="total">
            </pager>
       
    </div>
</template>
<script>
import Datepicker from '../components/Datepicker.vue'
import Pager from '../components/Pager.vue'
import Vue from 'vue'
import api from '../api/index.js'
export default {
    components: {
        Pager,
        Datepicker
    },
    data() {
        return {
            format: ['yyyy-MM-dd'],
            starttime: '',
            endtime: '',
            lists:[],
            activityTopic:'活动主题AAA',
            activitylist:{
                aid:this.$route.params.aid,
                starttime:'',
                endtime:'',
                pageNum:1,
                pageSize:20

            },
            total:0,
            typeList:[{tid:'activity',title:'活动页面'},{tid:'member',title:'会员领取'},{tid:'dolucky',title:'抽奖流程'},{tid:'openvip',title:'开通会员'},{tid:'prize',title:'中奖信息'},{tid:'buyfail',title:'订购失败'}],
            activityType:'activity',
            
        }
    },
    watch: {
            'activitylist.pageNum'(val) {
                console.log("val"+val);
                this.check();

            }
    },
    methods:{
        check(){
            if(this.activityType == 'prize'){
                api.getLuckyData(this,this.activitylist,(back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.list){
                            this.lists = back.repBody.list;
                        }else{
                             this.lists=[];
                        }
                        this.total = back.repBody.total;
                    }else {
                        alert(back.resMsg);
                    }
                    
                });
            }else if(this.activityType == 'buyfail'){
                api.getFailedData(this,this.activitylist,(back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.list){
                            this.lists = back.repBody.list;
                        }else{
                             this.lists=[];
                        }
                        this.total = back.repBody.total;
                    }else {
                        alert(back.resMsg);
                    }
                    
                }); 
            }else if(this.activityType == 'member'){
                api.getMemberData(this,this.activitylist,(back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.list){
                            this.lists = back.repBody.list;
                        }else{
                             this.lists=[];
                        }
                        this.total = back.repBody.total;
                    }else {
                        alert(back.resMsg);
                    }
                    
                });
            }else if(this.activityType == 'dolucky'){
                api.getPrizeData(this,this.activitylist,(back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.list){
                            this.lists = back.repBody.list;
                        }else{
                             this.lists=[];
                        }
                        this.total = back.repBody.total;
                    }else {
                        alert(back.resMsg);
                    }
                    
                });
            }else if(this.activityType == 'openvip'){
                api.getOperData(this,this.activitylist,(back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.list){
                            this.lists = back.repBody.list;
                        }else{
                             this.lists=[];
                        }
                        this.total = back.repBody.total;
                    }else {
                        alert(back.resMsg);
                    }
                    
                });
            }
            else{
               api.getActivityData(this,this.activitylist,(back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.list){
                            this.lists = back.repBody.list;
                        }else{
                             this.lists=[];
                        }
                        this.total = back.repBody.total;
                    }else {
                        alert(back.resMsg);
                    }
                    
                }); 
            }
            
        },
        selectList() {
            console.log(this.activityType);
           this.check();
        },
        dao(){
            if(this.activityType == 'prize'){
                 var that = this;
                window.location.href = basePath + 'memberCtrl/getLuckyDataExcel?aid='+ that.activitylist.aid+'&starttime='+that.activitylist.starttime +'&endtime='+ that.activitylist.endtime;
               
            }else if(this.activityType == 'buyfail'){
                var that = this;
                window.location.href = basePath + 'memberCtrl/getFailedDataExcel?aid='+ that.activitylist.aid+'&starttime='+that.activitylist.starttime +'&endtime='+ that.activitylist.endtime;
            }else if(this.activityType == 'member'){
                var that = this;
                window.location.href = basePath + 'memberCtrl/getMemberDataExcel?aid='+ that.activitylist.aid+'&starttime='+that.activitylist.starttime +'&endtime='+ that.activitylist.endtime;
            }else if(this.activityType == 'dolucky'){
                var that = this;
                window.location.href = basePath + 'memberCtrl/getPrizeDataExcel?aid='+ that.activitylist.aid+'&starttime='+that.activitylist.starttime +'&endtime='+ that.activitylist.endtime;
            }else if(this.activityType == 'openvip'){
                var that = this;
                window.location.href = basePath + 'memberCtrl/getOperDataExcel?aid='+ that.activitylist.aid+'&starttime='+that.activitylist.starttime +'&endtime='+ that.activitylist.endtime;
            }
            else{
                var that = this;
                window.location.href = basePath + 'memberCtrl/getActivityDataExcel?aid='+ that.activitylist.aid+'&starttime='+that.activitylist.starttime +'&endtime='+ that.activitylist.endtime;
            }
             
            // var that = this;
            // window.location.href = basePath + 'fmActivityCtrl/getActivityDataExcel?starttime='+that.starttime+'&endtime='+that.endtime;
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
.main-con{
    // height: 600px;
    // overflow-y: scroll;
}
.AcountTable {
    .rightTd.color-f{
        color: #fff;
    }
}

</style>
