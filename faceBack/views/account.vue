<template>
    <div class="box1">
        <div class="top">
            <button type="button" class="btn btn-primary" style="line-height: 20px" @click="addUser.showAlert=true">增加角色</button>
        </div>
        <div class="middle">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                        <th>账号名</th>
                        <th>所属单位</th>
                        <th>所属部门</th>
                        <th>角色描述</th>
                        <th>编辑信息</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in userList" track-by="$index">
                        <td>{{item.pk_acct}}</td>
                        <td>{{item.firm_name}}</td>
                        <td>{{item.department}}</td>
                        <td>{{item.des}}</td>
                        <td><span class="glyphicon glyphicon-pencil" aria-hidden="true" @click="showEdit(item)">
                    
                </span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <load :show="isLoad"></load>
        <alert :show.sync="addUser.showAlert" :mytype="addUser.type" :my-form="addUser.data"></alert>
        <alert :show.sync="edit.showAlert" :mytype="edit.type" :my-form.sync="edit.data"></alert>
    </div>
</template>
<style lang="scss" scoped>
.box1 {
    height: 100%;
    padding-left: 30px;
    padding-top: 20px;
    padding-right: 50px;
    box-sizing: border-box;
    .top {
        display: flex;
        flex-direction: row-reverse;
        a {
            margin-left: 20px;
        }
        button {}
        input,
        select {
            display: inline-block;
            width: 96px;
            height: 19px;
        }
        select {
            vertical-align: bottom;
        }
    }
    .middle {
        margin-top: 20px;
        padding-left: 20px;
        display: flex;
        a {
            cursor: pointer;
        }
        th,
        td {
            text-align: center;
        }
    }
}
</style>
<script type="text/javascript">
import alert from '../components/accountAlert.vue'
import api from '../api/index.js'
import load from '../components/load.vue'
export default {
    components: {
        alert,
        load,
    },
    data() {
        return {
            isLoad: false,
            addUser: {
                showAlert: false,
                type: '增加角色',
                data: {
                    name: '',
                    company: '',
                    department: '',
                    roles: '',
                    psw: '',
                    checkPsw: '',
                },
            },
            edit: {
                showAlert: false,
                type: '编辑',
                data: {
                    name: '',
                    company: '',
                    department: '',
                    roles: '',
                    psw: '',
                    checkPsw: '',
                    oldusername: '',
                }
            },
            userList: [],
        }
    },
    ready() {
        this.$on('addUser', (formData) => {
            if (formData.psw !== formData.checkPsw) return window.alert('两次密码一致')
            api.addUser(this, {
                "pkAcct": formData.name, //必填，用户名
                "firm": formData.company, //必填，公司
                "department": formData.department, //必填，部门
                "des": formData.roles, //必填，角色
                "pass": formData.psw
            }, res => {
                console.log(res)
                if (res.resCode === "000000" && res.resMsg === "success" && res.repBody === "添加成功") {
                    this.addUser.showAlert = false;
                    var mes = {
                        pk_acct: formData.name,
                        firm_name: formData.company,
                        department: formData.department,
                        des: formData.roles,

                    }
                    this.userList.push(mes)
                } else if (res.resCode === "000000" && res.resMsg === "success" && res.repBody === "该用户已存在") {
                    window.alert('该用户已存在')

                }
                if (res.resMsg === 'session失效') {
                    window.alert('登录失效,请重新登录')
                    this.router.go({
                        path: '/'
                    })
                }
                this.addUser.data = { //清空数据
                    name: '',
                    company: '',
                    department: '',
                    roles: '',
                    psw: '',
                    checkPsw: '',
                }

            })
        });
        this.$on('edit', (formData) => {
            api.userUpdate(this, {
                "pkAcct": formData.name, //必填，用户名
                "firm": formData.company, //必填，公司
                "department": formData.department, //必填，部门
                "des": formData.roles, //必填，角色
                "pass": formData.psw,
                "pkAcct1": formData.oldusername,
            }, res => {
                if (res.repBody === '更新成功' && res.resCode === '000000' && res.resMsg === 'success') {
                    this.edit.showAlert = false;
                    this.getList()

                } else {
                    window.alert('修改失败')
                }

            })
        });

        this.getList()


    },
    methods: {
        showEdit(item) {
            this.edit.showAlert = true;
            this.edit.data = {
                name: item.pk_acct,
                company: item.firm_name,
                department: item.department,
                roles: item.des,
                psw: '',
                checkPsw: '',
                oldusername: item.pk_acct,
            }

        },
        getList() {
            this.isLoad = true;
            api.userList(this, {

            }, res => {
                if (res.resCode === "000000" && res.resMsg === "success") {
                    this.userList = res.repBody

                    this.isLoad = false;
                }

            })
        },
    }
}
</script>
