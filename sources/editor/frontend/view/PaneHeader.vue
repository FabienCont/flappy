<template>
  <div class="pane-header">
    <ul ref="container" class="pane-header-center">
      <tab v-for="(pane,index) in panes" :key="index" :isActive="index===activePane" :filePath="pane.path"></tab>
    </ul>
    <div v-show="isScrollable" class="pane-header-right">
      <dev-icon :class="{active:(interval&&isLeft)}" class="pane-header-icon" @mousedown="start(true)" @touchstart="start(true)" @mouseleave="stop" @mouseup="stop" @touchend="stop" @touchcancel="stop"
        :width="svgSize" :height="svgSize" iconName="left"></dev-icon>
      <dev-icon :class="{active:(interval&&!isLeft)}" class="pane-header-icon" @mousedown="start(false)" @touchstart="start(false)" @mouseleave="stop" @mouseup="stop"  @touchend="stop" @touchcancel="stop"
        :width="svgSize" :height="svgSize" iconName="right"></dev-icon>
    </div>
  </div>
</template>

<script>
import Tab from "editor/frontend/view/Tab.vue";
//check Ref
export default {
  name: 'pane-header',
  components:{Tab},
  data(){
    return {
      svgSize:"1.5rem",
      scrollWidth:0,
      clientWidth:0,
      interval:false,
      isLeft:false
    }
  },
  props:{
    activePane:Number,
    panes:Array
  },
  mounted(){
    this.$nextTick(()=>{
      this.updateWidth();
    })
  },
  beforeDestroy() {
   if (this.interval){
     clearInterval(this.interval);
     this.interval = false
   }
 },
  methods:{
    updateWidth:function(){
      this.scrollWidth=this.$refs.container.scrollWidth;
      this.clientWidth=this.$refs.container.clientWidth;
    },
    start(isLeft){
    	if(!this.interval){
        this.isLeft=isLeft;
      	this.interval = setInterval(() => this.$refs.container.scrollLeft += isLeft?-10:10,15)
      }
    },
    stop(){
    	clearInterval(this.interval)
      this.interval = false
    }
  },
  computed:{
    isScrollable:function(){
      return this.scrollWidth>this.clientWidth;
    }
  },
  watch:{
    panes:function(){
      this.$nextTick(()=>{
        this.updateWidth()
      });
    }
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .pane-header{
    display: block;
    width:100%;
    box-shadow: inset 0 -1px 0 $dev--color-color-darker;
  }

  .pane-header-center{
    display: flex;
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    margin:0;
    padding:0;
  }

  .pane-header-right{
    display: flex;
    flex: auto;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid black;
    margin-bottom: 0.6rem;
    padding: 0 0.3rem;
  }

  .pane-header-icon{
    cursor:pointer;
  }

  .active{
    stroke:$dev--color-color-light-fade;
  }

</style>
