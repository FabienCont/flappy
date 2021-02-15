<template>
  <div class="dev-entity-param-container">
    <dev-input v-if="typeof value==='number'" type='number' :name='name' @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="value"></dev-input>
    <dev-input v-else-if="typeof value==='string'" type='string' :name='name' @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="value"></dev-input>

    <div v-else >
      <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="name"></dev-input>
      value {{value}}
    </div>
  </div>
</template>

<script>
export default {
  name:'DevEntityParam',
  props:{
    name:{type:String},
    value:{},
    paramModel:{}
  }
}
</script>

<style lang="scss" scoped>
.dev-entity-param-container{
  margin-bottom: 1rem;
  margin-left: 1rem;
}

</style>
