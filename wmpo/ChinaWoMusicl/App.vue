<template>
	<div class="app-views">
		<div v-show="musicData.showMusic" class="music-warp">
			<music :music-bg.sync="musicData.musicBg" :music-status.sync="musicData.status" v-ref:music></music>
		</div>
		<router-view transition="slide"></router-view>
		
		<div v-if="isLoading">
			<loading :text="loading.text" :show.sync="loading.show" :icon="loading.icon" :duration="loading.duration" :name="loading.name" v-for="loading in loadingdata.loadings"></loading>
		</div>
		
		<modal :show.sync="shareModal" :box="false">
			<div class="modal-body modal-share">
				<p style="font-size: 30px;">哈哈</p>
				<div class="btn" ><span class="rd" @click="shareModal=false;">关闭</span></div>
			</div>
		</modal>
		<activity-details :show.sync="showActivityD"></activity-details>
		<login :login-show.sync="login"></login>
		<success :success-show.sync="success" :tipdef="tipdef"></success>
		<openvip :openvip-show.sync="openvip" :tipdef="tipdef"></openvip>
		<vipsure :vipsure-show.sync="vipsure" :tipdef="tipdef"></vipsure>
		<vipsuccess :vipsuccess-show.sync="vipsuccess" :tipdef="tipdef"></vipsuccess>
		<vipbenefit :vipbenefit-show.sync="vipbenefit" :tipdef="tipdef"></vipbenefit>
	</div>
	
</template>

<script>
	import {router} from './index';
	import Loading from './components/Loading.vue'
	import urlUtil from './utils/url.js'
	import Modal from './modal/Modal.vue'
	import login from './components/login.vue'
	import activityDetails from './components/activityDetails.vue'
	import music from './components/music.vue'
	import sapi from './utils/serverapi.js'
	import success from './components/success.vue'
	import openvip from './components/openvip.vue'
	import vipsure from './components/vipsure.vue'
	import vipsuccess from './components/vipsuccess.vue'
	import vipbenefit from './components/vipBenefit.vue'
	export default {
		components: {
			Loading,
			Modal,
			login,
			activityDetails,
			music,
			success,
			openvip,
			vipsure,
			vipsuccess,
			vipbenefit
		},
		data() {
			return {
				barTitle: '跑马灯活动',
				basePath: basePath,
				activityBasePath:activityBasePath,
				loadingdata: {loadings:[]},
				isLoading:false,
				shareModal: false,
				login:false,
				islogin:false,
				gameLevel:-1,
				goodlucky:false,
				success: false,
				tipdef:true,
				showActivityD:false,
				openvip: false,//开通VIP
				vipsure:false,//确认开通VIP
				vipsuccess:false,//开通成功  
				vipbenefit: false,//会员权益           
				fmappurl:"http://fm.10155.com/s/acc/1/1",
				womusichomeurl:"http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=ff80808156576253015658cd9ba20484",
				songlisturl:"http://www.10155.com",
				wxlisten:{},
				musicData: {
					musicBg: 'l/images/music.png',
					showMusic: false,
					status: 'play'
				},
				activityinfostr:{"aid":"512","appid":"wxa758261ffd0d4fb2","appsecret":"100d0736e53c48cbe616934aa950518d","audited":"1","color":"red","ctime":"2016-07-29 09:35:04","endtime":"2016-09-29 23:59:00","extbody":"{\"backgrounds\":{\"home\":\"http://211.147.242.132:9008/fsd/ap/20160627/88_8ca40d85_0205_47ac_ac73_cffc90cd28d2.jpg\",\"other\":\"http://211.147.242.132:9008/fsd/ap/20160627/88_8ba2048b_b6aa_464b_abca_45ef47367fba.jpg\",\"rule\":\"http://211.147.242.132:9008/fsd/ap/20160627/88_6e940e84_776b_4458_a798_653e26cef1db.jpg\"},\"claimscheck\":\"1\",\"logo\":\"http://211.147.242.132:9008/fsd/ap/20160627/88_6c13d89e_4dc4_49ec_aebb_6ee438d8edce.png\",\"partictypes\":{\"phone\":false,\"special\":false,\"weixin\":true},\"ruleContent\":\"<p>1、参与对象：沃百富会员</p><p>2、游戏规则：每天每个用户不限数钱机会，手指向上滑动开始数钱游戏，在规定时间内达到13000的积分，即可顺利通关，通关后将获得2点沃百富会员积分，积分可在会员商城兑换精美礼品。</p><p>3、顺利通关的用户，积分将自动下发到个人会员中心</p><p>4、活动最终解释权归沃百富app所有</p>\",\"time\":30,\"timeext\":5}","headjs":"src/js/jquery-2.1.1.min.js,src/js/jquery.cookie.js,src/js/createjs-2013.12.12.min.js","isprize":"0","logourl":"logo链接","mid":"3","path":"SliderMoney","starttime":"2016-09-26 00:00:00","status":"0","title":"数钱数到手抽筋","types":"数钱","useracct":"test2","utime":"2016-09-26 10:30:08"},
				cookieVip:'',
				accesstoken:'',
				vipInfo:{
					mobile:'',
					verifyCode:'',
					productId:'',
					aid:aid,
                    source:source,
				},
				nums:0,
				loginokcallback:false,
				on:false,
			}
		},
		ready() {
			this.addOperLog();
			var that = this;
			wxback = function(){
				if(!that.islogin)return;
				// sapi.addShareLog(that,{"types":"0"},(back)=>{
				// 	if(back){
				// 		if(back.resCode==0 || back.resCode=="0"){
				// 			if(that.wxlisten.that){
				// 				that.wxlisten.shareupdate();
				// 			}
				// 		}else{
				// 			that.$dispatch('handle_server_error', back);
				// 		}
				// 	}
				// })
			};
			if(checkLogin()) {
				this.islogin = true;
				if(getCookie('cn.easier.wmpo.tone.user') != null){
					this.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
					this.vipInfo.productId = this.cookieVip;
					if(this.$root.vipInfo.productId =='0000001625' || this.$root.vipInfo.productId =='0000001622' ){
						this.nums = 1;
					}
					else if(this.$root.vipInfo.productId =='0000001620' || this.$root.vipInfo.productId =='0000001623'){
						this.nums = 6;

					}
				}
				if(getCookie('cn.easier.wmpo.tone.accesstoken') != null){
					this.accesstoken = getCookie('cn.easier.wmpo.tone.accesstoken');
					console.log('token'+this.accesstoken);
				}
				// this.checktokentest();
			}
			else{
				if(window.location.href.indexOf('/home') < 0){
					// router.go('home');
				}
				this.islogin = false;
				// this.login = true;
			}


			that.$on('title', (title) => {
				document.title = title;
				that.barTitle = title;
			});

			that.$on('loading', (loading) => {
				if(!loading.name){
					loading.name = 'tip';
				}
				if(!loading.icon){
					loading.icon = false;
				}
				for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(!item || !item.show){
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.loadingdata.loadings.push(loading);
				that.isLoading = that.loadingdata.loadings.length>0;
			});
			that.$on('cancelloading', (name) => {
				for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(item && item.name && item.name == name){
						item.show = false;
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.isLoading = that.loadingdata.loadings.length>0;
				if(!that.isLoading){
					document.querySelector('.app-view').classList.remove('open');
				}

			});

			that.$on('login', (parameter) => {
				if(window.location.href.indexOf('/home') < 0){
					// router.go('home');
				}
				this.islogin = false;
				this.login = true;

			});

			that.$on('handle_server_error', (parameter) => {
				if (parameter.resCode=="10003") {
					that.$dispatch('login', window.location.search);
				}else{
					if(SSD_DEBUG){
						var msg = "";
						if(parameter.resMsg){
							msg = parameter.resMsg;
						}
						that.$dispatch('loading', {text: msg, icon: false, show: true, duration: 2000});
					}
				}
			});
			that.$on('loginok', (parameter) => {
				this.islogin = true;
				var haspass = this.gameLevel==1;
				if(haspass) {
                    this.saveUserH5Info();
                }
				if(getCookie('cn.easier.wmpo.tone.user') != null){
					this.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
					this.vipInfo.productId = this.cookieVip;
					if(this.$root.vipInfo.productId =='0000001625' || this.$root.vipInfo.productId =='0000001622' ){
						this.nums = 1;
					}
					else if(this.$root.vipInfo.productId =='0000001620' || this.$root.vipInfo.productId =='0000001623'){
						this.nums = 6;

					}
				}
				if(getCookie('cn.easier.wmpo.tone.accesstoken') != null){
					this.accesstoken = getCookie('cn.easier.wmpo.tone.accesstoken');
					console.log('token'+this.accesstoken);
				}
				if(!haspass && this.loginokcallback){
					this.loginokcallback();
					this.loginokcallback = false;
				}
				//哈哈哈⤵️
				if(this.islogin == true) {
                    var body = {
                        accessToken: this.accesstoken,
                    };
                    sapi.findUserBasInfo(this, body, (back) => {
                        if(back.resCode == 10001){
                        this.on = true;
                    }
                })
                }
            	//哈哈哈⤴️

			});

			var path = this.$route.path;
			this.musicData.showMusic = true;
		 
		},

		watch: {
		},
		methods: {
			addOperLog() {
				sapi.addOperLog(this, {
					'aid':aid,
					'type':'signin',
					'source':source
				}, (back) => {})
			},
			saveUserH5Info(){
				var that = this;
				that.$dispatch('loading', {name:'app_save', icon: true, text: '数据保存中...', show: true, duration: 20*1000});
				sapi.saveUserH5Info(that, {types: '拼歌单达人',scoreorg:that.gameLevel}, (back)=>{
					that.gameLevel = -1;
					that.$dispatch('cancelloading', 'app_save');
					if(back.resCode == "0"){
//						router.go({path: '/marquee'});
                        that.login = false;
                        that.gameLevel=0;
					}else{
						that.$dispatch('handle_server_error', back);
					}
                if(that.loginokcallback){
                    that.loginokcallback();
                    that.loginokcallback = false;
                }
				})
			},
			checktokentest(){
				var that = this;
				sapi.quePrizeDrawResult(this, {}, (back) => {
				 	if(back.resCode == "10003"){
						that.islogin = true;
				    }
				});
			},
			getCookie(name){
				var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
				if(arr=document.cookie.match(reg))
				return unescape(arr[2]);
				else
				return null;
			}



		}
	}

	function getCookie(name)
	{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
	}
	

	function checkLogin() {
		var login = false;
		if (document.cookie.indexOf('cn.easier.wmpo.user') < 0) {
			// location.href = basePath + 'login.jsp'+window.location.search;
		}
		else {
			login = true;
		}

		return login;
	}
</script>

<style lang="sass">
	@keyframes roll{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}
	.music-warp{
		position: absolute;
		right: 60px;
		top: 55px;
		font-size: 0;
		animation: roll 5s linear infinite;
		z-index: 100;
	}
</style>