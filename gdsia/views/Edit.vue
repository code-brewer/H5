<template>
    <div class="view view-user" transition="view">
        <section class="user-section">
            <div class="form-group">
                <label>
                    <span>文章标题</span>
                    <input type="text" class="inputText" placeholder="请输入文章标题" style="width: 500px;" v-model="list.title">
                </label>
                <div class="upload upImg">
                    <label class="box">
                        <file-upload name="img" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
                    </label>
                    <span>（上传文章图片）</span>
                </div>
            </div>
            <div class="form-group">
                <label>
                    <span>文章短描述</span>
                    <input type="text" class="inputText" placeholder="请输入文章短描述" style="width: 500px;" v-model="list.article_describe">
                </label>
            </div>
            <div class="form-group">
                <label>
                    <span>修改时间</span>
                    <input type="text" class="inputText" placeholder="请输入时间，格式为YYYY-MM-DD" v-model="list.utime">
                </label>
                <label style="padding-left: 50px;">
                    <input type="checkbox" v-model="make_it_top">
                    <span>置顶文章</span>
                </label>
            </div>
            <div class="form-group">
                <label>
                    <span>上传附件</span>
                </label>
                <div class="upload upImg">
                    <label class="box">
                        <file-upload name="uploadFile" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
                    </label>
                </div>
                <button class="btn btn-default" id="copyBtn" data-clipboard-target="#uploadUrl">复制</button>
            </div>
            <div class="form-group">
                <label>
                    <span>上传标题图片</span>
                </label>
                <div class="upload upImg">
                    <label class="box">
                        <file-upload name="uploadTitleImg" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
                    </label>
                </div>
            </div>
            <div class="form-group" id="uploadUrl" style="padding-left: 60px;">{{uploadFile}}</div>
            <div class="form-group" v-show="isShowCondition">
                <label>
                    <span>所在区</span>
                    <select v-model="list.area">
                        <option value="天河区">天河区</option>
                        <option value="白云区">白云区</option>
                        <option value="海珠区">海珠区</option>
                        <option value="番禺区">番禺区</option>
                        <option value="荔湾区">荔湾区</option>
                        <option value="越秀区">越秀区</option>
                        <option value="萝岗区">萝岗区</option>
                        <option value="黄浦区">黄浦区</option>
                        <option value="花都区">花都区</option>
                        <option value="南沙区">南沙区</option>
                        <option value="从化区">从化区</option>
                    </select>
                </label>
                <label style="padding-left: 20px;">
                    <span>所属行业</span>
                    <select v-model="list.industry">
                        <option value="云计算">云计算</option>
                        <option value="互动娱乐">互动娱乐</option>
                        <option value="企业管理">企业管理</option>
                        <option value="信息安全">信息安全</option>
                        <option value="医疗行业">医疗行业</option>
                        <option value="地理测绘">地理测绘</option>
                        <option value="多媒体软件">多媒体软件</option>
                        <option value="安防监控">安防监控</option>
                        <option value="工业制造">工业制造</option>
                        <option value="工业控制">工业控制</option>
                        <option value="建筑家居">建筑家居</option>
                        <option value="教育行业">教育行业</option>
                        <option value="智能交通">智能交通</option>
                        <option value="汽车电子">汽车电子</option>
                        <option value="物联网">物联网</option>
                        <option value="电力行业">电力行业</option>
                        <option value="电子政务">电子政务</option>
                        <option value="移动互联网">移动互联网</option>
                        <option value="网络游戏">网络游戏</option>
                        <option value="网路游戏">网路游戏</option>
                        <option value="节能控制">节能控制</option>
                        <option value="金融行业">金融行业</option>
                        <option value="通信行业">通信行业</option>
                        <option value="门户网站">门户网站</option>
                    </select>
                </label>
            </div>
            <div class="form-group" v-show="editorShow">
                <div id="editor-container" style="width: 100%">
                    <textarea id="editor-trigger" style="height: 400px;" v-model="list.text"></textarea>
                </div>
            </div>
        </section>
        <section class="btn-section">
            <a href="javascript:;" class="btn btn-primary" @click="save">保存</a>
        </section>
        <snackbar :show.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
import api from '../api'
import {
    router
} from '../index'
import Vue from 'vue'
import snackbar from '../components/snackbar.vue'
import utils from '../utils/DateUtils.js'
import clipboard from 'clipboard'
export default {
    components: {
        snackbar
    },
    data() {
        return {
            list: [],
            adds: [],
            img_url: '',
            show: false,
            text: '',
            uploadFile: '',
            editor: '',
            editorShow: false,
            isShowCondition: false,
            parent_id: '',
            make_it_top: ''
        }
    },
    ready() {
        this.adds = this.$route.params.id.split("_");

        this.getArticleById();
        this.copy();
    },
    created() {
        Vue.component('file-upload', function(resolve) {
            require(['../js/vue.file-upload.js', '../js/vue.pretty-bytes.js'], resolve)
        });
        this.parent_id = window.sessionStorage.getItem('parent_id');
        this.isShowCondition = this.parent_id === '5' ? true : false;
    },
    methods: {
        copy() {
            let that = this;
            let clip = new clipboard('#copyBtn');
            clip.on('success', e => {
                this.show = true;
                this.text = '复制成功';
                e.clearSelection();
            })
        },
        loadEditor() {
            this.make_it_top = this.list.make_it_top == '2' ? true : false;
            var that = this;
            require(['../js/wangEditor.js'], function(wangEditor) {
                that.editor = new wangEditor('editor-trigger');
                that.editor.config.menus = wangEditor.config.menus.map(value => {
                    if (value.match(/^(location|emotion)/)) {
                        return '';
                    }
                    return value;
                })
                wangEditor.plugin(function(){
                    that.editorShow = true;
                })
                that.editor.create();
                that.editor.onchange = function(){
                    that.list.text = that.editor.$txt.html();
                }
                that.editor.$txt.html(that.list.text);
            })
        },
        getArticleById() {
            if (this.adds[0] != 'add') {
                api.getArticleById(this, {
                    id: this.adds[0]
                }, (back) => {
                    if (back.resCode == '0') {
                        this.list = back.repBody[0];
                        if (!this.list.utime) {
                            this.list.utime = utils.formatDate(new Date(), 'yyyy-MM-dd');
                        } else {
                            this.list.utime = this.list.utime&&this.list.utime.split(' ')[0];
                        }
                        if (!this.list.area) {
                            this.list.area = '天河区';
                        }
                        if (!this.list.industry) {
                            this.list.industry = '云计算';
                        }
                        this.loadEditor();
                    }
                })
            } else {
                this.list = {
                    title: '文章标题',
                    text: '请输入内容',
                    utime: utils.formatDate(new Date(), 'yyyy-MM-dd'),
                    area: '天河区',
                    industry: '云计算',
                    min_logo: '',
                    make_it_top: '',
                    article_describe: ''
                };
                this.loadEditor();
            }
        },
        save() {
            var that = this;
            this.list.make_it_top = this.make_it_top ? 2 : 1;
            if (that.adds[0] != 'add') {
                var body = {
                    article_id: that.adds[0],
                    title: that.list.title,
                    text: that.list.text,
                    utime: that.list.utime,
                    area: this.parent_id === '5' ? that.list.area : '',
                    industry: this.parent_id === '5' ? that.list.industry : '',
                    area: '',
                    industry: '',
                    min_logo: this.list.min_logo,
                    make_it_top: this.list.make_it_top,
                    article_describe: this.list.article_describe
                }
                api.editArticle(that, body, (back) => {
                    if (back.resCode == '0') {
                        this.show = true;
                        this.text = '修改成功';
                        setTimeout(() => {
                            router.go({
                                name: 'list',
                                params: {
                                    id: that.adds[1]
                                }
                            });
                        }, 2000);
                    }
                })
            } else {
                var body = {
                    column_id: that.adds[1],
                    title: that.list.title,
                    text: that.list.text,
                    utime: that.list.utime,
                    area: this.parent_id === '5' ? that.list.area : '',
                    industry: this.parent_id === '5' ? that.list.industry : '',
                    area: '',
                    industry: '',
                    min_logo: this.list.min_logo,
                    make_it_top: this.list.make_it_top,
                    article_describe: this.list.article_describe
                }
                api.addArticle(that, body, (back) => {
                    if (back.resCode == '0') {
                        this.show = true;
                        this.text = '添加成功';
                        setTimeout(() => {
                            router.go({
                                name: 'list',
                                params: {
                                    id: that.adds[1]
                                }
                            });
                        }, 2000);
                    }
                })
            }
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
            // console.log('onFileProgress', progress);
            // update our progress bar
            this.fileProgress = progress.percent;
        },
        onFileUpload: function(file, res) {
            if (res.resCode == 0) {
                this.$dispatch('progress', 0)
                this.show = true;
                this.text = '上传成功';
                if (file._id == 'img') {
                    this.img_url = uploadPath + res.repBody.fileUrl;
                    this.editor.$txt.html(this.editor.$txt.html() + '<img src="' + this.img_url + '"/>');
                    // this.ck.setData(this.ck.getData() + '<img src="' + this.img_url + '"/>');
                }

                if (file._id == 'uploadFile') {
                    this.uploadFile = uploadPath + res.repBody.fileUrl;
                }

                if(file._id == 'uploadTitleImg') {
                    this.list.min_logo = uploadPath + res.repBody.fileUrl;
                }
            }
        },
        onFileError: function(file, res) {
            // console.error('onFileError', file, res);
        },
        onAllFilesUploaded: function(files) {
            // console.log('onAllFilesUploaded', files);
            // everything is done!
            this.allFilesUploaded = true;
        }
    }
}

</script>
<style scoped>
.user-section {
    margin: 0 auto;
    height: auto;
    background-color: #fff;
    padding: 20px;
}

.user-section .user-table {
    width: 80%;
    margin: 0 auto;
}

.user-section .user-table tr td {
    padding: 10px;
}

.user-section .user-table tr td:first-child {
    width: 20%;
    text-align: right;
}

.user-section .user-table tr td .user-input {
    width: 100%;
    padding-left: 10px;
}

.btn-section {
    text-align: center;
    margin-top: 30px;
}

.btn-section .btns {
    display: inline-block;
    padding: 12px 40px;
    color: #fff;
    font-size: 16px;
}

.btn-section .btn-primary {
    width: 120px;
    height: 40px;
    line-height: 26px;
}

.btn-section .btn-ret {
    background-color: #28b779;
}

.upload-btn {
    position: relative;
}

.box input {
    position: absolute;
    height: 33px;
}

.upload {
    display: inline-block;
}
</style>
