<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel myprize" style="background: #131620;border: 2px solid #3bbfe7;">
			<div class="title">
				我的奖品
			</div>
			<ul class="data-ul">
				<li v-for="list in prizeList">
					<img class="prize-img" :src="$root.activityBasePath+list.imgurl">
					<div style="width: 230px;display: inline-block;">
						<p class="phone">{{!!list.mobile?list.mobile:''}}</p>
						<p class="prize-name">{{list.pname}}</p>
					</div>
					<a class="btn" @click="goPrize(list.gid,list.mobile)" :style="!list.mobile?'background:#489eff; border-radius: 6px;':'background:#888888; border-radius: 6px;'">
						{{!list.mobile?'去领奖':'已领取'}}
					</a>
					<!-- <img class="prize-img" :src="$root.activityBasePath+list.imgurl"> -->

				</li>
			</ul>
			<img class="close" :src="$root.activityBasePath+'/images/sp-close.png'" @click="show=false" />
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel.myprize {
		width: 560px;
		height: auto;
		padding-bottom: 10px;
		.close {
			position: absolute;
			top: 30px;
			left: 50%;
			margin-left: 190px;
		}
		.title {
			margin: 0 auto;
			font-size: 38.84px;
			line-height: 3;
			color: #fff;
			text-align: center;
			text-shadow: 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000;
		}
		.data-ul {
			width: 100%;
			list-style: none;
			min-height: 180px;
			overflow-y: auto;
			color: #fff;
			li {
				height: 118px;
				background-repeat: no-repeat!important;
				width: 510px;
				margin: 40px auto 0px;
				position: relative;
				line-height: 1;
				.phone {
					font-size: 35px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					
				}
				.prize-name {
					font-size: 30px;
					display: -webkit-box;
					width: 230px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.prize-img {
					width: 110px;
					vertical-align: top;
					margin-top: -15px;
					display: inline-block;
				}
				.btn {
					vertical-align: top;
					display: inline-block;
					width: 140px;
					height: 60px;
					text-align: center;
					background-repeat: no-repeat !important;
					background-size: 140px 60px!important;
					font-size: 26px;
					line-height: 60px;
					color: white;
				}
			}
		}
	}
</style>
<script>
	import modal from './../../../src/components/Modal.vue'
	import api from './../utils/serverapi.js'
	export default {
		components: {
			modal
		},
		props: {
			show: {
				Boolean,
				default: false,
			},
			showAdd: {
				Boolean,
				default: false,
			},
			gid: {
				String,
				default: "",
			}
		},
		watch: {
			show(value) {
				if(value) this.init();
			},
		},
		data() {
			return {
				prizeList: [
					// {
					// 	"gid":1,  //奖品id
					// 	"imgurl": "http://v.soyu.cn/fsd/ap/20160921/88_2342b904_fc81_4ddb_b5df_59011cc2788e.jpg",  //奖品缩略图
					// 	"mobile": "186****5905",   //榜单奖品手机号码，没有表示未领取
					// 	"pname": "小米平衡车"   //奖品名称
					// }, {
					// 	"gid":1,  //奖品id
					// 	"imgurl": "http://v.soyu.cn/fsd/ap/20160921/88_2342b904_fc81_4ddb_b5df_59011cc2788e.jpg",
					// 	"pname": "大疆无人机"
					// }
				]
			}
		},
		methods: {
			init() {
				var that = this;
				api.queMyPrizeDrawResult(this, {}, (back) => {
					if(back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					} else {
						that.prizeList = back.repBody;
					}
				});
			},
			goPrize(gid, flag) {
				if(!flag) {
					this.show = false;
					this.showAdd = true;
					this.gid = gid;
				}
			}
		}
	}
</script>