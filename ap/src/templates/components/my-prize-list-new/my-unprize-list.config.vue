<template>
	<div class="app-view view-prizes"
	     :style="{'background-image':activityConfig.prizeList.bgUrl?'url('+activityConfig.prizeList.bgUrl+')':1,'background-color':activityConfig.common.bg}">
		<edit-btn @click="showForm=true"></edit-btn>
		<div class="content padding">
			<my-prize-title></my-prize-title>
			<div class="my-unprize-wrap">
				<my-unprize></my-unprize>
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
import myPrizeTitle from './my-prize-title.config.vue'
import myUnprize from './my-unprize.config.vue'

export default {
	components: {
		editBtn,
		uploadImage,
		modal,
		myPrizeTitle,
		myUnprize
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
	}
}
</script>