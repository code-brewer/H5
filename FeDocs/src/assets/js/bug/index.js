let path = require.context('./data', false, /\.js$/)
let data = path.keys().map(item => path(item).default)

data = [].concat.apply([], data)

/**
 * [筛选bug数据]
 * @param  {object} options [筛选条件]
 *
 * @return {array<object>}         [返回筛选后的数据]
 */
function getData (options) {
	options = options || {}
	let type = options.type || 'all',
		text = options.text || ''

	let arr = data.filter(item => {

		if ( type === 'all' ) {
			return text ? item.Q.indexOf(text) > -1 : item
		} else {
			return text ? item.Q.indexOf(text) > -1 && item.flag === type : item.flag === type
		}

	})

	return arr
}
export default getData