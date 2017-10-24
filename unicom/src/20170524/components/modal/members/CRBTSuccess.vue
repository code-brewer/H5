<template>
	<Modal :show="show" @close="close">
		<div class="members members_CRBT_success" slot="content">
			<h3 class="h3">提示</h3>
			<p class="mes1 center">设置成功</p>
			<p class="mes2 center">（登录沃音乐官网“个人中心”可更换炫铃哦）</p>
			<div class="center">
				<btn href="http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d815a6d02a2015a6f05d0ba074e">个人中心>></btn>
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
	.members_CRBT_success {
		.mes1 {
			font-size: 34px;
		}
		.mes2 {
			padding: 50px 0;
			color: #8e8e8e;
			font-size: 26px;
		}
	}
</style>