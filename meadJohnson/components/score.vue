<template>
	<section class="shop-btn">
        <a class="shop-btn-l" href="javascript:;">
            <div class="shop-btn-L">
                <h5 class="l-btn">我的贝壳币</h5>
                <h5 class="num">{{score}}个</h5>
            </div>
        </a>
        <a class="shop-btn-r" @click="tipModal2.show=true">
            <div class="shop-btn-R">
            	<span class="r-btn"></span>
                <h5 class="record">我的兑换记录</h5>
            </div>
        </a>
    </section>

    <modal :show.sync="tipModal2.show" :bg="false">
		<div class="out-2">
	        <a href="javascript:;" @click="tipModal2.show=false"></a>
	    </div>
	</modal>
</template>

<script>
	import api from '../api'
	import Modal from '../components/Modal.vue'
	export default {
		components: {
			Modal
		},
		data() {
			return {
				score: 0,

				tipModal2: {
					show: false
				}
			}
		},
		created() {
			var that = this;
			api.getUserScore(this, {}, (back)=> {
				if(back.resCode=="0") {
					that.score = back.repBody;
				}
			});
		}
	}
</script>