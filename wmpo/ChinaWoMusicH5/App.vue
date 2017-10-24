<template>
	<div class="app-views">
		<div v-show="musicData.showMusic" class="music-warp">
			<music :music-bg.sync="musicData.musicBg" :music-src.sync="musicSrc" :music-status.sync="musicData.status" v-ref:music></music>
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
		<!-- <activity-details :show.sync="showActivityD"></activity-details> -->
		<login :login-show.sync="login"></login>
		<!-- <success :success-show.sync="success" :tipdef="tipdef"></success> -->
		<div class="openvip"><openvip :openvip-show.sync="openvip" :tipdef="tipdef"></openvip></div>
		<vipsure :vipsure-show.sync="vipsure" :tipdef="tipdef"></vipsure>
		<vipsuccess :vipsuccess-show.sync="vipsuccess" :tipdef="tipdef"></vipsuccess>
		<vipfail :vipfail-show.sync="vipfail" :tipdef="tipdef"></vipfail>
		<highgou :highgou-show.sync="highgou" :tipdef="tipdef"></highgou>
		<coupon :coupon-show.sync="coupon" :tipdef="tipdef"></coupon>
	</div>
	
</template>

<script>
	import {router} from './index';
	import Loading from './components/Loading.vue'
	import urlUtil from './utils/url.js'
	import Modal from '../../src/components/Modal.vue'
	import login from './components/login.vue'
	// import activityDetails from './components/activityDetails.vue'
	import music from './components/music.vue'
	import sapi from './utils/serverapi.js'
	// import success from './components/success.vue'
	import openvip from './components/openvip.vue'
	import vipsure from './components/vipsure.vue'
	import vipsuccess from './components/vipsuccess.vue'
	import vipfail from './components/vipfail.vue'
	import highgou from './components/highGou.vue'
	import coupon from './components/coupon.vue'

	export default {
		components: {
			Loading,
			Modal,
			login,
			music,
			openvip,
			vipsure,
			vipsuccess,
			vipfail,
			highgou,
			coupon
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
				tipdef:false,
				openvip: false,//开通VIP
				vipsure: false,//确认开通VIP
				vipsuccess: false,//开通成功
				vipfail: false,    //开通失败  
                highgou: false,//订购铃声成功   
                coupon: false, //订购铃声    
				fmappurl:"http://fm.10155.com/s/acc/1/1",
				womusichomeurl:"http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=ff80808156576253015658cd9ba20484",
				songlisturl:"http://www.10155.com",
				wxlisten:{},
				musicData: {
					musicBg: 'H5/images/music.png',
					showMusic: false,
					status: 'play'
				},
				activityConfig:{
					levels:[{"square":2,"title":"四宫格","isEdit":false,"time":{"mins":0,"secounds":10},"score":5},{"square":3,"title":"九宫格","isEdit":false,"time":{"mins":2,"secounds":0},"score":15}],
					images:[activityBasePath+"/images/sp-img.jpg",activityBasePath+"/images/sp-img2.jpg",activityBasePath+"/images/sp-img3.jpg"],
					urls:["http://imusic.wo.com.cn/Club/portal/zwzt/00_4798_th.jsp?cid=004798","http://imusic.wo.com.cn/Club/portal/zwzt/00_4800_th.jsp?cid=004800","http://imusic.wo.com.cn/Club/portal/zwzt/00_4801_th.jsp?cid=004801&unikey=00000000575423a10157550f835d020b"]
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
				vipTest:'',
				vipDesc:'',
				loginokcallback:false,
				musicSrc:'p/images/music.mp3',
				isShowAnimate: false,
				buySong:'',
				buySongId:'',
				isBaseMusic:true,
				isSongRoll: false,
			}
		},
		ready() {
			this.addOperLog('signin');
			this.isShowAnimate = true;
			// this.netLoginForH5();
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
				sapi.addOperLog(this, {
					'aid':aid,
					'type':'share',
					'source':source
				}, (back) => {
					if(back){
						if(back.resCode==0 || back.resCode=="0"){
							if(that.wxlisten.that){
								that.wxlisten.shareupdate();
							}
						}else{
							that.$dispatch('handle_server_error', back);
						}
					}
				})
			};
			if(checkLogin()) {
				this.islogin = true;
				if(getCookie('cn.easier.wmpo.tone.user') != null){
					this.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
					this.vipInfo.productId = this.cookieVip;
					if(this.$root.vipInfo.productId =='0000002109'){
						this.nums = 1;
						this.vipTest = '沃音乐特惠会员1元，';
						this.vipDesc = '（炫铃功能费用5元/月，首月开通会员资费免费），';
					}
					else if(this.$root.vipInfo.productId =='0000001619'){
						this.nums = 6;
						this.vipTest = '沃音乐高级会员（首月免费），';
						this.vipDesc = '（含炫铃功能费用，首月开通免费），';
						

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
				if(getCookie('cn.easier.wmpo.tone.user') != null){
					this.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
					this.vipInfo.productId = this.cookieVip;
					this.islogin = true;
					if(this.$root.vipInfo.productId =='0000002109'){
						this.nums = 1;
						this.vipTest = '沃音乐特惠会员1元（首月免），';
						this.vipDesc = '（炫铃功能费用5元/月，首月开通会员资费免费），';
					}
					else if(this.$root.vipInfo.productId =='0000001619'){
						this.nums = 6;
						this.vipTest = '沃音乐高级会员（首月免费），';
						this.vipDesc = '（含炫铃功能费用，首月开通免费），';

					}

				}
				if(getCookie('cn.easier.wmpo.tone.accesstoken') != null){
					this.accesstoken = getCookie('cn.easier.wmpo.tone.accesstoken');
					console.log('token'+this.accesstoken);
				}
				if(this.cookieVip !='0000000000'){
					this.openvip = true;	
				}else{
					this.coupon = true;
				}
				// this.saveUserH5Info();
				

				// if(this.loginokcallback){
				// 	this.loginokcallback();
				// 	this.loginokcallback = false;
				// }

			});
			this.$on('addOperLog', (type, btnName) => {
				this.addOperLog(type, btnName);
			})

			var path = this.$route.path;
			this.musicData.showMusic = true;
			// this.$refs.music.sounddisable(false);
		 
		},

		watch: {
		},
		methods: {
			addOperLog(type, btnName) {
				sapi.addOperLog(this, {
					'aid':aid,
					'type': type,
					'button_name': btnName || '',
					'source':source
				}, (back) => {})
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
	
	.music-warp{
		position: absolute;
		right: 38px;
		top: 20px;
		font-size: 0;
		
		z-index: 20;
	}
	.openvip .modal.modal-transition .modal-dialog{
		margin: 50px auto !important;
	}
</style>