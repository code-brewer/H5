<template>
	<Modal :show="show" @close="close">
		<div class="is_lottery" slot="content">
			<h3 class="h3">提示</h3>
			<p class="mes1">亲，您已经抽过奖啦<br/>奖品可在<span class="blue">我的奖品</span>处查看</p>
			<div class="center">
				<btn @click.native="handleClick">我的奖品>></btn>
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
			handleClick() {
				/** 触发展示我的奖品事件 */
				this.$parent.$emit('showMyPrize');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.is_lottery {
		.mes1 {
			padding: 20px 0 40px 0;
			text-align: center;
			font-size: 30px;
			line-height: 1.5;
			.blue {
				color: blue;
			}
		}
	}
</style>