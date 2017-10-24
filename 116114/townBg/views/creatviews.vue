<template>
    <div class="header">
        <p>景区管理 > 新建景区</p>
    </div>
    <div class="view-body">
        <div class="view-title">
            <span>古镇标题:</span>
            <input type="text" placeholder="请输入标题" v-model="activityData.title" />
        </div>
        <div class="view-introduce">
            <span>古镇简介:</span>
            <input type="text" placeholder="请输入简介" v-model="activityData.introduction" />
        </div>
        <div class="view-img">
            <span>古镇宣传页:</span>
            <div class="view-img-btn">
                <div class="small-img" :style="{'background': 'url('+activityData.small_imgurl+') 0 0 / 100% auto no-repeat'}">
                    <div style="width:100%;height:100%;" class="bg">
                        <file-upload name="smallBg" action="upload" :auto="true" class="upload-btn" style="display:inline-block;    opacity: 0;"></file-upload>
                    </div>
                    <p>小图上传</p>
                </div>
                <div class="big-img" :style="{'background': 'url('+activityData.big_imgurl+') 0 0 / 100% auto no-repeat'}">
                    <div style="width:100%;height:100%;" class="bg">
                        <file-upload name="bigBg" action="upload" :auto="true" class="upload-btn" style="display:inline-block;    opacity: 0;"></file-upload>
                    </div>
                    <p>大图上传</p>
                </div>
            </div>
            <div class="text">
                <p>1、小图尺寸80px*80px，大小不超过100kb.</p>
                <p>2、大图尺寸640px*400px，大小不超过200kb.</p>
                <p>3、支持jpg .jpeg .png .gif格式照。</p>
            </div>
        </div>
        <div class="view-bianji">
            <span>景区介绍</span>
            <div style="width:772px;">
                <textarea id="div1" style="height:400px;"></textarea>
            </div>
        </div>
        <div style="height:30px;padding-left:96px;box-sizing:border-box;margin:20px;">
            <a href="javascript:;" class="btn color1" style="color:#fff;" @click="save">保存</a><a href="javascript:;" class="btn color2" style="color:#fff;" @click="save_online">保存并上线</a><a href="javascript:;" class="btn color3" style="color:#fff;" v-link="{path:'/postlist'}">取消</a>
        </div>
    </div>
    <!-- <nav style="text-align: right;">
        <pager :config="pageConfig"></pager>
    </nav> -->
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg" :event="UploadStatus.event" :btn="UploadStatus.btn">
        <div class="close"><span @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{UploadStatus.msg}}</p>
                <a class="juzhong" v-el:btns style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
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
                event: null,
                btn: null
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
                small_imgurl: '',
                big_imgurl: '',
                scenic: '', //编辑内容
                introduce: '',
                title: ''

            },
            wangEditobj: {
                height: '300px',
                maxheight: '500px'
            },
            _editor: '',
            postdetail: {},
            id: ''

        }
    },

    watch: {
        'pageConfig.curpage' (val) {
            if (!isNaN(+val)) {
                this.dataConfig.page = val;
                this.dataShow();
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
        'dataConfig.type' () {
            this.dataShow();
        }

    },

    ready() {

        this.id = this.$route.params.id

        var actidetail = window.localStorage.getItem('currentact')
        console.log(actidetail)
        this.postdetail = window.JSON.parse(actidetail)
        console.log('11111111')
        console.log(this.postdetail)

        if (this.$route.params.id != null) {
            // this.getback();
            console.log(this.postdetail)
            this.activityData = this.postdetail
        }
        this.editor();
        console.log(this.$els.btns)
    },

    methods: {
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
            this.UploadStatus.btn = this.$els.btns;
        },
        editor() {
            // var editor = new wangeditor('div1');
            // console.log(editor)
            // editor.create();
            var that = this;
            require(['wangeditor'], function(wangEditor) {
                that._editor = new wangEditor('div1');
                that._editor.config.menus = wangEditor.config.menus.map(value => {
                    if (value.match(/^(location|emotion)/)) {
                        return '';
                    }
                    return value;
                })
                wangEditor.plugin(function() {
                    that.editorShow = true;
                })
                that._editor.config.uploadImgUrl = 'wangEditorH5File';
                that._editor.config.uploadHeaders = {
                    'Accept': '*/*'
                };
                that._editor.create();
                that._editor.onchange = function() {
                    that.activityData.scenic = that._editor.$txt.html();
                }
                that._editor.$txt.html(that.activityData.scenic);
            })


            // require(['../js/wangEditor.js'], function(wangEditor) {
            //     var editor = new wangEditor('div1');
            //     editor.config.menus = [
            //         'bold',
            //         'underline',
            //         'italic',
            //         'strikethrough',
            //         'eraser',
            //         'forecolor',
            //         'bgcolor',
            //         '|',
            //         'quote',
            //         'fontfamily',
            //         'fontsize',
            //         'head',
            //         'unorderlist',
            //         'orderlist',
            //         'alignleft',
            //         'aligncenter',
            //         'alignright',
            //         '|',
            //         'img',
            //         '|',
            //         'undo',
            //         'redo',
            //         'fullscreen'
            //     ];
            //     editor.config.uploadImgUrl = 'wangEditorH5File';
            //     // 设置 headers（举例）
            //     // editor.config.uploadHeaders = {
            //     //      'Accept' : '*/*'
            //     //  };
            //     editor.create();
            //     editor.onchange = function() {
            //         // this.home.text = editor.$txt.html();
            //         var a = editor.$txt.html();
            //         console.log('a:', a);
            //         sessionStorage.setItem('a', a)
            //     }
            // })
        },
        save() {
            if(this.activityData.introduction.length > 15){
                this.show('简介不能超过15字!');
                return;
            }
            if (this.id) {
                api.domore(this, {
                    "id": this.id, //必填
                    "big_imgurl": this.activityData.big_imgurl,
                    "introduction": this.activityData.introduction,
                    "scenic": this.activityData.scenic,
                    "small_imgurl": this.activityData.small_imgurl,
                    "status": this.postdetail.status, //必填
                    "title": this.activityData.title
                }, (back) => {
                    if (back.resCode === '000000') {
                        this.show('修改成功!');
                        this.UploadStatus.event = () => {
                            this.$router.go({
                                path: '/postlist'
                            })
                        }
                    }
                })
            } else {
                api.home_add(this, {
                    'status': 2, //下线
                    'admin_id': 1,
                    'scenic': this.activityData.scenic,
                    'small_imgurl': this.activityData.small_imgurl,
                    'big_imgurl': this.activityData.big_imgurl,
                    'introduction': this.activityData.introduction,
                    'title': this.activityData.title
                }, (back) => {
                    if (back.resCode === '000000') {
                        this.show('保存成功!')
                        this.UploadStatus.event = () => {
                            this.$router.go({
                                path: '/postlist'
                            })
                        }

                    }
                })
            }
        },
        save_online() {
            if(this.activityData.introduction.length > 15){
                this.show('简介不能超过15字!');
                return;
            }
            if (this.id) {
                api.domore(this, {
                    "id": this.id, //必填
                    "big_imgurl": this.activityData.big_imgurl,
                    "introduction": this.activityData.introduction,
                    "scenic": this.activityData.scenic,
                    "small_imgurl": this.activityData.small_imgurl,
                    "status": 1, //必填
                    "title": this.activityData.title
                }, (back) => {
                    if (back.resCode === '000000') {
                        this.show('修改成功!');
                        this.UploadStatus.event = () => {
                            this.$router.go({
                                path: '/postlist'
                            })
                        }
                    }
                })
            } else {
                api.home_add(this, {
                    'status': 1,
                    'admin_id': 1,
                    'scenic': this.activityData.scenic,
                    'small_imgurl': this.activityData.small_imgurl,
                    'big_imgurl': this.activityData.big_imgurl,
                    'introduction': this.activityData.introduction,
                    'title': this.activityData.title
                }, (back) => {
                    if (back.resCode === '000000') {
                        this.show('保存并上线成功！')
                        this.UploadStatus.event = () => {
                            this.$router.go({
                                path: '/postlist'
                            })
                        }
                    }
                })
            }
        },
        getback() {
            api.getback(this, {
                title: this.postdetail.title,
                dec: this.postdetail.introduction,
                big_imgurl: this.postdetail.bigImgurl,
                small_imgurl: this.postdetail.smallImgurl,
                text: this.postdetail.title,
            }, (back) => {

            })
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
                    this.activityData.small_imgurl = res.data;
                    console.log(this.activityData.small_imgurl)
                } else if (file._id == "bigBg") {
                    // console.log(res.repBody)
                    this.activityData.big_imgurl = res.data;
                    console.log(this.activityData.big_imgurl)
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
</style>
