<template>
  <div class="dev-renderers-container">
    Renderers:
    <dev-button v-if="!addingRenderer" @click="addRenderer()">Add renderer</dev-button>
    <div v-else>
      <dev-select @input="(val)=>addedRenderer=allRenderer[val]" :border="false" :default="rendererKeys[0]" :options="rendererKeys"></dev-select>
      <div class="flex">
        <dev-button @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="(renderer , index)  in sceneRenderers" :key="index">
      <div class="flex align-center">
        <!-- <dev-icon :width="svgSize" :height="svgSize" @click="toggleRenderer(index)" :iconName="getIconType(index)"></dev-icon> -->
        {{renderer.scope}}/{{renderer.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteRenderer(index)" iconName="delete"></dev-icon>
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteRenderer(index)" iconName="top"></dev-icon>
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteRenderer(index)" iconName="bottom"></dev-icon>
      </div>
      <div class="dev-renderers-compo">
        <span>[</span>
        <span v-for="(compo,indexCompo) in renderer.components" :key='indexCompo'>
          <span class="dev-renderers-compo-name" >{{compo}}</span>
          <span v-if="indexCompo!==renderer.components.length-1">,</span>
        </span>
        <span>]</span>
        <dev-icon :width="miniSvgSize" :height="svgSize" @click="addComponent(index)" iconName="add"></dev-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DevRenderers",
  data(){
    return {
      svgSize:"2rem",
      miniSvgSize:"1.2rem",
      rendererFocus:-1,
      addedRenderer:null,
      addingRenderer:false
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    addRenderer:function(){

    },
    deleteRenderer:function(){

    },
    getIconType:function(index){
      if(this.rendererFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleRenderer:function(index){
      if(this.rendererFocus===index){
        this.rendererFocus=-1;
      }else this.rendererFocus=index;
    }
  },
  computed:{
    sceneRenderers:function(){
      let sceneRenderers=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='renderers.json')
      if(sceneRenderers)return this.sceneFiles[sceneRenderers[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .dev-renderers-compo{
    margin-left: 1rem;
    display: flex;
  }

  .dev-renderers-compo-name{

  position:relative;
  cursor:pointer;

    &:before{
      content:'';
      position: absolute;
      width: 0%;
      height: 3px;
      top:50%;
      transition:width 0.2s cubic-bezier(1, 0, 0.58, 0.97) 0s;
      background:$dev--color-color6
    }

    &:hover:before{

      width: 100%;
    }
  }
</style>
