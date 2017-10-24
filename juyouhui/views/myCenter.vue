<template>
	<div class="myCenter">
		<div class="myCenterTop" >
		<!-- v-link="{path: '/login/'}" -->
			<div class="box"><div class="favicon"></div></div>
			<!-- <p >点击登录</p> -->
			<p class="ID">ID: {{id}}</p>
			<p class="number">已绑定手机号码: {{number}}</p>
		</div>
		<div class="myCenterList">
			<div class="feature"  v-link="{path : '/phoneLogin/onloadreset'}">
				<!-- <img :src="item.imgUrl"> -->
				更改密码 <span class="fr" style="margin-right: 20px;height: 100%"><img src="../images/rightarrow.png"></span>
			</div>
			<div class="feature" @click="showMask = true">
				<!-- <img :src="item.imgUrl"> -->
				退出登录
			</div>
		</div>
		<div class="alert" v-show="showMask">
			<div class="top">是否确定退出登录</div>
			<div class="borrom">
				<div class="left" @click="showMask = false">取消</div>
				<div class="right" @click="quit">确定</div>
			</div>
		</div>
		<div class="mask" v-show="showMask"></div>
	</div>
</template>
<script type="text/javascript">
	import commonMethods from '../utils/commonMethods.js'
	 export default { 
		created () {
				// document.querySelector('.phoneLogin').style.height = window.screen.height+'px'
				var _this = this
				setTimeout(function(){
					_this.$el.style.height = document.body.clientHeight+'px'
				},10)
				// this.id = this.getId();
				this.id = commonMethods.getId();
				// this.number = this.getNumber();
				this.number = commonMethods.getNumber();
		}, 
	 	data () {
	 		return {
	 			showMask : false,
	 			id : '',
	 			number:'',
	 			// myCenterList : [{
	 			// 	name : '更改密码',
	 			// 	// imgUrl : './images/center/collect.png',
	 			// },{
	 			// 	name : '退出登录',
	 			// 	// imgUrl : './images/center/share.png',
	 			// }]
	 		}
	 	},
	 	methods : {
	 		quit () {
	 			commonMethods.delCookie("ID")
                this.$router.go({path : '/phoneLogin/'})
	 		}
	 	}

	}
</script>
<style lang="scss" scoped>
	.myCenter {
		background-color: #fff;
		.myCenterTop {
			height: 230px;
			padding-top: 20px;
			background-color: #ec5252;
			position: relative;
			.box {
				width :35%;
				height: 100%;
				display: inline-block;
				float: left;

			}
			.favicon {
				width: 166px;
				height: 166px;
				box-sizing: border-box;
				// margin: 0 auto;
				background-color: #bdbdbd;
				border: 5px solid #fff;
				border-radius: 83px;
				position: absolute;
				top: 40px;
				left: 5%;
				background-image: url(../images/bg.png);
				background-position: -5px -30px;
			}
			// p {
			// 	text-align: center;
			// 	font-size: 28px;
			// 	padding-top:8px;
			// 	color: #fff;
			// }
			p {
				color : #fff;
			}
			.ID {
				margin:  0 auto ;
				font-size: 30px;
				margin-top: 50px;
			} 
			.number {
				font-size: 25px;
				margin-top: 15px;
			}
		}
		.myCenterList {
			// border-top: 20px solid #f3f3f3;
			.feature {
				height: 70px;
				border-bottom: 5px solid #f3f3f3;
				background-color: #fff;
				// padding-left: 74px;
				padding-left: 5%;
				font-size: 30px;
				line-height: 70px;
				position: relative;
			}
			span {
				// position: relative;
				img {
				position: absolute;
				top: 50%;
				right: 25px;
				transform: translateY(-50%);
				}
			}
		}
		.alert {
			width: 500px;
			height: 300px;
			border-radius: 5px;
			position: absolute;
			z-index: 200;
			background-color: #fff;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			.top {
				height: 200px;
				line-height: 200px;
				text-align: center;
				font-size: 28px;
			}
			.borrom {
				.left,.right {
					width: 49%;
					box-sizing: border-box;
					font-size: 28px;
					color: red;
					line-height: 100px;
					text-align: center;
					border-top: 1px solid #ccc;
					display: inline-block;
				}
				.left {
					border-right: 1px solid #ccc;
				}
			}
		}
		.mask {
			top: 0 ;
		}
		
	}
</style>