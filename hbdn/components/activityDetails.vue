<template>
	<modal :show.sync="show" :bg="false" class="center">
		 <section class="rule-page">
		 		<div class="title" style="font-family: none; font-size: 38px;">
		 				游戏规则：
		 		</div>
		 		 <dl style="overflow-y: auto;font-family: none;">
		 		 	<dd>记住6秒内出现的4个图片内容，不规则重复，系统提问"第X秒出现的是下面哪项联 通手机营业厅服务功能"，选择正确即可获得领奖。</dd>
		 		 	<!-- <dd>114号码百事通保留对本次活动的最终解释权；如发现存在刷粉行为的用户，将立即取消获奖资格。</dd> -->
		 		 	<!-- <dd>奖品将在72小时内派发，节假日顺延</dd> -->
		 		 	
		 		 </dl>
		 		<img class="close" :src="'images/xx.png'" @click="show=false"/>
		 </section>
	</modal>
</template>
<style lang="sass">
	.center {
		// position: absolute;
	 //    top: 38%;
	 //    transform: translateY(-50%);
	}
	.rule-page{
		// height: 800px;
		padding-bottom: 10px;
		background-size: 800px 560px!important;
		background-size: 560px 800px!important;
		// background-color: rgba(0,0,0,0.85);
		background-color: #fed141;
	    border: 10px solid #fff;
	    border-radius: 40px;

	    margin-top: 300px;
		.close{
		       position: absolute;
			    top: -20px;
			    right: -20px !important;
			    margin-left: 190px;
			    z-index: 200;
		}
		.title{
			margin: 0 auto;
			line-height: 2;
			color: #000;
		    font-family: none;
		    text-align: center;
		    // font-size: 50px;
		    font-weight: bold;
		    font-size: 38px;
		    padding-left: 25px;
		}
		dl{
			    font-size: 32px;
			    // padding: 0 30px 30px;
			    color: #000;
			    // line-height: 1.8;
			    padding: 5%;
    			line-height: 50px;
		    dd{
		    	    // margin-top: 20px;
		    	    text-align: left;
    				// font-weight: bold;
		    }
		}
	}
</style>
<script>
 	// import modal from './../../src/components/Modal.vue'
 	import modal from './../src/Modal.vue'
	export default{
		components:{
			modal
		},
		props:{
			show:{
				Boolean,
				default:false
			}
		},ready(){
		}
		 
	}
</script>