<template>
    <div class="upload-thumb__wrapper">
        <div class="upload-thumb__img" @click="showForm=true">
            <img v-if="imgUrl" :src="imgUrl" />
            <span v-else>点击上传</span>
        </div>
        <modal :show.sync="showForm" size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload :img-url.sync="imgUrl" :config="uploadConfig"></upload>
			</div>
		</modal>
    </div>
</template>
<script>
    import modal from '../../bootstrap/Modal.vue'
    import upload from '../../web/upload.vue'
    export default {
        components: {
            modal,
            upload
        },
        props: {
            imgUrl: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
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
				}
            }
        },
        ready() {

        }
    }
</script>
<style lang="scss">
    @import './uploadThumb.scss'
</style>