<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<div class="box" style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon" src="../../images/music.png">
				<p class="title">沃音乐登录</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码:</span>
						<input type="text" v-model="login.mobile" placeholder="请输入联通手机号码" maxlength="11">
					</div>
					<div class="code">
						<span>&nbsp;验 证 码:</span>
						<input type="text" v-model="login.code" maxlength="6" placeholder="短信验证码">
						<a @click="getCode()" :class="{graycode:codeing}">
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="confirm-btn" style="background-repeat: no-repeat; background-size: 100% 100%;" @click="loginFun()"></a>
	
				<img class="close-img" src="../../images/x.png" @click="loginClose">
			</div>
		</div>
	</modal>
</template>

<script>
import utils from '../../../../../utils'
import modal from './modal/Modal.vue'
import sapi from '../../../../service/index'
import Statistics from '../../statistics.js'
import urlUtil from '../../../../utils/url.js'
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
			},
			sectionIndex: ''
		}
	},
	props: {
		loginShow: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		loginShow(value) {
			if (value) {
				this.sectionIndex = JSON.parse(sessionStorage.getItem('sectionIndex'));
				console.log(this.sectionIndex);

			}
		},
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
		//获取验证码
		getCode() {
			var that = this;
			if (that.codeing) {
				return;
			}
			var checkret = this.checkData(that.login.mobile, "1111");
			if (checkret === true) {
				/** 校验手机号码是不是联通号码
				 *  修改:chuilee
				 */ 
				utils.requireScript('/song/src/js/songPublic.js', () => {
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
			this.pvLog('page' + this.sectionIndex + '_receive');
			Statistics.homePage('page' + this.sectionIndex + '_receive', 'click');
		},
		// 发送验证码
		sendPeVerifyCode() {
			let that = this
			sapi.sendPeVerifyCode(this, {
				'mobile': that.login.mobile,
				'type': 'verify_code',
				'code_type': 'login',
				'pe_appid': window.pe_appid,
				'pe_appkey': window.pe_appkey
			}, (back) => {
				if (back.resCode != '0') {
					that.$dispatch('handle_server_error', back.resMsg || '网络错误，请重试');
				}
				else {
					that.timeflag = '60s';
					that.codeing = true;
					that.$dispatch('loading', { text: '验证码已发送，请留意手机短信', show: true, duration: 1000 });

					var time = setInterval(function () {
						if (that.timeflag == '0s') {
							that.codeing = false;
							clearInterval(time);
							that.timeflag = '获取验证码';
						} else {
							var newTime = that.timeflag;
							newTime = newTime.substring(0, newTime.length - 1);
							that.timeflag = (parseInt(newTime) - 1) + 's';
						}
					}, 1000);

				}
			});
		},
		//登录
		loginFun() {
			var that = this,
				checkMsg = this.checkData(that.login.mobile, that.login.code);
			if (checkMsg === true) {
				sapi.mobileLogin(this, {
					mobile: that.login.mobile,
					code: that.login.code,
					aid: utils.getQueryStringByName('aid'),
					pe_appid: window.pe_appid,
					pe_appkey: window.pe_appkey

				}, (back) => {
					if (back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					}
					else {
						// that.$root.vipInfo.mobile = that.login.mobile;

						// sessionStorage.setItem('LoginMobile', that.login.mobile);
						utils.addcookie('shortscreen_logined', that.login.mobile, 1)

						that.loginShow = false;
						that.$dispatch('loading', { text: '验证成功！', show: true, duration: 2000 });
						that.login.code = '';
						// 提示开通炫铃功能 
						if (utils.getcookie('cn.easier.gsu.ring.member') == 'true') {
							this.$root.orderbell = true;

						} else {
							this.$root.openbell = true;
						}
						// 记录用户登录
						sapi.loginLog(this, {}, (back) => {

						})
					}
				});
			} else that.$dispatch('loading', { text: checkMsg, show: true, duration: 1000 });
			this.pvLog('page' + this.sectionIndex + '_sign');
			Statistics.homePage('page' + this.sectionIndex + '_sign', 'click');
		},
		//关闭
		loginClose() {
			this.loginShow = false;
			this.pvLog('page' + this.sectionIndex + '_close1');
			Statistics.homePage('page' + this.sectionIndex + '_close1', 'click');
		},
		//数据统计
		pvLog(gateModel) {
			sapi.pvLog(this, { gateModel: gateModel, channelld: urlUtil.getArgsFromUrl('channle'), browserClient: window.navigator.userAgent }, (back) => {

			})
		}
	}
}
</script>
<style lang="scss" src="../../css/style.scss"></style>
