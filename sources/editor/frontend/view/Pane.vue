<template>
  <div class="pane">
    <PaneHeader :activePane="activePane" :panes="panes"></PaneHeader>
    <component :is="componentRef" :params="componentParams"></component>
  </div>
</template>

<script>
import PaneHeader from "editor/frontend/view/PaneHeader.vue";
import DevImagePreview from "editor/frontend/view/DevImagePreview.vue";
import { mapGetters } from 'vuex'

export default {
  name: 'pane',
  components:{PaneHeader,DevImagePreview},
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
    },
    ...mapGetters({
      currentPane:"panes/currentPane"
    })
  },
  watch:{
    currentPane:function(val){
      this.componentRef=val.component;
      this.componentParams=val.params;
    }
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
