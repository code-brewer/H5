<template>
	<modal :show.sync="show" :bg="false">
		
		<div class="tanchuang">
			<p  class="qqtex">测试测试测试</p>
			
		</div>
		<div class="comite" @click="show = false"></div>
	</modal>

</template>
<script>
	import Modal from '../Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			show: false
		},
		watch: {
			show(val) {
				console.log(val)
				this.$dispatch('setOverflow', val);
			}
		},
		data() {
			return {
				
				// noactivity:'没有活动在上线'

			}
		}
	}
</script>
<style scoped>
	.tanchuang{
		width: auto;
		height: 502px;
		/*background: url(../../images/tanchuang1.png) no-repeat;*/
		background-color: pink;
		background-size: contain;
		position: relative;
	    text-align: center;
    	padding: 165px 30px 0;
    	box-sizing: border-box;
	}
	.tanchuang p{
		line-height: 45px;
	}
	.know{
		width: 286px;
		height: 68px;
		/*background: url(../../images/know.png) no-repeat;*/
		background: yellow;
		margin: 0 auto;
		margin-top: 50px;
	}
	.qqtex{
		font-size:30px;
		color:#fff;
		
	}
	.successtxt{
		font-size:30px;
		color:#fff;
		
	}
	.looktxt{
		font-size:30px;
		color:#fff;
		
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
		width: 268px;
		height: 68px;
		background: yellow;
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
</style>