<template>
	<div class="wap-rank-list">
		<div class="tab-head">
			<div class="scroller">
				<ul>
					<li v-for="item in dates"  @click="changeDate($index,item)"> 
						<p :class="item.classs" name="datesitem" :style="{'color':($index==dateSelect)?common.mainColor:common.secondColor}" >{{item.name}}</p>
					</li>
				</ul>
			</div>
			<div class="total" :class="{active:checked}"  :style="{'color':common.secondColor}"  @click="totalRn()">{{totalRank.name}}</div>
		</div>
		<div class="sorts">
			<div class="scroll">
				<div class="sortitem" v-for="list in sortsList">
					<img class="sorticon" :src="list.head_img" alt="" / style="vertical-align: top;">
					<div class="sortnick-panel">
						<div class="sortnick">
							<p :style="{'color':common.secondColor}">{{list.nick==null?'神秘人':list.nick}}</p>
							<p class="score-c" :style="{'color':common.secondColor}">{{list.score}}分</p>
						</div>
						<p class="sortrank"  :style="{'color':common.secondColor}">第<span>{{list.rn}}</span>名</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.wap-rank-list {
		.tab-head {
			.scroller {
				position: relative;
			}
		}
		.sorts {
			overflow: hidden!important;
			position: relative;
		}
	}
</style>
<script>
	import sapi from '../../service'
	import utils from '../../../utils'
	export default {
		props: {
			totoday: {
				type: Boolean,
				default: true
			},
			checked:{
				type: Boolean,
				default: false
			},
			date:{
				String,
				default:""
			}
		},
		watch:{
			dates(val) {
				if(val.length) {
					var el = document.getElementsByName('datesitem');
					for (var i = 0; i < el.length; i++) {
						if(el[i].className != 'unselectdate'){
							el[i].scrollIntoView(true);
						}
					};
				}
			}

		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				sortsList: [],
				dates:[],
				enddate:'',
				totalRank:'',
				dateSelect:0,
				intf:{dateCallback:null}
			}
		},
		ready() {
			this.initDate();
			this.date = this.dates[this.dateSelect].stime.split(" ")[0];
		},
		methods: {
			initDate(){
				var ctime = window.store.configData.starttime.substr(0,10);
				var etime = window.store.configData.endtime.substr(0,10);
				//当前日期
				var date = new Date();
				//活动开始日期
				var cdate = new Date(ctime.replace(/-/g,"/"));
				//活动结束日期
				var edate = new Date(etime.replace(/-/g,"/"));
				var cdatev = cdate.valueOf();
				var edatev = edate.valueOf();
				//领奖时间
				var month = edate.getMonth()+1;
				var da = edate.getDate(); 
				this.enddate = +month+'月'+da+'日';
				//查询某天排行接口的结束时间
				var odatev = cdatev+1*24*60*60*1000;
				var odate = new Date(odatev);
				this.dates = [];
				var findtoday = false;
				//样式（默认选中当天）
				var isselect = utils.formatDate(date, "yyyy-MM-dd")!=utils.formatDate(cdate, "yyyy-MM-dd");
				var item = {'stime':utils.formatDate(cdate, "yyyy-MM-dd")+' 0:0:0','etime':utils.formatDate(odate, "yyyy-MM-dd")+' 0:0:0','name':utils.formatDate(cdate, "MM月dd日"),'classs':{'unselectdate':isselect}};
				this.dates.push(item);
				if(!isselect && this.totoday){
					findtoday = true;
					this.prizeScoreRank(window.store.configData.aid,item.stime,item.etime);
				}
				var count = 0;
				while(odatev<edatev){
					//某天开始时间
					cdatev += 1*24*60*60*1000;
					cdate = new Date(cdatev);
					//某天结束时间
					odatev = cdatev+1*24*60*60*1000;
					odate = new Date(odatev);
					//样式（默认选中当天）
					isselect = utils.formatDate(date, "yyyy-MM-dd")!=utils.formatDate(cdate, "yyyy-MM-dd");
					var ditem = {'stime':utils.formatDate(cdate, "yyyy-MM-dd")+' 0:0:0','etime':utils.formatDate(odate, "yyyy-MM-dd")+' 0:0:0','name':utils.formatDate(cdate, "MM月dd日"),'classs':{'unselectdate':isselect}};
					this.dates.push(ditem);
					count+=1;
					if(!isselect && this.totoday){
						this.dateSelect=count;
						findtoday = true;
						this.prizeScoreRank(window.store.configData.aid,ditem.stime,ditem.etime);
					}
				}
				this.totalRank = {'stime':'','etime':'','name':'总排名','classs':{'unselectdate':true}};
				if(!findtoday){
					this.getTotalRn(false);
				}
			},
			prizeScoreRank(aid,sdate,edate){
				var that = this;
				that.sortsList = [];
				var aDate = '';
				if(sdate != ''){
					aDate = sdate.slice(0,10);
				}
				var body={aid:aid,date:aDate,pageSize:30};
				sapi.prizeScoreRank(this, body, (back)=> {
					if(back.resCode=="0") {
						var dd = back.repBody;
						that.sortsList = dd.list;
					}
					else{
						that.$dispatch('handleServerBack', back);
					}
				});
			},
			changeDate(index,date){
				this.dateSelect = index;
				this.date = this.dates[this.dateSelect].stime.split(" ")[0];;
				var that = this;
				//改变总排名样式
				that.checked = false;
				for (var i = 0; i < that.dates.length; i++) {
					that.dates[i].classs.unselectdate = index!=i;
					if(index==i){
						that.callbackDate(that.dates[i].stime);
					}
				}
				that.prizeScoreRank(window.store.configData.aid,that.dates[index].stime,that.dates[index].etime);
			},
			//总排名
			getTotalRn(needCallback){
				var that = this;
				if(needCallback){
					that.callbackDate('');
				}
				//改变样式
				that.checked = true;
				for(var i = 0; i < that.dates.length; i++){
					that.dates[i].classs.unselectdate = true;
				}
				that.prizeScoreRank(window.store.configData.aid,'','');
			},
			totalRn(){
				this.dateSelect = -1;
				this.date = "";
				this.getTotalRn(true);
			},
			callbackDate(date){
				if(this.intf.dateCallback){
					this.intf.dateCallback(date);
				}
			},
			setDateCallback(fun){
				this.intf.dateCallback = fun;
			},
			getCurrDate(){
				if(this.checked){
					return ''
				}
				for(var i = 0; i < this.dates.length; i++){
					if(!this.dates[i].classs.unselectdate){
						return this.dates[i].stime;
					}
				}
			}
		}
	
	}
</script>


