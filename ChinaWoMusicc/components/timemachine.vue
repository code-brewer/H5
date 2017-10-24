<template>
	<div class="game_content">
		<img class="vertigo_img golf_el" style="margin-left: -776px;" :src="$root.activityBasePath+'/images/vertigo_bg.jpg'" alt=""  v-el:vertigo>
		<div class="vertigo_mask golf_el"></div>
		<img class="golf_el" style="width: 100%;height: 100%;" :src="$root.activityBasePath+'/images/lele_boat.png'" alt="">
		<div class="timebg timebgtmp golf_el">
			{{countDown}}<small style="font-size:58px;">s</small>
		</div>
		<div class="yearbg yearbgtmp golf_el">
			<span class="numberbg numberbgtmp">{{parseInt(sum/1000)}}</span><span class="numberbg numberbgtmp">{{parseInt((sum%1000)/100)}}</span><span class="numberbg numberbgtmp">{{parseInt((sum%100)/10)}}</span><span class="numberbg numberbgtmp">{{(sum%10)}}</span>
		</div>

		<div class="gamebtn gamebtnleft golf_el" @touchstart="downHandler('left')" @touchend="upHandler('left')" ontouchstart="return false;" v-el:left>
			往左
		</div>
		<div class="gamebtn gamebtnright golf_el" @touchstart="downHandler('right')" @touchend="upHandler('right')" ontouchstart="return false;" v-el:right>
			往右
		</div>

		<div v-if="isarrive" class="sdiv golf_el">
			<h1>{{station.name}}</h1>
			<img :src="$root.activityBasePath+station.imgurl">
			<p>{{station.text}}</p>
			<a class="btn_green" @click="gamecontinue" style="display: inline-block;">继续穿越</a>
		</div>
	</div>
	<modal :show.sync="isover" :bg="false" :backdrop="false">
		<div class="content">
			<p class="gametitle game_title" style="">你已成功到达{{sum}}年</p>
			<div class="pathbg">
				<img style="display: flex;" :src="$root.activityBasePath+'/images/path_lele.png'" v-el:lele>
			</div>
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
				sum:2016,
				isover:false,
				afterSaveRecord: false,
				countDown:20,
				myInterval:0,
				passName:'',
				isarrive:false,
				stations:[
				{name:"21届",imgurl:"/images/21.jpg",
				text:"1976年7月17日——8月1日，第21届夏季奥运会在加拿大·蒙特利尔举行，共有92个国家和地区参加，共产生613枚金牌。"},
				{name:"11届",imgurl:"/images/11.jpg",
				text:"1936年8月1日——8月16日，第11届夏季奥运会在德国·柏林举行，来自49个国家的3963名运动员参加比赛，首次列入了篮球、皮划艇和队式手球项目。"},
				{name:"1届",imgurl:"/images/1.jpg",
				text:"1896年4月6日——4月15日第一届夏季奥运会在希腊·雅典举行，共有13个国家的311名运动员，出席开幕式的观众达8万人。"}],
				station:{name:"21届",imgurl:"/images/21.jpg",
				text:"1976年7月17日——8月1日，第21届夏季奥运会在加拿大·蒙特利尔举行，共有92个国家和地区参加，共产生613枚金牌。"},
				lelepos:[
				{top:"500",left:"180"},
				{top:"386",left:"20"},
				{top:"340",left:"300"},
				{top:"206",left:"160"},
				{top:"96",left:"300"},
				{top:"34",left:"50"}
				]
			}
		},
		ready() {
			this.cursorgo(false);
			this.gamestart();
		},
		methods:{
			setlelepos(index){
				if(index>4)return;
				this.$els.lele.style.marginLeft = this.lelepos[index].left+"px";
				this.$els.lele.style.marginTop =  this.lelepos[index].top+"px";
			},
			cursorgo(go){
				// var gc = document.getElementById("g_cursor");
				// if(go){
				// 	this.setanimation(gc,"cursor 2s linear infinite alternate forwards");
				// 	gc.style.animationPlayState = "running";
				// }else{
				// 	this.setanimation(gc,"cursor 2s linear infinite alternate paused forwards");
				// 	gc.style.animationPlayState = "paused";
				// }
			},
			gamecontinue(){
				this.isarrive = false;
				if(this.sum<=1896){
					this.showover();
				}
			},
			downHandler(name){
				var btn;
				var c = 0;
				if(name == "left"){
					btn = this.$els.left;
					c = 100;
				}
				else{
					btn = this.$els.right;
					c = -100;
				}
				btn.style.opacity = 0.5;
				if(this.pass(name)){
					var ml = parseInt(this.$els.vertigo.style.marginLeft.replace('px',''));
					ml+=c;
					this.$els.vertigo.style.marginLeft=ml+'px';
				}
			},
			upHandler(name){
				var btn;
				if(name == "left"){
					btn = this.$els.left;
				}
				else{
					btn = this.$els.right;
				}
				btn.style.opacity = 1;
				this.$els.vertigo.style.marginLeft='-776px';
			},
			pass(name){
				if(this.isarrive)return false;
				if(this.passName == name)return false;
				this.passName = name;
				--this.sum;
				if(this.sum == 1976){
					this.station = this.stations[0];
					this.isarrive = true;
				}
				else if(this.sum == 1936){
					this.station = this.stations[1];
					this.isarrive = true;
				}
				else if(this.sum == 1896){
					this.station = this.stations[2];
					this.isarrive = true;
					this.gameover();
				}
				return true;
			},
			roll(){
			},
			routerGo(_name){
				if("continue" == _name){
					router.go({path: '/home'});
				}else if("getPrize" == _name){
					if(!this.$root.islogin){
						this.$dispatch('login', window.location.search);
						return;
					}
					if(this.sum < 5 || this.afterSaveRecord || this.$root.gameLevel<0){
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
				api.saveUserH5Info(this, {types: '跨时空夺宝',scoreorg:that.$root.gameLevel}, (back)=>{
					that.afterSaveRecord = true;
					that.$root.gameLevel = -1;
					if(back.resCode == "0"){
					}else{
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			showover(){
				var c = parseInt((2016-this.sum)/20);
				this.setlelepos(c);
				this.isover = true;
			},
			gamestart(){
				var that = this;
				that.myInterval = setInterval(function(){
					if(that.$route.path.indexOf('/guess') != 0){
						clearInterval(that.myInterval);
						that.myInterval = 0;
						return;
					}
					if(that.isarrive)return;
					if(that.sum<=1896)return;
					that.countDown--;
					if(that.countDown <= 0){
						that.gameover();
						that.showover();
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
				if(that.sum<=1896){
					this.$root.gameLevel = 3;
				}
				else if(that.sum<=1936){
					this.$root.gameLevel = 2;
				}
				else if(that.sum<=1976){
					this.$root.gameLevel = 1;
				}
				else{
					this.$root.gameLevel = 0;
				}
				this.saveUserH5Info();
			}
		}
	}
	
</script>

<style lang="sass">
	.golf_el{
		position: absolute;
	}
	.vertigo_img{
		width: 1552px;
		height: 1552px;
		margin-top: -890px;
		top: 50%;
		left: 50%;
		-webkit-animation: vertigo 8s linear infinite;
		-moz-animation: vertigo 8s linear infinite;
		-ms-animation: vertigo 8s linear infinite;
		-o-animation: vertigo 8s linear infinite;
		animation: vertigo 8s linear infinite;
		
	}
	.vertigo_mask{
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: -webkit-gradient(linear, 0 50%, 0 100%, from(rgba(0, 0, 0, 0.0)), to(rgba(0, 0, 0, 0.7)));
	}
	.timebgtmp{
		width: 184px;
		height: 184px;
		line-height: 184px;
		font-size: 78px;
		color: #fff;
		left: 10px;
		top: 0;
		text-align: center;
		text-shadow: 0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000;
	}
	.yearbgtmp{
		width: 276px;
		height: 248px;
		top: 0;
		left: 50%;
		margin-left: -133px;
		padding-top: 170px;
		text-align: center;
	}
	.numberbgtmp{
		width: 60px;
		height: 60px;
		display: inline-block;
		text-align: center;
		line-height: 60px;
		font-size: 46px;
		color: #fff;
		text-shadow: 0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000;
	}
	.gamebtnleft{
		width: 130px;
		height: 130px;
		line-height: 130px;
		text-align: center;
		font-size: 40px;
		color: #fff;
		text-shadow: 0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000;
		top: 60%;
		left: 26px;
	}
	.gamebtnright{
		width: 130px;
		height: 130px;
		line-height: 130px;
		text-align: center;
		font-size: 40px;
		color: #fff;
		text-shadow: 0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000;
		top: 60%;
		right: 26px;
	}
	.sdiv{
		width: 600px;
		height: 778px;
		margin-left: -300px;
		left: 50%;
		top: 150px;
		background-color: #fff;
		border-radius: 20px;
		text-align: center;
		h1{
			font-size: 52px;
			line-height: 64px;
			color: #232b73;
			text-align: center;
			border-bottom: 8px solid #5b5858;
			margin: 16px 10px 0 10px;
		}
		img{
			width: 520px;
			height: 368px;
			margin-top: 22px;
		}
		p{
			height: 140px;
			margin: 30px 40px 0 40px;
			font-size: 30px;
			color: #040f67;
			text-align: left;
		}
	}
	.content{
		padding-top: 40px;
		position: relative;
		text-align: center;
		.close{
			position: absolute;
			right: 50px;
			top: 0;
		}
		.image{
			display: block;
			margin: 0 auto;
		}
		.gametitle{
			display: inline-block;
			margin: 0 auto;
		}
		.pathbg{
			width: 560px;
			height: 708px;
			display: inline-block;
		}
		.btn-link{
			width: 100%;
			text-align: center;
			margin-top: -40px;
			.btn-1{
				margin-right: 20px;
			}
		}
	}
</style>