<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<div class="box" style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon" src="../../images/music.png">
				<p class="title">沃音乐登录</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码:</span>
						<input type="text" v-model="login.mobile" placeholder="请输入联通手机号码" maxlength="11" />
					</div>
					<div class="code">
						<span>&nbsp;验 证 码:</span>
						<input type="text" v-model="login.code" maxlength="6" placeholder="短信验证码" />
						<a @click="getCode()" :class="{graycode:codeing}">
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="confirm-btn" style="background-repeat: no-repeat; background-size: 100% 100%;" @click="loginFun()"></a>
	
				<img class="close-img" src="../../images/x.png" @click="close">
			</div>
		</div>
	</modal>
</template>

<script>
import utils from '../../../../../utils'
import sapi from '../../../../service'
import modal from './modal/Modal.vue'
import Statistics from '../../statistics.js'
export default {
	components: {
		modal
	},
	data() {
		return {
			timeflag: '获取验证码',
			codeing: false,
			login: {
				mobile: '',
				code: ''
			}
		}
	},
	props: {
		loginShow: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		//校验信息
		checkData(mobile, code) {
			var reg = /^1\d{10}$/;
			if (!reg.test(mobile)) {
				return "请输入正确的手机号码!";
			}
			var reg_code = /^\d{4}$/;
			if (code != undefined && !reg_code.test(code)) {
				return "请输入正确的验证码!";
			}
			return true;
		},
		getCode() {
			var that = this;
			if (that.codeing) {
				return;
			}
			var checkret = this.checkData(that.login.mobile, "1111");
			if (checkret === true) {
				// 校验手机号码是不是联通号码
				utils.requireScript('/song/src/js/songPublic.js', (success) => {
					getSegByNumber(this.login.mobile, (successMsg) => {
						this.sendPeVerifyCode()
					}, (errMsg) => {
						this.$dispatch('handle_server_error', errMsg);
					})
				}, (error) => {
					this.sendPeVerifyCode()
				})
			}
			else {
				that.$dispatch('loading', { text: checkret, show: true, duration: 1000 });
			}
		},
		loginFun() {
			var that = this,
				checkMsg = this.checkData(that.login.mobile, that.login.code);
			if (checkMsg === true) {
				sapi.mobileLogin(this, {
					mobile: that.login.mobile,
					code: that.login.code,
					'pe_appid': window.pe_appid,
					'pe_appkey': window.pe_appkey,
					aid: utils.getQueryStringByName('aid')
				}, (back) => {
					// 统计登录
					sapi.pvLog(this, {
						gateModel: 'part' + (this.$root.activeMusicid + 1) + '_sign',
						channelld: utils.getQueryStringByName('channle'),
						browserClient: window.navigator.userAgent
					}, (back) => { })
					Statistics.loginSign(this.$root.activeMusicid)

					if (back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					}
					else {
						utils.addcookie('longscreen_logined', that.login.mobile, 1)

						that.loginShow = false;
						that.$dispatch('loading', { text: '验证成功！', show: true, duration: 2000 });
						that.login.code = '';

						// 提示开通炫铃功能 
						if (utils.getcookie('cn.easier.gsu.ring.member') == 'false') {
							that.$dispatch('showOpenbell');
						} else {
							that.$dispatch('showOrderbell');
						}

						// 记录用户登录
						sapi.loginLog(this, {}, (back) => {

						})
					}
				});
			} else that.$dispatch('loading', { text: checkMsg, show: true, duration: 1000 });
		},
		close() {
			this.loginShow = false
			// 统计登录
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_sign',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.loginSign(this.$root.activeMusicid)
		},
		sendPeVerifyCode() {
			let that = this
			sapi.sendPeVerifyCode(this, {
				'mobile': this.login.mobile,
				'type': 'verify_code',
				'code_type': 'login',
				'pe_appid': window.pe_appid,
				'pe_appkey': window.pe_appkey
			}, (back) => {
				// 统计获取验证码
				sapi.pvLog(this, {
					gateModel: 'part' + (this.$root.activeMusicid + 1) + '_receive',
					channelld: utils.getQueryStringByName('channle'),
					browserClient: window.navigator.userAgent
				}, (back) => { })
				Statistics.loginReceive(this.$root.activeMusicid)

				if (back.resCode != '0') {
					that.$dispatch('handle_server_error', back.resMsg || '网络错误，请重试');
				}
				else {
					that.timeflag = '60s'
					that.codeing = true
					that.$dispatch('loading', { text: '验证码已发送，请留意手机短信', show: true, duration: 1000 })

					var time = setInterval(function () {
						if (that.timeflag == '0s') {
							that.codeing = false
							clearInterval(time)
							that.timeflag = '获取验证码'
						} else {
							var newTime = that.timeflag;
							newTime = newTime.substring(0, newTime.length - 1);
							that.timeflag = (parseInt(newTime) - 1) + 's'
						}
					}, 1000)

				}
			})
		}
	}
}
</script>
<style lang="scss" src="../../css/style.scss"></style>
