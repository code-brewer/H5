<template>
	<div class="app-view" id="edit-page" style="padding-bottom:50px;">
		<p class="edit_title">活动列表信息</p>
		<!-- <div class="reg-input-row-wrap">
			<span class="reg-input-name">活动名称</span>
			<select class="category_input" v-model="category" @change="cchange()">
				<option v-for="citem in categorys" :value="citem.id">{{citem.name}}</option>
			</select>
			<select class="activity_input" v-model="activity" @change="achange()">
				<option v-for="aitem in activitys" :value="aitem.id">{{aitem.name}}</option>
			</select>
		</div> -->
		<div class="reg-input-row-wrap" v-if="isAdd">
			<span class="reg-input-name">组团名称</span>
			<select class="edit_input_content" v-model="adata.group_id">
				<option v-for="gitem in groups" :value="gitem.id">{{gitem.name}}</option>
			</select>
		</div>
		<div class="reg-input-row-wrap" >
			<span class="reg-input-name">投票名称</span>
			<input class="edit_input_content" type="text" v-model="adata.name" />
		</div>
		<div class="reg-input-row-wrap">
			<span class="reg-input-name">开始时间</span>
			<input class="edit_input_content" type="date" v-model="adata.starttime" :disabled="!isAdd" />
		</div>
		<div class="reg-input-row-wrap">
			<span class="reg-input-name">截止时间</span>
			<input class="edit_input_content" type="date" v-model="adata.endtime" :disabled="!isAdd" />
		</div>
		<div class="reg-input-row-wrap" >
			<span class="reg-input-name">参与对象</span>
			<input class="edit_input_content" type="radio" name="jointype" v-model="adata.target" value="1" /><span class="selecttext">已参团客户</span>
			<input class="edit_input_content" type="radio" name="jointype" v-model="adata.target" value="2" /><span class="selecttext">全部客户</span>
		</div>
		<div class="reg-input-row-wrap" style="height: 300px;line-height: 300px;">
			<span class="reg-input-name">活动规则</span>
			<textarea class="edit_input_content" style="height: 296px;" v-model="adata.rule" ></textarea>
		</div>
		<div class="reg-input-row-wrap" >
			<span class="reg-input-name">H5模板</span>
			<input class="edit_input_content" type="radio" name="h5type" v-model="adata.backgroup_url" value="1" /><span class="selecttext">背景1</span>
			<input class="edit_input_content" type="radio" name="h5type" v-model="adata.backgroup_url" value="2" /><span class="selecttext">背景2</span>
		</div>
		<div class="reg-input-row-wrap" style="height: auto;" >
			<span class="reg-input-name"></span>
			<div class="edit_input_content" style="width: 37%;display: inline-block;vertical-align: middle;height: auto;"><img :src="$root.basePath+'src/guide/images/mb1.jpg'" alt=""></div>
			<img :src="$root.basePath+'src/guide/images/mb2.jpg'" alt="" style="vertical-align: middle;" >
		</div>
		<div class="reg-input-row-wrap" >
			<span class="reg-input-name" style="width: 40%;">相片同步至晒单：</span>
		</div>
		<div class="reg-input-row-wrap" style="height: 40px;line-height: 40px;margin-top: -20px;" >
			<span class="reg-input-name"></span>
			<input class="edit_input_content" type="radio" name="sync" v-model="adata.isshow" value="1" :disabled="!isAdd" /><span class="selecttext">是</span>
			<input class="edit_input_content" type="radio" name="sync" v-model="adata.isshow" value="0" :disabled="!isAdd" /><span class="selecttext">否</span>
		</div>
		<p style="color: #ed6c00;font-size: 22px;padding: 20px 60px;">相片同步时间是活动截止时间的第二天12：00自动同步。同步依据为投票前5名的相片</p>
		<div id="reg-save-btn" @click="save()">{{isAdd?'创建完成':'保存修改'}}</div>
	</div>
</template>

<style lang="scss" scoped>
 div.app-view{
	
}
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		components:{
		},
	 	data(){
	 		return{
	 			isAdd:true,
	 			categorys:[],
	 			activitys:[],
	 			groups:[],
	 			category:"",
	 			activity:"",
	 			adata:{
	 				id:"",
	 				group_id:"",
	 				name:"",
	 				starttime:"",
	 				endtime:"",
	 				target:"1",
	 				rule:"",
	 				backgroup_url:"1",
	 				isshow:"1"
	 			}
	 			
	 		}
	 	},
	 	ready() {
	 		if(!this.$root.islogin){
	 			router.go('home');
	 			return;
	 		}
	 		if(!this.$root.isGuide){
	 			this.$root.preventModal = true;
	 			return;
	 		}
	 		var voteinfostr = sessionStorage.getItem("voteinfo");
	 		if(voteinfostr && voteinfostr.length>0){
	 			var voteinfo = JSON.parse(voteinfostr);
	 			this.isAdd = false;
	 			this.adata.id = voteinfo.id;
	 			this.adata.group_id = voteinfo.group_id;
	 			this.adata.name = voteinfo.name;
	 			this.adata.target = voteinfo.target;
	 			this.adata.rule = voteinfo.rule;
	 			this.adata.backgroup_url = voteinfo.backgroup_url;
	 			this.adata.isshow = voteinfo.isshow;
	 			this.adata.starttime = voteinfo.starttime;
	 			this.adata.endtime = voteinfo.endtime;
	 		}else{
	 			this.getGroup();
	 		}
	 		// this.$dispatch("title", 'test')
		},
	 	methods:{
	 		getCategory(){
	 			var that = this;
	 			that.$dispatch('loading', {name:'getCategory', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.getCategory(this,"",(back)=>{
	 				that.$dispatch('cancelloading', 'getCategory');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					this.categorys = back.data;
	 				}
	 			});
	 		},
	 		getActivity(id){
	 			var that = this;
	 			that.$dispatch('loading', {name:'getActivity', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.getActivity(this,"?id="+id,(back)=>{
	 				that.$dispatch('cancelloading', 'getActivity');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					this.activitys = back.data;
	 				}
	 			});
	 		},
	 		getGroup(){
	 			var that = this;
	 			that.$dispatch('loading', {name:'getGroup', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 			sapi.getGroup(this,"",(back)=>{
	 				that.$dispatch('cancelloading', 'getGroup');
	 				if(back.code!='0'){
	 					that.$dispatch('handle_server_error', back);
	 				}
	 				else{
	 					this.groups = back.data;
	 				}
	 			});
	 		},
	 		cchange(){
	 			this.activitys = [];
	 			this.activity = "";
	 			this.groups = [];
	 			this.group_id = "";
	 			this.getActivity(this.category);
	 		},
	 		achange(){
	 			this.groups = [];
	 			this.group_id = "";
	 			this.getGroup(this.activity);
	 		},
	 		checkInput(){
	 			var ret = "";
	 			if(this.adata.group_id.length<1){
	 				ret = "请选择一个组团名称";
	 			}else if(this.adata.name.length<1){
	 				ret = "请输入投票活动名称";
	 			}else if(this.adata.starttime.length<4){
	 				ret = "请输入开始时间";
	 			}else if(this.adata.endtime.length<4){
	 				ret = "请输入截止时间";
	 			}else {
	 				if(this.adata.rule.length<1){
		 				ret = "请输入规则";
		 			}
	 			}

	 			return ret;
	 			
	 			
	 		},
	 		save(){
	 			var that=this;

	 			var tip = this.checkInput();

	 			if(that.adata.starttime > new Date()){
	 				
	 				that.$dispatch('loading', {text: '开始时间应大于当前时间' , show: true, duration: 2000}); 
	 				return;
	 			}

	 			if(that.adata.starttime > that.adata.endtime){
	 				
	 				that.$dispatch('loading', {text: '截止时间应大于开始时间' , show: true, duration: 2000}); 
	 				return;
	 			}

	 			if(tip.length>0){
	 				that.$dispatch('loading', {text: tip , show: true, duration: 2000}); 
	 			}else{
	 				that.$dispatch('loading', {name:'saveVote', icon: true, text: '请稍候...', show: true, duration: 20*1000});
	 				sapi.saveVote(this, that.adata, (back) => {
	 					that.$dispatch('cancelloading', 'saveVote');
	 					if(back.code!='0'){
	 						that.$dispatch('handle_server_error', back);
	 					}
	 					else{
	 						that.$dispatch('loading', {text: '保存成功！', show: true, duration: 2000});
	 						router.go('activityMag');
	 					}
	 				});
	 			}
	 		}
	 	}
	}
</script>