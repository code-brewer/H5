<template>
	<div class="app-view" id="home-page" v-el:sdiv>
		<div class="main-content">
			<a @click="createActivity()" class="home_btn create_btn">创建活动</a>
			<a v-link="{path:'activityMag'}" class="home_btn mgr_btn">活动管理</a>
		</div>
	</div>
</template>

<style lang="scss">
	.graycolor{
		color:#bbb !important;
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
	 			maxcount:3,
	 			carindex:0,
	 			cars:[],
	 			records:[],
	 			illegalCount:0,
	 			fineM:0,
	 			fineS:0,
	 			delModal:false,
	 			isaccount:true
	 		}
	 	},
	 	computed: {
	 	},
	 	ready() {
	 		if(!this.$root.islogin){
	 			this.$root.login = true;
	 			return;
	 		}
	 		if(!this.$root.isGuide){
	 			this.$root.preventModal = true;
	 			return;
	 		}
		},
	 	methods:{
	 		createActivity(){
	 			sessionStorage.setItem("voteinfo","");
	 			router.go('edit');
	 		}
	 	}
	}
</script>