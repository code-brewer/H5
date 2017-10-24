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
		<login :login-show.sync="login" v-ref:login></login>
		<success :success-show.sync="success" :tipdef="tipdef"></success>
		<openvip :openvip-show.sync="openvip" :tipdef="tipdef"></openvip>
		<vipsure :vipsure-show.sync="vipsure" :tipdef="tipdef"></vipsure>
		<vipsuccess :vipsuccess-show.sync="vipsuccess" :tipdef="tipdef" v-ref:openvip></vipsuccess>
		<vipfail :vipfail-show.sync="vipfail" :tipdef="tipdef"></vipfail>
		<vipbenefit :vipbenefit-show.sync="vipbenefit" :tipdef="tipdef"></vipbenefit>
		<buytone :buytone-show.sync="buytone" :tipdef="tipdef"></buytone>
		<buytone-success :buytone-success-show.sync="buytoneSuccess" :tipdef="tipdef"></buytone-success>
		<address :show-address.sync="showAddress"></address>
		<alreadyprize :alreadyprize-show.sync="alreadyprize" :tipdef="tipdef"></alreadyprize>
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
	import api from './utils/serverapi.js'
	import success from './components/success.vue'
	import openvip from './components/openvip.vue'
	import vipsure from './components/vipsure.vue'
	import vipsuccess from './components/vipsuccess.vue'
	import vipfail from './components/vipfail.vue'
	import vipbenefit from './components/vipBenefit.vue'
	import buytone from './components/buytone.vue'
	import buytoneSuccess from './components/buytoneSuccess.vue'
	import alreadyprize from './components/alreadyprize.vue'
	alreadyprize
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
			vipfail,
			vipbenefit,
			buytone,
			buytoneSuccess,
			alreadyprize,
			address: require('./receive-address.vue'),
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
				vipfail:false,  // 
				vipbenefit: false,//会员权益
				buytone:false, //购买铃音盒
				buytoneSuccess:false,
				alreadyprize:false,
				showAddress:false,       
				fmappurl:"http://fm.10155.com/s/acc/1/1",
				womusichomeurl:"http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=ff80808156576253015658cd9ba20484",
				songlisturl:"http://www.10155.com",
				wxlisten:{},
				musicData: {
					musicBg: 'o/images/music.png',
					showMusic: false,
					status: 'play'
				},
				activityinfostr:{
					levels:[{"square":3,"title":"九宫格","isEdit":false,"time":{"mins":0,"secounds":30},"score":15},{"square":4,"title":"十六宫格","isEdit":false,"time":{"mins":0,"secounds":30},"score":15}],
				},
				cookieVip:'',
				accesstoken:'',
				vipInfo:{
					mobile:'',
					verifyCode:'',
					productId:'',
					aid:aid,
				},
				nums:0,
				loginokcallback:false,
				whereLogin:'',
				checkVip:false,
			}
		},
		ready() {
			this.addOperLog();
			this.netLoginForH5();
			var that = this;
			wxback = function(){
				if(!that.islogin)return;
				// api.addShareLog(that,{"types":"0"},(back)=>{
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
				if(this.gameLevel>=0){
					this.saveUserH5Info();
				}
            	if(getCookie('cn.easier.wmpo.tone.user') != null){
					this.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
					this.vipInfo.productId = this.cookieVip;
					
				}
				if(getCookie('cn.easier.wmpo.tone.accesstoken') != null){
					this.accesstoken = getCookie('cn.easier.wmpo.tone.accesstoken');
					console.log('token'+this.accesstoken);
				}
				if(this.loginokcallback){
					this.loginokcallback();
					this.loginokcallback = false;

				}

				
			});

			var path = this.$route.path;
			this.musicData.showMusic = true;
		 
		},

		watch: {
			checkVip(val){
				this.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
				
			}
		},
		methods: {
			addOperLog() {
				api.addOperLog(this, {
					'aid':aid,
					'type':'signin',
					'source':source
				}, (back) => {})
			},
			saveUserH5Info(){
				var that = this;
				that.$dispatch('loading', {name:'app_save', icon: true, text: '数据保存中...', show: true, duration: 20*1000});
				api.saveUserH5Info(that, {types: '拼歌单达人',scoreorg:that.gameLevel}, (back)=>{
					that.gameLevel = -1;
					that.$dispatch('cancelloading', 'app_save');
					if(back.resCode == "0"){
						// router.go({path: '/marquee'});
					}else{
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			checktokentest(){
				var that = this;
				api.quePrizeDrawResult(this, {}, (back) => {
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
			},
			netLoginForH5(){
				var that = this;
				api.netLoginForH5(that,{},(back)=>{
					if(back.resCode == '0'){
						that.$root.vipInfo.mobile = back.repBody.mobile;
						sessionStorage.setItem('LoginMobile',back.repBody.mobile);
						
					}
				})
				
				
			},



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
		right: 38px;
		top: 20px;
		font-size: 0;
		animation: roll 5s linear infinite;
		z-index: 9;
	}
</style>