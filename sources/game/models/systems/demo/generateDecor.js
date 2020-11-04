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


    Object.entries(decorEntities).forEach(([name,entityInfo])=>{
      while(maxPosBeyondBird>entityInfo.maxPosition){
        let newEntities=generateEntities.call(this,[entityInfo.model()]);
        newEntities.map((newEntity)=>{
          newEntity.name=newEntity.name+entityInfo.maxId;
          newEntity.get('position').x=entityInfo.maxPosition;
          this.$world.add(newEntity);
        });
        entityInfo.maxPosition=entityInfo.maxPosition+entityInfo.width;
        entityInfo.maxId=entityInfo.maxId+1;
      }
    });
}

export {generateDecor};
