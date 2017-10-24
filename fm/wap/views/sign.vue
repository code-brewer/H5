<template>
	<div class="top">
			<!-- <a href="javascript:;" class="top-back" >&lt 返回首页</a> -->
			<a href="javascript:;" class="top-right" @click="share"></a>
	</div>
	<div class="sign">
		
		<p class="text">本月已累计签到<span class="orange">{{dayNum.cumulative_cn}}</span>天 最高连续签到<span class="orange">{{dayNum.max_cnt}}</span>天</p>
		<button v-if="isSign" @click="getSignDetail('get')">抽好礼</button>
		<button :bg="'orange-bg'" v-else @click="sign">立即签到</button>
		<div class="dateCon">
			<h2>{{currMonthName}}</h2>
			<ul class="clearfix">
				<li v-for="item in weekdays" :style="{color: item === 'sun' ? '#681919': ''}">{{item}}</li>
			</ul>
			<ul class="date clearfix">
				<li v-for="item in days" :class="item.cls" :style="{color: !($index%7) ? '#bf2e47': ''}">
					<span class="icon"></span>
					<span class="day">{{item.date}}</span>
					<span class="dayNum" v-if="!!item.dayNum">{{!!item.dayNum ? '连续'+item.dayNum+'天' : ''}}</span>
				</li>
			</ul>
		</div>
		<rule :text='text' :ruledetail='ruledetail'></rule>
		<a href="javascript:;" class="gift"  @click="myprize"><img src="../images/gift-icon.png"></a>
		<!-- 签到成功 -->
		<sign-tip :show.sync="signTipShow" :options="dayNum"></sign-tip>
		<is-sign-out :show.sync="isSignOut" :isopen="open"></is-sign-out>
	</div>
</template>
<script>
	import button from '../components/button.vue'
	import rule from '../components/rule.vue'
	import signTip from '../components/sign/signTip.vue'
	import isSignOut from '../components/noLogin.vue'
	import DateUtils from '../utils/DateUtils.js'
	import api from '../api/index.js'
	// import Model from '../components/Model.vue'
	export default {
		components: {
			button,
			rule,
			signTip,
			isSignOut,
			// Model
		},
		data() {
			return {
				weekdays: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
				signTipShow: false,
				isSignOut: false,
				currDate: new Date().getTime(),
				list: [],
				isSign: false, //是否已签到
				dayNum: {
					cnt: '',
					cumulative_cn: '',
					max_cnt: ''
				},
				text:'活动规则',
				open:true,
				delStatus: {
	                msg: "",
	                showMsg: false,
	                errorShow: true
	            },
	            activityAllData:[],
	            ruledetail: '',
	            luckday:[]
			}
		},
		created() {
			this.luckday = localStorage.getItem('prize_day')
			this.luckday = this.luckday.split(',')
			this.selectActivity();
			this.gettime();
			this.getSignLogs();
			this.getSignDetail();
			this.$dispatch('ChannelLog',{'type':'signin','usid':'1',source:'sign'})
		},
		computed: {
			currMonthName() {
	            const d = new Date(this.currDate);
	            // console.log(d)
	            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
	        },
			days() {
				const d = new Date(this.currDate);
	            let days = [];
	            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	            let daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth());
	            let isSign = false;
	            let cnt_date = ''; //保持连续的日期
	            let cnt = 1; //连续天数
	            let cnt_arr = []; //已记录连续签到天数
	            // console.log(d)
	            for (let i = 0; i < daysInMonth; i++) {
	                days.push({
	                    date: dObj.getDate(),
	                    timestamp: dObj.getTime(),
	                    cls: '',
	                    dayNum: '',
	                    cls: d.getDate() > dObj.getDate() ? ['isMiss'] : []
		            });
	                for (let j = 0; j < this.list.length; j++) {
	                	if(this.list[j]) {
	                		if( DateUtils.formatDate(new Date(days[i].timestamp), 'yyyy-MM-dd') == this.list[j].cdate ) {
	                			days[i].cls = ['isSelected'];
	                			/* 日历标记连续签到天数 */
	                			if (cnt_date) {
	                				// console.log(cnt_date)
	                				// console.log(days[i].date)
	                				if (days[i].date - cnt_date === 1) {
	                					cnt++;
		                				this.luckday.forEach((value)=>{
	                						if(cnt == value && cnt_arr.indexOf(cnt) === -1){
		                						days[i].dayNum = cnt;
		                						cnt_arr.push(cnt);
	                						}
	                					})
	                				} else {
	                					cnt_date = '';
	                					cnt = 1;
	                				}
	                			}
	                			cnt_date = days[i].date;
	                		}
	                		if (DateUtils.formatDate(d, 'yyyy-MM-dd') == this.list[j].cdate) {
	                			isSign = true;
	                		}
	                	}
	                }
	                window.localStorage.setItem('cnt_arr', cnt_arr.join(','));
	              	dObj.setDate(dObj.getDate() + 1);
	            }
	            this.blankDays(days);
	            let len = 35 - days.length;
	            for (let i = 0; i < len; i++) {
	            	days.push({
	            		cls: ['none'],
	            		date: ''
	            	});
	            }
	            this.isSign = isSign;
	            return days;
			}
		},
		methods: {
			/**
			 * 签到
			 */
			sign() {
				this.$dispatch('ChannelLog',{"type":"button","button_name":"sign","usid":"1"})
				api.sign(this, {usid: 1}, back => {
					if (back.resCode === '0') {
						if(back.repBody.code =='20002'){
							if(window.wofans){
								this.isSignOut = true;
								this.open = true;
							}else{
								this.isSignOut = true;
								this.open = false;
							}
							
						}else if (back.repBody.code == '0') {
							this.getSignLogs();
							this.getSignDetail('sign');
						} else {
							this.$dispatch('showTip', back.repBody.msg);
						}
					}
				})
			},
			/**
			 * 获取签到天数
			 */
			getSignDetail(type) {
				api.getSignDetail(this, {usid: 1}, back => {
					if (back.resCode === '0' && back.repBody.length) {
						if(back.repBody.code =='20002'){
							this.isSignOut = true;
							return;
						}
						this.dayNum = back.repBody[0];
						if (type === 'sign' || type === 'get') {
							this.signTipShow = true;
						}
					}
				})
			},
			/**
			 * 获取签到记录
			 */
			getSignLogs() {
				api.getSignLogs(this, {usid: 1}, back => {
					if (back.resCode === '0') {
						if (back.repBody.length) {
							this.list = back.repBody;
						}
					}
				})
			},
			blankDays(obj) {
	            const d = new Date(this.currDate);
	            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	            for (let i = 0; i < dObj.getDay(); i++) {
	            	obj.unshift({
	            		cls: '',
	            		date: ''
	            	})
	            }
	        },
	        myprize(){
	        	 this.$dispatch('ChannelLog',{'type':'button','button_name':'myprize',"usid":"1"})
	        	this.$router.go({path: '/list'})
	        },
	        gettime(){
	        	api.getDate(this, {}, back => {
					if (back.resCode === '0') {
						this.currDate = Date.parse(new Date(back.repBody.msg))
						// console.log(this.currDate)
					}
				})
	        },
	        share(){
	        	this.$dispatch('model')
	        },
	        selectActivity(){
				api.selectActivity(this,{},(back)=>{
					this.activityAllData = back.repBody[0]
					this.ruledetail = this.activityAllData.signrule.split('\n');
					// console.log(this.ruledetail)
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.top{
			width:100%;
			height:64px;
			background:rgba(0,0,0,.6);
			font-size:14px;
			color:#fff;
			line-height:64px;
			position:relative;
			padding-left:10px;
			box-sizing:border-box;
		    // position: fixed;
    		// top: 0px;
    		a{
    			font-size:30px;
				color:#fff;
    		}
	}
	.top-right{
		width:40px;
		height:44px;
		background:url(../images/share.png) no-repeat;
		display:inline-block;
		// float:right;
		position:absolute;
		right:25px;
		top:8px;
	}
	.sign {
		
		padding-top: 370px;
		.dateCon {
			width: 90%;
			margin: 0 auto;
			text-align: center;
			border: 5px solid #967448;
			background: #ffd800;
			box-shadow: inset 0 30px 40px rgba(255, 255, 255, .6),inset -30px 0 40px rgba(248, 169, 0, .6),inset 0 -30px 40px rgba(248, 169, 0, .6),inset 30px 0 40px rgba(255, 255, 255, .6);
			h2 {
				position: relative;
				display: inline-block;
				height: 50px;
				margin: 20px auto;
				padding: 0 30px;
				font-size: 36px;
				line-height: 40px;
				&:before, &:after {
					content: "";
					position: absolute;
					top: 0;
					width: 0;
					height: 0;
					border: 20px solid transparent;
				}
				&:before {
					left: 0;
					border-left-color: #d81e25;
				}
				&:after {
					right: 0;
					border-right-color: #d81e25;
				}
			}
			ul {
				margin: 0 20px;
				li {
					float: left;
					width: 14.2%;
					height: 50px;
					line-height: 50px;
					text-align: center;
					font-size: 28px;
				}
			}
			.date {
				margin-bottom: 40px;
				background: repeating-linear-gradient(-45deg, #ffd800, #ffd800 5px, #9b9365 0, #9b9365 6px, #9b9365 0, #ffd800 11px);
				li {
					position: relative;
					height: 87.33px;
					line-height: 85.33px;
					color: #333;
					border: 1px solid #333;
					box-sizing: border-box;
					&.none {
						.day {
							background: none;
						}
					}
					&.isSelected {
						.icon {
							background: url(../images/sign-selected.png) center bottom no-repeat;
						}
					}
					&.isMiss {
						.icon {
							background: url(../images/sign-miss.png) center center no-repeat;
						}
					}
					.icon, .day {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
					.icon {
						z-index: 2;
					}
					.day {
						background: white;
					}
					.dayNum {
						position: absolute;
						top: 0;
						right: 0;
						height: 20px;
						padding: 5px;
						font-size: 16px;
						line-height: 20px;
						color: #ef1a4a;
						background: #fff100;
					}
				}
			}
		}
		.gift {
			position: absolute;
			// top: 20px;
			top:75px;
			right: 20px;
			width: 88px;
			height: 88px;
		}
	}
	.del-msg {
	    width: 100%;
	    position: absolute;
	    bottom: 0px;
	    left: 0;
	    background-color: #fff;
	    p {
		    // height: 90px;
		    // line-height: 90px;
		    text-align: center;
		    color: #000;
		    border-bottom: 1px solid #eee;
		    font-size:20px;
		}
	    ul li{
	    	width:25%;
	    	float:left;
	    	text-align:center;
	    	padding:30px 0;
	    	box-sizing:border-box;
	    	a{
	    		width:100px;
	    		height:100px;
	    		// background:url(../images/weixin.jpg) no-repeat;
	    		display:inline-block;
			    background-size: contain;
	    	}
	    	span{
	    		display:block;
	    		height:40px;
	    		line-height:40px;

	    	}
	    }
	}

	// .del-msg p {
	//     height: 90px;
	//     line-height: 90px;
	//     text-align: center;
	//     color: #000;
	//     border-bottom: 1px solid #eee;
	//     font-size:20px;
	// }
</style>