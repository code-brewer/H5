<template>
	<section class="prize-panel-list">
		<div class="prize-title">
			<a class="myjp" style="right: 50%;margin-right: 170px;" @click="$root.showActivityD=true">活动规则</a>
			<a class="btn" style="background: url('./l/images/prize-list-title.png')center center no-repeat;background-size: 100% 100%;">
			</a>
			<a class="myjp1" style="left: 50%;margin-left: 170px;" @click='showMyPrize'>
				我的奖品
			</a>
		</div>
		<div class="data-panel">
			<img :src="$root.activityBasePath+'/images/marquee-a.png'" alt="" class="a">
			<img :src="$root.activityBasePath+'/images/marquee-b.png'" alt="" class="b">
			<div style="width: 100%;height: 100%;background:#a3332a;"></div>
			<ul class="data-ul">
				<li v-for="list in prizeList" v-show="list.mobile">
					<p class="phone">{{list.mobile}}&nbsp;抽中了&nbsp;{{list.pname}}</p>
				</li>
			</ul>
		</div>
	</section>
	<my-prize :show.sync="show" :show-add.sync="showAdd" :gid.sync="gid">

	</my-prize>
</template>
<style lang="sass">
	.prize-panel-list {
		width: 100%;
		.prize-title {
			text-align: center;
			position: relative;
			padding-top: 60px;
			z-index: 2;
			.btn {
				display: block;
				width: 239px;
				height: 79px;
				margin: 0 auto;
				
				
			}
			.myjp {
				position: absolute;
				display: block;
				top: 0;
				color: #a3332a;
				font-size: 28px;
				padding-bottom: 0px;
				&::after {
					content: ' ';
					width: 100%;
					height: 100%;
					display: block;
					border-bottom: 2px solid #a53229;
				}
			}
			.myjp1 {
				position: absolute;
				display: block;
				top: 0;
				color: #a53229;
				font-size: 28px;
				padding-bottom: 0px;
				&::after {
					content: ' ';
					width: 100%;
					height: 100%;
					display: block;
					border-bottom: 2px solid #a53229;
				}
			}
		}
		.data-panel {
			width: 530px;
			height: 240px;
			margin: -30px auto 0px auto;
			position:relative;
			.a{
				position: absolute;
				top: -13%;
				left: 94%;
				-webkit-transform: rotate(362deg);
				transform: rotate(362deg);
			}
			.b{
				position: absolute;
				left: -12%;
				top: -14%;
				width: 35%;
			}
			.data-ul {
				width: 100%;
				list-style: none;
				height: 186px;
				overflow-y: auto;
				margin-top: -197px;
				li {
					height: 48px;
					background-repeat: no-repeat;
					width: 510px;
					margin: 8px auto 0px;
					position: relative;
					line-height: 1;
					.phone {
						font-size: 28px;
						color: #fff;
						line-height: 48px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
<script type="text/javascript">
	import myPrize from './myPrize.vue'
	import api from './../utils/serverapi.js'
	export default {
		components: {
			myPrize
		},
		props: {
			changePrize: {
				Boolean,
				default: false,
			},
			showAdd: {
				Boolean,
				default: false,
			},
			gid: {
				String,
			}
		},
		watch: {
			changePrize() {
				this.init();
			}
		},
		data() {
			return {
				show: false,
				prizeList: [
					//				{
					//			"imgurl": "http://www.soyu.cn/",  //奖品缩略图
					//			"mobile": "186****5905",   //中奖手机号码
					//			"pname": "小米平衡车"   //奖品名称
					//		}, {
					//			"imgurl": "http://www.soyu.cn/",
					//			"mobile": "186****5905",
					//			"pname": "大疆无人机"
					//		}, {
					//			"imgurl": "http://www.soyu.cn/",
					//			"mobile": "186****5905",
					//			"pname": "华为荣耀zero运动手环"
					//		}
				]

			}
		},
		ready() {
			this.init();
		},
		methods: {
			showMyPrize(){
				if(!this.$root.islogin){
                    api.netLogin(this,{},(back)=>{
                        if(back.resCode!=0){
                        this.$root.login = true;
                    }
                })}else{
					    this.show = true;
				}
			},
			init() {
				var that = this;
				// if(!that.prizeList){
				// 	that.prizeList = [];
				// }
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "132****7535",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "185****9853",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "132****3230",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_2.png",
				// 	"mobile": "186****2324",
				// 	"pname": "小米平衡车"
				// });  
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "131****2610",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "155****4019",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "132****7508",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "155****6697",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "130****2424",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "131****8484",
				// 	"pname": "话费5元"
				// });
				// that.prizeList.push({
				// 	"imgurl": "/images/marquee_8.png",
				// 	"mobile": "155****9352",
				// 	"pname": "话费5元"
				// });
				api.quePrizeDrawResult(this, {}, (back) => {
					if(back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					} else {
						that.prizeList = back.repBody;
						if(!that.prizeList) {
							that.prizeList = [];
						}
						// that.prizeList.push({
						// 	"imgurl": "/images/marquee_8.png",
						// 	"mobile": "132****7535",
						// 	"pname": "话费5元"
						// });
						// that.prizeList.push({
						// 	"imgurl": "/images/marquee_8.png",
						// 	"mobile": "185****9853",
						// 	"pname": "话费5元"
						// });
						// that.prizeList.push({
						// 	"imgurl": "/images/marquee_8.png",
						// 	"mobile": "132****3230",
						// 	"pname": "话费5元"
						// });
						// that.prizeList.push({
						// 	"imgurl": "/images/marquee_2.png",
						// 	"mobile": "186****2324",
						// 	"pname": "小米平衡车"
						// });  
						that.prizeList.push({
							"imgurl": "/images/marquee_1.png",
							"mobile": "131****2610",
							"pname": "小米手环1代'购满即送，体验资格'"
						});
						that.prizeList.push({
							"imgurl": "/images/marquee_1.png",
							"mobile": "155****4019",
							"pname": "50元大麦超级票'购满即送，体验资格'"
						});
						that.prizeList.push({
							"imgurl": "/images/marquee_1.png",
							"mobile": "132****7508",
							"pname": "30元话费充值卡'购满即送，体验资格'"
						});
						that.prizeList.push({
							"imgurl": "/images/marquee_1.png",
							"mobile": "155****6697",
							"pname": "50元大麦超级票'购满即送，体验资格'"
						});
						that.prizeList.push({
							"imgurl": "/images/marquee_1.png",
							"mobile": "130****2424",
							"pname": "50元大麦超级票'购满即送，体验资格'"
						});
						// that.prizeList.push({
						// 	"imgurl": "/images/marquee_8.png",
						// 	"mobile": "131****8484",
						// 	"pname": "话费5元"
						// });
						// that.prizeList.push({
						// 	"imgurl": "/images/marquee_8.png",
						// 	"mobile": "155****9352",
						// 	"pname": "话费5元"
						// });
					}
				});
			}
		}
	}
</script>