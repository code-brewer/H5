<template>
	<div class="banner-page-wap-view" @mouseover.stop>
		<div class="img-panel">
			<div class="colse" @click="bannerPage.show=false" ></div>
			<img :src="bannerPage.imgUrl ? bannerPage.imgUrl : bannerPage.defaultImgUrl" />
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var bannerPage = window.store.activityConfig.bannerPage;
			return {
				bannerPage
			}
		}
	}
</script>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.banner-page-wap-view {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		background-color: rgba(7, 7, 7, 0.4);
		z-index: 1;
		padding:px2rem(55px);
		.img-panel {
			position: relative;
			.colse {
			    position: absolute;
			    background-image: url(../../../images/ico_close.png);
			    background-size: 100%;
			    height: 20px;
			    width: 20px;
			    top: -10px;
			    right: -10px;
			}
			img {
				width: 100%;
			}
		}
	}
</style>