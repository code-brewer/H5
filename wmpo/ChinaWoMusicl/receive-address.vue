<template>

	<modal :show.sync="showAddress" :bg="false">
		<div class="components-receive-address">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px;border: 8px solid #f7af49;">
				<p class="title">收货信息</p>
				<ul>
					<li class="input-item">
						<span class="input-name">姓&nbsp;&nbsp;名</span>:<input class="input-text" type="text" style="" v-model="prizeData.username" @blur="checkInput('name')" placeholder="请填写收件人姓名" />
					</li>
					<li class="input-item">
						<span class="input-name">手机号码</span>:<input class="input-text" type="text" style="" v-model="prizeData.mobile" @blur="checkInput('mobile')" placeholder="请填写收件人手机号码" />
					</li>
					<li class="input-item">
						<span class="input-name">收货地址</span>:<input class="input-text" type="text" style="" v-model="prizeData.addr" @blur="checkInput('addr')" placeholder="请填写收件人收货地址" />
					</li>
					<!--<li class="input-item" v-if="sid != ''">-->
						<!--<span class="input-name">购票订单号</span>:<input class="input-text" type="text" style="" v-model="prizeData.cusid" @blur="checkInput('cusid')" placeholder="请填写购票订单号" />-->
					<!--</li>-->
					<li class="input-item">
						<span class="input-name">购票订单号</span>:<input class="input-text" type="text" style="" v-model="prizeData.cusid" @blur="checkInput('cusid')" placeholder="请填写购票订单号" />
					</li>
				</ul>
				<p v-show="errMsg != ''" style="color: red; width: 100%; text-align: center;">{{errMsg}}</p>
				<div class="textG">
					<p>注：在沃音乐移动端-票务窗口购买演出门票总价达到<span>{{pname}}</span></p>
				</div>
				<a class="confirm-btn" style="background: url('./l/images/btn-bg.png') center center no-repeat;" @click="buyPicket()">我要购票</a>
				<a class="confirm-btn" style="background: url('./l/images/btn-bg.png') center center no-repeat;" @click="getPrize()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'l/images/sp-close.png'" @click="showAddress = false">
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
					cusid: "",//购票单号
					addr: "" //收货地址
				},
                pname:'',
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
                    this.pname = sessionStorage.getItem('pname')? sessionStorage.getItem('pname') : '';
				}
				
			},
			
		},
		ready(){
            this.pname = sessionStorage.getItem('pname')? sessionStorage.getItem('pname') : '';
		},
		methods: {
            buyPicket(){
                window.location.href="http://10155.com/damai/index.jsp";
			},

			checkInput(_name) {
				if("name" == _name && this.prizeData.username == "") {
					this.errMsg = '请输入姓名';
					return;
				}

				if("mobile" == _name && !(/^1\d{10}$/.test(this.prizeData.mobile))) {
					this.errMsg = '请输入正确的手机号码';
					return;
				}
//				if("addr" == _name && this.prizeData.addr == ""){
//					this.errMsg = '请输入收货地址';
//					return;
//				}
//				 if("cusid" == _name && this.prizeData.cusid == "" && this.sid !='') {
//				 	this.errMsg = '请输入购票单号';
//				 	return;
//				 }

				this.errMsg = '';
			},
			myAddr(){
				api.myAddr(this, {}, (back) => {
					console.log(back);
					this.prizeData = back.repBody[0];
				});
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

//				if(this.prizeData.addr == ""){
//					this.errMsg = '请输入收货地址';
//					return;
//				}
//
//                if(this.prizeData.cusid == "" && this.sid !='') {
//                    this.errMsg = '请输入购票订单号';
//                    return;
//                }
				
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
		.right{
			position: absolute;
			right: -5%;
			top: 77%;
			z-index: 100;
		}
		.left{
			position: absolute;
			left: -2%;
			top: 88%;
			z-index: 100;
		}
		.box {
			// width: 568px;
			// height: 511px;
			position: relative;
			width: 568px;
			height: 800px;
			padding: 40px;
			margin: 0 auto;
			text-align: center;
			box-sizing: border-box;
			color:#f7af49;
			.title {
				font-size: 50px;
				line-height: 60px;
				margin-bottom: 20px;
				color: #f7af49;
				font-weight: 600;
			}
			.textG{
				border-top: 5px solid #f7af49;
				color: #a72531;
				text-align: left;
				margin-top: 45px;
				margin-bottom: 50px;
				padding: 10px 0;
			}
			.input-item {
				margin-top: 30px;
				font-size: 24px;
				.input-name {
					display: inline-block;
					vertical-align: middle;
					width: 130px;
					text-align: right;
					color: #f7af49;
				}
				.input-text {
					display: inline-block;
					width: 328px;
					height: 55px;
					padding-left: 10px;
					font-size: 24px;
					border: none;
					vertical-align: middle;
					outline: none;
					border-radius: 40px;
					border: 2px solid #f7af49;
				}
			}
			.confirm-btn {
				position: relative;
				z-index: 1000;
				display: block;
				width: 220px;
				height: 87px;
				float: left;
				/* margin: 50px auto 0 auto; */
				line-height: 83px;
				margin-left: 2%;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background: #489eff;
				border-radius: 36px;
				font-weight: 600;
			}
			.close-img {
				position: absolute;
				right: -20px;
				top: -20px;
				max-width: 60px;
				max-height: 60px;
			}
		}
	}
</style>