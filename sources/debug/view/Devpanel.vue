<template>
  <div class="devpanel">
    <div v-if="isHide">
      <dev-icon @click="show()" iconName="add"></dev-icon>
    </div>
    <div :style="devPanelStyle" v-else="!isHide" class="devpanel-box">
      <div class="devpanel-box-header">
        <div class=" devpanel-box-header-button">
          <div class="devpanel-box-header-left">
            <dev-icon class="devpanel-header-button" iconName="target"></dev-icon>
            <dev-icon class="devpanel-header-button" iconName="eye"></dev-icon>
          </div>
          <div class="devpanel-box-header-right">
            <dev-icon class="devpanel-header-button" iconName="config"></dev-icon>
            <dev-icon class="devpanel-header-button" @click="hide()" iconName="minus"></dev-icon>
          </div>
        </div>
        <div class="devpanel-box-header-loop">
          <div>
            <dev-primitive-inspect class="devpanel-header-input" @update:primitiveToInspect="newVal => panelWidth = newVal" isEditable="true" name="panel width" :primitiveToInspect="panelWidth"></dev-primitive-inspect>
            <h4>Current Scene: {{sceneName}}</h4>
            <span>Selected Scene:
              <dev-select :options='this.optionsScenes' :default='sceneName' @input="selectScene($event)">

              </dev-select>
            </span>
          </div>
          <dev-icon class="devpanel-header-button" @click="play()" v-if="isPlaying===false" iconName="right"></dev-icon>
          <dev-icon class="devpanel-header-button" iconName="pause" @click="pause()" v-if="isPlaying===true">Pause</dev-icon>
          <dev-icon class="devpanel-header-button" iconName="time" @click="tick()" v-if="isPlaying===false">Tick</dev-icon>
          <dev-icon class="devpanel-header-button" iconName="restart" @click="restart()">Restart</dev-icon>
          <span v-if="isPlaying===false">GAME ON PAUSE</span>
          <dev-primitive-inspect class="devpanel-header-input" @update:primitiveToInspect="newVal => tickStep = newVal" isEditable="true" name="tick step" :primitiveToInspect="tickStep"></dev-primitive-inspect>
          <dev-primitive-inspect class="devpanel-header-input" @update:primitiveToInspect="newVal => loop.speed = newVal" isEditable="true" name="speed" :primitiveToInspect="loop.speed"></dev-primitive-inspect>
          <dev-primitive-inspect class="devpanel-header-input" @update:primitiveToInspect="newVal => loop.framerate = newVal" isEditable="true" name="framerate" :primitiveToInspect="loop.framerate"></dev-primitive-inspect>

        </div>
      </div>
      <div class="devpanel-box-tab">
        <dev-tab :isActive="activeTab=='live'" @click.stop.prevent="setActiveTab('live')">Live</dev-tab>
        <dev-tab :isActive="activeTab=='models'" @click.stop.prevent="setActiveTab('models')">Models</dev-tab>
        <dev-tab :isActive="activeTab=='assets'" @click.stop.prevent="setActiveTab('assets')">Assets</dev-tab>
        <dev-tab :isActive="activeTab=='theatre'" @click.stop.prevent="setActiveTab('theatre')">$Framework</dev-tab>
      </div>
      <div class="devpanel-box-inspect">
        <dev-object-inspect v-if="activeTab=='live'" name="Live" :depth="0" :objectToInspect.sync="world"></dev-object-inspect>
        <dev-models v-if="activeTab=='models'" name="Models" :depth="0" :models="models"></dev-models>
        <dev-assets v-if="activeTab=='assets'" name="Assets" :depth="0" :models.sync="assets"></dev-assets>
        <dev-object-inspect v-if="activeTab=='theatre'" name="Theatre" :depth="0" :objectToInspect.sync="theatre"></dev-object-inspect>
      </div>
    </div>
  </div>
</template>

<script>
import {callModelsApi} from "debug/utils/modelsApi";
import devModels from "debug/view/DevModels.vue";
import devAssets from "debug/view/DevAssets.vue"
//check Ref
export default {
  name: 'devpanel',
  components:{devModels,devAssets},
  data(){
    return {
      //getter
      theatre:window.theatre,
      scenes:window.theatre.scenes,
      world:window.theatre.$world,
      selectedScene:()=>{return window.theatre.currentScene},
      // assets:window.theatre.assets,
      // assetsLoaded:window.theatre.assetsLoaded,
      // $camera:window.theatre.$camera,
      // $origins:window.theatre.$origins
      assets:window.theatre.assets,
      models:window.theatre.models,
      loop:window.theatre.loop,
      activeTab:"models",
      isHide:false,
      tickStep:1,
      panelWidth:'400px'
    }
  },
  computed:{
    sceneName:function(){
      return this.theatre.currentScene;
    },
    isPlaying:function(){
      return this.theatre.playing;
    },
    devPanelStyle:function(){
        return 'width:'+this.panelWidth;
    },
    optionsScenes:function(){
      return Object.keys(this.scenes);
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
      this.theatre.play();
    },
    pause:function(){
      this.theatre.pause();
    },
    tick:function(){
      this.theatre.tick(this.tickStep);
    },
    restart:function(){
      if(this.sceneName!=this.selectedScene){
          this.loadScene(this.selectedScene);
      }else this.theatre.restart();
    },
    loadScene:function(scene){
      this.theatre.load(scene);
    },
    selectScene:function(scene){
      this.selectedScene=scene;
    }
  }
}
</script>

<style lang="scss">
  @import 'debug/styles/_variables';

.devpanel{
  font-family: Arial;
  font-size: 12px;
}
.devpanel-box{
  width: 400px;
  height: 100%;
  overflow-y:auto;
  box-sizing: border-box;
  border-left:1px solid $dev--color-color0;
  background: $dev--color-color-light-fade;
}


.devpanel-box-header-button{
  margin: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.devpanel-header-button{
  margin: 0 0.2rem;
}
.devpanel-header-input{
    margin:0.5rem 0;
}

.devpanel-box-header-left{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.devpanel-box-header-right{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.devpanel-box-header-loop{
  margin: 1rem 0;
}

.devpanel-box-search{
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.5rem;
}

.devpanel-box-tab{
  margin: 1rem 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.devpanel-box-inspect{
  margin: 1rem 0;
}

.devpanel-box-edit{
  margin: 1rem 0;
  border-top: 1px solid black;
}

</style>
