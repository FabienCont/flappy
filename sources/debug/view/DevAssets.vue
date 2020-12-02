<template>
  <div class="dev-models">
    <h3>assets</h3>
    <template v-for="(type,keyType) of models">
      <div @click.stop.prevent="toggleTypeModel(keyType)">
        <div class="dev-models-dropdown">
          <dev-icon :width="svgSize" :height="svgSize" :iconName="getTypeIcon(keyType)"></dev-icon>
          <span> {{keyType}}</span>
        </div>
        <div class="dev-models-scope" v-if="isTypeOpen(keyType)" v-for="(scope,keyScope) of type">
          <div class="dev-models-dropdown" @click.stop.prevent="toggleScopeModel(keyScope)">
            <dev-icon :width="svgSize" :height="svgSize" :iconName="getScopeIcon(keyType)"></dev-icon>
            <span> {{keyScope}}</span>
          </div>
          <div  class="dev-models-name" v-if="isScopeOpen(keyScope)" v-for="(name,keyName) of scope">
            <div @click.stop.prevent="selectPreviewElement(keyType,keyScope,keyName)">
              <span> {{keyName}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="dev-model-preview" v-if="elementPreview">
      <dev-separator/>
      <dev-image-preview v-if="typePreview==='images'||typePreview==='spritesheets'" @saveModel="childSaveModel" :name="namePreview" :scope="scopePreview" :element="elementPreview">
      </dev-image-preview>
      <dev-array-inspect v-else :name="namePreview" :depth="0" :arrayToInspect.sync="elementPreview">
      </dev-array-inspect>
    </div>
  </div>
</template>

<script>
import {callAssetsApi,getAssetFromServer} from "debug/utils/assetsApi";
import DevImagePreview from "debug/view/DevImagePreview.vue";
//check Ref
export default {
  name: 'devassets',
  components:{
    DevImagePreview
  },
  data(){
    return {
      typeOpenedArray:[],
      scopeOpenedArray:[],
      svgSize:"1.7em",
      elementPreview:null,
      typePreview:null,
      scopePreview:null,
      namePreview:null,
    }
  },
  props: {
    models:Object
  },
  computed:{
  },
  methods:{
    childSaveModel:function(objectToSend){
      callAssetsApi(this.typePreview,objectToSend.scope,objectToSend.name,objectToSend.content);
    },
    selectPreviewElement: function(typePreview,scopePreview,namePreview){
      this.typePreview=typePreview;
      this.scopePreview=scopePreview;
      this.namePreview=namePreview;
      if(typePreview==="images"||typePreview==="spritesheets"){
        getAssetFromServer(typePreview,scopePreview,namePreview).then((fileContent)=> {
          this.elementPreview=fileContent;
        });
      }else{
        this.elementPreview=this.models[typePreview][scopePreview][namePreview]()
      }
    },
    isTypeOpen:function(keyType){
      return this.typeOpenedArray.includes(keyType)
    },
    isScopeOpen:function(keyScope){
      return this.scopeOpenedArray.includes(keyScope)
    },
    toggleTypeModel:function(keyType){
      if(this.isTypeOpen(keyType)){
        this.typeOpenedArray=this.typeOpenedArray.filter((key)=>key!==keyType);
      }else this.typeOpenedArray.push(keyType)
    },
    toggleScopeModel:function(keyScope){
      if(this.isScopeOpen(keyScope)){
        this.scopeOpenedArray=this.scopeOpenedArray.filter((key)=>key!==keyScope);
      }else this.scopeOpenedArray.push(keyScope)
    },
    getTypeIcon:function(keyType){
      if(this.isTypeOpen(keyType)){
        return 'right';
      }else return 'bottom';
    },
    getScopeIcon:function(keyScope){
      if(this.isScopeOpen(keyScope)){
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
 .dev-models-dropdown{
   display: flex;
   align-items: center;
 }
 .dev-models-name{
   margin-left: 0.5rem;
 }
 .dev-models-name:hover{
   text-decoration: underline;
   cursor: pointer;
 }
 .dev-model-preview{
   width: 100%
 }
</style>
