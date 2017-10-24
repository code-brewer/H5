<template>
	<div class="component-share-btn" :class="class" @click="share">
		<slot></slot>
	</div>
	<modal :show.sync="shareModal" modal-color="transparent">
		<img :src="$root.basePath+'h/images/wx-share-tip.png'" alt="分享" style="display: block;width: 100%;" @click="shareModal=false">
	</modal>
</template>
<style>
	 .modal-content {
		background-color: rgba(0, 0, 0, 0)!important;
	}
</style>
<script>
	import wx from './wx.js'
	import modal from './../../../../src/components/Modal.vue'
	export default {

		data() {
				return {
					shareModal: false
				}
			},
			props: {
				// 分享标题
				title: {
					type: String
				},
				// 分享描述
				desc: {
					type: String
				},
				// 分享链接
				link: {
					type: String
				},
				// 分享缩略图
				imgUrl: {
					type: String
				},

				func: {
					type: Function,
					default: function() {}
				},

				class: {
					type: String
				}
			},
			components: {
				modal
			},
			methods: {
				share() {
					var that = this;

					that.shareModal = true;

					wx.share(this.title, this.desc, this.link, this.imgUrl, (type, status) => {
						that.shareModal = false;
						that.func(type, status)
					});
				}
			}
	}
</script>