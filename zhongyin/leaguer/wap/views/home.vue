<template>
	<div class="home-container">
		<img src="../images/home_bg.jpg" alt="">
		<a href="javascript:;" class="btn btn-rule" @click="showModal('rule')">活动规则</a>
		<a href="javascript:;" class="btn btn-award" @click="myPrize">我的奖品</a>
		<a href="javascript:;" id="btn-lingqu" @click="getMember">立即领取</a>
		<a href="javascript:;" id="btn-chouj" @click="lottery">点击抽奖</a>
		<easier-modal :show.sync="showmodal">
			<component :is="currentmodal"></component>
		</easier-modal>
	</div>
</template>
<script>
	import api from '../api/index.js'
	import Vue from 'vue'
	import easierModal from '../components/Modal/easier-modal.vue'
	import myaward from './home/myaward.vue'
	import login from './home/login.vue'
	import rule from './home/rule.vue'
	import lottery from './home/lottery.vue'
	import address from './home/address.vue'
	import buyservice from './home/buyservice.vue'

	export default {
		components: {
			easierModal,
			rule,
			myaward,
			login,
			lottery,
			address,
			buyservice
		},
		data() {
			var memberinfo = window.memberinfo
			return {
				memberinfo,
				showmodal: false,
				currentmodal: '',
				award: ''
			}
		},
		ready() {
			this.$on('showmodal', function(type) {
				this.currentmodal = type
			})
			
			// 添加访问日志
			if(window.memberinfo.aid) {
				api.addAcceptLog(this, {type: 'signin', source: 'home'}, (back)=>{})
				submitStatInfo(base_url, base_url, 'bottom_home_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
			}
			
		},
		methods: {
			showModal(c) {
				this.showmodal = true
				this.currentmodal = c
			},
			close() {
				this.showmodal = false
			},
			myPrize() {
				if(this.memberinfo.logined) {
					this.showModal('myaward')
				}else{
					this.showModal('login')
				}
			},
			lottery() {
				if(this.memberinfo.logined) {
					this.showModal('lottery')
				}else{
					this.showModal('login')
				}
			},
			getMember() {
				if(this.memberinfo.logined) {
					// 立即领取
					api.addAcceptLog(this, {type: 'button', button_name: 'lingqu'}, (back)=>{})
					submitStatInfo(base_url, base_url, 'linqu_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
					
					switch(this.memberinfo.membType) {
						case "1": // new
							this.showModal('buyservice')
							break
						default: 
							this.showModal('login')
					}
				}else{
					this.showModal('login')
				}
			}
		},
		watch: {
			"currentmodal" (v) {
				console.log(v)
			}
		}
	}
</script>
<style lang="scss">
	@import "../css/px2rem.scss";
	@import "../css/style.scss";

	.home-container {
		background-size: 100% auto;

		.btn {
			position: absolute;
			top: px2rem(248px);
			width: px2rem(300px);
			height: px2rem(92px);
			background: url(../images/btn_bg.png) no-repeat top left;
			background-size: contain;
			text-align: center;
			color: #a4400f;
			font-size: px2rem(38px);
			line-height: 1.5;

			&.btn-rule {
				left: px2rem(24px);
			}

			&.btn-award {
				right: px2rem(24px);
			}
		}
	}

	#btn-lingqu {
		position: absolute;
		top: px2rem(740px);
		left: px2rem(400px);
		width: px2rem(305px);
		height: px2rem(154px);
		background: url(../images/btn_lj.png) no-repeat center;
		background-size: contain;
		text-indent: -9999em;
	}

	#btn-chouj {
		position: absolute;
		top: px2rem(1590px);
		left: px2rem(400px);
		width: px2rem(305px);
		height: px2rem(154px);
		background: url(../images/btn_cj.png) no-repeat center;
		background-size: contain;
		text-indent: -9999em;
	}
	.modal {
		padding: 20px;
		text-align: center;

		.btn-qulj {
			margin-top: 10px;
			margin-bottom: 20px;
		}

		h2 {
			font-size: px2rem(56px);
		}
	}
</style>