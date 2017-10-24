<template>
	<div  class="login-body">
		<h1>饭盟活动后台管理系统</h1>
		<div class="login-name">
			<span class="loginpic"></span>
			<input type="text" placeholder="请输入登录名"  v-model="loginData.userAccount" style="" />
		</div>
		<div class="password">
			<span class="passpic"></span>
			<input type="password" placeholder="请输入密码"  v-model="loginData.userPass"/>
		</div>
		
		<a @click="login" class="login-btn">登录</a>
	</div>
	<modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
        <div class="close"><span @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:50px;box-sizing:border-box;">
            <p style="line-height:30px;text-align:center;">{{doubleStatus.msg}}</p>
        </div>
        <div style="padding:0px 50px;text-align:center;">
            <!-- <a class="actiontong" @click="tijiao()">确定</a> -->
            <a @click="this.doubleStatus.showMsg = false" class="nothx">确定</a>
        </div>
    </modale>
</template>
<script>
	import api from '../api/index.js'
	import Modale from '../components/Modale.vue'
	export default {
		components: {
			Modale
		},
		data() {
			return {
				loginData:{
					userAccount:'',
					userPass:''
				},
				doubleStatus: { //单选确认
	                msg: "",
	                showMsg: false,
	                errorShow: true,
	                event: null
            	}
			}
		},
		created() {
		},
		methods: {
			
			login() {
				api.get(this, this.loginData, (back)=> {
					if (back.resCode === '0') {
						window.sessionStorage.setItem('isLogin', back.repBody.user_account);
	                    this.$route.router.go({path: "/activity"});
                	}else{
                		this.doubleStatus.showMsg = true;
                		this.doubleStatus.msg = back.resMsg
                	}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.actiontong,.nothx,.juzhong {
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
    .login-body{
    	background: url(../images/login.jpg) no-repeat;
    }
}
</style>