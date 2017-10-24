<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel myprize" style="background: #fff; border-radius: 20px;" v-if="!lingshow && !lingsuccessShow">
		<!-- <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
		<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right"> -->
			<div class="title">
				我的奖品
			</div>
			<ul class="data-ul">
				<li  v-for="list in prizeList">
					<img class="prize-img" :src="$root.activityBasePath+list.imgurl">
					<div style="width: 34%;display: inline-block; vertical-align: middle;">
						<p class="phone">{{!!list.mobile?list.mobile:''}}</p>
						<p class="prize-name">{{list.pname}}</p>
					</div>
					<div style="display: inline-block; vertical-align: middle;" v-if="list.sid =='' || list.sid==null || list.sid==undefined ">
						<a class="btn" @click="goPrize(list.gid,list.mobile)" :style="'background: url(./n/images/btn-bg.png);'">
						{{!list.mobile? '去领奖':'修改信息'}}
						</a>
					</div>

					<div style="display: inline-block; vertical-align: middle;" v-if="list.sid && list.sid !=''">
						<a class="btn" :style="list.count == 0 && list.sid !='' ?'background: url(./n/images/btn-bg.png);':'background:url(./n/images/btn_gray.png)'" @click="buylingshow(list)">{{list.count == 0 && list.sid !=''?'去领奖':'已领奖'}}
						</a> 
					</div>
					
					<!-- <img class="prize-img" :src="$root.activityBasePath+list.imgurl"> -->

				</li>
			</ul>
			<img class="close" :src="$root.activityBasePath+'/images/close.png'" @click="show=false" />
		</section>
		<section class="bg-section" v-if="lingshow">
			<div class="content"style="width: 545px; margin: 50px 20px 0 20px;">
				<!-- <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
				<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right"> -->
				<div class="div1">
					<div class="content-title">
						<p class="title">是否确认订购</p>
						<p>"{{lingitem.pname}}"?</p>
						<div style="padding-top: 20px;">
							<img :src="$root.activityBasePath+lingitem.imgurl" style="border: 10px solid #b42828;"/>
						</div>
						
					</div>
					<a class="btn" @click="buyling" style="margin-top: 0px;background: url('./n/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
					<p class="border"></p>
					<div class="tip-ling">
						<p>1、订购成功后，铃音盒使用有效期可到 “个人中心”查看。</p>
						<p>2、目前安徽、福建的4G用户需在会员套餐外另外收取炫铃功能费，敬请谅解。</p>
						<p>3、未开通炫铃功能的用户，订购铃音盒后将默认开通此功能，资费5元/月，4G用户免费开通。</p>
					</div>
				</div>
				<div class="btn-close" @click="lingshow=false"><img :src="'n/images/close.png'" /></div>
			</div>
		</section>
		<section class="bg-section" v-if="lingsuccessShow">
			<div class="content"style="width: 545px; margin: 50px 20px 0 20px;">
				<!-- <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
				<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right"> -->
				<div class="div1">
					<div class="content-title">
						<p class="title">订购成功</p>
						<div style="text-align: center; padding: 55px 0;">
							<img :src="'n/images/award-success.png'" style="vertical-align: middle;">
						</div>
						</div>
					<a class="btn" @click="lingsuccessShow=false" style="margin-top: 0px;background: url('./n/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<div class="btn-close" @click="lingsuccessShow=false"><img :src="'n/images/close.png'" /></div>
			</div>
		</section>
	</modal>
	
</template>
<style lang="sass">
	.prize-panel.myprize {
		width: 560px;
		height: auto;
		padding-bottom: 30px;
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
			color: #b42828;
			text-align: center;
			font-weight: 600;
		}
		.data-ul {
			width: 100%;
			list-style: none;
			min-height: 180px;
			overflow-y: auto;
			color: #b42828;
			text-align: center;
			li {
				
				background-repeat: no-repeat!important;
				width: 510px;
				margin: 10px auto 0px;
				position: relative;
				line-height: 1;
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
					width: 20%;
					vertical-align: middle;
					padding: 20px 0;
					
				}
				.btn {
			        vertical-align: top;
				    display: inline-block;
				    text-align: center;
				    background-repeat: no-repeat !important;
				    background-size: 199px 62px !important;
				    font-size: 27px;
				    line-height: 59px;
				    color: #fff;
				    width: 209px;
				    height: 62px;
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
				interfacepos:0,//当前尝试接口次数
				interfacecount:3,//总共尝试接口次数
			}
		},
		ready(){},
		methods: {
			init() {
				var that = this;
				api.queMyPrizeDrawResult(this, {}, (back) => {
					if(back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					} else {
						that.prizeList = back.repBody;
                    	
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
				this.showAdd = true;
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
					this.lingshow = true;
					this.lingitem = item;
					
				}
			
			},
			buyling(){
				var that = this;
				that.$dispatch('loading', {
					name: 'findUserBasInfoMyprize',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				api.findUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
					that.$dispatch('cancelloading', 'findUserBasInfoMyprize');
					if(back.resCode=='0'){
						//订购炫铃能力
						that.qryUserBasInfo();
					}else if(back.resCode=='10001'){
						//订购炫铃
						that.buyTone();
					}else{
						that.$dispatch('handle_server_error', back);
					}
				})

			},
			qryUserBasInfo(){
				var that = this;
				//开通炫铃功能
				that.$dispatch('loading', {
					name: 'qryUserBasInfoMyprize',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				that.interfacepos++;
				api.qryUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
					that.$dispatch('cancelloading', 'qryUserBasInfoMyprize');
					if(back.resCode=='0' || back.resCode=='30001'){
						that.interfacepos = 0;
						that.buyTone();
					}else{
						if(that.interfacepos<that.interfacecount){
							setTimeout(that.qryUserBasInfo,1000);
						}else{
							// that.$dispatch('handle_server_error', back);
							that.lingshow = false;
							that.$root.vipfail = true;
							
						}
					}

				})
			},
			buyTone(){
				var that = this;
				that.$dispatch('loading', {
					name: 'buyToneMyprize',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				var body={
					accessToken: that.$root.accesstoken,
					toneID: that.lingitem.sid ,
					mobile: sessionStorage.getItem('LoginMobile'),
					aid: aid,
					toneType:2,
				};
				that.interfacepos++;
				api.buyTone(that,body,(back) =>{
					that.$dispatch('cancelloading', 'buyToneMyprize');
					if(back.resCode=='0'){
						that.lingsuccessShow = true;
						that.lingshow = false;
					} else {
						// this.$dispatch('handle_server_error', back);
						if(that.interfacepos<that.interfacecount){

							setTimeout(that.buyTone,1000);
						}else{
							that.lingshow = false;
							that.$root.vipfail = true;
						}
					}
				})
			},
		}
	}
</script>