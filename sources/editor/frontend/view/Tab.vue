<template>
  <li @click="activate" class="tab" :class="{'tab-active':isActive}">
    <span></span>
    <span class="tab-title">{{fileName}}</span>
    <dev-icon @click.stop="closeTab" :width="svgSize" :height="svgSize" iconName="close"></dev-icon>
  </li>
</template>

<script>
//check Ref

import { mapMutations } from 'vuex';

export default {
  name: 'tab',
  data(){
    return{
      svgSize:"1rem"
    }
  },
  computed:{
    fileName:function(){
      return this.filePath.split('/').pop()
    }
  },
  methods:{
    ...mapMutations({
      removeTab:'panes/remove',
      activateTab:'panes/activate'
    }),
    closeTab:function(){
      this.removeTab(this.filePath)
    },
    activate:function(){
      this.activateTab(this.filePath)
    }
  },
  props:{
    isActive:Boolean,
    filePath:String,
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .tab{
    list-style: none;
    display: flex ;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    color: $dev--color-color0;
    font-size: $dev--font-size-m;
    cursor:pointer;
    width:200px;
    border:1px solid $dev--color-color-darker;
    background: $dev--color-color-dark;
  }

  .tab-active{
    color: $dev--color-color-light;
    background:  $dev--color-color-dark-fade;
    border-bottom:0px;
  }

  .tab-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
</style>
