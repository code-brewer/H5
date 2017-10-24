<template>
	<div class="label-inline condition-view">
		<div class="form-group" v-el:cardItem>
			<div v-for="(index,cartItem) in collectionPic">
				<p>卡片名称：<input type="text" v-model="cartItem.picname" @blur="nameBlur(cartItem.picname,$index)" placeholder="不能超过7个字" class="title"></p>
				<p>数量：<input @blur="origBlur(cartItem.origincnt,$index)" type="number" min="0" v-model="cartItem.origincnt" class="number"></p>
				<p>概率：<input class="cartItemOdds" type="number" v-model="cartItem.odds" @focus="setfocus(cartItem.odds,index)" @blur="checked(index)" class="probability" placeholder="概率不能超过百分比">%</p>
				<p>
					<img :src="cartItem.picurl" @click="clickInput('cartUpload_'+index)" v-if="cartItem.picurl" class="upload-image">
					<file-upload :name="'cartUpload_'+index" v-show="false" action="upload/upVideoOrFile" :auto="true" class="upload-btn" :displaybtn="!cartItem.picurl">
					</file-upload>
				</p>
				<p>
					<a v-show="showDel" class="del-btn">
						<i class="fa fa-minus-square" @click="del(index, cartItem)"></i>
					</a>
				</p>
			</div>
			<div class="add-btn" @click="add" v-show="showAdd">
				<a>添加</a>
			</div>
		</div>

		<loading :show-msg.sync="loadConfig.show" :msg="loadConfig.msg"></loading>
	</div>
</template>
<script>
	import Vue from 'vue'
	import loading from '../../../components/web-base/loading.vue'
	export default {
		data() {
				var collectionPic = window.store.configData.collectionPic;
				var configData = window.store.configData;
				return {
					collectionPic,
					configData,
					showAdd: true,
					showDel: true,
					copyOdds: 0,
					oldIndex: "",
					loadConfig: {
						show: false,
						msg: ''
					}
				}
			},
			components: {
				'file-upload': require('../../../js/vue.file-upload.vue'),
				loading
			},
			watch: {
				'collectionPic.length' (v) {
					if(v < 6)
						this.showAdd = true;
					else
						this.showAdd = false;
					if(v <= 3)
						this.showDel = false;
					else
						this.showDel = true;
				},
				copyOdds(v) {
					console.log(v)
				}
			},
			ready() {
				if(this.collectionPic.length <= 3)
					this.showDel = false;
				else
					this.showDel = true;
				for(var i = 0; i < this.collectionPic.length; i++) {
					this.collectionPic[i].odds = ~~this.collectionPic[i].odds;
				}
			},
			methods: {
				origBlur(value, i) {
					console.log(2233)
					if(!/^[0-9]+$/.test(value.toString())) {
						
						this.loadConfig.show = true;
						this.loadConfig.msg = "卡片数量不能小于0张";
						this.collectionPic[i].origincnt = 0;
					}
				},
				nameBlur(value, i) {
					if(value.length >= 7) {
						this.loadConfig.show = true;
						this.loadConfig.msg = "卡片名称不能超过7个字";
						this.collectionPic[i].picname = value.substring(0, 7);
					}
				},
				setfocus(v, index) {
					this.copyOdds = v;
					if(this.oldIndex.indexOf("_") == -1 && this.oldIndex.length == 0) {
						this.oldIndex = index.toString();
					} else if(this.oldIndex.indexOf("_") == -1 && this.oldIndex.length != 0) {
						if(this.oldIndex != index) {
							this.oldIndex += ("_" + index);
						}
					} else {
						if(this.oldIndex.split("_")[1] != index) {
							this.oldIndex = (this.oldIndex.split("_")[1] + "_" + index);
						}
					}
				},
				checked(index) {
					this.collectionPic[index].odds = ~~this.collectionPic[index].odds;
					var count = 0;
					for(var i = 0; i < this.collectionPic.length; i++) {
						count += ~~this.collectionPic[i].odds;
					}
					if(count <= 100) {
						if(this.oldIndex.indexOf("_") == -1) {
							if(this.collectionPic.length != (index + 1))
								this.collectionPic[index + 1].odds = ~~this.collectionPic[index + 1].odds + (100 - count);
							else
								this.collectionPic[index - 1].odds = ~~this.collectionPic[index - 1].odds + (100 - count);
						} else {
							this.collectionPic[~~this.oldIndex.split("_")[0]].odds = ~~this.collectionPic[~~this.oldIndex.split("_")[0]].odds + (100 - count);
						}
					} else {
						this.collectionPic[index].odds = ~~this.copyOdds;
					}
				},
				clickInput(name) {
					this.$broadcast("click", name);
				},
				del(index, item) {
					if(this.collectionPic.length > 3) {
						this.collectionPic.splice(index, 1);
						if(item.id) {
							if(this.configData.delCardIds.length > 0) {
								this.configData.delCardIds += "_" + item.id;
							} else {
								this.configData.delCardIds += item.id;
							}
						}
					}
					var count = 0,
						setIndex = index == 0 ? 0 : index - 1;
					for(var i = 0; i < this.collectionPic.length; i++) {
						count += ~~this.collectionPic[i].odds;
					}
					this.collectionPic[setIndex].odds = ~~this.collectionPic[setIndex].odds + (100 - count);
				},
				add() {
					if(this.collectionPic.length < 6)
						this.collectionPic.push({
							picname: '卡片', //卡名
							origincnt: '1', //卡数
							odds: '0', //卡概率
							picurl: 'http://211.147.242.132:9008/fsd/ap/20160805/88_e125d1b6_d6f0_447b_9e91_22fbfa439226.jpg', //卡地址
							href: '',
							name: ''
						});
					this.$nextTick(() => {
						document.getElementsByClassName("cartItemOdds")[document.getElementsByClassName("cartItemOdds").length - 1].focus();
					})
				}
			},
			events: {
				onFileChange(file) {
					this.fileProgress = 0;
					this.allFilesUploaded = false;
				},
				beforeFileUpload(file) {
					this.$dispatch('progress', 1)
				},
				onFileProgress(progress) {
					console.log('onFileProgress', progress);
					this.fileProgress = progress.percent;
				},
				onFileUpload(file, res) {
					if(res.resCode == 0) {
						this.$dispatch('progress', 0);
						this.collectionPic[~~(file._id.split("_")[1])].picurl = res.repBody.fileUrl;
					}
				},
				onFileError(file, res) {
					console.error('onFileError', file, res);
				},
				onAllFilesUploaded(files) {
					console.log('onAllFilesUploaded', files);
					this.allFilesUploaded = true;
				}
			}
	}
</script>

<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	@media (max-width: 1300px) {
		.condition-view {
			.form-group {
				p {
					margin-right: 7px!important;
				}
			}
		}
	}
	
	.condition-view {
		margin-top: 0;
		.form-group {
			width: 100%;
			.add-btn {
				width: 558px;
				height: 102px;
				background-color: #f8f8f8;
				border: 1px dashed #ccc;
				a {
					display: block;
					line-height: 10;
					position: relative;
					color: #000;
					text-align: center;
					cursor: pointer;
					&:hover {
						text-decoration: none;
					}
					&::before {
						display: block;
						content: " ";
						border-right: 2px solid #669be6;
						height: 16px;
						top: 27px;
						left: 50%;
						position: absolute;
						margin-left: -1px;
					}
					&::after {
						display: block;
						content: " ";
						border-top: 2px solid #669be6;
						top: 34px;
						position: absolute;
						left: 50%;
						width: 16px;
						margin-left: -8px;
					}
				}
			}
			p {
				&:last-child {
					padding-left: 0px;
				}
				display: inline-block;
				padding-left: 10px;
				margin-right: 15px;
				.title {
					width: 94px;
					height: 34px;
				}
				.number,
				.cartItemOdds {
					width: 64px;
					height: 34px;
				}
				.probability {
					width: 34px;
					height: 34px;
				}
				.upload-image {
					height: 102px;
					width: 70px;
				}
				.short-input {
					width: 55px;
					text-align: center;
				}
				.fa {
					display: inline-block;
					font: normal normal normal 14px/1 FontAwesome;
					font-size: inherit;
					text-rendering: auto;
					-webkit-font-smoothing: antialiased;
					cursor: pointer;
				}
			}
		}
	}
</style>