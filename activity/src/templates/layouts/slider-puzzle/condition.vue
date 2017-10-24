<template>
    <div class="label-inline">
        <span class="onse">拼图上传：</span>
        <div class="form-group pics-upload">
            <ul>
                <li class="pic-wrap" v-for="image in images">
                    <figure>
                        <img :src="image" v-if="image">
                        <span class="del-btn" @click="removePic(image)"> <i class="fa fa-times-circle"></i></span>
                    </figure>
                </li>
                <li class="upload-wrap">
                    <file-upload name="pictureUpload" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
                </li>
            </ul>
        </div>
    </div>
    <div class="label-inline">
        <span class="onse">关卡设置：</span>
        <div>
            <div class="form-group" v-for="level in levels">
                <div style="width: 80px;">
                    <span @click="selectLevelInput(level,$index)" v-show="!level.isEdit">{{level.square==2?'四宫格':level.square==3?'九宫格':level.square==4?'十六宫格':level.square==5?'二十五宫格':'超出范围'}}</span>
                    <input type="text" class="short-input" v-model="level.square" v-show="level.isEdit" @blur="level.isEdit=false" @keyup="(level.square<2||/[a-zA-Z]/.test(level.square))?(level.square=2):(level.square>5)?(level.square=5):level.square" id="level-item-{{$index}}">
                </div>
                <div>
                    <span>该关卡时间限制</span>
                    <input type="number" class="short-input" placeholder="00" v-model="level.time.mins" @keyup="level.time.mins = (level.time.mins>=60)?59:(level.time.mins<=-1)?0:level.time.mins" @change="level.time.mins = (level.time.mins>=60)?59:(level.time.mins<=-1)?0:level.time.mins">
                    <span>分</span>
                    <input type="number" class="short-input" placeholder="00" v-model="level.time.secounds" @keyup="level.time.secounds = (level.time.secounds>=60)?59:(level.time.secounds<=-1)?0:level.time.secounds" @change="level.time.secounds = (level.time.secounds>=60)?59:(level.time.secounds<=-1)?0:level.time.secounds">
                    <span>秒</span>
                    <span style="margin-left: 20px;">积分</span>
                    <input type="number" class="short-input" placeholder="可填" v-model="level.score">
                    <a class="del-btn" v-if="$index!=0" @click="delLevel(level)">
                        <i class="fa fa-minus-square"></i>
                    </a>
                    <a class="add-btn" @click="addLevel($index,level)">
                        <i class="fa fa-plus-square"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    props: {
        id: {
            type: String
        }
    },
    components: {
        'file-upload': require('../../../js/vue.file-upload.js')
    },
    data() {
        var levels = window.store.activityConfig.levels;
        var images = window.store.activityConfig.images;
        return {
            images,
            levels
        }
    },
    methods: {
        addLevel(index, level) {
            if (level) {
                var levels = this.levels;
                var square = levels[levels.length - 1].square >= 5 ? 5 : levels[levels.length - 1].square + 1;
                var title = square == 2 ? '四宫格' : square == 3 ? '九宫格' : square == 4 ? '十六宫格' : square == 5 ? '二十五宫格' : '超出范围';
                var mins = square == 2 ? 0 : square == 3 ? 2 : square == 4 ? 5 : square == 5 ? 8 : 0;
                var secounds = square == 2 ? 10 : square == 3 ? 30 : square == 4 ? 0 : square == 5 ? 0 : 10;
                var score = square == 2 ? 5 : square == 3 ? 10 : square == 4 ? 15 : square == 5 ? 20 : 5;

                level = {
                    square: square,
                    title: title,
                    isEdit: false,
                    time: {
                        mins: mins,
                        secounds: secounds
                    },
                    score: score
                };
                // this.levels.splice(index, 0, level)
                this.levels.push(level);
            } else {
                var square = level.square;
                var s = level.time.mins * 60 + level.time.secounds;
                var pos = square == 2 ? 2 : square == 3 ? 30 : square == 4 ? 50 : square == 5 ? 60 : 0;
                s -= pos;
                s = square == 2 && s < 5 ? 5 : square == 3 && s < 90 ? 90 : square == 4 && s < 150 ? 150 : square == 5 && s < 300 ? 300 : s;
                var mins = Math.floor(s / 60);
                var secounds = s % 60;

                var newlevel = {
                    square: level.square,
                    title: level.title,
                    isEdit: false,
                    time: {
                        mins: mins,
                        secounds: secounds
                    },
                    score: level.score + 1
                };
                // this.levels.push(newlevel);
                this.levels.splice(index, 0, newlevel)
            }


        },
        delLevel(level) {
            this.levels.$remove(level);
        },
        selectLevelInput(level, index) {
            level.isEdit = true;
            var el = document.getElementById('level-item-' + index);
            el.focus();
            el.select();
        },
        removePic(image) {
            this.images.$remove(image)
        },
    },
    events: {
        onFileChange: function(file) {
            this.fileProgress = 0;
            this.allFilesUploaded = false;
        },
        beforeFileUpload: function(file) {
            this.$dispatch('progress', 1)
        },
        onFileProgress: function(progress) {
            console.log('onFileProgress', progress);
            this.fileProgress = progress.percent;
        },
        onFileUpload: function(file, res) {
            if (res.resCode == 0) {
                this.$dispatch('progress', 0)
                if (file._id == "pictureUpload") {
                    this.images.push(res.repBody.fileUrl)
                }

            }
        },
        onFileError: function(file, res) {
            console.error('onFileError', file, res);
        },
        onAllFilesUploaded: function(files) {
            console.log('onAllFilesUploaded', files);
            this.allFilesUploaded = true;
        }
    }
}
</script>

<style lang="scss">
@import '../../../css/bootstrap/_variables.scss';

#condition-config-content {
    .del-btn {
        display: inline-block;
        color: $brand-danger;
        margin-left: 10px;
        font-size: 18px;
        vertical-align: middle;
        cursor: pointer;
        &:hover {
            color: lighten($brand-danger, 3%);
        }
        &:active {
            color: darken($brand-danger, 6.5%);
        }
    }

    .add-btn {
        display: inline-block;
        color: $brand-success;
        margin-left: 10px;
        font-size: 18px;
        vertical-align: middle;
        cursor: pointer;
        &:hover {
            color: lighten($brand-success, 3%);
        }
        &:active {
            color: darken($brand-success, 6.5%);
        }
    }
    .form-group {
        margin-bottom: 5px;
        font-size: 12px;
        > div {
            display: inline-block;
            max-width: 100%;
        }
    }


    .short-input {
        display: inline-block;
        width: 55px;
        text-align: center;
    }

    div.pics-upload {
        overflow: hidden;
        ul {
            margin-top: -10px;
            margin-left: -10px;
            overflow: hidden;
            padding: 0;
            list-style: none;
            li {
                padding: 10px;
                float: left;
                > div, figure {
                    width: 100px;
                    height: 100px;
                    position: relative;
                    overflow: hidden;
                    img {
                        width: 100%;
                        display: block;
                    }

                    span.del-btn {
                        position: absolute;
                        right: 3px;
                        top: 3px;
                        line-height: 18px;
                        z-index: 3;
                    }
                }

                &.upload-wrap {
                    div.upload-btn {
                        
                        .btn {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            z-index: 2;
                            border: 3px dashed #eee;
                        }
                        input[type="file"] {
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            position: absolute;
                        }
                    }
                }

                &.pic-wrap {
                    text-align: center;

                    .upload-btn {
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        
                        position: absolute;
                    }
                    > span {
                        display: inline-block;
                        margin-top: 5px;
                    }
                    > small {
                        display: block;
                        color: $brand-danger;
                    }
                }
                &.upload-wrap.pic-wrap {
                    figure {
                        height: 150px;
                    }
                    a{
                        display: block;
                        width: 100px;
                        padding: 8px 0px;
                        text-decoration: none;
                        border: 1px solid #bad7e4;
                        border-radius: 5px;
                        margin-top: 5px;
                        
                    }
                }
            }
        }
    }
}

</style>
