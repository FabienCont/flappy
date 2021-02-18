<template>
  <div class="dev-entity-param-container">
    <div v-if="value!==undefined && paramModel._type">
      <dev-input v-if="paramModel._type==='number'" type='number' :name='name' @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="value"></dev-input>
      <dev-input v-else-if="paramModel._type==='string'" type='string' :name='name' @update:inputValue="val=>updateParam({component,name,val})" :isEditable="true" :inputValue="value"></dev-input>
      <div  v-else-if="paramModel._type==='object'">
        {{name}} :
        <dev-entity-param v-for="([paramName,paramValue] , indexParam)  in Object.entries(paramModel).filter(([key,value])=>!key.startsWith('_'))"  update-component="updateComponentParam"
        :key="indexParam" :name='paramName' :value='value[paramName]' :paramModel='paramValue'></dev-entity-param>
      </div>
      <div  v-else-if="paramModel._type==='dico'">
        dico {{name}} :{{value}}
      </div>
      <div  v-else-if="paramModel._type==='snippet'">
        snippet {{name}} :{{value}}
      </div>
      <div v-else-if="paramModel._type.startsWith('array<object>')">
          <template v-if="value && Array.isArray(value)">
              <template v-for="(paramValueArray,index) in value"  >
                {{index}}:
                  <dev-entity-param v-for="([paramName,paramValue] , indexParam)  in Object.entries(paramModel._object)"  update-component="updateComponentParam"
                  :key="index+'_'+indexParam" :name='paramName' :value='paramValueArray[paramName]' :paramModel='paramValue'></dev-entity-param>
              </template>
          </template>
      </div>
      <div v-else-if="paramModel._type.startsWith('array<array>')" >
        {{name}} :
        <template v-for="(paramValueArray,index) in value">
         [
          <dev-entity-param  update-component="updateComponentParam"
           :key="index" :name="index" :value='paramValueArray' :paramModel="paramModel._array"></dev-entity-param>
        </template>
        ]
      </div>
      <div v-else-if="paramModel._type.startsWith('array<')" >
        <dev-input :error="invalidJSONInput" :border="false" :name="name" type="string" @update:inputValue="newVal=>updateJSON(newVal)" :isEditable="true" :inputValue="JSON.stringify(value)"></dev-input>
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
      <div v-else>   else default {{name}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name:'DevEntityParam',
  components:{'dev-entity-param':() => import('editor/frontend/view/DevEntityParam.vue')},
  props:{
    name:{type:String},
    value:undefined,
    paramModel:{},
    component:{}
  },methods:{
    updateParam:function({component,name,val}){
      this.$emit('update-param',{component,name,val});
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
