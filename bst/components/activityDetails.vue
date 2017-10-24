<template>
	<modal :show.sync="show" :bg="false">
		 <section class="rule-page">
		 		<div class="title" style="font-family: none; text-align: left; font-size: 50px;">
		 				游戏规则：
		 		</div>
		 		 <dl style="overflow-y: auto;font-family: none;">
		 		 	<dd>点击“开始游戏”，  10秒内记住看到的图片内容，10秒内出现5个图片内容，不规则重复，系统提问哪项查询功能在以上图片中是没有出现的 ， 选择正确即可参与抽奖，选择错误则返回重新游戏。</dd>
		 		 	<dd>114号码百事通保留对本次活动的最终解释权；如发现存在刷粉行为的用户，将立即取消获奖资格。</dd>
		 		 	<dd>奖品将在72小时内派发，节假日顺延</dd>
		 		 	
		 		 </dl>
		 		<img class="close" :src="'images/t-close.png'" @click="show=false"/>
		 </section>
	</modal>
</template>
<style lang="sass">
	.rule-page{
		// height: 800px;
		padding-bottom: 10px;
		background-size: 800px 560px!important;
		background-size: 560px 800px!important;
		background-color: rgba(0,0,0,0.85);
	    border: 10px solid #fff;
	    border-radius: 15px;
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
			color: #fff;
		    font-family: none;
		    text-align: left;
		    font-size: 50px;
		    padding-left: 25px;
		}
		dl{
			    font-size: 26px;
			    padding: 0 30px 30px;
			    color: #fff;
			    line-height: 1.8;
		    dd{
		    	    margin-top: 20px;
    				font-weight: bold;
		    }
		}
	}
</style>
<script>
 	import modal from './../../src/components/Modal.vue'
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