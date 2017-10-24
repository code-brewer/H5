<template>
	<wap-button :config.sync="startBtn">
		<a @click="goTo">我要砍价</a>
	</wap-button>
</template>
<script>
	export default {
		components: {
			'wap-button': require('../../../components/button/button.vue')
		},
		props: {
			dateCheck: {
				require: true,
				type: Boolean,
				default: true
			},
			endJump: {
				require: true,
				type: Boolean,
				default: false
			},
			jumpPath: {
				require: true,
				type: String,
				default: "/rank"
			}
		},
		data() {
			return {
				startBtn: window.store.activityConfig.startBtn,
				isStop: false,
			}
		},
		methods: {

			goTo(evt) {
				console.log(evt)
				if(!this.dateCheck) return;
				let starttime = new Date(this.$root.configData.starttime).getTime();
				let endtime = new Date(this.$root.configData.endtime.substr(0, 10)).getTime();
				let now = new Date().getTime();
				let msg = '';
				this.isStop = false;
				// 判断活动是否开始
				if(now < starttime) {
					this.isStop = true;
					msg = '活动还没开始！';
					
				}
				// 判断活动是否结束
				else if(now > endtime) {
					if(this.endJump) {
						this.$route.router.go({
							path: this.jumpPath
						});
					}
					this.isStop = true;
					msg = '活动已结束！';
					
				}
				if(this.isStop) {
					evt.preventDefault();
					this.$dispatch('loading', {
						text: msg,
						icon: false,
						duration: 1500,
						name: 'startbtn'
					});
					return;
				}
				this.$route.router.go({
					path: 'game-one'
				});
			}
		}
	}
</script>