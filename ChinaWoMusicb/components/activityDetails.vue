<template>
	<modal :show.sync="show" :bg="false">
		 <section class="prize-panel" style="background:url(b/images/bg-border-2.png);">
		 		<div class="title" style="font-family: none;">
		 				活动规则
		 		</div>
		 		 <dl style="height: 656px;overflow-y: auto;font-family: none;">
		 		 	<dd>1、活动时间：2016年8月8日-2016年8月14日</dd>
		 		 	<dd>2、参与方式：点击【马上抽奖】，有机会获得大疆无人机、小米平衡车、暴风魔镜、华为荣耀zero运动手环、小米手环、京东购物卡100元、京东购物卡50元、话费10元、话费5元奖品。</dd>
		 		 	<dd>3、抽奖规则：</dd>
		 		 	<dd>&nbsp;&nbsp;a）.用户闯关次数不限，当天第一次闯关成功获得抽奖机会；</dd>
		 		 	<dd>&nbsp;&nbsp;b）.闯关成功普通用户获得3次抽奖机会；开通会员额外获得2次抽奖机会；</dd>
		 		 	<dd>&nbsp;&nbsp;c）.闯关成功会员用户获得5次抽奖机会；</dd>
		 		 	<dd>&nbsp;&nbsp;d）.在微信中分享活动到朋友圈获得额外1次抽奖机会，每天仅一次分享有额外增加机会；</dd>
		 		 	<dd>&nbsp;&nbsp;e）.同一ID、姓名、手机号在同一活动仅有一次获奖机会，不重复获奖。</dd>
		 		 	<dd>&nbsp;&nbsp;f）.每天抽奖次数清零重置。</dd>
		 		 	<dd>4、领奖须知：</dd>
		 		 	<dd>&nbsp;&nbsp;a）.用户请及时在活动页面中登记兑奖信息，逾期未登记则视为自动弃奖，活动结束七个工作日后将寄发奖品。</dd>
		 		 	<dd>&nbsp;&nbsp;b）.此外，获得（iphone 6s、无人机及平衡车）的中奖者须核对身份领取，可关注沃音乐官方微信发送关键字“高尔夫”+姓名+电话号码+身份证照，活动结束七个工作日内客服将电话回访确认以上信息。</dd>
		 		 	<dd>&nbsp;&nbsp;c）.京东券：登录京东账号，进入“我的京东”页面，选择“京东卡/E卡”栏目，按照页面提示输入京东E卡券号即可绑定使用，本活动京东E卡有效期为36个月，请您在有效期内尽快使用；</dd>
		 		 	<dd>&nbsp;&nbsp;d）.活动结束七个工作日内客服将对抽中话费、京东购物卡的用户电话回访确认信息。除话费、京东购物卡以外的奖品将以为快递形式进行派送，请用户务必在活动页面中填写可接收快递的地址。</dd>
		 		 	<dd>5、本活动最终解释权归中国联通沃音乐所有。</dd>
		 		 </dl>
		 		<img class="close" :src="'b/images/close-2.png'" @click="show=false"/>
		 </section>
	</modal>
</template>
<style lang="sass">
	.prize-panel{
		height: 800px;
		width: 560px;
		padding-bottom: 10px;
		background-size: 800px 560px!important;
		background-size: 560px 800px!important;
		.close{
			    position: absolute;
			    top: 30px;
			    left: 50%;
			    margin-left: 190px;
		}
		.title{
			margin: 0 auto;
			font-size: 38.84px;
			line-height: 3;
			color: #e16a0f;
			text-align: center;
		}
		dl{
			    font-size: 22px;
			    padding: 30px;
			    color: #ca7a52;
			    line-height: 1.3;
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