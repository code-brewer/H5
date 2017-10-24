<template>
	<modal :show.sync="show" :bg="false">
		<div class="teams-fail">
			<h2>组团失败</h2>
			<div>
				<p>{{{text}}}</p>
				<btn @click="reset" v-show="btnShow">重新开团</btn>
				<btn v-show="!btnShow" @click="show = false">关闭</btn>
			</div>
		</div>
	</modal>
</template>
<script>
	import Modal from '../Modal.vue'
	import btn from '../btn.vue'

	export default {
		components: {
			Modal,
			btn
		},
		props: {
			show: {
				default: false
			},
			text: {
				default: '亲～时间到了组团失败，<br/>赶紧重新开团抢好礼！'
			},
			btnShow: {
				default: true
			}
		},
		methods: {
			reset() {
				window.localStorage.setItem('teamsError', '1');
				this.$router.replace({path: '/teamsMain/0'});
			}
		}
	}
</script>
<style lang="scss">
	.teams-fail {
		width: 500px;
		margin: 0 auto;
		border-radius: 15px;
		text-align: center;
		h2 {
			padding: 20px 0;
			font-size: 30px;
			color: white;
			font-weight: 400;
			border-radius: 15px 15px 0 0;
			background: #43a4ae;
		}
		> div {
			border-radius: 0 0 15px 15px;
			padding: 20px 30px;
			background: white;
		}
		p {
			line-height: 1.5;
			font-size: 28px;
			color: #43a4ae;
		}
	}
</style>