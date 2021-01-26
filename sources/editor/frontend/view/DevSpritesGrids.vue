<template lang="html">
  <div>
    <dev-button @click="addGrid()">Add Grid</dev-button>
    <div v-if="gridsCopy.length===0">
      empty grid
    </div>
    <div v-else v-for="(grid , indexGrid)  in gridsCopy" :key="indexGrid">
      <div @click="changeGridFocus(indexGrid)" class='dev-preview-anim-grid-name'>
        <dev-icon :iconName="getTypeIcon(indexGrid)"></dev-icon>
        <h4>grid {{indexGrid}} {'x':{{grid.x}},'y':{{grid.y}},'width':{{grid.width}},'height':{{grid.height}},'columns':{{grid.columns}},'rows':{{grid.rows}}}</h4>
        <dev-icon @click.prevent="deleteGrid(indexGrid)" iconName="delete"></dev-icon>
      </div>
      <div v-if='gridFocus===indexGrid'>
        <dev-input type="number" name="x" :isEditable="true" :inputValue="grid.x" @update:inputValue="newVal => grid.x = newVal"></dev-input>
        <dev-input type="number" name="y" :isEditable="true" :inputValue="grid.y" @update:inputValue="newVal => grid.y= newVal"></dev-input>
        <dev-input type="number" name="width" :isEditable="true" :inputValue="grid.width" @update:inputValue="newVal => grid.width= newVal"></dev-input>
        <dev-input type="number" name="height" :isEditable="true" :inputValue="grid.height" @update:inputValue="newVal => grid.height= newVal"></dev-input>
        <dev-input type="number" name="columns" :isEditable="true" :inputValue="grid.columns" @update:inputValue="newVal =>  grid.columns= newVal"></dev-input>
        <dev-input type="number" name="rows" :isEditable="true" :inputValue="grid.rows" @update:inputValue="newVal => grid.rows = newVal"></dev-input>
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
          <dev-input type="number" width="50" name="framerate" :isEditable="true" :inputValue="animation.framerate" @update:inputValue="newVal => animations.framerate= newVal"></dev-input>
          <dev-canvas-sprites v-if='animation.frames.length!==0' :animation="calculatedAnimations[indexGrid][indexAnim]" :image="image"></dev-canvas-sprites>
          frames :
          <dev-button @click="addFrame(grid,animation)">Add</dev-button>
          <div class="frame-preview" v-for="(frame , index)  in animation.frames" :key="index">
            {{index}}:
            <dev-input type="number" width="50" name="x" :isEditable="true" :inputValue="frame.x" @update:inputValue="newVal => frame.x = newVal"></dev-input>
            <dev-input type="number" width="50" name="y" :isEditable="true" :inputValue="frame.y" @update:inputValue="newVal => frame.y= newVal"></dev-input>
            <dev-input type="number" width="50" name="width" :isEditable="true" :inputValue="frame.width" @update:inputValue="newVal => frame.width= newVal"></dev-input>
            <dev-input type="number" width="50" name="height" :isEditable="true" :inputValue="frame.height" @update:inputValue="newVal => frame.height= newVal"></dev-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevCanvasSprites from "editor/frontend/view/DevCanvasSprites.vue";
export default {
  name: 'DevSpritesGrid',
  components:{
    DevCanvasSprites
  },
  data(){
    return {
       base64:'data:image/png;base64,',
       nameCopy:"",
       scopeCopy:"",
       gridFocus:0,
       gridsCopy:this.grids
    }
  },
  props: {
    grids:Array,
    image:HTMLImageElement
  },
  methods:{
    getTypeIcon:function(index){
      if(this.gridFocus!==index){
        return 'right';
      }else return 'bottom';
    },
  },
  computed:{
    calculatedAnimations:function(){
      console.log('trigger')
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
  }
}
</script>

<style lang="css" scoped>
</style>
