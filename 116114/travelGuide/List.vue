<template>
<div class="app-view" v-el:views>
	<div class="list-check-top" v-show="listTop">
		<div >
		    <p>参与人数:{{listAll.total}}人</p>
		    <table class="list-table">
		        <tbody>
		            <tr class="list-table-tr">
		                <td style="width:20%;">用户姓名</td>
		                <td style="width:20%;">手机号</td>
		                <td style="width:10%;">票数</td>
		                <td style="width:10%;">排名</td>
		            </tr>
		            
		        </tbody>
		    </table>
		</div>
     </div>
    <div class="list-check">
    	<div class="list-scroll" style="height: 100%; box-sizing: border-box; overflow: hidden;" v-show="!listshow">
        	<div class="container">
        		<div v-show="tableShow">
        		    <table class="list-table">
        		        <tbody>
        		            <tr class="list-table-data" v-for="list in lists">
        		                <td style="width:20%;">{{list.username}}</td>
        		                <td style="width:20%;">{{list.phone}}</td>
        		                <td style="width:10%;">{{list.vote_count}}</td>
        		                <td style="width:10%;">{{list.rank}}</td>
        		            </tr>
        		        </tbody>
        		    </table>
        		</div>
        		<p class="pullUp" v-show="pullUp">正在加载中……</p>
    		</div>
		</div>
		<div v-show="listshow" class="nolist">
            暂无榜单信息
        </div>
        
    </div>
    
</div>
</template>

<script>
import Vue from 'vue'
import {router} from './index'
import sapi from './utils/serverapi.js'
import DateUtils from './components/utils/DateUtils.js'
import IScroll from './components/utils/isscroll.js'
export default {
    components: {},
    data() {
        return {
            isAdd: true,
            categorys: [],
            activitys: [],
            groups: [],
            category: "",
            activity: "",
            group: "",
            stime: "",
            itemData: {
                id: '',
                page: 1,
                size: 16
            },
            listTop:false,
            listshow: false,
            listAll:{},
            lists:[],
            tableShow:false,
            pullUp: false,
            //滑动分页
            iscroll: null,
            initCount: 1,
            isRedraw: true

        }
    },
    ready() {
    	//初始化绑定iScroll控件
    	this.$els.views.addEventListener('touchmove', function(e){ e.preventDefault();}, false);
        if (!this.$root.islogin) {
            router.go('home');
            return;
        }
        if (!this.$root.isGuide) {
            this.$root.preventModal = true;
            return;
        }
        this.getVoteitems();

    },
    methods: {
        getVoteitems() {
            this.itemData.id = this.$route.params.id;
            this.pullUp = false;
            sapi.getVoteitems(this, "?id=" + this.itemData.id + '&page=' + this.itemData.page + '&size=' + this.itemData.size, (back) => {
                if (back.code == '0') {
                    if (DateUtils.isEmptyObject(back.data.list)) {
                        this.listshow = true;
                        return;
                    } else {
                    	this.listTop = true;
                    	this.tableShow = true;
                    	this.lists = this.lists.concat(back.data.list);
                        // this.lists = back.data.list
                        this.listAll = back.data
                        this.itemData.total = back.data.totalpage
                        this.scroll();
                    }
                }else {
                	// this.$dispatch('handle_server_error', back);
                }
            });
        },
        scroll() { //初始化滚动
            if (this.initCount) {
                Vue.nextTick(() => {
                    this.iscroll = new IScroll('.list-scroll', {
                        fadeScrollbars: false, //禁止滚动条淡入淡出
                        tap: true
                    });
                    //alert(this.iscroll)
                    this.iscroll.on('scrollStart', () => {
                        if (this.isRedraw) {
                            this.iscroll.maxScrollY -= 70;
                        }
                        this.isRedraw = false;
                    })
                    this.iscroll.on('scrollEnd', () => {
                        if (this.iscroll.directionY && (this.iscroll.y === this.iscroll.maxScrollY)) {
                            this.itemData.page++;
                            if (this.itemData.page <= this.itemData.total) {
                                this.pullUp = true;
                                this.getVoteitems();
                            }
                        }
                    })
                })
                this.initCount -= 1;
            } else {
                this.$nextTick(() => {
                    this.iscroll.refresh();
                    this.isRedraw = true;
                })
            }

        }
    },
    watch: {

    }
}
</script>
<style lang="scss" scoped>
	div.app-view {
		padding-top: 143px;
		box-sizing: border-box;
	}
</style>
<style lang="scss">
	.list-check-top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	    padding: 0 20px;
	    height:143px;
	    z-index: 10;
	}

	.list-check-top p {
	    line-height: 76px;
	    font-size: 34px;
	    color: #000;
	} 

	.list-check {
	    padding: 0 20px;
	    height:100%;
	}
	
	.list-check p {
	    line-height: 76px;
	    font-size: 34px;
	    color: #000;
	}
	
	.list-table {
	    width: 100%;
	    border-collapse: collapse;
	    border-spacing: 0;
	    table-layout: fixed;
	}
	
	.list-table-tr {
	    background-color: #ed6c00;
	}
	
	.list-table-tr td {
	    color: #fff;
	    text-align: center;
	    line-height: 65px;
	    border: 1px solid #a7a7a7;
	}
	
	.list-table-data td {
	    color: #000;
	    text-align: center;
	    line-height: 65px;
	    border: 1px solid #a7a7a7;
	    background-color:#fff;
	    word-break: break-all;
    	word-wrap: break-word;
	}
	
	.nolist {
	    // padding-top: 50px;
	    text-align: center;
	}
	.moreText,.pullUp {
    line-height: 70px;
    text-align: center;
    color: #ed6c00;
    font-size: 24px;
}
</style>