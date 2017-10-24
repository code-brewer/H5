<template>
	<Modal :show="show" @close="close">
		<div class="register-success" slot="content">
			<h3 class="h3">确认</h3>
			<p class="mes1"><span>您已成功提交领奖信息</span></p>
			<p class="mes2">奖品将派发，请耐心等待哦～</p>
			<div class="center">
				<btn @click.native="close(false)">确定</btn>
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
	.register-success {
		text-align: center;
		.mes1 {
			padding: 30px 0;
			font-size: 34px;
			line-height: 1.5;
			span {
				display: inline-block;
				line-height: 45px;
				padding-left: 55px;
				background: url(../../../images/checked-img1.png) left center no-repeat;
			}
		}
		.mes2 {
			font-size: 26px;
			color: blue;
		}
	}
</style>