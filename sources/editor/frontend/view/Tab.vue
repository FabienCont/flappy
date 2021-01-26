<template>
  <li @click.middle="close" @click="activate" class="tab" :class="{'tab-active':isActive}">
    <span></span>
    <span class="tab-title">{{fileName}}</span>
    <dev-icon @click.stop="close" :width="svgSize" :height="svgSize" iconName="close"></dev-icon>
  </li>
</template>

<script>
//check Ref

import { mapMutations,mapActions } from 'vuex';

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
    ...mapActions({
      openTab:'panes/open',
      closeTab:'panes/close'
    }),
    close:function(){
      this.closeTab(this.filePath)
    },
    activate:function(){
      this.openTab(this.filePath)
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
    display: flex;
    flex: 1 1 0;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    color: $dev--color-color0;
    font-size: $dev--font-size-m;
    cursor:pointer;
    max-width:200px;
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
