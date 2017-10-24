<template>
<el-row class="warp">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>日志管理</b></el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>

  <el-col :span="24" class="warp-main">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="control">
        <!-- <el-from-item> -->
        <span style="margin-left: 10px;">用户名：</span>
         <el-input v-model="control.userName" style="width:120px"></el-input>
         <span style="margin-left: 10px;">日期：</span>
         <el-date-picker style="width: 126px" v-model="control.date1" type="date" placeholder="选择日期">
         </el-date-picker>
         <span>--</span>
         <el-date-picker style="width: 126px" v-model="control.date2" type="date" placeholder="选择日期">
         </el-date-picker>
         <span style="margin-left: 10px;">URL：</span>
          <el-input v-model="control.url" style="width:150px"></el-input>
          <el-checkbox-group v-model="control.type" style="display:inline-block">
            <el-checkbox label="只查询异常信息" name="type"></el-checkbox>
          </el-checkbox-group>
        <el-form-item style="margin-left:10px">
          <el-button type="primary" icon="search">查询</el-button>
          <el-button type="primary"><i class="el-icon-upload el-icon--left"></i>导出</el-button>
        </el-form-item>
        <!-- </el-from-item> -->
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" border highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="name" align="center" label="序号" width="160">
      </el-table-column>
      <el-table-column prop="name" align="center" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="操作菜单" width="100">
      </el-table-column>
      <el-table-column prop="age" align="center" label="职位" width="100">
      </el-table-column>
      <el-table-column prop="birth" align="center" label="URL" width="120">
      </el-table-column>
      <el-table-column prop="addr" align="center" label="联系方式" min-width="180">
      </el-table-column>
      <el-table-column prop="addr" align="center" label="操作者IP" min-width="180">
      </el-table-column>
      <el-table-column prop="addr" align="center" label="状态" min-width="180">
      </el-table-column>
      <el-table-column prop="addr" align="center" label="登录时间" min-width="180">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 50, 100, 200]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </el-col>
</el-row>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      control:{
        userName:'',
        url:'',
        date1:'',
        date2:'',
        type:''
      },
      users:[],
      currentPage4: 4,
      loading: false,
    }
  },
  mounted() {
  },
  methods: {
    getChannel: function(e){
      console.log(e);
    },
    handleSizeChange: function(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange: function(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>

<style scoped>

</style>
