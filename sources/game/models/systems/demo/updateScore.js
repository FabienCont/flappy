import {createComponentFromModel} from 'core/loadEntities.js';

function updateScore(entities) {

    Object.entries(entities).forEach(([name,entity])=>{
      let parts=entity.get('images').parts;
      let score=entity.get('score');
      let numberStr=""
      parts.forEach((part, i) => {
        numberStr+=findNumber(part);
      });

      if(parseInt(numberStr)!=score.value){
        let newParts=[];
        let scoreStr=score.value.toString();
        for (var i = 0; i < scoreStr.length; i++) {
          let part=createNumberImagePart(parseInt(scoreStr[i]),i,numberStr.length);
          newParts.push(part);
        }

        let images={
          "name":"images",
          "scope":"common",
          "params":{
            "parts":newParts
          }
        }

        let newImages = createComponentFromModel.call(this, images);
        entity.add(newImages);
      }

    });
}

const findNumber=function(part){
    return part.frames[0][0].toString();
}

const createNumberImagePart=function(number,index){

  let destinationX=(index*8)-4
  return {
    "source": {
      "scope":"demo",
      "file":"numbers-8x16@1x"
    },
    "frames": [
        [number, 0, 8, 16]
    ],
    "frame": 0,
    "destination": [destinationX, 0, 0, 8, 16]
  }
}

export {updateScore};
