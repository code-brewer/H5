<template>
    <div>
        <crumbs :icon="crumbs.icon" :class-name="crumbs.className"></crumbs>
        <div class="table">
            <p class="tableTop">广告位编辑</p>
            <el-table :data="tableData1"  border style="width: 100%" ref="multipleTable"  align="center">
            <el-table-column align="center" type="index" width="80"label="编号"></el-table-column>
                <el-table-column align="center" prop="date" label="文字编辑" >
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
                <el-table-column label="操作" width="180" align="center">
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
             <el-button class="add" :disabled="!!tableEditing.editing1" style="margin-top: 10px;" type="primary" @click="addData">添加</el-button>
        </div>
        <div class="table bottom">
            <p class="tableTop">PPT编辑</p>
            <el-table :data="tableData2"  border style="width: 100%" ref="multipleTable"  align="center">
            <el-table-column align="center" type="index" width="80"label="编号"></el-table-column>
                <el-table-column align="center" prop="date" label="文字编辑" >
                    <template scope="scope">
                         <edit 
                            :scope="scope" 
                            attr="lessonName" 
                            :editing="tableEditing.editing2" 
                            :focus="true">
                        </edit>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="img" label="插入PPT">
                   <template scope="scope">
                       <div style="padding:10px">
                            <el-upload 
                            v-if="tableEditing.editing2&&scope.$index==tableEditing.editing2-1" 
                            class="avatar-uploader" 
                            :action="basePath+'advertisement/AddOrUpdateLessonNet'" 
                            :show-file-list="false" 
                            :on-success="handleAvatarSuccess" 
                            :auto-upload="false"
                            :on-change = "changeFile2"
                            :on-error = "error"
                            :file-list="fileList2"
                            >
                            <el-button slot="trigger" size="small" type="primary">{{scope.row.name||'上传文件'}}</el-button>
                        </el-upload>
                        <p v-if="!(tableEditing.editing2&&scope.$index==tableEditing.editing2-1)">{{scope.row.lessonUrl||'上传文件'}}</p>
                       </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300" align="center">
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
             <el-button 
                class="add" 
                :disabled="!!tableEditing.editing2" 
                style="margin-top: 10px;" 
                type="primary" 
                @click="addVideo">添加</el-button>
        </div>
    </div>
</template>

<script>
import crumbs from './../components/Crumbs.vue'; 
import changeAndDel from './../components/ChangeAndDel.vue'; //更改和删除
import api from './../../assets/api.js'
import edit from './../components/Edit.vue'; //编辑框
    export default {
        data: function(){
            return {
                tableData1 : [],
                tableData2 : [],
                basePath : basePath,
                crumbs : {
                    icon : 'iconfont icon-picture',
                    className : '网络视频-PPT',

                },
                imageUrl: '../../static/img/img.jpg',
                fileList1:[],
                fileList2:[],
                tableEditing: {
                    editing1: false,
                    editing2: false
                }
            }
        },
        components : {
            crumbs,
            changeAndDel,
            edit
        },
        created(){
            this.getList()
            this.getVideoList()
        },
        methods: {
            handleEdit(index, row) {//更改编辑状态
                if (this.tableEditing.editing1 && this.tableEditing.editing1 == index + 1) {
                    this.tableEditing.editing1 = false
                    this.upload(index,row)

                } else {
                    this.tableEditing.editing1 = index + 1;
                }
            },
            handleEdit2(index, row) {
                if (this.tableEditing.editing2 && this.tableEditing.editing2 == index + 1) {
                    this.tableEditing.editing2 = false
                    this.uploadVideo(row,this.fileList2,basePath+'lessonNet/AddOrUpdateLessonNet')
                } else {
                    this.tableEditing.editing2 = index + 1;
                }
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
            error () {
                this.$message.error('更改失败')
            },
            handleAvatarSuccess(res, file) {
                this.$message({
                    type : 'success',
                    message : '更改成功'

                })
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            getVideoList() {
                 api.getLessonNetListM(this, {
                        "types":"2",     //课程名称 (必填)
                    },(res)=>{
                        if (res.resCode==="000000") {
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
            uploadVideo (row,fileList,url) {
                this.$message('开始上传');

                if (fileList[0]&&fileList[0].raw){
                    var file = fileList[0].raw
                }else {
                    var file = ''
                }
                 var _this = this ;
                    var xhr = new XMLHttpRequest();
                        var form = new FormData();
                            form.append('lessonName', row.lessonName)
                            form.append('pkId', row.pkId||'')
                            form.append('lessonDesc', row.lessonDesc)
                            form.append('lessonType', 2)
                             if (row.pkTagId){
                                form.append('tagId', row.pkTagId)
                            }else {
                                 this.$message.error('请选择PPT类型')
                                 _this.getVideoList()
                                 return 
                            }
                            if (file) form.append('file',file)
                            xhr.open('POST', url, true);
                            xhr.send(form); 
                            xhr.onreadystatechange = () => {
                                if (xhr.readyState === 4) {
                                    var res = JSON.parse(xhr.responseText);
                                     if(res.resCode==="000000"&&res.resMsg==="success"){
                                          console.log(res)
                                           _this.$message({
                                                type : 'success',
                                                message : '更改成功'
                                            })
                                           _this.getVideoList()
                                       }else {
                                            _this.$message('更改失败')
                                             _this.getVideoList()
                                       }
                                  
                                }  
                            } 
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
                    adTypes : '2',
                    pkId : '',
                    pkTagId : ''

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
            upload(index,row) {
                var _this = this ;
                var xhr = new XMLHttpRequest();
                    var form = new FormData();
                        form.append('adDesc', row.adDesc)
                        form.append('pkId', row.pkId)
                        form.append('adTypes', '2')

                        if (this.fileList1[0]) form.append('file', this.fileList1[0].raw)
                        xhr.open('POST', basePath+'advertisement/AddOrUpdateAdvertisement', true);
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
                api.getAdvertisementList(this, {
                        "types":"2",     //课程名称 (必填)
                    },(res)=>{
                        if (res.resCode==="000000") {
                            this.tableData1 = res.repBody.map(item => {
                             item.adImage =   item.adImage ?basePath+'../'+item.adImage  : '';
                                return item;
                            })
                        }
                        else {
                            this.$message.error('请求出错');
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    img {
        border-radius: 6px;
    }

</style>