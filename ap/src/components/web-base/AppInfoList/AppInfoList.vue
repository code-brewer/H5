<template>
	<div class="app-infolist__container">
		<div class="app-infolist__input">
			<!--<span class="app-infolist__title">渠道号:</span>
																	<input type="text"
																	       v-model="channle"
																	       class="form-control">-->
			<span class="app-infolist__title">appKey:</span>
			<input type="text"
			       v-model="appkey"
			       class="form-control">
			<span class="app-infolist__title"
			      v-show="false">appSecret:</span>
			<input type="text"
			       v-show="false"
			       v-model="appsecret"
			       class="form-control">
			<a href="javascript:;"
			   class="app-infolist__btn"
			   @click="addAppinfo">添加</a>
		</div>
		<ol>
			<li class="app-infolist__item"
			    v-for="appinfo in arr">
				<span class="app-infolist__title">appKey:</span>
				<span class="app-infolist__value">{{appinfo.appkey}}</span>
				<span class="app-infolist__title"
				      v-show="false">appSecret:</span>
				<span class="app-infolist__value"
				      v-show="false">{{appinfo.appsecret}}</span>
				<span class="app-infolist__delete"
				      @click="delItem($index)">删除</span>
			</li>
		</ol>
		<confirm :show.sync="confirmConfig.show"
		         :fun-name="confirmConfig.funName">
			<div slot="content">
				{{confirmConfig.msg}}
			</div>
		</confirm>
	</div>
</template>
<script>
import confirm from '../../web/confirm'
export default {
	components: {
		confirm
	},
	props: {
		appinfos: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		let configData = window.store.configData
		return {
			configData,
			appsecret: 'FA30F6DB6875A083',
			appkey: '',
			arr: [],
			confirmConfig: {
				show: false,
				msg: '确定要删除吗?',
				funName: ''
			}
		}
	},
	methods: {
		addAppinfo() {
			if (this.appkey.trim() == '') {
				this.$dispatch('showSnacker', 'appkey不能为空')
				return
			}

			if (!this.appkey.match(/^\d{10}$/)) {
				this.$dispatch('showSnacker', 'appkey格式必须为10位数字')
				return
			}

			if (this.appsecret.trim() == '') {
				this.$dispatch('showSnacker', 'appsecret不能为空')
				return
			}

			this.appinfos.push({
				appkey: this.appkey,
				appsecret: this.appsecret
			})

			this.arr = this.appinfos.concat();  // 切断引用，触发视图更新

			// 清空
			// this.appsecret = ''
			this.appkey = ''
		},
		delAppinfo() {
			this.appinfos.$remove(this.appinfos[this.confirmConfig.delId])
			this.arr = this.appinfos.concat();
		},
		delItem(index) {
			this.confirmConfig.delId = index;
			this.confirmConfig.msg = "您确定要删除吗?";
			this.confirmConfig.funName = "del";
			this.confirmConfig.show = true;
		}
	},
	events: {
		sure(funName) {
			if (funName == "del") {
				this.delAppinfo();
			}
		}
	},
	watch: {
		'appinfos'(v, o) {
			this.arr = v.concat();
		}
	}
}
</script>
<style lang="scss" src="./AppInfoList.scss"></style>