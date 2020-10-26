<template>
  <div class="dev-preview">
    <textarea ref="previewArea" class="dev-preview-textarea" v-model="element" placeholder="editez le fichier"></textarea>
  </div>
</template>

<script>
import {callModelsApi} from "debug/utils/modelsApi"
//check Ref
export default {
  name: 'devpreviewjson',
  data(){
    return {
    }
  },
  watch:{
    element:function(val){
        this.$refs.previewArea.style.height = 'auto';
        this.$nextTick(() => {
          this.$refs.previewArea.style.height = this.$refs.previewArea.scrollHeight + 'px';
        })
      }
  },
  props: {
    element:String
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
  margin-top: 5px;
  width:90%;
}
</style>
