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
      },
      theatreInstance:null
    }
  },
  beforeDestroy(){
    if(this.theatreInstance){
      this.theatreInstance.destroy();
    }
  },
  mounted(){
    let container =  this.$el.querySelector('.dev-canvas-sprites');
    this.theatreInstance = new Theatre({
      container,
      expose: false,
      sharp: true,
      scenarioCtx: require.context('editor/frontend/theatre/previewSprites/lifecycles/', true, /^\.\/scenario\.json$/, 'sync'),
      hooksCtx:require.context('editor/frontend/theatre/previewSprites/lifecycles/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
      assetsCtx:{},
      modelsCtx:require.context('editor/frontend/theatre/previewSprites/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
      scriptsCtx:require.context('editor/frontend/theatre/previewSprites/scripts/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
      loadingTime:0,
      params:this.params,
      focus:false
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
