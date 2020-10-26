<template>
  <div class="dev-preview-img-container">
    <div class="dev-preview-toolbar">
        <dev-icon class="dev-preview-toolbar-svg" :width="svgSize" :height="svgSize" iconName="cursor"></dev-icon>
        <dev-icon class="dev-preview-toolbar-svg" :width="svgSize" :height="svgSize" iconName="delete"></dev-icon>
    </div>
    <div class="dev-preview-img-content">
      <img :src="src" class="dev-preview-img" >
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
      svgSize:"1.7em"
    }
  },
  props: {
    element:String
  },
  computed:{
    src:function(){
      return this.base64+this.element;
    }
  },
  methods:{
    test:function(){
      var objectToSend={"test":"success"}
      callModelsApi("entities","demo","test2",objectToSend)
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
