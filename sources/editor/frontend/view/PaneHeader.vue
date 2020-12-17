<template>
  <ul class="pane-header">
    <template v-for="(pane,index) in panes">
      <tab v-bind:key="index" :isActive="index===activePane" :filePath="pane"></tab>
    </template>
  </ul>
</template>

<script>
import Tab from "editor/frontend/view/Tab.vue";
//check Ref
export default {
  name: 'pane-header',
  components:{Tab},
  data(){
    return {
    }
  },
  props:{
    activePane:Number,
    panes:Array
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .pane-header{
    display: flex;
    margin:0;
    padding:0;
    box-shadow: inset 0 -1px 0 $dev--color-color-darker;
  }

</style>
