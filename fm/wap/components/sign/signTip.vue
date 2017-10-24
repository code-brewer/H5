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
				isLottery: false,
				luckday:[]
			}
		},
		watch: {
			'options.cnt'(val) {
				val = +val;
				// let arr = [3, 7, 14, 21],
				let arr = this.luckday,
					index = '';
				/* 连续签到天数等于3，7，14，21任意一天即可抽奖 */
				if ((index = arr.indexOf(val)) > -1 || this.options.max_cnt > 2) {
					let num = '',
						max_cnt = this.options.max_cnt;
						
					// num = (3 - max_cnt) > 0 ? 3 : (7 - max_cnt) > 0 ? 7 : (14 - max_cnt) > 0 ? 14 : (21 - max_cnt) > 0 ? 21 : '';
					num = (this.luckday[0] - max_cnt) > 0 ? this.luckday[0] : (this.luckday[1] - max_cnt) > 0 ? this.luckday[1] : (this.luckday[2] - max_cnt) > 0 ? this.luckday[2] : (this.luckday[3] - max_cnt) > 0 ? this.luckday[3] : '';
					this.html = '你已达成连续签到<span class="orange">'+max_cnt+'</span>天了，快去抽奖吧！' + (num === '' ? '' : '还需要连续签到<span class="orange">'+(num - val)+'</span>天才能抽取下一档奖品。');
					this.isLottery = true;
				} else {
					let num = '';
					// (num = 3 - val) > 0 || (num = 7 - val) > 0 || (num = 14 - val) > 0 || (num = 21 - val) > 0;
					(num = this.luckday[0] - val) > 0 || (num = this.luckday[1] - val) > 0 || (num = this.luckday[2] - val) > 0 || (num = this.luckday[3] - val) > 0;
					this.html = '你已达成连续签到<span class="orange">'+val+'</span>天，还需连续签到<span class="orange">'+num+'</span>天才能抽奖！';
					this.isLottery = false;
				}


					
				
			}
		},
		ready(){
			this.luckday = localStorage.getItem('prize_day')
			this.luckday = this.luckday.split(',')
			var newArr = []; 
			for(let i = 0;i < this.luckday.length;i++ ){
				
				newArr.push(parseInt(this.luckday[i]))
			}
			this.luckday = newArr;
			// console.log(this.luckday)
		},
		methods:{
			golottery(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"golottery","usid":"1"})
				this.$router.go({path: '/lottery'})
			}
		}
	}
</script>