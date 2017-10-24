<template>
	<modal :show.sync="buytoneShow" :bg="false">
		<div class="components-buytone">
			<div class="box text-center" style="background: #ff99b3;">
				<div class="con">
					<p class="title">是否确认订购</p>
					<p class="title"> “情人节铃音盒”？</p>
					<!-- <div class="tone-con"> -->
						<div style="padding: 10px;">
							<img :src="'r/images/zero-ling.png'">
						</div>
						<!-- <div class="right">
							<p class="text">{{lingItem.pname}}</p>
							
						</div> -->

					<!-- </div> -->
					<!-- <img :src="'r/images/agree.png'" /> -->
					<div class="agree">
	                    <input type="checkbox" v-model="isCheck">
	                    <p>同意开通炫铃功能</p>
	                </div>
					<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="buyToneNow()" v-if="isCheck">确<span style="font-family: none;">&nbsp;</span>认</a>
					<a style="background: url('./r/images/gray-btn.png') center center no-repeat;" class="confirm-btn" v-if="!isCheck">确<span style="font-family: none;">&nbsp;</span>认</a>
					<div class="success-panel">
						<p class="title1">温馨提示：</p>
						<p>1、本奖品需开通炫铃功能才能成功领取，全国4G用户和广东、上海、吉林、甘肃的2G/3G用户可免费开通，其余省的2G/3G未开通炫铃功能的用户确认领取后自动开通炫铃功能（5元/月）。</p>
						<p>2、铃音盒领取成功后，使用有效期可到沃音乐官网的“个人中心”查看。</p>
						

					</div>

					<img class="close-img" :src="'r/images/close.png'" @click="buytoneShow = false">
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../modal/Modal.vue'
	import api from './../utils/serverapi.js'
	export default{
        components: {
            modal
        },
        data(){
            return {
                tip: "1",
                tip1: "5",
                nohasclick: false,
                interfacepos:0,//当前尝试接口次数
				interfacecount:3,//总共尝试接口次数
				lingItem:{
					count:'',
					gid:'',
					imgurl:'',
					pid:'',
					pname:'',
					sid:'',
				},
				isCheck:true,
            }
        },
        props: {
            buytoneShow: {
                type: Boolean,
                default: false
            },
            tipdef: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            buytoneShow(value) {
                if(value){
                    this.lingItem = JSON.parse(sessionStorage.getItem('lingitem'));
                    console.log(this.lingItem);
                   
                }
            },
          
        },
        ready(){
        	this.item = sessionStorage.getItem('lingitem');
            var rom = Math.round(Math.random());
            console.log('随机数：', rom)
        },
        methods: {
        	addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
			
            buyToneNow(){
            	var that = this;
            	that.addOperLog('button','a-buySure');
				if(!that.nohasclick){
					that.$dispatch('loading', {
						name: 'findUserBasInfo',
						icon: true,
						text: '请稍候...',
						show: true,
						duration: 30 * 1000
					});
					that.nohasclick = true;
					api.findUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
						that.$dispatch('cancelloading', 'findUserBasInfo');
						if(back.resCode=='0'){
							//订购炫铃能力
							that.qryUserBasInfo();
						}else if(back.resCode=='10001'){
							//购买铃音盒
							that.buyToneH();
						}else{
							that.$dispatch('handle_server_error', back);
						}
					})
				}
            },
            qryUserBasInfo(){
				var that = this;
				//开通炫铃功能
				that.$dispatch('loading', {
					name: 'qryUserBasInfo',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				that.interfacepos++;
				api.qryUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
					that.$dispatch('cancelloading', 'qryUserBasInfo');
					if(back.resCode=='0' || back.resCode=='30001'){
						that.interfacepos = 0;
						that.buyToneH();
					}else{
						if(that.interfacepos<that.interfacecount){
							setTimeout(that.qryUserBasInfo,1000);
						}else{
							// that.$dispatch('handle_server_error', back);
							sessionStorage.setItem('failResMsg',back.resMsg);
							that.$root.vipfail = true;
							that.buytoneShow = false;
							that.nohasclick = false;
						}
					}

				})
			},
			//购买铃音盒
			 buyToneH(){
                var that = this;
                that.$dispatch('loading', {
                    name: 'buyTone',
                    icon: true,
                    text: '请稍候...',
                    show: true,
                    duration: 30 * 1000
                });
                var body={
                    accessToken: that.$root.accesstoken,
                    toneID: that.lingItem.sid,
                    mobile: localStorage.getItem('LoginMobile'),
                    aid: aid,
                    toneType:2,
                };
                that.interfacepos++;
                api.buyTone(that,body,(back) =>{
                    that.$dispatch('cancelloading', 'buyTone');
                    if(back.resCode=='0'){
                        that.$root.buytoneSuccess = true;
                        that.buytoneShow = false;
                    } else {
                        if(that.interfacepos<that.interfacecount){
                            setTimeout(that.buyToneH,1000);
                        }else{
                            sessionStorage.setItem('failResMsg',back.resMsg);
                            that.buytoneShow = false;
                            that.$root.vipfail = true;
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="sass">
	.components-buytone{
		width: 100%;
		
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			.con{
				width: 100%;
			    padding: 20px;
	    		border: 1px solid #fff;
			}
			.title{
				font-size: 42px;
				line-height: 60px;
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
			    line-height: 30px;
			    font-size: 28px;
			    display: inline-block;
			    width: 100%;
			    vertical-align: middle;
			    text-align: left;

			}
			.tone-con{
				width: 60%;
				margin-left: 20%;
				font-weight: bold;
				.left,.right{
				    width: 47%;
				    display: inline-block;
				    vertical-align: middle;
				}	
			}
			.agree{
				padding-bottom: 10px;
				input{
					width: 30px;
					height: 30px;
					vertical-align: middle;
				}
				p{
					vertical-align: middle;
					display: inline-block;

				}
			}
			
			
		}
	}
	
</style>