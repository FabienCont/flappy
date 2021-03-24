<template>
  <div class="dev-sub-variables">
    <dev-button  v-if='!addingVariable' @click="addVariable(index)">Add</dev-button>
    <div v-else>
      <dev-input @updateValue="(val)=>addedVariable=val" label='name' type="string"  :inputValue='addedVariable'></dev-input>
      <dev-select @input="(val)=>addedVariableType=val"  label='type' default='number' :options='Object.keys(possibleType)'></dev-select>
      <div class="flex">
        <dev-button v-if='Object.keys(variableList).indexOf(addedVariable)===-1' @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="([name,variable] , index)  in Object.entries(variableList)" :key="index">
      <div v-if='typeof variable==="object"' class="flex justify-center">
        <template v-if='Array.isArray(variable)'>
          <dev-icon :width="svgSize" :height="svgSize" @click="toggleVariable(index)" :iconName="getIconType(index)"></dev-icon>
          {{name}}
          <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
          <div v-if="index === variableFocus">
            <dev-sub-variables></dev-sub-variables>
          </div>
        </template>
        <template v-else-if="Object.keys(variable).length>0 && Object.keys(variable)[0]==='$snippet'">
          <dev-select @input="(val)=>variable=snippetList[val]" :label="name" :border="false" :default="getSnippet(variable)" :options="Object.keys(snippetList)"></dev-select>
          <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
        </template>
        <template v-else>
          <dev-icon :width="svgSize" :height="svgSize" @click="toggleVariable(index)" :iconName="getIconType(index)"></dev-icon>
          {{name}}
          <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
          <dev-icon :width="svgSize" :height="svgSize" @click="addVariable(index)" iconName="add"></dev-icon>
          <div v-if="index === variableFocus">
            <dev-sub-variables></dev-sub-variables>
          </div>
        </template>
      </div>
      <div v-else class="flex-column justify-center">
        <div class='flex align-center'>
          <span>{{name +':'}}</span>
          <dev-input :type='typeof variable' @updateValue='(val)=>variableList[name]=val' :inputValue='variable'></dev-input>
          <dev-icon :width="svgSize" :height="svgSize" @click="deleteVariable(name)" iconName="delete"></dev-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name:"DevVariables",
  components:{'dev-sub-variables':() => import('editor/frontend/view/DevSubVariables.vue')},
  data(){
    return {
      svgSize:"2rem",
      variableFocus:-1,
      possibleType:{'boolean':false,'object':{},'array':[],'string':'test','number':0,'snippet':{'$snippet':{'scope':'common','name':'get-screen-height'}}},
      addedVariable:'',
      addedVariableType:'',
      addingVariable:false,
    }
  },
  props:{
    variableList:{type:Array},
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
    valid:function(){
      this.$emit('add',{name:this.addedVariable,value:this.possibleType[this.addedVariableType]});
      this.cancel();
    },
    cancel:function(){
      this.addingVariable=false;
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
  }
}
</script>

<style lang="scss" scoped>

.dev-sub-variables{
  margin-left:2rem;
}

.dev-variables-info{
  margin-left:2rem;
}
</style>
