<template>
  <div class="devscene">
  </div>
</template>

<script>
import {callModelsApi} from "debug/utils/modelsApi"
//check Ref
export default {
  name: 'devscene',
  data(){
    return {
    }
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

</style>
