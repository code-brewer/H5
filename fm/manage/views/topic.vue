<template>
    <div class="content-title">数据管理 &gt 签到活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <div class="topic-left">活动主题:
                <input class="topic" placeholder="请输入活动主题" v-model="activitylist.title"/>
            </div>
            <div class="topic-left">活动时间:
                <datepicker v-ref:dp :value.sync="activitylist.starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
                至
                <datepicker v-ref:dp :value.sync="activitylist.endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
            </div>
            <div class="topic-left" style="width:100px;">
                <a  class="check" @click="sou">搜索</a>
            </div>
        </div>
       <!--  <div> -->
            <table class="AcountTable">
                <tbody>
                    <tr style="background-color:#2f3c4c;">
                        <th class="rightTd" style="width:5%;">序号</th>
                        <th class="rightTd" style="width:10%;">活动主题</th>
                        <th class="rightTd" style="width:30%;">活动周期</th>
                        <th class="rightTd" style="width:8%;">活动数据</th>
                        <th class="rightTd" style="width:8%;">中奖用户</th>
                        <th class="rightTd" style="width:8%;">签到数据</th>
                        <th class="rightTd" style="width:8%;">分享页数据</th>
                    </tr>
                    <tr v-for="list in lists">
                        <td class="rightTd">{{$index + 1}}</td>
                        <td class="rightTd">{{list.title}}</td>
                        <td class="rightTd">{{list.starttime}}-{{list.endtime}}</td>
                        <td class="rightTd">
                            <a class="checkbtn"  @click="activityData(list)">查看</a>
                        </td>
                        <td class="rightTd">
                            <a class="checkbtn"  @click="winUser(list)">查看</a>
                        </td>
                        <td class="rightTd">
                            <a class="checkbtn"  @click="signData(list)">查看</a>
                        </td>
                        <td class="rightTd">
                            <a class="checkbtn"  @click="shareData(list)">查看</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        <!-- </div> -->
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
            }
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
                    this.lists = back.repBody
                }
            })
        },
        activityData(item){
            sessionStorage.setItem('activityname',item.title);
            sessionStorage.setItem('activitycdate',item.cdate);
            this.$route.router.go({path: "/actdata"})
        },
        winUser(item){
            sessionStorage.setItem('activityname',item.title);
             sessionStorage.setItem('activitycdate',item.cdate);
            this.$route.router.go({path: "/winnerUse"})
        },
        signData(item){
            sessionStorage.setItem('activityname',item.title);
             sessionStorage.setItem('activitycdate',item.cdate);
            this.$route.router.go({path: "/signdata"})
        },
        shareData(item){
            sessionStorage.setItem('activityname',item.title);
            sessionStorage.setItem('activitycdate',item.cdate);
            this.$route.router.go({path: "/sharedata"})
        }

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
</style>
