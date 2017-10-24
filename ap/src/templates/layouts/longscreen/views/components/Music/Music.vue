<template>
    <div class="music__wrapper"
         :style="{'top': positionY+'px'}"
         v-el:dragwrapper>
        <div class="music__component"
             v-el:dragcontainer>
            <span class="music__btn"
                  @click="play"><i class="icon icon-play"></i></span>
            <span class="music__btn"
                  @click="orderBell(musicSongid, musicMemberSongid, musicTitle, musicIndex)"><i class="icon icon-bell"></i></span>
            <span class="music__title">{{musicTitle}}</span>
            <audio :src="musicPath"
                   v-show="false"
                   v-el:audio></audio>
        </div>
    </div>
</template>
<script>
import sapi from '../../../../../service'
import utils from '../../../../../../utils'
import Statistics from '../../../statistics.js'

export default {
    components: {
    },
    props: {
        posY: {
            type: Number,
            default: 0
        },
        musicTitle: {
            type: String,
            default: ''
        },
        musicId: {
            type: String,
            default: ''
        },
        musicMemberSongid: {
            type: String,
            default: ''
        },
        musicSongid: {
            type: String,
            default: ''
        },
        musicUrl: {
            type: String,
            default: ''
        },
        musicIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        var activityConfig = window.store.activityConfig
        return {
            activityConfig,
            positionY: 0,
            musicPath: ''
        }
    },
    ready() {
        this.positionY = window.innerWidth / 303 * this.posY
        this.musicPath = this.musicUrl + '?user=null&channelID=' + utils.getQueryStringByName('channle') + '&contentid=' + this.musicSongid
    },
    methods: {
        play(e) {  // 播放当前歌曲
            // 统计试听
            sapi.pvLog(this, {
                gateModel: 'part' + (this.$root.activeMusicid + 1) + '_listen',
                channelld: utils.getQueryStringByName('channle'),
                browserClient: window.navigator.userAgent
            }, (back) => { })
            Statistics.listen(this.$root.activeMusicid)

            let playing = this.$els.audio.getAttribute('data-playing') || 'false'
            this.stop()

            if (playing === 'false') {
                [].forEach.call(document.querySelectorAll('.icon.icon-pause'), (icon, index) => {
                    icon.className = "icon icon-play"
                })
                e.target.className = "icon icon-pause"
                this.$els.audio.play()
                this.$els.audio.setAttribute('data-playing', 'true')
            } else {
                e.target.className = "icon icon-play"
                this.$els.audio.load()
                this.$els.audio.setAttribute('data-playing', 'false')
            }
        },
        stop() { // 停止播放歌曲
            [].forEach.call(document.querySelectorAll('audio'), (audio, index) => {
                audio.load()
                audio.setAttribute('data-playing', 'false')
            })
        },
        orderBell(musicSongid, musicMemeberSongid, musictitle, musicindex) {
            let logined = utils.getcookie('longscreen_logined')
            this.$root.buySongId = musicSongid
            this.$root.buyMemberSongId = musicMemeberSongid
            this.$root.buySong = musictitle
            this.$root.activeMusicid = musicindex

            // 统计订购
            sapi.pvLog(this, {
                gateModel: 'part' + (this.$root.activeMusicid + 1) + '_order1',
                channelld: utils.getQueryStringByName('channle'),
                browserClient: window.navigator.userAgent
            }, (back) => { })
            Statistics.order(this.$root.activeMusicid)

            if (!!logined) { // 是否已经登录
                if (utils.getcookie('cn.easier.gsu.ring.member') === 'false') { // 没有开通炫铃功能
                    this.$dispatch('showOpenbell')
                } else {
                    this.$dispatch('showOrderbell')
                }
            } else {
                this.$dispatch('showLogin')
            }
        }
    },
    events: {

    },
}
</script>
<style lang="scss" src='./Music.scss'></style>