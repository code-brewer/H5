<template>
	<span href="javascript:;" class="edit-btn" @click="edit" v-show="show">编辑</span>
</template>
<script>
import $ from 'jquery'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		ready(){
			$(this.$el).parent().mouseover(()=>{
				this.show=true;
			}).mouseout(()=>{
				this.show=false;
			});
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
		},
		methods: {
			edit() {
				this.$dispatch('show-edit');
			}
		},
		
	}
</script>
<style lang="scss">
	.edit-btn {
		right: 0;
		top: 0;
		position: absolute;
		display: block;
		width: 40px;
		height: 20px;
		line-height: 20px;
		color: white!important;
		text-align: center;
		font-size: 12px;
		background: #1c96e3;
		z-index: 1000;
		text-decoration: none!important;
		&:hover {
			color: white!important;
			text-decoration: none!important;
		}
	}
	.hideall .edit-btn {
		display: none;	
	}
</style>