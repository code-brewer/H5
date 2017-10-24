<template>
	<Modal :show="show" @close="close">
		<div class="members members_CRBT_confirm" slot="content">
			<h3 class="h3">提示</h3>
			<p class="mes1 center">是否将此歌曲设为默认炫铃？</p>
			<p class="mes2 center">爱我所爱(《欢乐颂2》插曲)-邓伦</p>
			<div class="btns">
				<btn @click.native="close(false)">取消</btn>
				<btn @click.native="handleClick" class="setCRBT">设为炫铃</btn>
			</div>
		</div>
	</Modal>
</template>
<script>
	import utils from '../utils.js'
	import btn from '../../button/button.vue'
	import api from '../../../api/'
	import { ajaxHandler } from '../../../utils/'
	export default {
		mixins: [utils],
		components: {
			btn
		},
		methods: {
			handleClick() {
				/** 统计订购炫铃按钮点击 */
				this.$parent.$emit('addOperLog', {type: 'button', buttonName: '订购炫铃', operate: 'order', cls: 'setCRBT'});

				this.$parent.$emit('showLoading');
				api.buyTone(this, {
					aid: aid,
					source: source,
					toneID: '9178900020170601431267',
					toneType: '1',
					accessToken: this.$parent.accessToken
				}, back => {
					this.$parent.$emit('hideLoading');
					if (back.resCode === '0') {
						this.$emit('showModal', 'MembersCRBTSuccess');
					} else if (back.resCode && back.resCode.match(/^(100002|400032|400033)$/)) {
						this.$parent.$emit('showError', back);
					} else {
						this.$emit('showModal', 'error');
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.members_CRBT_confirm {
		.mes1 {
			font-size: 34px;
		}
		.mes2 {
			padding: 20px 0 50px 0;
			color: #000be2;
			font-size: 30px;
		}
		.btns {
			text-align: center;
			a {
				margin: 0 20px 20px;
			}
		}
	}
</style>