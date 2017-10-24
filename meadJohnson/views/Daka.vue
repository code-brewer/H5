<template>
	<div class="view">
		<!-- <section class="daqia-title">
	        <a class="l-jiantou" href="#"></a>
	        <h1 class="logo">妈咪打卡</h1>
	        <a class="share" href="#"></a>
	    </section> -->
	    <section class="daqia2-bg">
	        <div class="date-wrap">
	        	<div class="date-header">{{ currYear }} 年 {{ currMonthName }}月 </div>
	        	<div class="date-content">
	        		<div class="cell week" v-for="week in 7">
	        			
	        		</div>
	        		<div class="cell blank" v-for="d in blankDays"><span></span></div>

	        		<div class="cell day" v-for="day in days" track-by="$index" :class="{selected: day.isSelected}" @click="sign(day)">
	        			<span>{{day.date}}</span>
	        		</div>
	        	</div>
	        	<a v-link="{path: '/rule'}" class="rule-link"><img :src="'images/rule-icon.png'"></a>
	        </div>

	        <div class="my-icon"></div>
	        <div class="check"><a href="">立即查看</a></div>
	        <div class="daqia2-lipin">
	            <img :src="'images/liwu.png'" alt="" />
	        </div>
	        <div class="jiangpin">
	            <ul>
	                <li>
	                    <a v-link="{path: '/reply'}">
	                        <img :src="'images/duck.png'">
	                        <div class="font">
	                            <h5>满趣健White Hot充气安全澡盆-鸭子造型</h5>
	                        </div>
	                        <div class="btn-duijiang">
	                            <span class="btn1">900贝壳币</span>
	                            <span class="btn2">10贝壳币试运气</span>
	                        </div>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{path: '/reply'}">
	                        <img :src="'images/child.png'">
	                        <div class="font">
	                            <h5>长颈鹿脚踏车</h5>
	                        </div>
	                        <div class="btn-duijiang">
	                            <span class="btn1">900贝壳币</span>
	                            <span class="btn2">10贝壳币试运气</span>
	                        </div>
	                    </a>
	                </li>
	            </ul>
	        </div>

	    

	    <modal :show.sync="tipModal.show" :bg="false">
			<div class="out">
	            <a href="#">
	            </a>
	        </div>
		</modal>
	</div>

	
</template>

<script>
	import api from '../api'
	import Modal from '../components/Modal.vue'
	// import datepicker from '../../src/components/Datepicker.vue'

	import DateUtils from '../utils/DateUtils.js'
	import utils from '../../src/utils'

	export default {
		http: {
	    	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    },
		components: {
			Modal
		},
		data() {
			return {
				tipModal: {
					show: false
				},
	
				currDate: new Date().getTime(),

				list: []
			}
		},
		created() {
			document.title = '签到';
			var that = this;

			
			api.signList(this, {iorg: '妈咪打卡'}, (back)=> {
				that.list = back.repBody;

				that.$dispatch('cancelloading', 'daka');
			})

			document.title = '贝壳币商城';
		},

		methods: {
			daka() {
				api.sign(this, {})
			},
			

	        setDate(timestamp) {
	            this.value = this.selectedDate = new Date(timestamp);
	            this.currDate = timestamp;

	            let d = new Date(timestamp);
	            this.formattedValue = DateUtils.formatDate(d, this.format);

	            this.dispatchEvent(timestamp);
	        },
	     
	        sign(day) {
	        	var cd = new Date();
	        	if(day.date==cd.getDate()) {
	        		for (let i = 0; i < this.list.length; i++) {
	        			var dd = new Date(this.list[i].ctime);
	        			if(cd.getFullYear() == dd.getFullYear() 
	        				&& cd.getMonth() == dd.getMonth()
	        				&&dd.getDate() == day.date) 
	        				{
	        					return;
	        				}
	        		}

	        		this.list.push({ctime: utils.formatDate(new Date(), 'yyyy-MM-dd')});
		        	api.sign(this, {iorg: '妈咪打卡'}, (back)=> {})
	        	}

	        	
	        }
		},

		computed: {
			currMonthName() {
	            const d = new Date(this.currDate);
	            // return DateUtils.getMonthNameAbbr(d.getMonth())
	            return (d.getMonth()+1);
	        },
	        currYear() {
	            const d = new Date(this.currDate);
	            return d.getFullYear();
	        },
	        blankDays() {
	            const d = new Date(this.currDate);
	            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	            console.log(dObj.getDay())
	            return dObj.getDay();
	        },
	        days() {
	            const d = new Date(this.currDate);
	            
	            let days = [];
	            // set up a new date object to the beginning of the current 'page'
	            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
	            let daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth());
	            console.log(daysInMonth)
	            for (let i = 0; i < daysInMonth; i++) {
	                days.push({
	                    date: dObj.getDate(),
	                    timestamp: dObj.getTime(),
	                    isSelected: false
		                });
					//console.log(this.list)
	                // for (let j = 0; j < this.list.length; j++) {
	                // 	if(this.list[j]) {
	                // 		if( utils.formatDate(new Date(days[i].timestamp), 'yyyy-MM-dd') == this.list[j].ctime ) {
	                // 			days[i].isSelected = true;
	                // 		}
	                // 	}
	                // }

	              	dObj.setDate(dObj.getDate() + 1);
	            }
	            console.log(days)
	            return days;
	        },
	        months() {
	            const d = new Date(this.currDate);
	            let months = [];
	            // set up a new date object to the beginning of the current 'page'
	            let dObj = new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());
	            for (let i = 0; i < 12; i++) {
	                months.push({
	                    month: DateUtils.getMonthName(i),
	                    timestamp: dObj.getTime(),
	                    isSelected: this.isSelectedMonth(dObj),
	                    isDisabled: this.isDisabledMonth(dObj),
	                });
	                dObj.setMonth(dObj.getMonth() + 1);
	            }
	            return months;
	        },
	        years() {
	            const d = new Date(this.currDate);
	            let years = [];
	            // set up a new date object to the beginning of the current 'page'
	            let dObj = new Date(Math.floor(d.getFullYear()/10)*10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
	            // dObj.setFullYear(dObj.getFullYear() - 1);
	            for (let i = 0; i < 10; i++) {
	                years.push({
	                    year: dObj.getFullYear(),
	                    timestamp: dObj.getTime(),
	                    isSelected: this.isSelectedYear(dObj),
	                    isDisabled: this.isDisabledYear(dObj),
	                });
	                dObj.setFullYear(dObj.getFullYear() + 1);
	            }
	            return years;
	        },
		}

	}
</script>
