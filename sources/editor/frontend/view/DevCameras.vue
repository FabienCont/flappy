<template>
  <div class="dev-cameras-container">
    Cameras:
    <dev-button @click="addCamera()">Add camera</dev-button>
    <div v-for="(camera , index)  in sceneCameras" :key="index">
      <div class="flex align-center">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleCamera(index)" :iconName="getIconType(index)"></dev-icon>
        {{camera.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteCamera(index)" iconName="delete"></dev-icon>
      </div>
      <div v-if="index === cameraFocus">
        <div class="dev-camera-inspect">
          <dev-input name="name" :border="false" type="string" @update:inputValue="newVal=>updateDefault(newVal)" :isEditable="true" :inputValue="camera.name"></dev-input>
          <dev-select label="type" @input="(val)=>camera.type=val" :default="camera.type" :options="cameraTypeList"></dev-select>
          params:
          <div class="dev-camera-params">
            <template v-for="param in possibleParams">
              <dev-input v-if="camera.params && camera.params[param] &&  typeof camera.params[param]==='number'" :name="param" :border="false" type="number" @update:inputValue="newVal=>updateDefault(newVal)" :isEditable="true" :inputValue="camera.params[param]"></dev-input>
              <dev-input v-else-if="!camera.params || !camera.params[param]" :name="param" :border="false" type="number" @update:inputValue="newVal=>updateDefault(newVal)" :isEditable="true" inputValue="0"></dev-input>
              <template v-else-if="camera.params && camera.params[param] &&  typeof camera.params[param] ==='object' &&  Object.keys(camera.params[param])[0]==='$snippet'">
                <dev-select @input="(val)=>updateSnippet(snippetList[val])" :label="param" :border="false" :default="snippetList[0]" :options="Object.keys(snippetList)"></dev-select>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name:"DevCameras",
  data(){
    return {
      svgSize:"2rem",
      cameraFocus:-1,
      possibleParams:["width","height","x","y","z"]
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    addCamera:function(){

    },
    deleteCamera:function(){

    },
    getIconType:function(index){
      if(this.cameraFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleCamera:function(index){
      if(this.cameraFocus===index){
        this.cameraFocus=-1;
      }else this.cameraFocus=index;
    }
  },
  computed:{
    ...mapGetters({
      snippetDico:"arborescence/snippetDico"
    }),
    snippetList:function(){
      let snippetList={};
      Object.entries(this.snippetDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
            let name=filename.split('.')[0]
            snippetList[scope+'/'+name]={scope:scope,name};
        });

      });
      return snippetList
    },
    cameraTypeList:function(){
      let cameraTypeList=["contain-frameless","contain-framed","cover"]
      return cameraTypeList;
    },
    sceneCameras:function(){
      let sceneCameras=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='cameras.json')
      if(sceneCameras)return this.sceneFiles[sceneCameras[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
  .dev-camera-select{
      width:100%;
      flex:1;
  }
  .dev-camera-inspect{
      margin-left:1rem;
  }

  .dev-camera-params{
    margin-left:1rem;
  }
</style>
