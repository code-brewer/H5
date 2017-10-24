<template>
	<div class="myCointxt main">
		<section class="texbody">
			<div class="formtxt">
				<div class="row">
					<span><span>姓名</span></span>
					<div>
						<input type="text" v-model="options.username.value" @keyup="setActive" @focus="options.username.showError=false" placeholder="请输入您的姓名">
						<p class="error-text" v-show="options.username.showError">姓名不能为空</p>
					</div>
				</div>
				<div class="row">
					<span><span>电话</span></span>
					<div>
						<input type="text" v-model="options.mobile.value" @keyup="setActive" @focus="options.mobile.showError=false" placeholder="请输入您的电话">
						<p class="error-text" v-show="options.mobile.showError">{{options.mobile.errorText}}</p>
					</div>
				</div>
				<div class="row">
					<span><span>地址</span></span>
					<div>
						<textarea class="texarea" v-model="options.addr.value" @keyup="setActive" @focus="options.addr.showError=false" :placeholder="options.addr.placeHolder">
						</textarea>
						<p class="error-text" v-show="options.addr.showError">地址不能为空</p>
					</div>
				</div>
				<div class="row">
					<span><span>备注</span></span>
					<div>
						<input type="text" v-model="options.remark.value" @keyup="setActive" placeholder="可以给花妈留下备注哦！">
					</div>
				</div>
				<div class="btn">
					<a href="javascript:;" :class="{active: active}" @click="submit">提交</a>
				</div>
			</div>
			<div style="color: #3ea4b0; text-align: left;">
				<p style="font-size:22px;">兑换后十五个工作日内，花妈会安排礼品寄送，注意查收哦！<br/>如有疑问，请通过后台联系花妈:客服+问题，或者添加花妈小助手微信：hbmm_001，我们会尽快回复哒。</p>
			</div>
		</section>
		<snackbar :show-snack-bar.sync="showSnackBar" :text="text" :auto="snackbarAuto"></snackbar>
	</div>
</template>
<script>
import api from '../api/index1.js'
import utils from '../utils/index.js'
import snackbar from '../components/snackbar.vue'
	export default {
		components: {
			snackbar
		},
		data() {
			return {
				options: {
					username: {
						value: '',
						showError: false
					},
					mobile: {
						value: '',
						showError: false,
						errorText: ''
					},
					addr: {
						value: '',
						showError: false,
						placeHolder: '请输入您的地址'
					},
					remark: {
						value: ''
					}
				},
				active: false,
				type: '',
				showSnackBar: false,
				snackbarAuto: true,
				text: '',
				isClick: false
			}
		},
		created(){
			document.title='秘密花园';
			//this.$dispatch('loading');
			this.options.addr.placeHolder = '请输入您的地址';
			// this.type = this.$route.params.type;
			// if (this.type.match(/invented/)) {
			// 	this.options.addr.placeHolder = '可不填';
			// } else {
			// 	this.options.addr.placeHolder = '请输入您的地址';
			// }
		},
		ready() {
			//this.$dispatch('cancelLoading');
		},
		methods:{
			setActive() {
				var bool = false;
				for(let i in this.options){
					this.options[i] !== '' && (bool = true);
				}
				bool ? this.active = true : this.active = false;
			},
			submit(e) {
				var self = e.target || e.srcElement;
				if (self.className.indexOf('active') == -1) {
					return false;
				}
				if (this.isClick) {
					return false;
				}
				this.isClick = true;
				var bool = true,
					options = {};
				for(let i in this.options){
					if (this.options[i].value === '' && i !== 'remark') {//虚拟产品手机号码必填，其他选填

						i === 'mobile' && (this.options[i].errorText = '电话不能为空',this.options[i].showError = true,bool = false);
						if (this.type.match(/invented/)) {

						} else {
							bool = false;
							this.options[i].showError = true;
							break;
						}
						
					} else if (i === 'mobile') {
						if (!utils.validate.isMob(this.options[i].value)) {
							bool = false;
							this.options[i].showError = true;
							this.options[i].errorText = '电话格式不正确';
							break;
						}
					}
					options[i] = this.options[i].value;
				}
				if (!bool) {
					this.isClick = false;
					return false;
				}
				options['gid'] = this.$route.params.gid;
				this.$dispatch('loading');
				api.scoreExchangeGift(this, options, (data) => {
					this.$dispatch('cancelLoading');
					this.isClick = false;
					if (data.resCode == "0") {
						this.$router.replace({path: '/Conchwelfare/duijiang/'+data.resMsg.split(',')[0]});
						// if (this.type.match(/invented/) || this.type == "entity") {//兑换
						// 	this.$router.replace({path: '/Conchwelfare/duijiang'});
						// } else {//抽奖领奖
						// 	this.$router.replace({path: '/Conchwelfare/lingjiang'});
						// }
					} else if (data.resCode == '1') {
						this.showSnackBar = true;
						this.text = data.resMsg;
						this.snackbarAuto = true;
					} else if (data.resCode == '2') {
						this.showSnackBar = true;
						this.text = '亲，这是签到特权礼品哟，签到达'+data.resMsg+'天才可兑换，先去<a href="#!/signIn" style="font-size: 24px; color: #f80; text-decoration: underline;">签到</a>吧~';
						this.snackbarAuto = false;
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.myCointxt {
		padding: 40px 5%;
		.texbody{
			padding: 40px 20px 100px;
			text-align: center;
			border-radius: 15px;
			background: white;
			-webkit-box-shadow: 0 15px 50px rgba(61,165,175,.4);
			box-shadow: 0 15px 50px rgba(61,165,175,.4);
		}
		.formtxt {
			.row {
				position: relative;
				padding: 15px 0 15px 160px;
				font-size: 26px;
				> div {
				position: relative;
				}
				.error-text {
					position: absolute;
					top: 100%;
					left: 0;
					width: 100%;
					margin-top: 15px;
					padding: 10px 0;
					line-height: 40px;
					font-size: 26px;
					color: white;
					border-radius: 10px;
					background: rgba(0,0,0,.6);
					z-index: 100;
					&:before {
						content: "";
						position: absolute;
						top: -30px;
						left: 20px;
						width: 0;
						height: 0;
						border: 15px solid transparent;
						border-bottom-color: rgba(0,0,0,.6);
					}
				}
				> span {
					position: absolute;
					top: 15px;
					left: 0;
					width: 140px;
					color: white;
					line-height: 52px;
					border-radius: 10px;
					background: #43a4ae;
					> span {
						display: inline-block;
						width: 190px;
						letter-spacing: 50px;
						text-align: center;
						pointer-events: none;
					}
				}
				input[type='text'] {
					display: block;
					width: 97%;
					height: 50px;
					padding-left: 3%;
					line-height: 50px;
					font-size: 26px;
					border: 1px solid #43a4ae;
					border-radius: 10px;
					color: #43a4ae;
					outline: none;
				}
				input[type='radio'] {
					float: left;
					opacity: 0;
					filter: alpha(opacity=0);
					&:checked+label {
						background: #43a4ae;
					}
				}
				.texarea{
					display: block;
					width: 100%;
					height: 220px;
					padding: 3%;
					line-height: 35px;
					font-size: 26px;
					border: 1px solid #43a4ae;
					border-radius: 10px;
					color: #43a4ae;
					outline: none;
					resize:none;
					box-sizing:border-box;
				}
			}
			.btn {
				padding: 45px 0;
				a {
					display: block;
					width: 148px;
					height: 84px;
					margin: 0 auto;
					line-height: 75px;
					text-align: center;
					color: white;
					font-size: 32px;
					background: url(../images/btn2.png) 0 0 no-repeat;
					&.active {
						background: url(../images/btn2.png) 0 -84px no-repeat;
					}
				}
			}
		}
	}
</style>