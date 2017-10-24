<template>
    <div class="box1">
        <div class="middle">
            <div class="middleBox">
                <div class="middleBoxfile">
                    <!-- <p>业务销户</p>
					<p>手机号码 <input type="number" name=""></p> -->
                    <div class="panel panel-default">
                        <div class="page-header" style="border: none;margin: 20px 0 0px;">
                            <h3 style="text-align: center">业务转换</h3>
                        </div>
                        <div class="panel-body" style="padding-left: 90px;">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">手机号码</span>
                                <input type="text" style="width: 300px" class="form-control" v-model="inputData.phone" @input="inputData.phone.trim().length==11 ? checkLevel(inputData.phone.trim()) : member.level = ''" placeholder="Your Number" aria-describedby="basic-addon1">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile" style="margin-top: 20px">导入批转名单</label>
                                <input @change="inputData.name = $els.inputfile.files[0]&&$els.inputfile.files[0].name ?$els.inputfile.files[0].name : '点击上传文件'" style="display: none" :disabled="inputData.phone>0" v-el:inputfile type="file" id="exampleInputFile" accept=".txt" style="display: inline-block;margin-left: 20px">
                                <button :disabled="inputData.phone>0" @click="$els.inputfile.click()" type="button" class="btn btn-primary uploadButton">{{inputData.name}}</button>
                                <!-- <p class="help-block">请上传.txt格式文件</p> -->
                            </div>
                            <div style="margin-top: 18px">
                                <label for="changeVIP">原业务</label>
                                <select disabled="disabled" class="form-control " id="changeVIP">
                                    <option selected>{{member.level}}</option>
                                </select>
                                <label for="newServer" style="margin-left: 30px">新业务</label>
                                <select class="form-control " id="newServer" v-model="member.newLevel">
                                    <option selected value=''>请选择</option>
                                    <option value='3'>普通会员</option>
                                    <option value='2'>高级会员</option>
                                    <option value='1'>特级会员</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary middleBoxbtn" :class="{'disabled' : isrequest}" :disabled="isrequest" @click="opneAccount">提交开户</button>
                </div>
            </div>
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
    #changeVIP,
    #newServer {
        display: inline-block;
        width: 150px;
    }
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
        margin-top: 50px;
        height: 400px;
        .middleBoxfile {
            margin: 0 auto;
            width: 600px;
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
                max-width: 600px;
                max-height: 300px;
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

            member: {
                level: '', //手机号码的会员等级
                newLevel: '', //选择后的会员等级
            },
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
            inputData: { //转换数据
                phone: '',
                isSend: '',
                name: '点击上传文件',
                // mess : '',

            },
            today: {
                openUser: 0,
                closeUser: 0,
                online: 0,
            },
            phoneOpen: {
                isShow: false,
                // isShow : true ,
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

    },
    methods: {
        checkLevel(phone) {
            api.level(this, {
                phone: phone,
            }, res => {
                if (res.resCode === '000000') {
                    if (res.repBody == 1) {
                        this.member.level = '特级会员'
                    } else if (res.repBody == 2) {
                        this.member.level = '高级会员'
                    } else if (res.repBody == 3) {
                        this.member.level = '普通会员'
                    } else {
                        this.member.level = '未开户'
                    }
                }
            })
        },
        opneAccount() {
            if (!this.member.newLevel) return window.alert('请选择新业务')
            if (this.inputData.phone && this.inputData.phone.trim().length == 11) {
                this.isrequest = true;

                // if (this.$els.inputfile.files.length != 0) window.alert('单次只能单开或批开')

                api.aloneTrans(this, {
                    "pkmobile": this.inputData.phone, //必填，手机号码
                    "state": "1", //必填，操作人员
                    "grade": this.member.newLevel, //1是开户，0是销户
                }, res => {
                    this.isrequest = false;
                    if (res.resMsg === "success") {
                        this.phoneOpen.isShow = true;
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].success,
                            type: '业务转换',
                            date: new Date(res.repBody[0].time).format('yyyy-MM-dd HH:mm:ss'),
                            user: res.repBody[0].user,
                            opid: res.repBody[0].opid,
                        }
                        this.phoneOpen.res = res.repBody[0].result
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
                        this.phoneOpen.res = '销户失败';
                        this.table = {
                            sum: 1,
                            defeat: 0,
                            success: 1,
                            type: '开户',
                            date: new Date().format('yyyy-MM-dd HH:mm:ss'),
                            user: this.$root.user
                        }
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
                this.upload('memuser/retuall', this.$els.inputfile.files[0], this.member.newLevel, (res) => {
                    this.isrequest = false;
                    if (res.resMsg === "success") {
                        this.phoneOpen.isShow = false;
                        this.$els.inputfile.value = ''
                        this.table = {
                            sum: res.repBody[0].count,
                            defeat: res.repBody[0].fail,
                            success: res.repBody[0].success,
                            type: '批量转换',
                            date: new Date(res.repBody[0].time).format('yyyy-MM-dd HH:mm:ss'),
                            user: res.repBody[0].user,
                            opid: res.repBody[0].opid,
                        }

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
            form.append('grade', type)
                // form.append('name', this.$root.user)
            xhr.open('POST', basePath + path, true);
            xhr.send(form);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    var res = JSON.parse(xhr.responseText);
                    if (callback) callback(res)
                }
            }
        },


    }
}
</script>
