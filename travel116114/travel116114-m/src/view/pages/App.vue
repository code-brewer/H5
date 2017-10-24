<template>
    <div id="app">
        <el-row>
            <el-col>
                <el-col :span="4">
                    <div class="logo">
                        <img class="img_logo" src="../../img/116114logo.png" height="75" width="178">
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="tilte">
                        <img src="../../img/title_msg.png" height="26" width="156">
                        <div style="position: absolute;right: 30px;height: 62px;line-height:62px;"><span>欢迎您,{{username}}</span>
                            <button style="margin-left: 10px;width: 80px;height: 30px;background-color: #fbfbfb;border: none;
    cursor: pointer;" @click="loginOut()">安全退出</button>
                        </div>
                    </div>
                    <div style="height: 48px;border-top: 1px solid #d9d9d9;border-bottom: 1px solid #d9d9d9;background-color:#fafafa;line-height:48px;padding-left: 30px">
                        {{nav_msg}}
                        <button v-show="excelBtn" style="position: absolute;right: 30px;width: 120px;height: 30px;background-color: rgb(255, 204, 29);border: none;margin-top: 10px;border-radius: 5px;font-size: 16px;line-height: 30px;" @click="outexcel()">导出excel</button>
                    </div>
                </el-col>
            </el-col>
        </el-row>
        <el-row style="height: calc(100% - 112px);">
            <el-col :span="4" class="yc_menu_left">
                <el-menu default-active="0" class="" @open="handleOpen" @close="handleClose">
                    <p style="text-align: left;padding-left: 40px;color: #FFF;font-size: 16px;">菜单：</p>
                    <el-menu-item index="0" class="menu_li" @click="whitch_btn('banner')">
                        <div id="showImgbanner">
                            <span class="showImg" style="background: url(../dist/static/banner_black.png) 0 0 no-repeat;"></span>Banner
                        </div>
                    </el-menu-item>
                    <el-menu-item index="1" class="menu_li" @click="whitch_btn('type')">
                        <div id="showImgfinal">
                            <span class="showImg" style="background: url(../dist/static/final_white.png) 0 0 no-repeat;"></span>目的地
                        </div>
                    </el-menu-item>
                    <el-menu-item index="2" class="menu_li" @click="whitch_btn('router')">
                        <div id="showImgrouter">
                            <span class="showImg" style="background: url(../dist/static/route_white.png) 0 0 no-repeat;"></span>路线
                        </div>
                    </el-menu-item>
                    <el-menu-item index="3" class="menu_li" @click="whitch_btn('data')">
                        <div id="showImgdata">
                            <span class="showImg" style="background: url(../dist/static/date_white.png) 0 0 no-repeat;"></span>数据
                        </div>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span='20' class="my-view">
                <bannerm v-show="showCom.bannerm" ref="bannerm"></bannerm>
                <datam v-show="showCom.datam" ref="datam"></datam>
                <linem v-show="showCom.linem" :msg="showCom" ref="linem"></linem>
                <typem v-show="showCom.typem" ref="typem"></typem>
                <checklinem v-show="showCom.checklinem" :msg="showCom" ref="checklinem"></checklinem>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'app',
    components: {
        bannerm: require('./banner_m.vue'),
        datam: require('./data_m.vue'),
        linem: require('./line_m.vue'),
        typem: require('./type_m.vue'),
        checklinem: require('./check_line.vue'),

    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            placeinput: '',
            nav_msg: '广告管理',
            showCom: {
                bannerm: true,
                datam: false,
                linem: false,
                typem: false,
                checklinem: false,
            },
            username: '',
            excelBtn: false,
            // choseImg: {
            //     banner: '../static/banner_white.png',
            //     final: '../static/final_white.png',
            //     router: '../static/route_white.png',
            //     data: '../static/date_white.png',
            // },
        }
    },
    beforeCreate: function() {
        //读取cookie
        var namelist = ['user', 'pw']
        for (let i = 0; i < namelist.length; i++) {
            var arr, reg = new RegExp("(^| )" + namelist[i] + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                // alert(unescape(arr[2]));
            } else {
                console.log("用户未登录");
                window.location.href = location.href.split("dist")[0] + "dist/login.html";
            }

        }
    },
    mounted: function() {
        localStorage.user ? this.username = localStorage.user : null
    },
    methods: {
        loginOut() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../user/loginOut',
                    data: {
                        username: _this.username,
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
                    if (res.data.status == 1) {
                        _this.$message.success('退出成功！');
                        localStorage.user = '';
                        localStorage.pw = '';
                        localStorage.checked = false;
                        window.location.href = location.href.split("dist")[0] + "dist/login.html";
                    } else {
                        _this.$message.error('操作失败！');

                    }
                })
                .catch(function(err) {
                    _this.$message.error('操作失败！');
                })

        },
        outexcel() {
            window.location.href = location.href.split("dist")[0] + "/data/export?dataProductName=" + window.dataProductName + "&createdTimeStartLong=" + window.createdTimeStartLong + "&createdTimeEndLong=" + window.createdTimeEndLong;
        },
        whitch_btn(val) {
            var _this = this;
            for (var key in _this.showCom) {
                _this.showCom[key] = false;
            }
            var imgs = ['banner_white', 'final_white', 'route_white', 'date_white']

            for (var key in imgs) {
                document.querySelectorAll('.showImg')[key].style = 'background:url(../dist/static/' + imgs[key] + '.png)';
            }
            switch (val) {
                case 'banner':
                    _this.showCom.bannerm = true;
                    document.querySelectorAll('.showImg')[0].style = 'background:url(../dist/static/banner_black.png)';
                    _this.nav_msg = "广告管理";
                    _this.excelBtn = false;
                    this.$refs.bannerm.getbannerlist();

                    break;
                case 'type':
                    _this.showCom.typem = true;
                    document.querySelectorAll('.showImg')[1].style = 'background:url(../dist/static/final_black.png)';
                    _this.nav_msg = "目的地类别管理";
                    _this.excelBtn = false;
                    this.$refs.typem.checkallDestination();
                    this.$refs.typem.checkallCategory();

                    break;
                case 'router':
                    _this.showCom.linem = true;
                    document.querySelectorAll('.showImg')[2].style = 'background:url(../dist/static/route_black.png)';
                    _this.nav_msg = "路线管理";
                    _this.excelBtn = false;
                    this.$refs.linem.checkallDestination();
                    this.$refs.linem.checkallCategory();
                    this.$refs.linem.clearMsg();

                    break;
                case 'data':
                    _this.showCom.datam = true;
                    document.querySelectorAll('.showImg')[3].style = 'background:url(../dist/static/date_black.png)';
                    _this.nav_msg = "数据管理";
                    _this.excelBtn = true;
                    this.$refs.datam.getList();


                    break;
                default:
                    console.log("不存在类型");
            }

        },
        startHacking() {
            this.$notify({
                title: 'It Works',
                message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
                duration: 6000
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //点击图片查看已经上传的图片
        handlePictureCardPreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //上传成功返回的钩子
        handlesuccess(response, file, fileList) {
            console.log("上传成功返回的钩子", file.status)
        },
        //上传错误返回的钩子
        handleerror(err, file, fileList) {
            console.log("上传错误返回的钩子", file.status)

        },
        //上传的钩子
        submitUpload() {
            this.$refs.upload.submit();
        },
        beforupload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            var fileData = file;
            var Max_Height = 290;
            var Max_Width = 720;
            //读取图片数据
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload = function() {
                    var width = image.width;
                    var height = image.height;
                    // alert([width,height])
                    isAllow = width >= Max_Width && height >= Max_Height;
                    // showTip2(isAllow);
                };
                image.src = data;
            };
            reader.readAsDataURL(fileData);
        }

        // handleRemove(file, fileList) {
        //     console.log(file, fileList);
        // },
        // handlePreview(file) {
        //     console.log(file);
        // }
    },
    watch: {
        'showCom.checklinem': function(val, oldVal) {
            // alert([val, oldVal])
            if (val == true) {
                this.nav_msg = "查看路线";
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

#app {
    height: 100%;
    .logo {
        position: relative;
        width: 100%;
        min-width: 190px;
        height: 112px;
        .img_logo {
            position: absolute;
            left: 50%;
            margin-left: -89px !important;
            top: 50%;
            margin-top: -37.5px !important;
        }
    }
    .tilte {
        position: relative;
        height: 62px;
        background-color: #ffcc1d;
        img {
            position: absolute;
            top: 50%;
            margin-top: -13px;
            margin-left: 30px;
        }
    }
    .yc_menu_left {
        height: 100%;
        .menu_li {
            width: 80%;
            height: 25px;
            line-height: 25px;
            display: inline-block;
            margin-bottom: 20px;
            text-align: left;
            .showImg {
                display: inline-block;
                vertical-align: top;
                width: 25px;
                height: 25px;
            }
            #showImgbanner:hover {
                span {
                    background: url(../../static/banner_black.png) 0 0 no-repeat !important;
                }
            }
            #showImgfinal:hover {
                span {
                    background: url(../../static/final_black.png) 0 0 no-repeat !important;
                }
            }
            #showImgrouter:hover {
                span {
                    background: url(../../static/route_black.png) 0 0 no-repeat !important;
                }
            }
            #showImgdata:hover {
                span {
                    background: url(../../static/date_black.png) 0 0 no-repeat !important;
                }
            }
        }
    }
    .my-view {
        position: relative;
        background-color: #f5f6f6;
        height: 100%;
        // overflow-y: hidden;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .el-menu-item,
    .el-submenu__title {
        color: #FFF;
    }
    .el-menu-item:hover,
    .is-active {
        color: rgb(20, 20, 20);
        background-color: #ffcc1d;
        border-radius: 3px;
        width: 80%;
    }
    // .el-row {
    //     &:last-child {
    //         margin-bottom: 0;
    //     }
    // }
    // .el-col {
    //     padding: 0 !important;
    //     margin: 0 !important;
    // }
    .el-menu {
        width: 100%;
        height: 100%;
        height: 100%;
        background: url(../../img/nav_bg.png) 0 0 no-repeat;
        background-size: 100% 100%;
        text-align: center;
    }
    // .bg-purple-dark {
    //     background: #99a9bf;
    // }
    // .grid-content {
    //     min-height: 36px;
    // }
}
</style>
