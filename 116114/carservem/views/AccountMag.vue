<template>
    <h1 class="manage">开户管理</h1>
    <div class="accountBody">
        <div class="oneAccount">单个开户</div>
        <table class="AcountTable">
            <tbody>
                <tr>
                    <td class="leftTd" style="border: none;border-left: 1px solid #ccc;border-bottom: 1px solid #ccc;">*手机号码:</td>
                    <td class="rightTd" style="position:relative;border: none;border-left: 1px solid #ccc;border-right: 1px solid #ccc;border-bottom: 1px solid #ccc;">
                        <input type="text" v-model="personData.personPhone"></input>
                        <a class="chaxun" @click="check()">查询</a>
                        <!-- <a class="xiafa"  @click="sendMsg()">下发验证码短信</a>
						<input style="margin-left:10px;position:absolute;top:6px;border-radius: 0px;
    background: none;border:1px solid #ccc;width:100px;cursor: auto;" class="chaxun" v-model='num' placeholder="验证码校验处" readonly=""></input> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 读取车辆信息,并且不可点击 -->
        <div v-show="yingcang">
            <table class="AcountTable">
                <tbody>
                    <tr v-for="list in lists">
                        <td class="leftTd" style="border-top:none;">*车辆</td>
                        <td class="rightTd" style="border-top:none;">
                            车牌类型:
                            <input type="text" style="width:50px;" v-model="list.platetype" readonly=""> </input>
                            车牌归属地:
                            <input type="text" style="width:30px;" v-model="list.plateplace" readonly=""> </input>
                            车牌号:
                            <input type="text" v-model="list.platenumber" readonly=""></input>
                            车身架号:
                            <input type="text" placeholder="请输入车身架号后6位" v-model="list.framenumber" readonly=""></input>
                            发动机号:
                            <input type="text" placeholder="请输入发动机号后4位" v-model="list.enginenumber" readonly=""></input>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">下发用户短信通知</td>
                        <td class="rightTd" style="position:relative;">
                            <div class="choose">
                                <input type="radio" class="leftcheck dingwei" id="yes" v-model="AccountData.flag" style="width:30px;" value="1"></input>
                                <label for="yes" class="yes">是</label>
                            </div>
                            <div class="choose">
                                <input type="radio" class="rightcheck dingfou" id="no" v-model="AccountData.flag" value="0"></input>
                                <label for="no" style="padding-left:112px;">否</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">下发短信内容(为空则发送默认短信)</td>
                        <td class="rightTd" style="height:58px;padding: 5px 15px;">
                            <textarea class="txtArea" v-model="AccountData.content"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align:center;margin-bottom:30px;margin-top:20px;">
                <a class="sub" @click="register()">提交</a>
            </div>
        </div>
        <!-- 填写车辆信息,可修改 -->
        <div v-show="account">
            <table class="AcountTable">
                <tbody>
                    <tr v-for="item in items">
                        <td class="leftTd" style="border-top:none;">{{item.car}}</td>
                        <td class="rightTd" style="border-top:none;">
                            车牌类型:
                            <select style="width:75px;font-size: 12px;" v-model="item.platetype">
                                <option value="02">小型汽车</option>
                                <option value="01">大型汽车</option>
                            </select>
                            车牌归属地:
                            <input type="text" style="width:30px;" v-model="item.plateplace" readonly=""> </input>
                            <!-- <select style="width:38px;" v-model="item.plateplace">
                                <option value="粤">粤</option> -->
                                <!-- <option value="京">京</option>
                                <option value="桂">桂</option>
                                <option value="沪">沪</option>
                                <option value="湘">湘</option>
                                <option value="鄂">鄂</option>
                                <option value="豫">豫</option>
                                <option value="冀">冀</option>
                                <option value="苏">苏</option>
                                <option value="浙">浙</option>
                                <option value="川">川</option>
                                <option value="贵">贵</option>
                                <option value="皖">皖</option>
                                <option value="鲁">鲁</option>
                                <option value="辽">辽</option>
                                <option value="吉">吉</option>
                                <option value="闽">闽</option>
                                <option value="渝">渝</option>
                                <option value="宁">宁</option>
                                <option value="青">青</option>
                                <option value="云">云</option>
                                <option value="琼">琼</option>
                                <option value="陕">陕</option>
                                <option value="甘">甘</option>
                                <option value="黑">黑</option>
                                <option value="蒙">蒙</option>
                                <option value="新">新</option>
                                <option value="藏">藏</option> -->
                            </select>
                            车牌号:
                            <input type="text" v-model="item.platenumber" style="width:65px;"></input>
                            车身架号:
                            <input type="text" placeholder="请输入车身架号后6位" v-model="item.framenumber"></input>
                            发动机号:
                            <input type="text" placeholder="请输入发动机号后4位" v-model="item.enginenumber"></input>
                            <a class="baocun" @click="save(item)">保存</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">下发用户短信通知</td>
                        <td class="rightTd" style="position:relative;">
                            <div class="choose">
                                <input type="radio" class="leftcheck dingwei" id="yes" v-model="AccountData.flag" style="width:30px;" value="1"></input>
                                <label for="yes" class="yes">是</label>
                            </div>
                            <div class="choose">
                                <input type="radio" class="rightcheck dingfou" id="no" v-model="AccountData.flag" value="0"></input>
                                <label for="no" style="padding-left:112px;">否</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftTd">下发短信内容(为空则发送默认短信)</td>
                        <td class="rightTd" style="height:58px;padding: 5px 15px;">
                            <textarea class="txtArea" v-model="AccountData.content"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align:center;margin-bottom:30px;margin-top:20px;">
                <a class="sub" @click="register()">提交</a>
            </div>
        </div>
    </div>
    <!-- <div style="text-align:center;margin-bottom:30px;">
		<a  class="sub" @click="register()">提交</a>
	</div> -->
    <div class="accountBody">
        <div class="oneAccount">批量开户</div>
        <table class="AcountTable">
            <tbody>
                <tr>
                    <td class="leftTd"><span>导入文件</span>
                        <input class="uploadbox" placeholder="（可传xlsx、xls格式文件）" v-model="addPrizeFileName" style="width:200px;"></input>
                        <file-upload name="homeBg" action="file/import" :auto="true" class="upload-btn" style="display:inline-block;"></file-upload> <a @click="TableInstance" style="color:#587ebf;cursor:pointer;">表格事例</a>
                    </td>
                </tr>
                <tr>
                    <td class="leftTd">
                        <div style="display:inline-block;position:relative;">
                            <input type="checkbox" class="" style="position: absolute;left:165px;top: 8px;width:22px;" v-model="openaccount" id="openaccount"></input>
                            <label for="openaccount" style="position:relative;display:inline-block;">下发短信告诉用户开户? </label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="text-align: center;margin-bottom:30px;">
        <a class="sub" @click="registerAll()">提交</a>
    </div>
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
