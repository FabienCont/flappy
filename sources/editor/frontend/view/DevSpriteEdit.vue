<template>
  <div class="dev-sprite-edit">
    <main-pane-container>
      <div class="dev-sprite-edit-container">
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input name='name' type="string" @update:inputValue="newVal=>name=newVal" :isEditable="false" :inputValue="name"></dev-input>
      <dev-input name='scope' type="string" @update:inputValue="newVal=>scope=newVal" :isEditable="false" :inputValue="scope"></dev-input>
     <div v-if="isElementModify">
       <dev-button class="dev-preview-img-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-preview-img-icon" @click="copyElement()">Cancel</dev-button>
       <dev-button class="dev-preview-img-icon" @click="editImage()">Edit Image</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-preview-img-icon" @click="editImage()">Edit Image</dev-button>
       <dev-button class="dev-preview-img-icon" @click="deleteElement()">Delete</dev-button>
     </div>
     <!-- <dev-sprites-grids :image="image" :grids="this.spritesFile.content">
     </dev-sprites-grids> -->
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
       contentCopy:null,
       canvasContainer:null,
       theatreInstance:null
    }
  },
  props: {
    params:Array
  },
  mounted(){
      this.canvasContainer = this.$el.querySelector('.dev-sprite-edit-container');
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
      return this.spritesFile.content!==this.contentCopy
    }
  },
  methods:{
    copyProps:function(){
      this.contentCopy = this.spritesFile.content;
    },
    saveElement:function(){
      this.$emit("save-model",{scope:this.scope,name:this.name,content:this.contentCopy});
    },
    deleteElement:function(){
      this.$emit("delete-model");
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

@import 'debug/styles/_variables';

.dev-sprite-edit{
  display: flex;
  flex:1;
  height: 100%;
}

.dev-sprite-edit-container{
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}

.dev-sprite-edit-preview{
    max-width: 100%;
    min-height: 20px;
    border:1px solid $dev--color-color0;
}

</style>
