<template>
	<h1 class="manage">4G开户管理</h1>
	<div class="oneAccount" style="margin: 35px 50px;background-color:#fff;border:1px solid #ccc;"><span style="color:#ff0000;">注：已成功订购的4G用户，才可将车辆信息上传保存，无法使用于为4G用户开户。</span></div>
		<div class="accountBody">
		<div class="oneAccount">批量保存</div>
		<table class="AcountTable">
			<tbody>
				<tr>
					<td class="leftTd">导入文件
					<input class="uploadbox" placeholder="（可传xlsx、xls格式文件）" v-model="addPrizeFileName" style="width:200px;"></input>
					<file-upload name="saveaccount" action="file/import" :auto="true" class="upload-btn"  style="display:inline-block;"></file-upload> <a @click="TableInstanceDel" style="color:#587ebf;cursor:pointer;">表格事例</a>
					</td>
					
				</tr>
				<!-- <tr>
					<td class="leftTd">
						<div style="display:inline-block;position:relative;">
							<input type="checkbox" class="" style="position: absolute;left: 165px;top: 8px;width:22px;" v-model="manydel"  id="nosend1"></input>
							<label  for="nosend1" style="position:relative;display:inline-block;">下发短信告诉用户销户? </label>
						</div>
					</td>
					
				</tr> -->
				
			</tbody>
		</table>
	</div>
	<div style="text-align: center;margin-bottom:30px;">
		<a  class="sub" @click='saveAll'>保存</a>
	</div>
	<modale :show.sync="doubleStatus.showMsg" :msg.sync="doubleStatus.msg">
	 <div class="close"><span  @click="this.doubleStatus.showMsg = false" class="comite"></span></div>
        <div style="padding:0 50px;">
            <p style="line-height:100px;text-align:center;">{{doubleStatus.msg}}</p>
            <a  class="actiontong"  @click='makeSure'>确定</a>
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
	export default {
		components:{
			Modale,
			loading
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
				CodeImg:'../carserve/src/m/images/code.png',
				myPhone:'',           //手机号
				flag:'1',
				num:'',
				onedel:'',
				all:{
					// flag:'1',
					path:''        //excel地址
				},
				manydel:'',
				accountMsg:'',
				addPrizeFileName:'',
				isLoad:false    //加载框
				
			}
		},
		ready(){
			
		},
		created(){
			Vue.component('file-upload', function (resolve) {
			  require(['../js/vue.file-upload.js','../js/vue.pretty-bytes.js'], resolve)
			});
		},
		events: {
	        onFileClick: function(file) {
	          // console.log('onFileClick', file);
	        },
	        onFileChange: function(file) {
	          // console.log('onFileChange', file);
	          // here is where we update our view
	          this.fileProgress = 0;
	          this.allFilesUploaded = false;

	          var reg = /.xlsx|.xls$/;
	          console.log(file)
	          if(reg.test(file[0].name)){
	          	this.addPrizeFileName = file[0].name;
	          }

	        },
	        beforeFileUpload: function(file) {
	          // called when the upload handler is called
	          // console.log('beforeFileUpload', file);
	          this.$dispatch('progress', 1)
	        },
	        afterFileUpload: function(file) {
	          // called after the xhr.send() at the end of the upload handler
	          // console.log('afterFileUpload', file);
	        },
	        onFileProgress: function(progress) {
	          console.log('onFileProgress', progress);
	          // update our progress bar
	          this.fileProgress = progress.percent;
	        },
	        onFileUpload: function(file, res,params) {
	        	console.log("上传传功-->")
	         	if(res.resCode==0) {
	         		this.$dispatch('progress', 0);
	         		if(file._id=="saveaccount") {
	         			console.log(res.repBody)
	         			this.all.path = res.repBody;
	         		}
	         		
	         	}
	        },
	        onFileError: function(file, res) {
	          console.error('onFileError', file, res);
	        },
	        onAllFilesUploaded: function(files) {
	          console.log('onAllFilesUploaded', files);
	          // everything is done!
	          this.allFilesUploaded = true;
	        }
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
			
			saveAll(){
				// if(this.manydel ==true){
				// 	this.all.flag = 0
				// }else{
				// 	this.all.flag = 1
				// }

				if(this.all.path == ""){

					// console.log("kong")
					this.show("请上传文件")
					return;
				}
				this.isLoad = true;
				api.registerfour(this,this.all,(back)=>{
					if(back.resCode=="0"){
						this.isLoad = false;
						this.show(back.repBody);

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
			makeSure(){

				// if(this.accountMsg == '0'){
				// 	this.show("该手机号码尚未开户!");
				// 	return;
				// }
				this.doubleStatus.showMsg = false;
				this.isLoad = true;

				api.cancle(this,{code:this.num,phone:this.myPhone,flag:this.flag},(back)=>{
					if(back.resCode=="0"){
						this.isLoad = false;
						this.show("销户成功!")

					}else{
						this.isLoad = false;
						this.show(back.resMsg)
					}
				})
			},
			TableInstanceDel(){
				window.location.href = basePath +  'file/example?id=4'
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
		padding-left: 20px;
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
</style>