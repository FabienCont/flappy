<template>
  <div class="dev-separator">
  </div>
</template>

<script>
export default {
  name: 'DevSeparator'
}
</script>

<style scoped lang="scss">

  @import 'debug/styles/_variables';

  .dev-separator{
    width:95%;
    height:2px;
    margin: 1rem 0;
    background-color: $dev--color-color0;
    color:$dev--color-color-light;

  }
</style>
