<template>
  <div class="dev-component-params">
    <dev-input v-if="!name.startsWith('_')" type="string" @update:inputValue="newVal=>name=newVal" :isEditable="true" :inputValue="name"></dev-input>
    <span v-if="name==='_type'" >
      <dev-select :default="value" :options="componentParamTypes">{{name}} :</dev-select>
    </span>
    <span v-else-if="name==='_default'">
      <dev-checkbox  id="test" value="toto" label="Use snippet as default"></dev-checkbox>
      <dev-input :name="name" :type="typeof value === 'number' ?'number':'string'" @update:inputValue="newVal=>value=newVal" :isEditable="true" :inputValue="value"></dev-input>
    </span>
    <span v-else-if="typeof value!=='object'">{{name}} : {{value}}</span>
    <div v-else class="dev-component-param-value">
      <dev-component-param-edit class="dev-component-params" v-for='([subKey,subValue] , indexParam)  in Object.entries(value)' :key="indexParam" :name="subKey" :value="subValue" >
      </dev-component-param-edit>
    </div>
  </div>
</template>

<script>

import {componentParamTypes} from 'editor/frontend/utils/components'
//check Ref
export default {
  name: 'dev-component-param-edit',
  components:{'dev-component-param-edit':() => import('editor/frontend/view/DevComponentParamEdit.vue')},
  data(){
    return{
      svgSize:"1.5em",
      componentParamTypes:componentParamTypes
    }
  },
  props:{
    value:[String, Object, Number, Array],
    name:String
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
@import "editor/frontend/styles/_variables";

.dev-component-params{
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    color:$dev--color-color-light;
}

.dev-component-value{
  display: flex;
}
.dev-component-param-value{
  display: flex;
  flex-direction: column;
  padding-left:2rem;
}
</style>
