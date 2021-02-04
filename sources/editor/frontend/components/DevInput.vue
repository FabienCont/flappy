<template>
  <div class="dev-input-container" :class="{'dev-noborder':!border,'dev-input-container-full':full,'dev-input-container-unnamed':!name}">
    <template v-if="type==='number'">
      <input class="dev-input" :placeholder="name"  :disabled="!isEditable" type="number" step="0.1" :value="inputValue"  @input="updateValueNumber">
    </template>
    <template v-else-if="type ==='string'">
      <input class="dev-input" spellcheck="false" :placeholder="name" :disabled="!isEditable" type="text"  :value="inputValue"  @input="updateValue">
    </template>
    <template v-else-if="type ==='boolean'">
      <input class="dev-input" :placeholder="name" :disabled="!isEditable" type="checkbox" :value="inputValue"  @input="updateValue">
    </template>
    <label class="dev-label" v-if="name">{{name}}:</label>
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
    full:false,
    border:true
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

<style  scoped lang="scss">

@import "editor/frontend/styles/_variables";
//https://codepen.io/lucasyem/pen/ZEEYKdj
$primary: $dev--color-color3-dark;
$secondary:$dev--color-color3-light;
$white: $dev--color-color-light;
$gray: $dev--color-color0;
.dev-input-container {
  position: relative;
  padding: 0.8rem 0 0;
  margin-top: 0.5rem;
  width: 6rem;
  margin-right: 0.7rem;
}

.dev-input-container-full{
  width:90%
}
.dev-input-container-unnamed{
  padding-top: 0;
}
.dev-input {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .dev-label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}
.dev-noborder .dev-input{
    border-bottom:0px;
}

.dev-label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.dev-input:disabled:hover {
  cursor:not-allowed;
}
.dev-input:focus,.dev-input-container:hover .dev-input:not(:disabled) {
  ~ .dev-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    color: $primary;
  }
  padding-bottom: 6px;
  border-width: 3px;
  border-bottom: 2px solid grey;
  border-image: linear-gradient(to right, $primary,$secondary);
  border-image-slice: 1;
}
/* reset input */
.dev-input{
  &:required,&:invalid { box-shadow:none; }
}
</style>
