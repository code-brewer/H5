<template>
	<div class="form form-small web-editor__wrapper">
		<textarea name="app-ckeditor"
		          :id="textareaEditor"
		          v-model="ruleContent"></textarea>
	</div>
</template>

<script>

export default {
	props: {
		ruleContent: {
			type: String,
			default: '请输入内容...'
		},
		textareaEditor: {
			type: String,
			required: true
		},
		toolbar: {
			type: Object,
			default: () => {
				return [
					['Font', 'FontSize'],
					['Bold', 'Italic', 'Underline'],
					['JustifyLeft', 'JustifyCenter', 'JustifyRight']
				]
			}
		}
	},
	created() {
		this.ruleContent = this.ruleContent == '' ? '请输入内容...' : this.ruleContent
	},
	data() {
		return {
		}
	},
	ready() {
		this.loadCkeditor();
	},
	methods: {
		/*加载Ckeditor*/
		loadCkeditor() {
			var that = this
			window.CKEDITOR_BASEPATH = basePath + 'src/js/ckeditor/'

			diyRequire('src/js/ckeditor/ckeditor.js', () => {
				that.ck = CKEDITOR.replace(that.textareaEditor, {
					toolbar: that.toolbar
				})

				that.ck.on('change', updateModel)

				that.ck.on('focus', function () {
					let initContent = that.ck.getData()
					if(initContent.indexOf('请输入内容...') > -1) {
						that.ck.setData('')
					}
				});

				that.ck.on('blur', function () {
					let initContent = that.ck.getData()
					if(!initContent) {
						that.ck.setData('请输入内容...')
					}
				});

				function updateModel() {
					that.ruleContent = that.ck.getData()
				}
			});
		}
	},
	events: {

	}
}

function diyRequire(path, func) {
	var isExist = false;

	for (var i = 0, scripts = document.getElementsByTagName("script"); i < scripts.length; i++) {
		if (scripts[i].src.indexOf(path) > -1) {
			isExist = true;
		}
	};
	if (!isExist) {
		var newScript = document.createElement('script');
		newScript.src = path;
		document.getElementsByTagName("head")[0].appendChild(newScript);
		newScript.addEventListener('load', () => {
			func();
		})
	}
	else {
		func();
	}
	return isExist;
}
</script>
<style lang="scss">
@import './WebEditor.scss';
</style>