<template>
	<div class="wap-black-white-block">
		<div class="trs">
			<div class="tr" v-for="tr in trs" transition="block-down">
				<div class="td" v-for="td in tr.tds" track-by="$index" :class="{active: td.active}">
					<span v-if="td.text">{{td.text}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
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

		}
	}
		
</script>

<style lang="scss" src="./style.scss"></style>