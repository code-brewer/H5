<template>
	<div id="header">
		<header class="navbar navbar-static-top ams-docs-nav" id="top" role="banner">
			<div class="container">
				<div class="navbar-header">
					<a href="#" class="navbar-brand">AMS DOC</a>
				</div>
				<nav role="navigation">
					<ul class="nav navbar-nav">
						<li class="active">
							<a v-link="{path:'/intro'}">起步</a>
						</li>
						<li>
							<a v-link="{path:'/component'}">基础组件</a>
						</li>
						<li>
							<a v-link="{path:'/other-component'}">平台组件</a>
						</li>
						<li>
							<a v-link="{path:'/wap-component'}">wap组件</a>
						</li>
						<li>
							<a href="#">工具类</a>
						</li>
						<li>
							 <a href="#/criterion">命名规范</a>
						</li>
						<li>
							<a href="#">Q&A</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
		<div id="main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		components: {

		},

		data() {
			return {

			}
		},

		created() {

		},

		methods: {

		}
	}
</script>
<style src="./css/bootstrap.css"></style>
<style src="./css/doc.css"></style>
<style>
	html {
		width: 100%;
		height: 100%;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
	}
	
	body {
		width: 100%;
		min-height: 100%;
	}
</style>