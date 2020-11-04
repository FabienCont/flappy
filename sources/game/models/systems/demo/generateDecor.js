import {generateEntities} from 'core/loadEntities.js';

function generateDecor(entities) {

    let birdPosition=this.$world.entities.character.get('position').x;
    let maxPosBeyondBird=birdPosition+128;
    let minPosition=birdPosition-32;
    let entitiesName=["top","bottom","background","water","pipeTop","pipeBottom","cloud"];

    if(this.$infos.started){
      entitiesName.push("checkpoint")
    }

    let decorEntities={};
    for (var i = 0; i < entitiesName.length; i++) {
      let name=entitiesName[i];
      decorEntities[name]={'model':this.models.entities.demo[name],'width':64,'maxPosition':minPosition,'maxId':0,'entities':[]}
    }

    decorEntities["cloud"].width=160;

    Object.entries(entities).filter(([name,entity])=>{

      let entityName=name.match(/^([a-zA-Z]+)/)[1];
      let isOut=(entity.get('position').x+decorEntities[entityName].width)<minPosition;
      if(isOut){
        this.$world.remove(entity);
      }else{
        let entityId=name.match(/^[a-zA-Z]+([0-9]+)/)[1];
        decorEntities[entityName].entities.push(entity);
        if(decorEntities[entityName].maxPosition<(entity.get('position').x+decorEntities[entityName].width)){
            decorEntities[entityName].maxPosition=entity.get('position').x+decorEntities[entityName].width;
            decorEntities[entityName].maxId=parseInt(entityId)+1;
        }
      }
      return !isOut;
    });


    if(this.$infos.started && decorEntities['checkpoint'].entities.length===0){
      let maxPosPipe=decorEntities['pipeTop'].maxPosition;
      decorEntities['checkpoint'].maxPosition=maxPosPipe;
    }

    var randomHeightDico={}
    Object.entries(decorEntities).forEach(([name,entityInfo])=>{
      while(maxPosBeyondBird>entityInfo.maxPosition){
          let newEntities=generateEntities.call(this,[entityInfo.model()]);
          let newEntity=newEntities[0]
          if(this.$infos.started && (name==="pipeTop"|| name==="pipeBottom")){
            if(!randomHeightDico[entityInfo.maxId]){
              randomHeightDico[entityInfo.maxId]=Math.random() * (55-12)+12;
            }
            newEntity=randomizePipeInfo(newEntity,randomHeightDico[entityInfo.maxId],name);
          }

          newEntity.name=newEntity.name+entityInfo.maxId;
          newEntity.get('position').x=entityInfo.maxPosition;
          this.$world.add(newEntity);

          entityInfo.maxPosition=entityInfo.maxPosition+entityInfo.width;
          entityInfo.maxId=entityInfo.maxId+1;
      }
    });
}


const randomizePipeInfo=function(newEntity,height,pipeName){

  let spaceHeight=20;
  let frameY=1;
  let newParts=[];
  let isLast=0;

  let yDestOffset=0;
  let frameEndY=0
  let direction=-1;
  let pipeHeight=96-(height+spaceHeight);
  let hitbox=newEntity.get('hitbox');
  let heightSprite=0;

  if(pipeName==='pipeTop'){
    yDestOffset=-4;
    frameEndY=2;
    direction=1;
    pipeHeight=height;
  }else {
    hitbox.y=-pipeHeight+16;

    let maxHeightShadow=16;
    let minHeightShadow=2;
    let heightPercent=1-((height-12)/43);
    let heightShadow=heightPercent*((maxHeightShadow-minHeightShadow)+minHeightShadow);

    if(heightShadow<=4){

        newParts.push({
          "source": {
            "scope":"demo",
            "file":"pipe-shadow-16x8@1x"
          },
          "frames": [
              [0, 1, 16, 16]
          ],
          "frame": 0,
          "opacity":1,
          "elapsed":0,
          "framerate":8,
          "destination": [0, 14+heightShadow, 0, 16, 16]
        })

    }else{

        newParts.push({
          "source": {
            "scope":"demo",
            "file":"pipe-shadow-16x8@1x"
          },
          "frames": [
              [0, 0, 16, 16]
          ],
          "frame": 0,
          "opacity":1,
          "elapsed":0,
          "framerate":8,
          "destination": [0, -2+heightShadow, 0, 16, 16]
        });

        newParts.push({
          "source": {
            "scope":"demo",
            "file":"pipe-shadow-16x8@1x"
          },
          "frames": [
              [0, 1, 16, 16]
          ],
          "frame": 0,
          "opacity":1,
          "elapsed":0,
          "framerate":8,
          "destination": [0, 10+heightShadow, 0, 16, 16]
        })
      }
  }

  hitbox.height=pipeHeight+yDestOffset;

  let parts=newEntity.get('images');
  while(heightSprite<pipeHeight){

    let yDest=(heightSprite*direction)+yDestOffset;

    if(pipeHeight-heightSprite<=16){
      yDest=yDest-((16-(pipeHeight-heightSprite))*direction);
      frameY=frameEndY;
      isLast=1;
    }
    newParts.push({
      "source": {
        "scope":"demo",
        "file":"pipe-16x16@1x"
      },
      "frames": [
          [0, frameY, 16, 16]
      ],
      "frame": 0,
      "opacity":1,
      "elapsed":0,
      "framerate":8,
      "destination": [0, yDest, isLast, 16, 16]
    })
    heightSprite=heightSprite+16;
  }

  newEntity.get('images').parts=newParts;

  return newEntity;

}

export {generateDecor};
