<template>
    <div class="bar" align="center">
        <!-- <img :src="bar.select?bar.slectUrl:bar.imgUrl"> -->
        <!-- <img :src="../images/bar/home.png"> -->
        <div class="img" v-bind:style="{backgroundImage : backgroundImage}">
        </div>
        <p>{{bar.name}}</p>
    </div>
</template>
<script>
export default {
    props: {
        bar: {
            type: Object
        }
    },
    ready() {
        this.$on('changePic1', (name) => {
            this.changePic(name)
        })
        this.backgroundImage = 'url(' + (this.bar.select ? this.bar.slectUrl : this.bar.imgUrl) + ')'

    },
    data() {
        return {
            backgroundImage: ''
        }
    },
    attached() {
        this.backgroundImage = 'url(' + (this.bar.select ? this.bar.slectUrl : this.bar.imgUrl) + ')'
    },
    methods: {
        changePic(name) {
            if (this.bar.name === name) {
                this.backgroundImage = 'url(' + this.bar.slectUrl + ')';
                this.bar.select = true
            } else {
                this.backgroundImage = 'url(' + this.bar.imgUrl + ')';
                this.bar.select = false
            }

        },
    }

}
</script>
<style lang="scss" scoped>
.bar {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #d5d3d3;
    // padding-bottom: 15px;
    img {
        width: 50px;
        height: 45px;
        margin-bottom: 3px;
    }
    .img {
        height: 60px;
        // background-image: url(../images/bar/home.png);
        background-repeat: no-repeat;
        background-size: 25% auto;
        background-position: center center;
    }
    p {
        font-size: 22px;
    }
}
</style>
