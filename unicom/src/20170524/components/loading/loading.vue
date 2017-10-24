<template>
    <div class="loading" v-show="show">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    text-align: center;
    background: rgba(0, 0, 0, .7);
}

.loading > div {
	position: relative;
    display: inline-block;
    width: 60px;
    height: 60px;
    top: 50%;
    margin-top: -30px;
    background-color: white;
    border-radius: 100%;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.loading .bounce1 {
    animation-delay: -0.32s;
}

.loading .bounce2 {
    animation-delay: -0.16s;
}

@keyframes bouncedelay {
    0%,
    80%,
    100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
</style>
