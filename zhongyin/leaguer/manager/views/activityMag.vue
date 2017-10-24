<template>
    <div class="content-title">活动管理 &gt 会员活动</div>
    <div class="padding">
       
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
               sharetitle: "分享标题",
                shareimgurl: "http://211.147.242.132:9008/fsd/ap/20170323/88_b64ef279_1d80_401f_ad82_ffdf043b81d9.jpg", //活动分享图片
                sharedes: "分享描述",
                aid: this.$route.params.aid

            },
            doubleStatus: { //单选确认
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            isActivity: false,
            

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
            api.shareActicity(this, this.activityData, (back) => {
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
        selectActivity() {
            api.selectActivityById(this, {aid: this.activityData.aid}, (back) => {
                if (back.resCode == '0') {
                    if (back.repBody[0].sharetitle != undefined || back.repBody[0].shareimgurl != undefined || back.repBody[0].sharedes != undefined) {
                        this.activityData = back.repBody[0];
                        
                    }


                }
            })
        },
        
    },
    created() {},
    ready() {
        var that = this;
        this.selectActivity();
       
        
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
            if (res.resCode == 0) {
                console.log("上传传功-->")
                this.$dispatch('progress', 0);
                if (file._id == "shareImgurl") {
                    // console.log(res.repBody)
                    this.activityData.shareimgurl = res.repBody.fileUrl;
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
