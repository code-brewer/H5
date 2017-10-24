<template>
	<div class="tabs-view">
		<ul class="tabs-header" v-el:header>
			<li v-for="i in header" :style="{'width':width+'px'}" @click="setSelect(i,$index)">{{i}}</li>
			<span :style="{'width':width+'px','transform': 'translate('+x+'px, 1px)'}"></span>
		</ul>
		<div class="tabs-content" v-el:content>
			<slot v-for="i in content" :name="i" v-show="false">
			</slot>
		</div>
	</div>
</template>
<style lang="scss">
	.tabs-view {
		width: 100%;
		.tabs-header {
			padding: 0;
			width: 100%;
			list-style: none;
			border-bottom: 1px solid #ccc;
			li {
				display: inline-block;
				text-align: center;
				padding: 10px 0px;
				cursor: pointer;
			}
			span {
				height: 1px;
				border-bottom: 2px #007AFF solid;
				display: block;
				transition: transform .6s ease;
			}
		}
		.tabs-content {
			margin-top: 25px;
			.item {
				width: 100%;
			}
		}
	}
</style>
<script>
	export default {
		props: {
			header: {
				type: Array,
				default: function() {
					return ["aaaa", "bbbb", "cccc"]
				}
			},
			content: {
				type: Array,
				default: function() {
					return ["aaaa", "bbbb", "cccc"]
				}
			},
			show: {
				type: Number,
				default: 0
			},
			width:{
			    type: Number,
				default: 0
			}
		},
		data() {
			return {
				x: 0
			}
		},
		methods: {
			setSelect(item, index) {
				this.x = index * this.width;
				this.setContentHide(index);
			},
			setContentHide(index){
				Array.prototype.forEach.call(this.$els.content.children,(e)=>{
					e.style.display="none";
				});
				this.$els.content.children[index].style.display="block";
			}
		},
		ready() {
			if(this.width==0)this.width = (this.$els.header.offsetWidth / (this.$els.header.children.length - 1));
			
			this.setContentHide(0);
		}
	}
</script>