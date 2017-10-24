<template>
	<!-- 模板列表组件 -->
	<div class="model-list-view-contaier">
		<!-- 平铺 -->
		<div v-if="viewModel == 'horizontal'" class="model-list-view-list horizontal">
			<ul>
				<li class='model-list-view-item' v-for="(index, list) in lists">
					<div class="model-list-view-item-box">
						<div class="box-top">
							<img class="img" :src="list.imgurl">
							<section class="box-top-cover">
								<div class="cover-cotent">
									<div class="content-left" @click="edit(list)">
										<i class="bgimg"></i>
										<p class="content-title">就你了</p>
									</div>
									<!--<div class="content-right">
                                        <i class="bgimg"></i>
                                        <p class="content-title">预览</p>
                                    </div>-->
								</div>
							</section>
						</div>
						<div class="box-bottom">
							<dl>
								<dt class="bottom-title">{{list.title}}</dt>
							</dl>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<!-- 垂直 -->
		<div v-if="viewModel == 'vertical'" class="model-list-view-list vertical">
			<ul>
				<li class='model-list-view-item' v-for="(index, list) in lists">
					<div class="model-list-view-item-box">
						<div class="box-top">
							<img class="img" :src="list.url.indexOf(';')!=-1?list.url.split(';')[0]:list.url">
							<section class="box-top-cover">
								<div class="cover-cotent">
									<!--<div class="content-left">
                                        <i class="bgimg"></i>
                                        <p class="content-title">预览</p>
                                    </div>-->
									<div class="content-right" @click="edit(list)">
										<i class="bgimg"></i>
										<p class="content-title">就你了</p>
									</div>
								</div>
							</section>
						</div>
						<div class="box-bottom">
							<dl>
								<dt class="bottom-title">{{list.title}}</dt>
							</dl>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<pager :pagenum.sync="selectModelsData.pageNum" :pagesize="selectModelsData.pageSize" :total.sync="selectModelsData.total"></pager>
	</div>
</template>
<script>
	import api from './../../api/index.js'
	import Pager from '../web-base/Pager'

	export default {
		components: {
			Pager
		},
		props: {
			//模板列表
			lists: {
				type: Object,
				default: function() {
					return [
						// {
						//     imgurl: 'http://211.147.242.132:9008/fsd/ap/20160511/88_c3cde5ca_9686_4515_881c_4e1d0d513c21.png', //图片地址
						//     title: '我要做土豪' //模板主题
						// }, {
						//     imgurl: 'http://211.147.242.132:9008/fsd/ap/20160511/88_c3cde5ca_9686_4515_881c_4e1d0d513c21.png',
						//     title: '我要做土豪'
						// }, {
						//     imgurl: 'http://211.147.242.132:9008/fsd/ap/20160511/88_c3cde5ca_9686_4515_881c_4e1d0d513c21.png',
						//     title: '我要做土豪'
						// }, {
						//     imgurl: 'http://211.147.242.132:9008/fsd/ap/20160511/88_c3cde5ca_9686_4515_881c_4e1d0d513c21.png',
						//     title: '我要做土豪'
						// }, {
						//     imgurl: 'http://211.147.242.132:9008/fsd/ap/20160511/88_c3cde5ca_9686_4515_881c_4e1d0d513c21.png',
						//     title: '我要做土豪'
						// }, {
						//     imgurl: 'http://211.147.242.132:9008/fsd/ap/20160511/88_c3cde5ca_9686_4515_881c_4e1d0d513c21.png',
						//     title: '我要做土豪'
						// }, 
					]
				}
			},

			//模板显示方式
			viewModel: {
				type: String,
				default: 'horizontal'
			},

			//选中的形式
			selectedType: {
				type: String,
				default: ''
			},

			//选中的主题
			selectedMotive: {
				type: String,
				default: ''
			},

			//筛选方式
			sortModel: {
				type: String,
				default: '新'
			}
		},

		data() {
			return {
				//查询模板列表参数
				selectModelsData: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
					types: '',
					motive: '',
					flag: ''
				}
			}
		},

		ready() {
			this.selectModelsList();
		},

		watch: {
			selectedType(val) {
				this.selectModelsData.types = val;
				this.selectModelsList();
				this.selectModelsData.pageNum = 1;
			},
			selectedMotive(val) {
				this.selectModelsData.motive = val;
				this.selectModelsList();
				this.selectModelsData.pageNum = 1;
			},
			sortModel(val) {
				this.selectModelsData.flag = val;
				this.selectModelsList();
				this.selectModelsData.pageNum = 1;
			},
			'selectModelsData.pageNum' (val) {
				this.selectModelsList()
			}
		},
		methods: {
			selectModelsList() {
				api.selectModelsList(this, this.selectModelsData, (back) => {
					if(back.resCode === "0") {
						this.lists = back.repBody.list;
						this.selectModelsData.total = back.repBody.total;
					}
				})
			},
			edit(list) {
				var pname = window.location.pathname.replace("template", "activity");
				var href = window.location.origin + pname + "?mid=" + list.mid +'&jspath='+ list.jspath + "#!/";
				window.open(href);
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.model-list-view-contaier {
		width: 100%;
		.model-list-view-item-box {
			overflow: hidden;
			box-shadow: 0 5px 20px rgba(0, 0, 0, .2);
			background: #fff;
			width: 100%;
		}
		.model-list-view-list {
			margin: -10px;
			.model-list-view-item-box {
				position: relative;
				.box-top {
					position: relative;
					height: 100%;
					//height:254px;
					.img {
						position: absolute;
						left: 50%;
						top: 0;
						transform: translate(-50%, 0);
						-ms-transform: translate(-50%, 0);
						-webkit-transform: translate(-50%, 0);
						-moz-transform: translate(-50%, 0);
						-o-transform: translate(-50%, 0);
					}
				}
				.box-bottom {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					line-height: 50px;
					text-align: center;
					background: #fff;
					dl {
						width: 100%;
						margin: 0;
						text-align: center;
					}
				}
			}
		}
		// 平铺
		.model-list-view-list.horizontal {
			font-size: 0;
			>ul {
				padding: 0;
				width: 100%;
			}
			.model-list-view-item {
				display: inline-block;
				margin-bottom: 20px;
				font-size: 12px;
				padding: 10px;
				.model-list-view-item-box {
					background: #fff;
					width: 100%;
					position: relative;
					.box-top .img {
						width: auto;
						height: 100%;
					}
				}
				@media (max-width: $screen-lg-min) {
					width: 190px;
					.model-list-view-item-box {
						height: 340px;
					}
					.box-bottom {
						.bottom-title {
							font-size: 16px;
							line-height: 38px;
						}
					}
				}
				@media (min-width: $screen-lg-min) {
					width: 250px;
					.model-list-view-item-box {
						height: 444px;
					}
					.box-bottom {
						.bottom-title {
							font-size: 16px;
							line-height: 50px;
						}
					}
				}
			}
		}
		// 垂直
		.model-list-view-list.vertical {
			font-size: 0;
			margin: 0;
			>ul {
				padding: 0;
				margin: 0;
				width: 100%;
			}
			.model-list-view-item {
				display: inline-block;
				margin-bottom: 10px;
				font-size: 12px;
				padding-bottom: 10px;
				&:nth-child(odd) {
					margin-right: 20px;
				}
				.model-list-view-item-box {
					.box-top .img {
						width: 100%;
						height: auto;
					}
				}
				@media (max-width: $screen-lg-min) {
					width: 455px;
					.model-list-view-item-box {
						height: 226px;
					}
					.box-bottom {
						height: 38px;
						.bottom-title {
							font-size: 16px;
							line-height: 38px;
						}
						.bottom-text {
							font-size: 12px;
							line-height: 20px;
						}
					}
				}
				@media (min-width: $screen-lg-min) {
					width: 605px;
					.model-list-view-item-box {
						height: 300px;
					}
					.box-bottom {
						height: 50px;
						.bottom-title {
							font-size: 16px;
							line-height: 50px;
						}
						.bottom-text {
							font-size: 12px;
							line-height: 20px;
						}
					}
				}
			}
		}
		.model-list-view-item-box:hover {
			.box-top-cover {
				display: block;
			}
		}
		// 遮罩层
		.box-top-cover {
			display: none;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.4);
			@media (max-width: $screen-lg-min) {
				bottom: 38px;
			}
			@media (min-width: $screen-lg-min) {
				bottom: 50px;
			}
			.cover-cotent {
				position: absolute;
				top: 50%;
				left: 0;
				transform: translate(0, -50%);
				-ms-transform: translate(0, -50%);
				-moz-transform: translate(0, -50%);
				-webkit-transform: translate(0, -50%);
				-o-transform: translate(0, -50%);
				width: 100%;
				height: 80px;
				color: #fff;
				text-align: center;
				.content-left,
				.content-right {
					display: inline-block;
					width: 66px;
					height: 100%;
					vertical-align: middle;
					cursor: pointer;
					.bgimg {
						display: block;
						margin: 0 auto;
						width: 50px;
						height: 50px;
					}
					.content-title {
						line-height: 30px;
					}
				}
				.content-left {
					/*margin-right: 20px;*/
					.bgimg {
						background: url(../../assets/activity-list-viewbg.png) 0 0 no-repeat;
					}
				}
				.content-right {
					.bgimg {
						background: url(../../assets/activity-list-viewbg.png) 0 -50px no-repeat;
					}
				}
			}
		}
	}
</style>