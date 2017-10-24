<template>
	<div class="goTop" @click = "clickGoTop">
		<img src="../images/goTop.png">
	</div>
</template>
<script type="text/javascript">
	 export default {  
	 	methods : { 
	 		clickGoTop () {
	 			document.body.scrollTop = 0;
	 		},
	 	}
	 }
</script>
<style lang="scss" scoped>
	.goTop {
		position: fixed;
		width: 80px;
		height: 80px;
		border-radius: 40px;
		background-color: #c0c0c0;
		bottom: 130px;
		right: 30px;
		z-index: 99;
		border: 1px solid #bbb;
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -17px;
			margin-left: -19px;
		}

	}
</style>