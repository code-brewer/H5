<template>
	<div class="checkForm main">
		<div class="formCon">
			<h2>留下你的信息方便领取奖品哦！</h2>
			<!-- <p>每留下一个信息，都能获得相应贝壳币，最高可获100贝壳币哦～</p> -->
			<conch-coin-form :options="options" :forbidden-time="true"></conch-coin-form>
			<a @click="this.$router.replace({path: '/ConchCoinEditForm'})">修改资料</a>
		</div>
	</div>
</template>
<script>
	import ConchCoinForm from '../components/ConchCoinForm.vue'
	import api from '../api/index.js'

	export default {
		components: {
			ConchCoinForm
		},
		data() {
			return {
				options: {
					name: {
						value: '',
						disabled: true
					},
					mobile: {
						value: '',
						disabled: true,
						showError: false
					},
					addr: {
						value: '',
						disabled: true
					},
					babygender: {
						value: '',
						disabled: true
					},
					babybirthday: {
						value: '',
						disabled: false
					},
					job: {
						value: '',
						disabled: true
					},
					agree: {
						show: false
					},
					btn: {
						show: false
					}
				}
			}
		},
		created() {
			document.title = '我的贝壳币';
			this.$dispatch('loading');
		},
		ready() {
			api.getMyfileInfo(this, {}, (data) => {
				if (data.resCode == "0") {
					var list = data.repBody.list[0];
					for(let i in list){
						this.options[i].value = list[i];
					}
					this.$dispatch('cancelLoading');
				}
			})
		}
	}
</script>
<style lang="scss">
	.checkForm {
		padding: 20px 0 60px;
		.formCon {
			margin: 0 5%;
			padding: 0 20px 200px;
			text-align: center;
			border-radius: 15px;
			background: white;
			> h2, > p {
				color: #43a4ae;
			}
			> h2 {
				display: inline-block;
				padding: 40px 0 40px 45px;
				font-size: 34px;
				font-weight: 400;
				text-align: center;
				background: url(../images/gift-icon.png) left center no-repeat;
			}
			> p {
				position: relative;
				margin: 10px 0 20px;
				padding: 5px 0 0 0;
				font-size: 22px;
				text-align: left;
			}
			a {
				position: relative;
				display: block;
				width: 138px;
				height: 40px;
				margin: 40px auto 0;
				line-height: 40px;
				text-align: center;
				color: white;
				border-radius: 10px;
				background: #fd9a4f;
				-webkit-box-shadow: 0 0 10px rgba(253, 154, 79, .4);
				box-shadow: 0 0 10px rgba(253, 154, 79, .4);
				&:before {
					content: "";
					position: absolute;
					top: -10px;
					right: 10px;
					width: 13px;
					height: 10px;
					background: url(../images/check-form-icon1.png) no-repeat;
				}
			}
		}
	}
</style>