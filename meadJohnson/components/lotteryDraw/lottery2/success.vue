<template>
	<modal :show.sync="show" :bg="false">
		<div class="successdui-txt">
			<h2>温馨提示</h2>
			<div class="con">
				<div class="items">
					<p v-if="isCoin">恭喜您！获得<a>{{giftName}}</a>，已经放入您的钱包！</p>
					<p v-else>word亲！恭喜您，获得<a>{{giftName}}</a>！请填写您的收件信息以便领取礼品哦！</p>
				</div>
				<div class="btn" v-if="isCoin">
					<!-- <btn @click="click">赚币攻略</btn> -->
					<btn v-link="{path: '/presentList'}">贝壳币商城</btn>
					<btn v-link="{path: '/myConchCoin'}">我的贝壳币</btn>
				</div>
				<div class="btn" v-else>
					<btn v-link="{path: '/Welfaretex1/'+oid}">领取奖品</btn>
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
			isCoin: {
				default: true
			},
			giftName: {
				default: 0
			},
			oid: ''
		},
		methods: {
			click() {
				window.location.href = 'http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=100001447&idx=1&sn=f6e428ef9211daa96dc3b3e02f235716&chksm=691adf645e6d56720877287d33168012b20a90ebf7dc7d319e66e245bfb28ba9edfc12388a41&scene=0#wechat_redirect';
			}
		}
	}
</script>
<style lang="scss">
	.successdui-txt {
		border-radius: 15px;
		background: white;
		text-align: left;
		
		.con {
			height: 350px;
			padding: 0 30px;
			border-radius: 0 0 15px 15px;
			overflow-y: auto;
			padding-top: 50px;
    		box-sizing: border-box;
    		text-align: center;
		}
		.items {
			padding: 30px 0;
			font-size: 36px;
			line-height:48px;
			strong {
				font-weight: 400;
				color: #43a4ae;
			}
			p {
				color: #787878;
			}
			a {
				font-size: 36px;
				color:#f88431;
				word-break: break-all;
			}
		}
		.close {
			position: absolute;
			top: -15px;
			right: -15px;
			width: 46px;
			height: 46px;
			background: url(../../../images/close-icon1.png) no-repeat;
		}
		.btn {
			position:relative;
			text-align: center;
			> div {
				margin: 0 10px;
			}
		}
	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>
<style lang="scss" scoped>
	.successdui-txt {
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