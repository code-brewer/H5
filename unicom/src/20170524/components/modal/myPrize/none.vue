<template>
	<Modal :show="show" @close="close">
		<div class="none" slot="content">
			<h3>我的奖品</h3>
			<p class="mes1 center">你还没抽奖哦！赶紧去抽奖吧～</p>
			<p class="mes2 center">100%中奖^-^</p>
			<div class="center">
				<btn @click.native="close(false)">马上去抽奖</btn>
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
	.none {
		.mes1 {
			padding: 10px 0;
			font-size: 32px;
		}
		.mes2 {
			color: #000be2;
			font-size: 34px;
		}
	}
</style>