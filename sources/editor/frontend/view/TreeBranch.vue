<template>
  <div class="tree-branch">
    <div class="tree-sub-branch" v-for='(value,name) in branch' v-bind:key="name"></tree-branch>
      <template v-if="value.type==='folder'">
        <span @click.prevent="toggleOpen(value)" class="tree-sub-branch-folder">
          <dev-icon class="tree-sub-branch-icon" :width="svgSize" :height="svgSize" :iconName="getTypeIcon(value)"></dev-icon>
          <span>{{name}}</span>
        </span>
        <tree-branch @select-file="childSelectFile" v-show="value.isOpen" :branch="value.content" />
      </template>
      <span @click.prevent="selectFile(branch,name)" class="tree-sub-branch-file" v-else>
        {{name}}
      </span>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
//check Ref
export default {
  name: 'tree-branch',
  components:{'tree-branch':() => import('editor/frontend/view/TreeBranch.vue')},
  data(){
    return{
      svgSize:"1.5em"
    }
  },
  props:{
    branch:Object
  },
  methods:{
    ...mapMutations({
      toggleOpenElement:'arborescence/toggleOpenElement' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    childSelectFile:function({branch,path}){
      let element=Object.entries(this.branch).find(([key,value])=>value.content===branch);
      if(typeof path==="string"){
        path=[path];
      }
      path.push(element[0]);
      this.selectFile(this.branch,path);
    },
    selectFile:function(branch,path){
      this.$emit("select-file",{branch,path})
    },
    getTypeIcon:function(file){
      if(file.isOpen===true){
        return "right"
      }else{
        return "bottom"
      }
    },
    toggleOpen:function(file){
      this.toggleOpenElement(file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "editor/frontend/styles/_variables";

  .tree-branch{
    color:$dev--color-color0;
    font-size: $dev--font-size-m;
    margin-left: 15px;
  }
  .tree-sub-branch{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:0.2rem;
  }
  .tree-sub-branch-folder{
    display: flex;
    align-items: center;
    cursor:pointer;
  }
  .tree-sub-branch-icon{
    margin-right:0.2rem;
  }
  .tree-sub-branch-file{
    margin-left: 15px;
    cursor:pointer;
  }
</style>
