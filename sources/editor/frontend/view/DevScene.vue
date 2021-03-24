<template>
  <div class="dev-scene">
    <main-pane-container>
      <div @keydown.ctrl.83.prevent="saveElement()"  @keydown.ctrl.90.prevent="cancelModification()"class="dev-scene-container">
        <div class="dev-canvas-scene-container">
          <div class="dev-canvas-scene">
          </div>
        </div>
      </div>
    </main-pane-container>
    <detail-pane-container>
     <h3>Scene {{scope}} </h3>
     <div class="flex" v-if="isElementModify">
       <dev-button class="dev-scene-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-scene-icon" @click="cancelModification()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-scene-icon" @click="deleteElement()">Delete</dev-button>
     </div>
     <span>Debug Info :</span>
     <div>
       <dev-button @click="toggleDebugInfo" v-if="showDebugInfo">show</dev-button>
       <template v-else>
         <dev-button @click="toggleDebugInfo">hide</dev-button>
            <dev-checkbox v-if="typeof debugVariables.followGrid ==='boolean'" label="followGrid" @input="(val)=> debugVariables.followGrid=val" :val="debugVariables.followGrid" ></dev-checkbox>
            <dev-input v-if="debugVariables.stepGrid" @update:inputValue="(val)=>debugVariables.stepGrid=val" :isEditable="true" type="number" name="stepGrid" :inputValue="debugVariables.stepGrid"></dev-input>
        </template>
     </div>
     <dev-separator></dev-separator>
     <div>
       <div class="dev-tab-group flex align-center">
         <dev-tab @click="()=>selectedMenu=menu" :isActive="menu=== selectedMenu" v-for="menu in listMenu" :key="menu">{{menu}}</dev-tab>
       </div>
     </div>
     <div>
       <dev-entities v-if="selectedMenu==='Entities'" :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
        :componentsModel='componentFiles' @delete-entity="deleteEntity" @add-entity='addEntity' @delete-entity-component='deleteEntityComponent' @add-entity-component='addEntityComponent'
        @update-entity-component='updateEntityComponent'></dev-entities>
       <dev-cameras v-else-if="selectedMenu==='Cameras'" :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
       :componentsModel='componentFiles'  @add='addCamera' @remove='removeCamera' @update='updateCamera'></dev-cameras>
       <dev-variables v-else-if="selectedMenu==='Variables'" :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
        :componentsModel='componentFiles'  @add='addVariable' @remove='removeVariable' @update='updateVariable'></dev-variables>
        <dev-inputs v-else-if="selectedMenu==='Inputs'" :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
       :componentsModel='componentFiles' @remove="deleteInput" @add="addInput"></dev-inputs>
       <dev-systems v-else-if="selectedMenu==='Systems'" :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
        :componentsModel='componentFiles' @swap='swapSystem' @add='addSystem' @remove='removeSystem' @update='updateSystem'></dev-systems>
       <dev-renderers v-else-if="selectedMenu==='Renderers'" :sceneFiles='sceneFilesCopy' :entitiesModel='entityFiles'
        :componentsModel='componentFiles' @swap='swapRenderer'  @add='addRenderer' @remove='removeRenderer' @update='updateRenderer'></dev-renderers>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import DevEntities from "editor/frontend/view/DevEntities.vue";
import DevCameras from "editor/frontend/view/DevCameras.vue";
import DevRenderers from "editor/frontend/view/DevRenderers.vue";
import DevInputs from "editor/frontend/view/DevInputs.vue";
import DevSystems from "editor/frontend/view/DevSystems.vue";
import DevVariables from "editor/frontend/view/DevVariables.vue";
import Theatre from 'core/theatre';
import { mapGetters,mapActions } from 'vuex';

export default {
  name: 'devScene',
  components:{
    DetailPaneContainer,MainPaneContainer,DevEntities,DevCameras,DevRenderers,DevInputs,DevSystems,DevVariables
  },
  data(){
    return {
      // svgSize:"1.7em",
       theatreInstance:null,
       sceneFiles:{},
       sceneFilesStr:"",
       sceneFilesCopy:{},
       componentFiles:{},
       entityFiles:{},
       showDebugInfo:false,
       debugVariables:{},
       theatreVariables:null,
       selectedMenu:'Entities',
       listMenu:[
         'Entities',
         'Cameras',
         'Variables',
         'Inputs',
         'Renderers',
         'Systems',
       ]
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
        sceneFiles:this.sceneFilesCopy,
        updateComponent:this.updateComponent,
        copyEntity:this.copyEntity,
        pasteEntity:this.pasteEntity,
        focusEntity:this.focusEntity,
        deleteEntity:this.deleteEntity
      },
      entityCopied:null,
      focus:false
    });
    this.$set(this.theatreInstance,'$variables',{})
  },
  props: {
    params:Array
  },
  watch:{
    'theatreInstance.$variables':function(newVal,oldVal){
      if(newVal && newVal.$debug){
          this.debugVariables=newVal.$debug
      }else return {}
    },
    params:function(val){
      val.forEach((file,i)=>{
        if(file.type==='scenes'){
          this.$set(this.sceneFiles,file.path,file);
          this.$set(this.sceneFilesCopy,file.path,JSON.parse(JSON.stringify(file)));
        }else if(file.type==='entities'){
          this.entityFiles[file.path]=file;
        }else if(file.type==='components'){
          this.componentFiles[file.path]=file;
        }
        else{
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
    toggleDebugInfo:function(){
      this.showDebugInfo=!this.showDebugInfo;
    },
    copyEntity:function(index){
      let fileFound= this.getEntitiesFile();
      if(fileFound){
        this.entityCopied=JSON.parse(JSON.stringify(fileFound.content[index]));
      }
    },
    setPosition:function(entity,x,y){
      let positionIndex=entity.components.findIndex((comp)=> comp.name==='position')
      if(positionIndex===-1){
        entity.components.push({'name':'position','scope':'common','params':{'x':x,'y':y}})
      }
      else {
        let position=JSON.parse(JSON.stringify(entity.components[positionIndex]))
        if(!position.params) position.params={}
        position.params.x=x;
        position.params.y=y;
        entity.components[positionIndex]=position
      }
    },
    pasteEntity:function(x,y){
      if(this.entityCopied){
        let newEntity=JSON.parse(JSON.stringify(this.entityCopied))
        this.setPosition(newEntity,x,y);
        this.addEntity(newEntity)
      }
    },
    focusEntity:function(){
      if(this.selectedMenu ==='Entities'){
        //TODO send Focus to component DevEntities
      }
    },
    cancelModification:function(){
      Object.keys(this.sceneFilesCopy).forEach((key)=>this.$delete(this.sceneFilesCopy,key));
      Object.entries(this.sceneFiles).forEach(([key,value])=>this.$set(this.sceneFilesCopy,key,JSON.parse(JSON.stringify(value))))
    },
    getSceneFile:function(filename){
      return Object.values(this.sceneFilesCopy).find((value)=>{
          return value.name===filename
      })
    },
    getEntitiesFile:function(){
      return this.getSceneFile('entities.json');
    },
    getInputsFile:function(){
      return this.getSceneFile('inputs.json');
    },
    getVariablesFile:function(){
      return this.getSceneFile('variables.json');
    },
    getCamerasFile:function(){
      return this.getSceneFile('cameras.json');
    },
    getSystemsFile:function(){
      return this.getSceneFile('systems.json');
    },
    getRenderersFile:function(){
      return this.getSceneFile('renderers.json');
    },
    addEntityComponent:function({index,component}){
      let fileFound= this.getEntitiesFile();
      if(fileFound){
        fileFound.content[index].components.push(component)
      }
    },
    deleteEntityComponent:function({index,name,scope}){
      let fileFound= this.getEntitiesFile();
      if(fileFound){
       let indexComponent=fileFound.content[index].components.findIndex((component)=>component.name===name && component.scope===scope);
       if(indexComponent!==-1){
         fileFound.content[index].components.splice(indexComponent, 1);
       }
      }
    },
    updateComponent:function({index,component,val}){
      let fileFound= this.getEntitiesFile();
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
          this.$set(components[indexComponent],'params',val);
          entity.components.splice(entity.components.length);
        }
      }
    },
    updateEntityComponent:function({index,component,path,val}){
      let fileFound= this.getEntitiesFile();
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
                if(Array.isArray(param[path[i]])){
                  param[path[i]].splice(param[path[i]].length);
                }
              }else{
                if(param[path[i]]===undefined){
                  if(typeof path[i+1] === 'number'){
                    this.$set(param,path[i],[]);
                  }else{
                    this.$set(param,path[i],{});
                  }
                }
                param=param[path[i]]
              }
          }

          this.$set(entity,'components',components);
          entity.components.splice(entity.components.length);
        }
      }
    },
    deleteEntity:function({index}){
      let fileFound= this.getEntitiesFile();
      if(fileFound){
        fileFound.content.splice(index, 1);
      }
    },
    addEntity:function(entity){
      let fileFound= this.getEntitiesFile();
      if(fileFound){
        fileFound.content.push(entity)
      }
    },
    addInput:function(input){
      let fileFound= this.getInputsFile();
      if(fileFound){
        fileFound.content.push(input)
      }
    },
    deleteInput:function(index){
      let fileFound= this.getInputsFile();
      if(fileFound){
        fileFound.content.splice(index, 1);
      }
    },
    addRenderer:function(renderer){
      let fileFound= this.getRenderersFile();
      if(fileFound){
        fileFound.content.push(renderer)
      }
    },
    removeRenderer:function(index){
      let fileFound= this.getRenderersFile();
      if(fileFound){
        fileFound.content.splice(index, 1);
      }
    },
    updateRenderer:function({index,renderer}){
      let fileFound= this.getRenderersFile();
      if(fileFound){
        fileFound.content.splice(index, 1,renderer);
      }
    },
    swapRenderer:function({index, to}){
      let fileFound= this.getRenderersFile();
      if(fileFound){
        fileFound.content=this.swapPos(fileFound.content,index,to)
        fileFound.content.splice(fileFound.content.length);
      }
    },
    addSystem:function(system){
      let fileFound= this.getSystemsFile();
      if(fileFound){
        fileFound.content.push(system)
      }
    },
    removeSystem:function(index){
      let fileFound= this.getSystemsFile();
      if(fileFound){
        fileFound.content.splice(index, 1);
      }
    },
    updateSystem:function({index,system}){
      let fileFound= this.getSystemsFile();
      if(fileFound){
        fileFound.content.splice(index, 1,system);
      }
    },
    swapSystem:function({index, to}){
      let fileFound= this.getSystemsFile();
      if(fileFound){
        fileFound.content=this.swapPos(fileFound.content,index,to)
        fileFound.content.splice(fileFound.content.length);
      }
    },
    addCamera:function(camera){
      let fileFound= this.getCamerasFile();
      if(fileFound){
        fileFound.content.push(camera)
      }
    },
    removeCamera:function(index){
      let fileFound= this.getCamerasFile();
      if(fileFound){
        fileFound.content.splice(index, 1);
      }
    },
    updateCamera:function({index,camera}){
      let fileFound= this.getCamerasFile();
      if(fileFound){
        fileFound.content.splice(index, 1,camera);
      }
    },
    addVariable:function({name,value}){
      let fileFound=this.getVariablesFile();
      if(fileFound){
        this.$set(fileFound.content,name,value);
      }
    },
    removeVariable:function(name){
      let fileFound= this.getVariablesFile();
      if(fileFound){
        this.$delete(fileFound.content,name);
      }
    },
    updateVariable:function({name,value}){
      let fileFound= this.getVariablesFile();
      if(fileFound){
        this.$set(fileFound.content,name,value);
      }
    },
    swapPos:function(arr, from, to){
      [arr[from],arr[to]] = [arr[to],arr[from]];
      return arr;
    },
    saveElement:function(){
      if(this.isElementModify){
        let listFiles=Object.entries(this.sceneFiles)
        for (var i = 0; i < listFiles.length; i++) {
          let key=listFiles[i][0];
          let value=listFiles[i][1];
          if(JSON.stringify(this.sceneFilesCopy[key].content) !== JSON.stringify(value.content)){
                this.$emit("save",{folder:this.sceneFilesCopy[key].folder,type:this.sceneFilesCopy[key].type,scope:this.sceneFilesCopy[key].scope,name:this.sceneFilesCopy[key].name,content:this.sceneFilesCopy[key].content});
          }
        }
      }
    },
    deleteElement:function(){
      this.$emit("delete-elem",{type:this.type,scope:this.scope,name:this.name});
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

.dev-tab-group{
  overflow: auto;
}

</style>
