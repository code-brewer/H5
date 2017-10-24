<template>
    <div class="searchListBox">
        <div class="top">
            选择目的地
        </div>
        <ul class="content">
            <li @click="emitSearch(item)" :class="{selected:item===(selected)}" v-for="item in list">
                <p>{{item}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
	props : {
		selected : {
            type : String,
            default : ''
        }
	},
    created(){
        
    },
	mounted() {
	    this.getSearch()
	},
    data() {
            return {
                list : [
                ]
            }
        },
        methods: {
            emitSearch(val) {
                this.$bus.emit('emitSearch',val)
            },
             getSearch () {
                var _this = this;
              //http://域名:端口/tourism/index/indexDestination
              this.axios.post(basePath+'/index/indexDestination').then(function(res){
                if (res.data.msg==='请求成功'){
                    _this.list = res.data.data
                }
                
              })
            },
            filterList (arr) {
                return arr.filter((item)=>{
                   if(item.indexOf(this.selected)!=-1){
                            return item
                        }
                    
                })
            }

        },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .searchListBox {
        position: absolute;
        background-color: #fff;
        width: 100%;
        z-index: 999;
        text-align: left;
        left: 0;
        top: 50px;
        .top {
            padding-left: 15px;
            font-size: 16px;
            line-height: 30px;
            height: 30px;
            border-left: 2px solid #7f7f7f;
        }
        ul.content {
            max-height: 185px;
            overflow: auto;
            li {
                padding-left: 20px;
                padding-right: 30px;
                line-height :40px;
                height: 40px;
                font-size: 14px;
                box-sizing: border-box;
                border-left: 2px solid #7f7f7f;
                
                p {
                    border-top: 1px solid #dedede;
                    padding-left: 10px;
                }
            }
            li.selected {
                background-color: #e0e0e0;
                height: 40px;
                border-left: none;
                position: relative;
            }
            li.selected:after {
                position:absolute;
                content:' ';
                top: 0;
                right: 30px;
                width: 30px;
                height: 40px;
                background-image: url(./../images/listSelected.png);
                background-size :25px;
                background-repeat:no-repeat;
                background-position:center;
            }
        }
    }
</style>
