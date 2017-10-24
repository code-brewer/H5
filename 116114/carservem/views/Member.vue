<template>
	<h1 class="manage">会员管理</h1>
	<div class="memberBody">
		<div class="memberTop">
			<select class="selectChoose" v-model='memberData.type' style="font-size:12px;">
				<option value="0">选择类型</option>
				<option value="phone">手机号码</option>
				<option value="platetype">牌类号型</option>
				<option value="platenumber">车牌号码</option>
				<option value="framenumber">车身架号</option>
				<option value="enginenumber">发动机尾号</option>
				<option value="idcard">用户身份证</option>
				<option value="driveidcard">驾驶证档案号</option>
			</select>
			<div style="display:inline-block;height:30px;margin-right:20px;">
				<input type="text" placeholder="输入详情查询" class="Comtxt" v-model="details"></input>
				
			</div>
			<div style="display:inline-block;height:30px;margin-right:20px;font-size:12px;">
				<span style="margin-right:10px;">订购查询</span>
				<select class="selectChoose" v-model='TypeData.state' style="font-size:12px;">
				<option value="">请选择</option>
				<option value="0">未订购</option>
				<option value="1">已订购</option>
				
			</select>
			<a  class="sub" @click="conditionShow()">搜索</a>
				
			</div>
			<a  class="sub" style="width:80px;float:right;" @click="Excel()">导出excel</a>
		</div>
	</div>
	<div style="margin:0px 50px;">
		<table class="AcountTable">
			<tbody>
				<tr style="background-color:#faa354;">
					<td class="rightTd">手机号码</td>
					<td class="rightTd" >牌号类型</td>
					<td class="rightTd" >车牌号码</td>
					<td class="rightTd" >车身架号</td>
					<td class="rightTd" >发动机尾号</td>
					<td class="rightTd" >代付费情况</td>
					<td class="leftTd" >驾驶证号</td>
					<td class="rightTd" >档案编号</td>
					<td class="rightTd" >业务订购记录</td>
					<td class="rightTd" >订购情况</td>
				</tr>
				<tr  v-for="list in lists">
					<td class="rightTd"> {{list.phone}}</td>
					<td class="rightTd" v-if="list.platetype==2">小型汽车</td>
					<td class="rightTd" v-if="list.platetype==1">大型汽车</td>
					<td class="rightTd" >{{list.platenumber}}</td>
					<td class="rightTd" >{{list.framenumber}}</td>
					<td class="rightTd" >{{list.enginenumber}}</td>
					<td class="rightTd" ><!-- <a class="lookDetail" @click="checkDetail(list.phone)">查看详情</a> -->
					<!-- <a class="lookDetail" > -->拨打4006022688<!-- </a> -->
					</td>
					<td class="leftTd"  >{{list.back1}}</td>
					<td class="rightTd" >{{list.back2}}</td>
					<td class="rightTd" ><a class="lookDetail" @click="checkBuy(list.phone)">查看详情</a></td>
					<td class="rightTd" >{{list.state==0? '未开通':'已开通'}}</td>
				</tr>
				
				
			</tbody>
		</table>
	</div>
	<nav style="text-align: right;">
		  <pager :config="pageConfig"></pager>
	</nav>
	<modale :show.sync="UploadStatus.showMsg" :msg.sync="UploadStatus.msg">
		<div class="close"><span  @click="this.UploadStatus.showMsg = false" class="comite"></span></div>
        <div style="height:214px;width:100%;position:relative;">
        	<div style="padding: 40px 30px 0;line-height:25px;">
            	<p style="text-align:center;">{{UploadStatus.msg}}</p>
            	<a @click="this.UploadStatus.showMsg = false" class="juzhong" style="display:block;position:absolute;bottom:50px;left:50%;margin-left:-37px;">确定</a>
        	</div>
    	</div>
    </modale>
    <!-- <modal :show.sync="DetailStatus.showMsg" :msg.sync="DetailStatus.msg">
		<div class="close"><span  @click="this.DetailStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:20px 50px;">
            <p style="line-height:30px;">日志id:{{DetailStatus.id}}</p>
			<p style="line-height:30px;">代办时间:{{DetailStatus.agenttime}}</p>
			<p style="line-height:30px;">手机号:{{DetailStatus.phone}}</p>
			<a @click="this.DetailStatus.showMsg = false" class="juzhong" style="display:block;margin:10px auto;">确定</a>
        </div>
    </modal> -->
    <modal :show.sync="serviceStatus.showMsg" :msg.sync="serviceStatus.msg">
		<div class="close"><span  @click="this.serviceStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:20px 50px;height:110px;overflow-y: scroll;" >
        <p style="line-height:30px;">手机号码:{{serviceStatus.phone}}</p>
        <div v-for="list in serviceStatuslist">
			<p style="line-height:30px;">{{list.servertype=='CANCEL'?'退订时间':'订购时间'}}:{{list.servetime}}</p>
         </div>   
        </div>
        <a @click="this.serviceStatus.showMsg = false" class="juzhong" style="display:block;margin:10px auto;">确定</a>
    </modal>
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
	import Modale from '../components/newComponts/Modale.vue'
	import Modal from '../components/newComponts/Modal.vue'
	import Pager from '../components/Pager.vue'
	import api from '../api'
	import {router} from '../index'
	import util from '../utils/index.js'
	import Dateutil from '../utils/DateUtils.js'
	import loading from '../components/Loading.vue'
	
	export default {
		components: {
			Modal,
			Modale,
			Pager,
			loading
		},
		data() {
			return {
				lists:[],
				memberData:{
					type:'0',
					dinggou:'0',

				},
				pageData:{
					page:1,
					pagesize:'8'
				},
				pageConfig: {
	                total: 0,
	                curpage: 1,
	                totalpage: 1
            	},
            	TypeData:{
            		phone:'',             //手机号
            		enginenumber:'',      //发动机号
            		framenumber:'',		  //车架号
            		platenumber:'',		  //车牌号码
            		platetype:'',         //车牌类型
            		idcard:'',            //身份证号
            		driveidcard:'',        //驾驶照号码
            		state:''             // 0 没订购 1 已订购
            	},
				details: '',
				UploadStatus: {    //单选确认
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null
                },
                loginStatus: {    //登录
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null
                },
                DetailStatus: {    //信息查询
                    msg: "",
                    showMsg: false,
                    errorShow: true,
                    event:null,
                    agenttime:'',
                    phone:'',
                    id:''
                },
                serviceStatus: {    //信息查询
                    showMsg: false,
                    errorShow: true,
                    event:null,
                    phone:'',
                    servertype:'',  //服务类型
                    servetime:'',  //服务时间
                    id:'',
                    // list:[]
                },
                isLoad:false,
                serviceStatuslist:[]
				

				
			}
		},
		filters: {
			
		},
		ready() {
			
			this.conditionShow()
			
			
			
		},
		watch: {
        	'pageConfig.curpage'(val) {
        		console.log(val)
        		if (!isNaN(+val)) {
        			this.conditionShow();
        		}
        	}
    	},
	
		methods: {
			show(message){
                this.UploadStatus.msg = message;
                this.UploadStatus.showMsg = true;
            },
			//导出excel
			Excel(){
				var that = this;
 				window.location.href=basePath+'car/download?state='+that.TypeData.state+'&'+that.memberData.type+'='+that.details;
			},
			//获取列表信息
			//不传的时候,列表信息
			memberShow(){
				var that = this;
				this.pageData.page = this.pageConfig.curpage;
				api.select(this,this.pageData,(back)=>{
					that.lists = back.repBody.list
					that.pageConfig.totalpage = back.repBody.totalpage
					that.pageConfig.total = back.repBody.total
					that.pageConfig.curpage = back.repBody.curpage
				})
			},
			//传数据时,列表信息
			conditionShow(){

				this.isLoad =true;
				var that = this;
				this.pageData.page = this.pageConfig.curpage;
				
				var options = {};
				for(let i in this.pageData) {
					console.log(i)
					options[i] = this.pageData[i];
				}
				options[this.memberData.type] = this.details;
				options.state = this.TypeData.state;
				console.log(this.memberData.type);
				console.log(this.details)
				
				api.select(this,options,(back)=>{
					if(back.resCode =='0'){
					this.isLoad = false;
					that.lists = back.repBody.list
					that.pageConfig.totalpage = back.repBody.totalpage
					that.pageConfig.total = back.repBody.total
					that.pageConfig.curpage = back.repBody.curpage
					}else if(back.resCode=="14"){
						this.isLoad = false;
						this.loginStatus.showMsg = true;
						this.loginStatus.msg ="登录超时,请管理员登录!"

					}else{
						this.isLoad = false;
						this.show(back.resMsg)
					}
				})
			},
			// checkDetail(phone){
			// 	api.loadAgentlog(this,{phone:phone},(back=>{
			// 		if(util.isEmptyObject(back.repBody)){
			// 			this.show("暂无查询到任何信息")
			// 		}else{
			// 			this.DetailStatus.showMsg = true;
			// 			this.DetailStatus.agenttime = back.repBody.agenttime;
			// 			this.DetailStatus.phone = back.repBody.phone;
			// 		}
					
			// 	}))
			// },
			checkBuy(phone){
				// this.isLoad = true;
				api.loadServelog(this,{phone:phone},(back=>{
					if(back.resCode=='0'){
						if(util.isEmptyObject(back.repBody)){
							this.show("暂无查询到任何信息")
						}else{
							
							this.serviceStatus.showMsg = true;
							this.serviceStatus.phone = phone;
							// this.serviceStatuslist= back.repBody
							back.repBody.forEach(value=>{
								value.servetime = Dateutil.format(new Date(value.servetime), 'yyyy-MM-dd HH:mm:ss')
							})
							// console.log()
							this.serviceStatuslist= back.repBody
							console.log(back.repBody)
							
						}
					}else{
						this.show(back.repBody)
					}
				}))
			},backlogin(){
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
	.AcountTable {
		width: 100%;
	}
	.AcountTable td{
		border:1px solid #ccc;
		height: 35px;
		line-height: 35px;
		color: #000;


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
		/*padding-left: 20px;*/
		text-align: center;
	}
	.lookDetail{
		text-decoration: underline;
		color:#0035bb;
		cursor: pointer;
	}
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
</style>