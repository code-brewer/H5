<template>
	<div class="banner-page-wap-view">
		<div class="img-panel">
			<img :src="bannerPage.imgUrl" />
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				bannerPage:{imgUrl:activityBasePath+"/images/banner1.jpg"}
			}
		}
	}
</script>
<style lang="scss">
	.banner-page-wap-view {
		width: 100%;
		background-color: rgba(7, 7, 7, 0.4);
		.img-panel {
			width: 100%;
			img {
				width: 100%;
				display: block;
			}
		}
	}
</style>