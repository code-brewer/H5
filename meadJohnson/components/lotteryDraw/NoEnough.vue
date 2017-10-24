<template>
	<modal :show.sync="show" :bg="false">
		<div class="faile-txt">
			
			<div class="con">
				<div class="items">
					<p>亲,你的贝壳币还不够兑换该礼品哦~礼品先寄存在花妈这,</p>
					<p>赶紧去赚贝壳币吧!</p>
				</div>
				<div class="btn">
					<btn v-link="{path: '/recommend1'}">去赚贝壳币</btn>
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
			show: false
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
			}
		}
	}
</script>
<style lang="scss">
	.faile-txt {
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
			text-align: center;
		}
	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>