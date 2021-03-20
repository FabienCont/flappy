<template>
  <div class="dev-systems-container">
    Systems:
    <dev-button @click="addSystem()">Add system</dev-button>
    <div v-for="(system , index)  in sceneSystems" :key="index">
      <div class="flex align-center">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleSystem(index)" :iconName="getIconType(index)"></dev-icon>
        {{system.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteSystem(index)" iconName="delete"></dev-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DevSystems",
  data(){
    return {
      svgSize:"2rem",
      systemFocus:-1
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    addSystem:function(){

    },
    deleteSystem:function(){

    },
    getIconType:function(index){
      if(this.systemFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleSystem:function(index){
      if(this.systemFocus===index){
        this.systemFocus=-1;
      }else this.systemFocus=index;
    }
  },
  computed:{
    sceneSystems:function(){
      let sceneSystems=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='systems.json')
      if(sceneSystems)return this.sceneFiles[sceneSystems[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
