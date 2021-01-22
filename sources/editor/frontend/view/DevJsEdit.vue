<template>
  <div class="dev-js-edit">
    <main-pane-container>
      <div class="dev-js-edit-container">
        <pre id="dev-js-edit-preview"></pre>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
      <div class="dev-preview-js-upload-content">
         <span>Select a new file</span>
         <dev-upload accept="image/png" @update-file="updateFile" ></dev-upload>
     </div>
     <div v-if="isElementModify">
       <dev-button class="dev-preview-js-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-preview-js-icon" @click="copyElement()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-preview-js-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import * as acemodule from 'ace-builds/src-noconflict/ace';

export default {
  name: 'DevJsEdit',
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
       editor:null
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
  mounted(){
    this.editor =  ace.edit("dev-js-edit-preview", {
        theme: "ace/theme/monokai",
        mode: "ace/mode/javascript",
        maxLines: 100,
        wrap: false,
        autoScrollEditorIntoView: true
    });
    this.editor.session.setValue(this.contentCopy)
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
      if(this.nameCopy==='')this.nameCopy=file.name.split(".png")[0];
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.elementCopy= e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    saveElement:function(){
      this.$emit("save-model",{scope:this.scopeCopy,name:this.nameCopy,content:this.elementCopy});
    },
    deleteElement:function(){
      this.$emit("delete-model");
    },
    editSprites:function(){
      this.$emit("edit-sprites",this.scopeCopy,this.nameCopy);
    },
  }
}
</script>

<style lang="scss">

@import 'debug/styles/_variables';

.dev-js-edit{
  display: flex;
  flex:1;
  height: 100%;
}

.dev-js-edit-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}

#dev-js-edit-preview{
    width:300px;
    max-width: 100%;
    min-height: 50px;
    border:1px solid $dev--color-color0;
}

</style>
