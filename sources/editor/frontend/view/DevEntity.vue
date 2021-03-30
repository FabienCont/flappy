<template>
  <div class="dev-entity">
    <main-pane-container>
      <div @keydown.ctrl.83.prevent="saveElement()"  @keydown.ctrl.90.prevent="copyProps()" class="dev-entity-container">
        <div class="dev-canvas-entity-container">
          <div class="dev-canvas-entity">
          </div>
        </div>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>Entity</h3>
      <dev-input  name='filename' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input v-show='scope!==null' name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
     <div class="flex" v-if="isElementModify">
       <dev-button class="dev-entity-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-entity-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-entity-icon" @click="deleteElement()">Delete</dev-button>
     </div>
      <dev-scene-config :debugVariables="debugVariables"></dev-scene-config>
     <dev-separator></dev-separator>
     <div>
       <dev-entity-components  v-if="entityFileCopy.content" @add-component="addComponent" @update-component-param="updateComponentParam" @delete-component="deleteComponent" :entity='entityFileCopy.content' :componentsModel='componentsModel'></dev-entity-components>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import DevEntityComponents from "editor/frontend/view/DevEntityComponents.vue";
import DevSceneConfig from "editor/frontend/view/DevSceneConfig.vue";
import Theatre from 'core/theatre';

export default {
  name: 'devEntity',
  components:{
    DetailPaneContainer,MainPaneContainer,DevEntityComponents,DevSceneConfig
  },
  data(){
    return {
      // svgSize:"1.7em",
       nameCopy:"",
       scopeCopy:"",
       entityFileCopy:{content:null},
       entityFile:{content:null},
       componentFiles:{},
       theatreInstance:null,
       debugVariables:{},
    }
  },
  beforeDestroy(){
    if(this.theatreInstance){
      this.theatreInstance.destroy();
    }
  },
  created(){
    this.copyProps();
  },
  mounted(){
    let container =  this.$el.querySelector('.dev-canvas-entity');
    this.theatreInstance = new Theatre({
      container,
      expose: false,
      sharp: true,
      scenarioCtx: require.context('editor/frontend/theatre/editEntity/lifecycles/', true, /^\.\/scenario\.json$/, 'sync'),
      hooksCtx:require.context('editor/frontend/theatre/editEntity/lifecycles/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
      modelsCtx:require.context('editor/frontend/theatre/editEntity/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
      loadingTime:0,
      params:{
        components:this.componentFiles,
        entity:this.entityFileCopy
      },
      focus:true
    });
    this.$set(this.theatreInstance,'$variables',{})
  },
  props: {
    params:{
      path:String,
      content:Object,
    }
  },
  watch:{
    'theatreInstance.$variables':function(newVal,oldVal){
      if(newVal && newVal.$debug){
          this.debugVariables=newVal.$debug
      }else return {}
    },
    params:function(val){
      this.copyProps();
    },
    entityFile:{
      deep:true,
      handler:function(val){
        this.entityFileCopy = Object.assign(this.entityFileCopy, JSON.parse(JSON.stringify(val)));
        this.nameCopy=this.entityFileCopy.name;
        this.scopeCopy=this.entityFileCopy.scope;
      }
    }
  },
  computed:{
    componentsModel:function(){
      return Object.values(this.componentFiles).map((value)=>{return {scope:value.scope,...value.content}})
    },
    type:function(){
      if(this.entityFile){
          return this.entityFile.type
      }else return "";
    },
    scope:function(){
      if(this.entityFile){
          return this.entityFile.scope
      }else return "";
    },
    name:function(){
      if(this.entityFile){
          return this.entityFile.name
      }else return "";
    },
    isElementModify:function(){
      if(JSON.stringify(this.entityFile) !== JSON.stringify(this.entityFileCopy) || this.nameCopy!==this.entityFile.name || this.scopeCopy!==this.entityFile.scope){
        return true;
      }else return false;
    }
  },
  methods:{
    copyProps:function(){
      this.params.forEach((file,i)=>{
        if(file.type==='entities'){
          this.entityFile=Object.assign({},this.entityFile,file);
        }else if(file.type==='components'){
          this.componentFiles[file.path]=file;
        }else{
          console.error('file not recognize',file);
        }
      });
    },
    addComponent:function(component){
      this.entityFileCopy.content.components.push(component)
    },
    updateComponentParam:function({component,path,val}){
      let index=this.entityFileCopy.content.components.findIndex((comp)=>comp.name ===component.name && comp.scope===component.scope);
      if(index!==-1){
        let components=this.entityFileCopy.content.components;
        if(!components[index].params){
          components[index].params={}
        }
        let maxLength=path.length;
        let param=components[index].params;
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
        this.$set(this.entityFileCopy.content,'components',components);
        this.entityFileCopy.content.components.splice(this.entityFileCopy.content.components.length);
      }
    },
    deleteComponent:function({name,scope}){
        let indexComponent=this.entityFileCopy.content.components.findIndex((component)=>component.name===name && component.scope===scope);
        this.entityFileCopy.content.components.splice(indexComponent, 1);
    },
    saveElement:function(){
      if(this.isElementModify){
        this.entityFileCopy.content.name=this.nameCopy.split('.json')[0];
        this.entityFileCopy.content.scope=this.scopeCopy;
        this.$emit("save",{type:this.type,scope:this.scopeCopy,name:this.nameCopy,content:this.entityFileCopy.content});
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

.dev-entity{
  display: flex;
  height: 100%;
  flex: 1;
  overflow: auto;
}

.dev-entity-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}
.dev-canvas-entity-container{
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.dev-canvas-entity{
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>
