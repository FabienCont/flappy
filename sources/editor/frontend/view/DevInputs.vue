<template>
  <div class="dev-inputs-container">
    Inputs:
    <div v-if="inputsList.length>0">
      <dev-select @input="(val)=>addedInput=val" :default="inputsList[0]" :options="inputsList"></dev-select>
      <dev-button @click="addInput()">Add Input</dev-button>
    </div>
    <div v-for="(input , index)  in sceneInputs" :key="index">
      <div class="flex align-center">
        {{input}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteInput(index)" iconName="delete"></dev-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { keynames }  from 'modules/keynames'

export default {
  name:"DevInputs",
  data(){
    return {
      svgSize:"2rem",
      addedInput:null
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    addInput:function(){
      if(!this.addedInput){
        this.addedInput=this.inputsList[0]
      }
      this.$emit("add",this.addedInput)
      this.addedInput=null;
    },
    deleteInput:function(index){
      this.$emit("remove",index)
    },
  },
  computed:{
    inputsList:function(){
      let mouseInput= ["MOVE","LEAVE","CLICK_LEFT","CLICK_RIGHT","SCROLL"];
      let keyboardInput=keynames.map((key)=>"KEY_"+key);
      let allInput=[...mouseInput,...keyboardInput]
      let filterInput=allInput.filter((input)=>this.sceneInputs.indexOf(input)===-1)
      return filterInput;

    },
    sceneInputs:function(){
      let sceneInputs=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='inputs.json')
      if(sceneInputs)return this.sceneFiles[sceneInputs[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
