<template>
	<div class="app-view view-prizes"
	     :style="{'background-image':activityConfig.prizeList.bgUrl?'url('+activityConfig.prizeList.bgUrl+')':1, 'background-size':'100% 100%'}">
		<div class="content padding">
			<!-- 我的奖品title -->
			<div class="my-prize-title" :style="{'background-image':(activityConfig.prizeList.titleImgUrl!=''?'url('+activityConfig.prizeList.titleImgUrl+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.prizeList.titleTmgH}">
			</div>

			<div class="rows" v-for="list in lists">
				<!-- 领奖状态 -->
				<div class="type" v-if="activityConfig.prizeList.typeShow">
					<p :class="{'cashed':list.state==1,'cash':list.state==0}">{{list.state==1?'已领奖':'未领奖'}}</p>
				</div>
				<p  class="prize-name">奖品名：<span>{{list.pname}}</span></p>
				<p>兑奖码：<span>{{list.sid}}</span></p>
				<p>兑奖时间：<span>{{list.startenabled.substr(0,10)}}</span>至<span>{{list.endenabled.substr(0,10)}}</span></p>
				<p>奖品信息：<span>{{list.des}}</span></p>
				<p>领奖备注：<span>{{list.prize_remarks}}</span></p>
			</div>
			<!-- 按钮 -->
			<div class="my-prize-btn" v-el:prizebtn :style="{'background-image':(activityConfig.prizeList.btnImgUrl!=''?'url('+activityConfig.prizeList.btnImgUrl+')':1), 'background-size':'100%'}" v-if="!noList" @click="goPrize">
			</div>
			<!-- 二维码 -->
			<div class="prize-title" v-if="!noList && activityConfig.qeCode.show">
				<img :src="activityConfig.qeCode.imgUrl ? activityConfig.qeCode.imgUrl : activityConfig.qeCode.defaultImgUrl" style="width: 120px;">
			</div>
			<!-- 没有奖品 -->
			<div v-if="noList" class="null-text">
				<div class="my-unprize-wrap">
					<div class="my-unprize" v-el:unprize :style="{'background-image':(activityConfig.prizeList.unprizeImgUrl!=''?'url('+activityConfig.prizeList.unprizeImgUrl+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.prizeList.unprizeImgH}">
					</div>
				</div>
			</div>
		</div>
</template>
<style lang="scss">
	@import "./my-prize-list.scss";
</style>
<script>
	import Statistics from '../../../templates/layouts/song/statistics.js'
	import sapi from '../../service'
	export default {
		components: {
		},
		data(){
			var activityConfig = window.store.activityConfig;
			return {
				lists:'',
				noList: false,
				activityConfig,
				
			}
		},
		watch: {
			noList(v){
				console.log(v)
			}
		},
		ready(){
			this.getLuckyUserPrizeInfo();
			// Statistics.myprizePage()
		},
		methods:{
			getLuckyUserPrizeInfo(){
				var that = this;
                var body={};
                sapi.getLuckyUserPrizeInfo(that, body, (back)=> {
					if(back.resCode=="0") {
						if(typeof(back.repBody.list) == 'object'){
							that.noList = false;
        					that.lists = back.repBody.list;
        					
        				}else{
        					that.noList = true;
        				}
					}
					else{
						that.$dispatch('handleServerBack', back);
					}
				});
			},
			goPrize(){
				Statistics.awardBtn() // 统计去领奖
				// this.$root.$router.go('receive');
				this.$route.router.go({name: 'receive', params: {gid: this.lists[0].gid}});
			}
        }
	}
</script>
