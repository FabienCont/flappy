<template>
  <div class="detail-pane-container">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'DetailPaneContainer',
}
</script>

<style lang="scss">

@import "editor/frontend/styles/_variables";

.detail-pane-container{
  padding-left:0.5rem;
  color: $dev--color-color-light;
  border-left:1px solid black;
  display: flex;
  flex-direction: column;
  flex:1;
  position: relative;
  overflow: auto;
}
</style>
