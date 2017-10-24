<template>
    <div class="header">
        <h1>短信管理</h1>
    </div>

    <div style="margin:37px 0 0 50px;">
        <div class="enter">
            <p>收信人：</p>
            <div>
                <input style="width: 200px;height: 27px;padding-left:15px;box-sizing:border-box;" type="text" v-model="sendConfig.phone"></input>
            </div>
            <div style="margin-top:20px;height:30px;">
                <span style="">批量导入：</span>
                <file-upload name="homeBg" action="file/import" :auto="true" class="upload-btn"  style="display:inline-block;margin-left: -10px;"></file-upload>
                <input class="uploadbox" placeholder="导入的文件" v-model="addPrizeFileName" style="height:100%;border:none;border-bottom:1px solid #ccc;width: 116px;"></input>
            </div>
            <div style="margin:10px 0;">
                <a  style="color: #004AAE;float:left;cursor: pointer;margin-right:15px;" @click="openExample">下载表格示例</a>
		        <a style="color: #FF1A1A;float:left;cursor: pointer"  @click ="delimport()">删除表格</a>
            </div>    
           
            
            <textarea class="txtArea" v-model="allText.content" ></textarea>
            <div class="submit">
                <a class="btn" @click="send()">发送</a>
            </div>
            <div>
                <!-- <p style="color: red;margin:0;text-align:center;line-height:24px;margin-top:20px;">
                    注意：短信发送请选择个人或批量发送中的一种!
                </p> -->
            </div>
        </div>
        <div class="model">
            <div class="content">
                <p style="text-align:center;">短信模板</p>
                <table>
                    <tbody>
                        <tr v-for="list in lists">
                            <td  style="width:10%;">
                                <input type="radio" :value="list.id" name="clicktxt" v-model="id" style="margin-right:5px;" :id="list.id" :checked="$index+1 == 1"/>
                            </td>
                            <td  style="width:20%;">
                                模板{{$index + 1}}：
                            </td>
                            <td style=" width:60%;"><label  style="line-height: 19px;border: 0;resize: none;width: 220px;" :for="list.id">{{list.content}}</label>
                            </td>
                            <td  style="width:10%;text-align: center;">
                                <input name="" type="button" style="width:18px; height:18px;  border:0; background:url(../carserve/src/m/images/Message-close.png) no-repeat left top" @click="del(list.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="add">
                <p>增加模板：</p>
                <textarea style="margin-left:30px;height: 113px;width: 240px;resize: none; width: 75%;resize: none;padding:10px;box-sizing: border-box;" v-model="addCofig.content"></textarea>
            </div>
            <div class="submit">
                <a class="btn" style="margin-top:45px;" @click="add()">保存模板</a>
            </div>
        </div>
    </div>
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
        <div class="close"><span @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{UploadStatus.msg}}</p>
                <a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
            </div>
        </div>
    </modale>
    <modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
     <div class="close"><span  @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:20px;">
            <p style="line-height:100px;text-align:center;">确定删除短信模板?</p>
            
        </div>
        <div style="padding:0px 50px;">
            <a  class="actiontong" @click="shanchu()">确定</a>
            <a @click="this.doubleStatus.showMsg = false, delId = ''" class="nothx">取消</a>
        </div>
    </modale>
    <loading :show="isLoad"></loading>
</template>
<script type="text/javascript">
import api from '../api'
import Vue from 'vue'
import {router} from '../index'
import Modale from '../components/newComponts/Modale.vue'
import loading from '../components/Loading.vue'
export default {
    components: {
        Modale,
        loading

    },
    data() {
        return {
            doubleStatus: {    //双重确认
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null
            },
            UploadStatus: {    //单向确认
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            sendConfig: {
                phone: '',          //手机号
                path: '',           //excle表格
                content: '',        //短信内容
            },
            addCofig: {
                content: '',
            },
            id:'',
            lists: [],              //短信模板
            file: '',

            messageModel: {},
            areaText:{},
            allText:{               //发送短信模板参数
                content:'',
                id:''
            },
            addPrizeFileName:'',    //上传文件名
            isLoad:false,
            delId: ''               //临时变量,存当前短信模板id
        }
    },watch: {
        'id'(val){
            this.filter();
        }
    },
    methods: {
        showTips(message){
                this.doubleStatus.msg = message;
                this.doubleStatus.showMsg = true;
        },
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
        },
        filter(){
            this.lists.forEach(value => {
                if (value.id === this.id) {
                    this.allText.content = value.content;
                }
            })
        },
        send() {    //发送短信
            var that = this;
            if(!this.sendConfig.phone && !this.sendConfig.path ){
                this.show("手机号或excle表格要选填其一!")
                return;
            }

            if(this.sendConfig.phone && this.sendConfig.path ){
                this.show("手机号或excle表格不能同时编辑,只能选填一个!")
                return;
            }

            if(!this.allText.content){
                this.show("短信内容框不能为空!")
                return;
            }

            this.sendConfig.content = this.allText.content
            this.isLoad = true;
            api.send(this, this.sendConfig, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.show(back.repBody);
                }else{
                    this.isLoad = false;
                    this.show(back.resMsg);
                }
            })

        },
        //增加模板
        add(){
            var that = this;
            if(!this.addCofig.content){
                this.show("新短信模板内容不能为空!")
            } 

            if(!/^.{1,100}$/.test(this.addCofig.content)){
                this.show("新短信模板内容不能为空且不超过100个字符!")
                return;
            }
            this.isLoad = true;
            api.add(this, this.addCofig, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.show("添加短信模板成功!")
                    this.messageModel = back.repBody;
                    this.lists.push(this.messageModel);
                    this.lists = this.lists
                }else{
                    this.isLoad = false;
                    this.show(back.resMsg)
                }
            })
            this.addCofig.content = '';

        },
        //删除模板
        del(id){
            var that = this;
            this.delId = id;     
            this.doubleStatus.showMsg = true;

        },
        //读取模板
        load() {
            this.isLoad = true;
            api.load(this,{}, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.lists = back.repBody
                }else{
                    this.isLoad = false;
                    this.show(back.resMsg)
                }
            })
        },
        
        //打开示例
        openExample() {
            window.location.href =  basePath + 'file/example?id=1'
        },
        //删除表格
        delimport() {
            this.sendConfig.path = ""
            this.addPrizeFileName =""
        },
        shanchu() {
            if (this.delId) {
                this.isLoad = true;
                api.del(this, {id:this.delId}, (back) => {
                    if (back.resCode == "0") {
                        this.isLoad = false;
                        this.doubleStatus.showMsg = false;
                        this.delId = '';
                        this.show("删除模板成功!")
                        this.load();                                
                    }else{
                        this.isLoad = false;
                        this.show(back.resMsg)
                    }
                })
            }
        }

    },
    created() {
        Vue.component('file-upload', function (resolve) {
              require(['../js/vue.file-upload.js','../js/vue.pretty-bytes.js'], resolve)
            });
    },
    ready() {
        this.load()
    },
    events: {
            onFileClick: function(file) {
            },
            onFileChange: function(file) {
              this.fileProgress = 0;
              this.allFilesUploaded = false;

              var reg = /.xlsx|.xls$/;
              if(reg.test(file[0].name)){
                this.addPrizeFileName = file[0].name;
                console.log(this.addPrizeFileName)
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
            onFileUpload: function(file, res,params) {
                console.log("上传传功-->")
                if(res.resCode==0) {
                    this.$dispatch('progress', 0);
                    if(file._id=="homeBg") {
                        this.sendConfig.path = res.repBody;
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
<style scoped>

.header {
    height: 60px;
    line-height: 60px;
    color: #ed6c00;
    font-size: 20px;
    font-family: '微软雅黑';
    border-bottom: 1px solid #b9b7b7;
}

.header h1 {
    height: 60px;
    line-height: 60px;
    color: #ed6c00;
    font-size: 20px;
    font-family: '\5FAE\8F6F\96C5\9ED1';
    border-bottom: 1px solid #b9b7b7;
    padding-left: 45px;
}

.first {
    margin-top: 37px;
    margin-left: 50px;
}

.enter {
    background-color: #fff;
    border: 1px solid #BFBFBF;
    width: 350px;
    height: 440px;
    font-family: '宋体';
    font-size: 12px;
    color: #000;
    padding: 0 40px 0 40px;
    box-sizing: border-box;
    display: inline-block;
    float: left;
}

.enter p {
    font-family: '宋体';
    font-size: 12px;
    /*margin-left: 50px;*/
    margin-top: 20px;
    line-height: 30px;
}

.enter a {
    font-size: 10px;
    text-decoration: none;
}

.txtArea {
    width:100%;
    height: 120px;
    margin: 10px 0;
    resize: none;
    box-sizing: border-box;
    padding:10px;
}

.model {
    border: 1px solid #BFBFBF;
    width: 350px;
    height: 440px;
    background-color: #fff;
    font-family: '宋体';
    font-size: 12px;
    display: inline-block;
    float: left;
    box-sizing: border-box;
    margin-left: 60px;
}

.model p {
    /*text-align: center;*/
   height: 40px;
   line-height: 40px;
    margin-top: 12px;
}

.content {
    /*word-wrap:break-word; 
    word-break:break-all;*/
    border-bottom: 1px solid #BFBFBF;
    height: 156px;
    overflow-y: scroll;
    width: 100%;
    padding:0 20px;
    box-sizing: border-box;
}

.content table {
    width: 100%;
    box-sizing: border-box;
   
}

.content table tr{
   /* line-height:25px;*/
} 
.content table td{
    line-height:25px;
    word-wrap: break-word;
    word-break: break-all;
}
.add {
    height: 150px;
    width: 100%;
}

.add p {
    /*float: left;*/
    /*margin: 12px 50px;*/
        padding-left: 30px;
}

.add input {
    width: 240px;
    height: 88px;
    margin: 0px 50px;
}

.submit {
    font-family: 'Microsoft YaHei';
    font-size: 12px;
    width: 75px;
    height: 27px;
    text-align: center;
        margin: 0 auto;
}

.btn {
    width: 73px;
    background-color: #f57303;
    border: 1px solid #e55c00;
    color: #fff;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer;
}

.upfilebox {
    position: relative;
}

.upfilebox input {
    width: 80px;
    height: 27px;
    position: relative;
    z-index: 9;
    opacity: 0;
    margin: 4px 0px;
}

.upfilebox label {
    position: absolute;
    background: #E2E0E0;
    display: inline-block;
    color: #000;
    width: 80px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    top: 0px;
    left: 0px;
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
.nothx{
    float: right;
}
.comite{
        width: 18px;
        height: 18px;
        background: yellow;
        margin: 0 auto;
        display: inline-block;
        position: absolute;
        top: 6px;
        right: 5px;

        background: url(../images/cha.png) no-repeat;
        cursor: pointer;
        /*margin-top: 50px;*/
    }
</style>
