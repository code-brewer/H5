<template>
    <div class="card-details">
        <div class="details">
            <p class="head">{{month}}月{{day}}日</p>
            <ul class="list" >
                <li v-for = "items in dayDetail">{{$index+1}}.{{items.sharenick}}于{{items.ctime2}}邀请了{{items.nick}}关注平台</li>
            </ul>
        </div>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import DateUtils from '../../utils/DateUtils.js'

export default {
    data() {
        return {
            dayDetail:[],//详情
            month:'',
            day:'',
            beginDate:'',//详情日期
            date:''
        }
    },
    created() {
        this.getdayDetail();
        // this.$dispatch('loading');
        document.title = '花贝妈妈';
    },
    ready() {
        // console.log(DateUtils)
    },
    methods: {
        getdayDetail() {
            api.dayDetail(this, {
                beginDate: this.$route.params.time
            }, back => {
                if (back.resCode === '0'&& back.repBody.list) {
                    back.repBody.list.forEach(value => {
                    value.ctime1 = value.ctime.split(' ')[0];
                    value.ctime2 = value.ctime.split(' ')[1];
                    value.month = value.ctime1.split('-')[1];
                    value.day = value.ctime1.split('-')[2];
                })
                    this.dayDetail = back.repBody.list;
                    this.month = back.repBody.list[0].month;
                    this.day = back.repBody.list[0].day;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.card-details {
    background: url(../../images/invitationCard/card-bj.png) no-repeat !important;
    width: 100%;
    height: 1138px;
    // padding-top: 100px;
}

.details {
    font-family: '黑体';
    width: 90%;
    margin: 0 auto;
    padding-top: 40px;
}

.head {
    color: #fff;
    background: -webkit-linear-gradient(top, #3DADDC, #317BB9);
    height: 80px;
    line-height: 80px;
    font-size: 36px;
    text-align: center;
    border-radius: 10px 10px 0px 0px;
}

.list {
    background-color: #fff;
    border-radius: 0px 0px 10px 10px;
    padding: 20px 20px 60px 20px;
    height: 700px;
    overflow: auto;
    li {
        padding: 10px 0px 0px 0px;
        font-size: 28px;
        color: #868686;
    }
}

</style>
