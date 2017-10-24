<template>
	<div class="wap-rule-link">
		<a  v-el:rule class="rule_text"  @click="ruleModal=true" :style="{'background-image':(activityConfig.success.ruleBtn?'url('+activityConfig.success.ruleBtn+')':1), 'background-size':'100% 100%'}"></a>
	</div>
	<wap-modal :show.sync="ruleModal" class="wap-rule-modal">
		<rule-text v-ref:pclose></rule-text>
	</wap-modal>
</template>

<script>
	import modal from '../modal/modal-new.vue'
	import ruleText from '../rule-text/rule-text-prize-new.vue'
	export default {
		props: {
			ruleModal: {
				type: Boolean,
				default: false
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
			this.$refs.pclose.setCloseListener(this.close);
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