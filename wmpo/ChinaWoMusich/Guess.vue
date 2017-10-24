<template>
	<div class="app-view view-activity" style="background:url(g/images/game-bg.jpg) center center; background-size: auto 100%;">
		<timer :state.sync="timerState" :duration="60" style="background:url(f/images/sp-time-bg.png) center center no-repeat; background-size: auto 100%;"></timer>
		<div class="logo">
			<img :src="'f/images/sp-logo.png'">
		</div>
		<div class="question-list">
			<div class="title">
				{{selectItem + 1}}、{{newItem.question}}
			</div>
			<ul>
				<li v-for="item in newItem.options">
					<div class="name">{{item.title}}</div>
					<div class="check-box">
						<checkbox :value="item.title" :checked.sycn="item.select"></checkbox>
					</div>
				</li>
			</ul>
		</div>
		<modal :show.sync="modalConfig.show" :bg="false" :backdrop="false">
			<div class="success-view">
				<div class="box" style="background: #131620; border: 2px solid #3bbfe7;">
					<p class="title">提示</p>
					<div class="img-panel">
						<img :src="modalConfig.imgUrl">
					</div>
					<div class="btn-panel">
						<a class="blue" v-if="modalConfig.state==0" @click="isLogin">去抽奖</a>
						<a class="blue" v-if="modalConfig.state!=0" v-link="{path:'home'}">不服再战</a>
						<a class="yellow" @click="getAnswer()" v-if="modalConfig.state!=0">查看答案</a>
					</div>
				</div>
			</div>
		</modal>
	</div>
</template>
<script>
	import timer from './components/timer/timer.vue'
	import checkbox from './components/checkbox.vue'
	import modal from './../../src/components/Modal.vue'
	import sapi from './utils/serverapi.js'
	import urlUtil from './utils/url.js'
	import {
		router
	} from './index'
	export default {
		components: {
			timer,
			checkbox,
			modal
		},
		data() {
			return {
				modalConfig: {
					state: 0,
					show: false,
					imgUrl: ''
				},
				selectItem: 0,
				list: [],
				newItem: {
					question: '',
					options: [{
						'title': "林宥嘉",
						'select': false
					}, {
						'title': "杨宗纬",
						'select': false
					}, {
						'title': "李克勤",
						'select': false
					}]
				},
				listall: [{
					"question": "“帮我消消黑眼圈”是哪位歌手？",
					"options": [{
						'title': "林宥嘉",
						'select': false
					}, {
						'title': "杨宗纬",
						'select': false
					}, {
						'title': "李克勤",
						'select': false
					}],
					"answer": 1,
				}, {
					"question": "“铁皮人”唱了什么歌曲？",
					"options": [{
						'title': "《海阔天空》",
						'select': false
					}, {
						'title': "《慢慢》",
						'select': false
					}, {
						'title': "《成全》",
						'select': false
					}],
					"answer": 2,
				}, {
					"question": "觉得周杰伦是什么?",
					"options": [{
						'title': "小公举",
						'select': false
					}, {
						'title': "大高冷",
						'select': false
					}, {
						'title': "实力派",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "“进击的女帝”是哪位歌手？",
					"options": [{
						'title': "谭维维",
						'select': false
					}, {
						'title': "纪敏佳",
						'select': false
					}, {
						'title': "张碧晨",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "下面哪一位不是猜评团成员？",
					"options": [{
						'title': "大张伟",
						'select': false
					}, {
						'title': "ELLA",
						'select': false
					}, {
						'title': "尚雯婕",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "猜评团大串烧出场时演唱了哪首歌曲？",
					"options": [{
						'title': "《失恋阵线联盟》",
						'select': false
					}, {
						'title': "《你是我的眼》",
						'select': false
					}, {
						'title': "《圣诞结》",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "“猫黛丽·赫本”演唱了哪首歌曲？",
					"options": [{
						'title': "《舞娘》",
						'select': false
					}, {
						'title': "《可惜没如果》",
						'select': false
					}, {
						'title': "《梦一场》",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "“圣诞老人不在家的驯鹿”演唱了哪首歌曲？",
					"options": [{
						'title': "《圣诞结》",
						'select': false
					}, {
						'title': "《最长的电影》",
						'select': false
					}, {
						'title': "《舞娘》",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "“狐狸爸爸”演唱过哪首歌曲？",
					"options": [{
						'title': "《你把我灌醉》",
						'select': false
					}, {
						'title': "《安静》",
						'select': false
					}, {
						'title': "《味道》",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "“不和陌生人说话的狐狸爸爸”是哪位歌手？",
					"options": [{
						'title': "许志安",
						'select': false
					}, {
						'title': "陈晓东",
						'select': false
					}, {
						'title': "巫启贤",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "“爱嗑瓜子的猫”唱过哪首歌曲？",
					"options": [{
						'title': "《偏偏喜欢你》",
						'select': false
					}, {
						'title': "《爱情电影》",
						'select': false
					}, {
						'title': "《情人》",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "以下哪位歌手演唱了《偏偏喜欢你》？",
					"options": [{
						'title': "尖耳朵的阿凡达妹妹",
						'select': false
					}, {
						'title': "爱嗑瓜子的猫",
						'select': false
					}, {
						'title': "帮我消消黑眼圈",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "“童话里不是骗人的”演唱了哪首歌曲？",
					"options": [{
						'title': "《爱情电影》",
						'select': false
					}, {
						'title': "《你是我的眼》",
						'select': false
					}, {
						'title': "《爱我别走》",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "《搁浅》是哪位蒙面歌手演唱的？",
					"options": [{
						'title': "一闪一闪亮晶晶的钻石女士",
						'select': false
					}, {
						'title': "我可不是什么幺蛾子",
						'select': false
					}, {
						'title': "童话里不是骗人的",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "“请叫我斗牛士”演唱了哪首歌曲？",
					"options": [{
						'title': "《她说》",
						'select': false
					}, {
						'title': "《是否》",
						'select': false
					}, {
						'title': "《演员》",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "“帮我消消黑眼圈”演唱了哪首歌曲？",
					"options": [{
						'title': "《海阔天空》",
						'select': false
					}, {
						'title': "《情人》",
						'select': false
					}, {
						'title': "《成全》",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "《演员》是哪位蒙面歌手演唱的？",
					"options": [{
						'title': "不给糖就捣蛋的暴走萝莉",
						'select': false
					}, {
						'title': "圣诞老人不在家的驯鹿",
						'select': false
					}, {
						'title': "爱嗑瓜子的猫",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "哪首歌曲不是“哎呀你是从哪儿冒出来的9号”演唱的？",
					"options": [{
						'title': "《好男人》",
						'select': false
					}, {
						'title': "《我是真的爱你》",
						'select': false
					}, {
						'title': "《太傻》",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "《情人》是由哪位蒙面歌手演唱的？",
					"options": [{
						'title': "圣诞老人不在家的驯鹿",
						'select': false
					}, {
						'title': "尖耳朵的阿凡达妹妹",
						'select': false
					}, {
						'title': "进击的女帝",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "哪句是蒙面歌手演唱的《滚滚红尘》中的歌词？",
					"options": [{
						'title': "当你有一天对我说，我一样会在这里",
						'select': false
					}, {
						'title': "放弃的快乐都实现，难过都摧毁、",
						'select': false
					}, {
						'title': "于是不愿走的你，要告别已不见的我",
						'select': false
					}],
					"answer": 3
				}],
				timerState: '',
			}
		},
		watch: {
			timerState(val) {
				if(val == 'end') {
					this.modalConfig.state = 2;
					this.modalConfig.imgUrl = "g/images/time-out.png";
					this.modalConfig.show = true;
				}
			},
		},
		created() {
			var po = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
			var newObj = JSON.parse(JSON.stringify(this.listall));
			for(var i = 0; i < 5; i++) {
				var pos = Math.floor(Math.random() * po.length);
				if(pos == po.length) {
					pos = 0
				};
				this.list.push(newObj[pos]);
				po.$remove(po[pos]);
			};
			this.copyItem();
		},
		ready() {
			this.timerState = "start";
		},
		events: {
			checked(v, check) {
				if(v == this.list[this.selectItem].options[this.list[this.selectItem].answer - 1].title) {
					setTimeout(() => {
						if(this.selectItem + 1 == this.list.length) {
							console.log("挑战成功")
							this.modalConfig.state = 0;
							this.modalConfig.imgUrl = "g/images/success.png";
							this.modalConfig.show = true;
							this.timerState = "setEnd";
						} else {
							this.selectItem += 1;
							this.copyItem();
						}
					}, 300)
				} else {
					setTimeout(() => {
						console.log("挑战失败");
						this.modalConfig.state = 1;
						this.modalConfig.imgUrl = "g/images/fail.png";
						this.modalConfig.show = true;
						this.timerState = "setEnd";
					}, 300)
				}
			}
		},
		methods: {
			copyItem() {
				var obj = JSON.parse(JSON.stringify(this.list[this.selectItem]));
				this.newItem.question = obj.question;
				this.newItem.options = obj.options;
			},
			getAnswer() {
				// console.log(223333)
				var type = this.modalConfig.state != 2 ? "answer" : "timeup";
				this.addOperLog('button', type);
				location.href = "http://box.10155.com/Club/portal/zwzt/00_4801_th.jsp?cid=004801";
			},
			addOperLog(type, btnName) {
				sapi.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source

				}, (back) => {})
			},
			isLogin() {
				this.modalConfig.show = false;
				sessionStorage['pass'] = true;
				this.$root.gameLevel = 1;
				//通关。请求接口
				if(this.$root.islogin) {
					this.saveUserH5Info();
					router.go({
						path: '/marquee'
					});
					return;
				} else {
					this.$root.goodlucky = true;
					this.$dispatch('login', window.location.search);
					return;
				}
			},
			saveUserH5Info() {
				var that = this;
				if(!that.$root.islogin) return;
				that.$dispatch('loading', {
					name: 'app_save',
					icon: true,
					text: '数据保存中...',
					show: true,
					duration: 20 * 1000
				});
				sapi.saveUserH5Info(this, {
					types: '拼歌单达人',
					scoreorg: that.$root.gameLevel
				}, (back) => {
					that.$dispatch('cancelloading', 'app_save');
					that.$root.gameLevel = -1;
					if(back.resCode == "0") {
						router.go({
							path: '/marquee'
						});
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
		}
	}
</script>
<style lang="sass">
	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;
		@return $return;
	}
	
	.success-view {
		.box {
			position: relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fff;
			.img-panel {
				width: 100%;
				text-align: center;
				margin: 30px 0px;
			}
			.btn-panel {
				width: 100%;
				text-align: center;
				a {
					font-size: 32px;
					display: inline-block;
					line-height: 78px;
					border-radius: 78px;
					width: 243px;
					color: #000;
					height: 78px;
				}
				.blue {
					background-color: #489eff;
				}
				.yellow {
					background-color: #ffb81d;
				}
			}
			.title {
				font-size: 38.84px;
				line-height: 46px;
				color: #fff;
				text-align: center;
				text-shadow: 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000;
			}
		}
		.close-img {
			position: absolute;
			right: 20px;
			top: 20px;
			max-width: 56px;
			max-height: 50px;
		}
	}
	
	.app-view.view-activity {
		.question-list {
			position: absolute;
			color: white;
			top: 67%;
			width: 600px;
			height: 360px;
			border: 1px solid;
			margin-left: -300px;
			left: 50%;
			background-color: rgba(43, 42, 42, 0.38);
			border-color: #3683a2;
			padding: 20px;
			font-size: 28px;
			.title {
				border-bottom: 1px solid #3683a2;
				padding: 15px;
			}
			ul {
				li {
					width: 100%;
					font-size: 0;
					padding: 2% 5%;
					height: 80px;
					.name {
						width: 70%;
						display: inline-block;
						font-size: 28px;
					}
					.check-box {
						width: 30%;
						font-size: 28px;
						display: inline-block;
						text-align: right;
					}
				}
			}
		}
		width: px2rem(640px);
		height: px2rem(1008px);
		min-height: px2rem(1120px);
		> .wap-timer {
			width: px2rem(596px);
			height: px2rem(244px);
			margin: auto;
			padding: px2rem(120px) px2rem(58px) px2rem(40px);
			.wap-timer-number {
				width: 100%;
				height: 100%;
				p {
					display: inline-block;
					margin: 0;
					width: px2rem(118px);
					margin-right: px2rem(62px);
					color: #fff;
					text-align: center;
					float: left;
					font-size: 4rem;
					line-height: px2rem(85px);
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>