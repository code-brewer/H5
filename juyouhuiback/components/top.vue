<template>
	<h1 class="top">
			<img src="../images/logo111.jpg"> <p>聚优惠&nbsp | &nbsp后台管理系统</p>
			<slot></slot>	

	</h1>
</template>
<style lang="scss" scoped>
	.top {
		border-bottom: 1px solid #ddd;;
		font-size: 20px;
		line-height: 61px;
		position: relative;
		background-color: #fff;
		box-shadow: 1px 1px 2px #e6e2e2;
		img {
			position: absolute;
			top: 6px;
			left: 15px;
			height: 34px;

		}
		p {
			padding-left: 90px;
		}
	}
</style>
<script type="text/javascript">
	 export default {  
	 	
	 }
</script>