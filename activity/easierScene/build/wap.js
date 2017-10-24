import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import APP from '../view/wap/App.vue'
import chat from '../view/wap/chat.vue'
import weChatRed from '../view/wap/weChatRed/index.vue'
import weChatList from '../view/wap/weChatRed/rankingList.vue'
import record from '../view/wap/myRecord.vue'
import money from '../view/wap/money/index.vue'
import moneyList from '../view/wap/money/rankingList.vue'

export var router = new VueRouter()

router.map({
	'/': {
		component: chat
	},
	'/weChatRed': {
		component: weChatRed
	},
	'/myRecord': {
		component: record
	},
	'/money': {
		component: money
	},
	'/weChatList/:aid': {
		component: weChatList
	},
	'/moneyList/:aid/:nonum': {
		component: moneyList
	}
})

router.redirect({
	'*': '/'
})

router.start(APP, 'app')