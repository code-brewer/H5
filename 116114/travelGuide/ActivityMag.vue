<template>
    <div class="app-view" v-el:views>
    <!-- <div style="height:80px;position:fixed;"> -->
        <div class="voteType">
            <span class="votetitle " @click="getVotes('')" :class="{'active':voteData.type == ''}">全部</span>
            <span class="votetitle" @click="getVotes('ING')" :class="{'active':voteData.type == 'ING'}">进行中</span>
            <span class="votetitle" @click="getVotes('END')" :class="{'active':voteData.type == 'END'}">已截止</span>
        </div>
    <!-- </div> -->
        <div class="scroll" style="height: 100%; box-sizing: border-box; overflow: hidden;" v-show="!voteshow">
        	<div class="container">
        		<div class="voteList" v-for="vote in votelists">
		            <p class="color-white" v-link="{path:'/vote/'+ vote.id}">{{vote.name}} </p>

		            <p v-link="{path:'/vote/'+ vote.id}">创建时间:{{vote.starttime}}</p>
		            <p v-link="{path:'/vote/'+ vote.id}">有效时间:{{vote.endtime}} <span style="" class="list-state" :class="{active:vote.compareTime == true}">{{vote.compareTime == false?'进行中':'已截止'}}</span></p>
		            <div class="vote-btn">
		                <div style="float:right;">
		                    <a @click="this.$router.go({path:'/list/'+ vote.id})">榜单</a><a @click='delmodel(vote.id)'>删除</a><a v-if="vote.compareTime == false" @click="edit(vote)">编辑</a>
		                </div>
		            </div>
		        </div>
		        <p class="pullUp" v-show="pullUp">正在加载中……</p>
		        
        	</div>
        </div> 
        <div v-show="voteshow" class="novote">
		            暂无投票信息
		</div>
		<model :show.sync="delStatus.showMsg">
	        <div class="del-msg">
	            <p>是否删除该投票活动?</p>
	            <p style="color:red" @click="del()">删除</p>
	            <p @click="delbtn">取消</p>
	        </div>
	    </model>
    </div>
	    
</template>
<script>
import Vue from 'vue'
import {
    router
} from './index'
import sapi from './utils/serverapi.js'
import DateUtils from './components/utils/DateUtils.js'
import IScroll from './components/utils/isscroll.js'
import Model from './components/Model.vue'
export default {
    components: {
        Model,
    },
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
            votelists: [], //投票活动
            voteData: {
                type: '',
                page: 1, //页码
                size: 6, //页面大小
                total: 0
            },
            voteshow: false,
            delStatus: {
                msg: "",
                showMsg: false,
                errorShow: true
            },
            delId: '',
            pullUp: false,
            iscroll: null,
            initCount: 1,
            isRedraw: true,
            scollShow:false
        }
    },
    ready() {
    	this.$els.views.addEventListener('touchmove', function(e){e.preventDefault();}, false);
        if (!this.$root.islogin) {
            router.go('home');
            return;
        }
        if (!this.$root.isGuide) {
            this.$root.preventModal = true;
            return;
        }
        this.getVotes('');
    },
    methods: {
        edit(vote){
            sessionStorage.setItem("voteinfo",JSON.stringify(vote));
            router.go('edit');
        },
        getVotes(type) {
            
            this.voteshow = false;
            
            if(this.voteData.type !== type) {
            	this.votelists = [];
            	this.voteData.type = type
            }
            if (this.voteData.type === 'undefined') {
                this.voteData.type = ''
            }
            this.$nextTick(() => {
            	sapi.getVotes(this, "?type=" + this.voteData.type + '&page=' + this.voteData.page + '&size=' + this.voteData.size, (back) => {
	                this.pullUp = false;
	                if (back.code == '0') {
	                    if (DateUtils.isEmptyObject(back.data.list)) {
	                        this.voteshow = true;
	                        return;
	                    } else {
	                    	this.scollShow = true;
	                        back.data.list.forEach(value => {

	                            value.starttime = DateUtils.formatDate(new Date(value.starttime), 'yyyy-MM-dd')
	                            value.endtime = DateUtils.formatDate(new Date(value.endtime), 'yyyy-MM-dd')
	                            value.compareTime = false; //进行中
	                            if (DateUtils.timeComparison(value.endtime)) {
	                                value.compareTime = true; //已截止
	                            }
	                        })
	                        this.votelists = this.votelists.concat(back.data.list);
	                        
	                        this.voteData.total = back.data.totalpage
	                        this.scroll();
	                    }
	                } else {
	                    // this.$dispatch('handle_server_error', back);
	                }
	            });
            })
	            
        },
        scroll() { //初始化滚动
            console.log(this.initCount)
            if (this.initCount) {
                Vue.nextTick(() => {
                    this.iscroll = new IScroll('.scroll', {
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
                            this.voteData.page++;
                            if (this.voteData.page <= this.voteData.total) {
                                this.pullUp = true;
                                this.getVotes(this.voteData.type);
                            }
                        }
                    })
                })
                this.initCount -= 1;
            } else {
                Vue.nextTick(() => {
                    this.iscroll.refresh();
                    this.isRedraw = true;
                })
            }

        },
        delmodel(id) {
            this.delId = id;
            this.delStatus.showMsg = true;

        },
        del() {
            sapi.delVote(this, "?id=" + this.delId, (back) => {
                if (back.code == '0') {
                    this.delStatus.showMsg = false;
                    this.getVotes(this.voteData.type);
                    this.$dispatch('loading', {
                        icon: false,
                        text: back.data,
                        show: true,
                        duration: 2 * 1000
                    });
                } else {
                    this.$dispatch('handle_server_error', back);
                }
            });
        },
        delbtn() {
            this.delStatus.showMsg = false;
        }
    },
    watch: {
        'voteData.type' (val) {
            this.voteData.page = 1
        }
    }
}
</script>
<style lang="scss" scoped>
	div.app-view {
		padding-top: 80px;
		box-sizing: border-box;
	}
</style>
<style lang="scss">
.choice-msg {
    width: 100%;
    padding: 100px 0;
    background-color: #fff;
}

.msg-content {
    line-height: 30px;
    text-align: center;
    color: #000;
    margin: 30px 0;
}

.sure {
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    background-color: #ed6c00;
    display: block;
    margin: 0 auto;
}

.voteType {
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    background-color: #fff;
    font-size: 34px;
    //
    position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	    // padding: 0 20px;
	    height:80px;
	    z-index: 10;
}

.votetitle {
    flex: 1;
    border-right: 1px solid #f3f3f3;
}

.voteList {
    padding: 30px;
    background-color: #fff;
    margin-bottom: 10px;
}

.votetitle.active {
    color: #fff;
    background-color: #ed6c00;
}

.voteList p {
    line-height: 45px;
    color: #6a6a6a;
    font-size: 24px;
}

.voteList .color-white {
    color: #000;
    font-size: 30px;
}

.list-state {
    float: right;
    color: #ff2222;
}

.list-state.active {
    color: #b2b1b1;
}

.vote-btn {
    border-top: 1px solid #cecece;
    padding-top: 20px;
    height: 60px;
    box-sizing: border-box;
    margin-top: 10px;
}

.vote-btn a {
    width: 100px;
    height: 40px;
    display: inline-block;
    background-color: #fe3e49;
    color: #fff;
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
    margin-left: 20px;
}

.novote {
    margin-top: 50px;
    line-height: 45px;
    text-align: center;
    font-size: 30px;
}

.del-content {
    position: relative;
    width: 100%;
    height: 100%;
}

.del-msg {
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: #fff;
}

.del-msg p {
    height: 90px;
    line-height: 90px;
    text-align: center;
    color: #000;
    border-bottom: 1px solid #eee;
}

.moreText,
.pullUp {
    line-height: 70px;
    text-align: center;
    color: #ed6c00;
    font-size: 24px;
}
</style>
