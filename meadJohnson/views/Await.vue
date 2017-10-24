<template>
	<modal :show.sync="show" :bg="false">
		<div class="await-rule">
			<h2>装修中……</h2>
			<div class="con">
				<p>推荐好友赚贝壳币</p>
				<p>即将上线</p>
				<p>敬请期待哟～！</p>
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from '../components/Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			show: false
		}
	}
</script>
<style lang="scss">
	.await-rule {
		border-radius: 15px;
		background: white;
		h2 {
			padding: 20px 0;
			font-size: 30px;
			color: white;
			font-weight: 400;
			text-align: center;
			border-radius: 15px 15px 0 0;
			background: #43a4ae;
		}
		.con {
			height: 160px;
			padding: 30px;
			border-radius: 0 0 15px 15px;
			overflow-y: auto;
			text-align: center;
			p {
				line-height: 1.5;
				font-size: 34px;
				color: #787878;
			}
		}
		.close {
			position: absolute;
			top: -15px;
			right: -15px;
			width: 46px;
			height: 46px;
			background: url(../images/member-rule-close.png) no-repeat;
		}
	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>