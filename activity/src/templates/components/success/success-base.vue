<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="game-result">
			<p class="msg" :style="{'color':common.secondColor}">恭喜!</p>
			<p class="success" :style="{'color':common.mainColor}">挑战成功</p>
			<p class="wap-get-score" :style="{'color':common.secondColor}">您的成绩为 : <span :style="{'color':common.mainColor}">{{score}}</span>分</p>
			<p class="wap-get-score">&nbsp;</p>
			<div class="wap-btns">
				<a class="wap-button" v-if="type==0"  :style="btnStyle"  @click="goBindPrize" :class="{'disabled':!prize}">去领奖</a>
				<a v-link="{path: '/activity'}" v-if="type==0"  class="wap-button" :style="btnStyle">再玩一次</a>
				<a class="wap-button" v-if="type==1" :style="btnStyle"  @click="goRank">查看排行</a>
				<a v-link="{path: '/activity'}" v-if="type==1" class="wap-button" :style="btnStyle">继续闯关</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../game-result/game-result.scss';
</style>
<script>
	import sapi from '../../service'

	export default {
		data() {
				var common = window.store.activityConfig.common,
				 configData = window.store.configData;
				return {
					common,
					type: 0, //0：成功领奖（没有总排行）1:每日排行
					score: 5,
					count: 15,
					prize: false,
					gid: "0", //奖品id，0表示没有奖品
					pname: "谢谢参与，继续努力哦。", //奖品名称
					configData,
				}
			},
			computed: {
				btnStyle: function() {
					return this.$root.btnStyle;
				}
			},
			methods: {
				pubScoreGetPrizeInfo() {
					sapi.pubScoreGetPrizeInfo(this, {}, (back) => {
						if(back.resCode == '00000') {
							this.prize = true;
							this.gid = back.repBody[0].gid;
							this.pname = back.repBody[0].pname;
						} else {
							this.prize = false;
						}
					})
				},
				goBindPrize() {
					if(!this.prize) return;
					this.$root.$router.go({
						name: 'receive',
						params: {
							g: this.gid,
							n: this.pname
						}
					})
				},
				goRank(){
					// if(this.configData.isfollow.indexOf('see_rank') < 0){
						this.$root.$router.go({name:'rank'});
					// }else{
					// 	sapi.isFollow(this,{}, (back)=>{

					// 	})
					// }
					
				}

			},
			ready() {
				switch(this.type) {
					case 0:
						this.pubScoreGetPrizeInfo();
						break;
					case 1:

						break;
					case 2:

						break;
					case 3:

						break;
					case 4:

						break;
					case 5:
					default:
						break;
				}
			},
			created() {
				this.type = ~~this.$route.params.type;
				this.score = ~~this.$route.params.score;
			}
	}
</script>