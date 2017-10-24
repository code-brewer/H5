<template>
    <div class="User-detail">
        <div class="User-detail-top">Banner设置：{{today}}</div>
        <div class="User-detail-body">
            <div class="lists">
                <ul class="clearfix">
                    <li>
                        <div class="num">{{1}}</div>
                        <div style="height: 100px;" @drop='drop($event,1)' @dragover='allowDrop($event)'>
                            <img :src="list1.url" alt="拖拽图片到这Banner1">
                    </div>
                        <a @click="deleteAct(list1)">删除</a>
                    </li>
                    <li>
                        <div class="num">{{2}}</div>
                        <div style="height: 100px;" @drop='drop($event,2)' @dragover='allowDrop($event)'>
                        <img :src="list2.url" alt="拖拽图片到这Banner2"></div>
                        <a @click="deleteAct(list2)">删除</a>
                    </li>
                    <li>
                        <div class="num">{{3}}</div>
                        <div style="height: 100px;" @drop='drop($event,3)' @dragover='allowDrop($event)'><img :src="list3.url" alt="拖拽图片到这Banner3">
                        </div>
                        <a @click="deleteAct(list3)">删除</a>
                    </li>
                </ul>
            </div>
            <div class="warehouse">
                <div draggable='true' @dragstart='drag($event ,item.id)' v-for="item in lists" id="{{item.id}}">
                    <img :src="item.url">
                    <p>{{item.name}}</p>
                </div>
                <div>
                    <page :config.sync="pageConfig"></page>
                </div>
            </div>
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
        <load :show.sync="isLoad"></load>
         <Modal :show.sync="delShow">
            <div class="form">
                <h2>确认删除？</h2>
                <div class="btnGroup">
                    <a href="javascript:;" class="btn" @click="del">确认</a>
                    <a href="javascript:;" class="btn" @click="delShow = false">取消</a>
                </div>
                <a href="javascript:;" class="close" @click="delShow = false">x</a>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from '../../api'
import page from '../../components/bannerpage.vue'
import snackbar from '../../components/snackbar.vue'
import load from '../../components/load.vue'
import DateUtils from '../../dist/DateUtils.js'
import Modal from '../../components/Modal.vue'
export default {
    components: {
        snackbar,
        load,
        page,
        Modal
    },
    data() {
        return {
            lists: {},

            list1: {
                createTime: '', //   创建时间
                id: '', //编号
                link: '', // 跳转链接
                modifyTime: '', // 更细时间
                pushTime: '', // 推送时间
                sort: '1', // 排序
                type: '1', // 类型（1-晨起打卡banner）
                url: '' //图片链接
            },
            list2: {
                createTime: '', //   创建时间
                id: '', //编号
                link: '', // 跳转链接
                modifyTime: '', // 更细时间
                pushTime: '', // 推送时间
                sort: '2', // 排序
                type: '1', // 类型（1-晨起打卡banner）
                url: '' //图片链接
            },
            list3: {
                createTime: '', //   创建时间
                id: '', //编号
                link: '', // 跳转链接
                modifyTime: '', // 更细时间
                pushTime: '', // 推送时间
                sort: '3', // 排序
                type: '1', // 类型（1-晨起打卡banner）
                url: '' //图片链接
            },
            show: false,
            text: '',
            isLoad: false,
            settime: '',
            sort:'',//顺序
            pageConfig: {
                total: 1,
                pageSize: '',
                pageNum: 1,
                pageTotal: 1,
            }, //翻页
            delShow:false,//删除弹窗
            bannerId:'',
            today:this.$route.params.time,
        }
    },
    created() {
        this.isLoad = true;
    },
    ready() {
        this.getMBanner();
        this.getBanner();
    },
    methods: {
        /**
         * 获取素材库
         * @return {[type]} [description]
         */
        getMBanner() {
            api.getBannerM(this, {
                // date: this.$route.params.time,
                current: this.pageConfig.pageNum
            }, (back) => {
                this.isLoad = false;
                console.log(back.list)
                this.lists = back.list.map(value => {
                    // value['preview'] = false;
                    value['files'] = value.url ? '1' : '';
                    value['isEdit'] = true;
                    return value;
                });
                this.pageConfig.total = back.totalCount;
                this.pageConfig.pageSize = back.pageSize;
                this.pageConfig.pageTotal = Math.ceil(this.pageConfig.total / this.pageConfig.pageSize) == 0 ? 1 : Math.ceil(this.pageConfig.total / this.pageConfig.pageSize);

            })
        },
        /**
         * 获取当天
         * @return {[type]} [description]
         */
        getBanner() {
            this.list1 = '';
             this.list2 = '';
              this.list3 = '';
            api.getBanner(this, {
                pushTime: this.$route.params.time,
                type: '1'
            }, (back) => {
                this.isLoad = false;
                // console.log(back.object.length);
                    // let arr = [];
                    for (let i = 0;i<back.object.length;i++) {
                        if(back.object[i].sort == '1'){
                            this.list1 = back.object[i];
                        }else if(back.object[i].sort == '2'){
                            this.list2 = back.object[i];
                        }else if(back.object[i].sort == '3'){
                            this.list3 = back.object[i];
                        };
                    }
            })
        },
        /**
         * 添加当天banner
         */
        update(value,sort) {
            // if(sort == '1'&&this.list1 != '')
                api.addBanner(this, {
                    materialLibraryId: value.id,
                    pushTime: this.$route.params.time,
                    sort: sort,
                    type: "1" //  类型（1-晨起打卡banner）
                }, (back) => {
                    this.isLoad = false;
                    value.isEdit = true;
                    if (back.success == '1') {
                        this.getBanner();
                        this.show = true;
                        this.text = '添加成功';
                    }else{
                        this.show = true;
                        this.text = back.remark;
                    }
                })
                // api.updateBannerM(this, {
                //     id: ID,
                //     materialLibraryId: value.id,
                //     pushTime: this.$route.params.time,
                //     sort: sort,
                //     type: "1" //  类型（1-晨起打卡banner）
                // }, (back) => {
                //     this.isLoad = false;
                //     value.isEdit = true;
                //     if (back.success == '1') {
                //         // this.getBanner();
                //         this.show = true;
                //         this.text = '更新成功';
                //     }
                // })
        },
        /**
         * 删除banner
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        del() {
            this.delShow = false;
            api.delBanner(this, {
                bannerId: this.bannerId
            }, (back) => {
                if (back.success == '1') {
                    this.show = true;
                    this.text = '删除成功';
                    this.getBanner();
                } else {
                    this.show = true;
                    this.text = back.remark;
                }
            })
        },
        deleteAct(value) {
            this.delShow = true;
            this.bannerId = value.bannerId;
        },
        /**
         * 获取banner
         * @param  {[type]} ev [description]
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        findBannerM(value,sort) {
            api.findBannerM(this, {
                materialLibraryId: value
            }, (back) => {
                console.log(back)
                    this.update(back.object,sort)
            })
        },
        /**
         * 拖拽
         * @param  {[type]} ev [description]
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        drag: function(ev, id) {
            ev.dataTransfer.setData("id", id);

        },
        drop: function(ev,sort) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("id");
            ev.target.appendChild(document.getElementById(data));
            this.findBannerM(data,sort)
            this.getMBanner()
        },
        allowDrop: function(ev) {
            ev.preventDefault();
        },
    },
    watch: {
        'pageConfig.pageNum' () {
            this.getMBanner();
        }


    },


}
</script>
<style lang="scss">
.btnSubmit {
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    background-color: #fe7eaf;
    display: inline-table;
    // padding: 10px 20px;
    /* margin: 26px auto 0; */
    /* border-radius: 8px; */
    /* cursor: pointer; */
}

.lists {
    // padding: 40px;
    background: white;
    position: relative;
    // top: 100px;
    > div {
        padding: 30px 0;
        font-size: 28px;
        text-align: center;
    }
    li {
        float: left;
        width: 28%;
        padding: 10px 20px;
        border-radius: 8px;
        img {
            width: 160px;
            display: block;
            height: 77.5px;
            margin: 0 auto 15px;
        }
        .div3 {
            display: none;
            margin-bottom: 20px;
        }
        a {
            border: 1px solid;
            padding: 5px 10px;
            margin: 20px;
            color: red;
        }
        .num {
            width: 50px;
            height: 50px;
            /* float: left; */
            border-radius: 50px;
            color: #fff;
            line-height: 50px;
            text-align: center;
            font-size: 24px;
            background: #fe7eaf;
            display: inline-block;
            margin: 10px 87px;
            /* position: absolute; */
            /* top: -33px; */
            /* left: 50px; */
        }
    }
}

.warehouse {
    // width: 800px;
    height: 300px;
    border: 1px solid;
    padding: 10px;
    overflow-y: auto;
    div {
        float: left;
        // width: 25%;
        padding: 10px;
        border-radius: 8px;
    }
    p {
        text-align: center;
    }
    img {
        width: 160px;
            height: 77.5px;
    }
}
.form {
    position: relative;
    padding: 15px;
    line-height: 30px;
    h2 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400px;
        color: #666;
        border-bottom: 1px solid #d6d6d6;
    }
    .row {
        position: relative;
        padding: 5px 0 5px 70px;
    }
    .label {
        position: absolute;
        top: 5px;
        left: 10px;
    }
    p {
        width: 97%;
        height: 28px;
        padding-left: 5px;
        border: 1px solid #d6d6d6;
        border-radius: 5px;
    }
    input {
        width: 97%;
        height: 28px;
        padding-left: 5px;
        border: 1px solid #d6d6d6;
        border-radius: 5px;
    }
    .btn {
        width: 80px;
        height: 30px;
        margin: 15px auto 0;
        line-height: 30px;
        text-align: center;
        color: #ff7201;
        border-radius: 5px;
        background: #ffddc2;
    }
    .updateBtn {
        display: block;
    }
    .close {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 20px;
        color: #999;
    }
    .close:hover {
        color: #333;
    }
    .btnGroup {
        text-align: center;
        a {
            display: inline-block;
            margin: 0 30px;
        }
    }
}
</style>
