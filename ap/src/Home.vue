<template>
    <!-- <router-view></router-view> -->
    <div class="header-div">
        <header-bar :is-home="true"></header-bar>
    </div>
    <div id="home-container" class="center-warp">
        <div id="box" class="box">
            <section id="part-1" class="section active part-1">
                <div class="float-img frontCloud"></div>
                <div class="float-img backCloud"></div>
                <div class="float-img backCloud2"></div>
                <div class="float-img tree"></div>
                <div class="float-img mountain"></div>
                <div class="float-img rainbow"></div>
                <div class="float-img floatCloud"></div>
                <div class="float-img floatCloud2"></div>
                <div class="float-img balloon"></div>
                <div class="float-img plan1"></div>
                <div class="float-img plan2"></div>
                <div class="float-img dia">
                    <dl class="dia-list">
                        <dt class="dia-title">如何装逼取决于你</dt>
                        <dd class="dia-text">H5微活动快速定制化，活动形式效果实时监控，企业线上营销必备神器。</dd>
                    </dl>
                </div>
                <a class="triangle triangle-down blue"></a>
            </section>
            <section class="section part-2">
                <div class="top">
                </div>
                <div class="bottom">
                    <div class="bottom-title">
                        <p class="title">海量模板</p>
                        <span class="text">专业精心设计的模板，多形式、多主体，不断推陈出新，紧跟潮流热点</span>
                    </div>
                    <img class="module-img" src="assets/module.png" />
                </div>
                <a class="triangle triangle-down orange"></a>
            </section>
            <section class="section part-3">
                <div class="box" style="width:100%;height:auto;">
                    <div class="top">
                        <p class="title"><em>10</em>分钟创建</p>
                        <ul class="module-list">
                            <li class="module-item"></li>
                            <li class="module-item"></li>
                            <li class="module-item"></li>
                            <li class="module-item"></li>
                            <li class="module-item"></li>
                        </ul>
                    </div>
                    <div class="bottom">
                        <div class="bottom-left">
                            <ul class="intro-list">
                                <li class="intro-item">
                                    <p class="title">选择活动形式和模板</p>
                                    <span class="text">提供H5游戏、抽奖、集赞、投票、问卷等丰富模板。</span>
                                </li>
                                <li class="intro-item">
                                    <p class="title">编辑活动信息</p>
                                    <span class="text">可视化界面信息	编辑，所见即所得，让编辑成果看得见。</span>
                                </li>
                                <li class="intro-item">
                                    <p class="title">活动生产发布</p>
                                    <span class="text">活动二维码、链接、推广物料一键生成，</span>
                                    <br/>
                                    <span class="text">大大降低企业营销成本。</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bottom-right">
                            <img src="assets/computer.png">
                        </div>
                    </div>
                </div>
                <a class="triangle triangle-down"></a>
            </section>
            <section id="part-4" class="section part-4">
                <img class="bg-circle" src="assets/bg4.png">
                <!-- <ul>
					<li>
						<img src="assets/part4-1.png" height="509" width="694">
					</li>
					<li></li>
					<li>
						<img src="assets/part4-1.png" height="509" width="694">
					</li>
				</ul> -->
                <div class="sale-effect">
                    <img class="show-img" src="assets/part4-1.png">
                    <ul class="effect-list">
                        <li class="effect-item">
                            <dl>
                                <dt class="effect-item-title">营销效果提升</dt>
                                <dd class="effect-item-text">用最低成本做最好营销活动，利用精准详细的数据分析报告，帮助企业开拓市场，寻找目标用户。</dd>
                            </dl>
                        </li>
                        <li class="effect-item">企业平台粉丝增长</li>
                        <li class="effect-item">企业营销额显著提升</li>
                        <li class="effect-item">企业品牌广泛传播</li>
                        <img class="money" src="assets/part4-2.png">
                    </ul>
                </div>
                <a href="#page1" class="triangle triangle-up"></a>
            </section>
        </div>
    </div>
    <footer-bar></footer-bar>
</template>
<script>
	import footerBar from './components/web/footer-bar.vue'

	export default {
	    components: {
	        headerBar: require('./components/web/header-bar.vue'),
	        footerBar: footerBar
	    },

	    data() {
	        return {
	            // 是否登录
	            isLogin: false,

	            // 用户信息
	            userinfo: {}
	        }
	    },

	    created() {
	        this.getUserinfo();

	    },

	    methods: {
	        getUserinfo() {
	            // 格式化localStorage的用户信息
	            if (sessionStorage.getItem('ams_v2_userinfo')) {
                   var obj = JSON.parse(sessionStorage.getItem('ams_v2_userinfo'));

	                if (typeof obj == "object") {
	                    if (obj.authorization) {
	                        // 判断是否登录过
	                        this.isLogin = true;

	                        this.userinfo = obj;

	                        return obj;
	                    }
	                }
	            }

	            return false;
	        }
	    }
	}
</script>
