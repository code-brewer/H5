<template>
	<div class="app-view game-page">
		<section class="section-wrap">
			<div class="activity-num-div">
				<!-- <a class="mrule" @click="$root.showActivityD=true">活动规则</a> -->
				<div class="activity-num" style="background: url('./j/images/count-bg.png') center center no-repeat;">
					还有<i class="num">{{times1}}</i>次机会
				</div>
				<!-- <a class="gamemark" @click="mark" ></a> -->
			</div>
			<div class="prize-wrap-new" id="lottery">
				<table class="prize-box" border="0" cellspacing="4" cellpadding="0" style="background-image: url('./j/images/prize-box-bg.png');">
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
				<p class="tip4">仅限沃音乐会员参与，新开通用户还可获 得5元话费及铂涛60元优惠券。<span @click="govip()" v-if="$root.cookieVip != '0000000000'">立即开通</span><span style="color: #696564; border-bottom: 2px solid #696564;" v-if="$root.cookieVip == '0000000000'">立即开通</span></p>
				<prizelist v-ref:plist :change-prize="refreshRank" :show-add.sync="alertTip.showAddress" :gid.sync="lucky.id" 
				></prizelist>
				<p class="tip3">中国联通沃音乐<br/>wap.10155.com<br/>活动解释权归中国联通沃音乐所有</p>
			</div>

		</section>
		<!-- 遮罩层  -->
		<section class="bg-section" v-if="alertTip.rootTip">

			<div class="content" style="text-align: center;">
				<div class="div1" v-if="alertTip.Atip">
					<div>
						<div class="content-title">
							<p>恭喜您</p>
							<p>抽中了'{{lotteryObj.prizename}}'</p>
							<img :src="$root.activityBasePath+lotteryObj.url" style="padding: 30px;" />
						</div>
						<a class="btn" @click="hideAlertTip()" style="background: url('./j/images/btn-bg.png') center center no-repeat; margin-right:15px;" v-if="alertTip.state==0">继续抽奖</a>
						<a class="btn" @click="addr()" style="margin-top: 0;background: url('./j/images/btn-bg-gray.png') center center no-repeat; margin-left: 15px;">去领奖</a>
					</div>
					<!-- <div v-if="lotteryObj.sid !=''">
						<div class="content-title">
							<p>恭喜您</p>
							<p>抽中了'{{lotteryObj.prizename}}'</p>
							<img :src="$root.activityBasePath+lotteryObj.url" style="padding: 30px;" />
							<p style="color:#fd6751; font-size: 22px; line-height: 40px; font-weight: 600">超级票为大麦网全线通票，适用于所有在售项目，无论演出项目在哪个城市均可使用超级票进行抵扣。</p>
						</div>
						
						<a class="btn" @click="buyTicket" style="margin-top: 0;background: url('./i/images/btn-bg-gray.png') center center no-repeat; margin-left: 15px;">我要购票</a>
					</div> -->
				</div>
				<div class="div2" v-if="alertTip.Btip">
					<div class="content-title2">
						<p>谢谢参与!</p>
						<img style="margin-top: 30px;" :src="'./i/images/lele-2.png'" alt="">
					</div>
					<a class="btn" @click="hideAlertTip()" style="background: url('./i/images/btn-bg.png') center center no-repeat; margin-top: 20px;">继续抽奖</a>
				
				</div>
				<div class="div3" v-if="alertTip.Ctip">
					<div class="content-title">
						<p class="success">领取成功!</p>
						<a class="btn">确定</a>
					</div>
				</div>
				<div class="div4" v-if="alertTip.Dtip">
					<div class="content-title content-title4">
						<p>提示</p>
					</div>
					<div style="padding: 50px 0;">
						<img style="vertical-align: middle;" :src="'./i/images/lele.png'" alt="">
						<p class="text1">抽奖机会用光了， 明天再来吧！</p>
						<!-- <p class="text1" v-if="ispass == 'false'">暂无抽奖机会，请先通关。</p> -->
					</div>
					<a class="btn" @click="hideAlertTip()" style="margin-top: 0;background: url('./i/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<!-- <div class="div1" v-if="alertTip.Ftip">
					<div class="content-title">
						<p>{{lotteryObj.prizename}}</p>
						<p>券码：{{lotteryObj.sid}}</p>
						<p>密码：{{lotteryObj.pwd}}</p>
						<img :src="$root.activityBasePath+lotteryObj.url" style="" />
						<p style="color:#fd6751; font-size: 24px; line-height: 40px; font-weight: 600">活动结束前于沃音乐（移动端）购买面值280元以上门票，返回“我的奖品”填写购票订单号还可获得面值100元的京东购物券。</p>
					</div>
					<a class="btn" @click="buyTicket" style="background: url('./i/images/btn-bg-gray.png') center center no-repeat; margin-left: 15px;">我要购票</a>
				</div> -->
				<div class="btn-close" @click="hideAlertTip()"><img :src="'i/images/sp-close.png'" /></div>
			</div>
		</section>
		<address :show-address.sync="alertTip.showAddress" :gid="lucky.id"></address>
		<img :src="$root.activityBasePath+'/css/img/marquee_bg.jpg'" class="bg">
		<div v-if="sharetip" @click="hideShare()" class="sharebg"></div>
		<img v-if="sharetip" @click="hideShare()" :src="$root.activityBasePath+'/src/css/img/sharetip.png'" class="sharetip" />

		<!--抽奖机会用光了-->
		<!-- <modal :show.sync="modalConfig.vip" :bg="false" :backdrop="false">
        			<div class="prize-over-view" style="position: relative;">
        				<div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:10px">
        					<p class="title">抽奖机会用光了</p>
        					<div class="list-panel">
        						<div class='vip-policy'>
        							开通沃音乐会员每天可获得5次抽奖机会哦！
        						</div>
        						<div class='vip-policy-title'>沃音乐会员权益</div>
        						<div class='vip-policy-list'>
        							<ul>
        								<li>
        									<a>
        										<img :src="'i/images/vip-1.jpg'">
        										<span>海量歌曲MV免费下载</span>
        									</a>
        								</li>
        								<li>
                                            <a>
                                               <img :src="'i/images/vip-2.jpg'">
                                               <span>沃音乐专享铃音盒</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                               <img :src="'i/images/vip-3.jpg'">
                                               <span>沃音乐掌上流量全免</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                               <img :src="'i/images/vip-4.png'">
                                               <span>明星见面会特权福利</span>
                                            </a>
                                        </li>
        							</ul>
        						</div>
        					</div>
        					<div class="btn-panel">
        						<a class="blue" v-if="modalConfig.state==0" @click="modalConfig.vip = false">取消</a>
        						<a class="yellow" @click="openTheVip()" >开通会员</a>
        					</div>
        				</div>
        				<div class="btn-close" style="position: absolute; top: 10px; right: 10px;" @click="modalConfig.vip = false"><img :src="'i/images/sp-close.png'" /></div>
        			</div>
        </modal> -->

	</div>

</template>

<style lang="sass">
	.app-view .prize-wrap-new .prize-box {
		width: 90%!important;
		margin: 0 5% 5% 5%!important;
		padding: 26px 24px!important;
		tr td {
			width: 33.3%!important;
			height: 30.5%!important;
			// border: 10px solid;
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
	.tip4{
		text-align: center;
	    font-size: 30px;
	    padding: 0 50px 20px;
	    color: #e60012;
	    span{
	    	color: #ff8400;
			border-bottom: 2px solid #ff8400;
	    }

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
	.prize-over-view {
    		.box {
    			position: relative;
    			padding: 20px;
    			margin: 0 auto;
    			// text-align: center;
    			box-sizing: border-box;
    			color: #fff;
    			.list-panel {
    				width: 100%;
    				text-align: center;
    				margin: 30px 0px;
    				box-sizing:border-box;
    				.vip-policy{
    					text-align:left;
    					width:100%;
    					height:89px;
    					font-size:30px;
    					color:#ffb93b;
    				}
    				.vip-policy-title{
    					width:100%;
    					font-size:24px;
    					color:#4e140c;
    					text-align:center;
    					position:relative;
    				}
    				.vip-policy-title:before{
    					content:'';
    					width:158px;
    					height:2px;
    					border-bottom:3px solid #ac8f86;
    					position:absolute;
    					top:10px;
    					left:5px;
    				}
    				.vip-policy-title:after{
    					content:'';
                        width:158px;
                        height:2px;
                        border-bottom:3px solid #ac8f86;
                        position:absolute;
                        top:10px;
                        right:5px;
    				}
    				.vip-policy-list{
    					width:100%;
    					box-sizing:border-box;
    					padding-top:30px;
    					padding-right:15px;
    					padding-left:15px;
    					over-flow:hidden;
    					ul{overflow:hidden;}
    					li{
    						list-style:none;
    						float:left;
    						width:50%;
    						margin-bottom:16px;
    						a{
    							display:block;
    							width:100%;
    							height:100%;
    							color:#000;
    							img{
    								width:90px;
    							}
    							span{
    								display:inline-block;
    								font-size:24px;
    								width:136px;
    								position:relative;
    								top:-25px;
    								display:inline-block;
    							}
    						}
    					}
    				}

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
    					color: #000;
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
			prizelist: require('./components/prizeList.vue'),
			address: require('./receive-address.vue'),
			modal: require('./../../src/components/Modal.vue'),
		},
		data() {
			return {
				modalConfig: {
                	state: 0,
                	vip: false,
                	imgUrl: ''
               },
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
					Dtip: false,  //抽奖机会用光
					Ftip: false,//大麦票马上领奖页
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
					"itemimg": activityBasePath + "/images/marquee_1.png",
					"index": 0,
					"title": "还差一点就抽中啦",
					"haveprize": false,
					
				}, {
					"itemimg": activityBasePath + "/images/marquee_2.png",
					"index": 1,
					"title": "相机",
					"haveprize": true,
					"pid": '44'
				}, {
					"itemimg": activityBasePath + "/images/marquee_1.png",
					"index": 2,
					"title": "还差一点就抽中啦",
					"haveprize": false,
				}, {
					"itemimg": activityBasePath + "/images/marquee_4.png",
					"index": 3,
					"title": "5元话费",
					"haveprize": true,
					"pid": '45'
				}, {
					"itemimg": activityBasePath + "/images/marquee_1.png",
					"index": 4,
					"title": "不中奖选项",
					"haveprize": false,
					
				}, {
					"itemimg": activityBasePath + "/images/marquee_5.png",
					"index": 5,
					"title": "5元京东券",
					"haveprize": true,
					"pid": '46'
				}, {
					"itemimg": activityBasePath + "/images/marquee_1.png",
					"index": 6,
					"title": "还差一点就抽中啦",
					"haveprize": false,
					
				}, {
					"itemimg": activityBasePath + "/images/marquee_3.png",
					"index": 7,
					"title": "蜘蛛网电影票",
					"haveprize": true,
					"pid": '47'
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
					prizename: '',
					sid:null,
					pwd: null,
				},

				// 抽奖后弹框显示样式
				dialog: [],
				zcodeurl: basePath + 'randomValidate/obtainValidateCode',
				ispass: false,

			}
		},
		ready() {
			this.$root.wxlisten = {
				that: this,
				shareupdate: this.getActUserTimes
			};
			this.$root.isShowAnimate = false;
			//          document.querySelector("#audio").pause();
			this.times1 = 0;
			// this.activity = JSON.parse(localStorage.getItem('activity'));
			// this.activityextbody = JSON.parse(this.activity.extbody);
			this.hideShare();
			var aid = urlUtil.getArgsFromUrl("aid");
			// this.getuserSignInfo();

			// this.getActUserTimes(); //剩下的次数

			this.lotteryObj = initLottery();

			this.dialogFn(); //弹框样式
			// this.judgeIsClearance();
			// this.$root.vipsuccess = true;
			// 
			// 测试代码
			// this.isPrize=true;
			// this.showRetTip();
			if(!this.$root.islogin){
				this.$root.loginokcallback = this.lcb;
			}else{
				this.lcb();
			}
			
		},
		methods: {
			lcb(){
				this.getuserSignInfo();
				this.getActUserTimes(); 
				this.judgeIsClearance();
			    this.$refs.plist.quePrizeDrawResult();

			},
			addOperLog(type, btnName) {
				sapi.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source':source
				}, (back) => {})
			},
			//获取通关记录
			judgeIsClearance(){
				sapi.judgeIsClearance(this,{},(back) =>{
					if(back.resCode == 0 || back.resCode == "0"){
						this.ispass = back.repBody.msg;

					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
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
					this.alertTip.Dtip = false;
					this.alertTip.Ftip = false;
				} else {
					this.alertTip.rootTip = true;
					this.alertTip.Btip = true;
					this.alertTip.Atip = false;
					this.alertTip.Ctip = false;
					this.alertTip.Dtip = false;
					this.alertTip.Ftip = false;
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
				this.alertTip.Dtip = false;
				this.alertTip.Ftip = false;
			},

			showAlertTip() {
				this.alertTip.rootTip = true;
				this.alertTip.Atip = false;
				this.alertTip.Btip = false;
				this.alertTip.Ctip = true;
				this.alertTip.Dtip = false;
				this.alertTip.Ftip = false;
			},
			addr() {
				this.alertTip.rootTip = false;
				this.alertTip.showAddress = true;
				
			},
			buyTicket(){
				this.addOperLog('button','buyticket');
				location.href="http://10155.com/damai/index.jsp";
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
						localStorage.setItem('pid', back.repBody[0].pid);
						that.lotteryObj.prizename = prize.pname;
						that.lotteryObj.url = prize.imgurl;
						that.lotteryObj.sid = prize.sid ? prize.sid : '';
						that.lotteryObj.pwd = prize.pwd ? prize.pwd : '';
						
						for(var i = 0; i < that.lottery.length; i++) {
							if(back.repBody[0].pid == that.lottery[i].pid) {
								that.lotteryObj.prize = that.lottery[i].index;
							}
						}
						localStorage.setItem('awardmobile',"false");
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
				if(!this.$root.islogin){
					this.$root.login = true;
					this.$root.loginokcallback = this.lcb;
				}else{
					if(!this.iclick && this.times1 > 0) {
						var currIndex = this.lotteryObj.currIndex;
						this.lotteryObj = initLottery();
						this.lotteryObj.currIndex = currIndex;
						this.userDoLucky();
						this.roll();
					} else if(this.times1 == '0' ) {
						// this.$dispatch('loading', {
						// 	text: '暂无抽奖机会',
						// 	show: true,
						// 	duration: 1000
						// });
						// 
						if(this.$root.cookieVip == "0000000000"){
							this.alertTip.rootTip = true;
							this.alertTip.Dtip = true;
							this.alertTip.Atip = false;
							this.alertTip.Btip = false;
							this.alertTip.Ctip = false;
							this.alertTip.Ftip = false;
						}else{
							this.$root.openvip = true;
						}
							
						
					} else {

					}
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
				
				if(!this.$root.islogin){
					this.$root.login = true;
					this.$root.loginokcallback = this.lcb;
				}else{
					this.addOperLog('button','musicvip');
					this.$root.openvip = true;
				}
				
				// this.addOperLog('button','buymember');
				// location.href = "http://box.10155.com/Club/portal/newth/gua/index.jsp";
				
			},
			godamai(){
				this.addOperLog('button','buyticket');
				location.href = "http://10155.com/damai/index.jsp";
			},
			openTheVip(){
				this.addOperLog('button','musicvip');
				this.modalConfig.vip = false;
				this.$root.openvip = true;
			},
			awardRightNow(){
				
				this.alertTip.rootTip = true;
				this.alertTip.Dtip = false;
				this.alertTip.Atip = false;
				this.alertTip.Btip = false;
				this.alertTip.Ctip = false;
				this.alertTip.Ftip = true;
			}
		},

	}
</script>