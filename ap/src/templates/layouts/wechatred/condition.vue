<!--<template>
	<div class="label-inline wechatred-condition">
		<span class="onse">红包设置：</span>
		<a class="btn btn-primary" @click="opModal=true">设置</a>
		<msg :show-msg.sync="showMsg" :msg="msg"></msg>
		<modal class="color-picker-modal" :show.sync="opModal" size="lg">
			<div class="modal-header">
				<a class="close" @click="opModal=false">×</a>
			</div>
			<div class="modal-panel">
				<div class="left">
					<div class="label-inline">
						<span class="name">活动金额：</span>
						<input type="number" v-model="redpackconfig.totalmoney" />
						<span> 单次活动金额不能小于1元</span>
					</div>
					<div class="label-inline">
						<span class="name">红包余额：</span>
						<input type="number" v-model="redpackconfig.minmoney" /> ~ <input type="number" v-model="redpackconfig.maxmoney" />
						<span> (最低1元，最高200元)</span>
					</div>
					<div class="label-inline">
						<span class="name">中奖概率：</span>
						<input type="number" v-model="redpackconfig.winrate" max="100" min="10" />
						<span> (中奖率最低10%)</span>
					</div>
					<div class="label-inline">
						<span class="name">活动名称：</span>
						<input type="text" v-model="redpackconfig.actname" placeholder="活动名称最长10个字" />
					</div>
					<div class="label-inline">
						<span class="name">公司名称：</span>
						<input type="text" v-model="redpackconfig.sendname" placeholder="公司名称最长15个字" />
					</div>
					<div class="label-inline">
						<span class="name">活动祝福：</span>
						<input type="text" v-model="redpackconfig.wishing" placeholder="活动祝福最长15个字" />
					</div>
					<div class="label-inline" style="align-items: flex-start;">
						<span class="name">活动备注：</span>
						<textarea v-model="redpackconfig.remark"></textarea>
					</div>
				</div>
				<div class="right">
					<div class="top">
						<div class="title-top">
							用户收到红包后的消息：
						</div>
						<p>你收到一个红包</br><span class="gray-color">2016-12-08 15:32</span> </p>
						<p>你参与<span>微信红包</span>，成功获得<span>广州易杰</span>赠送的红包。</p>
						<p class="gray-color">测试福利</p>
						<p class="gray-color">点击查看详情</p>
					</div>
					<div class="bottom">
						<div class="title-bottom">
							用户拆开红包后的消息：
						</div>
						<p>你领取一个红包</br><span class="gray-color">2016-12-08 15:32</span> </p>
						<p>你成功领取了<span>微信红包</span>发放的红包。</p>
						<p>红包金额<span>1</span>元</p>
						<p class="gray-color">微信红包</p>
						<p class="gray-color" style="margin: 0;">点击查看详情</p>
					</div>
				</div>
			</div>
			<a class="btn btn-primary sure" @click="opModal=false">确定 </a>
		</modal>
	</div>

</template>
<script>
	import Vue from 'vue'
	import Modal from '../../../components/bootstrap/Modal2.vue'
	import msg from '../../../components/web-base/loading.vue'
	export default {
		components: {
			Modal,
			msg
		},
		data() {
			var redpackconfig = window.store.configData.redpackconfig;
			return {
				redpackconfig,
				opModal: false,
				msg: '',
				showMsg: false
			}
		},
		watch: {
			'redpackconfig.totalmoney' (v) {
				if(1 > ~~v) {
					this.msg = "红包金额不能小于1";
					this.redpackconfig.totalmoney = "1";
					this.showMsg = true;
				}
			},
			'redpackconfig.minmoney' (v) {
				if(1 > ~~v || ~~v > 200 || v > this.redpackconfig.maxmoney || !/^[1-9]*[1-9][0-9]*$/.test(v)) {
					this.msg = "红包余额最低1元，最高200元且不为小数";
					this.redpackconfig.minmoney = "1";
					this.showMsg = true;
				}
			},
			'redpackconfig.maxmoney' (v) {
				if(1 > ~~v || ~~v > 200 || v < this.redpackconfig.minmoney || !/^[1-9]*[1-9][0-9]*$/.test(v)) {
					this.msg = "红包余额最低1元，最高200元且不为小数";
					this.redpackconfig.maxmoney = "10";
					this.showMsg = true;
				}
			},
			'redpackconfig.winrate' (v) {
				if(10 > ~~v || ~~v > 100 || !/^[1-9]*[1-9][0-9]*$/.test(v)) {
					console.log(22333)
					this.msg = "中奖率最低10%最高100%且不为小数";
					this.redpackconfig.winrate = "10";
					this.showMsg = true;
				}
			},
			'redpackconfig.actname' (v, o) {
				if(v.length > 10) {
					this.msg = "活动名称最长10个字";
					this.redpackconfig.actname = o;
					this.showMsg = true;
				}
			},
			'redpackconfig.sendname' (v, o) {
				if(v.length > 15) {
					this.msg = "公司名称最长15个字";
					this.redpackconfig.sendname = o;
					this.showMsg = true;
				}
			},
			'redpackconfig.wishing' (v, o) {
				if(v.length > 15) {
					this.msg = "活动祝福最长15个字";
					this.redpackconfig.wishing = o;
					this.showMsg = true;
				}
			},
		},
		ready() {
			console.dir(this)
		}
	}
</script>

<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	.wechatred-condition {
		.sure {
			margin: 0 auto 40px auto;
			display: block;
			height: 40px;
			width: 80px;
		}
		.modal-panel {
			width: 100%;
			padding: 60px 80px;
			.name {
				margin-right: 20px;
			}
			.right {
				display: inline-block;
				vertical-align: top;
				.bottom {
					padding: 20px;
					width: 310px;
					border: 1px solid #d6d6d6;
					border-top: 0;
					.title-bottom {
						position: relative;
						font-size: 12px;
						color: #419ce9;
						margin-bottom: 10px;
						&::after {
							content: ' ';
							width: 15px;
							height: 15px;
							display: block;
							position: absolute;
							background-image: url(images/file.png);
							background-size: 100%;
							top: 0;
							left: -15px;
						}
					}
				}
				p {
					color: #000000;
					font-size: 12px;
					span {
						color: #419ce9;
					}
				}
				.gray-color {
					color: #aaaaaa;
					font-size: 12px;
				}
				.top {
					padding: 20px;
					width: 310px;
					height: 170px;
					border: 1px solid #d6d6d6;
					.title-top {
						position: relative;
						margin-bottom: 10px;
						font-size: 12px;
						color: #419ce9;
						&::after {
							content: ' ';
							width: 15px;
							height: 15px;
							display: block;
							position: absolute;
							background-image: url(images/msg.png);
							background-size: 100%;
							top: 0;
							left: -15px;
						}
					}
				}
			}
			.left {
				display: inline-block;
				width: 390px;
				height: 390px;
				.label-inline {
					margin-top: 10px;
					input[type=number] {
						width: 70px;
						height: 33px;
					}
					input[type=text] {
						height: 33px;
						width: 240px;
					}
					input,
					textarea {
						border: 1px solid #D6D6D4;
					}
					textarea {
						width: 240px;
						height: 110px;
					}
				}
			}
		}
		.modal-header {
			background-color: #419ce9;
			height: 40px;
			position: relative;
			border: 0;
			.close {
				background-color: #419ce9;
				position: absolute;
				right: 10px;
				top: 10px;
				color: #fff;
				opacity: 1;
			}
		}
	}
</style>-->