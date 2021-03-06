<template>
  <div class="dev-entity-components-container">
    Components:
    <dev-button v-if="!addingComponent" @click="addComponent()">Add Component</dev-button>
    <div v-else>
      <dev-select @input="(val)=>addedComponent=allComponents[val]" :border="false" :default="getUnusedComponent()" :options="unusedComponentList"></dev-select>
      <div class="flex">
        <dev-button @click="validComponent()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="(component , indexComponent)  in entityComponents" :key="indexComponent">
      <div @click.prevent="toggleComponentParams(indexComponent)" class="dev-entity-component">
        <dev-icon :width="svgSize" :height="svgSize" :iconName="getIconType(indexComponent)"></dev-icon>
        {{getDefaultComponent(component)}}
        <dev-icon :width="svgSize" :height="svgSize" @click.stop="deleteComponent(component.name,component.scope)" iconName="delete"></dev-icon>
      </div>
      <div v-if="indexComponent === componentsFocus">
        <div class="dev-entity-components-param">
          <template v-for="([paramName,paramValue] , indexParam)  in getAllParams(component)">
            <dev-entity-param
             @update-param="updateComponentParam" :key="indexParam" :component='component' :name='paramName'
             :value='component.params[paramName]' :paramModel='paramValue'></dev-entity-param>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevEntityParam from "editor/frontend/view/DevEntityParam.vue";
import {convertArrayToObject,mergeDeep} from "core/loadEntities.js";
import {mapGetters} from "vuex";

export default {
  name:'DevEntityComponents',
  components:{DevEntityParam},
  data(){
    return {
      svgSize:"2rem",
      componentsFocus:-1,
      addingComponent:false,
      addedComponent:null
    }
  },
  props:{
    entity:{type:Object},
    componentsModel:{type:Array},
    entitiesModel:{type:Array},
  },
  computed:{
    ...mapGetters({
      componentDico:"arborescence/componentDico",
    }),
    entityComponents:function(){
      let components=null;
      if(this.entitiesModel){
        let entityFound= this.entitiesModel.find((entity)=>entity.name=== this.entity.name&& entity.scope ===this.entity.scope);
        const componentsOverride = convertArrayToObject(entityFound.components, 'name');
        const componentsModel = convertArrayToObject(this.entity.components, 'name');
        const newEntityComponents = mergeDeep(componentsOverride,componentsModel);
        components=JSON.parse(JSON.stringify(Object.values(newEntityComponents)));
      }else{
        components=JSON.parse(JSON.stringify(this.entity.components));
      }
      components.forEach((component)=>{
        if(!component.params){
          component.params={};
        }
      })
      return components
    },
    allComponents:function(){
      let allComponents={};
      Object.entries(this.componentDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
          allComponents[scope+'/'+filename]={scope:scope,file:filename};
        });
      });
      return allComponents
    },
    unusedComponentList:function(){
      let unusedComponent=[]
      Object.entries(this.allComponents).forEach(([key,value])=>{
        let componentFound=this.entity.components.find((compo)=>compo.scope ===value.scope && compo.name ===value.file.split('.')[0]);
        if(!componentFound) unusedComponent.push(key)
      })
      return unusedComponent;
    },
  },
  methods:{
    addComponent:function(){
      this.addingComponent=true;
      this.addedComponent=this.allComponents[this.getUnusedComponent()];
    },
    cancel:function(){
      this.addingComponent=false;
    },
    validComponent:function(val){
      this.$emit("add-component",{name:this.addedComponent.file.split('.')[0],scope:this.addedComponent.scope})
      this.addingComponent=false;
    },
    updateComponentParam:function({component,path,val}){
      this.$emit("update-component-param",{component,path,val});
    },
    deleteComponent:function(name,scope){
      this.$emit("delete-component",{name,scope})
    },
    getIconType:function(index){
      if(this.componentsFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleComponentParams:function(index){
      if(this.componentsFocus===index){
        this.componentsFocus=-1;
      }else this.componentsFocus=index;
    },
    getAllParams:function(component){
      let componentModel=this.getComponentModel(component);
      if(componentModel){
        return Object.entries(componentModel.params)
      }
      return []
    },
    defaultParams:function(component){
      let componentModel=this.getComponentModel(component);
      if(componentModel){
        if(component.params){
          let defaultParam=Object.entries(componentModel.params).filter(([paramKey,paramValue])=>{
            return component.params[paramKey]===undefined
          });
          if(defaultParam)
          return defaultParam;
        }else {
          return Object.entries(componentModel.params)
        }
      }
      return []
    },
    getComponentModel:function(component){
      return this.componentsModel.find((componentModel)=>{
        if(componentModel.name === component.name&& componentModel.scope===component.scope)
          return true
          return false
      })
    },
    getParamModel:function(component,paramName){
      let foundComponent= this.getComponentModel(component)
      if(foundComponent && foundComponent.params &&  foundComponent.params[paramName]){
        return foundComponent.params[paramName]
      }
      return {}
    },
    getUnusedComponent:function(){
      if(this.unusedComponentList.length>0){
        return this.unusedComponentList[0]
      }
      return ""
    },
    getDefaultComponent:function(component){
      let foundComponent=Object.entries(this.allComponents).find(([key,value])=>{
        if(value.file.split('.')[0]===component.name && value.scope===component.scope ){
          return true;
        }
        return false;
      })
      if(foundComponent){
        return foundComponent[0]
      }
      return null;
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-entity-components-container{
  margin-bottom: 1rem;
}

.dev-entity-component{
  display: flex;
  align-items: center;
}

.dev-entity-components-param{

}

</style>
