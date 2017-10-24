<template>
	<div class="app-view game-page">
		<section class="section-wrap">
			<div class="activity-num-div">
				<!-- <a class="mrule" @click="$root.showActivityD=true">活动规则</a> -->
				<div class="activity-num">
					剩余<i class="num">{{times1}}</i>次抽奖机会
				</div>
				<!-- <a class="gamemark" @click="mark" ></a> -->
			</div>
			<div class="logo">
				<img :src="'g/images/logo.png'">
			</div>
			<div class="prize-wrap-new" id="lottery">
				<table class="prize-box" border="0" cellspacing="4" cellpadding="0" style="background-image: url('./k/images/prize-box-bg.png');">
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
				<p class="tip4">沃音乐会员可参与抽奖，每天有3次抽奖机会！</p>
				<div class="">
					<img :src="$root.activityBasePath+'/images/offers.png'" @click="offersEvents" class="offers" style="margin-right: 10%;">
					<img :src="$root.activityBasePath+'/images/ling.png'" @click="goBells" class="ling" v-link="{path: '/bells'}">
				</div>
				<prizelist :change-prize="refreshRank" :show-add.sync="alertTip.showAddress" :gid.sync="lucky.id" 
				></prizelist>
				<p class="tip3">中国联通沃音乐<br/>wap.10155.com<br/>活动解释权归中国联通沃音乐所有</p>
			</div>

		</section>
		<!-- 遮罩层  -->
		<section class="bg-section" v-if="alertTip.rootTip">
			<div class="content" style="text-align: center;">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
				<div class="div1" v-if="alertTip.Atip">
					<div>
						<div class="content-title">
							<p style="color: #e73433;font-size: 55px; font-weight: 600; line-height: 70px;">恭喜</p>
							<p>抽中了'{{lotteryObj.prizename}}'</p>
							<div style="width: 430px; height: 272px;background: url('./k/images/pic-bg.png') center center no-repeat;background-size: 100% 100%;position: absolute; left: 50%; margin-left: -215px;">
								<img :src="$root.activityBasePath+lotteryObj.url" style="    width: 244px;position: absolute;height: 244px;top: 4%;left: 17%;" />
							</div>
						</div>
						<!-- <a class="btn" @click="hideAlertTip()" style="background: url('./k/images/btn-bg.png') center center no-repeat; margin-right:15px;" v-if="alertTip.state==0">继续抽奖</a> -->
						<a class="btn" @click="addr(lotteryObj.sid)" style="margin-top: 80px;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">马上领奖</a>
					</div>
					<!-- <div v-if="lotteryObj.sid !=''">
						<div class="content-title">
							<p>恭喜您</p>
							<p>抽中了'{{lotteryObj.prizename}}'</p>
							<img :src="$root.activityBasePath+lotteryObj.url" style="padding: 30px;" />
							<p style="color:#fd6751; font-size: 22px; line-height: 40px; font-weight: 600"></p>
						</div>
						<a class="btn" @click="buyTicket" style="margin-top: 0;background: url('./i/images/btn-bg-gray.png') center center no-repeat; margin-left: 15px;">我要购票</a>
					</div> -->
				</div>
				<div class="div2" v-if="alertTip.Btip">
					<div class="content-title2">
						<p style="color: #e73433;font-size: 55px; font-weight: 600; line-height: 70px;">谢谢参与!</p>
						<div style="width: 430px; height: 272px;background: url('./k/images/pic-bg.png') center center no-repeat;background-size: 100% 100%;position: absolute; top: 22%; left: 50%; margin-left: -215px;">
							<img :src="$root.activityBasePath+'/images/thank.png'" style="    width: 244px;position: absolute;height: 244px;top: 4%;left: 17%;" />
						</div>
					</div>
					<a class="btn" @click="buyTicket" style="background: url('./k/images/btn-bg.png') center center no-repeat; margin-top: 50px;padding-left: 25px;">一键购票</a>
				
				</div>
				<div class="div3" v-if="alertTip.Ctip">
					<div class="content-title">
						<p class="success">领取成功!</p>
						<a class="btn">确定</a>
					</div>
				</div>
				<div class="div4" v-if="alertTip.Dtip">
					<div class="content-title content-title4">
						<p style="color: #e73433;font-size: 55px; font-weight: 600; line-height: 70px;">提示</p>
					</div>
					<div style="padding: 50px 0;">
						
						<p class="text1">抽奖机会用光了， 明天再来吧！</p>
						<!-- <p class="text1" v-if="ispass == 'false'">暂无抽奖机会，请先通关。</p> -->
						<img style="vertical-align: middle;" :src="'./k/images/lele.png'" alt="">
					</div>
					<a class="btn" @click="hideAlertTip()" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<!-- 订购炫铃 -->
				<div class="div1" v-if="alertTip.Ftip">
					<div class="content-title">
						<p style="color: #e73433;font-size: 55px; font-weight: 600; line-height: 70px;">是否确认订购</p>
						<p>"{{lotteryObj.prizename}}"?</p>
						<div style="width: 430px; height: 272px;background: url('./k/images/pic-bg.png') center center no-repeat;background-size: 100% 100%;position: absolute; top: 28%; left: 50%; margin-left: -215px;">
							<img :src="$root.activityBasePath+lotteryObj.url" style="    width: 244px;position: absolute;height: 244px;top: 4%;left: 17%;" />
						</div>
						
					</div>
					<a class="btn" @click="sureBuyLing" style="margin-top: 100px;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<div class="div1" v-if="alertTip.Gtip">
					<div class="content-title">
						<p style="color: #e73433;font-size: 55px; font-weight: 600; line-height: 70px;">订购成功</p>
						<div style="text-align: center; padding: 100px 0;">
							<img :src="'k/images/award-success.png'" style="vertical-align: middle;">
						</div>
						</div>
					<a class="btn" @click="hideAlertTip()" style="margin-top: 80px;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<div class="btn-close" @click="hideAlertTip()"><img :src="'k/images/sp-close.png'" /></div>
			</div>
		</section>
		<address :show-address.sync="alertTip.showAddress" :gid="lucky.id"></address>
		<img :src="$root.activityBasePath+'/images/game-bg.jpg'" class="bg">
		<div v-if="sharetip" @click="hideShare()" class="sharebg"></div>
		<img v-if="sharetip" @click="hideShare()" :src="$root.activityBasePath+'/src/css/img/sharetip.png'" class="sharetip" />
		<!-- 优惠 -->
		<modal :show.sync="offers.show" :bg="false" :backdrop="false">
        			<div class="prize-over-view" style="position: relative;">
        				<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
        				<div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:10px">
        					<p class="offers-title">优惠券</p>
        					<div style="padding-bottom: 30px;">
	        					<div class="offers1">
	    							<img :src="$root.activityBasePath+'/images/offers-1.png'" style="display: inline-block; width: 160px;">
	    							<p class="text">满10元立减5元&nbsp;优惠券</p>
	    							<a class="btn" @click="showoffers(1)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat;">查看</a>
	    						</div>
	        					<div class="offers1">
	    							<img :src="$root.activityBasePath+'/images/offers-1.png'" style="display: inline-block; width: 160px;">
	    							<p class="text">满1000元立减100元&nbsp;优惠券</p>
	    							<a class="btn" @click="showoffers(2)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat;">查看</a>
	    						</div>
        					</div>
        					<div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="offers.show = false"><img :src="'k/images/sp-close.png'" /></div>
        				</div>
        				
        			</div>
        </modal>
        <!--淘宝提示-->
        <modal :show.sync="showofferstTip" :bg="false" :backdrop="false">
        			<div class="prize-over-view" style="position: relative;">
        				<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
        				<div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:10px">
        					<p class="offers-title">提示</p>
        					<div style="padding-bottom: 30px;">
        						<!--<p class="offers-text">长按复制下方口令再<span>打开淘宝</span>进入</p>-->
        						<p class="offers-text">复制以下链接,使用手机浏览器访问,</p>
        						<p class="offers-text">即可领取优惠券进入沃音乐商城使用</p>
        						<div class="offers-url">
	        						<p>https://taoquan.taobao.com/coupon</p>
									<p>/unify_apply.htm?sellerId=2687897927</p>
									<p>&activityId=1163f52875644c38aaa78dd</p>
									<p>12c5a9c1a</p>
        						</div>
	        					<a class="btn" @click="showofferstTip = false" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
        					</div>
        					<div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showofferstTip = false"><img :src="'k/images/sp-close.png'" /></div>
        				</div>
        				
        			</div>
        </modal>

		<modal :show.sync="showofferstTip1" :bg="false" :backdrop="false">
			<div class="prize-over-view" style="position: relative;">
				<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
				<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
				<div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:10px">
					<p class="offers-title">提示</p>
					<div style="padding-bottom: 30px;">
						<p class="offers-text">复制以下链接,使用手机浏览器访问,</p>
						<p class="offers-text">即可领取优惠券进入沃音乐商城使用</p>
						<div class="offers-url">
							<p>https://taoquan.taobao.com/coupon</p>
							<p>/unify_apply.htm?sellerId=2687897927</p>
							<p>&activityId=4a2cb7de2b9c458ba85d2</p>
							<p>364a45094d7</p>
						</div>
						<a class="btn" @click="showofferstTip1 = false" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
					</div>
					<div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showofferstTip1 = false"><img :src="'k/images/sp-close.png'" /></div>
				</div>

			</div>
		</modal>
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
		padding: 33px 27px!important;
		tr td {
			width: 33.3%!important;
			height: 30.5%!important;
			// border: 10px solid;
			border-color: rgba(225, 225, 225, 0);
		}
	}
	
	.app-view.game-page .section-wrap .downdiv {
		margin-top: -25px!important;
	}
	
	.app-view.game-page .section-wrap .active {
		border: 10px solid red!important;
	}
	@-webkit-keyframes fun{
	 0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.2,1.2); 
		-webkit-transform:scale(1.2,1.2); 
		-o-transform:scale(1.2,1.2); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         
}
 @-moz-keyframes  fun{
    0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.2,1.2); 
		-webkit-transform:scale(1.2,1.2); 
		-o-transform:scale(1.2,1.2); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}        
	 		
}
 @-o-keyframes fun{
   0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.2,1.2); 
		-webkit-transform:scale(1.2,1.2); 
		-o-transform:scale(1.2,1.2); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         
}
@-ms-keyframes fun{
     0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.2,1.2); 
		-webkit-transform:scale(1.2,1.2); 
		-o-transform:scale(1.2,1.2); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         	
}

	.offers{
		 -webkit-animation:fun 2s linear infinite;
		-moz-animation:fun 2s linear infinite;
		-ms-animation:fun 2s linear infinite;
		-o-animation:fun 2s linear infinite;
	}
	.ling{
		 -webkit-animation:fun 2s linear infinite;
		-moz-animation:fun 2s linear infinite;
		-ms-animation:fun 2s linear infinite;
		-o-animation:fun 2s linear infinite;
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
	    font-size: 26px;
	    padding-bottom: 20px;
	    color: #28584b;
	    span{
	    	color: #e92121;
			border-bottom: 2px solid #e92121;
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
			.right{
			    position: absolute;
			    right: -20px;
			    top: -112px;
			}
			.left{
			    position: absolute;
			    left: -20px;
			    top: -112px;
			}
    		.box {
    			position: relative;
    			padding: 20px;
    			margin: 0 auto;
    			// text-align: center;
    			box-sizing: border-box;
    			color: #fff;
    			.offers1{
    				margin-top: 40px;
    			}
    			.offers-text{
				    font-size: 29px;
				    color: #11735a;
				    font-weight: 600;
					margin-bottom:15px;
				    span{
				    	color: #e73433;
				    }
    			}
    			.offers-url{
				    color: #e73433;
				    font-size: 20px;
				    margin-top: 50px;
				    line-height: 50px;
				    padding-bottom: 20px;
				    font-weight: 600;
    			}
    			.offers-title{
			    	font-size: 60px;
				    color: #285f51;
				    font-weight: 600;
				    line-height: 120px;
    			}
    			.text{
			    	display: inline-block;
				    color: #e73433;
				    width: 30%;
				    line-height: 34px;
				    text-align: left;
				    font-weight: 600;
    			}
    			.btn {
			      display: inline-block;
			      width: 190px;
			      height: 78px;
			      margin-top: 108px;
			      line-height: 70px;
			      font-size: 32px;
			      text-align: center;
			      color: #fff;
			      border-radius: 36px;
			      vertical-align: top;
			    }
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
    		// .close-img {
    		// 	position: absolute;
    		// 	right: 20px;
    		// 	top: 20px;
    		// 	max-width: 56px;
    		// 	max-height: 50px;
    		// }
    	}
</style>

<script>
	import {
		router
	} from './index'
	import api from './utils/serverapi.js'
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
			modal: require('./modal/Modal.vue'),
		},
		data() {
			return {
				modalConfig: {
                	state: 0,
                	vip: false,
                	imgUrl: ''
               },
               offers: {
                	state: 0,
                	show: false,
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
					Gtip: false,
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
					"itemimg": activityBasePath + "/images/marquee-4.png",
					"index": 0,
					"title": "耳机",
					"haveprize": true,
					"pid": '50'
					
				}, {
					"itemimg": activityBasePath + "/images/marquee-3.png",
					"index": 1,
					"title": "小米手环",
					"haveprize": true,
					"pid": '51'
				}, {
					"itemimg": activityBasePath + "/images/marquee-7.png",
					"index": 2,
					"title": "还差一点就抽中啦",
					"haveprize": false,
				}, {
					"itemimg": activityBasePath + "/images/marquee-1.png",
					"index": 3,
					"title": "相片打印机",
					"haveprize": true,
					"pid": '49'
				}, {
					"itemimg": activityBasePath + "/images/marquee-5.png",
					"index": 4,
					"title": "1元铃音盒",
					"haveprize": true,
					"pid": '52'
					
				}, {
					"itemimg": activityBasePath + "/images/marquee-7.png",
					"index": 5,
					"title": "还差一点就抽中啦",
					"haveprize": false,
					
				}, {
					"itemimg": activityBasePath + "/images/marquee-2.png",
					"index": 6,
					"title": "kindle",
					"haveprize": true,
					"pid": '48'
					
				}, {
					"itemimg": activityBasePath + "/images/marquee-6.png",
					"index": 7,
					"title": "铃音盒",
					"haveprize": true,
					"pid": '53'
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
				showofferstTip: false,
				showofferstTip1: false,
				showoffersText: 0,
				lphone:'',

			}
		},
		
		ready() {
			this.$root.musicData.showMusic = true;
			this.$root.$refs.music.sounddisable(false);
            
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
			// this.getuserSignInfo();

			// this.getActUserTimes(); //剩下的次数

			this.lotteryObj = initLottery();

			this.dialogFn(); //弹框样式
			// this.judgeIsClearance();
			if(!this.$root.islogin){
				this.$root.loginokcallback = this.lcb;
			}else{
				this.lcb();
			}
			this.lphone = sessionStorage.getItem('LoginMobile');
			// this.$root.vipsuccess = true;
			// 
			// 测试代码
			// this.isPrize=true;
			// this.showRetTip();
		},
		methods: {
			lcb(){
				this.getuserSignInfo();
				this.getActUserTimes(); 
				this.judgeIsClearance();
			    // this.$refs.plist.quePrizeDrawResult();

			},
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source':source
				}, (back) => {})
			},
			//获取通关记录
			judgeIsClearance(){
				api.judgeIsClearance(this,{},(back) =>{
					if(back.resCode == 0 || back.resCode == "0"){
						this.ispass = back.repBody.msg;

					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},
			//优惠弹框
			offersEvents(){
				this.offers.show = true;
                this.addOperLog('button','discount');
			},
			//点击领取圣铃
            goBells(){
                router.go('bells');
                this.addOperLog('button','bells');
			},
			//确认订购炫铃
			sureBuyLing(){
				var body={
					accessToken: this.$root.accesstoken,
					toneID: this.lotteryObj.sid ,
					mobile: this.lphone,
					aid: aid,
					toneType:2,
				};
				api.buyTone(this,body,(back) =>{
					if(back.resCode == 0 || back.resCode == "0"){
						this.alertTip.rootTip = true;
						this.alertTip.Ftip = false;
						this.alertTip.Gtip = true;
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},
			//淘宝提示
			showoffers(index){
				if(index == 1){
					this.showofferstTip = true;
					this.showoffersText = 10;
				}else if(index == 2){
					this.showofferstTip1 = true;
					this.showoffersText = 20;
				
				}
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
				api.queEveryDay(this, {}, (back) => {
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
			addr(sid) {

				if(sid != ''){
					this.alertTip.rootTip = true;
					this.alertTip.Atip = false;
					this.alertTip.Ftip = true;
				}else{
					this.alertTip.rootTip = false;
					this.alertTip.showAddress = true;
				}
				
				
			},
			//一键购票按钮
			buyTicket(){
				this.addOperLog('button','buyTicket');
				location.href="http://piao.damai.cn/112173.html";
			},
			//用户抽奖
			userDoLucky() {
				var that = this;
				that.lotteryObj.prize = -1;
				api.doLucky(this, {
					"types": "跑马灯"
				}, (back) => {
					that.getActUserTimes();
					if(back.resCode == '0') {
						that.isPrize = true;
						var prize = back.repBody[0];
						that.lucky.id = back.repBody[0].gid;
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
						//判断是否通关
						// if(this.ispass == 'true' || this.ispass == true){
							//是否会员
							if(this.$root.cookieVip == "0000000000"){
								this.alertTip.rootTip = true;
								this.alertTip.Dtip = true;
								this.alertTip.Atip = false;
								this.alertTip.Btip = false;
								this.alertTip.Ctip = false;
								this.alertTip.Ftip = false;
							}else{
								this.$root.vipbenefit = true;
							}
							
						// }else{
							
						// 	this.alertTip.rootTip = true;
						// 	this.alertTip.Dtip = true;
						// 	this.alertTip.Atip = false;
						// 	this.alertTip.Btip = false;
						// 	this.alertTip.Ctip = false;
						// 	this.alertTip.Ftip = false;

						// }
					}
				}
				
			},
			hideShare() {
				this.sharetip = false;
			},
			shareWx() {},
			getuserSignInfo() {
				// var that = this;
				// api.getuserSignInfo(this,{},(back)=>{
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
				// api.userSign(this,{},(back)=>{
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
				this.addOperLog('button','musicvip');
				this.$root.openvip = true;
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