<template>
	
	<div class="User-detail">
        <div class="User-detail-top">成长值列表</div>
        <div class="User-detail-body">
            <div class="User-detail-body-top">
                        <div class="body-item">
                            获得途径:
                            <select v-model="options.org">
                                <option v-for="value in scoreIntegral" :value="value.org === '全部' ? '' : value.org">{{value.org}}</option>
                            </select>
                        </div>

                        <div class="body-item">
                            选择时间:
                            <a class="time-pick"></a>
                            <div class="pick-warp">
                                <datepicker :value.sync="options.beginDate" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="100px" ></datepicker>
                            </div>
                        </div>
                        
                    </div>
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="15%">途径</th>
                            <th width="15%">获得时间</th>
                            <th width="15%">获得值</th>
                        </tr>
                        <tr v-for="list in lists">
                            <td>{{list.org}}</td>
                            <td>{{list.ctime}}</td>
                            <td>{{list.integral}}</td>
                            
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
    import api from '../api'
    import Datepicker from '../components/Datepicker.vue';
    import page from '../components/page.vue'
    import snackbar from '../components/snackbar.vue'

	export default {
        components: {
            Datepicker,
            page,
            snackbar
        },
		data() {
			return {
				lists:[],
                options: {
                    pageNum: 1,
                    pageSize: 10,
                    openid: this.$route.params.openid,
                    beginDate: '',
                    org: ''
                },
                pageConfig: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                scoreIntegral: '',
                show: false,
                text: ''
                
			}
		},

		ready() {
            this.getTypeList();
            this.getScoreIntegralList();
			
		},
        watch: {
            'pageConfig.pageNum'(val) {
                this.getScoreIntegralList();
            },
            'options.beginDate'(){
                this.pageConfig.pageNum = 1;
                this.getScoreIntegralList();
            },
            'options.org'(){
                this.pageConfig.pageNum = 1;
                this.getScoreIntegralList();
            }
        },

        methods: {
            /**
             * [获取途径列表]
             */
            getTypeList() {
                api.getTypeList(this, {}, (back) => {
                    if (back.resCode === '0') {
                        this.scoreIntegral = back.repBody.scoreIntegral;
                        this.scoreIntegral.unshift({'org': '全部'});
                    } else {
                        this.$dispatch('errorHandle', '获取途径', back.resCode);
                    }
                })
            },
            /**
             * [获取用户成长值列表]
             */
            getScoreIntegralList() {
                this.options.pageNum = this.pageConfig.pageNum;
                api.getScoreIntegralList(this, this.options, (back) => {
                    if (back.resCode === '0') {
                        this.lists = back.repBody.list;
                        back.repBody.total === 0 && (this.show = true,this.text = '暂无数据');
                        this.pageConfig.total = back.repBody.total;
                    } else {
                        this.$dispatch('errorHandle', '获取成长值', back.resCode);
                    }
                })
            }

        }
	}
</script>