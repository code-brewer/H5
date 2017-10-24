<template>
    <div>
        <crumbs :icon="crumbs.icon" :class-name="crumbs.className"></crumbs>
        <div class="table">
            <el-table :data="tableData" border style="width: 100%" v-loading.body="loading">
                <el-table-column label="微信号" align="center">
                    <template scope="scope">
                        <edit :scope="scope" :editing="editing" :focus="true"></edit>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="联系方式" align="center">
                    <template scope="scope">
                        <edit :scope="scope" :editing="editing" :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column prop="address" align="center" label="企业" :formatter="formatter">
                    <template scope="scope">
                        <edit :scope="scope" :editing="editing" :focus="false"></edit>
                    </template>
                </el-table-column>
                <el-table-column  label="详情"  align="center">
                    <template scope="scope">
                        <a href="#" style="color: #58B7FF">{{scope.row.date}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template scope="scope">
                        <change-and-del 
                            :scope="scope" 
                            :editing="editing" 
                            :handleEdit="handleEdit"
                            :handleDelete ="handleDelete"
                            > </change-and-del>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="total,prev, pager, next ,jumper"
                        :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import crumbs from './../components/Crumbs.vue'; //顶部面包屑
    import edit from './../components/Edit.vue'; //编辑框
    import changeAndDel from './../components/ChangeAndDel.vue'; //更改和点击按钮
    export default {
        data: function(){
            return {
                crumbs : {
                    icon : 'iconfont icon-yijianfankui',
                    className : '问卷调查',

                },
                url: '../../../static/vuetable.json',
                tableData: [],
                cur_page: 1,
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
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    self.url = '/ms/table/list';
                };
                this.loading  = true
                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
                    this.loading  = false
                    self.tableData = res.data.list;
                })
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
                console.log(row)
                this.$message.error('删除第'+(index+1)+'行');
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