<template lang="html">
  <div class="dev-sprites-grids-container">
    <dev-button @click="addGrid()">Add Grid</dev-button>
    <div v-if="gridsCopy.length===0">
      empty grid
    </div>
    <div v-for="(grid , indexGrid)  in gridsCopy" :key="indexGrid">
      <div class='dev-sprites-grid'>
        <dev-icon :width="svgSize" :height="svgSize" @click="changeGridFocus(indexGrid)" :iconName="getGridTypeIcon(indexGrid)"></dev-icon>
        <dev-input class="dev-sprites-grid-title" type="string" name="alias" :isEditable="true" :inputValue="grid.alias" @update:inputValue="newVal => gridsCopy[indexGrid].alias = newVal"></dev-input>
        <dev-icon :width="svgSize" :height="svgSize" @click.prevent="deleteGrid(indexGrid)" iconName="delete"></dev-icon>
      </div>
      <div v-if='gridFocus===indexGrid'>
        <div class="flex">
          <dev-input type="number" name="x" :isEditable="true" :inputValue="grid.x" @update:inputValue="newVal => gridsCopy[indexGrid].x = newVal"></dev-input>
          <dev-input type="number" name="y" :isEditable="true" :inputValue="grid.y" @update:inputValue="newVal => gridsCopy[indexGrid].y= newVal"></dev-input>
          <dev-input type="number" name="width" :isEditable="true" :inputValue="grid.width" @update:inputValue="newVal => gridsCopy[indexGrid].width= newVal"></dev-input>
          <dev-input type="number" name="height" :isEditable="true" :inputValue="grid.height" @update:inputValue="newVal => gridsCopy[indexGrid].height= newVal"></dev-input>
        </div>
        <div class="flex">
          <dev-input type="number" name="columns" :isEditable="true" :inputValue="grid.columns" @update:inputValue="newVal =>  gridsCopy[indexGrid].columns= newVal"></dev-input>
          <dev-input type="number" name="rows" :isEditable="true" :inputValue="grid.rows" @update:inputValue="newVal => gridsCopy[indexGrid].rows = newVal"></dev-input>
        </div>
        <h4>Sprites:</h4>
        <div class="flex" >
          <dev-button @click="addAnimation(grid)">Add</dev-button>
          <dev-button @click="splitAll(grid)">Split by Images</dev-button>
          <dev-button @click="createAnimByRow(grid)">Animate by row</dev-button>
          <dev-button @click="createAnimByColumn(grid)">Animate by column</dev-button>
          <dev-button @click="deleteSpritesInGrid(grid)">Delete All sprites</dev-button>
        </div>
        <div v-if="grid.animations.length===0">
        No sprites
        </div>
        <div v-for="(animation , indexAnim)  in grid.animations" :key="indexAnim">
          <div class="flex align-center">
            <dev-icon :width="svgSize" :height="svgSize" @click="changeSpriteFocus(indexAnim)" :iconName="getSpriteTypeIcon(indexAnim)"></dev-icon>
            <dev-input class="dev-sprite-title" type="string" name="alias" :isEditable="true" :inputValue="animation.alias" @update:inputValue="newVal => animation.alias = newVal"></dev-input>
          </div>
          <dev-canvas-sprites v-if='animation.frames.length!==0' :animation="calculatedAnimations[indexGrid][indexAnim]" :image="image"></dev-canvas-sprites>
          <div v-if='spriteFocus===indexAnim'>
            <dev-input style="margin-bottom:0.6rem;" v-if="animation.frames.length>1 " type="number" name="framerate" :isEditable="true" :inputValue="animation.framerate" @update:inputValue="newVal => animation.framerate= newVal"></dev-input>
            Frames :
            <dev-button @click="addFrame(grid,animation)">Add</dev-button>
            <div class="flex align-center" v-for="(frame , index)  in animation.frames" :key="index">
              <span class="sprite-frame-index">{{index}}</span>
              <dev-input type="number" name="x" :isEditable="true" :inputValue="frame.x" @update:inputValue="newVal => frame.x = newVal"></dev-input>
              <dev-input type="number" name="y" :isEditable="true" :inputValue="frame.y" @update:inputValue="newVal => frame.y= newVal"></dev-input>
              <dev-input type="number" name="width" :isEditable="true" :inputValue="frame.width" @update:inputValue="newVal => frame.width= newVal"></dev-input>
              <dev-input type="number" name="height" :isEditable="true" :inputValue="frame.height" @update:inputValue="newVal => frame.height= newVal"></dev-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {generateUUID} from "core/uuidv4";
import DevCanvasSprites from "editor/frontend/view/DevCanvasSprites.vue";
export default {
  name: 'DevSpritesGrid',
  components:{
    DevCanvasSprites
  },
  data(){
    return {
       base64:'data:image/png;base64,',
       svgSize:"2rem",
       nameCopy:"",
       scopeCopy:"",
       gridFocus:-1,
       spriteFocus:-1,
       gridsCopy:JSON.parse(JSON.stringify(this.grids)),
       gridAlias:""
    }
  },
  props: {
    grids:Array,
    image:HTMLImageElement,
    reset:Boolean
  },
  watch:{
    reset:function(val){
      if(val){
        this.gridsCopy=JSON.parse(JSON.stringify(this.grids));
        if(this.gridFocus>=this.gridsCopy.length){
          this.gridFocus=-1;
          this.spriteFocus=-1;
        }else if(this.spriteFocus>= this.gridsCopy[this.gridFocus].animations.length){
          this.spriteFocus=-1;
        }
        this.$emit('reset-done');
      }
    },
    gridsCopy:{
      deep:true,
      handler:function(val){
        this.$emit('update-sprite-file',val);
      }
    }
  },
  computed:{
    calculatedAnimations:function(){
      let calculatedAnimations=[]
      this.gridsCopy.forEach((grid, i) => {
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
  },
  methods:{
    deleteSpritesInGrid:function(grid){
      grid.animations.splice(0);
    },
    deleteGrid:function(index){
      this.gridsCopy.splice(index, 1);
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
    getMaxGridId:function(grid){
      let maxId=0;
      grid.animations.forEach((anim)=>{
        let aliasSplitted=anim.alias.split('_');
        if(aliasSplitted.length===2){
           if(!isNaN(aliasSplitted[1])){
             let num=parseInt(aliasSplitted[1], 10);
             if(num>maxId)maxId=num
           }
        }
      });
      return maxId;
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
        "alias":grid.alias+"_"+this.getMaxGridId(grid)
      }
      grid.animations.push(animation);
    },
    splitAll:function(grid){
      let maxId =this.getMaxGridId(grid)
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
            "alias":grid.alias+"_"+(maxId+r+(c*grid.rows))
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
          "alias":grid.alias+"_"+this.getMaxGridId(grid)
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
          "alias":grid.alias+"_"+this.getMaxGridId(grid)
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
        this.spriteFocus=-1;
      }else this.gridFocus=index;
    },
    changeSpriteFocus:function(index){
      if(this.spriteFocus===index){
        this.spriteFocus=-1;
      }else this.spriteFocus=index;
    },
    getGridTypeIcon:function(index){
      if(this.gridFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    getSpriteTypeIcon:function(index){
      if(this.spriteFocus!==index){
        return 'right';
      }else return 'bottom';
    },
    addGrid:function(){
      let grid={"x":0,"y":0,"columns":2,"rows":2,"width":this.image.naturalWidth/2,"height":this.image.naturalHeight/2,"animations":[]};
      this.$set(grid, 'animations', [])
      this.gridsCopy.push(grid);
      this.gridFocus=this.gridsCopy.length-1;
    },
  }
}
</script>

<style lang="css" scoped>

.dev-sprites-grids-container{
  margin-bottom: 1rem;
}

.dev-sprites-grid{
  display: flex;
  align-items: center;
}

.dev-sprites-grid-title{
  display: inline-block;
  margin:1rem;
}

.dev-sprite-title{
  display: inline-block;
  margin:1rem;
}

.sprite-frame-index{
  margin-right:0.7rem;
  margin-top: 1rem;
}


</style>
