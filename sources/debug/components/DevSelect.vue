<template>
  <div class="dev-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{selectedDisplay}}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevSelect',
  props:{
    options: {
      type: [Array,Boolean],
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default!==undefined
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  computed:{
    selectedDisplay:function(){
      return this.selected===false?"false":this.selected
    }
  },
  mounted() {
    this.$emit("input", this.selected);
  },
}
</script>

<style scoped lang="scss">
  @import 'debug/styles/_variables';

  .dev-select {
    display: inline-block;
    min-width: 200px;
    position: relative;
    text-align: left;
    outline: none;
    height: 1.5rem;
    line-height: 1.5rem;
  }

  .dev-select .selected {
    background-color:  $dev--color-color0;
    border-radius: 6px;
    border: 1px solid #666666;
    color: #fff;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
  }

  .dev-select .selected.open {
    border: 1px solid #ad8225;
    border-radius: 6px 6px 0px 0px;
  }

  .dev-select .selected:after {
    position: absolute;
    content: "";
    top: 0.7rem;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #fff transparent transparent transparent;
  }

  .dev-select .items {
    color: #fff;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid  $dev--color-color-dark ;
    border-left: 1px solid  $dev--color-color-dark ;
    border-bottom: 1px solid  $dev--color-color-dark ;
    position: absolute;
    background-color:  $dev--color-color0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .dev-select .items div {
    color: #fff;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
  }

  .dev-select .items div:hover {
    background-color:  $dev--color-color-dark ;
  }

  .selectHide {
    display: none;
  }

</style>
