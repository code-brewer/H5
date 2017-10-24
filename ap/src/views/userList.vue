<template>
	<div class="userList-view">
		<div class="container">
			<div class="title">
				用户列表
			</div>
			<div class="content">
				<div class="search">
					<div class="search-div">
						<label>账号：</label><input v-model="modacct" class="form-control" style="width: 300px;display: inline-block;" type="text" placeholder="请输入账号进行搜索">
					</div>
					<div class="search-div">
						<!--<label>账号：</label>
	 	 				     <dropdown>
						        <button type="button" class="btn btn-default" data-toggle="dropdown" style="width: 100px;">
						          		全部
						          <span class="caret"></span>
						        </button>
						        <ul name="dropdown-menu" class="dropdown-menu">
						          <li><a href="#">全部</a></li>
						          <li><a href="#">全部</a></li>
						          <li><a href="#">全部</a></li>
						        </ul>
						     </dropdown>-->
						<a class="btn btn-primary" style="width: 90px;margin-left: 40px;" @click="getList()">搜索</a>
					</div>
					<div class="search-div">
						<a class="btn btn-default" @click="add()"> 添加账号</a>
					</div>
				</div>
				<div class="table-content">
					<table class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>账号</th>
								<th>手机号</th>
								<th>邮箱</th>
								<th>角色</th>
								<th>注册时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="list in userList">
								<td>{{list.acct}}</td>
								<td>{{list.tal}}</td>
								<td>{{list.email}}</td>
								<td>{{list.level=='1'?'超级用户':list.level=='2'?'高级用户':'普通用户'}}</td>
								<!--					 <td>{{['超级用户','高级会员','普通会员'][(~~list.level)-1]}}</td>-->
								<td>{{list.ctime}}</td>
								<td>
									<a class="btn btn-default" @click="edit(list.acct,list.rn)" role="button">编辑</a>
									<a class="btn btn-default" @click="disabled(list.acct,list.status)" role="button">{{list.status=='1'?'禁用':'启用'}}</a>
									<a class="btn btn-default" @click="del(list.acct)" role="button">删除</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="page">
					<pager :total="pagerConfig.total" :pagenum.sync="pagerConfig.pageNum"></pager>
				</div>
			</div>
			<modal :show.sync="show" size="md">
				<div class="modal-user-body">
					<div class="modal-title">
						<p>{{title}}</p>
						<button type="button" class="close" @click="show=false"><span aria-hidden="true">&times;</span></button>
					</div>
					<form class="modal-user-box">
						<p>
							<label>账号：</label> <input :disabled="!showPwd" v-model="user.acct" type="text" class="form-control" placeholder="请输入您的账号" name="account">
						</p>
						<p v-show="showPwd">
							<label>密码：</label> <input type="password" v-model="user.pass" class="form-control" placeholder="请输入您的密码" name="account">
						</p>
						<p>
							<label>角色：</label>
							<checkbox :value.snyc="puser" :checked="true" :disabled="true">高级用户</checkbox>
						</p>
						<p>
							<label>手机号：</label> <input maxlength="11" type="text" v-model="user.tal" class="form-control" placeholder="请输入手机号" name="account">
						</p>
						<p>
							<label>邮箱：</label> <input type="text" v-model="user.email" class="form-control" placeholder="请输入您的邮箱" name="account">
						</p>
						<p>
							<a class="btn btn-primary" @click="save()">保存</a>
						</p>
					</form>
				</div>
			</modal>
			<snackbar :show.sync="is_error" :message="err_msg" action-text="知道了"></snackbar>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../css/bootstrap/_variables.scss';
	.userList-view {
		width: 100%;
		background-color: #f1f4f5;
		.container {
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
			.content {
				height: 790px;
				width: 100%;
				padding: 0px 60px;
				background-color: #fff;
				box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
				.table-content {
					height: 530px;
					.table> tbody> tr> td {
						line-height: 2!important;
						text-align: center;
					}
					th {
						text-align: center;
					}
				}
				.search {
					width: 100%;
					list-style: none;
					padding-top: 30px;
					margin-bottom: 15px;
					.search-div {
						width: 33%;
						display: inline-block;
						&:last-child {
							text-align: right;
						}
						@media (max-width: $screen-lg-min) {
							.form-control {
								width: 225px!important;
							}
						}
					}
				}
				.page {
					text-align: right;
				}
			}
		}
	}
</style>
<script>
	import snackbar from '../components/web-base/snackbar'
	import modal from '../components/bootstrap/Modal'
	import dropdown from '../components/bootstrap/Dropdown.vue'
	import Pager from '../components/web-base/Pager.vue'
	import Checkbox from '../components/web-base/checkbox.vue'
	import api from '../api/index.js'
	export default {
		data() {
				return {
					is_error: false,
					err_msg: "",
					show: false,
					modacct: '',
					pagerConfig: {
						pageNum: 1,
						pageSize: 10,
						total: 3
					},
					puser: true,
					showPwd: false,
					title: '添加用户',
					user: {
						tal: '',
						email: '',
						level: '',
						acct: '',
						pass: ''
					},
					userList: [],
				}
			},
			watch: {
				'pagerConfig.pageNum' () {
					this.getList();
				},
			},
			methods: {
				add() {
					this.user = {};
					this.show = true
					this.showPwd = true;
					this.title = "添加用户";
				},
				getList() {
					var that = this;
					api.queUsers(this, {
						"pageNum": that.pagerConfig.pageNum,
						"pageSize": that.pagerConfig.pageSize,
						"modacct": that.modacct
					}, (back) => {
						if(back.resCode == 0 && back.repBody.total != 0) {
							that.userList = back.repBody.list;
							that.pagerConfig.total = back.repBody.total;
						} else if(back.resCode == 0 && back.repBody.total == 0) {
							that.userList = [];
							that.pagerConfig.total = 0;
						} else {
							that.pagerConfig.total = 0;
							that.userList = back.repBody.list;
							that.err_msg = back.resMsg;
							that.is_error = true;
						}

					});
				},
				edit(acct, id) {
					for(var i = 0; i < this.userList.length; i++) {
						if(this.userList[i].rn == id) {
							this.user = JSON.parse(JSON.stringify(this.userList[i]));
						}
					}
					this.title = "编辑用户";
					this.showPwd = false;
					this.show = true;
				},
				del(acct) {
					var that = this;
					api.modUserStatus(this, {
						"stauts": 2,
						"modacct": acct
					}, (back) => {
						if(back.resCode == 0) {
							that.getList();
						} else {
							that.err_msg = back.resMsg;
							that.is_error = true;
						}
					});
				},
				disabled(acct, status) {
					var that = this;
					api.modUserStatus(this, {
						"stauts": status == 1 ? 3 : 1,
						"modacct": acct
					}, (back) => {
						if(back.resCode == 0) {
							that.getList();
						} else {
							that.err_msg = back.resMsg;
							that.is_error = true;
						}
					});
				},
				save() {
					var that = this;
					if(that.user.acct == "" || that.user.acct == undefined){
						that.is_error = true;
						that.err_msg = "账号不能为空";
						return;
						
					}
					if(that.user.pass == ""){
						that.is_error = true;
						that.err_msg = "密码不能为空";
						return;
						
					}
					var reg = /^1[3|4|5|7|8]\d{9}$/;

					if(!reg.test(that.user.tal)) {
						that.is_error = true;
						that.err_msg = "请输入正确的手机号";
						return;
					}
					reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
					if(!reg.test(that.user.email)) {
						that.is_error = true;
						that.err_msg = "请输入正确的邮箱";
						return;
					}
					var level = that.puser ? "2" : "1";
					if(that.showPwd) {
						api.updateUserInfo(this, {
							"oper": 2,
							"pass": that.user.pass,
							"modacct": that.user.acct,
							"level": level,
							"tal": that.user.tal,
							"email": that.user.email
						}, (back) => {
							if(back.resCode == 0) {
								that.show = false;
								that.getList();
							} else {
								that.err_msg = back.resMsg;
								that.is_error = true;
							}
						});
					} else {
						api.updateUserInfo(this, {
							"oper": 1,
							"modacct": that.user.acct,
							"level": level,
							"tal": that.user.tal,
							"email": that.user.email
						}, (back) => {
							if(back.resCode == 0) {
								that.show = false;
								that.getList();
							} else {
								that.err_msg = back.resMsg;
								that.is_error = true;
							}

						});
					}

				}
			},
			ready() {
				this.getList();
			},
			components: {
				dropdown,
				Pager,
				modal,
				Checkbox,
				snackbar
			}
	}
</script>