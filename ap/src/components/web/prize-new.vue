<template>
	<div class="prize-view">
		<div class="search">
			<div class="search-div">
				<label>奖品名称：</label>
				<input v-model="pname" class="form-control search-input " :style="{'width':setPrize?'188px':'260px'}" type="text" placeholder="请输入奖品名称进行搜索">
			</div>
			<div class="search-div date-panel" style="width: 50%;" v-show="!setPrize">
				<label>入库时间：</label>
				<datepicker v-ref:dp :value.sync="beginDate" :show-input="false" format="yyyy-MM-dd" placeholder="年-月-日" width="100px"></datepicker> -
				<datepicker v-ref:dp :value.sync="endDate" :show-input="false" format="yyyy-MM-dd" placeholder="年-月-日" width="100px"></datepicker>
			</div>
			<div class="search-div" style="width: 17%;">
				<a class="btn btn-default" @click="allDet" v-show="!setPrize">删除选中</a>
				<a class="btn btn-default" @click="show=true" v-show="!setPrize"> 添加奖品</a>
			</div>
		</div>
		<div class="table-content" style="height: 545px;overflow-y:scroll;">
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>序号</th>
						<th>兑奖券码</th>
						<th>奖品名称</th>
						<th>奖品类型</th>
						<th>兑奖时间</th>
						<th>奖品信息</th>
						<th>领奖备注</th>
						<th v-show="!setPrize">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in List | filterBy pname in 'pname' |Between 'ctime' beginDate endDate | limitBy 50 (pagerConfig.pageNum*50-50) ">
						<td>
							<checkbox :checked="false" :model.sync="item.select"></checkbox>
						</td>
						<td>{{item.sid}}</td>
						<td>{{item.pname}}</td>
						<td>{{item.types}}</td>
						<td>{{ item.startenabled.split(' ')[0] + ' 至 ' + item.endenabled.split(' ')[0] }}</td>
						<td>{{item.des}}</td>
						<td>{{ item.prize_remarks }}</td>
						<td v-show="!setPrize">
							<a class="btn btn-default" @click="del(item.gid),confirmShow=true" role="button">删除</a>
						</td>
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
		<div class="set-prize-btn">
			<a class="btn btn-primary" @click="addSelect" v-show="setPrize">确认</a>
			<a class="btn btn-primary" @click="showPrize=false" v-show="setPrize"> 取消</a>
		</div>
		<modal :show.sync="show" size="md">
			<div class="modal-user-body">
				<div class="modal-title">
					<p>{{title}}</p>
					<button type="button" class="close" @click="show=false"><span aria-hidden="true">&times;</span></button>
				</div>
				<form class="modal-user-box">
					<p>
						<label class="required">奖品名称：</label> <input type="text" v-model="prize.pname" class="form-control" placeholder="请输入奖品名称" name="pname">
					</p>
					<p>
						<label class="required">奖品类型：</label>
						<select class="form-control" v-model="prize.types" style="width: 150px;text-align:center;display: inline-block; z-index: 10;">
							<option :value="list.tid" v-for="list in typeList">{{list.title}}</option>
						</select>
					</p>
					<p>
						<label class="required">兑奖时间：</label>
						<datepicker v-ref:dp :value.sync="prize.startenabled" :show-input="false" format="yyyy-MM-dd" placeholder="年-月-日" width="150px"></datepicker> -
						<datepicker v-ref:dp :value.sync="prize.endenabled" :show-input="false" format="yyyy-MM-dd" placeholder="年-月-日" width="150px"></datepicker>
					</p>

					<p>
						<label class="required">奖品数量：</label>
						<input type="text" class="form-control" v-model="prize.count" placeholder="数量" style="width: 150px;" name="count">
					</p>
					<p>
						<label>奖品信息：</label>
						<input type="text" class="form-control" v-model="prize.des" placeholder="请输入奖品信息" name="des">
					</p>
					<p>
						<label>领奖备注：</label>
						<input type="text" 
                            class="form-control" 
                            v-model="prize.prize_remarks" 
                            placeholder="请输入领奖备注" name="remarks">
					</p>
					<p>
						<label class="required">奖品图片：</label>
						<upload-thumb :img-url.sync="prize.imgurl" :config="uploadConfig"></upload-thumb>
					</p>
					<p>
						<a class="btn btn-primary" @click="save()">保存</a>
					</p>
				</form>
			</div>
		</modal>
		<snackbar :show.sync="is_error" :message="err_msg" action-text="知道了" v-if="!setPrize"></snackbar>
		<confirm :show.sync="confirmConfig.show" :fun-name="confirmConfig.funName">
			<div slot="content">
				{{confirmConfig.msg}}
			</div>
		</confirm>
	</div>
</template>
<script>
    import uploadThumb from '../web-base/uploadThumb'
	import confirm from '../web/confirm'
	import datepicker from '../bootstrap/Datepicker.vue'
	import snackbar from '../web-base/snackbar'
	import modal from '../bootstrap/Modal'
	import dropdown from '../bootstrap/Dropdown.vue'
	import Pager from '../web-base/Pager.vue'
	import Checkbox from '../web-base/checkbox.vue'
	import radio from '../web-base/radio.vue'
	import api from '../../api/index.js'
	export default {
		props: {
			//关于设置奖品的类型：排行，完成时领奖
			type: {
				type: Number,
				default: 0
			},
			//是否是设置奖品，还是奖品库
			setPrize: {
				type: Boolean,
				default: false
			},
			//设置奖品中的第几个日期下标
			index: {
				type: Number
			},
			//设置奖品中的某个日期下中的某个奖项下标(如2月10号中  第1-10名)下标，必须有上一个index字段
			childIndex: {
				type: Number,
				default: 0
			},
			//显示设置奖品窗口
			showPrize: {
				type: Boolean,
				default: false
			},
			//已选中奖品列表
			selectedList: {
				type: Array
			},
			//奖品库列表
			List: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			//默认搜索结束的时间
			var nowTime = new Date();
			nowTime.setDate(nowTime.getDate() + 1)
			nowTime = nowTime.getFullYear() + "-" + ((nowTime.getMonth() + 1).toString().length == 1 ? "0" + (nowTime.getMonth() + 1) : (nowTime.getMonth() + 1)) + "-" + (nowTime.getDate().toString().length == 1 ? "0" + nowTime.getDate() : nowTime.getDate())
			return {
				//需要删除的ID
				confirmConfig: {
					show: false,
					delId: 0,
					msg: '您确定要删除该奖品吗?',
					funName: ''
				},
				filterList: [], //过滤完的列表
				allCheck: false,
				is_error: false,
				pageCheck: false,
				err_msg: "",
				show: false, //新增奖品弹窗
				pname: '', //搜索的奖品名称
				title: '添加奖品', //
				beginDate: '2016-12-01',
				endDate: nowTime,
				isAuto: 'false',
				cashprize: 'true',
				//新增奖品信息
				prize: {
					types: '',
					pname: '',
					count: 1,
					sidPre: '',
					startenabled: "2017-03-01", //奖品有效开始时间  注意格式 后面是00点00分00秒
					endenabled: "2017-04-26", //奖品有效结束时间 注意格式 后面是23点59分59秒
					cashprize: "offline", //offline表示线下兑奖  online表示线上兑奖
					des: ''
				},
				//分页配置信息
				pagerConfig: {
					pageNum: 1,
					pageSize: 50,
					total: 0
				},
				isSuerClick: false, //完成设置奖品时，是否点击确定按钮（确认已选中的奖品）
				typeList: [], //奖品所有的类型
				newList: [], //奖品列表的临时对象(做撤回时用)
				newSelectdList: [], //临时已选中列表(做撤回时用)
				loadListLenght: 0, //获取已选中奖品的长度
				uploadConfig: {
					width: "100%", // 宽度
					height: "200px",
					onlyFile: true,
					fileSize: 5120000, // 上传文件的大小
					multiple: false, // 是否可以多个文件上传
					dragDrop: false, // 是否可以拖动上传文件
					tailor: true, // 是否可以裁剪图片
					del: true, // 是否可以删除文件
					finishDel: false, // 是否在上传文件完成后删除预览
				}
			}
		},
		events: {
			sure(funName) {
				if(funName == "del") {
					this.delFun(this.confirmConfig.delId);
				}
			}
		},
		watch: {
			//全选方法
			allCheck(v) {
				for(var i = 0; i < this.List.length; i++)
					this.List[i].select = v;
			},
			//本页全选
			pageCheck(v) {
				this.selectThisPage(v);
			},
			//显示关闭设置奖品窗口
			showPrize(v) {
				//显示设置奖品，调用相对应的设置奖品类型的方法，进行回递奖品已选中状态
				if(v) {
					this.isSuerClick = false;
					this.addSelectPrize();
				} else {
					//如果是关闭，并且点击不是确认的时候执行，把已选中临时的对象还原回最初值
					if(!this.isSuerClick) {
						this.List = JSON.parse(this.newList);
						this.selectedList = JSON.parse(this.newSelectdList);
					}
					window.store.configData.gidcnt = (~~window.store.configData.firstGidcnt + this.loadListLenght - this.List.length);
					window.store.configData.prize_cnt = (~~window.store.configData.firstPrizeCnt + this.loadListLenght - this.List.length);
				}
			},
			pname() {
				//监听如果搜索框改变就返回到第一页
				this.pagerConfig.pageNum = 1;
			}
		},
		methods: {
			//选中当前页代码
			selectThisPage(v) {
				//求出当前页的位置，然后循环取过滤中的值，改为true,由于是引用对象所以list值也会接受改变
				//注释：filterList之所以有值因为我做了一个自己的过滤指令有把他赋值给这个对象
				var R = this.pagerConfig.pageNum * this.pagerConfig.pageSize,
					L = (this.pagerConfig.pageNum - 1) * this.pagerConfig.pageSize;
				for(var i = 0; i < this.filterList.length; i++) {
					if(L <= i && R > i)
						this.filterList[i].select = v;
				}

			},
			//获取奖品类型API接口
			prizeTypes() {
				this.typeList = [{
					tid: 1,
					title: '实物'
				},
				{
					tid: 2,
					title: '虚拟'
				}]
				this.prize.types = this.typeList[0].tid
				// api.prizeTypes(this, {
				// 	'types': '1'
				// }, (data) => {
				// 	if(data.resCode == 0) {
				// 		this.typeList = data.repBody;
				// 		this.prize.types = this.typeList[0].tid;
				// 	}
				// });
			},
			//完成领奖--新增选中奖品
			immediate() {
				var arr = [],
					l = this.List.length,
					isNewDate = true;
				//把奖品库列表中已选中的奖品，剔除放置在arr对象中
				for(var i = 0; i < l; i++) {
					if(this.List[i].select) {
						arr.push(this.List[i]);
						this.List.splice(i, 1);
						l -= 1;
						i -= 1;
					}
				}
				//循环判断把选中的奖品放置在哪个日期奖项中
				for(var i = 0; i < this.selectedList.length; i++) {
					isNewDate = false;
					var item = this.selectedList[i].prizeList,
						isNewPrize = true;
					for(var j = 0; j < item.length; j++) {
						//判断是否是选中当前日期中的某个选项，如果是的话就把已选中的奖品，设置在相对应的prizeList
						if(item[j].endtop == this.selectedList[0].prizeList[this.childIndex].endtop) {
							isNewPrize = false;
							item[j].gids = arr;
						}
					}
					if(isNewPrize) {
						var obj = {
							"endtop": 0,
							"starttop": 0,
							"gids": arr,
							"title": ''
						}
						item.push(obj)
					}
				}
				var obj = {
					'date': "0000-00-00",
					'prizeList': [{
						"endtop": 0,
						"starttop": 0,
						"gids": arr,
						"title": ''
					}]
				}
				//如果想新的奖项时新增一个奖项进去
				if(isNewDate) this.selectedList.push(obj)
				this.isSuerClick = true;
				this.showPrize = false;
			},
			//每日排行--新增选中奖品
			everyDay() {
				var arr = [],
					l = this.List.length,
					isNewDate = true;
				//把奖品库列表中已选中的奖品，剔除放置在arr对象中
				for(var i = 0; i < l; i++) {
					if(this.List[i].select) {
						arr.push(this.List[i]);
						this.List.splice(i, 1);
						l -= 1;
						i -= 1;
					}
				}
				//循环判断把选中的奖品放置在哪个日期奖项中
				for(var i = 0; i < this.selectedList.length; i++) {
					//判断是否是选中当前日期中的某个选项，如果是的话就把已选中的奖品，设置在相对应的prizeList
					if(this.selectedList[this.index].date == this.selectedList[i].date) {
						isNewDate = false;
						var item = this.selectedList[i].prizeList,
							isNewPrize = true;
						for(var j = 0; j < item.length; j++) {
							if(item[j].endtop == this.selectedList[this.index].prizeList[this.childIndex].endtop) {
								isNewPrize = false;
								item[j].gids = arr;
							}
						}
						var obj = {
							"endtop": 1,
							"starttop": 1,
							"gids": arr,
							"title": ''
						}
						if(isNewPrize) item.push(obj)
					}
				}
				var obj = {
					'date': this.selectedList[this.index].date,
					'prizeList': [{
						"endtop": 1,
						"starttop": 1,
						"gids": arr,
						"title": ''
					}]
				}
				//如果想新的奖项时新增一个奖项进去
				if(isNewDate) this.selectedList.push(obj)
				this.isSuerClick = true;
				this.showPrize = false;
			},
			//确认选中奖品入口
			addSelect() {
				switch(this.type) {
					case 0:
						this.everyDay();
						break;
					case 1:
						this.immediate();
						break;
					default:
				}
			},
			//完成领奖--进入奖品设置还原选中选项
			addImmediatePrize() {
				this.newList = JSON.stringify(this.List); //拷贝出操作前的对象，操作结束后做操作
				this.newSelectdList = JSON.stringify(this.selectedList);
				for(var i = 0; i < this.selectedList.length; i++) {
					var item = this.selectedList[i].prizeList;
					for(var j = 0; j < item.length; j++) {
						if(item[j].starttop == this.selectedList[0].prizeList[this.childIndex].starttop && item[j].gids.length > 0) {
							for(var k = 0; k < item[j].gids.length; k++) {
								item[j].gids[k].select = true;
								this.List.unshift(item[j].gids[k]);
							}
						}
					}
				}
			},
			//每日排行--进入奖品设置还原选中选项
			addEveryDayPrize() {
				this.newList = JSON.stringify(this.List); //拷贝出操作前的对象，操作结束后做操作
				this.newSelectdList = JSON.stringify(this.selectedList);
				for(var i = 0; i < this.selectedList.length; i++) {
					if(this.selectedList[this.index].date == this.selectedList[i].date) {
						var item = this.selectedList[i].prizeList;
						for(var j = 0; j < item.length; j++) {
							if(item[j].starttop == this.selectedList[this.index].prizeList[this.childIndex].starttop && item[j].gids.length > 0) {
								for(var k = 0; k < item[j].gids.length; k++) {
									item[j].gids[k].select = true;
									this.List.unshift(item[j].gids[k]);
								}
							}
						}
					}
				}
			},
			addSelectPrize() {
				switch(this.type) {
					case 0:
						this.addEveryDayPrize();
						break;
					case 1:
						this.addImmediatePrize();
						break;
					default:
						console.log(2)
				}
			},
			//获取奖品库API
			getList() {
				api.getPrizeList(this, {
					"pageNum": 1,
					"pageSize": 10000,
					'pname': null,
					'startTime': '2016-01-01',
					'endTime': '2020-01-01'
				}, (data) => {
					if(data.resCode == 0 && data.repBody.total != 0) {
						//获取成功之后设置选中状态的select字段
						var list = data.repBody.list;
						for(var i = 0; i < list.length; i++) {
							list[i].select = false;
							if(list[i].types == 1) {
								list[i].types = '实物'
							}

							if(list[i].types == 2) {
								list[i].types = '虚拟'
							}
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
			//选中删除
			allDet() {
				var gidItem = "";
				for(var i = 0; i < this.List.length; i++) {
					if(this.List[i].select)
						gidItem += this.List[i].gid + ",";
				}
				if(gidItem.length > 0) {
					this.confirmConfig.delId = gidItem.substring(0, gidItem.length - 1);
					this.confirmConfig.funName = "del";
					this.confirmConfig.show = true;
					this.confirmConfig.msg = "您确定要删除所选中的奖品吗?";
				} else {
					this.is_error = true;
					this.err_msg = "请选中要删除的奖品列表";
				}
			},
			//单个删除
			del(gid) {
				this.confirmConfig.delId = gid;
				this.confirmConfig.msg = "您确定要删除该奖品吗?";
				this.confirmConfig.funName = "del";
				this.confirmConfig.show = true;
			},
			delFun(gid) {
				api.bathDelPrize(this, {
					'gid': gid
				}, (data) => {
					if(data.resCode == "0") {
						this.getList();
					}
				});
			},
			//验证新增奖品时调用
			validator() {
				if(this.prize.pname.length > 15 || this.prize.pname.length == 0) {
					this.is_error = true;
					this.err_msg = "奖品名称必须小于15大于0字符";
					return false;
				}
				if(~~this.prize.count <= 0 || ~~this.prize.count > 500) {
					this.is_error = true;
					this.err_msg = "奖品数量不能小于0或者大于500份";
					return false;
				}
				if(this.prize.startenabled > this.prize.endenabled) {
					this.is_error = true;
					this.err_msg = "兑奖开始时间不能大于兑奖结束时间";
					return false;
				}
				if(!this.prize.imgurl) {
					this.is_error = true;
					this.err_msg = "请上传奖品图片";
					return false;
				}
				if(this.cashprize == "true")
					this.prize.cashprize = "offline";
				else
					this.prize.cashprize = "online";
				return true;
			},
			//保存奖品
			save() {
				var that = this;
				if(!this.validator()) return;
				if(this.isAuto) this.prize.sidPre = "";
				api.addOrUpdatePrize(this, this.prize, (data) => {
					if(data.resCode == "0") {
						that.getList();
						this.show = false;
						this.err_msg = data.resMsg;
						this.is_error = true;
					}
				});
			}
		},
		ready() {
			//获取奖品库列表，与获取奖品类型
			this.getList();
			this.prizeTypes();
			var timestamp = Date.parse(new Date()),
				timestamp2 = Date.parse(new Date()) + (7 * 24 * 60 * 60 * 1000);
			var myDate = new Date(timestamp);
			var myDate2 = new Date(timestamp2);
			//开始时间
			var year = myDate.getFullYear(), //获取完整的年份
				month = (myDate.getMonth() > 8 ? '' : '0') + (myDate.getMonth() + 1), //获取当前月份
				day = (myDate.getDate() > 9 ? '' : '0') + myDate.getDate(), //获取当前日
				//结束时间
				year2 = myDate2.getFullYear(), //获取完整的年份
				month2 = (myDate2.getMonth() > 8 ? '' : '0') + (myDate2.getMonth() + 1), //获取当前月份
				day2 = (myDate2.getDate() > 9 ? '' : '0') + myDate2.getDate(); //获取当前日
			this.prize.startenabled = year + '-' + month + '-' + day;
			this.prize.endenabled = year2 + '-' + month2 + '-' + day2;

		},
		components: {
			datepicker,
			dropdown,
			Pager,
			modal,
			Checkbox,
			snackbar,
			confirm,
			radio,
            uploadThumb
		}
	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.prize-view {
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
		.set-prize-btn {
			text-align: center;
			a {
				width: 100px;
				margin: 0px 10px;
			}
		}
		.modal-user-body {
			position: relative;
			.modal-user-box {
				width: 490px;
				margin: 60px auto;
				label {
					float: left;
					margin-top: 5px;
					width: 90px !important;
					text-align: right;

					&.required::before {
						content: '*';
						color: red;
						display: inline-block;
						font-size: 1.1em;
					}
				}
				input {
					width: 400px;
					display: inline-block;
				}
				a {
					margin-left: 90px!important;
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
			height: 530px;
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
			padding-top: 30px;
			margin-bottom: 15px;
			.search-div {
				font-size: 14px;
				vertical-align: top;
				width: 33%;
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
		.prize-view {
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