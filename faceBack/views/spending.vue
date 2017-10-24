<template>
    <div class="box1">
        <div class="top">
            <!-- <div class="topBox">
                
                <div class="panel panel-primary">
                  <div class="panel-heading">
                    <h3 class="panel-title">今日开户数</h3>
                  </div>
                  <div class="panel-body">
                    50
                  </div>
                </div>
            </div>
            <div class="topBox" style="text-align: center">
                
                <div class="panel panel-success" style="margin: 0 auto">
                  <div class="panel-heading">
                    <h3 class="panel-title">今日销户数</h3>
                  </div>
                  <div class="panel-body">
                    60
                  </div>
                </div>
            </div>
            <div class="topBox">
                <div style="float: right">
                    <div class="panel panel-info" >
                      <div class="panel-heading">
                        <h3 class="panel-title">在网用户数</h3>
                      </div>
                      <div class="panel-body">
                        6666（-10）
                      </div>
                    </div>
                </div>
            </div> -->
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
                                <input style="display: none" :disabled="inputData.phone>0" v-el:inputfile @change="inputData.name = $els.inputfile.files[0]&&$els.inputfile.files[0].name ?$els.inputfile.files[0].name : '点击上传文件'" type="file" id="exampleInputFile" accept=".txt" style="display: inline-block;margin-left: 20px">
                                <button @click="clickInputOpenFile" type="button" :disabled="inputData.phone>0" class="btn btn-primary uploadButton">{{inputData.name}}</button>
                                <!-- <p class="help-block">请上传.txt格式文件</p> -->
                            </div>
                            <div>
                                <label for="userLevel">需要开通的业务</label>
                                <select id="userLevel" class="form-control " style="display: inline-block;width: 150px;margin-left: 15px" v-model="inputData.level">
                                    <option value="3" selected>普通会员</option>
                                </select>
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
                            <textarea style="resize: none;" class="form-control" rows="2" placeholder="尊敬的用户,您已经成功订购表情秀普通会员业务,您的密码为:bqx123,详询请拨打客服热线10010。"></textarea>
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
                                <input style="display: none" @change="closeData.name = $els.closefile.files[0]&&$els.closefile.files[0].name ?$els.closefile.files[0].name : '点击上传文件'" :disabled="closeData.phone>0" type="file" v-el:closefile id="exampleInputFile" accept=".txt" style="display: inline-block;margin-left: 20px">
                                <button @click="clickInputCloseFile" :disabled="closeData.phone>0" type="button" class="btn btn-primary uploadButton">{{closeData.name}}</button>
                                <!-- <p class="help-block">请上传.txt格式文件</p> -->
                            </div>
                            <div>
                                <label for="userLevel">需销户的业务</label>
                                <select id="userLevel" class="form-control " style="display: inline-block;width: 150px;margin-left: 15px">
                                    <option value="3" selected>表情秀</option>
                                </select>
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
                            <textarea style="resize: none;" class="form-control" rows="2" placeholder="尊敬的用户,您已经取消表情秀普通会员业务,服务已经中止,谢谢您的使用,如果有其他需求,请拨打客服热线10010。"></textarea>
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
            <table class="table table-bordered" style="margin-top: 10px" v-if="first_request">
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
                <tbody v-if="table.sum || phoneOpen.isShow">
                    <tr>
                        <th scope="row">{{table.opid}}</th>
                        <td>{{table.sum}}</td>
                        <td>{{table.success}}</td>
                        <td>{{table.defeat}}</td>
                        <td>{{table.type}}</td>
                        <td>{{table.date}}</td>
                        <td>{{table.user}}</td>
                        <td><a style="cursor: pointer;" v-link="{path:'/home/manage/detail1/'+table.opid+'/'+table.type}" v-if="!phoneOpen.isShow">查看明细</a><a style="cursor: pointer;" v-else>{{phoneOpen.res}}</a></td>
                    </tr>
                </tbody>
            </table>
            <load :show="isrequest"></load>
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
                bottom: 12px;
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
import load from '../components/load.vue'
export default {
    components: {
        alert,
        load
    },
    data() {
        return {
            isrequest: false,
            first_request: false, //是否提交过文件
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
                level: '',
                name: '点击上传文件'
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
                name: '点击上传文件'
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
                user: ''
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
    attached() { //切换回来清空文件

        if (this.$els.inputfile) {
            this.$els.inputfile.value = ''
            this.inputData.name = '点击上传文件'
        }
        if (this.$els.closefile) {
            this.$els.closefile.value = ''
            this.closeData.name = '点击上传文件'
        }

    },
    methods: {
        /**
         * 点击销户上传文件按钮
         * @return {[type]} [description]
         */
        clickInputCloseFile() {
            this.$els.closefile.value = ''
            this.closeData.name = '点击上传文件'
            this.$els.closefile.click()
        },
        /**
         * 点击开户上传文件按钮
         * @return {[type]} [description]
         */
        clickInputOpenFile() {
            this.$els.inputfile.value = ''
            this.inputData.name = '点击上传文件'
            this.$els.inputfile.click()
        },
        closeAccount() {
            if (this.closeData.phone && this.closeData.phone.trim().length != 11) {
                window.alert('请输入正确的手机号码')
            }
            if (this.closeData.phone && this.closeData.phone.trim().length == 11) {
                this.isrequest = true;
                this.first_request = true;
                this.table = { //请求前清空表格
                        sum: 0,
                        defeat: 0,
                        success: 0,
                        type: 0,
                        date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                        opid: '',
                        user: ''
                    }
                    // if (this.$els.inputfile.files.length != 0) window.alert('单次只能单销或批销')
                api.aloneCancel(this, {
                    "pkmobile": this.closeData.phone, //必填，手机号码
                    "state": "0", //1是开户，0是销户
                }, res => {
                    this.isrequest = false;
                    if (res.resMsg === "success" && res.resCode === "000000") {
                        this.phoneOpen.isShow = true;
                        this.phoneOpen.res = res.repBody[0].result;
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].success,
                            type: '销户',
                            date: new Date(res.repBody[0].time).format('yyyy-MM-dd HH:mm:ss'),
                            user: res.repBody[0].user,
                            opid: res.repBody[0].opid,
                        }
                        this.closeData.name = '点击上传文件'
                        this.haveUser()
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
            } else if (this.$els.closefile.files.length != 0) {
                var reg = /[.]txt$/
                if (!reg.test(this.$els.closefile.files[0].name)) {
                    window.alert('请选择.txt文件')
                    this.$els.closefile.value = ''
                    this.closeData.name = '点击上传文件'
                    return
                }
                this.isrequest = true;
                this.first_request = true;
                this.table = { //请求前清空表格
                    sum: 0,
                    defeat: 0,
                    success: 0,
                    type: 0,
                    date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                    opid: '',
                    user: ''
                }
                this.upload('memuser/updateall', this.$els.closefile.files[0], 0, (res) => {
                    this.isrequest = false;
                    if (res.resMsg === "success") {
                        this.phoneOpen.isShow = false;
                        this.$els.closefile.value = ''
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].success,
                            type: '批量销户',
                            date: new Date(res.repBody[0].time).format('yyyy-MM-dd HH:mm:ss'),
                            user: res.repBody[0].user,
                            opid: res.repBody[0].opid,
                        }
                        this.closeData.name = '点击上传文件'
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
        opneAccount() {
            if (this.inputData.phone && this.inputData.phone.trim().length != 11) {
                window.alert('请输入正确的手机号码')
            }
            if (this.inputData.phone && this.inputData.phone.trim().length == 11) {
                this.isrequest = true;
                this.first_request = true;
                this.table = { //请求前清空表格
                        sum: 0,
                        defeat: 0,
                        success: 0,
                        type: 0,
                        date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                        opid: '',
                        user: ''
                    }
                    // if (this.$els.inputfile.files.length != 0) window.alert('单次只能单开或批开')
                api.aloneOpen(this, {
                    "pkmobile": this.inputData.phone, //必填，手机号码
                    "grade": this.inputData.level, //必填，操作人员
                    "state": '1', //1是开户，0是销户
                }, res => {
                    this.isrequest = false;
                    if (res.resMsg === "success" && res.resCode === '000000') {
                        this.phoneOpen.isShow = true;
                        this.phoneOpen.res = res.repBody[0].result;
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].success,
                            type: '开户',
                            date: new Date(res.repBody[0].time).format('yyyy-MM-dd HH:mm:ss'),
                            user: res.repBody[0].user,
                            opid: res.repBody[0].opid,
                        }
                        this.haveUser()
                        this.inputData.phone = '';
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
                        this.phoneOpen.res = '开户失败';
                        this.table = {
                            sum: 1,
                            defeat: 0,
                            success: 1,
                            type: '开户',
                            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                            user: this.$root.user,
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
                    this.inputData.name = '点击上传文件'
                    return
                }
                this.isrequest = true;
                this.first_request = true;
                this.table = {
                    sum: 0,
                    defeat: 0,
                    success: 0,
                    type: 0,
                    date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                    opid: '',
                    user: ''
                }
                this.upload('memuser/insertall', this.$els.inputfile.files[0], 1, (res) => {
                    this.isrequest = false;
                    if (res.resMsg === "success") {
                        this.phoneOpen.isShow = false;
                        this.$els.inputfile.value = ''
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].success,
                            type: '批量开户',
                            date: new Date(res.repBody[0].time).format('yyyy-MM-dd HH:mm:ss'),
                            // user : this.$root.user,
                            user: res.repBody[0].user,
                            opid: res.repBody[0].opid,
                        }

                        this.haveUser()
                        this.$dispatch('refresh') //刷新其他页面
                        window.alert('提交成功')
                        this.inputData.name = '点击上传文件'

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
                first_time: new Date().format(),
                end_time: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
            }, res => {
                if (res.resMsg === "success") {
                    this.today.openUser = res.repBody[0].new
                    this.today.closeUser = res.repBody[0].del
                    this.today.online = res.repBody[0].all
                }
            })

        },

    }
}
</script>
