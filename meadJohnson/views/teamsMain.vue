<template>
	<div></div>
</template>
<script>
	import api from '../api'
	import util from '../utils'
	export default {
		created() {
			// this.$router.replace({path: '/recommend1'});
			this.getActInfoById();
		},
		methods: {
			getActInfoById() {
				var id = this.$route.params.id,
					teamsError = window.localStorage.getItem('teamsError');
				api.getActInfoById(this, {actid: id}, (back) => {
					if (back.resCode == "0") {
						if (util.isEmptyObject(back.repBody.actinfo) || teamsError == '1') {//未组团
							this.getActModeList();
						} else { //已组团--根据组团详情走不同的流程
							var list = back.repBody.actinfo.list[0];

							window.localStorage.setItem('actid', list.actid);
							window.localStorage.setItem('oneOpen', '1');
							window.localStorage.setItem('actMes', window.JSON.stringify(back.repBody));

							switch(list.amid) {
								case '10':
								case '20':
									this.$router.replace({path: '/teamsPerson'});
									// if (list.status == '1' && !!list.mobile) {
									// 	this.$router.replace({path: '/teamsEnd'});
									// } else {
									// 	this.$router.replace({path: '/teamsPerson'});
									// }
									break;
								case '30':
									this.$router.replace({path: '/teamsOther'});
									break;
							}
						}
					}
				})
			},
			getActModeList() {//获取组团模版
				api.getActModeList(this, {}, (back) => {
					if (back.resCode == '0') {
						var list = back.repBody.list.sort((a, b) => {
							return a.amid - b.amid;
						}).map(value => {
							return value.status;
						});
						if (list[0] == '0' || list[1] == '0') {
							this.$router.replace({path: '/teamsIndex/' + list[0] + '/' + list[1]});
						} else if (list[2] == '0') {
				            api.addActInfo(this, {amid: '30'}, (back) => {
				            	window.localStorage.setItem('teamsError', '0');
				            	window.localStorage.setItem('oneOpen', '1');
				            	if (back.resCode == '0') {
				            		window.localStorage.setItem('actid', back.resMsg);
				            		window.localStorage.setItem('actMes', '');
				                    this.$router.replace({path: '/teamsOther'});
				            	}
				            })
						}
					}
				})
			}
		}
	}
</script>