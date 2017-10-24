<template>
	<!-- <div class="view" style="background-color: #fff;">
		<section  class="replay">
		  <img :src="'images/replay.png'" width="100%">
		</section>
	</div> -->
	<div class="guanzhu">
		<img :src="'images/logoTop.png'" width="217px" height ="217px" style="margin:0 auto;">
		<p class="mama">我是花贝妈妈</p>
		<div style="padding:30px 0" class="tex">
			<p>欢迎光临我的秘密花园（积分商城）</p>
			<p>玩赚贝壳币、免费换礼品、幸运大抽奖</p>
			<p>您只差一步了~</p>
		</div>
		<div style="padding:0 50px;">
			<img :src="'images/zhiwen.png'"  width="100%;">
		</div>
	</div>
</template>
<style scope>
.guanzhu{
	width: 100%;
	height: 1138px;
	background: url(../images/guanzhuBg.jpg);
	padding-top: 60px;
	box-sizing: border-box;
	text-align: center;
}
.mama{
	color: #000;
	line-height: 80px;	
	font-size: 30px;
}
.tex p{
	color: #000;
	line-height: 40px;
	text-align: center;
	font-size: 30px;
}

</style>