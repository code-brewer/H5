<template>
    <div class="app-view home-page">
        <section class="section-home">
            <div class="main-bg">
                <img :src="'k/images/home-bg.jpg'">
            </div>
            <div class="logo">
                <img :src="'g/images/logo.png'">
            </div>
            <div class="btn-panel" style="text-align: center;">
                <a class="start-btn"  @click="start">
                    <img :src="'k/images/start.png'" style="width: 380px;">
                </a>

            </div>
            <div class="title-panel">
                <a @click="changeShowActivityD()">活动规则</a>
                <!-- <a @click="lucky()" class="right">我要抽奖</a> -->
            </div>
        </section>
    </div>

</template>