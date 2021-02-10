<template>
  <div class="dev-input-container" :class="{'dev-error':error,'dev-inline':inline,'dev-noborder':!border,'dev-input-container-full':full,'dev-input-container-unnamed':!name}">
    <label class="dev-label-inline" v-if="name && inline">{{name}}:</label>
    <template v-if="type==='number'">
      <input class="dev-input" :placeholder="name"  :disabled="!isEditable" type="number" step="0.1" :value="inputValue"  @input="updateValueNumber">
    </template>
    <template v-else-if="type ==='string'">
      <input class="dev-input" spellcheck="false" :placeholder="name" :disabled="!isEditable" type="text"  :value="inputValue"  @input="updateValue">
    </template>
    <template v-else-if="type ==='boolean'">
      <input class="dev-input" :placeholder="name" :disabled="!isEditable" type="checkbox" :value="inputValue"  @input="updateValue">
    </template>
    <label class="dev-label" v-if="name && !inline">{{name}}:</label>
  </div>
</template>

<script>
export default {
  name: 'DevInput',
  props: {
    type:{required:true,type:String},
    inputValue:null,
    isEditable:{
      type:Boolean,
      default:true
    },
    name:String,
    full:{
      type:Boolean,
      default:true
    },
    border:{
      type:Boolean,
      default:true
    },
    inline:{
      type:Boolean,
      default:true
    },
    error:{
      type:Boolean,
      default:false
    },
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
$error:$dev--color-color6;
$white: $dev--color-color-light;
$gray: $dev--color-color0;
.dev-input-container {
  position: relative;
  padding: 0.8rem 0 0;
  margin-top: 0.5rem;
  width: 6rem;
}

.dev-inline{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0;
    margin-top: 0rem;
}

.dev-input-container-full{
  width:100%
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

.dev-label-inline{
  display: flex;
  color: $gray;
}

.dev-input:disabled:hover {
  cursor:not-allowed;
}
.dev-input:focus :not(.dev-error),.dev-input-container:hover :not(.dev-error)  .dev-input:not(:disabled) {
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

.dev-input:focus :not(.dev-error) , .dev-inline:hover :not(.dev-error){
  & .dev-label-inline {
    color: $primary;
  }
}

.dev-error{
  & .dev-label{
    color:$error;
  }
 & .dev-label-inline {
    color: $error;
  }
  & .dev-input{
  border-bottom: 2px solid $error;
 }
}

</style>
