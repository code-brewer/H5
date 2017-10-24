<template>
	<div class="music-opt__container">
		<h3 class="music-opt__title"
			:style="{'color': activityConfig.game.question.color,
					'font-size': activityConfig.game.question.fontSize}">
			题目:{{activityConfig.game.question.text}}
		</h3>
		<ul class="music-opt__lists">
			<template v-if="activityConfig.game.optionType == 'txt'">
				<li v-for="item in optionsTxt" track-by="$index">
					<div class="item" 
						:class="{'active': $index == selected}"
						@click="selectOption($index, item.correct)">
						<span class="title">{{item.option}}</span>
					</div>
				</li>
			</template>
			<template v-else>
				<li v-for="item in optionsImg">
					<div class="item"
						:class="{'active': $index == selected}"
						@click="selectOption($index, item.correct)">
						<img :src="item.url" alt="">
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>
<script>
	import Statistics from '../../../statistics.js'
	import utils from '../../../../../../utils/index.js'
	export default {
		components: {
			
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
				activityConfig,
				optionsTxt:[],
				optionsImg:[],
				iscorrect: false,  // 是否回答正确
				selected: 99
			}
		},
		ready() {
			if(this.activityConfig.game.optionType == 'txt') { // 打乱选项
				this.optionsTxt = utils.shuffleArray(this.activityConfig.game.options.txt)
			}else{
				this.optionsImg = utils.shuffleArray(this.activityConfig.game.options.img)
			}
		},
		methods: {
			selectOption(index, correct) {
				this.selected = index
				this.statisticMusicSelection(index)
				if(correct) {
					this.activityConfig.game.selected = 1
				}else{
					this.activityConfig.game.selected = 0
				}
			},
			statisticMusicSelection(index) {
				Statistics.musicSelection(index+1) // 统计选项
			}
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
    $ratio: 750/320;
	@import './common.scss';
	@import './music-options.scss';
</style>