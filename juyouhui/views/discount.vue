<template>
	<div class="discount clearfix">
		<div class="discountbBox fl" v-for = "item in discountData" v-link="{path: '/allDiscount/'+item.name}">
			<div class="ticket">
				<img :src="item.imgUrl">
			</div>
			<p>{{item.name}}</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default { 
		data () {
			return {
				discountData : [{
					name : '麦当劳',
					imgUrl: './images/discount/Mcdonald.png',
				},{
					name : '真功夫',
					imgUrl: './images/discount/zhenggongfu.png',
				},{
					name : '肯德基',
					imgUrl: './images/discount/KFC.png',
				},{
					name : '汉堡王',
					imgUrl: './images/discount/Burger.png',
				},
				]
			}
		},
		methods : {
			
		}
	}
</script>
<style lang="scss" scoped>
	.discount {
		padding: 20px 20px 0 20px;
		.discountbBox {
			width :50%;
			background: #fff;
			margin-bottom: 30px;
			box-sizing: border-box;
			background-color: #f3f3f3;
			.ticket {
				width: 290px;
				height: 290px;
				margin: 0 auto ;
				box-sizing: border-box;
				padding-left: 5px;
				img {
					width: 100%;
				}

			}
			p {
				text-align: center;
				font-size: 25px;
				margin-top: 10px;
			}
		}
		.discountbBox:nth-of-type(even){
			padding-left: 10px;
		}
	}

</style>