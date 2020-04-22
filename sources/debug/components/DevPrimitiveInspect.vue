<template>
  <div @click.stop.prevent="" class="dev-primitive-inspect">
    <label v-if="name">{{name}}:</label>
    <template v-if="typeof primitiveToInspect==='number'">
      <input class="dev-primitive-inspect-input" :disabled="!isEditable" type="number" step="0.1" :value="primitiveToInspect"  @input="updateValueNumber">
    </template>
    <template v-else-if="typeof primitiveToInspect==='string'">
      <input class="dev-primitive-inspect-input" :disabled="!isEditable" type="text"  :value="primitiveToInspect"  @input="updateValue">
    </template>
    <template v-else-if="typeof primitiveToInspect==='boolean'">
      <input class="dev-primitive-inspect-input" :disabled="!isEditable" type="checkbox" :value="primitiveToInspect"  @input="updateValue">
    </template>
  </div>
</template>

<script>
export default {
  name: 'DevPrimitiveInspect',
  props: {
    primitiveToInspect:null,
    isEditable:true,
    name:String,
    depth:0
  },
  methods:{
    updateValueNumber:function($event){
      var num=Number.parseFloat($event.target.value);
      if(num){
        console.log(num)
        this.$emit('update:primitiveToInspect', num);
      }
    },
    updateValue:function($event){
      this.$emit('update:primitiveToInspect', $event.target.value);
    }
  },
}
</script>

<style>
.dev-primitive-inspect{
margin-left:0.5rem;
}
.dev-primitive-inspect-input{
  width: 120px;
}
</style>
