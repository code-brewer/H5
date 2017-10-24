<template>
    <div class="header">
        <div class="logo">天河国税与广州软协纳税人学堂公众号管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="screenFull">{{isScreenFull?'全屏' : '退出全屏'}}</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import screenFull from 'screenfull'
    import api from './../../assets/api.js'

    export default {
        data() {
            return {
                name: 'admin',
                isScreenFull :true
            }
        },
        created () {
            this.listenScreenFull()
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                   
                    api.loginOut(this,{},res=>{
                        if (res.resCode==="000000"&&res.resMsg==="success") {
                            sessionStorage.removeItem('ms_username')
                            this.$router.push('/login');
                        }
                        else {
                            this.message.error('退出异常')
                        }
                    })
                }
                if(command == 'screenFull'){
                    if (this.isScreenFull) {
                        screenFull.request()
                    }
                    else {
                        screenFull.exit()
                    }
                }
            },
            listenScreenFull (e) {
                var _this = this 
                screenFull.on('change',function(e){
                    if (screenFull.isFullscreen){
                       
                         _this.isScreenFull =false
                    }
                    else {
                       
                        _this.isScreenFull =true
                    }
                })
            }
           
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        text-align: center;
        padding-left: 20px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
