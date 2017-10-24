<template>
    <div class="music__wrapper"
         :style="{'top': posY+'px'}"
         v-el:dragwrapper>
        <edit-btn @click="showForm=true"></edit-btn>
        <button class="btn btn-danger btn-delete"
                @click="delItem()">删除</button>
        <div class="music__component"
             v-el:dragcontainer>
            <span class="music__btn"><i class="icon icon-play"></i></span>
            <span class="music__btn"><i class="icon icon-bell"></i></span>
            <span class="music__title">{{musicTitle}}</span>
            <audio :src="musicUrl"
                   v-show="false"
                   v-el:audio></audio>
        </div>
        <modal :show.sync="showForm"
               size="md">
            <div class="modal-panel">
                <div class="title">歌曲配置</div>
                <div class="close"
                     @click="showForm=false">X</div>
                <div class="content">
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                            <radio :name="'songtype'+musicIndex"
                                   :model.sync="musicType"
                                   value="song">整曲</radio>
                            <radio :name="'songtype'+musicIndex"
                                   :model.sync="musicType"
                                   value="ring_tone">铃音</radio>
                        </div>
                        <div class="col-sm-6 col-sm-offset-3">
                            <div class="input-group">
                                <input type="text"
                                       class="form-control"
                                       v-model="musicId"
                                       placeholder="请输入歌曲的内容ID">
                                <span class="input-group-btn">
                                            <button type="button" 
                                                    class="btn btn-default"
                                                    @click="searchMusic">
                                                    搜索
                                            </button>
                                        </span>
                            </div>
                            <!-- /input-group -->
                        </div>
                        <div class="col-sm-6 col-sm-offset-3">
                            <p class="music-options__lists">
                                {{songlists.song_name}}
                            </p>
                            <p>{{message}}</p>
                        </div>
                        <div class="col-sm-6 col-sm-offset-3">
                            <button class="btn btn-primary"
                                    @click="saveMusic()" :disabled="disabled">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        <confirm :show.sync="confirmConfig.show"
                 :fun-name="confirmConfig.funName">
            <div slot="content">
                {{confirmConfig.msg}}
            </div>
        </confirm>
    </div>
</template>
<script>
import radio from '../../../../../../components/web-base/radio'
import modal from '../../../../../../components/bootstrap/Modal.vue'
import editBtn from '../../../../../components/edit-btn.vue'
import confirm from '../../../../../../components/web/confirm'
import api from '../../../../../../api'
import utils from '../../../../../../utils'
export default {
    components: {
        radio,
        modal,
        editBtn,
        confirm
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
            showForm: false,
            dragable: false,
            confirmConfig: {
                show: false,
                msg: '确定要删除吗?',
                funName: 'song'
            },
            songlists: [],
            musicType: 'song',
            message: '',
            maxHeight: 0,
            clear: null,
            disabled: 'disabled'
        }
    },
    ready() {
        this.init()
    },
    methods: {
        init() {
            this.$els.dragcontainer.addEventListener('mousedown', (e) => {
                this.dragStart()
            }, false)

            this.$els.dragcontainer.addEventListener('mouseup', () => {
                this.dragEnd()
            })

            this.$els.dragcontainer.addEventListener('mouseout', () => {
                this.clear = setTimeout(()=>{
                    this.dragEnd()
                }, 500)
            })

            this.$els.dragcontainer.addEventListener('mouseover', () => {
                if(this.clear) {
                    clearTimeout(this.clear)
                }
            })

            this.$els.dragwrapper.parentElement.addEventListener('mousemove', (e) => {
                this.draging(e)
            })
        },
        dragStart() {
            this.dragable = true
            this.$els.dragwrapper.style.opacity = 0.75
            this.posY = parseInt(document.defaultView.getComputedStyle(this.$els.dragwrapper).top, 10)
        },
        draging(e) {
            this.maxHeight = document.querySelector('.longscreen-bg').offsetHeight - 29
            if (this.dragable) {
                let height = parseInt(document.defaultView.getComputedStyle(this.$els.dragwrapper).top, 10) + e.movementY
                this.$els.dragwrapper.style.opacity = 0.75
                this.posY = height > this.maxHeight ? this.maxHeight : height
            }
        },
        dragEnd() {
            this.dragable = false
            this.$els.dragwrapper.style.opacity = 1
        },
        delAppinfo() {
            let length = this.activityConfig.musics.length
            this.activityConfig.musics.forEach((music, index) => {
                if (music.musicIndex == this.musicIndex) {
                    let source_arr_left = [].concat(this.activityConfig.musics)
                    let source_arr_right = [].concat(this.activityConfig.musics)
                    let arrLeft = source_arr_left.splice(0, index)
                    let arrRight = source_arr_right.splice(index + 1, length)
                    this.activityConfig.musics = [].concat(arrLeft, arrRight)
                }
            })
        },
        delItem() {
            this.confirmConfig.msg = "您确定要删除吗?";
            this.confirmConfig.funName = "del";
            this.confirmConfig.show = true;
        },
        searchMusic() {
            api.getSongUrlByContentId(this, {
                contentId: this.musicId,
                type: this.musicType
            }, (back) => {
                if (back.resCode == 0) {
                    this.songlists = back.repBody
                    if(back.repBody.song_id) {
                        this.disabled = false
                    }
                } else {
                    // alert('')
                    this.message = '获取数据失败，请重新获取'
                }
            })

            // api.getSongUrlBySongId(this, { songId: this.songid }, (back) => {
            // 	if (back.resCode == 0) {
            // 		this.songlists = [...back.repBody]
            // 	}
            // })
        },
        setMusicurl(url) {
            let path = 'http://a.10155.com'
            this.activityConfig.game.musicUrl[this.activityConfig.game.fileType] = path + url
        },
        saveMusic() {
            if (this.songlists) {
                this.musicTitle = this.songlists.song_name
                this.musicUrl = 'http://a.10155.com' + this.songlists.song_url
                this.musicMemberSongid = this.songlists.member_song_id
                this.musicSongid = this.songlists.song_id
            }
            this.showForm = false
        }
    },
    events: {
        sure(funName) {
            if (funName == "del") {
                this.delAppinfo();
            }
        }
    },
    watch: {
        'showForm'(v, o){
            if(!v) {
                this.disabled = 'disabled'
            }
        }
    }
}
</script>
<style lang="scss" src='./Music.scss' scoped></style>