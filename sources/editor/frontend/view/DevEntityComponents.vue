<template>
  <div class="dev-entity-components-container">
    <h3>Entity :</h3>
    {{entity}}
  </div>
</template>

<script>
export default {
  name:'DevEntityComponents',
  props:{
    entity:{type:Object}
  },
}
</script>

<style lang="scss" scoped>
.dev-entity-components-container{
  margin-bottom: 1rem;
}

</style>
