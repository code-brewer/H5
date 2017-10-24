<template>
	<div class="view" style="background-color: #fff;">
		<div class="w">
	        <form class="banner" @submit.prevent="searchShopInfo()">
	        	<a class="location-wrap" v-link="{name: 'location'}"><img :src="'images/icon-location.png'"><span>{{$root.currCity.areaName}}</span></a>
	            <!-- <img :src="'images/0_r2_c1.gif" alt="" /> -->
	            <h2>本地生活查询</h2>
	            <input class="text-suo" type="text" placeholder="商家名、地址、电话" v-model="searchForm.queryWord" /><i></i>
	        </form>
	        <div class="top-line"><strong>热门查号单位</strong> <a v-link="{path: '/list'}"><span>更多</span><i></i></a></div>
	        <div class="LifeCheck">
	            <ul>
	                <li>
	                    <a v-link="{name: 'result-shoptypefather', params: {name: '美食',fid: '01000000'}}">
	                        <img :src="'images/food.png'">
	                        <p>美食</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptypefather', params: {name: '娱乐',fid: '02000000'}}">
	                        <img :src="'images/music.png'">
	                        <p>娱乐</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptypefather', params: {name: '购物',fid: '03000000'}}">
	                        <img :src="'images/bag.png'">
	                        <p>购物</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptypefather', params: {name: '酒店',fid: '08000000'}}">
	                        <img :src="'images/hotel.png'">
	                        <p>酒店</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptypefather', params: {name: '运动',fid: '07000000'}}">
	                        <img :src="'images/run.png'">
	                        <p>运动</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '家政',id: '10040000'}}">
	                        <img :src="'images/housekeeping.png'">
	                        <p>家政</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '景点',id: '02100000'}}">
	                        <img :src="'images/spot.png'">
	                        <p>景点</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '审车',id: '09100000'}}">
	                        <img :src="'images/0_r4_c4.png'">
	                        <p>审车</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '装修',id: '10240000'}}">
	                        <img :src="'images/decorate.png'">
	                        <p>装修</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '驾校',id: '09070000'}}">
	                        <img :src="'images/driving.png'">
	                        <p>驾校</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '洗浴桑拿',id: '02110000'}}">
	                        <img :src="'images/clothes.png'">
	                        <p>洗浴桑拿</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '汽车租赁',id: '09030000'}}">
	                        <img :src="'images/lease.png'">
	                        <p>汽车租赁</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '物流快递',id: '10170000'}}">
	                        <img :src="'images/logistics.png'">
	                        <p>物流快递</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '媒体热线',id: '10260000'}}">
	                        <img :src="'images/hotline.png'">
	                        <p>媒体热线</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '家居建材',id: '03070000'}}">
	                        <img :src="'images/BM.png'">
	                        <p>家居建材</p>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{name: 'result-shoptype', params: {name: '房地产', id: '10280000'}}">
	                        <img :src="'images/house.png'">
	                        <p>房地产</p>
	                    </a>
	                </li>
	                <!-- <li v-for="item in list">
	                    <a v-link="{name: 'result-shoptypefather', params: {fid: ''}}">
	                        <img :src="item.logo">
	                        <p>{{item.type}}</p>
	                    </a>
	                </li> -->
	            </ul>
	        </div>
	    </div>
	    <div style="padding-bottom: 20px;">
	        <a v-link="{path: '/list'}" class="more">更多</a>
	    </div>
	</div>
</template>

<script>
	import api from '../data/api.js'
	import {router} from '../index'
	export default {
		data() {
			return {
				list: [],

				searchForm: {
					queryWord: ''
				}
			}
		},
		created() {
			var that = this;

			api.gethotshoptype(this, {}, (back)=> {
				if(back.code="00000") {
					
					var data = [];
					for (var i = 0; i < back.data.length; i++) {
						back.data[i].logo = typesLogo[i];
						data.push(back.data[i]);
					}

					that.list = data;
				}
			})
		},

		methods: {
			// 号码查询
			searchShopInfo() {
				if(this.searchForm.queryWord) {
					// console.log(this.searchForm)
					router.go({name: 'result', params: {word: this.searchForm.queryWord}})
				}
				// api.searchShopInfo(this, this.searchForm, (back)=> {
				// 	console.log(back)
				// })
			}
		}
	}
</script>