<template>
	<div class="box1">
		<div class="top">
			
            <search-time :searchdate="selectData.searchTime">
                <a @click="clickTime('本周')" :class="{active:activeTime==='本周'}">本周</a>
                <a @click="clickTime('上周')" :class="{active:activeTime==='上周'}">上周</a>
                <a @click="clickTime('本月')" :class="{active:activeTime==='本月'}">本月</a>
                <a @click="clickTime('上月')" :class="{active:activeTime==='上月'}">上月</a>
                <a @click="clickTime('所有')" :class="{active:activeTime==='所有'}">所有</a>
            </search-time>
		</div>
		<div class="middle">
    		<table class="table table-bordered table-hover">
            <thead>
              <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
                <th>所属地区</th>
                <th>起始日期</th>
                <th>截止日期</th>
                <th>开户数</th> 
                <th>销户数</th>
                <th>净增长数</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for = "item in searchlist.list ">
                <!-- <th scope="row">1</th> -->
                <td>{{item.place}}</td>
                <td>{{item.beginDate}}</td>
                <td>{{item.endDate}}</td>
                <td>{{item.openUser}}</td>
                <td>{{item.deleteUser}}</td>
                <td>{{item.openUser-item.deleteUser}}</td>
                
              </tr>
           
            </tbody>
          </table>
          <load :show="isLoad"></load>
	   </div>
      <!--  <div class="bottom">
            <page :searchlist.sync="searchlist">
                <div style="float: right">
                    <button type="button" class="btn btn-primary">当前页导出为.txt</button>
                    <button type="button" class="btn btn-success">全部导出为.txt</button>
                </div>
            </page>
        </div> -->
	</div>
</template>
<style lang="scss" scoped>
	.box1 {
		display: flex;
		flex-direction : column;
		height: 100%;
		padding-left: 20px;
    	padding-top: 20px;
    	padding-right:50px;
    	box-sizing: border-box;
    	.top {
            min-width: 800px;
    		a {
    			margin-left: 20px;
                cursor: pointer;
    		}
            a.active {
                color: red;
            }
    		button {
    			font-size: 12px;
    			height: 20px;
    			line-height: 8px;
    			margin-left: 100px;
    		}
    		span {
    			margin-right: 5px;
    			margin-left: 5px;
    		}
    		input,select {
    			display: inline-block;
    			width: 96px;
    			height: 22px;
    		}
    		select {
    			vertical-align: bottom;
    		}
    	}
    	.middle {
    		margin-top: 20px;
    		a {
    			cursor: pointer;
    		}
    		th,td {
    			text-align: center;
    		}
    	}
	}
</style>
<script type="text/javascript">
    import searchTime from '../components/search_time.vue'
    import page from '../components/page.vue'
    import api from '../api/index.js'
    import load from '../components/load.vue'
    export default {
        components : {
            searchTime,
            page,
            load,
        },
        ready () {
            this.switchTime(this.activeTime)
            this.list()
            this.$on('dateClick',function(){
              this.activeTime = ''
            })
          this.$on('search',function(){//点击搜索
             this.list()
            
             })

        },
        //  attached () {
        //    this.switchTime(this.activeTime)
        //     this.list()
        // },
        attached () {
           if (this.$root.isRefresh.statistics){
             this.switchTime(this.activeTime)
             this.list()
             this.$root.isRefresh.statistics = false
           }
        },
        watch : {
           
        },
        filters : {

        },
        computed: {
            getWeekStartDate() { //本周开始时间
                var now = this.now
                var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());      
                return weekStartDate.format() 
            },
            getWeekEndDate () { //本周结束时间
                 var now = this.now
                  var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 -  now.getDay()));      
                return weekEndDate.format()    
            },
            getLastWeekStart () { //上周开始时间
                   var now = this.now
                 var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()-7);          
                return weekStartDate.format() 
            },
             getLastWeekEnd () { //上周结束时间
                   var now = this.now
                   var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 -  now.getDay()-7));          
                return weekEndDate.format() 
            },
            getMonthStartDate () { //本月开始时间
                var now = this.now
                var monthStartDate = new Date(now.getFullYear(), now.getMonth(), 1);      
                return monthStartDate.format()       
            },
             getMonthEndDate () { //本月结束时间
                var now = this.now
                var monthEndDate  = new Date(now.getFullYear(), now.getMonth(), this.getMonthDays(now.getMonth()));      
                return monthEndDate.format()       
            },
          
             getLastMonthStartDate () { //上月开始时间
                var now = this.now
                var lastMonthStartDate   = new Date(now.getFullYear(),  this.lastDate().getMonth(), 1);
                return lastMonthStartDate.format()       
            },
            getLastMonthEndDate () { //上月结束时间
                var now = this.now
                var lastMonthStartDate   = new Date(now.getFullYear(), this.lastDate().getMonth(), this.getMonthDays(this.lastDate().getMonth()))      
                return lastMonthStartDate.format()       
            },

        },
        data () {
            return {
                activeTime : '',
                 isLoad : false,
                 selectData : {
                    searchTime : {
                         begin :new Date().format(),
                       end : new Date(new Date().setDate(new Date().getDate()+1)).format(),
                    }
                },
                now : new Date(),
                searchlist : {
                    list : [
                        // {
                        //     place : '',
                        //     beginDate : '',
                        //     endDate : '',
                        //     openUser : '',
                        //     deleteUser : '',
                        // }
                    ],
                    all : 0,
                    nowPage : 1,
                    nowGroup : 1,
                 },
            }
        },
        methods : {
           getMonthDays (myMonth) {
            var now = this.now
            var monthStartDate = new Date(now.getFullYear(), myMonth, 1);      
            var monthEndDate = new Date(now.getFullYear(), myMonth + 1, 1);      
            var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);     
            return   days;     
           },

           lastDate () {//上月日期  
            var lastMonthDate = new Date(); 
            lastMonthDate.setDate(1);  
            lastMonthDate.setMonth(lastMonthDate.getMonth()-1);  
            return lastMonthDate
           },
           clickTime (val) {//点击时间段
                this.activeTime = val
                this.switchTime(val)
                this.list()
           },
           switchTime (val) {
               switch(val)
            {
            case '本周':
              this.selectData.searchTime.begin = this.getWeekStartDate
                this.selectData.searchTime.end = this.getWeekEndDate
              break;
            case '上周':
               this.selectData.searchTime.begin = this.getLastWeekStart
            this.selectData.searchTime.end = this.getLastWeekEnd
              break;
            case '本月':
                this.selectData.searchTime.begin = this.getMonthStartDate
                this.selectData.searchTime.end = this.getMonthEndDate
              break;
            case '上月':
               this.selectData.searchTime.begin = this.getLastMonthStartDate
                this.selectData.searchTime.end = this.getLastMonthEndDate
              break;
            case '所有':
              this.selectData.searchTime.begin = ''
                this.selectData.searchTime.end =''
              break;
            // default:
            //   n 与 case 1 和 case 2 不同时执行的代码
            }
           },
           list () {
               this.searchlist.list = []
                this.searchlist.all = 0;
              this.isLoad=true;
                  api.findbyplace(this,{
                   createtime : this.selectData.searchTime.begin,
                   createtime1 : this.selectData.searchTime.end,
                   type : 1
                 },(res)=>{
                  this.searchlist.list = []
                   this.searchlist.all = 0;
                    this.isLoad=false;
                    if (res &&res.resMsg==="success"){
                       // this.searchlist.list= res.repBody
                        // this.searchlist.all = 0;
                       for (var  i = 0  ; i < res.repBody.length ; i ++) {
                         this.searchlist.all = res.resCode
                            if( res.repBody[i].place) {
                                this.searchlist.list.push({
                                    place : res.repBody[i].place,
                                    openUser : res.repBody[i].num1,
                                    beginDate : this.selectData.searchTime.begin,
                                    endDate : this.selectData.searchTime.end,
                                    deleteUser : res.repBody[i].num2,
                                })
                                
                            }
                       }
                    }
                   
                    
                })
               
           }

        }
     }
</script>