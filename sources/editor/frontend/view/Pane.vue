<template>
  <div class="pane">
    <PaneHeader :activePane="activePane" :panes="panes"></PaneHeader>
    <component :is="componentRef" :params="componentParams" @edit-image="editImage" @edit-sprites="editSprites" @save="save"></component>
  </div>
</template>

<script>
import PaneHeader from "editor/frontend/view/PaneHeader.vue";
import DevImageEdit from "editor/frontend/view/DevImageEdit.vue";
import DevSpriteEdit from "editor/frontend/view/DevSpriteEdit.vue";
import DevSoundEdit from "editor/frontend/view/DevSoundEdit.vue";
import DevAceEditor from "editor/frontend/view/DevAceEditor.vue"
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'pane',
  components:{PaneHeader,DevImageEdit,DevSoundEdit,DevAceEditor,DevSpriteEdit},
  data(){
    return {
      componentParams:{},
      componentRef:null
    }
  },
  methods:{
    ...mapActions({
      openPane:'panes/open',
      saveFile:'files/save'
    }),
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
      }else if((this.currentFolder==='scenes' || this.currentType==='scenes'|| this.currentType==='entities'||this.currentType==='components'|| this.currentType==='systems' || this.currentType==='snippets' || this.currentType==='datasets'|| this.currentType==='scenes' || this.currentType==='entities' || this.currentType==='component') && this.currentFiles.length>0){
        this.componentRef=DevAceEditor;
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
    flex:auto;
    background: $dev--color-color-dark;
    overflow-y: auto;
  }
</style>
