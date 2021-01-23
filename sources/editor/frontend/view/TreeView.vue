<template>
  <div class="tree-view">
    <span class="tree-view-header">Project</span>
    <tree-branch @select-file="childSelectFile" :branch="arborescence"></tree-branch>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import TreeBranch from "editor/frontend/view/TreeBranch.vue";
//check Ref
export default {
  name: 'tree-view',
  components:{'tree-branch':TreeBranch},
  computed:{
    arborescence () {
      return this.$store.state.arborescence.all
    }
  },
  methods:{
    ...mapActions({
      openPane:'panes/open'
    }),
    childSelectFile:function({branch,path}){
      let fullPath=path.reverse().join("/");
      this.openPane(fullPath);
    }
  }
}
</script>


<style lang="scss" scoped>
.tree-view{
background:black;
}
</style>
<style lang="scss" scoped>
@import "editor/frontend/styles/_variables";

  .tree-view{
    background: $dev--color-color-dark;
    height: 100%;
    width:400px;
    border-right:1px solid $dev--color-color-darker;
    overflow-y: auto;
  }
::-webkit-scrollbar-thumb {
      border-radius: 5px;
      border: 3px solid  $dev--color-color-dark;
      background:  $dev--color-color-light-fade;
      background-clip: content-box;
  }
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-thumb:active {
  border-radius: 0px;
  border: 10px solid $dev--color-color-dark-fade;
}
  .tree-view-header{
    color: $dev--color-color-light;
    font-size: $dev--font-size-m;
    margin: 0.5rem;
    display: flex ;
    justify-content: center;
  }

</style>
