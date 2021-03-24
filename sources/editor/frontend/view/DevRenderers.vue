<template>
  <div class="dev-renderers-container">
    Renderers:
    <dev-button v-if="!addingRenderer" @click="addRenderer()">Add renderer</dev-button>
    <div v-else>
      <dev-select @input="(val)=>addedRenderer=systemList[val]" :border="false" :default="Object.keys(systemList)[0]" :options="Object.keys(systemList)"></dev-select>
      <div class="flex">
        <dev-button @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="(renderer , index)  in sceneRenderers" :key="index">
      <div class="flex align-center">
        {{renderer.scope}}/{{renderer.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteRenderer(index)" iconName="delete"></dev-icon>
        <dev-icon v-if="index!==0" :width="svgSize" :height="svgSize" @click="moveTop(index)" iconName="top"></dev-icon>
        <dev-icon v-if="index!==sceneRenderers.length-1" :width="svgSize" :height="svgSize" @click="moveBottom(index)" iconName="bottom"></dev-icon>
        <dev-icon :width="svgSize" :height="svgSize" @click="openFile(index)" iconName="search"></dev-icon>
      </div>
      <div class="dev-renderers-compo">
        <div>
          <span>[</span>
          <span v-for="(compo,indexCompo) in renderer.components" :key='indexCompo'>
            <span class="dev-renderers-compo-name" @click="removeComponent(index,indexCompo)">{{compo}}</span>
            <span v-if="indexCompo!==renderer.components.length-1">,</span>
          </span>
          <span>]</span>
        </div>
        <dev-icon v-if="!addingComponent || rendererFocus!==index" :width="miniSvgSize" :height="svgSize" @click="addComponent(index)" iconName="add"></dev-icon>
      </div>
      <div v-if="addingComponent && rendererFocus===index">
        <dev-select @input="(val)=>addedComponent=val" :border="false" :default="Object.keys(componentNameDico)[0]" :options="Object.keys(componentNameDico)"></dev-select>
        <div class="flex">
          <dev-button @click="validComponent(index)">Valid</dev-button>
          <dev-button @click="cancelComponent()">Cancel</dev-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { mapGetters,mapActions } from 'vuex'

export default {
  name:"DevRenderers",
  data(){
    return {
      svgSize:"2rem",
      miniSvgSize:"1.2rem",
      rendererFocus:-1,
      addedRenderer:null,
      addingRenderer:false,
      addingComponent:false,
      addedComponent:null
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  methods:{
    ...mapActions({
      openPane:'panes/open',
    }),
    openFile(index){
      let system=this.sceneRenderers[index];
      let path='models/systems/'+system.scope+'/'+system.name+'.js';
      this.openPane(path);
    },
    moveTop:function(index){
      this.swap(index,index-1);
    },
    swap:function(index,to){
      this.$emit("swap",{index,to})
    },
    moveBottom:function(index){
      this.swap(index,index+1);
    },
    addRenderer:function(){
      this.addedRenderer=Object.values(this.systemList)[0]
      this.addingRenderer=true;
    },
    cancel:function(){
      this.addedRenderer=null;
      this.addingRenderer=false;
    },
    valid:function(){
      let renderer=this.addedRenderer
      renderer.components=[]
      this.$emit("add",renderer)
      this.cancel();
    },
    removeComponent:function(index,indexCompo){
      let renderer=JSON.parse(JSON.stringify(this.sceneRenderers[index]));
      renderer.components.splice(indexCompo,1)
      this.$emit("update",{index,renderer})
      this.cancelComponent();
    },
    addComponent:function(index){
      this.rendererFocus=index;
      this.addedComponent=Object.keys(this.componentNameDico)[0]
      this.addingComponent=true;
    },
    cancelComponent:function(){
      this.addedComponent=null;
      this.addingComponent=false;
      this.rendererFocus=-1;
    },
    validComponent:function(index){
      let renderer=JSON.parse(JSON.stringify(this.sceneRenderers[index]));
      renderer.components.push(this.addedComponent)
      this.$emit("update",{index,renderer})
      this.cancelComponent();
    },
    deleteRenderer:function(index){
      this.$emit("remove",index)
    },
  },
  computed:{
    ...mapGetters({
      systemDico:"arborescence/systemDico",
      componentDico:"arborescence/componentDico"
    }),
    componentNameDico:function(){
      let componentNameDico={};
      Object.entries(this.componentDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
          let name=filename.split('.json')[0]
            if(this.sceneRenderers[this.rendererFocus] && this.sceneRenderers[this.rendererFocus].components.indexOf(name)===-1){
              componentNameDico[name]=null;
            }
        });
      });
      return componentNameDico
    },
    systemList:function(){
      let systemList={};
      Object.entries(this.systemDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
            let name=filename.split('.')[0]
            systemList[scope+'/'+name]={scope:scope,name};
        });
      });
      return systemList
    },
    sceneRenderers:function(){
      let sceneRenderers=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='renderers.json')
      if(sceneRenderers)return this.sceneFiles[sceneRenderers[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .dev-renderers-compo{
    margin-left: 1rem;
    display: flex;
  }

  .dev-renderers-compo-name{

  position:relative;
  cursor:pointer;

    &:before{
      content:'';
      position: absolute;
      width: 0%;
      height: 3px;
      top:50%;
      transition:width 0.2s cubic-bezier(1, 0, 0.58, 0.97) 0s;
      background:$dev--color-color6
    }

    &:hover:before{

      width: 100%;
    }
  }
</style>
