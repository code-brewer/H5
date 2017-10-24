<template>
	<div class="wap-puzzle-slider">
		<div class="board-wrap">
			<p>第 <span>1</span> 关</p>
			<div class="board">
				<section class="start">
					<div class="overlay"></div>
					<div class="play"></div>
					<img :src="images[imgPointer]">
				</section>
			</div>
		</div>
		<div class="intro">
			<h3>点击开始游戏</h3>
			<h4>请在30秒内完成拼图</h4>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			// 游戏素材集合
			images: {
				type: Array,
				default: function() {
					return ['http://211.147.242.132:9008/fsd/ap/20160408/88_5b3413b6_5967_4423_912c_392038e84754.jpg', 'http://211.147.242.132:9008/fsd/ap/20160408/88_72e86062_e9cd_4c82_9ca1_1e94a0576936.jpg', 'http://211.147.242.132:9008/fsd/ap/20160408/88_6b75872c_bc91_4405_8037_2ba3198a71b6.jpg']
				}
			},

		},
		data() {
			return {
				imgPointer: 0,
			}
		}
	}
</script>

<style lang="scss" src="./puzzle-slider.scss"></style>