<template>
    <div>
        <div  style="background-size:100%;background-image :url(./static/images/a116114300.png);" >
            <img :src="imgUrl"  v-on:load="loaded" style="width: 100%; transition: all 0.8s ease;" v-bind:style="{'opacity':ready?1:0}">
        </div>
       	
        
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
image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
image[lazy=error] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>
