<template>
	<div class="teams-index teams main">
		<personal></personal>
		<div class="select-gift">
			<h2>别急，先选好团</h2>
			<div class="clearfix">
				<div v-for="value in ['10', '20']">
					<p>{{value}}人团</p>
					<span>组团成功奖励<span style="color: #f80; font-size: 26px; font-weight: 700;">{{value == '10' ? '1000' : '3000'}}</span>贝壳币</span>
					<img :src="'images/teams-gift'+($index+1)+'.png?v2'" style="padding: 30px 0;" v-link="{path: '/Welfarechou/shop'}">
					<input type="radio" :id="'teams-'+value" name="radio" :checked="$index == 0 ? checked : !checked" :value="value" v-model="count">
					<label :for="'teams-'+value" v-show="!isStatus[$index]"></label>
					<p class="end" v-show="isStatus[$index]">已结束</p>
				</div>
			</div>
		</div>
		<btn @click="addActInfo" style="margin-top: 40px;">马上开团</btn>
		<ul>
			<li>如你发起新的组团，请分享新的组团链接给你的好友哦。</li>
			<li>选定组团人数就不能更改哦。</li>
			<li>本次活动奖品为虚拟礼品贝壳币，所得贝壳币可在<a v-link="{path: '/Welfarechou/shop'}" style="font-size: 22px; color: #f80; text-decoration: underline">贝壳币商城</a>兑换相应礼品。</li>
			<li>每位用户每天成团3次后，当天不可再组团。</li>
		</ul>
		<div style="position: relative; text-align: center;">
			<span class="rule" v-link="{path: '/teamsRule'}">活动详情<i></i></span>
			<a v-link="{path: '/teamsRecord'}" class="openRecord">开团纪录</a>
		</div>
		<snackbar :show-snack-bar.sync="show" :text="text"></snackbar>
	</div>
</template>
<script>
	import api from '../api'
	import btn from '../components/btn.vue'
	import personal from '../components/teams/personal.vue'
	import dateUtil from '../utils/DateUtils.js'
	import snackbar from '../components/snackbar.vue'

	export default {
		components: {
			btn,
			personal,
			snackbar
		},
		data() {
			return {
				checked: true,
				count: '',
				isStatus: [false, false],
				show: false,
				text: ''
			}
		},
		created() {
			document.title = '组团活动';
			this.isStatus[0] = !!(+this.$route.params.status1);
			this.isStatus[1] = !!(+this.$route.params.status2);
			this.isStatus[0] && (this.checked = false);
		},
		methods: {
			addActInfo() {
				this.$dispatch('loading');
				api.addActInfo(this, {amid: this.count}, (back) => {
					this.$dispatch('cancelLoading');
					if (back.resCode == '0') {
						window.localStorage.setItem('teamsError', '0');
						window.localStorage.setItem('oneOpen', '0');
						window.localStorage.setItem('actid', back.resMsg);
						window.localStorage.setItem('actMes', '');
						this.$router.replace({path: '/teamsPerson'});
					} else if (back.resCode == '4001' || back.resCode == '4002') {
						this.show = true;
						this.text = back.resMsg;
					}
				})
			}
		}
	}
</script>
<style scoped>
	.openRecord {
		position: absolute;
		right: 0;
		bottom: 30px;
		width: 100px;
		height: 30px;
		padding-top: 65px;
		font-size: 22px;
		color: #348790;
		background: url(../images/openTeams-img1.png) top center no-repeat;
	}
	.openRecord i {
		position: absolute;
		top: -5px;
		right: 8px;
		width: 25px;
		height: 25px;
		font-size: 20px;
		border-radius: 50%;
		color: white; 
		text-align: center;
		line-height: 25px;
		background: red;
	}
</style>
<style lang="scss">
	.teams-index {
		padding: 30px 5%;
		text-align: center;
		color: #3da5af;
		.select-gift {
			border-radius: 15px;
			-webkit-box-shadow: 0 10px 30px rgba(61,165,175,.4);
			-moz-box-shadow: 0 10px 30px rgba(61,165,175,.4);
			box-shadow: 0 10px 30px rgba(61,165,175,.4);
			h2 {
				padding: 20px 0;
				font-size: 30px;
				color: white;
				font-weight: 400;
				border-radius: 15px 15px 0 0;
				background: #43a4ae;
			}
			> div {
				padding: 20px 0;
				border-radius: 0 0 15px 15px;
				background: white url(../images/fenge.png) 60% 70% no-repeat;
				> div {
					float: left;
					width: 50%;
					p {
						font-size: 30px;
						padding-bottom: 10px;
					}
					span {
						font-size: 22px;
					}
					label {
						position: relative;
						display: block;
						width: 40px;
						height: 40px;
						margin: 0 auto;
						border-radius: 50%;
						background: #d8edef;
					}
					input {
						display: none;
					}
					input:checked + label {
						&:after {
							content: '';
							position: absolute;
							top: 50%;
							left: 50%;
							width: 15px;
							height: 15px;
							margin: -7.5px 0 0 -7.5px;
							border-radius: 50%;
							background: #6cbac2;
						}
					}
					.end {
						font-size: 24px;
					}
				}
			}
		}
		ul {
			padding: 40px 0 20px 50px;
			text-align: left;
			li {
				padding: 4px 0;
				font-size: 22px;
				line-height: 1.5;
				list-style: initial;
			}
		}
		.common-btn {
			display: block;
			margin: 0 auto;
		}
	}
	.teams {
		.rule {
			display: inline-block;
			padding: 30px 0;
			font-size: 36px;
			color: #348790;
			i {
				display: block;
				height: 5px;
				margin-top: 5px;
				border: solid #348790;
				border-width: 1px 0;
			}
		}
		.con {
			h2 {
				padding: 20px 0;
				font-size: 30px;
				color: #c5eae9;
				font-weight: 400;
				border-radius: 15px 15px 0 0;
				background: #43a4ae;
			}
			.my-teams {
	            background: url(../images/conch-coin-bg2.jpg) top center no-repeat;
	            p {
	                padding: 20px 0;
	                font-size: 30px;
	            }
	            ul {
	                padding: 10px 35px 20px 35px;
	                li {
	                	float: left;
	                    width: 80px;
	                    height: 80px;
	                    margin: 10px;
	                    -webkit-box-sizing: border-box;
	                    -moz-box-sizing: border-box;
	                    box-sizing: border-box;
	                	img {
	                		display: block;
	                		width: 100%;
	                		height: 100%;
		                    border-radius: 50%;
	                	}
	                }
	                .li {
	                	border-radius: 50%;
						border: 2px solid #3da5af;
	                }
	            }
	        }
		}
	}
</style>