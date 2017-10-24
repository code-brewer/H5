<template>
    <div class="history__wrapper"
         v-el:wrapper
         :style="{'background-color': activityConfig.common.bg}">
        <div class="history__container"
             v-show="activityConfig.history_a.imgUrl || activityConfig.history_b.imgUrl">
            <div class="history__title">
                <a :href="activityConfig.more"
                   @click="historyMore"
                   class="pull-right">查看更多</a>
                <span class="title">往期回顾</span>
            </div>
            <div class="history__row">
                <span class="history__item"
                      v-show="activityConfig.history_a.imgUrl">
                                    <a :href="activityConfig.history_a.href"
                                        @click="historyLeft">
                                        <img :src="activityConfig.history_a.imgUrl" alt="">
                                    </a>
                                </span>
                <span class="history__item"
                      v-show="activityConfig.history_b.imgUrl">
                                    <a :href="activityConfig.history_b.href"
                                        @click="historyRight">
                                        <img :src="activityConfig.history_b.imgUrl" alt="">
                                    </a>
                                </span>
            </div>
        </div>
    </div>
</template>
<script>
import Statistics from '../../../statistics.js'
import sapi from '../../../../../service'
import utils from '../../../../../../utils'
export default {
    components: {
    },
    data() {
        var activityConfig = window.store.activityConfig
        var configData = window.store.configData

        activityConfig.more = this.formateUrl(activityConfig.more)
        activityConfig.history_a.href = this.formateUrl(activityConfig.history_a.href)
        activityConfig.history_b.href = this.formateUrl(activityConfig.history_b.href)

        return {
            activityConfig,
            configData
        }
    },
    methods: {
        formateUrl(url) {
            if (!/^(http:\/\/)/.test(url) && url) {
                return 'http://' + url
            } else {
                return url
            }
        },
        historyMore() {
            sapi.pvLog(this, {
                gateModel: 'more',
                channelld: utils.getQueryStringByName('channle'),
                browserClient: window.navigator.userAgent
            }, (back) => { })
            Statistics.historyMore()
        },
        historyLeft() {
            sapi.pvLog(this, {
                gateModel: 'banner1',
                channelld: utils.getQueryStringByName('channle'),
                browserClient: window.navigator.userAgent
            }, (back) => { })
            Statistics.banner('banner1', this.activityConfig.history_a.href)
        },
        historyRight() {
            sapi.pvLog(this, {
                gateModel: 'banner2',
                channelld: utils.getQueryStringByName('channle'),
                browserClient: window.navigator.userAgent
            }, (back) => { })
            Statistics.banner('banner2', this.activityConfig.history_b.href)
        }
    },
    ready() {
    }
}
</script>
<style lang="scss" src="./HistoryActivity.scss"></style>