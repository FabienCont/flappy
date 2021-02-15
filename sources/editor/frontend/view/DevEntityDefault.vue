<template>
  <div class="dev-entity-default-container">
    <dev-input v-if="value._type==='number'" type='number' :name='name' @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="value._default"></dev-input>
    <dev-input v-else-if="value._type==='string'" type='string' :name='name' @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="value._default"></dev-input>

    <div v-else >
      <dev-input name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="name"></dev-input>
      default value {{value}}
    </div>
  </div>
</template>

<script>
export default {
  name:'DevEntityDefault',
  props:{
    name:{type:String},
    value:{},
    paramModel:{}
  }
}
</script>

<style lang="scss" scoped>
.dev-entity-default-container{
  border: 1px solid grey;
  margin-bottom: 1rem;
  margin-left: 1rem;
}

</style>
