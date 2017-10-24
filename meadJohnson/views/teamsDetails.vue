<template>
	<div class="teamsDetails main">
		<h2>{{time}}</h2>
		<ul>
			<li v-for="list in lists">{{($index + 1) + '. ' + list.nick + '于' + list.ctime.split(' ')[1] + '开' + list.amid + '人团' + ['', '成功', '失败'][list.actstatus]}}<a @click="link({path: '/teamsMain/' + list.actid})">查看详情</a></li>
		</ul>
	</div>
</template>
<script>
	import api from '../api/index1.js'
	import utils from '../../src/utils'
	export default {
		data() {
			return {
				time: '',
				lists: ''
			}
		},
		created() {
			this.getGroupTodayRecordList();
		},
		methods: {
			getGroupTodayRecordList() {
				let date = window.sessionStorage.getItem('date');
				if (date) {
					let time = new Date(date);
					this.time = (time.getMonth() + 1) + '月' + time.getDate() + '日';
				} else {
					this.$router.go({path: '/teamsRecord'});
				}
				api.getGroupTodayRecordList(this, {beginDate: date}, back => {
					if (back.resCode == '0') {
						this.lists = back.repBody.list;
					}
				})
			},
			link(path) {
				window.localStorage.setItem('teamsError', '0');
				this.$router.go(path);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.teamsDetails {
		padding: 30px 5%;
		h2 {
			margin-bottom: 20px;
			padding: 10px 0;
			color: #3da5af;
			font-size: 34px;
			font-weight: 400;
			text-align: center;
			border-bottom: 1px dashed #3da5af;
		}
		li {
			padding: 10px 0;
			font-size: 24px;
			color: #666;
			a {
				float: right;
				font-size: 24px;
				color: blue;
			}
		}
	}
</style>