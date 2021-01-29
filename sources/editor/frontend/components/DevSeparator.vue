<template>
  <hr class="dev-separator">
</template>

<script>
export default {
  name: 'devSeparator',
  props:{
  },
  computed:{
  }
}
</script>

<style scoped lang="scss">

@import "editor/frontend/styles/_variables";

  .dev-separator {
    display: block;
    width:90%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-style: inset;
    border-width: 1px;
    border-color:$dev--color-color-dark;
  }

</style>
