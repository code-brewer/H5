<template>
	<div class="goods-detail main">
		<section class="section1">
			<img :src="'images/'+good.img">
		</section>
		<section class="section2">
			<h2>礼品详情</h2>
			<div class="con">
				<p>产品名称：{{good.name}}</p>
				<p>说明：</p>
				<p class="items" v-for="value in good.rule"><span>{{$index+1}}</span>{{value}}</p>
			</div>
		</section>
		<div class="btn">
			<a :class="{active: active}" @click="isAttetion">马上兑换</a>
		</div>
		<snackbar :show-snack-bar.sync="showSnackBar" :text="text"></snackbar>
	</div>
</template>
<script>
	import snackbar from '../components/snackbar.vue'
	import api from '../api/index.js'

	export default {
		components: {
			snackbar
		},
		data() {
			return {
				showSnackBar: false,
				text: '',
				active: false,
				type: '',
				goods: {
					'5': {
						name: '百度糥米充值券5元',
						img: 'lv1_1.jpg',
						rule: ['该糯米卡限在百度糯米手机客户端使用，使用流程如下：注册登录-进入“我的”-“余额充值卡充值”-输入串码即可充值到百度糯米账户（有效期：1年）；', '在百度糯米手机客户端购买产品提交支付时勾选“余额”，即可抵扣相应金额；', '注意事项：若余额不足以支付订单金额，则不足部分任需继续使用其他支付方式予以支付；若余额金额较多，支付订单后仍有剩余，则剩余部分再次购买时可以继续使用；', '本卡具体使用范围详见糯米客户端余额充值界面或百度糯米网站公示'],
						type: 'invented2'
					},
					'1': {
						name: '京东E卡10元',
						img: 'lv1_2.jpg',
						rule: ['限购买京东自营类产品（除充值类、部分抢购类产品、图书音像类产品等）使用，不可购买第三方买家、出版类及金银投资类商品，具体购买范围以下单时能否选择使用京东E卡支付为准。', '有效期三个月。卡内金额支持找零，有效期内可继续使用。有效期内可叠加，可以与其他优惠同享。', '使用流程：PC端或APP登录京东账户——选择“我的”——“京东E卡”——“添加新卡”——输入串码绑定新卡'],
						type: 'invented2'
					},
					'7': {
						name: '手机流量100M',
						img: 'lv1_3.jpg',
						rule: ['参与者中奖后，系统将在3个工作日之内将流量充值到手机账户，如遇运营商地区维护，充值到账时间相应顺延。', '请输入3大运营商（移动，联通，电信）手机号码进行充值，充值反馈时间有延误或者无短信提醒属于正常，中奖者可通过移动、联通、电信运营商查询到账记录。', '中奖者需要确保手机处于正常的开机状态，如手机号码为智能网号码、企业连号、虚拟运营商号码、空号、停机、关机、欠费、无服务、锁定期、携号转网、黑卡、副号等导致无法成功充值，造成的损失由中奖者自行承担。', '如因与套餐内流量包相斥、用户套餐不能订购该业务、2G/3G融合用户不允许订购、网络异常、速率超限、用户欠费等原因导致流量充值延迟或失败，主办方有权要求中奖者更换手机号另行充值或以同等价值的奖品替代话费充值。', '此流量奖品仅限于中国大陆地区充值，港澳台除外。'],
						type: 'invented1'
					},
					'4': {
						name: '电影票兑换券10元',
						img: 'lv1_4.jpg',
						rule: ['中奖者需登录微信手机客户端，选择“钱包”-“电影票”-“我的”-“优惠码”，将电影票券绑定至个人账户，在微信电影购买电影票支付时选择“选座券”即可抵值。', '影票使用影院范围：全国，影片范围:2D/3D，微信电影票页面售卖价格等于或高于80不支持使用；IMAX厅、VIP厅、明星见面会或首映礼等特殊影厅不支持使用；券码不记名不挂失，不得兑换现金；券码有效期为自领取之日起一个月，逾期自动作废。'],
						type: 'invented2'
					},
					'8': {
						name: '手机话费10元',
						img: 'lv2_1.jpg',
						rule: ['参与者中奖后，系统将在3个工作日之内将话费充值到手机账户，中奖者可自行拨打相应的运营商电话查询充值情况。 如遇运营商地区维护，充值到账时间相应顺延。', '请输入3大运营商（移动，联通，电信）手机号码进行充值，充值反馈时间有延误或者无短信提醒属于正常，中奖者可通过移动、联通、电信运营商查询到账记录。', '中奖者需要确保手机处于正常的开机状态，如手机号码为智能网号码、企业连号、虚拟运营商号码、空号、停机、关机、欠费、无服务、锁定期、携号转网、黑卡、副号等导致无法成功充值，造成的损失由中奖者自行承担。', '如因运营商限制或手机号码自身限制导致话费充值延迟或失败，主办方有权要求中奖者更换手机号另行充值或以同等价值的奖品替代话费充值。5.此话费奖品仅限于中国大陆地区充值，港澳台除外。'],
						type: 'invented1'
					},
					'6': {
						name: '优酷VIP月卡',
						img: 'lv2_2.jpg',
						rule: ['串码：优酷网—会员频道—VIP会员专区—会员卡—输入串码激活黄金会员；                                                       有效期：三个月', '黄金会员可享有免广告、会员大片免费看、演唱会直播、尊贵身份标识等特权，月卡及以上产品激活后每月还可获赠观影券。', '会员卡不可兑换现金。请注意会员卡保密性，若发生盗用、泄露、遗失等问题不予调换与退款。', '此奖品所包含服务内容及具体使用方式以优酷网规定的使用规则为准，使用疑问请前往优酷网咨询。'],
						type: 'invented2'
					},
					'2': {
						name: '京东E卡30元',
						img: 'lv3_1.jpg',
						rule: ['限购买京东自营类产品（除充值类、部分抢购类产品、图书音像类产品等）使用，不可购买第三方买家、出版类及金银投资类商品，具体购买范围以下单时能否选择使用京东E卡支付为准。', '有效期三个月。卡内金额支持找零，有效期内可继续使用。有效期内可叠加，可以与其他优惠同享。', '使用流程：PC端或APP登录京东账户——选择“我的”——“京东E卡”——“添加新卡”——输入串码绑定新卡'],
						type: 'invented2'
					},
					'9': {
						name: '手机话费50元',
						img: 'lv3_2.jpg',
						rule: ['参与者中奖后，系统将在3个工作日之内将话费充值到手机账户，中奖者可自行拨打相应的运营商电话查询充值情况。 如遇运营商地区维护，充值到账时间相应顺延。', '请输入3大运营商（移动，联通，电信）手机号码进行充值，充值反馈时间有延误或者无短信提醒属于正常，中奖者可通过移动、联通、电信运营商查询到账记录。', '中奖者需要确保手机处于正常的开机状态，如手机号码为智能网号码、企业连号、虚拟运营商号码、空号、停机、关机、欠费、无服务、锁定期、携号转网、黑卡、副号等导致无法成功充值，造成的损失由中奖者自行承担。', '如因运营商限制或手机号码自身限制导致话费充值延迟或失败，主办方有权要求中奖者更换手机号另行充值或以同等价值的奖品替代话费充值。5.此话费奖品仅限于中国大陆地区充值，港澳台除外。'],
						type: 'invented1'
					},
					'3': {
						name: '京东E卡100元',
						img: 'lv4_1.jpg',
						rule: ['限购买京东自营类产品（除充值类、部分抢购类产品、图书音像类产品等）使用，不可购买第三方买家、出版类及金银投资类商品，具体购买范围以下单时能否选择使用京东E卡支付为准。', '有效期三个月。卡内金额支持找零，有效期内可继续使用。有效期内可叠加，可以与其他优惠同享。', '使用流程：PC端或APP登录京东账户——选择“我的”——“京东E卡”——“添加新卡”——输入串码绑定新卡'],
						type: 'invented2'
					},
					'10': {
						name: 'B.Toys123捏捏乐儿童启蒙积木早教益智玩具 ',
						img: 'lv4_2.jpg',
						rule: ['10块可挤捏的软积木，每一面都有手刻的图案，一共是60个浮雕画面。和蔼可亲的小动物，还有1-10的数字装饰着每一块积木。', '环保安全：柔软无毒可回收材质，安全可咬可挤压揉捏并发声响，满足婴儿时期的口腔需要，也可做洗澡玩具。', '促进发育：大小及手感非常适合婴儿，有助于训练小肌肉发展，手眼协调。', '数字认知：每个软积木上都有数字与对应的数量，可以帮助小朋友建立量与数及关联性的思考。', '独特设计：多种样式，造型各异，色彩鲜艳，刺激宝宝感官发育及色彩搭配美感。'],
						type: 'entity'
					}
				},
				good: {}
			}
		},
		created() {
			this.$dispatch('loading');
			document.title = '兑换';

			//获取用户等级
			api.getPersonalInfo(this, {}, (data) => {
				if (data.resCode === '0') {
					var list = data.repBody.list[0];
					if (this.$route.params.level > +list.v_grade.replace(/lv/i, '')) {
						this.type = 'level';
					} else if (this.$route.params.ConchCoin > +list.v_score) {
						this.type = 'score';
					} else {
						this.active = true;
					}
				}
			})

			this.good = this.goods[this.$route.params.gid];
		},
		ready() {
			this.$dispatch('cancelLoading');
		},
		methods: {
			isAttetion() {
				api.isAttetion(this, {}, (data) => {
					if (data.repBody) {
						this.scoreExchange();
					} else {
						this.showSnackBar = true;
						this.text = '请先关注';
					}
				})
			},
			scoreExchange() {
				if (this.active) {
					this.$router.go({path: '/Welfaretex/'+this.good.type+'/'+this.$route.params.gid});
					// api.scoreExchange(this, {gid: this.$route.params.gid}, (data) => {
					// 	if (data.resCode == "0") {
					// 		this.$router.go({path: '/Welfaretex/'+this.good.type+'/'+data.resMsg});
					// 	} else {
					// 		switch(data.resMsg) {
					// 			case '等级不够':
					// 			case '贝壳币数不够':
					// 			case '库存不足':
					// 				this.showSnackBar = true;
					// 				this.text = data.resMsg;
					// 				break;
					// 		}
					// 	}
					// })
				} else {
					if (this.type == 'level') {
						this.showSnackBar = true;
						this.text = '等级不够';
					} else if (this.type == 'score') {
						this.showSnackBar = true;
						this.text = '贝壳币不足';
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.goods-detail {
		padding: 30px 5%;
		.section1 {
			margin-bottom: 30px;
			padding: 40px 0;
			text-align: center;
			border-radius: 15px;
			background: #bcf6f9;
			-moz-box-shadow: 0 10px 20px rgba(0,0,0,.2);
			-webkit-box-shadow: 0 10px 20px rgba(0,0,0,.2);
			box-shadow: 0 10px 20px rgba(0,0,0,.2);
			img {
				width: 172px;
				border-radius: 10px;
				-webkit-box-shadow: 5px 5px 20px rgba(0,0,0,.3);
				-moz-box-shadow: 5px 5px 20px rgba(0,0,0,.3);
				box-shadow: 5px 5px 20px rgba(0,0,0,.3);
			}
		}
		.section2 {
			h2 {
				padding: 20px 0;
				border-radius: 15px 15px 0 0;
				color: white;
				font-size: 30px;
				text-align: center;
				font-weight: 400;
				background: #43a4ae;
			}
			.con {
				//height: 500px;
				padding: 20px 50px;
				border-radius: 0 0 15px 15px;
				background: white;
				//overflow-y: auto;
				p {
					position: relative;
					padding: 10px 0 0 0;
					line-height: 1.5;
					color: #43a4ae;
					font-size: 24px;
				}
				.items {
					padding-left: 50px;
					span {
						position: absolute;
						top: 15px;
						left: 0;
						width: 40px;
						height: 40px;
						text-align: center;
						line-height: 40px;
						color: white;
						font-size: 22px;
						border-radius: 50%;
						background: #43a4ae;
					}
				}
			}
		}
		.btn {
			padding-top: 40px;
			a {
				position: relative;
				display: block;
				width: 230px;
				height: 74px;
				margin: 0 auto;
				line-height: 70px;
				font-size: 26px;
				color: white;
				text-align: center;
				background: url(../images/goods-detail-btn.png) no-repeat;
				&.active {
					background-position: 0 -74px;
				}
			}
		}
	}
</style>