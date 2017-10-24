<template>
	<div class="view" style="background-color: #fff;">
		<section class="title">
	        <a class="l-jiantou" href="#"></a>
	        <h1 class="logo">贝壳币商城</h1>
	        <a class="share" href="#"></a>
	    </section>
	    <section class="shop-banner">
	        <a v-link="{path: '/reply'}">
	            <img :src="'images/shop-banner.jpg'" class="">
	        </a>
	    </section>

	    <score></score>

	    <section class="shop-bg">
	        <div class="winPresent">
	            <div class="winPresent-l">
	                <a href="javascript:;" @click="tipModal.show=true">
	                    <img :src="'images/font.png'" alt="" />
	                </a>
	            </div>
	            <a @click="tipModal.show=true" class="zhuanpan">
	                <!-- <img :src="'images/thanks.png'" alt="" class="thanks1" />
	              <img :src="'images/thanks.png'" alt="" class="thanks2" />
	              <img :src="'images/thanks.png'" alt="" class="thanks3" />
	              <img :src="'images/ye.png'" alt="" class="tu1"/>
	              <img :src="'images/child.png'" alt="" class="tu2"/>
	              <img :src="'images/duck.png'" alt="" class="tu3"/>  -->
	            </a>
	        </div>
	        <div class="lipin">
	            <img :src="'images/liwu.png'" alt="" />
	        </div>
	        <div class="jiangpin">
	            <ul>
	                <li>
	                    <a v-link="{path: '/reply'}">
	                        <img :src="'images/duck.png'">
	                        <div class="font">
	                            <h5>满趣健White Hot充气安全澡盆-鸭子造型</h5>
	                        </div>
	                        <div class="btn-duijiang">
	                            <span class="btn1">900贝壳币</span>
	                            <span class="btn2">10贝壳币试运气</span>
	                        </div>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{path: '/reply'}">
	                        <img :src="'images/child.png'">
	                        <div class="font">
	                            <h5>长颈鹿脚踏车</h5>
	                        </div>
	                        <div class="btn-duijiang">
	                            <span class="btn1">900贝壳币</span>
	                            <span class="btn2">10贝壳币试运气</span>
	                        </div>
	                    </a>
	                </li>
	                <li>
	                    <a v-link="{path: '/reply'}">
	                        <img :src="'images/ye.png'" class="ye">
	                        <div class="font">
	                            <h5>施巴婴儿200ml泡泡浴露</h5>
	                        </div>
	                        <div class="btn-duijiang">
	                            <span class="btn1">900贝壳币</span>
	                            <span class="btn2">10贝壳币试运气</span>
	                        </div>
	                    </a>
	                </li>
	            </ul>
	        </div>
	        <!-- <div class="attation">
	            <a href="#" class="more">
	            </a>
	        </div> -->
	    </section>

	    <modal :show.sync="tipModal.show" :bg="false">
			<div class="out">
	            <a href="javascript:;" @click="tipModal.show=false"></a>
	        </div>
		</modal>
		<modal :show.sync="tipModal2.show" :bg="false">
			<div class="out-2">
	            <a href="javascript:;" @click="tipModal2.show=false"></a>
	        </div>
		</modal>
	</div>

	
</template>

<script>
	import api from '../api'
	// import Modal from '../../src/components/Modal.vue'
	import Modal from '../components/Modal.vue'

	import score from '../components/score.vue'

	export default {
		components: {
			Modal,
			score
		},
		data() {
			return {
				tipModal: {
					show: false
				},
				tipModal2: {
					show: false
				}
			}
		},
		created() {
			var that = this;

			document.title = '贝壳币商城'
		},

		methods: {
			
		}
	}
</script>