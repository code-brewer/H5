<template>
	<div class="set-prize-data-view">
		<div class="label-inline">
			<span class="onse">获奖方式：</span>
			<radio name="prizeWay" :model.sync="configData.prizeway" value="false">每日排名</radio>
			<radio name="prizeWay" :model.sync="configData.prizeway" value="true" style="margin-left: 10px;">总排名</radio>
		</div>
		<div class="label-inline" style="align-items:initial">
			<span class="onse">排名设置：</span>
			<div class="form-group" style="height: 505px;overflow-x: hidden;overflow-y: auto;">
				<table class="table table-bordered table-awards" style="text-align: center;background: #fff;width: 485px;margin-bottom: 0px;">
					<tbody>
						<tr>
							<td><span>奖品时间</span></td>
							<td><span>名次</span></td>
							<td><span>奖品</span></td>
							<!-- <td><span>操作</span></td> -->
						</tr>
						<!--每日排名-->
						<tr v-for="(index, item) in selectedList">
							<td v-if="selectedList.length - 1!==index" style="vertical-align:middle;">
								{{item.date}}
							</td>
							<td v-if="selectedList.length - 1 == index" style="vertical-align:middle;">
								{{item.date}}<br/>(总排名)
							</td>
							<td style="padding-left:0;padding-right:0;">
								<ul class="awards-list">
									<li v-for="(i,list) in item.prizeList" class="awards-item">
										<input type="number" class="short-input" v-model="list.starttop" readonly="true">
										<span>名</span> -
										<input type="number" class="short-input" v-model="list.endtop" @blur="checkAwardsTitle(index, i)">
										<span>名</span>
										<a v-if="showPlus(index, i)" class="add-btn">
											<i class="fa fa-plus-square" @click="addAwards(index, i)"></i>
										</a>
										<a v-if="showMinus(index, i)" class="del-btn">
											<i class="fa fa-minus-square" @click="substractAwards(index, i)"></i>
										</a>
									</li>
								</ul>
							</td>
							<td style="padding-left:0;padding-right:0;">
								<ul class="awards-list">
									<li v-for="(i, l) in item.prizeList" class="awards-item" style="text-align:center">
										<a style="line-height:30px" href="javascript:;" @click="addSelectList(index,i)">设置奖品</a>
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
				<snackbar :show.sync="snackbar_active" :message="snackbar_msg" action-text="知道了"></snackbar>
				<modal :show.sync="setPrizeModal" size="lg">
					<div class="modal-user-body" style="padding: 20px;">
						<prize :set-prize="true" :list.sync="List" :selected-list.sync="selectedList" :bdate="configData.starttime" :edate="configData.endtime" :index="index" :child-index="childIndex" :show-prize.sync="setPrizeModal">

						</prize>
					</div>
				</modal>
			</div>
		</div>
	</div>

</template>
<style lang="scss">
	@import "../../css/bootstrap.css";
	@import '../../css/bootstrap/_variables.scss';
	@media (max-width: $screen-lg-min) {
		.table-awards {
			width: 410px!important;
		}
	}
	
	.table-bordered {
		border: 1px solid #ddd;
		.add-btn {
			display: inline-block;
			color: #28b779;
			margin-left: 10px;
			font-size: 18px;
			cursor: pointer;
		}
		.del-btn {
			font-size: 18px;
		}
		.short-input {
			width: 55px;
			text-align: center;
		}
		.fa {
			display: inline-block;
			font: normal normal normal 14px/1 FontAwesome;
			font-size: inherit;
			text-rendering: auto;
			-webkit-font-smoothing: antialiased;
		}
		.awards-list {
			list-style: none;
			padding-left: 0;
			;
			.awards-item {
				text-align: left;
				height: 30px;
				width: 100%;
				padding-left: 8px;
				padding-right: 8px;
				padding-top: 2px;
				border-bottom: 1px solid #DDDDDD;
				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
<script>
	import prize from './prize.vue'
	import snackbar from '../web-base/snackbar'
	import modal from '../bootstrap/Modal'
	import utils from '../../utils/index.js'
	import api from '../../api/index.js'
	import radio from '../web-base/radio'
	export default {
		components: {
			snackbar,
			prize,
			modal,
			radio
		},
		data() {
			var configData = window.store.configData;
			return {
				List: [], //奖品库列表
				setPrizeModal: false, //是否显示奖品设置窗口
				snackbar_active: false,
				snackbar_msg: '',
				index: 0, //设置奖品中的第几个日期下标
				childIndex: 0, //设置奖品中的某个日期下中的某个奖项下标(如2月10号中  第1-10名)下标，必须有上一个index字段
				configData,
				selectedList: window.store.selectList
			}
		},
		watch: {
			'configData.starttime' (value) {
				if(value < this.configData.endtime)
					this.checkAwardsData()
			},
			'configData.endtime' (value) {
				if(value > this.configData.starttime)
					this.checkAwardsData()
			},
			'configData.prizeway' (v) {
				this.checkAwardsData();
			},
			setPrizeModal(v) {
				console.log(v)
			}
		},
		ready() {
			this.$on("setPirzeList", () => {
				this.checkAwardsData();
			});
		},
		events: {
			//接受外面保存信息事件，回传给this.configData.prizeJson对象
			saveSelectedList() {
				var newList = JSON.stringify(this.selectedList);
				newList = JSON.parse(newList);
				for(var i = 0; i < newList.length; i++) {
					var prizeList = newList[i].prizeList;
					for(var j = 0; j < prizeList.length; j++) {
						var gids = prizeList[j].gids;
						for(var k = 0; k < gids.length; k++) {
							var gid = newList[i].prizeList[j].gids[k].gid;
							newList[i].prizeList[j].gids[k] = gid
						}
					}
				}
				this.configData.prizeJson = newList;
			},
			//接受外面修改事件一般用户初始化接收到API数据后生成一个selectedList奖品已选中列表
			changeSelectList(list) {
					this.selectedList = eval(list);
					for(var i = 0; i < this.selectedList.length; i++) {
						var prizeList = this.selectedList[i].prizeList;
						for(var j = 0; j < prizeList.length; j++) {
							var gids = this.selectedList[i].prizeList[j].gids;
							if(gids.length != 0) {
								this.listByGids(gids, i, j);
							} else {
								this.selectedList[i].prizeList[j].gids = [];
							}
						}
					}
				},

			},
			methods: {//根据gids获取到相对应的gid值
			listByGids(list, i, j) {
				var gids = []
				api.listByGids(this, {
					'gids': eval(list).join(",")
				}, (data) => {
					if(data.resCode == "0") {
						this.selectedList[i].prizeList[j].gids = data.repBody;
					}
				});
				return gids;
			},
			/*检查并同步奖项数据与活动页的内容*/
			checkAwardsData() {
				var stime = new Date(this.configData.starttime.split(" ")[0]);
				stime.setHours(0);
				stime.setMinutes(0);
				var endtime = new Date(this.configData.endtime.split(" ")[0]);
				endtime.setHours(0);
				endtime.setMinutes(0);
				var days = Math.ceil((endtime.getTime() - stime.getTime()) / (1000 * 60 * 60 * 24)) + 1;
				//拷贝已选中的list到新对象中
				var copyList = this.selectedList.concat();
				for(var i in copyList) copyList[i].select = false;
				var newList = [];
				//循环赋值到新对象中
				if(this.configData.prizeway == 'false') {
					for(var i = 0; i < days; i++) {
						var newDate = stime;
						if(i != 0) newDate.setDate(stime.getDate() + 1);
						newDate = utils.formatDate(newDate, "yyyy-MM-dd");
						var falg = false;
						for(var j = 0; j < copyList.length; j++) {
							if(copyList[j].date == newDate) {
								copyList[j].select = true;
								falg = true;
								newList.push(this.selectedList[j]);
							}
						}
						if(!falg) {
							newList.push({
								date: newDate,
								prizeList: [{
									endtop: "1",
									gids: [],
									starttop: "1",
									title: ''
								}]
							});
						}
					}
				} else {
					var newDate = stime;
					newDate.setDate(stime.getDate() + (days - 1));
					newDate = utils.formatDate(newDate, "yyyy-MM-dd");
					var falg = false;
					for(var j = 0; j < copyList.length; j++) {
						if(copyList[j].date == newDate) {
							copyList[j].select = true;
							falg = true;
							newList.push(this.selectedList[j]);
						}
					}
					if(!falg) {
						newList.push({
							date: newDate,
							prizeList: [{
								endtop: "1",
								gids: [],
								starttop: "1",
								title: ''
							}]
						});
					}
				}
				//把不是在其他未选中的归还list
				this.selectedList = newList;
				for(var i in copyList) {
					if(!copyList[i].select) {
						for(var j = 0; j < copyList[i].prizeList.length; j++) {
							for(var k = 0; k < copyList[i].prizeList[j].gids.length; k++) {
								copyList[i].prizeList[j].gids[k].select = false;
								this.List.unshift(copyList[i].prizeList[j].gids[k]);
							}
						}
					}
				}
			},
			//设置奖项排名
			checkAwardsTitle(index, i) {
				var from = parseInt(this.selectedList[index].prizeList[i].starttop);
				var to = parseInt(this.selectedList[index].prizeList[i].endtop);
				if(to < 1) {
					this.snackbar_active = true;
					this.snackbar_msg = "名次不能小于1";
					this.selectedList[index].prizeList[i].endtop = from;
					return;
				} else if(to < from) {
					this.snackbar_active = true;
					this.snackbar_msg = "后面名次不能小于前面的名次";
					this.selectedList[index].prizeList[i].endtop = from;
					return;
				}
				//如果是正确的设置奖项时，递增奖项门槛
				if(i < this.selectedList[index].prizeList.length - 1) {
					for(var j = i; j < this.selectedList[index].prizeList.length; j++) {
						if(j + 1 > this.selectedList[index].prizeList.length - 1)
							break;
						this.selectedList[index].prizeList[j + 1].starttop = parseInt(this.selectedList[index].prizeList[j].endtop) + 1;
						if(this.selectedList[index].prizeList[j + 1].endtop > this.selectedList[index].prizeList[j + 1].starttop)
							break;
						this.selectedList[index].list[j + 1].endtop = this.selectedList[index].list[j + 1].starttop;
					}
				}
			},
			//新增某个奖品时候调用
			addSelectList(index, i) {
				if(this.selectedList[index].prizeList[i].endtop == "" || this.selectedList[index].prizeList[i].starttop == "") {
					this.snackbar_active = true;
					this.snackbar_msg = "名次不能为空";
					return;
				}
				this.index = index;
				this.childIndex = i;
				this.setPrizeModal = true;
			},
			//删除某个奖项中的奖品回递
			substractAwards(index, i) {
				for(var j = 0; j < this.selectedList[index].prizeList[i].gids.length; j++) {
					this.selectedList[index].prizeList[i].gids[j].select = false;
					this.List.unshift(this.selectedList[index].prizeList[i].gids[j]);
				}
				this.selectedList[index].prizeList.splice(i, 1);
			},
			//增加奖项 -- 排名
			addAwards(index, i) {
				if(this.selectedList[index].prizeList[i].endtop == '') {
					this.snackbar_active = true;
					this.snackbar_msg = "请填写完整名次";
					return;
				}
				this.selectedList[index].prizeList.push({
					endtop: "",
					gids: [],
					starttop: parseInt(this.selectedList[index].prizeList[i].endtop) + 1,
					title: "1"
				});
			},
			//是否显示加号
			showPlus(index, i) {
				if(i == this.selectedList[index].prizeList.length - 1) {
					return true;
				}
				return false;
			},
			//是否显示减号
			showMinus(index, i) {
				if(i == this.selectedList[index].prizeList.length - 1 && i != 0) {
					return true;
				}
				return false;
			}
		}
	}
</script>