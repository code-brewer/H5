<template>
    <div>
        <crumbs :icon="crumbs.icon" :class-name="crumbs.className"></crumbs>
        <div class="table">
            <el-table v-loading.body="loading" :data="list.tableData" border style="width: 100%">
                <!-- <el-table-column  label="微信号" align="center">
                    <template scope="scope">
                        <edit :scope="scope"  attr="userName" :editing="editing" :focus="true"></edit>
                    </template>
                </el-table-column> -->
                <el-table-column label="微信名"  align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="nick" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="标题"   align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="postTheme" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="点赞数"  align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="likeNum" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="回复量"  align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="rspNum" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="浏览量"  align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="cnt" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="详情"  align="center">
                    <template scope="scope">
                        <a href="#" style="color: #58B7FF">查看详情</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="240"  align="center">
                    <template scope="scope">
                        <el-button size="small"
                                @click="handleMessage(scope.$index, scope.row)">回复</el-button>
                        <el-button size="small" type="success"
                                @click="handleEssence(scope.$index, scope.row)">
                                    {{scope.row.postStatus==2  ? '取消精华' : '设为精华'}}
                        </el-button>
                        <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                       
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="total,prev, pager, next ,jumper"
                        :total="list.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import crumbs from './../components/Crumbs.vue'; 
    import edit from './../components/Edit.vue'; //编辑框
    import api from './../../assets/api.js'
    export default {
        data: function(){
            return {
                crumbs : {
                    icon : 'iconfont el-icon-star-off',
                    className : '粉丝互动',

                },
                list : {
                    tableData: [],//表格数据
                    cur_page: 1, //当前页数
                    total : 0,//总数
                    page_size : 10 //每页显示的条数
                },
                editing: false,
                loading : false
            }
        },
        components : {
            crumbs,
            edit
        },
        created(){
           this.getUserList()
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            
            handleMessage(index, row) {
                 this.$message.error('回复'+(index+1)+'行');
            },
            handleDelete(index, row) {
               this.del(row.pkId)
            },
            handleEssence(index, row) {
                if (row.postStatus == 2) {
                    this.cancleEssence(row.pkId)
                }
                else if (row.postStatus == 1) {
                    this.essence(row.pkId)
                }
                
            },
            getUserList () {
                this.loading  = true
                  api.userList(this,{
                   data:
                   {
                    "pageName":"postService",
                    "paginator":
                    {
                        "limit":this.list.page_size,    //每页几条  (必填)
                        "page":this.list.cur_page      //第几页       (必填)
                    },
                        "params":{}
                }
                },(res)=>{
                    this.loading  = false;
                    if (res.resCode==="000000") {
                     this.list.tableData = res.repBody.list;
                     this.list.total = res.repBody.paginator.totalCount
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            },
            del (id) {//删除
                api.delOrSetGoodPost(this, {
                    "status":"3",      //课程名称 (必填)
                    "pkId":id                      //用户id    (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                        this.getUserList()
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            },
            cancleEssence (id) {
                 api.delOrSetGoodPost(this, {
                    "status":"1",      //课程名称 (必填)
                    "pkId":id                      //用户id    (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                         this.$message({
                          message: '取消精华成功',
                          type: 'success'
                        }); 
                         this.getUserList()
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            },
            essence(id) {
                api.delOrSetGoodPost(this, {
                    "status":"2",      //课程名称 (必填)
                    "pkId":id                      //用户id    (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                         this.$message({
                          message: '设置精华成功',
                          type: 'success'
                        }); 
                         this.getUserList()
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-del{
        border-color: #bfcbd9;
        color: #999;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
</style>