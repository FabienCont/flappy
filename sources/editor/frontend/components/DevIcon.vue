<template>
  <svg v-on="$listeners" :style="style" class="dev-icon" xmlns="http://www.w3.org/2000/svg"
  :width="width"
  :height="height"
  viewBox="0 0 20 20"
  :aria-labelledby="iconName"
  role="presentation"
>
  <title
    :id="iconName"
    lang="en"
  >{{ iconName }} icon</title>
  <g v-html="svgPath" :fill="iconColor">
  </g>
</svg>
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
      default: "1.3rem"
    },
    height: {
      type: [Number, String],
      default: "1.3rem"
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  computed:{
    svgPath:function(){
      return require("debug/assets/svg/"+this.iconName+".svg")
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
  .dev-icon path,
  .dev-icon polygon,
  .dev-icon rect {
    fill: $dev--color-color2;
  }

  .dev-icon circle {
    stroke: $dev--color-color2;
    stroke-width: 1;
  }

  .dev-icon{
    cursor: pointer;
  }

</style>
