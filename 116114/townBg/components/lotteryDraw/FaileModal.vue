<template>
	<modal :show.sync="show" :bg="false">
		
		<div class="tanchuang">
			<p  class="qqtex">来晚了!</p>
			<p  class="successtxt">奖品已经被领光了,</p>
			<p  class="looktxt">继续签到抢其他奖品吧!</p>
		</div>
		<div class="comite" @click="back()"></div>
	</modal>

</template>
<script>
	import Modal from '../Modal.vue'
	import {router} from '../../index'
	export default {
		components: {
			Modal
		},
		props:{
			show: false
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
			}
		},
		methods:{
			back(){
				router.go({path: '/sign'}) 
			}
		}
	}
</script>
<style scoped>
	.tanchuang{
		width: auto;
		height: 502px;
		background: url(../../images/tanchuang1.png) no-repeat;
		background-size: contain;
		position: relative;
		text-align: center;
    	padding: 130px 30px 0;
    	box-sizing: border-box;
	}
	.tanchuang p{
		line-height: 45px;
	}
	.know{
		width: 286px;
		height: 68px;
		background: url(../../images/know.png) no-repeat;
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
	.qqtex{
		font-size:30px;
		color:#fff;
		position: absolute;
	    top: 164px;
    	left: 235px;
	}
	.successtxt{
		font-size:30px;
		color:#fff;
		position: absolute;
	    top: 215px;
    	left: 163px;
	}
	.looktxt{
		font-size:30px;
		color:#fff;
		position: absolute;
	    top: 270px;
    	left: 138px;
	}
	.qqinput{
		height:52px;
		line-height:52px;
		width: 54%;
    	position: absolute;
	    top: 210px;
    	left: 140px;
    	font-size: 30px;
    	padding-left: 15px;

	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
	.comite{
		width: 277px;
		height: 68px;
		background: url(../../images/close.png) no-repeat;
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
</style>