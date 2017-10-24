<template>
	<div class="view view-vip">
		<img :src="'images/37.png'" alt="" class="text-banner">

		<a href="javascript:;" @click="openLogin" class="link"><img :src="'images/38.png'" alt="开通会员免费下载" width="398" height="105"></a>
		<a href="http://box.10155.com/Club/portal/zwzt/00_4801_th.jsp?cid=004801" target="_blank" class="link" style="margin-top: 30px;" @click="addChannel('试听全部歌曲', 1)"><img :src="'images/39.png'" alt="试听全部歌曲" width="398" height="105"></a>
		<img :src="'images/45.png'" alt="扫一扫领取福利" class="text-wechat">
		<modal :show.sync="loginModal.show" class="login-modal">
			<div class="header">
				<img :src="'images/title-2.png'" class="title2" alt="身份验证">
				<img :src="'images/icon-close.png'" alt="关闭" @click="loginModal.show=false" class="close">
			</div>
			<form @submit.prevent="login">
				<label>
					<span>手机号：</span>
					<input type="text" placeholder="请输入联通手机号码" v-model="formData.mobile">
				</label>
				<label>
					<span>短信码：</span>
					<input type="text" v-model="formData.code">
					<span class="btn-send" @click="sendMsg">{{codeMsg.text}}</span>
				</label>
				<button type="submit" class="btn-ok ml mt"><img :src="'images/35.png'" alt="确定"></button>
			</form>
		</modal>

		<modal :show.sync="openVipModal.show" class="open-vip-modal">
			<div class="header">
				<img :src="'images/title-1.png'" class="title1" alt="开通沃音乐会员">
				<img :src="'images/icon-close.png'" alt="关闭" @click="openVipModal.show=false" class="close">
			</div>
			<form @submit.prevent="tipModal.show = true">
				<label>
					<span>手机号：</span>
					<input type="text" placeholder="请输入联通手机号码" disabled="true" v-model="formData.mobile">
				</label>
				<label>
					<span>短信码：</span>
					<input type="text" v-model="formData.verifyCode">
					<span class="btn-send" @click="sendVipMsg">{{codeMsg.text}}</span>
				</label>
				
				<button type="submit" class="btn-open-ok ml mt"><img :src="'images/42.png'" alt="马上开通"></button>
			</form>
			<div class="footer">
				<h3>温馨提示：</h3>
				<p>1、全国4G用户和广东、上海、吉林、甘
				   肃2/3G非炫铃用户，可直接开通沃音
				   乐高级会员（6元/月），其它省分的
				   2/3G非炫铃用户暂时只能开通“炫铃
				   功能（5元/月）+沃音乐特惠会员
				  （1元/月）”会员组合包。</p>
				<p>2、全国2/3G炫铃用户仅需+1元开通沃音
				   乐特惠会员（1元/月）即可享会员服务。</p>
			</div>
		</modal>
		
		<modal :show.sync="tipModal.show">
			<div class="header">
				<img :src="'images/title-3.png'" class="title3" alt="提示">
				<img :src="'images/icon-close.png'" alt="关闭" @click="tipModal.show=false" class="close">
			</div>
				
			<div class="content">
				<p>{formData.mobile}}您好，欢迎您开通
			沃音乐会员，开通后可立即参与活
			动，会员资费6元/月(含炫铃功能费)
			是否确认订购？</p>
			<div>
				<button class="btn-ok" style="float: left;" @click="tipModal.show=false"><img :src="'images/36.png'" alt="取消"></button>
				<button class="btn-ok" style="float: right;" @click="openVip"><img :src="'images/35.png'" alt="确定"></button>
			</div>
			</div>
		</modal>

		<modal :show.sync="tipModal2.show">
			<div class="header">
				<img :src="'images/title-3.png'" class="title3" alt="提示">
				<img :src="'images/icon-close.png'" alt="关闭" @click="tipModal2.show=false" class="close">
			</div>
				
			<div class="content">
				<p>开通沃音乐会员成功，现在参与活动领取福利吧！</p>
			<div style="text-align: center;">
				<button class="btn-ok" @click="tipModal2.show=false"><img :src="'images/35.png'" alt="确定"></button>
			</div>
			</div>
		</modal>

		<loading :show.sync="loading.show" :duration="loading.duration" :icon="loading.icon" :text="loading.text"></loading>
	</div>
</template>

<script>
	import api from '../api'
	import utils from '../utils'

	
	var secounds = 60;

	export default {
		components: {
			modal: require('../components/modal.vue'),
			loading: require('../components/loading.vue')
		},
		data() {
			return {
				formData: {
					mobile: '',
					code: '',
					product_id: '',
					verifyCode: ''
				},
				loginModal: {
					show: false
				},
				openVipModal: {
					show: false
				},
				tipModal: {
					show: false
				},
				tipModal2: {
					show: false
				},
				codeMsg: {
					text: '点击获取',
					secounds: secounds
				},

				loading: {
					show: false,
					text: '',
					duration: 1200,
					icon: false
				},

				timer_id: ''
			}
		},
		ready() {
			this.addChannel('vip.jsp')
		},

		methods: {
			openLogin() {
				this.loginModal.show = true

				this.addChannel('开通会员免费下载', 1)
			},

			login() {
				this.showLoading({text: '登录中..', icon: true, duration: 0})
				api.login(this, this.formData, function(back) {
					

					if(back.resCode=='0') {
						this.resetCodeMsg();
						
						this.loginModal.show = false;
						
						this.formData.code = '';
						

						var product_id = utils.getcookie('cn.easier.wmpo.tone.user')
						console.log(product_id)

						if(product_id=='0000000000') {
							this.showLoading({text: '你已是沃音乐会员', duration: 3000})
							return;
						}

						this.showLoading({text: '登录成功'})
						this.formData.product_id = product_id;
						this.openVipModal.show = true;
					}
					else if(back.resCode=="40001") {
						this.showLoading({text: '验证码错误或已过'})
					}
					else {
						this.showLoading({text: '登录失败'})
					}


					console.log(back)
				}.bind(this));
			},

			openVip() {
				this.showLoading({text: '开通中..', duration: 0, icon: true})

				api.openMember(this, 
					{
						mobile: this.formData.mobile, 
						productId: this.formData.product_id,
						verifyCode: this.formData.verifyCode
					}, function(back) {
						console.log(back)
						if(back.resCode=='0') {
							this.tipModal2.show = true;
							window.open('http://box.10155.com/Club/portal/newth/gua/index.jsp')
							this.hideLoading()
						}
						else {
							this.showLoading({text: '开通失败', duration: 2000})
						}
					}.bind(this))
			},

			sendMsg() {
				var mobile = this.formData.mobile;

				if(this.codeMsg.text !== '点击获取') return;

				if(!utils.checkMobile(mobile)) {
					this.showLoading({text: '请输入正确手机号码'})
					return;
				}

				this.timer_id = this.sendTimer()

				api.sendLoginCode(this, {mobile: mobile}, function(back) {
					console.log(back)
					if(back.resCode=='0') {
						// this.showLoading({text: '短信发送成功'})
						if(back.repBody) {

							var repBody = JSON.parse(back.repBody);
							if(repBody.returnCode==200002) {
								this.showLoading({text: '发送失败'})
							}
						}
					}
				}.bind(this));
			},

			sendVipMsg() {
				var mobile = this.formData.mobile;

				if(this.codeMsg.text !== '点击获取') return;

				if(!utils.checkMobile(mobile)) {
					this.showLoading({text: '请输入正确手机号码'})
					return;
				}

				this.timer_id = this.sendTimer()

				api.sendVerifyCode(this, this.formData, function(back) {
					console.log(back)
					if(back.resCode=='0') {
						this.showLoading({text: '短信发送成功'})
					}
				}.bind(this));
			},

			sendTimer() {

				this.codeMsg.text = '' + secounds + 's';

				secounds--;

				if(secounds<=0) {
					this.resetCodeMsg();
					return;
				}
				
				this.timer_id = setTimeout(this.sendTimer, 1000)
			},

			resetCodeMsg() {
				console.log(this.timer_id)
				clearTimeout(this.timer_id)

				this.codeMsg.text = '点击获取'
				secounds = this.codeMsg.secounds;
								
			},

			addChannel(name,type) {
				var obj = {
					aid: 9,
					type: 'signin'
				}
				if(type) {
					obj.type = 'button'
					obj.button_name = name;
				}
				if(name=='vip.jsp') {
					obj.source = 'vip.jsp'
				}

				api.addChannelLog(this, obj);
			},

			showLoading(obj) {
	
				var o = {
					duration: 1200,
					name: 'msg',
					icon: false,
					text: '',
					show: true
				}

				utils.extend(o, obj)
				this.loading = o;
				console.log(this.loading)
				
			},
			hideLoading() {
				this.loading.show = false;
			}
		}
	}
</script>