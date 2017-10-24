<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>美赞臣管理后台登陆</title>
    <link rel="stylesheet" href="src/css/home.css">
   

    <script>
    	var basePath = '<%=basePath%>';
    </script>
    <script type="text/javascript" src="src/js/vue.min.js"></script>
    <script type="text/javascript" src="src/js/vue-resource.min.js"></script>
    <script type="text/javascript" src="src/My97DatePicker/WdatePicker.js"></script>
    <!-- <script type="text/javascript" src="src/laydate/laydate.js"></script> -->
    <!-- <script type="text/javascript" src="dist/vue-resource.min.js"></script> -->
</head>

<body id="login">
	
	<!-- 新的登陆页面 -->
	<div class="out">
	    <form  role="form"  @submit="login">
            <div class="login-bg">
               <img src="src/images/GS-logo.jpg"  class="login-bg-img">
               <h1>美赞臣管理后台</h1>
               <div class="login-box">
                   <div class="login-box-header"></div>
                   <p v-show="erronMsg" class="erronClass" style="position: absolute;top:30px;left:20px;">用户名或密码错误</p>
                   <input class="login-name"  type="text"  placeholder="用户名"></input>
                   <input class="login-password" type="password"  placeholder="密码"></input>
                   
                       <div>
                       <a href="" class="forget-pw">忘记密码</a>
                       <button type="submit" class="login-btn" @click="login()">登录</button> 

                       <!-- <a class="login-btn">登录</a> -->
                   
                   </div>
               </div>
            </div>
        </form>
            <div class="MJohnson-foot">版权所有:广州易杰数码有限公司</div>
    </div>
		
<!-- 登陆弹框 -->
	<!-- <section class="shadow-section" v-show="loginModal" id="shadowS">
		<div class="content" id="scontent">
			<img src="src/images/login1.png"  class="imgtop" />
			<a href="javascript:;" class="fa fa-close close-stc" @click="loginModal=false">×</a>
			<img src="src/images/logo1.png" />
			<form id="form" @submit.prevent="login">
				<ul class="login-wrap">
					<li><input type="text" placeholder="账号/用户名" id="username" v-model="loginData.userAccount"/></li>
					<li><input type="password" placeholder="密码" oncontextmenu="return false" onpaste="return false" id="password"  v-model="loginData.userPass"/></li>
					<li><button class="btn btn-primary" id="submit" type="submit">{{loginBtn.text}}</button></li>
				</ul>
			</form>
		</div>
	</section> -->
	<!-- 登陆成功 -->
	<section class="shadow-section" id="loginRltModal" style="display: none">
		<div class="loginSuccess">
			<p class="login-title">登陆成功!</p>
		</div>
	</section>


</body>

<script>

	new Vue({
		el: '#login',
		data: {
			loginBtn: {
				text: '立即登录',
				isSubmit: false,
				isError: false
			},
			loginData: {
				userAccount: '',
				userPass: ''
			},

			loginModal: false,

			userInfo: null,

			isLogin: false,
			erronMsg: false
		},
		watch:{
		},
		methods: {
			// login(){
			// 	if(){
					
			// 	}
			// },
			login: function() {
				var that = this;
				if(!this.loginData.userAccount||!this.loginData.userPass) return;


				if(this.loginBtn.isSubmit) return;
				this.loginBtn.text = '登录中';
				this.loginBtn.isSubmit = true;

				this.$http.post(basePath + 'manager/get', getCreds('5012',this.loginData), function(back) {
					console.log(back)
					if(back.resCode=="0") {
						this.loginBtn.text = '登录成功';

						showDia();

						localStorage.ams_user_info = JSON.stringify(back.repBody);

						this.userInfo = back.repBody;
						this.isLogin = true;

						this.loginModal = false;

						setTimeout(function() {
							that.loginBtn.text = '立即登录';
							that.loginData = {};
						}, 500)

						
					} else if(back.resCode=="10003"){
						this.erronMsg = true;
					}
					else {
						this.loginBtn.text = '立即登录';
						
					}
					
					this.loginBtn.isSubmit = false;
				})
			},
			checkLogin: function() {
				var login = false;

				if (document.cookie.indexOf('admin_token') < 0) {
			        localStorage.removeItem('ams_user_info');
			        this.isLogin= false;
			    }
			    else {
			        this.isLogin= true;
			    	login = true;
			    }

			    return login;
			 },
			logout: function() {
				this.$http.post(basePath + 'manager/logout', getCreds('5010', {}), function(back) {
		            this.checkLogin();
		        })
			},
			
			create: function() {
				if(this.checkLogin()) {
					location.href = basePath+'index.jsp';
				}
				else {
					this.loginModal = true;
				}
			}
		},
		ready: function() {
			if(this.checkLogin()) {
				this.userInfo = eval('('+localStorage.getItem('ams_user_info')+')');
			}
			scrollH();
		}
	});


	function getCreds(proNo, body) {
		return {
	        base: {
	            reqTime: now(),
	            proNo: proNo,
	        },
	        body: body
	    }
	}

	function now() {
	    var date = new Date(),
	    	year = date.getFullYear(),
	    	months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
	    	days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
	    	hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
	    	minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
	    	secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();
	    return ('' + year + months + days + hours + minutes + secounds);
	}

	 function scrollH(){
	 	// var h=document.body.scrollHeight;
	 	// var w=document.body.scrollWidth;
	 	// document.getElementById('shadowS').style.width=w+'px';
	 	// document.getElementById('shadowS').style.height=h+'px';
	 	
	 }

	 function showDia(){
	 	var obj = document.getElementById('loginRltModal');
	 	obj.style.display = 'block';
	 	setTimeout(function(){
	 		obj.style.display = 'none';
	 	}, 1000)
	 }
</script>
</html>
