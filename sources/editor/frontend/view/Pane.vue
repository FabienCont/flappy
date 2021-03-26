<template>
  <div class="pane">
    <PaneHeader :activePane="activePane" :panes="panes"></PaneHeader>
    <component :is="componentRef" :params="componentParams" @edit-image="editImage" @edit-sprites="editSprites" @delete-elem="deleteElem" @save="save"></component>
  </div>
</template>

<script>
import PaneHeader from "editor/frontend/view/PaneHeader.vue";
import DevImageEdit from "editor/frontend/view/DevImageEdit.vue";
import DevSpriteEdit from "editor/frontend/view/DevSpriteEdit.vue";
import DevSoundEdit from "editor/frontend/view/DevSoundEdit.vue";
import DevAceEditor from "editor/frontend/view/DevAceEditor.vue";
import DevComponentEdit from "editor/frontend/view/DevComponentEdit.vue";
import DevEntity from "editor/frontend/view/DevEntity.vue";
import DevScene from "editor/frontend/view/DevScene.vue";
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'pane',
  components:{PaneHeader,DevImageEdit,DevSoundEdit,DevAceEditor,DevSpriteEdit,DevComponentEdit,DevEntity,DevScene},
  data(){
    return {
      componentParams:{},
      componentRef:null
    }
  },
  methods:{
    ...mapActions({
      openPane:'panes/open',
      saveFile:'files/save',
      deleteFile:'files/delete'
    }),
    deleteElem:function({type,scope,name,content}){
      let path=this.currentFolder+'/'+type+'/'+scope+'/'+name;
      this.deleteFile({path})
    },
    save:function({type,scope,name,content}){
      let path=this.currentFolder+'/'+type+'/'+scope+'/'+name;
      this.saveFile({path,content})
    },
    editSprites:function(scope,name){
      let extension= name.match(/\.[0-9a-z]+$/i)[0];
      this.selectPreviewElement("assets","sprites",scope,name.split(extension)[0]+".json");
    },
    editImage:function(scope,name){
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
      currentFolder:"panes/currentFolder",
      currentFiles:"files/currentFiles"
    }),
  },
  watch:{
    currentFiles:function(val){
      if(this.currentType==='images' && this.currentFiles.length>0){
        this.componentRef=DevImageEdit;
        this.componentParams=this.currentFiles[0];
      }else if(this.currentType==='sounds' && this.currentFiles.length>0){
        this.componentRef=DevSoundEdit;
        this.componentParams=this.currentFiles[0];
      }else if(this.currentType==='sprites' && this.currentFiles.length===2){
        this.componentRef=DevSpriteEdit;
        this.componentParams=this.currentFiles;
      }else if(this.currentType==='entities' && this.currentFiles.length>0){
        this.componentRef=DevEntity;
        this.componentParams=this.currentFiles;
      }else if(this.currentType==='scenes' && this.currentFiles.length>0){
        this.componentRef=DevScene;
        this.componentParams=this.currentFiles;
      }else if(this.currentType==='components' && this.currentFiles.length===1){
        this.componentRef=DevComponentEdit;
        this.componentParams=this.currentFiles[0];
      }else if((this.currentFolder==='lifecycles' || this.currentType==='systems' || this.currentType==='snippets' || this.currentType==='datasets') && this.currentFiles.length>0){
        this.componentRef=DevAceEditor;
        this.componentParams=this.currentFiles[0];
      }
      else if(this.currentFiles.length===0) {
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
    flex:auto;
    background: $dev--color-color-dark;
    overflow-y: auto;
  }
</style>
