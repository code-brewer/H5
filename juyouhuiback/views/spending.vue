<template>
    <div class="box1">
        <div class="top">
            <ul class="nav nav-pills nav-pills-stacked-example">
                <li><a class="bg-success navbtn">今日开户数</a><a class="navbtn">{{today.openUser}}</a></li>
                <li><a class="bg-info navbtn">今日销户数</a><a class="navbtn">{{today.closeUser}}</a></li>
                <li><a class="bg-danger navbtn">在网用户数</a><a class="navbtn">{{today.online}}（{{difference}}）</a></li>
            </ul>
        </div>
        <div class="btn-group open" role="group" aria-label="Button group with nested dropdown" style="margin-top: 10px">
            <button type="button" class="btn btn-default" :class="{'btn-default' : !openAccount,'btn-primary' : openAccount}" @click="openAccount=true">开户</button>
            <button @click="openAccount=false" type="button" class="btn btn-default" style="margin-right: 10px" :class="{'btn-default' : openAccount,'btn-primary' : !openAccount}">销户</button>
        </div>
        <div class="middle">
            <div class="middleBox" v-if="openAccount">
                <div style="float: left;" class="middleBoxfile">
                    <!-- <p>业务销户</p>
                    <p>手机号码 <input type="number" name=""></p> -->
                    <div class="panel panel-default">
                        <div class="page-header" style="border: none;margin: 20px 0 0px;">
                            <h3 style="text-align: center">业务开户</h3>
                        </div>
                        <div class="panel-body">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">手机号码</span>
                                <input type="text" class="form-control" v-model="inputData.phone" placeholder="Your Number" aria-describedby="basic-addon1">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile" style="margin-top: 20px">导入批销名单(.txt格式文件)</label>
                                <input v-el:inputfile type="file" id="exampleInputFile" accept="text/plain" style="display: inline-block;margin-left: 20px">
                                <!-- <p class="help-block">请上传.txt格式文件</p> -->
                            </div>
                            <p class="radioMess">是否需要发送短信</p>
                            <div class="radio" style="margin-left: 40px">
                                <label>
                                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" v-model="inputData.isSend" disabled> 是
                                </label>
                            </div>
                            <div class="radio">
                                <label>
                                    <input type="radio" name="optionsRadios" id="optionsRadios2" v-model="inputData.isSend" value="0" checked disabled> 否
                                </label>
                            </div>
                            <p class="textareMess">下行短信内容（为空则发送默认短信）</p>
                            <textarea style="resize: none;" class="form-control" rows="2" placeholder="尊敬的客户,您已经成功订购聚优惠业务,包月10月,详询请拨打客服热线10010。"></textarea>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary middleBoxbtn" :class="{'disabled' : isrequest}" :disabled="isrequest" @click="opneAccount">提交开户</button>
                </div>
            </div>
            <div class="middleBox" v-else>
                <div style="float: left;" class="middleBoxfile">
                    <!-- <p>业务销户</p>
                    <p>手机号码 <input type="number" name=""></p> -->
                    <div class="panel panel-default">
                        <div class="page-header" style="border: none;margin: 20px 0 0px;">
                            <h3 style="text-align: center">业务销户</h3>
                        </div>
                        <div class="panel-body">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">手机号码</span>
                                <input v-model="closeData.phone" type="text" class="form-control" placeholder="Your Number" aria-describedby="basic-addon1">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile" style="margin-top: 20px">导入批销名单(.txt格式文件)</label>
                                <input type="file" v-el:closefile id="exampleInputFile" accept="text/plain" style="display: inline-block;margin-left: 20px">
                                <!-- <p class="help-block">请上传.txt格式文件</p> -->
                            </div>
                            <p class="radioMess">是否需要发送短信</p>
                            <div class="radio" style="margin-left: 40px">
                                <label>
                                    <input type="radio" v-model="closeData.isSend" name="optionsRadios" id="optionsRadios1" value="1" disabled> 是
                                </label>
                            </div>
                            <div class="radio">
                                <label>
                                    <input type="radio" v-model="closeData.isSend" name="optionsRadios" id="optionsRadios2" value="0" disabled checked> 否
                                </label>
                            </div>
                            <p class="textareMess">下行短信内容（为空则发送默认短信）</p>
                            <textarea style="resize: none;" class="form-control" rows="3" placeholder="尊敬的客户,您已经取消聚优惠业务,服务已经中止,谢谢您的使用,如果有其他需求,请拨打客服热线10010。"></textarea>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary middleBoxbtn" :class="{'disabled' : isrequest}" :disabled="isrequest" @click="closeAccount">提交销户</button>
                </div>
            </div>
            <!-- <div class="middleBox" >
                <div style="float: right;">
                    <div class="panel panel-default">
                      <div class="panel-body">
                        Basic panel example
                      </div>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="bottom">
            <table class="table table-bordered" style="margin-top: 10px" v-if="table.sum || phoneOpen.isShow">
                <thead>
                    <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                        <th>批号</th>
                        <th>操作数</th>
                        <th>成功数</th>
                        <th>失败数</th>
                        <th>操作类型</th>
                        <th>操作日期</th>
                        <th>操作员</th>
                        <th>操作结果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{{table.sum}}</td>
                        <td>{{table.success}}</td>
                        <td>{{table.defeat}}</td>
                        <td>{{table.type}}</td>
                        <td>{{table.date}}</td>
                        <td>{{table.user}}</td>
                        <td><a style="cursor: pointer;" v-link="{path:'/home/manage/detail2/'+table.opid}" v-if="!phoneOpen.isShow">查看明细</a><a style="cursor: pointer;" v-else>{{phoneOpen.res}}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <alert :show.sync="alert.isShow" :form-data="alert.list"></alert> -->
    </div>
</template>
<style lang="scss" scoped>
.box1 {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 50px;
    box-sizing: border-box;
    .open {
        button {
            float: right;
        }
    }
    .active {
        background-color: #8bbeea;
        color: #fff;
    }
    .top {
        box-sizing: border-box;
        ul {
            // display: inline-block;
            display: flex;
            li {
                display: inline-block;
                flex: 1;
            }
            a {
                display: inline-block;
            }
        }
        .topBox {
            height: 100%;
            flex: 1;
            font-size: 20px;
            .panel {
                height: 98px;
            }
            > div {
                //  border-width: 1px;
                // border-style: solid;
                // border-color: rgb(121, 121, 121);
                height: 70%;
                width: 80%;
                max-width: 240px;
                max-height: 120px;
                min-height: 77px;
                position: relative;
                text-align: center;
                p {
                    line-height: 21px;
                    font-size: 16px;
                    padding-left: 5px;
                    padding-top: 5px;
                    text-align: left;
                    padding-bottom: 15px;
                }
            }
        }
    }
    .middle {
        height: 400px;
        .middleBoxfile {
            position: relative;
            .middleBoxbtn {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .middleBox {
            height: 100%;
            box-sizing: border-box;
            .radio {
                display: inline-block;
            }
            .radioMess {
                font-size: 14px;
                font-weight: 700;
                display: inline-block;
            }
            .textareMess {
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 10px;
                margin-top: 20px;
            }
            > div {
                // border-width: 1px;
                //  border-style: solid;
                //  border-color: rgb(121, 121, 121);
                height: 100%;
                width: 100%;
                max-width: 700px;
                max-height: 500px;
                .panel {
                    height: 100%;
                }
            }
        }
    }
    .bottom {
        th,
        td {
            text-align: center;
        }
    }
    .file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
}
</style>
<script type="text/javascript">
import api from '../api/index.js'
import alert from '../components/pendingalet.vue'
export default {
    components: {
        alert
    },
    data() {
        return {
            isrequest: false,
            alert: {
                isShow: false,
                list: [{
                    phone: '',
                    res: '',
                    type: '',
                    dateTime: '',
                    user: this.$root.user,
                }],
            },
            openAccount: true, //开户/销户
            inputData: { //开户数据
                phone: '',
                isSend: '',
                // mess : '',

            },
            today: {
                openUser: 0,
                closeUser: 0,
                online: 0,
            },

            closeData: { //销户数据
                phone: '',
                isSend: '',
            },
            phoneOpen: {
                isShow: false,
                res: '开户成功'
            },
            table: {
                sum: 0,
                defeat: 0,
                success: 0,
                type: 0,
                date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                opid: '',
                user: this.$root.user
            },
        }
    },
    computed: {

        difference() {
            return this.today.openUser - this.today.closeUser
        }
    },
    ready() {
        this.haveUser()
    },
    attached() {
        this.openAccount = true;
        this.phoneOpen.isShow = false;
        this.table = {
            sum: 0,
            defeat: 0,
            success: 0,
            type: 0,
            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
            opid: '',
            user: this.$root.user
        }
        if (this.$els.closefile) {
            this.$els.closefile.value = '';

        }
        if (this.$els.inputfile) {
            this.$els.inputfile.value = '';

        }
    },
    methods: {
        closeAccount() {

            if (this.closeData.phone && this.closeData.phone.trim().length == 11) {
                this.isrequest = true;
                // if (this.$els.inputfile.files.length != 0) window.alert('单次只能单销或批销')
                api.cancel(this, {
                    "phone": this.closeData.phone, //必填，手机号码
                    "head": "easier", //必填，操作人员
                    "type": "0", //1是开户，0是销户
                }, res => {
                    this.isrequest = false;
                    if (res.resMsg === "success") {
                        this.phoneOpen.isShow = true;
                        this.phoneOpen.res = '销户成功';
                        this.table = {
                            sum: 1,
                            defeat: 0,
                            success: 1,
                            type: '销户',
                            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                            user: this.$root.user
                        }
                        this.haveUser()
                        this.$dispatch('refresh') //刷新其他页面
                        window.alert('操作成功')
                    } else {
                        if (res.resMsg === 'session失效') {
                            window.alert('登录失效,请重新登录')
                            this.$router.go({
                                path: '/'
                            })
                        }
                        this.phoneOpen.isShow = true;
                        this.phoneOpen.res = '销户失败';
                        this.table = {
                            sum: 1,
                            defeat: 1,
                            success: 0,
                            type: '销户',
                            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                            user: this.$root.user
                        }
                        this.haveUser()
                        this.inputData.phone = '';
                        window.alert('操作失败')

                    }


                })
            } else if (this.$els.closefile.length != 0) {

                var reg = /[.]txt$/
                if (!reg.test(this.$els.closefile.files[0].name)) {
                    window.alert('请选择.txt文件')
                    this.$els.closefile.value = ''
                    return
                }
                this.isrequest = true;
                this.upload('vip/de', this.$els.closefile.files[0], 0, (res) => {
                    this.isrequest = false;
                    if (res.resMsg === "上传成功") {
                        this.phoneOpen.isShow = false;
                        this.$els.closefile.value = ''
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].successnum,
                            type: res.repBody[0].state,
                            date: res.repBody[0].time,
                            user: this.$root.user,
                            opid: res.repBody[0].opid,
                        }

                        this.haveUser()
                        this.$dispatch('refresh') //刷新其他页面
                        window.alert('提交成功')

                    }
                    if (res.resMsg === 'session失效') {
                        window.alert('登录失效,请重新登录')
                        this.$router.go({
                            path: '/'
                        })
                    }
                })
            }

        },
        opneAccount() {

            if (this.inputData.phone && this.inputData.phone.trim().length == 11) {
                this.isrequest = true;
                // if (this.$els.inputfile.files.length != 0) window.alert('单次只能单开或批开')
                api.cancel(this, {
                    "phone": this.inputData.phone, //必填，手机号码
                    "head": "easier", //必填，操作人员
                    "type": "1", //1是开户，0是销户
                }, res => {
                    this.isrequest = false;
                    if (res.resMsg === "success") {
                        this.phoneOpen.isShow = true;
                        this.table = {
                            sum: 1,
                            defeat: 0,
                            success: 1,
                            type: '开户',
                            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                            user: this.$root.user
                        }
                        this.haveUser()
                        this.inputData.phone = '';
                        this.$dispatch('refresh') //刷新其他页面
                        window.alert('操作成功')
                    } else {
                        if (res.resMsg === 'session失效') {
                            window.alert('登录失效,请重新登录')
                            window.sessionStorage.removeItem('user')
                            this.$router.go({
                                path: '/'
                            })
                        }
                        this.phoneOpen.isShow = true;
                        this.phoneOpen.res = '销户失败';
                        this.table = {
                            sum: 1,
                            defeat: 0,
                            success: 1,
                            type: '开户',
                            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                            user: this.$root.user
                        }
                        this.haveUser()
                        window.alert('操作失败')

                    }


                })
            } else if (this.$els.inputfile.files.length != 0) {
                var reg = /[.]txt$/
                if (!reg.test(this.$els.inputfile.files[0].name)) {
                    window.alert('请选择.txt文件')
                    this.$els.inputfile.value = ''
                    return
                }
                this.isrequest = true;
                this.upload('vip/mk', this.$els.inputfile.files[0], 1, (res) => {
                    this.isrequest = false;
                    if (res.resMsg === "上传成功") {
                        this.phoneOpen.isShow = false;
                        this.$els.inputfile.value = ''
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].successnum,
                            type: res.repBody[0].state,
                            date: res.repBody[0].time,
                            user: this.$root.user,
                            opid: res.repBody[0].opid,
                        }

                        this.haveUser()
                        this.$dispatch('refresh') //刷新其他页面
                        window.alert('提交成功')

                    }
                    if (res.resMsg === 'session失效') {
                        window.alert('登录失效,请重新登录')
                        window.sessionStorage.removeItem('user')
                        this.$router.go({
                            path: '/'
                        })
                    }
                })
            }



        },

        upload(path, file, type, callback) {
            var files = file

            var form = new FormData(),
                xhr = new XMLHttpRequest();
            // form.append('Content-Type', files.type || 'application/octet-stream');
            form.append('file', files)
            form.append('type', type)
            form.append('name', this.$root.user)
            xhr.open('POST', basePath + path, true);
            xhr.send(form);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    var res = JSON.parse(xhr.responseText);
                    if (callback) callback(res)
                }
            }
        },
        haveUser() {
            api.online(this, { //今日开户数
                createtime: new Date().format(),
                createtime1: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
                deletetime: null,
                deletetime1: null,
                type: 1,
            }, res => {
                if (res.resMsg === "success") {
                    this.today.openUser = res.repBody
                }
            })
            api.online(this, { //今日销户数
                createtime: null,
                createtime1: null,
                deletetime: new Date().format(),
                deletetime1: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
                type: 0,
            }, res => {
                if (res.resMsg === "success") {
                    this.today.closeUser = res.repBody

                }
            })
            api.online(this, { //今日在线数
                createtime: null,
                createtime1: null,
                deletetime: null,
                deletetime1: null,
                type: 1,
            }, res => {
                if (res.resMsg === "success") {
                    this.today.online = res.repBody
                }
            })
        },

    }
}
</script>
