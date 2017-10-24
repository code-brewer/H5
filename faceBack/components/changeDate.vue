<template>
    <span>
		<a @click="clickTime('本周')" :class="{active:spell==='本周'}">本周</a>
                    <a @click="clickTime('上周')" :class="{active:spell==='上周'}">上周</a>
                    <a @click="clickTime('本月')" :class="{active:spell==='本月'}">本月</a>
                    <a @click="clickTime('上月')" :class="{active:spell==='上月'}">上月</a>
                    <a @click="clickTime('所有')" :class="{active:spell==='所有'}">所有</a>
	</span>
</template>
<script type="text/javascript">
export default {
    props: {
        switchDate: {
            type: Object,
            default: {
                begin: '',
                end: ''
            }
        }
    },
    ready() {
        this.$on('dateClick', function() {
            this.spell = ''
        })
    },
    computed: {
        getWeekStartDate() { //本周开始时间
            var now = this.now
            var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            return weekStartDate.format()
        },
        getWeekEndDate() { //本周结束时间
            var now = this.now
            var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
            return weekEndDate.format()
        },
        getLastWeekStart() { //上周开始时间
            var now = this.now
            var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 7);
            return weekStartDate.format()
        },
        getLastWeekEnd() { //上周结束时间
            var now = this.now
            var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay() - 7));
            return weekEndDate.format()
        },
        getMonthStartDate() { //本月开始时间
            var now = this.now
            var monthStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
            return monthStartDate.format()
        },
        getMonthEndDate() { //本月结束时间
            var now = this.now
            var monthEndDate = new Date(now.getFullYear(), now.getMonth(), this.getMonthDays(now.getMonth()));
            return monthEndDate.format()
        },

        getLastMonthStartDate() { //上月开始时间
            var now = this.now
            var lastMonthStartDate = new Date(now.getFullYear(), this.lastDate().getMonth(), 1);
            return lastMonthStartDate.format()
        },
        getLastMonthEndDate() { //上月结束时间
            var now = this.now
            var lastMonthStartDate = new Date(now.getFullYear(), this.lastDate().getMonth(), this.getMonthDays(this.lastDate().getMonth()))
            return lastMonthStartDate.format()
        },

    },
    data() {
        return {
            now: new Date(),
            spell: '',
        }
    },
    methods: {
        getMonthDays(myMonth) {
            var now = this.now
            var monthStartDate = new Date(now.getFullYear(), myMonth, 1);
            var monthEndDate = new Date(now.getFullYear(), myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },

        lastDate() { //上月日期  
            var lastMonthDate = new Date();
            lastMonthDate.setDate(1);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            return lastMonthDate
        },
        clickTime(val) {
            this.switchTime(val)
            this.spell = val
            this.$dispatch('clickTime')
        },
        switchTime(val) {
            switch (val) {
                case '本周':
                    this.switchDate.begin = this.getWeekStartDate
                    this.switchDate.end = this.getWeekEndDate
                    break;
                case '上周':
                    this.switchDate.begin = this.getLastWeekStart
                    this.switchDate.end = this.getLastWeekEnd
                    break;
                case '本月':
                    this.switchDate.begin = this.getMonthStartDate
                    this.switchDate.end = this.getMonthEndDate
                    break;
                case '上月':
                    this.switchDate.begin = this.getLastMonthStartDate
                    this.switchDate.end = this.getLastMonthEndDate
                    break;
                case '所有':
                    this.switchDate.begin = ''
                    this.switchDate.end = ''
                    break;
                    // default:
                    //   n 与 case 1 和 case 2 不同时执行的代码
            }
        },
    }
}
</script>
<style lang="scss" scoped>
span>a {
    margin-left: 20px;
    cursor: pointer;
}

span>a.active {
    color: red;
}
</style>
