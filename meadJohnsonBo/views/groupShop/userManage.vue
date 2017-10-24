<template>
    <div class='drag-content'>
        <div class='project-content'>
            <div id="{{pjdt.id}}" class='select-item' draggable='true' @dragstart='drag($event)' v-for='pjdt in projectdatas'>{{pjdt.name}}</div>
        </div>
        <div class='people-content'>
            <div class='drag-div' v-for='(ppindex,ppdt) in peopledata' @drop='drop($event)' @dragover='allowDrop($event)'>
                <div class='select-project-item'>
                    <label class='drag-people-label'>{{ppdt.name}}:</label>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- <div class='select-item' draggable='true' @dragstart='drag($event)' v-for='pjdt in projectdatas'>{{pjdt.name}}</div> -->
<script>
let dom = null
export default {
    components: {},
    ready: function() {},
    methods: {
        drag: function(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
            console.log(ev.target.id)
            console.log(ev)
        },
        drop: function(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
            console.log(data)
        },
        allowDrop: function(ev) {
            ev.preventDefault();
        },
    },
    data() {
        return {
            projectdatas: [{
                id: 1,
                name: '葡萄',
            }, {
                id: 2,
                name: '芒果',
            }, {
                id: 3,
                name: '木瓜',
            }, {
                id: 4,
                name: '榴莲',
            }],
            peopledata: [{
                id: 1,
                name: '小颖',
            }, {
                id: 2,
                name: 'hover',
            }, {
                id: 3,
                name: '空巢青年三 ',
            }, {
                id: 3,
                name: '一丢丢',
            }]
        }
    }
}
</script>
<style scoped>
.select-item {
    background-color: #5bc0de;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    padding: 6px 20px;
    color: #fff;
}

.cursored {
    cursor: default;
}

.project-content,
.people-content {
    margin: 30px 50px;
}

.people-content {
    margin-top: 30px;
}

.drag-div {
    border: 1px solid #5bc0de;
    padding: 10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
}

.select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
}

.drag-people-label {
    margin-bottom: 0;
    padding-right: 10px;
}
</style>
