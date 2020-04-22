<template>
  <button v-on="$listeners" class="dev-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'DevButton'
}
</script>

<style lang="scss">

  @import 'debug/styles/_variables';
  
  .dev-button{
    border: none;
    background-color: $dev--color-color0;
    color:$dev--color-color-light;
    padding: 0.3rem 0.7rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
</style>
