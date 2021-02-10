<template>
  <div class="dev-checkbox-container" :class="{'fill':value!=='' }">
    <input class="dev-checkbox" name="label" type="checkbox" :value="val" v-model="checked" @change="updateValue">
    <label class="dev-label" for="label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'DevCheckbox',
  props:{
    value:{
      type: Array,
      required: true
    },
    val:{
      type: String,
      required: true
    },
    label:{
      type: String,
      required: true
    }
  },
  computed: {
	  checked: {
      get () {
        return this.value
      },
      set (val) {
        this.checkedProxy = val
      }
    }
  },
  methods:{
    updateValue:function(){
      this.$emit('input', this.checkedProxy);
    }
  }
}
</script>

<style scoped lang="scss">

@import "editor/frontend/styles/_variables";

  .dev-checkbox-container{
    display: flex;
    align-items: center;
  }
  .dev-checkbox{
    cursor: pointer;
  }

  :disabled.dev-checkbox{
    cursor: not-allowed;
  }

  .dev-checkbox {
    position: relative;
    width: 1rem;
    height: 1rem;
    color: $dev--color-color-light;
    border: 1px solid $dev--color-color-light;
    border-radius: 4px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
      position: absolute;
      content: '';
      display: block;
      top: -2.5px;
      left: 3px;
      width: 7px;
      height: 12px;
      border-style: solid;
      border-color: $dev--color-color-light;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
    }
    &:checked {
      color: $dev--color-color-light;
      border-color: $dev--color-color3-dark;
      background: $dev--color-color3-dark;
      &::before {
        opacity: 1;
      }
      ~ label::before {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
  }

  .fill .dev-label {
    content: "filled";
  }

  .dev-label {
    position: relative;
    cursor: pointer;
    font-weight: normal;
    padding: 0 0.25em 0;
    user-select: none;
    font-size: 0.8rem;
    &::before {
      position: absolute;
      content: "";
      color: $dev--color-color-light;
      clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
      text-decoration: line-through;
      text-decoration-thickness: 3px;
      text-decoration-color: $dev--color-color-light;
      transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  }
</style>
