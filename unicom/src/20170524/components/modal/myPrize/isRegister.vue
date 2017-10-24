<template>
	<Modal :show="show" @close="close">
		<div class="is-register" slot="content">
			<h3 class="h3">确认</h3>
			<p class="mes1"><span>您已登记领奖信息</span></p>
			<div class="center">
				<btn @click.native="handleClick('myPrizeForm')">重新登记信息</btn>
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
		},
		methods: {
			handleClick(type) {
				this.options.source = 'myPrizeIsRegister';
				this.$emit('showModal', type, this.options);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.is-register {
		.mes1 {
			padding: 30px 0 50px 0;
			text-align: center;
			font-size: 34px;
			line-height: 1.5;
			span {
				display: inline-block;
				line-height: 45px;
				padding-left: 55px;
				background: url(../../../images/checked-img1.png) left center no-repeat;
			}
		}
		.button {
			margin: 20px;
		}
	}
</style>