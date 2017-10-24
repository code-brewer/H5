<template>
	<div class="view">
		<section class="title">
	        <a class="l-jiantou" href="javascript:;"></a>
	        <h1 class="logo">妈咪打卡</h1>
	        <a class="share" href="javascript:;"></a>
	    </section>
	    <section class="shop-banner">
	        <a href="javascript:;">
	            <img :src="'images/daqia-1.jpg'" class="">
	        </a>
	    </section>
	    <score></score>
	    <ul class="daqia-list" @click="openTip">
	        <li>
	            <a v-link="{path: '/daka'}">
	                <img :src="'images/daqia-2.jpg'">
	            </a>
	        </li>
	        <li>
	            <a v-link="{path: '/daka'}">
	                <img :src="'images/daqia-3.jpg'">
	            </a>
	        </li>
	        <li>
	            <a v-link="{path: '/daka'}">
	                <img :src="'images/daqia-6.jpg'">
	            </a>
	        </li>
	        <li>
	            <a v-link="{path: '/daka'}">
	                <img :src="'images/daqia-7.jpg'">
	            </a>
	        </li>
	    </ul>

	    <modal :show.sync="tipModal.show" :bg="false">
			<div class="out">
	            <a href="javascript:;">
	            </a>
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
				}
			}
		},
		created() {
			var that = this;

		},

		methods: {
			openTip() {
				if(localStorage.meadJohnson) return;

				localStorage.setItem('meadJohnson', 1);
				this.$dispatch('tipModal3');
			}
		}
	}
</script>