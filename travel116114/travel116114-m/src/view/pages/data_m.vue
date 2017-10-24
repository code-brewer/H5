<template>
    <!-- <h3>数据管理</h3> -->
    <div class="data">
        <div class="search">
            <div class="block">
                <span class="demonstration">时间：</span>
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions0">
                </el-date-picker><span>到</span>
                <el-date-picker v-model="value2" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions0"></el-date-picker>
                <!--   <el-date-picker size="small" v-model="value6" type="daterange" placeholder="选择日期范围">
                </el-date-picker> -->
            </div>
            <div class="product_name">
                <input type="txt" name="" v-model='dataProductName'  placeholder="搜索产品名称">
            </div>
            <el-button type="primary" @click="getList()">搜索</el-button>
        </div>
        <div class="sub">
            <el-table :data="tableData" border style="width: 90%" :highlight-current-row="true" onPick="test">
                <el-table-column prop="dateTime" label="时间" style="width: 25%" align="center">
                </el-table-column>
                <el-table-column prop="productName" label="产品名称" style="width: 25%" align="center">
                </el-table-column>
                <el-table-column prop="pv" label="点击次数" style="width: 25%" align="center">
                </el-table-column>
                <el-table-column prop="uv" label="点击人数" style="width: 25%" align="center">
                </el-table-column>
            </el-table>
            <div class="my_page">
                <el-pagination layout="prev, pager, next" :total="total" :page-size="8" :current-page="currentPage" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                data_list: '',
                tableData: [],
                value1: '',
                value2: '',
                timestamp1: '',
                timestamp2: '',
                pageNum: 1,
                dataProductName: '',
                createdTimeStartLong: '',
                createdTimeEndLong: '',
                total: '',
                currentPage:1 

            };
        },
        mounted: function() {
            this.getList();

        },
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.getList();
            },
            // mock 数据获取 
            getList() {
                var _this = this;
                window.dataProductName= _this.dataProductName;
                window.createdTimeStartLong= _this.timestamp1;
                window.createdTimeEndLong= _this.timestamp2;
                this.$ajax({
                        method: 'post',
                        url: '../data/selectData',
                        data: {
                            thispage: _this.pageNum,
                            dataProductName: _this.dataProductName,
                            createdTimeStartLong: _this.timestamp1,
                            createdTimeEndLong: _this.timestamp2,
                        },
                        transformRequest: [function(data) {
                            // Do whatever you want to transform the data
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }

                    })
                    .then(function(res) {
                        console.log(res)
                        if (res.data.status == 1) {
                            //     // _this.$message.success('添加类别成功！');
                            console.log(res.data.list)
                            _this.tableData = res.data.data.list;
                            _this.total = res.data.data.countrow;
                        } else {
                                // _this.$message.error('添加类别地失败！');
                        }
                    })
                    .catch(function(err) {
                        // _this.$message.error('添加类别地失败！');
                    })
            }
        },
        watch: {
            value1: function(val) {
                console.log(val);
                console.log((val).valueOf());
                
                this.timestamp1 = (val).valueOf();
            },
            value2: function(val) {
                this.timestamp2 = (val).valueOf();
            },
        }


};
</script>
<style lang="sass">
.data {
    // position: absolute;
    // width: 100%;
    // height: 100%;
    margin-left: 30px;
    margin-top: 30px;
    .search {
        .block {
            display: inline-block;
            height: 24px;
            margin-right: 30px;
            .demonstration {}
            .el-input {
                background-color: red;
                .el-input__inner {
                    height: 30px;
                    border-radius: 0;
                    border: 1px solid #dadada;
                }
            }
        }
        .product_name {
            display: inline-block;
            input {
                height: 26px;
                padding-left: 10px;
                border: 1px solid #dadada;
            }
        }
        .el-button {
            height: 30px;
            width: 120px;
            line-height: 30px;
            background-color: #6ca1e9;
            text-align: center;
            padding: 0;
            vertical-align: middle;
        }
    }
    .sub {
        position: relative;
        margin-right: 10px;
        margin-top: 20px;
        .my_page {
            position: absolute;
            right: 10%;
            bottom: -42px;
        }
    }
}
</style>
