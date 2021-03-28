<template>
  <div class="dev-cameras-container">
    Cameras:
    <dev-button @click="addCamera()">Add camera</dev-button>
    <div v-for="(camera , index)  in sceneCameras" :key="index">
      <div class="flex align-center">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleCamera(index)" :iconName="getIconType(index)"></dev-icon>
        {{camera.name}}
        <dev-icon v-if="index!==0" :width="svgSize" :height="svgSize" @click="moveTop(index)" iconName="top"></dev-icon>
        <dev-icon v-if="index!==sceneCameras.length-1" :width="svgSize" :height="svgSize" @click="moveBottom(index)" iconName="bottom"></dev-icon>
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteCamera(index)" iconName="delete"></dev-icon>
      </div>
      <div v-if="index === cameraFocus">
        <div class="dev-camera-inspect">
          <dev-input name="name" :border="false" type="string" @update:inputValue="newVal=>updateCameraName(index,newVal)" :isEditable="true" :inputValue="camera.name"></dev-input>
          <dev-select label="type" @input="(val)=>updateCameraType(index,val)" :default="camera.type" :options="cameraTypeList"></dev-select>
          params:
          <div class="dev-camera-params">
            <div class="dev-camera-param" v-for="param,indexParam in possibleParams" :key='indexParam'>
              <template v-if="camera.params && typeof camera.params[param]==='number'" >
                <dev-icon class="snippet-icon":width="miniSvgSize" :height="miniSvgSize" @click="toggleParamToSnippet(index,param)" iconName="link"></dev-icon>
                <dev-input :name="param" :border="false" type="number" @update:inputValue="newVal=>updateCameraParam(index,param,newVal)" :isEditable="true" :inputValue="camera.params[param]"></dev-input>
              </template>
              <template v-else-if="!camera.params || !camera.params[param]">
                <dev-input :name="param" :border="false" type="number" @update:inputValue="newVal=>updateCameraParam(index,param,newVal)" :isEditable="true" inputValue="0"></dev-input>
              </template>
              <template v-else-if="camera.params && camera.params[param] &&  typeof camera.params[param] ==='object' &&  Object.keys(camera.params[param])[0]==='$snippet'">
                <dev-icon class="snippet-icon snippet-icon-active" :width="miniSvgSize" :height="miniSvgSize" @click="toggleParamToSnippet(index,param)" iconName="link"></dev-icon>
                <dev-select @input="(val)=>updateCameraParam(index,param,{'$snippet':snippetList[val]})" :label="param" :border="false" :default="getSnippet(camera.params[param])" :options="Object.keys(snippetList)"></dev-select>
              </template>
            </div>
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
      miniSvgSize:"1.3rem",
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
    moveTop:function(index){
      this.swap(index,index-1);
    },
    swap:function(index,to){
      this.$emit("swap",{index,to})
    },
    moveBottom:function(index){
      this.swap(index,index+1);
    },
    getSnippet:function(param){
      return param.$snippet.scope+'/'+param.$snippet.name
    },
    addCamera:function(){
      let camera={name:'default',type:'contain-framed',params:{width:160,height:140,x:0,y:0,z:0}};
      this.$emit("add",camera)
    },
    deleteCamera:function(index){
      this.$emit("remove",index)
    },
    updateCamera:function(index,camera){
      this.$emit("update",{index,camera})
    },
    updateCameraParam:function(index,param,value){
      let camera=JSON.parse(JSON.stringify(this.sceneCameras[index]));
      camera.params[param]=value;
      this.updateCamera(index,camera);
    },
    updateCameraName:function(index,value){
      let camera=JSON.parse(JSON.stringify(this.sceneCameras[index]));
      camera.name=value;
      this.updateCamera(index,camera);
    },
    updateCameraType:function(index,value){
      let camera=JSON.parse(JSON.stringify(this.sceneCameras[index]));
      camera.type=value;
      this.updateCamera(index,camera);
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
    },
    toggleParamToSnippet(index,param){
        let camera=JSON.parse(JSON.stringify(this.sceneCameras[index]));
        let value=camera.params[param];
        if(typeof value ==='object' &&  Object.keys(value)[0]==='$snippet'){
          camera.params[param]=0;
        }else{
          camera.params[param]={'$snippet':Object.values(this.snippetList)[0]};
        }

        this.updateCamera(index,camera);
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
@import "editor/frontend/styles/_variables";
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

  .dev-camera-param{
    display:flex;
    align-items:center;
  }
  .snippet-icon{
    margin-right:0.1rem;
  }
  .snippet-icon-active{
    stroke: $dev--color-color6;
  }
</style>
