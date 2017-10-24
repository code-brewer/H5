<template>
	<div class="app-view wx-page">
		<section class="section-home">
			<div class="main-bg">
				<img :src="'g/images/wx-page-bg.jpg'">
			</div>
			<div class="logo">
				<img :src="'g/images/logo.png'">
			</div>
			<div class="bottom-panel">
				<p>
					现在，还能与偶像亲密接触，与欧巴近距离约会，<br> 一键购买通行证！
					<a href="http://10155.com/damai/index.jsp"> 点击购票</a>
				</p>
				<a class="btn" v-link="{path:'/'}">
					{{btn}} </a>
			</div>
		</section>
	</div>

</template>
<script>
	export default{
		data(){
			return{
				btn:'<<返回游戏'
			}
		}
	}
</script>
<style lang="sass">
	@keyframes roll {
		0% {
			transform: rotate(0deg)
		}
		100% {
			transform: rotate(360deg)
		}
	}
	
	.wx-page {
		.bottom-panel {
			position: absolute;
			color: #a9a9c5;
			text-align: center;
			width: 100%;
			top: 83%;
			font-size: 20px;
			p {
				a {
					text-decoration: underline;
					font-size: 22px;
					color: #1361b5;
				}
			}
			.btn {
				background-color: #4fc0ff;
				padding: 10px;
				border-radius: 10px;
				color: #000;
				display: block;
				margin: 15px auto;
				width: 150px;
			}
		}
		height: 100%;
		background-size: auto 100%;
		background-repeat: no-repeat;
		.main-bg {
			position: absolute;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.logo-panel {
			position: absolute;
			left: 75%;
			top: 2%;
			img {
				width: 100%;
			}
		}
		.music-panel {
			position: absolute;
			left: 85%;
			top: 20px;
			font-size: 0;
			animation: roll 5s linear infinite;
			img {
				width: 100%;
			}
		}
	}
</style>