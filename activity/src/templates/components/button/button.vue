<template>
	<div class="wap-button-view">
		<div class="wap-button" v-el:bg :style="{'background-color':config.bg.color,'background-image': (config.bg.imgUrl?'url('+config.bg.imgUrl+')':1),'height':config.bg.imgH,'line-height':config.bg.imgH}">
			<span class="button_text" v-el:button :style="{'font-size':config.text.fontSize,'color':config.text.color}">
			<slot></slot>
		</span>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			config: {
				type: Object,
				twoWay: true,
				default: {
					bg: {},
					text: {}
				}
			}
		}
	}
</script>