<template>
    <div class="User-detail">
        <div class="User-detail-top">滚动信息管理</div>
        <div class="User-detail-body">
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="15%">信息标题</th>
                            <th width="15%">截止时间</th>
                            <th width="15%">操作</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.title}}</td>
                            <td>{{list.endtime.split(' ')[0]}}</td>
                            <td>
                                <a @click="update(list)" class="btnChange" style="text-decoration:none; line-height: 22px;">修改</a>
                                <a @click="deleteAct(list)" class="btnChange" style="text-decoration:none; line-height: 22px;">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="addtex">
                <a v-link="{path: '/titletex/0'}">增加信息标题</a>
            </div>
        </div>
    </div>
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
        <snackbar :show.sync="show" :text="text"></snackbar>
</template>
<style lang="scss">
.btnChange {
    width: 56px;
    height: 22px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 22px;
    color: #000;
    display: inline-block;
    border-radius: 12px;
    text-decoration: none;
    margin-top: 1px;
    text-decoration: none;
    cursor: pointer;
}

.addtex {
    text-align: center;
    margin-top: 30px;
    >a {
        width: 92px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background-color: #fe7eaf;
        display: inline-block;
        border-radius: 30px;
    }
}
</style>
<script>
import {
    router
} from '../index'
import api from '../api'
import Datepicker from '../components/Datepicker.vue';
import snackbar from '../components/snackbar.vue'
import Modal from '../components/Modal.vue'
export default {
    components: {
        Datepicker,
        Modal,
        snackbar,
    },
    data() {
        return {
            lists: [],
            listData: {
                pageNum: 1,
                pageSize: 12
            },
            id: '',
            delShow: false,
            show: false,
            text: '',

        }
    },
    ready() {
        this.getRollList();
    },

    methods: {
        /**
         * [获取滚动信息列表]
         */
        getRollList() {
            api.getRollList(this, this.listData, (back) => {
                if (back.resCode == "0") {
                    this.lists = back.repBody.list;
                } else {
                    this.$dispatch('errorHandle', '获取信息', back.resCode);
                }
            })
        },
        update(list) {
            localStorage ? localStorage.rollMes = window.JSON.stringify(list) : '';
            this.$router.go({
                path: '/titletex/' + list.id
            });
        },
        deleteAct(list) {
            this.delShow = true;
            this.id = list.id;
        },
        del() {
            this.delShow = false;
            api.deleteRollMes(this, {
                id: this.id
            }, (back) => {
                if (back.resCode == '0') {
                    this.getRollList();
                     this.text = '删除成功';
                    this.show = true;
                    // this.lists.$remove(list);
                } else {
                    this.$dispatch('errorHandle', '删除', back.resCode);
                }
            })
        }
    }
}
</script>
