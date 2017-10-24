<template>
	<div class="form-group set-prize-wechatred">
		<div class="label-inline" style="margin-top: 1px;">
			<span class="onse onse-has-red">领奖门槛：</span> {{cillLeft}}
			<input type="number" style="width: 40px;" v-model="cill" v-if="showCill" />{{cillRight}}
			<question v-if="showQues">{{quseMsg}}</question>
		</div>
		<div class="label-inline">
			<span class="onse onse-has-red">活动总金额：</span>
			<input type="number" v-model="redpackconfig.totalmoney" style="width: 80px;" />
			<span style="margin-left: 10px;"> 单次活动金额不能小于1元</span>
		</div>
		<div class="label-inline">
			<span class="name onse onse-has-red">红包数量：</span>
			<input type="number" v-model="redpackconfig.size" style="width: 80px;" />
			<span style="margin-left: 10px;"> (单个红包不能小于1元)</span>
		</div>
		<div class="label-inline">
			<span class="name onse onse-has-red">中奖概率：</span>
			<input type="number" v-model="redpackconfig.winrate" max="100" min="10" style="width: 80px;" />
			<span style="margin-left: 10px;"> (中奖率最低10%)</span>
		</div>
		<div class="wechat-panel">
			<div class="left">
				<div class="form-input">
					<span class="name">活动名称：</span>
					<input type="text" v-model="redpackconfig.actname" placeholder="活动名称最长10个字" />
				</div>
				<div class="form-input">
					<span class="name">公司名称：</span>
					<input type="text" v-model="redpackconfig.sendname" placeholder="公司名称最长15个字" />
				</div>
				<div class="form-input">
					<span class="name">活动祝福：</span>
					<input type="text" v-model="redpackconfig.wishing" placeholder="活动祝福最长15个字" />
				</div>
				<div class="form-input">
					<span class="name">活动备注：</span>
					<textarea v-model="redpackconfig.remark"></textarea>
				</div>
			</div>
			<div class="right">
				<div class="top">
					<div class="title-top">
						用户收到红包后的消息：
					</div>
					<p>你收到一个红包<br><span class="gray-color">2016-12-08 15:32</span> </p>
					<p>你参与<span>微信红包</span>，成功获得<span>广州易杰</span>赠送的红包。</p>
					<p class="gray-color">测试福利</p>
					<p class="gray-color">点击查看详情</p>
				</div>
				<div class="bottom">
					<div class="title-bottom">
						用户拆开红包后的消息：
					</div>
					<p>你领取一个红包<br><span class="gray-color">2016-12-08 15:32</span> </p>
					<p>你成功领取了<span>微信红包</span>发放的红包。</p>
					<p>红包金额<span>1</span>元</p>
					<p class="gray-color">微信红包</p>
					<p class="gray-color" style="margin: 0;">点击查看详情</p>
				</div>
			</div>
		</div>
		<snackbar :show.sync="showMsg" :message="msg" action-text="知道了" ></snackbar>
	</div>

</template>
<script>
	import question from '../web-base/question'
	import snackbar from '../web-base/snackbar'
	export default {
		components: {
			question,
			snackbar
		},
		data() {
			if(!window.store.configData.redpackconfig)
			window.store.configData.redpackconfig = {
				actname: "微活动",
				sendname: "微活动",
				wishing: "微活动",
				remark: "微活动",
				totalmoney: "1",
				minmoney: "1",
				maxmoney: "10",
				winrate: "10",
				size: '1'
			}
			var configData = window.store.configData;
			var redpackconfig = window.store.configData.redpackconfig;
			var selectedList = window.store.selectList;
			return {
				configData,
				redpackconfig,
				opModal: false,
				msg: '',
				showMsg: false,
				cill: "1",
				cillLeft: '',
				cillRight: '',
				showCill: false,
				num: 1,
				count: '',
				quseMsg: '',
				showQues: false,
				selectedList
			}
		},
		events: {
			setPirzeList() {

			},
			saveSelectedList() {
				var newList = JSON.stringify(this.selectedList);
				newList = JSON.parse(newList);
				for(var i = 0; i < newList.length; i++) {
					var prizeList = newList[i].prizeList;
					for(var j = 0; j < prizeList.length; j++) {
						newList[i].prizeList[j].starttop = 0;
						var gids = prizeList[j].gids;
						for(var k = 0; k < gids.length; k++) {
							var gid = newList[i].prizeList[j].gids[k].gid;
							newList[i].prizeList[j].gids[k] = gid
						}
					}
				}
				this.configData.prizeJson = newList;
				this.configData.prizenum = "T_0";
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
			'redpackconfig.size' (v) {
				if(1 > ~~v) {
					this.msg = "红包数量不能小于1";
					this.redpackconfig.size = "1";
					this.showMsg = true;
				}
			},
			'redpackconfig.winrate' (v) {
				if(10 > ~~v || ~~v > 100 || !/^[1-9]*[1-9][0-9]*$/.test(v)) {
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
			this.selectedList.push({
				'date': "0000-00-00",
				'prizeList': [{
					"endtop": "0",
					"starttop": 0,
					"gids": [],
					"title": ''
				}]
			});
			this.configData.prizeway = "redpack";
			if(!window.store.configData.mextbody) return;
			var obj = JSON.parse(window.store.configData.mextbody);
			if(obj.threshold.indexOf("$") != -1) {
				this.showCill = true;
				this.cillRight = obj.threshold.split("$")[1];
				this.cillLeft = obj.threshold.split("$")[0];
			} else {
				this.showCill = false;
				this.cillLeft = obj.threshold;
			}
			if(~~obj.prizenum == 0) {
				this.showNum = true;
			} else {
				this.showNum = false;
				this.count = ~~obj.prizenum;
				this.num = ~~obj.prizenum;
			}
			if(obj.thresholddis.length != 0) {
				this.showQues = true;
				this.quseMsg = obj.thresholddis;
			}
		}
	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	@import '../../css/bootstrap/_mixins.scss';
	.set-prize-wechatred {
		.wechat-panel {
			width: 100%;
			margin-top: 6px;
			.name {
				margin-right: 20px;
			}
			.right {
				display: inline-block;
				vertical-align: top;
				margin-top: 10px;
				@media (max-width: $screen-lg-min) {
					.bottom {
						width: 268px!important;
					}
					.top {
						width: 268px!important;
						height: 181px!important;
					}
				}
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
							background-image: url(../../images/file.png);
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
							background-image: url(../../images/msg.png);
							background-size: 100%;
							top: 0;
							left: -15px;
						}
					}
				}
			}
			@media (max-width: $screen-lg-min) {
				.left {
					width: 260px!important;
					height: 390px!important;
					textarea {
						width: 240px!important;
						height: 155px!important;
					}
				}
			}
			.left {
				display: inline-block;
				width: 290px;
				height: 390px;
				.form-input {
					font-size: 12px;
					line-height: 1.42857;
					color: #333333;
					margin-left: 10px;
					span {
						margin: 10px 10px 10px 0;
						display: block;
					}
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
						height: 143px;
					}
				}
			}
		}
	}
</style>
