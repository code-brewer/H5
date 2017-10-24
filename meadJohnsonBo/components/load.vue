<template>
    <div class="spinner" v-show="show">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
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
.spinner {
	position: fixed;
	top: 50%;
	left: 50%;
    width: 60px;
    height: 60px;
    margin: -30px 0 0 -30px;
    z-index: 10;
}

.double-bounce1,
.double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fe7eaf;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

@-webkit-keyframes bounce {
    0%,
    100% {
        -webkit-transform: scale(0.0)
    }
    50% {
        -webkit-transform: scale(1.0)
    }
}

@keyframes bounce {
    0%,
    100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
}
</style>
