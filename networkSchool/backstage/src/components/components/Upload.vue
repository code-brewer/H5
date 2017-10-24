<template>
    <div class="img">
        <el-upload 
            v-if="editing&&scope.$index==editing-1" 
            class="avatar-uploader" 
            :action="action" 
            :show-file-list="false" 
            :on-success="handleAvatarSuccess" 
            :auto-upload="false"
            :on-change="handleChange"
            :on-error = "error"
            :file-list="fileList"
            ref="upload"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <img v-else :src="imageUrl?imageUrl : '../../static/img/image.png'" height="100" width="100">
    </div>
</template>
<script>
import api from './../../assets/api.js'
export default {
    props: {
        scope: {
            require: true,
            type: Object
        },
        editing: {
            default: false
        },
        imageUrl: {
            type: String,
            default: ''
        },
        beforeAvatarUpload: {
            type: Function,
            default: () => {}
        },
        handleAvatarSuccess: {
            type: Function,
            default: () => {}
        },
        action: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
           fileList: []
        }
    },
    created () {
        this.listenUpload()
    },
    methods : {
        handleChange (file){
            if (file&&file.raw){
                this.$emit('update:imageUrl',window.URL.createObjectURL(file.raw))
            }
        },
        listenUpload () {
            this.$bus.on('upload',(index,val) => {//
                if (this.scope.$index==this.editing-1) {
                    var xhr = new XMLHttpRequest();
                    var form = new FormData();
                        form.append('adDesc', this.scope.row.adDesc)
                        form.append('pkId', this.scope.row.pkId)
                        form.append('adTypes', '1')
                        if (this.fileList[0]) form.append('file', this.fileList[0])
                        xhr.open('POST', this.action, true);
                        xhr.send(form); 
                        xhr.onreadystatechange = () => {
                            if (xhr.readyState === 4) {
                                var res = JSON.parse(xhr.responseText);
                                console.log(res);
                            }  
                        } 
                }
                
            })
        },
        error () {
            this.$message.error('更改失败')
        }

    }
}
</script>
<style scoped>
.img {
    padding: 10px;
    height: 126px;
}

.img img {
    border-radius: 6px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
}

.avatar-uploader>.el-upload--text {
    width: auto;
    height: auto;
    box-sizing: border-box;
}

.avatar-uploader {
    box-sizing: border-box;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    display: block;
}
</style>