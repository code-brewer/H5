<template>
	<div class="music-opt__container">
		<edit-btn @click="showForm=true"></edit-btn>
		<h3 class="music-opt__title"
		    :style="{'color': activityConfig.game.question.color,
																						'font-size': activityConfig.game.question.fontSize}">
																				题目:{{activityConfig.game.question.text}}
																			</h3>
		<ul class="music-opt__lists">
			<template v-if="activityConfig.game.optionType == 'txt'">
				<li v-for="item in activityConfig.game.options.txt">
					<div class="item"><span class="title">{{item.option}}</span></div>
				</li>
			</template>
			<template v-else>
				<li v-for="item in activityConfig.game.options.img">
					<div class="item"><img :src="item.url"
						     alt=""></div>
				</li>
			</template>
		</ul>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel"
			     @click="colseColor">
				<div class="title">编辑</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<div class="content">
					<div class="spane">
						<div class="label">
							题目设置
						</div>
						<div class="nr">
							<p class="col">
								<span>
																										文字：
																									</span>
								<input type="text"
								       class="form-control"
								       v-model="activityConfig.game.question.text" />
							</p>
							<p class="col">
								<span style="line-height: 1.6;">
																										颜色：
																									</span>
								<i :style="{'background-color':activityConfig.game.question.color}"
								   @click.stop="openColor(0)"></i>
								<div v-show="selectColor"
								     class="components-wrap"
								     @click.stop>
									<Sketch :colors.sync="colors"></Sketch>
								</div>
							</p>
							<p class="col">
								<span style="line-height: 1.2;">
																										大小：
																									</span>
								<slider max="3"
								        min="0"
								        step="0.1"
								        style="width: 300px;"
								        :value.sync="fontSize">
								</slider>
							</p>
						</div>
					</div>
					<div class="spane"
					     style="margin-bottom: 0;">
						<div class="label">
							答案设置
						</div>
						<div class="nr">
							<p class="col"
							   style="line-height: 1.8;">
								<radio name="optionType"
								       :model.sync="activityConfig.game.optionType"
								       value="txt">
									文字
								</radio>
								<radio name="optionType"
								       :model.sync="activityConfig.game.optionType"
								       value="img">
									图片
								</radio>
							</p>
							<template v-if="activityConfig.game.optionType == 'txt'">
								<p class="col"
								   v-for="item in activityConfig.game.options[activityConfig.game.optionType]"
								   trackby="$index">
									<span>
																											{{$index == 0 ? '正确选项：' : '错误选项：'}}
																										</span>
									<input type="text"
									       class="form-control"
									       v-model="item.option" />
								</p>
							</template>
							<template v-else>
								<div class="col music-options__uploadpic">
									<div class="music-option__upload"
									     v-for="item in activityConfig.game.options[activityConfig.game.optionType]"
									     trackby="$index">
										<span class="title">{{$index == 0 ? '正确选项：' : '错误选项：'}}</span>
										<upload-thumb :img-url.sync="item.url"
										              :config="uploadConfig"></upload-thumb>
									</div>
								</div>
							</template>
						</div>
					</div>
					<div class="spane"
					     style="margin-bottom: 0;">
						<div class="label">
							歌曲设置
						</div>
						<div class="nr">
							<p class="col"
							   style="line-height: 1.8;">
								<radio name="fileType"
								       value="url"
								       :model.sync="activityConfig.game.fileType">歌曲编码</radio>
								<radio name="fileType"
								       value="upload"
								       :model.sync="activityConfig.game.fileType">上传音频</radio>
							</p>
							<p class="col music-options__filetype">
								<template v-if="activityConfig.game.fileType == 'url'">
									<div class="music-options__search">
										<input type="text"
										       class="form-control fileurl"
										       v-model="songid" />
										<a href="javascript:;"
										   class="btn btn-default"
										   @click="searchMusic">搜索</a>
									</div>
									<div class="music-options__current">
										当前使用歌曲：{{ activityConfig.game.musicUrl[activityConfig.game.fileType] ? activityConfig.game.musicUrl[activityConfig.game.fileType] : '暂未设置播放歌曲' }}
									</div>
									<ol class="music-options__lists">
										<li v-for="list in songlists"
										    track-by="$index">
											{{list.song_name}}
											<a href="javascript:;"
											   @click="setMusicurl(list.song_url)">设置</a>
										</li>
									</ol>
								</template>
								<template v-else>
									<div class="music-options__fileupload">
										<audio-upload></audio-upload>
									</div>
								</template>
							</p>
						</div>
					</div>
				</div>
			</div>
		</modal>
	</div>
</template>
<script>
import jQuery from 'jquery'
import editBtn from '../../../../../components/edit-btn.vue'
import uploadThumb from '../../../../../../components/web-base/uploadThumb'
import modal from '../../../../../../components/bootstrap/Modal.vue'
import { Sketch } from '../../../../../../components/vue-color/vue-color.js'
import slider from '../../../../../../components/web-base/slider.vue'
import radio from '../../../../../../components/web-base/radio.vue'
import audioUpload from '../AudioUpload/AudioUpload'
import api from '../../../../../../api'
import utils from '../../../../../../utils'

export default {
	components: {
		editBtn,
		uploadThumb,
		modal,
		Sketch,
		radio,
		slider,
		audioUpload
	},
	data() {
		var activityConfig = window.store.activityConfig
		return {
			activityConfig,
			showForm: false,
			selectColor: false,
			isColor: false,
			fontSize: 0,
			songid: '',
			songlists: [],
			colors: {
				hex: '#194d33',
				a: 1
			},
			uploadConfig: {
				width: "100%", // 宽度
				height: "200px",
				onlyFile: true,
				fileSize: 5120000, // 上传文件的大小
				multiple: false, // 是否可以多个文件上传
				dragDrop: false, // 是否可以拖动上传文件
				tailor: true, // 是否可以裁剪图片
				del: true, // 是否可以删除文件
				finishDel: false, // 是否在上传文件完成后删除预览
			},
			config: {
				bg: {},
				text: {
					color: '#fff'
				}
			}
		}
	},
	ready() {
		this.songid = this.activityConfig.game.contentId
	},
	methods: {
		openColor(type) {
			if (!this.selectColor) {
				if (type == 1) {
					this.isColor = true;
					this.colors.hex = this.config.bg.color;
				}
				else {
					this.isColor = false;
					this.colors.hex = this.activityConfig.game.question.color;
				}
				this.selectColor = true;
			}
		},
		colseColor() {
			if (this.selectColor) {
				if (this.isColor)
					this.config.bg.color = this.colors.hex;
				else
					this.activityConfig.game.question.color = this.colors.hex;
				this.selectColor = false;
			}
		},
		searchMusic() {
			this.$http['post']('http://huodong.10155.com/song/songCtrl/getSongUrlBySongId', {
				base: {
					reqTime: utils.formatDate(),
					proNo: '10000',
				},
				body: {
					songId: this.songid
				}
			}, (back) => {
				if (back.resCode == 0) {
					this.songlists = [...back.repBody]
				} else {
					alert('获取数据失败，请重新获取')
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
			this.activityConfig.game.contentId = this.songid
			this.activityConfig.game.musicUrl[this.activityConfig.game.fileType] = path + url
		}
	},
	watch: {
		fontSize(v) {
			this.activityConfig.game.question.fontSize = v + "rem";
		},
		'activityConfig.game.question.fontSize'(v) {
			this.fontSize = + v.split("rem")[0];
		}
	}
}
</script>
<style lang="scss">
$ratio: 750/320;
@import '../../../../../_base_config.scss';
@import './common.scss';
@import './music-options.config.scss';
</style>