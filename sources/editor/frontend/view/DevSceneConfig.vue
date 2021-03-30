<template>
  <div v-if="debugVariables">
    <span>Debug Info :</span>
    <div>
      <dev-button @click="toggleDebugInfo" v-if="showDebugInfo">show</dev-button>
      <template v-else>
        <dev-button @click="toggleDebugInfo">hide</dev-button>
           <dev-checkbox v-if="typeof debugVariables.followGrid ==='boolean'" label="followGrid" @input="(val)=> debugVariables.followGrid=val" :val="debugVariables.followGrid" ></dev-checkbox>
           <dev-input v-if="debugVariables.stepGrid" @update:inputValue="(val)=>debugVariables.stepGrid=val" :isEditable="true" type="number" name="stepGrid" :inputValue="debugVariables.stepGrid"></dev-input>
       </template>
    </div>
  </div>
</template>

<script>
export default {
  name:'DevSceneConfig',
  data(){
    return {
       showDebugInfo:false,
     }
   },
   props:{
     debugVariables:null
   },
   methods:{
     toggleDebugInfo:function(){
       this.showDebugInfo=!this.showDebugInfo;
     }
   }
}
</script>

<style lang="scss" scoped>
</style>
