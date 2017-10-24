<template>
    <div class="find-team-des teams">
        <div class="find-des">找团员套路在这里</div>
        <p class="p3">套路一：一键找团友，助攻拿贝壳币</p>
        <btn @click="isShare=true">马上找团员</btn>
        <p class="p3">套路二：扫码求团员，贝壳币是我的</p>
        <img class="img3" :src="qrCode">
        <div class="div1">
            <span class="rule" v-link="{path: '/teamsRule'}">活动详情<i></i></span>
        </div>
        <div class="share-open" v-show="isShare" @click="isShare=false">
			<img :src="shareImg" alt="">
			<p>别客气，使劲拉妈妈团员，<br/>花妈刚新进了一大波礼品等你拿！</p>
		</div>
    </div>
</template>
<script>
	import btn from '../btn.vue'

	export default {
		components: {
			btn
		},
		props: {
			shareImg: '',
			qrCode: 'images/recommend-img3.png'
		},
		data() {
			return {
				isShare: false
			}
		}
	}
</script>
<style lang="scss">
	.find-team-des {
		.p3 {
			padding: 20px 0;
			font-size: 30px;
			color: #348790;
		}
		.img3 {
			width: 342px;
		}
		.find-des {
			width: 350px;
			height: 87px;
			margin: 0 auto;
			font-size: 36px;
			line-height: 74px;
			color: #348790;
			text-align: center;
			background: url(../../images/find-des-img2.png)
		}
		.div1 {
			width: 342px;
			margin: 0 auto;
			color: #348790;
			p {
				text-align: left;
				font-size: 24px;
			}
		}
	}
</style>