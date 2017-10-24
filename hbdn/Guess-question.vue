<template>

	<div class="question">
		<section class="section" style="padding-bottom: 20px;">
			<div class="topic">
				请问：第{{seconds}}秒出现的是下面哪 项联通手机营业厅服务功能？
			</div>
		</section>

		<section class="section" style="position: relative;">
			<div class="option">

				<div class="option-img-box" v-for="(index, item) in imgSeq"  @click="selectAnswer(index, item)" >
					<!-- <input type="radio" name="0"> -->
					<!-- img v-show="item._selected" class="selected" :src="'a/images/selected.png'"> -->
					<!-- <p class="text">{{item.name}}</p> -->
					<!-- <img :src="index===selectedIndex?item.nowSelectUrl:item.selectUrl" style="border-radius: 20px;"> -->
					<img :src="item.selectUrl" style="border-radius: 20px;" v-show = "index!==selectedIndex">
					<img :src="item.nowSelectUrl" style="border-radius: 20px;" v-show = "index===selectedIndex">
				</div>
				
			</div>

			<div class="answer">
				<a class="q-btn answer-btn" v-on:click="checkAnswer" style="background: url('images/t-sure-btn.png') center center; background-size: 100% 100%"></a>
			</div>
		</section>

		

	</div>

	<modal :show.sync="answerData.show" :bg="false" :backdrop="false">
		<div class="content">
			<!-- <img class="image" :src="answerData.imgSrc" /> -->


			<!-- <img class="close" :src="'a/images/close.png'" @click="routerGo('close')"/> -->
			<!-- <div v-if="answerData.result == 'fail'" class="btn-fail">
				<a class="q-btn btn-1" style="background: url('a/images/btn-1.png') center center; background-size: 100% 100%">继续挑战</a>
			</div> -->
			

			<section class="model" style="position: inherit;margin-top: 200px;" v-if="!isVictory">
				<div class="panel">
					<div class="msg">
						<div class="messagebg">
							<h2 style="padding-bottom: 5%">很遗憾</h2>
							<p style="text-align: center;padding: 0 ">差一点就成功啦</p>
							<p style="text-align: center;padding: 0">再次挑战吧!</p>
							<a class="btn" @click="routerGo('continue')" style="background: url(images/btnbg.png);font-size: 32px;">
							继续挑战
		   				</a>
		   				<!-- <img :src="'images/xx.png'" @click="answerData.show = false" class="close"> -->
						</div>
					</div>
					
				</div>
				
	   		</section>
			<section class="model" style="position: inherit;margin-top: 200px;" v-if="isVictory">
				<div class="panel">
					<div class="msg">
						<div class="messagebg">
							<h2 style="padding-bottom: 5%">挑战成功</h2>
							<p style="text-align: center;padding: 0 ">恭喜您!</p>
							<a class="btn" @click="routerGo('getPrize')" style="background: url(images/btnbg.png);font-size: 32px;">
							去领奖
		   				</a>
		   				<!-- <img :src="'images/xx.png'" @click="answerData.show = false" class="close"> -->
						</div>
					</div>
					
				</div>
				
	   		</section>

<!-- 			<div class="btn-link">
				<a class="q-btn btn-1" style="background: url('images/t-continue-challenge-btn.png') center center; background-size: 100% 100%" @click="routerGo('continue')"></a>
				<a class="q-btn btn-2" style="background: url('images/t-award-btn.png') center center; background-size: 100% 100%" @click="routerGo('getPrize')"></a>
			</div>

			<p v-show="saveingRecord" style="color: red; text-align: center;">请等待服务器响应</p> -->
		</div>
	</modal>

</template>

<script>
	import {router} from './index.js'
	import modal from './src/Modal.vue'
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
				isVictory : false,
				// optionData: [
					
				// ],
				randomSeconds: '',
				answerData: {
					show: false,
					result: '',
					imgSrc: ''
				},
				routerAddress: '',
				saveingRecord: false,
				afterSaveRecord: true,// 用户保存记录
				selectedIndex:0,
				seconds : parseInt(6*Math.random())+1 ,
				// imagesn:[
				// {name:'查天气', url:'images/t-img4.png', type:'no'},
				// {name:'查栏目', url:'images/t-img6.png', type:'no'},
				// {name:'查周边游', url:'images/t-img7.png', type:'no'},
				
				// ],

				
			}
		},

		ready(){
			this.randomSeconds = parseInt(Math.random()*6) + 3;
			var rand = parseInt(Math.random()*4);
			var ran = parseInt(Math.random()*3);
		
			this.selectedIndex = -1;
			

		
			this.$dispatch('setAnswer',this.seconds) //设置答案,事件注册在Guess.vue
	

		},

		methods: {
			selectAnswer(index, item){
				this.selectedIndex = index;

			},
			checkAnswer(){
				console.log(this.selectedIndex);
				if(this.selectedIndex == -1){
					 this.$dispatch('loading', {text: '请选择一个选项', show: true, duration: 2000});
				}else if(this.imgSeq[this.selectedIndex].type == 'no'){
					// this.answerData.imgSrc = "images/t-success.png";
					this.answerData.show = true;
					// this.saveUserH5Info(); // 保存通关记录,即为给抽奖机会该用户
					this.isVictory = true;
					this.$dispatch('gamepass', {});
					
				}else{
					// this.answerData.imgSrc = "images/t-fail.png";
					this.afterSaveRecord = true;
					this.answerData.show = true;

					this.isVictory = false;

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
				console.log('跳转')
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
			//保存用户通关记录
			// saveUserH5Info(){
			// 	 var that = this;
			//     api.saveClearanceRecord(this, {}, (back)=>{
			// 		if(back.resCode == "0"){
			// 			that.afterSaveRecord = true;
			// 		}else{
			// 			that.$dispatch('handle_server_error', back);
			// 		}
			// 	})
			// }
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
		    width: 100%;
	    
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
		// padding-top: 150px;
		padding-top: 5%;
		.section{
			// padding-top: 14px;

			.topic{
				width: 100%;
				font-size: 40px;
				padding: 25px;
				padding-bottom: 0px;
				color: #fff;
				line-height: 80px;
				 text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
			}

			.option{
				position: relative;
				width: 90%;
				// height: 578px;
				margin: 0 auto;

				.option-img-box{
				    width: 50%;
				    display: inline-block;
				    // height: 120px;
				    line-height: 80px;
				    text-align: center;
				    font-size: 40px;
				    color: #fff;
				    text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
				    img {
				    	margin-top: 30px;
				    	box-shadow: 6px 9px 3px #989595;
				    }
				    input{
				    	width: 30px;
				    	height: 30px;
				    	vertical-align: middle;
				    }
					.text{
						display:inline-block;
						vertical-align: middle;
						
					}

					
				}
				
				
			}

			.answer{
				// position: absolute;
				// top: 280px;
				width: 100%;
				margin-top: 55px;
				// z-index: 999;

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