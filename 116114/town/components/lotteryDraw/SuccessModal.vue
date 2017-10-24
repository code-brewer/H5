<template>
	<modal :show.sync="show" :bg="false">
		
		<div class="tanchuang">
			<p  class="qqtex">达到领奖天数了!</p>
			<p  class="successtxt">您获得抢<span style="color:#ffcc00;">{{text}}</span>的资格,奖品有限,先到先得赶快去领奖吧!</p>
			<p style="color:#fff;font-size:25px;">不点击领奖即视为自动弃奖，奖品不予补发！</p>
			<!-- <p  class="looktxt">去领奖</p> -->
		</div>
		<div class="comite"  v-link="{path:'/lijiang'}" ></div>
	</modal>

</template>
<script>
	import Modal from '../Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			text: '',
			show: false
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
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
		box-sizing: border-box;
    	text-align: center;
   		padding: 110px 95px 0;
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
		font-size:25px;
		color:#fff;
		/*position: absolute;
	    top: 164px;
    	left: 235px;*/
	}
	.successtxt{
		font-size:25px;
		color:#fff;
		/*position: absolute;
	    top: 215px;
    	left: 85px;*/
	}
	.looktxt{
		font-size:30px;
		color:#fff;
		/*position: absolute;
	    top: 270px;
    	left: 218px;*/
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
		width: 296px;
		height: 68px;
		background: url(../../images/lingjiang.png) no-repeat;
		margin: 0 auto;
		/*margin-top: 50px;*/
	}
</style>