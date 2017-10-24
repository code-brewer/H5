<template>
	<div>
		<div class="docs-header">
	        <div class="container">
	            <h1>Bug问答区</h1>
	            <p>集合各种类型的Bug的解决方案</p>
	        </div>
	    </div>
	    <div class="container">
	    	<div class="row">
	    		<div class="col-md-6">
				    <button type="button" class="btn btn-default" @click="select()">全部</button>
				    <button type="button" class="btn btn-primary" @click="select({type:'primary'})">精华</button>
				    <button type="button" class="btn btn-success" @click="select({type:'success'})">已解决</button>
				    <button type="button" class="btn btn-danger" @click="select({type:'danger'})">未解决</button>
	    		</div>
	    		<div class="col-md-6">
	    			<form class="form-inline" style="float: right">
						<div class="form-group">
							<div class="input-group">
								<input type="text" class="form-control" id="searchInput" placeholder="搜索问题" v-model="searchText">
								<div class="input-group-addon" style="cursor: pointer;" @click="select()">搜索</div>
							</div>
						</div>
					</form>
	    		</div>
	    	</div>
	    	<div class="row">
	    		<div class="col-md-12">
	    			<div v-for="item in list" class="panel" :class="['panel-'+item.flag]">
	    				<div class="panel-heading">{{item.Q}}</div>
	    				<div class="panel-body" v-html="item.A"></div>
	    				<div class="panel-footer"><span>解决者: {{item.author}}</span><span>时间: {{item.time}}</span></div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="row">
	    		<div class="col-md-12">
	    			<nav class="page" aria-label="Page navigation">
						<ul class="pagination">
							<li :class="{disabled: page.current === 1}">
								<a href="javascript:;" aria-label="Previous" @click="prev($event)">
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							<li :class="{active: page.current === item}" v-for="item in page.pageCount"><a href="javascript:;" @click="updatePage(item)">{{item}}</a></li>
							<li :class="{disabled: page.current === page.pageCount}">
								<a href="javascript:;" aria-label="Next" @click="next($event)">
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>
<script>
	import getData from '../assets/js/bug'
	export default {
		name: 'Bug',
		data() {
			return {
				totalData: null,
				list: null,
				searchText: '',
				page: {
					current: 1,
					pageSize: 2,
					pageCount: 1
				}
			}
		},
		mounted() {
			this.select()
		},
		methods: {
			/**
			 * [筛选函数]
			 * @param  {object} options [筛选条件]
			 *
			 */
			select(options) {
				options = options || {}
				options.text = this.searchText
				this.totalData = getData(options)

				this.resetPage()
			},
			/**
			 * [获取要显示的数据]
			 */
			getData() {
				let start = (this.page.current - 1) * this.page.pageSize,
					end = this.page.current * this.page.pageSize
				this.list = this.totalData.slice(start, end)
			},
			/**
			 * [重置分页]
			 */
			resetPage() {
				this.page.pageCount = Math.ceil( this.totalData.length / this.page.pageSize )
				this.getData()
			},
			/**
			 * [更新页数]
			 * @param  {number} page [第几页]
			 */
			updatePage(page) {
				this.page.current = page
				this.getData()
			},
			/**
			 * [检测该元素的类名是否包含disabled]
			 * @param  {element} e [dom元素]
			 *
			 * @return {boolean}   [true: 包含 false: 不包含]
			 */
			checkDisabled(e) {
				e = e.target || e.srcElement
				while ( e.nodeName !== 'LI' ) {
					e = e.parentNode
				}
				return e.className.indexOf('disabled') > - 1
			},
			/**
			 * [上一页]
			 * @param  {element} e [dom元素]
			 *
			 */
			prev(e) {
				if ( this.checkDisabled(e) ) return
				this.updatePage( this.page.current-1 )
			},
			/**
			 * [下一页]
			 * @param  {element} e [dom元素]
			 *
			 */
			next(e) {
				if ( this.checkDisabled(e) ) return
				this.updatePage( this.page.current+1 )
			}
		}
	}
</script>
<style lang="scss" scoped>
	#searchInput {
		width: 300px;
	}
	.container {
		.row {
			margin-bottom: 15px;
		}
	}
	.panel-footer {
		text-align: right;
		span {
			padding-left: 20px;
		}
	}
	.page {
		text-align: right;
	}
</style>