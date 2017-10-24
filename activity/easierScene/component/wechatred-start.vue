<template>
	<div class="wechatred-start">
		<time :show.sync="showTime"></time>
		<div class="main-panl">
			<a class="btn" @click="start"></a>
		</div>
	</div>
</template>
<script>
	import time from './time.vue'
	import api from '../api/index.js'
	export default {
		data() {
				return {
					showTime: false
				}
			},
			components: {
				time
			},
			watch: {
				showTime(v) {
					if(!v) {
						this.$root.router.go({
							name: 'wechatredRank',
							params: {
								id: this.$route.params.id
							}
						})
					}
				},
			},
			route: {
				data() {
					this.init();
				}
			},
			events: {
				beigin() {
					this.showTime = true;
				}
			},
			ready() {
				this.init();
			},
			methods: {
				init() {
					this.$root.activity.aid = this.$route.params.id;
					this.selectActivityByAid();
				},
				selectActivityByAid() {
					api.selectActivityByAid(this, {
						'aid': this.$root.activity.aid
					}, (back) => {
						if(back.resCode == "000000")
							this.$root.activity = back.repBody;
					})
				},
				start(v) {
					api.editActivityStauts(this, {
						'aid': this.$root.activity.aid,
						"stauts": "2"
					}, (back) => {
						if(back.resCode != "000000") {
							this.$root.loadConfig.show = true;
							this.$root.loadConfig.msg = back.resMsg;
						}
					})
				},
			}
	}
</script>
<style lang="scss">
	.wechatred-start {
		width: 1230px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		text-align: center;
		.main-panl {
			width: 970px;
			height: 100%;
			background-image: url(../image/wechatred.jpg);
			background-size: cover;
			background-repeat: repeat;
			margin: 0 auto;
			background-position: center;
			position: relative;
			.btn {
				display: block;
				position: absolute;
				bottom: 15px;
				left: 50%;
				margin-left: -91px;
				cursor: pointer;
				height: 56px;
				width: 182px;
				background-image: url(../image/start.png);
				background-size: 100%;
				background-repeat: no-repeat;
			}
		}
	}
</style>