<template>
	
    <div class="User-detail">
        <div class="User-detail-top">核销订单列表</div>
        <div class="User-detail-body" style="padding:0;">
            <div class="hexiao-wai">
                <div class="order-pic">
                    <span>订单截图1</span>
                    <div class="orderTop">
                        <img id="orderImg" :src="orderData.photo_url&&orderData.photo_url[0]" class="order-img"  @dblclick="lookImg(orderData, '0')">      
                    </div>
                </div>
                <div class="order-pic" style="left:290px;">
                    <span>订单截图2</span>
                    <div class="orderTop">
                        <img id="orderImg" :src="orderData.photo_url&&(orderData.photo_url.length >= 2 ? orderData.photo_url[1] : '')" class="order-img"  @dblclick="lookImg(orderData, '1')"> 
                    </div>
                </div>
                <div class="orderReason" id="orderReason" v-show="orderData.showReason">
                	<span class="yuanyin">驳回原因</span>
                	<textarea class="big-box" id="big-box" v-model="orderData.refuse_reason" :readonly="orderData.status != 1"></textarea>
                	<a class="order-pass" :class="{'act': orderData.status=='3', 'audited': orderData.status!='1'}" @click="auditOrderReason(orderData, 'fail')" style="position: absolute;top: 196px;left: 123px;">确定驳回</a>
                </div>
                <div class="passOrnopass">
                    <a class="order-pass" :class="{'act': orderData.status=='2', 'audited': orderData.status!='1'}" @click="auditOrder(orderData, 'pass')">通过审核</a>
                    <a class="order-pass" :class="{'act': orderData.status=='3', 'audited': orderData.status!='1'}" @click="auditOrder(orderData, 'fail')">不通过</a>
                </div>
            </div>
            <div class="text-wai">
                <div class="text-pic">
                    <span>评论截图1</span>
                    <div class="textTop">
                        <img :src="contentData.photo_url&&contentData.photo_url[0]" class="order-img" @dblclick="lookImg(contentData, '0')"> 
                             
                    </div>
                </div>
                <div class="text-pic" style="left:290px;">
                    <span>评论截图2</span>
                    <div class="textTop">
                        <img :src="contentData.photo_url&&(contentData.photo_url.length >= 2 ? contentData.photo_url[1] : '')" class="order-img" @dblclick="lookImg(contentData, '1')"> 
                             
                    </div>
                </div> 
                <div class="textReason" id="textReason" v-show="contentData.showReason">
                	<span class="textyuanyin">驳回原因</span>
                	<textarea :readonly="contentData.status != 1" class="text-box" id="text-box" v-model="contentData.refuse_reason"></textarea>
                	<a class="order-pass" :class="{'act': contentData.status=='3', 'audited': contentData.status!='1'}" @click="auditOrderReason(contentData, 'fail')" style="position: absolute;top: 173px;left: 123px;">确定驳回</a>
                </div>
                <div class="passOrnopass">
                    <a class="order-pass" :class="{'act': contentData.status=='2', 'audited': contentData.status!='1'}" @click="auditOrder(contentData, 'pass')">通过审核</a>
                    <a class="order-pass" :class="{'act': contentData.status=='3', 'audited': contentData.status!='1'}" @click="auditOrder(contentData, 'fail')">不通过</a>
                </div>
                
            </div>
            <div class="money-back">
                <span>是否返现</span>
                <div  class="cashback" style="height: 78px;">
                    <a  class="order-pass" :class="{'alr': orderData.is_pay=='2' && contentData.is_pay == '2', 'unpay': orderData.status=='3' || contentData.status=='3'}"  @click="cashBack()">{{cash}}</a>

                </div>
                <!-- 遮罩层 -->
                <!-- <div class="zhezhao" id="setzhe">
                    
                    <button  class="order-pass-none">确认返现</button>
                </div> -->


            </div>
        </div>
    </div>

    <modal :show.sync="auditStatus.showMsg">
        <div class="upload-msg" style="height: 50px;line-height: 50px;text-align: center;">
          <p class="msg-content">{{auditStatus.msg}}</p>
        </div>
    </modal>

    <modal title="confirmModal.title" :show.sync="confirmModal.show" effect="zoom" :width="400">
        <div class="modal-header">
          <h5 class="modal-title">{{confirmModal.title}}</h5>
        </div>
        <div class="modal-body">
          {{confirmModal.msg}}
        </div>
        <div class="modal-footer">

            <span class="btn btn-primary" @click="confirmModal.fn(), confirmModal.show = false">{{confirmModal.btnText}}</span>
            <span class="btn btn-default" @click="confirmModal.show = false">取消</span>
            <a class="close" @click="confirmModal.show = false"></a>
        </div>
    </modal>

    <modal :show.sync="imageData.show">
        <div class="modal-body">
            <img :src="imageData.imgUrl" @click="imageData.show = false" style="display: block; margin: 0 auto; max-width:100%;max-height:100%;">
        </div>
    </modal>

    <section class="coverDia" v-show="showCover">
        <div class="box">
            <span class="loading loading-1"></span>
            <span class="loading loading-2"></span>
            <span class="loading loading-3"></span>
            <span class="loading loading-4"></span>
            <span class="loading loading-5"></span>
            <span class="loading loading-6"></span>
            <span class="loading loading-7"></span>
            <span class="loading loading-8"></span>
        </div>
    </section>

</template>

<style scoped>
    .coverDia{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background-color:rgba(127,127,127,0.6);
    }

    .box{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
    }

    @keyframes load{
        0%{transform: scale(0);background-color: rgba(76,76,76,0.9);}
        100%{transform: scale(1);background-color: rgba(76,76,76,0.8);}
    }

    .loading{
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        /*background-color: rgba(76,76,76,0.9);*/
        border-radius: 50%;
    }

    .loading.loading-1{
        top: 0;
        left: 20px;
        animation: load 1.4s infinite 0s;
    }

    .loading.loading-2{
        top: 7px;
        left: 7px;
        animation: load 1.4s infinite 0.2s;
    }

    .loading.loading-3{
        top: 20px;
        left: 0;
        animation: load 1.4s infinite 0.4s;
    }

    .loading.loading-4{
        top: 33px;
        left: 7px;
        animation: load 1.4s infinite 0.6s;
    }

    .loading.loading-5{
        top: 40px;
        left: 20px;
        animation: load 1.4s infinite 0.8s;
    }

    .loading.loading-6{
        top: 33px;
        left: 33px;
        animation: load 1.4s infinite 1.0s;
    }

    .loading.loading-7{
        top: 20px;
        left: 40px;
        animation: load 1.4s infinite 1.2s;
    }

    .loading.loading-8{
        top: 7px;
        left: 33px;
        animation: load 1.4s infinite 1.4s;
    }

</style>

<script>
	import {router} from '../index'
    import api from '../api'
    import Modal from '../../src/components/Modal.vue'

	export default {
        components:{
            Modal
        },
		data() {
			return {
				lists:[],
                orderData:{},
                contentData:{},
                auditStatus: {
                    showMsg:false,
                    msg: ''

                },
                moneyStatus: {
                    showMsg:false,
                    msg: ''
                },
                auditData: {
                    order_num: this.$route.params.order_num,
                    photo_type: '',
                    status: '',
                    refuse_reason:''
                },
                confirmModal: {
                    show: false,
                    title: '提示',
                    msg: '',
                    btnText: '确定',
                    fn() {}
                },
                cash:'确认返现',
                imageData: {
                    imgUrl: '',
                    show: false
                },
                showCover: false
                // divT:

                
			}
		},

		ready() {
            this.getOrderDetail();

            this.$on('confirmModal', (obj) => {
                
                if(obj.show) {
                    this.confirmModal.show = obj.show;
                }
                if(obj.title) {
                    this.confirmModal.title = obj.title;
                }
                if(obj.msg) {
                    this.confirmModal.msg = obj.msg;
                }
                if(obj.btnText) {
                    this.confirmModal.btnText = obj.btnText;
                }
                if(obj.fn) {
                    this.confirmModal.fn = obj.fn;
                }
            });
			
		},

        methods: {

            getOrderDetail(){
                var that = this;
                api.userOrderDetail(this, {order_num: this.$route.params.order_num}, (back)=>{
                    if(back.resCode == "0"){
                        var arr = back.repBody.list;
                        if(arr.length == 1){
                        	if(arr[0].status == 1 || arr[0].status == 2){
                        		arr[0].showReason = false;
                        	}else{
                        		arr[0].showReason = true;
                        	}

                        	if(arr[0].refuse_reason === "no"){
                        		arr[0].refuse_reason = "审核未通过。您上传的订单截图与订单号不符，请查证后再重新申请。";
                        	}

                            that.orderData = arr[0];
                            //
                            that.orderData.photo_url =that.orderData.photo_url.split(",");
                            
                            if(that.orderData.is_pay==2){
                                that.cash='已返现';
                            }

                        }else if(arr.length == 2){
                            for(var i=0;i<arr.length;i++){

                            	if(arr[i].status == 1 || arr[i].status == 2){
	                        		arr[i].showReason = false;
	                        	}else{
	                        		arr[i].showReason = true;
	                        	}

	                        	if(arr[i].refuse_reason === "no"){
	                        		arr[i].refuse_reason = "审核未通过。您上传的评论截图与订单号不符，请查证后再重新申请。";
	                        	}

                                if(arr[i].photo_type == 1){
                                    that.orderData = arr[i];
                                    //
                                    that.orderData.photo_url =that.orderData.photo_url.split(",");
                                }else if(arr[i].photo_type == 2){
                                    that.contentData = arr[i];
                                    that.contentData.photo_url =that.contentData.photo_url.split(",");
                                }

                                if(arr[i].is_pay==2){
                                    that.cash='已返现';
                                }
                            }
                        }
                    }
                })
            },
            examineOrder(){
                var that = this;
                api.examineOrder(this, this.auditData, (back)=>{
                    if(back.resCode == "0"){
                        if(back.repBody.code == "0"){
                            that.auditStatus.showMsg = true;
                            that.auditStatus.msg = '操作成功';
                            that.getOrderDetail();


                        }else if(back.repBody.code == "10001"){
                            that.auditStatus.showMsg = true;
                            that.auditStatus.msg = back.repBody.msg;
                        }
                    }
               })
            },
            auditOrder(_data, name){
                //判断data是否有数据的
                if(!_data.order_num){
                    this.auditStatus.showMsg = true;
                    this.auditStatus.msg = '此单未有数据,请通知客户上传';
                    return;
                }

                //判断订单状态为审核中
                if(_data.status != 1){
                	
                    this.auditStatus.showMsg = true;
                    this.auditStatus.msg = '订单已完成审核';
                    return;
                }

                //已经上传图片了
                if(_data.photo_url == ""){
                    this.auditStatus.showMsg = true;
                    this.auditStatus.msg = '图片未上传,不能审核';
                    return;
                }

                if('pass' == name){
                    //审核通过
                    if(_data.photo_type == 1){
                        //订单截图

                        //审核图片类型
                        this.auditData.photo_type = _data.photo_type;
                        //审核订单状态
                        this.auditData.status = 2;
                        //调用审核接口
                        this.examineOrder();

                    }else if(_data.photo_type == 2){
                        //评论截图
                        if(this.orderData.status == 2){
                            //订单截图审核通过,才能审核评论截图

                            //评论截图,通过审核

                            //审核图片类型
                            this.auditData.photo_type = _data.photo_type;
                            //审核订单状态
                            this.auditData.status = 2;
                            //调用审核接口
                            this.examineOrder();
                            
                        }
                    }

                }else if('fail' == name){
                    //不通过

                    if(_data.photo_type == 1){
                    	_data.showReason = !_data.showReason;

                    }else if(_data.photo_type == 2){
                        //评论截图
                        if(this.orderData.status == 2){
                            //订单截图审核通过,才能审核评论截图
                            _data.showReason = !_data.showReason;

                        }
                    }

                }
            },
            auditOrderReason(_data,name){

            	//判断审核不通过的文本框是否为空
            	//判断data是否有数据的
                if(!_data.refuse_reason){
                    this.auditStatus.showMsg = true;
                    this.auditStatus.msg = '此文本未有数据,请填写审核不通过理由';
                    return;
                }

                if(_data.refuse_reason.length > 200){
                	this.auditStatus.showMsg = true;
                    this.auditStatus.msg = '不能超过200字';
                    return;
                }

                if(_data.photo_type == 1){

                        //订单截图,不通过审核

                        //审核图片类型
                        this.auditData.photo_type = _data.photo_type;
                        //审核订单状态
                        this.auditData.status = 3;
                        //不通审核原因
                        this.auditData.refuse_reason = _data.refuse_reason;
                        //调用审核接口
                        this.examineOrder();

                }else if(_data.photo_type == 2){
                    //评论截图
                    if(this.orderData.status == 2){
                        //订单截图审核通过,才能审核评论截图

                        //评论截图,不通过审核

                        // 审核图片类型
                        this.auditData.photo_type = _data.photo_type;
                        // 审核订单状态
                        this.auditData.status = 3;
                        //不通审核原因
                        this.auditData.refuse_reason = _data.refuse_reason;
                        // 调用审核接口
                        this.examineOrder();

                    }

                }
            },
            //判断打款
            cashBack(){
                
                var that = this;
                var set = document.getElementById("setzhe");
                // 
               
                

                //订单和评论已通过审核
                if(that.contentData.status == 2 && that.orderData.status == 2){
                    //未打款
                    if(that.orderData.is_pay==1 && that.contentData.is_pay==1){
                        this.$dispatch('confirmModal', {show:true, title: '确认返现', fn(){
                            that.showCover = true;
                            api.payOrder(that, {order_num: that.contentData.order_num}, (back)=>{
                                if(back.resCode == "0"){
                                    if(back.repBody.code == "0"){
                                        that.showCover = false;
                                        that.auditStatus.showMsg = true;
                                        that.auditStatus.msg = '返现成功';
                                        that.getOrderDetail();

                                    }else if(back.repBody.code == "10001"){
                                        that.showCover = false;
                                        that.auditStatus.showMsg = true;
                                        that.auditStatus.msg = back.repBody.msg;
                                    }
                                }else{
                                    that.showCover = false;
                                }
                           })
                        }});

                    }
                    //已打款
                    else{
                        that.auditStatus.showMsg = true;
                        that.auditStatus.msg = '该订单已返现';
                        set.style.display ="block";

                    }

                }
                //订单和评论未通过审核
                else{
                    that.auditStatus.showMsg = true;
                    that.auditStatus.msg = '订单或评论截图未审核通过,请审核通过后再返现';
                    
                }
                
            },
            lookImg(_data, index){
                
                if(_data.photo_url[index]){
                    this.imageData.imgUrl = _data.photo_url[index];
                    this.imageData.show = true;
                }
                
            }
            

            
//
        }
	}
</script>