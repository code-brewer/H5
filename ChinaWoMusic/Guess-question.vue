<template>

	<div class="question">
		<section class="section">
			<div class="topic">
				请问第 {{randomSeconds}} 秒出现的以下哪个奥运项目？
			</div>
		</section>

		<section class="section" style="position: relative;">
			<div class="option">

				<div class="option-img-box option-{{index+1}}" v-for="(index, item) in optionData" @click="selectAnswer(index, item)">
					<img class="option-img" :src="item.imgUrl">
					<!-- img v-show="item._selected" class="selected" :src="'a/images/selected.png'"> -->
					<p class="text text{{index+1}}">{{item.text}}</p>
				</div>
				
			</div>

			<div class="answer">
				<a class="q-btn answer-btn" v-on:click="checkAnswer" style="background: url('a/images/btn-1.png') center center; background-size: 100% 100%">确 定</a>
			</div>
		</section>

		<section class="section">
			<div class="bottom-section">
				<img class="bottom-img" :src="'a/images/bottom-bg.png'" >
				<img class="baby-img" :src="'a/images/baby2.png'">
				<img class="orange-img" :src="'a/images/orange.png'">
			</div>
		</section>

	</div>

	<modal :show.sync="answerData.show" :bg="false" :backdrop="false">
		<div class="content">
			<img class="image" :src="answerData.imgSrc" />
			<!-- <img class="close" :src="'a/images/close.png'" @click="routerGo('close')"/> -->
			<!-- <div v-if="answerData.result == 'fail'" class="btn-fail">
				<a class="q-btn btn-1" style="background: url('a/images/btn-1.png') center center; background-size: 100% 100%">继续挑战</a>
			</div> -->

			<div class="btn-link">
				<a class="q-btn btn-1" style="background: url('a/images/btn-1.png') center center; background-size: 100% 100%" @click="routerGo('continue')">继续挑战</a>
				<a class="q-btn btn-2" style="background: url('a/images/btn-1.png') center center; background-size: 100% 100%" @click="routerGo('getPrize')">去抽奖</a>
			</div>

			<p v-show="saveingRecord" style="color: red; text-align: center;">请等待服务器响应</p>
		</div>
	</modal>

</template>

<script>
	import {router} from './index.js'
	import modal from './../src/components/Modal.vue'
	import api from './utils/serverapi.js'
	
	export default{
		components: {
			modal
		},

		props: {
			imgSeq: {
				type: Array,
				default: function(){return []}
			},
			currentView: String
		},

		data(){
			return{
				images: ['a/images/icon1.png', 'a/images/icon2.png', 'a/images/icon3.png', 'a/images/icon4.png', 'a/images/icon5.png'],
				selectedImages: ['a/images/icon1-s.png', 'a/images/icon2-s.png', 'a/images/icon3-s.png', 'a/images/icon4-s.png', 'a/images/icon5-s.png'],
				optionData: [
					{
						imgUrl: 'a/images/icon1.png',
						_selected: false,
						text: '游泳'
					},
					{
						imgUrl: 'a/images/icon2.png',
						_selected: false,
						text: '体操'
					},
					{
						imgUrl: 'a/images/icon3.png',
						_selected: false,
						text: '高尔夫'
					},
					{
						imgUrl: 'a/images/icon4.png',
						_selected: false,
						text: '篮球'
					},
					{
						imgUrl: 'a/images/icon5.png',
						_selected: false,
						text: '羽毛球'
					}
				],
				randomSeconds: '',
				answerData: {
					show: false,
					result: '',
					imgSrc: ''
				},
				routerAddress: '',
				saveingRecord: false,
				afterSaveRecord: false,

				
			}
		},

		ready(){
			this.randomSeconds = parseInt(Math.random()*6) + 3;
		},

		methods: {
			selectAnswer(index, item){
				for(var i=0;i<this.optionData.length;i++){

					if(i == index){
						this.optionData[i]._selected = true;
						this.optionData[i].imgUrl = this.selectedImages[i];
					}else{
						this.optionData[i]._selected = false;
						this.optionData[i].imgUrl = this.images[i];
					}
				}
			},
			checkAnswer(){

				for(var i=0;i<this.optionData.length;i++){
					if(this.optionData[i]._selected){
						if(i == this.imgSeq[this.randomSeconds-1]){
							//正确
							// this.answerData.result = "success";
							this.answerData.imgSrc = "a/images/win.png";
							this.saveUserH5Info();
						}else{
							//错误
							// this.answerData.result = "fail";
							this.answerData.imgSrc = "a/images/fail.png";
							this.afterSaveRecord = true;
						}

						this.answerData.show = true;
						break;
					}
				}
				
			},

			routerGo(_name){
				if("close" == _name){
					this.routerAddress = 'home';

				}else if("continue" == _name){
					this.routerAddress = 'home';

				}else if("getPrize" == _name){
					this.routerAddress = 'marquee';
				}
				this.closeDia();
			},

			closeDia(){
				if(this.routerAddress == 'marquee' && this.afterSaveRecord){
					router.go({path: '/marquee'});

				}else if(this.routerAddress == 'marquee' && !this.afterSaveRecord){
					this.saveingRecord = true;

				}else{
					router.go({path: '/home'});
				}
			},

			saveUserH5Info(){
				var that = this;
				api.saveUserH5Info(this, {types: '挑战最强大脑'}, (back)=>{
					if(back.resCode == "0"){
						that.afterSaveRecord = true;
					}else{
						that.$dispatch('handle_server_error', back);
					}
				})
			}
		}
	}
</script>

<style lang="sass">
	.content{
	    padding-top: 40px;
	    position: relative;

	    .close{
		    position: absolute;
		    right: 50px;
		    top: 0;
	    }

	    .image{
	    	display: block;
		    margin: 0 auto;
	    
	    }

	    .btn-link{
			width: 100%;
			text-align: center;
			margin-top: 10px;

			.btn-1{
				margin-right: 20px;
			}
		}

	}
	.q-btn{
		height: 106px;
		margin: 0 auto;
		font-weight: 400;
		line-height: 106px;
		text-align: center;
		border-radius: 10px;
		color: #fff;
		text-shadow: 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801, 0 0 12px #8b3801;
		// background: linear-gradient(to bottom, #fdde79, #f44b00);
		// background: -webkit-linear-gradient(to bottom, #fdde79, #f44b00);
		
		&.btn-1{
			display:inline-block;
			width: 288px;
			font-size: 48px;
			vertical-align: middle;
		}

		&.btn-2{
			display:inline-block;
			width: 238px;
			font-size: 48px;
			vertical-align: middle;
		}
	}

	.question{
		padding-top: 100px;

		.section{
			padding-top: 14px;

			.topic{
				width: 100%;
				font-size: 30px;
				padding-left: 16px;
			}

			.option{
				position: relative;
				width: 90%;
				height: 578px;
				margin: 0 auto;

				.option-img-box{
					position: absolute;
					width: 196px;
					height: 230px;

					.option-img{
						max-width: 100%;
						max-height: 100%;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}

					.text{
						position: absolute;
						left: 50%;
						transform: translate(-50%, 0);

						&.text1{
							bottom: -10px;
						}

						&.text2{
							bottom: -36px;
						}

						&.text3{
							bottom: -36px;
						}

						&.text4{
							bottom: -36px;
						}

						&.text5{
							bottom: -36px;
						}

					}

					.selected{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
				
				.option-1{
					left: 0;
					top: 0;
				}

				.option-2{
					right: 0;
					top: 0;
				}

				.option-3{
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}

				.option-4{
					left: 0;
					bottom: 0;
				}

				.option-5{
					right: 0;
					bottom: 0;
				}
			}

			.answer{
				position: absolute;
				top: 590px;
				width: 100%;
				margin-top: 20px;
				z-index: 999;

				.answer-btn{
					display: block;
					width: 221px;
					font-size: 54px;
				}
			}

			.bottom-section{
				position: absolute;
				bottom: 0;
				width: 100%;
				z-index: 99;

				.bottom-img{
				    position: absolute;
				    bottom: 0;
				    width: 100%;
				}

				.baby-img{
				    position: absolute;
				    bottom: 0;
				    right: 10px;
				}

				.orange-img{
					position: absolute;
				    bottom: 10px;
    				right: 320px;
				}
			}
		}
	}
	
</style>