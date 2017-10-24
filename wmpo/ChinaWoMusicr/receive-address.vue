<template>

	<modal :show.sync="showAddress" :bg="false">
		<div class="components-receive-address">
			<div class="box" style="background-image: url('./r/images/modal-bg3.png'); background-size: 100% 100%;">
				<p class="title">收货信息</p>
				<ul>
					<li class="input-item">
						<span class="input-name">姓&nbsp;&nbsp;名</span>:<input class="input-text" type="text" style="" v-model="prizeData.username" @blur="checkInput('name')" placeholder="请输入领奖人姓名" />
					</li>
					<li class="input-item">
						<span class="input-name">手机号码</span>:<input class="input-text" type="text" style="" v-model="prizeData.mobile" @blur="checkInput('mobile')" placeholder="请输入领奖人手机号码" />
					</li>
					<li class="input-item">
						<span class="input-name">收货地址</span>:<input class="input-text" type="text" style="" v-model="prizeData.addr" @blur="checkInput('addr')" placeholder="请输入领奖收件地址" />
					</li>
					<!-- <li class="input-item" v-if="sid != ''">
						<span class="input-name">大麦单号</span>:<input class="input-text" type="text" style="" v-model="prizeData.cusid" @blur="checkInput('cusid')" placeholder="请输入大麦单号" />
					</li> -->
				</ul>
				<p v-show="errMsg != ''" style="color: red; width: 100%; text-align: center;">{{errMsg}}</p>
				<a class="confirm-btn" style="background: url('./r/images/btn-bg.png') center center no-repeat;" @click="getPrize()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'r/images/close.png'" @click="showAddress = false">
				
			</div>
		</div>
	</modal>

</template>

<script>
	import modal from './modal/Modal.vue'
	import api from './utils/serverapi.js'

	export default {
		components: {
			modal
		},

		props: {
			showAddress: {
				type: Boolean,
				default: false
			},

			gid: String,
			
		},

		data() {
			return {
				errMsg: '',
				prizeData: {
					gid: "", //奖品id,必填--此值需要由调用组件传来
					mobile: "", //收货手机号码,必填
					username: "", //收货人姓名
					cusid: "",
					addr: "" //收货地址
				},
				sid:null,
				
			}
		},

		watch: {
			gid(val) {
				this.prizeData.gid = val;
				
			},
			showAddress(val) {
				if(val){
					this.sid = sessionStorage.getItem('sid');
					if(!this.sid){
						this.sid = "";
					}
					if(localStorage.getItem('awardmobile') == "true"){
						this.myAddr();
					}
					if(sessionStorage.getItem('luckyId')){
						 this.prizeData.gid = sessionStorage.getItem('luckyId');
					}
					
				}
				
			},
			
		},
		ready(){
			
		},
		methods: {

			checkInput(_name) {
				if("name" == _name && this.prizeData.username == "") {
					this.errMsg = '请输入姓名';
					return;
				}

				if("mobile" == _name && !(/^1\d{10}$/.test(this.prizeData.mobile))) {
					this.errMsg = '请输入正确的手机号码';
					return;
				}
				// if("cusid" == _name && this.prizeData.cusid == "" && this.sid !='') {
				// 	this.errMsg = '请输入大麦单号';
				// 	return;
				// }
				// if("addr" == _name && this.prizeData.addr == ""){
				// 	this.errMsg = '请输入收货地址';
				// 	return;
				// }

				this.errMsg = '';
			},
			myAddr(){
				api.myAddr(this, {}, (back) => {
					console.log(back);
					this.prizeData = back.repBody[0];
				});
			},
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
			//绑定奖品
			getPrize() {
				var that = this;

				if(this.prizeData.gid == "") {
					this.errMsg = '请按正常程序来';
					return;
				}

				if(this.prizeData.username == "") {
					this.errMsg = '请输入姓名';
					return;
				}

				if(!(/^1\d{10}$/.test(this.prizeData.mobile))) {
					this.errMsg = '请输入正确的手机号码';
					return;
				}
				// if(this.prizeData.cusid == "" && this.sid !='') {
				// 	this.errMsg = '请输入大麦单号';
				// 	return;
				// }

				// if(this.prizeData.addr == ""){
				// 	this.errMsg = '请输入收货地址';
				// 	return;
				// }
				that.addOperLog('button','a-addSure');
				if(localStorage.getItem('awardmobile') == 'false' || localStorage.getItem('awardmobile') == false){
					api.bindPrizeMobile(this, this.prizeData, (back) => {
						if(back.resCode == "0") {
							that.showAddress = false;
							var igid = parseInt(this.prizeData.gid);
							// that.$root.tipdef = (igid>=1098&&igid<=2097);
							that.$root.tipdef = (igid<1097||igid>2096);
							localStorage.setItem('awardmobile',true);
							that.$root.success = true;

						} else {
							that.$dispatch('handle_server_error', back);
						}
					})
				}else{
					api.editMyAddr(this, this.prizeData, (back) => {
						if(back.resCode == "0") {
							that.showAddress = false;
							localStorage.setItem('awardmobile',true);
							that.$root.success = true;

						} else {
							that.$dispatch('handle_server_error', back);
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="sass">
	.components-receive-address {
		width: 100%;
		
		.box {
			// width: 568px;
			// height: 511px;
			position: relative;
			// width: 568px;
			// height: 500px;
			padding: 40px;
			margin: 0 auto;
			text-align: center;
			box-sizing: border-box;
			color:#8f1225;
			.title {
				font-size: 50px;
				line-height: 60px;
				margin-bottom: 20px;
				color: #fff;
				font-weight: 600;
				padding-top: 60px;
			}
			ul{
				padding-top: 80px;
			}
			.input-item {
				margin-top: 20px;
				font-size: 24px;
				color: #fff;
				.input-name {
					display: inline-block;
					vertical-align: middle;
					width: 110px;
					text-align: right;
					
				}
				.input-text {
					display: inline-block;
					width: 300px;
					height: 55px;
					padding-left: 10px;
					font-size: 24px;
					border: none;
					vertical-align: middle;
					outline: none;
					background: #fff;
					border-radius: 30px;
					
				}
			}
			
		}
	}
</style>