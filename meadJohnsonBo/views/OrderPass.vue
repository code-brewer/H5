<template>
     <div class="User-detail">
                <div class="User-detail-top">核销订单列表</div>
                <div class="User-detail-body" style="padding:0;">
                    <div class="order-pic">
                        <span>订单截图</span>
                        <div>
                            <img :src="" class="order-img">
                            <a href="" class="order-pass" style="background-color: #fe7eaf;color: #fff;">通过审核</a><a href="" class="order-faile" style="color: #fff;background-color: #9a9a9a;border:none;">不通过</a>

                        </div>
                    </div>
                    <div class="text-pic">
                        <span>评论截图</span>
                        <div>
                            <img :src="" class="order-img">
                            <a href="" class="order-pass">通过审核</a><a href="" class="order-faile">不通过</a>

                        </div>
                    </div>
                    <div class="money-back">
                        <span>是否返现</span>
                        <div style="height: 78px;">
                            
                            <a href="" class="money-back-text">确认返现</a>
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
                    if(this.listData.pageNum < 1){
                        return;
                    }
                    this.listData.pageNum --;
                    this.getUserList();

                }else if('next' == num ){
                    if(this.listData.pageNum < this.pageTotal){
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
                console.log(11)
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