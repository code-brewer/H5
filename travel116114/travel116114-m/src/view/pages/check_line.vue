<template>
    <!-- <h3>数据管理</h3> -->
    <div class="data">
        <div class="search">
            <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div class="product_name">
                <input type="txt" name="" placeholder="搜索关键字" v-model="searchVal">
            </div>
            <el-button type="primary" @click='search'>搜索</el-button>
        </div>
        <div class="sub">
            <el-table :data="tableData" border style="width: 90%" :highlight-current-row="true">
                <el-table-column type="index" width="80" label="序号" align="center">
                </el-table-column>
                <el-table-column label="上线时间" align="center" width="200">
                    <template scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.cutoffTime | turnTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="routeName" label="地点" align="center">
                </el-table-column>
                <el-table-column prop="title" label="产品标题" align="center">
                </el-table-column>
                <el-table-column prop="tab" label="标签" align="center">
                </el-table-column>
                <el-table-column align="center" label="状态" width="100">
                    <template scope="scope">
                        <!-- scope.row.routeId,scope.row.state -->
                        <el-button @click="updown(scope.$index, scope.row)" type="text" size="small">{{scope.row.state==1?"下线":"上线"}}</el-button>
                        <el-button type="text" size="small" @click="edio(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="排序" width="150" align="center">
                    <template scope="scope">
                        <span>第</span>
                        <!-- <input type="number" name="" style="width:30px" v-model="scope.row.sort"> -->
                        <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:30px" v-model="scope.row.sort">
                        <span>个</span>
                        <el-button type="text" size="small" @click="updateSort(scope.$index, scope.row)">确定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="my_page">
                <el-pagination layout="prev, pager, next" :total="total" :page-size="8" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['msg'],
    data() {
        return {
            options: [{
                value: 'routeName',
                label: '地点'
            }, {
                value: 'title',
                label: '产品标题'
            }, {
                value: 'tab',
                label: '标签'
            }, {
                value: 'state',
                label: '状态'
            }],
            value: '',
            tableData: [],
            pageNum: 1,
            up_down: '上线',
            total: '',
            searchVal: '',
            routeName: '',
            searchTitle: '',
            searchTab: '',
            searchState: '',
            // sort_num: '100',
        };
    },
    filters: {
        turnTime: function(value) {

            var date = new Date(value);
            return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + ':' + date.getMinutes();
        }
    },
    mounted: function() {
        this.getList();
        var _this = this;
        this.$bus.on('myLinem', function(val) {
            if (val) {
                _this.getList()
            }
        });
    },
    methods: {
        //上下线
        updown(indexId, rowval) {
            var _this = this;
            console.log(indexId, rowval);
            rowval.state == 1 ? rowval.state = 0 : rowval.state = 1;

            this.$ajax({
                    method: 'post',
                    url: '../route/updateState',
                    data: {
                        routeId: rowval.routeId,
                        state: rowval.state,
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
                    if (res.data.status == 1) {
                        _this.$message.success('操作成功！');

                    } else {
                        _this.$message.error('操作失败！');
                        rowval.state == 1 ? rowval.state = 1 : rowval.state = 0;

                    }
                })
                .catch(function(err) {
                    rowval.state == 1 ? rowval.state = 1 : rowval.state = 0;

                    //_this.$message.error('添加类别地失败！');
                })

        },
        //编辑
        edio(val) {
            this.msg.linem = true;
            this.msg.checklinem = false;
            this.$bus.emit('edio-todo', val);

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNum = val;
            this.getList();
        },
        // mock 数据获取 
        getList() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../route/getRouteList',
                    data: {
                        thispage: _this.pageNum,
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
                    console.log(res.data.data.list);
                    if (res.data.status == 1) {
                        _this.tableData = res.data.data.list;
                        _this.total = res.data.data.countrow;
                        // alert(_this.total);

                    } else {
                        _this.$message.error('添加类别地失败！');
                    }
                })
                .catch(function(err) {
                    //_this.$message.error('添加类别地失败！');
                })
        },
        //换页
        changeState() {
            var _this = this;

            this.$ajax({
                    method: 'post',
                    url: '../route/getRouteList',
                    data: {
                        thispage: _this.pageNum,
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
                    console.log(res.data.data.list);
                    if (res.data.status == 1) {
                        _this.tableData = res.data.data.list;
                        _this.total = res.data.data.countrow;

                    } else {
                        _this.$message.error('添加类别地失败！');
                    }
                })
                .catch(function(err) {
                    //_this.$message.error('添加类别地失败！');
                })
        },
        //搜索
        search() {
            var _this = this;
            switch (_this.value) {
                case 'routeName':
                    _this.routeName = _this.searchVal;
                    console.log(_this.routeName);

                    break;
                case 'searchTitle':
                    _this.routeName = _this.searchVal;
                    console.log(_this.routeName);

                    break;
                case 'searchTab':
                    _this.routeName = _this.searchVal;
                    console.log(_this.routeName);

                    break;
                case 'searchState':
                    _this.routeName = _this.searchVal;
                    console.log(_this.routeName);

                    break;

            }
            this.$ajax({
                    method: 'post',
                    url: '../route/getRouteList',
                    data: {
                        routeName: _this.routeName,
                        title: _this.searchTitle,
                        tab: _this.searchTab,
                        state: _this.searchState,

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
                    console.log(res.data.data.list);
                    if (res.data.status == 1) {
                        _this.tableData = res.data.data.list;
                        _this.total = res.data.data.countrow;

                    } else {
                        _this.$message.error('添加类别地失败！');
                    }
                })
                .catch(function(err) {
                    //_this.$message.error('添加类别地失败！');
                })

        },
        //修改排序
        updateSort(indexId, row_val) {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../route/updateSort',
                    data: {
                        routeId: row_val.routeId,
                        sort: row_val.sort,
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
                    console.log(res.data)
                    if (res.data.status == 1) {
                        // _this.sort_num=
                        _this.$message.success('修改排序成功！');


                    } else {
                        _this.$message.error('修改排序失败！');
                    }
                })
                .catch(function(err) {
                    //_this.$message.error('添加类别地失败！');
                })

        }
    },

}
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
        .el-input__inner {
            border-radius: 0;
            height: 30px;
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
