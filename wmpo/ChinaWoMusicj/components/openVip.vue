<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<p class="title">开通沃音乐会员</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码：</span>
						<input type="text" v-model="$root.vipInfo.mobile"  placeholder="请输入联通手机号码" maxlength="11" style="width: 384px;"/>
					</div>
					<div class="code">
						<span>&nbsp;验证码：</span>
						<input type="text" v-model="$root.vipInfo.verifyCode" maxlength="6"  placeholder="请输入短信验证码" style="width: 230px;"/>
						<a  @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
					<a style="background: url('./i/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="openVip()">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				</div>
				<div class="openvip-panel">
					<p class="title1">温馨提示：</p>
					<p>1、全国4G用户和广东、上海、吉林、甘肃2/3G非炫
   						铃用户，可直接开通沃音乐高级会员（6元/月），
   						其它省分的2/3G非炫铃用户暂时只能开通“炫铃
   						功能（5元/月）+沃音乐特惠会员（1元/月）”
   						会员组合包。</p>
   						<p>2、全国2/3G炫铃用户仅需+1元开通沃音乐特惠会员（1元/月）即可享会员服务。</p>

				</div>
				
				<img class="close-img" :src="'i/images/sp-close.png'" @click="openvipShow = false">
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../../../src/components/Modal.vue'
	import api from './../utils/serverapi.js'
	export default{
		components: {
			modal
		},
		data(){
			return{
				tip:"",
				
				
				timeflag:'获取验证码',
				codeing:false,
				
			}
		},
		props: {
			openvipShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			openvipShow(value) {
				if(value){
					this.$root.vipInfo.mobile = sessionStorage.getItem('LoginMobile')? sessionStorage.getItem('LoginMobile') : '';
					console.log(this.$root.vipInfo.mobile);
				}
			}
		},
		ready(){
			this.$root.vipInfo.mobile = sessionStorage.getItem('LoginMobile')? sessionStorage.getItem('LoginMobile') : '';
			console.log(this.$root.vipInfo.mobile);
		},
		methods:{
			//校验信息
			checkData(mobile, code) {
				var reg = /^1\d{10}$/;
				if(!reg.test(mobile)) {
					return "请输入正确的手机号码!";
				}
				var reg_code = /^\d{6}$/;
				if(code != undefined && !reg_code.test(code)) {
					return "请输入正确的验证码!";
				}
				return true;
			},
			getCode(){
				var that=this;
				if(that.codeing){
					return;
				}
				var checkret = this.checkData(that.$root.vipInfo.mobile,"111111");
				if(checkret === true){
					that.timeflag = '60s';
					that.codeing=true;
					api.sendVerifyCode(this, {
						'mobile':that.$root.vipInfo.mobile,
						'product_id': that.$root.cookieVip
					}, (back) => {
						if(back.resCode!='0'){
							that.$dispatch('handle_server_error', back);
						}
						else{
							that.$dispatch('loading', {text: '验证码已发送，请留意手机短信', show: true, duration: 1000});
						}
					});
					var	time = setInterval(function() {
						if(that.timeflag == '0s') {
							that.codeing=false;
							clearInterval(time);
							that.timeflag = '获取验证码';
						} else {
							var newTime =that.timeflag;
							newTime = newTime.substring(0, newTime.length - 1);
							that.timeflag = (parseInt(newTime) - 1) + 's';
						}
					}, 1000);
				}
				else{
					that.$dispatch('loading', {text: checkret , show: true, duration: 1000}); 
				}
			},
			openVip(){
				var that=this,
				checkMsg = this.checkData(that.$root.vipInfo.mobile,that.$root.vipInfo.verifyCode);
				if(checkMsg === true) {
					// api.openMember(this, that.vip, (back) => {
					// 	if(back.resCode!='0'){
					// 		that.$dispatch('handle_server_error', back);
					// 	}
					// 	else{
							that.$root.vipsure = true;
							that.$root.openvip = false;
							
					// 	}
					// });
				}else that.$dispatch('loading', {text: checkMsg , show: true, duration: 1000}); 
			}
		}
	}
</script>

<style lang="sass">
	.graycode{
			-webkit-filter: grayscale(100%);
			-moz-filter: grayscale(100%);
			-ms-filter: grayscale(100%);
			-o-filter: grayscale(100%);

			filter: grayscale(100%);

			filter: gray;
			font-size: 40px!important;	
			// line-height: 2!important;
		}
	.components-openvip{
		width: 100%;
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #4e140c;
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #4e140c;
				text-align: center;
				font-weight: 600;
			    padding: 25px;
    			border-bottom: 2px solid #ffae00;
				
			}
			.login-panel{
				margin-top: 60px;
			    padding-bottom: 20px;
    			border-bottom: 2px solid #ffae00;
				.code{
					position: relative;
					text-align: left;
					margin-top: 35px;
					a{
						width: 146px;
						height: 60px;
						text-align: center;
						display: inline-block;
						line-height: 60px;
						color: white;
						font-size: 24px;
						background-color: #ffae00;
						border-radius: 6px;
						vertical-align: top;
						
					}
					input{
						width: 100px;
					}
				}
				input{
					outline: none;
					border: 0;
					background-size: 100% 100%!important;
					background-repeat: no-repeat!important;
					font-size: 24px;
					height: 60px;
					text-indent: 20px;
				}
			}
			.openvip-panel{
			    padding: 20px;
    			font-size: 20px;
    			.title1{
    				line-height: 40px;
    				font-size: 30px;
    				font-weight: 600;
    			}
			}
			.success-panel{
				 line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 60%;
			    padding: 30px 0;
			    vertical-align: middle;

			}
			.confirm-btn{
				display: block;
			    width: 254px;
    			height: 89px;
				margin: 35px auto;
				line-height: 89px;
				font-size: 30px;
				text-align: center;
				color: #4e140c;
				background-color: #98ce2e;
				border-radius: 25px;
				font-weight: 600;
				
			}
			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 56px;
				max-height: 50px;
			}
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 100px 30px !important;
	}
</style>