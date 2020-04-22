<template>
    <div @click.stop.prevent="openChildElement" class="dev-object-inspect">
      <div v-if="depth!=0" class="dev-object-inspect-button">
        <dev-icon class="dev-object-inspect-icon" :width="svgSize" :height="svgSize" :iconName="iconArray"></dev-icon>
        <span> {{name}}</span>
      </div>
      <div v-else class="dev-object-inspect-title">
        <span> {{name}}</span>
      </div>
      <template v-for="(val,key) of objectToInspect">
        <template v-if="typeof val==='object' || typeof val==='module' ">
          <template v-if="Array.isArray(val)">
            <dev-array-inspect :name="key" v-if="isChildOpen || depth==0" :depth="depth + 1" :arrayToInspect.sync="val"></dev-array-inspect>
          </template>
          <template v-else>
            <dev-object-inspect :name="key" v-if="isChildOpen || depth==0" :depth="depth + 1" :objectToInspect.sync="val"></dev-object-inspect>
          </template>
        </template>
        <template v-else-if="typeof val!=='function'">
          <dev-primitive-inspect v-if="isChildOpen || depth==0" :name="key" :depth="depth + 1" :isEditable="isEditable(key)" :primitiveToInspect="val" @update:primitiveToInspect="newVal => objectToInspect[key] = newVal"></dev-primitive-inspect>
        </template>
      </template>
    </div>
</template>

<script>

export default {
  name: 'DevObjectInspect',
  props: {
    objectToInspect:Object,
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
      return this.isChildOpen?"right":"bottom";
    }
  },
  methods:{
    isEditable(key){
      if(typeof key ==="string" && key ==="name" ){
        return false;
      }else{
        return true;
      }
    },
    openChildElement:function(){
      this.isChildOpen=!this.isChildOpen;
    }
  }
}
</script>

<style>
.dev-object-inspect{
  display: flex;
  flex-direction: column;
  margin-left:0.5rem;
  margin-top: 0.1rem;
}
.dev-object-inspect-button{
  display: flex;
  align-items: center;
}

.dev-object-inspect-icon{
  margin-right: 0.2rem;
}
.dev-object-inspect-title{
  font-size: 1rem;
  margin-bottom: 0.4rem;
}
</style>
