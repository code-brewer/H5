<template>
    <div class="view">
        <div id="focus" class="focus">
            <div class="hd">
                <ul>
                    <!-- <li class="on">&nbsp;</li>
                    <li>&nbsp;</li> -->
                </ul>
            </div>
            <div class="bd">
                <ul>
                    <!-- <li>
                    	<a href="http://crmweb.meadjohnson.com.cn/mjnwx/client_phone.action?openId=o7nWYjjbvQErs48q3xktGbxNG-so">
                    		<img :src="'images/banner1.jpg'">
                    	</a>
                    </li> -->
                    <!-- <li>
                    	<a v-link="{path: '/teamsMain/0'}">
                    		<img :src="'images/banner5.png'">
                    	</a>
                    </li> -->
                    <li>
                        <a href="http://url.cn/40V1nCb">
                            <img :src="'images/banner4.jpg'">
                        </a>
                    </li>
                    <!-- <li>
                        <a href="http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=100000500&idx=1&sn=a05fb2f7d95a41ade671ce7564a9f7a7&scene=0#wechat_redirect">
                            <img :src="'images/banner2.jpg'">
                        </a>
                    </li> -->
                    <!-- <li v-for="list in banners">
                    	<a :href="list.pageurl">
                    		<img :src="list.url">
                    	</a>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="homeBody">
            <div class="txtScroll-top">
                <i class="laba"></i>
                <a>
                    <!-- <span class="zuixin">最新</span> -->
                    <i class="toRg"></i>
                </a>
                <div class="txtli">
                    <ul class="infoList" :style="{top: slide.top + 'px'}">
                        <!-- <li v-for="list in rollinfoList">
                			<a :href="list.content">{{list.title}}</a>
                		</li> -->
                        <li>
                            <a href="http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=100001014&idx=1&sn=6d1899a68dfb39e6282bfccc7647494a&chksm=691add355e6d542380e2b48e1c87d747b566a4ff71e67c433171d94f6c91a28687669360eba4&scene=0#wechat_redirect">派奖快递单号，快看看你的奖品到哪啦？！</a>
                        </li>
                        <!-- <li>
                            <a href="http://mp.weixin.qq.com/s?__biz=MzI0MDM5MDMxNg==&mid=100000500&idx=1&sn=a05fb2f7d95a41ade671ce7564a9f7a7&scene=0#wechat_redirect">一言不合就发红包，我们讲真的！</a>
                        </li> -->
                    </ul>
                </div>
            </div>
            <div class="texBg clearfix">
                <div @click="link('/bbm/index1.jsp#!/newSignIn/plan')">
                    <span class="texTop">打卡</span>
                    <span class="texBtm">21天晨起打卡计划</span>
                </div>
                <div v-link="{path: '/recommend1'}">
                    <span class="texTop">推荐好友</span>
                    <span class="texBtm">推荐好友赚贝壳币</span>
                </div>
                <div v-link="{path:'/myConchCoin'}">
                    <span class="texTop">我的贝壳币</span>
                    <span class="texBtm">赚贝壳币兑换好礼</span>
                </div>
                <div v-link="{path:'/presentList'}">
                    <span class="texTop">贝壳币商城</span>
                    <span class="texBtm">兑换好礼</span>
                </div>
            </div>
            <div class="guize" style="padding: 23px 5% 102px;">
                <div><a v-link="{path: '/gardenRule'}">秘密花园规则></a></div>
                <div>如有疑问，请在公众号对话框以“客服+你的问题”的格式将你的问题告诉花妈，花妈会争取尽快回复哒！
                </div>
            </div>
        </div>
        <modal :show.sync="tipModal.show" :bg="false">
            <div class="out">
                <a href="javascript:;" @click="tipModal.show=false"></a>
            </div>
        </modal>
        <modal :show.sync="tipModal2.show" :bg="false">
            <div class="out-2">
                <a href="javascript:;" @click="tipModal2.show=false"></a>
            </div>
        </modal>
    </div>
</template>
<script>
import api from '../api'
import Modal from '../components/Modal.vue'
import score from '../components/score.vue'
import jQuery from 'jquery'
// import {
//     TouchSlide
// } from '../dist/TouchSlide.1.1.js'
//import '../dist/jquery.SuperSlide.2.1.1.js'

export default {
    components: {
        Modal,
        score
    },
    data() {
        return {
            tipModal: {
                show: false
            },
            tipModal2: {
                show: false
            },
            slide: {
                top: 0,
                time: '',
                len: 2
            },
            banners: '',
            rollinfoList: ''
        }
    },
    created() {
        var that = this;
        document.title = '秘密花园';

        this.$dispatch('loading');
        //this.getBannerList();
        //this.getRollInfoList();
    },
    ready() {
        //banner
        // TouchSlide({ 
        //           slideCell:"#focus",
        //           titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        //           mainCell:".bd ul", 
        //           effect:"leftLoop", 
        //           autoPlay:true,//自动播放
        //           autoPage:true //自动分页
        //       });
        // jQuery(".txtScroll-top").slide({
        // 	mainCell:".txtli ul",
        // 	autoPage:true,
        // 	effect:"top",
        // 	autoPlay:true,
        // 	vis:1
        // })
        // this.scroll();
        this.$dispatch('cancelLoading');
    },
    methods: {
        link(path) {
            window.location.href = path;
        },
        scroll() {
            var $slide = jQuery('.infoList');

            $slide.animate({
                'margin-top': '-65px'
            }, 'slow', () => {
                $slide.children('li:first').appendTo($slide);
                $slide.css('margin-top', '0');
                setTimeout(() => {
                    this.scroll();
                }, 2000);
            })

        }
        // getBannerList() {
        // 	api.getBannerList(this, {}, data => {
        // 		if (data.resCode == '0') {
        // 			this.banners = data.repBody.list;
        // 			this.$nextTick(function(){
        // 				TouchSlide({ 
        // 		            slideCell:"#focus",
        // 		            titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        // 		            mainCell:".bd ul", 
        // 		            effect:"leftLoop", 
        // 		            autoPlay:true,//自动播放
        // 		            autoPage:true //自动分页
        // 		        });
        // 			})

        // 		}
        // 	})
        // },
        // getRollInfoList() {
        // 	api.getRollInfoList(this, {}, data => {
        // 		if (data.resCode == '0') {
        // 			this.rollinfoList = data.repBody.list;
        // 			this.$nextTick(() => {
        // 				this.scroll();
        // 			});
        // 		}
        // 	})
        // }
    }
}
</script>
<style lang="scss" scoped>
.txtScroll-top {
    .txtli {
        position: relative;
        height: 65px;
        overflow: hidden;
        .infoList {
            position: absolute;
            top: 0;
            left: 0;
            transition: top .4s;
        }
    }
}

.bd {
    img {
        vertical-align: top;
    }
}
</style>
