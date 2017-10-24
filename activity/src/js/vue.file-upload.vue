<template>
	<div class="{{ class }}">
		<input type="file" :name="name" :id="id||name" accept="{{ accept }}" v-on:click="fileInputClick" v-on:change="fileInputChange" multiple="{{ multiple }}">
		<slot></slot>
		<button type="button" class="btn btn-default" v-on:click="clickInput" v-show="displaybtn">上传</button>
	</div>
</template>
<script>
	export default {
		props: {
			class: String,
			name: {
				type: String,
			},
			id: String,
			action: {
				type: String,
				required: true
			},
			accept: String,
			multiple: String,
			auto: Boolean,
			displaybtn: {
				type: Boolean,
				default: true
			},
			form: Object,
			headers: Object,
			uploadctrol: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				myFiles: []
			}
		},
		watch: {
			uploadctrol(val) {
				if(val) {
					this.fileUpload();
					this.uploadctrol = false;
				}
			},
		},
		methods: {
			fileInputClick: function() {
				// click actually triggers after the file dialog opens
				this.$dispatch('onFileClick', this.myFiles);
			},
			fileInputChange: function() {
				// get the group of files assigned to this field
				var ident = this.id || this.name
				this.myFiles = document.getElementById(ident).files;
				this.$dispatch('onFileChange', this.myFiles);
				if(this.auto && this.myFiles.length) {
					this.fileUpload();
				}
			},
			clickInput: function() {
				var ident = this.id || this.name
				var inputEl = document.getElementById(ident);
				inputEl.click();
			},
			_onProgress: function(e) {
				// this is an internal call in XHR to update the progress
				e.percent = (e.loaded / e.total) * 100;
				this.$dispatch('onFileProgress', e);
			},
			_handleUpload: function(file) {
				this.$dispatch('beforeFileUpload', file);
				var form = new FormData();
				var xhr = new XMLHttpRequest();
				try {
					form.append('Content-Type', file.type || 'application/octet-stream');
					// our request will have the file in the ['file'] key
					form.append('file', file);
					if(this.form) {
						for(var i in this.form) {
							form.append(i, this.form[i]);
						}
					}
				} catch(err) {
					this.$dispatch('onFileError', file, err);
					return;
				}

				return new Promise(function(resolve, reject) {

					xhr.upload.addEventListener('progress', this._onProgress, false);

					xhr.onreadystatechange = function() {
						if(xhr.readyState < 4) {
							return;
						}
						if(xhr.status < 400) {
							var res = JSON.parse(xhr.responseText);
							file._id = this.id || this.name;
							this.$dispatch('onFileUpload', file, res);
							resolve(file);
						} else {
							var err = JSON.parse(xhr.responseText);
							err.status = xhr.status;
							err.statusText = xhr.statusText;
							this.$dispatch('onFileError', file, err);
							reject(err);
						}
					}.bind(this);

					xhr.onerror = function() {
						var err = JSON.parse(xhr.responseText);
						err.status = xhr.status;
						err.statusText = xhr.statusText;
						this.$dispatch('onFileError', file, err);
						reject(err);
					}.bind(this);

					xhr.open('POST', this.action, true);
					if(this.headers) {
						for(var header in this.headers) {
							xhr.setRequestHeader(header, this.headers[header]);
						}
					}
					xhr.send(form);
					this.$dispatch('afterFileUpload', file);
				}.bind(this));
			},
			fileUpload: function() {
				if(this.myFiles.length > 0) {
					// a hack to push all the Promises into a new array
					var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function(file) {
						return this._handleUpload(file);
					}.bind(this));
					// wait for everything to finish
					Promise.all(arrayOfPromises).then(function(allFiles) {
						this.$dispatch('onAllFilesUploaded', allFiles);
					}.bind(this)).catch(function(err) {
						this.$dispatch('onFileError', this.myFiles, err);
					}.bind(this));
				} else {
					// someone tried to upload without adding files
					var err = new Error("No files to upload for this field");
					this.$dispatch('onFileError', this.myFiles, err);
				}
			}
		},
		events: {
			click(name) {
				if(!name) this.clickInput();
				if(name == this.name) this.clickInput();
			}
		}
	}
</script>