<template>
	<modal :show.sync="buytoneShow" :bg="false">
		<div class="components-buytone">
			<div class="box text-center" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
				<img :src="$root.activityBasePath+'/images/light.png'" style="position: absolute; left: -50px;">
					<p class="title">是否确认订购</p>
					<div class="tone-con">
						<div class="left">
							<img :src="$root.activityBasePath+lingItem.imgurl">
						</div>
						<div class="right">
							<p class="text">{{lingItem.pname}}</p>
							<!-- <p>（0元）</p> -->
						</div>

					</div>
					<img :src="'o/images/agree.png'" />
				<a style="background: url('./o/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="buyToneNow()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<div class="success-panel">
					<p class="title1">温馨提示：</p>
					<p>1、订购成功后，炫铃使用有效期可到沃音乐官网“个人中心”查看。</p>
					<p>2、4G用户免费开通，除广东、上海、吉林、甘肃以外的2/3G非炫铃功能用户，订购炫铃后将默认开通此功能，资费5元/月。</p>
					

				</div>

				<img class="close-img" :src="'o/images/close.png'" @click="buytoneShow = false">
				<img class="bottom" :src="'o/images/wen-bottom1.png'" />
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
				}
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
                    mobile: sessionStorage.getItem('LoginMobile'),
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
			padding: 20px 20px 87px 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			
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
			
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>