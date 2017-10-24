<template>
    <div id="type">
        <!-- 目的地 -->
        <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
        <div class="end">
            <span>目的地：</span>
            <input type="txt" name="" value="" placeholder="例：巴黎" v-model="newDestination">
            <el-button type="primary" @click="add_Destination">增加</el-button>
        </div>
        <div class="Site_name" style="cursor:pointer">
            <el-tag :key="tag" v-for="(tag, index) in allDestination" :drag-id="index" :closable="true" :close-transition="false" @close="DestinationClose(tag)">
                {{tag}}
            </el-tag>
        </div>
        <div class="Classification">
            <span>归&nbsp;&nbsp;类&nbsp;：</span>
            <input type="txt" name="" value="" placeholder="例：特惠游" v-model="newCategory">
            <el-button type="primary" @click="add_Category">增加</el-button>
        </div>
        <div class="type_name block__list block__list_words" id="foo" style="cursor:move">
            <el-tag :key="tag" v-for="(tag, index) in allCategory" :closable="true" :drag-id="index" :close-transition="false" @close="CategoryClose(tag)" style="display: inline-block;">
                {{tag}}
            </el-tag>
        </div>
    </div>
</template>
<script>
export default {
    name: 'type',
    components: {},
    data() {
        return {
            allDestination: [],
            allCategory: [],
            newDestination: '',
            newCategory: '',
            sortCategory: [],
            moveCategory: {
                name: '',
                id: '',
            },
            paramCategory: [],

        }
    },
    // computed: {
    //     testdata: function() {

    //         return this.childrens.age + 10;
    //     }
    // },
    mounted: function() {
        var _this = this;
        Sortable.create(document.getElementById('foo'), {
            animation: 150, //动画参数
            onAdd: function(evt) { //拖拽时候添加有新的节点的时候发生该事件
                console.log('onAdd.foo:', [evt.item, evt.from]);
            },
            onUpdate: function(evt) { //拖拽更新节点位置发生该事件
                console.log('onUpdate.foo:', [evt.item, evt.from]);
            },
            onRemove: function(evt) { //删除拖拽节点的时候促发该事件
                console.log('onRemove.foo:', [evt.item, evt.from]);
            },
            onStart: function(evt) { //开始拖拽出发该函数
                console.log('onStart.foo:', [evt.item, evt.from]);
            },
            onSort: function(evt) { //发生排序发生该事件
                console.log('onSort.foo:', [evt.item, evt.from]);
            },
            onEnd: function(evt) { //拖拽完毕之后发生该事件
                console.log('onEnd.foo:', [evt.item, evt.from]);
                var id_arr = [];
                _this.sortCategory = [];
                for (var i = 0, len = evt.from.children.length; i < len; i++) {
                    id_arr.push(evt.from.children[i].getAttribute('drag-id'));
                    // id_arr += ',' + evt.from.children[i].getAttribute('drag-id');
                    // console.log(evt.from.children[i])
                }
                // id_arr = id_arr.substr(1);
                //然后请求后台ajax 这样就完成了拖拽排序
                // console.log(evt.item);
                console.log(id_arr);
                for (let y in id_arr) {
                    _this.sortCategory.push(_this.allCategory[id_arr[y]]);
                    // _this.moveCategory.name=_this.allCategory[id_arr[y]];
                    // _this.moveCategory.id=y;
                    // _this.paramCategory.push(_this.moveCategory);

                }

                if (_this.sortCategory.length) {
                    _this.allCategory = [];
                    _this.allCategory = _this.sortCategory;
                        _this.$ajax({
                            method: 'post',
                            url: '../category/sortCategory',
                            data: {
                                categoryMap:_this.sortCategory,
                            },
                            transformRequest: [function(data) {
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
                                _this.$message.success('修改排序成功！');
                            //     _this.newDestination = '';
                            //     _this.allDestination = res.data.data;
                            } else {
                                _this.$message.error('添加目的地失败！');
                            }
                        })
                        .catch(function(err) {
                            // _this.open4()
                            // _this.$message.error('添加目的地失败！');
                        })
                    
                }
                console.log(_this.sortCategory);
                console.log(_this.allCategory);
                // console.log(_this.paramCategory);

            }
        });
        this.checkallDestination();
        this.checkallCategory();
    },
    methods: {

        DestinationClose(tag) {
            this.allDestination.splice(this.allDestination.indexOf(tag), 1);
            //删除目的地
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../destination/removeDestination',
                    data: {
                        destinationName: tag,
                    },
                    transformRequest: [function(data) {
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
                        _this.$message.success('删除目的地成功！');
                    } else {
                        _this.$message.error('删除目的地失败！');

                    }
                })
                .catch(function(err) {
                    _this.$message.error('删除目的地失败！');

                })
        },
        CategoryClose(tag) {
            this.allCategory.splice(this.allCategory.indexOf(tag), 1);
            console.log(this.allCategory)
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../category/removeCategory',
                    data: {
                        categoryName: tag,
                    },
                    transformRequest: [function(data) {
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
                        _this.$message.success('删除类别地成功！');
                    } else {
                        _this.$message.error('删除类别地失败！');

                    }

                })
                .catch(function(err) {
                    _this.$message.error('删除类别地失败！');
                })
        },
        // 查询目的地
        checkallDestination() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../destination/allDestination',
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
                        _this.allDestination = res.data.data;
                    } else {
                        _this.$message.error('数据加载失败！');


                    }

                })
                .catch(function(err) {
                    _this.$message.error('数据加载失败！');
                });
        },
        // 查询归类
        checkallCategory() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../category/allCategory',
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
                        _this.allCategory = res.data.data;
                    } else {
                        _this.$message.error('数据加载失败！');


                    }

                })
                .catch(function(err) {
                    _this.$message.error('数据加载失败！');
                })
        },
        //插入目的地
        add_Destination() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../destination/addDestination',
                    data: {
                        destinationName: _this.newDestination,
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
                    // console.log(res)
                    if (res.data.status == 1) {
                        _this.$message.success('添加目的地成功！');
                        _this.newDestination = '';
                        _this.allDestination = res.data.data;
                    } else {
                        _this.$message.error('添加目的地失败！');
                    }
                })
                .catch(function(err) {
                    // _this.open4()
                    _this.$message.error('添加目的地失败！');
                })
        },
        //插入归类
        add_Category() {
            var _this = this;
            this.$ajax({
                    method: 'post',
                    url: '../category/addCategory',
                    data: {
                        categoryName: _this.newCategory,
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
                    //console.log(res)
                    if (res.data.status == 1) {
                        _this.$message.success('添加类别成功！');
                        _this.newCategory = '';
                        _this.allCategory = res.data.data;
                    } else {
                        _this.$message.error('添加类别地失败！');
                    }
                })
                .catch(function(err) {
                    _this.$message.error('添加类别地失败！');
                })
        }

    },
    watch: {},
}
</script>
<style lang="sass" scoped>
#type {
    // display: inline-block;
    //      margin: 0 auto;
    position: absolute;
    width: 800px;
    height: 100%;
    left: 50%;
    top: 30px;
    margin-left: -400px;
    .end {
        span {
            vertical-align: middle;
            display: inline-block;
            height: 30px;
            line-height: 30px;
        }
        input {
            display: inline-block;
            width: 580px;
            height: 26px;
            padding: 0 10px;
        }
        .el-button {
            vertical-align: middle;
            background-color: #6ca1e9;
            width: 120px;
            height: 30px;
            line-height: 30px;
            padding: 0;
            margin: 0;
        }
        button {
            background-color: #6ca1e9;
            width: 120px;
            height: 30px;
            line-height: 30px;
            padding: 0;
            margin: 0;
            outline: none;
        }
    }
    .Site_name {
        width: 100%;
        min-height: 50px;
        background-color: #FFF;
        border: 1px solid #dadada;
        margin-top: 20px;
        overflow: auto;
        overflow-x: hidden;
        padding: 0 5px;
        // li {
        //     display: inline-block;
        //     padding: 5px 15px 5px 10px;
        //     background-color: #ffcc1d;
        //     border-radius: 30px;
        //     font-size: 14px;
        //     // margin-bottom: 20px;
        //     margin: 0 10px 20px 0;
        //     .el-icon-close {
        //         margin-left: 10px;
        //     }
        // }
        .el-tag {
            background: url(../../assets/label.png) 0 0 no-repeat;
            background-size: 100% 100%;
            padding: 0px 4px 0px 12px;
            margin: 2px 12px 2px 0;
            color: #333333;
            height: 30px;
            line-height: 28px;
        }
    }
    .Classification {
        margin-top: 40px;
        span {
            vertical-align: middle;
            display: inline-block;
            height: 30px;
            line-height: 30px;
        }
        input {
            display: inline-block;
            width: 580px;
            height: 26px;
            padding: 0 10px;
        }
        .el-button {
            vertical-align: middle;
            background-color: #6ca1e9;
            width: 120px;
            height: 30px;
            line-height: 30px;
            padding: 0;
            margin: 0;
        }
        button {
            background-color: #6ca1e9;
            width: 120px;
            height: 26px;
            line-height: 30px;
            padding: 0;
            margin: 0;
            outline: none;
        }
    }
    .type_name {
        width: 100%;
        height: 180px;
        background-color: #FFF;
        border: 1px solid #dadada;
        margin-top: 20px;
        overflow: auto;
        overflow-x: hidden;
        padding: 0 5px;
        // li {
        //     background: url(../assets/label.png) 0 0 no-repeat;
        //     background-size: 100% 100%;
        //     display: inline-block;
        //     padding: 5px 15px 5px 16px;
        //     // background-color: #ffcc1d;
        //     // border-radius: 30px;
        //     font-size: 14px;
        //     // margin-bottom: 20px;
        //     margin: 0 10px 20px 0;
        //     .el-icon-close {
        //         margin-left: 10px;
        //     }
        // }
        .el-tag {
            // background: url(../assets/label.png) 0 0 no-repeat;
            background: url(../../assets/label.png) 0 0 no-repeat;
            background-size: 100% 100%;
            padding: 0px 4px 0px 12px;
            margin: 2px 12px 2px 0;
            color: #333333;
            height: 30px;
            line-height: 28px;
        }
    }
}
</style>
