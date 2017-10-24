<template>
    <div class="label-inline">
        <span class="onse">倒计时设置：</span>
        <div>
            <div class="form-group">
                <input type="number" class="short-input" v-model="duration" @input="limit"><span> 秒</span>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    props: {
        id: {
            type: String
        }
    },
    data() {
        var duration = window.store.activityConfig.duration;
        return {
            duration
        }
    },
    methods: {
        limit() {
            if(!/\d/.test(this.duration)) {
                this.duration = 60;
            }
            else if(this.duration<10) {
                this.duration = 10;
            }
            else if(this.duration>300) {
                this.duration = 300;
            }
            this.duration = parseInt(this.duration);
            window.store.activityConfig.duration = this.duration;
        },
        
    }
}
</script>

<style lang="scss">
@import '../../../css/bootstrap/_variables.scss';

#condition-config-content {
    .form-group {
        margin-bottom: 5px;
        font-size: 12px;
        > div {
            display: inline-block;
            max-width: 100%;
        }
    }


    .short-input {
        display: inline-block;
        width: 55px;
        text-align: center;
    }

    
}

</style>
