<template>
    <div id="banner">
        <el-upload class="avatar-uploader" action="../upload/uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload" style="overflow:auto;position: relative;margin-bottom:10px">
            <div style="position: relative;">
                <img v-if="imageUrl.imageUrl_1" :src="imageUrl.imageUrl_1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="mask" v-if="imageUrl.imageUrl_1">
                <span class="">
                    <i  class="el-icon-view" ></i>
                </span>
                </span>
            </div>
            <div class="btns" slot="tip">
                <el-button style="background-color:#FFF;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#6ca1e9;border:1px solid #6ca1e9;margin-bottom: 10px;" size="small" type="success" @click="delUpload(1)">删除</el-button>
                <el-button style="background-color:#6ca1e9;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin-bottom:10px;margin-left: 0" size="small" type="success" @click="submitUpload(1)">保存</el-button>
                <div slot="tip" class="el-upload__tip">图像大小为720*290,支持jpg、png、gif格式</div>
                <span><label>URL：</label><input type="txt" name="pic_url" placeholder="跳转链接" v-model="bannerJumpUrl.bannerJumpUrl_1" ></span>
                <span><label>标题：</label><input type="txt" name="pic_title"  placeholder="标题内容" v-model="bannerTitle.bannerTitle_1"></span>
                <span><label>排序：</label><span style="display: inline-block">第</span>
                <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:30px;margin: 0 10px;" v-model="bannerId.sort_1"><span style="display: inline-block;margin-right: 10px;">个</span>
                <a href="javascript:void(0);" @click="updateSort(1)">确定</a>
                </span>
                <span><label>广告ID：</label><input type="txt" name="pic_title"  placeholder="例如：张家界" v-model="bannerId.sign_1"></span>
            </div>
        </el-upload>
        <el-upload class="avatar-uploader" action="../upload/uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess_2" :before-upload="beforeAvatarUpload" style="overflow:auto;position: relative;margin-bottom:10px">
            <div style="position: relative;">
                <img v-if="imageUrl.imageUrl_2" :src="imageUrl.imageUrl_2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="mask" v-if="imageUrl.imageUrl_2">
                <span class="">
                    <i  class="el-icon-view"></i>
                </span>
                </span>
            </div>
            <div class="btns" slot="tip">
                <el-button style="background-color:#FFF;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#6ca1e9;border:1px solid #6ca1e9;margin-bottom: 10px;" size="small" type="success" @click="delUpload(2)">删除</el-button>
                <el-button style="background-color:#6ca1e9;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin-bottom:10px;margin-left: 0" size="small" type="success" @click="submitUpload(2)">保存</el-button>
                <div slot="tip" class="el-upload__tip">图像大小为720*290,支持jpg、png、gif格式</div>
                <span><label>URL：</label><input type="txt" name="pic_url" placeholder="跳转链接" v-model="bannerJumpUrl.bannerJumpUrl_2" ></span>
                <span><label>标题：</label><input type="txt" name="pic_title"  placeholder="标题内容" v-model="bannerTitle.bannerTitle_2"></span>
                <span><label>排序：</label><span style="display: inline-block">第</span>
                <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:30px;margin: 0 10px;" v-model="bannerId.sort_2"><span style="display: inline-block;margin-right: 10px;">个</span>
                <a href="javascript:void(0);" @click="updateSort(2)">确定</a>
                </span>
                <span><label>广告ID：</label><input type="txt" name="pic_title"  placeholder="例如：张家界" v-model="bannerId.sign_2"></span>
            </div>
        </el-upload>
        <el-upload class="avatar-uploader" action="../upload/uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess_3" :before-upload="beforeAvatarUpload" style="overflow:auto;position: relative;margin-bottom:10px">
            <div style="position: relative;">
                <img v-if="imageUrl.imageUrl_3" :src="imageUrl.imageUrl_3" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="mask" v-if="imageUrl.imageUrl_3">
                <span class="">
                    <i  class="el-icon-view"></i>
                </span>
                </span>
            </div>
            <div class="btns" slot="tip">
                <el-button style="background-color:#FFF;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#6ca1e9;border:1px solid #6ca1e9;margin-bottom: 10px;" size="small" type="success" @click="delUpload(3)">删除</el-button>
                <el-button style="background-color:#6ca1e9;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin-bottom:10px;margin-left: 0" size="small" type="success" @click="submitUpload(3)">保存</el-button>
                <div slot="tip" class="el-upload__tip">图像大小为720*290,支持jpg、png、gif格式</div>
                <span><label>URL：</label><input type="txt" name="pic_url" placeholder="跳转链接" v-model="bannerJumpUrl.bannerJumpUrl_3" ></span>
                <span><label>标题：</label><input type="txt" name="pic_title"  placeholder="标题内容" v-model="bannerTitle.bannerTitle_3"></span>
                <span><label>排序：</label><span style="display: inline-block">第</span>
                <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:30px;margin: 0 10px;" v-model="bannerId.sort_3"><span style="display: inline-block;margin-right: 10px;">个</span>
                <a href="javascript:void(0);" @click="updateSort(3)">确定</a>
                </span>
                <span><label>广告ID：</label><input type="txt" name="pic_title"  placeholder="例如：张家界" v-model="bannerId.sign_3"></span>
            </div>
        </el-upload>
        <el-upload class="avatar-uploader" action="../upload/uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess_4" :before-upload="beforeAvatarUpload" style="overflow:auto;position: relative;margin-bottom:10px">
            <div style="position: relative;">
                <img v-if="imageUrl.imageUrl_4" :src="imageUrl.imageUrl_4" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="mask" v-if="imageUrl.imageUrl_4">
                <span class="">
                    <i  class="el-icon-view"></i>
                </span>
                </span>
            </div>
            <div class="btns" slot="tip">
                <el-button style="background-color:#FFF;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#6ca1e9;border:1px solid #6ca1e9;margin-bottom: 10px;" size="small" type="success" @click="delUpload(4)">删除</el-button>
                <el-button style="background-color:#6ca1e9;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin-bottom:10px;margin-left: 0" size="small" type="success" @click="submitUpload(4)">保存</el-button>
                <div slot="tip" class="el-upload__tip">图像大小为720*290,支持jpg、png、gif格式</div>
                <span><label>URL：</label><input type="txt" name="pic_url" placeholder="跳转链接" v-model="bannerJumpUrl.bannerJumpUrl_4" ></span>
                <span><label>标题：</label><input type="txt" name="pic_title"  placeholder="标题内容" v-model="bannerTitle.bannerTitle_4"></span>
                <span><label>排序：</label><span style="display: inline-block">第</span>
                <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:30px;margin: 0 10px;" v-model="bannerId.sort_4"><span style="display: inline-block;margin-right: 10px;">个</span>
                <a href="javascript:void(0);" @click="updateSort(4)">确定</a>
                </span>
                <span><label>广告ID：</label><input type="txt" name="pic_title"  placeholder="例如：张家界" v-model="bannerId.sign_4"></span>
            </div>
        </el-upload>
        <el-upload class="avatar-uploader" action="../upload/uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess_5" :before-upload="beforeAvatarUpload" style="overflow:auto;position: relative;margin-bottom:10px">
            <div style="position: relative;">
                <img v-if="imageUrl.imageUrl_5" :src="imageUrl.imageUrl_5" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="mask" v-if="imageUrl.imageUrl_5">
                <span class="">
                    <i  class="el-icon-view"></i>
                </span>
                </span>
            </div>
            <div class="btns" slot="tip">
                <el-button style="background-color:#FFF;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#6ca1e9;border:1px solid #6ca1e9;margin-bottom: 10px;" size="small" type="success" @click="delUpload(5)">删除</el-button>
                <el-button style="background-color:#6ca1e9;width: 35%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin-bottom:10px;margin-left: 0" size="small" type="success" @click="submitUpload(5)">保存</el-button>
                <div slot="tip" class="el-upload__tip">图像大小为720*290,支持jpg、png、gif格式</div>
                <span><label>URL：</label><input type="txt" name="pic_url" placeholder="跳转链接" v-model="bannerJumpUrl.bannerJumpUrl_5" ></span>
                <span><label>标题：</label><input type="txt" name="pic_title"  placeholder="标题内容" v-model="bannerTitle.bannerTitle_5"></span>
                <span><label>排序：</label><span style="display: inline-block">第</span>
                <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:30px;margin: 0 10px;" v-model="bannerId.sort_5"><span style="display: inline-block;margin-right: 10px;">个</span>
                <a href="javascript:void(0);" @click="updateSort(5)">确定</a>
                </span>
                <span><label>广告ID：</label><input type="txt" name="pic_title"  placeholder="例如：张家界" v-model="bannerId.sign_5"></span>
            </div>
        </el-upload>
    </div>
</template>
<script>
export default {
    data() {
            return {
                imageUrl: {
                    imageUrl_1: '',
                    imageUrl_2: '',
                    imageUrl_3: '',
                    imageUrl_4: '',
                    imageUrl_5: '',
                },
                bannerTitle: {
                    bannerTitle_1: '',
                    bannerTitle_2: '',
                    bannerTitle_3: '',
                    bannerTitle_4: '',
                    bannerTitle_5: '',
                },
                bannerJumpUrl: {
                    bannerJumpUrl_1: '',
                    bannerJumpUrl_2: '',
                    bannerJumpUrl_3: '',
                    bannerJumpUrl_4: '',
                    bannerJumpUrl_5: '',
                },
                bannerId: {
                    bannerId_1: '',
                    bannerId_2: '',
                    bannerId_3: '',
                    bannerId_4: '',
                    bannerId_5: '',
                    sort_1: '',
                    sort_2: '',
                    sort_3: '',
                    sort_4: '',
                    sort_5: '',
                    sign_1: '',
                    sign_2: '',
                    sign_3: '',
                    sign_4: '',
                    sign_5: '',
                },
                dialogImageUrl: '',
                dialogVisible: false,
                placeinput: '',
                nav_msg: '广告管理',
                isAllow: false,

                // fileList: [{
                //     name: 'food.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }, {
                //     name: 'food2.jpeg',
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }],

            }
        },
        mounted: function() {
            this.getbannerlist();
        },
        methods: {
            getbannerlist() {
                // alert()
                //获取banner信息
                var _this = this;
                this.$ajax({
                        method: 'get',
                        url: '../banner/getBannerAd',
                        data: {},
                        transformRequest: [function(data) {
                            // Do whatever you want to transform the data
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }

                    })
                    .then(function(res) {

                        if (res.data.status == 1) {

                            _this.imageUrl.imageUrl_1 = res.data.data[0].bannerImgUrl;
                            _this.bannerJumpUrl.bannerJumpUrl_1 = res.data.data[0].bannerJumpUrl;
                            _this.bannerTitle.bannerTitle_1 = res.data.data[0].bannerTitle;
                            _this.bannerId.bannerId_1 = res.data.data[0].bannerId;
                            _this.bannerId.sort_1 = res.data.data[0].sort;
                            _this.bannerId.sign_1 = res.data.data[0].sign;

                            _this.imageUrl.imageUrl_2 = res.data.data[1].bannerImgUrl;
                            _this.bannerJumpUrl.bannerJumpUrl_2 = res.data.data[1].bannerJumpUrl;
                            _this.bannerTitle.bannerTitle_2 = res.data.data[1].bannerTitle;
                            _this.bannerId.bannerId_2 = res.data.data[1].bannerId;
                            _this.bannerId.sort_2 = res.data.data[1].sort;
                            _this.bannerId.sign_2 = res.data.data[1].sign;




                            _this.imageUrl.imageUrl_3 = res.data.data[2].bannerImgUrl;
                            _this.bannerJumpUrl.bannerJumpUrl_3 = res.data.data[2].bannerJumpUrl;
                            _this.bannerTitle.bannerTitle_3 = res.data.data[2].bannerTitle;
                            _this.bannerId.bannerId_3 = res.data.data[2].bannerId;
                            _this.bannerId.sort_3 = res.data.data[2].sort;
                            _this.bannerId.sign_3 = res.data.data[2].sign;





                            _this.imageUrl.imageUrl_4 = res.data.data[3].bannerImgUrl;
                            _this.bannerJumpUrl.bannerJumpUrl_4 = res.data.data[3].bannerJumpUrl;
                            _this.bannerTitle.bannerTitle_4 = res.data.data[3].bannerTitle;
                            _this.bannerId.bannerId_4 = res.data.data[3].bannerId;
                            _this.bannerId.sort_4 = res.data.data[3].sort;
                            _this.bannerId.sign_4 = res.data.data[3].sign;



                            _this.imageUrl.imageUrl_5 = res.data.data[4].bannerImgUrl;
                            _this.bannerJumpUrl.bannerJumpUrl_5 = res.data.data[4].bannerJumpUrl;
                            _this.bannerTitle.bannerTitle_5 = res.data.data[4].bannerTitle;
                            _this.bannerId.bannerId_5 = res.data.data[4].bannerId;
                            _this.bannerId.sort_5 = res.data.data[4].sort;
                            _this.bannerId.sign_5 = res.data.data[4].sign;




                        } else {

                        }
                    })
                    .catch(function(err) {
                        // alert(json.stringify(err))
                        // _this.open4()
                    })
            },
            open2() {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
            },
            open4() {
                this.$message.error('上传失败');
            },
            handleAvatarSuccess_1(res, file, fileList) {
                var _this = this;
                if (_this.isAllow) {
                    _this.imageUrl.imageUrl_1 = res.data;
                    console.log(res.data);
                }


            },
            handleAvatarSuccess_2(res, file, fileList) {
                var _this = this;
                if (_this.isAllow) {

                    _this.imageUrl.imageUrl_2 = res.data;
                    console.log(res.data);
                }

            },
            handleAvatarSuccess_3(res, file, fileList) {
                var _this = this;
                if (_this.isAllow) {
                    _this.imageUrl.imageUrl_3 = res.data;
                    console.log(res.data);
                }
            },
            handleAvatarSuccess_4(res, file, fileList) {
                var _this = this;
                if (_this.isAllow) {
                    _this.imageUrl.imageUrl_4 = res.data;
                    console.log(res.data);

                }
            },
            handleAvatarSuccess_5(res, file, fileList) {
                var _this = this;
                if (_this.isAllow) {
                    _this.imageUrl.imageUrl_5 = res.data;
                    console.log(res.data);

                }
            },
            beforeAvatarUpload(file) {
                var _this = this;
                _this.isAllow = true;
                // const isJPG = (file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/jpeg');
                // if (!isJPG) {
                //     this.$message.warning('上传banner图片只支持jpeg/png/gif格式!');
                // } else {
                //     var fileData = file;
                //     var Max_Height = 290;
                //     var Max_Width = 720;
                //     //读取图片数据
                //     var reader = new FileReader();
                //     reader.onload = function(e) {
                //         var data = e.target.result;
                //         //加载图片获取图片真实宽度和高度
                //         var image = new Image();
                //         image.onload = function() {
                //             var width = image.width;
                //             var height = image.height;
                //             _this.isAllow = (width == Max_Width && height == Max_Height);

                //             if (!_this.isAllow) {
                //                 _this.$message.warning('上传图片尺寸大小应为720*290像素！');
                //                 _this.isAllow = false;

                //             }
                //         };
                //         image.src = data;
                //     };
                //     reader.readAsDataURL(fileData);
                // }

            },

            //上传的钩子
            submitUpload(val) {
                var _this = this;
                // if (_this.bannerId.sign_1 && _this.bannerId.sign_2 && _this.bannerId.sign_3 && _this.bannerId.sign_4 && _this.bannerId.sign_5) {

                // if (_this.isAllow) {
                if (val == 1 && _this.bannerId.sign_1 && _this.bannerId.sort_1) {
                    this.$ajax({
                            method: 'post',
                            url: '../banner/addBannerAd',
                            data: {
                                bannerTitle: _this.bannerTitle.bannerTitle_1,
                                bannerImgUrl: _this.imageUrl.imageUrl_1,
                                bannerJumpUrl: _this.bannerJumpUrl.bannerJumpUrl_1,
                                sign: _this.bannerId.sign_1,
                                bannerId: _this.bannerId.bannerId_1,
                                sort: _this.bannerId.sort_1,

                            },
                            transformRequest: [function(data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(res) {
                            console.log(res)
                            if (res.data.status == 1) {
                                _this.open2();
                            } else if (res.data.status == 2) {
                                _this.$message.error('广告ID不能重复！');

                            } else {
                                _this.open4()
                            }
                        })
                        .catch(function(err) {
                            _this.open4()
                        })
                } else if (val == 2 && _this.bannerId.sign_2 && _this.bannerId.sort_2) {
                    this.$ajax({
                            method: 'post',
                            url: '../banner/addBannerAd',
                            data: {
                                bannerTitle: _this.bannerTitle.bannerTitle_2,
                                bannerImgUrl: _this.imageUrl.imageUrl_2,
                                bannerJumpUrl: _this.bannerJumpUrl.bannerJumpUrl_2,
                                sign: _this.bannerId.sign_2,
                                bannerId: _this.bannerId.bannerId_2,
                                sort: _this.bannerId.sort_2,



                            },
                            transformRequest: [function(data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }

                        })
                        .then(function(res) {
                            console.log(res)
                            if (res.data.status == 1) {
                                _this.open2();
                            } else if (res.data.status == 2) {
                                _this.$message.error('广告ID不能重复！');

                            } else {
                                _this.open4()
                            }
                        })
                        .catch(function(err) {
                            _this.open4()
                        })
                } else if (val == 3 && _this.bannerId.sign_3 && _this.bannerId.sort_3) {
                    this.$ajax({
                            method: 'post',
                            url: '../banner/addBannerAd',
                            data: {
                                bannerTitle: _this.bannerTitle.bannerTitle_3,
                                bannerImgUrl: _this.imageUrl.imageUrl_3,
                                bannerJumpUrl: _this.bannerJumpUrl.bannerJumpUrl_3,
                                sign: _this.bannerId.sign_3,
                                bannerId: _this.bannerId.bannerId_3,
                                sort: _this.bannerId.sort_3,


                            },
                            transformRequest: [function(data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }

                        })
                        .then(function(res) {
                            console.log(res)
                            if (res.data.status == 1) {
                                _this.open2();
                            } else if (res.data.status == 2) {
                                _this.$message.error('广告ID不能重复！');

                            } else {
                                _this.open4()
                            }
                        })
                        .catch(function(err) {
                            _this.open4()
                        })
                } else if (val == 4 && _this.bannerId.sign_4 && _this.bannerId.sort_4) {
                    this.$ajax({
                            method: 'post',
                            url: '../banner/addBannerAd',
                            data: {
                                bannerTitle: _this.bannerTitle.bannerTitle_4,
                                bannerImgUrl: _this.imageUrl.imageUrl_4,
                                bannerJumpUrl: _this.bannerJumpUrl.bannerJumpUrl_4,
                                sign: _this.bannerId.sign_4,
                                bannerId: _this.bannerId.bannerId_4,
                                sort: _this.bannerId.sort_4,


                            },
                            transformRequest: [function(data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(function(res) {
                            console.log(res)
                            if (res.data.status == 1) {
                                _this.open2();
                            } else if (res.data.status == 2) {
                                _this.$message.error('广告ID不能重复！');

                            } else {
                                _this.open4()
                            }
                        })
                        .catch(function(err) {
                            _this.open4()
                        })
                } else if (val == 5 && _this.bannerId.sign_5 && _this.bannerId.sort_5) {
                    this.$ajax({
                            method: 'post',
                            url: '../banner/addBannerAd',
                            data: {
                                bannerTitle: _this.bannerTitle.bannerTitle_5,
                                bannerImgUrl: _this.imageUrl.imageUrl_5,
                                bannerJumpUrl: _this.bannerJumpUrl.bannerJumpUrl_5,
                                sign: _this.bannerId.sign_5,
                                bannerId: _this.bannerId.bannerId_5,
                                sort: _this.bannerId.sort_5,


                            },
                            transformRequest: [function(data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(function(res) {
                            console.log(res)
                            if (res.data.status == 1) {
                                _this.open2();
                            } else if (res.data.status == 2) {
                                _this.$message.error('广告ID不能重复！');

                            } else {
                                _this.open4()
                            }
                        })
                        .catch(function(err) {
                            _this.open4()
                        })
                } else {
                    this.$message.warning('广告ID 或排序不能为空！');
                }

                // } else {
                //     this.$message.warning('请选择正确的图片格式和尺寸！');
                // }
            },


            //删除
            delUpload(res) {
                var bannerId_val = '';
                var _this = this;
                switch (res) {
                    case 1:
                        bannerId_val = _this.bannerId.bannerId_1;
                        break;
                    case 2:
                        bannerId_val = _this.bannerId.bannerId_2;
                        break;
                    case 3:
                        bannerId_val = _this.bannerId.bannerId_3;
                        break;
                    case 4:
                        bannerId_val = _this.bannerId.bannerId_4;
                        break;
                    case 5:
                        bannerId_val = _this.bannerId.bannerId_5;
                        break;
                }
                this.$ajax({
                        method: 'post',
                        url: '../banner/removeBannerAd',
                        data: {
                            bannerId: bannerId_val
                        },
                        transformRequest: [function(data) {
                            // Do whatever you want to transform the data
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }

                    })
                    .then(function(res) {
                        console.log(res)
                        if (res.data.status == 1) {
                            _this.$message.success('删除成功！');
                            _this.imageUrl.imageUrl_1 = '';
                            _this.bannerJumpUrl.bannerJumpUrl_1 = '';
                            _this.bannerTitle.bannerTitle_1 = '';
                            _this.bannerId.bannerId_1 = '';

                            _this.imageUrl.imageUrl_2 = '';
                            _this.bannerJumpUrl.bannerJumpUrl_2 = '';
                            _this.bannerTitle.bannerTitle_2 = '';
                            _this.bannerId.bannerId_2 = '';

                            _this.imageUrl.imageUrl_3 = '';
                            _this.bannerJumpUrl.bannerJumpUrl_3 = '';
                            _this.bannerTitle.bannerTitle_3 = '';
                            _this.bannerId.bannerId_3 = '';

                            _this.imageUrl.imageUrl_4 = '';
                            _this.bannerJumpUrl.bannerJumpUrl_4 = '';
                            _this.bannerTitle.bannerTitle_4 = '';
                            _this.bannerId.bannerId_4 = '';

                            _this.imageUrl.imageUrl_5 = '';
                            _this.bannerJumpUrl.bannerJumpUrl_5 = '';
                            _this.bannerTitle.bannerTitle_5 = '';
                            _this.bannerId.bannerId_5 = '';

                            _this.getbannerlist();

                        } else {
                            _this.$message.error('删除失败！');
                        }
                    })
                    .catch(function(err) {
                        _this.$message.error('删除失败！');
                    })
            },
            //更改
            //修改排序
            updateSort(res) {
                var _this = this;
                var bannerId_val = '';
                var bannerId_sort = '';
                var _this = this;
                switch (res) {
                    case 1:
                        bannerId_val = _this.bannerId.bannerId_1;
                        bannerId_sort = _this.bannerId.sort_1;
                        break;
                    case 2:
                        bannerId_val = _this.bannerId.bannerId_2;
                        bannerId_sort = _this.bannerId.sort_2;

                        break;
                    case 3:
                        bannerId_val = _this.bannerId.bannerId_3;
                        bannerId_sort = _this.bannerId.sort_3;

                        break;
                    case 4:
                        bannerId_val = _this.bannerId.bannerId_4;
                        bannerId_sort = _this.bannerId.sort_4;

                        break;
                    case 5:
                        bannerId_val = _this.bannerId.bannerId_5;
                        bannerId_sort = _this.bannerId.sort_5;

                        break;
                }
                if (!bannerId_sort) {
                    _this.$message.error('序号不能为空！');
                } else {
                    this.$ajax({
                            method: 'post',
                            // url: '../banner/updateBannerSort',
                            url: '../banner/updateBannerSort',
                            data: {
                                bannerId: bannerId_val,
                                sort: bannerId_sort,
                            },
                            transformRequest: [function(data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }],
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }

                        })
                        .then(function(res) {
                            console.log(res.data)
                            if (res.data.status == 1) {
                                _this.$message.success('修改排序成功！');

                            } else {
                                _this.$message.error('修改排序失败！');
                            }
                        })
                        .catch(function(err) {})
                }
            }


        }
}
</script>
<style lang='sass'>
body,
html {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: "微软雅黑", sans-serif;
}

a {
    text-decoration: none;
    color: rgb(108, 161, 233);
    vertical-align: middle;
}

#banner {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    .avatar-uploader .el-upload {
        // position: relative;
        border: 1px dashed #6ca1e9;
        width: 408px;
        height: 180px;
        margin: 30px;
        display: block;
        border-radius: 6px;
        cursor: pointer;
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            /* display: inline-block; */
            width: 408px;
            height: 180px;
            background-color: rgba(0, 0, 0, .5);
            z-index: 999;
            opacity: 0;
            transition: opacity .3s;
            cursor: pointer;
            .el-icon-view {
                font-family: element-icons!important;
                font-size: 30px;
                color: #FFF;
                margin-top: 75px;
            }
        }
        .mask:hover {
            opacity: 1;
        }
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #ffcc1d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 408px;
        height: 180px;
        display: block;
    }
    // .btns {
    //     width: 40%;
    //     position: absolute;
    //     top: 30px;
    //     right: 20%;
    //     .el-upload__tip {
    //         margin: 10px 0;
    //     }
    //     span {
    //         display: block;
    //         margin-bottom: 15px;
    //         input {
    //             height: 24px;
    //             width: 60%;
    //         }
    //     }
    // }
}

.btns {
    width: 40%;
    position: absolute;
    top: 30px;
    right: 20%;
    text-align: left;
    .el-upload__tip {
        margin: 6px 0;
    }
    span {
        display: block;
        margin-bottom: 5px;
        input {
            height: 20px;
            width: 263px;
        }
        label {
            display: inline-block;
            width: 67px;
        }
    }
}
</style>
