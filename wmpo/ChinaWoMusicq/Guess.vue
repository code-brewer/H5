<template>
	<div class="app-view view-activity" style="background:url(q/images/game-bg.jpg) center center; background-size: 100% 100%; overflow: hidden;">
		<div class="game-time">
			<img :src="'q/images/time.png'">
			<timer :state.sync="timerState" :duration="currLevel.allSecounds"></timer>
		</div>
		<div class="activity-rule" @click="activityRule()">
			<img :src="'q/images/rule.png'">
		</div>
		<div class="logo">
			<img :src="'q/images/logo.png'">
		</div>
		<div class="div" :class="{shake: isBoom}">
			<div class="person" style="background:url(q/images/lele-t.png) center center;" :style="{transform: 'translate3d(' + move + 'px, 0, 0)'}"></div>
			<div class="turn">
				<div class="turn-l"><img :src="'q/images/turn-left.png'"></div>
				<div class="turn-r"><img :src="'q/images/turn-right.png'"></div>
			</div>
			<div class="direction clearfix">
				<div class="left" @touchstart="touchstart($event, 'left')" @touchend="touchend"></div>
				<div class="right" @touchstart="touchstart($event, 'right')" @touchend="touchend"></div>
			</div>
			<ul class="list">
				<li v-for="item in list" :class="{transition: item.transition}" :style="{left: item.x + 'px', transform: 'translate3d(0, '+item.y+'px, 0)', width: item.width + 'px', height: item.height + 'px'}">
					<p class="score" v-if="item.index == 1 && item.score">+20</p>
					<p class="score" v-if="item.index == 4 && item.score">-5</p>
					<p class="score" v-if="item.index == 2 && item.score">+5</p>
					<p class="score" v-if="item.index == 3 && item.score">+10</p>
					<img :src="item.src">

				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="center">目前积分：{{allScore}}</div>
			<div class="right" @click="passKey()"><img :src="'q/images/pass-btn.png'" style="vertical-align:middle;" /></div>
		</div>
		<modal :show.sync="showMsg" :bg="false" :backdrop="false">
   			<div class="panel" style="margin-top: -80px;">
   				<div class="box" style="background-image: url('./q/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #502c7a; border-radius: 20px;">
   					<div class="content" style="text-align: center; padding-bottom: 0;">
						<div class="div1">
							<div class="content-title">
							<!-- 	<img :src="$root.activityBasePath+'/images/light.png'" class="light"> -->
								<div class="rule">
									<p class="title">游戏攻略</p>
									<!-- <div>
										<p  class="left-h">按紧向左<img :src="'q/images/hand-left.png'" /> </p> 
									    <p  class="left-h"><img :src="'q/images/hand-right.png'" />按紧向右</p>
								    </div> -->
									<p style="padding: 10px 20px; font-size: 30px;"><span style="color:#ff405f; font-size: 32px;">按紧屏幕任意左右侧可移动碗接汤圆</span>，完成<span style="color:#ff405f; font-size: 35px;">200</span>积分即可通关，还有小道具帮你通关，小心不要接错东西咯~  </p>
								</div>
								<div class="t-con">
									<p class="title">汤圆的分数：</p>
									<img :src="'q/images/game-rule1.png'" />
								</div>
								<p class="prize">通关即有机会获得以下奖品:</p>
								<!-- <p class="text-center" style="color: #ff0000;font-size: 28px;font-weight: 600;padding-bottom: 10px;">（100%中奖）：</p> -->
								<img :src="'q/images/game-rule.png'" style="width: 85%;" />							
							</div>
						</div>
						<div class="btn-close" @click="showTimeStarBtn"><img :src="'q/images/close.png'" /></div>
					</div>
					<img class="modal-bottom" style="left: 10px;" :src="'q/images/wen-bottom1.png'" />
   				</div>
   				
   			</div>
   			
   		</modal>
   		<timemodal :show.sync="showTime" :bg="false" :backdrop="false">
   			<div class="panel">
   				<div class="msg" style="margin-left: -5%;">
   					<p class="timetext">{{timeTest}}</p>
   				</div>
   				
   			</div>
			
   		</timemodal>
   		<timemodal :show.sync="showTimeStartBtn" :bg="false" :backdrop="false">
   			<div class="panel">
   				<div class="msg" style="text-align: center; margin-top: 30%; margin-left: -5%;" @click="showTimeStart">
   					<img :src="'o/images/start-game.png'" />
   				</div>
   				
   			</div>
   			
   		</timemodal>
		<modal :show.sync="modalConfig.show" :bg="false" :backdrop="false">
			<div class="success-view">
				<div class="box" style="background-image: url('./q/images/wen.jpg'); background-repeat-y: repeat; ">
					<img :src="$root.activityBasePath+'/images/light.png'" style="position: absolute; left: 0px;" v-if="modalConfig.result">
					<img class="modal-bottom" :src="'q/images/wen-bottom.png'" style="bottom: 0;" />
					<p class="title">提示</p>
					<div v-if="modalConfig.result">
						<p class="text" style="padding: 30px 30px 30px 100px;"  v-if="modalConfig.state!=1 && modalConfig.state!=0">很遗憾，闯关失败！使用通关道具可通关游戏，直接参与抽奖哦~</p>
						<p class="text" v-if="modalConfig.state==0">恭喜！闯关成功！</p>
						<p class="text" style="padding: 30px 30px 30px 100px;" v-if="modalConfig.state==1">恭喜！通关成功！快来试试你的手气，幸运大奖等你开启~</p>
						<div class="img-panel" v-if="modalConfig.state!=1">
							<img :src="modalConfig.imgUrl">
						</div>
						<div class="text-center" v-if="modalConfig.state==1">
							<img :src="'q/images/gold.png'" v-if="!goldOpen">
							<img :src="'q/images/gold-open.png'"  v-if="goldOpen">
						</div>
						<div class="btn-panel">
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" v-if="modalConfig.state==0" @click="next">挑战下一关</a>
							
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" v-if="modalConfig.state!=0 && modalConfig.state!=1" @click="once('once')">重新挑战</a>
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" v-if="modalConfig.state!=0 && modalConfig.state!=1" @click="passKey()">使用道具</a>
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" @click="isLucky()" v-if="modalConfig.state==1">幸运开奖</a>
						</div>
					</div>
					<div v-if="modalConfig.prize">
						<p class="text">恭喜！领取到‘{{prizeObj.prizename}}’</p>
						<div class="text-center" style="background: url('./q/images/prize-bg.jpg') center center no-repeat; height: 170px;">
							<img :src="$root.activityBasePath+prizeObj.url">
						</div>
						<div class="btn-panel">
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" @click="goToPrize">去领奖</a>
						</div>
					</div>
				
				</div>
				
			</div>
		</modal>
		<modal :show.sync="showKeyObj.show" :bg="false" :backdrop="false">
			<div class="success-view">
	   			<div class="box" style="background-image: url('./q/images/wen.jpg'); background-repeat-y: repeat; ">
					<p class="title">提示</p>
						<p class="text" style="color: #8f1225;">{{showKeyObj.test}}</p>
						<div class="text-center">
							<img :src="$root.activityBasePath+showKeyObj.url">
						</div>
						
						<div class="btn-panel">
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" @click="once(showKeyObj.status)">继续挑战</a>
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" @click="openVip" v-if="showKeyObj.status == 'novip'">开通使用</a>
							<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" @click="usePassKey()" 
							v-if="showKeyObj.status == 'vip'" >开始使用</a>
						</div>
					</div>
					<!-- <div class="btn-close" @click="showTimeStarBtn"><img :src="'q/images/close.png'" /></div> -->
					<img class="modal-bottom"style="left: 10px; bottom: 10px;" :src="'q/images/wen-bottom.png'" style="bottom: 0;" />
				</div>
	   		</div>	
   		</modal>
	</div>
</template>
<script>
	import timer from './components/timer/timer.vue'
	import checkbox from './components/checkbox.vue'
	import modal from './modal/Modal.vue'
	import timemodal from './modal/timeModal.vue'
	import api from './utils/serverapi.js'
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
			music,
			timemodal
		},
		data() {
			return {
				modalConfig: {
					state: 0,
					show: false,
					imgUrl: 'q/images/lele-smile.png',
					result:false,
					prize:false,
				},

				musicData: {
                	musicBg: 'q/images/music.png',
                	showMusic: false,
                	status: 'play'
                },
				isPlay:true,
				selectItem: 0,
				newItem: {
					
				},
				
				listall:[],
				
				clickIndex:[],
				timerState: '',
				sum:0,
				levelNum:1,
				pass:false,
				showMsg: false,
				timeTest: 3,
        		showTime: false,
        		showTimeStartBtn:false,
        		iclick:false,
        		times:'',
        		prizeObj:{
        			prizename:'',
        			url:'',
        			sid:null,
        		},
        		showKeyObj:{
        			show:false,
        			test:'',
        			url:'',
        			status:'',
        		},
        		ischeck:false,
        		ischeckTwo:false,

    			move: 220,
				step: 20,
				list: [],
				startGame:null,
				moveTimer: null,
				downTimer: null,
				isBoom: false,
				width: document.documentElement.offsetWidth,
				height: document.documentElement.offsetHeight,
				allScore:0,
				goldOpen: false,
				timeout:null,
        		

			}
		},
		computed: {
			//拿关数数据
			currLevel() {
				if(sessionStorage['o_game_level']) {
					this.levelNum = parseInt(sessionStorage['o_game_level']);
					
				}
				var level = this.$root.activityinfostr.levels[this.levelNum-1];
				level.allSecounds = this.getSeconds(level.time.mins, level.time.secounds);
				level.square = parseInt(level.square);
				return level;
				
			}
		},
		watch: {
			timerState(val) {
				if(val == 'end') {
					this.modalConfig.state = 2;
					this.modalConfig.imgUrl = "q/images/lele-cry.png";
					this.modalConfig.show = true;
					this.modalConfig.result = true;
					this.clearAll();
					
				}
			},
			pass(val){
				if(val && val == 'true' || val == true){
					this.modalConfig.state = 1;
					this.passResult();
					this.clearAll();

				}
			},
			//监听点击存储数据
			allScore(val){
				if(val >= 200){
					this.modalConfig.state = 1;
				 	this.timerState='setEnd';
					this.passResult();
					this.clearAll();
				}
			},

			
		},
		created() {
		},
		ready() {
			// this.init();
			// this.pass = sessionStorage.getItem('pass');
			if(!sessionStorage.getItem("showMsgFlag")){
				sessionStorage.setItem("showMsgFlag",true);
				this.showMsg=true;
			}else{
				this.showTimeStartBtn = true;
				
			}

			if(!this.$root.islogin){
				this.$root.loginokcallback = this.lb;
			}else{
				this.lb();
			}
			
		},
		events: {
			checked(v, check) {
				
			}
		},
		methods: {
			getcurrLevel() {
				if(sessionStorage['o_game_level']) {
					this.levelNum = parseInt(sessionStorage['o_game_level']);
					
				}
				var level = this.$root.activityinfostr.levels[this.levelNum-1];
				level.allSecounds = this.getSeconds(level.time.mins, level.time.secounds);
				level.square = parseInt(level.square);
				return level;
				
			},
			
			showTimeCount(index){
				this.timeTest = 3;
            	this.showMsg = false;
            	this.showTime = true;
            	this.timeout=setInterval(()=>{
	 				this.timeTest--;
	 				if(this.timeTest<1){
	 					this.start();
	 					this.showTime = false;
	 					this.timerState = "start";

	 					clearInterval(this.timeout);
	 					// window.jystart();
	 					// if(index == 'reset'){
	 					// 	window.restartsm();
	 					// }
	 				}
	 			},1000);

            },
            //通关成功modal
			passResult() {
				var that = this;
				that.$root.gameLevel = 1;
				that.modalConfig.imgUrl = "q/images/lele-smile.png";
				setTimeout(function(){
					that.modalConfig.show = true;
				     that.modalConfig.result = true;
				 },500)
				
			},
			//通关道具
			passKey(){
				if(this.$route.path.indexOf('/guess') != 0){
					return;
				}
				var that = this;
				clearInterval(that.timeout);//清除倒计时
				that.timerState='setEnd';
				that.clearAll();
				if(!that.$root.islogin){
					that.$root.login = true;
					that.$root.loginokcallback = this.lb;
					that.$root.$refs.login.setLoginCloseListen(this.once);
				}else{
					that.showKeyObj.show = true;
					if(that.$root.cookieVip == "0000000000"){
						that.showKeyObj.status = 'vip';
						that.showKeyObj.url = '/images/pass-key.png';
						that.showKeyObj.test = '您已是沃音乐会员，可使用通关道具！（使用道具实现游戏通关，可立即参与抽奖）';
					}
					else{
						that.showKeyObj.status = 'novip';
						that.showKeyObj.url = '/images/lele-cry.png';
						that.showKeyObj.test = '抱歉，您还不是沃音乐会员，无法使用通关道具！开通会员即可使用，首月还可免会员资费！';
					}
					
				}
			},
			usePassKey(){
				this.showKeyObj.show = false;
				sessionStorage['pass'] = true;
				this.modalConfig.state = 1;
				this.timerState='setEnd';
				this.clearAll();
				this.passResult();
			},
			openVip(){
				this.showKeyObj.show = false;
				this.$root.vipbenefit = true;
				//开通完会员调this.passKey
				this.$root.$refs.openvip.setOpenvipListen(this.passKey);
			},
			//重新挑战
			once(type){
				var that = this;
				that.timerState='setEnd';
				if(type == 'vip'){
					that.addOperLog('button','a-keyOnce');
				}
				else if(type == 'novip'){
					that.addOperLog('button','a-nokeyOnce');
				}else{
					that.addOperLog('button','a-failOnce');
				}
				that.showKeyObj.show = false;
				that.modalConfig.show = false;
				that.modalConfig.result = false;
				that.clearAll();
				that.allScore = 0;
				that.move = 220;
				// location.reload();
				// that.init();
				that.showTimeStarBtn();
			},
			//下一关
			next(){
				this.addOperLog('button','a-sucessNext');
				this.modalConfig.show = false;
				this.modalConfig.result = false;
				// location.reload();
				//this.init();
				this.showTimeStarBtn();
			},
			//点击开始倒计时
			showTimeStart(){
				this.showTimeStartBtn = false;
				this.showTimeCount();
			},
			//显示可点击倒计时按钮
			showTimeStarBtn(){
				this.showMsg = false;
				this.showTime = false;
				this.showTimeStartBtn = true;

			},
			activityRule() {
				this.addOperLog('button','a-rule');
				this.$root.showActivityD = true;
			},	
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
			
			saveUserH5Info() {
				var that = this;
				if(!that.$root.islogin) return;
				that.$dispatch('loading', {
					name: 'guess_save',
					icon: true,
					text: '数据保存中...',
					show: true,
					duration: 20 * 1000
				});
				api.saveUserH5Info(this, {
					types: '拼歌单达人',
					scoreorg: that.$root.gameLevel
				}, (back) => {
					that.$dispatch('cancelloading', 'guess_save');
					that.$root.gameLevel = -1;
					if(back.resCode == "0") {
					
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			//点击翻牌
			isLucky() {
				this.addOperLog('button','a-successPrize');
				this.$root.gameLevel = 1;
				if(!this.$root.islogin){
					this.$root.login = true;
					this.$root.loginokcallback = this.timeb;
					this.$root.whereLogin= "a-login";
				}else{
					this.goldOpen = true;
					this.saveUserH5Info();
					this.isDoLucky();
					
				}
				
			},
			// 判断是否有机会
		    isDoLucky(){
		    	if(this.$root.cookieVip == "0000000000"){
		    		if(!this.iclick) {
						this.userDoLucky();
					} 
				
		    	}else{
		    		this.$root.openvip = true;
		    	}
				
			},
			//用户抽奖
			userDoLucky() {
				var that = this;
				that.iclick = true; //不能点击
				
				api.doLucky(this, {
					"types": "跑马灯"
				}, (back) => {
					that.getActUserTimes();
					if(back.resCode == '0') {
						var prize = back.repBody[0];
						that.prizeObj.prizename = prize.pname;
						that.prizeObj.url = prize.imgurl;
						that.prizeObj.sid = prize.sid ? prize.sid : '';
						sessionStorage.setItem('luckyId',prize.gid)
						sessionStorage.setItem('lingitem',JSON.stringify(prize));
						that.modalConfig.result = false;
						that.modalConfig.prize = true;
						that.goldOpen = false;
						localStorage.setItem('awardmobile',"false");
					}else if(back.resCode == '20001'){
						that.modalConfig.result = false;
						that.$root.alreadyprize = true;
						// var prize = back.repBody[0];
						// that.prizeObj.prizename = prize.pname;
						// that.prizeObj.url = prize.imgurl;
						// that.prizeObj.sid = prize.sid ? prize.sid : '';
						// sessionStorage.setItem('luckyId',prize.gid)
						// sessionStorage.setItem('lingitem',JSON.stringify(prize));
						// that.modalConfig.result = false;
						// that.modalConfig.prize = true;
						// localStorage.setItem('awardmobile',"true");
					}
					else {
						that.$dispatch('handle_server_error', back);
					}
					that.unPrize = back.resMsg;
					that.iclick = false;
				});
			},	
			//去领奖
			goToPrize(){
				var that = this;
				// if(!that.$root.islogin){
				// 	that.$root.login = true;
				// 	that.$root.loginokcallback = that.lb;
				// }else{
				if(that.$root.cookieVip == "0000000000"){
					if(that.prizeObj.sid == ''){
						that.addOperLog('button','a-nosidGoprize');
						that.modalConfig.show = false;
						that.modalConfig.prize = false;
						that.$root.showAddress = true;
					}else{
						that.addOperLog('button','a-sidGoprize');
						that.modalConfig.show = false;
						that.modalConfig.prize = false;
						that.$root.buytone = true;
					}
				}else{
					// that.modalConfig.show = false;
					// that.modalConfig.prize = false;
					that.$root.openvip = true;
					that.$root.$refs.openvip.setOpenvipListen(null);
				}
				// }
			},	
			// 获取剩下的次数    
			getActUserTimes() {
				var that = this;
				api.queEveryDay(this, {}, (back) => {
					if(back.resCode == 0 || back.resCode == "0") {
						that.times = parseInt(back.repBody[0].player);
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			lb(){
				this.getActUserTimes();
				this.once();
			},
			timeb(){
				this.getActUserTimes();
			},
			start() {
				var that = this;
				that.allScore = 0;
				that.startGame = setInterval(() => {
					var index = Math.floor(Math.random() * 4 + 1),
						img = new Image();
					img.src = 'q/images/t' + index + '.png';
					img.onload = () => {
						let width = Math.ceil(img.width),
	                        height = Math.ceil(img.height),
	                        x = Math.floor((Math.random() * (that.width- 60 - width))+60);
	                    that.list.push({
	                    	index:index,
	                    	score:false,
	                    	width: width,
	                    	height: height,
	                    	src: img.src,
	                    	transition: true,
	                    	x: x,
	                    	y: 0
	                    })
	                    that.down(that.list[that.list.length - 1]);
					}
				}, 1500);
			},
			down(item) {
				let downTimer = setInterval(() => {
					if (this.remove(item, downTimer)) {
						clearInterval(downTimer);
						return false;
					}
					item.y += this.step;
				}, 100);
			},
			remove(item, timer) {
				if (item.y > (this.height - 40)) {
					console.log('x'+item.x+item.width);
					console.log(item.width);
					console.log('y'+this.move +120);
					if (item.x + item.width < this.move +120 || item.x > (this.move + 
						150)) {
						console.log('y1')
						console.log(item.y)
						this.list.$remove(item);
						
						// console.log('miss')
					} else {
						console.log('y2')
						console.log(item.y)
						// item.transition = false;
						
						if(item.index == 4){
							// console.log('-5');
							item.score = true;
							this.allScore = this.allScore-5 > 0 ? this.allScore-5 : 0;
							
						}else if(item.index == 1){
							// console.log('+20');
							item.score = true;
							this.allScore += 20;
							
						}else if(item.index == 2){
							// console.log('+5');
							this.allScore += 5;
							item.score = true;
							
						}
						else if(item.index == 3){
							// console.log('+10');
							this.allScore += 10;
							item.score = true;
							
						}
						
						setTimeout(() => {
							this.list.$remove(item);
						}, 300)
						// console.log('item'+JSON.stringify(item));

						
						// if (item.src.match(/15/)) {
						// 	this.isBoom = true;
						// 	setTimeout(() => {
						// 		this.isBoom = false;
						// 	}, 500)
						// }
						// clearInterval(timer);
						
					}
					return true;
				}
			},
			touchstart(e, type) {
				e.preventDefault();
				clearInterval(this.moveTimer);
				if (type === 'left') {
					this.moveTimer = setInterval(() => {
						if ((this.move - this.step) < 0) {
                            return;
                        }
                        this.move -= this.step;
					}, 50);
				} else {
					this.moveTimer = setInterval(() => {
						if ((this.move + this.step) > (this.width - 197)) {
                            return;
                        }
                        this.move += this.step;
					}, 50);
				}
			},
			clearAll(){
				this.list = [];
				clearInterval(this.startGame);
				clearInterval(this.moveTimer);
			},
			touchend(e) {
				e.preventDefault();
				clearInterval(this.moveTimer);
			},

			getSeconds(mins, secounds) {
				return (mins ? parseInt(mins) : 0)*60 + (secounds ? parseInt(secounds) : 0)
			},
		}
	}
</script>
<style lang="sass">
	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;
		@return $return;
	}
	.game-con{
	    width: 90%;
	    margin-left: 5%;
	    text-align: center;
	    background: #995200;
        padding: 5px 5px 2px 0;
        position: relative;
	}
	.row{
		display: inline-block;
		margin-left: 1%;
	}
	.up{
		width: 100%;
		
	}
	.down{
		position: absolute;
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
			padding: 10px;
			padding-bottom: 80px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #8f1225;
			
			.text{
		    	color: #7c7c7c;
			    font-size: 35px;
			    text-align: center;
			    padding: 30px;
			}
			.img-panel {
				width: 100%;
				text-align: center;
				margin-bottom: -20px;
			}
			.btn-panel {
				width: 100%;
				text-align: center;
				a {
					font-size: 32px;
					display: inline-block;
					line-height: 90px;
					border-radius: 78px;
					width: 235px;
					color: #fff;
					height: 90px;
					margin-top: 10px;
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
				color: #8f1225;
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
		.game-wrap{
		    width: 94%;
		    margin: 20px auto;
		    background: rgba(250,250,250,0.6);
		    padding: 30px 0;
		    border-radius: 10px;
		    .game-bottom{
		    	color: #8f1225;
		    	font-size: 26px;
		    	line-height: 40px;
		    	font-weight: bold;
		    	.left{
	    		    width: 40%;
			        padding-top: 2%;
				    padding-bottom: 2%;
				    margin-left: 4%;
				    display: inline-block;
				    vertical-align: middle;
		    	}
		    	.right{
		    		    width: 49%;
					    display: inline-block;
					    vertical-align: middle;
					    margin-right: 4%;
		    		.confirm-btn{
	    			    width: 139px;
					    height: 67px;
					    display: inline-block;
					    line-height: 67px;
					    text-align: center;
					    font-size: 30px;
					    color: #fff;
		    		}
		    		.right2{
	    			    float: right;
    					margin-right: 5%;
		    		}
		    	}
		    }
		}
		width: 100%;
		// height: px2rem(1008px);
		// min-height: px2rem(1120px);
		.wap-timer {
			
			.wap-timer-number {
				width: 100%;
				height: 100%;
				p {	
					letter-spacing: 3px;
					display: inline-block;
					font-size: 30px;
					font-weight:600;
					color: #ff961e;
					text-shadow: 3px 3px 3px #000;

				}
			}
		}
		.panel {
			.content{
				// padding-bottom: 87px;
				.light{
					position: absolute;
					top: 0px;
					left:0px;
				}
				.rule{
				    width: 100%;
				    font-size: 27px;
				    color: #8f1225;
				    text-align: left;
				}
				.prize{
					font-size: 30px;
					font-weight: bold;
					 color: #8f1225;
					 padding: 10px 0;
				}
				.title{
					font-size: 50px;
					padding: 10px 0;
					text-align: center;
					// margin-top: 30px;
				}
				.t-con{
					.title{
						font-size: 30px;
						text-align: left;
						padding: 10px 0 10px 50px;
					}
				}
			}
			.msg {
				.timetext{
				    width: 200px;
				    height: 200px;
				    line-height: 170px;
				    margin: 0 auto;
				    color: #fff;
				    margin-top: 35%;
				    font-size: 180px;
				    border: 10px solid #fff;
				    border-radius: 50%;
				    text-align:center;
				}
				
			}
			
		}
		.btn-close{
			position: absolute;
			right: 10px;
			top: -20px;
			max-width: 56px;
			max-height: 50px;
		}
	}
	.modal-bottom{
		position:absolute;
    	bottom: 10px;
    	left: 0;
	}
	@keyframes shake {
        0%,100% {
            transform: rotate(0deg);
        }

        10%,30%,50%,70%,90% {
            transform: rotate(3deg);
        }

        20%,40%,60%,80% {
            transform: rotate(-3deg);
        }
    }
    .display{
    	display: none;
    }
    .shake {
        animation: shake .5s;
    }
	.div {
		// position: relative;
		height: 100%;
		overflow: hidden;
		// background: url(../../img/bg.jpg) no-repeat;
		background-size: cover;
	}
	.turn{
		position: absolute;
	    bottom: 13%;
	    width: 90%;
	    margin-left: 5%;
	    .turn-l{
			float: left;
	    }
	    .turn-r{
	    	float: right;
	    }
	}
	.person {
		position: absolute;
		left: 0;
		bottom: 10%;
		width: 197px;
		height: 163px;
		// background: url(../../img/jie.png) 0 0 / 100% 100% no-repeat;
		transition: all .4s linear;
	}
	.direction {
		position: absolute;
		left: 0;
		bottom: 10%;
		width: 100%;
		height: 200px;
		z-index: 10;
		div {
			float: left;
			width: 50%;
			height: 100%;
		}
	}
	.list {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		li {
			position: absolute;
			top: -100px;
			&.transition {
				transition: all 1s linear;
			}
			.score{
				position: absolute;
				top: -20px;
				left: 50%;
				color: #ff961e;
				font-size: 50px;
				text-align: center;
				transform: translate(-50%, -50%);
			}
		}
		img {
			width: 100%;
		}
	}
	.bottom{
		.center{
		    position: absolute;
		    bottom: 3%;
		    left: 10%;
		    color: #ff961e;
		    font-size: 30px;
		    font-weight: 600;
		}
		.right{
		    position: absolute;
		    bottom: 2%;
		    right: 8%;
		}
	}
	.game-time{
	    position: absolute;
	    top: 4%;
	    width: 160px;
	    left: 50%;
	    margin-left: -80px;
	    text-align: center;
	}
	.activity-rule{
		position: absolute;
	    top: 15%;
	    left: -1%;
	    z-index: 10;
	}
	.left-h{
		width: 48%;
		text-align:center;
		display: inline-block;
		img{
			vertical-align:middle;
		}
	}

</style>