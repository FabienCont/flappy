<template>
  <div class="devtool">
    <div v-if="isHide">
      <dev-icon @click="show()" iconName="add"></dev-icon>
    </div>
    <div v-else="!isHide" class="devtool-box">
      <div class="devtool-box-header">
        <div class="devtool-box-header-button">
          <div class="devtool-box-header-left">
            <dev-icon class="devtool-header-button" iconName="target"></dev-icon>
            <dev-icon class="devtool-header-button" iconName="eye"></dev-icon>
            <dev-icon class="devtool-header-button" @click="play()" v-if="isPlaying===false" iconName="right"></dev-icon>
            <dev-button class="devtool-header-button" @click="pause()" v-if="isPlaying===true">Pause</dev-button>
            <dev-button class="devtool-header-button" @click="tick()" v-if="isPlaying===true">Tick</dev-button>
          </div>
          <div class="devtool-box-header-right">
            <dev-icon class="devtool-header-button" iconName="config"></dev-icon>
            <dev-icon class="devtool-header-button" @click="hide()" iconName="minus"></dev-icon>
          </div>
        </div>
        <div class="devtool-box-header-loop">
          <dev-primitive-inspect class="devtool-header-input" @update:primitiveToInspect="newVal => tickStep = newVal" isEditable="true" name="tick step" :primitiveToInspect="tickStep"></dev-primitive-inspect>
          <dev-primitive-inspect class="devtool-header-input" @update:primitiveToInspect="newVal => loop.speed = newVal" isEditable="true" name="speed" :primitiveToInspect="loop.speed"></dev-primitive-inspect>
          <dev-primitive-inspect class="devtool-header-input" @update:primitiveToInspect="newVal => loop.framerate = newVal" isEditable="true" name="framerate" :primitiveToInspect="loop.framerate"></dev-primitive-inspect>
        </div>
      </div>
      <div class="devtool-box-tab">
        <dev-tab :isActive="activeTab=='scene'" @click.stop.prevent="setActiveTab('scene')">Scene</dev-tab>
        <dev-tab :isActive="activeTab=='theatre'" @click.stop.prevent="setActiveTab('theatre')">Theatre</dev-tab>
      </div>
      <div class="devtool-box-inspect">
        <div class="devtool-box-search">
          <dev-icon iconName="search"></dev-icon>
          <dev-primitive-inspect @update:primitiveToInspect="newVal => searchText = newVal" isEditable="true" name="" :primitiveToInspect="searchText"></dev-primitive-inspect>
        </div>
        <dev-object-inspect v-if="activeTab=='scene'" name="Entities" :depth="0" :objectToInspect.sync="entities"></dev-object-inspect>
        <dev-object-inspect v-if="activeTab=='theatre'" name="Theatre" :depth="0" :objectToInspect.sync="theatre"></dev-object-inspect>
      </div>
      <!-- <div class="devtool-box-edit">
        <dev-object-edit :objectToEdit.sync="theatre"></dev-object-edit>
      </div> -->
    </div>
  </div>
</template>

<script>
//check Ref
export default {
  name: 'Devtool',
  data(){
    return {
      //getter
      isPlaying:true,
      theatre:{
        scenes:window.theatre,
        assets:window.theatre.assets,
        assetsLoaded:window.theatre.assetsLoaded,
        $camera:window.theatre.$camera,
        $origins:window.theatre.$origins
      },
      loop:window.theatre.loop,
      entities:window.theatre.$world.entities,
      activeTab:"theatre",
      isHide:false,
      searchText:"",
      tickStep:1
    }
  },
  methods:{
    hide:function(){
      this.isHide=true;
    },
    show:function(){
      this.isHide=false;
    },
    setActiveTab:function(tab){
      this.activeTab=tab;
    },
    play:function(){
      this.isPlaying=true;
    },
    pause:function(){
      this.isPlaying=false;
    },
    tick:function(){

    },
  }
}
</script>

<style lang="scss">
  @import 'debug/styles/_variables';

.devtool{
  font-family: Arial;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
  margin:1rem;
}
.devtool-box{
  min-width: 300px;
  min-height: 200px;
  max-height: 90vh;
  overflow-y:auto;
  border:1px solid $dev--color-color0;
  background: $dev--color-color-light-fade;
}


.devtool-box-header-button{
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.devtool-header-button{
  margin: 0 0.2rem;
}
.devtool-header-input{
    margin:0.5rem 0;
}

.devtool-box-header-left{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.devtool-box-header-right{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.devtool-box-header-loop{
  margin: 1rem 0;
}

.devtool-box-search{
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.5rem;
}

.devtool-box-tab{
  margin: 1rem 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.devtool-box-inspect{
  margin: 1rem 0;
}

.devtool-box-edit{
  margin: 1rem 0;
  border-top: 1px solid black;
}

</style>
