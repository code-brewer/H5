<template>
	<div class="view" style="background-color: #fff;">
		<div v-if="found">
			<h2 class="title"><a href="javascript: history.go(-1)"></a>{{$route.params.word || $route.params.name}}</h2>
		    <ul class="food-detail">
		    <!--     <li>
		            <a href="#">
		                <div class="detail-l">
		                    <p><a href="">粥状元</a><i></i><i></i></p>
		                    <p>
		                        <em></em><em></em><em></em><em></em><em></em> 已查询1次
		                    </p>
		                    <p>地址：郑州市金水区同乐路与东三街</p>
		                </div>
		                <div class="detail-r">
		                    <img :src="'images/dianhua.png'" alt="" width="25px;" />
		                </div>
		            </a>
		        </li> -->
		        <li v-for="item in list">
		            <a href="#">
		                <div class="detail-l">
		                    <p class="name"><a href="">{{item.shopName}}</a><i></i><i></i></p>
		                    <p class="stars">
		                        <em></em><em></em><em></em><em></em><em></em> <span>已查询{{item.queriesNum
||'0'}}次</span>
		                    </p>
		                    <p class="address">地址：{{item.shopAddress}}</p>
		                </div>
		                <div class="detail-r">
		                    <a href="javascript:;" @click="openPhoneModal(item.id)">
		                        <img :src="'images/dianhua.png'" width="25px;" /></a>
		                        <!-- <img :src="'http://61.158.237.34'+item.telImg" alt="{{item.shopName}}" width="25px;" /></a> -->
		                </div>
		            </a>
		        </li>
		    </ul>
		</div>

	    <div v-if="!found">
	    	<h2 class="title"><a href="#"></a>搜索结果</h2>
		    <img class="no-result" :src="'images/no-result.png'">
		    <p class="no-text">抱歉，没有找到相关信息</p>
	    </div>

	    <modal :show.sync="phoneModal.show">
			<div class="call">
			    <div class="call-top"><h3>{{phoneModal.text}}</h3></div>
			    <div class="call-bottom">
			    <div class="del"><a href="javascript:;" @click="phoneModal.show=false">取消</a></div>
			    <div class="calling"><a href="tel:{{phoneModal.text}}">呼叫</a></div>

			    </div>
			</div>
		</modal>
	</div>
	
	
</template>

<script>
	import api from '../data/api.js'
	import Vue from 'vue'

	import Modal from '../../src/components/Modal.vue'

	export default {
		components: {
			Modal
		},
		data() {
			return {
				list: [],

				found: true,

				searchForm: {
					// 查询关键字
					queryWord: '',
					pageNo: '1'
				},

				defaultHeight: 0,

				isEnd: false,

				phoneModal: {
					show: false,
					text: '查询中..'
				}
			}
		},
		created() {
			var that = this;

			this.$dispatch('loading', {name:'result', text: '加载中...', icon: true, show: true, duration: 10*1000});

			if(this.$root.currCity.areaNo) {
				this.searchForm.areaId = this.$root.currCity.areaNo;
			}

			if(this.$route.params.id) {
				this.searchForm.shopType = this.$route.params.id;
			}
			else if(this.$route.params.fid) {
				this.searchForm.shopTypeFather = this.$route.params.fid;
			}
			else {
				this.searchForm.queryWord = this.$route.params.word;
			}
		
			this.searchShopInfo();
		},

		methods: {
			searchShopInfo() {
				var that = this;
				if(this.$root.shopx&&!this.searchForm.queryWord) {
					this.searchForm.shopx = this.$root.shopx;
					this.searchForm.shopy = this.$root.shopy;
				}
				api.searchShopInfo(this, this.searchForm, (back)=> {
					if(back.code=="00000") {
						// that.list = back.data;
						var list = [];
						if(that.list.length) {
							list = JSON.parse(JSON.stringify(that.list));
							console.log(list)
							Array.prototype.push.apply(list, back.data);
						}
						else {
							list = back.data;
						}
				
						that.list = list;

						if(!that.defaultHeight) {
							setTimeout(()=> {
								that.defaultHeight = Math.floor(document.body.offsetHeight-window.innerHeight);
							}, 30);
						}
						
						that.goScroll();
					}
					else if(that.list.length) {
						that.isEnd = true;
						return;
					}
					else {
						that.found = false;
					}
					that.$dispatch('cancelloading', 'result');
				})
			},

			goScroll() {
				var that = this;
			

				document.addEventListener('scroll', (e)=> {

					var offsetTop = document.body.scrollTop + window.innerHeight;
					// console.log(that.searchForm.pageNo)
					// console.log(document.body.scrollTop)
					// console.log(that.defaultHeight * that.searchForm.pageNo)
					if(offsetTop >= that.defaultHeight * that.searchForm.pageNo) {
						if(that.isEnd) return;
						if(document.body.offsetHeight-window.innerHeight)
							
						that.searchForm.pageNo = (parseInt(that.searchForm.pageNo)+1) + ''
						that.searchShopInfo();
						
					}
				})
			},


			// 显示拨打模态框
			openPhoneModal(id) {
				var that = this;

				this.phoneModal.text = '';
				this.phoneModal.show = true;
				
				api.toShopInfoTel(this, {id: id}, (back)=>{
					if(back.code=="00000") {
						that.phoneModal.text = back.data.tel;
					}
					else {
						that.phoneModal.text = '该商家未添加号码';
					}
					console.log(back)
				})
			}
		},
		watch:{
			'searchForm.pageNo' (val) {
            // console.log(val)
        	}
		}

	}
</script>