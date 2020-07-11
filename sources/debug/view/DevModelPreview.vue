<template>
  <div class="dev-preview">
    <textarea class="dev-preview-textarea" v-model="element" placeholder="editez le fichier"></textarea>
  </div>
</template>

<script>
import {callModelsApi} from "debug/utils/modelsApi"
//check Ref
export default {
  name: 'devpreview',
  data(){
    return {
    }
  },
  props: {
    element:Object
  },
  computed:{
  },
  methods:{
    test:function(){
      var objectToSend={"test":"success"}
      callModelsApi("entities","demo","test2",objectToSend)
    },

  }
}
</script>

<style lang="scss">
.dev-preview{
  width:100%;
}
.dev-preview-textarea{
  width:90%;
}
</style>
