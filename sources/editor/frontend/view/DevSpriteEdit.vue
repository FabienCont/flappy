<template>
  <div class="dev-sprite-edit">
    <main-pane-container>
      <div class="dev-sprite-canvas-container">
          <div class="dev-sprite-canvas">
          </div>
      </div>
    </main-pane-container>
    <detail-pane-container>
        <h3>{{type}}</h3>
        <dev-input name='name' type="string" :full='true' @update:inputValue="newVal=>name=newVal" :isEditable="false" :inputValue="name"></dev-input>
        <dev-input name='scope' type="string" :full='true' @update:inputValue="newVal=>scope=newVal" :isEditable="false" :inputValue="scope"></dev-input>
       <div class="flex" v-if="isElementModify">
         <dev-button class="dev-preview-img-icon" @click="saveElement()">Save</dev-button>
         <dev-button class="dev-preview-img-icon" @click="cancelModif()">Cancel</dev-button>
         <dev-button class="dev-preview-img-icon" @click="editImage()">Edit Image</dev-button>
       </div>
       <div class="flex" v-else>
         <dev-button class="dev-preview-img-icon" @click="editImage()">Edit Image</dev-button>
         <dev-button class="dev-preview-img-icon" @click="deleteElement()">Delete</dev-button>
       </div>
       <dev-separator></dev-separator>
       <dev-sprites-grids :image="image" :grids="this.gridsCopy" :reset="reset" @reset-done="resetDone" @update-sprite-file="updateCurrentGrids">
       </dev-sprites-grids>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import DevSpritesGrids from "editor/frontend/view/DevSpritesGrids.vue";
import Theatre from 'core/theatre';

export default {
  name: 'DevSpriteEdit',
  components:{
    DetailPaneContainer,MainPaneContainer,DevSpritesGrids
  },
  data(){
    return {
       base64:'data:image/png;base64,',
       gridsCopy:null,
       currentGridsValue:null,
       canvasContainer:null,
       theatreInstance:null,
       reset:false
    }
  },
  props: {
    params:Array
  },
  mounted(){
      this.canvasContainer = this.$el.querySelector('.dev-sprite-canvas');
      this.theatreInstance = new Theatre({
        container:this.canvasContainer,
        expose: false,
        sharp: true,
        scenarioCtx: require.context('debug/theatre/editAnimations/scenes/', true, /^\.\/scenario\.json$/, 'sync'),
        hooksCtx:require.context('debug/theatre/editAnimations/scenes/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
        assetsCtx:{},
        modelsCtx:require.context('debug/theatre/editAnimations/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
        loadingTime:0,
        params:{
          sprite:this.image,
          grids:this.spritesFile.content
        }
      });
  },
  created(){
    this.copyProps();
  },
  beforeDestroy(){
    if(this.theatreInstance){
      this.theatreInstance.destroy();
    }
  },
  watch:{
    params:function(){
      this.copyProps();
    }
  },
  computed:{
    spriteFileIndex:function(){
      return this.params.findIndex((param)=>param.path.indexOf(".json")!==-1);
    },
    imageFileIndex:function(){
      return 1-this.spriteFileIndex;
    },
    spritesFile:function(){
      return this.params[this.spriteFileIndex];
    },
    imageFile:function(){
      return this.params[this.imageFileIndex];
    },
    image:function(){
      let imageContent=this.imageFile.content;
      let imageBase64=(imageContent!=='' && !imageContent.startsWith(this.base64))?this.base64+imageContent:imageContent;
      let image= new Image(imageBase64);
      image.src=imageBase64;
      return image;
    },
    paths:function(){
      return this.spritesFile.path.split('/');
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
      return JSON.stringify(this.spritesFile.content)!==JSON.stringify(this.currentGridsValue)
    }
  },
  methods:{
    resetDone:function(){
      this.reset=false;
    },
    updateCurrentGrids:function(gridsCopy){
      this.currentGridsValue=JSON.parse(JSON.stringify(gridsCopy));
    },
    copyProps:function(){
      this.gridsCopy = JSON.parse(JSON.stringify(this.spritesFile.content));
      this.currentGridsValue=JSON.parse(JSON.stringify(this.spritesFile.content));
    },
    cancelModif:function(){
      this.reset=true;
    },
    saveElement:function(){
      this.$emit("save",{type:this.type,scope:this.scope,name:this.name,content:this.currentGridsValue});
    },
    deleteElement:function(){
      this.$emit("delete-elem",{type:this.type,scope:this.scope,name:this.name});
    },
    editImage:function(){
      let paths = this.params[this.imageFileIndex].path.split('/');
      let name = paths[paths.length-1];
      this.$emit("edit-image",this.scope,name);
    },
  }
}
</script>

<style lang="scss">

@import "editor/frontend/styles/_variables";

.dev-sprite-edit{
  display: flex;
  height: 100%;
  flex: 1;
  overflow: auto;
}

.dev-sprite-canvas-container{
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.dev-sprite-canvas{
  position: absolute;
  width: 100%;
  height: 100%;
}

.dev-sprite-edit-preview{
    max-width: 100%;
    min-height: 20px;
    border:1px solid $dev--color-color0;
}

</style>
