<template>
	<div class="set-up-wrap">
		<plan-head></plan-head>
		<div class="con">
			<div class="space"></div>
			<div class="set-up">
				<p>晨起打卡21天计划 第{{day}}天</p>
				<p>时间：05:00－10:00</p>
				<p>提醒： {{text}}<span class="on-off" :class="isOn ? 'on' : 'off'" @click="isOn = !isOn"><span class="text"></span><label><i class="line"></i></label></span></p>
				<ul class="clearfix" v-show="isOn">
					<li v-for="item in 5" :class="{active: active[$index]}" @click="change(item)">当天{{$index+5}}:00</li>
				</ul>
				<p class="after" v-show="isOn">{{surplusTime}}</p>
			</div>
			<div class="plan-icon"></div>
		</div>
		<snackbar :show-snack-bar.sync="snackbarShow" :text="snackbarText"></snackbar>
	</div>
</template>
<script>
	import planHead from '../../components/signIn/planHead.vue'
	import api from '../../api/index1.js'
	import snackbar from '../../components/snackbar.vue'
	export default {
		components: {
			planHead,
			snackbar
		},
		data() {
			return {
				day: Object.freeze(this.$route.params.day),
				isOn: false,
				active: [!1, !1, !1, !1, !1],
				text: '',
				snackbarShow: false,
				snackbarText: '',
				sendStatus: '', //设置状态
				surplusTime: '' //离下次打卡的剩余时间
			}
		},
		created() {
			this.getSendStatus();
			let surplusTime = window.localStorage.getItem('surplusTime');
			this.surplusTime = surplusTime || '';
		},
		watch: {
			isOn(val) {
				if (!val) {
					this.text = '不提醒';
					this.sendSSAddMod();
				}
			}
		},
		methods: {
			/**
			 * 获取用户推送时间
			 */
			getSendStatus() {
				api.getSendStatus(this, {}, back => {
					if (back.resCode === '0' && back.repBody.list) {
						var status = back.repBody.list[0].sendstatus;
						this.isOn = !!(+status);
						if (status === '0') {
							this.text = '不提醒';
						} else {
							this.text = '当天' + ((+status) + 4) + ":00提醒";
							this.active.$set((+status) - 1, !0);
						}
					} else {
						this.text = '不提醒';
					}
				})
			},
			/**
			 * 设置用户推送时间
			 */
			sendSSAddMod() {
				api.sendSSAddMod(this, {sendStatus: this.isOn ? this.sendStatus : '0'}, back => {
					if (back.resCode === '0') {
						this.snackbarShow = true;
						this.snackbarText = '设置成功';
					}
				})
			},

			change(index) {
				this.active.forEach((value, i)=> {
					this.active.$set(i ,i === index ? !0 : !1)
				})
				this.text = '当天' + (index + 5) + ":00提醒";
				this.sendStatus = index + 1;
				this.sendSSAddMod();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-up-wrap {
		height: 100%;
		background: #82ddf9;
		.con {
			position: relative;
			padding-top: 40px;
			background: #f3f3f3;
			.plan-icon {
				position: absolute;
				top: 50px;
				left: 25px;
				width: 135px;
				height: 105px;
				background: url(../../images/signIn/icon1.png) no-repeat -294px 0;
			}
			.space {
				height: 80px;
				background: white;
			}
			.set-up {
				padding: 40px;
				font-size: 30px;
				background: #82ddf9;
				p {
					position: relative;
					padding: 10px 0 10px 30px;
					color: #3e86af;
				}
				.after {
					color: white;
					padding: 20px;
					text-align: center;
				}
				.on-off {
					position: absolute;
					top: 50%;
					left: 330px;
					width: 90px;
					height: 30px;
					margin-top: -17px;
					border-radius: 15px;
					background: linear-gradient(top, #339ee3 10%, #50b3ea , #339ee3 90%);
					&.off {
						background: linear-gradient(top, #aeaeae 10%, #ddd , #aeaeae 90%);
						.text:after {
							content: "OFF";
							right: 14px;
						}
						label {
							left: 1px;
						}
					}
					&.on {
						.text:after {
							content: "ON";
							left: 14px;
						}
						label {
							right: 1px;
						}
					}
					.text {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						&:after {
							position: absolute;
							top: 0;
							font-size: 24px;
							line-height: 30px;
							color: white;
							opacity: .8;
							font-weight: 700;
							text-shadow: 0 0 5px white;
						}
					}
					label {
						position: absolute;
						top: 1px;
						width: 28px;
						height: 28px;
						border-radius: 50%;
						transition: all .3s linear;
						background: linear-gradient(top, #fdfdfd, #ddd);
						.line {
							position: absolute;
							top: 6px;
							left: 50%;
							width: 1px;
							height: 16px;
							background: #dedede;
							&:before, &:after {
								content: '';
								position: absolute;
								top: 0;
								width: 1px;
								height: 16px;
								background: #dedede;
							}
							&:before {
								left: -5px;
							}
							&:after {
								right: -5px;
							}
						}
					}
				}
				li {
					float: left;
					width: 155px;
					height: 65px;
					margin: 20px 40px 20px 0;
					line-height: 65px;
					text-align: center;
					color: white;
					border-radius: 8px;
					background: #aeaeae;
					box-shadow: 0 3px 10px rgba(0, 0, 0, .5);
					&:nth-child(3) {
						margin-right: 0;
					}
					&.active {
						background: #ff9946;
					}
					&:active {
						box-shadow: none;
					}
				}
			}
		}
	}
</style>