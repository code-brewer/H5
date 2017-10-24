<template>
	
	<div class="User-detail">
        <div class="User-detail-top">用户列表</div>
        <div class="User-detail-body">
            <div>
                <div class="body-item">
                    渠道类别:
                    <select class="select-width" v-model="options.chrenum">
                        <option v-for="value in chrenum" :value="value.chrenum">{{value.name}}</option>
                    </select>
                </div>
                <div class="body-item">
                    <div style="display:inline-block">
                        会员等级:
                        <select class="select-width" v-model="options.grade">
                            <option v-for="value in grade" :value="value.grade === '全部' ? '' : value.grade">{{value.grade}}</option>
                        </select>
                    </div>
                    <div class="search" style="float: right">
                        <input type="text" v-model="options.nickopenid" @keyup.enter="searchData" placeholder="请输入用户名进行搜索" autocomplete="on" style="padding-left: 5px;box-sizing: border-box"></input>
                        <button class="search-text" @click="searchData"><i></i>搜索</button>
                        <a :href="exportUrl" class="btnExport">导出</a>
                    </div>
                </div>
            </div>
            
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="20%">用户名</th>
                            <th width="30%">OpenID</th>
                            <th width="20%">日期</th>
                            <th width="15%">渠道</th>
                            <th width="15%">会员</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>
                                <a class="link" v-link="{path: '/userTex/'+list.openid}">{{list.nick}}</a>
                            </td>
                            <td>{{list.openid}}</td>
                            <td>{{list.ctime}}</td>
                            <td>{{list.chrenum}}</td>
                            <td>{{list.grade}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <page :config.sync="pageConfig"></page>
            <snackbar :show.sync="show" :text="text"></snackbar>
        </div>
    </div>

</template>
<script>
	import {router} from '../index'
    import api from '../api'
    import page from '../components/page.vue'
    import snackbar from '../components/snackbar.vue'

	export default {
        components: {
            page,
            snackbar
        },
		data() {
			return {
				lists:[],
                nickopenid: '',
                pageConfig: {
                    total: 1,
                    pageSize: 10,
                    pageNum: 1
                },
                options: {
                    nickopenid: '',
                    chrenum: '',
                    grade: '',
                    beginDate: ''
                },
                chrenum: '',
                grade: '',
                show: false,
                text: '',
                exportUrl: ''
			}
		},
		ready() {
            this.getUserListUpgrade();
            this.getTypeList();
		},
        watch: {
            'pageConfig.pageNum'(val) {
                this.getUserListUpgrade();
            },
            'options.chrenum'(val) {
                this.pageConfig.pageNum = 1;
                this.getUserListUpgrade();
            },
            'options.grade'(val) {
                this.pageConfig.pageNum = 1;
                this.getUserListUpgrade();
            }
        },
        methods: {
            /**
             * [获取用户列表]
             */
            getUserListUpgrade(){
                this.options['pageSize'] = this.pageConfig.pageSize;
                this.options['pageNum'] = this.pageConfig.pageNum;
                api.getUserListUpgrade(this, this.options, (back)=>{
                    if(back.resCode == "0"){
                        this.lists = back.repBody.list;
                        back.repBody.total === 0 && (this.show = true,this.text = '暂无数据');
                        this.pageConfig.total = back.repBody.total;
                        this.exportUrl = basePath + 'admin/weixin/downloadUserListExcel?nickopenid='+this.options.nickopenid+'&chrenum='+this.options.chrenum+'&grade='+this.options.grade+'&beginDate='+this.options.beginDate;
                    } else {
                        this.$dispatch('errorHandle', '获取用户列表', back.resCode);
                    }
                })

            },
            /**
             * [获取渠道类别、个人等级]
             */
            getTypeList() {
                api.getTypeList(this, {}, (back) => {
                    if (back.resCode === '0') {
                        this.chrenum = back.repBody.chrenum;
                        this.grade = back.repBody.grade;
                        this.chrenum.unshift({'chrenum': '', 'name': '全部'});
                        this.grade.unshift({'grade': '全部'});
                    } else {
                        this.$dispatch('errorHandle', '获取渠道、等级', back.resCode);
                    }
                })
            },
            /**
             * [搜索]
             */
            searchData(){
                this.pageConfig.pageNum = 1;
                this.getUserListUpgrade();
            }
        }
	}
</script>