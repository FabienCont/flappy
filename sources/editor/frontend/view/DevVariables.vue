<template>
  <div class="dev-variables-container">
    Variables:
    <dev-button v-if="!addingVariable" @click="addVariable()">Add variable</dev-button>
    <div v-else>
      <dev-input @update:inputValue="(val)=>addedVariable=val" label='name' type="string"  :inputValue='addedVariable'></dev-input>
      <dev-select @input="(val)=>addedVariableType=val"  label='type' default='number' :options='Object.keys(possibleType)'></dev-select>
      <div class="flex">
        <dev-button v-if='isNameAvailable' @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="([name,variable] , index)  in Object.entries(sceneVariables)" :key="index">
      <div v-if='typeof variable==="object"' class="flex-column justify-center">
        <template v-if="Object.keys(variable).length>0 && Object.keys(variable)[0]==='$snippet'">
          <div class='flex'>
            <dev-select @input="(val)=>updateVariable(name,{'$snippet':snippetList[val]})" :label="name" :border="false" :default="getSnippet(variable)" :options="Object.keys(snippetList)"></dev-select>
            <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
          </div>
        </template>
        <template v-else>
          <div class="flex align-center">
            <dev-icon :width="svgSize" :height="svgSize" @click="toggleVariable(index)" :iconName="getIconType(index)"></dev-icon>
            <span>{{name}}</span>
            <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
          </div>
          <div v-if="index === variableFocus">
            <dev-sub-variables  @remove='(index)=>deleteSubVariable({name,index})'  @update='({index,value})=>updateSubVariable({name,index,value})' :variables='variable'></dev-sub-variables>
          </div>
        </template>
      </div>
      <div v-else class="flex-column justify-center">
        <div class='flex align-center'>
          <dev-checkbox v-if="typeof variable==='boolean'" :label='name' @input='(val)=>updateVariable(name,val)' :val='variable'></dev-checkbox>
          <dev-input v-else :name='name' :type='typeof variable' @update:inputValue='(val)=>updateVariable(name,val)' :inputValue='variable'></dev-input>
          <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import DevSubVariables from "editor/frontend/view/DevSubVariables.vue";

export default {
  name:"DevVariables",
  components:{DevSubVariables},
  data(){
    return {
      svgSize:"2rem",
      variableFocus:-1,
      possibleType:{'boolean':false,'object':{},'string':'test','number':0,'snippet':{'$snippet':{'scope':'common','name':'get-screen-height'}}},
      addingVariable:false,
      addedVariable:'',
      addedVariableType:''
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    getSnippet:function(variable){
      return variable.$snippet.scope+'/'+variable.$snippet.name
    },
    addVariable:function(){
      this.addedVariable='varName';
      this.addedVariableType='number';
      this.addingVariable=true;
    },
    deleteSubVariable:function({name,index}){
      let variable=JSON.parse(JSON.stringify(this.sceneVariables[name]));
      this.$delete(variable,index)
      this.updateVariable(name,variable);
    },
    updateSubVariable:function({name,index,value}){
      let variable=JSON.parse(JSON.stringify(this.sceneVariables[name]));
      if(Array.isArray(variable)){
        variable[index]=value;
      }else{
        variable[index]=value;
      }
      this.updateVariable(name,variable);
    },
    valid:function(){
      this.$emit('add',{name:this.addedVariable,value:this.possibleType[this.addedVariableType]});
      this.cancel();
    },
    cancel:function(){
      this.addingVariable=false;
    },
    updateVariable:function(name,value){
      this.$emit('update',{name:name,value:JSON.parse(JSON.stringify(value))});
    },
    deleteVariable:function(name){
      this.$emit("remove",name)
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
    ...mapGetters({
      snippetDico:"arborescence/snippetDico"
    }),
    isNameAvailable:function(){
      let name=this.addedVariable;
      return Object.keys(this.sceneVariables).indexOf(name)===-1
    },
    snippetList:function(){
      let snippetList={};
      Object.entries(this.snippetDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
            let name=filename.split('.')[0]
            snippetList[scope+'/'+name]={scope:scope,name};
        });

      });
      return snippetList
    },
    sceneVariables:function(){
      let sceneVariables=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='variables.json')
      if(sceneVariables)return this.sceneFiles[sceneVariables[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

.dev-variables-info{
  margin-left:2rem;
}
</style>
