<template>
	<div class="form-group" style="height: 505px;overflow-x: hidden;overflow-y: auto;">
		<div class="label-inline" style="margin-top: 1px;">
			<span class="onse onse-has-red">领奖门槛：</span> {{cillLeft}}
			<input type="number" style="width: 40px;" v-model="cill" v-if="showCill" min='0'/>{{cillRight}}
			<question v-if="showQues">{{quseMsg}}</question>
		</div>
		<div class="label-inline">
			<span class="onse onse-has-red">领奖次数：</span> 每人可以领奖
			<input type="number" style="width: 40px;" v-model="num" v-if="showNum" min='0'/>{{count}}次
		</div>
		<div class="label-inline">
			<span class="onse">活动奖励：</span>
			<table class="table table-bordered table-awards" style="text-align: center;background: #fff;width: 240px;margin-bottom: 0px;">
				<tbody>
					<tr>
						<td>
							<span>奖品</span>
						</td>
					</tr>
					<!--每日排名-->
					<tr>
						<td style="padding-left:0;padding-right:0;">
							<ul class="awards-list">
								<li class="awards-item" style="text-align:center">
									<a style="line-height:30px" href="javascript:;" @click="addSelectList()">设置奖品</a>
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
			<snackbar :show.sync="snackbar_active" :message="snackbar_msg" action-text="知道了"></snackbar>
			<modal :show.sync="setPrizeModal" size="lg">
				<div class="modal-user-body" style="padding: 20px;">
					<prize :type="1" :set-prize="true" :cill="cill" :list.sync="List" :selected-list.sync="selectedList" :show-prize.sync="setPrizeModal">
					</prize>
				</div>
			</modal>
		</div>
	</div>

</template>
<script>
	import prize from './prize.vue'
	import snackbar from '../web-base/snackbar'
	import modal from '../bootstrap/Modal'
	import utils from '../../utils/index.js'
	import api from '../../api/index.js'
	import question from '../web-base/question'
	export default {
		components: {
			snackbar,
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
			var selectedList = window.store.selectList;
			return {
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
				num: 1,
				count: '',
				showNum: false,
				showQues: false,
				quseMsg: '',
				selectedList
			}
		},
		ready() {
			//赋值初始值
			this.selectedList.push({
				'date': "0000-00-00",
				'prizeList': [{
					"endtop": "0",
					"starttop": 1,
					"gids": [],
					"title": ''
				}]
			});
			this.configData.prizeway = "timely";
			if(!window.store.configData.mextbody) return;
			var obj = JSON.parse(window.store.configData.mextbody);
			//设置领降门槛参数
			if(obj.threshold.indexOf("$") != -1) {
				this.showCill = true;
				this.cillRight = obj.threshold.split("$")[1];
				this.cillLeft = obj.threshold.split("$")[0];
			} else {
				this.showCill = false;
				this.cillLeft = obj.threshold;
			}
			if(~~obj.prizenum == 0) {
				this.showNum = true;
			} else {
				this.showNum = false;
				this.count = ~~obj.prizenum;
				this.num = ~~obj.prizenum;
			}
			if(obj.thresholddis.length != 0) {
				this.showQues = true;
				this.quseMsg = obj.thresholddis;
			}
		},
		watch: {
			cill(v) {
				console.log(v)
			}
		},
		methods: {
			addSelectList() {
				this.setPrizeModal = true;
			},
			//根据gids获取到相对应的gid值
			listByGids(list) {
				api.listByGids(this, {
					'gids': eval(list).join(",")
				}, (data) => {
					if(data.resCode == "0") {
						this.selectedList[0].prizeList[this.childIndex].gids = data.repBody;
					}
				});
			},
		},
		events: {
			//预留的接口
			setPirzeList() {

			},
			//接受外面保存信息事件，回传给this.configData.prizeJson对象
			saveSelectedList() {
				var newList = JSON.stringify(this.selectedList);
				newList = JSON.parse(newList);
				for(var i = 0; i < newList.length; i++) {
					var prizeList = newList[i].prizeList;
					for(var j = 0; j < prizeList.length; j++) {
						newList[i].prizeList[j].starttop = ~~this.cill;
						var gids = prizeList[j].gids;
						for(var k = 0; k < gids.length; k++) {
							var gid = newList[i].prizeList[j].gids[k].gid;
							newList[i].prizeList[j].gids[k] = gid
						}
					}
				}
				this.configData.prizeJson = newList;
				this.configData.prizenum = "T_" + this.num;
			},
			//接受外面修改事件一般用户初始化接收到API数据后生成一个selectedList奖品已选中列表
			changeSelectList(list) {
				this.selectedList = eval(list);
				for(var i = 0; i < this.selectedList.length; i++) {
					var prizeList = this.selectedList[i].prizeList;
					for(var j = 0; j < prizeList.length; j++) {
						this.cill = this.selectedList[i].prizeList[j].starttop;
						var gids = this.selectedList[i].prizeList[j].gids;
						if(gids.length != 0) {
							this.listByGids(gids, i, j);
						}else{
							this.selectedList[i].prizeList[j].gids=[];
						}
					}
				}
				this.num = ~~this.configData.prizenum.split("_")[1];
				if(!this.showNum) this.count = ~~this.configData.prizenum.split("_")[1];
			},
		}
	}
</script>
