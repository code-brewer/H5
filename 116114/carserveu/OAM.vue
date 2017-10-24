<template>
	<div class="app-view" id="oam-page">
		<Banner></Banner>
		<div id="oam-phone">手机号码：{{phone}}</div>
		<div id="oam-input-wrap">
			<p>选填项</p>
			<p>完善选填项信息，将帮助我们更好为您服务</p>
			<div class="oam-input-row-wrap">
				<span class="oam-input-name">驾驶证号：</span>
				<input class="oam-input-text" type="text" style="" v-model="oamdata.idcard" placeholder="请输入驾驶证号" />
			</div>
			<div class="oam-input-row-wrap">
				<span class="oam-input-name">档案编号：</span>
				<input class="oam-input-text" type="text" style="" v-model="oamdata.driveidcard" placeholder="请输入驾驶证档案编号" />
			</div>
		</div>
		<Agreement :confirm.sync="confirm"></Agreement>
		<div id="oam-save-btn" @click="save()">开通</div>
		<p id="oam-tip">注：该服务将收取2元/月费用。开启提醒后，如违章信息有更新，我们会以短信的方式发送到您的手机，请您注意查收。</p>
		<modal :show.sync="codeModal" :box="false" :backdrop="false" :bg="false">
			<div class="modal-body" id="code-modal">
				<p style="font-size: 30px;text-align: center;line-height: 80px;">确定开通此服务？</p>
				<div class="oam-input-row-wrap">
					<input class="oam-input-text" type="text" style="" v-model="oamdata.code" placeholder="验证码" />
					<Code-btn :phone="phone" id="oam-code-btn"></Code-btn>
				</div>
				<div id="oam-btn-div" >
					<a id="oam-code-cancel" @click="codeModal=false;">取消</a>
					<a id="oam-code-sure" @click="openaccount()">确定</a>
				</div>
			</div>
		</modal>
	</div>
</template>

<style lang="scss">
@import './css/design2develop.scss';
#oam-code-btn{
	width: des2devrem(186px);
	height: des2devrem(68px);
	line-height: des2devrem(68px);
	color: #000;
	background-color: #fff;
	font-size: des2devrem(28px);
	text-align: center;
	display: inline-block;
	margin-left: 6px;
	border-radius: 10px;
	border: 1px solid #929292;
}
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	import Banner from './components/Banner.vue'
	import Agreement from './components/Agreement.vue'
	import Modal from './components/Modal.vue'
	import CodeBtn from './components/CodeBtn.vue'
	export default {
		components:{
			Banner,
			Modal,
			Agreement,
			CodeBtn
		},
	 	data(){
	 		return{
	 			oamdata:{code:"",idcard:"",driveidcard:""},
	 			confirm:true,
	 			codeModal:false,
	 			phone:""
	 		}
	 	},
	 	ready() {
	 		if(!this.$root.islogin){
	 			router.go('register');
	 			return;
	 		}
	 		this.phone = sessionStorage.getItem("phone");
	 		// if(phone && phone.length>0){
	 		// }else{
	 		// }

	 		// this.phone = "15018724935";
		},
	 	methods:{
	 		checkInput(){
	 			var ret = "";
	 			if(this.oamdata.idcard.length<1){
	 				ret = "请输入正确的车牌号码";
	 			}else if(this.oamdata.driveidcard.length<1){
	 				ret = "请输入正确的车身架号";
	 			}
	 			return ret;
	 		},
	 		save(){
	 			this.codeModal = true;
	 		},
	 		openaccount(){
	 			var that = this;
	 			if(this.oamdata.code.length<1){
	 				that.$dispatch('loading', {text: "请输入验证码" , show: true, duration: 2000}); 
	 			}else{
	 				that.$dispatch('loading', {name:'oam_account', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 				sapi.account(this, that.oamdata, (back) => {
	 					that.$dispatch('cancelloading', 'oam_account');
	 					if(back.resCode!='0'){
	 						that.$dispatch('handle_server_error', back);
	 					}
	 					else{
	 						that.$dispatch('loading', {text: '开通成功！', show: true, duration: 2000});
	 						router.go('home');
	 					}
	 				});
	 			}
	 		}
	 	}
	}
</script>