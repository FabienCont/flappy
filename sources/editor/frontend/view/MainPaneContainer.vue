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

@import 'debug/styles/_variables';

.main-pane-container{
 display: flex;
  flex:2;
}
</style>
