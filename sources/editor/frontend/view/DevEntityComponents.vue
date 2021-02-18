<template>
  <div class="dev-entity-components-container">
    Components:
    <dev-button v-if="!addingComponent" @click="addComponent()">Add Component</dev-button>
    <div  v-else>
      <dev-select @input="(val)=>addComponent(component,componentList[val])" :border="false" :default="getDefaultComponent(component)" :options="Object.keys(componentList)"></dev-select>
      <dev-button @click="validComponent()">Valid</dev-button>
      <dev-button @click="cancel()">Cancel</dev-button>
    </div>
    <div v-for="(component , indexComponent)  in entity.components" :key="indexComponent">
      <div class="dev-entity-component">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleComponentParams(indexComponent)" :iconName="getIconType(indexComponent)"></dev-icon>
        {{getDefaultComponent(component)}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteComponent(component.name,component.scope)" iconName="delete"></dev-icon>
      </div>
      <div v-if="indexComponent === componentsFocus">
        <div class="dev-entity-components-param">
          <dev-entity-param v-for="([paramName,paramValue] , indexParam)  in getAllParams(component)"
           @update-param="updateComponentParam" :key="indexParam" :component='component' :name='paramName'
           :value='getComponentValue(component,paramName)' :paramModel='paramValue'></dev-entity-param>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevEntityParam from "editor/frontend/view/DevEntityParam.vue";
import {mapGetters} from "vuex";

export default {
  name:'DevEntityComponents',
  components:{DevEntityParam},
  data(){
    return {
      svgSize:"2rem",
      componentsFocus:-1,
      addingComponent:false
    }
  },
  props:{
    entity:{type:Object},
    componentsModel:{type:Array},
  },
  computed:{
    ...mapGetters({
      componentDico:"arborescence/componentDico"
    }),
    componentList:function(){
      let componentList={};
      Object.entries(this.componentDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
            componentList[scope+'/'+filename]={scope:scope,file:filename};
        });
      });
      return componentList
    },
    AddableComponentList:function(){
      let filteredList=[]
      this.entity.components.forEach((component)=>{
        let foundComponent=this.componentList.find((compo)=>{
          return compo.file.split('.')[0] ===component.name && compo.scope ===component.scope
        })
        if(!foundComponent){
          filteredList.push(component)
        }
     });
    }
  },
  methods:{
    addComponent:function(){
      this.addingComponent=true;
    },
    cancel:function(){
      this.addingComponent=false;
    },
    validComponent:function(val){
      this.$emit("add-component",{file:val.file,scope:val.scope})
      this.addingComponent=false;
    },
    getComponentValue:function(component,paramName){
      if(component.params)
      return component.params[paramName]
      return null;
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
    getDefaultComponent:function(component){
      let foundComponent=Object.entries(this.componentList).find(([key,value])=>{
        if(value.file.split('.')[0]===component.name && value.scope===component.scope ){
          return true;
        }
        return false;
      })
      if(foundComponent){
        return foundComponent[0]
      }
      return Object.keys(this.componentList)[0]
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
