<template>
  <div class="dev-scene">
    <main-pane-container>
      <div class="dev-scene-container">
        <div class="dev-canvas-scene-container">
          <div class="dev-canvas-scene">
          </div>
        </div>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input  name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input v-show='scope!==null' name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
     <div v-if="isElementModify">
       <dev-button class="dev-scene-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-scene-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-scene-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import Theatre from 'core/theatre';

export default {
  name: 'devScene',
  components:{
    DetailPaneContainer,MainPaneContainer
  },
  data(){
    return {
      // svgSize:"1.7em",
       contentCopy:this.params.content,
       nameCopy:"",
       scopeCopy:"",
       theatreInstance:null
    }
  },
  beforeDestroy(){
    if(this.theatreInstance){
      this.theatreInstance.destroy();
    }
  },
  mounted(){
    let container =  this.$el.querySelector('.dev-canvas-scene');
    this.theatreInstance =  new Theatre({
      container,
      expose: false,
      sharp: true,
      scenarioCtx: require.context('editor/frontend/theatre/editEntity/scenes/', true, /^\.\/scenario\.json$/, 'sync'),
      hooksCtx:require.context('editor/frontend/theatre/editEntity/scenes/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
      assetsCtx:{},
      modelsCtx:require.context('editor/frontend/theatre/editEntity/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
      loadingTime:0,
      params:this.params,
      focus:false
    });
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

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

.dev-scene{
  display: flex;
  height: 100%;
  flex: 1;
  overflow: auto;
}

.dev-scene-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}
.dev-canvas-scene-container{
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.dev-canvas-scene{
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>
