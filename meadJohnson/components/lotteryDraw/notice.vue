<template>
	<modal :show.sync="show" :bg="false">
		<div class="faile-txt">
			<h2>{{title}}</h2>
			<div class="con">
				<p>{{{text}}}</p>
				<btn @click="link('/bbm/index1.jsp#!/newSignIn/plan')">回到首页</btn>
			</div>
			<!-- <a href="javascript:;" class="close" @click="show = false"></a> -->
		</div>
	</modal>
</template>
<script>
	import Modal from '../Modal.vue'
	import btn from '../btn.vue'
	export default {
		components: {
			Modal,
			btn
		},
		props:{
			show: {
				default: false
			},
			text: {
				default: ''
			},
			title: {
				default: '温馨提示'
			}
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
			}
		},
		methods: {
        link(path) {
            window.location.href = path;
        },}
	}
</script>
<style lang="scss" scoped>
	.faile-txt {
		.con {
			height: 250px;
			padding: 0 30px;
			border-radius: 0 0 15px 15px;
			overflow-y: auto;
			padding-top: 50px;
    		box-sizing: border-box;
    		text-align: center;
    		background: white;
		}
		h2 {
			padding: 20px 0;
			font-size: 30px;
			color: white;
			font-weight: 400;
			text-align: center;
			border-radius: 15px 15px 0 0;
			background: #43a4ae;
		}
		p {
			padding-bottom: 40px;
			font-size: 36px;
		}
		.close {
			background: url(../../images/member-rule-close.png) no-repeat;
		}
	}
</style>