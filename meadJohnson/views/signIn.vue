<template>
	<div class="signIn main">
		<section class="signTop">
			<p>每日一签，贝壳币越领越多</p>
			<div>
				<img :src="person.head_img" :class="{'head-img': person.isImg}">
			</div>
			<div>
				<div>
					<span>{{person.nick}}</span>
					<span>我的贝壳币：{{person.v_score}}</span>
				</div>
				<a :class="{active: !isSign}" @click="sign">签到领贝壳币</a>
			</div>
		</section>
		<p class="text">坚持就有福利，连续签到<span class="orange">每天增加一个贝壳币</span>哦，到第七天还有重磅彩蛋哦！</p>
		<section class="dateCon">
			<p>{{currYear}}年{{currMonthName}}月</p>
			<div class="week-row">
				<span v-for="val in week">{{val}}</span>
			</div>
			<div class="date-row">
				<span class="date-blank" v-for="blank in blankDays"></span>
				<span v-for="day in days" :class="{active: day.isSelected}">{{day.date}}</span>
			</div>
		</section>
		<div class="guize">
            <div>
            	<a @click="signInRule = true">签到规则></a>
            </div>
        	<div>如有疑问，请在公众号对话框以“客服+你的问题”的格式将你的问题告诉花妈，花妈会争取尽快回复哒！
        	</div>
        </div>
        <sign-in-rule :show.sync="signInRule"></sign-in-rule>
        <notice :show.sync="notice.show" :text="notice.text" :title="notice.title"></notice>
	</div>
</template>
<script>
	import api from '../api/index.js'
	import DateUtils from '../utils/DateUtils.js'
	import utils from '../../src/utils'
	import signInRule from '../components/signInRule.vue'
	import notice from '../components/lotteryDraw/notice.vue'

	export default {
		http: {
	    	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    },
	    components: {
	    	signInRule,
	    	notice
	    },
		data() {
			return {
				week: ['日', '一', '二', '三', '四', '五', '六'],
				currDate: new Date().getTime(),
				list: [],
				isSign: true,
				signInRule: false,
				person: {
					head_img: 'images/conch-coin-img1.png',
					nick: '',
					v_grade: '',
					v_integral: '0',
					v_score: '0'
				},
				notice: {
					show: false,
					text: '',
					title: '温馨提示'
				}
			}
		},
		created() {
			document.title = '签到';
			this.$dispatch('loading')
			api.signList(this, {iorg: '签到'}, (back)=> {
				this.list = back.repBody;

				this.$dispatch('cancelLoading');
			})
			this.getPersonalInfo();

		},
		computed: {
			currMonthName() {
	            const d = new Date(this.currDate);
	            return (d.getMonth()+1);
	        },
	        currYear() {
	            const d = new Date(this.currDate);
	            return d.getFullYear();
	        },
			blankDays() {
	            const d = new Date(this.currDate);
	            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	            return dObj.getDay();
	        },
			days() {
				const d = new Date(this.currDate);
	            let days = [];
	            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	            let daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth());
	            var isSign = false;
	            for (let i = 0; i < daysInMonth; i++) {
	                days.push({
	                    date: dObj.getDate(),
	                    timestamp: dObj.getTime(),
	                    isSelected: false
		                });
	                for (let j = 0; j < this.list.length; j++) {
	                	if(this.list[j]) {
	                		if( utils.formatDate(new Date(days[i].timestamp), 'yyyy-MM-dd') == this.list[j].ctime ) {
	                			days[i].isSelected = true;
	                		}
	                		if (utils.formatDate(d, 'yyyy-MM-dd') == this.list[j].ctime) {
	                			isSign = true;
	                		}
	                	}
	                }

	              	dObj.setDate(dObj.getDate() + 1);
	            }
	            this.isSign = isSign;
	            return days;
			}
		},
		methods: {
			getPersonalInfo() {
				api.getPersonalInfo(this, {}, (data) => {
					if (data.resCode == "0") {
						this.person = data.repBody.list[0];
						this.person['isImg'] = true;
					}
				})
			},
			sign(day) {
	        	if (!this.isSign) {
	        		//this.$dispatch('loading');
	        		this.list.push({ctime: utils.formatDate(new Date(), 'yyyy-MM-dd')});
		        	api.sign(this, {iorg: '签到'}, (back)=> {
		        		if (back.resCode == "0") {
		        			//this.$dispatch('cancelLoading');
		        			if (back.repBody.code == "1") {
		        				this.notice.show = true;
		        				this.notice.title = '温馨提示';
		        				this.notice.text = '矮油！您今天赚的贝壳币都装不下啦（每日上限300贝壳币），明天再来玩呗~';
		        			} else {
		        				this.notice.show = true;
		        				this.notice.title = '签到成功';
		        				this.notice.text = '<div><img src="images/teams-gift2.png"><p style="padding-bottom: 30px; font-size: 30px; color: #43a4ae;">获得'+back.repBody.msg+'贝壳币</p><p style="font-size: 24px; color: #43a4ae;">本月首次成功<a style="color: #f80; text-decoration: underline; font-size: 24px;" href="#!/recommend1">邀请3位好友</a>关注，即可获得1次抽取迪士尼门票大奖的机会哦！</p></div>';
		        			}
		        			this.isSign = true;
		        			this.getPersonalInfo();
		        		}
		        	})
	        	}
	        }
		}
	}
</script>
<style lang="scss">
	.signIn {
		padding: 20px 0 40px;
	    section {
	    	width: 90%;
			margin: 0 auto ;
			border-radius: 15px;
			-webkit-box-shadow: 0 0 30px rgba(61,165,175,.4);
			box-shadow: 0 0 30px rgba(61,165,175,.4);
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
	    }
	    .text {
	    	padding: 40px 5%;
	    	font-size: 26px;
	    	color: #35828a;
	    	text-align: center;
	    	.orange {
	    		color: #fd9a4f;
	    	}
	    }
		.signTop {
			padding: 50px 0;
			font-size: 0;
			text-align: center;
			background: #edf9fb;
			> p {
				padding: 10px 0;
				text-align: center;
				line-height: 1.5;
				font-size: 34px;
				color: #348790;
			}
			> div {
				display: inline-block;
				vertical-align: top;
				&:first-of-type {
					img {
						width: 135px;
						height: 135px;
					}
					.head-img {
						margin-right: 10px;
						border-radius: 50%;
						-webkit-box-shadow: 0 0 60px rgba(61, 165, 175, .4);
	                	box-shadow: 0 0 60px rgba(61, 165, 175, .4);
					}
					p {
						font-size: 30px;
						color: #48a3ac;
					}
				}
				&:last-child {
					padding-top: 20px;
					> div {
						margin-bottom: 30px;
						font-size: 0;
						> span {
							padding-left: 10px;
							font-size: 30px;
							color: #43a4ae;
							text-align: left;
							&:first-child {
								display: block;
								color: #348790;
							}
						}
					}
					a {
						position: relative;
						display: block;
						width: 230px;
						height: 74px;
						line-height: 70px;
						font-size: 26px;
						color: white;
						background: url(../images/sign-in-btn.png) no-repeat;
						&.active {
							background-position: 0 -74px;
						}
					}
				}
			}
		}
		.dateCon {
			padding: 10px 3%;
			color: #43a4ae;
			background: white;
			> p {
				padding: 15px 0;
				color: #35828a;
				font-size: 32px;
				border-bottom: 1px solid #f1f1f1;
				text-align: center;
			}
			.week-row,.date-row {
				font-size: 0;
				> span {
					display: inline-block;
					width: 14.28%;
					padding: 15px 0;
					font-size: 32px;
					text-align: center;
				}
			}
			.date-row {
				> span {
					padding: 50px;
					font-size: 28px;
					&.active {
						background: url(../images/sign-in-icon.png) 80% bottom no-repeat;
					}
				}
			}
		}
	}
</style>