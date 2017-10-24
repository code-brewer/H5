<template>
    <div class="history__wrapper"
         v-el:wrapper
         :style="{'background-color': activityConfig.common.bg}">
        <edit-btn @click="showForm=true"></edit-btn>
        <div class="history__container"
             v-show="activityConfig.history_a.imgUrl || activityConfig.history_b.imgUrl">
            <div class="history__title">
                <a href="#"
                   class="pull-right">查看更多</a>
                <span class="title">往期回顾</span>
            </div>
            <div class="history__row">
                <span class="history__item"
                      v-show="activityConfig.history_a.imgUrl">
                            <a href="#">
                                <img :src="activityConfig.history_a.imgUrl" alt="">
                            </a>
                        </span>
                <span class="history__item"
                      v-show="activityConfig.history_b.imgUrl">
                            <a href="#">
                                <img :src="activityConfig.history_b.imgUrl" alt="">
                            </a>
                        </span>
            </div>
        </div>
        <modal :show.sync="showForm"
               size="md">
            <div class="modal-panel"
                 @click="colseColor">
                <div class="title">往期回顾</div>
                <div class="close"
                     @click="showForm=false">X</div>
                <div class="content">
                    <div class="spane">
                        <div class="label">
                            背景颜色
                        </div>
                        <div class="nr">
                            <p class="col">
                                <i :style="{'background-color':activityConfig.common.bg}"
                                   @click.stop="openColor()"></i>
                                <div v-show="selectColor"
                                     class="components-wrap"
                                     @click.stop="">
                                    <Sketch :colors.sync="colors"></Sketch>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import vueColor from '../../../../../../components/vue-color/vue-color.js'
import modal from '../../../../../../components/bootstrap/Modal.vue'
import editBtn from '../../../../../components/edit-btn.vue'
export default {
    components: {
        modal,
        vueColor,
        editBtn,
        Sketch: vueColor.Sketch
    },
    data() {
        var activityConfig = window.store.activityConfig
        var configData = window.store.configData
        return {
            activityConfig,
            configData,
            showForm: false,
            colors: {
                a: 1,
                rgba: {
                    a: 1,
                    r: 0,
                    g: 0,
                    b: 0
                },
                hex: ''
            },
            selectColor: false,
        }
    },
    methods: {
        colseColor(e) {
            if (this.selectColor) {
                this.activityConfig.common.bg = this.colors.hex;
                this.selectColor = false;
            }
        },
        init() {
            var wrapperStyle = document.defaultView.getComputedStyle(this.$els.wrapper);
            this.activityConfig.common.bg = wrapperStyle.backgroundColor;
        },
        openColor() {
            this.colors.hex = this.activityConfig.common.bg;
            this.selectColor = true;
        }
    },
    ready() {
        this.init();
    }
}
</script>
<style lang="scss" src="./HistoryActivity.scss"></style>