<template>
	<div class="form-group" style="height: 505px;overflow-x: hidden;overflow-y: auto;">
		<div class="label-inline" style="margin-top: 1px;">
			<span class="onse onse-has-red">抽奖门槛：</span> 用户进入活动页面
		</div>
		<div class="label-inline">
			<span class="onse onse-has-red">总抽奖机会：</span>

			<radio :model.sync="chanceIsTop" style="margin-right: 15px;" name="chancetop" value="no">不限</radio>
			<radio :model.sync="chanceIsTop" name="chancetop" value="yes">限制</radio>
			<label style="margin-left: 15px;" v-if="chanceIsTop=='yes'">每人每日有<input type="number" style="width: 40px;margin: 0 5px;" v-model="chanceNum" />次抽奖机会</label>

		</div>
		<div class="label-inline">
			<span class="onse onse-has-red">每人中奖次数：</span> 每人最多可中奖
			<input type="number" style="width: 40px;margin: 0 5px;" v-model="prizeNum" />次
		</div>
		<div class="label-inline">
			<span class="onse">活动奖励：</span>
			<table class="table table-bordered table-awards table-middle" style="text-align: center;background: #fff;width: 80%;margin-bottom: 0px;">
				<tbody>
					<tr>
						<td>
							<span>奖励名称</span>
						</td>
						<td>
							<span>中奖概率</span>
						</td>
						<td>
							<span>奖品</span>
						</td>

					</tr>

					<tr v-for="item in selectedList[0].prizeList">
						<td><span>{{item.title}}</span></td>
						<td><span><input type="number" style="width: 40px;" v-model="item.winrate" />%</span></td>
						<td style="padding-left:0;padding-right:0;">
							<ul class="awards-list">
								<li class="awards-item" style="text-align:center">
									<a style="line-height:30px" href="javascript:;" @click="addSelectList($index)">设置奖品</a>
								</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td><span>谢谢参与</span></td>
						<td></td>
						<td><span>无</span></td>
					</tr>
				</tbody>
			</table>
			<snackbar :show.sync="snackbar_active" :message="snackbar_msg" action-text="知道了"></snackbar>
			<modal :show.sync="setPrizeModal" size="lg">
				<div class="modal-user-body" style="padding: 20px;">
					<prize :set-prize="true" :list.sync="List" :selected-list.sync="selectedList" :index="index" :child-index="childIndex" :show-prize.sync="setPrizeModal"></prize>
				</div>
			</modal>
		</div>
	</div>

</template>
<script>
	import prize from './prize.vue'
	import snackbar from '../web-base/snackbar'
	import checkbox from '../web-base/checkbox'
	import radio from '../web-base/radio'
	import modal from '../bootstrap/Modal'
	import utils from '../../utils/index.js'
	import api from '../../api/index.js'
	import question from '../web-base/question'
	export default {
		components: {
			snackbar,
			checkbox,
			radio,
			prize,
			modal,
			question
		},
		props: {
			beginDate: {
				type: String
			},
			endDate: {
				type: String,
			},
			prizeWay: {
				type: String,
				default: 'false'
			}
		},
		data() {
			var configData = window.store.configData;
			// 初始化奖品列表数据
			if(window.store.selectList.length == 0) {
				var obj = {
					date: "0000-00-00",
					prizeList: [{
						title: '一等奖',
						starttop: 1,
						endtop: 1,
						gids: [],
						winrate: 1
					}, {
						title: '二等奖',
						starttop: 2,
						endtop: 2,
						gids: [],
						winrate: 3
					}, {
						title: '三等奖',
						starttop: 3,
						endtop: 3,
						gids: [],
						winrate: 10
					}, ]
				}
				window.store.selectList.push(obj);
			}
			var selectedList = window.store.selectList;
			return {
				// 奖品库全部条目
				List: [],
				setPrizeModal: false,
				snackbar_active: false,
				snackbar_msg: '',
				index: 0,
				childIndex: 0,
				configData,
				cill: "1",
				cillLeft: '',
				cillRight: '',
				showCill: false,
				count: '',
				showQues: false,
				quseMsg: '',
				selectedList,
				// 抽奖机会是否限制
				chanceIsTop: 'no',
				// 抽奖机会次数
				chanceNum: 0,

				// 最多抽奖次数
				prizeNum: 3
			}
		},
		ready() {
			var obj = JSON.parse(window.store.configData.mextbody);
			if(obj.threshold.indexOf("$") != -1) {
				this.showCill = true;
				this.cillRight = obj.threshold.split("$")[1];
				this.cillLeft = obj.threshold.split("$")[0];
			} else {
				this.showCill = false;
				this.cillLeft = obj.threshold;
			}

			if(obj.thresholddis.length != 0) {
				this.showQues = true;
				this.quseMsg = obj.thresholddis;
			}
			this.configData.prizeway = "luckdraw";
		},
		methods: {
			// 根据ID获取已选择奖品列表
			listByGids(list, i) {
				api.listByGids(this, {
					'gids': eval(list).join(",")
				}, (data) => {
					if(data.resCode == "0") {
						this.selectedList[0].prizeList[i].gids = data.repBody;
					}
				});
			},
			addSelectList(i) {
				this.childIndex = i;
				this.setPrizeModal = true;
			},
		},
		events: {
			// 缓存保存已选中的奖品
			saveSelectedList() {
				var newList = JSON.stringify(this.selectedList);
				newList = JSON.parse(newList);
				var prizeList = newList[0].prizeList;
				for(var j = 0; j < prizeList.length; j++) {
					newList[0].prizeList[j].starttop = prizeList[j].starttop;
					var gids = prizeList[j].gids;
					newList[0].prizeList[j].winrate = prizeList[j].winrate;
					for(var k = 0; k < gids.length; k++) {
						var gid = newList[0].prizeList[j].gids[k].gid;
						newList[0].prizeList[j].gids[k] = gid
					}
				}
				if(newList.length == 1) {
					var newObj = {
						"date": "1111-11-11",
						"prizeList": [{
							"title": "门槛",
							"starttop": 0,
							"endtop": 0,
							"gids": []
						}]
					};
					newList.push(newObj);
				}
				this.configData.prizeJson = newList;
				this.configData.prizenum = "T_" + this.prizeNum;
				console.log(this.chanceIsTop);
				if(this.chanceIsTop == "yes") {
					this.chanceNum
				}
				this.configData.player = [this.chanceIsTop == "yes" ? "W_" + this.chanceNum : 'W'];
			},
			// 初始化编辑已选中奖品列表
			changeSelectList(list) {
				this.selectedList = eval(list);
				var prizeList = this.selectedList[0].prizeList;
				for(var j = 0; j < prizeList.length; j++) {
					this.cill = this.selectedList[0].prizeList[j].starttop;
					var gids = this.selectedList[0].prizeList[j].gids;
					if(gids.length != 0) {
						this.listByGids(gids, j);
					} else {
						this.selectedList[0].prizeList[j].gids = [];
					}
				}
				this.selectedList[1].prizeList[0].gids = [];
				var playerArr = this.configData.player[0].split('_')
				if(playerArr[1]) {
					this.chanceIsTop = 'yes'
					this.chanceNum = playerArr[1]
				} else {
					this.chanceIsTop = 'no'
				}
				this.prizeNum = ~~this.configData.prizenum.split("_")[1];
			},
		}
	}
</script>