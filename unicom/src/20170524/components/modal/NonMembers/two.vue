<template>
	<Modal :show="show" @close="close">
		<div class="non-members two" slot="content">
			<h3 class="h3">提示</h3>
			<p class="mes1">开通会员成功，您已享有沃音乐会员权益，现在离抽奖只有一步之遥哦～</p>
			<div class="center">
				<btn @click.native="handleClick">去抽奖</btn>
			</div>
			<p class="mes2">（由于网络延迟原因，部分用户开通会员无法立即生效，请过段时间再查询。）</p>
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
				this.close(false);
				if ( this.options.source === 'myPrize' ) {
					this.$parent.$emit('showMyPrize');
				}
				if ( this.options.source === 'lottery' ) {
					this.$parent.$emit('showSnackbar', '您已是会员，可直接参与抽奖哦~');
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.two {
		.mes1 {
			padding: 0 15px;
			font-size: 32px;
		}
		.mes2 {
			padding-top: 20px;
			font-size: 26px;
			color: #000be2;
		}
	}
</style>