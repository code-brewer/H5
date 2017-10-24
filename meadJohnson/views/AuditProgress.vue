<template>
    <div class="jinduBg" style="background-attachment: fixed;overflow-y: scroll;">
        <div class="audit-progress-top color1" style="position:relative;">
            <a href="#!/audit"><i class="happy-l"></i></a> 申请进度
            <!-- <a class="happy-r" href="http://116114.easier.cn/hbmmrw/"></a> -->
        </div>
        <div class="Order-details">
            <table class="User-detail-table">
                <tbody>
                    <tr>
                        <td class="order-margin-r">审核编号:</td>
                        <td class="color1">{{orderData.order_num}}</td>
                    </tr>
                    <tr>
                        <td class="order-margin-r">申请时间:</td>
                        <td style="color: #000;">
                            {{orderData.ctime.split(" ")[0]}} {{orderData.ctime. split(" ")[1]}}
                        </td>
                    </tr>
                    <tr>
                        <td class="order-margin-r" style="vertical-align: top;">订单凭证:</td>
                        <td>
                            <img :src="item" v-for="item in orderData.photo_url" style="margin-right:20px;width: 190px;height: auto;display: inline-block;">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="upload-bg">
            <div class="upload upload-padding">
                <p>订单审核通过。 </p>
                <p>恭喜您“订单截图”审核顺利通过!</br>任务已过半!</br>记得上传购买7天后的“好评截图”哦！</p>
                <div class="upload-box">
                    <img class="upload-img" :src="imageUrl">
                    <div class="upload-text">
                        <p v-show="showText">快戳我上传您的"好评截图”吧!</p>
                    </div>
                    <input id="upload-file" name="file" class="upload-file" type="file" accept="image/*" @change="uploadImage()" />
                </div>
            </div>
            <div style="padding:40px 0">
                <a class="apply" @click="apllySubmit()">点我提交吧</a>
            </div>
            <!-- <div class="foot-logo"></div> -->
        </div>
        <modal :show.sync="uploadStatus.showMsg" @click="closeModal()">
            <div class="upload-msg">
                <p class="msg-content">{{uploadStatus.msg}}</p>
                <i @click="clos()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0);
    width: 48px;height: 50px;"></i>
            </div>
        </modal>
        <modal :show.sync="sizeStatus.showMsg" @click="closeModal()">
            <div class="uploadsize-msg">
                <p class="msg-content" style="font-size:25px;font-weight:bold;color:#2b1700;">{{sizeStatus.msg}}</p>
                <i @click="closedown()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0);
    width: 48px;height: 50px;"></i>
            </div>
        </modal>
        <modal :show.sync="choiceStatus.showMsg" @click="closeModal()">
            <div class="choice-msg">
                <p class="msg-content" style="font-size:25px;font-weight:bold;text-align: center;color:#2b1700;">{{choiceStatus.msg}}</p>
                <i @click="closee()" style="position: absolute;top: 1px;right: 9px;background: rgba(255,255,255,0);
    width: 48px;height: 50px;"></i>
            </div>
        </modal>
        <modal :show.sync="successStatus.showMsg" @click="closeModal()">
            <div class="success-msg">
                <p class="msg-content" style="font-size:25px;font-weight:bold;text-align: center;line-height:40px;color:#2b1700;">{{successStatus.msg}}</p>
                <i @click="successclose()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0);
    width: 48px;height: 50px;"></i>
            </div>
        </modal>
        <modal :show.sync="zanhuanStatus.showMsg" @click="closeModal()">
            <div class="zanhuan-msg">
                <p class="msg-content" style="font-size:25px;font-weight:bold;text-align: center;line-height:40px;color:#2b1700;">{{zanhuanStatus.msg}}</p>
                <i @click="closezan()" style="position: absolute;top: 7px;right: 14px;background: rgba(255,255,255,0);
    width: 48px;height: 50px;"></i>
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
            orderData: {},
            myFile: "",
            imageUrl: "./images/pic_ico.png",
            order_num: this.$route.params.order_num,
            showText: true,
            submiting: false,

            uploadStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },

            uploadForm: {
                p: basePath + 'shopping/upload/upVideoOrFile',
            },
            photoData: {
                photo_type: 2,
                photo_times: 0
            },
            dingdangpic: false,
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
        this.orderDetail();
        this.uploadStatus.msg = "恭喜您！已经成功通过“订单截图”审核。请根据提示点击上传“评论截图”，如果您上传1张“评论截图”无法包含全部评论信息，可继续上传第二张截图以保证信息完整。";
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

            this.submiting = true;

            if (this.imageUrl == "./images/pic_ico.png") {
                this.choiceStatus.msg = "请选择图片";
                this.choiceStatus.showMsg = true;
                this.submiting = false;
                return;
            }
            var that = this;
            var form = new FormData();
            var xhr = new XMLHttpRequest();
            form.append('Content-Type', this.myFile.type || 'application/octet-stream');
            form.append('file', this.myFile);
            form.append('order_num', that.order_num);
            form.append('photo_type', this.photoData.photo_type);
            form.append('upload_time', that.orderData.ctime.split(" ")[0]);
            xhr.open('POST', this.uploadForm.p, true);
            xhr.send(form);

            xhr.onreadystatechange = function() {

                if (xhr.readyState == 4) {
                    var res = JSON.parse(xhr.responseText);
                    if (res.resCode == 0) {
                        that.photoData.photo_times = that.photoData.photo_times + 1;
                        that.imageUrl = res.repBody.fileUrl;
                        // that.order_num = res.repBody.order_num;
                        that.successStatus.msg = "欧耶！您的评论截图已上传成功啦！我们将在2个工作日内审核您的截图，请耐心等候哟！";
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
            //console.log(this.uploadStatus.errorShow)
            if (!this.uploadStatus.errorShow && this.photoData.photo_times >= 2) {
                router.go({
                    path: '/audit'
                })
            }

        },
        orderDetail() {
            var that = this;
            api.orderDetail(this, {
                order_num: this.order_num
            }, (back) => {
                if (back.resCode == "0") {
                    // if(typeof back.repBody.list != "undefined"){
                    var obj = back.repBody.list[0];
                    obj.photo_url = obj.photo_url.split(",");

                    that.orderData = obj;
                    console.log(that.orderData)
                        // }

                }
            });
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
