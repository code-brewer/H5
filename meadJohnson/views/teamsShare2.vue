<template>
    <div class="teams-share teams main">
        <p class="p1">跟我一起赚贝壳币<br/>我们一起去换好礼</p>
        <!-- <p class="p3">长按二维码，关注得100贝壳币
            <br/>贝壳币可以兑换精致玩具哦！</p> -->
        <img :src="'images/teams-share-img3.png'" alt="">
        <img :src="'images/teams-share-img4.png'" alt="">
        <img class="img1" :src="img">
        <p style="padding-top: 20px;font-size: 30px;">先帮我，待会我也帮你拿玩具！</p>
        <div class="div1"><span v-link="{path: '/teamsRule'}" class="rule">活动详情<i></i></span></div>
        <div class="isTeamer" v-show="isTeamer">
        	<p>亲~你已经当过团员了，<br/>不能再当团员哦~</p>
        	<p>当团长吧，可以拿贝壳币兑玩具!!</p>
			<img :src="'images/teams-share-img2.png'">
			<btn v-link="{path: '/teamsMain/0'}">我要当团长</btn>
		</div>
    </div>
</template>
<script>
import api from '../api'
import btn from '../components/btn.vue'

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