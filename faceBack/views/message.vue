<template>
    <div class="box1">
        <div class="top" style="min-width: 1003px;">
            <search-time :searchdate.sync="selectData.searchTime" :disabled="isPhone">
                <span style="padding-left: 20px">所属地区</span>
                <select class="form-control" v-model="selectData.area" :disabled="isPhone">
                    <option value="" selected>全部</option>
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
                        <th>业务类型</th>
                        <th>首次开户时间</th>
                        <th>最近开户时间</th>
                        <th>最近销户时间</th>
                        <th>用户状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in searchlist.list">
                        <th scope="row">{{searchlist.all-$index-(searchlist.nowPage-1)*12}}</th>
                        <td>{{item.pk_mobile}}</td>
                        <td>{{ item.grade==1 ? '特级会员' : item.grade==2 ? '高级会员' : '普通会员' }}</td>
                        <td>{{item.first_time ? new Date(item.first_time).format('yyyy-MM-dd HH:mm:ss') : ''}}</td>
                        <td>{{item.lately_time ? new Date(item.lately_time).format('yyyy-MM-dd HH:mm:ss') : ''}}</td>
                        <td>{{item.destroy_time ? new Date(item.destroy_time).format('yyyy-MM-dd HH:mm:ss') : ''}}</td>
                        <td>{{item.state==1 ? '已开户' : '已销户'}}</td>
                        <td><a style="margin-right: 15px;" @click="showAlert(item.pkMobile)">更改业务类型</a><a @click="confirmCancel(item.pkMobile)" v-if="item.state">销户</a><a @click="godetail(item.pkMobile)" v-else>查看</a></td>
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
            <!-- 弹框 -->
            <cancel :show.sync="confirm.isShow" :phone="confirm.userPhone"> </cancel>
            <alert :show.sync="isChangeServer.isShow" :phone="isChangeServer.userPhone"> </alert>
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
    .top {
        // min-width: 1100px;
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
        min-width: 1003px;
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
        alert, //更改业务弹框
        searchTime,
        cancel,
        load,
        page
    },

    data() {
        return {
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
            isChangeServer: { //更改业务类型
                isShow: false,
                userPhone: '',
            },
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
            api.aloneCancel(this, {
                "pkmobile": phone, //必填，手机号码
                "state": "0", //1是开户，0是销户
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
        this.$on('changeServer1', () => {
            this.search()
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
                    if (res.resCode === "000000") {
                        if (res.repBody.pkMobile) {

                            // this.searchlist.list = res.repBody
                            this.searchlist.list.push(res.repBody)
                            this.searchlist.all = 1
                            this.searchlist.nowPage = 1
                        }

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
        showAlert(phone) {
            this.isChangeServer.userPhone = phone
            this.isChangeServer.isShow = true
        },
        searchMessage(data, back) {
            // this.isLoad=true;
            api.searchMessage(this, data, res => {
                this.isLoad = false;
                if (back) back(res)

            })
        },

        inputPhone() {
            this.$els.phone.value.trim().length > 0 ? this.isPhone = true : this.isPhone = false
        },
        confirmCancel(phone) {
            this.confirm.userPhone = phone;
            this.confirm.isShow = true;

            // this.checkLevel(phone)

        },
        search() {
            this.searchMessage({
                "size1": this.searchlist.nowPage, //必填，页数
                "size2": "12", //必填，条数
                "createtime1": this.selectData.searchTime.begin, //必填，开始时间
                "createtime2": this.selectData.searchTime.end, //必填，结束时间
                "attribution": this.selectData.area, //不选传null
                "state": this.selectData.state,
            }, res => {
                if (res.resCode === "000000") {
                    this.searchlist.list = res.repBody
                    this.searchlist.all = res.resMsg
                }

            })
        },
        godetail(number) {
            this.$router.go({
                path: '/home/manage/detail/' + number
            })
        },
        downAll() {
            if (this.searchlist.all == 0) return
            window.location.href = basePath + 'batchinfo/down?createtime1=' + this.selectData.searchTime.begin + "&createtime2=" + this.selectData.searchTime.end + "&attribution=" + this.selectData.area + "&state=" + this.selectData.state + "&size1=" + 0 + "&size2=" + 0
        },
        down() {
            if (this.isPhone) return window.alert('手机号码查询不支持下载')
            if (!this.searchlist.list.length) return
            window.location.href = basePath + 'batchinfo/down?createtime1=' + this.selectData.searchTime.begin + "&createtime2=" + this.selectData.searchTime.end + "&attribution=" + this.selectData.area + "&state=" + this.selectData.state + "&size1=" + this.searchlist.nowPage + "&size2=" + 12
        },


    }
}
</script>
