<template>
	<modal :show.sync="show" :bg="false">
		<div class="faile-txt">
			
			<div class="con">
				<div class="items">
					<p>运气爆棚!恭喜你抽中了<a>{{giftName}}</a>,</p>
					<p>憋说话,快领奖。</p>
				</div>
				<div class="btn">
					<btn v-link="{path:'/Welfaretex/0/1'}">马上领奖</btn>
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