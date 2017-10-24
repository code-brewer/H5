<template>
	<div class="app-view view-activity" style="overflow: hidden;
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;      
    height: 100%;">
		

		<number-of-draws :from-state.sync="gameState"></number-of-draws>
		<activity-box></activity-box> 

		<turntable :state.sync="gameState" :prizes="prizeList" :pid="currPrize.pid"></turntable>

		<winning-list></winning-list>
	</div>
</template>

<script>
	import timer from '../../../components/timer/timer'
	import turntable from '../../../components/turntable/turntable'
	import numberOfDraws from '../../../components/number-of-draws/number-of-draws'
	import winningList from '../../../components/winning-list/winning-list'

	import {router} from '../app'
	import api from '../../../service'

	export default {
		components: {
			timer,
			turntable,
			numberOfDraws,
			winningList,
			'activity-box': require('../../../components/activity-box/activity-box')
		},
		data(){
			var activityConfig = window.store.activityConfig

			return {
				activityConfig,

				gameState: '',

				prizeList: [],

				currPrize: {
					pid: null
				},

				haveChance: true
			}
		},

		created() {
			// 获取奖项列表
			api.getPrizeListByAid(this, {}, function(back) {
				if(back.resCode=='00000') {
					this.prizeList = back.repBody;
				}
			}.bind(this))
		},
		watch: {
			gameState(val) {
				console.log(val)
				if(val=='started') {
					// 抽奖
					api.doLucky(this, {}, function(back) {
						if(back.resCode=='00000') {
							var prizeInfo = back.repBody[0]
							this.currPrize = back.repBody[0];
							
						}
						else {
							this.currPid = '39';
						}
					}.bind(this))
				}
				if(val=='end') {
					if(this.currPrize.pid) {
						this.$dispatch('loading', {text: '恭喜抽到了'+this.currPrize.pooltitle, icon: false, duration: 1500, name: 'getprize'});
						setTimeout(function() {
							router.go({name: 'receive', params: {g: this.currPrize.gid, n: this.currPrize.pname}})
						}.bind(this), 2000)
						
					}
					else {
						this.$dispatch('loading', {text: '没抽中，继续努力吧', icon: false, duration: 1500, name: 'getprize'});
					}
					
				}
			}
			
		},

		methods: {
			

		}
	}
</script>