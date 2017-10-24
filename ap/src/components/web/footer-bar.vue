<template>
	<!-- 底部组件 -->
	<footer id="footer" class="ams-footer-bar">
		<div class="container">
			<nav class="nav">
				<div class="back-sell" >
					<dl class="back-sell-text">
						<dt>客服中心</dt>
						<dd>售前：400-886-2515</dd>
						<dd>售后：400-886-2515</dd>
						<dd>客服QQ：943848956</dd>
					</dl>
				</div>

				<ul class="footer-menu">
					<li class="footer-menu-item">
						<a href="">模板商城</a>
					</li>
					<li class="footer-menu-item">
						<a href="">品牌案例</a>
					</li>
					<li class="footer-menu-item">
						<a href="">活动排行</a>
					</li>
					<li class="footer-menu-item">
						<a href="">活动专题</a>
					</li>
				</ul>

				<div class="about">
					<ul>
						<li class="about-item">关注我们</li>
						<li class="about-item">
							<img class="code-img" src="../../assets/code-img.png">
						</li>
					</ul>
				</div>
			</nav>

			<div class="contact">
				<div class="company">
					<span>广州易杰数码科技有限公司</span>
					<span>版权所有 © 2002-2016　粤ICP备09221215号-7</span>
				</div>
				<ul class="contact-us">
					<li class="contact-us-item">关于我们</li>
					<li class="contact-us-item">联系我们</li>
					<li class="contact-us-item">技术疑问</li>
				</ul>
				<a class="footer-logo" href="">
					<img class="footer-logo-img" src="../../assets/logo-footer.png">
				</a>
			</div>
		</div>

	</footer>
</template>

<script>

	export default {
		
	}
</script>

<style lang="scss">
	
.ams-footer-bar {
	// position: absolute;
	// left:0;
	// bottom:-160px;
	width:100%;
	height:160px;
	min-width:1280px;
	max-width:1920px;
	margin:0 auto;
    padding: 20px 0;
	font-size:0;
	text-align: center;
	background-color:#000;
	overflow: hidden;

	.back-sell{
		display: inline-block;
		width:200px;
		height:auto;
		background:url(../../assets/phone.png) no-repeat left top;
		vertical-align:top;

		.back-sell-text{
			padding-left:50px;
			text-align: left;
			box-sizing:border-box;

			dt{
				margin-bottom:5px;
				line-height:20px;
				font-size:12px;
				font-weight:600;
				color:#F5F5F5;
			}

			dd{
				line-height:16px;
				margin-left:0;
				font-size:12px;
				color:#6C6C6C;
			}
		}
	}

	.footer-menu{
		display:inline-block;
		height:100%;
		margin:0 5% 0 4%;
		vertical-align: top;
		color:#fff;

		.footer-menu-item{
			display:inline-block;
			width:120px;
			height:100%;
			font-size:12px;
			vertical-align:middle;
			text-align:center;
			border-right:1px solid #F5F5F5;

			>a{
				color:#fff;
			}
		}

		.footer-menu-item:last-child{
			border-right:none;
		}
	}

	.about{
		display:inline-block;
		font-size:0;
		
		>ul{padding:0}

		.about-item{
			display:inline-block;
			margin-right:5px;
			font-size:14px;
			color:#F5F5F5;
			vertical-align: top;

			.code-img{
				width:80px;
			}
		}

		.about-item:last-child{
			margin-right:0;
		}
	}

	.contact{
		width:100%;
		margin-top:10px;
		color:#394146;

		.company{
			display: inline-block;
			font-size:12px;
			vertical-align: middle;
		}

		.contact-us{
			display: inline-block;
			vertical-align: middle;
			margin: 0 0 0 7%;

			.contact-us-item{
				display:inline-block;
				width: 120px;
			    height: 2px;
			    line-height: 2px;
			    border-right: 2px solid #394146;
			    text-align: center;
				font-size:12px;

			}

			.contact-us-item:last-child{
				border-right:none;
			}
		}
		
		.footer-logo{
			display:inline-block;
			vertical-align: middle;

			.logo-img{
        		width:auto;
				height:40px;
        	}
		}
		
	}
}
	

</style>