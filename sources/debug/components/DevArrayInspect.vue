<template>
  <div @click.stop.prevent="openChildElement" class="dev-array-inspect">
    <div v-if="depth!=0" class="dev-array-inspect-button">
      <dev-icon class="dev-array-inspect-icon" :width="svgSize" :height="svgSize" :iconName="iconArray"></dev-icon>
      <span> {{name}}</span>
    </div>
    <div v-else class="dev-array-inspect-title">
      <span> {{name}}</span>
    </div>
    <template  v-for="(item, index) in arrayToInspect" >
      <template v-if="typeof item=='object'">
        <template v-if="Array.isArray(item)">
          <dev-array-inspect v-if="isChildOpen ||depth==0" :name="index.toString()" :depth="depth + 1" :arrayToInspect.sync="item"></dev-array-inspect>
        </template>
        <template v-else>
          <dev-object-inspect v-if="isChildOpen || depth==0" :name="index.toString()":depth="depth + 1" :objectToInspect.sync="item"></dev-object-inspect>
        </template>
      </template>
      <template v-else>
        <dev-primitive-inspect v-if="isChildOpen ||depth==0" :name="index.toString()" :depth="depth + 1" :isEditable="isEditable(item)" :primitiveToInspect="item" @update:primitiveToInspect="newVal => arrayToInspect[index] = newVal"></dev-primitive-inspect>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'DevArrayInspect',
  props: {
    arrayToInspect:Array,
    depth:Number,
    name:String
  },
  data(){
    return {
      isChildOpen:false,
      svgSize:"1.7em"
    }
  },
  computed:{
    iconArray:function(){
      return this.isChildOpen?"list":"burger";
    }
  },
  methods:{
    openChildElement:function(){
      this.isChildOpen=!this.isChildOpen;
    },
    isEditable(key){
      if(typeof key ==="string" && key !=="name" ){
        return true;
      }else{
        return false;
      }
    },
  }
}
</script>

<style scoped>
.dev-array-inspect{
  display: flex;
  flex-direction: column;
  margin-left:0.5rem;
  margin-top: 0.1rem;
}
.dev-array-inspect-button{
  display: flex;
  align-items:center;
}
.dev-array-inspect-icon{
  margin-right: 0.2rem;
}
.dev-array-inspect-title{
    font-size: 1rem;
    margin-bottom: 0.4rem;
}

</style>
