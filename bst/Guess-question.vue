<template>

	<div class="question">
		<section class="section">
			<div class="topic">
				请问：以上哪个功能在上面的图片中没有出现？
			</div>
		</section>

		<section class="section" style="position: relative;">
			<div class="option">

				<div class="option-img-box" v-for="(index, item) in optionData" @click="selectAnswer(index, item)">
					<input type="radio" name="0">
					<!-- img v-show="item._selected" class="selected" :src="'a/images/selected.png'"> -->
					<p class="text">{{item.name}}</p>
				</div>
				
			</div>

			<div class="answer">
				<a class="q-btn answer-btn" v-on:click="checkAnswer" style="background: url('images/t-sure-btn.png') center center; background-size: 100% 100%"></a>
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
				<a class="q-btn btn-1" style="background: url('images/t-continue-challenge-btn.png') center center; background-size: 100% 100%" @click="routerGo('continue')"></a>
				<a class="q-btn btn-2" style="background: url('images/t-award-btn.png') center center; background-size: 100% 100%" @click="routerGo('getPrize')"></a>
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
				
				optionData: [
					
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
				selectedIndex:0,
				imagesn:[
				{name:'查天气', url:'images/t-img4.png', type:'no'},
				{name:'查栏目', url:'images/t-img6.png', type:'no'},
				{name:'查周边游', url:'images/t-img7.png', type:'no'},
				
				],

				
			}
		},

		ready(){
			this.randomSeconds = parseInt(Math.random()*6) + 3;
			var rand = parseInt(Math.random()*4);
			var ran = parseInt(Math.random()*3);
			this.imgSeq.push(this.imagesn[ran]);
			this.optionData = this.imgSeq;
			this.optionData.splice(rand, 1);
			this.optionData.sort(function(){
				 return 0.5 - Math.random();
			})
			this.selectedIndex = -1;
			
			
		},

		methods: {
			selectAnswer(index, item){
				this.selectedIndex = index;
			},
			checkAnswer(){
				console.log(this.optionData);
				console.log(this.selectedIndex);
				if(this.selectedIndex == -1){
					 this.$dispatch('loading', {text: '请选择一个选项', show: true, duration: 2000});
				}else if(this.optionData[this.selectedIndex].type == 'no'){
					this.answerData.imgSrc = "images/t-success.png";
					this.answerData.show = true;
					this.saveUserH5Info();
					
				}else{
					this.answerData.imgSrc = "images/t-fail.png";
					this.afterSaveRecord = true;
					this.answerData.show = true;
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
			//保存用户通关记录
			saveUserH5Info(){
				 var that = this;
			    api.saveClearanceRecord(this, {}, (back)=>{
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
		padding-top: 200px;

		.section{
			padding-top: 14px;

			.topic{
				width: 100%;
				font-size: 40px;
				padding: 25px;
				color: #fff;
				line-height: 80px;
				 text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
			}

			.option{
				position: relative;
				width: 90%;
				height: 578px;
				margin: 0 auto;

				.option-img-box{
				    width: 50%;
				    display: inline-block;
				    height: 120px;
				    line-height: 80px;
				    text-align: center;
				    font-size: 40px;
				    color: #fff;
				    text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
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
				position: absolute;
				top: 280px;
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