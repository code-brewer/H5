<template>
	<div class="golf">
		<div class="sum_div golf_el" style="padding: 14px 0">
			<img class="scoring" v-for="item in scoringpath" :src="item" track-by="$index" style="margin-left: 16px;">
		</div>
		<div class="timebg golf_el" style="left: 300px;top: 80px;">
		{{countDown}}<small style="font-size:58px;">s</small>
		</div>
		<div class="tee_div golf_el">
			<img class="ball_ready" id="g_ball" :src="$root.activityBasePath+'/images/ball_1.png'" alt="">
			<img class="tee" :src="$root.activityBasePath+'/images/tee.png'" alt="">
		</div>
		<img v-show="showball" class="ball_fly golf_el" id="g_ball_fly" :src="$root.activityBasePath+'/images/ball_1.png'" alt="">
		<img v-show="showgolfclub1" class="gc1 golf_el" :src="$root.activityBasePath+'/images/golfclub_1.png'" alt="">
		<img v-show="showgolfclub2" class="gc2 golf_el" :src="$root.activityBasePath+'/images/golfclub_2.png'" alt="">
		<img v-show="showgolfclub3" class="gc3 golf_el" :src="$root.activityBasePath+'/images/golfclub_3.png'" alt="">
		<img v-show="showgolfclub4" class="gc4 golf_el" :src="$root.activityBasePath+'/images/golfclub_4.png'" alt="">
		<div class="cursor_div golf_el">
			<img class="cursor golf_el cursorrun" id="g_cursor" :src="$root.activityBasePath+'/images/ico44_1.png'" alt="">
			<div v-show="showtarget" id="target"></div>
		</div>
		<a class="g_p_btn g_btn golf_el" id="g_press" ontouchstart="return false;">&nbsp;按住</a>
		<p class="golf_el palytip" >松开即挥杆</p>
	</div>
	<modal :show.sync="answerData.show" :bg="false" :backdrop="false">
		<div class="content">
			<img class="image" :src="answerData.imgSrc" />
			<div class="btn-link">
				<a class="q-btn btn-1 btn_green" @click="routerGo('continue')" style="width: 290px;display: inline-block;">继续挑战</a>
				<a class="q-btn btn-2 btn_green" @click="routerGo('getPrize')" style="width: 244px;display: inline-block;">去抽奖</a>
			</div>
		</div>
	</modal>
</template>
<script>
	import modal from '../../src/components/Modal.vue'
	import {router} from '../index.js'
	import api from '../utils/serverapi.js'
	export default{
		components: {
			modal
		},
		data(){
			return{
				imgSeq: [],
				showball:false,
				showgolfclub1:true,
				showgolfclub2:false,
				showgolfclub3:false,
				showgolfclub4:false,
				isflying:false,
				readyfly:false,
				showtarget:false,
				targetposarray:[50,100,150,200,250,300,350,400,450],
				targetwidtharray:[30,40,50],
				targetpos:50,
				targetwidth:30,
				scoringpath:[this.$root.activityBasePath+"/images/scoring_n.png",this.$root.activityBasePath+"/images/scoring_n.png",this.$root.activityBasePath+"/images/scoring_n.png",this.$root.activityBasePath+"/images/scoring_n.png",this.$root.activityBasePath+"/images/scoring_n.png"],
				sum:0,
				answerData: {
					show: false,
					result: '',
					imgSrc: ''
				},
				afterSaveRecord: false,
				countDown:60,
				myInterval:0,

			}
		},
		ready() {
			var gp = document.getElementById("g_press");
			gp.addEventListener('touchstart',this.touchstart,false);
			gp.addEventListener('touchend',this.touchend,false);
			this.cursorgo(false);
			this.gamestart();
		},
		methods:{
			addscoring(){
				this.sum+=1;
				var pos = this.sum - 1;
				if(pos>=this.scoringpath.length)return;
				this.$set("scoringpath["+pos+"]", this.$root.activityBasePath+"/images/scoring_y.png")
			},
			roll(){
				var pr = Math.floor(Math.random()*this.targetposarray.length);
				if(pr == this.targetposarray.length){
					pr = this.targetposarray.length-1;
				}
				this.targetpos = this.targetposarray[pr];

				var wr = Math.floor(Math.random()*this.targetwidtharray.length);
				if(wr == this.targetwidtharray.length){
					wr = this.targetwidtharray.length-1;
				}
				this.targetwidth = this.targetwidtharray[wr];
			},
			touchstart(){
				if(this.isflying)return;
				var gp = document.getElementById("g_press");
				gp.classList.add('g_btn_active');
				this.readyfly = true;
				this.roll();
				var gt = document.getElementById("target");
				gt.style.left = this.targetpos+"px";
				gt.style.width = this.targetwidth+"px";
				this.showtarget = true;
				this.cursorgo(true);
				
			},
			touchend(){
				if(!this.readyfly || this.myInterval == 0)return;
				this.readyfly = false;
				this.isflying = true;
				this.cursorgo(false);
				var gc = document.getElementById("g_cursor");
				// gc.style.animationPlayState = "paused";
				// this.setanimation(gc,"cursor 2s linear infinite alternate paused forwards");
				// gc.style.left = gc.offsetLeft+"px";
				// gc.classList.remove('cursorrun');
				// gc.classList.add('cursorpaus');
				var c = gc.offsetLeft+22;
				var hit = 1;
				if(c>this.targetpos+this.targetwidth){
					hit = 3;
				}else if(c>=this.targetpos&&c<=this.targetpos+this.targetwidth){
					hit = 2;
				}
				var gp = document.getElementById("g_press");
				gp.classList.remove('g_btn_active');
				this.golfgo(hit);
			},
			golfgo(hit){
				var that = this;
				that.showgolfclub1 = false;
				that.showgolfclub2 = true;
				setTimeout(function(){
					that.showgolfclub2 = false;
					that.showgolfclub3 = true;
					setTimeout(function(){
						var gb = document.getElementById("g_ball");
						gb.style.visibility = "hidden";
						that.showgolfclub3 = false;
						that.showgolfclub4 = true;
						var gbf = document.getElementById("g_ball_fly");

						if(hit == 2){
							gbf.style.marginLeft= "-31px";
							// gbf.style.animation = "golfflyhit 3s cubic-bezier(0.7,0.3,0.8,0.2) forwards";
							that.setanimation(gbf,"golfflyhit 3s cubic-bezier(0.7,0.3,0.8,0.2) forwards");
						}else if(hit == 3){
							gbf.style.marginLeft= "31px";
							// gbf.style.animation = "golfflyright 3s ease-in forwards";
							that.setanimation(gbf,"golfflyright 3s ease-in forwards");
						}else{
							gbf.style.marginLeft= "-93px";
							// gbf.style.animation = "golfflyright 3s ease-in forwards";
							that.setanimation(gbf,"golfflyright 3s ease-in forwards");
						}
						that.showball = true;
						if(hit == 2 && that.sum == 4){
							that.saveUserH5Info();
						}
						setTimeout(function(){
							var gp = document.getElementById("g_ball");
							gp.style.visibility = "visible";
							that.showgolfclub1 = true;
							that.showgolfclub2 = false;
							that.showgolfclub3 = false;
							that.showgolfclub4 = false;
							that.showball = false;
							that.isflying = false;
							if(hit == 2){
								that.addscoring();
							}else{
							}
							if(that.sum == 5 || that.myInterval == 0){
								 that.gameover();
							}
						}, 4000);
					}, 500);
				}, 500);
			},
			cursorgo(go){
				var gc = document.getElementById("g_cursor");
				if(go){
					this.setanimation(gc,"cursor 2s linear infinite alternate forwards");
					gc.style.animationPlayState = "running";
				}else{
					this.setanimation(gc,"cursor 2s linear infinite alternate paused forwards");
					gc.style.animationPlayState = "paused";
				}

			},
			setanimation(el,animation){
				el.style.WebkitAnimation = animation;
				el.style.MozAnimation = animation;
				el.style.MsAnimation = animation;
				el.style.OAnimation = animation;
				el.style.animation = animation;
			},
			routerGo(_name){
				if("continue" == _name){
					router.go({path: '/home'});
				}else if("getPrize" == _name){
					if(!this.$root.islogin){
						this.$dispatch('login', window.location.search);
						return;
					}
					if(this.sum < 5 || this.afterSaveRecord || !this.$root.isPass){
						router.go({path: '/marquee'});
					}
					else{
						this.$dispatch('loading', {text: '数据保存中,请稍候', show: true, duration: 1000});
					}
				}
			},
			saveUserH5Info(){
				var that = this;
				if(!that.$root.islogin)return;
				api.saveUserH5Info(this, {types: '谁是大GOLF王',scoreorg:'1'}, (back)=>{
					that.afterSaveRecord = true;
					that.$root.isPass = false;
					if(back.resCode == "0"){
					}else{
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			gamestart(){
				var that = this;
				that.myInterval = setInterval(function(){
					if(that.$route.path.indexOf('/guess') != 0){
						clearInterval(that.myInterval);
						that.myInterval = 0;
						return;
					}
					that.countDown--;
					if(that.countDown <= 0){
						that.gameover();
						return;
					}
				}, 1000)
			},
			gameover(){
				var that = this;
				if(that.myInterval>0){
					clearInterval(that.myInterval);
					that.myInterval = 0;
				}
				if(that.isflying)return;
				if(that.sum == 5){
					that.answerData.imgSrc = "b/images/win.png";
					that.answerData.show = true;
					that.$root.isPass = true;
				}else{
					that.answerData.imgSrc = "b/images/fail.png";
					that.answerData.show = true;
					that.$root.isPass = false;
				}
			}
		}
	}
	
</script>

<style lang="sass">
	.golf_el{
		position: absolute;
	}
	.tee_div{
		top: 62%;
		left: 50%;
		margin-left: -74px;
		width: 135px;
		height: 207px;
	}
	.ball_ready{
		float: right;
		margin: 0 6px 0 0;
	}
	.ball_fly{
		top: 55%;
		left: 50%;
		margin: -160px 0 0 -31px;
		-webkit-animation: golfflyright 3s;
		-moz-animation: golfflyright 3s;
		-ms-animation: golfflyright 3s;
		-o-animation: golfflyright 3s;
		animation: golfflyright 3s;
		
	}
	.gc1{
		top: 62%;
		left: 50%;
		margin: -300px 0 0 -70px;
	}
	.gc2{
		top: 62%;
		left: 50%;
		margin: -370px 0 0 0;
	}
	.gc3{
		top: 62%;
		left: 50%;
		margin: -306px 0 0 -150px;
	}
	.gc4{
		top: 62%;
		left: 50%;
		margin: -500px 0 0 -40px;
	}
	.g_p_btn{
		top: 86%;
		left: 50%;
		margin-left: -130px;
	}
	.cursor{
		top: -40px;
	}
	.cursorpaus{
		-webkit-animation: cursor 2s linear infinite alternate paused forwards;
		-moz-animation: cursor 2s linear infinite alternate paused forwards;
		-ms-animation: cursor 2s linear infinite alternate paused forwards;
		-o-animation: cursor 2s linear infinite alternate paused forwards;
		animation: cursor 2s linear infinite alternate paused forwards;
		
	}
	.cursorrun{
		-webkit-animation: cursor 2s linear infinite alternate forwards;
		-moz-animation: cursor 2s linear infinite alternate forwards;
		-ms-animation: cursor 2s linear infinite alternate forwards;
		-o-animation: cursor 2s linear infinite alternate forwards;
		animation: cursor 2s linear infinite alternate forwards;
		
	}
	.cursor_div{
		width: 560px;
		height: 30px;
		top: 86%;
		left: 50%;
		margin: -60px 0 0 -280px;
		background-color: rgba(255, 255, 255, .5);
		border: 2px solid #fff;
		border-radius: 15px;
	}
	#target{
		height: 26px;
		width: 46px;
		background-color: #fff;
		position: absolute;
		left: 106px;
	}
	.palytip{
		width: 400px;
		height: 50px;
		line-height: 50px;
		font-size: 26px;
		top: 86%;
		left: 50%;
		text-align: center;
		margin: 90px 0 0 -200px;
		color: #fff;
		text-shadow: 0 0 12px #000,0 0 12px #000,0 0 12px #000,0 0 12px #000,0 0 12px #000,0 0 12px #000,0 0 12px #000,0 0 12px #000,0 0 12px #000;
	}
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
</style>