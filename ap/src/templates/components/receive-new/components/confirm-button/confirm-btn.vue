<template>
	<div class="confirm-btn__container">
		<button class="confirm-btn" 
				type="button" 
				@click="submit"
				:style="{'background-image': (activityConfig.receive.btnUrl!='' ? 'url('+activityConfig.receive.btnUrl+')' : 1)}">
				确定
		</button>
	</div>
</template>
<script>
	export default {
		components: {
		},
		props: {
			inputval: {
				default: ''
			},
			submitcb: {
				type: Function
			}
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
				activityConfig
			}
		},
		ready() {

		},
		methods: {
			submit() {
				this.submitcb()
				// let username = this.inputval.username
				// let userphone = this.inputval.userphone
				
				// if(username == '' || username.length == 0){
				// 	alert("请输入姓名")
				// 	return;
				// }

				// if(userphone.length != 11 || !(/^\d+$/.test(userphone))){
                //     alert('请输入正确的手机号码')
				// 	return;
				// }
                
				// console.log(this.inputval)
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
    $ratio: 750/320;
	@import './common.scss';
</style>