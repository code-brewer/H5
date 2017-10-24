<template>
    <div class="User-detail">
        <div class="User-detail-top">晨起打卡Banner设置</div>
        <div class="User-detail-body">
         <div class="body-item">
                </div>
            <div class="User-detail-body-bottom">
                <section class="dateCon">
                    <p>
                        <a @click="setMonth('prev')">
                            <</a>{{currYear}}年{{currMonthName}}月<a @click="setMonth('next')">></a></p>
                    <div class="week_row">
                        <span v-for="val in week">{{val}}</span>
                    </div>
                    <div class="date_row">
                        <span class="date-blank" v-for="blank in blankDays"></span>
                        <span v-for="day in days" @click="link(day)">{{day.date}}<i v-show="day.count!=''" style="color: red;">{{day.count}}</i></span>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import {
    router
} from '../../index'
import DateUtils from '../../dist/DateUtils.js'
import utils from '../../../src/utils'
import api from '../../api'
export default {
    components: {},
    data() {
        return {
            week: ['日', '一', '二', '三', '四', '五', '六'],
            currDate: new Date().getTime(),
            list: [],
            isSign: true,
            show: false,
        }
    },
    created() {
        // this.getdayDeatil();
        this.findBanner();
        let d = new Date(this.currDate);

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
                        if (utils.formatDate(new Date(days[i].timestamp), 'yyyy-MM-dd') == this.list[j]) {
                            days[i].count = '哼';
                        }
                    }
                }
                dObj.setDate(dObj.getDate() + 1);
            }
            return days;
        }
    },
    watch: {

    },
    methods: {
        link(day) {
            // if (day.count == '') {
            //     this.show = true;
            // } else {
            //     window.sessionStorage.setItem('date', utils.formatDate(new Date(day.timestamp), 'yyyy-MM-dd'));
            //     this.$router.go({
            //         path: '/pushDetails'+utils.formatDate(new Date(day.timestamp), 'yyyy-MM-dd')
            //     });
            // }
            var time = utils.formatDate(new Date(day.timestamp), 'yyyy-MM-dd');
            console.log(time)
            this.$router.go({
                path: '/bannerDetails/' + time
            });
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
            this.findBanner();
        },

        // getdayDeatil() {
        //     var time = utils.formatDate(new Date(this.currDate), 'yyyy-MM');
        //     api.getmonth(this, {
        //         yearMonth: time
        //     }, back => {
        //         this.list = back.object
        //     })
        // },
        /**
         * 查询某月已有3个banner的日期
         */
        findBanner(){
            var time = utils.formatDate(new Date(this.currDate), 'yyyy-MM');
            api.findBanner(this,  {yearMonth: time,type:'1' }, (back) => {
                   this.list = back.object
                })
        }
        
    }
}
</script>
<style scoped>
.dateCon {
    padding: 10px 3%;
    color: #43a4ae;
    background: white;
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

.alert {
    position: relative;
}

.alert h2 {
    padding: 40px 0;
    font-size: 30px;
    color: white;
    font-weight: 400;
    text-align: center;
    border-radius: 15px 15px 0 0;
    background: #43a4ae;
}

.alert p {
    line-height: 300px;
    text-align: center;
    color: #3da5af;
    font-size: 26px;
    border-radius: 0 0 15px 15px;
    background: white;
}

.alert .close {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 46px;
    height: 46px;
    background: url(../../images/close.png) no-repeat;
}
</style>
