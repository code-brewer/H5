<template>
    <div class="view view-user" transition="view">
        <section class="user-section">
            <div class="left">
                <h2>二级菜单</h2>
                <table class="table  table-bordered">
                    <tr>
                        <th>id</th>
                        <th>名称</th>
                        <th>修改</th>
                        <th>列表</th>
                        <th>操作</th>
                        <th v-show="isShowCondition">筛选条件</th>
                        <th>快捷服务</th>
                    </tr>
                    <tr v-for="item in lists">
                        <td>{{item.id}}</td>
                        <td>
                            <input type="text" class="inputText" v-model="item.title">
                        </td>
                        <td>
                            <div class="btn btn-primary" @click="save(item)">保存</div>
                        </td>
                        <td>
                            <div class="btn btn-info" v-link="{name:'list', params:{id:item.id}}">文章列表</div>
                        </td>
                        <td>
                            <div class="btn btn-primary" @click="deleteItem(item)">删除</div>
                        </td>
                        <td v-show="isShowCondition">
                            <select v-model="item.screening_conditions">
                                <option value="全部">全部</option>
                                <option value="区域">区域</option>
                                <option value="企业类型">企业类型</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="item.rank" @change="change(item)">
                                <option value="0">无</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <div class="form-group" v-if="show">
                    <label>
                        <span>栏目标题</span>
                        <input type="text" class="inputText" placeholder="请输入栏目标题" v-model="addTitle">
                        <div class="btn btn-info" @click="sure">确定</div>
                        <div class="btn btn-warning" @click="cancel">取消</div>
                    </label>
                </div>
                <div class="btn btn-success" @click="showModal">添加</div>
            </div>
            <div class="clear"></div>
        </section>
        <snackbar :show.sync="snackbarShow" :text="snackbarText"></snackbar>
    </div>
</template>
<style type="text/css">
.clear {
    clear: both;
}

.title {
    height: 60px;
    line-height: 60px;
}

.title a {
    width: 49%;
    display: inline-block;
    text-align: center;
}
</style>
<script>
import api from '../api'
import snackbar from '../components/snackbar.vue'

export default {
    components: {
        snackbar
        // Modal
    },
    data() {
        return {
            lists: '',
            addTitle: '',
            show: false,
            snackbarShow: false,
            snackbarText: '',
            modalShow: false,
            select: '',
            isShowCondition: false
        }
    },
    ready() {
        this.$dispatch('setActive', this.$route.params.id);
        this.getNavigationList();
        this.isShowCondition = this.$route.params.id === '5' ? true : false;
    },
    watch: {
        '$route.params.id' (val) {
            this.$dispatch('setActive', val);
            this.getNavigationList();
            this.isShowCondition = val === '5' ? true : false;
        }
    },
    methods: {
        setCondition(path) {
            
        },
        getNavigationList() {
            var that = this;
            var body = {
                type: 'child',
                parent_id: that.$route.params.id
            }
            api.getNavigationList(that, body, (back) => {
                if (back.resCode == '0') {
                    that.lists = back.repBody;
                    that.lists.forEach(value => {
                        if (!value.screening_conditions && this.$route.params.id === '5') {
                            value.screening_conditions = '全部';
                        }
                    })
                }

            })
        },
        showModal() {
            this.show = true;
        },
        cancel() {
            this.show = false;
            this.addTitle = '';
        },
        sure() {
            var that = this;
            var body = {
                parent_id: that.$route.params.id,
                title: that.addTitle
            }
            api.addNavigation(that, body, (back) => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = '添加成功';
                    that.getNavigationList();
                    that.show = false;
                    that.addTitle = '';

                }
            })
        },
        deleteItem(item) {
            var that = this;
            var body = {
                id: item.id,
                type: 'navigation'
            }
            if (window.confirm("确认删除？")) {
                api.deleteNavigationOrArticle(that, body, (back) => {
                    if (back.resCode == '0') {
                        this.snackbarShow = true;
                        this.snackbarText = '删除成功';
                        that.getNavigationList();
                    }
                })
            }
        },
        save(item) {
            var that = this;
            var body = {
                navigation_id: item.id,
                title: item.title,
                logo_url: item.logo_url || '',
                screening_conditions: this.$route.params.id === '5' ? item.screening_conditions : ''
            };
            api.editNavigation(that, body, (back) => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = '修改成功';
                }
            })
        },
        change(item) {
            api.editNavigationRank(this, {
                navigation_id: item.id,
                navigation_rank: item.rank
            }, back => {
                if (back.resCode == '0') {
                    this.snackbarShow = true;
                    this.snackbarText = '设置成功';
                    this.getNavigationList();
                }
            })
        }
    }

}
</script>
