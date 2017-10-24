<template>
	<modal :show.sync="show" :bg="false">
		
		<div class="tanchuang">
			<div class="close" ><span  @click="show = false" class="comite"></span></div>
			<p  class="qqtex">{{txt}}</p>
			<div style="text-align: center;margin-bottom:30px;">
				<a  class="sub" @click="show = false">确定</a>
			</div>
		</div>
		<!-- <div ></div> -->
	</modal>

</template>
<script>
	import Modal from '../Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			show: false,
			// txt:''
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
		width: 346px;
		height: 224px;
		/*background: url(../../images/tanchuang1.png) no-repeat;*/
		background-color: #fff;
		background-size: contain;
		position: relative;
	    text-align: center;
    	/*padding: 165px 30px 0;*/
    	box-sizing: border-box;
    	top:50%;
    	/*margin-top: -112px;*/
    	left:50%;
    	margin-left: -173px;
    	/*margin-top: -20px;*/
	}
	.tanchuang p{
		/*line-height: 45px;*/
		font-size: 14px;
		text-align: center;
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
		line-height: 115px;
		
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
		width: 18px;
		height: 18px;
		background: yellow;
		margin: 0 auto;
		display: inline-block;
	    position: absolute;
    	top: 6px;
    	right: 5px;

		background: url(../../images/cha.png) no-repeat;
		cursor: pointer;
		/*margin-top: 50px;*/
	}
	.close{
		height: 30px;
		line-height: 30px;
		background-color: #faa354;
		position: relative;
		
	}
	.sub{
		width: 73px;
		height: 28px;
		background-color: #f57303;
		border:1px solid #e55c00;
		color: #fff;
		line-height: 28px;
		text-align: center;
		display: inline-block;
		margin:0 auto;
		border-radius: 3px;
		cursor: pointer;
	}
	.qqtex{
		line-height: 100px;
		color: #000;
	}
</style>