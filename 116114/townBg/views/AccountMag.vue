<template>
    
    <modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
        <div class="close"><span @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:20px;">
            <p style="line-height:100px;text-align:center;">{{doubleStatus.msg}}</p>
        </div>
        <div style="padding:0px 50px;">
            <a class="actiontong" @click="tijiao()">确定</a>
            <a @click="this.doubleStatus.showMsg = false" class="nothx">取消</a>
        </div>
    </modale>
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
        <div class="close"><span @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{UploadStatus.msg}}</p>
                <a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
            </div>
        </div>
    </modale>
    <modale :show.sync="loginStatus.showMsg" :msg.sync="loginStatus.msg">
        <div class="close"><span @click="backlogin()" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
            <div style="padding: 40px 30px 0;line-height:25px;">
                <p style="text-align:center;">{{loginStatus.msg}}</p>
                <a class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;" @click="backlogin()">确定</a>
            </div>
        </div>
    </modale>
    <loading :show="isLoad"></loading>
</template>
<script>
import api from '../api'
import {
    router
} from '../index'
import Modale from '../components/newComponts/Modale.vue'
import Datepicker from '../components/bootstrap/Datepicker.vue'
import util from '../utils/index.js'
import Vue from 'vue'
import loading from '../components/Loading.vue'
export default {
    components: {
        Modale,
        Datepicker,
        loading
    },

    data() {
        return {
            doubleStatus: { //单选确认
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
            loginStatus: { //登录
                msg: "",
                showMsg: false,
                errorShow: true,
                event: null
            },
            personData: {
                personPhone: '', //手机号
                IdCar: '', //身份证号
                driving: '', //驾驶证档案号
                readycheck: '1', //是否下发短信
                message: '', //短信内容
            },
            CodeImg: '../carserve/src/m/images/code.png', //验证码
            lists: [], //车辆详情
            yingcang: false,
            account: false,
            items: [{
                car: "*车辆",
                platetype: '02',
                plateplace: '粤'
            }, {
                car: "车辆",
                platetype: '02',
                plateplace: '粤'
            }, {
                car: "车辆",
                platetype: '02',
                plateplace: '粤'
            }],
            personAll: {},
            num: '',
            item: {
                platetype: '02', //车牌类型
                plateplace: '粤', //车牌归属地
                platenumber: '', //车牌号码
                phone: '', //手机号码
                framenumber: '', //车架号
                enginenumber: '', //发动机号

            },
            //开户提交资料
            AccountData: {
                code: '', //验证码
                flag: '0', //是否发短信
                phone: '', //手机号
                content: '' //短信内容
            },
            all: {
                flag: '', //是否下发
                path: '' //excel地址
            },
            openaccount: '',
            isLoad: false,
            accountMsg: '', //开户信息
            addPrizeFileName: '',
            isLoad: false



        }
    },
    ready() {

    },
    created() {
        Vue.component('file-upload', function(resolve) {
            require(['../js/vue.file-upload.js', '../js/vue.pretty-bytes.js'], resolve)
        });
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
                this.addPrizeFileName = file[0].name;

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
                if (file._id == "homeBg") {
                    console.log(res.repBody)
                    this.all.path = res.repBody;
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
    },
    methods: {
        showTips(message) {
            this.doubleStatus.msg = message;
            this.doubleStatus.showMsg = true;
        },
        show(message) {
            this.UploadStatus.msg = message;
            this.UploadStatus.showMsg = true;
        },
        check() {
            if (!this.personData.personPhone) {
                this.show("手机号不能为空");
                return;
            }
            // if(this.personData.personPhone.length != 11 || !(/^\d+$/.test(this.personData.personPhone))){
            // 	this.show("请输入正确的手机号");
            // 	return;
            // }

            if (!/^1\d{10}$/.test(this.personData.personPhone)) {
                this.show("请输入正确的手机号");
                return;
            }

            this.isLoad = true;
            this.account = false;
            this.yingcang = false;
            api.getCarsByUser(this, {
                phone: this.personData.personPhone
            }, (back) => {
                if (back.resCode == "0") {
                    //未开户
                    this.isLoad = false;

                    if (back.repBody.isaccount === 0) {
                        // this.showTips("该"+back.repBody.phone+"未开户,是否立即开户");

                        //判断是否有车辆信息
                        if (util.isEmptyObject(back.repBody.list)) {
                            //填写车辆
                            this.account = true;
                        } else {
                            //显示车辆
                            this.yingcang = true;
                            this.lists = back.repBody.list
                        }

                    } else {
                        //已开户
                        //判断是否有车辆信息
                        // if(util.isEmptyObject(back.repBody.list)){
                        // 	//填写车辆
                        // 	this.account =true;
                        // }else{
                        //显示车辆
                        this.yingcang = true;
                        this.lists = back.repBody.list
                            // }
                        this.personAll = back.repBody
                        this.accountMsg = back.repBody.isaccount
                    }


                    //
                } else if (back.resCode == "13") {
                    //未绑定车辆
                    this.isLoad = false;
                    this.show("该用户未登记车辆信息，请填写至少一条车辆信息再进行开户。");
                    this.account = true;

                } else if (back.resCode == "19") {
                    this.isLoad = false;
                    this.show("该用户为非广东联通号码，无法进行开户。");
                } else if (back.resCode == "14") {
                    this.isLoad = false;
                    this.loginStatus.showMsg = true;
                    this.loginStatus.msg = "登录超时,请管理员登录!"

                } else {
                    this.isLoad = false;
                    this.show(back.resMsg);
                }
            })

        },
        //发短信
        sendMsg() {

            if (!this.personData.personPhone) {
                this.show("手机号不能为空");
                return;
            }
            this.isLoad = true;
            api.sendCode(this, {
                phone: this.personData.personPhone
            }, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.num = back.repBody
                } else if (back.resCode == "14") {
                    this.isLoad = false;
                    this.loginStatus.showMsg = true;
                    this.loginStatus.msg = "登录超时,请管理员登录!"

                } else {
                    this.isLoad = false;
                    this.show(back.resMsg);
                }
            })

        },
        //保存
        save(caritem) {
            console.log(caritem)
            if (!caritem.platenumber || !caritem.framenumber || !caritem.enginenumber) {
                this.show("车牌号或车身架号或发动机号不能为空!");
                return;
            }



            if (!/^[A-Za-z0-9]{6}$/.test(util.trim(caritem.platenumber))) {
                this.show("请填写正确的车牌号");
                return;
            }


            if (!/^[0-9]{6}$/.test(util.trim(caritem.framenumber))) {
                this.show("请填写正确的车身架号");
                return;
            }



            if (!/^[0-9]{4}$/.test(util.trim(caritem.enginenumber))) {
                this.show("请填写正确的发动机号");
                return;
            }

            // this.item = caritem
            // this.item.phone = this.personData.personPhone
            this.isLoad = true;
            caritem.phone = this.personData.personPhone;
            // console.log(caritem)
            api.save(this, caritem, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.show("车辆绑定成功!");
                } else if (back.resCode == "14") {
                    this.isLoad = false;
                    this.loginStatus.showMsg = true;
                    this.loginStatus.msg = "登录超时,请管理员登录!"

                } else {
                    this.isLoad = false;
                    this.show(back.resMsg);
                }
            })

        },
        //单个开户
        register() {

            if (!/^1\d{10}$/.test(this.personData.personPhone)) {
                this.show("请输入正确的手机号");
                return;
            }

            // this.AccountData.code =this.num;
            this.AccountData.phone = this.personData.personPhone

            if (this.accountMsg == '1') {
                this.show("该手机号码已开户，请勿重复开户!");
                this.yingcang = false;
                return;
            }

            // if(this.AccountData.code ==''){
            // 	this.show("请点击下发验证码按钮");
            // 	return;
            // }


            this.showTips("该" + this.AccountData.phone + "未开户,是否立即开户");

            // this.isLoad = true;
            // api.register(this,this.AccountData,(back)=>{
            // 	if(back.resCode=="0"){
            // 		this.isLoad = false;
            // 		this.show("该用户开户成功!");

            // 	}else if(back.resCode=="11"){
            // 		this.isLoad = false;
            // 		this.show("用户旗下没有车辆信息,请先绑定车辆!");
            // 	}else {
            // 		this.isLoad = false;
            // 		this.show(back.resMsg);
            // 	}
            // })
        },
        registerAll() {
            if (this.openaccount == true) {
                this.all.flag = 1
            } else {
                this.all.flag = 0
            }

            if (this.all.path == "") {
                this.show("请上传文件!")
                return;
            }
            this.isLoad = true;
            api.registerAll(this, this.all, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.show(back.repBody)
                } else if (back.resCode == "14") {
                    this.isLoad = false;
                    this.loginStatus.showMsg = true;
                    this.loginStatus.msg = "登录超时,请管理员登录!"

                } else {
                    this.isLoad = false;
                    this.show(back.resMsg);
                }
            })
        },
        TableInstance() {
            window.location.href = basePath + 'file/example?id=2'
        },
        tijiao() {
            this.doubleStatus.showMsg = false;
            // this.AccountData.code =this.num;
            this.AccountData.phone = this.personData.personPhone
            this.isLoad = true;
            api.register(this, this.AccountData, (back) => {
                if (back.resCode == "0") {
                    this.isLoad = false;
                    this.show("该用户开户成功!");
                    this.yingcang = false;
                    this.account = false;

                } else if (back.resCode == "13") {
                    this.isLoad = false;
                    this.show("用户旗下没有车辆信息,请至少绑定一辆车辆!");
                } else if (back.resCode == "14") {
                    this.isLoad = false;
                    this.loginStatus.showMsg = true;
                    this.loginStatus.msg = "登录超时,请管理员登录!"

                } else {
                    this.isLoad = false;
                    this.show(back.resMsg);
                }
            })
        },
        backlogin() {
            this.loginStatus.showMsg = false;
            this.$route.router.go({
                path: '/login'
            })
        }

    }


}
// }
</script>
<style scoped>
/**/

.manage {
    height: 60px;
    line-height: 60px;
    color: #ed6c00;
    font-size: 20px;
    font-family: '微软雅黑';
    border-bottom: 1px solid #b9b7b7;
    padding-left: 45px;
}

.accountBody {
    margin: 35px 50px;
}

.oneAccount {
    height: 38px;
    line-height: 38px;
    text-align: center;
    background-color: #faa354;
    color: #000;
}

.AcountTable {
    width: 100%;
}

.AcountTable td {
    border: 1px solid #ccc;
    height: 35px;
    line-height: 35px;
}

.leftTd {
    width: 15%;
    text-align: center;
}

.AcountTable td input {
    border: none;
    width: 120px;
    border-bottom: 1px solid #ccc;
    height: 20px;
    margin-right: 10px;
}

.rightTd {
    padding-left: 20px;
}

.choose {
    display: inline-block;
    width: 60px;
    position: relative;
}

.leftcheck {
    position: absolute;
    left: 10px;
    top: 9px;
}

.sub {
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
    text-decoration: none;
    cursor: pointer;
}

.dingwei {
    position: absolute;
    left: 0px;
    top: 9px;
    width: 30px;
}

.yes {
    padding-left: 32px;
    margin-top: 3px;
    display: inline-block;
}

.dingfou {
    position: absolute;
    left: 23px;
    top: 7px;
    width: 30px;
}

.txtArea {
    width: 100%;
    height: 100%;
    resize: none;
    margin-top: 12px;
    padding: 5px;
    box-sizing: border-box;
}

.chaxun {
    width: 60px;
    height: 22px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    line-height: 22px;
    display: inline-block;
    text-align: center;
    margin-left: 180px;
    text-decoration: none;
    cursor: pointer;
    background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
    //background: linear-gradient(top, #fcfcfc, #d9d7d7);
    /*background: url(./images/btnBg.png);*/
}

.baocun {
    width: 60px;
    height: 22px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    line-height: 22px;
    display: inline-block;
    text-align: center;
    /*margin-left: 20px;*/
    text-decoration: none;
    cursor: pointer;
    background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
    //background: linear-gradient(top, #fcfcfc, #d9d7d7);
    /*background: url(./images/btnBg.png);*/
}

.xiafa {
    width: 148px;
    height: 22px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    line-height: 22px;
    display: inline-block;
    text-align: center;
    margin-left: 10px;
    text-decoration: none;
    cursor: pointer;
    background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
    //background: linear-gradient(top, #fcfcfc, #d9d7d7);
    /*background: url(./images/btnBg.png);*/
}

.comite {
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

.actiontong {
    float: left;
}

.nothx {
    float: right;
    /*background: url(./images/btnBg.png);*/
}


/**/

.uploadbox {
    width: 190px;
    height: 100%;
    padding: 0 5px;
}

.btn-linear {
    width: 55px;
    height: 30px;
    background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
    //background: linear-gradient(top, #fcfcfc, #d9d7d7);
}

.shangchuan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    z-index: 10;
    cursor: pointer;
}

.sure {
    width: 55px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    margin-left: 20px;
    display: inline-block;
    background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
    background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
    //background: linear-gradient(top, #fcfcfc, #d9d7d7);
}
</style>
