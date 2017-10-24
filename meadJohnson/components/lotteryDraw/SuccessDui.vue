<template>
	<modal :show.sync="show" :bg="false">
		<div class="successdui-txt">
			
			<div class="con">
				<div class="items">
					<p>哎哟运气不错哟~!<a>{{giftName}}</a>贝壳币已经放入你的钱包了。</p>
				</div>
				<div class="btn">
					<btn v-link="{path: '/recommend1'}">去赚贝壳币</btn>
					<btn v-link="{path: '/presentList'}">去兑换好礼</btn>
				</div>
				
			
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from '../Modal.vue'
	import btn from '../btn.vue'

	export default {
		components: {
			Modal,
			btn
		},
		props:{
			show: false,
			giftName: ''
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
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
			background: url(../../images/close-icon1.png) no-repeat;
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