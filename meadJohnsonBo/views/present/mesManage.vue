<template>
    <div class="User-detail">
        <div class="User-detail-top">礼品信息管理</div>
        <div class="User-detail-body" style="text-align: right;">
            <div class="search">
                <span class="label">礼品查询</span>
                <div>
                    <input type="text" placeholder="请输入用户名进行搜索" autocomplete="on" v-model="pageConfig.name" />
                    <button class="search-text" @click="getGiftList"><i></i>搜索</button>
                </div>
            </div>
            <div class="User-detail-body-bottom">
                <table class="User-detail-table table">
                    <tbody>
                        <tr>
                            <th width="15%">礼品名称</th>
                            <th width="15%">结束时间</th>
                            <th width="10%">礼品数量</th>
                            <th width="10%">剩余数量</th>
                            <th width="10%">贝壳币价格</th>
                            <th width="40%">操作</th>
                        </tr>
                        <tr v-for="value in lists">
                            <td>{{value.name}}</td>
                            <td>{{value.endtime}}</td>
                            <td>{{value.num}}</td>
                            <td>{{value.leftnum}}</td>
                            <td>{{value.price}}</td>
                            <td>
                                <a href="javascript:;" class="btn btnMove moveUp" @click="move('up', $index)"></a>
                                <a href="javascript:;" class="btn btnMove moveDown" @click="move('down', $index)"></a>
                                <a href="javascript:;" class="btn btnBase btnDefault" @click="update(value)">修改</a>
                                <a href="javascript:;" class="btn btnBase" :class="{disabled: !value.disabled, btnDefault: value.disabled}">上传<input type="file" @change="Import($event,value)" v-show="value.disabled"></a>
                                <a href="javascript:;" class="btn btnBase btnDefault" @click="deleteAct(value.id)">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <page :config.sync="pageConfig"></page>
            <a href="javascript:;" class="btnSubmit" v-link="{path: '/presentMesUpdate/0'}">增加礼品项</a>
        </div>
        <snackbar :show.sync="show" :text="text"></snackbar>
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
import page from '../../components/page.vue'
import snackbar from '../../components/snackbar.vue'
import Modal from '../../components/Modal.vue'
export default {
    components: {
        page,
        snackbar,
        Modal
    },
    data() {
        return {
            pageConfig: {
                total: 1,
                pageSize: 10,
                pageNum: 1,
                pageTotal: 1,
                name: ''
            },
            lists: '',
            show: false,
            text: '',
            id: '',
            delShow: false,
        }
    },
    created() {
        this.getGiftList();
    },
    watch: {
        'pageConfig.pageNum' (val) {
            this.getGiftList();
        }
    },
    methods: {
        /**
         * [获取礼品信息列表]
         */
        getGiftList() {
            api.getGiftList(this, this.pageConfig, back => {
                if (back.resCode == '0') {
                    if (back.repBody.total !== 0) {
                        back.repBody.list.forEach(value => {
                            if (value.configtype == '1') {
                                value['disabled'] = false;
                            } else {
                                if (value.gifttype == '106') {
                                    value['disabled'] = false;
                                } else {
                                    value['disabled'] = true;
                                }
                            }
                        })
                        this.lists = back.repBody.list;
                        this.pageConfig.total = back.repBody.total;
                        this.pageConfig.pageTotal = Math.ceil(this.pageConfig.total / this.pageConfig.pageSize) == 0 ? 1 : Math.ceil(this.pageConfig.total / this.pageConfig.pageSize);
                    } else {
                        this.show = true;
                        this.text = '暂无数据';
                    }
                } else {
                    this.$dispatch('errorHandle', '获取礼品信息列表', back.resCode);
                }
            })
        },
        /**
         * [修改当前礼品]
         * @param  {Object} value [当前礼品对象]
         */
        update(value) {
            window.localStorage.setItem('giftMes', window.JSON.stringify(value));
            this.$router.go({
                path: '/presentMesUpdate/' + value.id
            });
        },
        /**
         * [删除当前礼品]
         * @param  {string} id [当前礼品对象的id]
         */
        deleteAct(id) {
            this.delShow = true;
            this.id = id;
        },
        del() {
            this.delShow = false;
            api.delGift(this, {
                id: this.id
            }, back => {
                if (back.resCode == '0') {
                    this.text = '删除成功';
                    this.show = true;
                    this.getGiftList();
                } else {
                    this.$dispatch('errorHandle', '删除礼品', back.resCode);
                }
            })
        },
        /**
         * [排序]
         */
        move(type, index) {
            var current = this.lists[index],
                target = '';
            if (type === 'up') {
                if (index === 0) {
                    this.show = true;
                    this.text = '已是第一条了';
                    return false;
                }
                target = this.lists[index - 1];
            } else {
                if (index === this.lists.length - 1) {
                    this.show = true;
                    this.text = '已是最后一条了';
                    return false;
                }
                target = this.lists[index + 1];
            }
            if (current.grade !== target.grade) {
                this.show = true;
                this.text = '等级不一致，不可移动';
                return false;
            }
            api.moveGift(this, {
                upid: target.id,
                upseq: target.seq,
                downid: current.id,
                downseq: current.seq
            }, (back) => {
                if (back.resCode === '0') {
                    this.show = true;
                    this.text = type === 'up' ? '上移成功' : '下移成功';
                    this.getGiftList();
                } else {
                    this.$dispatch('errorHandle', '礼品排序', back.resCode);
                }
            })
        },
        /**
         * [导入]
         * @param {element} e     [input元素节点]
         * @param {Object} value [当前对象]
         */
        Import(e, value) {
            var self = e.srcElement || e.target,
                files = self.files[0],
                form = new FormData(),
                xhr = new XMLHttpRequest();
            form.append('file', files);
            form.append('gid', value.id);
            xhr.open('POST', basePath + 'gift/addGiftCode', true);
            xhr.send(form);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {

                    var res = JSON.parse(xhr.responseText);
                    if (res.resCode == 0) {
                        this.getGiftList();
                        this.show = true;
                        this.text = '上传成功';
                    } else {
                        this.$dispatch('errorHandle', 'excel上传', back.resCode);
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss">
.table {
    .btnMove {
        position: relative;
        top: 6px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        -webkit-background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        -o-background-size: 100% 100%;
        -ms-background-size: 100% 100%;
        background-size: 100% 100%;
    }
    .moveUp {
        background-image: url(../../images/top.png);
    }
    .moveDown {
        background-image: url(../../images/bottom.png);
    }
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        filter: alpha(opacity=0);
        z-index: 10;
    }
}
</style>
