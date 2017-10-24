<template>
	<modal :show.sync="show">
		<div class="signSuccess">
			<h2>签到成功</h2>
			<p>本月累计签到+1</p>
			<p class="modal-text left">{{{html}}}</p>
			<button :bg="'orange-bg'" v-if="isLottery"  @click="golottery">去抽奖</button>
			<button :bg="'orange-bg'" v-else @click="show = false">我知道了</button>
			
		</div>
	</modal>
</template>
<script>
	import modal from '../modal.vue'
	import button from '../button.vue'
	export default {
		components: {
			modal,
			button
		},
		props: {
			show: {
				default: false
			},
			options: {
				type: Object
			}
		},
		data() {
			return {
				html: '',
				isLottery: false
			}
		},
		watch: {
			'options.cnt'(val) {
				val = +val;
				let arr = [3, 7, 14, 21],
					index = '';
				/* 连续签到天数等于3，7，14，21任意一天即可抽奖 */
				if ((index = arr.indexOf(val)) > -1) {
					this.html = '你已达成连续签到<span class="orange">'+arr[index]+'</span>天了，快去抽奖吧！' + (index === 3 ? '' : '还需要连续签到<span class="orange">'+(arr[index+1]-val)+'</span>天才能抽取下一档奖品。');
					this.isLottery = true;
					
					// this.$dispatch('remove',arr[index])
				} else {
					let num = '';
					(num = 3 - val) > 0 || (num = 7 - val) > 0 || (num = 14 - val) > 0 || (num = 21 - val) > 0;
					this.html = '你已达成连续签到<span class="orange">'+val+'</span>天，还需连续签到<span class="orange">'+num+'</span>天才能抽奖！';
					this.isLottery = false;
				}


					
				
			}
		},
		methods:{
			golottery(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"golottery","usid":"1"})
				this.$router.go({path: '/lottery'})
			}
		}
	}
</script>