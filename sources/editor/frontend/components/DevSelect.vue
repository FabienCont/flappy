<template>
  <div class="dev-select-container" :class="{'dev-select-inline':inline,'dev-noborder':!border, open: open,'fill':selected!=='' }" :tabindex="tabindex" @blur="open = false">
    <label v-if="label && inline" class="select-label-inline">{{ label }}:</label>
    <div class="dev-select">
      <div class="dev-selected" @click="open = !open">
       {{ selected }}
      </div>
      <div class="dev-items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          class="dev-elem"
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
  		<span class="select-bar"></span>
  		<label v-if="label && !inline" class="select-label">  {{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: ''
    },
    border:{
      type: Boolean,
      required: false,
      default:true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    label: {
      type: String,
      required: false,
      default: "Select",
    },
    inline:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
}
</script>

<style scoped lang="scss">

@import "editor/frontend/styles/_variables";

$primary: $dev--color-color3-dark;
$secondary: $dev--color-color3-light;
$main:$dev--color-color0;
$highlight:$primary ;
$text:$dev--color-color-light;
$text-open:$dev--color-color-light;
$bg-select-color:$dev--color-color-dark ;
$scroll:$secondary;

.dev-select-container {
  margin-top: 0.7rem;
}

.dev-select-container .dev-select-inline{
  display: flex;
}

.dev-select-inline{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0;
    margin-top:0rem;
}

.dev-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 2.4rem;
  line-height: 2.4rem;

}


.dev-select-inline.dev-select{
  width:inherit;
}

.dev-selected {
  color: $text;
  padding-left: 0.5rem;
  cursor: pointer;
  user-select: none;
	border-bottom: 2px solid $main;
}

/* Remove focus */
 .dev-select-container:focus,.dev-select:focus,.dev-selected:focus {
	outline: none;
	border-bottom: 1px solid rgba(0,0,0, 0);
}

.dev-noborder .dev-selected{
    border-bottom:0px;
}


.open .dev-selected  {
  border: 0px solid black;
  border-radius: 0px 0px 0px 0px;
}

.dev-selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 1em;
  width: 0;
  height: 0;
	padding: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid $main;
  pointer-events: none;
}
.open .dev-items{
  display:inherit;
}
.dev-items {
  display:none;
  background:$bg-select-color;
  border-radius: 0px 0px 0px 0px;
  overflow: auto;
  max-height: 15rem;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  box-shadow: 0px 0px 2px 0px rgba(255,255,255,1);
}

.dev-items .dev-elem {
  color: $text-open;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.dev-items .dev-elem:hover {
  background-color: $highlight;
}

/* LABEL ======================================= */
.select-label-inline{
  	color: $dev--color-color0;
}
.open .select-label-inline,.dev-select-container:hover .select-label-inline {
  color:$primary;
}

.select-label {
	color:$text;
	font-size: 18px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 0;
	top: 10px;
	transition: 0.2s ease all;
}

/* active state */
.fill .select-label {
	color: $dev--color-color0;
  top: -1rem;
	transition: 0.2s ease all;
	font-size: 14px;
}

.open .select-label,.dev-select:hover .select-label {
  color:$primary;
}

/* BOTTOM BARS ================================= */
.select-bar {
	position: relative;
	display: block;
	width: 100%;
}
.select-bar:before{
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
	background: linear-gradient(to right, $primary,$secondary);
}
.dev-select:hover .select-bar:before{
  width: 100%;
}
.open .select-bar:before{
  width: 100%;
}
/*
.dev-select:hover .select-bar:before, .dev-select:hover .select-bar:after {
  	width: 50%;
}
.select-bar:before, .select-bar:after {
	content: '';
	height: 2px;
	width: 0;
	bottom: 1px;
	position: absolute;
	transition: 0.2s ease all;
}

.select-bar:before {
	left: 50%;
  background: linear-gradient(to right, $primary,$secondary);
}

.select-bar:after {
	right: 50%;
  background: linear-gradient(to left, $primary,$secondary);
}

.open .select-bar:before, .open .select-bar:after{
	width: 50%;
}
*/
/* SCROLLBAR ================================== */
::-webkit-scrollbar-thumb {
      border-radius: 5px;
      border: 1px solid  $scroll;
      background:  $scroll;
      background-clip: content-box;
  }
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-thumb:active {
  border: 10px solid $scroll;
}

</style>
