<template>
	<div class="app-view view-prizes" :style="{'background-image':activityConfig.common.bgUrl?'url('+activityConfig.common.bgUrl+')':1,'background-color':activityConfig.common.bg}">
		<div class="content padding">
			<div class="prize-title">
				<p>我的奖品</p>
			</div>
			<div class="rows cashed" v-for="list in lists" :class="{'cashed':list.state==1,'cash':list.state==0}">
				<p  class="prize-name">奖品名：<span>{{list.pname}}</span></p>
				<p>兑奖码：<span>{{list.sid}}</span></p>
				<p>兑奖时间：<span>{{list.startenabled.substr(0,10)}}</span>至<span>{{list.endenabled.substr(0,10)}}</span></p>
			</div>
			<p v-if="noList" class="null-text">你还没有奖品哟！</p>
		</div>
</template>
<style lang="scss">
	@import "./my-prize-list.scss"
</style>
<script>
	import sapi from '../../service'
	export default {
		components: {
		},
		data(){
			var activityConfig = window.store.activityConfig;
			return {
				lists:'',
				noList: false,
				activityConfig
			}
		},
		ready(){
			this.getLuckyUserPrizeInfo();
		},
		methods:{
			getLuckyUserPrizeInfo(){
				var that = this;
                var body={};
                sapi.getLuckyUserPrizeInfo(that, body, (back)=> {
					if(back.resCode=="0") {
						if(typeof back.repBody.list == 'undefined'){
        					that.noList = true;
        				}else{
        					that.lists = back.repBody.list;
        				}
					}
					else{
						that.$dispatch('handleServerBack', back);
					}
				});
			}
        }
	}
</script>
