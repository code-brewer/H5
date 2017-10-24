<template>
	<div class="app-view view-activity" style="background: url('l/images/game-bg.jpg');width:100%;height: 113.5%">
		<div class="logo">
				<img :src="'g/images/logo.png'">
		</div>
		<div id="content">
			<img :src="$root.activityBasePath+'/images/top_time.png'" class="GBimg">
			<div class="top_time">{{countDown}}</div>
			<form name="form1">
				<label class="G35">已抢到<span>{{score}}</span>个座位</label>
				<!--<label>命中率：</label>-->
				<!--<input type="text" name="success" size="10">-->
			</form>
			<img :src="$root.activityBasePath+'/images/top-right.png'" class="b1">
			<img :src="$root.activityBasePath+'/images/top-right.png'" class="b2">
			<img :src="$root.activityBasePath+'/images/marquee-b.png'" class="b3">
			<img :src="$root.activityBasePath+'/images/bottom_text.png'" class="b4">
			<img :src="$root.activityBasePath+'/images/momo1.png'" class="momo1">
			<img :src="$root.activityBasePath+'/images/momo2.png'" class="momo2">
			<table>
				<tr>
					<td id="td[0]" @click="hid(0)"></td>
					<td id="td[1]" @click="hid(1)"></td>
					<td id="td[2]" @click="hid(2)"></td>
					<td id="td[3]" @click="hid(3)"></td>
					<td id="td[4]" @click="hid(4)"></td>
					<td id="td[5]" @click="hid(5)"></td>

				</tr>
				<tr>
					<td id="td[6]" @click="hid(6)"></td>
					<td id="td[7]" @click="hid(7)"></td>
					<td id="td[8]" @click="hid(8)"></td>
					<td id="td[9]" @click="hid(9)"></td>
					<td id="td[10]" @click="hid(10)"></td>
					<td id="td[11]" @click="hid(11)"></td>
				</tr>
				<tr>
					<td id="td[12]" @click="hid(12)"></td>
					<td id="td[13]" @click="hid(13)"></td>
					<td id="td[14]" @click="hid(14)"></td>
					<td id="td[15]" @click="hid(15)"></td>
					<td id="td[16]" @click="hid(16)"></td>
					<td id="td[17]" @click="hid(17)"></td>
				</tr>
				<tr>
					<td id="td[18]" @click="hid(18)"></td>
					<td id="td[19]" @click="hid(19)"></td>
					<td id="td[20]" @click="hid(20)"></td>
					<td id="td[21]" @click="hid(21)"></td>
					<td id="td[22]" @click="hid(22)"></td>
					<td id="td[23]" @click="hid(23)"></td>
				</tr>
				<tr>
					<td id="td[24]" @click="hid(24)"></td>
					<td id="td[25]" @click="hid(25)"></td>
					<td id="td[26]" @click="hid(26)"></td>
					<td id="td[27]" @click="hid(27)"></td>
					<td id="td[28]" @click="hid(28)"></td>
					<td id="td[29]" @click="hid(29)"></td>
				</tr>
				<tr>
					<td id="td[30]" @click="hid(30)"></td>
					<td id="td[31]" @click="hid(31)"></td>
					<td id="td[32]" @click="hid(32)"></td>
					<td id="td[33]" @click="hid(33)"></td>
					<td id="td[34]" @click="hid(34)"></td>
					<td id="td[35]" @click="hid(35)"></td>
				</tr>
			</table>
		</div>
		<!--<section class="model" v-show="showMsg">-->
   			<!--<div class="panel">-->
   				<!--<div class="msg">-->
   					<!--<div class="content" style="text-align: center;">-->
						<!--<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">-->
						<!--<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">-->
						<!--<div class="div1">-->
							<!--<div class="content-title">-->
								<!--<img :src="$root.activityBasePath+'/images/game-rule-1.png'" style="padding-top: 5%;">-->
								<!--<div class="rule">-->
									<!--<p>游戏规则：</p>-->
									<!--<p>圣诞老人的包裹被卡住啦！快动动你的手指拯救礼物，还有机会救出幸运礼物哦！</p>-->
								<!--</div>-->
								<!--<p class="prize">活动奖品</p>-->
								<!--<div class="item">-->
									<!--<a><img :src="$root.activityBasePath+'/images/game-rule-2.png'"></a>-->
									<!--<a><img :src="$root.activityBasePath+'/images/game-rule-3.png'"></a>-->
									<!--<a><img :src="$root.activityBasePath+'/images/game-rule-4.png'"></a>-->
									<!--<a><img :src="$root.activityBasePath+'/images/game-rule-5.png'"></a>-->
									<!---->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
						<!--<div class="btn-close" @click="showTimeCount()"><img :src="'l/images/sp-close.png'" /></div>-->
					<!--</div>-->
   				<!--</div>-->
   				<!---->
   			<!--</div>-->
   			<!---->
   		<!--</section>-->
   		<section class="model" v-show="showTime">
   			<div class="panel">
   				<div class="msg">
   					<p class="timetext" >{{timeTest}}</p>
					<img :src="$root.activityBasePath+'/images/num.png'" class="en">
   				</div>
   			</div>
   			
   		</section>
   		<!-- 挑战成功弹框 -->
   		<section class="model" v-show="showGameSuccess">
   			<div class="panel">
   				<div class="msg">
   					<div class="content" style="text-align: center;">
						<img :src="$root.activityBasePath+'/images/modal-l.png'" class="sucess1">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="sucess2">
						<div class="div2">
							<div class="content-title">
								<p class="title">恭喜!</p>
								<!--<div class="item">-->
									<!--<a><img :src="$root.activityBasePath+'/images/game-success.png'"></a>-->
								<!--</div>-->
								<p class="text">你已成功抢到了<span>20</span>个座位！</p>
								<p class="text"><span>免费赠送你一个新年幸运铃音盒</span></p>
								<p class="text">放进你的奖品包，登陆领取并参与</p>
								<p class="text">幸运跑马灯抽奖。</p>
								<a class="confirm-btn" style="background-position-x: 16px;background: url('./l/images/btn-bg.png') center center no-repeat;" @click="goMarquee()">去抽奖</a>
							</div>
						</div>
						<!-- <div class="btn-close" @click="showGameSuccess = false"><img :src="'l/images/sp-close.png'" /></div> -->
					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<!-- 挑战失败弹框 -->
   		<section class="model" v-show="showGamefail">
   			<div class="panel">
   				<div class="msg">
   					<div class="content" style="text-align: center;">
						<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
						<div class="div2">
							<div class="content-title">
								<p class="title" style="font-size: 50px;margin-bottom: 30px">还差一点点，加油！</p>
								<p class="text" style="line-height: 50px"><span>免费赠送你一个新年幸运铃音盒</span>已放进你的奖品包，继续挑战赢取<span>Gopro运动相机</span>。</p>
								<p class="text" style="line-height: 50px;"></p>
								<p class="text" style="line-height: 50px;"></p>
								<a class="confirm-btn" style="background-position-x: 16px;background: url('./l/images/return-game.png') center center no-repeat;" @click="gamefail()"></a>
							</div>
						</div>
						<!--<div class="btn-close" @click="showGamefail = false"><img :src="'l/images/sp-close.png'" /></div>-->
					</div>
   				</div>

   			</div>

   		</section>
	</div>
</template>
<script>
	import timer from './components/timer/timer.vue'
	import checkbox from './components/checkbox.vue'
	import modal from './modal/Modal.vue'
	import sapi from './utils/serverapi.js'
	import urlUtil from './utils/url.js'
	import music from './components/music.vue'
	import {
		router
	} from './index'
	export default {
				components: {
					modal,
				},
				ready() {
                    this.saveUserH5Info();
					var gameVue = this;
                    this.$root.musicData.showMusic = true;
					this.$root.$refs.music.sounddisable(false);
					gameVue.activity = this.$root.activityinfostr;
					gameVue.activityInfo = JSON.parse(gameVue.activity.extbody);

                    this.showTimeCount();

// -------------------------my_game下-----------------------------------------
//                    this.GameStart();
        },
        data() {
        	return {
        		activity:{mname:''},
        		activityInfo:{background:"",logo:"",levels:"",ruleContent:"",time:'0',timeext:'0'},
        		sharetip:false,
        		showText:false,
        		showMsg: false,
        		showGameSuccess: false,
        		showGamefail: false,
        		timeTest: 3,
        		showTime: false,
        		timepro:100,

//				my_game下
                td : [],      //保存每个格子跳动的图片
                playing : false,       //游戏是否开始
                score : 0,             //分数
                beat : 0,              //鼠标点击次数
                success : 0,           //命中率
                knock : 0,             //鼠标点中跳动图片次数
                countDown:30,        //倒计时
                interId : null,        //指定setInterval()的变量
                timeId : null

        }
        },
        methods:{
//        	settimepro(p){
//        		this.timepro = (p/30)*100;
//        	},
            goMarquee(){
                this.$router.go({path: '/marquee'});
            },
        	//分享
        	showShare(){
        		share(sapi.shareUrl());
            },
            gamefail(){
            	this.showGamefail = false;
            	this.timeTest = 3;
//            	this.showTimeCount('reset');
                window.location.reload();
            },
            showTimeCount(index){
                this.showMsg = false;
                this.showTime = true;
                var timeout=setInterval(()=>{
                    this.timeTest--;
                    if(this.timeTest<1){
                        this.showTime = false;
                        clearTimeout(timeout);
                        this.GameStart();
                        if(index == 'reset'){
                            clearTimeout(timeout);
                            this.GameStart();
                        }
                    }
                },1000);

            },

            saveUserH5Info(s) {
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
					scoreorg: s,
				}, (back) => {
					that.$dispatch('cancelloading', 'app_save');
					that.$root.gameLevel = -1;
				})
			},


//	--------------------my_game下------------------------
    //满足条件，游戏结束
	GameOver(){
        this.timeStop();
        this.playing = false;
        this.clearMouse();
		this.success = 0;
		this.knock = 0;
		this.beat = 0;
		this.countDown = 0;
		this.showGameSuccess = true;
        this.showGamefail = false;
        if(this.$root.login) {
            this.saveUserH5Info()
        }
        else{
            this.$root.gameLevel=1;
		}
    },
	//倒计时结束，分数未满足条件
	timeOut(){
        this.timeStop();
        this.playing = false;
        this.clearMouse();
        this.success = 0;
        this.knock = 0;
        this.beat = 0;
        this.countDown = 0;
        this.showGameSuccess = false;
        this.showGamefail = true;
	},
	//显示当前倒计时所剩时间
    timeShow(){
        if(this.countDown == 0){
            this.timeOut();
        }else{
            this.countDown -= 1;
            console.log('倒计时：',this.countDown);
            this.timeId = setTimeout(this.timeShow,1000);
        }
    },

    //主动停止所有计时
    timeStop(){
        clearInterval(this.interId);//clearInterval()方法返回setInterval()方法的id
        clearTimeout(this.timeId);//clearTime()方法返回setTimeout()的id
    },

    //随机循环显示跳动的图片
    show(){
        if(this.playing)
        {
            var current = Math.floor(Math.random()*25);
            //这里的路径也需要根据自己的实际文件路径来修改
            document.getElementById("td["+current+"]").innerHTML = '<div class="show_img"></div>';
            // document.getElementById("td["+current+"]").className = 'show_img';
            //使用setTimeout()实现3秒后隐藏跳动图片
            setTimeout("document.getElementById('td["+current+"]').innerHTML=''",3000);//隐藏跳动图片
        }
    },

    //清除所有跳动的图片
    clearMouse(){
        for(var i=0;i<=24;i++)
        {
            document.getElementById("td["+i+"]").innerHTML="";
        }
    },

    //点击事件函数，判断是否点中跳动的图片
     hid(id){
        if(this.playing==false)
        {
            console.log("别点了！SB么！啊！！！！");
        }
        else
        {
            this.beat +=1;
            if(document.getElementById("td["+id+"]").innerHTML!="")
            {
                this.score += 1;
                this.knock +=1;
                this.success = this.knock/this.beat;
                document.getElementById("td["+id+"]").innerHTML="";
                console.log('分数:',this.score);
                if(this.score==20){
                    this.GameOver();
                }
            }
            //没点中跳动的图片，减分
            // else
            // {
            //     score += -1;
            //     success = knock/beat;
            //     document.form1.success.value = success;
            //     document.form1.score.value = score;
            // }
        }
    },

    //游戏开始
    GameStart(){
        this.score = 0;
        this.countDown = 30;
        this.playing = true;
        this.interId = setInterval(this.show,1000);//速度
        this.timeShow();
    }
            
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
	.model {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 999;
		.timeout-panel {
			text-align: center;
			position: absolute;
			width: 100%;
			top: 340px;
			.msg {
				background-repeat: no-repeat!important;
				background-position-x: 50%!important;
				background-position-y: 50%!important;
				width: 100%;
				height: 322px;
				line-height: 322px;
				position: absolute;
				top: 50%;
				font-size: 207px;
				margin-top: -120px;
				color: #e17227;
				font-weight: bold;
				text-shadow: 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000;

			}
		}
		.panel {
			.msg {
				.timetext{
				    margin: 0 auto;
				    color: #fff;
				    font-size: 180px;
					display: block;
					position: relative;
					z-index: 99;
					/*background: url('images/num.png')no-repeat;*/
					/*background-size: contain;*/
					/*background-position: center;*/
				    margin-top: 50%;
				}
				.en{
					position: absolute;
					top:28.5%;
					left:28.5%;
					width: 50%;
					z-index: 10!important;
				}
			    .content {
				        width: 500px;
					    padding: 0 15px;
					    margin: 160px 70px 0 70px;
					    position: absolute;
					    font-size: 0px;
					    background: #fff;
					    border:8px solid #fbb03b;
					    border-radius: 20px;
				    .title{
				      color: #fbb03b;
				      font-size: 50px;
				    }
				    .rule{
			    	    color: #e73433;
					    padding: 20px;
					    font-size: 23px;
					    text-align: left;
					    font-weight: 600;
					    line-height: 30px;
				    }
				    .prize{
			    	    display: inline-block;
					    background: #fbb03b;
					    padding: 15px 10%;
					    border-radius: 40px;
					    color: #fff;
					    font-size: 26px;
				    }
				    .item{
				    	a{
			    		    display: inline-block;
						    width: 50%;
						    height: 149px;
						    text-align: center;
				    	}
				    }
				     .right{
						 position: absolute;
						 right: -11%;
						 top: 58%;
				    }
				    
				    .left{
						position: absolute;
						left: -8%;
						top: 76%;
				    }
					.sucess1{
						position: absolute;
						left: -9%;
						top: 79%;
					}
					.sucess2{
						position: absolute;
						right: -11%;
						top: 63%;
					}
				    .div1 {
				      height: 770px;
				    }
				    .div2{
				    	min-height: 400px;
				    	.title{
			    		    color: #fbb03b;
						    font-size: 60px;
						    font-weight: 600;
						    line-height: 110px;
							margin-bottom: 20px;
				    	}
				    	.text{
						    color: #fbb03b;
						    font-size: 30px;
						    font-weight: 600;
							margin-bottom: 20px;
							span{
								color: #a60018;
							}
				    	}
				    		.confirm-btn{
							    display: block;
							    width: 230px;
							    height: 75px;
							    margin: 35px auto;
							    line-height: 70px;
							    font-size: 30px;
							    text-align: center;
							    color: #fff;
							    font-weight: 600;
							}
				    }
				    .btn-close {
				      	position: absolute;
				      	top: 10px;
				      	right: 10px;
				      	img {
				        	width: 61px;
				        	height: 61px;
				      	}
				    }
			   
			    }
				
			}
			.btn {
				height: 106px;
				display: block;
				width: 300px;
				padding-left: 0;
				background-size: 300px 106px !important;
				color: white;
				font-size: 76px;
				text-align: center;
				line-height: 106px;
				text-shadow: 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801;
				background-repeat: no-repeat!important;
				margin: 65px auto;
			}
		}
	}
	html,body,canvas {
		margin: 0px;
		padding: 0px;
		border:none;
		text-align: center;
		background-color: black;
	}
	#content {
		width: 100%;
		margin: 0 auto;
		margin-top: 200px;
		text-align: center;
		position: relative;
	.G35{
		font-size: 35px;
		color: #a72531;
		width: 50%;
		margin: 0 auto;
		letter-spacing: 5px;
		span{
			color: #f9ae48;
			font-size: 50px;
			text-decoration: underline;
		}
	}
	.GBimg{
		position: absolute;
		top: -30%;
		left: 34%;
		width: 35%;
	}
	.top_time{
		position: absolute;
		top: -21%;
		left: 36%;
		font-size: 80px;
		color: #fff;
		width: 30%;
		z-index: 99;
	}
	.b1{
		position: absolute;
		top: 92%;
		left: 4%;
		width: 10%;
		z-index: 99;
		-webkit-transform: rotate(129deg);
		transform: rotate(117deg);
	}
	.b2{
		position: absolute;
		top: 3%;
		left: 85%;
		width: 10%;
		z-index: 99;
		-webkit-transform: rotate(-62deg);
		transform: rotate(-62deg);
	}
	.b3{
		position: absolute;
		top: 99%;
		left: 65%;
		width: 35%;
		z-index: 0;
	}
	.b4{
		position: absolute;
		top: 115%;
		left: 10%;
		width: 80%;
		z-index: 0;
	}
	.momo1{
		position: absolute;
		top: 132%;
		left: 56%;
		width: 25%;
		z-index: 0;
	}
	.momo2{
		position: absolute;
		top: 3%;
		left: -4%;
		width: 35%;
		z-index: 99;
	}
	table {
		width: 90%;
		margin: 0 auto;
		background-color: #fee2dc;
		border:10px solid #a72531;
		border-radius:30px;
		margin-top:20px;
	    position:relative;
		z-index:10;
	td {
		width: 15%;
		height: 95px;
		/*background-color: #00ff33;*/
		background: url('images/game_bg.png')no-repeat;
		background-position: center;
		background-size: 80%;
		border: none;
	.show_img{
		width: 80%;
		margin: 0 auto;
		height: 95px;
		background: url('images/show_img.png')no-repeat;
		background-position: center;
		background-size: contain;
		border: none!important;
	}
	}
	}
	}
	canvas {
		background-color: white;
	}
	.modal-box{
		text-align: center;
	}
	.modal-bg{
		position: relative;
	}
	.modal-con{
		position: absolute;
		top: 50px;
	    left: 20%;
	    width: 60%;
	    text-align: center;
	    z-index: 100;
	}
	.modal-con p{
		color: #fff;
	    margin-top: 120px;
    	font-size: 30px;
	}
	.btn{
		margin-top: 80px;
	}
	.close{
	    position: absolute;
	    right: 10px;
	    top: 10px;
	    z-index: 101;
	}
	.time-wrap{
       position: absolute;
	    top: 124px;
	    left: 28%;
	    width: 100%;
	}
	.time-bottom{
	    width: 40%;
	    background: #e73433;
	    height: 20px;
	    border-radius: 20px;
	    position: relative;
	}
	.time-top{
	    width: 100%;
	    height: 100%;
	    display: inline-block;
	    background: #ffcf4a;
	    border-radius: 20px;
	    text-align: left;
	    position: absolute;
	    left: 0;
	}
</style>