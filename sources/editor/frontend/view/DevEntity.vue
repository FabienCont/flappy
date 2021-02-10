<template>
  <div class="dev-entity">
    <main-pane-container>

    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input  name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input v-show='scope!==null' name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
     <div v-if="isElementModify">
       <dev-button class="dev-entity-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-entity-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-entity-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";

export default {
  name: 'dev-entity',
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
  watch:{
    params:function(){
      this.copyProps();
    },
    contentCopy:function(val){
      console.log(val)
    },
    nameCopy:function(val){
      if(this.contentCopy && this.contentCopy.name){
        this.contentCopy.name=val.split('.')[0];
      }
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

@import "editor/frontend/styles/_variables";

.dev-entity-edit{
  display: flex;
  flex:1;
  height: 100%;
  color:$dev--color-color-light;
}
.dev-entity-container{
  padding-left: 1rem;
}
.dev-entity-list{
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
}
.dev-entity-params{
  display: flex;
}
.dev-entity-params-value{
  display: flex;
  flex-direction: column;
}
</style>
