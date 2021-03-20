<template>
  <div class="dev-variables-container">
    Variables:
    <dev-button @click="addVariable()">Add variable</dev-button>
    <div v-for="([name,variable] , index)  in Object.entries(sceneVariables)" :key="index">
      <div class="flex align-center">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleVariable(index)" :iconName="getIconType(index)"></dev-icon>
        {{name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(index)" iconName="delete"></dev-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DevVariables",
  data(){
    return {
      svgSize:"2rem",
      variableFocus:-1
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    addVariable:function(){

    },
    deleteVariable:function(){

    },
    getIconType:function(index){
      if(this.variableFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleVariable:function(index){
      if(this.variableFocus===index){
        this.variableFocus=-1;
      }else this.variableFocus=index;
    }
  },
  computed:{
    sceneVariables:function(){
      let sceneVariables=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='variables.json')
      if(sceneVariables)return this.sceneFiles[sceneVariables[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
