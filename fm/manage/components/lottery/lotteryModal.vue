<template>
	<modal :show.sync="show">
		<div class="signSuccess">
			<h2>{{list.title}}</h2>
			<p class="modal-text">{{{list.text}}}</p>
			<p v-show="list.p">{{{list.p}}}</p>
			<div class="btn-group" v-show="type.indexOf('success') > -1">
				<button :bg="bg" @click="share">立即分享</button>
				<button :bg="bg" @click="show = false">暂时低调</button>
			</div>
			<div class="btn-group" v-show="type === 'error'">
				<button :bg="bg" @click="share">分享集运</button>
				<button :bg="bg" @click="show = false">下次再说</button>
			</div>
			<div class="btn-group" v-show="type === 'empty'">
				<button :bg="bg" @click="show = false">好的</button>
			</div>
		</div>
	</modal>
</template>
<script>
	import modal from '../modal.vue'
	import button from '../button.vue'
	import router from '../../index.js'
	export default {
		components: {
			modal,
			button
		},
		props: {
			show: {
				default: false
			},
			type: {
				default: 'success1'
			},
			gift: {
				default: ''
			}
		},
		data() {
			return {
				bg: 'orange-bg',
				options: {
					success1: {
						title: '中奖提示',
						text: '运气超棒!<br/>恭喜获得<span class="orange">' + this.gift + '</span>一份，<br/>请在<span class="orange">x月x日前</span>进入<span class="orange">【我的】</span>填写联系信息，逾期不填将视为弃奖哦！',
						p: 'PS：好运气要多分享才能持续哦，快快让朋友们羡慕下吧！'
					},
					success2: {
						title: '中奖提示',
						text: '赞！恭喜获得<span class="orange">' + this.gift + '</span>一张，奖品将在<span class="orange">15个工作日</span>内发放至<span class="orange">【我的卡券】</span>，请及时领取。',
						p: 'PS：好运气要多分享才能持续哦，快快让朋友们羡慕下吧！'
					},
					error: {
						title: '提示',
						text: '哎呀～大奖跟你擦肩而过！不要灰心！明天继续来签到还是有机会中奖的哦！',
						p: '听说，乐于分享可以搜集运气哦！<br/>不妨试试吧～'
					},
					empty: {
						title: '提示',
						text: '很遗憾！<br/>今天的抽奖次数用完了，请明天继续签到抽奖。'
					}
				}
			}
		},
		computed: {
			list() {
				return this.options[this.type];
			}
		},
		methods:{
			share(){
				this.$dispatch('ChannelLog',{"type":"button","button_name":"share-modal","usid":"1"})
				// this.$router.go({path: '/share'})
				//弹出分享渠道
			}
		}
	}
</script>
<style lang="scss">
	.btn-group {
		text-align: center;
		.btn {
			display: inline-block;
			margin: 40px 20px;
		}
	}
</style>





















