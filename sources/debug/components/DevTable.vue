<template>
  <table class="dev-table">
    <thead>
      <tr class="dev-table-headers">
        <slot name="table-headers"></slot>
      </tr>
    </thead>
    <template>
      <tbody class="dev-table-content">
        <slot name="table-content"/>
      </tbody>
    </template>
  </table>
</template>

<script>
export default {
  name: 'DevTable'
}
</script>

<style lang="scss">

  @import 'debug/styles/_variables';

  .dev-table{
    border: none;
    background-color: $dev--color-color0;
    color:$dev--color-color-light;
    padding: 0.3rem 0.7rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
  }
</style>
