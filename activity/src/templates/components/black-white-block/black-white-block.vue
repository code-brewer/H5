<template>
	<div class="wap-black-white-block">
		<div class="trs">
			<div class="tr" v-for="tr in trs" transition="block-down">
				<div class="td" v-for="td in tr.tds" track-by="$index" :class="{active: td.active}" v-gesture:tap="tap(tr, td)">
					<span v-if="td.text">{{td.text}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueGesture from 'vue-gesture'
	Vue.use(VueGesture)

	export default {
		props: {
			currTdNum: {
				type: Number,
				require: true,
				default: 0
			},
			state: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				trs: []
			}
		},
		created() {
			this.initGame()
		},
		methods: {
			// 初始化游戏
			initGame() {
				this.createBlocks()
			},
			// 生成块
			createBlocks() {
				for (var i = 0; i < 5; i++) {
					this.addBlock(i)
				};
			},

			addBlock(i) {
				var tds = []

				for (var j = 0; j < 4; j++) {
					tds.push({active: 0, row: i});
				};
				var diff = tds[Math.floor(Math.random()*4)]
				diff.active = 1;
				if(i==0) {
					diff.text = 'Go'
				}
				this.trs.push({tds: tds})
			},

			tap(tr, td) {
				if(this.state=='end') return;

				// 如果按错
				if(!td.active) {
					if(this.currTdNum==0) {
						return;
					}
					this.state = 'end'
				}
				else if(this.currTdNum==td.row) {
					if(this.currTdNum==0) {
						this.state = 'started'
					}

					this.trs.$remove(tr);
					this.addBlock(this.currTdNum+5);
					this.currTdNum++;
				}
			}
		}
	}
		
</script>
<style lang="scss" src="./style.scss"></style>