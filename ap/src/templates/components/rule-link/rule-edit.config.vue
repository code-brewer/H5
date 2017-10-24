<template>
	<modal :show.sync="editShow" size="md" >
		<div class="wap-edit">
			<div class="modal-panel">
			    <div class="title">编辑文字</div>
					<div class="close" @click="editShow=false">X</div>
						<rule-edit-title></rule-edit-title>
						<rule-edit-con></rule-edit-con>
				</div>
			</div>

		</div>
	</modal>
</template>

<script>
	import ruleEditTitle from  './rule-edit-title.config.vue'
	import ruleEditCon from  './rule-edit-con.config.vue'
	import modal from '../../../components/bootstrap/Modal.vue'
	export default {
		components:{
			ruleEditTitle,
			ruleEditCon,
			modal
		},
		props: {
			editShow: {
				type: Boolean,
				default: false
			}
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
			console.log(this.editShow+'------------editShow');
			
		},
		watch:{
			
		},
		methods:{
			
		},
		data(){
			var activityConfig=window.store.activityConfig;
			return{
				
			}
		}
	}
</script>


<style>
	div.wap-edit {
		text-align: center;

	}
</style>
