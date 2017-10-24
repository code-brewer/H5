<template>
    <div class="travelItemBox clearfix">
       <div @click="statisticsSum(item.title,item.routeJumpUrl)">
         <image-item :imgUrl="item.imgUrl"></image-item>
       </div>
       <p class="itemTitle">{{item.title}}</p>
       <p>
           <span class="price">¥{{item.bargainPrice}}</span>
           <span class="oldPrice">¥{{item.originalPrice}}</span>
           <span class="deadline">截止日期：{{new Date(item.createdTime).format()}}</span>
       </p>
    </div>
</template>
<script>
import imageItem from './travelImg.vue';
export default {
	props : {
		item : {
            // type : Object,
            default : {
                    classify : '',//分类
                    imgUrl : '',//图片地址
                    title : '',//标题
                    price : '',//价格
                    oldPrice : '',//旧价格
                    deadline : ''//截止日期


                }
        }
	},
    components: {
       imageItem
    },
	mounted() {

	},
    data() {
            return {
            	
            }
        },
    methods: {
        goUrl (url) {
          window.location.href = url;
        },
        statisticsSum (name,url) {
           var _this = this

            //http://域名:端口/tourism/data/addDataClicks
                this.axios({
                    method: 'post',
                     url: basePath+'/data/addDataClicks',
                     data: 'dataProductName='+name,
                   headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                }).then((res)=>{
                })
        },

    },
}
</script>
<style lang="scss" scoped>
   .travelItemBox{
        box-sizing: border-box;
        padding: 0 10px;
        text-align: left;
        margin-bottom: 12px;
   }
   .itemTitle {
     font-size: 14px;
     padding-top: 10px;
     line-height: 25px;
     text-align: left;
     width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
   .price {
        font-size: 16px;
        font-weight: 700;
        color: #e53f47;
        float: left;
        margin-top:5px;

   }
   .oldPrice {
        margin-left: 7px;
        float: left;
        margin-top:5px;
        text-decoration: line-through;
        color:#a6a6a6;
   }
   .deadline {
        float: right;
        margin-top: 5px;
        color: #a6a6a6;
   }
</style>
