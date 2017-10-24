<template>
    <div class="view view-user" transition="view">
        <!-- <h3 class="title">文章列表</h3> -->
        <section class="user-section">
            <h2>文章列表</h2>
            <table class="table  table-bordered">
                <tr>
                    <th>id</th>
                    <th>名称</th>
                    <th>时间</th>
                    <th>修改</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in lists">
                    <td>{{item.id}}</td>
                    <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{item.title}}</td>
                    <td>{{item.utime&&item.utime.split(' ')[0]}}</td>
                    <td>
                        <div class="btn btn-info" v-link="{name:'edit', params:{id: item.id +'_'+$route.params.id}}">编辑</div>
                    </td>
                    <td>
                        <div class="btn btn-primary" @click="deleteItem(item)">删除</div>
                    </td>
                </tr>
            </table>
            <div class="btn btn-success" v-link="{name:'edit', params:{id:'add_'+$route.params.id}}">添加</div>
        </section>
        <snackbar :show.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
import api from '../api'
import snackbar from '../components/snackbar.vue'

export default {
    components: {
        snackbar
    },
    data() {
            return {
                lists: '',
                show: false,
                text: ''
            }

        },
        ready() {
            this.getArticleByColumnId();

        },
        methods: {
            getArticleByColumnId() {
                var that = this;
                api.getArticleByColumnId(that, {
                    column_id: that.$route.params.id
                }, (back) => {
                    if (back.resCode == '0') {
                        back.repBody.forEach(value => {
                            value.date = new Date(value.utime);
                        })
                        back.repBody.sort(function(a, b){
                            return a.date < b.date;
                        })
                        that.lists = back.repBody;
                    }
                })
            },
            deleteItem(item) {
                var that = this;
                var body = {
                    id: item.id,
                    type: 'article'
                }
                if (window.confirm("确认删除？")) {
                    api.deleteNavigationOrArticle(that, body, (back) => {
                        if (back.resCode == '0') {
                            this.show = true;
                            this.text = '删除成功';
                            that.getArticleByColumnId();
                        }
                    })
                }

            },

        }
}
</script>
