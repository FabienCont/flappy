<template>
  <div class="dev-ace-edit">
    <main-pane-container>
      <div class="dev-ace-edit-container">
        <pre @keyup.delete="updateContentCopyValue()" @keydown.ctrl.83.prevent="saveElement()" @keyup.ctrl="updateContentCopyValue()" @input="updateContentCopyValue()" id="dev-ace-edit-preview"></pre>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input v-show='scope!==null' name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
      <div class="dev-preview-ace-upload-content">
         <span>Select a new file</span>
         <dev-upload accept="*" @update-file="updateFile" ></dev-upload>
     </div>
     <div v-if="isElementModify">
       <dev-button class="dev-preview-ace-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-preview-ace-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-preview-ace-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import * as acemodule from 'ace-builds/src-noconflict/ace';
import "ace-builds/webpack-resolver";

export default {
  name: 'DevAceEditor',
  components:{
    DetailPaneContainer,MainPaneContainer
  },
  data(){
    return {
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
    this.editor =  ace.edit("dev-ace-edit-preview", {
        theme: "ace/theme/tomorrow_night",
        mode: "ace/mode/javascript",
        wrap: false,
        autoScrollEditorIntoView: true
    });
    this.editor.session.setValue(this.contentCopy);
    this.editor.resize();
  },
  watch:{
    params:function(){
      this.copyProps();
    },
    contentCopy:function(val){
      console.log(val)
    }
  },
  computed:{
    paths:function(){
      return this.params.path.split('/');
    },
    type:function(){
      if(this.paths.length>2){
        return this.paths[1]
      }
      return null;
    },
    name:function(){
      if(this.paths.length===4){
        return this.paths[3];
      }
      else if(this.paths.length===3){
        return this.paths[2];
      }
      else if(this.paths.length===2){
        return this.paths[1];
      }
    },
    scope:function(){
      if(this.paths.length>3){
        return this.paths[2]
      }
      return null;
    },
    isElementModify:function(){
      return this.params.content!==this.contentCopy || this.scopeCopy!==this.scope || this.nameCopy!==this.name;
    }
  },
  methods:{
    updateContentCopyValue:function(){
      this.contentCopy = this.editor.getSession().getValue();
    },
    copyProps:function(){
      this.nameCopy=this.name;
      this.scopeCopy=this.scope;
      this.contentCopy = this.params.content;
      if(typeof this.editor!=='object' && this.editor!==null){
        this.editor.session.setValue(this.contentCopy);
      }
    },
    updateFile:function(file){
      if(this.nameCopy==='')this.nameCopy=file.name.split(".")[0];
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.contentCopy= e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    saveElement:function(){
      if(this.isElementModify){
        this.$emit("save",{type:this.type,scope:this.scopeCopy,name:this.nameCopy,content:this.contentCopy});
      }
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

.dev-ace-edit{
  display: flex;
  flex:1;
  height: 100%;
}

.dev-ace-edit-container{
  width:100%;
  height:100%;
}

#dev-ace-edit-preview{
    width:100%;
    height:100%;
    position: relative;
    margin:0;
}


::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border: 3px solid  transparent;
    background:  $dev--color-color-light-fade;
    background-clip: content-box;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb:active {
border-radius: 0px;
background:  $dev--color-color-light-fade;
}

</style>
