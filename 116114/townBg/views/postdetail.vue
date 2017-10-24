<template>
    <div class="header">
        <p>贴吧管理 > 审帖</p>
    </div>
    <div class="view-body">
        <div class="search">
            <span>查看:</span>
            <select v-model="posttype">
                <option value="10">全部</option>
                <option value="3">置顶</option>
                <option value="2">精华</option>
            </select>
            <a href="Javascript:;" class="btn color1" @click="issue()">搜索</a>
        </div>
        <div style="width:100%;margin-top:20px;">
            <table style="width:100%;">
                <tbody>
                    <tr>
                        <th style="width:25%">时间</th>
                        <th style="width:25%">标题</th>
                        <th style="width:25%">内容</th>
                        <th style="width:25%">操作</th>
                    </tr>
                    <tr v-for="list in postlist">
                        <td>{{list.createTime}}</td>
                        <td>{{list.title}}</td>
                        <td>{{list.share}}</td>
                        <td>
                        <a class="action-btn color1" style="color:#fff;" @click="check(list)">查看</a>
                        <a class="action-btn color6" style="color:#fff;" @click="placetop(list,3)" :class="{active:list.operationStatus == '3'}">置顶</a>
                        <a class="action-btn color6" style="color:#fff;" @click="placetop(list,2)" :class="{active:list.operationStatus == '2'}">精华</a>
                        <a class="action-btn color4" style="color:#fff;" @click="delect(list)">删除</a>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
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
                <!-- <a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a> -->
                <p style="box-sizing:border-box;margin-top:30px;"><a style="float:left;" class="btn color1" @click="sure()">确定</a> <a style="float:right;" @click="this.UploadStatus.showMsg = false" class="btn color2">取消</a></p>
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
import emoji from '../js/emoji/data.js'
import Datautils from '../utils/DateUtils.js'
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
                pagesize: '10'
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
            shentie:{},
            posttype:'10',
            postlist:[],
            personpost:{},
            first:{}
        }
    },

    watch: {
        'pageConfig.curpage' (val) {
            if (!isNaN(+val)) {
                console.log(val)
                this.dataConfig.page = val;
                this.issue();
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
        'posttype' (val) {
            this.dataConfig.page = 1
        }

    },

    ready() {

        var temporarydetail = window.localStorage.getItem('curtemporary')
        console.log(temporarydetail)

        this.shentie = window.JSON.parse(temporarydetail)
        console.log(this.shentie)

        this.issue();
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
                        value.share = Datautils.formatEmoij(value.share)
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
        change(item, type) {
            this.currendetail = item;
            if (type == 'cancel') {
                this.condition = 2
                this.show('确认删除?')
            } else if (type == 'up') {
                this.condition = 1
                this.show('确认上线?')
            } else {
                this.condition = 4
                this.show('确认下线?')
            }

        },
        sure() {
            api.update(this,{
                id:this.personpost.id,
                tourist_id:this.personpost.touristId,
                operation_status:-1    //-1删除
            },(back)=>{
                if(back.resCode == '000000'){
                    this.UploadStatus.showMsg = false;
                    this.postlist.$remove(this.personpost)
                }
            })
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
        //获取帖子列表
        issue(){
            this.pageData.page = this.dataConfig.page
            api.issue(this,{
                'pagenum': this.pageData.page,
                'pagesize': this.pageData.pagesize,
                'status':  this.posttype,
                'tourist_id': this.shentie.id
            },(back)=>{
                if(back.resCode == '000000'){
                    back.repBody.forEach((value)=>{
                        value.createTime = new Date(value.createTime).format('yyyy-MM-dd HH:mm:ss');
                        value.share = value.share.substr(0, 30)
                       
                    })

                    this.postlist = back.repBody
                    this.pageConfig.total = back.resPage.count
                    this.pageConfig.curpage = back.resPage.pagenum;
                    this.pageConfig.totalpage = back.resPage.pageCount
                }
            })
        },
        //置顶、精华、删帖
        placetop(list,type){
            console.log(list)
            api.update(this,{
                id:list.id,
                tourist_id:list.touristId,
                operation_status:type   //2精华 //3置顶 //-1删除
            },(back)=>{
                if(list.operationStatus == '2'){
                    list.operationStatus = '3'
                }else if(list.operationStatus == '3'){
                    list.operationStatus = '2'
                }else{
                    list.operationStatus = type
                }
            })
        },
        delect(list){
            this.personpost = list
            this.show('确认删除?')
            
        },
        check(list){
            // var firstlist = window.JSON.stringify(list)
            // window.localStorage.setItem('first', list.id)
            this.$route.router.go({
                path: "/detail/" + list.id
            });
        },
        
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
</style>
