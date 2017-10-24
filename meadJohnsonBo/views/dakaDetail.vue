<template>
	
	<div class="User-detail">
        <div class="User-detail-top">用户列表</div>
        <div class="User-detail-body">
            <div class="User-detail-body-top">
                <div class="body-item">
                    获得途径:
                    <select>
                        <option>全部</option>
                        <option>妈咪打卡</option>
                    </select>
                </div>

                <div class="body-item">
                    选择时间:
                    <a class="time-pick"></a>
                    <div class="pick-warp">
                        <datepicker :value.sync="listData.signDate"  :format="format.toString()" placeholder="年-月-日" width="100px"></datepicker>
                    </div>
                </div>

                
            </div>
            
            <div class="User-detail-body-bottom">
                <table class="User-detail-table">
                    <tbody>
                        <tr>
                            <th width="100px;">用户名</th>
                            <th width="230px;">ID</th>
                            <th width="200px;">申请时间</th>
                            <th width="100px;">获得数量</th>
                            <th width="120px;">获得途径</th>
                        </tr>
                        <tr v-for="list in lists">
                            
                            <td>{{list.nick}}</td>
                            <td>{{list.openid}}</td>
                            <td>{{list.ctime}}</td>
                            <td>{{list.score}}</td>
                            <td>{{list.org}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="paging ng-binding">
                
                    共 {{pageData.total}} 条，共 {{listData.pageNum}}/{{pageData.pageTotal}} 页 &nbsp;
                    <button type="button" @click="gotoPage('pre')">上一页</button>&nbsp; 
                    <button type="button" @click="gotoPage('next')">下一页</button>&nbsp;跳转 &nbsp;<input v-model="pageData.goPage" type="text" class="ng-pristine ng-untouched ng-valid"> <a @click="gotoPage(pageData.goPage)">GO</a>
            </div>
            

        </div>
    </div>

</template>
<script>
	import {router} from '../index'
    import Datepicker from '../components/Datepicker.vue';
    import api from '../api'

	export default {
        components: {
            Datepicker
        },
		data() {
			return {
				lists:[],
                listData:{
                    openid: this.$route.params.openid,
                    signDate:'',
                    pageNum: 1,
                    pageSize: 12
                },
                format: ['yyyy-MM-dd'],
                pageData:{
                    goPage: '',
                    total: '1',
                    pageTotal: '1'
                }

                
			}
		},

		ready() {
            this.getDakaRecord();
			
		},
        watch: {
            // format(newV) {
            //     if(this.whereData.starttime) this.starttime = this.$refs.dp.stringify(new Date(this.whereData.starttime))
                
            //     if(this.whereData.endtime) this.whereData.endtime = this.$refs.dp.stringify(new Date(this.whereData.endtime))
            // },
            'listData.signDate'(val){
                if(val){
                    this.getDakaRecord();
                }
            }
        },


        methods: {
            gotoPage(num){

                if('pre' == num){
                    if(this.listData.pageNum <= 1){
                        return;
                    }
                    this.listData.pageNum --;
                    this.getDakaRecord();

                }else if('next' == num ){
                    if(this.listData.pageNum >= this.pageData.pageTotal){
                        return;
                    }
                    this.listData.pageNum ++;
                    this.getDakaRecord();

                }else if(num > 0){
                    this.listData.pageNum = num;
                    this.getDakaRecord();

                }
            },

            getDakaRecord(){
                var that = this;
               // console.log(11)
                api.getDakaRecord(this, this.listData, (back)=>{
                    if(back.resCode == "0"){
                        that.lists = back.repBody.list;
                        that.pageData.total = back.repBody.total;
                        that.pageData.pageTotal = Math.ceil(that.pageData.total / that.listData.pageSize) == 0 ? 1 : Math.ceil(that.pageData.total / that.listData.pageSize);
                    }
                })
            },

            searchData(){
                this.listData.pageNum = 1;
                this.getDakaRecord();
            }


        }
	}
</script>