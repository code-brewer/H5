<template>
    <div class="content-title">活动管理 &gt 签到活动</div>
    <div class="padding">
        <div class="actinput" style="">
            <div class="topic-left"><span class="pink">*</span>活动主题:
                <input class="topic" placeholder="请输入活动主题" v-model="activityData.title" />
            </div>
            <div class="topic-left"><span class="pink">*</span>活动时间:
                <!-- <datepicker v-ref:dp :value.sync="activityData.starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker> -->
                <input class="datainp" id="dateinfo" type="text" placeholder="开始时间" readonly style="height:28px;width:200px;" v-model="activityData.starttime"> 至
                <!-- <datepicker v-ref:dp :value.sync="activityData.endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker> -->
                <input class="datainp" id="datemarks" type="text" placeholder="结束时间" readonly style="height:28px;width:200px;" v-model="activityData.endtime">
            </div>
        </div>
        <div>
            <div class="topic-left"><span class="pink">*</span>签到页:</div>
            <div class="signPage">
                <div class="signbg">
                    <div class="signbg-left"><span class="pink">*</span>签到页背景图:</div>
                    <div style="float:left;">
                        <div style="background-color:#e7ded2;padding:10px;">
                            <img :src="activityData.homebgimgurl" class="bg-pic">
                        </div>
                        <div style="line-height:40px;">格式:jpg/png</div>
                        <file-upload name="homebgImgurl" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                    </div>
                </div>
                <div class="signrule">
                    <div class="prize-name"><span class="pink">*</span>活动规则:</div>
                    <!-- <textarea name="app-ckeditor" id="app-ckeditor" v-model=""></textarea> -->
                    <textarea style="height:250px;width:90%;padding:10px;box-sizing:border-box;" v-model="activityData.signrule"></textarea>
                </div>
            </div>
        </div>
        <div>
            <div class="topic-left"><span class="pink">*</span>抽奖页:</div>
            <div class="signPage">
                <div class="signbg">
                    <div class="signbg-left"><span class="pink">*</span>抽奖页背景图:</div>
                    <div style="float:left;">
                        <div style="background-color:#e7ded2;padding:10px;">
                            <img :src="activityData.prizeimgurl" class="bg-pic">
                        </div>
                        <div style="line-height:40px;">格式:jpg/png</div>
                        <file-upload name="prizeImgurl" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                    </div>
                </div>
                <div class="signrule">
                    <div class="prize-name"><span class="pink">*</span>活动规则:</div>
                    <!-- <textarea name="app-ckeditor" id="app-ckeditor" v-model=""></textarea> -->
                    <textarea style="height:250px;width:90%;padding:10px;box-sizing:border-box;" v-model="activityData.prizerule"></textarea>
                </div>
            </div>
        </div>
        <div>
            <div class="topic-left"><span class="pink">*</span>奖品页:</div>
            <div class="signPage">
                <div class="signbg">
                    <div class="signbg-left"><span class="pink">*</span>奖品页背景图:</div>
                    <div style="float:left;">
                        <div style="background-color:#e7ded2;padding:10px;">
                            <img :src="activityData.homeimgurl" class="bg-pic">
                        </div>
                        <div style="line-height:40px;">格式:jpg/png</div>
                        <file-upload name="homeImgurl" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                    </div>
                </div>
                <div class="signrule">
                    <div class="prize-name"><span class="pink">*</span>活动规则:</div>
                    <!-- <textarea name="app-ckeditor" id="app-ckeditor" v-model=""></textarea> -->
                    <textarea style="height:250px;width:90%;padding:10px;box-sizing:border-box;" v-model="activityData.receiverule"></textarea>
                </div>
            </div>
        </div>
        <div>
            <div class="topic-left"><span class="pink">*</span>分享说明:</div>
            <div class="signPage" style="padding:8px;box-sizing:border-box;">
                <table>
                    <tbody>
                        <tr>
                            <td><span class="pink">*</span>分享背景:</td>
                            <td><img :src="activityData.shareimgurl" style="width:60px;height:auto;"><span>格式:jpg/png</span>
                                <file-upload name="shareImgurl" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                            </td>
                        </tr>
                        <tr style="height: 50px;">
                            <td><span class="pink">*</span>分享标题:</td>
                            <td>
                                <textarea v-model="activityData.sharetitle" style="line-height:20px;padding:0 10px;height:50px;"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><span class="pink">*</span>分享描述:</td>
                            <td>
                                <textarea v-model="activityData.sharedes" style="height:90px;line-height:20px;padding:0 10px;"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div style="text-align:center;margin:10px 0;">
            <a class="check" @click="save">保存</a>
        </div>
        <div>
            <div class="topic-left"><span class="pink">*</span>奖品设置:</div>
            <div class="prizePage">
                <div style="border-bottom:1px solid #000;display: flex;padding:8px;box-sizing: border-box;">
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span>奖品一:</div>
                        <div class="prize-input"><span class="pink">*</span>奖品名称:
                            <input class="prize-input-content" v-model="prizeData[0].pname" />
                        </div>
                    </div>
                    <div class="three-one">
                        <div style="float:left;">
                            <span class="pink">*</span><span>奖品图:</span></br>
                            <span style="line-height:40px;">格式:jpg/png</span></br>
                            
                            <div >
                                <file-upload name="prizeone" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                            </div>
                            <div style="height:26px;line-height:26px;margin-top:10px;">
                                <span class="pink">*</span><span>奖品类型:</span>
                                <select v-model="prizeData[0].types" style="display:inline-block;height:100%;">
                                    <option value="1">实物</option>
                                    <option value="2">虚物</option>
                                </select>
                            </div>
                        </div>
                        <div style="width:60px;float:left;margin-left:10px;">
                            <img :src="prizeData[0].imgurl" class="prizepicture">
                        </div>
                    </div>
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span><span>奖品概率:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[0].winrate" /><span>【注:/万】</span>
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>奖品数量:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[0].prize_cnt" />
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>解锁天数:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[0].unlock_day" /><span>【解锁天数大于1】</span>
                        </div>
                    </div>
                </div>
                <div style="border-bottom:1px solid #000;display: flex;padding:8px;box-sizing: border-box;">
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span>奖品二:</div>
                        <div class="prize-input"><span class="pink">*</span>奖品名称:
                            <input class="prize-input-content" v-model="prizeData[1].pname" />
                        </div>
                    </div>
                    <div class="three-one">
                        <div style="float:left;">
                            <span class="pink">*</span><span>奖品图:</span></br>
                            <span style="line-height:40px;">格式:jpg/png</span></br>
                            
                            <div >
                                <file-upload name="prizesec" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                            </div>
                            <div style="height:26px;line-height:26px;margin-top:10px;">
                                <span class="pink">*</span><span>奖品类型:</span>
                                <select v-model="prizeData[1].types" style="display:inline-block;height:100%;">
                                    <option value="1">实物</option>
                                    <option value="2">虚物</option>
                                </select>
                            </div>
                        </div>
                        <div style="width:60px;float:left;margin-left:10px;">
                            <img :src="prizeData[1].imgurl" class="prizepicture">
                        </div>
                    </div>
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span><span>奖品概率:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[1].winrate" /><span>【注:/万】</span>
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>奖品数量:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[1].prize_cnt" />
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>解锁天数:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[1].unlock_day" /><span>【解锁天数大于1】</span>
                        </div>
                    </div>
                </div>
                <div style="border-bottom:1px solid #000;display: flex;padding:8px;box-sizing: border-box;">
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span>奖品三:</div>
                        <div class="prize-input"><span class="pink">*</span>奖品名称:
                            <input class="prize-input-content" v-model="prizeData[2].pname" />
                        </div>
                    </div>
                    <div class="three-one">
                        <div style="float:left;">
                            <span class="pink">*</span><span>奖品图:</span></br>
                            <span style="line-height:40px;">格式:jpg/png</span></br>
                            
                            <div >
                                <file-upload name="prizethree" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                            </div>
                            <div style="height:26px;line-height:26px;margin-top:10px;">
                                <span class="pink">*</span><span>奖品类型:</span>
                                <select v-model="prizeData[2].types" style="display:inline-block;height:100%;">
                                    <option value="1">实物</option>
                                    <option value="2">虚物</option>
                                </select>
                            </div>
                        </div>
                        <div style="width:60px;float:left;margin-left:10px;">
                            <img :src="prizeData[2].imgurl" class="prizepicture">
                        </div>
                    </div>
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span><span>奖品概率:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[2].winrate" /><span>【注:/万】</span>
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>奖品数量:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[2].prize_cnt" />
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>解锁天数:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[2].unlock_day" /><span>【解锁天数大于1】</span>
                        </div>
                    </div>
                </div>
                <div style="border-bottom:1px solid #000;display: flex;padding:8px;box-sizing: border-box;">
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span>奖品四:</div>
                        <div class="prize-input"><span class="pink">*</span>奖品名称:
                            <input class="prize-input-content" v-model="prizeData[3].pname" />
                        </div>
                    </div>
                    <div class="three-one">
                        <div style="float:left;">
                            <span class="pink">*</span><span>奖品图:</span></br>
                            <span style="line-height:40px;">格式:jpg/png</span></br>
                            
                            <div >
                                <file-upload name="prizefour" action="upload/upVideoOrFile" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload>
                            </div>
                            <div style="height:26px;line-height:26px;margin-top:10px;">
                                <span class="pink">*</span><span>奖品类型:</span>
                                <select v-model="prizeData[3].types" style="display:inline-block;height:100%;">
                                    <option value="1">实物</option>
                                    <option value="2">虚物</option>
                                </select>
                            </div>
                        </div>
                        <div style="width:60px;float:left;margin-left:10px;">
                            <img :src="prizeData[3].imgurl" class="prizepicture">
                        </div>
                    </div>
                    <div class="three-one">
                        <div class="prize-name"><span class="pink">*</span><span>奖品概率:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[3].winrate" /><span>【注:/万】</span>
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>奖品数量:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[3].prize_cnt" />
                        </div>
                        <div class="prize-name"><span class="pink">*</span><span>解锁天数:</span>
                            <input type="text" class="fixwidth" v-model="prizeData[3].unlock_day" /><span>【解锁天数大于1】</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center;margin:10px 0;">
            <a class="check" @click="saveprize" style="width:100px;">保存奖品</a>
        </div>
    </div>
    <modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
        <div class="close"><span @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:50px;box-sizing:border-box">
            <p style="line-height:30px;text-align:center;">{{doubleStatus.msg}}</p>
        </div>
        <div style="padding:0px 50px;text-align:center;">
            <!-- <a class="actiontong" @click="tijiao()">确定</a> -->
            <a @click="this.doubleStatus.showMsg = false" class="nothx">确定</a>
        </div>
    </modale>
</template>
<script>
import Datepicker from '../components/Datepicker.vue'
import Vue from 'vue'
import api from '../api/index.js'
import Modale from '../components/Modale.vue'
import fileUpload from '../js/file-upload.vue'
export default {
    components: {
        Datepicker,
        Modale,
        'file-upload': fileUpload
    },
    data() {
        return {
            format: ['yyyy-MM-dd'],
            starttime: '',
            endtime: '',
            images: location.href.split('#')[0] + "src/images/1.jpg",
            prizeImg: location.href.split('#')[0] + "src/images/music.jpg",
            sharetext: '个去韩国荣光和七日个七个人群殴我光和热后期hi我给我扔几个一克拉',
            sharedec: 'lalalallallal',
            activityData: {
                "title": "活动标题",
                "homeimgurl": "", //首页主题图片
                "homebgimgurl": "", //首页背景图片
                "prizeimgurl": "", //抽奖页奖品图片
                "prizerule": "抽奖规则:连续签3124天",
                "receiverule": "领奖规则:过时不候",
                "signrule": "签到规则:3322",
                "sharetitle": "分享标题",
                "shareimgurl": "", //活动分享图片
                "sharedes": "分享描述",
                "starttime": "2016-01-01 12:12:21", //活动开始时间
                "endtime": "2017-01-01 12:12:21", //活动结束时间
                "cdate": ''

            },
            doubleStatus: { //单选确认
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            prizeData: [{
                "imgurl": "", //奖项图片
                "pid": "4", //奖项ID
                "pname": "四等奖", //奖项名称
                "prize_cnt": "30", //奖品数量
                "unlock_day": "3", //所需解锁天数
                "winrate": "", //中奖概率
                "types": "1"
            }, {
                "imgurl": "", //奖项图片
                "pid": "3", //奖项ID
                "pname": "三等奖", //奖项名称
                "prize_cnt": "30", //奖品数量
                "unlock_day": "7", //所需解锁天数
                "winrate": "", //中奖概率
                "types": "1"
            }, {
                "imgurl": "", //奖项图片
                "pid": "2", //奖项ID
                "pname": "二等奖", //奖项名称
                "prize_cnt": "30", //奖品数量
                "unlock_day": "14", //所需解锁天数
                "winrate": "", //中奖概率
                "types": "1"
            }, {
                "imgurl": "", //奖项图片
                "pid": "1", //奖项ID
                "pname": "一等奖", //奖项名称
                "prize_cnt": "30", //奖品数量
                "unlock_day": "21", //所需解锁天数
                "winrate": "", //中奖概率
                "types": "1"
            }],
            isActivity: false

        }
    },
    methods: {
        /*加载Ckeditor*/
        // loadCkeditor(){
        //  var that = this;
        //  window.CKEDITOR_BASEPATH = basePath + 'build/js/ckeditor/';

        //  diyRequire('build/js/ckeditor/ckeditor.js', ()=>{
        //      console.log(CKEDITOR);
        //      that.ck = CKEDITOR.replace('app-ckeditor');
        //      that.ck1 = CKEDITOR.replace('app-ckeditor1');
        //      console.log(that.ck)
        //      that.ck.on('change', updateModel);
        //      that.ck1.on('change', updateModel1);
        //      function updateModel() {
        //          that.activitiesDeatilData.activityrule = that.ck.getData();
        //          that.currTemplate.extbody.ruleContent = that.ck.getData();
        //      }
        //      function updateModel1() {
        //          that.activitiesDeatilData.back2 = that.ck.getData();
        //          that.currTemplate.extbody.ruleContent1 = that.ck1.getData();
        //      }
        //  });
        // }
        save() {
            var that = this;
            // if(this.isActivity){

            // }
            api.updateActivity(this, this.activityData, (back) => {
                if (back.resCode == '0') {
                    this.doubleStatus.showMsg = true;
                    this.doubleStatus.msg = back.repBody.msg;
                    this.selectActivity();

                } else {
                    this.doubleStatus.showMsg = true;
                    this.doubleStatus.msg = back.resMsg
                }
            })

        },
        saveprize() {
            if(this.prizeData[0].unlock_day == this.prizeData[1].unlock_day || this.prizeData[0].unlock_day == this.prizeData[2].unlock_day ||this.prizeData[0].unlock_day == this.prizeData[3].unlock_day ||this.prizeData[1].unlock_day == this.prizeData[2].unlock_day || this.prizeData[1].unlock_day == this.prizeData[3].unlock_day ||this.prizeData[2].unlock_day == this.prizeData[3].unlock_day){
                    this.doubleStatus.showMsg = true;
                    this.doubleStatus.msg = "解锁天数不能相同"
                    return;
            }


            for (let i = 0; i < this.prizeData.length; i++) {

                if(this.prizeData[i].unlock_day==1){
                    this.doubleStatus.showMsg = true;
                    this.doubleStatus.msg = "解锁天数不能为1"
                    return;
                }

                

                api.updatePrize(this, this.prizeData[i], (back) => {

                    if (back.resCode == '0') {
                        console.log(i)
                        if (i == 3) {
                            this.doubleStatus.showMsg = true;
                            this.doubleStatus.msg = "奖品保存成功"
                        }
                    } else {
                        this.doubleStatus.showMsg = true;
                        this.doubleStatus.msg = back.resMsg
                    }

                })
            }
        },
        selectActivity() {
            api.selectActivity(this, {}, (back) => {
                if (back.resCode == '0') {
                    if (back.repBody.length !== '0') {
                        this.activityData = back.repBody[0];
                        this.activityData.cdate = back.repBody[0].cdate;
                        // this.isActivity = true;
                    }


                }
            })
        },
        selectPrize() {
            api.selectPrize(this, {}, (back) => {
                if (back.resCode == '0') {
                    this.prizeData = back.repBody;
                }
            })
        }

    },
    created() {},
    ready() {
        var that = this;
        this.selectActivity();
        this.selectPrize();
        require(['../js/timejs/jedate.js'], function(jeDate) {
            console.log(jeDate)

            that.$nextTick(function() {
                jeDate({
                    dateCell: "#dateinfo",
                    isinitVal: true,
                    isTime: true, //isClear:false,
                    minDate: "2014-09-19 00:00:00",
                    choosefun: function(val) {
                        that.activityData.starttime = val;
                    },
                    okfun: function(val) {
                        that.activityData.starttime = val;
                    }
                })
                jeDate({
                    dateCell: "#datemarks",
                    isinitVal: true,
                    isTime: true, //isClear:false,
                    minDate: "2014-09-19 00:00:00",
                    choosefun: function(val) {
                        that.activityData.endtime = val;
                    },
                    okfun: function(val) {
                        that.activityData.endtime = val;
                    }
                })

                that.activityData.starttime = document.getElementById('dateinfo').value;
                that.activityData.endtime = document.getElementById('datemarks').value;
            })

        })
    },
    events: {
        onFileClick: function(file) {
            // console.log('onFileClick', file);
        },
        onFileChange: function(file) {
            // console.log('onFileChange', file);
            // here is where we update our view
            this.fileProgress = 0;
            this.allFilesUploaded = false;

            var reg = /.xlsx|.xls$/;
            console.log(file)
            if (reg.test(file[0].name)) {
                // this.addPrizeFileName = file[0].name;

            }

        },
        beforeFileUpload: function(file) {
            // called when the upload handler is called
            // console.log('beforeFileUpload', file);
            this.$dispatch('progress', 1)
        },
        afterFileUpload: function(file) {
            // called after the xhr.send() at the end of the upload handler
            // console.log('afterFileUpload', file);
        },
        onFileProgress: function(progress) {
            console.log('onFileProgress', progress);
            // update our progress bar
            this.fileProgress = progress.percent;
        },
        onFileUpload: function(file, res, params) {
            console.log("上传传功-->")
            if (res.resCode == 0) {
                this.$dispatch('progress', 0);
                if (file._id == "homeImgurl") {
                    // console.log(res.repBody)
                    this.activityData.homeimgurl = res.repBody.fileUrl;
                } else if (file._id == "homebgImgurl") {
                    // console.log(res.repBody)
                    this.activityData.homebgimgurl = res.repBody.fileUrl;
                } else if (file._id == "prizeImgurl") {
                    // console.log(res.repBody)
                    this.activityData.prizeimgurl = res.repBody.fileUrl;
                } else if (file._id == "shareImgurl") {
                    // console.log(res.repBody)
                    this.activityData.shareimgurl = res.repBody.fileUrl;
                } else if (file._id == "prizeone") {
                    // console.log(res.repBody)
                    this.prizeData[0].imgurl = res.repBody.fileUrl;
                } else if (file._id == "prizesec") {
                    // console.log(res.repBody)
                    this.prizeData[1].imgurl = res.repBody.fileUrl;
                } else if (file._id == "prizethree") {
                    // console.log(res.repBody)
                    this.prizeData[2].imgurl = res.repBody.fileUrl;
                } else if (file._id == "prizefour") {
                    // console.log(res.repBody)
                    this.prizeData[3].imgurl = res.repBody.fileUrl;
                }

            }
        },
        onFileError: function(file, res) {
            console.error('onFileError', file, res);
        },
        onAllFilesUploaded: function(files) {
            console.log('onAllFilesUploaded', files);
            // everything is done!
            this.allFilesUploaded = true;
        }
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
