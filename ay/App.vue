<template>
	<div class="app-view">
		<div class="times-bar">今天还剩<strong>{{gameTimes}}</strong>次机会</div>
		<div class="marquee-game">
			<table cellspacing="2" cellpadding="0">
				<tr>
					<td class="prize color" :class="{active: currIndex==0}">
						<p>{{list[0].name}}</p>
					</td>
					<td class="prize" :class="{active: currIndex==1}">
						<p>{{list[1].name}}</p>
					</td>
					<td class="prize color" :class="{active: currIndex==2}">
						<p>{{list[2].name}}</p>
					</td>
					<td class="prize" :class="{active: currIndex==3}">
						<p>{{list[3].name}}</p>
					</td>
				</tr>
				<tr>
					<td class="prize" :class="{active: currIndex==11}">
						<p>{{list[11].name}}</p>
					</td>
					<td colspan="2" rowspan="2" class="start">
						<button-ripple class="btn btn-start" @click="start" :class="{disabled: isStart}"></button-ripple>
					</td>
					<td class="prize" :class="{active: currIndex==4}">
						<p>{{list[4].name}}</p>
					</td>
				</tr>
				<tr>
					<td class="prize color" :class="{active: currIndex==10}">
						<p>{{list[10].name}}</p>
					</td>
					<td class="prize" :class="{active: currIndex==5}">
						<p>{{list[5].name}}</p>
					</td>
				</tr>
				<tr>
					<td class="prize" :class="{active: currIndex==9}">
						<p>{{list[9].name}}</p>
					</td>
					<td class="prize" :class="{active: currIndex==8}">
						<p>{{list[8].name}}</p>
					</td>
					<td class="prize color" :class="{active: currIndex==7}">
						<p>{{list[7].name}}</p>
					</td>
					<td class="prize" :class="{active: currIndex==6}">
						<p>{{list[6].name}}</p>
					</td>
				</tr>
			</table>
		</div>

		<i class="music-handler" @click="togglePause" :class="{'close-sound': bgSoundPaused}"></i>

		<modal :show.sync="tipModal.show" class="app-modal tip-modal">
			<div class="modal-body">
				
				<div v-if="currPrize=='电影票'">
					<h1>恭喜！</h1>
					<h3>抽中1张电影票！</h3>

					<button-ripple color="button-primary">领取</button-ripple>
				</div>
				<div v-if="currPrize=='鲜花券'">
					<h1>恭喜！</h1>
					<h3>抽中1张鲜花券！</h3>

					<button-ripple color="button-primary">领取</button-ripple>
				</div>
				<div v-if="currPrize=='no-prize'">
					<h1 style=" margin-bottom: 3rem;margin-top: 2rem;font-weight: bold;">{{list[prizeIndex].name}}</h1>
					<button-ripple color="button-primary" @click="tipModal.show = false">确定</button-ripple>
				</div>
	
				<div v-if="currPrize=='no-chance'">
					<h1 style=" margin-bottom: 3rem;margin-top: 2rem;font-weight: bold;">机会已经用光</h1>
					<button-ripple color="button-primary" @click="tipModal.show = false">确定</button-ripple>
				</div>
			</div>

			<div slot="bottom">
				<span class="close-circle"></span>
			</div>
		</modal>

		<modal :show.sync="loginModal.show" class="app-modal login-modal">
			<div class="modal-body">
				<form @submit.prevent="login">
					<label>
						<span class="left">手机号</span><input type="text" v-model="loginModal.formData.mobile">
					</label>
					<div class="label">
						<span class="left">验证码</span><input type="text" v-model="loginModal.formData.mobileCode">
						<button-ripple :color="loginModal.msgCodeSended?'disabled':'button-yellow'" tag="span" @click="sendCode">{{loginModal.msgCodeText}}</button-ripple>
					</div>
					<button-ripple :color="loginModal.ing?'button-primary disabled':'button-primary'">{{loginModal.btnText}}</button-ripple>
					<p class="tip">（限广东联通来电管家用户参加）</p>
				</form>
			</div>

			<div slot="bottom">
				<span class="close-circle"></span>
			</div>
		</modal>

		<loading :show.sync="tipLoading.show" :text="tipLoading.msg" :duration="tipLoading.duration" name="msg" :icon="false"></loading>
		<loading :show.sync="loading.show" :text="loading.msg" :duration="loading.duration" name="msg" :icon="false"></loading>
	</div>
</template>

<script>
	import Modal from './components/Modal.vue'
	import Loading from './components/Loading.vue'
	import buttonRipple from './components/button-ripple.vue'

	import api from './api'
	import utils from '../src/utils'

	var limit,
		speed;

	var	msgCodeCounter = 60;
	var	msgCodeTimerHandler = null;

	const msgCodeText = '获取验证码'
	const loginBtnText = '确定'
	const loginBtnIngText = '登录中..'

	export default {
		components: {
			Modal,
			buttonRipple,
			Loading
		},
		data() {
			return {
				list: [],
				noPrizeIndexs: [],

				currIndex: null,
				prizeIndex: null,
				totalPrize: 12,
				round: 3,
				speed: 3,
				isStart: false,

				bgSoundPaused: false,

				tipLoading: {
					show: false,
					msg: '',
					duration: 1300
				},

				tipModal: {
					show: false
				},

				loading: {
					show: false,
					msg: '加载中',
					duration: 1000 * 15
				},

				loginModal: {
					show: false,
					formData: {
						mobile: '',
						mobileCode: ''
					},

					btnText: loginBtnText,
					ing: false,

					msgCodeText: msgCodeText,
					msgCodeSended: false,

					token: null
				},

				isLogin: false,

				gameTimes: 2,

				currPrize: ''
			}
		},
		created() {
			var that = this;

			SoundMixer.init()

			if(localStorage['ay_bg_sound_paused']=="true") {
				this.bgSoundPaused = true;
			}
			else {
				SoundMixer.play(SoundMixer.bgSound)
			}

			if(localStorage['ay_token']) {
				this.loginModal.token = localStorage['ay_token']
				this.isLogin = true
			}

			this.list = [{
				name: '3D电影票',
				noPrize: false
			},{
				name: '再来一次',
				noPrize: true
			},{
				name: '鲜花券',
				noPrize: false
			},{
				name: '就差一点就中奖啦!',
				noPrize: true
			},{
				name: '再来一次',
				noPrize: true
			},{
				name: '就差一点就中奖啦',
				noPrize: true
			},{
				name: '还需要一点好运',
				noPrize: true
			},{
				name: '3D电影票',
				noPrize: false
			},{
				name: '就差一点就抽中啦',
				noPrize: true
			},{
				name: '再来一次',
				noPrize: true
			},{
				name: '鲜花券',
				noPrize: false
			},{
				name: '还需要一点好运',
				noPrize: true
			}]

			var noPrizeIndexs = []
			for (var i = 0; i < this.list.length; i++) {
				if(this.list[i].noPrize) {
					noPrizeIndexs.push({index: i, name: this.list[i].name})
				}
			};
			this.noPrizeIndexs = noPrizeIndexs;
		},

		ready() {
			
		},

		methods: {
			start() {
				let that = this;
				if(this.isStart) return;

				if(!this.isLogin) {
					this.loginModal.show = true;
					return;
				}

				if(this.gameTimes<=0) {
					this.currPrize = 'no-chance'
					this.tipModal.show = true
					return;
				}

				SoundMixer.play(SoundMixer.startSound)

				this.currIndex = this.currIndex || 0;

				speed = this.speed;

				limit = this.round * this.totalPrize;

				this.gameTimes--;


				api.getPrize(this, {authorization: this.loginModal.token}, (back)=> {
					if(back.resultCode=='10001') {
						that.currPrize = 'no-prize'
						var noPrize = that.noPrizeIndexs[Math.floor(Math.random()*that.noPrizeIndexs.length)]
	
						that.prizeIndex = noPrize.index;
						that.tipModal.noPrizeText = noPrize.name
					
					}
					else if(back.resultCode=='20001') {
						that.currPrize = 'no-chance'

					}
				})

				setTimeout(()=> {
					that.run();
				}, 200)
				

				this.isStart = true;
			},

			end() {
				this.isStart = false;

				this.tipModal.show = true;
			},

			run() {
				let that = this;

				if(limit<=0) {
					this.end();
					return;
				}
			
				if(this.currIndex+1 >= this.totalPrize) {
					this.currIndex = 0;
				}
				else {
					this.currIndex++;
				}
				SoundMixer.play(SoundMixer.roundSounds[this.currIndex])
				
				if(speed > 10) {
					speed = 10;
				}
				if(limit<=this.totalPrize) {
					speed /= 1.2;

					if(this.currIndex==this.prizeIndex) {
						this.end();
						return;
					}
				}
				else {
					speed += .5;
				}
				
				limit--;
				

				setTimeout(()=> {
					that.run();
				}, 1000 / speed)
			},

			togglePause() {
				if(this.bgSoundPaused) {
					SoundMixer.play(SoundMixer.bgSound)
					this.bgSoundPaused = false
				}
				else {
					this.bgSoundPaused = true
					SoundMixer.pause(SoundMixer.bgSound)
				}
				localStorage['ay_bg_sound_paused'] = this.bgSoundPaused;
			},

			login() {
				if(this.loginModal.ing) return;

				if(!utils.checkMobile(this.loginModal.formData.mobile)) {
					this.tipLoading.show = true;
					this.tipLoading.msg = '手机格式有误';
					return;
				}
				else if(!this.loginModal.formData.mobileCode) {
					this.tipLoading.show = true;
					this.tipLoading.msg = '请输入验证码';
					return;
				}

				this.loginModal.btnText = loginBtnIngText
				this.loginModal.ing = true

				api.priceLogin(this, this.loginModal.formData, (back)=> {

					if(back.resultCode=="00000") {
						this.isLogin = true;
						this.loginModal.show = false;

						localStorage['ay_token'] = back.data;
						this.loginModal.token = back.data;
					}
					else if(back.resultCode=="00101") {
						this.tipLoading.show = true;
						this.tipLoading.msg = '没有此用户，请注册后再登陆';
					}
					else {
						this.tipLoading.show = true;
						this.tipLoading.msg = '手机号或验证码错误';
					}
					this.loginModal.ing = false
					this.loginModal.btnText = loginBtnText
				})
			},

			sendCode() {
				if(this.loginModal.msgCodeSended) return;

				if(utils.checkMobile(this.loginModal.formData.mobile)) {

					console.log('正在发送验证码')
					api.getMsgCode(this, {mbMobilePhone: this.loginModal.formData.mobile}, (back) => {
						if(back.Result.resultCode!="200001") {
							this.tipLoading.show = true;
							this.tipLoading.msg = '只限联通手机号';
							this.resetMsgCode()
						}
						else {
							this.loginModal.msgCodeSended = true;
							this.msgCodeTimer()
						}
					})
					
				}
				else {
					console.log('手机格式有误')
					this.tipLoading.show = true;
					this.tipLoading.msg = '手机格式有误';
				}
				
			},

			resetMsgCode() {
				msgCodeCounter = 60;
				this.loginModal.msgCodeSended = false;
				this.loginModal.msgCodeText = msgCodeText;
			},

			msgCodeTimer() {
				var that = this;

				msgCodeCounter--;
				this.loginModal.msgCodeText = msgCodeCounter+'s'

				if(msgCodeCounter<=0) {
					this.resetMsgCode()
					clearTimeout(msgCodeTimerHandler);
					return;
				}

				setTimeout(()=> {
					msgCodeTimerHandler = that.msgCodeTimer()
				}, 1000)
			}
		},

		watch: {
			isLogin(val) {

				if(val) {
					var that = this;
					if(this.isLogin) {
						this.loading.show = true;
						this.loading.msg = '加载中';
					}
					api.getUserCount(this, {authorization: this.loginModal.token}, (back)=> {
						that.loading.show = false;
						if(back.data || back.data==0) {
							that.gameTimes = back.data;
						}
					})
				}
			}
		}
	}


	var SoundMixer = {
		soundPath:  './sounds/',
		extension: '.mp3',
		init() {
			this.bgSound = new Audio()
			this.bgSound.src = this.soundPath + 'bg3' + this.extension
			// this.bgSound.playbackRate = 1
			this.bgSound.loop = true

			this.roundSound = new Audio()
			this.roundSound.src = this.soundPath + 'dong' + this.extension
			this.roundSound.playbackRate = 2

			this.startSound = new Audio()
			this.startSound.src = this.soundPath + 'start' + this.extension
			this.startSound.playbackRate = 1

			this.roundSounds = [];

			for (var i = 0; i < 12; i++) {
				var roundSound = new Audio();
				roundSound.src = this.soundPath + 'dong' + this.extension
				this.roundSounds.push(roundSound)
			};
		},

		play(sound) {
			sound.play()
		},

		pause(sound) {
			sound.pause()
		},

		reset(sound) {
			sound.currentTime = 0
			this.play(sound);
		}
	}
</script>