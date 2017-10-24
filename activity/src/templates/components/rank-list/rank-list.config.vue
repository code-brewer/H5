<template>
	<div class="wap-rank-list">
		<div class="tab-head">
			<div class="scroller">
				<ul>
					<li v-for="item in dates"> 
						<p name="datesitem" :style="{'color':common.secondColor?common.secondColor:''}">{{item.name}}</p>
					</li>
				</ul>
			</div>
			<span class="total" :class="{active:checked}"  :style="{'color':common.secondColor}">{{totalRank.name}}</span>
		</div>
		<div class="sorts">
			<div class="scroll">
				<div class="sortitem" v-for="list in sortsList">
					<img class="sorticon" :src="list.head_img" alt="" / style="vertical-align: top;">
					<div class="sortnick-panel">
						<div class="sortnick">
							<p :style="{'color':common.secondColor}">{{list.nick==null?'神秘人':list.nick}}</p>
							<p class="score-c" :style="{'color':common.secondColor}">{{list.score}}分</p>
						</div>
						<p class="sortrank"  :style="{'color':common.secondColor}">第<span>{{list.rn}}</span>名</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.wap-rank-list {
		.tab-head {
			.scroller {
				overflow: hidden!important;
				position: relative;
			}
		}
		.sorts {
			overflow: hidden!important;
			position: relative;
		}
	}
</style>
<script>
	export default {
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				

				sortsList: [{
					head_img: '',
					nick: 'XXX',
					score: 10,
					rn: 1
				}, {
					head_img: '',
					nick: 'XXX',
					score: 10,
					rn: 2
				}, {
					head_img: '',
					nick: 'XXX',
					score: 10,
					rn: 3
				}],
				dates: [
					{
						name: window.store.configData.starttime.substr(5,5),
					},{
						name: window.store.configData.endtime.substr(5,5),
					}
				],
				totalRank: {
					'stime': '',
					'etime': '',
					'name': '总排名',
					'classs': {
						'unselectdate': false
					}
				}
			}
		},

	}
</script>