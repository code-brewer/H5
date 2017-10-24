<template>
    <div class="content-title">数据管理 &gt 会员活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <!-- <div class="topic-left">活动数据:
                <select v-model="activitylist.type" @change="selectList(1)" style="font-size: 14px; vertical-align: middle;">
                    <option value="">选择类型</option>
                    <option v-for="item in typeList" value="{{item.tid}}">{{item.title}}</option>
                </select>
            </div> -->
            <div class="topic-left">活动时间:
                <datepicker v-ref:dp :value.sync="activitylist.starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
                至
                <datepicker v-ref:dp :value.sync="activitylist.endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
            </div>
            <div class="topic-left" style="width:100px;">
                <a  class="check" @click="sou">搜索</a>
            </div>
            <!--  <div class="topic-left" style="width:100px;">
                <a  class="check" @click="dao">导出</a>
            </div> -->
        </div>
        <table class="AcountTable" id="stats_datatable">
            <tbody>
                <tr style="background-color:#2f3c4c;">
                    <td class="rightTd color-f" style="width:5%;">序号</td>
                    <td class="rightTd color-f" style="width:10%;">活动主题</td>
                    <td class="rightTd color-f" style="width:30%;">活动周期</td>
                    <td class="rightTd color-f" style="width:8%;">活动数据</td>
                    <td class="rightTd color-f" style="width:8%;">分享配置</td>
                    <!-- <td class="rightTd color-f" style="width:8%;">签到数据</td>
                    <td class="rightTd color-f" style="width:8%;">分享页数据</td> -->
                </tr>
                <tr v-for="list in lists">
                    <td class="rightTd">{{list.aid}}</td>
                    <td class="rightTd">{{list.title}}</td>
                    <td class="rightTd">{{list.starttime}}-{{list.endtime}}</td>
                    <td class="rightTd">
                        <a class="checkbtn"  @click="activityData(list)">查看</a>
                    </td>
                    <td class="rightTd">
                        <a class="checkbtn"  @click="shareSet(list)">查看</a>
                    </td>
                   <!--  <td class="rightTd">
                        <a class="checkbtn"  @click="signData(list)">查看</a>
                    </td>
                    <td class="rightTd">
                        <a class="checkbtn"  @click="shareData(list)">查看</a>
                    </td> -->
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
            lists:[{
                "topic":"活动主题XXX",
                "time":"2017.2.1~2017.2.28"
            },
            {
                "topic":"活动主题XXX",
                "time":"2017.2.1~2017.2.28"
            },
            {
                "topic":"活动主题XXX",
                "time":"2017.2.1~2017.2.28"
            }],
            activitylist:{
                title:'',
                starttime:'',
                endtime:''
            },
        }
    },
    created() {
        // console.log("ddddd")
        this.sou();
    },
    methods:{
        sou(){
            api.selectActivityList(this, this.activitylist,(back)=> {
                if ( back.resCode == '0') {
                    this.lists = back.repBody;
                }
            })
        },
        activityData(item){
            sessionStorage.setItem('activityname',item.title);
            sessionStorage.setItem('activitycdate',item.cdate);
            this.$route.router.go({ name: 'actdata', params: { aid: item.aid}})
        },
        shareSet(item){
            sessionStorage.setItem('activityname',item.title);
            sessionStorage.setItem('activitycdate',item.cdate);
            this.$route.router.go({ name: 'activityMag', params: { aid: item.aid}})
        },
        // winUser(item){
        //     sessionStorage.setItem('activityname',item.title);
        //      sessionStorage.setItem('activitycdate',item.cdate);
        //     this.$route.router.go({path: "/winnerUse"})
        // },
        // signData(item){
        //     sessionStorage.setItem('activityname',item.title);
        //      sessionStorage.setItem('activitycdate',item.cdate);
        //     this.$route.router.go({path: "/signdata"})
        // },
        // shareData(item){
        //     sessionStorage.setItem('activityname',item.title);
        //     sessionStorage.setItem('activitycdate',item.cdate);
        //     this.$route.router.go({path: "/sharedata"})
        // },
        // dao(){
        //     $('#stats_datatable').tableExport({

        //     type:'excel',

        //     escape:'false',

        //     fileName: 'UV_statistic_table'

        //     });
        // }

        /*加载Ckeditor*/
        // loadCkeditor() {
        //     var that = this;
        //     window.CKEDITOR_BASEPATH = basePath + 'build/js/ckeditor/';

        //     diyRequire('build/js/ckeditor/ckeditor.js', () => {
        //         console.log(CKEDITOR);
        //         that.ck = CKEDITOR.replace('app-ckeditor');
        //         that.ck1 = CKEDITOR.replace('app-ckeditor1');
        //         console.log(that.ck)
        //         that.ck.on('change', updateModel);
        //         that.ck1.on('change', updateModel1);

        //         function updateModel() {
        //             that.activitiesDeatilData.activityrule = that.ck.getData();
        //             that.currTemplate.extbody.ruleContent = that.ck.getData();
        //         }

        //         function updateModel1() {
        //             that.activitiesDeatilData.back2 = that.ck.getData();
        //             that.currTemplate.extbody.ruleContent1 = that.ck1.getData();
        //         }
        //     });
        // }
    },
    ready(){
        // this.sou();
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
.AcountTable {
    .rightTd.color-f{
        color: #fff;
    }
}
</style>
