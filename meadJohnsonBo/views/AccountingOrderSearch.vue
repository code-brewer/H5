<template>
	
	<div class="User-detail">
                <div class="User-detail-top">核销订单列表</div>
                <div class="User-detail-body">
                    <div class="User-detail-body-top">
                        
                        <input type="text" v-model="listData.nick" placeholder="请输入用户名进行搜索" autocomplete="on"></input>
                        <button class="search-text" @click="searchData"><i></i>搜索</button>
                    </div>
                    <div class="User-detail-body-bottom">
                        <table class="User-detail-table">
                            <tbody>
                                <tr>
                                    <th width="20%">用户名</th>
                                    <th width="20%">ID</th>
                                    <th width="30%">注册时间</th>
                                    <th width="30%">核销订单</th>
                                </tr>
                                <tr v-for="list in lists">
                                    
                                    <td>{{list.nick}}</td>
                                    <td>{{list.usid}}</td>
                                    <td>{{list.ctime}}</td>
                                    <td>
                                    <a v-link="{name: 'fanxianDetail', params:{openid:list.openid}}">查看</a>
                                    </td>
                                    
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
    import api from '../api'

    export default {
        data() {
            return {
                lists:[],
                listData:{
                    nick: '',
                    openid:'',
                    pageNum: 1,
                    pageSize: 12
                },
                pageData:{
                    goPage: '',
                    total: '1',
                    pageTotal: '1'
                }
                
            }
        },

        ready() {
            this.getUserList();
            
        },

        methods: {
            gotoPage(num){

                if('pre' == num){
                    if(this.listData.pageNum <= 1){
                        return;
                    }
                    this.listData.pageNum --;
                    this.getUserList();

                }else if('next' == num ){
                    if(this.listData.pageNum >= this.pageData.pageTotal){
                        return;
                    }
                    this.listData.pageNum ++;
                    this.getUserList();

                }else if(num > 0){
                    this.listData.pageNum = num;
                    this.getUserList();

                }
            },

            getUserList(){
                var that = this;
                api.getUserList(this, this.listData, (back)=>{
                    if(back.resCode == "0"){
                        that.lists = back.repBody.list;
                        that.pageData.total = back.repBody.total;
                        that.pageData.pageTotal = Math.ceil(that.pageData.total / that.listData.pageSize) == 0 ? 1 : Math.ceil(that.pageData.total / that.listData.pageSize);
                    }
                })
            },

            searchData(){
                this.listData.pageNum = 1;
                this.getUserList();
            }


        }
    }
</script>


