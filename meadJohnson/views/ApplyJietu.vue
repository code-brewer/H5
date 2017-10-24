<template>
    <div style="height:100%;">
        <div class="happy-bg">
            <div class="happy-top">
                <a class="happy-l" href="#!/audit"></a>提交截图
            </div>
            <!-- 订单截图 -->
            <div class="dingdanTop" v-for="list in ['订单截图', '评论截图']">
                <div class="ddjt">{{list}}</div>
                <div class="ddup">
                    <div class="upload-box" v-for="value in 2">
                        <input name="file" class="upload-file" type="file" accept="image/*" @change="same($event, $index)" />
                        <img class="upload-img" :src="imageUrl">
                        <p class="uploadTxt">点我上传</p>
                    </div>
                </div>
                <div style="color:#f98700;text-align:center;font-size:20px;">请上传2M以内的订单截图哦!</div>
            </div>

            <div style="padding:20px 0">
                <a type="submit" class="apply" @click="apllySubmit()">点我提交吧</a>
            </div>
        </div>

        <modal :show.sync="list.showMsg" @click="closeModal()" v-for="list in modal">
            <div :class="list.class">
                <p class="msg-content" style="font-size:25px; font-weight: bold;color:#2b1700;">{{list.msg}}</p>
                <i @click="$key == 'successStatus' ? successclose() : list.showMsg = false" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0);width: 48px;height: 50px;"></i>
            </div>
        </modal>
    </div>
</template>
<style scoped> 
    .dingdanTop {
        margin: 20px 8%;
        height: 400px;
        background-color: #fff;
        /*border:1px solid #ccc;*/
    }
    
    .ddjt {
        height: 52px;
        background-color: #f98700;
        line-height: 52px;
        color: #000;
        padding-left: 15px;
        font-size: 23px;
    }
    
    .ddup {
        /*height: 348px;*/
        padding: 60px 75px;
    }
    .ddup>div:last-child {
        float: right;
    }
    
    .uploadTxt{
        text-align:center;
        display:inline-block;
        margin-top: 165px;
        font-size: 20px;
        color: #9E9595;
    }
    .upload-box{
      display:inline-block;
      width:157px;
      height: 157px;
      background-color:#fff;
      box-shadow: none;
      text-align: center;
    }
    
    .uploadT {
        padding: 20px 0;
    }
</style>
<script>
import {router} from '../index.js'
import api from '../api'
import Modal from '../components/Modal.vue'


export default {
    http: {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    components: {
        Modal
    },

    data() {
        return {
            myFile: "",
            imageUrl: "./images/up.png",
            order_num: "",
            showText: true,
            submiting: false,
            modal: {
                uploadStatus: {
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    class: 'upload-msg'
                },
                sizeStatus: {
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    class: 'uploadsize-msg'
                },
                choiceStatus: {
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    class: 'choice-msg'
                },
                successStatus: {
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    class: 'success-msg'
                },
                zanhuanStatus: {
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    class: 'zanhuan-msg'
                }
            },
            photoData: {
                photo_type: 1,
                photo_times: 0
            },

            uploadForm: {
                p: basePath + 'shopping/upload/upVideoOrFile',
            },   
            isUpload: false,
            type: [false, false]

        }
    },

    ready() {
        this.modal.uploadStatus.msg = "亲，您好！为了保证您的申请顺利通过，如果您上传1张“订单/好评截图”无法包含订单全部的信息（订单号、订单日期、购物清单），可再继续上传第2张“订单/好评截图”来完善哟！谢谢！";
        this.modal.uploadStatus.showMsg = true;
    },
    methods: {
        apllySubmit() {

            if (this.submiting) {
                this.modal.choiceStatus.msg = "订单处理中,请耐心等候";
                this.modal.choiceStatus.showMsg = true;
                return;
            };

            if (!this.isUpload) {
                this.modal.choiceStatus.msg = "请选择图片";
                this.modal.choiceStatus.showMsg = true;
                return;
            }

            this.submiting = true;

            var that = this;
            var form = new FormData();
            var xhr = new XMLHttpRequest();
            form.append('Content-Type', this.myFile.type || 'application/octet-stream');
            form.append('file', this.myFile);
            form.append('order_num', this.order_num);
            form.append('upload_time', '');
            form.append('photo_type', this.photoData.photo_type);
            xhr.open('POST', this.uploadForm.p, true);
            xhr.send(form);           

            xhr.onreadystatechange = function() {
                if (xhr.readyState >= 4) {
                    
                    var res = JSON.parse(xhr.responseText);
                    if (res.resCode == 0) {
                        that.photoData.photo_times = that.photoData.photo_times + 1;
                        if (that.photoData.photo_times == 1) {
                            that.order_num = res.repBody.order_num;
                        }
                        that.imageUrl = res.repBody.fileUrl;
                        // that.order_num = res.repBody.order_num;
                        that.modal.successStatus.msg = "欧耶！你的订单截图已上传成功啦！审核编号为" + that.order_num + "我们将在2个工作日内审核您的截图，请耐心等候哟！";
                        that.modal.successStatus.showMsg = true;
                        that.modal.successStatus.errorShow = false;
                        // that.imageUrl = "./images/up.png";
                        
                        that.submiting = false;

                    } else {
                        that.modal.zanhuanStatus.msg = res.resMsg;
                        that.modal.zanhuanStatus.showMsg = true;
                        that.submiting = false;
                        return;
                    }

                }

            }
        },

        closeModal() {
            if (!this.modal.uploadStatus.errorShow && this.photoData.photo_times >= 2) {
                router.go({
                    path: '/audit'
                })
            }

        },
        successclose() {
            var that = this;
            if (that.photoData.photo_times >= 2) {
                router.go({
                    path: '/audit'
                });
            }
            that.modal.successStatus.showMsg = false;


        },
        same(e, index){
            var e = e.srcElement || e.target,
                files = e.files;
            if (files.length > 1) {
                this.modal.choiceStatus.msg = "一次只能上传一张图片";
                this.modal.choiceStatus.showMsg = true;
                return;
            }

            var that = this;
            this.myFile = files[0];

            if (this.myFile.size > 2097152) {
                this.modal.sizeStatus.msg = "请选择小于2M的截图上传,建议手机截图后再上传";
                this.modal.sizeStatus.showMsg = true;
                return;
            }

            if (this.myFile.type.indexOf("image") == -1) {
                this.modal.choiceStatus.msg = "只允许上传图片";
                this.modal.choiceStatus.showMsg = true;
                return;
            }

            var r = new FileReader();

            r.readAsDataURL(this.myFile);

            r.onload = function() {
                e.nextElementSibling.src = this.result;
                that.showText = false;
                that.isUpload = true;
                that.type[index] = true;
            }
        }

    }

}
</script>
