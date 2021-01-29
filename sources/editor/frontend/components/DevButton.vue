<template>
  <button v-on="$listeners" class="dev-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'DevButton'
}
</script>

<style scoped lang="scss">

@import "editor/frontend/styles/_variables";

  .dev-button{
    border: none;
    background-color: $dev--color-color2;
    color:$dev--color-color-light;
    padding: 0.35rem 0.8rem;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    display: flex;
    margin :0.3rem;
    border-radius: 2px;
    cursor: pointer;
  }

  :hover.dev-button{
    background-color: $dev--color-color2-light;
  }

  :disabled.dev-button{
    background-color: $dev--color-color2-fade;
    cursor: not-allowed;
  }

</style>
