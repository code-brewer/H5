<template>
	<div class="compare" v-el:compare>
		<div class="contentCompare">
			<p>大家都在搜 :</p>
			<div class="button">
				<button v-for = "item in hotSearchData" v-link="{path: '/searchResult/'+item.name}">{{item.name}}</button>
			</div>
			<div class="inputSearch">
				<div>
					<input type="text" name="" @input="changeImage($event)" @blur= "blurChange" @focus = "focusChange" placeholder="请输入想比价的商品名称" v-on:keyup.enter="clickSearch">
					<img :src="isSearch ? './images/search.png':'./images/x.png'" @click = "clickMe($event)">
				</div>
				<button class="searchButton" @click = "clickSearch">搜索</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				isSearch : true ,
				searchNow : '',
				hotSearchData : [{name : '手机'},{name : '衬衫'},{name : '运动鞋'}]
			}
		},
		methods : {
			changeImage (event) {
				event.target.value.trim().length > 0 ? this.isSearch = false : this.isSearch = true;
				this.searchNow = event.target.value.trim();
				
			},
			clickMe (event) {
				!this.isSearch ? event.target.parentElement.firstElementChild.value = '' : '';
				this.isSearch = true;

			},
			clickSearch () {
				if(this.searchNow.length == 0) return
				this.$dispatch('loadingTrue');
				this.$router.go ({
					path: '/searchResult/'+this.searchNow,
				})
			},
			focusChange() {
				this.$dispatch('closeShow')
				// console.log(this.$els.compare)
				// var inBrowser = typeof window !== 'undefined';
				// var UA = inBrowser && window.navigator.userAgent.toLowerCase();
			},
			blurChange () {
				this.$dispatch('openShow')
			}
		}
	}
</script>
<style lang="scss" >
 	
	.compare {
		padding-left: 30px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #f3f3f3;
		.contentCompare {
			padding-top: 55%;
			padding-bottom: 35%;

			p {
				font-size: 28px;
			}
			.button {
					padding-bottom: 35px;
					button {
						font-size: 24px;
						padding: 10px 32.5px;
						margin-top: 25px;
						margin-right: 25px;
						background-color: #fff;
						box-sizing: border-box;
						border: 1px solid #c1c1c1;
						border-radius: 42.5px;
					}
			}
		}
	}
</style>