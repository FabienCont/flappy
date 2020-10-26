<template>
  <div @click.stop.prevent="" class="dev-input-container">
    <label v-if="name">{{name}}:</label>
    <template v-if="type==='number'">
      <input class="dev-input" :disabled="!isEditable" type="number" step="0.1" :value="inputValue"  @input="updateValueNumber">
    </template>
    <template v-else-if="type ==='string'">
      <input class="dev-input" :disabled="!isEditable" type="text"  :value="inputValue"  @input="updateValue">
    </template>
    <template v-else-if="type ==='boolean'">
      <input class="dev-input" :disabled="!isEditable" type="checkbox" :value="inputValue"  @input="updateValue">
    </template>
  </div>
</template>

<script>
export default {
  name: 'DevInput',
  props: {
    type:{required:true,type:String},
    inputValue:null,
    isEditable:true,
    name:String,
  },
  methods:{
    updateValueNumber:function($event){
      var num=Number.parseFloat($event.target.value);
      if(!isNaN(num)){
        this.$emit('update:inputValue', num);
      }
    },
    updateValue:function($event){
      this.$emit('update:inputValue', $event.target.value);
    }
  },
}
</script>

<style>
.dev-input-container{
}
.dev-input{
  width: 6rem;
}
</style>
