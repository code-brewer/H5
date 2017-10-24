<template>
	<div class="paging">共 {{config.total}} 条，共 {{config.pageNum}}/{{config.pageTotal}} 页 &nbsp;
        <button type="button" @click="gotoPage('pre')">上一页</button>&nbsp;
        <button type="button" @click="gotoPage('next')">下一页</button>&nbsp;跳转 &nbsp;
        <input v-model="goPage" type="text" class="ng-pristine ng-untouched ng-valid">
        <a @click="gotoPage(goPage)">GO</a>
    </div>
</template>
<script>
	export default {
		props: {
			config: {
				default() {
					return {
						total: 0,
						pageTotal: 1,
						pageNum: 1,
						pageSize: 10
					}
				}
			}
		},
		data() {
			return {
				goPage: ''
			}
		},
		watch: {
			'config.total'(val) {
				this.$set('config.pageTotal', Math.ceil(this.config.total / this.config.pageSize) == 0 ? 1 : Math.ceil(this.config.total / this.config.pageSize))
			}
		},
		methods: {
			gotoPage(type) {
				if ('pre' == type) {
					this.config.pageNum = this.config.pageNum <= 1 ? 1 : --this.config.pageNum;
				} else if ('next' == type) {
					this.config.pageNum = this.config.pageNum < this.config.pageTotal ? ++this.config.pageNum : this.config.pageTotal;
				} else {
					if (!isNaN(+type) && type <= this.config.pageTotal) {
						this.config.pageNum = type;
					}
				}
			}
		}
	}
</script>
<style scoped>
	button {
		cursor: pointer;
	}
</style>