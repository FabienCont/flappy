<template>
  <div class="dev-component-edit">
    <main-pane-container>
      <div class="dev-component-container">
        <h3>{{this.contentCopy.name}} :</h3>
        <dev-button @click.stop="addParam()">Add param</dev-button>
        <ul class="dev-component-list">
          <li v-for='([key,value] , indexParam)  in componentParams' :key="indexParam" class="dev-component-params">
            <dev-component-param-edit @rename-param="childRenameParam" @del-param="deleteParam" @update-value="childUpdateValue" :name="key" :value="value" >
            </dev-component-param-edit>
          </li>
        </ul>
      </div>
    </main-pane-container>
    <detail-pane-container>
      <h3>{{type}}</h3>
      <dev-input  name='name' type="string" @update:inputValue="newVal=>nameCopy=newVal" :isEditable="true" :inputValue="nameCopy"></dev-input>
      <dev-input v-show='scope!==null' name='scope' type="string" @update:inputValue="newVal=>scopeCopy=newVal" :isEditable="true" :inputValue="scopeCopy"></dev-input>
     <div class="flex" v-if="isElementModify">
       <dev-button class="dev-component-icon" @click="saveElement()">Save</dev-button>
       <dev-button class="dev-component-icon" @click="copyProps()">Cancel</dev-button>
     </div>
     <div v-else>
       <dev-button class="dev-component-icon" @click="deleteElement()">Delete</dev-button>
     </div>
    </detail-pane-container>
  </div>
</template>

<script>

import DetailPaneContainer from "editor/frontend/view/DetailPaneContainer.vue";
import MainPaneContainer from "editor/frontend/view/MainPaneContainer.vue";
import DevComponentParamEdit from "editor/frontend/view/DevComponentParamEdit.vue";

export default {
  name: 'dev-component-edit',
  components:{
    DetailPaneContainer,MainPaneContainer,'dev-component-param-edit':DevComponentParamEdit
  },
  data(){
    return {
       svgSize:"1.5rem",
       contentCopy:{
         name:'newComponent',
         params:{}
       },
       nameCopy:"",
       scopeCopy:"",
       editor:null
    }
  },
  props: {
    params:{
      path:String,
      content:Object,
    }
  },
  created(){
    this.copyProps();
  },
  watch:{
    params:function(){
      this.copyProps();
    },
    contentCopy:function(val){
      console.log(val)
    },
    nameCopy:function(val){
      if(this.contentCopy && this.contentCopy.name){
        this.contentCopy.name=val.split('.')[0];
      }
    }
  },
  computed:{
    componentParams:function(){
      if(this.contentCopy.params && this.contentCopy){
        return Object.entries(this.contentCopy.params);
      }else return []
    },
    paths:function(){
      return this.params.path.split('/');
    },
    type:function(){
      if(this.paths.length>2){
        return this.paths[1]
      }
      return null;
    },
    name:function(){
      if(this.paths.length===4){
        return this.paths[3];
      }
      else if(this.paths.length===3){
        return this.paths[2];
      }
      else if(this.paths.length===2){
        return this.paths[1];
      }
    },
    scope:function(){
      if(this.paths.length>3){
        return this.paths[2]
      }
      return null;
    },
    isElementModify:function(){
      return JSON.stringify(this.params.content)!==JSON.stringify(this.contentCopy) || this.scopeCopy!==this.scope || this.nameCopy!==this.name;
    }
  },
  methods:{
    findParamOrigin:function(path){
      let param=this.contentCopy.params;
      let parent=this.contentCopy.params;
      path.forEach((name, i) => {
        if(i !== path.length-1){
          if(param[name]['_type']==='array<object>'){
            param=param[name]['_object'];
          }else param=param[name];
          parent=param;
        }else{
          param=param[name];
        }
      });
      return {param,parent};
    },
    deleteParam:function(path){
      let {parent,param}=this.findParamOrigin(path);
      this.$delete(parent,path[path.length-1]);
    },
    childRenameParam:function({newKey,oldKey,path}){
      let {parent}=this.findParamOrigin(path);
      if(!parent[newKey]){
        let newParam=Object.assign(parent, {[newKey]: parent[oldKey] })
        this.$delete(parent,oldKey);
      }
    },
    childUpdateValue:function({key,value,path}){
      let {param}=this.findParamOrigin(path);
      this.$set(param,key, value);
    },
    addParam:function(){
      let newParam={'_type':'number','_default':0}
      if(!this.contentCopy.params['newParam'])
      this.contentCopy.params=Object.assign({}, this.contentCopy.params,{newParam});
    },
    copyProps:function(){
      this.nameCopy=this.name;
      this.scopeCopy=this.scope;
      this.contentCopy=JSON.parse(JSON.stringify(this.params.content));
    },
    updateFile:function(file){
      if(this.nameCopy==='')this.nameCopy=file.name.split(".")[0];
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.contentCopy= e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    saveElement:function(){
      if(this.isElementModify){
        this.$emit("save",{type:this.type,scope:this.scopeCopy,name:this.nameCopy,content:this.contentCopy});
      }
    },
    deleteElement:function(){
      this.$emit("delete-elem",{type:this.type,scope:this.scope,name:this.name});
    },
    editSprites:function(){
      this.$emit("edit-sprites",this.scopeCopy,this.nameCopy);
    },
  }
}
</script>

<style lang="scss">

@import "editor/frontend/styles/_variables";

.dev-component-edit{
  display: flex;
  flex:1;
  height: 100%;
  color:$dev--color-color-light;
}
.dev-component-container{
  padding-left: 1rem;
}
.dev-component-list{
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
}
.dev-component-params{
  display: flex;
}
.dev-component-params-value{
  display: flex;
  flex-direction: column;
}
</style>
