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
  @import 'debug/styles/_variables';

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
  }

  .dev-tab--active{
    background-color: $dev--color-color0;
    color:$dev--color-color-light;
  }
</style>
