<template>
  <div v-if="debugVariables">
    <span>Debug Info :</span>
    <div>
      <dev-button @click="toggleDebugInfo" v-if="showDebugInfo">show</dev-button>
      <template v-else>
        <dev-button @click="toggleDebugInfo">hide</dev-button>
           <dev-checkbox v-if="typeof debugVariables.followGrid ==='boolean'" label="followGrid" @input="(val)=> debugVariables.followGrid=val" :val="debugVariables.followGrid" ></dev-checkbox>
           <dev-checkbox v-if="typeof debugVariables.multipleSelection ==='boolean'" label="multipleSelection" @input="(val)=> debugVariables.multipleSelection=val" :val="debugVariables.multipleSelection" ></dev-checkbox>
           <dev-checkbox v-if="typeof debugVariables.entitySelection ==='boolean'" label="entitySelection" @input="(val)=> debugVariables.entitySelection=val" :val="debugVariables.entitySelection" ></dev-checkbox>
           <dev-input v-if="typeof debugVariables.stepGrid==='number'" @update:inputValue="(val)=>debugVariables.stepGrid=val" :isEditable="true" type="number" name="stepGrid" :inputValue="debugVariables.stepGrid"></dev-input>
           <dev-input :isEditable="false" :inline="false" type="number" name="Hover Elements" :inputValue="nbHoverElements"></dev-input>
           <dev-input v-if="typeof debugVariables.hoverLevel==='number'" :inline="false" :isEditable="false" type="number" name="Hover Level" :inputValue="debugVariables.hoverLevel"></dev-input>
           <dev-input v-if="Array.isArray(debugVariables.selectedElements)" :isEditable="false" :inline="false" type="number" name="Selected Elements" :inputValue="debugVariables.selectedElements.length"></dev-input>
           <dev-input v-if="debugVariables.focusElement" :inline="false" :isEditable="false" type="string" name="Focus Element" :inputValue="debugVariables.focusElement.name"></dev-input>
           <div>{{debugVariables.oldPos}}</div>
           <div>{{debugVariables.cursorPos}}</div>

           <div>{{debugVariables.isClicked}}</div>
            <div v-if="debugVariables.selectedElements">selectedElements.length: {{debugVariables.selectedElements.length}}</div>
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
   },
   computed:{
     nbHoverElements:function(){
       if(this.debugVariables && this.debugVariables.hoverElements){
         return this.debugVariables.hoverElements.length
       }else{
         return 0
       }
     }
   }
}
</script>

<style lang="scss" scoped>
</style>
