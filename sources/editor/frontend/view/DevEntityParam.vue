<template>
  <div class="dev-entity-param-container">
    <div v-if="value!==undefined && paramModel._type">
      <dev-input v-if="paramModel._type==='number'" type='number' :name='name' @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="value"></dev-input>
      <dev-input v-else-if="paramModel._type==='string'" type='string' :name='name' @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="value"></dev-input>
      <div  v-else-if="paramModel._type==='object'">
        {{name}} :
        <dev-entity-param v-for="([paramName,paramValue] , indexParam)  in Object.entries(paramModel).filter(([key,value])=>!key.startsWith('_'))"  @update-param="updateChildParam"
        :key="indexParam" :name='paramName' :value='value[paramName]' :paramModel='paramValue' :component="component"></dev-entity-param>
      </div>
      <div  v-else-if="paramModel._type==='dico'">
        <div class="flex align-center">
          Dico :
          <dev-icon :width="svgSize" :height="svgSize" @click="addElementDico(value)" iconName="add"></dev-icon>
        </div>
        {{name}} :
        <dev-entity-param v-for="([paramName,paramValue] , indexParam)  in Object.entries(value)"  @update-param="(param)=>updateChildArrayParam(paramName,param)"
        :key="indexParam" :name='paramName' :value='paramValue' :paramModel='paramModel._dico' :component="component"></dev-entity-param>
      </div>
      <div  v-else-if="paramModel._type==='snippet'">
        <dev-select @input="(val)=>updateParam({component,name,val:snippetList[val]})" :label="name"  :border="false" :default="value.scope+'/'+value.name" :options="Object.keys(snippetList)"></dev-select>
      </div>
      <div v-else-if="paramModel._type.startsWith('array<object>')">
        <div class="flex align-center">
          {{name}}
          <dev-icon :width="svgSize" :height="svgSize" @click="addElementArray(value)" iconName="add"></dev-icon>
          <dev-icon :width="svgSize" :height="svgSize" @click="emptyArray(value)" iconName="delete"></dev-icon>
        </div>
          <template v-if="value && Array.isArray(value)">
              <div v-for="(paramValueArray,index) in value" :key="index">
                <div class="flex align-center">
                  <dev-icon :width="svgSize" :height="svgSize" @click="toggleParamsArray(index)" :iconName="getIconType(index)"></dev-icon>
                  {{index}}:
                </div>
                <template v-if="index === paramFocus">
                  <template v-for="([paramName,paramValue] , indexParam)  in Object.entries(paramModel._object)">
                    <dev-entity-param   @update-param="(param)=>{updateChildArrayParam(index,param)}"
                    :key="index+'_'+paramName" :name='paramName' :value='paramValueArray[paramName]' :paramModel='paramValue' :component="component"></dev-entity-param>
                    </template>
                </template>
              </div>
          </template>
      </div>
      <div v-else-if="paramModel._type.startsWith('array<array>')" >
        {{name}} :
        <template v-for="(paramValueArray,index) in value">
         [
          <dev-entity-param  @update-param="(param)=>{updateChildArrayParam(index,param)}"
           :key="index" :name="index" :value='paramValueArray' :paramModel="paramModel._array" :component="component"></dev-entity-param>
        </template>
        ]
      </div>
      <div v-else-if="paramModel._type.startsWith('array<')" >
        <dev-input :error="invalidJSONInput" :border="true" :name="name" type="string" @update:inputValue="newVal=>updateJSON(newVal)" :isEditable="true" :inputValue="JSON.stringify(value)"></dev-input>
      </div>
      <div v-else >
        v-else
        <dev-input name='name' type="string" @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="name"></dev-input>
        value {{value}}
      </div>
    </div>
    <div v-else>
      <dev-input v-if="paramModel._type==='number'" type='number' :name='name' @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="paramModel._default"></dev-input>
      <dev-input v-else-if="paramModel._type==='string'" type='string' :name='name' @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="paramModel._default"></dev-input>
      <dev-select v-else-if="paramModel._type==='snippet'" @input="(val)=>updateParam({component,name,val})" :label="name" :border="false" :default="paramModel._default" :options="Object.keys(snippetList)"></dev-select>
      <div  v-else-if="paramModel._type==='dico'">
        {{name}} : {{value}}
        <dev-icon :width="svgSize" :height="svgSize" @click="addElementDico(value)" iconName="add"></dev-icon>
      </div>
      <div  v-else-if="paramModel._type==='object'">
        {{name}} :
        <template v-for="([paramName,paramValue] , indexParam)  in Object.entries(paramModel).filter(([key,value])=>!key.startsWith('_'))">
          <dev-entity-param @update-param="updateChildParam"
          :key="indexParam" :name='paramName' :value='undefined' :paramModel='paramValue' :component="component"></dev-entity-param>
        </template>
      </div>
      <div v-else-if="paramModel._type.startsWith('array') && paramModel._type">
        {{name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="addElementArray()" iconName="add"></dev-icon>
      </div>
      <div v-else> else default {{name}} {{paramModel}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {allTypes} from 'editor/frontend/utils/type';

export default {
  name:'DevEntityParam',
  components:{
    'dev-entity-param':() => import('editor/frontend/view/DevEntityParam.vue')
  },
  data(){
    return {
      paramFocus:-1,
      svgSize:"1.5rem",
      invalidJSONInput:false
    }
  },
  props:{
    name:{type:String},
    value:undefined,
    paramModel:{},
    component:{}
  },
  computed:{
    ...mapGetters({
      snippetDico:"arborescence/snippetDico"
    }),
    snippetList:function(){
      let snippetList={};
      Object.entries(this.snippetDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
            snippetList[scope+'/'+filename]={scope:scope,name:filename.split('.')[0]};
        });
      });
     return snippetList
    },
  },
  methods:{
    updateJSON:function(newVal){
      try{
        let jsonValue=JSON.parse(newVal);
        this.updateParam({component:this.component,name:this.name,val:jsonValue})
        this.invalidJSONInput=false;
      }catch(err){
        this.invalidJSONInput=true;
      }
    },
    updateChildArrayParam:function(index,{component,path,val}){
      this.$emit('update-param',{component,path:[this.name,index,...path],val});
    },
    updateChildParam:function({component,path,val}){
      this.$emit('update-param',{component,path:[this.name,...path],val});
    },
    addElementArray:function(value){
      if(value){
        let newVal=[...value,allTypes[this.paramModel._type].defaultValue]
        this.updateParam({component:this.component,name:this.name,val:newVal})
      }else {
        let newVal=[allTypes[this.paramModel._type].defaultValue]
        this.updateParam({component:this.component,name:this.name,val:newVal})
      }
    },
    emptyArray:function(){

    },
    toggleParamsArray:function(index){
      if(this.paramFocus===index){
        this.paramFocus=-1;
      }else this.paramFocus=index;
    },
    getIconType:function(index){
      if(this.paramFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    updateParam:function({component,name,val}){
      this.$emit('update-param',{component,path:[name],val});
    },
    getComponentArrayValue:function(component,paramName,index){
      if(component.params && component.params[paramName])
      return component.params[paramName][index];
      return [];
    },
    getComponentValue:function(component,paramName){
      if(component.params)
      return component.params[paramName]
      return null;
    },
    getArraySubType:function(){
      return this.paramModel._type.match('array<(.*)>')[1];
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-entity-param-container{
  margin-bottom: 1rem;
  margin-left: 1rem;
}

</style>
