<template>
    <div class="container">
        <app-new-item @itemAdded="newItem"></app-new-item>
        <draggable-items :todoItems="itemArray" @itemDeleted="deleteItem" ></draggable-items>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Click on delete button to remove it!</div>
            </div>
        </div>
    </div>
</template>

<script>
    import addNewItem from './todoItems/addNewItem.vue';
    import draggableItems from './todoItems/draggableItems';


    export default {
        data: function () {
            return {
                itemArray: [{name: 'VUE', id: 1},
                            {name: 'REACT', id: 2},
                            {name: 'NODE', id: 3},
                ],
                initId: 1
            }
        },
        methods: {
            newItem(item) {
                !item.name == ' ' ? 
              this.itemArray.push({name: item.name, id: this.itemArray.length + 1}) : null
            },
            deleteItem(index) {
                this.itemArray.splice(index, 1);
            }
        },
        components: {
            appNewItem: addNewItem,
            draggableItems: draggableItems
        }
    }
</script>

<style>
</style>
