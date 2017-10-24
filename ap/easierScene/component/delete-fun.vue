<template>
	<div class="delte-fun-view" :class="{'bottom':count>5}" v-show="show" :style="{'left':left+'px'}">
		<div class="item" v-for="l in list | filterBy type in 'mid'">
			<p>{{(count=($index+1))+'.'+l.title}}</p>
			<span @click="del(l.aid)">删除</span>
		</div>
	</div>
</template>
<script>
	import api from '../api'
	export default {
		props: {
			show: {
				Boolean,
				default: true
			},
			left: {
				Number,
				default: 0
			},
			item: {
				Object,
				function() {
					return {}
				}
			},
			type: {
				Number,
				default: 1 //1:数钱 2红包 3抽奖
			}
		},
		data() {
			return {
				count: 0,
				list: [],
			}
		},
		watch: {
			moid(v) {
				this.pluginsByMoid();
			}
		},
		ready() {
			this.pluginsByMoid();
		},
		events: {
			newPluginsByMoid() {
				this.pluginsByMoid();
			}
		},
		methods: {
			del(v) {
				api.editActivityStauts(this, {
					'aid': v,
					"stauts": "4"
				}, (back) => {
					if(back.resCode = "000000") {
						this.pluginsByMoid();
						this.remove();
					}
				})
			},
			remove() {
				if(this.item.plugins.indexOf(";") != -1) {
					var js = this.item.plugins.substring(0, this.item.plugins.length - 1);
					var item = js.split(";");
					var removei = -1;
					for(var i = 0; i < item.length; i++) {
						var id = item[i].split("_")[1] == "红包" ? "2" : item[i].split("_")[1] == "数钱" ? "1" : "3";
						if(this.type == id) {
							var num = item[i].split("_")[0] -= 1;
							if(num == 0) removei = i;
							item[i] = num + "_" + item[i].split("_")[1];
						}
					}
					if(removei != -1) item.splice(removei, 1);
					if(item.length > 0)
						this.item.plugins = item.join(";") + ";";
					else {
						this.item.plugins = "";
						this.show = false;
					}
					var name = this.type == 1 ? "数钱" : this.type == 2 ? "红包" : "抽奖";
					if(this.item.plugins.indexOf(name) == -1)
						this.show = false;
					this.$dispatch("changePlugins");
				}
			},
			pluginsByMoid() {
				api.pluginsByMoid(this, {
					'moid': this.item.moid
				}, (back) => {
					this.list = back.repBody;
				})
			}
		}
	}
</script>
<style lang="scss">
	.delte-fun-view.bottom {
		top: 100%;
		bottom: inherit;
		z-index: 9;
		&:after {
			bottom: 100%;
			transform: rotate(225deg);
			top: initial;
			margin-bottom: -6px;
		}
	}
	
	.delte-fun-view {
		width: 226px;
		padding: 20px;
		background-color: white;
		position: absolute;
		border: 1px solid #b7b7b7;
		border-radius: 8px;
		bottom: 100%;
		margin-bottom: 5px;
		&:after {
			display: block;
			content: '';
			position: absolute;
			top: 100%;
			left: 50%;
			margin-top: -7px;
			margin-left: -7px;
			height: 14px;
			width: 14px;
			background-color: white;
			border-bottom: 1px solid #b7b7b7;
			border-right: 1px solid #b7b7b7;
			transform: rotate(45deg);
		}
		.item {
			font-size: 12px;
			p {
				width: 124px;
				display: inline-block;
				margin: 5px 0px;
				vertical-align: middle;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			span {
				display: inline-block;
				width: 52px;
				height: 20px;
				background-color: #ff3d3d;
				color: white;
				line-height: 20px;
				text-align: center;
				border-radius: 2px;
				vertical-align: middle;
				cursor: pointer;
			}
		}
	}
</style>