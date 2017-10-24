<template>
    <div class="teams-share teams main">
        <p class="p1">跟我一起赚贝壳币<br/>我们一起去换好礼</p>
        <p class="p3">长按二维码，关注得100贝壳币
            <br/>贝壳币可以兑换好礼哦！</p>
        <!-- <img :src="'images/teams-share-img3.png'" alt="">
        <img :src="'images/teams-share-img4.png'" alt=""> -->
        <img class="img1" :src="img">
        <!-- <p style="padding-top: 20px;font-size: 30px;">先帮我，待会我也帮你拿大奖！</p> -->
        <div class="div1"><span v-link="{path: '/teamsRule'}" class="rule">活动详情<i></i></span></div>
        <div class="isTeamer" v-show="isTeamer">
        	<p>亲~你已经当过团员了，<br/>不能再当团员哦~</p>
        	<p>当团长吧，有大奖拿!!</p>
			<img :src="'images/teams-share-img1.png'">
			<btn v-link="{path: '/teamsMain/0'}">我要当团长</btn>
		</div>
    </div>
</template>
<script>
import btn from '../components/btn.vue'
import api from '../api'

export default {
	components: {
		btn
	},
    created() {
        this.getActInfoById();
    },
    data() {
        return {
            isTeamer: false,
            // img: 'images/recommend-img5.png'
            img: ''
        }
    },
    methods: {
        getActInfoById() {
            var id = this.$route.params.id;
            api.getActInfoById(this, {actid: id}, (back) => {
                if (back && back.resCode == '0') {

                    var list = back.repBody.actinfo.list[0];

                    //二维码
                    this.img = list.imgurl;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.teams-share {
    padding: 30px 0;
    color: #348790;
    text-align: center;
    // .p1,
    // .p2 {
    //     color: #ff9946;
    // }
    .p1 {
        font-size: 50px;
        color: #f80;
    }
    .p2 {
        font-size: 40px;
    }
    .p3 {
        padding: 20px 0;
        font-size: 26px;
    }
    .img1{
        width: 531px;
        min-height: 531px;
        margin: 20px 0;
        background: white;
    }
    .div1 {
        margin: 0 auto;
        text-align: center;
    }
    .isTeamer {
    	position: fixed;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    	padding: 80px 0 0 0;
    	color: white;
    	text-align: center;
		background: rgba(0,0,0,.8);
		p {
			&:first-child {
				font-size: 40px;
			}
			&:last-of-type {
				padding: 70px 0 60px 0;
				font-size: 50px;
			}
		}
		img {
			display: block;
			margin: 0 auto 30px;
		}
    }
}
</style>
