<template>
	<div class="wap-rule-link">
		<a @click="ruleModal=true" :style="{'background-image':(activityConfig.rule.imgUrl?'url('+activityConfig.rule.imgUrl+')':1),'background-size':'100% 100%'}"></a>
	</div>
	<wap-modal :show.sync="ruleModal" class="wap-rule-modal">
		<rule-text v-ref:close></rule-text>
	</wap-modal>
</template>

<script>
	import modal from '../modal/modal-new.vue'
	import ruleText from '../rule-text/rule-text-new.vue'
	export default {
		props: {
			ruleModal: {
				type: Boolean,
				default: 'false'
			}
		},
		components: {
			'wap-modal': modal,
			ruleText
		},
		data(){
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig
			}
		},
		methods:{
			close(){
				this.ruleModal = false;
			}
		},
		ready(){
			this.$refs.close.setCloseListener(this.close);
		}
	}
</script>


<style  lang="scss" scoped>
	.wap-rule-link {
		text-align: center;
	}
	.wap-rule-modal {
		color: #fff;
	}
</style>