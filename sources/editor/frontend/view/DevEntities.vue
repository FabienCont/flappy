<template>
  <div class="dev-entities-container">
    Entity:
    <dev-button v-if="!addingEntity" @click="add()">Add entity</dev-button>
    <div v-else>
      <dev-select @input="(val)=>addedEntity=entitiesList[val]" :border="false" :default="getEntities()" :options="entitiesList"></dev-select>
      <div class="flex">
        <dev-button @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="(entity , indexEntity)  in sceneEntities" :key="indexEntity">
      <div class="dev-entities">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleEntity(indexEntity)" :iconName="getIconType(indexEntity)"></dev-icon>
        {{entity.scope}}/{{entity.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteEntity(indexEntity)" iconName="delete"></dev-icon>
      </div>
      <div v-if="indexEntity === entityFocus">
        <div class="dev-entities-inspect">
          <dev-entity-components @add-component="addComponent" @update-component-param="updateComponentParam" @update-component="updateComponent" @delete-component="deleteComponent" :entity='entity' :componentsModel='componentsModel'></dev-entity-components>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevEntityComponents from "editor/frontend/view/DevEntityComponents.vue";
import {mapGetters} from "vuex";

export default {
  name:'DevEntities',
  components:{DevEntityComponents},
  data(){
    return {
      svgSize:"2rem",
      entityFocus:-1,
      addingEntity:false,
      addedEntity:null
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  computed:{
    ...mapGetters({
      componentDico:"arborescence/componentDico",
    }),
    sceneEntities:function(){
      let sceneEntities=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='entities.json')
      if(sceneEntities)return this.sceneFiles[sceneEntities[0]].content;
      return []
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
    },
    cancel:function(){
      this.addingComponent=false;
    },
    validComponent:function(val){
      this.$emit("add-component",{name:this.addedComponent.file.split('.')[0],scope:this.addedComponent.scope})
      this.addingComponent=false;
    },
    getComponentValue:function(component,paramName){
      if(component.params)
      return component.params[paramName]
      return undefined;
    },
    updateComponentParam:function({component,name,val}){
      this.$emit("update-component-param",{component,name,val});
    },
    updateComponent:function({name,scope,val}){
      this.$emit("update-component",{name,scope,val})
    },
    deleteComponent:function(name,scope){
      this.$emit("delete-component",{name,scope})
    },
    getIconType:function(index){
      if(this.entityFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleEntity:function(index){
      if(this.entityFocus===index){
        this.entityFocus=-1;
      }else this.entityFocus=index;
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
.dev-entities-container{
  margin-bottom: 1rem;
}

.dev-entities{
  display: flex;
  align-items: center;
}

.dev-entities-inspect{

}

</style>
