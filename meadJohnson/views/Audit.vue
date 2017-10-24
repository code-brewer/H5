<template>
    <div class="Check-list-bg">
        <div class="happy-top">
            <a class="happy-l" href="#!/rules"></a>
            申请清单
            <!-- <a href="#!/apply">
        <i class="happy-plus"></i>
      </a> -->
        </div>
        <div class="audit">
            <!-- <p>审核中</p> -->
            <ul>
                <li style="height:65px;border-top: none;">
                    <p>审核中</p>
                </li>
                <li v-for="(index, list) in listAuditing" @click="lookDetail(list.order_num)">
                    <a href="javascript:;" class="date" style="color:#000;">{{index+1}}.&nbsp;{{list.ctime.split(" ")[0]}}</a>
                    <a href="javascript:;" class="time">{{list.ctime.split(" ")[1]}}</a>
                    <a href="javascript:;" class="zhuangtai" style="color:#c80d3a;">{{list.is_pay == 1 ? "审核中" : "审核通过"}}</a>
                    <i class="back-r" @click=""></i>
                </li>
            </ul>
        </div>
        <div style="padding:40px auto;">
            <a class="dingdanbtn" style="width:282px;height:76px;background:url(images/x.png) no-repeat;margin:0 auto;display:block;background-size:contain;" href="#!/apply"></a>
        </div>
        <div class="finish">
            <!-- <p>已完成</p> -->
            <ul>
                <li style="height:65px;border-top: none;">
                    <p>已完成</p>
                </li>
                <li v-for="(index, list) in listComplete" @click="lookDetail(list.order_num)">
                    <a href="javascript:;" class="date" style="color:#000;">{{index+1}}.{{list.ctime.split(" ")[0]}}</a>
                    <a href="javascript:;" class="time">{{list.ctime.split(" ")[1]}}</a>
                    <a href="javascript:;" class="zhuangtai">{{list.is_pay == 2 ? "审核通过" : (list.fails != "0" ? "审核失败" : "审核中")}}</a>
                    <i class="back-an"></i>
                </li>
            </ul>
        </div>
        <!-- <div class="foot-logo"></div> -->
    </div>
</template>
<script>
// import {
//     router
// } from '../index.js'
import api from '../api'

export default {
    http: {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    data() {
        return {
            listAuditing: [],
            listComplete: [],

        }
    },

    ready() {
        var that = this;
        api.orderList(this, {}, (back) => {
            if (back.resCode == "0") {
                var arr = back.repBody.list
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].is_pay == "1") {
                        if (arr[i].fails != "0") {
                            that.listComplete.push(arr[i]);
                        } else {
                            that.listAuditing.push(arr[i]);
                        }

                    } else {
                        that.listComplete.push(arr[i]);
                    }
                }
            }
        })
    },

    methods: {
        lookDetail(order_num) {
            api.orderDetail(this, {
                order_num: order_num
            }, (back) => {
                if (back.resCode == "0") {
                    var arr = back.repBody.list;
                    if (arr.length == 2) {
                        //已上传2张截图了
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].photo_type == 2) {
                                //评论截图
                                if (arr[i].status == 2) {
                                    //审核成功
                                    router.go({
                                        name: 'progressed',
                                        params: {
                                            order_num: arr[i].order_num
                                        }
                                    });

                                } else if (arr[i].status == 1) {
                                    //审核中
                                    router.go({
                                        name: 'progressing',
                                        params: {
                                            order_num: arr[i].order_num
                                        }
                                    });

                                } else if (arr[i].status == 3) {
                                    console.log(3)
                                        //审核不通过
                                    router.go({
                                        name: 'failure',
                                        params: {
                                            order_num: arr[i].order_num
                                        }
                                    });

                                }

                            }
                        }

                    } else if (arr.length == 1) {
                        //只上传了1张截图

                        if (arr[0].status == 2) {
                            //审核成功
                            router.go({
                                name: 'progress',
                                params: {
                                    order_num: arr[0].order_num
                                }
                            });

                        } else if (arr[0].status == 1) {
                            //审核中
                            router.go({
                                name: 'progressing',
                                params: {
                                    order_num: arr[0].order_num
                                }
                            });

                        } else if (arr[0].status == 3) {
                            //审核不通过
                            router.go({
                                name: 'failure',
                                params: {
                                    order_num: arr[0].order_num
                                }
                            });

                        }

                    }
                }
            })
        }
    }

}
</script>
<style>

.upload-msg {
    background: url(../images/modal.png) no-repeat;
    background-size: contain;
    background-color: rgba(255, 255, 255, 0);
    /*padding:100px 0;*/
    padding: 60px 23px;
    box-sizing: border-box;
}

.upload-msg .msg-content {
    line-height: 35px;
    font-size: 26px;
    color: #2b1700;
}

.uploadsize-msg {
    background: url(../images/modal1.png) no-repeat;
    background-size: contain;
    background-color: rgba(255, 255, 255, 0);
    padding: 53px 90px;
    box-sizing: border-box;
}

.choice-msg {
    background: url(../images/choice.png) no-repeat;
    background-size: contain;
    background-color: rgba(255, 255, 255, 0);
    padding: 53px 90px;
    box-sizing: border-box;
}

.success-msg {
    background: url(../images/modal.png) center center no-repeat;
    background-size: contain;
    background-color: rgba(255, 255, 255, 0);
    padding: 50px 80px;
    box-sizing: border-box;
}

.zanhuan-msg {
    background: url(../images/zanhuan.png) no-repeat;
    background-size: contain;
    background-color: rgba(255, 255, 255, 0);
    padding: 47px 62px;
    box-sizing: border-box;
}
</style>
