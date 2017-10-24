<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel myprize" style="background: #fffbf1; border-radius: 20px;">
			<div class="title">
				我的奖品
			</div>
			<!-- <ul class="data-ul">
				<li  v-for="list in prizeList">
					<p class="prize-name">{{list.pname}}</p>
					<img class="prize-img" :src="$root.activityBasePath+list.imgurl">
					
					<div>
						<a class="btn" @click="goPrize(list.gid,list.mobile)" :style="'background: url(./i/images/btn-bg.png);'">
						{{!list.mobile?'去领奖':'修改信息'}}
						</a>
					</div>
					
				</li>
			</ul> -->
			<ul class="data-ul">
				<li  v-for="list in prizeList">
					<p class="prize-name">{{list.pname}}</p>
					<!-- <p class="prize-name" v-if="list.sid">券码：{{list.sid}}</p>
					<p class="prize-name" v-if="list.sid">密码：{{list.pwd}}</p> -->

					<img class="prize-img" :src="$root.activityBasePath+list.imgurl">
					<!-- <div class=""><img class="prize-img" :src="list.imgurl"></div> -->
					<p class="prize-name" style="color: #fd6751; line-height: 32px; font-size: 22px;" v-if="list.sid">活动结束前于沃音乐门户（移动端）票务频道购满总额280以上演出门票，返回“我的奖品”填写购票订单号可获得30元大麦代金券和100元京东券。</p>
					<div v-if="list.sid">
						<a class="btn" @click="goPrize(list.gid,list.mobile,list.sid)" :style="'background: url(./i/images/btn-bg.png);'">
						我已购票
							<a class="btn" @click="buytickets" :style="'background: url(./i/images/btn-bg-gray.png);'">
						我要购票
						</a>
					</div>
					<div v-if="list.sid =='' || list.sid==null || list.sid==undefined ">
						<a class="btn" @click="goPrize(list.gid,list.mobile)" :style="'background: url(./i/images/btn-bg.png);'">
						{{!list.mobile?'去领奖':'修改信息'}}
						</a>
					</div>
					
					<!-- <img class="prize-img" :src="$root.activityBasePath+list.imgurl"> -->

				</li>
			</ul>
			<img class="close" :src="$root.activityBasePath+'/images/sp-close.png'" @click="show=false" />
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel.myprize {
		width: 560px;
		height: auto;
		padding-bottom: 30px;
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
			color: #4e140c;
			text-align: center;
			font-weight: 600;
		}
		.data-ul {
			width: 100%;
			list-style: none;
			min-height: 180px;
			overflow-y: auto;
			color: #4e140c;
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
					
					vertical-align: top;
					padding: 20px 0;
					
				}
				.btn {
				    vertical-align: top;
				    display: inline-block;
				    text-align: center;
				    background-repeat: no-repeat !important;
				    background-size: 254px 89px !important;
				    font-size: 32px;
				    line-height: 89px;
				    color: #4e140c;
				    width: 254px;
				    height: 89px;
				}
			}
		}
	}
</style>
<script>
	import modal from './../../../src/components/Modal.vue'
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
					// 	"imgurl": "/images/marquee_4.png",  //奖品缩略图
					// 	"mobile": "186****5905",   //榜单奖品手机号码，没有表示未领取
					// 	"pname": "小米平衡车"   //奖品名称
					// }, 
					// {
					// 	"gid":1,  //奖品id
					// 	"imgurl": "http://v.soyu.cn/fsd/ap/20160921/88_2342b904_fc81_4ddb_b5df_59011cc2788e.jpg",
					// 	"pname": "大疆无人机"
					// }
				]
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
		}
	}
</script>