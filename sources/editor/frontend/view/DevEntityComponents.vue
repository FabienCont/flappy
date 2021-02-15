<template>
  <div class="dev-entity-components-container">
    <div v-for="(component , indexComponent)  in entity.components" :key="indexComponent">
      <div class="dev-entity-component">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleComponentParams(indexComponent)" :iconName="getIconType(indexComponent)"></dev-icon>
        <dev-select @input="(val)=>updateComponent(componentList[val])" :border="false" :default="getDefaultComponent(component)" :options="Object.keys(componentList)"></dev-select>
      </div>
      <div v-if="indexComponent === componentsFocus">
        <div class="dev-entity-components-param" v-if="component.params">
        <!-- <dev-button @click="addParam()">Add Param</dev-button> -->
          <template v-for="([paramName,paramValue] , indexParam)  in Object.entries(component.params)">
            <dev-entity-param :key="indexParam" :name='paramName' :value='paramValue' :paramModel='getParamModel(component,paramName)'></dev-entity-param>
          </template>
          </div>
        <div class="dev-entity-components-param-default">
          <template v-for="([paramName,paramValue] , indexParam)  in defaultParams(component)">
            <dev-entity-default  :key="'default'+indexParam" :name='paramName' :value='paramValue' :paramModel='getParamModel(component,paramName)'></dev-entity-default>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevEntityParam from "editor/frontend/view/DevEntityParam.vue";
import DevEntityDefault from "editor/frontend/view/DevEntityDefault.vue"
import {mapGetters} from "vuex";

export default {
  name:'DevEntityComponents',
  components:{DevEntityParam,DevEntityDefault},
  data(){
    return {
      svgSize:"2rem",
      componentsFocus:-1,
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
  },
  methods:{
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
    updateComponent:function(val){

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
