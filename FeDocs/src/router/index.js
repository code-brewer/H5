import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const vue = new Vue()

let path = require.context('@/view', false, /\.vue$/)

let routes = path.keys().map(key => {
	let obj = path(key)
	obj.name = obj.name || ''
	return {
	    path: '/' + obj.name,
	    name: obj.name,
	    component: obj
	}
})

if ( routes.indexOf('/') === -1 ) {
	routes.push({
		path: '*',
		component: require('@/view/Demo')
	})
}

const router = new Router({ routes: routes })


let nav = null, section = null, isListenScroll = false, scrollDisabled = false

/** 获取该元素距离页面的高度
 *  @param element e dom元素
 *
 *  return number 返回元素距离页面的高度
 */
function getOffsetTop(e) {
	if ( e && e.nodeType !== 1) return
	let parent = e.offsetParent
	let top = e.offsetTop
	while ( parent.offsetParent ) {
		top += parent.offsetTop
		parent = parent.offsetParent
	}
	return top
}

/** 点击锚点页面滚动动画
 *  @param {ele} [body] [body元素]
 *  @param {number} [top] [锚点对应的内容块距离页面顶部的高度]
 */
function scrollTop(body, top) {
	let bodyTop = body.scrollTop,
		offset = (top - bodyTop) > 0 ? 30 : -30
	function _scrollTop() {
		let bodyTop = body.scrollTop
		if ( ( offset > 0 && bodyTop >= (top-10) ) || ( offset < 0 && bodyTop <= (top-30) ) ) {
			return
		}
		body.scrollTop += offset
		window.requestAnimationFrame(_scrollTop)
	}
	_scrollTop()
}
/** 锚点点击
 *  @param {ele} [e] [锚点的dom元素] 
 */
function handleClick(e) {
	e = e.target || e.srcElement

	let id = e.getAttribute('data-id'),
		a = null

	if ( id && (a = document.getElementById(id)) ) {
		let top = getOffsetTop(a)
		scrollTop(document.body, top);
	}
}

router.beforeEach((to, from, next) => {
	if ( nav ) {
		// nav.removeEventListener('click', handleClick, false)
	}
	next()
})

router.afterEach(function (transition) {

	vue.$nextTick(function() {
		nav = document.querySelector('.docs-sidebar')

		scrollDisabled = !nav
		if ( scrollDisabled ) return

		let dc = document,
			a = nav.querySelectorAll('a'),
			arr = []

		a.forEach(item => {
			let id = item.getAttribute('data-id')
			if ( id ) {
				let ele = id ? dc.getElementById(id) : ''
				arr.push({
					ele: item.parentNode,
					top: ele ? getOffsetTop(ele) : 0
				})
			}
		})

		if ( !nav )  return

		let navTop = getOffsetTop(nav)

		// nav.addEventListener('click', handleClick, false)
		/** 注册页面滚动事件，处理导航智能定位和滚动到相应模块锚点高亮，事件只注册一次 */
		let timer = null
		if ( !isListenScroll ) {
			let d = dc.body
			d.onscroll = function () {
				if ( scrollDisabled ) return
				/** 导航智能定位 */
				let top = d.scrollTop
				if ( top > navTop ) {
					nav.style.cssText = 'position: fixed; top: 0'
				} else {
					nav.style.cssText = ''
				}

				clearTimeout( timer )
				timer = setTimeout(function() {
					/** 滚动时相应锚点高亮 */
					let len = arr.length - 1
					while ( len !== -1 ) {
						if ( (arr[len].top - 20 < top) || (len === 0 && top < arr[len].top) ) {
							arr.forEach( item => {
								item.ele.className = item.ele.className.replace(/\s*active/, '')
							})
							arr[len].ele.className += ' active'
							return false
						}
						len--
					}
				}, 100)
			}

			isListenScroll = true
		}

	})
	
})

export default router
