<template>
  <div class="dev-icon" v-on="$listeners" v-html="svgPath" :style="style" :width="width" :height="height">
  </div>
</template>

<script>
export default {
  name: 'DevIcon',
  props:{
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: [Number, String],
      default: "100%"
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  mounted(){
    //this.$el.firstChild.setAttribute('fill', this.iconColor);
  },
  watch:{
    iconColor:function(val){
      //this.$el.firstChild.setAttribute('fill', val);
    }
  },
  computed:{
    svgPath:function(){
      return require("editor/frontend/assets/svg/"+this.iconName+".svg")
    },
    style:function(){
      var inlineStyle=""
      if(this.height){
        inlineStyle="height:"+this.height+";";
      }
      if(this.width){
        inlineStyle+="width:"+this.width+";";
      }
      return inlineStyle;
    }
  }
}
</script>

<style lang="scss">
@import "editor/frontend/styles/_variables";
  /* -----
  SVG Icons - svgicons.sparkk.fr
  ----- */
  .dev-icon{
      cursor: pointer;
      display: inline-block;
  }

.dev-icon:hover  path,
  .dev-icon:hover  polygon,
  .dev-icon:hover  rect{
    fill: $dev--color-color1-fade;
}

  .dev-icon path,
  .dev-icon polygon,
  .dev-icon rect {
    fill: $dev--color-color1;
  }

  .dev-icon circle {
    stroke: $dev--color-color0;
    stroke-width: 1;
  }


</style>
