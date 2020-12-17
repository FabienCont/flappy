<template>
  <div class="header-app">
    <span class="header-app-context-title">Edit</span>
  </div>
</template>

<script>

export default {
  name: 'header-app',
  data(){
    return {

    }
  },
  computed:{
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .header-app{
    display: flex;
    width:100%;
    height: 20px;
    align-items: center;
    font-size: $dev--font-size-m;
    background: $dev--color-color1-fade;
  }
  .header-app-context-title{
    display: flex;
    margin-left:0.2rem;
  }
</style>
