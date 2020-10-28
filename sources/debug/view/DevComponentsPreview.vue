<template>
  <div class="dev-preview">
    <h3>Components
      <dev-input name='name' type="string" @update:inputValue="newVal=>elementCopy.name=newVal" :isEditable="true" :inputValue="elementCopy.name"></dev-input>
      <dev-input name='scope' type="string" @update:inputValue="newVal=>elementCopyScope=newVal" :isEditable="true" :inputValue="elementCopyScope"></dev-input>
    </h3>
    <h4>params :</h4>
    <dev-icon class="dev-preview-icon" @click="newParam()" :width="svgSize" :height="svgSize" iconName="add"></dev-icon>
    <div class="dev-preview-param-container" v-for="(paramValue,paramKey) in elementCopy.params" :key="paramKey" >
      <div class="dev-preview-param-title">
        <dev-input type="string" @update:inputValue="newVal=>changeParamKey(newVal,paramKey)" :isEditable="true" :inputValue="paramKey"></dev-input>
      </div>
      <div class="dev-preview-param">
        <div>
          type:
          <dev-select :options='optionsType' :default='paramValue._type' @input="(type)=>paramValue._type=type">
          </dev-select>
        </div>
        <div v-if="paramValue._type==='object'">
          object:
        </div>
        <div v-else-if="getArraySubtype(paramValue._type)!==null">
          {{'_'+getArraySubtype(paramValue._type)}} :
          <div class="dev-preview" v-for="(subVal,subKey) in paramValue['_'+getArraySubtype(paramValue._type)]" :key="subKey" >
            {{subKey}} : {{subVal}}
          </div>
        </div>
        <dev-input v-if="paramValue._type==='string'||paramValue._type==='number'||paramValue._type==='ref'||paramValue._type==='boolean'"  :type="paramValue._type==='ref'?'string':paramValue._type" @update:inputValue="newVal => elementCopy.params[paramKey]._default = newVal" :isEditable="true" name="default" :inputValue="paramValue._default"></dev-input>
        <span v-else="paramValue._default!==undefined">
          default : {{paramValue._default}}
        </span>
      </div>
      <div class="dev-preview-icon">
        <dev-icon @click="deleteParam(paramKey)" :width="svgSize" :height="svgSize" iconName="delete"></dev-icon>
      </div>
    </div>
    <div v-if="isElementModify" class="dev-edit-buttons">
      <dev-button class="dev-preview-icon" @click="saveElement()">Save</dev-button>
      <dev-button class="dev-preview-icon" @click="copyElement()">Cancel</dev-button>
    </div>
    <br>
    {{element.params}}
  </div>
</template>

<script>
import {callModelsApi} from "debug/utils/modelsApi"

export default {
  name: 'devcomponentspreview',
  data(){
    return {
      elementCopy:JSON.parse(JSON.stringify(this.element)),
      elementCopyScope:this.elementScope,
      svgSize:"1.5rem",
      optionsType:['number','string','array','object','boolean','ref']
    }
  },
  watch:{
    element:function(val){
      this.copyElement();
    }
  },
  props: {
    element:Object,
    elementScope:String
  },
  computed:{
    isElementModify:function(){
      return JSON.stringify(this.element)!==JSON.stringify(this.elementCopy) || this.elementCopyScope!==this.elementScope;
    }
  },
  methods:{
    getArraySubtype:function(str){
      let regex="(?<=array<)[a-zA-Z]+";
      let match=str.match(regex);
      return match!==null?match[0]:null;
    },
    changeParamKey:function(paramKey,oldParamKey){
      if(this.elementCopy.params[paramKey]===undefined && this.elementCopy.params[paramKey]!==""){
        this.elementCopy.params[paramKey]=this.elementCopy.params[oldParamKey];
        this.$delete(this.elementCopy.params,oldParamKey);
      }
    },
    deleteParam:function(paramKey){
      this.$delete(this.elementCopy.params,paramKey);
    },
    copyElement:function(){
      this.elementCopy = Object.assign({}, this.elementCopy, JSON.parse(JSON.stringify(this.element)));
    },
    saveElement:function(){
      this.$emit("saveModel",{scope:this.elementCopyScope,name:this.elementCopy.name,content:this.elementCopy});
    },
    newParam:function(){
      this.elementCopy.params = Object.assign({}, this.elementCopy.params, {'newParam':{'_type':'string','_default':''}});
    }
  }
}
</script>

<style lang="scss">
.dev-preview{
  width:100%;
}

.dev-preview-param > *{
  margin-bottom: 1rem;
}

.dev-preview-param-container{
  display: flex;
  flex:1;
  justify-content: space-between;
}

.dev-preview-param-title{
  display: inline-flex;
  flex-grow: 0;
}

.dev-preview-param{
  display: inline-flex;
  flex-direction: column;
  margin-left: 1rem;
  flex-grow: 3;
}

.dev-preview-edit{
  display: inline-flex;
  flex-grow: 1;
  justify-content: space-around;
}

.dev-edit-buttons{
  margin-top:1rem;
}
.dev-preview-icon{
  cursor: pointer;
}

</style>
