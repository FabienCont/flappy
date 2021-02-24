<template>
  <div class="dev-scene">
    <main-pane-container>
      <div class="dev-scene-container">
        <div class="dev-canvas-scene-container">
          <div class="dev-canvas-scene">
          </div>
        </div>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>Scene {{scope}} </h3>
      <dev-input  name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input v-show='scope!==null' name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
     <div v-if="isElementModify">
       <dev-button class="dev-scene-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-scene-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-scene-icon" @click="deleteElement()">Delete</dev-button>
     </div>
     <dev-separator></dev-separator>
     <div>
       <dev-entities :sceneFiles='sceneFiles' :entitiesModel='entityFiles' :componentsModel='componentFiles'></dev-entities>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import DevEntities from "editor/frontend/view/DevEntities.vue";
import Theatre from 'core/theatre';
import { mapGetters,mapActions } from 'vuex';

export default {
  name: 'devScene',
  components:{
    DetailPaneContainer,MainPaneContainer,DevEntities
  },
  data(){
    return {
      // svgSize:"1.7em",
       contentCopy:this.params.content,
       nameCopy:"",
       scopeCopy:"",
       theatreInstance:null,
       sceneFiles:{},
       componentFiles:{},
       entityFiles:{}
    }
  },
  beforeDestroy(){
    if(this.theatreInstance){
      this.theatreInstance.destroy();
    }
  },
  mounted(){
    let container =  this.$el.querySelector('.dev-canvas-scene');
    this.theatreInstance =  new Theatre({
      container,
      expose: false,
      sharp: true,
      scenarioCtx: require.context('editor/frontend/theatre/editScene/scenes/', true, /^\.\/scenario\.json$/, 'sync'),
      hooksCtx:require.context('editor/frontend/theatre/editScene/scenes/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
      modelsCtx:require.context('editor/frontend/theatre/editScene/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
      loadingTime:0,
      params:{
        components:this.componentFiles,
        entities:this.entityFiles,
        sceneFiles:this.sceneFiles
      },
      focus:false
    });
  },
  props: {
    params:{
      path:String,
      content:Object,
    }
  },
  watch:{
    params:function(val){
      val.forEach((file,i)=>{
        if(file.type==='scenes'){
          this.$set(this.sceneFiles,file.path,file);
        }else if(file.type==='entities'){
          this.entityFiles[file.path]=file;
        }else if(file.type==='components'){
          this.componentFiles[file.path]=file;
        }else{
          console.error('file not recognize',file);
        }
      });
    },
    sceneFiles:{
      deep:true,
      handler:function(val){
        let mainSceneFile=val[this.currentPane.path];
        if(mainSceneFile){
          this.nameCopy=mainSceneFile.name;
          this.scopeCopy=mainSceneFile.scope;
        }
      }
    }
  },
  computed:{
    ...mapGetters({
      currentPane:"panes/currentPane"
    }),
    mainSceneFile:function(){
      let mainSceneFile=this.sceneFiles[this.currentPane.path];
      if(mainSceneFile){
        return mainSceneFile
      }else return null;
    },
    scope:function(){
      if(this.mainSceneFile){
          return this.mainSceneFile.scope
      }else return "";
    },
    name:function(){
      if(this.mainSceneFile){
          return this.mainSceneFile.name
      }else return "";
    },
    isElementModify:function(){
      if(this.mainSceneFile && this.nameCopy!==this.mainSceneFile.name && this.scopeCopy!==this.mainSceneFile.scope){
        return true;
      }else return false;
    }
  },
  methods:{
    saveElement:function(){
      if(this.isElementModify){
        this.$emit("save",{folder:this.folder,type:this.type,scope:this.scopeCopy,name:this.nameCopy,content:this.contentCopy});
      }
    },
    deleteElement:function(){
      this.$emit("delete-elem",{type:this.type,scope:this.scope,name:this.name});
    },
    editSprites:function(){
      this.$emit("edit-sprites",this.scopeCopy,this.nameCopy);
    },
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

.dev-scene{
  display: flex;
  height: 100%;
  flex: 1;
  overflow: auto;
}

.dev-scene-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}
.dev-canvas-scene-container{
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.dev-canvas-scene{
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>
