<template>
	<div class="signIn main person">
		<section class="section1" style="box-shadow: none; background: none;">
	    	<div class="personImg">
	    		<img :src="person.head_img" alt="">
	    	</div>
	    	<p class="nick">{{person.nick}}</p>
	    </section>
		<section class="dateCon">
			<p><a @click="setMonth('prev')"><</a>{{currYear}}年{{currMonthName}}月<a @click="setMonth('next')">></a></p>
			<div class="week-row">
				<span v-for="val in week">{{val}}</span>
			</div>
			<div class="date-row">
				<span class="date-blank" v-for="blank in blankDays"></span>
				<span v-for="day in days" @click="link(day)">{{day.date}}<i v-show="day.count!=''">{{day.count}}</i></span>
			</div>
		</section>
		<modal :show.sync="show" :bg="false">
			<div class="alert">
				<h2></h2>
				<p>该天没有开团纪录！</p>
				<a href="javascript:;" class="close" @click="show = false"></a>
			</div>
		</modal>
	</div>
</template>
<script>
	import api from '../api/index1.js'
	import DateUtils from '../utils/DateUtils.js'
	import utils from '../../src/utils'
	import Modal from '../components/Modal.vue'

	export default {
		components: {
			Modal
		},
		data() {
			return {
				week: ['日', '一', '二', '三', '四', '五', '六'],
				currDate: new Date().getTime(),
				list: [],
				isSign: true,
				person: {
					head_img: 'images/conch-coin-img1.png',
					nick: '',
					v_grade: '',
					v_integral: '0',
					v_score: '0'
				},
				show: false
			}
		},
		created() {
			this.$dispatch('loading')
			// api.signList(this, {iorg: '签到'}, (back)=> {
			// 	this.list = back.repBody;

			// 	this.$dispatch('cancelLoading');
			// })
			this.getPersonalInfo();
			let d = new Date(this.currDate);
			d.setDate(1);
			this.getGroupRecordList(utils.formatDate(d, 'yyyy-MM-dd'));
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
	                    isSelected: false,
	                    count: ''
		                });
	                for (let j = 0; j < this.list.length; j++) {
	                	if(this.list[j]) {
	                		if( utils.formatDate(new Date(days[i].timestamp), 'yyyy-MM-dd') == this.list[j].ctime ) {
	                			days[i].count = this.list[j].num;
	                		}
	                	}
	                }

	              	dObj.setDate(dObj.getDate() + 1);
	            }
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
			getGroupRecordList(date) {
				api.getGroupRecordList(this, {beginDate: date}, back => {
					this.$dispatch('cancelLoading');
					if (back.resCode == '0') {
						this.list = back.repBody.list || [];
					}
				})
			},
			link(day) {
				if (day.count == '') {
					this.show = true;
				} else {
					window.sessionStorage.setItem('date', utils.formatDate(new Date(day.timestamp), 'yyyy-MM-dd'));
					this.$router.go({path: '/teamsDetails'});
				}
			},
			setMonth(type) {
				let d = new Date(this.currDate);
				if (type === 'prev') {
					d.setMonth(d.getMonth() - 1);
					this.currDate = d.getTime();
				} else if (type === 'next') {
					d.setMonth(d.getMonth() + 1);
					this.currDate = d.getTime();
				}
			}
		}
	}
</script>
<style scoped>
	.signIn .dateCon > p > a {
		color: #35828a;
		padding: 0 30px;
		font-size: 32px;
	}
	.date-row span {
		position: relative;
	}
	.date-row span i {
		position: absolute;
		top: 10px;
		right: 12px;
		width: 20px;
		height: 20px;
		font-size: 18px;
		border-radius: 50%;
		color: white; 
		text-align: center;
		line-height: 20px;
		background: red;
	}
	.alert {
		position: relative;
	}
	.alert h2 {
		padding: 40px 0;
		font-size: 30px;
		color: white;
		font-weight: 400;
		text-align: center;
		border-radius: 15px 15px 0 0;
		background: #43a4ae;
	}
	.alert p {
		line-height: 300px;
		text-align: center;
		color: #3da5af;
		font-size: 26px;
		border-radius: 0 0 15px 15px;
		background: white;
	}
	.alert .close {
		position: absolute;
		top: -15px;
		right: -15px;
		width: 46px;
		height: 46px;
		background: url(../images/member-rule-close.png) no-repeat;
	}
</style>