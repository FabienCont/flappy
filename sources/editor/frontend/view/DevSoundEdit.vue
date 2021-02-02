<template>
  <div class="dev-sound-edit">
    <main-pane-container>
      <div class="dev-sound-edit-container">
        <audio v-if="src!==''" controls>
          <source :src="src" type="audio/ogg">
          <source :src="src" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
      <div class="dev-preview-sound-upload-content">
         <span>Select a new file</span>
         <dev-upload accept="audio/mpeg" @update-file="updateFile" ></dev-upload>
     </div>
     <div class="flex" v-if="isElementModify">
       <dev-button class="dev-preview-sound-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-preview-sound-icon" @click="copyElement()">Cancel</dev-button>
     </div>
     <div class="flex" v-else>
       <dev-button class="dev-preview-sound-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";

export default {
  name: 'DevSoundEdit',
  components:{
    DetailPaneContainer,MainPaneContainer
  },
  data(){
    return {
       base64:'data:audio/mpeg;base64,',
      // svgSize:"1.7em",
       contentCopy:this.params.content,
       nameCopy:"",
       scopeCopy:""
    }
  },
  props: {
    params:{
      path:String,
      content:Object,
    }
  },
  created(){
    this.copyProps();
  },
  watch:{
    params:function(){
      this.copyProps();
    }
  },
  computed:{
    paths:function(){
      return this.params.path.split('/');
    },
    type:function(){
      return this.paths[1]
    },
    name:function(){
      return this.paths[3]
    },
    scope:function(){
      return this.paths[2]
    },
    src:function(){
      return (this.contentCopy!=='' && !this.contentCopy.startsWith(this.base64))?this.base64+this.contentCopy:this.contentCopy;
    },
    isElementModify:function(){
      return this.params.content!==this.contentCopy || this.scopeCopy!==this.scope || this.nameCopy!==this.name;
    }
  },
  methods:{
    copyProps:function(){
      this.contentCopy = this.params.content;
      this.nameCopy=this.name,
      this.scopeCopy=this.scope
    },
    updateFile:function(file){
      if(this.nameCopy==='')this.nameCopy=file.name.split(".mp3")[0];
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.elementCopy= e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    saveElement:function(){
      if(this.elementCopy.startsWith(this.base64))this.elementCopy=this.elementCopy.split(this.base64)[1];
      this.$emit("save",{type:this.type,scope:this.scopeCopy,name:this.nameCopy,content:this.elementCopy});
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

<style lang="scss">

@import 'debug/styles/_variables';

.dev-sound-edit{
  display: flex;
  flex:1;
  height: 100%;
}

.dev-sound-edit-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}

.dev-sound-edit-preview{
    max-width: 100%;
    min-height: 20px;
    border:1px solid $dev--color-color0;
}

</style>
