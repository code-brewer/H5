<template>
	<div class="app-view view-receive view-home"
		:style="{'background-image': (activityConfig.receive.bgUrl!='' ? 'url('+activityConfig.receive.bgUrl+')' : 1)}">
		<logo v-show="activityConfig.logo.show"></logo>
		<receive-title></receive-title>
		<p class="view-receive-tips">请填写姓名和电话，方便工作人员联系</p>
		<!-- <img src="./images/tips.png" alt="" class="view-receive__tips"> -->
		<div class="view-receive__content padding">
			<div class="phone-wrap">
				<input type="text" 
					class="input-phone" 
					autocomplete="off" 
					v-model="username" 
					placeholder="请输入姓名"
					@focus="inputusername" />
				<input type="text" 
					class="input-phone" 
					autocomplete="off"  
					v-model="mobile" 
					placeholder="请输入手机号码"
					@focus="inputmobiletip" />
			</div>
			<p class="awardtip">{{tiptext}}</p>
		</div>
		<confirm-btn :inputval="{'username': username, 'userphone': userphone}"
			:submitcb="award"></confirm-btn>
	</div>
</template>
<script>
	import Url from '../../utils/url.js'
	import Statistics from '../../../templates/layouts/song/statistics.js'
	import sapi from '../../service'
	import logo from '../../components/logo/logo'
	import receiveTitle from './components/receive-title/receive-title.vue'
	import confirmBtn from './components/confirm-button/confirm-btn.vue'
	export default {
		components: {
			logo,
			receiveTitle,
			confirmBtn
		},
		ready() {
			Statistics.getprizePage(); // 领奖页pv/uv
			this.luckyGetUserPrizeInfo();
		},
		data(){
			let activityConfig = window.store.activityConfig
			let common = activityConfig.common
			return {
				common,
				activityConfig,
				username: '',
				mobile: '',
				tiptext:''

			}
		},
		watch:{
			'common.btnStyle'(v){
				console.log(v)
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		methods:{
			inputmobiletip(){
				if(this.mobile == '输入手机号'){
					this.mobile = '';
				}
				this.tiptext = "";
			},
			inputusername(){
				if(this.username == '请输入姓名'){
					this.username = '';
				}
				this.tiptext = "";
			},
			award(){
				if(this.username.length == 0 || this.username == '请输入姓名'){
					this.tiptext = "请输入姓名!";
					return;
				}
				if(this.mobile.length != 11 || !(/^\d+$/.test(this.mobile))){
					this.tiptext = "请输入正确的手机号码!";
					return;
				}
				this.tiptext = "";
				Statistics.receiveSubmit() // 统计领奖提交
				this.bindPrizeMobile(this.$route.params.gid,this.mobile,this.username);
			},
			bindPrizeMobile(id, mobile,username){
				var that = this;
				var body={id: id, username: username, mobile: mobile};
                that.$dispatch('loading', {name:'award_bindPrizeMobile', text: '加载中...', show: true, duration: 10*1000});
                sapi.newBindPrizeMobile(that, body, (back)=> {
                	that.$dispatch('cancelloading', 'award_bindPrizeMobile');
					if(back.resCode=="0") {
						that.$route.router.go({name: 'prize'});
					}
					else{
						that.$dispatch('handleServerBack', back);
					}
				});
			},
			luckyGetUserPrizeInfo(){
				var that = this;
				that.$dispatch('loading', {name:'luckyGetUserPrizeInfo', text: '加载中...', show: true, duration: 10*1000});
                sapi.luckyGetUserPrizeInfo(that, {gid: that.$route.params.gid}, (back)=> {
                	that.$dispatch('cancelloading', 'luckyGetUserPrizeInfo');
					if(back.repBody[0].mobile){
						this.mobile = back.repBody[0].mobile;
					}
					if(back.repBody[0].username){
						this.username = back.repBody[0].username;
					}
				});
			}
        }
	}
</script>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	@import './common.scss';
</style>