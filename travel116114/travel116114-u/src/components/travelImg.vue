<template>
    <div style="background-repeat: no-repeat;background-image :url(./static/images/image116114.png);background-size: 100%;" >
        <img src="./../images/image116114.png" width="100%" v-if="!ready">
        <img v-lazy="imgUrl" v-on:load="loaded" style="width: 100%; transition: all 0.8s ease;" v-bind:style="{'opacity':ready?1:0}" v-else>

    </div>
</template>
<script>
export default {
	props : {
		imgUrl : {
			type : String,
			default : ''
		}
	},
    created(){
        var img = new Image();
        img.src = this.imgUrl;
        img.onload=()=>{
            this.ready=true;
        }
    },
	mounted() {
	    
	},
    data() {
            return {
            	ready : false
            }
        },
        methods: {
            loaded() {
                const self = this;
                setTimeout(function() {
                    self.ready = true

                }, 100)
            }

        },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img[lazy=loading] {
    width: 100%;
    height: auto;
    margin: auto;
    max-height: 200px;
}
img[lazy=error] {
    width: 100%;
    height: auto;
    margin: auto;
    max-height: 350px;
}
</style>
