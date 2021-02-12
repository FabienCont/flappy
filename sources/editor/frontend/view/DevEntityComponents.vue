<template>
  <div class="dev-entity-components-container">
    <h3>Entity :</h3>
    {{entity}}
    <h4>Components</h4> 
    {{components}}
  </div>
</template>

<script>
export default {
  name:'DevEntityComponents',
  props:{
    entity:{type:Object},
    components:{type:Object},
  },
}
</script>

<style lang="scss" scoped>
.dev-entity-components-container{
  margin-bottom: 1rem;
}

</style>
