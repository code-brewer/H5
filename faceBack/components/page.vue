<template>
    <div class="bottom container-fluid">
        <div class="col-xs-3" style="text-align: left;padding-left: 0;padding-right: 0;">当前显示<span> {{searchlist.nowPage*12-11}} </span>到<span> {{searchlist.nowPage==allPage ?searchlist.all :searchlist.nowPage*12}} </span>条,共<span> {{searchlist.all }} </span>条记录
        </div>
        <div class="col-xs-5" style="min-width: 422px">
            <ul class="pagination " style="padding-left: 0px;padding-right: 0 ;text-align: right;">
                <li :class="{disabled:searchlist.nowGroup<=1}" @click="searchlist.nowGroup<=1?'':searchlist.nowGroup-=1"><a aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                <li @click="clickPage(item)" :class="{active: searchlist.nowPage===item+1+(searchlist.nowGroup-1)*3}" v-for="item in 3|showPage"><a>{{item+1+(searchlist.nowGroup-1)*3}} </a></li>
                <li :class="{disabled:searchlist.nowGroup>=group}" @click="searchlist.nowGroup>=group?'':searchlist.nowGroup+=1"><a aria-label="Next"><span aria-hidden="true">»</span></a></li>
            </ul>
            <div class="goPage " style="padding-left: 0px;padding-right: 0 ;text-align: left">
                <span>到</span>
                <input style="text-align: center" v-el:goto class="form-control" type="text" name=""><span>页</span>
                <button type="button" class="btn btn-primary" @click="gotobtn">确定</button>
            </div>
        </div>
        <div style="float: right">
            <slot >
            </slot>
        </div>
    </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        searchlist: {
            type: Object,
            default: {
                list: [],
                all: 0,
                nowPage: 1,
                nowGroup: 1,
            }
        }
    },
    ready() {

    },
    computed: {

        allPage: function() { //共多少页
            // `this` 指向 vm 实例
            return Math.ceil(this.searchlist.all / 12)

        },
        group: function() { //当前显示的组数,每组3页
            return Math.ceil(Math.ceil(this.searchlist.all / 12) / 3)
        }
    },
    filters: {
        showPage(val, item) {
            if (this.allPage == 0) return 1
            for (var i = 0; i < val; i++) {
                if (i + 1 + (this.searchlist.nowGroup - 1) * 3 == this.allPage) return i + 1
            }
            return i

        },
    },
    methods: {
        clickPage(item) {
            this.$dispatch('clickPage', item)
        },
        gotobtn() {
            var val = parseInt(this.$els.goto.value / 1);
            this.$dispatch('gotobtn', val, this.allPage)
        }
    }
}
</script>
<style lang="scss" scoped>
.goPage {
    display: inline-block;
    input {
        display: inline-block;
        width: 30px;
        padding: 0;
    }
    span {
        padding: 0 10px;
    }
}

.bottom {
    text-align: center;
    ul {
        vertical-align: middle;
        padding-left: 30px;
        margin: 0;
        // margin-left: -50px;
        // margin-left: -175px;
    }
}
</style>
