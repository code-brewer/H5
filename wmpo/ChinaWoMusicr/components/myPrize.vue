<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel myprize box"  style="background-image: url('./r/images/modal-bg3.png'); background-size: 100% 100%;">
			
			<div class="title">
				我的奖品
			</div>
			
			<ul class="data-ul">
				<li  v-for="list in prizeList">
					<img class="prize-img" :src="$root.activityBasePath+list.imgurl" style="width: 130px;">
					<div style="width: 34%;display: inline-block; vertical-align: middle;">
						<!-- <p class="phone">{{!!list.mobile?list.mobile:''}}</p> -->
						<p class="prize-name">{{list.pname}}</p>
					</div>
					<!-- <p class="prize-name" v-if="list.sid">券码：{{list.sid}}</p>
					<p class="prize-name" v-if="list.sid">密码：{{list.pwd}}</p> -->

					
					<!-- <div class=""><img class="prize-img" :src="list.imgurl"></div> -->
					<!-- <p class="prize-name" style="color: #fd6751; line-height: 32px; font-size: 22px;" v-if="list.sid">活动结束前于沃音乐门户（移动端）票务频道购满总额280以上演出门票，返回“我的奖品”填写购票订单号可获得30元大麦代金券和100元京东券。</p>
					<div v-if="list.sid">
						<a class="btn" @click="goPrize(list.gid,list.mobile,list.sid)" :style="'background: url(./i/images/btn-bg.png);'">
						我已购票
							<a class="btn" @click="buytickets" :style="'background: url(./i/images/btn-bg-gray.png);'">
						我要购票
						</a>
					</div> -->
					<div style="display: inline-block; vertical-align: middle;" v-if="list.sid =='' || list.sid==null || list.sid==undefined ">
						<a class="btn" @click="goPrize(list.gid,list.mobile)" :style="'background: url(./r/images/y-btn-bg.png);'">
						{{!list.mobile? '去领奖':'修改信息'}}
						</a>
					</div>

					<div style="display: inline-block; vertical-align: middle; " v-if="list.sid && list.sid !=''">
						<a class="btn" :style="list.count == 0 && list.sid !='' ?'background: url(./r/images/y-btn-bg.png);':'background:url(./r/images/y-btn-bg.png)'" @click="buylingshow(list)">{{list.count == 0 && list.sid !=''?'去领奖':'已领奖'}}
						</a> 
					</div>
					
					<!-- <img class="prize-img" :src="$root.activityBasePath+list.imgurl"> -->

				</li>
			</ul>
			<img class="close-img" :src="$root.activityBasePath+'/images/close.png'" @click="show=false" />
		</section>
	</modal>
<!-- 	<modal :show.sync="lingshow":bg="false">
		<section class="prize-panel myprize box text-center" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat;" >
			<img class="bottom" :src="'o/images/wen-bottom1.png'" />
			<img :src="$root.activityBasePath+'/images/light.png'" class="light">
			<div class="content-title">
				<p class="title">是否确认订购</p>
				<p>"{{lingitem.pname}}"?</p>
				<div style="padding-top: 20px;">
					<img :src="$root.activityBasePath+lingitem.imgurl" style="border: 10px solid #b42828;"/>
				</div>
				
			</div>
			<a class="confirm-btn" @click="buyling" style="background: url('./o/images/btn-bg.png') center center no-repeat; margin: 20px auto;">确定</a>
			<div class="tip-ling">
				<p>1、订购成功后，铃音盒使用有效期可到 “个人中心”查看。</p>
				<p>2、目前安徽、福建的4G用户需在会员套餐外另外收取炫铃功能费，敬请谅解。</p>
				<p>3、未开通炫铃功能的用户，订购铃音盒后将默认开通此功能，资费5元/月，4G用户免费开通。</p>
			</div>
			<div class="close-img" @click="lingshow=false"><img :src="'o/images/close.png'" /></div>
			
		</section>
	</modal>
	<modal :show.sync="lingsuccessShow":bg="false">
		<section class="bg-section" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; ">
			<div class="content"style="width: 545px;">
				
				<div class="div1">
					<div class="content-title">
						<p style="color: #e73433;font-size: 55px; font-weight: 600; line-height: 70px;">订购成功</p>
						<div style="text-align: center; padding: 15px 0;">
							<img :src="'k/images/award-success.png'" style="vertical-align: middle;">
						</div>
						</div>
					<a class="btn" @click="lingsuccessShow=false" style="margin-top: 80px;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<div class="btn-close" @click="lingsuccessShow=false"><img :src="'o/images/close.png'" /></div>
			</div>
		</section>
	</modal> -->
	
	
</template>
<style lang="sass">
	.prize-panel.myprize {
		// width: 560px;
		height: auto;
		 padding-bottom: 20px;
		
		.close {
			position: absolute;
			top: 30px;
			left: 50%;
			margin-left: 190px;
		}
		.title {
			margin: 0 auto;
			font-size: 38.84px;
			line-height: 3;
			color: #fff;
			text-align: center;
			padding-top: 50px;
			font-weight: 600;
		}
		.tip-ling{
		    text-align: left;
    		padding: 15px;
		}
		.data-ul {
			width: 100%;
			list-style: none;
			min-height: 250px;
			overflow-y: auto;
			color: #fff;
			text-align: center;
			li {
				
				background-repeat: no-repeat!important;
				width: 510px;
				margin: 10px auto 0px;
				position: relative;
				line-height: 1;
				min-height: 100px;
				.phone {
					font-size: 35px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					
				}
				.prize-name {
					font-size: 30px;
					font-weight: 600;
					line-height: 45px;
					
				}
				.prize-img {
					// width: 20%;
					vertical-align: middle;
					// padding: 20px 0;
					
				}
				.btn {
		            vertical-align: top;
				    display: inline-block;
				    text-align: center;
				    background-repeat: no-repeat !important;
				    background-size: 182px 72px !important;
				    font-size: 27px;
				    line-height: 72px;
				    color: #fff;
			        width: 182px;
    				height: 72px;
    				margin-top: 0;
				}
			}
		}
	}
</style>
<script>
	import modal from './../modal/Modal.vue'
	import api from './../utils/serverapi.js'
	export default {
		components: {
			modal
		},
		props: {
			show: {
				Boolean,
				default: false,
			},
			showAdd: {
				Boolean,
				default: false,
			},
			gid: {
				String,
				default: "",
			},

			
		},
		watch: {
			show(value) {
				if(value) this.init();
			},
		},
		data() {
			return {
				prizeList: [
					// {
					// 	"gid":1,  //奖品id
					// 	"imgurl": "/images/marquee-4.png",  //奖品缩略图
					// 	"mobile": "186****5905",   //榜单奖品手机号码，没有表示未领取
					// 	"pname": "小米平衡车"   //奖品名称
					// }, 
					// {
					// 	"gid":1,  //奖品id
					// 	"imgurl": "http://v.soyu.cn/fsd/ap/20160921/88_2342b904_fc81_4ddb_b5df_59011cc2788e.jpg",
					// 	"pname": "大疆无人机"
					// }
				],
				lingshow:false,
				lingsuccessShow:false,
				lingitem:{},
			}
		},
		ready(){
			
		},
		methods: {
			init() {
				var that = this;
				api.queMyPrizeDrawResult(this, {}, (back) => {
					if(back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					} else {
						that.prizeList = back.repBody;
                    	sessionStorage.setItem('luckyId',that.prizeList[0].gid);
						if(that.prizeList && that.prizeList.length>0 && that.prizeList[0].mobile && that.prizeList[0].mobile.length>0){
							localStorage.setItem('awardmobile',"true");
						}
						else{
							localStorage.setItem('awardmobile',"false");
						}
					}
				});
			},
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source':source
				}, (back) => {})
			},
			goPrize(gid, flag, sid) {
				
				this.show = false;
				this.$root.showAddress = true;
				this.gid = gid;
				var sid2 = sid ? sid : '';
				sessionStorage.setItem('sid',sid2);
			
			},
			buytickets(){
				this.addOperLog('button','buyticket');
				location.href="http://10155.com/damai/index.jsp";
			},
			buylingshow(item){
				if(item.count == 0){
					this.$root.buytone = true;
					this.lingitem = item;
					console.log(this.lingitem)
					sessionStorage.setItem('lingitem',JSON.stringify(this.lingitem));
				}
			
			},
			buyling(){
				// var body={
				// 	accessToken: this.$root.accesstoken,
				// 	toneID: this.lingitem.sid ,
				// 	mobile: sessionStorage.getItem('LoginMobile'),
				// 	aid: aid,
				// 	toneType:2,
				// };
				// api.buyTone(this,body,(back) =>{
				// 	if(back.resCode == 0 || back.resCode == "0"){
				// 		this.lingsuccessShow = true;
				// 		this.lingshow = false;
				// 	} else {
				// 		this.$dispatch('handle_server_error', back);
				// 	}
				// })
			},
		}
	}
</script>