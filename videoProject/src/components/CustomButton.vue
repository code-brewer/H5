<template>
<div class="custom_button">
  <button><slot></slot></button>
</div>
</template>
<style lang="scss" scoped>
.custom_button {
    margin: 0 auto;
    padding: 5px;
    border-radius: 70px;
    background-color: #c3e4f0;
    background: -webkit-gradient(linear, top, #c3e4f0, #7d8ebc);
    background: -webkit-linear-gradient(top, #c3e4f0, #7d8ebc);
    box-shadow: 0 0 30px rgba(255, 255, 255, .5);
    button {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 34px;
        color: #fff;
        font-weight: 700;
        border-radius: 60px;
        outline: none;
        background-color: #4c75b4;
        background: -webkit-gradient(linear, top, #9bb3d9 20%, #6c8ec3 60%, #4c75b4 80%);
        background: -webkit-linear-gradient(top, #9bb3d9 20%, #6c8ec3 60%, #4c75b4 80%);
    }
}
</style>
