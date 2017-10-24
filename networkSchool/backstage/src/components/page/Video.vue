<template>
    <div>
        <crumbs :icon="crumbs.icon" :class-name="crumbs.className"></crumbs>
        <div class="table">
            <p class="tableTop">广告位编辑</p>
            <el-table :data="tableData1" border style="width: 100%" ref="multipleTable" align="center" v-loading.body="loading1">
                <el-table-column align="center" type="index" width="80" label="编号"></el-table-column>
                <el-table-column align="center" prop="date" label="文字编辑">
                    <template scope="scope">
                         <edit 
                            :scope="scope" 
                            :editing="tableEditing.editing1" 
                            attr="adDesc" 
                            :focus="true">
                        </edit>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="img" label="插入图片">
                    <template scope="scope">
                        <div style="padding:10px;">
                            <el-upload 
                            v-if="tableEditing.editing1&&scope.$index==tableEditing.editing1-1" 
                            class="avatar-uploader" 
                            :action="basePath+'advertisement/AddOrUpdateAdvertisement'" 
                            :show-file-list="false" 
                            :on-success="handleAvatarSuccess" 
                            :auto-upload="false"
                            :on-error = "error"
                            :on-change = "changeFile"
                            :file-list="fileList1"
                            ref="upload"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="scope.row.adImage" :src="scope.row.adImage" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <img v-else :src="scope.row.adImage?scope.row.adImage : '../../static/img/image.png'" height="100" width="100">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        
                        <change-and-del 
                            :scope="scope" 
                            :editing="tableEditing.editing1" 
                            :handleEdit="handleEdit" 
                            :handleDelete="handleDelete">
                        
                        </change-and-del>

                    </template>
                </el-table-column>
            </el-table>
            <el-button class="add" :disabled="!!tableEditing.editing1" type="primary" @click="addData">添加</el-button>
        </div>
        <div class="table bottom">
            <p class="tableTop">视频编辑</p>
            <el-table 
                :data="tableData2" border style="width: 100%" ref="multipleTable" align="center" v-loading.body="loading2">
                <el-table-column width="80" align="center" type="index" label="编号"></el-table-column>
                <el-table-column align="center" prop="date" label="文字编辑">
                     <template scope="scope">
                         <edit 
                            :scope="scope" 
                            attr="lessonName" 
                            :editing="tableEditing.editing2" 
                            :focus="true">
                        </edit>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="img" label="插入视频">
                     <template scope="scope">
                        <div style="padding: 10px;">
                            <el-upload 
                            v-if="tableEditing.editing2&&scope.$index==tableEditing.editing2-1" 
                            class="avatar-uploader" 
                            :action="basePath+'advertisement/AddOrUpdateLessonNet'" 
                            :show-file-list="false" 
                            :on-success="handleAvatarSuccess" 
                            :auto-upload="false"
                            :on-error = "error"
                            :on-change = "changeFile2"
                            :file-list="fileList2"
                            >
                            <el-button slot="trigger" size="small" type="primary">{{scope.row.name||'上传文件'}}</el-button>
                        </el-upload>
                         <p v-if="!(tableEditing.editing2&&scope.$index==tableEditing.editing2-1)">{{scope.row.lessonUrl||'上传文件'}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <change-and-del 
                            :scope="scope" 
                            :editing="tableEditing.editing2" 
                            :handleEdit="handleEdit2" 
                            :handleDelete="handleDelete2">
                            <select  v-model="scope.row.pkTagId" :disabled="!(tableEditing.editing2&&scope.$index==tableEditing.editing2-1)" style="height: 28px;box-sizing: border-box; margin: 0 10px;">
                                <option value="">请选择类型</option>
                                <option value="1">增值税</option>
                                <option value="2">所得税</option>
                                <option value="3">科技财税</option>
                                <option value="4">其他税种</option>
                                <option value="5">政策法规</option>
                            </select>
                        </change-and-del>
                    </template>
                </el-table-column>
            </el-table>
              <el-button class="add" :disabled="!!tableEditing.editing2" type="primary" @click="addVideo">添加</el-button>
        </div>
    </div>
</template>
<script>
import crumbs from './../components/Crumbs.vue';//面包屑
import changeAndDel from './../components/ChangeAndDel.vue'; //更改和删除
import upload from './../components/Upload.vue'; //上传
import edit from './../components/Edit.vue'; //编辑框
import api from './../../assets/api.js'
export default {
    components: {
        crumbs,
        changeAndDel,
        upload,
        edit
    },
    data: function() {
        return {
            crumbs: {
                icon: 'iconfont icon-live',
                className: '网络学堂-视频',
            },
            basePath : basePath,
            tableData1: [],
            fileList1 : [],
            fileList2 : [],
            tableData2: [],
            isLoading : false , //判断是否需要上传
            // imageUrl : '../../../static/img/img.jpg'
            imageUrl: '../../static/img/img.jpg',
            tableEditing: {
                editing1: false,
                editing2: false
            },
            loading1 : false,
            loading2 : false
        }
    },
    watch:{
     
    },
    created() {
        this.getList()
        this.getVideoList()
       
    },
    methods: {
       
        handleEdit(index, row) {//更改编辑状态

            if (this.tableEditing.editing1 && this.tableEditing.editing1 == index + 1) {
                this.tableEditing.editing1 = false
                this.upload(row,this.fileList1[0].raw,basePath+'advertisement/AddOrUpdateAdvertisement')
                this.fileList1 = []

            } else {
                this.tableEditing.editing1 = index + 1;
            }
        },
        handleEdit2(index, row) {
            if (this.tableEditing.editing2 && this.tableEditing.editing2 == index + 1) {
                this.tableEditing.editing2 = false
                this.uploadVideo(row,this.fileList2,basePath+'lessonNet/AddOrUpdateLessonNet')
                this.fileList2 = []
                
            } else {
                this.tableEditing.editing2 = index + 1;
            }
        },
        handleDelete(index, row) {
            api.delAdvertisement(this,{
                pkId : row.pkId
            },res=>{
               if(res.resCode === "000000" && res.resMsg==="success") {
                    this.$message({
                        type : 'success',
                        message : '删除成功'
                    })
                    this.getList()
               }
            })
        },
        handleDelete2(index, row) {
            // this.$message.error('删除第' + (index + 1) + '行');
            
            api.delLessonNet(this,{
                pkId : row.pkId
            },res=>{
               if(res.resCode === "000000" && res.resMsg==="success") {
                    this.$message({
                        type : 'success',
                        message : '删除成功'
                    })
                    this.getVideoList()
               }
            })
        },
        
        handleAvatarSuccess(res, file) {
            this.$message({
                type : 'success',
                message : '更改成功'

            })
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        addData() {
            var data = {
                adDesc: '',
                adImage: '',
                adTypes : '1',
                pkId : ''

            }
            this.tableData1.push(data)
            this.tableEditing.editing1 = this.tableData1.length;
        },
        addVideo() {
            var data = {
                lessonDesc: '',
                lessonName: '',
                lessonUrl : '',
                pkTagId : ''
            }
            this.tableData2.push(data)
            this.tableEditing.editing2 = this.tableData2.length;
        },
        upload (row,file,url) {
            var _this = this ;
                var xhr = new XMLHttpRequest();
                    var form = new FormData();
                        form.append('adDesc', row.adDesc)
                        form.append('pkId', row.pkId)
                        form.append('adTypes', '1')
                        if (file) form.append('file',file)
                        xhr.open('POST', url, true);
                        xhr.send(form); 
                        xhr.onreadystatechange = () => {
                            if (xhr.readyState === 4) {
                                var res = JSON.parse(xhr.responseText);
                               _this.$message({
                                    type : 'success',
                                    message : '更改成功'
                                })
                               _this.getList()
                            }  
                        } 
        },
        getList() {
            this.loading1  = true
            api.getAdvertisementList(this, {
                    "types":"1",     //课程名称 (必填)
                },(res)=>{
                     this.loading1  = false
                    if (res.resCode==="000000") {
                        this.tableData1 = res.repBody.map(item => {
                         item.adImage =   item.adImage ?basePath+'../'+item.adImage : '';
                            return item;
                        })
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
        },
        getVideoList() {
            this.loading2  = true
             api.getLessonNetListM(this, {
                    "types":"1",     //课程名称 (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                        this.loading2  = false
                        this.tableData2 = res.repBody.map(item => {
                         item.adImage =   item.adImage ?basePath+'../'+item.adImage : '';
                            return item;
                        })
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
        },
        changeFile(file,fileList) {
            var url = window.URL.createObjectURL(file.raw)
            this.fileList1 = fileList
            this.tableData1[this.tableEditing.editing1-1].adImage = url
        } ,
        changeFile2(file,fileList) {
            console.log(file.raw)
            // var url = window.URL.createObjectURL(file.raw)
            this.fileList2 = fileList
            this.tableData2[this.tableEditing.editing2-1].name = file.raw.name
        } ,
        uploadVideo (row,file,url) {
           this.$message('开始上传');

            if (file[0]&&file[0].raw){
                var file = file[0].raw
            }else {
                var file = ''
            }
             var _this = this ;
                var xhr = new XMLHttpRequest();
                    var form = new FormData();
                        form.append('lessonName', row.lessonName)
                        form.append('pkId', row.pkId||'')
                        if (row.pkTagId){
                            form.append('tagId', row.pkTagId)
                        }else {
                             this.$message.error('请选择视频类型')
                             _this.getVideoList()
                             return 
                        }
                        
                        form.append('lessonType', 1)
                        if (file) form.append('file',file)
                        xhr.open('POST', url, true);
                        xhr.send(form); 
                        xhr.onreadystatechange = () => {
                            if (xhr.readyState === 4) {
                                var res = JSON.parse(xhr.responseText);
                                if(res.resCode==="000000"&&res.resMsg==="success"){
                                    _this.$message({
                                        type : 'success',
                                        message : '更改成功'
                                    })
                                   _this.getVideoList()
                               }else {
                                     this.$message.error('更改失败')
                                     _this.getVideoList()
                               }
                               
                            }  
                        } 
        },
        error () {
             this.$message.error('更改失败')
        }
    }
}
</script>
<style>
    .add {
        margin-top: 10px;
    }
    .el-input__inner {
        padding: 0px;
    }
</style>