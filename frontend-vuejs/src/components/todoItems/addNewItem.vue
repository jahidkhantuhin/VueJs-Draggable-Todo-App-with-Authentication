<template>
    <div class="row">
        <form @submit.prevent="createNew">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <h2>Item</h2>
                <textarea class="form-control textArea" rows="3" v-model="name" placeholder="Add your item"></textarea>
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
               <button class="btn btn-primary">Add Item</button>
               
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                name: "",
                passingValue: ''
            };
        },
        methods: {
            createNew() {
                this.passingValue = {name: this.name};
                this.$emit('itemAdded', this.passingValue);
                this.name = ''
                
            }
        }
    }
</script>

<style>
.textArea{
    font-size: 18px;
    border-radius: 10px;
    color: black;
    
}

</style>