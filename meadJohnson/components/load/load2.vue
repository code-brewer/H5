<template>
    <div class="loader-inner ball-pulse-sync" v-show="show">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                default: false
            }
        }
    }
</script>
<style scoped>

    @keyframes ball-pulse-sync {
        33% {
            -webkit-transform: translateY(10px);
            transform: translateY(10px);
        }
        66% {
            -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
    
    .ball-pulse-sync {
        display: inline-block;
    }

    .ball-pulse-sync > div:nth-child(0) {
        animation: ball-pulse-sync 0.6s 0s infinite ease-in-out;
    }

    .ball-pulse-sync > div:nth-child(1) {
        animation: ball-pulse-sync 0.6s 0.07s infinite ease-in-out;
    }

    .ball-pulse-sync > div:nth-child(2) {
        animation: ball-pulse-sync 0.6s 0.14s infinite ease-in-out;
    }

    .ball-pulse-sync > div:nth-child(3) {
        animation: ball-pulse-sync 0.6s 0.21s infinite ease-in-out;
    }

    .ball-pulse-sync > div {
        background-color: #78c5cd;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
    }
</style>
