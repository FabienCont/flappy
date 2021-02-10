<template>
  <div class="dev-component-param">
    <div class="dev-component-param-name">
      <dev-input :border="false" type="string" @update:inputValue="newVal=>updateName(newVal)" :isEditable="true" :inputValue="name"></dev-input>
      <dev-icon :width="svgSize" :height="svgSize" @click.prevent="deleteParam" iconName="delete"></dev-icon>
    </div>
    <div class="dev-component-param-value">
      <dev-select @input="(val)=>updateType(val)" v-if="value['_type']" label="type" :border="false" :default="value['_type']" :options="componentParamTypes"></dev-select>
      <div>
        <template v-if="value['_default'] !== undefined" >
          <div class="dev-component-default-checkbox">
            <dev-checkbox v-if="value['_type']!=='boolean'" :val="setToFalse" v-model="selectedCheckbox" label="Set to false"></dev-checkbox>
            <dev-checkbox v-if="value['_type']!=='snippet'" :val="setSnippet" v-model="selectedCheckbox" label="default is snippet"></dev-checkbox>
          </div>
          <span v-if="isSetToFalse">default : {{value['_default']}}</span>
          <dev-select v-else-if="value['_type']==='snippet' || isSetToSnippet===true" @input="(val)=>updateSnippet(snippetList[val])" label="default" :border="false" :default="snippetList[0]" :options="Object.keys(snippetList)"></dev-select>
          <dev-input v-else-if="value['_type']==='string' || value['_type']==='number'" name="default" :border="false" :type="typeof value['_default'] === 'number' ?'number':'string'" @update:inputValue="newVal=>updateDefault(newVal)" :isEditable="true" :inputValue="value['_default']"></dev-input>
          <dev-input :error="invalidJSONInput" v-else name="default" :border="false" type="string" @update:inputValue="newVal=>updateJSON(newVal)" :isEditable="true" :inputValue="JSON.stringify(value['_default'])"></dev-input>
        </template>
        <template v-else >
          <dev-button @click.stop="addDefault()">Add Default</dev-button>
        </template>
      </div>
      <div v-if="value['_object']">
        _object :
        <dev-icon :width="svgSize" :height="svgSize" @click.prevent="deleteObject" iconName="delete"></dev-icon>
        <dev-button @click.stop="addObjectElem()">Add Object def</dev-button>
        <dev-component-param-edit @rename-param="childRenameParam" @del-param='childDeleteParam' @update-value='childUpdateValue' class="dev-component-params dev-component-param-value" v-for='([subKey,subValue] , indexParam)  in Object.entries(value["_object"])' :key="indexParam" :name="subKey" :value="subValue" >
        </dev-component-param-edit>
      </div>
      <div v-else-if="value['_dico']">
        _dico :
        <dev-icon :width="svgSize" :height="svgSize" @click.prevent="deleteDico" iconName="delete"></dev-icon>
        <dev-button @click.stop="addDicoElem()">Add Dico Def</dev-button>
        <dev-component-param-edit @rename-param="childRenameParam" @del-param='childDeleteParam' @update-value='childUpdateValue' class="dev-component-params dev-component-param-value" v-for='([subKey,subValue] , indexParam)  in Object.entries(value["_dico"])' :key="indexParam" :name="subKey" :value="subValue" >
        </dev-component-param-edit>
      </div>
      <div v-else-if="value['_type'] === 'object'">
        <dev-button @click.stop="addObjectDef()">Add _object</dev-button>
      </div>
      <div v-else-if="value['_type'] === 'dico'">
        <dev-button @click.stop="addDicoDef()">Add _dico</dev-button>
      </div>
    </div>
  </div>
</template>

<script>

import {componentParamTypes} from 'editor/frontend/utils/components';
import { mapGetters } from 'vuex'
//check Ref
export default {
  name: 'dev-component-param-edit',
  components:{'dev-component-param-edit':() => import('editor/frontend/view/DevComponentParamEdit.vue')},
  data(){
    return{
      svgSize:"1.5rem",
      componentParamTypes:componentParamTypes,
      selectedCheckbox:[],
      setToFalse:'setToFalse',
      setSnippet:'setSnippet',
      invalidJSONInput:false
    }
  },
  props:{
    value:{
      type:Object
    },
    name:String
  },
  computed:{
    ...mapGetters({
      snippetDico:"arborescence/snippetDico"
    }),
    snippetList:function(){
      let snippetList={};
      Object.entries(this.snippetDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
            snippetList[scope+'/'+filename]={scope:scope,file:filename};
        });

      });
      return snippetList
    },
    isSetToFalse:function(){
        if(this.selectedCheckbox.length === 1 && this.selectedCheckbox[0] ===this.setToFalse ){
          return true
        }else return false
    },
    isSetToSnippet:function(){
        if(this.selectedCheckbox.length === 1 && this.selectedCheckbox[0] ===this.setSnippet ){
          return true
        }else return false
    }
  },
  watch:{
    value:{
      handler(val){
    /*    if(typeof val._default!==typeof val._type){
          if((this.isSetToFalse && val._default ===false )||(this.isSetToSnippet)){

          }else {

          }
        }*/
        if(val._type!=='object' && val._object ){
          this.updateObjectDef(undefined)
        }

        if(val._type!=='dico' && val._dico ){
          this.updateDicoDef(undefined)
        }
        if(val._type==='snippet'){
          if(this.selectedCheckbox.length>0 && this.selectedCheckbox===this.setSnippet){
            this.selectedCheckbox.splice(0)
          }
        }else if(val._type==='boolean' ){
          if(this.selectedCheckbox.length>0 && this.selectedCheckbox===this.setToFalse){
            this.selectedCheckbox.splice(0)
          }
        }
      },
      deep:true
    },
    selectedCheckbox(val,oldVal){
      if(val.length===2){
        val.shift()
      }
      let key = '_default';
      if(val.length === 1 && val[0] ===this.setToFalse ){
        let value=false;
        this.emitUpdateToParent({key,value,path:[this.name]})
      }else if(val.length === 1 && val[0] ===this.setSnippet) {
        let value="snippet";
        this.emitUpdateToParent({key,value,path:[this.name]})
      }else  {
        let value=undefined;
        this.emitUpdateToParent({key,value,path:[this.name]})
      }
    }
  },
  methods:{
    childRenameParam:function({oldKey,newKey,path}){
      this.$emit('rename-param',{oldKey,newKey,path:[this.name,...path]})
    },
    deleteParam:function(){
      this.$emit('del-param',[this.name])
    },
    childDeleteParam:function(path){
      this.$emit('del-param',[this.name,...path])
    },
    emitUpdateToParent:function({key,value,path}){
        this.$emit('update-value',{key,value,path})
    },
    addDicoDef:function(){
      this.updateDicoDef({})
    },
    addObjectDef:function(){
        this.updateObjectDef({})
    },
    addDicoElem:function(){
      let newParam={'newParam':{
        '_type':'number',
        'default':1
      }}
      this.updateDicoDef({...this.value._dico,...newParam})
    },
    addObjectElem:function(){
      let newParam={'newParam':{
        '_type':'number',
        'default':1
      }}
      this.updateObjectDef({...this.value._object,...newParam})
    },
    deleteDico:function(){
      this.updateDicoDef(undefined)
    },
    deleteObject:function(){
      this.updateObjectDef(undefined)
    },
    updateObjectDef:function(value){
        let key = '_object';
        this.emitUpdateToParent({key,value:value,path:[this.name]})
    },
    updateDicoDef:function(value){
        let key = '_dico';
        this.emitUpdateToParent({key,value:value,path:[this.name]})
    },
    addDefault:function(){
      this.updateDefault(0)
    },
    childUpdateValue:function({key,value,path}){
      this.emitUpdateToParent({key,value,path:[this.name,...path]})
    },
    updateName:function(value){
      this.$emit('rename-param',{oldKey:this.name,newKey:value,path:[this.name]});
    },
    updateDefault:function(value){
      this.emitUpdateToParent({key:'_default',value:value,path:[this.name]})
    },
    updateType:function(value){
      this.emitUpdateToParent({key:'_type',value:value,path:[this.name]})
    },
    updateJSON:function(newVal){
      try{
        let jsonValue=JSON.parse(newVal);
        this.updateDefault(jsonValue)
        this.invalidJSONInput=false;
      }catch(err){
        this.invalidJSONInput=true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "editor/frontend/styles/_variables";

.dev-component-param{
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    color:$dev--color-color-light;
}

.dev-component-param-name{
  display: flex;
  align-items: center;
}

.dev-component-param-value{
  padding-left:2rem;
}
.dev-component-default-checkbox{
  display: flex;
}
.dev-component-value{
  display: flex;
}
.error-json-input{
  border:red;
}
.dev-component-param-value{
  display: flex;
  padding-left:2rem;
  flex-direction: column;
}
</style>
