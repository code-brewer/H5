<template>
    <div class="date">
        <div class="head">
        <img :src="headurl">
            <p>{{name}}</p>
        </div>
       <!-- <datepicker><datepicker> -->
       <div style="    margin-top: 100px;">
       <section class="dateCon">
                    <p>
                        <a @click="setMonth('prev')">
                            <</a>{{currYear}}年{{currMonthName}}月<a @click="setMonth('next')">></a></p>
                    <div class="week_row">
                        <span v-for="val in week">{{val}}</span>
                    </div>
                    <div class="date_row">
                        <span class="date-blank" v-for="blank in blankDays"></span>
                        <span v-for="day in days" @click="link(day)">{{day.date}}<i v-show="day.count!=''">{{day.count}}</i></span>
                    </div>
                </section></div>
        <modal :show.sync="modalShow">
            <div class="open">
                <h2></h2>
                <div class="con" style="height: 250px;">
                    <p>当天没有邀请记录</p>
                </div>
                <a href="javascript:;" class="close" @click="modalShow = false"></a>
            </div>
        </modal>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import utils from '../../../src/utils'
import modal from '../../components/Modal.vue'
import DateUtils from '../../components/utils/DateUtils.js'
// import datepicker from '../../components/Datepicker.vue'
export default {
    components: {
        modal,
        // datepicker
    },
    data() {
        return {
            week: ['日', '一', '二', '三', '四', '五', '六'],
            currDate: new Date().getTime(),
            list: [],
            isSign: true,
            show: false,


            modalShow: false, //提示窗口状态
            personalInfo: {}, //个人信息
            headurl: '', //个人头像
            name:'',//名字
            headUrls: [] //前5位头像
        }
    },
    created() {
        // this.$dispatch('loading');
        document.title = '花贝妈妈';
        this.dayNum();
        let d = new Date(this.currDate);
    },
    ready() {
        this.headurl = window.localStorage.getItem('head_img');
        this.name = window.localStorage.getItem('name');
    },
    computed: {
        currMonthName() {
            const d = new Date(this.currDate);
            return (d.getMonth() + 1);
        },
        currYear() {
            const d = new Date(this.currDate);
            return d.getFullYear();
        },
        blankDays() {
            const d = new Date(this.currDate);
            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
            return dObj.getDay();
        },
        days() {
            const d = new Date(this.currDate);
            let days = [];
            let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
            let daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth());
            var isSign = false;
            for (let i = 0; i < daysInMonth; i++) {
                days.push({
                    date: dObj.getDate(),
                    timestamp: dObj.getTime(),
                    isSelected: false,
                    count: ''
                });
                for (let j = 0; j < this.list.length; j++) {
                    if (this.list[j]) {
                        if (utils.formatDate(new Date(days[i].timestamp), 'yyyy-MM-dd') == this.list[j].ctime) {
                            days[i].count = this.list[j].num;
                        }
                    }
                }
                dObj.setDate(dObj.getDate() + 1);
            }
            return days;
        }
    },
    methods: {

        link(day) {
            if (day.count == '') {
                this.modalShow = true;
            } else {
                this.$router.go({
                    path: '/details/' + utils.formatDate(new Date(day.timestamp), 'yyyy-MM-dd')
                });
            }
           
                
        },
        setMonth(type) {
            let d = new Date(this.currDate);
            if (type === 'prev') {
                d.setMonth(d.getMonth() - 1);
                this.currDate = d.getTime();
            } else if (type === 'next') {
                d.setMonth(d.getMonth() + 1);
                this.currDate = d.getTime();
            }
        },
        dayNum() {
            // console.log(this.dateRange)
            var date = new Date();
            var month = date.getMonth() + 1;
            var currentdate = date.getFullYear() + '-' + (month + 1) + '-' + '1';
            var currentdate2 = date.getFullYear() + '-' + month + '-' + '1';
            api.monthNum(this, {
                beginDate: currentdate2,
                endDate: currentdate
            }, back => {
                if (back.resCode === '0' && back.repBody.list) {
                    back.repBody.list.forEach(value => {
                        value.ctime = value.ctime.split(' ')[0];
                    })
                    this.list = back.repBody.list || [];
                };
            })
        }

    }
}
</script>
<style lang="scss" scoped>
.date {
    background: url(../../images/invitationCard/card-bj.png) no-repeat !important;
    width: 100%;
    height: 1138px;
    font-family: '黑体';
    // padding-top: 100px;
}

.head {
        position: relative;
    /* left: 20px; */
    top: 50px;
    width: 600px;
    height: 266px;
    background-color: #EDD470;
    margin: 0px auto;
    border-radius: 15px;
    box-shadow: -2px -3px 4px #C6AF66;
    img {
        // display: block;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 6px #75BBC0 solid;
        position: absolute;
        top: 17px;
        left: 223px;
    }
    p {
        position: absolute;
      
        font-size: 36px;
        top: 190px;
        color: #43A4AE;
        width: 100%;
        text-align: center;
    }
}
.dateCon {
        padding: 10px 3%;
    color: #43a4ae;
    background: white;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
}

.dateCon p {
    padding: 15px 0;
    color: #35828a;
    font-size: 32px;
    border-bottom: 1px solid #f1f1f1;
    text-align: center;
}

.dateCon a {
    color: #35828a;
    padding: 0 30px;
    font-size: 32px;
}

.week_row span {
    display: inline-block;
    width: 13.28%;
    padding: 15px 0;
    font-size: 32px;
    text-align: center;
}

.date_row span {
    display: inline-block;
    width: 13.28%;
    padding: 15px 0;
    font-size: 32px;
    text-align: center;
    font-size: 28px;
}
.date_row i{
    width: 25px;
    height: 25px;
    background-color: red;
    color: #fff;
    position: absolute;
    line-height: 25px;
    margin: -8px -4px;
    border-radius: 15px;
}
.con {
    text-align: center;
    margin: 0 auto;
    height: 200px;
    line-height: 200px;
    background-color: #fff;
    border-radius: 0px 0px 15px 15px;
}
.con p {
    // color: #7F7D7D;
    font-size: 36px;
    font-family: '\5FAE\8F6F\96C5\9ED1';
}
.open h2 {
    padding: 20px 0;
    font-weight: 400;
    border-radius: 15px 15px 0 0;
    // background: #327DBB;
    height: 40px;
}
.close {
        border-radius: 30px;
    position: absolute;
    top: -40px;
    right: -35px;
    width: 81px;
    height: 81px;
    background: url(../../images/invitationCard/close.png) center center/60px auto no-repeat;
}
</style>
