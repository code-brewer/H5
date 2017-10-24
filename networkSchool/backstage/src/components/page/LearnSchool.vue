<template>
    <div>
        <crumbs :icon="crumbs.icon" :class-name="crumbs.className"></crumbs>
        <div class="table">
            <el-table :data="list.tableData" border style="width: 100%" v-loading.body="loading">
                <el-table-column label="微信名" align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="userName" :editing="editing" :focus="true"></edit>
                    </template>
                </el-table-column>
                <el-table-column label="联系人姓名" align="center">
                    <template scope="scope">
                        <edit :scope="scope" attr="userName" :editing="editing" :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="联系方式" :formatter="formatter">
                    <template scope="scope">
                        <edit :scope="scope" attr="idxMobile" :editing="editing" :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="课程名称" :formatter="formatter">
                    <template scope="scope">
                        <edit :scope="scope" attr="pkLessonName"  :editing="editing" :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="单位名称" :formatter="formatter">
                    <template scope="scope">
                        <edit :scope="scope" attr="companyName" :editing="editing" :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="报名时间" :formatter="formatter">
                    <template scope="scope">
                        <edit 
                            :scope="scope" 
                            attr="enrollTime" 
                            :editing="editing" 
                            :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template scope="scope">
                        <!-- <change-and-del 
                            :scope="scope" 
                            :editing="editing" 
                            :handleEdit="handleEdit"
                            :handleDelete ="handleDelete"
                            > </change-and-del> -->
                            <el-button size="small" type="danger"
                            @click.native="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import crumbs from './../components/Crumbs.vue'; //顶部面包屑
    import edit from './../components/Edit.vue'; //编辑框
    import changeAndDel from './../components/ChangeAndDel.vue'; //更改和点击按钮
    import api from './../../assets/api.js'
    export default {
        data: function(){
            return {
                crumbs : {
                    icon : 'iconfont icon-mudedi',
                    className : '课程学堂',

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
            edit,
            changeAndDel
        },
        created(){
            this.getUserList()
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                  if (this.editing&&this.editing == index+1) {
                    this.editing = false
                  }
                  else {
                    this.editing = index+1;
                  }
            },
            handleDelete(index, row) {
                this.delUser(row.pkLessonName, row.pkUserid)
            },
            getUserList () {
                this.loading  = true
                api.userList(this,{
                   data:
                   {
                    "pageName":"lessonEnrollService",
                    "paginator":
                    {
                        "limit":this.list.page_size,    //每页几条  (必填)
                        "page":this.list.cur_page      //第几页       (必填)
                    },
                        "params":{}
                }
                },(res)=>{
                    this.loading  = false
                    if (res.resCode==="000000") {
                        var list = res.repBody.list.map(item =>{
                            item.enrollTime  = new Date(item.enrollTime).Format("yyyy-MM-dd");
                            return item 
                        })
                     this.list.tableData = res.repBody.list;
                     this.list.total = res.repBody.paginator.totalCount
                    }
                    else {
                        this.$message.error('请求出错');
                    }
                })
            },
            delUser (name , id) {
                api.delUser(this, {
                    "pkLessonName":name,      //课程名称 (必填)
                    "pkUserid":id                      //用户id    (必填)
                },(res)=>{
                    if (res.resCode==="000000") {
                        this.getUserList()
                        this.$message({
                            type : 'success',
                            message : '删除成功'
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
    
    .active {
        color :  #00d1b2;
    }

</style>