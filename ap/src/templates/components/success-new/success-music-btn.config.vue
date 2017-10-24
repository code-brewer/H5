<template>
	<div class="success-music-btn"
	     v-el:musicbtn
	     :style="{'background-image':(activityConfig.success.completeMusicImg!=''?'url('+activityConfig.success.completeMusicImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.success.completeMusicImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.success.completeMusicImg"
				              :config="uploadConfig"
				              :default-image="defaultImg">
				</upload-image>
				<div class="nr">
					<p class="col"
					   style="line-height: 1.8;">
						<span>
		    					跳转链接：
		    				</span>
						<input type="text"
						       class="form-control"
						       v-model="activityConfig.success.completeLink"
						       style="margin-left: 24px; display: inline-block; width: 300px; margin-top: -50px;" />
					</p>
				</div>
			</div>
		</modal>
	</div>
</template>
<script>
import uploadImage from '../../../components/web/uploadImage/uploadImage.vue'
import editBtn from '../edit-btn.vue'
import modal from '../../../components/bootstrap/Modal.vue'
export default {
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			activityConfig,
			showForm: false,
			uploadConfig: {
				setImage: null,
				width: "100%",                 // 宽度
				height: "185px",
				onlyFile: true,
				fileSize: 5120000,                // 上传文件的大小
				multiple: false,                   // 是否可以多个文件上传
				dragDrop: false,                   // 是否可以拖动上传文件
				tailor: true,                    // 是否可以裁剪图片
				del: true,                    // 是否可以删除文件
				finishDel: true,  				  // 是否在上传文件完成后删除预览
			},
			defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAABGCAMAAAAeo0PqAAAATlBMVEUAAADv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vrv8vocadfAAAAAGXRSTlMAd5m7It5EZjJWEIjuzKr5BpLkONqsU/Om6AOYygAAA6lJREFUaN7tm4tyqyAQhncVkIumSZO05f1f9LgCxYi3iXVyhvjPtKGhrvuxC4uZAE5n9cM/bIb6vv2oM0R93WzGun1BkLGZy7wLaED9oubH5aohQ+nrpVt/KIHPn23jU0K2kh3gGUBRRDMGBZAUVQVwb18ukLUuLeIdgLcvV8ha1xaRA1Boz5C1zjRBAWwryFzEeJDmpYM0Px2k+ekgzU8HaX46SP9cElHCKxVJ/9RbhQiPqqytIBWLJquHa9D2VXYGev3DaxCrTaTL3topNUAqRvvq6LKIJmvbzJEaawUMVQa/6V82kqKdFE6Tev9Pk+OQjALIh4tT0sY3ufq/SKkPlJ2USkjxgbQvbjmAjr0MALSxozJ7kbLpXnctQipixGH2VnxAij6EzJGqx1Fs7IROT5L6FNTDeYpdVFaQMhgRc94KRGyhT4ioKA+L8Bm7hF4MTUdK/cLfGWezRTxNKuNKEUmlteUiKaFoGJEmNApnVFXaImQJD5YRiZ9I9cm/rbm1LPCm85RsPEtakBsJKZQPs0nycIf1Im+NjynxdDalbmK2kEVPSqksfYIVzis2Riq2kVaQktIgVxtmsYsLc/NU1537rLZ1QySetNSgfklrRcWz/ZvrnUiVMhMkKLeRVsmaKXxB6c0LTypUh8U7vJ1IoZqumNtI+9W21ORm6S4UALG3lkQaq82OpIWdUOGDTv6ZJ3fCLntZ22JYE7FJ62mPtNmbVI+46UgFTpU1vW5vKcIvQeMlKU3KsT2S97VZGv6NpJjKEOlc9pr53C58TFn4xXoFScqENFTYfUlHFUhPrhEVFs4F0qU5npIKasgXkbr7l5hoO2k6T9H17DpPMZWJpOMq+zuEKtoSa58diuHa2zizu5IySCTXk3Jb64R09iZpPXVvcCpPL6gyZh1pRc4+RVoimkjaNrFsf3YgXUoytYqU1QEiJWXEMTac1XDf62LMlLU124F0PqgIa0h142g2kno7RNbsQ7osMbZB0oFUcbcl9zLWnhLSuexFT6obZ4fVv6t68bdPbcu1QMxVW794/krE7tV75pOxtsFgR9jFJ/G9SHU9v/9vHmJ1Wksad/gEVaDlMjwKL326shcpiFFU4641amiuWUU6SHGNvXcMtXUxURBe/xn+y3WQ5qeDND8dpPnpIM1PB2l+ejfS7/y/na7dt9Nvb3Pi4H1OkbzPyaD3Oe0Fyp/gy3JZOvsTfOq9TmXSjM1cl/c7PQ1wVvc8T8R/8Ls/Ef8PRCK+AZiEdxgAAAAASUVORK5CYII='
		}
	},
	components: {
		editBtn,
		modal,
		uploadImage
	},
	ready() {
		this.$on('show-edit', () => {
			this.showForm = !this.showForm;
		})
		this.init();
	},
	watch: {
		'activityConfig.success.completeMusicImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var btn = document.defaultView.getComputedStyle(this.$els.musicbtn);
			this.activityConfig.success.completeMusicImg = btn.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.success.completeMusicImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.success.completeMusicImgH = (this.$els.musicbtn.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>
