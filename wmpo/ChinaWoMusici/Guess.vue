<template>
	<div class="app-view view-activity" style="background:url(i/images/guess_bg.png) center center; background-size: 100% 100%;">
		<timer :state.sync="timerState" :duration="60" style="background:url(i/images/guess-timer-bg.png) center center no-repeat; background-size: auto 100%;margin-top:18%;"></timer>
		<div class="music_play">
            <div class='play_cd'>

            	<img class='img_center':class='{ "play_start":isPlay,"play_stop":!isPlay}' :src="'i/images/guess_cd.png'">

            </div>
            <div class='play_cd_r'>
                  <img  :src="'i/images/guess_cd_r.png'">
            </div>
        </div>
		<div class="question-list">
			 <div v-show="musicData.showMusic" class="music-warp" style="display:hidden">
                    <music :music-src.sync="newItem.musicSrc"   :music-status.sync="newItem.status"></music>
             </div>
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
				<div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:10px">
					<p class="title">提示</p>
					<div class="img-panel">
						<img :src="modalConfig.imgUrl">
					</div>
					<div class="btn-panel">
						<a class="blue" v-if="modalConfig.state==0" @click="isLogin">我要抽奖</a>
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
	import music from './components/music.vue'
	import {
		router
	} from './index'
	export default {
		components: {
			timer,
			checkbox,
			modal,
			music
		},
		data() {
			return {
				modalConfig: {
					state: 0,
					show: false,
					imgUrl: ''
				},
				musicData: {
                	musicBg: 'b/images/music.png',
                	showMusic: false,
                	status: 'play'
                },
				isPlay:true,
				selectItem: 0,
				newItem: {
					question: '',
					status: 'play',
                    musicSrc:'i/images/q1_.mp3',
					options: [{
						'title': "",
						'select': false
					}, {
						'title': "",
						'select': false
					}, {
						'title': "",
						'select': false
					}]
				},
				list:[],
				listall: [{
					"question": "“人间精品起来嗨”由多少首歌曲混编而成？",
					status: 'play',
                    musicSrc:'i/images/q1_.mp3',
					"options": [{
						'title': "20",
						'select': false
					}, {
						'title': "21",
						'select': false
					}, {
						'title': "22",
						'select': false
					}],
					"answer": 1,
				}, {
					"question": "这首歌出自哪个综艺节目？",
					 status: 'play',
                     musicSrc:'i/images/q2_return17.mp3',
					"options": [{
						'title': "盖世英雄",
						'select': false
					}, {
						'title': "我去上学啦",
						'select': false
					}, {
						'title': "蒙面唱将猜猜猜",
						'select': false
					}],
					"answer": 2,
				}, {
					"question": "大张伟在哪一年的央视春晚演唱了这首歌？",
					 status: 'play',
                     musicSrc:'i/images/q3_shuang.mp3',
					"options": [{
						'title': "2013",
						'select': false
					}, {
						'title': "2014",
						'select': false
					}, {
						'title': "2015",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "这段音乐的下一句歌词是＿＿？",
					status: 'play',
                    musicSrc:'i/images/q4_.mp3',
					"options": [{
						'title': "其实我也看出你有点不舍",
						'select': false
					}, {
						'title': "其实你什么都不想要",
						'select': false
					}, {
						'title': "是我给你自由过了火",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "这段前奏来自花儿乐队的哪首歌？",
					 status: 'play',
                     musicSrc:'i/images/q5_xishuashua.mp3',
					"options": [{
						'title': "嘻唰唰",
						'select': false
					}, {
						'title': "我的果汁分你一半",
						'select': false
					}, {
						'title': "穷开心",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "“人间精品起来嗨”演唱会北京站什么时候举行？",
					 status: 'play',
                     musicSrc:'i/images/q6_qilaihai.mp3',
					"options": [{
						'title': "11月11日",
						'select': false
					}, {
						'title': "11月18日",
						'select': false
					}, {
						'title': "11月19日",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "听歌答题，请问大张伟姓什么？",
					status: 'play',
                    musicSrc:'i/images/q7_biu.mp3',
					"options": [{
						'title': "大 ",
						'select': false
					}, {
						'title': "大张",
						'select': false
					}, {
						'title': "张",
						'select': false
					}],
					"answer": 3
				}, {
					"question": "这段音乐是由大张伟与谁共同演唱？",
					status: 'play',
                    musicSrc:'i/images/q8_renjianjingpin.mp3',
					"options": [{
						'title': "庾澄庆",
						'select': false
					}, {
						'title': "凤凰传奇",
						'select': false
					}, {
						'title': "王力宏",
						'select': false
					}],
					"answer": 2
				}, {
					"question": "《盖世英雄》收官夜中，谁夺得了冠军？",
					status: 'play',
                     musicSrc:'i/images/q9_.mp3',
					"options": [{
						'title': "大张伟 ",
						'select': false
					}, {
						'title': "吉克隽逸 ",
						'select': false
					}, {
						'title': "ikon",
						'select': false
					}],
					"answer": 1
				}, {
					"question": "与大张伟合称“南薛北张”的明星是谁？",
					 status: 'play',
                      musicSrc:'i/images/q10_yiwai.mp3',
					"options": [{
						'title': "薛蛮子",
						'select': false
					}, {
						'title': "薛之谦 ",
						'select': false
					}, {
						'title': "薛凯琪",
						'select': false
					}],
					"answer": 2
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
					this.newItem.status='pause';
                    this.isPlay=false;
				}
			},
		},
		created() {
			var po = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			var newObj = JSON.parse(JSON.stringify(this.listall));
			var pos=[];
			for(var i = 0; i < 3; i++) {
				var num = Math.floor(Math.random() * po.length);
				console.log(num);
				if(pos.indexOf(num)==-1){
					pos.push(num);
					if(pos[i] == po.length)
					{
                    	pos[i] = 0
                    }
                    var index=pos[i];
                    this.list.push(newObj[index]);
                    po.$remove(po[index]);
				}else{
					i=i-1;
				}

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
							this.newItem.status='pause';
							this.isPlay=false;
							
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
						this.newItem.status='pause';
						this.isPlay=false;
					}, 300)
				}
			}
		},
		methods: {
			copyItem() {
				var obj = JSON.parse(JSON.stringify(this.list[this.selectItem]));
				this.newItem.question = obj.question;
				this.newItem.options = obj.options;
				this.newItem.status=obj.status;
				this.newItem.musicSrc=obj.musicSrc;
			},
			 cdPlay(){
                        this.isPlay=!this.isPlay;
                    },
			getAnswer() {
				// console.log(223333)
				// var type = this.modalConfig.state != 2 ? "answer" : "timeup";
				this.addOperLog('button', 'answer');
				location.href = "http://box.10155.com/Club/portal/search.do?act=search2&searchcontent=%E5%A4%A7%E5%BC%A0%E4%BC%9F";
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
	.music_play{
            position:absolute;
            top:22%;
            left:0;
            width:100%;
            text-align:center;
            .img_center{
            	width:420px;
            	height:420px;
            	border-radius:50%;
            	overflow:hidden;
            }
			.play_cd_r{
				position:absolute;
				top:-10%;
				right:3%;
				img{
					
				}

			}
     }
     @-webkit-keyframes rotation{
             from {-webkit-transform: rotate(0deg);}
             to {-webkit-transform: rotate(360deg);}
     }
     .play_start{
             -webkit-transform: rotate(360deg);
             animation: rotation 3s linear infinite;
             -moz-animation: rotation 3s linear infinite;
             -webkit-animation: rotation 3s linear infinite;
             -o-animation: rotation 3s linear infinite;
         }
         .play_stop{
             -webkit-transform-origin:top right;
             -webkit-transform: rotate(0deg);
         }
        /* .play_start_r{
             -webkit-transform-origin:top right;
             -webkit-transform: rotate(17deg);
         }
         .play_stop_r{
             -webkit-transform: rotate(0deg);
     }*/
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
					color: #4e140c;
					height: 78px;
				}
				.blue {
					background-color: #ffab00;
				}
				.yellow {
					background-color: #fd6751;
				}
			}
			.title {
				font-size: 38.84px;
				font-weight:bold;
				line-height: 46px;
				color: #000;
				text-align: center;

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
			top: 68%;
			width: 600px;
			height: 320px;
			border: 1px solid;
			margin-left: -300px;
			left: 50%;
			background-color: rgba(90, 28, 23, 0.9);
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
					height: 60px;
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
		// height: px2rem(1008px);
		// min-height: px2rem(1120px);
		> .wap-timer {
			width: px2rem(262px);
			height: px2rem(60px);
			margin: auto;
			.wap-timer-number {
				width: 100%;
				height: 100%;
				p {
					display: inline-block;
					margin: 0;
					width: px2rem(78px);
					height: px2rem(60px);
					color: #fff;
					font-size:3rem;
					float: left;
					margin-right:px2rem(13px);
					box-sizing:border-box;
					padding-left:px2rem(15px);
					&:last-child {
						margin-right: 0;
					}

				}
			}
		}
	}
</style>