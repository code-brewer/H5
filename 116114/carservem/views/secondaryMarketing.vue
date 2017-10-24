<template>
	<h1 class="manage">二次营销号码提取</h1>
	<div class="oneAccount" style="margin: 35px 50px;background-color:#fff;border:1px solid #ccc;"><span style="color:#ff0000;">注：本功能只用于提取单个“已开户违章短信提醒服务，但未登记车辆信息的用户手机号码”，用于二次营销。</span></div>
		
	
	<div class="memberBody">
		<div class="memberTop">
		<span style="margin-right:10px;">类型</span>
			<select class="selectChoose" v-model='markData.state' style="font-size:12px;">
				<option value="">全部</option>
				<option value="0">未登记车辆</option>
				<option value="1">已登记车辆</option>
				
			</select>
			<!-- <div class="head"> &nbsp;-->
			<span>开户时间</span>
        	<datepicker v-ref:dp :value.sync="starttime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
        -
        	<datepicker v-ref:dp :value.sync="endtime" :disabled-days-of-Week="disabled" :format="format.toString()" placeholder="年-月-日" width="200px;height:28px;"></datepicker>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a class="check" @click="getAccountUsers()">查找</a>
        <a class="accountDao" @click="getExport" style="float:right;">导出excel</a>
    <!-- </div> -->
		</div>
		<div style="margin-top:30px;">
			
		<table class="AcountTable">
			<tbody>
				<tr style="background-color:#faa354;">
					<td class="rightTd" style="width:20%;">类型</td>
					<td class="rightTd" style="width:60%;">开户时间</td>
					<td class="rightTd" style="width:20%;">手机号码</td>
					
				</tr>
				<tr  v-for="list in lists">
					<td class="rightTd"> {{list.state == '0'?'未登记车辆':'已登记车辆'}}</td>
					<td class="rightTd">{{list.accounttime}}</td>
					<td class="rightTd">{{list.phone}}</td>
					
				</tr>
				
				
			</tbody>
		</table>
	
		</div>
		<nav style="text-align: right;">
        	<pager :config="pageConfig"></pager>
    	</nav>
	</div>


	<modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
	 <div class="close"><span  @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:0 50px;">
            <p style="line-height:100px;text-align:center;">{{doubleStatus.msg}}</p>
            <a  class="actiontong"  @click=''>确定</a>
            <a @click="this.doubleStatus.showMsg = false" class="nothx">取消</a>
        </div>
    </modale>
    <modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
	 <div class="close"><span  @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
	 <div style="height:214px;width:100%;position:relative;">
        	<div style="padding: 40px 30px 0;line-height:25px;">
            	<p style="text-align:center;">{{UploadStatus.msg}}</p>
            	<a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
        	</div>
    	</div>
    </modale>
    <modale :show.sync="loginStatus.showMsg" :msg.sync="loginStatus.msg">
	<div class="close"><span  @click="backlogin()" class="comite"></span></div>
		<div style="height:214px;width:100%;position:relative;">
        	<div style="padding: 40px 30px 0;line-height:25px;">
            	<p style="text-align:center;">{{loginStatus.msg}}</p>
            	<a  class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;" @click="backlogin()">确定</a>
        	</div>
    	</div>
    </modale>
    <loading :show="isLoad"></loading>
</template>

<script>
	import api from '../api'
	import {router} from '../index'
	import Modale from '../components/newComponts/Modale.vue'
	import util from '../utils/index.js'
	import Vue from 'vue'
	import loading from '../components/Loading.vue'
	import Datepicker from '../components/bootstrap/Datepicker.vue';
	import Pager from '../components/Pager.vue'
	import Dateutil from '../utils/DateUtils.js'
	export default {
		components:{
			Modale,
			loading,
			Datepicker,
			Pager
		},

		data() {
			return {
				doubleStatus: {    //单选确认
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null
                },
                UploadStatus: {    //双重确认
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null
                },loginStatus: {    //登录
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null
                },
				pageConfig: {
	                total: 0,
	                curpage: 1,
	                totalpage: 1
            	},
				isLoad:false ,   //加载框,
				markData:{
					state:'',
					starttime:'',
					endtime:'',
					page:1,
					pagesize:'8'
				},
				 format: ['yyyy-MM-dd'],
				 starttime: '', //开始时间
            	endtime: '', //结束时间
            	lists:[]
				
			}
		},
		ready(){
			this.getAccountUsers()
		},
		watch: {
        	'pageConfig.curpage'(val) {
        		console.log(val)
        		if (!isNaN(+val)) {
        			this.getAccountUsers();
        		}
        	}
    	},
		created(){
			
		},
		methods:{
			showTips(message){
                this.doubleStatus.msg = message;
                this.doubleStatus.showMsg = true;
            },
            show(message){
                this.UploadStatus.msg = message;
                this.UploadStatus.showMsg = true;
            },
			
			
			getAccountUsers(){
				var that = this;
				this.isLoad = true;
				this.markData.page = this.pageConfig.curpage;
				var starttime = new Date(that.starttime).getTime() || ''
            	that.markData.starttime = starttime
            	var endtime = new Date(that.endtime).getTime() || ''
            	that.markData.endtime = endtime
				api.getAccountUsers(this,this.markData,(back)=>{
					if(back.resCode=="0"){
						this.isLoad = false;
						back.repBody.list.forEach(value=>{
								value.accounttime = Dateutil.format(new Date(value.accounttime), 'yyyy-MM-dd HH:mm:ss')
							})
						that.lists = back.repBody.list
                    	that.pageConfig.totalpage = back.repBody.totalpage
                    	that.pageConfig.total = back.repBody.total
                    	that.pageConfig.curpage = back.repBody.curpage

					}else{
						this.isLoad = false;
						this.show(back.resMsg)
					}
				})
			},
			getExport(){
				var that = this;
				var starttime = new Date(that.starttime).getTime() || ''
            	that.markData.starttime = starttime
            	var endtime = new Date(that.endtime).getTime() || ''
            	that.markData.endtime = endtime
				window.location.href = basePath + 'user/export?state='+that.markData.state+'&starttime='+that.markData.starttime +'&endtime='+that.markData.endtime
			},
			backlogin(){
				this.loginStatus.showMsg = false;
				this.$route.router.go({path: '/login'})}

			}
		}
	// }
</script>

<style scoped>
	/**/
	.manage{
		height: 60px;
		line-height: 60px;
		color: #ed6c00;
		font-size: 20px;
		font-family: '微软雅黑';
		border-bottom:1px solid #b9b7b7;
		padding-left: 45px;
	}
	.accountBody{
	    margin: 35px 50px;
	}
	.oneAccount{
		height: 38px;
		line-height: 38px;
		text-align: center;
		background-color: #faa354;
		color: #000;


	}
	.AcountTable {
		width: 100%;
	}
	.AcountTable td{
		border:1px solid #ccc;
		height: 35px;
		line-height: 35px;


	}
	.leftTd{
		width: 15%;
		text-align: center;
	}

	.AcountTable td input{
		border:none;
		width: 138px;
		border-bottom: 1px solid #ccc;
		height: 20px;
		margin-right: 10px;

	}
	.rightTd{
		text-align: center;
	}
	.choose{
		display: inline-block;
		width: 60px;
		position: relative;
	}
	.leftcheck{
		position: absolute;
		left:10px;
		top:9px;
	}
	
	.sub{
		width: 73px;
		height: 28px;
		background-color: #f57303;
		border:1px solid #e55c00;
		color: #fff;
		line-height: 28px;
		text-align: center;
		display: inline-block;
		margin:0 auto;
		border-radius: 3px;
		text-decoration: none;
		cursor: pointer;
	}
	.dingwei{
		position: absolute;
		left:0px;
		top:9px;
		width: 30px;
	}
	.yes{
		padding-left: 32px;
		margin-top: 3px;
		display: inline-block;
	}
	.dingfou{
		position: absolute;
		left: 23px;
		top: 7px;
		width: 30px;
	}
	.txtArea{
		width:100%;
		height:100%;
		resize:none;
		margin-top:12px;
	}
	.chaxun{
		width: 60px;
		height: 22px;
		border-radius: 20px;
		border:1px solid #ccc;
		background-color: #fff;
		color: #000;
		line-height: 22px;
		display: inline-block;
		text-align: center;
		margin-left: 350px;
		cursor: pointer;
		/*background: url(./images/btnBg.png);*/
	}
	.xiafa{
		width: 148px;
		height: 22px;
		border-radius:20px;
		border:1px solid #ccc;
		background-color: #fff;
		color: #000;
		line-height: 22px;
		display: inline-block;
		text-align: center;
		margin-left: 40px;
		text-decoration: none;
		cursor: pointer;
		/*background: url(./images/btnBg.png);*/
	}
	.uploadbox {
        width:190px;height:100%;padding: 0 5px;
    }
	/**/
	.comite{
		width: 18px;
		height: 18px;
		background: yellow;
		margin: 0 auto;
		display: inline-block;
	    position: absolute;
    	top: 6px;
    	right: 5px;

		background: url(../images/cha.png) no-repeat;
		cursor: pointer;
		/*margin-top: 50px;*/
	}
	.close{
		height: 30px;
		line-height: 30px;
		background-color: #faa354;
		position: relative;
		
	}
	.actiontong,.nothx,.juzhong{
		width: 73px;
		height: 28px;
		background-color: #f57303;
		border:1px solid #e55c00;
		color: #fff;
		line-height: 28px;
		text-align: center;
		display: inline-block;
		margin:0 auto;
		border-radius: 3px;
		cursor: pointer;

		/*background: url(./images/btnBg.png);*/
	}
	.actiontong{
		float: left;
	}
	.nothx{
		
		float: right;
		/*background: url(./images/btnBg.png);*/
	}
	/**/
	.uploadbox {
        width:190px;height:100%;padding: 0 5px;
    }
    .btn-linear {
	    width: 55px;
    	height: 30px;
        background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
        //background: linear-gradient(top, #fcfcfc, #d9d7d7);
    }
    .shangchuan{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    z-index: 10;
    cursor: pointer;
    }
    .sure{
    	width: 55px;
    	height: 30px;
    	line-height: 30px;
    	text-align: center;
    	border:1px solid #ccc;
    	margin-left: 20px;
    	display: inline-block;
    	 background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -ms-linear-gradient(top, #fcfcfc, #d9d7d7);
        //background: linear-gradient(top, #fcfcfc, #d9d7d7);
    }

    /**/
    .memberBody{
		margin: 35px 50px;
	}
    .memberTop{
		height: 30px;
		line-height: 30px;
	}
	.selectChoose{
		
	    height: 100%;
    	width: 134px;
    	margin-right: 20px;
	}
	.Comtxt{
		height: 100%;
		width: 146px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.sub{
		width: 73px;
		height: 28px;
		background-color: #f57303;
		border:1px solid #e55c00;
		color: #fff;
		line-height: 28px;
		text-align: center;
		display: inline-block;
		margin:0 auto;
		border-radius: 3px;
		text-decoration: none;
		margin-left: 10px;
		cursor: pointer;
	}
	.head {
    font-family: 'Microsoft YaHei';
    font-size: 12px;
    width: 900px;
    height: 40px;
    line-height: 40px;
    /*margin: 56px 74px;*/
}

.head input {
    height: 25px;
    width: 200px;
}

.head select {
    width: 130px;
    height: 30px;
}

.data {
    margin: 56px 74px;
    height: 200px;
}
.check {
    line-height: 30px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #F57303;
    position: absolute;
    background-color: #F57303;
    width: 90px;
    height: 30px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
}
.downbtn{
	color: #0035bb;
	text-decoration: underline;
	cursor: pointer;
}
.accountDao {
    /*margin-top: 5px;*/
    line-height: 30px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #F57303;
    /*position: absolute;*/
    background-color: #F57303;
    width: 90px;
    height: 30px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
}
</style>