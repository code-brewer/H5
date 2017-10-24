<template>
    <div class="box1">
        <div class="top">
            <search-time :searchdate.sync="selectData.searchTime" :disabled="isPhone">
                <span style="padding-left: 20px">所属地区</span>
                <select class="form-control" v-model="selectData.area" :disabled="isPhone">
                    <option value="" selected>全部</option>
                    <!-- <option value="云南">云南</option>
                <option value="湖南">湖南</option>
                <option value="江西">江西</option>
                <option value="贵州">贵州</option> -->
                    <option v-for="item in area" track-by="$index">{{item}}</option>
                </select>
                <span style="padding-left: 20px">用户状态</span>
                <select class="form-control " :disabled="isPhone" v-model="selectData.state">
                    <option value="" selected>全部</option>
                    <option value="1">开户</option>
                    <option value="0">销户</option>
                </select>
                <span style="padding-left: 20px">手机号码</span>
                <input v-el:phone class="form-control" type="text" name="" style="width: 115px" @input="inputPhone" placeholder="输入手机查询">
            </search-time>
        </div>
        <div class="middle">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                        <th>序号</th>
                        <th>手机号码</th>
                        <th>用户状态</th>
                        <th>首次开户时间</th>
                        <th>最近开户时间</th>
                        <th>最近销户时间</th>
                        <th>操作类型</th>
                        <th>操作员</th>
                        <th>下行短信请求</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchlist.list">
                        <th scope="row">{{searchlist.all-$index-(searchlist.nowPage-1)*12}}</th>
                        <td>{{item.phone}}</td>
                        <td>{{!item.type?'销户':'开户'}}</td>
                        <td>{{item.createtime?new Date(item.createtime).format('yyyy-MM-dd HH:mm:ss'):''}}</td>
                        <td>{{item.updatetime?new Date(item.updatetime).format('yyyy-MM-dd HH:mm:ss'):''}}</td>
                        <td>{{item.deletetime?new Date(item.deletetime).format('yyyy-MM-dd HH:mm:ss'):''}}</td>
                        <td>{{item.state}}</td>
                        <td>{{item.username}}</td>
                        <td> <a @click="clickCheck(item.phone)">点击查看</a></td>
                        <td><a @click="confirmCancel(item.phone)" v-if="item.type">销户</a><a @click="godetail(item.phone)" v-else>查看</a></td>
                    </tr>
                </tbody>
            </table>
            <load :show="isLoad"></load>
        </div>
        <div class="bottom">
            <page :searchlist.sync="searchlist">
                <div style="float: right">
                    <button type="button" class="btn btn-primary" @click="down">当前页导出为.xls</button>
                    <button type="button" class="btn btn-success" @click="downAll">全部导出为.xls</button>
                </div>
            </page>
            <alert :show.sync="showAlert" :form-data="checkData"></alert>
            <!-- 弹框 -->
            <cancel :show.sync="confirm.isShow" :phone="confirm.userPhone"> </cancel>
        </div>
</template>
<style lang="scss" scoped>
.box1 {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 50px;
    box-sizing: border-box;
    th,
    td {
        text-align: center;
    }
    .middle {
        margin-top: 20px;
        a {
            cursor: pointer;
        }
        th,
        td {
            text-align: center;
        }
    }
    .bottom {
        text-align: center;
        min-width: 927px;
        ul {
            vertical-align: middle;
            padding-left: 30px;
            margin: 0;
            margin-left: -50px;
        }
    }
}
</style>
<script type="text/javascript">
import alert from '../components/messageAlert.vue'
import load from '../components/load.vue'
import searchTime from '../components/search_time.vue'
import cancel from '../components/cancelAlert.vue'
import page from '../components/page.vue'
import api from '../api/index.js'
// import Datepicker from '../components/Datepicker.vue';
export default {
    components: {
        alert,
        searchTime,
        cancel,
        load,
        page
    },

    data() {
        return {
            showAlert: false,
            isPhone: false, //是否通过手机查询
            isLoad: false,
            selectData: {
                area: '',
                state: '',
                searchTime: {
                    begin: new Date().format(),
                    end: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
                }
            },
            downLoad: {
                current: '',
                all: '',
            },
            area: [],
            searchlist: {
                list: [],
                all: 0,
                nowPage: 1,
                nowGroup: 1,
            },
            confirm: {
                isShow: false,
                userPhone: '',
            }, //确定弹窗
            checkData: {
                phone: '',
                content: '',
                time: '',
                type: '',
            }
        }
    },
    attached() {
        if (this.$root.isRefresh.message) {
            this.search()
            this.$root.isRefresh.message = false
        }
    },
    ready() {
        this.isLoad = true;
        this.search()
        this.$on('cancel', phone => {
            this.isLoad = true;
            this.confirm.isShow = false;
            api.cancel(this, {
                "phone": phone, //必填，手机号码
                "head": "easier", //必填，操作人员
                "type": "0", //1是开户，0是销户
            }, res => {
                this.isLoad = false;
                if (res.resMsg === "success") {
                    //成功之后刷新搜索结果
                    //搜索过则再搜索一次,没搜索过则调初始化的搜索
                    if (this.isPhone || this.selectData.searchTime.begin && this.selectData.searchTime.end) {
                        this.search()
                    } else {
                        this.$dispatch('search') //初始化搜索
                    }
                }


            })
        })



        this.$on('clickPage', function(item) { //点击分页页数的时候触发
            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 3;
            this.searchlist.list = []
            this.isLoad = true;
            this.search()

        })

        this.$on('gotobtn', (val, allpage) => { //点击分页确定按钮时触发
            if (val == this.searchlist.nowPage) return window.alert('已经是当前页')
            if (val && !isNaN(val)) {
                if (val > 0 && val <= allpage) {
                    this.searchlist.nowPage = val
                    this.searchlist.list = []
                    this.isLoad = true;
                    this.search()

                    return
                }
            }
            window.alert('不在页数范围内')
        })

        this.$on('search', function() { //点击搜索  初始化搜索
            if (this.isPhone) {
                if (this.$els.phone.value.trim().length != 11) return window.alert('请输入正确手机号码')
                this.isLoad = true;
                this.searchlist.list = []
                this.searchlist.all = 0
                api.findnumber(this, {
                    "phone": this.$els.phone.value.trim() //必填，手机号码
                }, res => {
                    this.isLoad = false;
                    if (res.resMsg === "success") {
                        this.searchlist.list = res.repBody
                        this.searchlist.all = res.repBody.length
                        this.searchlist.nowPage = 1
                    }
                })
            } else {
                if (this.selectData.area.trim().length == 0 && this.selectData.state.trim().length == 0 && this.selectData.searchTime.begin.trim().length == 0 && this.selectData.searchTime.end.trim().length == 0) {
                    window.alert('请把日期填完整')
                    return
                } else {
                    this.isLoad = true;
                    this.searchlist.list = []
                    this.searchlist.all = 0
                    this.searchlist.nowPage = 1
                    this.search()

                }



            }
        })




        api.area(this, {}, res => { //地区接口
            if (res.resCode === "000000" && res.resMsg === "success") {
                var _this = this;
                res.repBody.forEach(function(item) {
                    item ? _this.area.push(item) : ''
                })
            }
        })


    },
    methods: {
        searchMessage(data, back) {
            // this.isLoad=true;
            api.searchMessage(this, data, res => {
                this.isLoad = false;
                if (res.resMsg === "success") {
                    back(res)
                }

            })
        },
        inputPhone() {
            this.$els.phone.value.trim().length > 0 ? this.isPhone = true : this.isPhone = false
        },
        confirmCancel(phone) {
            this.confirm.userPhone = phone;
            this.confirm.isShow = true;

        },
        search() {
            this.searchMessage({
                "begin": this.searchlist.nowPage, //必填，页数
                "end": "12", //必填，条数
                "starttime": this.selectData.searchTime.begin, //必填，开始时间
                "endtime": this.selectData.searchTime.end, //必填，结束时间
                "place": this.selectData.area ? this.selectData.area : null, //不选传null
                "type": this.selectData.state ? this.selectData.state : null,
            }, res => {
                if (res.resMsg === "success") {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resCode
                        // this.searchlist.nowPage = 1
                }

            })
        },
        godetail(number) {
            this.$router.go({
                path: '/home/manage/detail/' + number
            })
            this.$dispatch('changeNumber', number)
        },
        downAll() {

            if (this.searchlist.all == 0) return
            window.location.href = basePath + 'vip/down?size1=' + 0 + '&size2=0&phone=' + this.$els.phone.value.trim() + '&createtime1=' + this.selectData.searchTime.begin + '&createtime2=' + this.selectData.searchTime.end + '&place=' + (this.selectData.area ? this.selectData.area : 0) + '&type=' + (this.selectData.state ? this.selectData.state : 0)

        },
        down() {

            if (this.searchlist.list.length == 0) return
            window.location.href = basePath + 'vip/down?size1=' + this.searchlist.nowPage + '&size2=12&phone=' + this.$els.phone.value.trim() + '&createtime1=' + this.selectData.searchTime.begin + '&createtime2=' + this.selectData.searchTime.end + '&place=' + (this.selectData.area ? this.selectData.area : 0) + '&type=' + (this.selectData.state ? this.selectData.state : 0)

        },
        clickCheck(phone) {
            this.showAlert = true
            api.findnumber(this, {
                "phone": phone //必填，手机号码
            }, res => {
                if (res.resMsg === "success") {
                    this.checkData.phone = res.repBody[0].phone
                    this.checkData.content = res.repBody[0].head_url
                    this.checkData.time = res.repBody[0].createtime
                    this.checkData.type = '注册'
                }
            })
        },

    }
}
</script>
