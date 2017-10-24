<template>
	<div class="button-style-panel">
        <div class="top">
            <ul>
                <li>
                    <span class="button-style button-style-default"></span>
                    <radio name="button-style" value="picture"></radio>
                </li>
                <li>
                    <span class="button-style button-style-circle"></span>
                    <radio name="button-style" value="picture"></radio>
                </li>
                <li>
                    <span class="button-style button-style-radius"></span>
                    <radio name="button-style" value="picture"></radio>
                </li>
            </ul>
            <div class="button-color-picker">
                <span>按钮颜色：</span>
                 <span class="color-picker-cube"></span>
            </div>
        </div>
        <div class="bottom">
            <img>
            <p>(图片格式jpg、png、gif，图片大小必须小于0.1M)</p>
            <file-upload v-show="false" name="buttonStyleUpload" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
            <span class="btn btn-primary" @click="clickInput">上传</span>
        </div>
    </div>
</template>

<script>
	import radio from '../web-base/radio'

	export default{
		components: {
			radio,
			'file-upload': require('../../js/vue.file-upload.js')
		},

		props: {
	
		},

		data(){
			return {
				
			}
		},

		watch: {
			'user.username'(val){
				this.checkUsername(val);
			}
		},

		methods: {
			clickInput() {
				this.$broadcast("click");
			},
		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	@import '../../css/bootstrap/_mixins.scss';

	.button-style-panel {
		border: 1px solid #d6d6d6;
		width: 100%;
		> div.top {
			background: #f3f3f3;
			padding: 15px;
			display: flex;
			justify-content: space-between;
			> ul {
				padding: 0;
				margin-bottom: 0;
				list-style-type: none;
				display: inline-block;
				li {
					display: inline-block;
					width: 105px;
					text-align: center;
					margin-right: 10px;
					.button-style {
						width: 100%;
						height: 34px;
						background: #ffb81d;
						display: inline-block;
						&.button-style-circle {
							@include border-radius(34px);
						}
						&.button-style-radius {
							@include border-radius(10px);
						}
					}
				}
			}

			.button-color-picker {
				display: inline-block;
				> span {
					vertical-align: middle;
				}
				.color-picker-cube {
					width: 24px;
					height: 24px;
				}
			}
		}
		> div.bottom {
			border-top: 1px dashed #a6a6a6;
			padding: 15px;
			padding-left: 90px;
			position: relative;
			img {
				position: absolute;
				top: 15px;
				left: 15px;;
				width: 60px;
				height: 60px;
			}
		}
	}
</style>