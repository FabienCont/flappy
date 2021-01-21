<template>
  <div class="dev-preview-anim-container">
    <div class="dev-preview-anim-toolbar">
      <h3>{{type}}</h3>
    </div>
    <dev-input name='name' type="string" @update:inputValue="newVal=>name=newVal" :isEditable="false" :inputValue="name"></dev-input>
    <dev-input name='scope' type="string" @update:inputValue="newVal=>scope=newVal" :isEditable="false" :inputValue="scope"></dev-input>
    <div v-if="sprites!==''" class="dev-preview-anim-content">
      <div class="dev-preview-anim canvas-edit-anim"></div>
    </div>
    <div>
      <dev-button @click="addGrid()">Add Grid</dev-button>
      <div v-if="elementCopy.length===0">
        empty grid
      </div>
      <div v-else v-for="(grid , indexGrid)  in elementCopy" :key="indexGrid">
        <div @click="changeGridFocus(indexGrid)" class='dev-preview-anim-grid-name'>
          <dev-icon :iconName="getTypeIcon(indexGrid)"></dev-icon>
          <h4>grid {{indexGrid}} {'x':{{grid.x}},'y':{{grid.y}},'width':{{grid.width}},'height':{{grid.height}},'columns':{{grid.columns}},'rows':{{grid.rows}}}</h4>
          <dev-icon @click.prevent="deleteGrid(indexGrid)" iconName="delete"></dev-icon>
        </div>
        <div v-if='gridFocus===indexGrid'>
          <dev-primitive-inspect name="x" :isEditable="true" :primitiveToInspect="grid.x" @update:primitiveToInspect="newVal => grid.x = newVal"></dev-primitive-inspect>
          <dev-primitive-inspect name="y" :isEditable="true" :primitiveToInspect="grid.y" @update:primitiveToInspect="newVal => grid.y= newVal"></dev-primitive-inspect>
          <dev-primitive-inspect name="width" :isEditable="true" :primitiveToInspect="grid.width" @update:primitiveToInspect="newVal => grid.width= newVal"></dev-primitive-inspect>
          <dev-primitive-inspect name="height" :isEditable="true" :primitiveToInspect="grid.height" @update:primitiveToInspect="newVal => grid.height= newVal"></dev-primitive-inspect>
          <dev-primitive-inspect name="columns" :isEditable="true" :primitiveToInspect="grid.columns" @update:primitiveToInspect="newVal =>  grid.columns= newVal"></dev-primitive-inspect>
          <dev-primitive-inspect name="rows" :isEditable="true" :primitiveToInspect="grid.rows" @update:primitiveToInspect="newVal => grid.rows = newVal"></dev-primitive-inspect>
          Animations:
          <div>
            <dev-button @click="addAnimation(grid)">Add</dev-button>
            <dev-button @click="splitAll(grid)">Split by Images</dev-button>
            <dev-button @click="createAnimByRow(grid)">Animate by row</dev-button>
            <dev-button @click="createAnimByColumn(grid)">Animate by column</dev-button>
          </div>
          <div v-if="grid.animations.length===0">
          no animations
          </div>
          <div v-else v-for="(animation , indexAnim)  in grid.animations" :key="indexAnim">
            <h4>animation {{indexAnim}}</h4>
            <dev-primitive-inspect width="50" name="framerate" :isEditable="true" :primitiveToInspect="animation.framerate" @update:primitiveToInspect="newVal => animations.framerate= newVal"></dev-primitive-inspect>
            <dev-canvas-sprites v-if='animation.frames.length!==0' :animation="calculatedAnimations[indexGrid][indexAnim]" :image="image"></dev-canvas-sprites>
            frames :
            <dev-button @click="addFrame(grid,animation)">Add</dev-button>
            <div class="frame-preview" v-for="(frame , index)  in animation.frames" :key="index">
              {{index}}:
              <dev-primitive-inspect width="50" name="x" :isEditable="true" :primitiveToInspect="frame.x" @update:primitiveToInspect="newVal => frame.x = newVal"></dev-primitive-inspect>
              <dev-primitive-inspect width="50" name="y" :isEditable="true" :primitiveToInspect="frame.y" @update:primitiveToInspect="newVal => frame.y= newVal"></dev-primitive-inspect>
              <dev-primitive-inspect width="50" name="width" :isEditable="true" :primitiveToInspect="frame.width" @update:primitiveToInspect="newVal => frame.width= newVal"></dev-primitive-inspect>
              <dev-primitive-inspect width="50" name="height" :isEditable="true" :primitiveToInspect="frame.height" @update:primitiveToInspect="newVal => frame.height= newVal"></dev-primitive-inspect>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isElementModify">
      <dev-button @click="saveElement()">Save</dev-button>
      <dev-button @click="copyElement()">Cancel</dev-button>
    </div>
    <div v-else>
      <dev-button @click="editImages()">Back To Image</dev-button>
      <dev-button v-if="elementCopy.length!==0" @click="deleteElement()">Delete</dev-button>
    </div>
  </div>
</template>

<script>
import Theatre from 'core/theatre';
import {callAssetsApi} from "debug/utils/assetsApi";
import DevCanvasSprites from "debug/view/DevCanvasSprites.vue";

export default {
  name: 'DevAnimationsPreview',
  data(){
    return {
      base64:'data:image/png;base64,',
      svgSize:"1.7em",
      elementCopy:this.element!==""?JSON.parse(this.element):[],
      gridFocus:0
    }
  },
  components:{
    DevCanvasSprites
  },
  watch:{
    element:function(val){
      this.copyElement();
    }
  },
  mounted(){
      let container =  this.$el.querySelector('.canvas-edit-anim');
      let canvasEditAnim = new Theatre({
        container,
        expose: false,
        sharp: true,
        scenarioCtx: require.context('debug/theatre/editAnimations/scenes/', true, /^\.\/scenario\.json$/, 'sync'),
        hooksCtx:require.context('debug/theatre/editAnimations/scenes/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync'),
        assetsCtx:{},
        modelsCtx:require.context('debug/theatre/editAnimations/models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy'),
        loadingTime:0,
        params:{
          sprite:this.image,
          grids:this.elementCopy
        }
      });
  },
  props: {
    sprites:String,
    element:String,
    name:String,
    scope:String,
    type:String,
  },
  watch:{
    element:function(){
      this.elementCopy=this.element;
    },
  },
  computed:{
    calculatedAnimations:function(){
      console.log('trigger')
      let calculatedAnimations=[]
      this.elementCopy.forEach((grid, i) => {
        let gridArray=[]
        grid.animations.forEach((animation, i) => {
          let calcAnim={
            frames:animation.frames.map(frame=>[frame.x,frame.y,frame.width,frame.height]),
            framerate:animation.framerate,
            width:grid.width,
            height:grid.height
          }
          gridArray.push(calcAnim)
        });
        calculatedAnimations.push(gridArray);
      });
      return calculatedAnimations;
    },
    src:function(){
      if(this.sprites){
        return (this.sprites!=='' && !this.sprites.startsWith(this.base64))?this.base64+this.sprites:this.sprites;
      }
    },
    image:function(){
      if(this.sprites){
        let imageBase64=(this.sprites!=='' && !this.sprites.startsWith(this.base64))?this.base64+this.sprites:this.sprites;
        let image= new Image(imageBase64);
        image.src=imageBase64;
        return image;
      }else return null;
    },
    isElementModify:function(){
      return this.element!==this.elementCopy && this.elementCopy.length!==0;
    }
  },
  methods:{
    deleteGrid:function(index){
      this.elementCopy.splice(index, 1);
      if(this.gridFocus===index){
        this.gridFocus=-1;
      }else if(this.gridFocus>0 && this.gridFocus>index){
        this.gridFocus=-1;
      }
    },
    addFrame:function(grid,animation){
      let frame ={
          "x":0,
          "y":0,
          "width":grid.width,
          "height":grid.height
      }
      animation.frames.push(frame);
    },
    addAnimation:function(grid){
      let animation ={
        "frames":[{
          "x":0,
          "y":0,
          "width":grid.width,
          "height":grid.height
        }],
        "framerate":8,
      }
      grid.animations.push(animation);
    },
    splitAll:function(grid){
      for(let c =0;c<grid.columns;c++){
        for(let r =0;r<grid.rows;r++){
          let animation ={
            "frames":[{
              "x":grid.x+grid.width*c,
              "y":grid.y+grid.height*r,
              "width":grid.width,
              "height":grid.height
            }],
            "framerate":8,
          }
          grid.animations.push(animation);
        }
      }
    },
    createAnimByRow:function(grid){
      for(let r =0;r<grid.rows;r++){
        let animation ={
          "frames":[],
          "framerate":8,
        }
        for(let c =0;c<grid.columns;c++){
          let frame ={
              "x":grid.x+grid.width*c,
              "y":grid.y+grid.height*r,
              "width":grid.width,
              "height":grid.height
            }
            animation.frames.push(frame);
        }
        grid.animations.push(animation);
      }
    },
    createAnimByColumn:function(grid){
      for(let c =0;c<grid.columns;c++){
        let animation ={
          "frames":[],
          "framerate":8,
        }
        for(let r =0;r<grid.rows;r++){
          let frame ={
              "x":grid.x+grid.width*c,
              "y":grid.y+grid.height*r,
              "width":grid.width,
              "height":grid.height
            }
            animation.frames.push(frame);
        }
        grid.animations.push(animation);
      }
    },
    changeGridFocus:function(index){
      if(this.gridFocus===index){
        this.gridFocus=-1;
      }else this.gridFocus=index;
    },
    getTypeIcon:function(index){
      if(this.gridFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    addGrid:function(){
      let grid={"x":0,"y":0,"columns":2,"rows":2,"width":this.image.naturalWidth/2,"height":this.image.naturalHeight/2,"animations":[]};
      this.$set(grid, 'animations', [])
      this.elementCopy.push(grid);
      this.gridFocus=this.elementCopy.length-1;
    },
    updateFile:function(file){
      if(this.nameCopy==='')this.nameCopy=file.name.split(".png")[0];
      var reader = new FileReader();
       reader.onload = (e)=> {
         this.elementCopy= e.target.result;
       }

      reader.readAsDataURL(file); // convert to base64 string
    },
    copyElement:function(){
      this.elementCopy = this.element!==""?JSON.parse(this.element):[]
    },
    saveElement:function(){
      this.$emit("save-model",{scope:this.scope,name:this.name,content:this.elementCopy});
    },
    deleteElement:function(){
      this.$emit("delete-model",{scope:this.scope,name:this.name,content:this.elementCopy});
    },
    editImages:function(){
      this.$emit("edit-images");
    },
  }
}
</script>

<style lang="scss">

@import 'debug/styles/_variables';

.frame-preview{
  display: flex;
}
.dev-preview-anim-container{
  border:1px solid  $dev--color-color0;
}

.dev-preview-anim-toolbar{
    display: flex;
    flex:1;
    align-items: center;
    border-bottom:1px solid $dev--color-color0;
}

.dev-preview-anim-right-toolbar{
    display: flex;
    flex:1;
    justify-content: flex-end;
    color: $dev--color-color-light;
}

.dev-preview-anim-toolbar-svg{
    margin-right: 1rem;
}

.dev-preview-anim-content{
  width:100%;
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
}

.dev-preview-anim{
  width: 100%;
  height: 300px;
  margin: 1rem;
  border:1px solid $dev--color-color0;
}

.dev-preview-anim-grid-name{
display: flex;
align-items: center;
}
</style>
