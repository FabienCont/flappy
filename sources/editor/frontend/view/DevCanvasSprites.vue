<template>
  <div class="dev-canvas-sprites-container">
    <div class="dev-canvas-sprites">
    </div>
  </div>
</template>

<script>
import Theatre from 'core/theatre';

export default {
  name: 'DevCanvasSprites',
  data(){
    return {
      params:{
        animation:this.animation,
        sprite:this.image
      }
    }
  },
  mounted(){
    let container =  this.$el.querySelector('.dev-canvas-sprites');
    let canvasEditAnim = new Theatre({
      container,
      expose: false,
      sharp: true,
      scenarioCtx: require.context('debug/theatre/previewSprites/scenes/', true, /^\.\/scenario\.json$/, 'sync'),
      hooksCtx:require.context('debug/theatre/previewSprites/scenes/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
      assetsCtx:{},
      modelsCtx:require.context('debug/theatre/previewSprites/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
      loadingTime:0,
      params:this.params
    });
  },
  props: {
    animation:Object,
    image:HTMLImageElement
  },
  watch:{
    animation:function(val){
      this.$set(this.params, 'animation', val);
      console.log("trigger animation",val)
    }
  }
}
</script>

<style scoped lang="scss">
.dev-canvas-sprites{
  width:150px;
  height:150px;
}

</style>
