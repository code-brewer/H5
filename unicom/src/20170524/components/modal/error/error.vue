<template>
	<Modal :show="show" @close="close">
		<div class="error" slot="content">
			<h3>订购失败</h3>
			<p class="mes1 center">详情请咨询客服：<a href="tel:4000410155">4000410155</a></p>
			<div class="center">
				<btn @click="close(false)">确定</btn>
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
		}
	}
</script>
<style lang="scss" scoped>
	.error {
		.mes1 {
			margin: 40px 0;
			font-size: 40px;
		}
		.mes2 {
			padding: 50px 0;
			color: #8e8e8e;
			font-size: 26px;
		}
	}
</style>