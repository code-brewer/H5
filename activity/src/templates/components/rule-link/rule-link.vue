<template>
	<div class="wap-rule-link">
		<a @click="ruleModal=true" :style="{'font-size':activityConfig.rule.fontSize,'color':activityConfig.rule.color}">{{activityConfig.rule.value}}</a>
	</div>
	<wap-modal :show.sync="ruleModal" class="wap-rule-modal">
		<rule-text></rule-text>
	</wap-modal>
</template>

<script>
	import modal from '../modal/modal.vue'
	import ruleText from '../rule-text/rule-text.vue'
	export default {
		components: {
			'wap-modal': modal,
			ruleText
		},
		data(){
			var activityConfig = window.store.activityConfig;
			return {
				ruleModal: false,
				activityConfig
			}
		}
	}
</script>


<style>
	.wap-rule-link {
		text-align: center;
	}
	.wap-rule-modal {
		color: #fff;
	}
</style>