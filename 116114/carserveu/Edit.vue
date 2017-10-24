<template>
	<div class="app-view" id="edit-page">
		<Banner></Banner>
		<div id="reg-input-wrap">
			<div class="reg-input-row-wrap" v-if="isAdd">
				<span class="reg-input-name">车牌类型：</span>
				<input class="reg-input-text" type="radio" name="type" style="width: 24px;height: 24px;" v-model="regdata.platetype" value="02" /><span style="vertical-align: middle;">小型汽车</span>
				<input class="reg-input-text" type="radio" name="type" style="width: 24px;height: 24px;" v-model="regdata.platetype" value="01" /><span style="vertical-align: middle;">大型汽车</span>
			</div>
			<div class="reg-input-row-wrap">
				<span class="reg-input-name">车牌号码：</span>
				<span style="width: 76px;display: inline-block;" id="reg-input-province" @click="showp()">{{regdata.plateplace}}</span>&nbsp;
				<input class="reg-input-text" type="text" style="width: 260px;" v-model="regdata.platenumber" placeholder="请输入车牌号码" maxlength="6" :disabled="!isAdd" />
			</div>
			<div class="reg-input-row-wrap">
				<span class="reg-input-name">车身架号：</span>
				<span class="reg-input-tip-icon" @click="showtip=true;">?</span>&nbsp;
				<input class="reg-input-text" type="text" style="" v-model="regdata.framenumber" placeholder="请输入车架号后6位" maxlength="6" />
			</div>
			<div class="reg-input-row-wrap">
				<span class="reg-input-name">发动机号：</span>
				<span class="reg-input-tip-icon" @click="showtip=true;">?</span>&nbsp;
				<input class="reg-input-text" type="text" style="" v-model="regdata.enginenumber" placeholder="请输入发动机号后4位" maxlength="4" />
			</div>
		</div>
		<Agreement :confirm.sync="confirm"></Agreement>
		<div id="reg-save-btn" @click="save()">保存</div>
		<div v-if="showtip" style="position: absolute;width:100%;height: 100%;top: 0;" @click="showtip=false;"></div>
		<img v-if="showtip" style="position: absolute;top: 200px;margin-left: 50%;left: -212px;" :src="$root.activityBasePath+'/images/demo.jpg'" @click="showtip=false;"></img>
		<div v-if="showprovinces" style="position: absolute;width:100%;height: 100%;bottom: 0;"></div>
		<div v-if="showprovinces" id="reg-provinces-wrap">
			<div class="reg-province" v-for="item in provinces" @click="setprovince(item)">{{item}}</div >
			<div id="reg-province-cancel" @click="showprovinces=false;">取消</div>
		</div>
	</div>
</template>

<style lang="scss">
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	import Banner from './components/Banner.vue'
	import Agreement from './components/Agreement.vue'
	export default {
		components:{
			Banner,
			Agreement
		},
	 	data(){
	 		return{
	 			isAdd:true,
	 			regdata:{platetype:"02",plateplace:"粤",platenumber:"",phone:"",framenumber:"",enginenumber:""},
	 			provinces:["京","粤","桂","沪","湘","鄂","豫","冀","苏","浙","川","贵","皖","鲁","辽","吉","闽","渝","宁","青","云","琼","陕","甘","黑","蒙","新","藏"],
	 			showprovinces:false,
	 			showtip:false,
	 			confirm:true
	 		}
	 	},
	 	ready() {
	 		if(!this.$root.islogin){
	 			router.go('register');
	 			return;
	 		}
	 		// window.sssddd = this;
	 		var carinfostr = sessionStorage.getItem("carinfo");
	 		if(carinfostr && carinfostr.length>0){
	 			this.regdata = JSON.parse(carinfostr);
	 			this.isAdd = false;
	 		}
		},
	 	methods:{
	 		showp(){
	 			if(!this.isAdd){
	 				this.$dispatch('loading', {text: '暂不支持修改车牌', show: true, duration: 2000});
	 				return;
	 			}
	 			this.showprovinces=true;
	 		},
	 		setprovince(province){
	 			this.regdata.plateplace=province;
	 			this.showprovinces=false;
	 		},
	 		checkInput(){
	 			var ret = "";
	 			if(this.regdata.platenumber.length<6){
	 				ret = "请输入正确的车牌号码";
	 			}else if(this.regdata.framenumber.length<6){
	 				ret = "请输入正确的车身架号";
	 			}else if(this.regdata.enginenumber.length<4){
	 				ret = "请输入正确的发动机号";
	 			}else if(!this.confirm){
	 				ret = "请阅读并同意授权协议";
	 			}
	 			return ret;
	 		},
	 		save(){
	 			var that=this;
	 			var tip = this.checkInput();
	 			if(tip.length>0){
	 				that.$dispatch('loading', {text: tip , show: true, duration: 2000}); 
	 			}else{
	 				that.$dispatch('loading', {name:'car_bind', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 				sapi.carSaveInf(this, that.regdata, (back) => {
	 					that.$dispatch('cancelloading', 'car_bind');
	 					if(back.resCode!='0'){
	 						that.$dispatch('handle_server_error', back);
	 					}
	 					else{
	 						that.$dispatch('loading', {text: '保存成功！', show: true, duration: 2000});
	 						that.$dispatch('loginok', back);
	 						router.go('home');
	 					}
	 				});
	 			}
	 		}
	 	}
	}
</script>