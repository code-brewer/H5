<template><!-- 已抽完奖 -->
	<modal :show.sync="show" :bg="false">
		<div class="faile-txt">
			<h2>温馨提示</h2>
			<div class="con" style="padding-top: 40px;">
				<div class="items">
					<p>亲，您已经抽过奖了哦，感谢您的参与！</p>
				</div>
				<div class="btn">
					<!-- <btn @click="click">赚币攻略</btn> -->
					<btn v-link="{path: '/presentList'}">贝壳币商城</btn>
					<btn v-link="{path: '/myConchCoin'}">我的贝壳币</btn>
				</div>
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from '../../Modal.vue'
	import btn from '../../btn.vue'

	export default {
		components: {
			Modal,
			btn
		},
		props:{
			show: false
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
			}
		},
		methods: {
			click() {
				window.location.href = 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=100001447&idx=1&sn=f6e428ef9211daa96dc3b3e02f235716&chksm=691adf645e6d56720877287d33168012b20a90ebf7dc7d319e66e245bfb28ba9edfc12388a41&scene=0#wechat_redirect';
			}
		}
	}
</script>
<style lang="scss" scoped>
	.faile-txt {
		h2 {
			padding: 20px 0;
			font-size: 30px;
			color: white;
			font-weight: 400;
			text-align: center;
			border-radius: 15px 15px 0 0;
			background: #43a4ae;
		}
		.close {
			background: url(../../../images/member-rule-close.png) no-repeat;
		}
		.btn {
			> div {
				margin: 0 20px;
			}
		}
	}
</style>