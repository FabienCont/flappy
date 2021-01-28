<template>
  <div class="footer-app">

  </div>
</template>

<script>

export default {
  name: 'footer-app',
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

  .footer-app{
    display: block;
    height: 30px;
    width:100%;
    background: $dev--color-color-dark;
    color: $dev--color-color-light;
    border-top:1px solid $dev--color-color-darker;
  }
</style>
