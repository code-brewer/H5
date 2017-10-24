<template>
	<div class="money-start">
		<time :show.sync="showTime"></time>
		<div class="main-panl">
			<p>(第{{$root.activity.nonum+1}}轮)</p>
			<a class="btn" @click="start">开启</a>
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
							path: '/money-line'
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
						} else {
							this.$root.gamePlaying = true;
						}
					})
				},
			}
	}
</script>
<style lang="scss">
	.money-start {
		width: 1230px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		text-align: center;
		.main-panl {
			width: 970px;
			height: 100%;
			background-image: url(../image/money-start.png);
			background-size: cover;
			background-repeat: repeat;
			margin: 0 auto;
			background-position: center;
			position: relative;
			p {
				position: absolute;
				top: 174px;
				right: 84px;
				font-size: 42px;
				color: #270b4b;
			}
			.btn {
				width: 182px;
				height: 64px;
				line-height: 64px;
				display: block;
				position: absolute;
				bottom: 15px;
				left: 50%;
				margin-left: -91px;
				font-size: 18px;
				color: white;
				background-color: #ff3b3b;
				border-radius: 5px;
				cursor: pointer;
			}
		}
	}
</style>