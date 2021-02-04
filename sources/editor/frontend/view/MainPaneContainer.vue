<template>
  <div class="main-pane-container">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'MainPaneContainer',
}
</script>

<style lang="scss">

@import "editor/frontend/styles/_variables";

.main-pane-container{
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  flex:2;
}
</style>
