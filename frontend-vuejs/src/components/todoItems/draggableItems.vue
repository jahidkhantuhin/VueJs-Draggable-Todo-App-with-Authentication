<template>
    <div class="container todoItems">
        <draggable v-model="todoItems" ghost-class="ghost" @end="onEnd" >
            <transition-group type="transition" name="flip-list" >
                <div class="list-group-item todoItem shadow" :id="item.id" 
                    v-for="(item, index) in todoItems" :key="item.id" >
                    <span><strong> {{index}}. </strong></span>
                    <strong> {{ item.name }} - </strong>
                    <strong><span style="border: 1px solid black; text-decoration: underline"> _{{ item.id }}_ </span></strong>
                    <button @click="itemDeleted(index)" class="glyphicon glyphicon-trash right_header"></button>
                </div> 
            </transition-group>
        </draggable>
        <br>
        <div>
            <h4>previous index: {{oldIndex}} </h4>
            <h4>current index: {{newIndex}} </h4>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    export default {
        data: function () {
            return {
                oldIndex: '',
                newIndex: ''
            }
        },
        props: {
            todoItems: {
                type: Array,
                required: true
            }
        },
        components: {
            draggable
        },
        methods: {
            onEnd (event) {
                console.log(event);
                this.oldIndex = event.oldIndex;
                this.newIndex = event.newIndex;

            },
            itemDeleted(index) {
                this.$emit('itemDeleted', index);
            }
        }
        
    }
</script>

<style>
.todoItems{
    width: 70%;
    margin: auto;
    padding: 1rem;
}
.todoItem{
    margin: 5px 0px;
}
.todoItem:hover{
    cursor: move;
}
.index{
    font-weight: bold;
    font-size: 20px;
}
.shadow{
    box-shadow: 3px 3px 5px 6px #ccc;
}
.right_header {
    float: right;
}

@media (max-width: 768px) {
    .todoItems{
    width: 100%;
}
}
</style>
