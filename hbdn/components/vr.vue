<template>
	<section @click.self="closeVideo" class="model" style="position: absolute;box-sizing: border-box;z-index: 999" v-if="isShowVideo">
            <div class="panel">
                <div class="msg">
                    <video id="media" v-el:video>
						<source src="images/vr.mp4" type="video/mp4" />
					</video>
                </div>
                
            </div>
            
	</section>
</template>

<script>
	export default {
		props : {
			isShowVideo : {
				Boolean ,
				default : false,
			}
		},
		methods : {
			closeVideo () {
				this.isShowVideo = false;
			}
		},
		watch : {
			isShowVideo (val) {
				if (val) {
					this.$els.video.play()
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	video {
		width: 100%;
	}
</style>