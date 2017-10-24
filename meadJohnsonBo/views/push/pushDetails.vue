<template>
    <div class="User-detail">
        <div class="User-detail-top">内容设定</div>
        <div class="User-detail-body">
            <div class="User-detail-body-top">
                <div class="tab clearfix">
                    <div :class="{active: options.type===1}" @click="options.type = 1,this.listPushDate()">正常</div>
                    <div :class="{active: options.type===2}" @click="options.type = 2,this.listPushDate()" style="    border-left: 1px dashed #000;">特殊</div>
                </div>
                <div class="tab clearfix">
                    <div :class="{active: options.status===1}" @click="options.status = 1,this.listPushDate()">打卡</div>
                    <div :class="{active: options.status===2}" @click="options.status = 2,this.listPushDate()" style="    border-left: 1px dashed #000;">补打卡</div>
                </div>
            </div>
            <div class="User-detail-body-bottom">
                <div class="label" v-if="options.status===1">
                    <span>正常打卡时间推送5:00-10:00</span>
                </div>
                <div class="label" v-if="options.status===2">
                    <span>补打卡时间推送10:00-23:59</span>
                </div>
                <div class="rule">
                    <p>“Number”：默认插入值=HB_NUMBER</p>
                    <p>“Time”：默认插入值=HB_TIME</p>
                    <p>“defeat”：默认插入值=HB_DEFEAT</p>
                    <p>“todaycount”：默认插入值=HB_TODAYCOUNT</p>
                    <p>“totalcount”：默认插入值=HB_TOTALCOUNT</p>
                </div>
                
                <div class="formRow1" style="min-height: 30px;">
                    <div id="editor-container" style="width: 100%" v-show="editorShow">
                        <textarea id="editor-trigger" style="height: 400px;" v-model="options.content"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="label1">外链文字：</div>
                    <div>
                        <input type="text" v-model="model1">
                    </div>
                </div>
                <div class="row">
                    <div class="label1">跳转链接：</div>
                    <div>
                        <input type="text" v-model="tzlj">
                    </div>
                </div>
                <div class="row">
                    <a class="btnSubmit btn" @click="yesterdayPushDate">读取模板</a>
                    <a class="btnSubmit btn" @click="updatetzlj">添加</a>
                    <a class="btnSubmit btn" @click="updatepush">保存</a>
                </div>
            </div>
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
import api from '../../api'
import snackbar from '../../components/snackbar.vue'
import utils from '../../../src/utils'
export default {
    components: {
        snackbar
    },
    data() {
        return {
            options: {
                id: '',
                pushTime: this.$route.params.time, //推送日期
                status: 1,
                content: '',
                type: 1 //1-打卡内容推送
            },
            listpush: {
                pushTime: this.$route.params.time, //推送日期
                status: '',
                type: '' //1-打卡内容推送
            },
            id: '',
            editor: '',
            editorShow: false,
            show: false,
            text: '',
            id: '',
            model1: '',
            tzlj: '',
        }
    },
    created() {
        this.loadEditor();
        this.listPushDate();
        // window.onbeforeunload = function() {
        //     return false
        // };
        window.onunload = function() {
            // console.log(curVal, oldVal)
            return false
        };

    },
    watch: {
        // 'options.content' (val) {
        //     this.updatepush1()
        // }

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
                    that.editor.config.menus = [
                        'source',
                        '|', // '|' 是菜单组的分割线
                        'bold',
                        'underline',
                        'italic',
                        'strikethrough',
                        'eraser',
                        'forecolor',
                        'bgcolor'
                    ];
                    // that.editor.config.menus = wangEditor.config.menus.map(value => {
                    //     if (value.match(/^(location|emotion)/)) {
                    //         return '';
                    //     }
                    //     return value;
                    // })
                    wangEditor.plugin(function() {
                        that.editorShow = true;
                    })
                    that.editor.create();
                    that.editor.onchange = function() {
                        that.options.content = that.editor.$txt.html();
                    }
                    that.editor.$txt.html(that.options.content);
                })
            })
        },
        /*
        修改模板
        */
        updatepush() {
            this.options.id = this.id;
            api.updatepush(this, this.options, back => {
                if (back.success == 1) {
                    this.show = true;
                    this.text = '修改成功';
                } else {
                    this.show = true;
                    this.text = '修改失败';
                }
            })

        },
        /*
        修改模板
        */
        // updatepush1() {
        //     this.listpush.pushTime = this.$route.params.time;
        //     api.listpush(this,
        //         this.listpush, back => {
        //             if (back.success == 1) {
        //                 this.options.id = back.object.id;
        //                 api.updatepush(this, this.options, back => {})
        //             }
        //         })
        // },
        /**
         * [添加推送信息]
         */
        addpush() {
            api.addpush(this, this.options, back => {
                if (back.success == 1) {
                    this.show = true;
                    this.text = '添加成功';
                    this.listPushDate();
                } else {
                    this.show = true;
                    this.text = '已有模板，添加失败';
                }
            })
        },
        /*
        获取模板
        */
        listPushDate() {
            console.log(this.listpush.id)
            this.listpush.pushTime = this.$route.params.time;
            this.listpush.status = this.options.status;
            this.listpush.type = this.options.type;
            api.listpush(this,
                this.listpush, back => {
                    this.editor.$txt.html();
                    if (back.success == 1) {
                        this.options.content = back.object.content;
                        this.editor.$txt.html(this.options.content);
                        this.id = back.object.id;
                    }
                    if (back.code == 501) {
                        this.options.content = '';
                        this.editor.$txt.html(this.options.content);
                        this.show = true;
                        this.text = '请读取模板';
                    }
                })
        },
        /*
        获取固定的模板
        */
        yesterdayPushDate() {
            this.listpush.pushTime = '2017-05-01';
            this.listpush.status = this.options.status;
            this.listpush.type = this.options.type;
            api.listpush(this,
                this.listpush, back => {
                    this.editor.$txt.html();
                    if (back.success == 1) {
                        this.options.content = back.object.content;
                        this.editor.$txt.html(this.options.content);
                        this.options.id = '';
                        this.show = true;
                        this.text = '读取模板成功';
                        console.log(this.options)
                        this.addpush();
                    }
                })
        },
        updatetzlj() {
            this.editor.$txt.html(this.editor.$txt.html() + '<p><a href="' + this.tzlj + '">' + this.model1 + '</p>');
        }
    }
}
</script>
<style lang="scss" scoped>
.label {
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    margin: 10px;
}

.formRow1 {
    position: relative;
    padding-left: 80px;
}

.tab {
    /* background: -webkit-linear-gradient(top, #3BA3D6, #2A5BA3) !important; */
    width: 110px;
    /* font-size: 12px; */
    padding: 10px;
    border-radius: 10px;
    border: 1px solid;
    margin: 10px 0px;
    > div {
        float: left;
        font-size: 1em;
        padding: 0 10px;
        cursor: pointer;
        &.active {
            color: red;
        }
    }
    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        z-index: 100;
    }
}

.rule {
    position: absolute;
    top: 40px;
    right: 0px;
}

.btn {
    display: initial;
    padding: 5px 20px;
    margin: 20px 60px 0;
}

.row {
    position: relative;
    padding: 5px 0 5px 70px;
}

.label1 {
    position: absolute;
    top: 11px;
    left: 10px;
}

input {
    width: 97%;
    height: 28px;
    padding-left: 5px;
    border: 1px solid #d6d6d6;
    border-radius: 5px;
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
