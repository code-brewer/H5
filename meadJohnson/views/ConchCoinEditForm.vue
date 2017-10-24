<template>
	<div class="editForm main">
		<div class="formCon">
			<h2>留下你的信息方便领取奖品哦！</h2>
			<!-- <p>每留下一个信息，都能获得相应贝壳币，最高可获100贝壳币哦～</p> -->
			<conch-coin-form :options="options" :show-place-holder="true"></conch-coin-form>
		</div>
		<notice :show.sync="notice.show" :text="notice.text"></notice>
		<!-- <load :show="isLoad"></load> -->
	</div>
</template>
<script>
	import ConchCoinForm from '../components/ConchCoinForm.vue'
	import api from '../api/index.js'
	import notice from '../components/lotteryDraw/notice.vue'

	export default {
		components: {
			ConchCoinForm,
			notice
		},
		data() {
			return {
				options: {
					name: {
						value: '',
						disabled: false
					},
					mobile: {
						value: '',
						disabled: false,
						showError: false
					},
					addr: {
						value: '',
						disabled: false
					},
					babygender: {
						value: '1',
						disabled: false
					},
					babybirthday: {
						value: '',
						disabled: false
					},
					job: {
						value: '',
						disabled: false
					},
					agree: {
						checked: true,
						show: true
					},
					btn: {
						show: true
					}
				},
				notice: {
					show: false,
					text: ''
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
					this.$broadcast('checkActive');
					this.$dispatch('cancelLoading');
				}
			})
		},
		events: {
			updateMyfile(options) {
				this.$dispatch('loading');
				api.updateMyfile(this, options, (data) => {
					if (data.resCode == "0") {
						this.$dispatch('cancelLoading');
						this.$router.replace({path: '/ConchCoinCheckForm'})
					} else if (data.resCode == "1") {
						this.notice.show = true;
		        		this.notice.text = '矮油！您今天赚的贝壳币都装不下啦（每日上限300贝壳币），明天再来玩呗~';
					}
				})
			}
		},
		watch: {
			'notice.show'(val) {
				if (!val) {
					this.$dispatch('cancelLoading');
					this.$router.replace({path: '/ConchCoinCheckForm'})
				}
			}
		}
	}
</script>
<style lang="scss">
	.editForm {
		position: relative;
		padding: 20px 0 60px;
		.formCon {
			margin: 0 5%;
			padding: 0 20px 100px;
			text-align: center;
			border-radius: 15px;
			background: white;
			> h2, > p {
				text-align: center;
				color: #43a4ae;
			}
			> h2 {
				display: inline-block;
				padding-left: 45px;
				padding: 40px 0 40px 45px;
				font-size: 34px;
				font-weight: 400;
				background: url(../images/gift-icon.png) left center no-repeat;
			}
			> p {
				margin: 10px 0 20px;
				padding: 5px 0 0 0;
				font-size: 22px;
			}
		}
	}
</style>