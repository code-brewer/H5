<template>
	<div class="myCoin main">
		<section class="lijiang">
			<h1>{{title}}</h1>
			<div>
				<img :src="'images/Conchwelfare-code.jpg'">
				<p>亲，您的订单编号：{{orderid}}。具体的派奖时间和物流信息，请识别二维码添加花妈小助手，提供您的订单编号咨询哦！</p>
			</div>
		</section>
		<section class="section1" style="padding:0">
			<div  class="secTop" style="padding:0">
				精彩还在继续,不要停下来~!
			</div>
			<section>
				<div v-for="list in lists" v-link="{path: list.path}">
					<div :style="{background: 'url('+list.img+') center center no-repeat', 'background-size': '151px 150px'}"></div>
					<span class="texBi">{{{list.text}}}</span>
				</div>
			</section>
		</section>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				lists: [{
					path: '/signIn',
					text: '每日<br/>签到',
					img: 'images/qiandao.png'
				},{
					path: '/recommend1',
					text: '邀请<br/>好友',
					img: 'images/tuijian.png'
				},{
					path: '/presentList',
					text: '好礼<br/>随时兑',
					img: 'images/li.png'
				}]
			}
		},
		created() {
			document.title = '秘密花园';
			this.$dispatch('loading');
		},
		ready() {
			this.$dispatch('cancelLoading');
		},
		computed: {
			title() {
				if (this.$route.params.type == "lingjiang") {
					return '领奖成功';
				} else {
					return '兑换成功';
				}
			},
			orderid() {
				return this.$route.params.orderid;
			}
		}
	}
</script>
<style lang="scss">
	.myCoin {
		padding-bottom: 76px;
		.section1 {
			width: 90%;
			border-radius: 15px;
			-webkit-box-shadow: 0 53px 40px rgba(61,165,175,.4);
			box-shadow: 0 53px 40px rgba(61,165,175,.4);
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
		.section1 {
			height: 365px;
			padding-top:0;
			margin:0 auto;
			font-size: 0;
			text-align: center;
			background: #fff;
			.secTop{
				width:100%;
				height:70px;
				background:#3ea4b0;
				border-top-left-radius:17px;
				border-top-right-radius:17px;
				box-sizing: border-box;
				color:#fff;
				font-size:32px;
				line-height: 70px;
				text-align: center;

			}
			.texBi{
				width: 120px;
				font-size: 32px;
				color: #3ea4b0;
				display: inline-block;
    			margin: 0 auto;
			}
			> section {
				display:flex;
				color:#000;
				> div {
					flex:1;
					color:#000;
					padding:30px 15px;
					box-sizing:border-box;
					> div {
						width:151px;
						height:150px;
						margin:0 auto;
					}
				}
			}
		}
		
		.lijiang{
			padding-bottom: 40px;
			h1{
				font-family: '黑体';
				font-size: 80px;
				color: #3da5af;
				text-align: center;
				line-height:170px;
			}
			p {
				font-size:26px;text-align: center;padding:0 30px;color:#3ea4b0;
				line-height: 1.3;
			}
			img {
				display: block;
				width: 400px;
				margin: -20px auto 20px;
			}
		}

	}
</style>