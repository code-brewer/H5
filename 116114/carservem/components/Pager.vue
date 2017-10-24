<template>
	<div class="paging" style="margin:10px;text-align:center;">
	<div >
	共 {{config.total}} 条记录，第 {{config.curpage}}/{{config.totalpage}} 页 
        <span >跳到</span> 
        <input v-model="goPage" type="text"  style="width:30px;height: 20px;
    margin: 0 5px;text-align:center;">页
        <a @click="gotoPage(goPage)" class="sub">跳转</a>
        <button type="button" @click="gotoPage('pre')">上一页</button>&nbsp;
        <button type="button" @click="gotoPage('next')">下一页</button>&nbsp;
        </div>
    </div>
</template>
<script>
	export default {
		props: {
			config: {
				default() {
					return {
						total: 0,
						totalpage: 0,
						curpage:1
					}
				}
			}
		},
		data() {
			return {
				goPage: ''
			}
		},
		methods: {
			gotoPage(type) {
				if ('pre' == type) {
					this.config.curpage = this.config.curpage <= 1 ? 1 : --this.config.curpage;
				} else if ('next' == type) {
					this.config.curpage = this.config.curpage < this.config.totalpage ? ++this.config.curpage : this.config.totalpage;
				} else {
					if (!isNaN(+type) && type <= this.config.totalpage) {
						this.config.curpage = type;
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
	.sub{
		width: 50px;
		height: 26px;
		background-color: #f57303;
		border:1px solid #e55c00;
		color: #fff;
		line-height: 26px;
		text-align: center;
		display: inline-block;
		margin:0 auto;
		border-radius: 3px;
		text-decoration: none;
		margin-left: 10px;
		margin-right: 10px;
		cursor: pointer;
	}
	button{
		height: 24px;
		line-height: 24px;
		padding:0 10px;
	}
</style>