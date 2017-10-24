<template>
    <div>
        <crumbs :icon="crumbs.icon" :class-name="crumbs.className"></crumbs>
        <div class="table">
            <el-table v-loading.body="loading" :data="list.tableData" border style="width: 100%">
                <el-table-column  label="微信号" align="center">
                    <template scope="scope">
                        <edit :scope="scope"  attr="userName" :editing="editing" :focus="true"></edit>
                    </template>
                </el-table-column>
                <el-table-column label="联系人"   align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="userName" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="联系方式"  align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="mobile" :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="公司名称"  align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="companyName"  :editing="editing"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="详情"  align="center">
                    <template scope="scope">
                        <a href="#" style="color: #58B7FF">查看详情</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180"  align="center">
                    <template scope="scope">
                       <!--  <el-button size="small"
                                @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                        <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column  label="置顶"  align="center">
                    <template scope="scope">
                        <div >
                            <a @click="handleStick(scope.$index, scope.row)" :style="{color : scope.row.suggestStatus == 1 ? '#58B7FF' : 'rgb(255, 88, 103)'}" style="cursor: pointer;" class="iconfont icon-shangfan"></a>
                        </div>    
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
                    icon : 'iconfont icon-wodefankui',
                    className : '意见建议',

                },
                list : {
                    tableData: [],//表格数据
                    cur_page: 1, //当前页数
                    total : 0,//总数
                    page_size : 10 //每页显示的条数
                },
                editing: false,
                loading : false,
            }
        },
        components : {
            crumbs,
            edit
        },
        created(){
            this.getUserList();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            // handleEdit(index, row) {
            //       if (this.editing&&this.editing == index+1) {
            //         this.editing = false
            //       }
            //       else {
            //         this.editing = index+1;
            //       }
            // },
            handleDelete(index, row) {
                this.delUser(row.pkId)
            },
            handleStick (index, row) {
                console.log(row)
                console.log(row.suggestStatus==2)
                if (row.suggestStatus==2) {
                     this.cancelStick(row.pkId)
                }
                else if (row.suggestStatus==1) {
                    this.stick(row.pkId)
                }
                
            },
            getUserList () {
                this.loading= true ;
                  api.userList(this,{
                   data:
                   {
                    "pageName":"suggestService",
                    "paginator":
                    {
                        "limit":this.list.page_size,    //每页几条  (必填)
                        "page":this.list.cur_page      //第几页       (必填)
                    },
                        "params":{}
                }
                },(res)=>{
                    this.loading = false;
                    if (res.resCode==="000000") {
                     this.list.tableData = res.repBody.list;
                     this.list.total = res.repBody.paginator.totalCount
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            },
            delUser (id) {//删除
                api.delOrSetGoodSuggest(this, {
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
            cancelStick(id) {
                 api.delOrSetGoodSuggest(this, {
                    "status":"1",      //课程名称 (必填)
                    "pkId":id                      //用户id    (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                        this.getUserList()
                        this.$message({
                            type : 'success',
                            message : '取消置顶成功'
                        });
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            },
            stick (id) {//置顶
                 api.delOrSetGoodSuggest(this, {
                    "status":"2",      //课程名称 (必填)
                    "pkId":id                      //用户id    (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                        this.getUserList()
                        this.$message({
                            type : 'success',
                            message : '置顶成功'
                        });
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