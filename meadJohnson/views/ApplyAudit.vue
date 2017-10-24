<template>
    <div style="height:100%;">
        <div class="happy-bg">
            <div class="happy-top">
                <a class="happy-l" href="#!/audit"></a>提交截图
            </div>
            <div class="upload" style="padding-top:90px">
                <p style="color:#d5164d;font-weight: bold;">点击下方空白框试试看</p>
                <div class="upload-box">
                    <img class="upload-img" :src="imageUrl">
                    <div class="upload-text">
                        <p v-show="showText">快戳我上传您的“订单截图”吧！</p>
                    </div>
                    <input id="upload-file" name="file" class="upload-file" type="file"  @change="uploadImage()" />
                    <p style="text-align:left;color:#565656;">*请上传2M以内的订单截图（原图）哦！</p>
                </div>
            </div>
            <div style="padding:70px 0">
                <a type="submit" class="apply" @click="apllySubmit()">点我提交吧</a>
            </div>
            <div class="check-list">
            </div>
            <modal :show.sync="uploadStatus.showMsg" @click="closeModal()">
                <div class="upload-msg">
                    <p class="msg-content" style="font-size:25px; font-weight: bold;color:#2b1700;">{{uploadStatus.msg}}</p>
                    <i @click="clos()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0); width: 48px;height: 50px;"></i>
                </div>
            </modal>
            <modal :show.sync="sizeStatus.showMsg" @click="closeModal()">
                <div class="uploadsize-msg">
                    <p class="msg-content" style="font-size:26px; font-weight: bold;color:#2b1700;">{{sizeStatus.msg}}</p>
                    <i @click="closedown()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0); width: 48px;height: 50px;"></i>
                </div>
            </modal>
            <modal :show.sync="choiceStatus.showMsg">
                <div class="choice-msg" @click="closeModal()">
                    <p class="msg-content" style="font-size:25px;font-weight:bold;text-align: center;color:#2b1700;">{{choiceStatus.msg}}</p>
                    <i @click="closee()" style="position: absolute;top: 1px;right: 9px;background: rgba(255,255,255,0); width: 48px;height: 50px;"></i>
                </div>
            </modal>
            <modal :show.sync="successStatus.showMsg" @click="closeModal()">
                <div class="success-msg" :style="{padding: photoData.photo_times != 1 ? '80px' : '30px 80px'}">
                    <p class="msg-content" style="font-size:25px;font-weight:bold;text-align: center;line-height:35px;color:#2b1700;">{{{successStatus.msg}}}</p>
                    <i @click="successclose()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0); width: 48px;height: 50px;"></i>
                </div>
            </modal>
            <modal :show.sync="zanhuanStatus.showMsg" @click="closeModal()">
                <div class="zanhuan-msg">
                    <p class="msg-content" style="font-size:25px;font-weight:bold;text-align: center;line-height:40px;color:#2b1700;">{{zanhuanStatus.msg}}</p>
                    <i @click="closezan()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0); width: 48px;height: 50px;"></i>
                </div>
            </modal>
        </div>
</template>
<script>
// import {
//     router
// } from '../index.js'
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
            imageUrl: "./images/pic_ico.png",
            order_num: "",
            showText: true,
            submiting: false,

            uploadStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },
            photoData: {
                photo_type: 1,
                photo_times: 0
            },

            uploadForm: {
                p: basePath + 'shopping/upload/upVideoOrFile',
            },
            sizeStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },
            choiceStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },
            successStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },
            zanhuanStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            }

        }
    },

    ready() {
        this.uploadStatus.msg = "亲，您好！为了保证您的申请顺利通过，如果您上传1张“订单截图”无法包含全部的订单信息（订单号、订单日期、购物清单），可以再继续上传第2张“订单截图”来完善哟！谢谢！";
        this.uploadStatus.showMsg = true;
    },

    methods: {
        uploadImage() {
            var files = document.getElementById("upload-file").files;
            if (files.length > 1) {
                this.choiceStatus.msg = "一次只能上传一张图片";
                this.choiceStatus.showMsg = true;
                return;
            }

            var that = this;
            this.myFile = files[0];

            if (this.myFile.size > 2097152) {
                this.sizeStatus.msg = "请选择小于2M的截图上传,建议手机截图后再上传";
                this.sizeStatus.showMsg = true;
                return;
            }

            if (this.myFile.type.indexOf("image") == -1) {
                this.choiceStatus.msg = "只允许上传图片";
                this.choiceStatus.showMsg = true;
                return;
            }

            var r = new FileReader();

            r.readAsDataURL(this.myFile);

            r.onload = function() {
                that.imageUrl = this.result;
                that.showText = false;
            }
        },

        apllySubmit() {

            if (this.submiting) {
                this.choiceStatus.msg = "订单处理中,请耐心等候";
                this.choiceStatus.showMsg = true;
                return;
            }

            if (this.imageUrl == "./images/pic_ico.png") {
                this.choiceStatus.msg = "请选择图片";
                this.choiceStatus.showMsg = true;
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

                    if (xhr.responseText == '') {
                        setTimeout(function() {
                            that.zanhuanStatus.msg = "上传失败，请重新进入活动页面！";
                            that.zanhuanStatus.showMsg = true;
                            that.submiting = false;
                            return;
                        }, 8000);

                    }
                    var res = JSON.parse(xhr.responseText);

                    // clearTimeout(time)

                    if (res.resCode == 0) {
                        that.photoData.photo_times = that.photoData.photo_times + 1;
                        if (that.photoData.photo_times == 1) {
                            that.order_num = res.repBody.order_num;
                        }
                        that.successStatus.msg = "欧耶！你的订单截图已上传成功啦！审核编号为" + that.order_num + "，我们将在2个工作日内审核您的截图，请耐心等候哟！" + (that.photoData.photo_times == 1 ? "<span style='color: red;'>（如需上传第二张“订单截图”，请关闭窗口后，选择图片继续上传即可！）</span>" : "");
                        that.imageUrl = res.repBody.fileUrl;
                        // this.$dispatch('cancelLoading');
                        that.choiceStatus.showMsg = false;
                        that.successStatus.showMsg = true;
                        that.successStatus.errorShow = false;
                        that.imageUrl = "./images/pic_ico.png";
                        that.submiting = false;

                    } else {
                        that.zanhuanStatus.msg = res.resMsg;
                        that.zanhuanStatus.showMsg = true;
                        that.submiting = false;
                        return;
                    }

                }
            }
        },

        closeModal() {
            if (!this.uploadStatus.errorShow && this.photoData.photo_times >= 2) {
                router.go({
                    path: '/audit'
                })
            }

        },
        clos() {
            this.uploadStatus.showMsg = false;
        },
        closee() {
            this.choiceStatus.showMsg = false;
        },
        closedown() {
            this.sizeStatus.showMsg = false;
        },
        closezan() {
            this.zanhuanStatus.showMsg = false;
        },
        successclose() {
            var that = this;
            if (that.photoData.photo_times >= 2) {
                router.go({
                    path: '/audit'
                });
            }
            that.successStatus.showMsg = false;
        }

    }

}
</script>
