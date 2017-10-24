<template>
    <div class="datepicker">
        <div class="datepicker-popup" v-show="displayDayView">
            <div class="datepicker-inner">
                <div class="datepicker-body">
                    <div class="datepicker-ctrl">
                        <span class="month-btn datepicker-preBtn" @click="preNextMonthClick(0)">&lt;</span>
                        <span class="month-btn datepicker-nextBtn" @click="preNextMonthClick(1)">&gt;</span>
                        <p @click="switchMouthView">
                            {{stringifyDayHeader(currDate)}}
                        </p>
                    </div>
                    <div class="datepicker-weekRange">
                        <span v-for="w in weekRange">{{w}}</span>
                    </div>
                    <div class="datepicker-dateRange" style="padding:0 10px;">
                        <span v-for="d in dateRange" v-bind:class="d.sclass" @click="daySelect(d.date,this)">{{d.text}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="datepicker-popup" v-show="displayMouthView">
            <div class="datepicker-inner">
                <div class="datepicker-body">
                    <div class="datepicker-ctrl">
                        <span class="month-btn datepicker-preBtn" @click="preNextYearClick(0)" >&lt;</span>
                        <span class="month-btn datepicker-nextBtn"  @click="preNextYearClick(1)">&gt;</span>
                        <p @click="switchDecadeView">
                            {{stringifyYearHeader(currDate)}}
                        </p>
                    </div>
                    <div class="datepicker-mouthRange">
                        <template v-for="m in mouthNames">
                            <span v-bind:class="{'datepicker-dateRange-item-active':
                          (this.mouthNames[this.parse(this.value)&&this.parse(this.value).getMonth()]  === m) &&
                          this.currDate.getFullYear() === this.parse(this.value).getFullYear()}" @click="mouthSelect($index)">
                        {{m.substr(0,3)}}
                      </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="datepicker-popup" v-show="displayYearView">
            <div class="datepicker-inner">
                <div class="datepicker-body">
                    <div class="datepicker-ctrl">
                        <span class="month-btn datepicker-preBtn" @click="preNextDecadeClick(0)">&lt;</span>
                        <span class="month-btn datepicker-nextBtn" @click="preNextDecadeClick(1)">&gt;</span>
                        <p>
                            {{stringifyDecadeHeader(currDate)}}
                        </p>
                    </div>
                    <div class="datepicker-mouthRange decadeRange">
                        <template v-for="decade in decadeRange">
                            <span v-bind:class="{'datepicker-dateRange-item-active':
                        this.parse(this.value)&&this.parse(this.value).getFullYear() === decade.text}" @click.stop="yearSelect(decade.text)">
                        {{decade.text}}
                      </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import EventListener from './utils/EventListener.js'

export default {
    props: {
        value: {
            type: String,
            twoWay: true
        },
        format: {
            default: 'MMMM/dd/yyyy'
        },
        disabledDaysOfWeek: {
            type: Array,
            default () {
                return []
            }
        },
        displayDayView: false,
        display: false
    },
    data() {
        return {
            weekRange: ['六', '日', '一', '二', '三', '四', '五'],
            dateRange: [],
            decadeRange: [],
            currDate: new Date,
            displayMouthView: false,
            displayYearView: false,
            mouthNames: [
                '1月', '2月', '3月',
                '4月', '5月', '6月',
                '7月', '8月', '9月',
                '10月', '11月', '12月'
            ]
        }
    },
    watch: {
        currDate() {
            this.getDateRange()
        }
    },
    methods: {
        preNextDecadeClick(flag) {
            const year = this.currDate.getFullYear()
            const mouths = this.currDate.getMonth()
            const date = this.currDate.getDate()

            if (flag === 0) {
                this.currDate = new Date(year - 10, mouths, date)
            } else {
                this.currDate = new Date(year + 10, mouths, date)
            }
        },
        preNextMonthClick(flag) {
            const year = this.currDate.getFullYear()
            const month = this.currDate.getMonth()
            const date = this.currDate.getDate()


            if (flag === 0) {
                const preMonth = this.getYearMonth(year, month - 1)
                this.currDate = new Date(preMonth.year, preMonth.month, date)
            } else {
                const nextMonth = this.getYearMonth(year, month + 1)
                this.currDate = new Date(nextMonth.year, nextMonth.month, date)
            }
        },
        preNextYearClick(flag) {
            const year = this.currDate.getFullYear()
            const mouths = this.currDate.getMonth()
            const date = this.currDate.getDate()

            if (flag === 0) {
                this.currDate = new Date(year - 1, mouths, date)
            } else {
                this.currDate = new Date(year + 1, mouths, date)
            }
        },
        yearSelect(year) {
            this.displayYearView = false
            this.displayMouthView = true
            this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())
        },
        daySelect(date, el) {
            if (el.$el.classList[0] === 'datepicker-item-disable') {
                return false;
            } else {
                this.currDate = date
                this.value = this.stringify(this.currDate)
            }
        },
        switchMouthView() {
            this.displayDayView = false
            this.displayMouthView = true
        },
        switchDecadeView() {
            this.displayMouthView = false
            this.displayYearView = true
        },
        mouthSelect(index) {
            this.displayMouthView = false
            this.displayDayView = true
            this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())
        },
        getYearMonth(year, month) {
            if (month > 11) {
                year++
                month = 0
            } else if (month < 0) {
                year--
                month = 11
            }
            return {
                year: year,
                month: month
            }
        },
        stringifyDecadeHeader(date) {
            const yearStr = date.getFullYear().toString()
            const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0
            const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10
            return firstYearOfDecade + '-' + lastYearOfDecade
        },
        stringifyDayHeader(date) {
            return date.getFullYear() + '年 ' + this.mouthNames[date.getMonth()]
        },
        parseMouth(date) {
            return this.mouthNames[date.getMonth()]
        },
        stringifyYearHeader(date) {
            return date.getFullYear()
        },
        stringify(date, format = this.format) {
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const mouthName = this.parseMouth(date)

            return format
                .replace(/yyyy/g, year)
                .replace(/MMMM/g, mouthName)
                .replace(/MMM/g, mouthName.substring(0, 3))
                .replace(/MM/g, ('0' + month).slice(-2))
                .replace(/dd/g, ('0' + day).slice(-2))
                .replace(/yy/g, year)
                .replace(/M(?!a)/g, month)
                .replace(/d/g, day)
        },
        parse(str) {
            const date = new Date(str)
            return isNaN(date.getFullYear()) ? null : date
        },
        getDayCount(year, month) {
            const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

            if (month === 1) {
                if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
                    return 29
                }
                return 28
            }

            return dict[month]
        },
        getDateRange() {
            this.dateRange = []
            this.decadeRange = []
            const time = {
                year: this.currDate.getFullYear(),
                month: this.currDate.getMonth(),
                day: this.currDate.getDate()
            }
            const yearStr = time.year.toString()
            const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1
            for (let i = 0; i < 12; i++) {
                this.decadeRange.push({
                    text: firstYearOfDecade + i
                })
            }

            const currMonthFirstDay = new Date(time.year, time.month, 1)
            let firstDayWeek = currMonthFirstDay.getDay() + 1
            if (firstDayWeek === 0) {
                firstDayWeek = 7
            }
            const dayCount = this.getDayCount(time.year, time.month)
            if (firstDayWeek > 1) {
                const preMonth = this.getYearMonth(time.year, time.month - 1)
                const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
                for (let i = 1; i < firstDayWeek; i++) {
                    const dayText = prevMonthDayCount - firstDayWeek + i + 1
                    this.dateRange.push({
                        text: dayText,
                        date: new Date(preMonth.year, preMonth.month, dayText),
                        sclass: 'datepicker-item-gray'
                    })
                }
            }

            for (let i = 1; i <= dayCount; i++) {
                const date = new Date(time.year, time.month, i)
                const week = date.getDay()
                let sclass = ''
                this.disabledDaysOfWeek.forEach((el) => {
                    if (week === parseInt(el, 10)) sclass = 'datepicker-item-disable'
                })

                if (i === time.day) {
                    if (this.value) {
                        const valueDate = this.parse(this.value)
                        if (valueDate) {
                            if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
                                sclass = 'datepicker-dateRange-item-active'
                            }
                        }
                    }
                }
                this.dateRange.push({
                    text: i,
                    date: date,
                    sclass: sclass
                })
            }

            if (this.dateRange.length < 42) {
                const nextMonthNeed = 42 - this.dateRange.length
                const nextMonth = this.getYearMonth(time.year, time.month + 1)

                for (let i = 1; i <= nextMonthNeed; i++) {
                    this.dateRange.push({
                        text: i,
                        date: new Date(nextMonth.year, nextMonth.month, i),
                        sclass: 'datepicker-item-gray'
                    })
                }
            }
        }
    },
    ready() {
        this.currDate = this.parse(this.value) || this.parse(new Date())
    }
}
</script>