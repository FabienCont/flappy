import { createComponentFromModel } from 'core/loadEntities.js';

function updateScore(entities) {
  Object.entries(entities).forEach(([id, entity]) => {
    const { parts } = entity.get('sprites');
    let { score } = this.$variables;
    const isBestScore = (entity.name === 'bestScore');
    if (isBestScore) {
      score = this.$variables.bestScore;
    }
    
    
    const alias = isBestScore ? 'number-blue' : 'number';
    let numberStr = '';
    parts.forEach((part, i) => {
      numberStr += findNumber(part,alias);
    });

    if (parseInt(numberStr) != score) {
      const newParts = [];
      score = (score !== undefined && score !== null ? score : 0);
      const scoreStr = score.toString();
      for (let i = 0; i < scoreStr.length; i++) {
        const part = createNumberSpritePart(parseInt(scoreStr[i]), i, scoreStr.length, alias);
        newParts.push(part);
      }

      const sprites = {
        name: 'sprites',
        scope: 'common',
        params: {
          parts: newParts,
        },
      };

      const newSprites = createComponentFromModel.call(this, sprites);
      entity.add(newSprites);
    }
  });
}

const findNumber = function (part,alias) {
  return part.source.name.split(alias)[1];
};

const createNumberSpritePart = function (number, index, length, alias) {
  const destinationX = ((index + 1) * 8) - (8 * length);
  const name =alias+'_'+number;
  return {
    source: {
      name:name,
    },
    info:{
        destination: [destinationX, 0, 0, 8, 16]
    }
  };
};

export { updateScore };
