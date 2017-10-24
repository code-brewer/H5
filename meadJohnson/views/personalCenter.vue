<template>
	<div class="view person" >
	    <section class="section1">
	    	<div class="personImg">
	    		<img v-show="showImg" :src="list.head_img" alt="">
	    	</div>
	    	<div class="level">
	    		<span><span>{{list.v_grade}}</span></span>
	    	</div>
	    	<p class="nick">{{list.nick}}</p>
	    </section>
	    <section class="section2">
	    	<div class="text clearfix">
	    		<div>
	    			<p>贝壳币</p>
	    			<p>{{list.v_score}}</p>
	    		</div>
	    		<div>
	    			<p>成长值</p>
	    			<p>{{list.v_integral}}</p>
	    		</div>
	    	</div>
	    	<div class="link clearfix">
	    		<a v-link="{path: '/myConchCoin'}">
	    			<img :src="'images/person-icon1.jpg'">
	    		</a>
	    		<a v-link="{path: '/myOrder'}">
	    			<img :src="'images/person-icon2.jpg'">
	    		</a>
	    	</div>
	    	<p class="notice">如有疑问，请在公众号对话框以“客服+你的问题”的格式，将你的问题告诉花妈，花妈会争取尽快回复哒！</p>
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
				},
				list: {
					head_img: '',
					nick: '',
					v_grade: '',
					v_integral: '0',
					v_score: '0'
				},
				showImg: false
			}
		},
		created() {
			document.title = '个人中心';
			this.$dispatch('loading');
		},
		ready() {
			api.getPersonalInfo(this, {}, (data) => {
				if (data.resMsg === 'success') {
					this.list = data.repBody.list[0];
					this.showImg = true;
					this.$dispatch('cancelLoading');
				}
			})
		}
	}
</script>
<style lang="scss">
	.leftBack {
	    width: 14px;
	    height: 24px;
	    background: url(../images/leftBack.png) no-repeat;
	    position: absolute;
	    top: 32px;
	    left: 30px;
	}
	.person {
		min-height: 100%;
		background: -webkit-linear-gradient(top, #d5eeee, #c1e8e8);
        background: -moz-linear-gradient(top, #d5eeee, #c1e8e8);
        background: linear-gradient(top, #d5eeee, #c1e8e8);
	    .section1 {
	        padding: 40px 0 15px;
	        background: -webkit-linear-gradient(top, #f2f8f8, #ddf1f1);
	        background: -moz-linear-gradient(top, #f2f8f8, #ddf1f1);
	        background: linear-gradient(top, #f2f8f8, #ddf1f1);

	        .personImg {
	            > img {
	                display: block;
	                width: 30%;
	                max-width: 100%;
	                margin: 0 auto;
	                border: 10px solid #3da5af;
	                border-radius: 50%;
	                -webkit-box-shadow: 0 0 100px rgba(61, 165, 175, .4);
	                box-shadow: 0 0 100px rgba(61, 165, 175, .4);
	            }
	        }
	        .level {
	            margin-top: 10px;
	            text-align: center;

	            > span {
	                display: inline-block;
	                width: 131px;
	                height: 52px;
	                color: white;
	                font-size: 30px;
	                line-height: 60px;
	                text-align: right;
	                background: url(../images/level-icon.png) no-repeat;

	                > span {
	                    padding-right: 15px;
	                }
	            }
	        }
	        .nick {
	            padding: 20px 0;
	            font-size: 30px;
	            color: #348790;
	            text-align: center;
	        }
	    }
	    .section2 {
	        padding: 30px 20px;
	        .text {
	            > div {
	                float: left;
	                width: 50%;
	                padding-bottom: 30px;
	                text-align: center;
	                &:first-child {
	                    p {
	                        color: #ff9a46;
	                    }
	                }
	                &:last-child {
	                    p {
	                        color: #43a4ae;
	                    }
	                }
	                p:first-child {
	                    font-size: 30px;
	                }
	                p:last-child {
	                    font-size: 45px;
	                }
	            }
	        }
	        .link {
	            width: 100%;
	            padding: 20px 0;
	            text-align: center;
	            line-height: 1.5;
	            border-radius: 15px;
	            background: white;
	            background-size: 100% 100%;
	            -webkit-box-shadow: 0 0 0 rgba(170, 219, 221, .6), 5px 0 30px rgba(170, 219, 221, .6), 0 5px 30px rgba(170, 219, 221, .6), -5px 0 30px rgba(170, 219, 221, .6);
	            box-shadow: 0 0 0 rgba(170, 219, 221, .6), 5px 0 30px rgba(170, 219, 221, .6), 0 5px 30px rgba(170, 219, 221, .6), -5px 0 30px rgba(170, 219, 221, .6);
	            > a {
	                display: block;
	                float: left;
	                width: 50%;
	            }
	            img {
	                width: 100%;
	            }
	        }
	        .notice {
	            padding: 30px 20px;
	            line-height: 1.5;
	            color: #2f8791;
	            font-size: 22px;
	        }
	    }
	}
</style>