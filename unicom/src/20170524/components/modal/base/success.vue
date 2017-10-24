<template>
	<Modal :show="show" @close="close">
		<div class="members success" slot="content">
			<h3>{{title}}</h3>
			<img :src="options.prizeImg" class="prize-img">
			<p class="prize-name">【{{options.prizeName}}】</p>
			<!-- 虚拟奖品 -->
			<p class="mes1" v-if="options.isInvented">奖品将于活动结束后10个工作日内统一派送，请耐心等待～</p>
			<div class="center">
				<btn @click.native="showModal">{{btnText}}</btn>
			</div>
		</div>
	</Modal>
</template>
<script>
	import utils from '../utils.js'
	import btn from '../../button/button.vue'
	export default {
		mixins: [utils],
		components: {
			btn
		},
		computed: {
			btnText() {
				return this.options.isInvented ? '确定' : '登记领奖信息';
			}
		}
	}
</script>
<style lang="scss" scoped>
	.success {
		.mes1 {
			padding: 20px 0;
			text-align: center;
			font-size: 22px;
			color: red;
		}
		.prize-name {
			text-align: center;
			color: #000be2;
			font-size: 30px;
			padding-bottom: 20px;
		}
		.prize-img {
			display: block;
			max-width: 100%;
			margin: 0 auto;
		}
	}
</style>