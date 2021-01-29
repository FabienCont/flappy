<template>
  <div class="app">
    <header class="app-header">
      <header-app></header-app>
    </header>
    <div class="app-body">
      <tree-view></tree-view>
      <pane></pane>
    </div>
    <footer class="app-footer">
      <footer-app></footer-app>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import HeaderApp from "editor/frontend/view/HeaderApp.vue";
import FooterApp from "editor/frontend/view/FooterApp.vue";
import TreeView from "editor/frontend/view/TreeView.vue";
import Pane from "editor/frontend/view/Pane.vue";
//check Ref
export default {
  name: 'app',
  data(){
    return {
    }
  },
  components:{
    HeaderApp,
    TreeView,
    Pane,
    FooterApp
  },
  created(){
    this.getAllArborescence();
  },
  methods:{
    ...mapActions({
      getAllArborescence:'arborescence/getAllArborescence' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  }
}
</script>
<style>

.flex{
    display: flex;
}

.align-center{
  align-items: center;
}

</style>
<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

.app{
  font-family: Menlo, Consolas, DejaVu Sans Mono, monospace;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-body{
  display: flex;
  flex: 1;
  overflow: auto;
}

.app-footer,.app-header{

}

</style>
