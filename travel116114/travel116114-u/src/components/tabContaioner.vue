<template>
    <div>
        <mt-navbar v-model="selected">
          <mt-tab-item v-for="(item,index) in list" v-bind:id="index" :key="index">{{item.classify}}</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected" id="container">
          <mt-tab-container-item v-for="(item,index) in list" v-bind:id="index" :key="index">
            <travel-item v-for="item1 in item.content" :item="item1" :key="item1.title">
            </travel-item>
          </mt-tab-container-item>
         
          
        </mt-tab-container>
    </div>
</template>
<script>
import { Navbar, TabItem } from 'mint-ui';
import travelItem from './travelItem.vue';
export default {
    components : {
        Navbar,TabItem,travelItem
    },
	props : {
		
	},
    watch : {
      
    },
    created(){
        this.getList()
        this.$bus.on('saveLocaltionData',()=>{
            this.saveLocaltionData(this.list)
        })
        this.$bus.on('handelData',(data)=>{
            
            this.handelData(data)

        })
        this.$bus.on('restoreData',()=>{
          var data11 = this.getData('travelItem')
          this.list = data11

        })
        
        
    },
	mounted() {
	    
	},
    data() {
            return {
            	selected : 0,
                // navBarWidth : '',
                list : [
                {
                    classify : '特惠游',//分类
                    content : [
                        {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        },
                         {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.jpg',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }
                    ]


                },
                {
                    classify : '境外游',
                     content : [
                        {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        },
                         {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.jpg',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }
                    ]
                },
                {
                    classify : '其他',
                     content : [
                        {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        },
                         {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }, {
                            imgUrl : './static/images/1.png',//图片地址
                            title : '阳朔旅游纯玩团 龙脊漓江三星豪华外事游船4天3晚四日',//标题
                            price : '¥699',//价格
                            oldPrice : '¥699',//旧价格
                            deadline : '2017-06-30'//截止日期
                        }
                    ]
                },
                ]
            }
        },
    methods: {
        getList () {
            //http://域名:端口/tourism/index/indexCategory
            var _this = this
            var list = [];
              this.axios.post(basePath+'/index/indexCategory',{
              }).then(function(res){
                if(res.data.msg==='请求成功'){
                    for (var k = 0 ; k < res.data.data.length ; k++){
                        var classify = res.data.data[k]
                        console.log(classify)
                        _this.getContent(classify,function(res){
                           list.push(res)
                        })
                    }
                    _this.list = list

                }
              })
        },
        getContent (tab,cb) {
            var _this = this

            //http://域名:端口/tourism/index/selectInfoByTab
                this.axios({
                    method: 'post',
                     url: basePath+'/index/selectInfoByTab',
                     data: 'tab='+tab,
                   headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                }).then((res)=>{
                    if (res.data.msg==="请求成功"){
                         var content = {
                            classify : tab,
                            content : res.data.data
                        }
                        if(cb) cb(content)
                    }
                  
                })
              
                               
        },
        saveLocaltionData (data) {
            var data = JSON.stringify(data)
            window.localStorage.setItem('travelItem',data)
        },
        getData (name) {
            var data = JSON.parse(window.localStorage.getItem(name))
            
            return data
        },
        handelData(data) {
            console.log(data)
            var list = this.list
            var resultList = []
            var content = [];
            for (var k = 0 ; k < list.length ; k ++) {
                
                var resList = [];
                for (var i = 0 ; i < data.length ; i++) {
                    var arr = data[i].tab.split(',')
                    for (var j = 0 ; j < arr.length ; j++) {
                      var classify  =  arr[j]
                      if (list[k].classify === classify) {
                        resList.push(data[i]) 
                      }
                    }
                    
                }
                content.push({
                    classify : list[k].classify,
                    content : resList
                })
                
               
            }
            this.list = content

        }


    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .mint-navbar {
        overflow: auto;
    }
    .mint-tab-item {
        min-width: 50px;
    }
    .mint-navbar .mint-tab-item.is-selected {
        color: #ffcc1d;
        border-bottom: 5px solid #ffcc1d;
        text-decoration: none;
    }
    a.mint-tab-item {
        box-sizing: border-box;
    }
</style>
