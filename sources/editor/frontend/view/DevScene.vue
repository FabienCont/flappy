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
     <div v-if="isElementModify">
       <dev-button class="dev-scene-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-scene-icon" @click="cancelModification()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-scene-icon" @click="deleteElement()">Delete</dev-button>
     </div>
     <dev-separator></dev-separator>
     <div>
       <dev-entities :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
        :componentsModel='componentFiles' @delete-entity="deleteEntity" @add-entity='addEntity' @delete-entity-component='deleteEntityComponent' @add-entity-component='addEntityComponent'
        @update-entity-component='updateEntityComponent'></dev-entities>
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
       theatreInstance:null,
       sceneFiles:{},
       sceneFilesStr:"",
       sceneFilesCopy:{},
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
        sceneFiles:this.sceneFilesCopy
      },
      focus:false
    });
  },
  props: {
    params:Array
  },
  watch:{
    params:function(val){
      val.forEach((file,i)=>{
        if(file.type==='scenes'){
          this.$set(this.sceneFiles,file.path,file);
          this.$set(this.sceneFilesCopy,file.path,JSON.parse(JSON.stringify(file)));
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
        this.sceneFilesStr=JSON.stringify(val);
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
      if(this.sceneFilesStr !== JSON.stringify(this.sceneFilesCopy)){
        return true;
      }else return false;
    }
  },
  methods:{
    cancelModification:function(){
      Object.keys(this.sceneFilesCopy).forEach((key)=>this.$delete(this.sceneFilesCopy,key));
      Object.entries(this.sceneFiles).forEach(([key,value])=>this.$set(this.sceneFilesCopy,key,JSON.parse(JSON.stringify(value))))
    },
    getSceneFile:function(){
      return Object.values(this.sceneFilesCopy).find((value)=>{
          return value.name==="entities.json"
      })
    },
    addEntityComponent:function({index,component}){
      let fileFound= this.getSceneFile();
      if(fileFound){
        fileFound.content[index].components.push(component)
      }
    },
    deleteEntityComponent:function({index,name,scope}){
      let fileFound= this.getSceneFile();
      if(fileFound){
       let indexComponent=fileFound.content[index].components.findIndex((component)=>component.name===name && component.scope===scope);
       this.entityFileCopy.content.components.splice(indexComponent, 1);
      }
    },
    updateEntityComponent:function({index,component,path,val}){

      let fileFound= this.getSceneFile();
      if(fileFound){
        let entity=fileFound.content[index];
        let indexComponent=entity.components.findIndex((comp)=>comp.name ===component.name && comp.scope===component.scope);
        if(indexComponent===-1){
          entity.components.push({name:component.name,scope:component.scope,params:{}})
          indexComponent=entity.components.length-1;
        }
        if(indexComponent!==-1){
          let components=entity.components;
          if(!components[indexComponent].params){
            components[indexComponent].params={}
          }
          let maxLength=path.length;
          let param=components[indexComponent].params;
          for(let i=0;i<maxLength;i++){
              if(i===maxLength-1){
                this.$set(param,path[i],val);
                if(typeof param[path[i]] ==='array'){
                  param[path[i]].splice(param[path[i]].length);
                }
              }else{
                if(param[path[i]]===undefined){
                  if(typeof path[i] === 'number'){
                    this.$set(param,path[i],[]);
                  }else{
                    this.$set(param,path[i],{});
                  }
                }
                param=param[path[i]]
              }
          }
          this.$set(this.entityFileCopy.content,'components',components);
        }
      }
    },
    deleteEntity:function({index}){
      let fileFound= this.getSceneFile();
      if(fileFound){
        fileFound.content.splice(index, 1);
      }
    },
    addEntity:function(entity){
      let fileFound= this.getSceneFile();
      if(fileFound){
        fileFound.content.push(entity)
      }
    },
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
