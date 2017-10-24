<template>
	<div class="wap-number-of-draws">
		<p :style="{'color':common.secondColor}" v-show="isLimit">今天可抽奖次数： <span :style="{'color':common.mainColor}">{{times}}</span> 次</p>
	</div>
</template>
<script>
	import api from '../../service'
	export default {
		props: {
			fromState: {
				type: String
			}
		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				times: 0,
				isLimit: true
			}


		},
		watch: {
			fromState(val) {
				if(val=='started') {
					if(this.isLimit) {
						this.times--;
					}
				}
				// 如果抽奖次数为0 阻止抽奖
				else if(val=='end') {
					if(this.times==0&&this.isLimit) {
						this.fromState = 'disabled'
					}
				}
			}
		},
		ready() {
			api.getActUserTimes(this, {}, (back) => {
				if(back.resCode=='00000') {
					
					// 不限次数
					if(back.repBody.islimit=='00000') {
						this.isLimit = false
					}
					else {
						if(back.repBody.times==0) {
							this.fromState = 'disabled'
						}
						this.times = back.repBody.times;
					}
				}
			})
		}
	}
</script>