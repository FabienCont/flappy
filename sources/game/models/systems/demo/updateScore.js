import { createComponentFromModel } from 'core/loadEntities.js';

function updateScore(entities) {
  Object.entries(entities).forEach(([id, entity]) => {
    const { parts } = entity.get('images');
    let { score } = this.$variables;
    const isBestScore = (entity.name === 'bestScore');
    if (isBestScore) {
      score = this.$variables.bestScore;
    }
    let numberStr = '';
    parts.forEach((part, i) => {
      numberStr += findNumber(part);
    });

    if (parseInt(numberStr) != score) {
      const newParts = [];
      score = (score !== undefined && score !== null ? score : 0);
      const scoreStr = score.toString();
      for (let i = 0; i < scoreStr.length; i++) {
        const part = createNumberImagePart(parseInt(scoreStr[i]), i, scoreStr.length, isBestScore);
        newParts.push(part);
      }

      const images = {
        name: 'images',
        scope: 'common',
        params: {
          parts: newParts,
        },
      };

      const newImages = createComponentFromModel.call(this, images);
      entity.add(newImages);
    }
  });
}

const findNumber = function (part) {
  return part.frames[0][0].toString();
};

const createNumberImagePart = function (number, index, length, isBestScore) {
  const destinationX = ((index + 1) * 8) - (8 * length);
  const file = isBestScore ? 'numbers-blue-8x16@1x' : 'numbers-8x16@1x';
  return {
    source: {
      scope: 'demo',
      file,
    },
    frames: [
      [number, 0, 8, 16],
    ],
    frame: 0,
    destination: [destinationX, 0, 0, 8, 16],
  };
};

export { updateScore };
