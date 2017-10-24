<template>
	<div class="goods-detail2 main">
		<section class="section2">
			<!-- <h2>礼品详情</h2> -->
			<div class="con">{{{good.description}}}</div>
		</section>
		<div class="btn">
			<a :class="{active: active}" @click="isAttetion">马上兑换</a>
		</div>
		<snackbar :show-snack-bar.sync="showSnackBar" :text="text"></snackbar>
	</div>
</template>
<style lang="scss" scoped>
	.goods-detail2 {
		h2 {
			font-size: 30px;
			line-height: 60px;
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
		.con {
			padding: 20px;
			font-size: 24px;
			line-height: 28px;
		}
	}
</style>
<script>
	import snackbar from '../components/snackbar.vue'
	import api from '../api/index1.js'

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
				gifttype: {
					'#1#2#101#102#': 'invented1',
					'#106#': 'entity'
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

			//this.good = this.goods[this.$route.params.gid];
		},
		ready() {
			this.getGiftDetail();
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
					this.$router.go({path: '/Welfaretex/'+this.good.gifttype+'/'+this.$route.params.gid});
				} else {
					if (this.type == 'level') {
						this.showSnackBar = true;
						this.text = '等级不够';
					} else if (this.type == 'score') {
						this.showSnackBar = true;
						this.text = '贝壳币不足';
					}
				}
			},
			getGiftDetail() {
				api.getGiftDetail(this, {id: this.$route.params.gid}, back => {
					this.$dispatch('cancelLoading');
					if (back.resCode == '0') {
						let bool = false;
						for(let i in this.gifttype){
							if (new RegExp('#'+back.repBody.list[0].gifttype+'#').test(i)) {
								back.repBody.list[0].gifttype = this.gifttype[i];
								bool = true;
							}
						}
						if (!bool) {
							back.repBody.list[0].gifttype = 'invented2';
						}
						this.good = back.repBody.list[0];
					}
				})
			}
		}
	}
</script>