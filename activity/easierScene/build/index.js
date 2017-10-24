import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import AwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(AwesomeSwiper)

import APP from '../view/app.vue'
import msg from '../component/msg.vue'
import sign from '../component/sign.vue'
import img from '../component/image.vue'
import moneyLine from '../component/money-line.vue'
import moneyRank from '../component/money-rank.vue'
import moneyStart from '../component/money-start.vue'
import wechatredStart from '../component/wechatred-start.vue'
import wechatredRank from '../component/wechatred-rank.vue'
import luckStart from '../component/luck-start.vue'
import luckRank from '../component/luck-rank.vue'
import main from '../component/main.vue'

export var router = new VueRouter()

router.map({
	'/msg': {
		component: msg
	},
	'/sign': {
		component: sign
	},
	'/img': {
		component: img
	},
	'/img': {
		component: img
	},
	'/money-line': {
		component: moneyLine
	},
	'/money-rank': {
		component: moneyRank
	},
	'/money-start/:id': {
		name: 'money',
		component: moneyStart
	},
	'/wechatred-start/:id': {
		name: 'wechatred',
		component: wechatredStart
	},
	'/wechatred-rank/:id': {
		name: 'wechatredRank',
		component: wechatredRank
	},
	'/luck-start/:id': {
		name: 'luck',
		component: luckStart
	},
	'/luck-rank': {
		component: luckRank
	},
	'/main': {
		component: main
	},
})

router.redirect({
	'*': '/msg'
})

router.start(APP, 'app')