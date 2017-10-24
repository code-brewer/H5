<template>
	<modal :show.sync="showQuestion" size="lg">
		<div class="modal-header">
			<a class="close" @click="showQuestion=false">×</a>
		</div>
		<ul class="tabs-panel">
			<li :class="{'selected':tabsIndex==0}" @click="tabsIndex=0">
				题库
			</li>
			<li @click="tabsIndex=1" :class="{'selected':tabsIndex==1}">
				自定义题目
			</li>
		</ul>
		<!--
        	作者：909559682@qq.com
        	时间：2016-11-01
        	描述：标准题库
        -->
		<div class="question-bank-view" v-if="tabsIndex==0">
			<!--<div class="search">
				<div class="search-div">
					<label>题目类型：</label>
					<select class="form-control" style="width: 150px;text-align:center;display: inline-block;">
						<option>中秋</option>
					</select>
				</div>
			</div>-->
			<div class="table-content">
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th>序号 </th>
							<th>类型</th>
							<th>题目</th>
							<th>选项1</th>
							<th>选项2</th>
							<th>选项3</th>
							<th>选项4</th>
							<th>正确答案</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in List | limitBy 50 (pagerConfig.pageNum*50-50)|GetfilterList 'pagerConfig' 'filterList'">
							<td>
								<checkbox :checked="false" :model.sync="item.select"></checkbox>
							</td>
							<td>{{item.motive}}</td>
							<td>{{item.title}}</td>
							<td>{{item.options[0]?item.options[0].title:''}}</td>
							<td>{{item.options[1]?item.options[1].title:''}}</td>
							<td>{{item.options[2]?item.options[2].title:''}}</td>
							<td>{{item.options[3]?item.options[3].title:''}}</td>
							<td>{{item.rightkey}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-bottom">
				<div class="checked-btn">
					<checkbox :model.sync="allCheck">全选</checkbox>
					<checkbox :model.sync="pageCheck">本页全选</checkbox>
				</div>
				<div class="page">
					<pager :total.sync="pagerConfig.total" :pagenum.sync="pagerConfig.pageNum" :pagesize="pagerConfig.pageSize"></pager>
				</div>
			</div>

		</div>
		<!--
        	作者：909559682@qq.com
        	时间：2016-11-01
        	描述：自定义题库
        -->
		<div class="question-bank-view  custom" v-if="tabsIndex==1">
			<div class="table-content">
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th>题目</th>
							<th>选项1</th>
							<th>选项2</th>
							<th>选项3</th>
							<th>选项4</th>
							<th style="width: 50px;">答案</th>
							<th style="width: 50px;">操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in customList | limitBy 5 (pagerConfigCustom.pageNum*5-5) ">
							<td>{{item.title}}</td>
							<td>{{item.options[0]?item.options[0].title:''}}</td>
							<td>{{item.options[1]?item.options[1].title:''}}</td>
							<td>{{item.options[2]?item.options[2].title:''}}</td>
							<td>{{item.options[3]?item.options[3].title:''}}</td>
							<td>{{item.rightkey}}</td>
							<td @click="delCustom($index)">删除</td>
						</tr>
						<tr class="addInfo" v-if="showAdd">
							<td><input type="text" v-model="customInfo.title" /></td>
							<td><input type="text" v-model="customInfo.options[0].title" /></td>
							<td><input type="text" v-model="customInfo.options[1].title" /></td>
							<td><input type="text" v-model="customInfo.options[2].title" /></td>
							<td><input type="text" v-model="customInfo.options[3].title" /></td>
							<td><input type="text" v-model="customInfo.rightkey" /></td>
							<td style="height: 38px;"></td>
						</tr>
						<tr style="background-color: #b7c8d6; text-align: center;line-height: 2;">
							<td colspan="8" @click="addCustomList">添加题目</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-bottom">
				<div class="page" style="width: 100%;">
					<pager :total.sync="pagerConfigCustom.total" :pagenum.sync="pagerConfigCustom.pageNum" :pagesize="pagerConfigCustom.pageSize"></pager>
				</div>
			</div>

		</div>
		<div class="set-question-btn">
			<a class="btn btn-primary" v-show="tabsIndex==0" @click="save">确认</a>
			<a class="btn btn-primary" v-show="tabsIndex==0" @click="showQuestion=false"> 取消</a>
			<a class="btn btn-primary" v-show="tabsIndex==1" @click="saveCustomList">保存</a>
		</div>
		<div class="msg-ts" v-show="showMsg">{{msg}}</div>
	</modal>
</template>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.custom {
		.addInfo {
			td {
				padding: 0;
				height: 100%;
				input {
					padding: 0;
					border: 0;
					height: 100%;
					width: 100%;
					text-align: center;
					color: #ccc;
				}
			}
		}
	}
	
	.msg-ts {
		position: fixed;
		z-index: 10;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.48);
		min-width: 120px;
		min-height: 100px;
		border-radius: 5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, 0);
		text-align: center;
		line-height: 100px;
	}
	
	.modal-header {
		background-color: #419ce9;
		height: 40px;
		position: relative;
		border: 0;
		.close {
			position: absolute;
			right: 10px;
			top: 10px;
			color: #fff;
			opacity: 1;
		}
	}
	
	.tabs-panel {
		background-color: #B7C9D7;
		height: 60px;
		width: 100%;
		list-style: none;
		padding-left: 0;
		line-height: 60px;
		font-size: 22px;
		li {
			text-align: center;
			color: #D9E1E9;
			width: 160px;
			height: 100%;
			display: inline-block
		}
		.selected {
			color: #419CE9;
			background-color: #fff;
		}
	}
	
	.set-question-btn {
		text-align: center;
		margin-bottom: 20px;
		a {
			width: 100px;
			margin: 0px 10px;
		}
	}
	
	.question-bank-view {
		padding: 0px 40px;
		.table-bottom {
			width: 100%;
			font-size: 0px;
			.checked-btn {
				width: 20%;
				font-size: 14px;
				display: inline-block;
				vertical-align: top;
				margin-top: 20px;
			}
			.page {
				width: 80%;
				font-size: 14px;
				display: inline-block;
			}
		}
		.modal-user-body {
			position: relative;
			.modal-user-box {
				width: 490px;
				margin: 60px auto;
				label {
					width: 70px;
					text-align: right;
				}
				input {
					width: 400px;
					display: inline-block;
				}
				a {
					margin-left: 74px!important;
				}
				.checkbox-ripple {
					width: 80px;
				}
			}
			.modal-title {
				height: 40px;
				background-color: #419ce9;
				text-align: center;
				p {
					color: #fff;
					line-height: 40px;
				}
				button {
					margin: -40px 20px 0px 0px;
					color: #fff;
					opacity: .9;
				}
			}
		}
		.title {
			height: 86px;
			font-size: 12px;
			text-indent: 10px;
			line-height: 11;
		}
		.table-content {
			.table>tbody>tr>td {
				line-height: 2!important;
				text-align: center;
			}
			th {
				text-align: center;
			}
		}
		.search {
			font-size: 0;
			width: 100%;
			list-style: none;
			margin: 20px 0px;
			.search-div {
				font-size: 14px;
				vertical-align: top;
				display: inline-block;
				.search-input {
					width: 260px;
					display: inline-block;
				}
				&:last-child {
					text-align: right;
				}
			}
		}
		.page {
			text-align: right;
		}
	}
	
	@media (max-width: 1300px) {
		.question-view {
			.date-panel {
				width: 41.5%!important;
			}
			.search-div {
				.search-input {
					width: 188px!important;
				}
				&:last-child {
					width: 25% !important;
				}
			}
		}
	}
</style>
<script>
	import modal from '../bootstrap/Modal'
	import snackbar from '../web-base/snackbar'
	import Pager from '../web-base/Pager.vue'
	import Checkbox from '../web-base/checkbox.vue'
	import api from '../../api/index.js'
	import radio from '../web-base/radio.vue'
	export default {
		props: {
			showQuestion: {
				type: Boolean,
				default: false
			},
		},
		data() {
			var configData = window.store.configData;
			return {
				showAdd: true,
				filterList: [],
				configData,
				customList: [],
				customInfo: {
					title: "", //题目标题
					options: [{
						title: ""
					}, {
						title: ""
					}, {
						title: ""
					}, {
						title: ""
					}],
					rightkey: "", //正确答案
				},
				tabsIndex: 0,
				List: [{
					"id": 1, //ID
					"motive": "中秋节", //题目主题
					"title": "中秋节中秋节中秋节", //题目标题
					"options": "", //选项jso体
					"rightkey": "1", //正确答案
					"rn": "1", //序号
				}],
				copyList: [],
				allCheck: false,
				pageCheck: false,
				show: false,
				pagerConfig: {
					pageNum: 1,
					pageSize: 5,
					total: 0
				},
				pagerConfigCustom: {
					pageNum: 1,
					pageSize: 5,
					total: 0
				},
				msg: "",
				showMsg: false,
				isSuerClick: false
			}
		},
		watch: {
			showMsg(v) {
				if(v) {
					setTimeout(() => {
						this.showMsg = false;
					}, 2000)
				}
			},
			allCheck(v) {
				for(var i = 0; i < this.List.length; i++)
					this.List[i].select = v;
			},
			pageCheck(v) {
				this.selectThisPage(v);
			},
			showQuestion(v) {
				if(v) {
					this.isSuerClick = false;
					this.copyList = JSON.parse(JSON.stringify(this.List));
				} else {
					if(!this.isSuerClick) {
						this.List = JSON.parse(JSON.stringify(this.copyList));
					}
				}
			},
			'configData.aid' (v) {
				this.questList();
				this.init();
			}
		},
		methods: {
			save() {
				this.isSuerClick = true;
				this.showQuestion = false;
				this.configData.quests = this.getQuests();
				this.configData.qids = this.getQids();
			},
			getQuests() {
				var list = JSON.parse(JSON.stringify(this.customList));
				for(var i = 0; i < list.length; i++) {
					list[i].options = JSON.stringify(list[i].options);
				}
				return list;
			},
			setQuests() {
				var list = JSON.parse(JSON.stringify(this.configData.quests));
				for(var i = 0; i < list.length; i++) {
					list[i].options = JSON.parse(list[i].options);
				}
				this.pagerConfigCustom.total = list.length;
				return list;
			},
			getQids() {
				var qids = "";
				for(var i = 0; i < this.List.length; i++) {
					if(this.List[i].select) {
						qids += (this.List[i].id + "_");
					}
				}
				if(qids.indexOf("_") != -1) {
					qids = qids.substring(0, qids.length - 1);
				}
				return qids;
			},
			delCustom(i) {
				this.customList.splice(i, 1);
				this.pagerConfigCustom.total -= 1;
			},
			selectThisPage(v) {
				var R = this.pagerConfig.pageNum * this.pagerConfig.pageSize,
					L = (this.pagerConfig.pageNum - 1) * this.pagerConfig.pageSize;
				for(var i = 0; i < this.filterList.length; i++) {
					if(L <= i && R > i)
						this.filterList[i].select = v;
				}
			},
			questList() {
				api.questList(this, {
					"pageNum": 1,
					"pageSize": 10000,
					'motive': '中秋节' //题目主题
				}, (data) => {
					if(data.resCode == 0 && data.repBody.total != 0) {
						var list = data.repBody.list,
							item = this.configData.qids ? this.configData.qids.split("_") : [],
							isTrue;
						for(var i = 0; i < list.length; i++) {
							isTrue = false
							for(var j = 0; j < item.length; j++) {
								if(item[j] == list[i].id)
									isTrue = true;
							}
							list[i].select = isTrue;
							list[i].options = JSON.parse(list[i].options);
						}
						this.List = list;
						this.pagerConfig.pageNum = 1,
							this.pagerConfig.total = data.repBody.total;
					} else if(data.resCode == 0 && data.repBody.total == 0) {
						this.List = [];
						this.pagerConfig.total = 0;
					} else {
						this.pagerConfig.total = 0;
						this.List = data.repBody.list;
						this.err_msg = data.resMsg;
						this.is_error = true;
					}
					this.loadListLenght = this.List.length;
				});
			},
			clearCustomInfo() {
				this.pagerConfigCustom.total += 1;
				this.customInfo.title = "";
				this.customInfo.options[0].title = "";
				this.customInfo.options[1].title = "";
				this.customInfo.options[2].title = "";
				this.customInfo.options[3].title = "";
				this.customInfo.rightkey = "";
			},
			addCustomList() {
				if(!this.showAdd) {
					this.showAdd = true;
					return;
				}
				if(this.checkCustomInfo()) {
					var info = JSON.parse(JSON.stringify(this.customInfo))
					this.customList.push(info);
					this.clearCustomInfo();
					return true;
				}
				return false;
			},
			saveCustomList() {
				if(this.addCustomList()) {
					this.showAdd = false;
				}
				this.save();
			},
			checkCustomInfo() {
				if(this.customInfo.title.length == 0) {
					this.msg = "题目不能为空";
					this.showMsg = true;
					return false;
				}
				if(this.customInfo.options[0].title.length == 0) {
					this.msg = "选项1不能为空";
					this.showMsg = true;
					return false;
				}
				if(this.customInfo.options[1].title.length == 0) {
					this.msg = "选项2不能为空";
					this.showMsg = true;
					return false;
				}
				if(this.customInfo.options[2].title.length == 0) {
					this.msg = "选项3不能为空";
					this.showMsg = true;
					return false;
				}
				if(this.customInfo.options[3].title.length == 0) {
					this.msg = "选项4不能为空";
					this.showMsg = true;
					return false;
				}
				if(this.customInfo.rightkey.length == 0) {
					this.msg = "答案不能为空";
					this.showMsg = true;
					return false;
				}
				return true;
			},
			init() {
				if(this.configData.quests) {
					this.customList = this.setQuests();
				}
			}
		},
		ready() {
			console.log(23123123);
			this.questList();
		},
		components: {
			Pager,
			modal,
			Checkbox,
			snackbar,
			radio
		}
	}
</script>