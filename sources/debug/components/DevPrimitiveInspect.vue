<template>
  <div @click.stop.prevent="" class="dev-primitive-inspect">
    <label v-if="name && typeof primitiveToInspect!=='module'">{{name}}:</label>
    <template v-if="typeof primitiveToInspect==='number'">
      <input :style="widthStyle" class="dev-primitive-inspect-input" :disabled="!isEditable" type="number" :step="step" :value="primitiveToInspect"  @input="updateValueNumber">
    </template>
    <template v-else-if="typeof primitiveToInspect==='string'">
      <input :style="widthStyle" class="dev-primitive-inspect-input" :disabled="!isEditable" type="text"  :value="primitiveToInspect"  @input="updateValue">
    </template>
    <template v-else-if="typeof primitiveToInspect==='boolean'">
      <input :style="widthStyle" class="dev-primitive-inspect-input" :disabled="!isEditable" type="checkbox" :value="primitiveToInspect"  @input="updateValue">
    </template>
    <template v-else-if="typeof primitiveToInspect==='function'">
      <input :style="widthStyle" class="dev-primitive-inspect-input" :disabled="false" type="text" :value="primitiveToInspect">
    </template>
    <template v-else-if="typeof primitiveToInspect==='module'">
      <input :style="widthStyle" class="dev-primitive-inspect-input" :disabled="false" type="text" :value="primitiveToInspect">
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
    depth:0,
    width:{
      type:String,
      default:"120"
    },
    step:{
      type:String,
      default:"1"
    },
  },
  computed:{
    widthStyle:function(){
      return 'width:'+this.width+'px;';
    }
  },
  methods:{
    updateValueNumber:function($event){
      var num=Number.parseFloat($event.target.value);
      if(!Number.isNaN(num)){
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

<style scoped>
.dev-primitive-inspect{
margin-left:0.5rem;
}
.dev-primitive-inspect-input{
  width: 120px;
}
</style>
