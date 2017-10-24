<template><!-- 已抽完奖 -->
	<modal :show.sync="show" :bg="false">
		<div class="faile-txt">
			<h2>温馨提示</h2>
			<div class="con" style="padding-top: 40px;">
				<div class="items">
					<p>每邀请3人可获1次抽奖机会，本月你还有{{flag}}次抽奖额度，再接再厉哟！</p>
				</div>
				<div class="btn">
					<!-- <btn @click="click">赚币攻略</btn> -->
					<btn v-link="{path: '/recommend1'}">邀请好友</btn>
					
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
			show: {
				default: false
			},
			flag: {
				default:'' 
			},
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
			    background: red;
    color: #fff;
			font-weight: 400;
			text-align: center;
			border-radius: 15px 15px 0 0;
			
		}
		.close {
			background: url(../../../images/recommend/recommend_close2.png) no-repeat;
		}
		.btn {
			> div {
				margin: 0 20px;
			}
		}
	}
</style>