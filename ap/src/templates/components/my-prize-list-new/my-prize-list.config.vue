<template>
	<div class="app-view view-prizes"
	     :style="{'background-image':activityConfig.prizeList.bgUrl?'url('+activityConfig.prizeList.bgUrl+')':1,'background-color':activityConfig.common.bg}">
		<!-- <div class="menu">
		        <ul>
		            <li class="menu-item" @click="change(0)"><span :class="{'orange':type == 0}">未中奖</span></li>
		            <li class="menu-item" @click="change(1)"><span :class="{'orange':type == 1}">已中奖</span></li>
		        </ul>
		    </div> -->
		<edit-btn @click="showForm=true"></edit-btn>
		<div class="content padding">
			<my-prize-title></my-prize-title>
			<div class="rows"
			     v-for="list in lists">
				<div class="type"
				     v-if="activityConfig.prizeList.typeShow">
					<p :class="{'cashed':list.state==1,'cash':list.state==0}">{{list.state==1?'已领奖':'未领奖'}}</p>
				</div>
				<p class="prize-name">奖品名：<span>{{list.pname}}</span></p>
				<p>兑奖码：<span>{{list.sid}}</span></p>
				<p>兑奖时间：<span>{{list.startenabled.substr(0,10)}}</span>至<span>{{list.endenabled.substr(0,10)}}</span></p>
			</div>
			<my-prize-btn></my-prize-btn>
			<div class="prize-title"
			     v-show="activityConfig.qeCode.show">
				<img :src="activityConfig.qeCode.imgUrl ? activityConfig.qeCode.imgUrl : activityConfig.qeCode.defaultImgUrl"
				     style="width: 120px;">
			</div>
		</div>
	</div>
	
	<modal :show.sync="showForm"
	       size="md">
		<div class="modal-panel">
			<div class="title">编辑图片</div>
			<div class="close"
			     @click="showForm=false">X</div>
			<upload-image :img-url.sync="activityConfig.prizeList.bgUrl"
			              :config="uploadConfig"
			              :default-image="'./templates/static/img/common-bg.587695a.jpg'">
			</upload-image>
		</div>
	</modal>
</template>
<style lang="scss">
@import '../../_base_config.scss';
@import "./my-prize-list.scss";
</style>
<script>
import editBtn from '../edit-btn.vue'
import uploadImage from '../../../components/web/uploadImage/uploadImage.vue'
import modal from '../../../components/bootstrap/Modal.vue'
import myPrizeBtn from './my-prize-btn.config.vue'
import myPrizeTitle from './my-prize-title.config.vue'
export default {
	components: {
		editBtn,
		uploadImage,
		modal,
		myPrizeBtn,
		myPrizeTitle

	},
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			activityConfig,
			showForm: false,
			lists: [{
				"endenabled": "2016-08-31 00:00:00",
				"pname": "无人机123",
				"sid": "WHD21473232094569971",
				"startenabled": "2016-08-01 00:00:00",
				"state": 0
			},
				//  {
				// 	"endenabled": "2016-08-31 00:00:00",
				// 	"pname": "小米平衡车",
				// 	"sid": "WHD21473232094569971",
				// 	"startenabled": "2016-08-01 00:00:00",
				// 	"state":1
				// }
			],
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
			},
			type: 1
		}
	},
	methods: {
		change(type) {
			this.type = type;
		}
	},
	watch: {
		'activityConfig.qeCode.show'(v, o) {
			console.log(v)
		}
	}
}
</script>