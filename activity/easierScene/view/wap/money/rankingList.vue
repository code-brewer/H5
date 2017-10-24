<template>
    <div class="ranking">
        <a href="javascript:;" class="back-chat" v-link="{path: '/'}">返回聊天</a>
        <a href="javascript:;" class="back-chat" style="left: inherit; right: 20px;" v-link="{path: '/money'}">下一轮</a>
        <div class="header">
            <img src="../../../image/wap/ranking-list-img2.png" alt="排行榜">
            <p>你数了<span>{{own.score}}分</span><br/>获得了<span>第{{own.rank}}名</span></p>
        </div>
            
        <div class="scroll">
            <scroll :bottom-height="btnHeight" :scroller.sync="scroller" :use-pullup="isPullUp" :pullup-config="pullupConfig">
                <ul class="own clearfix" v-show="own.rank">
                    <li>
                        <div class="rn">第{{own.rank}}名</div>
                        <div class="user">
                            <img :src="own.headimg">
                            <p>{{own.nick}}</p>
                            <p>{{own.score}}分</p>
                        </div>
                    </li>
                </ul>
                <ul class="clearfix">
                    <li v-for="item in list">
                        <div class="rn">第{{item.rank}}名</div>
                        <div class="user">
                            <p>{{item.nick}}</p>
                            <p>{{item.score}}分</p>
                        </div>
                        <img :src="item.headimg">
                    </li>
                </ul>
            </scroll>
        </div>
    </div>
</template>
<script>
    import scroll from '../../../src/scroll.vue'
    import api from '../../../api/wapIndex.js'
    export default {
        components: {
            scroll
        },
        data() {
            return {
                btnHeight: '0',
                scroller: {},
                pullupConfig: {
                    content: '上拉加载',
                    pullUpHeight: 100,
                    height: 80,
                    upContent: '释放加载',
                    downContent: '加载中...',
                    loadingContent: '上拉加载',
                    clsPrefix: 'vue-iscroll-pullup-'
                },
                isPullUp: false,
                _socket: null,
                own: {},
                list: []
            }
        },
        ready() {
            document.querySelector('.scroll').addEventListener('touchmove', e => { e.preventDefault(); }, false);
            setTimeout(() => {
                this.getRankList();
            },2000)
            
        },
        methods: {
            getRankList() {
                api.getRankList(this, {
                    aid: this.$route.params.aid,
                    lv: this.$route.params.nonum,
                    size: '1000',
                    types: '数钱'
                }, back => {
                    if (back.resCode === '000000') {
                        this.list = back.repBody;
                        this.own = this.list.filter(item => {
                            return item.usid === +uid;
                        })[0];
                        this.$nextTick(() => {
                            this.scroller.refresh();
                        })
                    } else {
                        this.$dispatch('showTip', back.resMsg, back.resCode);
                    }
                })
            }
        },
        events: {
            'pullup:loading'(uuid) {
                console.log(uuid)
                // this.$refs.scroll.pullup.complete();
            },
            /**
             * 数据加载完毕，清除下拉加载
             */
            'pullup:complete'(){
                console.log('com')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .ranking {
        height: 100%;
        padding-top: 350px;
        background: #12b9d2;
        overflow: hidden;
        box-sizing: border-box;
        .header  {
            height: 350px;
            margin-top: -350px;
            overflow: hidden;
            > img {
                display: block;
                margin: 70px auto 20px;
            }
            > p {
                font-size: 30px;
                color: white;
                text-align: center;
                letter-spacing: 5px;
                line-height: 1.5;
                font-weight: 700;
                span {
                    color: #fff100;
                }
            }
        }
            
        .scroll {
            position: relative;
            height: 100%;
            box-sizing: border-box;
            ul {
                width: 80%;
                margin: 0 auto;
            }
            li {
                position: relative;
                height: 90px;
                margin: 0 0 20px 90px;
                padding-right: 120px;
                border-bottom: 1px solid rgba(255, 255, 255, .5);
                img {
                    position: absolute;
                    top: 10px;
                    left: -90px;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                }
                .user {
                    p {
                        font-size: 30px;
                        line-height: 1.5;
                        color: #fff100;
                    }
                }
                .rn {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100px;
                    line-height: 90px;
                    text-align: center;
                    color: #fff100;
                    font-size: 30px;
                }
            }
        }
    }
</style>