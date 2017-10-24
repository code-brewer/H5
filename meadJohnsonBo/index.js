import Vue from 'vue'


import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

// Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
	
	'/': {
		component: require('./views/userList.vue')
	
	},
	'/dakaDetail/:openid': {
		component: require('./views/dakaDetail.vue'),
		name: 'dakaDetail'
	},
	// '/auditList/:openid': {
	// 	component: require('./views/auditList.vue'),
	// 	name:'fanxianDetail'
	// },
	'/AccountingOrderSearch': {
		component: require('./views/AccountingOrderSearch.vue'),
		name:'order'
	},
	'/OrderContentPass': {
		component: require('./views/OrderContentPass.vue')
	},
	'/OrderPass': {
		component: require('./views/OrderPass.vue')
	},
	'/OrderStatus/:order_num': {
		component: require('./views/OrderStatus.vue'),
		name:'orstatus'
	},
	'/auditList': {
		component: require('./views/auditList.vue'),
		name:'hexiaoDetail'
	},
	'/userTex/:openid': {
		component: require('./views/userTex.vue'),
		// name:'hexiaoDetail'
	},
	'/chengzhang/:openid': {
		component: require('./views/chengzhang.vue'),
		// name:'hexiaoDetail'
	},
	'/persontex/:openid': {
		component: require('./views/persontex.vue'),
		// name:'hexiaoDetail'
	},
	'/coin/:openid': {
		component: require('./views/coin.vue'),
		// name:'hexiaoDetail'
	},
	'/contentManage': {
		component: require('./views/contentManage.vue'),
		// name:'hexiaoDetail'
	},
	'/bannerMag': {
		component: require('./views/bannerMag.vue'),
		name:'conMag'
	},
	'/gundong': {
		component: require('./views/gundong.vue'),
		name:'conMag'
	},
	'/titletex/:id': {
		component: require('./views/titletex.vue'),
		name:'conMag'
	},
	// 礼品管理
	'/presentManage': {
		component: require('./views/present/main.vue')
	},
	'/presentMes': {
		component: require('./views/present/mesManage.vue')
	},
	'/presentMesUpdate/:id': {
		component: require('./views/present/mesUpdate.vue')
	},
	'/rosterManage': {
		component: require('./views/present/rosterManage.vue')
	},
	// 礼品管理-----end
	//数据分析
	'/dataManage': {
		component: require('./views/data/data.vue')
	},
	'/dataDetails': {
		component: require('./views/data/dataDetails.vue')
	},
	//数据分析-----end
	'/lottery/:openid': {
		component: require('./views/lottery.vue'),
		// name:'hexiaoDetail'
	},
	'/invite/:openid': {
		component: require('./views/invite.vue'),
		// name:'hexiaoDetail'
	},
	'/invitefriend/:openid': {
		component: require('./views/invitefriend.vue'),
		// name:'hexiaoDetail'
	},
	//类容推送
	'/datapush': {
		component: require('./views/push/datapush.vue'),
		// name:'hexiaoDetail'
	},
	'/pushDetails/:time': {
		component: require('./views/push/pushDetails.vue'),
		// name:'hexiaoDetail'
	},
	'/pushlist': {
		component: require('./views/push/pushlist.vue'),
		// name:'hexiaoDetail'
	},
	//banner
	'/bannerMag2': {
		component: require('./views/banner/bannerMag.vue'),
		// name:'hexiaoDetail'
	},
	'/bannerManage': {
		component: require('./views/banner/bannerManage.vue'),
		// name:'hexiaoDetail'
	},
	'/bannerDetails/:time': {
		component: require('./views/banner/bannerDetails.vue'),
		// name:'hexiaoDetail'
	},
	'/bannerWarehouse/:time': {
		component: require('./views/banner/bannerWarehouse.vue'),
		// name:'hexiaoDetail'
	},
	'/bannerWarehouse': {
		component: require('./views/banner/bannerWarehouse.vue'),
		// name:'hexiaoDetail'
	},
	//团购管理
	
	'/groupMag': {
		component: require('./views/groupShop/groupMag.vue'),
		// name:'hexiaoDetail'
	},
	'/activityManage': {
		component: require('./views/groupShop/activityManage.vue'),
		// name:'hexiaoDetail'
	},'/orderManage': {
		component: require('./views/groupShop/orderManage.vue'),
		// name:'hexiaoDetail'
	},'/userManage': {
		component: require('./views/groupShop/userManage.vue'),
		// name:'hexiaoDetail'
	},'/logisticsManage': {
		component: require('./views/groupShop/logisticsManage.vue'),
		// name:'hexiaoDetail'
	},
	'/actUpdate': {
		component: require('./views/groupShop/actUpdate.vue'),
		// name:'hexiaoDetail'
	},
	'/actUpdate/:id': {
		component: require('./views/groupShop/actUpdate.vue'),
		// name:'hexiaoDetail'
	},
})

router.redirect({
	
	'*': '/'
})

init = function() {
	router.start(require('./views/App.vue'), 'app')
}