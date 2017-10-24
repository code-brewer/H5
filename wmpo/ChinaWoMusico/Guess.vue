<template>
	<div class="app-view view-activity" style="background:url(o/images/game-bg.jpg) center center; background-size: 100% 100%;">
		<timer :state.sync="timerState" :duration="currLevel.allSecounds" style="background:url(o/images/time-bg.png) center center no-repeat; background-size: auto 100%;margin-top:18%;"></timer>
		<div class="logo">
			<img :src="'o/images/logo.png'">
		</div>
		<div class="game-wrap">
			<div class="game-con" id="id">
				<div class="row" @click="flop(index)" :style="{width:(100-currLevel.square)/currLevel.square+'%'}" v-for="(index,item) in listall " track-by="$index">
					<img :src="item.url" class="down" :style="{opacity:item.op,width:96/currLevel.square+'%'}">
					<img :src="'o/images/fu.jpg'" class="up" :style="{opacity:1-item.op}">
				</div>
				<timemodal :show.sync="showTime" :bg="false" :backdrop="false">
		   			<div class="panel">
		   				<div class="msg">
		   					<p class="timetext">{{timeTest}}</p>
		   				</div>
		   				
		   			</div>
	   			
		   		</timemodal>
		   		<timemodal :show.sync="showTimeStartBtn" :bg="false" :backdrop="false">
		   			<div class="panel">
		   				<div class="msg" style="text-align: center; margin-top: 12%;" @click="showTimeStart">
		   					<img :src="'o/images/start-game.png'" />
		   				</div>
		   				
		   			</div>
		   			
		   		</timemodal>
			</div>

			<div class="game-bottom" v-if="levelNum == 2">
				<div class="left">
					<p>在规定时间内连续翻</p>
					<p>出{{levelNum}}对金鸡即可通关 </p>
				</div>
				<div class="right">
					<a style="background: url('./o/images/red-btn-bg.png') center center no-repeat; float: right;" class="confirm-btn" @click="passKey()">通关道具</a>
					
				</div>
			</div>
			<div class="game-bottom" v-if="levelNum == 1">
				<div style="padding: 10px 5%;">
					<p>在规定时间内连续翻出{{levelNum}}对金鸡即可通关 </p>
					
				</div>
				
			</div>
		</div>
		<modal :show.sync="showMsg" :bg="false" :backdrop="false">
   			<div class="panel">
   				<div class="box" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
   					<div class="content" style="text-align: center; padding-bottom: 0;">
						<div class="div1">
							<div class="content-title">
								<img :src="$root.activityBasePath+'/images/light.png'" class="light">
								<div class="rule">
									<p class="title" style="margin-left: 15%;">游戏攻略</p>
									<p>规定时间内点击纸牌翻出金鸡，即可通关，100%中奖（注意还可使用通关小道具哦~） </p>
								</div>
								<p class="prize">通关即有机会获得以下奖品</p>
								<p class="text-center" style="color: #ff0000;font-size: 28px;font-weight: 600;padding-bottom: 10px;">（100%中奖）：</p>
								<img :src="'o/images/game-rule.png'" />							
							</div>
						</div>
						<div class="btn-close" @click="showTimeStarBtn"><img :src="'o/images/close.png'" /></div>
					</div>
					<img class="modal-bottom" style="left: 10px;" :src="'o/images/wen-bottom1.png'" />
   				</div>
   				
   			</div>
   			
   		</modal>
   		
		<modal :show.sync="modalConfig.show" :bg="false" :backdrop="false">
			<div class="success-view">
				<div class="box" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
					<img :src="$root.activityBasePath+'/images/light.png'" style="position: absolute; left: -50px;" v-if="modalConfig.result">
					<p class="title">提示</p>
					<div v-if="modalConfig.result">
						<p class="text" style="padding: 30px 30px 30px 100px;"  v-if="modalConfig.state!=1 && modalConfig.state!=0">很遗憾，闯关失败！使用通关道具可通关游戏，直接参与抽奖哦~</p>
						<p class="text" v-if="modalConfig.state==0">恭喜！闯关成功！</p>
						<p class="text" style="padding: 30px 30px 30px 100px;" v-if="modalConfig.state==1">恭喜！通关成功！快来试试你的手气，幸运大奖等你翻牌~</p>
						<div class="img-panel" v-if="modalConfig.state!=1">
							<img :src="modalConfig.imgUrl">
						</div>
						<div class="text-center" v-if="modalConfig.state==1">
							<img :src="'o/images/fan.jpg'">
						</div>
						<div class="btn-panel">
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" v-if="modalConfig.state==0" @click="next">挑战下一关</a>
							
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" v-if="modalConfig.state!=0 && modalConfig.state!=1" @click="once('once')">重新挑战</a>
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" v-if="modalConfig.state!=0 && modalConfig.state!=1" @click="passKey()">使用道具</a>
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" @click="isLucky()" v-if="modalConfig.state==1">翻牌领奖</a>
						</div>
					</div>
					<div v-if="modalConfig.prize">
						<p class="text">恭喜！领取到‘{{prizeObj.prizename}}’</p>
						<div class="text-center" style="background: url('./o/images/prize-bg.jpg') center center no-repeat; height: 170px;">
							<img :src="$root.activityBasePath+prizeObj.url">
						</div>
						<div class="btn-panel">
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" @click="goToPrize">去领奖</a>
						</div>
					</div>
					<img class="modal-bottom" :src="'o/images/wen-bottom1.png'" style="bottom: 0;" />
				</div>
				
			</div>
		</modal>
		<modal :show.sync="showKeyObj.show" :bg="false" :backdrop="false">
			<div class="success-view">
	   			<div class="box" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
					<p class="title">提示</p>
						<p class="text" style="color: #8f1225;">{{showKeyObj.test}}</p>
						<div class="text-center">
							<img :src="$root.activityBasePath+showKeyObj.url">
						</div>
						
						<div class="btn-panel">
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" @click="once(showKeyObj.status)">继续挑战</a>
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" @click="openVip" v-if="showKeyObj.status == 'novip'">开通使用</a>
							<a style="background: url('./o/images/y-btn-bg.png') center center no-repeat;" @click="usePassKey()" 
							v-if="showKeyObj.status == 'vip'" >开始使用</a>
						</div>
					</div>
					<img class="modal-bottom"style="left: 10px; bottom: 10px;" :src="'o/images/wen-bottom1.png'" style="bottom: 0;" />
				</div>
	   		</div>	
   		</modal>
	</div>
</template>
<script>
	import timer from './components/timer/timer.vue'
	import checkbox from './components/checkbox.vue'
	import modal from './../../src/components/Modal.vue'
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
					imgUrl: 'o/images/lele-smile.png',
					result:false,
					prize:false,
				},

				musicData: {
                	musicBg: 'o/images/music.png',
                	showMusic: false,
                	status: 'play'
                },
				isPlay:true,
				selectItem: 0,
				newItem: {
					
				},
				list:[],
				listall:[],
				listY:[{name:'金鸡',url:'o/images/f4.jpg',op:0,select:1}],

				listN:[
				{name:'猪',url:'o/images/f2.jpg',op:0,select:0},
				{name:'狗',url:'o/images/f3.jpg',op:0,select:0},
				{name:'猴',url:'o/images/f5.jpg',op:0,select:0},
				{name:'羊',url:'o/images/f6.jpg',op:0,select:0},
				{name:'马',url:'o/images/f7.jpg',op:0,select:0},
				{name:'蛇',url:'o/images/f8.jpg',op:0,select:0},
				{name:'龙',url:'o/images/f9.jpg',op:0,select:0},
				{name:'兔',url:'o/images/f10.jpg',op:0,select:0},
				{name:'虎',url:'o/images/f11.jpg',op:0,select:0},
				{name:'牛',url:'o/images/f12.jpg',op:0,select:0},
				{name:'鼠',url:'o/images/f13.jpg',op:0,select:0},

				],
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
					this.modalConfig.imgUrl = "o/images/lele-cry.png";
					this.modalConfig.show = true;
					this.modalConfig.result = true;
					
				}
			},
			pass(val){
				if(val && val == 'true' || val == true){
					this.modalConfig.state = 1;
					this.passResult();

				}
			},
			//监听点击存储数据
			clickIndex(val){
				var len = val.length;
				if(this.currLevel.square == 3 && len > 1){
					if(val[len-1].select+val[len-2].select==2){
						if(this.levelNum < this.$root.activityinfostr.levels.length) {
							// localStorage['aus_game_level'] = parseInt(this.levelNum)+1;
							 sessionStorage['o_game_level'] = parseInt(this.levelNum)+1;
							 this.modalConfig.state = 0;
							 this.timerState='setEnd';
							 this.ischeck = true;
							 this.listall[val[len-1].index].op = 1;
							 this.listall[val[len-2].index].op = 1;
							 this.passResult();
						}
					}
				}else if(this.currLevel.square == 4 && len > 3){
					var jcount  = 0;
					for (var i = 0; i < len; i++) {
						if(this.listall[val[i].index].op ==1 && val[i].select==1){
							jcount++;
						}
					}
					if(jcount==4){					 	 
							this.ischeck = true;
							// this.listall[val[len-1].index].op = 1;
							// this.listall[val[len-2].index].op = 1;
							// this.listall[val[len-3].index].op = 1;
							// this.listall[val[len-4].index].op = 1;
						if(this.levelNum < this.$root.activityinfostr.levels.length) {
							// localStorage['aus_game_level'] = parseInt(this.levelNum)+1;
							 sessionStorage['o_game_level'] = parseInt(this.levelNum)+1;
							 this.modalConfig.state = 0;
							 this.timerState='setEnd';
							 this.passResult();
						}
						if(this.levelNum == this.$root.activityinfostr.levels.length){
							sessionStorage['pass'] = true;
							this.modalConfig.state = 1;
							this.timerState='setEnd';
							this.passResult();
							// this.$root.gameLevel = 1;
						}
					}
				}
			},

			
		},
		created() {
		},
		ready() {
			this.init();
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
			init(){
				this.ischeck = false;
				this.listall=[];
				this.currLevel = this.getcurrLevel();
				//不同关数。设置不同数据
				var sindex = 0;
				var lenY = 0;
				var lenN = 0;
				console.log(this.currLevel.square);
				if(this.currLevel.square == 3){
					lenY = 2;
					lenN = 7;
				}else if(this.currLevel.square == 4){
					lenY = 4;
					lenN = 12;
				}
				//循环push非金鸡
				for(var i = 0 ; i< lenN; i++){
					// var ran = parseInt(Math.random()*7);
					var item = {};
					item.name = this.listN[sindex].name;
					item.url = this.listN[sindex].url;
					item.op = this.listN[sindex].op;
					item.select = this.listN[sindex].select;
					this.listall.push(item);
					sindex++;
					if(sindex>=this.listN.length){sindex=0;}
				}
				//循环push金鸡
				for(var j = 0 ; j<lenY; j++){
					var item = {};
					item.name = this.listY[0].name;
					item.url = this.listY[0].url;
					item.op = this.listY[0].op;
					item.select = this.listY[0].select;
					this.listall.push(item);
				}
				// for(var k = 0; k<this.listall.length; k++){
				// 	this.listall[k].url = 'o/images/m1.jpg';
				// }
				//打乱数组
				this.listall.sort(function(){
					 return 0.6 - Math.random();
				})
				if(sessionStorage['o_game_level']) {
					this.levelNum = parseInt(sessionStorage['o_game_level']);
					
				}
				console.log(this.levelNum);
			},
			showTimeCount(index){
				this.timeTest = 3;
            	this.showMsg = false;
            	this.showTime = true;
            	var timeout=setInterval(()=>{
	 				this.timeTest--;
	 				if(this.timeTest<1){
	 					this.showTime = false;
	 					this.timerState = "start";
	 					clearTimeout(timeout);
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
				that.modalConfig.imgUrl = "o/images/lele-smile.png";
				that.$root.gameLevel = 1;
				setTimeout(function(){
					that.modalConfig.show = true;
				     that.modalConfig.result = true;
				 },1000)
				
			},
			//通关道具
			passKey(){
				if(this.$route.path.indexOf('/guess') != 0){
					return;
				}
				var that = this;
				that.timerState='setEnd';
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
				// location.reload();
				that.init();
				that.showTimeStarBtn();
			},
			//下一关
			next(){
				this.addOperLog('button','a-sucessNext');
				this.modalConfig.show = false;
				this.modalConfig.result = false;
				// location.reload();
				this.init();
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
			// 翻牌
			flop(index){
				// if(this.ischeck){
				// 	return;
				// }
				// if(this.sum < 2 || (this.currLevel.square == 4 && this.sum < 4)){
				// 	this.sum ++;
				// 	this.listall[index].op = 1;
				// 		var timeout=setTimeout(()=>{
				// 			if(!this.ischeck){
			 // 					this.listall[index].op = 0;
			 // 				}
			 // 				this.sum --;
		 	// 			},2000);
					
				// 	for (var i = 0; i < this.clickIndex.length; i++) {
		 	// 			if(this.clickIndex[i].index == index){
		 	// 				this.clickIndex.splice(i,1);
		 	// 				break;
		 	// 			}
		 	// 		}
		 	// 		var item = {};
		 	// 		item.index = index;
		 	// 		item.select = this.listall[index].select;
				//     this.clickIndex.push(item);
				  
				// }
				
				if(this.ischeck || this.listall[index].op == 1){
					return;
				}
				if(this.sum < 2 || (this.currLevel.square == 4 && this.sum < 4)){
					this.listall[index].op = 1;
					var isj = this.listall[index].select ==1;
					if(!isj){
						this.sum ++;
						var timeout=setTimeout(()=>{
							if(!this.ischeck){
			 					this.listall[index].op = 0;
			 				}
			 				this.sum --;
		 				},2000);
					}
					for (var i = 0; i < this.clickIndex.length; i++) {
		 				if(this.clickIndex[i].index == index){
		 					this.clickIndex.splice(i,1);
		 					break;
		 				}
		 			}
		 			if(!isj){
		 				var jcount = 0;
		 				for (var i = 0; i < this.clickIndex.length; i++) {
		 					if(this.listall[this.clickIndex[i].index].select==1){
		 						if(jcount == 1){
		 							jcount = 0;
		 						}else{
		 							jcount = 1;
		 							if(i == this.clickIndex.length-1){
			 							this.listall[this.clickIndex[i].index].op = 0;
			 						}
		 						}
		 					}else if(jcount==1){
		 						jcount = 0;
		 						this.listall[this.clickIndex[i-1].index].op = 0;
		 					}
		 				}
		 			}
		 			var item = {};
		 			item.index = index;
		 			item.select = this.listall[index].select;
				    this.clickIndex.push(item);
				  
				}

				
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
					// else if(this.times == '0' ) {
					// // //是否会员
					// // 	if(this.$root.cookieVip == "0000000000"){
					// // 		this.alertTip.rootTip = true;
					// // 		this.alertTip.Dtip = true;
					// // 		this.alertTip.Atip = false;
					// // 		this.alertTip.Btip = false;
					// // 		this.alertTip.Ctip = false;
					// // 		this.alertTip.Ftip = false;
					// // 	}else{
							
					// // 	}
								
							
					// }
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
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #8f1225;
			padding-bottom: 87px;
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
					color: #8f1225;
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
		> .wap-timer {
			width: px2rem(436px);
			height: px2rem(129px);
			margin: auto;
			.wap-timer-number {
				width: 100%;
				height: 100%;
				p.min{
					padding-left: px2rem(30px);;
				}
				p.second{
					padding-left: px2rem(48px);;
				}
				p {
					letter-spacing: px2rem(23px);
					display: inline-block;
					margin: 0;
					width: px2rem(145px);
					height: px2rem(129px);
					line-height:px2rem(170px);
					color: #fff;
					font-size:4rem;
					float: left;
					// margin-right:px2rem(13px);
					box-sizing:border-box;
					padding-left:px2rem(10px);
					&:last-child {
						margin-right: 0;
					}

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
				    width: 75%;
				    margin-left: 25%;
				    font-size: 27px;
				    color: #8f1225;
				    text-align: left;
				}
				.prize{
					font-size: 30px;
					font-weight: bold;
					 color: #8f1225;
					 padding: 15px 0;
				}
				.title{
					font-size: 50px;
					padding: 20px 0;
					margin-top: 30px;
				}
			}
			.msg {
				.timetext{
				    width: 200px;
				    height: 200px;
				    line-height: 170px;
				    margin: 0 auto;
				    color: #fff;
				    margin-top: 20%;
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
			top: 10px;
			max-width: 56px;
			max-height: 50px;
		}
	}
	.modal-bottom{
		position:absolute;
    	bottom: 10px;
    	left: 0;
	}
</style>