<template>
    <div class="User-detail">
        <div class="User-detail-top">{{title}}</div>
        <div class="User-detail-body">
            <div>
                <div class="formRow">
                    <div class="label">
                        <span>设置类型</span>
                    </div>
                    <div class="select">
                        <select v-model="options.type">
                            <!-- <option selected="selected">{{['请选择','1人团','10人团','20人团','30人团'] [options.type]}}</option> -->
                            <option value="0">1人团</option>
                            <option value="1">10人团</option>
                            <option value="2">20人团</option>
                            <option value="3">30人团</option>
                        </select>
                    </div>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>活动名称</span>
                    </div>
                    <input type="text" maxlength="44" v-model="options.title" />
                </div>
                <div class="formRow" style="width: 778px;">
                    <div class="label">
                        <span>开始时间</span>
                    </div>
                    <input type="text" onclick="laydate({istime: true, event: 'click', format: 'YYYY-MM-DD hh:mm:ss'})" v-model="options.beginTime" />
                    <!-- <input id="d11" type="text" onClick="WdatePicker()" /> -->
                </div>
                <div class="formRow" style="width: 778px;">
                    <div class="label">
                        <span>结束时间</span>
                    </div>
                    <input id="end" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" v-model="options.endTime" />
                </div>
                <div class="formRow" v-show='isgroup'>
                    <div class="label">
                        <span>拼团时限</span>
                    </div>
                    <input type="text" class="coinInput" style="text-align: center;" v-model="options.limitHour" />
                    <span style="font-size: 12px;">小时</span>
                </div>
                <div class="formRow clearfix" style="width:777px">
                    <div class="left">
                        <div class="label">
                            <span>市场参考价</span>
                        </div>
                        <input type="text" class="coinInput" v-model="options.originalPrice" style="text-align: center;" />
                        <span style="font-size: 12px;">元</span>
                    </div>
                    <div class="right" style="padding-right:140px;">
                        <div class="label">
                            <span>贝壳币</span>
                        </div>
                        <input type="text" class="coinInput" v-model="coin" style="text-align: center;" />
                        <span style="font-size: 12px;">个</span>
                    </div>
                    <div class="right" style="padding-right:85px;">
                        <div class="label">
                            <span>花妈价</span>
                        </div>
                        <input type="text" class="coinInput" v-model="price" style="text-align: center;" />
                        <span style="font-size: 12px;">元</span>
                    </div>
                </div>
                <div class="formRow clearfix">
                    <div class="left">
                        <div class="label">
                            <span>库存（份）</span>
                        </div>
                        <input type="text" class="coinInput" v-model="options.stock" style="text-align: center;" />
                    </div>
                    <div class="right" style="padding-right:5px;">
                        <div class="label">
                            <span>可用优惠券</span>
                        </div>
                        <div class="select">
                            <select v-model="options.couponType">
                                <!-- <option selected="selected">{{['请选择','无','全部','5元','10元'][options.couponType]}}</option> -->
                                <option value="1">无</option>
                                <option value="2">全部</option>
                                <option value="3">5元</option>
                                <option value="4">10元</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>上传图片</span>
                    </div>
                    <img :src="options.pictrueUrl" alt="上传图片" style="width: 100px;height: 100px;">
                    <a href="javascript:;" class="uploadBtn1">上传<input type="file" @change="upload($event,'upload')"></a>
                </div>
                <div class="formRow">
                    <div class="label">
                        <span>上传商品详情图片</span>
                    </div>
                    <a href="javascript:;" class="uploadBtn1">上传<input type="file" @change="upload($event,'upload1')"></a>
                </div>
                <div class="formRow1" style="min-height: 30px;">
                    <div class="label">
                        <span>活动详情</span>
                    </div>
                    <div id="editor-container" style="width: 100%" v-show="editorShow">
                        <textarea id="editor-trigger" style="height: 200px;" v-model="options.description"></textarea>
                    </div>
                </div>
                <div style="display:relative; padding-bottom: 20px;">
                    <a class="btnSubmit left" @click="Show()">活动预览</a>
                    <a class="btnSubmit " @click="addActivity()">确认创建</a>
                </div>
            </div>
            <snackbar :show.sync="show" :text="text"></snackbar>
            <!--  弹窗 -->
            <Modal :show.sync="detailShow">
                <div class="shopDetailShow">
                    <div class="detail">
                        <img :src="options.pictrueUrl">
                        <span>
                            <p class = "p1">{{options.title}}</p>
                        </span>
                    </div>
                    <div class="group_rule_detail">
                        {{{options.description}}}
                    </div>
                    <a href="javascript:;" class="showclose" @click="ShowClose">x</a>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import Datepicker from '../../components/Datepicker.vue'
import api from '../../api'
import snackbar from '../../components/snackbar.vue'
import Modal from '../../components/Modal.vue'
import DateUtils from '../../dist/DateUtils.js'
import laydate from '../../laydate/laydate.js'
// import WdatePicker from '../../My97DatePicker/WdatePicker.js'
export default {
    components: {
        Datepicker,
        snackbar,
        Modal,

    },
    data() {
        return {
            show: false,
            text: '',
            options: {
                id: '',
                title: '', // (组团标题)
                pictrueUrl: '',
                description: '', // 活动介绍
                originalPrice: '', //(原价)
                groupPrice: '', //(活动价格    格式: 现金,贝壳币)
                stock: '', // (库存)
                groupNumber: '', // (组团人数)
                limitNumber: '1', //(限购)
                couponType: '1', // (优惠券类型：1-无  2-全部  3-5元  4-10元)
                beginTime: '', // (活动开始时间 格式：yyyy-MM-dd HH:mm:ss)
                endTime: '', // (活动结束时间 格式：yyyy-MM-dd HH:mm:ss)
                type: '', // (活动类型   注: 0-1人团   1-10人团  2-20人团   3-30人团')
                limitHour: '', // 拼团限时,单位小时（0-不限时）
            },
            coin: '', //贝壳币
            price: '', //花妈价
            optionstemp: {}, //临时存放礼品信息
            editorShow: false,
            isgroup: true,
            title: '',
            detailShow: false,
        }
    },
    created() {
        if (this.$route.params.id) {
            this.title = '修改活动';
            this.getfind();
        } else {
            this.title = '创建活动'
        };
        this.loadEditor();
    },
    ready() {
        // WdatePicker({
        //     isShowClear: false,
        //     readOnly: true
        // })

    },
    watch: {
        'options.type' (val) {
            if (val == '0') {
                this.isgroup = false;
            } else {
                this.isgroup = true;
            }
        },

        'options.title' (val) {
            if (val.length >= '44') {
                alert("字数超出限制");
            }
        },

    },
    methods: {
        /**
         * 加载文本编辑器
         */
        loadEditor() {
            var that = this;
            require(['../../js/wangEditor.js'], function(wangEditor) {
                that.$nextTick(function() {
                    that.editor = new wangEditor('editor-trigger');
                    that.editor.config.menus = wangEditor.config.menus.map(value => {
                        if (value.match(/^(location|emotion)/)) {
                            return '';
                        }
                        return value;
                    })
                    wangEditor.plugin(function() {
                        that.editorShow = true;
                    })
                    that.editor.create();
                    that.editor.onchange = function() {
                        that.options.description = that.editor.$txt.html();
                    }
                    that.editor.$txt.html(that.options.description);
                })

            })
        },
        /**
         * [上传头像]
         * @param  {element} e [element元素]
         */
        upload(e,type) {
            var self = e.srcElement || e.target,
                files = self.files[0],
                form = new FormData(),
                xhr = new XMLHttpRequest();
            form.append('Content-Type', files.type || 'application/octet-stream');
            form.append('file', files)
            xhr.open('POST', basePath_3 + 'resource/upload/image', true);
            xhr.send(form);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    var res = JSON.parse(xhr.responseText);
                    console.log(type)
                    if ('upload' === type) {
                        this.options.pictrueUrl = res.url;
                    } else {
                        this.editor.$txt.html(this.editor.$txt.html() + '<img style = "max-width: 516px;" src="' + res.url + '"/>');
                    }
                    // this.options.pictrueUrl = basePath_4 + res.url.split("bbgp/")[1];
                    console.log(this.options.pictrueUrl)
                    this.show = true;
                    this.text = '图片上传成功';
                }
            }
        },
        /**
         * [上传图片]
         * @param  {element} e [element元素]
         */
        // upload1(e) {
        //     var self = e.srcElement || e.target,
        //         files = self.files[0],
        //         form = new FormData(),
        //         xhr = new XMLHttpRequest();
        //     form.append('Content-Type', files.type || 'application/octet-stream');
        //     form.append('file', files)
        //     xhr.open('POST', basePath_3 + 'resource/upload/image', true);
        //     xhr.send(form);

        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState === 4) {
        //             var res = JSON.parse(xhr.responseText);
        //             this.editor.$txt.html(this.editor.$txt.html() + '<img style = "max-width: 516px;" src="' + res.url + '"/>');
        //             // this.editor.$txt.html(this.editor.$txt.html() + '<img style = "max-width: 516px;" src="' + basePath_4+ res.url.split("bbgp/")[1] + '"/>');
        //             this.show = true;
        //             this.text = '图片上传成功';
        //         }
        //     }
        // },
        /**
         * 添加活动
         */
        addActivity() {
            console.log(basePath_3)
            if (!this.options.beginTime) {
                alert("开始时间为空");
                return;
            } else if (!this.options.endTime) {
                alert("结束时间为空");
                return;
            } else if (this.options.beginTime > this.options.endTime) {
                alert("开始时间大于结束时间");
                return;
            } else if (!this.options.title) {
                alert("组团标题");
                return;
            } else if (!this.options.pictrueUrl) {
                alert("图片为空");
                return;
            } else if (!this.options.originalPrice) {
                alert("原价为空");
                return;
            } else if (!this.options.stock) {
                alert("库存为空");
                return;
            }
            if (this.options.type == 0) {
                this.options.groupNumber = 1
            } else if (this.options.type == 1) {
                this.options.groupNumber = 10
            } else if (this.options.type == 2) {
                this.options.groupNumber = 20
            } else if (this.options.type == 3) {
                this.options.groupNumber = 30
            }
            if (this.coin == '') {
                this.coin = '0'
            }
            this.options.groupPrice = this.price + ',' + this.coin;
            if (this.$route.params.id) {
                api.updateActivity(this, this.options, (back) => {
                    if (back.success == 1) {
                        this.$router.go({
                            path: '/activityManage'
                        });
                    } else {
                        this.show = true;
                        this.text = back.resMsg;
                    }
                })
            } else {
                api.addActivity(this, this.options, (back) => {
                    if (back.success == 1) {
                        this.$router.go({
                            path: '/activityManage'
                        });
                    } else {
                        this.show = true;
                        this.text = back.resMsg;
                    }
                })
            }

        },
        /**
         * 获取活动详情
         */
        getfind() {
            api.findActivity(this, {
                id: this.$route.params.id
            }, (back) => {
                if (back.success == 1) {
                    // console.log(back.object.limitHour)
                    if (back.object.limitHour == '0') {
                        this.isgroup = false;
                    }
                    this.options = back.object;
                    this.options.beginTime = DateUtils.formatDate(new Date(this.options.beginTime), 'yyyy-MM-dd HH:mm:ss');
                    this.options.endTime = DateUtils.formatDate(new Date(this.options.endTime), 'yyyy-MM-dd HH:mm:ss');
                    this.coin = this.options.groupPrice.split(',')[1];
                    this.price = this.options.groupPrice.split(',')[0];
                    this.editor.$txt.html(this.options.description);
                }

            })
        },
        /**
         * 预览
         */
        Show() {
            this.detailShow = true;
        },
        /**
         * 关闭预览
         */
        ShowClose() {
            this.detailShow = false;
        },
    }
}
</script>
<style lang="scss" scoped>
img {
    max-width: 340px;
}

.configureType {
    position: absolute;
    top: 15px;
    right: 30px;
    height: 30px;
    line-height: 30px;
    div {
        display: inline-block;
        padding-left: 10px;
    }
    select {
        vertical-align: middle;
    }
}

.formRow {
    width: 405px;
    font-size: 0;
    .select {
        display: inline-block;
        line-height: 30px;
        select {
            vertical-align: middle;
        }
    }
    .coinInput {
        width: 50px;
        height: 28px;
        margin-right: 10px;
    }
    .uploadBtn,
    .uploadBtn1 {
        width: 80px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 0 5px 5px 0;
        border: 1px solid #d6d6d6;
        background: -webkit-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -moz-linear-gradient(top, #fcfcfc, #d9d7d7);
        background: -o-linear-gradient(top, #fcfcfc, #d9d7d7);
        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            filter: alpha(opacity=0);
            z-index: 10;
            cursor: pointer;
        }
    }
    .uploadBtn {
        position: absolute;
        top: 0;
        right: 5px;
    }
    .uploadBtn1 {
        position: relative;
        display: inline-block;
        border-radius: 5px;
    }
}

.formRow1 {
    position: relative;
    padding-left: 80px;
    padding-bottom: 15px;
    .label {
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        text-align: right;
        line-height: 30px;
        font-size: 12px;
    }
}

.btnSubmit {
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background-color: #fe7eaf;
    display: inline-block;
    margin: 20px 50px 0;
    border-radius: 8px;
    cursor: pointer;
}

.shopDetailShow {
    // background: #F4CE5D;
    /* border-radius: 10px; */
    // padding-bottom: 10px;
    border: 10px solid #F4CE5D;
    li {
        padding: 10px 10px 0px 10px;
    }
    .p1 {
        font-size: 30px;
        background: #fff;
    }
}

.detail {
    background: url(../../images/shopBg.png) no-repeat;
    overflow: hidden;
    border-bottom: 10px solid #F4CE5D;
    img {
        float: left;
        padding: 63px 4px 6px 44px;
        width: 160px;
        height: 160px;
    }
    span {
        width: 54%;
        float: right;
        margin: 89px 10px 0 0;
        // text-align: center;
    }
    p {
        font-size: 26px;
        font-family: 黑体;
        margin: 5px;
        border-radius: 5px;
    }
    .p1 {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
    }
}

.group_rule_detail {
    margin: 0px auto;
    padding: 20px;
    background: #fff;
    font-size: 26px;
    overflow-y: auto;
    height: 332px;
}

.showclose {
    position: fixed;
    font-size: 40px;
    color: #fff;
    line-height: 70px;
    text-align: center;
    height: 80px;
    width: 80px;
    right: -120px;
    top: 301px;
    /* border: 1px solid; */
    background: red;
    border-radius: 50%;
    /* padding: 5px 20px; */
}
</style>
<style>
#editor-container {
    display: inline-block;
}

#editor-container i {
    font-size: 16px;
}
</style>
