import {generateEntities} from 'core/loadEntities.js';
import top from 'entities/demo/top';
import bottom from 'entities/demo/bottom';
import water from 'entities/demo/water';
import background from 'entities/demo/background';
import pipeTop from 'entities/demo/pipeTop';
import pipeBottom from 'entities/demo/pipeBottom';

function generateDecor(entities) {

    let countEntities=0;
    let maxId=0;
    let spaceBehindBird=(this.$camera.screen.x()-this.$camera.screen.width()/(this.$camera.screen.scale()*2));
    let maxPosBeyondBird=this.$camera.position.x()+(this.$camera.screen.x()+this.$camera.screen.width()/(this.$camera.screen.scale()*2));
    let minPosition=this.$camera.position.x()+spaceBehindBird;
    let maxPosition=minPosition;


    Object.entries(entities).filter(([name,entity])=>{
      let isOut=(entity.get('position').x+90)<minPosition;
      if(isOut)this.$world.remove(entity);
      return !isOut;
    });

    Object.entries(entities).forEach(([name, entity]) => {
      if(name.startsWith('bottom')){
        countEntities++;
        let idFloor=name.split('bottom')[1];
        idFloor=idFloor;
        if(idFloor>maxId){
          maxId=idFloor;
          maxPosition=entity.get('position').x+entity.get('hitbox').width;
        }
      }
    });

    top.scope="demo";
    bottom.scope="demo";
    water.scope="demo";
    background.scope="demo";
    pipeTop.scope="demo";
    pipeBottom.scope="demo";

    while(maxPosBeyondBird>maxPosition ){
      maxId++;
      let newEntities=generateEntities.call(this,[top,bottom,background,water,pipeTop,pipeBottom]);
      newEntities.map((newEntity)=>{
        newEntity.name=newEntity.name+maxId;
        newEntity.get('position').x=maxPosition;
        this.$world.add(newEntity);
      });
      maxPosition=maxPosition+64;
    }
}

export {generateDecor};
