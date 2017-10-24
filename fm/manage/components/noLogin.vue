<template>
	<modal :show.sync="show">
		<div class="signSuccess">
			<h2>提示</h2>
			<p class="modal-text left">你还未登陆，请到饭盟<span class="orange">【我的】</span>模块处登录。</p>
			<button :bg="'orange'" @click="ok">好的</button>
		</div>
	</modal>
</template>
<script>
	import modal from './modal.vue'
	import button from './button.vue'
	export default {
		components: {
			modal,
			button
		},
		props: {
			show: {
				default: false
			},
			isopen:{
				default: true
			}
		},
		methods:{
			ok(){
				if(this.isopen){
					this.show = false;
				}else{
					window.location= 'http://www.baidu.com'
				}
			}
		}
	}
</script>