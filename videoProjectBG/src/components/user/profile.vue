<template>
<el-row class="warp">
  <el-col :span="24" class="warp-breadcrum">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><b>系统管理</b></el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>

  <el-col :span="24" class="warp-main">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="control">
        <!-- <el-from-item> -->
        <span style="margin-left: 25px;">用户名：</span>
         <el-input v-model="control.userName" style="width:150px"></el-input>
        <span style="margin-left: 25px;">姓名：</span>
         <el-input v-model="control.name" style="width:150px"></el-input>
        <el-form-item style="margin-left:25px">
          <el-button type="primary" icon="search">查询</el-button>
          <el-button type="primary"><i class="el-icon-plus el-icon--left"></i>添加用户</el-button>
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
      <el-table-column prop="sex" align="center" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="age" align="center" label="联系方式" width="100">
      </el-table-column>
      <el-table-column prop="birth" align="center" label="职位" width="120">
      </el-table-column>
      <el-table-column prop="addr" align="center" label="操作" min-width="180">
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
        name:''
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
