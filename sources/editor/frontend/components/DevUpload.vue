<template>
  <label class="dev-input-container">
    {{ label }}
    <input class="dev-input" type="file" v-bind="$attrs" :value="value" v-on='inputListeners'>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'DevUnput',
  props:['label', 'value'],
  computed: {
     inputListeners: function () {
       var vm = this
       // `Object.assign` merges objects together to form a new object
       return Object.assign({},
         // We add all the listeners from the parent
         this.$listeners,
         // Then we can add custom listeners or override the
         // behavior of some listeners.
         {
           // This ensures that the component works with v-model
           input: function (event) {
             vm.$emit('input', event.target.value)
           }
         }
       )
     }
   },
}
</script>

<style scoped>
.dev-input-container{
  display: flex;
  flex-direction: column;
}
</style>
