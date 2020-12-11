<template>
  <div class="dev-models">
    <h3>assets</h3>
    <template v-for="(type,keyType) of models">
      <div @click.stop.prevent="toggleTypeModel(keyType)">
        <div class="dev-models-dropdown">
          <dev-icon :width="svgSize" :height="svgSize" :iconName="getTypeIcon(keyType)"></dev-icon>
          <span> {{keyType}}</span>
          <dev-icon @click.stop.prevent="newTypeElement(keyType)" class="dev-models-type-add" :width="svgSize" :height="svgSize" iconName="add"></dev-icon>
        </div>
        <div class="dev-models-scope" v-if="isTypeOpen(keyType)" v-for="(scope,keyScope) of type">
          <div class="dev-models-dropdown" @click.stop.prevent="toggleScopeModel(keyScope)">
            <dev-icon :width="svgSize" :height="svgSize" :iconName="getScopeIcon(keyType)"></dev-icon>
            <span> {{keyScope}}</span>
          </div>
          <div  class="dev-models-name-container" v-if="isScopeOpen(keyScope)" v-for="(name,keyName) of scope">
            <div class="dev-models-name" @click.stop.prevent="selectPreviewElement(keyType,keyScope,keyName)">
              <span> {{keyName}}</span>
            </div>
            <dev-icon class="dev-models-name-delete" @click.stop.prevent="deleteElement" :width="svgSize" :height="svgSize" iconName="delete"></dev-icon>
          </div>
        </div>
      </div>
    </template>
    <div class="dev-model-preview" v-if="elementPreview!==null">
      <dev-separator/>
      <dev-image-preview v-if="typePreview==='images'"  @edit-sprites="editSprites" @delete-model="childDeleteModel" @save-model="childSaveModel" :type="typePreview" :name="namePreview" :scope="scopePreview" :element="elementPreview">
      </dev-image-preview>
      <dev-sprites-preview v-else-if="typePreview==='sprites'" @edit-images="editImages" @delete-model="childDeleteModel" @save-model="childSaveModel" :type="typePreview" :name="namePreview" :scope="scopePreview" :sprites="sprites" :element="elementPreview">
      </dev-sprites-preview>
      <dev-array-inspect v-else :name="namePreview" :depth="0" :arrayToInspect.sync="elementPreview">
      </dev-array-inspect>
    </div>
  </div>
</template>

<script>
import {callAssetsApi,getAssetFromServer} from "debug/utils/assetsApi";
import DevImagePreview from "debug/view/DevImagePreview.vue";
import DevSpritesPreview from "debug/view/DevSpritesPreview.vue";
//check Ref
export default {
  name: 'devassets',
  components:{
    DevImagePreview,
    DevSpritesPreview
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
      sprites:null
    }
  },
  props: {
    models:Object
  },
  computed:{
  },
  methods:{
    editSprites:function(){
      this.selectPreviewElement("sprites",this.scopePreview,this.namePreview);
    },
    editImages:function(){
      this.selectPreviewElement("images",this.scopePreview,this.namePreview);
    },
    newTypeElement:function(type){
      this.typePreview=type;
      this.scopePreview="";
      this.namePreview="";
      this.elementPreview="";
    },
    childSaveModel:function(objectToSend){
      callAssetsApi(this.typePreview,objectToSend.scope,objectToSend.name,objectToSend.content);
    },
    childDeleteModel:function(objectToSend){
      console.alert("Not implemented");
    },
    selectPreviewElement: function(typePreview,scopePreview,namePreview){
      if(typePreview==="images"){
        getAssetFromServer(typePreview,scopePreview,namePreview).then((fileContent)=> {
          this.typePreview=typePreview;
          this.scopePreview=scopePreview;
          this.namePreview=namePreview;
          this.elementPreview=fileContent;
        });
      }else if(typePreview==="sprites"){
        this.sprites=null;
        getAssetFromServer(this.typePreview,scopePreview,namePreview).then((fileContent)=> {
          this.sprites=fileContent;
          getAssetFromServer(typePreview,scopePreview,namePreview).then((fileContent)=>{
            this.typePreview=typePreview;
            this.scopePreview=scopePreview;
            this.namePreview=namePreview;
            this.elementPreview=fileContent;
          }).catch(()=>{
            this.typePreview=typePreview;
            this.scopePreview=scopePreview;
            this.namePreview=namePreview;
            this.elementPreview="";
          });
        });

      }else{
        this.typePreview=typePreview;
        this.scopePreview=scopePreview;
        this.namePreview=namePreview;
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

 .dev-models-type-add{
   cursor: pointer;
 }
 .dev-models-name-container{
   display: flex;
   flex:1;
   align-items: center;
 }

 .dev-models-name-delete{
   cursor: pointer;
 }
</style>
