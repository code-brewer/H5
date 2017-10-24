<template>
	<div class="receive-title__container">
        <edit-btn @click="showForm=true"></edit-btn>
		<button class="receive-title" type="button" :style="{'background-image': (activityConfig.receive.titleUrl!='' ? 'url('+activityConfig.receive.titleUrl+')' : 1)}">信息填写</button>
        <modal :show.sync="showForm" size="md">
            <div class="modal-panel">
                <div class="title">编辑图片</div>
                <div class="close" @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.receive.titleUrl" 
					:config="uploadConfig"
					:default-image="defaultImg"
				>
				</upload-image>
            </div>
        </modal>
	</div>
</template>
<script>
    import editBtn from '../../../../components/edit-btn.vue'
	import uploadImage from '../../../../../components/web/uploadImage/uploadImage.vue'
	import modal from '../../../../../components/bootstrap/Modal.vue'
	export default {
		components: {
			editBtn,
            uploadImage,
            modal
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
				activityConfig,
                showForm: false,
				uploadConfig: {
					width: "100%", // 宽度
					height: "200px",
					onlyFile: true,
					fileSize: 5120000, // 上传文件的大小
					multiple: false, // 是否可以多个文件上传
					dragDrop: false, // 是否可以拖动上传文件
					tailor: true, // 是否可以裁剪图片
					del: true, // 是否可以删除文件
					finishDel: true, // 是否在上传文件完成后删除预览
				},
			defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASYAAABPCAYAAABGSGj8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDBDQ0Q1RDQxQjY4MTFFN0JBMTFDQkVCOUQ2MTYyMEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDBDQ0Q1RDUxQjY4MTFFN0JBMTFDQkVCOUQ2MTYyMEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MENDRDVEMjFCNjgxMUU3QkExMUNCRUI5RDYxNjIwRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MENDRDVEMzFCNjgxMUU3QkExMUNCRUI5RDYxNjIwRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtKEHNAAAA5GSURBVHja7J1/bBTH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'
			}
		},
		ready() {
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
    $ratio: 750/320;
	@import './common.scss';
</style>