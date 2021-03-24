<template>
  <div class="dev-systems-container">
    Systems:
    <dev-button v-if="!addingSystem" @click="addSystem()">Add system</dev-button>
    <div v-else>
      <dev-select @input="(val)=>addedSystem=systemList[val]" :border="false" :default="Object.keys(systemList)[0]" :options="Object.keys(systemList)"></dev-select>
      <div class="flex">
        <dev-button @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="(system , index)  in sceneSystems" :key="index">
      <div class="flex align-center">
        {{system.scope}}/{{system.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteSystem(index)" iconName="delete"></dev-icon>
        <dev-icon v-if="index!==0" :width="svgSize" :height="svgSize" @click="moveTop(index)" iconName="top"></dev-icon>
        <dev-icon v-if="index!==sceneSystems.length-1" :width="svgSize" :height="svgSize" @click="moveBottom(index)" iconName="bottom"></dev-icon>
        <dev-icon :width="svgSize" :height="svgSize" @click="openFile(index)" iconName="search"></dev-icon>
      </div>
      <div class="dev-systems-compo">
        <div>
          <span>[</span>
          <span v-for="(compo,indexCompo) in system.components" :key='indexCompo'>
            <span class="dev-systems-compo-name" @click="removeComponent(index,indexCompo)">{{compo}}</span>
            <span v-if="indexCompo!==system.components.length-1">,</span>
          </span>
          <span>]</span>
        </div>
        <dev-icon v-if="!addingComponent || systemFocus!==index" :width="miniSvgSize" :height="svgSize" @click="addComponent(index)" iconName="add"></dev-icon>
      </div>
      <div v-if="addingComponent && systemFocus===index">
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
  name:"DevSystems",
  data(){
    return {
      svgSize:"2rem",
      miniSvgSize:"1.2rem",
      systemFocus:-1,
      addedSystem:null,
      addingSystem:false,
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
      let system=this.sceneSystems[index];
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
    addSystem:function(){
      this.addedSystem=Object.values(this.systemList)[0]
      this.addingSystem=true;
    },
    cancel:function(){
      this.addedSystem=null;
      this.addingSystem=false;
    },
    valid:function(){
      let sytem=this.addedSystem;
      sytem.components=[]
      this.$emit("add",sytem)
      this.cancel();
    },
    removeComponent:function(index,indexCompo){
      let system=JSON.parse(JSON.stringify(this.sceneSystems[index]));
      system.components.splice(indexCompo,1)
      this.$emit("update",{index,system})
      this.cancelComponent();
    },
    addComponent:function(index){
      this.systemFocus=index;
      this.addedComponent=Object.keys(this.componentNameDico)[0]
      this.addingComponent=true;
    },
    cancelComponent:function(){
      this.addedComponent=null;
      this.addingComponent=false;
      this.systemFocus=-1;
    },
    validComponent:function(index){
      let system=JSON.parse(JSON.stringify(this.sceneSystems[index]));
      system.components.push(this.addedComponent)
      this.$emit("update",{index,system})
      this.cancelComponent();
    },
    deleteSystem:function(index){
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
            if(this.sceneSystems[this.systemFocus] && this.sceneSystems[this.systemFocus].components.indexOf(name)===-1){
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
    sceneSystems:function(){
      let sceneSystems=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='systems.json')
      if(sceneSystems)return this.sceneFiles[sceneSystems[0]].content;
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

@import "editor/frontend/styles/_variables";

  .dev-systems-compo{
    margin-left: 1rem;
    display: flex;
  }

  .dev-systems-compo-name{

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
