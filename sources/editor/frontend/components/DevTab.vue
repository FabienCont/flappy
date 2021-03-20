<template>
  <div v-on="$listeners" :class="{'dev-tab--active':isActive}" class="dev-tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DevTab',
  props:{
    isActive:Boolean
  }
}
</script>

<style scoped lang="scss">
@import "editor/frontend/styles/_variables";

  .dev-tab{
    display: flex;
    flex:1;
    justify-content: center;
    align-items: center;
    padding:0.5rem 1rem;
    cursor: pointer;
    border:1px solid $dev--color-color0;
    border-left: 0;
    border-right: 0;
    box-sizing: border-box;

      &:hover:not(.dev-tab--active){
        color:$dev--color-color3;
        border-top:1px solid $dev--color-color3;
        border-bottom:1px solid $dev--color-color3;
        background-color: $dev--color-color-dark-fade;
      }

  }

  .dev-tab--active{
    background-color: $dev--color-color-dark;
    border-top:1px solid $dev--color-color3;
    border-bottom:1px solid $dev--color-color3;
    color:$dev--color-color3;
  }
</style>
