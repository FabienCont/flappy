<template>
  <div class="dev-preview">
    <textarea ref="previewArea" class="dev-preview-textarea" v-model="element" placeholder="editez le fichier"></textarea>
  </div>
</template>

<script>

//check Ref
export default {
  name: 'devpreview',
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
