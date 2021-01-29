<template>
  <ol class="tree-branch">
    <li :class="{ 'header-tree-branch': isFirstLevel()}" class="tree-sub-branch" v-for='(value,name) in branch' v-bind:key="name"></tree-branch>
      <template v-if="value.type==='folder'">
        <span @click.prevent="toggleOpen(value)" class="tree-sub-branch-folder">
          <dev-icon class="tree-sub-branch-icon" :width="svgSize" :height="svgSize" :iconName="getTypeIcon(value)"></dev-icon>
          <span :class="{ active: isActive(name)}">{{name}}</span>
        </span>
        <tree-branch @select-file="childSelectFile" v-show="value.isOpen" :parentPath="branchParentPath(name)" :currentPath="currentPath" :branch="value.content" />
      </template>
      <span v-else @click.prevent="selectFile(branch,name)" :class="{ active: isActive(name)}" class="tree-sub-branch-file">
        {{name}}
      </span>
    </li>
  </ol>
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
    branch:Object,
    currentPath:String,
    parentPath:String
  },
  methods:{
    ...mapMutations({
      toggleOpenElement:'arborescence/toggleOpenElement' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    isFirstLevel:function(){
      return this.parentPath==='';
    },
    branchParentPath:function(name){
      return this.parentPath!==''?this.parentPath+'/'+name:name
    },
    isActive:function(name){
      let path=this.parentPath!==''?this.parentPath+'/'+name:name;
      if(this.currentPath.startsWith(path)){
        return true;
      }
      return false;
    },
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
    margin: 0;
    padding: 0;
    list-style: none;
    cursor: default;
  }
  .tree-sub-branch{
    line-height: 1.2rem;
    padding-left: 17px;
    margin-left: 17px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin:0.2rem;
  }

  .header-tree-branch{
    padding-left: 0px;
    margin-left: 0px;
    position:relative
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
  .active{
    color:$dev--color-color0;
  }
  .tree-sub-branch-file.active::before{
    position:absolute;
    background: $dev--color-color-light-fade;
    content: " ";
    left: 0;
    right: 0;
    height: 1.2rem;
  }
</style>
