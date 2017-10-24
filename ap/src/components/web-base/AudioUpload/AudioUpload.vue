<template>
    <div class="jq-file-upload__wrapper">
       <form id="audio-form" action="">
            <input type="text" 
                class="form-control"
                placeholder="请选择文件"
                name="fileurl" 
                v-model="activityConfig.game.musicUrl[activityConfig.game.fileType]" />
            <input type="file" 
                class="form-control"
                name="file"
                accept="audio/*"
                @change="setFileName" />
            <button @click="uploadAudio" type="button">{{stateText}}</button>
        </form>
        <snackbar :show.sync="snackbar_active" :message="snackbar_msg" action-text="知道了"></snackbar>
    </div>
</template>
<script>
    import jQuery from 'jquery'
    import snackbar from '../../web-base/snackbar'
    export default {
        components: {
            snackbar
        },
        data() {
            var activityConfig = window.store.activityConfig
			return {
				activityConfig,
                uploading: false,
                stateText: '上传',
                snackbar_active: false,
				snackbar_msg: '',
                fileurl: '',
                currentfile: ''
            }
        },
        props: {
            
        },
        ready() {

        },
        methods: {
			uploadAudio() {
                if(this.activityConfig.game.musicUrl['upload'] == '' || this.currentfile == "") {
                    this.snackbar_msg = '请选择要上传的文件'
                    this.snackbar_active = true
                    return
                }

                if(!this.currentfile.match(/(mp3|wav|ogg)$/i)) {
                    this.snackbar_msg = '文件格式不对，请选择mp3,wav,ogg格式的音频'
                    this.snackbar_active = true
                    return
                }

                var _this = this
				var formdata = new FormData( jQuery("#audio-form")[0] )

                this.stateText = '正在上传'

				jQuery.ajax({
					url : "upload/uploadFile",  
					type : "POST",  
					data : formdata,
					contentType: false,
                	processData: false,  
					success : function(data) {
                        let jData = JSON.parse(data)  
                        _this.stateText = '上传'
                        _this.activityConfig.game.musicUrl['upload'] = jData.repBody.fileUrl
                        _this.currentfile = ''
                        _this.snackbar_msg = '上传成功'
                        _this.snackbar_active = true
					},  
					error : function(data) {  
                       _this.stateText = '上传'
                       _this.snackbar_msg = '上传失败'
                       _this.snackbar_active = true
					}  
				})
			},
            setFileName(e) {
                if(e.target.value) {
                    this.activityConfig.game.musicUrl['upload'] = e.target.value
                    this.currentfile = e.target.value
                }
            }
        }
    }
</script>
<style lang="scss">
    @import './AudioUpload.scss';
</style>