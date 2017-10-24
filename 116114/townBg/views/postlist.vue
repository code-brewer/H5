<template>
    <div class="header">
        <p>景区管理 > 上下线管理</p>
    </div>
    <div class="view-body">
        <div class="search">
            <input class="" type="text" placeholder="按标题搜索" v-model="title"></input> <a href="Javascript:;" class="btn color1" @click="sousuo()">搜索</a>
        </div>
        <div style="width:100%;margin-top:20px;" v-for="item in list">
            <div class="post-content">
                <div class="pic" :style="{'background': 'url('+item.big_imgurl+') 0 0 / 100% auto no-repeat'}"></div>
                <div class="post-text">
                    <p>{{item.title}}</p>
                    <p>{{item.issCommenttext[0]}}<span v-if="item.issCommenttext.length!==1">...</span></p>
                    <p>{{item.createTime}}</p>
                </div>
                <div class="fix-btn">
                    <a @click="compile(item)">编辑</a>
                    <a @click="change(item)">删除</a>
                    <a @click="onlineup(item)" v-if="item.status== 2">上线</a>
                    <a @click="onlinedown(item)" v-if="item.status== 1">下线</a>
                    <a style="border-right:none;" @click="Onpost(item)">审帖</a>
                </div>
                <div class="fix-bottom">
                    <a @click="copy(item)">复制URL</a>
                    <a @click="browse(item)">浏览二维码</a>
                </div>
            </div>
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
                <p style="box-sizing:border-box;margin-top:30px;"><a style="float:left;" class="btn color1" @click="sure()">确定</a> <a style="float:right;" @click="this.UploadStatus.showMsg = false" class="btn color2">取消</a></p>
            </div>
        </div>
    </modale>
    <modale :show.sync="newStatus.showMsg" :msg.sync="newStatus.msg">
        <div class="close"><span @click="this.newStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{newStatus.msg}}</p>
                <p style="box-sizing:border-box;margin-top:30px;"><a style="float:left;" class="btn color1"  @click="surenew()">确定</a> <a style="float:right;" @click="this.newStatus.showMsg = false" class="btn color2">取消</a></p>
            </div>
        </div>
    </modale>
    <modale :show.sync="urlStatus.showMsg" :msg.sync="urlStatus.msg">
        <div class="close"><span @click="this.urlStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 10px 0;line-height:25px;">
                <p style="text-align:center;">{{urlStatus.msg}}</p>
                <input type="text" id="foo" class="inp" v-model="modal.url" style="font-size:16px;width:100%;border: none;">
                <p style="box-sizing:border-box;margin-top:30px;">
                <button style="float:left;" class="copy-btn" data-clipboard-action="copy" data-clipboard-target="#foo" @click="copying()">复制</button> <a style="float:right;" @click="this.urlStatus.showMsg = false" class="btn color2">取消</a></p>
            </div>
        </div>
    </modale>
    <modale :show.sync="codeStatus.showMsg" :msg.sync="codeStatus.msg">
        <div class="close"><span @click="this.codeStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 15px 30px 0;line-height:25px;text-align: center;">
                <!-- <img :src="'http://s.jiathis.com/qrcode.php?url='+modal.code" width="120" height="120"> -->
                <div id="qrcode"></div>
                 <a  @click="this.codeStatus.showMsg = false" class="copy-btn color2" style="margin-top:15px;">完成</a>
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
import fileUpload from '../js/file-upload.vue'
import Clipboard from '../js/clipboard.min.js'
import jQuery from 'jquery'
import jQqrcode from '../js/jquery.qrcode.min.js'
import {
    router
} from '../index'
export default {
    components: {
        Modale,
        Modal,
        Pager,
        Datepicker,
        loading,
        'file-upload': fileUpload
    },
    data() {
        return {
            codeStatus:{
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            newStatus:{
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            urlStatus:{
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
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
            isLoad: false,
            //
            activityData: {
                smallimgurl: '',
                bigimgurl: ''

            },
            list: [],
            title: '',
            currendetail: {},
            condition: '', //状态
            udtype: '',
            modal:{
                url:'',
                code:'',
                smallimg:''
            }
        }
    },

    watch: {
        'pageConfig.curpage' (val) {
            if (!isNaN(+val)) {
                console.log(val)
                this.dataConfig.page = val;
                this.search();
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
        // 'dataConfig.type' () {
        //     this.dataShow();
        // }

    },

    ready() {
        this.search();
        console.log(jQqrcode)
    },

    methods: {
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
        },
        search() {
            this.pageData.page = this.dataConfig.page
            api.search(this, {
                'pagenum': this.pageData.page,
                'pagesize': this.pageData.pagesize,
                'title': this.title
            }, (back) => {
                if (back.resCode === '000000') {
                    back.repBody.forEach((value) => {
                        value.createTime = new Date(value.createTime).format('yyyy-MM-dd HH:mm:ss');
                    })
                    back.repBody.forEach((value)=>{
                        // value.introduction = value.introduction.substr(0, 20)
                        //展示前20个字符
                        value.issCommenttext = []
                        value.issCommenttext.push(value.introduction.substr(0, 20))
                        value.introduction.length > 20 ? value.issCommenttext.push(value.introduction.substr(20)) : '';
                        this.showText = false;
                    })
                    this.list = back.repBody;
                    this.pageConfig.total = back.resPage.count
                    this.pageConfig.curpage = back.resPage.pagenum;
                    this.pageConfig.totalpage = back.resPage.pageCount
                }
            })
        },
        compile(item) {
            var str = window.JSON.stringify(item)
            window.localStorage.setItem('currentact', str)
            this.$route.router.go({
                path: "/creatviews/" + item.id
            });
        },
        change(item) {
            this.currendetail = item;
            // if (type == 'cancel') {
                // this.condition = 2
                // this.show('确认删除?')
                this.newStatus.msg = '确认删除?';
                this.newStatus.showMsg = true;
            // }

        },
        surenew(){
            api.domore(this, {
                    'id': this.currendetail.id,
                    'status': 4
                }, (back) => {
                    if (back.resCode === '000000') {
                        this.newStatus.showMsg = false;
                        this.list.$remove(this.currendetail)
                        this.search()
                    }
                })
        },
        sure() {
                
             if(this.udtype == '1'){
                api.online(this,{
                    'id': this.currendetail.id,
                    'status': this.udtype
                },(back)=>{
                    if (back.resCode === '000000') {
                        this.UploadStatus.showMsg = false;
                    }
                })
            }else if(this.udtype == '2'){
                api.online(this,{
                    'id': this.currendetail.id,
                    'status': this.udtype
                },(back)=>{
                    if (back.resCode === '000000') {
                        this.UploadStatus.showMsg = false;
                    }
                })
            }

        },
        //搜索主题
        sousuo() {
            this.pageData.page = this.dataConfig.page
            api.search(this, {
                'pagenum': this.pageData.page,
                'pagesize': this.pageData.pagesize,
                'title': this.title
            }, (back) => {
                if (back.resCode === '000000') {
                    back.repBody.forEach((value) => {
                        value.createTime = new Date(value.createTime).format('yyyy-MM-dd HH:mm:ss');
                    })
                    this.list = back.repBody;
                    this.pageConfig.total = back.resPage.count
                    this.pageConfig.curpage = back.resPage.pagenum;
                    this.pageConfig.totalpage = back.resPage.pageCount
                }
            })
        },
        Onpost(item) {
            var temporary = window.JSON.stringify(item)
            window.localStorage.setItem('curtemporary', temporary)
            this.$route.router.go({
                path: "/postdetail"
            });
        },
        // online(item, type) {
        //     this.currendetail = item;
        //     if (type == 'up') {
        //         this.udtype = 1
        //         this.show('确认上线?')
        //     } else {
        //         this.udtype = 2
        //         this.show('确认下线?')
        //     }
        // },
        onlineup(item){
            // this.show('确认上线?')
            api.online(this,{
                    'id': item.id,
                    'status': 1
                },(back)=>{
                    if (back.resCode === '000000') {
                        // this.UploadStatus.showMsg = false;
                        item.status = 1
                    }
                })
        },
        onlinedown(item){
            api.online(this,{
                    'id': item.id,
                    'status': 2
                },(back)=>{
                    if (back.resCode === '000000') {
                        item.status = 2
                        // this.UploadStatus.showMsg = false;
                    }
                })
            // this.show('确认下线?')
        },
        copy(item){
            // this.show(item.qrcodeUrl)
            this.url = item.qrcodeUrl
            this.urlStatus.showMsg = true
            // this.urlStatus.msg = item.qrcodeUrl
            this.modal.url = item.qrcodeUrl

        },
        copying(){
            var clipboard = new Clipboard('.copy-btn');
            clipboard.on('success', function(e) {
                console.log('success');
            })
        },
        browse(item){
            this.codeStatus.showMsg = true;
            // this.modal.code = item.qrcodeUrl
            this.modal.smallimg = item.small_imgurl

            jQuery('#qrcode').html('').qrcode({
                 render : "canvas",    
                 text : item.qrcodeUrl,    
                 width : "150",              
                 height : "150",              
                 background : "#fff",      
                 foreground : '#000',       
                 src: this.modal.smallimg,      

             });
        }
        
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
            if (res.code == 0) {
                this.$dispatch('progress', 0);
                if (file._id == "smallBg") {
                    // console.log(res.repBody)
                    this.activityData.smallimgurl = res.data;
                    console.log(this.activityData.smallimgurl)
                } else if (file._id == "bigBg") {
                    // console.log(res.repBody)
                    this.activityData.bigimgurl = res.data;
                    console.log(this.activityData.bigimgurl)
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
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #B9B7B7;
    line-height: 60px;
    padding-left: 30px;
    box-sizing: border-box;
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
    position: relative;
}

.tabs li.active {
    background-color: #f5b57e;
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
    background-color: #e4c934;
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
.close{
    position: relative;
    background-color: #fff;
}
.comite{
    width:20px;
    height: 20px;
    background:url(../images/close.png) no-repeat;
    display: inline-block;
    position: absolute;
    right:10px;
    background-size: contain;
    top: 5px;
}
</style>
