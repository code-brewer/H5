<template>
	
	<modal :show.sync="showAddress" :bg="false">
		<div class="components-receive-address">
			<div class="box" style="background: #111902;border: 5px solid #98cf2f;">
				<p class="title">收货信息</p>
				<ul>
					<li class="input-item">
						<span class="input-name">姓名</span>:<input class="input-text" type="text" style="" v-model="prizeData.username" @blur="checkInput('name')" placeholder="必填"/>
					</li>
					<li class="input-item">
						<span class="input-name">手机号码</span>:<input class="input-text" type="text" style="" v-model="prizeData.mobile" @blur="checkInput('mobile')" placeholder="必填"/>
					</li>
					<li class="input-item">
						<span class="input-name">身份证号</span>:<input class="input-text" type="text" style="" v-model="prizeData.cusid" @blur="checkInput('cusid')" placeholder="必填"/>
					</li>
					<li class="input-item">
						<span class="input-name">收货地址</span>:<input class="input-text" type="text" style="" v-model="prizeData.addr" @blur="checkInput('addr')"placeholder="领话费、购物卡不需要填"/>
					</li>
				</ul>
				<p v-show="errMsg != ''" style="color: red; width: 100%; text-align: center;">{{errMsg}}</p>
				<a class="confirm-btn" style="" @click="getPrize()">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				<img class="close-img" :src="'f/images/sp-close.png'" @click="showAddress = false">
			</div>
		</div>
	</modal>

</template>

<script>
	import modal from './../../src/components/Modal.vue'
	import api from './utils/serverapi.js'

	export default{
		components: {
			modal
		},

		props: {
			showAddress: {
				type: Boolean,
				default: false
			},

			gid: String
		},

		data(){
			return {
				errMsg: '',
				prizeData: {
					gid: "",  //奖品id,必填--此值需要由调用组件传来
					mobile: "",   //收货手机号码,必填
					username: "",   //收货人姓名
					cusid:"",
					addr: ""   //收货地址
				}
			}
		},

		watch: {
			gid(val){
				this.prizeData.gid = val;
			}
		},

		methods: {

			checkInput(_name){
				if("name" == _name && this.prizeData.username == ""){
					this.errMsg = '请输入姓名';
					return;
				}

				if("mobile" == _name && !(/^1\d{10}$/.test(this.prizeData.mobile))){
					this.errMsg = '请输入正确的手机号码';
					return;
				}

				if("cusid" == _name && this.prizeData.cusid == ""){
					this.errMsg = '请输入身份证号';
					return;
				}

				// if("addr" == _name && this.prizeData.addr == ""){
				// 	this.errMsg = '请输入收货地址';
				// 	return;
				// }

				this.errMsg = '';
			},

			//绑定奖品
			getPrize() {
				var that = this;

				if(this.prizeData.gid == ""){
					this.errMsg = '请按正常程序来';
					return;
				}

				if(this.prizeData.username == ""){
					this.errMsg = '请输入姓名';
					return;
				}

				if(!(/^1\d{10}$/.test(this.prizeData.mobile))){
					this.errMsg = '请输入正确的手机号码';
					return;
				}

				if(this.prizeData.cusid == ""){
					this.errMsg = '请输入身份证号';
					return;
				}

				// if(this.prizeData.addr == ""){
				// 	this.errMsg = '请输入收货地址';
				// 	return;
				// }

				api.bindPrizeMobile(this, this.prizeData, (back)=>{
					if(back.resCode == "0"){
						that.showAddress = false;
						that.$root.success = true;
					}else{
						that.$dispatch('handle_server_error', back);
					}
				})
			}
		}
	}
</script>

<style lang="sass">
	.components-receive-address{
		width: 100%;

		.box{
			// width: 568px;
			// height: 511px;
			position:relative;
			width: 568px;
			height: 591px;
			padding: 40px;
			margin: 0 auto;
			text-align: center;
			box-sizing: border-box;

			.title{
				font-size: 36px;
				line-height: 46px;
				margin-bottom: 20px;
				color: #fff;
			}
			
			.input-item{
				margin-top: 10px;
				font-size: 24px;

				.input-name{
					display: inline-block;
					vertical-align: middle;
					width: 110px;
					text-align: right;
					color: #fff;
				}

				.input-text{
					display: inline-block;
					width: 328px;
					height: 68px;
					padding-left: 10px;
					font-size: 24px;
					border: none;
					vertical-align: middle;
				    outline: none;
				}
			}

			.confirm-btn{
				display: block;
				width: 220px;
				height: 76px;
				margin: 50px auto 0 auto;
				line-height: 74px;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background: #98cf2f;
				border-radius: 36px;
			}

			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 60px;
				max-height: 60px;
			}
		}
	}
</style>