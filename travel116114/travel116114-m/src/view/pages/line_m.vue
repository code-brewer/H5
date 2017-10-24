<template>
    <!-- <h3>路线管理</h3> -->
    <div class="line">
        <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
            <div class="tocheckLine" @click="tocheckLine()">
                <img src="../../img/checkLine.png" height="95" width="70">
            </div>
        </transition>
        <div class="dic">
            地点：
        </div>
        <div class="head">
            <el-tag :key="tag" v-for="tag in my_Destination" :closable="true" :close-transition="false" @close="DestinationDel(tag)">
                {{tag}}
            </el-tag>
        </div>
        <br/>
        <div class="head" style="margin-left: 54px;">
            <el-tag :key="tag" v-for="tag in allDestination" :closable="false" :close-transition="false">
                <span @click="addmy_Destination(tag)">{{tag}}</span>
            </el-tag>
        </div>
        <div class="upimg">
            <el-upload class="avatar-uploader" action="../upload/uploadPic" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="mask" v-if="imageUrl">
                <span class="">
                    <i  class="el-icon-view"></i>
                </span>
                <!--    <span class="el-upload-list__item-delete">
                    <i class="el-icon-delete2"></i>
                </span> -->
                </span>
            </el-upload>
            <!--    <el-button style="background-color:#6ca1e9;width: 16%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin-bottom: 10px; margin-left: 54px;" size="small" type="success" slot="trigger" @click="changeUpload">保存</el-button>
            <el-button style="background-color:#FFF;width: 16%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#6ca1e9;border:1px solid #6ca1e9;margin-bottom: 10px;" size="small" type="success" @click="delUpload()">删除</el-button> -->
            <div slot="tip" class="el-upload__tip">图像大小为720*290,支持jpg、png、gif格式</div>
            <div class="the_btns">
                <span>产品标题：</span>
                <input type="txt" name="" class="product" placeholder="例：阳朔旅游纯玩团" v-model="title">
                <br />
                <div class="pice">
                    <span>特价：</span>
                    <input type="number" name="" class="special" placeholder="例：299.00" v-model="bargainPrice">
                    <span>原价：</span>
                    <input type="number" name="" class="normal" placeholder="例：500.00" v-model="originalPrice">
                    <br />
                </div>
                <span>URL：</span>
                <input type="txt" name="" class="the_url" placeholder="" v-model="routeJumpUrl">
                <br />
                <div class="block">
                    <span class="demonstration">截止时间：</span>
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions0" onPick="the_time">
                    </el-date-picker>
                </div>
            </div>
            <div class="tag">
                <span style="position: absolute;left: 0;margin-top: 15px;">标签：</span>
                <div class="tag_1">
                    <el-tag :key="tag" v-for="tag in my_addCategory" :closable="true" :close-transition="false" @close="CategoryDel(tag)">
                        {{tag}}
                    </el-tag>
                </div>
                <div class="tag_2">
                    <el-tag :key="tag" v-for="tag in allCategory" :closable="false" :close-transition="false">
                        <span @click="addmy_addCategory(tag)"> {{tag}}</span>
                    </el-tag>
                </div>
            </div>
            <div style="width: 88%;text-align: center">
                <el-button style="background-color:#6ca1e9;width: 16%;height: 30px;line-height: 30px;padding: 0;border: 0;color:#FFF;margin: 10px auto" size="small" type="success" @click="updata">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'type',
    props: ['msg'],
    components: {},
    data() {
        return {
            allCategory: [],
            my_addCategory: [],
            allDestination: [],
            my_Destination: [],
            imageUrl: '',
            timestamp: '',
            routeId: '',

            title: '',
            originalPrice: '',
            sort: '',
            routeJumpUrl: '',
            state: '',
            bargainPrice: '',

            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
            value1: '',
            isAllow: false,
        }
    },
    mounted: function() {
        this.checkallDestination();
        this.checkallCategory();


    },
    methods: {
        bargainPrice(val) {
            alert()
        },
        // onlyNonNegative(obj) {
        //     alert()
        //     var inputChar = event.keyCode;
        //     if (inputChar == 190) {
        //         var index1 = obj.value.indexOf(".") + 1;
        //         var index2 = obj.value.indexOf(".", index1);
        //         while (index2 != -1) {
        //             obj.value = obj.value.substring(0, index2);
        //             index2 = obj.value.indexOf(".", index1);
        //         }
        //     }

        //     obj.value = obj.value.replace(/[^(\d|.)]/g, "");
        // },
        clearMsg() {
            this.my_addCategory = [];
            this.my_Destination = [];
            this.imageUrl = '';
            this.timestamp = '';
            this.routeId = '';
            this.title = '';
            this.originalPrice = '';
            this.sort = '';
            this.state = '';
            this.routeJumpUrl = '';
            this.bargainPrice = '';
            this.value1 = '';

        },
        tocheckLine() {
            this.msg.linem = false;
            this.msg.checklinem = true;
            this.$bus.emit('myLinem', this.msg.checklinem);
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            var _this = this;
            if (_this.isAllow) {
                _this.imageUrl = res.data;
                console.log(res.data);
            }

        },
        beforeAvatarUpload(file) {
            var _this = this;
            _this.isAllow = true;
            // const isJPG = (file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/jpeg');
            // if (!isJPG) {
            //     this.$message.error('上传banner图片只支持jpeg/png/gif格式!');
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
            //                 _this.$message.error('上传图片尺寸大小应为720*290像素！');
            //                 _this.isAllow = false;

            //             }
            //         };
            //         image.src = data;
            //     };
            //     reader.readAsDataURL(fileData);
            // }

        },
        //保存图片
        changeUpload() {

        },
        //删除图片
        delUpload() {
            this.imageUrl = ''


        },
        //删除
        DestinationDel(tag) {
            this.my_Destination.splice(this.my_Destination.indexOf(tag), 1);
        },
        CategoryDel(tag) {
            this.my_addCategory.splice(this.my_addCategory.indexOf(tag), 1);
        },
        //添加
        addmy_Destination(tag) {
            this.my_Destination.length >= 1 ? console.log() : this.my_Destination.push(tag);
        },
        addmy_addCategory(tag) {
            this.my_addCategory.push(tag);
        },
        // 查询目的地
        checkallDestination() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../destination/allDestination',
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
                        _this.allDestination = res.data.data;
                    } else {
                        _this.$message.error('数据加载失败！');


                    }

                })
                .catch(function(err) {
                    _this.$message.error('数据加载失败！');
                });
        },
        // 查询归类
        checkallCategory() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../category/allCategory',
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
                        _this.allCategory = res.data.data;
                    } else {
                        _this.$message.error('数据加载失败！');


                    }

                })
                .catch(function(err) {
                    _this.$message.error('数据加载失败！');
                })
        },


        //提交
        updata() {
            var _this = this;
            var my_tab = _this.my_addCategory.join(",");
            var updataPass = _this.my_Destination[0] && _this.imageUrl && _this.title && _this.bargainPrice && _this.originalPrice && _this.routeJumpUrl && _this.value1.valueOf();
            if (updataPass) {
                var data_submit = {
                        routeName: '' + _this.my_Destination[0],
                        imgUrl: '' + _this.imageUrl,
                        title: '' + _this.title,
                        bargainPrice: '' + _this.bargainPrice,
                        originalPrice: '' + _this.originalPrice,
                        routeJumpUrl: '' + _this.routeJumpUrl,
                        tab: '' + my_tab,
                        cutoffTimeLong: '' + _this.value1.valueOf(),
                    },
                    data_updata = {
                        routeName: '' + _this.my_Destination[0],
                        imgUrl: '' + _this.imageUrl,
                        title: '' + _this.title,
                        bargainPrice: '' + _this.bargainPrice,
                        originalPrice: '' + _this.originalPrice,
                        routeJumpUrl: '' + _this.routeJumpUrl,
                        tab: '' + my_tab,
                        cutoffTimeLong: '' + _this.value1.valueOf(),
                        routeId: _this.routeId,
                    },
                    data = {};
                _this.routeId ? data = data_updata : data = data_submit;
                this.$ajax({
                        method: 'post',
                        url: '../route/saveRoute',
                        data: data,
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
                        if (res.data.status == 1) {
                            //_this.open2();
                            _this.$message.success('数据提交成功！');
                            _this.tocheckLine();


                        } else {
                            //_this.open4()
                            _this.$message.error('数据提交失败！');
                        }
                    })
                    .catch(function(err) {
                        // _this.open4()
                        _this.$message.error('数据提交失败！');
                    })
            } else {
                _this.$message.warning('请检查,数据不能为空！');

            }

        }

    },
    watch: {
        value1: function(val) {
            this.timestamp = (val).valueOf();
        },
        'msg.linem': function(val) {
            var _this = this;
            if (val) {
                this.$bus.on('edio-todo', function(row_val) {
                    if (row_val.routeId) {
                        console.log(row_val)
                        _this.my_Destination = [row_val.routeName];
                        _this.imageUrl = row_val.imgUrl;
                        _this.title = row_val.title;
                        _this.bargainPrice = row_val.bargainPrice;
                        _this.routeJumpUrl = row_val.routeJumpUrl;
                        _this.routeJumpUrl = row_val.routeJumpUrl;
                        _this.my_addCategory = row_val.tab.split(",");
                        _this.routeId = row_val.routeId;
                        _this.value1 = row_val.cutoffTime;

                    }


                });
            }
        },


    }
}
</script>
<style lang='sass'>
.line {
    position: relative;
    width: 800px;
    left: 50%;
    top: 20px;
    margin-left: -400px;
    .tocheckLine {
        position: absolute;
        right: -140px;
    }
    .upimg {
        .avatar-uploader .el-upload {
            position: relative;
            border: 1px dashed #6ca1e9 !important;
            width: 568px;
            height: 235px;
            margin: 10px 0 10px 54px;
            display: block;
            cursor: pointer;
            .mask {
                position: absolute;
                top: 0;
                left: 0;
                /* display: inline-block; */
                width: 568px;
                height: 235px;
                background-color: rgba(0, 0, 0, .5);
                z-index: 999;
                opacity: 0;
                transition: opacity .3s;
                cursor: pointer;
                .el-icon-view {
                    font-family: element-icons!important;
                    font-size: 30px;
                    color: #FFF;
                    margin-top: 96px;
                }
            }
            .mask:hover {
                opacity: 1;
            }
        }
        .avatar-uploader .el-upload:hover {
            border-color: #20a0ff !important;
            // background-color: rgba(20, 20, 20, .8);
            //  width: 568px;
            // height: 235px;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #ffcc1d;
            width: 178px;
            height: 237px;
            line-height: 237px;
            text-align: center;
        }
        .avatar {
            width: 568px;
            height: 235px;
            display: block;
        }
        .el-upload__tip {
            display: inline-block;
            margin-left: 40px;
            line-height: 25px;
            margin-left: 54px;
        }
        .the_btns {
            text-align: left;
            position: relative;
            top: 0;
            span {
                display: inline-block;
                width: 80px;
                text-align: right;
                margin-left: -30px;
            }
            input {
                height: 30px;
                margin-bottom: 10px;
                margin-left: 0;
            }
            .pice {
                .special {
                    width: 269px;
                    border: 1px solid #dadada;
                    padding: 0 10px;
                }
                .normal {
                    width: 269px;
                    border: 1px solid #dadada;
                    padding: 0 10px;
                }
            }
            .product,
            .the_url {
                width: 638px;
                border: 1px solid #dadada;
            }
            .block {
                .el-input__icon {
                    top: -5px;
                }
                .el-input {
                    .el-input__inner {
                        border-radius: 0;
                        border: 1px solid #dadada;
                        height: 32px;
                    }
                }
            }
        }
    }
    .dic {
        display: inline-block;
        // vertical-align: top;
        height: 82px;
        line-height: 82px;
    }
    .head {
        display: inline-block;
        width: 80%;
        min-height: 30px;
        padding: 4px 0px;
        background-color: #FFF;
        border: 1px solid #dadada;
        overflow: auto;
        overflow-x: hidden;
        vertical-align: middle;
        .el-tag {
            background: url(../../assets/label.png) 0 0 no-repeat;
            background-size: 100% 100%;
            padding: 0px 12px 0px 12px;
            margin: 2px 12px 2px 10px;
            color: #333333;
            height: 30px;
            line-height: 28px;
            cursor: pointer;
        }
    }
    .tag {
        width: 642px;
        margin-left: 54px;
        .tag_1,
        .tag_2 {
            min-height: 30px;
            padding: 10px 5px;
            margin-top: 10px;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: #FFF;
            border: 1px solid #dadada;
            .el-tag {
                background: url(../../assets/label.png) 0 0 no-repeat;
                background-size: 100% 100%;
                padding: 0px 12px 0px 12px;
                margin: 2px 12px 2px 0;
                color: #333333;
                height: 30px;
                line-height: 28px;
                cursor: pointer;
            }
        }
    }
}
</style>
