<template>
  <div class="dev-input-container">
    <input class="dev-input" type="file" @change="previewFiles" >
  </div>
</template>

<script>
export default {
  name: 'DevUnput',
  props: {
    accept:String
  },
  methods:{
    previewFiles(event) {
        this.$emit('update-file', event.target.files[0]);
    }
  },
}
</script>

<style scoped>
.dev-input-container{
}
</style>
