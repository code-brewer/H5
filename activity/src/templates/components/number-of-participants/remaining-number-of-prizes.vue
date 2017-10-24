<template>
<div class="wap-remaining-number-of-prizes">
	<p class="number-countent" :style="{'color':activityConfig.atNum.text.color,'font-size': activityConfig.atNum.text.fontSize}" >
		{{activityConfig.atNum.text.valueL}} <span class="count" :style="{'color':activityConfig.atNum.num.color,'font-size': activityConfig.atNum.num.fontSize}" >{{activityConfig.atNum.num.value}}</span> {{activityConfig.atNum.text.valueR}}
	</p>

</div>
</template>

<script>
	export default {
		data(){
			var activityConfig=window.store.activityConfig;
			return {
				activityConfig,
			}
		},
		ready() {
		},
	}
</script>
