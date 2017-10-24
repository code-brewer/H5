<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel myprize" style="background: #fff;border: 8px solid #f7af49; border-radius: 20px;" v-if="!lingshow && !lingsuccessShow && !lingfailShow">
		<img :src="$root.activityBasePath+'/images/modal-l.png'" class="hh">
		<img :src="$root.activityBasePath+'/images/modal-r.png'" class="mm">
			<div class="title">
				我的奖品
			</div>
			<ul class="data-ul">
				<li  v-for="list in prizeList" style="border-bottom:8px solid #f7af49">
					<img class="prize-img" :src="$root.activityBasePath+list.imgurl">
					<div style="width: 34%;display: inline-block; vertical-align: middle;">
						<p class="phone">{{!!list.mobile?list.mobile:''}}</p>
						<p class="prize-name">{{list.pname}}</p>
					</div>
					<div style="display: inline-block; vertical-align: middle; margin-top: -70px;" v-if="list.sid =='' || list.sid==null || list.sid==undefined ">
						<a class="btn" @click="goPrize(list.gid,list.mobile,list.pid)" :style="'background: url(./l/images/btn-bg.png);'">
						{{!list.mobile? '去领奖':'修改信息'}}
						</a>
					</div>

					<div style="display: inline-block; vertical-align: middle; margin-top: -70px;" v-if="list.sid && list.sid !=''">
						<a class="btn" :style="list.count == 0 && list.sid !='' ?'background: url(./l/images/btn-bg.png);':'background:url(./l/images/btn_gray.png)'" @click="buylingshow(list)">{{list.count == 0 && list.sid !=''?'去领奖':'已领奖'}}
						</a> 
					</div>
				</li>
			</ul>
			<img class="close" :src="$root.activityBasePath+'/images/sp-close.png'" @click="show=false" />
		</section>
		<section class="bg-section" v-if="lingshow">
			<div class="content" style="width: 545px;height:840px;border: 8px solid #f7af49;margin-top: 10px">
				<img :src="$root.activityBasePath+'/images/modal-l.png'" style="position: absolute;
   	left: -6%;
    top: 90%;
    z-index: 100;
    transform: rotate(-15deg);">
				<img :src="$root.activityBasePath+'/images/gg.png'" style="position: absolute;
    right: -9%;
    top: 90%;
    width:20%;
    transform: rotate(65deg);
    z-index: 100;">
				<div class="div1">
					<div class="content-title">
						<p style="color: #f7af49;font-size: 55px; font-weight: 600; line-height: 70px;">是否确认订购</p>
						<p style="color:#a72531">"{{lingitem.pname}}"?</p>
						<div style="width: 370px; height: 240px;background: url('./l/images/pic-bg.png') center center no-repeat;background-size: 73% 100%;position: absolute; top: 20%; left: 54%; margin-left: -215px;">
							<img :src="$root.activityBasePath+lingitem.imgurl" style="width: 244px;position: absolute;height: 220px;top: 4%;left: 17%;" />
						</div>
					</div>
					<div v-if="this.$root.on==false" style="width:50%;height: 100px;margin: 60px auto 0 auto;">
						<p style="float:left;width:20%;height:50px;border: 3px solid #a72531;"><img :src="img"></p>
						<p style="height: 43px;font-size: 23px;line-height: 55px">*同意开通炫铃功能</p>
					</div>
					<a  v-if="this.$root.on==false" class="btn" @click="buyling" style="margin-top:-20px;margin-bottom: 20px;background: url('./l/images/btn-bg.png') center center no-repeat;">确定</a>
					<a  v-else class="btn" @click="buyling" style="margin-top:90px;margin-bottom: 20px;background: url('./l/images/btn-bg.png') center center no-repeat;">确定</a>
					<div style="border-top:5px solid #ddd">
						<dl style="height: 220px;overflow-y:auto;font-family: none;color: #a72531;padding-top: 20px;text-align: left">
							<dd style="font-size: 20px">1.&nbsp;在规定时间内通关成功即可参与抽奖,每天闯关次数不限。</dd>
							<dd style="font-size: 20px">2.&nbsp;目前安徽、福建的4G用户需在会员套餐外另外收取炫铃功能费,敬请谅解。</dd>
							<dd style="font-size: 20px">3.&nbsp;未开通炫铃功能的用户,订购炫铃后将默认开通此功能,资费5元/月,4G用户免费开通。</dd>
						</dl>
					</div>
				</div>
				<div class="btn-close" @click="lingshow=false"><img :src="'l/images/sp-close.png'" /></div>
			</div>
		</section>
		<section class="bg-section" v-if="lingsuccessShow">
			<div class="content"style="width: 545px;border: 8px solid #f7af49;">
				<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
				<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
				<div class="div1">
					<div class="content-title">
						<p style="color:#f7af49;font-size: 55px; font-weight: 600; line-height: 70px;">订购成功</p>
						<div style="text-align: center; padding: 15px 0;margin-top: 70px;">
							<!--<img :src="'l/images/award-success.png'" style="vertical-align: middle;">-->
							<p style="color:#f7af49;margin-bottom:10px;font-size:40px">请登录沃音乐"个人中心"</p>
							<p style="color:#f7af49;font-size:40px">设置炫铃吧！</p>
						</div>
						</div>
					<a class="btn" @click="lingsuccessShow=false" style="margin-top: 10px;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<div class="btn-close" @click="lingsuccessShow=false"><img :src="'l/images/sp-close.png'" /></div>
			</div>
		</section>
		<!--订购失败-->
		<section class="bg-section" v-if="lingfailShow">
			<div class="content"style="width: 545px;border: 8px solid #f7af49;">
				<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
				<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
				<div class="div1">
					<div class="content-title">
						<p style="color:#f7af49;font-size: 55px; font-weight: 600; line-height: 70px;">提示</p>
						<div style="text-align: center; padding: 15px 0;margin-top: 35px;">
							<!--<img :src="'l/images/award-success.png'" style="vertical-align: middle;">-->
							<p style="font-size: 33px">{{errorText}}</p>
							<p style="color:#f7af49;margin-bottom:10px;font-size:40px">请重试</p>
							<p style="color:#f7af49;font-size:40px">(如重试后订购失败，联系小沃查询异常哦）</p>
						</div>
					</div>
					<a class="btn" @click="lingfailShow=false" style="margin-top: 40px;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
				</div>
				<div class="btn-close" @click="lingfailShow=false"><img :src="'l/images/sp-close.png'" /></div>
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
			right: -28px;
			top: 310px;
			z-index: 1000;
		}
		.left{
			position: absolute;
			left: -20px;
			top: 380px;
			z-index: 1000;
		}
		.hh{
			position: absolute;
			left: -15px;
			top: 561px;
			z-index: 1000;
		}
		.mm{
			position: absolute;
			right: -28px;
			top: 508px;
			z-index: 1000;
			width: 28%;
		}
		.close {
			position: absolute;
			top: -30px;
			left: 55%;
			margin-left: 190px;
		}
		.title {
			margin: 0 auto;
			font-size: 38.84px;
			line-height: 3;
			color: #f7af49;
			text-align: center;
			font-weight: 600;
		}
		.data-ul {
			width: 100%;
			list-style: none;
			min-height: 180px;
			height:500px;
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
					position: relative;
					z-index: 1000;
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
				default: false,//
			},
			showAdd: {
				Boolean,
				default: false,//
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
				lingshow:false,//
				lingsuccessShow:false,//
                lingfailShow:false,
				lingitem:{},
//				on:false,
				trueMe:true,
				img:'l/images/true-icon.png',
                interfacepos:0,//接口尝试当前次数
                interfacecount:3,// 接口尝试总次数
                errorText:'',
			}
		},
		ready(){
            //this.accesstoken = getCookie('cn.easier.wmpo.tone.accesstoken');
		},
		methods: {
			init() {
				var that = this;
				api.queMyPrizeDrawResult(this, {}, (back) => {
					if(back.resCode != '0') {
						that.$dispatch('handle_server_error', back);
					} else {
						that.prizeList = back.repBody;
                        that.prizeList.push({
                            "sid":907550290062,  //奖品id
                            "imgurl": "/images/good.png",  //奖品缩略图
							"count":"0",
                            "pname": "免费新年幸运铃音盒"   //奖品名称
                        });
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
            goOn(){
                if(this.img != ''){
					this.img='';
                    this.trueMe=false;
				}
				else{
                    this.img='l/images/true-icon.png';
                    this.trueMe=true;
				}
			},
			goPrize(gid, sid, pid) {
				this.show = false;
				this.showAdd = true;
				this.gid = gid;
				var sid2 = sid ? sid : '';

				if(pid==58){
                    sessionStorage.setItem('pname',180);
				}
                if(pid==56){
                    sessionStorage.setItem('pname',280);
                }
                if(pid==57){
                    sessionStorage.setItem('pname',180);
                }
                if(pid==54){
                    sessionStorage.setItem('pname',1280);
                }
				sessionStorage.setItem('sid',sid2);

			},
			buytickets(){
				this.addOperLog('button','buyticket');
				location.href="http://10155.com/damai/index.jsp";
			},
			buylingshow(item){
                this.haveYesOrNo();
				if(item.count == 0){
					this.lingshow = true;
					this.lingitem = item;
				}
			
			},
            //是否开通炫铃功能
            haveYesOrNo(){
                var body={
                    accessToken: this.$root.accesstoken,
                };
                api.findUserBasInfo(this,body,(back) => {
                    if (back.resCode == 10001 || back.resCode == '10001') {
                        var back = back.resMsg;
                        this.$root.on = true;
                    }
                })
            },
            buyling(){
                if(this.trueMe){
                    this.qryUserBasInfo();
                }else{
                    this.buyXLtrue();
                }
			},
            qryUserBasInfo(){
                this.$dispatch('loading', {
                    name: 'qryUserBasInfo',
                    icon: true,
                    text: '请稍后...',
                    show: true,
                    duration: 70 * 1000
                });
                var key={
                    accessToken: this.$root.accesstoken,
                };
                this.interfacepos++;
                api.qryUserBasInfo(this,key,(back) =>{
                    this.$dispatch('cancelloading', 'qryUserBasInfo');
                    if(back.resCode == '0'|| back.resCode == '30001'){
//                        this.$dispatch('loading', {text: '炫铃功能开通成功！耶', show: true, duration: 1000});
                        this.interfacepos = 0;
                        this.buyXLtrue();
                    }
                    else{
                        if(this.interfacepos<this.interfacecount){
                            setTimeout(this.qryUserBasInfo(),1000);
                        }else{
                            this.$dispatch('loading', {text: back.resMsg, show: true, duration: 1000});
                        }
                    }
                });
//                else{
//                    this.$dispatch('loading', {text: '您需开通炫铃功能，勾选订购吧！', show: true, duration: 1000});
//                }
            },
            buyXLtrue(){
                var body = {
                    accessToken: this.$root.accesstoken,
                    toneID: this.lingitem.sid,
                    mobile: sessionStorage.getItem('LoginMobile'),
                    aid: aid,
                    toneType: 2,
                    source: source,
                };
                this.$dispatch('loading', {
                    name: 'buyTone',
                    icon: true,
                    text: '请稍后...',
                    show: true,
                    duration: 70 * 1000
                });
                this.interfacepos++;
                api.buyTone(this, body, (back) => {
                    this.$dispatch('cancelloading', 'buyTone');
                    if (back.resCode == 0 || back.resCode == "0") {
                        this.lingsuccessShow = true;
                        this.lingshow = false;
                        console.log('sid',this.lingitem.sid);//哈哈哈哈哈哈哈哈
                        if(this.lingitem.sid=='907550290062') {
                            this.lingitem.count=1;
                            console.log('count:'+this.lingitem.count)
                        }
                    } else{
                        if(this.interfacepos<this.interfacecount){
                            setTimeout(this.buyXLtrue(),1000);
                        }
                        else {
                            this.errorText=back.resMsg;
                            this.lingfailShow = true;
                            this.lingshow = false;
                        }
                    }
                });
            },
            getCookie(name){
                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr=document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            }
		}
	}
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
</script>