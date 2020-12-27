<template>
  <div class="pane">
    <PaneHeader :activePane="activePane" :panes="panes"></PaneHeader>
    <component :is="componentRef" :params="componentParams" @edit-sprites="editSprites"></component>
  </div>
</template>

<script>
import PaneHeader from "editor/frontend/view/PaneHeader.vue";
import DevImageEdit from "editor/frontend/view/DevImageEdit.vue";
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'pane',
  components:{PaneHeader,DevImageEdit},
  data(){
    return {
      componentParams:{},
      componentRef:null
    }
  },
  methods:{
    ...mapActions({
      openPane:'panes/open'
    }),
    editSprites:function(scope,name){
      let extension= name.match(/\.[0-9a-z]+$/i)[0];
      this.selectPreviewElement("assets","sprites",scope,name.split(extension)[0]+".json");
    },
    editImages:function(scope,name){
      this.selectPreviewElement("assets","images",scope,name);
    },
    selectPreviewElement(folder,type,scope,name){
      let path=folder+'/'+type+'/'+scope+'/'+name;
      this.openPane(path);
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
      currentPane:"panes/currentPane",
      currentType:"panes/currentType",
      currentFiles:"files/currentFiles"
    }),
  },
  watch:{
    currentFiles:function(val){
      if(this.currentType==='images' && this.currentFiles.length>0){
        this.componentRef=DevImageEdit;
        this.componentParams=this.currentFiles[0];
      }else if(this.currentFiles.length===0) {
        this.componentRef=null;
        this.componentParams={}
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .pane{
    display: flex;
    flex-direction: column;
    flex:1;
    background: $dev--color-color-dark;
  }
</style>
