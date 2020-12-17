<template>
  <div class="pane">
    <PaneHeader :activePane="activePane" :panes="panes"></PaneHeader>
    <component v-if="componentRef" v-bind:is="componentRef" :params="componentParams"></component>
  </div>
</template>

<script>
import PaneHeader from "editor/frontend/view/PaneHeader.vue";

export default {
  name: 'pane',
  components:{PaneHeader},
  data(){
    return {
      componentParams:{},
      componentRef:null
    }
  },
  computed:{
    panes () {
      return this.$store.state.panes.all;
    },
    activePane(){
      return this.$store.state.panes.active;
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .pane{
    flex-grow: 1;
    background: $dev--color-color-dark;
  }
</style>
