<template>
    <div class="teams-other teams main">
        <p class="p1">来晚了，玩具已经被领完了</p>
        <p class="p2">贝壳币还在送不停</p>
        <p style="padding: 10px 0 20px 0;font-size: 22px;">每一位团员加入，团长都能获得10贝壳币，<br/>贝壳币兑换的奖品更给力哦！</p>
        <div class="con">
            <h2>贝壳币兑好礼</h2>
            <div>
                <img :src="'images/teams-other-img1.png'">
                <div class="my-teams">
                    <p>贝壳币团员</p>
                    <ul class="clearfix" v-if="isHasTeams">
                        <li v-for="value in usrlist"><img :src="value.head_img"></li>
                    </ul>
                    <ul class="clearfix" v-else>
                        <li v-for="value in 5" class="li"></li>
                    </ul>
                </div>
            </div>
        </div>
        <find-team-des :share-img="shareImg" :qr-code="qrCode"></find-team-des>
        <teams-fail :show.sync="show" :text="text"></teams-fail>
    </div>
</template>
<script>
import findTeamDes from '../components/teams/findTeamDes.vue'
import teamsFail from '../components/teams/teamsFail.vue'
import btn from '../components/btn.vue'
import api from '../api'
import util from '../utils'

export default {
    components: {
        findTeamDes,
        teamsFail,
        btn
    },
    props: {
        options: {
            count: 10,
            gifts: []
        }
    },
    data() {
        return {
            shareImg: 'images/recommend-img4.png',
            showImg: false,
            show: false,
            text: '',
            btnShow: true,
            qrCode: '',
            isHasTeams: false,
            usrlist: []
        }
    },
    created() {
        this.$dispatch('loading');
        this.getActInfoById();
    },
    methods: {
        setMessage(obj) {
            var list = obj.actinfo.list[0],
                usrlist = obj.groupusrlist.list;
            if (list.amid == '30') {
                this.qrCode = list.imgurl;

                if (!util.isEmptyObject(usrlist)) {
                    var len = usrlist.length;
                    this.isHasTeams = true;
                    this.usrlist = usrlist;
                    this.usrlist.length = len > 5 ? 5 : len;
                } else {
                    this.isHasTeams = false;
                }
            } else {
                this.show = true;
                this.text = back.resMsg;
                this.btnShow = false;
            }
        },
        getActInfoById() {
            var actid = window.localStorage.getItem('actid'),
                actMes = window.localStorage.getItem('actMes'),
                oneOpen = window.localStorage.getItem('oneOpen');
            actMes = actMes && window.JSON.parse(actMes);
            this.$dispatch('shareAct', {
                title: '',
                sharetext: '快点进来拿贝壳币，一大波精美玩具等着我们去兑换',
                sharehref: 'teamsShare2/'+actid,
                shareicon: location.href.split('#')[0] + "images/share1.jpg"
            });
            if (actMes && oneOpen == '1') {
                this.setMessage(actMes);
            } else {
                api.getActInfoById(this, {actid: actid}, (back) => {
                    this.$dispatch('cancelLoading');
                    if (back.resCode == "0") {
                        window.localStorage.setItem('oneOpen', '0');
                        if (!util.isEmptyObject(back.repBody.actinfo)) {
                            window.localStorage.setItem('actMes', window.JSON.stringify(back.repBody));
                            this.setMessage(back.repBody);
                        }
                    } else {
                        this.$router.replace({path: '/teamsMain/0'});
                    }
                })
            } 
        }
    }
}
</script>
