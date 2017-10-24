<template>
	<div class="wap-rule-text-new">
		<img src="http://157.255.23.23/images/fsd/ap/20170414/88_43daa992_bdef_4ecc_bdf2_91c8bf8bdb34.png" class="close-img close-icon" @click="close"/>
		<div class="wap-rule-con">
			<p>{{{store.activityConfig.ruleCon.value}}}</p>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				store: window.store,
				closeListener:null

			}
		},
		computed: {
			startDate() {
				return getDateString(this.store.configData.starttime)
			},
			endDate() {
				return getDateString(this.store.configData.endtime)
			},
		},
		ready() {
			if(window.store.configData.des)
				window.store.activityConfig.rule.content = window.store.configData.des;
		},
		methods:{
			//其他地方调此方法
			setCloseListener(listener){
				this.closeListener = listener;
			},
			close(){
				if(this.closeListener){
 					this.closeListener();
 				}
			}
		}
	}

	function getDateString(date) {
		var currDate = new Date(date)
		return currDate.getFullYear() + '年' + (currDate.getMonth() + 1) + '月' + currDate.getDate() + '日'
	}
</script>

<style  lang="scss" scoped>
	.wap-rule-text-new {
		line-height: 1.5rem;

	}
	
	.wap-rule-text-new ul {
		padding-left: 2.5rem;
	}
	.close-icon{
		top: -8px;
		right: -8px;
	}
</style>