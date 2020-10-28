<template>
  <div class="dev-models">
    <h3>Models</h3>
    <template v-for="(type,keyType) of models">
      <div @click.stop.prevent="toggleTypeModel(keyType)">
        <div class="dev-models-dropdown-container">
          <span class="dev-models-dropdown">
            <dev-icon :width="svgSize" :height="svgSize" :iconName="getTypeIcon(keyType)"></dev-icon>
            {{keyType}}
          </span>
          <dev-icon @click.stop.prevent="newTypeElement(keyType)" class="dev-models-type-add" :width="svgSize" :height="svgSize" iconName="add"></dev-icon>
        </div>
        <div class="dev-models-scope" v-if="isTypeOpen(keyType)" v-for="(scope,keyScope) of type">
          <div class="dev-models-dropdown" @click.stop.prevent="toggleScopeModel(keyScope,keyType)">
            <dev-icon :width="svgSize" :height="svgSize" :iconName="getScopeIcon(keyScope)"></dev-icon>
            <span>{{keyScope}}</span>
          </div>
          <div class="dev-models-name-container" v-if="isScopeOpen(keyScope,keyType)" v-for="(name,keyName) of scope">
            <span class="dev-models-name" @click.stop.prevent="selectPreviewElement(keyType,keyScope,keyName)">
              {{keyName}}
            </span>
            <dev-icon class="dev-models-name-delete" @click.stop.prevent="deleteComponent" :width="svgSize" :height="svgSize" iconName="delete"></dev-icon>
          </div>
        </div>
      </div>
    </template>
    <div class="dev-model-preview" v-if="elementPreview">
      <dev-separator/>
      <dev-js-preview  v-if="typePreview ==='snippets' ||typePreview ==='systems'" :element="elementPreview">
      </dev-js-preview>
      <dev-components-preview @saveModel="childSaveModel" v-else-if="typePreview ==='components'" :elementScope="scopePreview" :element="elementPreview">
      </dev-components-preview>
      <dev-object-inspect v-else :name="namePreview" :depth="0" :objectToInspect="elementPreview">
      </dev-object-inspect>
    </div>
  </div>
</template>

<script>
import {callModelsApi,getModelFromServer} from "debug/utils/modelsApi";
import DevJsPreview from "debug/view/DevJsPreview.vue";
import DevComponentsPreview from "debug/view/DevComponentsPreview.vue";

//check Ref
export default {
  name: 'devmodels',
  components:{
    DevJsPreview,
    DevComponentsPreview
  },
  data(){
    return {
      openElements:{},
      typeOpenedArray:[],
      scopeOpenedArray:[],
      svgSize:"1.7em",
      elementPreview:{},
      typePreview:null,
      scopePreview:null,
      namePreview:null
    }
  },
  props: {
    models:Object
  },
  methods:{
    newTypeElement:function(type){
      this.typePreview=type;
      this.scopePreview="";
      this.namePreview="newElement";
      this.elementPreview={name:"newElement",params:{}};
    },
    deleteComponent:function(){
      //TODO:delete service
    },
    childSaveModel:function(objectToSend){
      callModelsApi(this.typePreview,objectToSend.scope,objectToSend.name,objectToSend.content);
    },
    selectPreviewElement: function(typePreview,scopePreview,namePreview){
      this.typePreview=typePreview;
      this.scopePreview=scopePreview;
      this.namePreview=namePreview;
      if(typePreview==="systems"||typePreview==="snippets"){
        getModelFromServer(typePreview,scopePreview,namePreview).then((fileContent)=> {
          this.elementPreview=fileContent;
        });
      }else{
        this.elementPreview=this.models[typePreview][scopePreview][namePreview]()
      }
    },
    isTypeOpen:function(keyType){
      return this.openElements[keyType]!==undefined;
    },
    isScopeOpen:function(keyScope,keyType){
      return this.isTypeOpen(keyType) && this.openElements[keyType][keyScope]!==undefined;;
    },
    toggleTypeModel:function(keyType){
      if(this.isTypeOpen(keyType)){
        this.$delete(this.openElements,keyType);
      }else this.$set(this.openElements,keyType,{});
    },
    toggleScopeModel:function(keyScope,keyType){
      if(this.isScopeOpen(keyScope,keyType)){
    this.$delete(this.openElements[keyType],keyScope);
  }else this.$set(this.openElements[keyType],keyScope,{});
    },
    getTypeIcon:function(keyType){
      if(this.isTypeOpen(keyType)){
        return 'right';
      }else return 'bottom';
    },
    getScopeIcon:function(keyScope,keyType){
      if(this.isScopeOpen(keyScope,keyType)){
        return 'right'
      }else return 'bottom'
    }
  }
}
</script>

<style lang="scss">

 .dev-models{
   margin-left: 0.5rem;
 }
 .dev-models-scope{
   margin-left: 1rem;
 }
 .dev-models-dropdown-container{
   display: flex;
   align-items: center;
 }
 .dev-models-dropdown{
   cursor: pointer;
 }
 .dev-models-dropdown:hover{
   text-decoration: underline;
 }
 .dev-models-type-add{
   cursor: pointer;
 }
 .dev-models-name-container{
   display: flex;
   flex:1;
   align-items: center;
 }
 .dev-models-name{
   margin-left: 0.5rem;
 }
 .dev-models-name:hover{
   text-decoration: underline;
   cursor: pointer;
 }
 .dev-models-name-delete{
   cursor: pointer;
 }
 .dev-model-preview{
   width: 100%
 }
</style>
