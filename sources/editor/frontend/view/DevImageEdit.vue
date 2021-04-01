<template>
  <div class="dev-image-edit">
    <main-pane-container>
      <div class="dev-image-edit-container"  @dragenter.prevent @dragover.prevent @drop.prevent="updateFile">
        <img :src="src" class="dev-image-edit-preview" >
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input name='name' type="string" :full='true' @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input name='scope' type="string" :full='true' @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
      <div class="flex-column">
         <dev-upload ref="upload" accept="image/png" label="Select a new file" @change="updateFile" ></dev-upload>
     </div>
     <div class="flex" v-if="isElementModify">
       <dev-button class="dev-preview-img-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-preview-img-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div class="flex" v-else-if="!params.temp" >
       <dev-button  class="dev-preview-img-icon" @click="editSprites()">Edit Animations</dev-button>
       <dev-button class="dev-preview-img-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";

export default {
  name: 'DevImageEdit',
  components:{
    DetailPaneContainer,MainPaneContainer
  },
  data(){
    return {
       base64:'data:image/png;base64,',
      // svgSize:"1.7em",
       contentCopy:this.params.content,
       nameCopy:"",
       scopeCopy:"",
       src:"",
       filename:""
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
    },
    contentCopy:{
      immediate:true,
      handler:function(){
        if( this.contentCopy!=='' && !this.contentCopy.startsWith(this.base64)){
          this.src=this.base64+this.contentCopy;
        }else{
          this.src=this.contentCopy
        }
      },
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
    isElementModify:function(){
      return this.params.content!==this.contentCopy || this.scopeCopy!==this.scope || this.nameCopy!==this.name;
    }
  },
  methods:{
    uploadFile:function(event){
      let eventClone = new event.constructor(event.type, event)
      this.$refs.upload.$el.dispatchEvent(eventClone);
    },
    copyProps:function(){
      this.contentCopy = this.params.content;
      this.nameCopy=this.name,
      this.scopeCopy=this.scope
      this.filename="";
    },
    updateFile:function(event){
      let file=''
      if(event.target.files){
        file=event.target.files[0];
      }else{
        file =event.dataTransfer.files[0]
      }
      this.nameCopy=file.name;
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.contentCopy = e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    saveElement:function(){
      if(this.contentCopy.startsWith(this.base64))this.contentCopy=this.contentCopy.split(this.base64)[1];
      this.$emit("save",{type:this.type,scope:this.scopeCopy,name:this.nameCopy,content:this.contentCopy});
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

@import "editor/frontend/styles/_variables";

.dev-image-edit{
  display: flex;
  flex:1;
  height: 100%;
}

.dev-image-edit-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}

.dev-image-edit-preview{
    max-width: 100%;
    min-height: 20px;
    border:1px solid $dev--color-color0;
}

</style>
