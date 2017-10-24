<template>
	<div class="view" style="background-color: #fff;color: #fff;">
			<h2 class="title"><a href="javascript: history.go(-1)"></a>全部分类</h2>
		    <ul class="food-fenlei-list">
<!-- 		        <li>
		            <a href="#">
		                <div class="fenlei-list-text-1">美食</div>
		                <i></i>
		            </a>
		            <ul class="sub-list">
		            	<li class="food-list">
				            <a href="HotPot.html">
				                <div class="food-list-text">火锅砂锅</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">川菜</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">粤菜</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">湘菜</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">西餐</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">小吃快餐</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">江浙菜</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">面包甜点</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">海鲜</div>
				                <i></i>
				            </a>
				        </li>
				        <li class="food-list">
				            <a href="#">
				                <div class="food-list-text">农家菜</div>
				                <i></i>
				            </a>
				        </li>
		            </ul>
		        </li> -->
		        <li v-for="item in list">
		            <a href="javascript:;" @click="item._sublist_show = !item._sublist_show">
		            	<img :src="getImgUrl(item)" class="icon">
		                <div class="fenlei-list-text">{{item.type}}</div>
		                <i></i>
		            </a>
		            <ul class="sub-list" v-show="item._sublist_show">
		            	<li class="food-list" v-for="subitem in item.shopType">
				            <a v-link="{name: 'result-shoptype', params: {id: subitem.id, name: subitem.type}}">
				                <div class="food-list-text">{{subitem.type}}</div>
				                <i></i>
				            </a>
				        </li>
		            </ul>
		        </li>
		        
		    </ul>
	</div>
</template>

<script>
	import api from '../data/api.js'

	export default {
		data() {
			return {
				list: [],
			}
		},
		created() {
			var that = this;

			this.$dispatch('loading', {name:'result', text: '加载中...', icon: true, show: true, duration: 10*1000});

			api.getShopTypeList(this,{}, (back)=> {
				console.log(back)
				if(back.code=="00000") {
					
					var list = [];
					for (var i = 0; i < back.data.length; i++) {
						back.data[i]._sublist_show = false;
						list.push(back.data[i]);
					}

					that.list = list;
				}
		
				that.$dispatch('cancelloading', 'result');
			})
			
		},

		methods: {
			getImgUrl(item) {
				if(item.logo) {
					return 'http://61.158.237.34/'+item.logo.replace('/res', 'res');
				}
				else {
					return 'http://plachold.it/60x60'
				}
				
			}
		}
	}
</script>