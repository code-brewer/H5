<template>
	<div class="app-view ranking-page">
		<div class="content padding">
			<div class="rankingdbg">
				<div class="sorthead" >
					<p class="pfirst">我的最高积分:<span>{{PrizeInfo.score}}</span> &nbsp;&nbsp;第<span>{{PrizeInfo.rn}}</span>名</p>
				</div>

				<div class="tab-head">
					<ul>
						<li v-for="item in dates" @click="changeDate($index)" >
							<p :class="item.classs" name="datesitem" >{{item.name}}</p>
						</li>
					</ul>
				</div>
				<div class="sorts">
					<div class="sortitem" v-for="list in sortsList">
						<img class="sorticon" :src="list.head_img" alt="" />
						<div class="sortnick">
							<p>{{list.nick==null?'神秘人':list.nick}}</p>
							<p>{{list.score}}分</p>
						</div>
						<p class="sortrank">第{{list.rn}}名</p>
					</div>
					<!-- <p>神秘人的总积分为124个，排名为第1名</p> -->
				</div>
				<div class="award" >
					<a  v-link="{path: '/award'}" v-if="activeFlag">
						<img :src="$root.basePath+'activity/SliderMoney/src/img/awardbtn.png'" />
					</a>
					<a v-link="{path: '/awardret'}" v-if="querysid" class="mybtn buttonbg" >查看券码</a>
				
				</div>
				
					
				<p class="awardtip">{{tiptext}}</p>
				<a class="awardtip" v-link="{path: '/rule'}" class="link">游戏攻略</a>
			</div>
			<div class="ranking-title">排名详情</div>
			
		</div>
		<img :src="activityInfo.backgrounds.other"  class="bg">
	</div>
</template>

<style scoped>
	.unselectdate {
		color: #eb9e6b;
	}
	.mybtn{
		/*background: url('./img/btn.png');*/
	    background-size: 100% 100%;
	    width: 250px;
	    height: 115px;
	    display: inline-block;
	    line-height: 115px;
	    font-size: 34px;
	    color: #ff560b;
	    font-weight: bold;
	    text-decoration: none;
	}
	.award{
		height: 115px;
	}
</style>


<script>

import sapi from './utils/serverapi.js'

	export default {
ready() {
		this.$dispatch('title', '排行详情');
		this.initDate();

		this.$dispatch('loading', {name:'rank_prizeScoreRank', text: '加载中...', icon: true, show: true, duration: 20*1000});
		var findtoday = false;
		for (var i = 0; i < this.dates.length; i++) {
			if(!this.dates[i].classs.unselectdate){
				findtoday = true;
				this.prizeScoreRankCursuser(this.activity.aid,this.dates[i].stime,this.dates[i].etime);
				this.prizeScoreRank(this.activity.aid,this.dates[i].stime,this.dates[i].etime);
			
			}
		};

		if(!findtoday){
			this.dates[this.dates.length-1].classs.unselectdate = false;
			this.prizeScoreRankCursuser(this.activity.aid,this.dates[this.dates.length-1].stime,this.dates[this.dates.length-1].etime);
			this.prizeScoreRank(this.activity.aid,this.dates[this.dates.length-1].stime,this.dates[this.dates.length-1].etime);
			
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
		return {
			activity:{},
			activityInfo:{backgrounds:{other:''}},
			activeFlag:false,
			sortsList:[],
			loadingCount:0,
			PrizeInfo:{"gid":"0","haveprize":"0","oid":"0","pid":"0","pname":"","rn":"0","score":"0","date":""},
			dates:[],
			awardtext1:'去领奖',
			awardtext2:'已领奖',
			awardtext:'去领奖',
			tiptext:'',
			querysid:false,
			querysidinfo:{},
		}
	},
	methods:{
		initDate(){
			Date.prototype.Format = function (fmt) {
				var o = {
					"M+": this.getMonth() + 1,
					"d+": this.getDate(),
					"h+": this.getHours(),
					"m+": this.getMinutes(),
					"s+": this.getSeconds(),
					"q+": Math.floor((this.getMonth() + 3) / 3),
					"S": this.getMilliseconds()
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}


			this.activity = JSON.parse(localStorage.getItem('activity'));
			this.activityInfo = JSON.parse(this.activity.extbody);
			var ctime = this.activity.starttime.substr(0,10);
			var etime = this.activity.endtime.substr(0,10);

			//当前日期
			var date = new Date();
			//活动开始日期
			var cdate = new Date(ctime.replace(/-/g,"/"));
			//活动结束日期
			var edate = new Date(etime.replace(/-/g,"/"));

			var cdatev = cdate.valueOf();
			var edatev = edate.valueOf();

			//查询某天排行接口的结束时间
			var odatev = cdatev+1*24*60*60*1000;
			var odate = new Date(odatev);

			this.dates = [];
			//样式（默认选中当天）
			var isselect = date.Format("yyyy-MM-dd")!=cdate.Format("yyyy-MM-dd");
			this.dates.push({'stime':cdate.Format("yyyy-MM-dd")+' 0:0:0','etime':odate.Format("yyyy-MM-dd")+' 0:0:0','name':cdate.Format("M月dd日"),'classs':{'unselectdate':isselect}});
			while(odatev<edatev){

				//某天开始时间
				cdatev += 1*24*60*60*1000;
				cdate = new Date(cdatev);
				//某天结束时间
				odatev = cdatev+1*24*60*60*1000;
				odate = new Date(odatev);

				//样式（默认选中当天）
				isselect = date.Format("yyyy-MM-dd")!=cdate.Format("yyyy-MM-dd");
				this.dates.push({'stime':cdate.Format("yyyy-MM-dd")+' 0:0:0','etime':odate.Format("yyyy-MM-dd")+' 0:0:0','name':cdate.Format("M月dd日"),'classs':{'unselectdate':isselect}});
			}
			this.dates.push({'stime':'','etime':'','name':'总排名','classs':{'unselectdate':true}});

			// console.log(JSON.stringify(this.dates));

			// this.dates = [{stime:'',etime:'',name:'',classs:{'unselectdate':true}}];

		},
		prizeScoreRank(aid,sdate,edate){
			// console.log("aid--"+aid);
			var that = this;
			that.sortsList = [];
			// var body={aid:aid,starttime:sdate,endtime:edate};
			var aDate = '';
			if(sdate != ''){
				aDate = sdate.slice(0,10);
			}
			var body={aid:aid,date:aDate,pageSize:30};
			that.loadingCount++;
			sapi.prizeScoreRank(this, body, (back)=> {
				console.log(back)
				that.loadingCount--;
				if(that.loadingCount <=0){
					that.$dispatch('cancelloading', 'rank_prizeScoreRank');
				}
				if(back.resCode=="0") {
					var dd = back.repBody;
						// console.log("dd-"+dd);
						that.sortsList = dd.list;
						console.log(that.sortsList)
					}
					else if (back.resCode=="10003") {
						that.$dispatch('login', window.location.search);
					}
				});
		},
		prizeScoreRankCursuser(aid,sdate,edate){
			var that = this;
			that.querysid = false;
			that.PrizeInfo =  {"gid":"0","haveprize":"0","oid":"0","pid":"0","pname":"","rn":"0","score":"0","date":""};
			that.awardtext = that.awardtext1;
			that.activeFlag = false;

			var etime = this.activity.endtime.substr(0,10);
			var edate = new Date(etime.replace(/-/g,"/"));

			that.tiptext = edate.Format("MM月dd日")+'10:00后点击按钮领奖';
			// var body={aid:aid};
			var aDate = '';
			if(sdate != ''){
				aDate = sdate.slice(0,10);
			}
			var body={aid:aid,date:aDate};
			that.loadingCount++;
			sapi.prizeScoreRankCursuser(this, body, (back)=> {
				console.log(back)
				that.loadingCount--;
				if(that.loadingCount <=0){
					that.$dispatch('cancelloading', 'rank_prizeScoreRank');
				}
				if(back.resCode=="0") {
					var dd = back.repBody[0];
						// console.log("dd-"+dd);
						that.PrizeInfo = dd;
						if(aDate.length == 10){
							that.PrizeInfo.date = aDate.slice(5,10);
						}else{
							that.PrizeInfo.date = aDate;
						}
						
						if(that.PrizeInfo.haveprize == '1'){
							if(that.gid == '0'){
								that.tiptext = '获取获奖信息失败，请点击日期重试';
							}else{
								// that.PrizeInfo.pname = '50元的2/3D通兑电影券';
								// that.PrizeInfo.pname = '30M流量包';
								// that.PrizeInfo.pname = '1万元理财体验金';
								// localStorage.setItem('prizeinfo', JSON.stringify(that.PrizeInfo));
								// 	that.activeFlag = true;
								console.log(that.PrizeInfo.gid)
								that.querySidByGid(that.PrizeInfo.gid);

								if(!that.PrizeInfo.mobile || that.PrizeInfo.mobile==''){
									localStorage.setItem('prizeinfo', JSON.stringify(that.PrizeInfo));
									that.activeFlag = true;
								}else{
									that.awardtext = that.awardtext2;
								}
								
								console.log(that.PrizeInfo.gid)

								
							}
						}
					}
					else if (back.resCode=="10003") {
						that.$dispatch('login', window.location.search);
					}
				});
		},
		changeDate(index){
			var that = this;
			for (var i = 0; i < that.dates.length; i++) {
				that.dates[i].classs.unselectdate = index!=i;
			}
			that.$dispatch('loading', {name:'rank_prizeScoreRank', text: '加载中...', icon: true, show: true, duration: 20*1000});
			that.prizeScoreRankCursuser(that.activity.aid,that.dates[index].stime,that.dates[index].etime);
			that.prizeScoreRank(that.activity.aid,that.dates[index].stime,that.dates[index].etime);
			
		},
		querySidByGid(gid){
			var that = this;
			var body={gid:gid};
			sapi.querySidByGid(this, body, (back)=>{
				that.querysidinfo = back.repBody;
				console.log(that.querysidinfo)
				localStorage.setItem('querysidinfo', JSON.stringify(that.querysidinfo));
				if(back.resCode == "0"){
					that.activeFlag = false;
					that.querysid = true;
				}
				else if(back.resCode == "10030"){
					that.activeFlag = true;
					that.querysid = false;
				}
			})
		}
	}
}
</script>