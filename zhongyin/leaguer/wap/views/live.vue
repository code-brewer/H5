<template>
	<div class="live-container">
        <div class="award-list-container" >
            <!-- <img src="../images/award-list.png" alt=""> -->
            <div class="con">
                <div class="awards">
                    <ul>
                        <li class="award-item" v-for="item in awardList" track-by="$index">
                            <div class="fl-l">
                                <div class="award-info"><span class="tel">{{item.pmobile}}</span><span class="date">{{item.rectime}}</span></div>
                                <div class="prize">{{item.pname}}</div>
                            </div>
                            <div class="fl-r">
                                <span class="prize-icon"><img :src="item.pimg" class="prize-t"></span>
                                 <!-- <span class="prize-icon"><i class="iphone"></i></span> -->
                            </div>
                        </li>
                    </ul>
                </div>
                <infinite-loading :on-infinite="onInfinite">
                    <span slot="no-more">这里已经到底了 ^_^</span>
                </infinite-loading>
            </div>
        </div>
	</div>
</template>
<script>
    import api from '../api/index.js'
    import InfiniteLoading from 'vue-infinite-loading'
	export default {
        components: {
            InfiniteLoading
        },
		data() {
            var memberinfo = window.memberinfo
			return {
                memberinfo,
                awardList:[],
                pageSize: 20,
                pageCount: 0,
                pageNum: 1
            }
		},
		ready() {
            // this.getAwardList();
            // 添加访问日志
            if(window.memberinfo.aid) {
                api.addAcceptLog(this, {type: 'signin', source: 'zhibo'}, (back)=>{})
                submitStatInfo(base_url+'hdzb', base_url+'hdzb', 'bottom_zhibo_btn', 'click', '', '', 'wap', window.channle, 'Phone', base_url+'hdzb', '', 'aid=1')
            }
		},
        methods:{
            getAwardList(){
                api.newQuePrizeDrawResult(this, {pageNum:this.pageNum, pageSize:this.pageSize, usid: this.memberinfo.usid}, (back) => {
                    if(back.resCode == '0'){
                        this.awardList = back.repBody;
                        this.pageCount = Math.ceil(back.repBody[0].total/this.pageSize)
                        this.awardList = this.awardList.concat(this.awardList)
                    }else{
                        alert(back.resMsg);
                    }
                })
            },
            onInfinite() {
                api.newQuePrizeDrawResult(this, {pageNum: this.awardList.length/this.pageSize+1, pageSize:this.pageSize, aid: this.memberinfo.aid, usid: this.memberinfo.usid}, (back) => {
                    if(back.resCode == '0'){
                        if(back.repBody.length) {
                            this.awardList = this.awardList.concat(back.repBody)
                            this.$broadcast('$InfiniteLoading:loaded')
                            if(back.repBody.length < this.pageSize) {
                                this.$broadcast('$InfiniteLoading:complete')
                            }
                        }else{
                            this.$broadcast('$InfiniteLoading:complete')
                        }                        
                    }else{
                        this.$broadcast('$InfiniteLoading:complete')
                        // alert(back.resMsg);
                    }
                })
            }
        }
	}
</script>
<style lang="scss">
	@import "../css/px2rem.scss";
	@import "../css/style.scss";

    .live-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(../images/award-list-bg.jpg) repeat-y top left;
        background-size: 100% auto;
        overflow: hidden;
    }

    .award-list-container {
        width: px2rem(900px);
        height:  px2rem(1480px);
        position: relative;
        margin: px2rem(100px) auto;
        text-align: center;
        background: url(../images/award-list.png) no-repeat top center;
        background-size: 100% auto;
        overflow: hidden;

        img {
            margin: 0 auto;
            width: 80%;
        }
        .con{
            width: 100%; 
            height: 86%; 
            overflow-y:scroll;  
            position: relative; 
            top: 12%;
        }
        .awards {
            // position: absolute;
            // left: 5%;
            // top: px2rem(160px);
            width: 90%;
            margin: 0 auto;
            text-align: left;
            overflow: hidden;

            .award-item {
                padding: px2rem(20px);
                background: url(../images/line.jpg) repeat-x left bottom;
                @extend %clearfix;

                .tel,
                .prize {
                    font-size: px2rem(42px);
                    color: #732e20;
                }

                .date {
                    padding-left: 5px;
                    font-size: px2rem(36px);
                    color: #221815;
                }
            }
        }
    }

    .prize-icon {
        position: relative;
        display: block;
        width: px2rem(120px);
        height: px2rem(120px);
        border-radius: 50%;
        background: #fff4c3;
        .prize-t{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: inline-block;
            width: px2rem(60px);
            
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
           
        }
        > i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: inline-block;
            width: px2rem(80px);
            height: px2rem(80px);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;

            &.iphone {
                width: px2rem(100px);
                height: px2rem(100px);
                background-image: url(../images/iphone.png);
            }
            &.mate7 {
                background-image: url(../images/huawei.png);
            }
            &.rmb-1 {
                background-image: url(../images/1yuan.png);
            }
            &.rmb-5 {
                background-image: url(../images/5yuan.png);
            }
            &.rmb-10 {
                background-image: url(../images/10yuan.png);
            }
        }
    }
</style>