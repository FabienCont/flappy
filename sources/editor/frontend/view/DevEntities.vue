<template>
  <div class="dev-entities-container">
    Entities:
    <dev-button v-if="!addingEntity" @click="addEntity()">Add entity</dev-button>
    <div v-else>
      <dev-select @input="(val)=>addedEntity=allEntity[val]" :border="false" :default="entityKeys[0]" :options="entityKeys"></dev-select>
      <div class="flex">
        <dev-button @click="valid()">Valid</dev-button>
        <dev-button @click="cancel()">Cancel</dev-button>
      </div>
    </div>
    <div v-for="(entity , indexEntity)  in sceneEntities" :key="indexEntity">
      <div class="dev-entities">
        <dev-icon :width="svgSize" :height="svgSize" @click="toggleEntity(indexEntity)" :iconName="getIconType(indexEntity)"></dev-icon>
        {{entity.scope}}/{{entity.name}}
        <dev-icon :width="svgSize" :height="svgSize" @click="deleteEntity(indexEntity)" iconName="delete"></dev-icon>
      </div>
      <div v-if="indexEntity === entityFocus">
        <div class="dev-entities-inspect">
          <dev-entity-components @add-component="(param)=>addComponent(indexEntity,param)" @update-component-param="(param)=>updateComponentParam(indexEntity,param)"
          @delete-component="(param)=>deleteComponent(indexEntity,param)" :entity='entity' :componentsModel='componentModelList'
          :entitiesModel="entityModelList"></dev-entity-components>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevEntityComponents from "editor/frontend/view/DevEntityComponents.vue";
import {mapGetters} from "vuex";

export default {
  name:'DevEntities',
  components:{DevEntityComponents},
  data(){
    return {
      svgSize:"2rem",
      entityFocus:-1,
      addingEntity:false,
      addedEntity:null
    }
  },
  props:{
    sceneFiles:{type:Object},
    entitiesModel:{type:Object},
    componentsModel:{type:Object},
  },
  computed:{
    ...mapGetters({
      entityDico:"arborescence/entityDico",
    }),
    sceneEntities:function(){
      let sceneEntities=Object.entries(this.sceneFiles).find((entry)=> entry[1].name==='entities.json')
      if(sceneEntities)return this.sceneFiles[sceneEntities[0]].content;
      return []
    },
    componentModelList:function(){
      return Object.values(this.componentsModel).map((value)=>{return {scope:value.scope,...value.content}})
    },
    entityModelList:function(){
      return Object.values(this.entitiesModel).map((value)=>{return {scope:value.scope,...value.content}})
    },
    allEntity:function(){
      let allEntity={};
      Object.entries(this.entityDico).forEach(([scope,value]) => {
        Object.keys(value).forEach((filename)=>{
          allEntity[scope+'/'+filename]={scope:scope,file:filename};
        });
      });
      return allEntity;
    },
    entityKeys:function(){
      return Object.keys(this.allEntity);
    }
  },
  methods:{
    addComponent:function(indexEntity,component){
      this.$emit('add-entity-component',{index:indexEntity,component})
    },
    updateComponentParam:function(indexEntity,{component,path,val}){
      this.$emit('update-entity-component',{index:indexEntity,component,path,val});
    },
    deleteComponent:function(indexEntity,{name,scope}){
      this.$emit('delete-entity-component',{index:indexEntity,name,scope})
    },
    deleteEntity:function(indexEntity){
        this.$emit("delete-entity",{index:indexEntity})
    },
    addEntity:function(){
      this.addingEntity=true;
      this.addedEntity=this.entityKeys[0]
    },
    cancel:function(){
      this.addingEntity=false;
    },
    valid:function(val){
      let entityToAdd=this.addedEntity?this.addedEntity:this.allEntity[this.entityKeys[0]];
      this.$emit("add-entity",{name:entityToAdd.file.split('.')[0],scope:entityToAdd.scope,components:[]})
      this.addingEntity=false;
    },
    getIconType:function(index){
      if(this.entityFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    toggleEntity:function(index){
      if(this.entityFocus===index){
        this.entityFocus=-1;
      }else this.entityFocus=index;
    },
  }
}
</script>

<style lang="scss" scoped>
.dev-entities-container{
  margin-bottom: 1rem;
}

.dev-entities{
  display: flex;
  align-items: center;
}

.dev-entities-inspect{
  margin-left:1rem;
}

</style>
