<template>
  <div class="dev-preview-img-container">
    <div class="dev-preview-img-toolbar">
      <h3>{{type}}</h3>
    </div>
    <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
    <dev-input name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
    <div v-if="elementCopy!==''" class="dev-preview-img-content">
      <img :src="src" class="dev-preview-img" >
    </div>
    <div class="dev-preview-img-upload-content">
        <span>Select a new file</span>
        <dev-upload accept="image/png" @update-file="updateFile" ></dev-upload>
    </div>
    <div v-if="isElementModify">
      <dev-button class="dev-preview-img-icon" @click="saveElement()">Save</dev-button>
      <dev-button class="dev-preview-img-icon" @click="copyElement()">Cancel</dev-button>
    </div>
    <div v-else>
      <dev-button class="dev-preview-img-icon" @click="editSprites()">Edit Animations</dev-button>
      <dev-button class="dev-preview-img-icon" @click="deleteElement()">Delete</dev-button>
    </div>
  </div>
</template>

<script>
import {callAssetsApi} from "debug/utils/assetsApi"

export default {
  name: 'DevAssetPreview',
  data(){
    return {
      base64:'data:image/png;base64,',
      svgSize:"1.7em",
      elementCopy:this.element,
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
    scope:String,
    type:String
  },
  watch:{
    element:function(){
      this.elementCopy=this.element;
      this.nameCopy=this.name;
      this.scopeCopy=this.scope;
    }
  },
  computed:{
    src:function(){
      console.log("updateSrc",this.elementCopy.startsWith(this.base64))
      return (this.elementCopy!=='' && !this.elementCopy.startsWith(this.base64))?this.base64+this.elementCopy:this.elementCopy;
    },
    isElementModify:function(){
      return this.element!==this.elementCopy || this.scopeCopy!==this.scope || this.nameCopy!==this.name;
    }
  },
  methods:{
    updateFile:function(file){
      if(this.nameCopy==='')this.nameCopy=file.name.split(".png")[0];
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.elementCopy= e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    copyElement:function(){
      this.elementCopy = this.element;
      this.nameCopy=this.name;
      this.scopeCopy=this.scope;
    },
    saveElement:function(){
      if(this.elementCopy.startsWith(this.base64))this.elementCopy=this.elementCopy.split(this.base64)[1];
      this.$emit("save-model",{scope:this.scopeCopy,name:this.nameCopy,content:this.elementCopy});
    },
    deleteElement:function(){
      this.$emit("delete-model");
    },
    editSprites:function(){
      this.$emit("edit-sprites");
    },
  }
}
</script>

<style lang="scss">

@import 'debug/styles/_variables';

.dev-preview-img-container{
  border:1px solid  $dev--color-color0;
}

.dev-preview-img-toolbar{
    display: flex;
    flex:1;
    align-items: center;
    border-bottom:1px solid $dev--color-color0;
}

.dev-preview-img-right-toolbar{
    display: flex;
    flex:1;
    justify-content: flex-end;
    color: $dev--color-color-light;
}

.dev-preview-img-toolbar-svg{
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

.dev-preview-img-upload-content{
  margin: 1rem;
}

.dev-preview-img{
  max-width: 100%;
  min-height: 20px;
  border:1px solid $dev--color-color0;
}
</style>
