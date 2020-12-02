<template>
  <div class="dev-preview-img-container">
    <div class="dev-preview-toolbar">
        <dev-icon class="dev-preview-toolbar-svg" :width="svgSize" :height="svgSize" iconName="cursor"></dev-icon>
        <dev-icon class="dev-preview-toolbar-svg" :width="svgSize" :height="svgSize" iconName="delete"></dev-icon>
    </div>
    <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
    <dev-input name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
    <div class="dev-preview-img-content">
      <img :src="src" class="dev-preview-img" >
    </div>
    <div v-if="isElementModify" class="dev-edit-buttons">
      <dev-button class="dev-preview-icon" @click="saveElement()">Save</dev-button>
      <dev-button class="dev-preview-icon" @click="copyElement()">Cancel</dev-button>
    </div>
  </div>
</template>

<script>
import {callAssetsApi} from "debug/utils/assetsApi"
//check Ref
export default {
  name: 'DevAssetPreview',
  data(){
    return {
      base64:'data:image/png;base64,',
      svgSize:"1.7em",
      elementCopy:JSON.parse(JSON.stringify(this.element)),
      nameCopy:this.name,
      scopeCopy:this.scope
    }
  },
  watch:{
    element:function(val){
      this.copyElement();
    }
  },
  props: {
    element:String,
    name:String,
    scope:String
  },
  computed:{
    src:function(){
      return this.base64+this.element;
    },
    isElementModify:function(){
      return JSON.stringify(this.element)!==JSON.stringify(this.elementCopy) || this.scopeCopy!==this.scope || this.nameCopy!==this.name;
    }
  },
  methods:{
    copyElement:function(){
      this.elementCopy = Object.assign({}, this.elementCopy, JSON.parse(JSON.stringify(this.element)));
      this.nameCopy=this.name;
      this.scopeCopy=this.scope;
    },
    saveElement:function(){
      this.$emit("saveModel",{scope:this.scopeCopy,name:this.nameCopy,content:this.elementCopy});
    },
  }
}
</script>

<style lang="scss">

@import 'debug/styles/_variables';

.dev-preview-img-container{
  border:1px solid  $dev--color-color0;
}

.dev-preview-toolbar{
    display: flex;
    flex:1;
    justify-content: flex-end;
    border-bottom:1px solid $dev--color-color0;
    color: $dev--color-color-light;
}

.dev-preview-toolbar-svg{
    margin-right: 1rem;
}


.dev-preview-img-content{
  width:80%;
  padding:1rem;
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}

.dev-preview-img{
  min-height: 20px;
  border:1px solid $dev--color-color0;
}
</style>
