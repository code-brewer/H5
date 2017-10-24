<template>
	<div class="myCointxt main">
		<section class="texbody">
			<div class="formtxt">
				<div class="row">
					<span><span>姓名</span></span>
					<div>
						<input type="text" v-model="options.name.value" @keyup="setActive" @focus="options.name.showError=false" placeholder="请输入您的姓名">
						<p class="error-text" v-show="options.name.showError">姓名不能为空</p>
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
				<p style="font-size:22px; line-height: 1.5;">花妈会在十五个工作日内安排礼品寄送，注意查收哦！<br/>如有疑问，请在公众号对话框以“客服+您的问题”的格式将您的问题告诉花妈，花妈会尽快回复哒！</p>
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
					name: {
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
			this.options.addr.placeHolder = '请输入您的地址';
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

						i === 'mobile' && (this.options[i].errorText = '电话不能为空');
						bool = false;
						this.options[i].showError = true;
						break;
						
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
				options['oid'] = this.$route.params.oid;
				this.$dispatch('loading');
				api.updateMyorderAddr(this, options, (data) => {
					this.$dispatch('cancelLoading');
					this.isClick = false;
					if (data.resCode == "0") {
						this.$router.replace({path: '/Conchwelfare/lingjiang/'+options.oid});
					} else if (data.resCode == '1') {
						this.showSnackBar = true;
						this.text = data.resMsg;
						this.snackbarAuto = true;
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