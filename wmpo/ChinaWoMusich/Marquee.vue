<template>
	<div class="app-view game-page">
		<section class="section-wrap">
			<div class="activity-num-div">
				<a class="mrule" @click="$root.showActivityD=true">活动规则</a>
				<div class="activity-num">
					还有<i class="num">{{times1}}</i>次机会
				</div>
				<!-- <a class="gamemark" @click="mark" ></a> -->
			</div>
			<div class="prize-wrap-new" id="lottery">
				<table class="prize-box" border="0" cellspacing="4" cellpadding="0" style="background-image: url('./g/images/prize-box-bg.png');">
					<tr>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[0].index}">
							<img :src="lottery[0].itemimg" />
						</td>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[1].index}">
							<img :src="lottery[1].itemimg" />
						</td>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[2].index}">
							<img :src="lottery[2].itemimg" />
						</td>
					</tr>
					<tr>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[7].index}">
							<img :src="lottery[7].itemimg" />
						</td>
						<td @click="isClick">
						</td>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[3].index}">
							<img :src="lottery[3].itemimg" />
						</td>
					</tr>
					<tr>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[6].index}">
							<img :src="lottery[6].itemimg" />
						</td>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[5].index}">
							<img :src="lottery[5].itemimg" />
						</td>
						<td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[4].index}">
							<img :src="lottery[4].itemimg" />
						</td>
					</tr>
				</table>
			</div>
			<div class="downdiv">
				<share-btn :title="shareInfo.title" :link="shareInfo.link" :desc="shareInfo.desc" :img-url="shareInfo.imgUrl" :func="showShare">
					<div style="text-align: center;">
						<a class="share-btn" style="background-color: #489eff;padding: 10px 20px;border-radius: 20px;display: inline-block;">分享次数+1</a>
					</div>
				</share-btn>
				<prizelist :change-prize="refreshRank" :show-add.sync="alertTip.showAddress" :gid.sync="lucky.id"></prizelist>
				<p class="tip3">中国联通&nbsp;&nbsp;&nbsp;&nbsp;沃音乐<br/>wap.10155.com<br/>活动解释权归中国联通沃音乐所有</p>
			</div>

		</section>
		<!-- 遮罩层  -->
		<section class="bg-section" v-if="alertTip.rootTip">

			<div class="content" style="text-align: center;">
				<div class="div1" v-if="alertTip.Atip">
					<div class="content-title">
						<p>恭喜您</p>
						<p>抽中了{{lotteryObj.prizename}}</p>
						<img :src="$root.activityBasePath+lotteryObj.url" style="width: 210px;height: 180px;" />
					</div>
					<a class="btn" @click="addr()" style="margin-top: 0;background-color: #489eff;">去领奖</a>
				</div>
				<div class="div2" v-if="alertTip.Btip">
					<div class="content-title2">
						<p>谢谢参与!</p>
						<img style="margin-top: 30px;" :src="alertTip.imgUrl" alt="">
					</div>
					<a class="btn" @click="hideAlertTip()" style="background-color: #489eff;" v-if="alertTip.state==0">继续抽奖</a>
					<a class="btn" @click="govip()" style="background-color: #489eff;" v-if="alertTip.state==1">开通会员</a>
					<a class="btn" @click="godamai()" style="background-color: #489eff;" v-if="alertTip.state==2">一键购票</a>
				</div>
				<div class="div3" v-if="alertTip.Ctip">
					<div class="content-title">
						<p class="success">领取成功!</p>
						<a class="btn">确定</a>
					</div>
				</div>
				<div class="btn-close" @click="hideAlertTip()"><img :src="'f/images/sp-close.png'" /></div>
			</div>
		</section>
		<address :show-address.sync="alertTip.showAddress" :gid="lucky.id"></address>
		<img :src="$root.activityBasePath+'/css/img/marquee_bg.jpg'" class="bg">
		<div v-if="sharetip" @click="hideShare()" class="sharebg"></div>
		<img v-if="sharetip" @click="hideShare()" :src="$root.activityBasePath+'/src/css/img/sharetip.png'" class="sharetip" />

	</div>

</template>

<style lang="sass">
	.app-view .prize-wrap-new .prize-box {
		width: 90%!important;
		margin: 5%!important;
		padding: 23px 20px!important;
		tr td {
			width: 33.3%!important;
			height: 25.5%!important;
			border: 10px solid;
			border-color: rgba(225, 225, 225, 0);
		}
	}
	
	.app-view.game-page .section-wrap .downdiv {
		margin-top: 0px!important;
	}
	
	.app-view.game-page .section-wrap .active {
		border: 10px solid red!important;
	}
	
	.tip1 {
		color: #000;
		font-size: 28px;
		text-shadow: 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff;
		margin: 40px 44px;
	}
	
	// .tip2{
	//     color: white;
	//     font-size: 28px;
	//     text-shadow: 0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326;
	//     margin: 0 0 40px 44px;
	// }
	.tip3 {
		color: #000;
		font-size: 22px;
		text-shadow: 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff, 0px 0px 5px #fff;
		margin: 10px 0 0 0;
		text-align: center;
	}
	
	.woad {
		color: #550000;
		font-size: 22px;
		margin: 5px auto 0 auto;
		width: 200px;
		text-align: center;
		display: block;
		text-decoration: underline;
	}
	
	.mrule {
		position: absolute;
		left: 40px;
		text-decoration: underline;
		font-size: 24px;
		color: #000;
		padding-top: 20px;
	}
</style>

<script>
	import {
		router
	} from './index'
	import sapi from './utils/serverapi.js'
	import urlUtil from './utils/url.js'

	// require(['./js/zepto.min.js'])   

	function initLottery() {
		return {
			currIndex: 0,
			count: 7,
			cycle: 50,
			speed: 200,
			timerId: null,
			prize: -1
		};
	}

	export default {
		components: {
			'share-btn': require('./components/share-btn/share-btn.vue'),
			prizelist: require('./components/prizeList.vue'),
			address: require('./receive-address.vue'),
		},
		data() {
			return {
				activity: {},
				activityextbody: {},
				iclick: false,
				refreshRank: true,
				ismark: false,
				//中奖的弹框
				alertTip: {
					rootTip: false,
					showAddress: false,
					Atip: false, //抽中的弹框
					Btip: false, //没alertTip抽中的弹框
					Ctip: false, //领取成功的弹框
					imgUrl: 'g/images/think.jpg',
					state: 0 //0表示还有抽奖机会,1表示vip,2普通
				},
				sharetip: false,
				//中奖的奖品(需要领奖的json)
				lucky: {
					mobile: '',
					id: '', //奖品id
					content: '', //验证码

				},

				list: [],
				lottery: [{
					"itemimg": activityBasePath + "/images/marquee_2.png",
					"index": 0,
					"title": "kindle",
					"haveprize": true,
					"pid": '34'
				}, {
					"itemimg": activityBasePath + "/images/marquee_3.png",
					"index": 1,
					"title": "jbl蓝牙音箱",
					"haveprize": true,
					"pid": '35'
				}, {
					"itemimg": activityBasePath + "/images/marquee_1.png",
					"index": 2,
					"title": "还差一点就抽中啦",
					"haveprize": false,
				}, {
					"itemimg": activityBasePath + "/images/marquee_7.png",
					"index": 3,
					"title": "公仔",
					"haveprize": true,
					"pid": '37'
				}, {
					"itemimg": activityBasePath + "/images/marquee_6.png",
					"index": 4,
					"title": "30元话费",
					"haveprize": true,
					"pid": '38'
				}, {
					"itemimg": activityBasePath + "/images/marquee_4.png",
					"index": 5,
					"title": "小米盒子",
					"haveprize": true,
					"pid": '36'
				}, {
					"itemimg": activityBasePath + "/images/marquee_5.png",
					"index": 6,
					"title": "10元电影",
					"haveprize": true,
					"pid": '39'
				}, {
					"itemimg": activityBasePath + "/images/marquee_1.png",
					"index": 7,
					"title": "不中奖选项",
					"haveprize": false,
				}],
				lotterys: [],
				times1: '', //剩下的次数
				doLuckyResult: [],
				isPrize: false, //是否中奖
				unPrize: '', //没有抽中的提示语

				lotteryObj: {
					currIndex: -1,
					count: null,
					cycle: null,
					speed: null,
					timerId: null,
					prize: null,
					url: '',
					prizename: ''
				},
				shareInfo: {
					link: '',
					title: '',
					description: '',
					imgUrl: '',
				},
				// 抽奖后弹框显示样式
				dialog: [],
				zcodeurl: basePath + 'randomValidate/obtainValidateCode',

			}
		},
		ready() {
			this.$root.wxlisten = {
				that: this,
				shareupdate: this.getActUserTimes
			};
			//          document.querySelector("#audio").pause();
			this.times1 = 0;
			// this.activity = JSON.parse(localStorage.getItem('activity'));
			// this.activityextbody = JSON.parse(this.activity.extbody);
			this.hideShare();
			var aid = urlUtil.getArgsFromUrl("aid");
			this.getuserSignInfo();

			this.getActUserTimes(); //剩下的次数

			this.lotteryObj = initLottery();

			this.dialogFn(); //弹框样式
		},
		events:{
			refshShareFun(){
				this.getActUserTimes()
			}
		},
		methods: {
			addOperLog(type, btnName) {
				sapi.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source':source

				}, (back) => {})
			},
			//设置弹框的样式
			dialogFn() {
				// this.dialog= JSON.parse(JSON.parse(localStorage.getItem('activity')).extbody).dialog;
				// console.log("弹框样式设置");
				// console.log(this.dialog);
				// console.log(this.dialog.fail.btnName);

			},
			// 中奖榜单
			getPrizeList() {
				this.refreshRank = !this.refreshRank;
			},
			// 获取剩下的次数    
			getActUserTimes() {
				var that = this;
				sapi.queEveryDay(this, {}, (back) => {
					if(back.resCode == 0 || back.resCode == "0") {
						that.times1 = parseInt(back.repBody[0].player);

						// if(back.repBody[0].player=='0'){
						//     that.iclick=true;
						// } 
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			
			//跑马灯
			roll() {
				this.iclick = true; //不能点击

				this.lotteryObj.currIndex++;
				this.lotteryObj.cycle--;

				// 如果当前滚动的索引大于总格数 就归零
				if(this.lotteryObj.currIndex > this.lotteryObj.count) {
					this.lotteryObj.currIndex = 0;
				}

				//请求失败停止
				if(this.lotteryObj.prize == -2) {
					this.lotteryObj.prize = -1;
					this.lotteryObj.currIndex = 0;
					return;
				}

				//如果请求还没有回来就再跑两圈
				if(this.lotteryObj.cycle <= this.lotteryObj.count + 2 && this.lotteryObj.prize < 0) {
					this.lotteryObj.cycle = 32;
				}

				// 如果滚动次数小于总格数就开始注意有木有中奖
				if(this.lotteryObj.cycle <= this.lotteryObj.count) {

					if(this.lotteryObj.speed < 400) {
						this.lotteryObj.speed += 100;
					} else {
						this.lotteryObj.speed += 50;
					}

					// 当前索引指定中奖位置
					if(this.lotteryObj.currIndex == this.lotteryObj.prize) {
						this.clearTimer();
						setTimeout(this.showRetTip, 1000);
						return;
					}

					// 如果没有滚动次数结束 默认停止
					if(this.lotteryObj.cycle <= 0) {
						this.lotteryObj = initLottery();

						this.clearTimer();
						return;
					}
				}

				// 最后三圈前，速度在大于40毫秒每次循环递减10毫秒，直到小于40毫秒
				if(this.lotteryObj.speed > 40 && this.lotteryObj.cycle >= this.lotteryObj.count * 3) {
					this.lotteryObj.speed -= 10;
				}

				// 最后两圈前，速度在小于80毫秒每次循环递增10毫秒
				if(this.lotteryObj.speed < 80 && this.lotteryObj.cycle < this.lotteryObj.count * 3 && this.lotteryObj.cycle > this.lotteryObj.count * 2) {
					this.lotteryObj.speed += 10;
				}
				// 最后两圈，速度在小于200毫秒每次循环递增10毫秒
				if(this.lotteryObj.speed < 200 && this.lotteryObj.cycle <= this.lotteryObj.count * 2) {
					this.lotteryObj.speed += 10;
				}
				// console.log(this.lotteryObj.speed);

				this.lotteryObj.timerId = setTimeout(this.roll, this.lotteryObj.speed);
			},

			clearTimer() {
				clearTimeout(this.lotteryObj.timerId);
			},
			showRetTip() {
				this.getPrizeList(); //获取获奖榜单
				this.iclick = false;
				// if(this.times1<=0){
				//     this.iclick=true;
				// }
				if(this.isPrize) {
					this.alertTip.rootTip = true;
					this.alertTip.Atip = true;
					this.alertTip.Btip = false;
					this.alertTip.Ctip = false;
				} else {
					this.alertTip.rootTip = true;
					this.alertTip.Btip = true;
					this.alertTip.Atip = false;
					this.alertTip.Ctip = false;
					if(this.times1 != 0) {
						this.alertTip.state = 0;
						this.alertTip.imgUrl = "g/images/think.jpg";
					} else {
						if(parseInt(10 * Math.random()) % 2 == 0) {
							this.alertTip.state = 1;
							this.alertTip.imgUrl = "g/images/vip.jpg";
						} else {
							this.alertTip.state = 2;
							this.alertTip.imgUrl = "g/images/by.jpg";
						}
					}
				}
			},
			// 隐藏弹框
			hideAlertTip() {
				this.alertTip.rootTip = false;
				this.alertTip.Atip = false;
				this.alertTip.Btip = false;
				this.alertTip.Ctip = false;
			},

			showAlertTip() {
				this.alertTip.rootTip = true;
				this.alertTip.Atip = false;
				this.alertTip.Btip = false;
				this.alertTip.Ctip = true;
			},
			addr() {
				this.alertTip.rootTip = false;
				this.alertTip.showAddress = true;
			},

			//用户抽奖
			userDoLucky() {
				var that = this;
				that.lotteryObj.prize = -1;
				sapi.doLucky(this, {
					"types": "跑马灯"
				}, (back) => {
					that.getActUserTimes();
					if(back.resCode == '0') {
						that.isPrize = true;
						var prize = back.repBody[0];
						that.lucky.id = back.repBody[0].gid;
						that.lotteryObj.prizename = prize.pname;
						that.lotteryObj.url = prize.imgurl;
						for(var i = 0; i < that.lottery.length; i++) {
							if(back.repBody[0].pid == that.lottery[i].pid) {
								that.lotteryObj.prize = that.lottery[i].index;
							}
						}
					} else if(back.resCode == '1006') {
						that.isPrize = false;
						var count = 2;
						var tprize = Math.floor(Math.random() * count);
						if(tprize == count) {
							tprize = count - 1;
						}
						var cprize = 0;
						for(var i = 0; i < that.lottery.length; i++) {
							if(!that.lottery[i].haveprize) {
								if(cprize == tprize) {
									that.lotteryObj.prize = i;
									break;
								}
								cprize++;
							}

						};
						if(that.lotteryObj.prize < 0) {
							that.lotteryObj.prize = 0;
						}
					} else {
						that.isPrize = false;
						that.lotteryObj.prize = -2;
						that.isClick = '0';
						that.$dispatch('handle_server_error', back);
					}
					that.unPrize = back.resMsg;
				});
			},
			isClick() {

				if(!this.iclick && this.times1 > 0) {
					var currIndex = this.lotteryObj.currIndex;
					this.lotteryObj = initLottery();
					this.lotteryObj.currIndex = currIndex;
					this.userDoLucky();
					this.roll();
				} else if(this.times1 == '0') {
					this.$dispatch('loading', {
						text: '暂无抽奖机会',
						show: true,
						duration: 1000
					});
				} else {

				}
			},
			hideShare() {
				this.sharetip = false;
			},
			shareWx() {},
			getuserSignInfo() {
				// var that = this;
				// sapi.getuserSignInfo(this,{},(back)=>{
				//     if(back.resCode=="0") {
				//         if(back.repBody.length>0 && back.repBody[0].types == "1"){
				//             that.ismark = true;
				//         }
				//     }
				//     else{
				//         that.$dispatch('handle_server_error', back);
				//     }
				// });
			},
			userSign() {
				// var that = this;
				// that.$dispatch('loading', {name:'game_userSign', text: '加载中...', icon: true, show: true, duration: 10*1000});
				// sapi.userSign(this,{},(back)=>{
				//     that.$dispatch('cancelloading', 'game_userSign');
				//     if(back.resCode=="0") {
				//         that.getActUserTimes();//剩下的次数
				//         that.$dispatch('loading', {name:'game_mark_tip', text: '恭喜您，签到成功！抽奖机会+'+that.activity.color, icon: false, show: true, duration: 2*1000});
				//         that.ismark = true;
				//     }
				//     else{
				//         that.$dispatch('handle_server_error', back);
				//     }
				// });
			},
			mark() {
				// this.userSign();
			},
			refreshzcode() {
				this.zcodeurl = basePath + 'randomValidate/obtainValidateCode?' + Math.random();
			},
			govip(){
				this.addOperLog('button','buymember');
				location.href = "http://box.10155.com/Club/portal/newth/gua/index.jsp";
			},
			godamai(){
				this.addOperLog('button','buyticket');
				location.href = "http://10155.com/damai/index.jsp";
			}
		},

	}
</script>