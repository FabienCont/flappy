import { generateEntities } from 'core/loadEntities';

function generateDecor(entities) {
  const birdPosition = this.$infos.birdEntity.get('position');
  const maxPosBeyondBird = birdPosition.x + 128;
  const minPosition = birdPosition.x - 32;
  const entitiesName = ['top', 'bottom', 'background', 'water', 'pipeTop', 'pipeBottom', 'cloud'];

  if (this.$infos.started) {
    entitiesName.push('checkpoint');
  }

  const decorEntities = {};
  for (let i = 0; i < entitiesName.length; i += 1) {
    const name = entitiesName[i];
    decorEntities[name] = {
      model: this.models.entities.demo[name], width: 64, maxPosition: minPosition, maxId: '', entities: [],
    };
  }

  decorEntities.cloud.width = 160;

  Object.entries(entities).filter(([id, entity]) => {
    const entityName = entity.name;
    const isOut = (entity.get('position').x + decorEntities[entityName].width) < minPosition;
    if (isOut) {
      this.$world.remove(entity);
    } else {
      decorEntities[entityName].entities.push(entity);
      if (decorEntities[entityName].maxPosition < (entity.get('position').x + decorEntities[entityName].width)) {
        decorEntities[entityName].maxPosition = entity.get('position').x + decorEntities[entityName].width;
        decorEntities[entityName].maxId = id;
      }
    }
    return !isOut;
  });

  if (this.$infos.started && decorEntities.checkpoint.entities.length === 0) {
    const maxPosPipe = decorEntities.pipeTop.maxPosition;
    decorEntities.checkpoint.maxPosition = maxPosPipe;
  }

  const randomHeightDico = {};
  Object.entries(decorEntities).forEach(([name, entityInfo]) => {
    while (maxPosBeyondBird > entityInfo.maxPosition) {
      const newEntities = generateEntities.call(this, [entityInfo.model()]);
      let newEntity = newEntities[0];
      if (this.$infos.started && (name === 'pipeTop' || name === 'pipeBottom')) {
        const otherPipeName = name === 'pipeTop' ? 'pipeBottom' : 'pipeTop';
        const otherPipeInfo = decorEntities[otherPipeName];
        const randomHeight = Math.random() * (55 - 12) + 12;
        newEntity = randomizePipeInfo(newEntity, randomHeight, name);
        let newOtherPipe = generateEntities.call(this, [otherPipeInfo.model()])[0];
        newOtherPipe = randomizePipeInfo(newOtherPipe, randomHeight, otherPipeName);
        newOtherPipe.get('position').x = entityInfo.maxPosition;
        this.$world.add(newOtherPipe);
        otherPipeInfo.maxPosition += otherPipeInfo.width;
        otherPipeInfo.maxId = newOtherPipe.id;
      }
      newEntity.get('position').x = entityInfo.maxPosition;
      this.$world.add(newEntity);
      entityInfo.maxPosition += entityInfo.width;
      entityInfo.maxId = newEntity.id;
    }
  });
}

const randomizePipeInfo = function (newEntity, height, pipeName) {
  const spaceHeight = 20;
  let frameY = 1;
  const newParts = [];
  let isLast = 0;

  let yDestOffset = 0;
  let frameEndY = 0;
  let direction = -1;
  let pipeHeight = 96 - (height + spaceHeight);
  const hitbox = newEntity.get('hitbox');
  let heightSprite = 0;

  if (pipeName === 'pipeTop') {
    yDestOffset = -4;
    frameEndY = 2;
    direction = 1;
    pipeHeight = height;
  } else {
    hitbox.y = -pipeHeight + 12;

    const maxHeightShadow = 12;
    const minHeightShadow = 2;
    const heightPercent = 1 - ((height - 12) / 43);
    const heightShadow = heightPercent * ((maxHeightShadow - minHeightShadow) + minHeightShadow);

    if (heightShadow <= 4) {
      newParts.push({
        source: {
          scope: 'demo',
          file: 'pipe-shadow-16x8@1x',
        },
        frames: [
          [0, 1, 16, 12],
        ],
        frame: 0,
        opacity: 1,
        elapsed: 0,
        framerate: 8,
        destination: [0, 8 + heightShadow, 0, 16, 12],
      });
    } else {
      newParts.push({
        source: {
          scope: 'demo',
          file: 'pipe-shadow-16x8@1x',
        },
        frames: [
          [0, 0, 16, 12],
        ],
        frame: 0,
        opacity: 1,
        elapsed: 0,
        framerate: 8,
        destination: [0, -2 + heightShadow, 0, 16, 12],
      });

      newParts.push({
        source: {
          scope: 'demo',
          file: 'pipe-shadow-16x8@1x',
        },
        frames: [
          [0, 1, 16, 12],
        ],
        frame: 0,
        opacity: 1,
        elapsed: 0,
        framerate: 8,
        destination: [0, 10 + heightShadow, 0, 16, 12],
      });
    }
  }

  hitbox.height = pipeHeight + yDestOffset;

  const parts = newEntity.get('images');
  while (heightSprite < pipeHeight) {
    let yDest = (heightSprite * direction) + yDestOffset;

    if (pipeHeight - heightSprite <= 16) {
      yDest -= ((16 - (pipeHeight - heightSprite)) * direction);
      frameY = frameEndY;
      isLast = 1;
    }
    newParts.push({
      source: {
        scope: 'demo',
        file: 'pipe-16x16@1x',
      },
      frames: [
        [0, frameY, 16, 16],
      ],
      frame: 0,
      opacity: 1,
      elapsed: 0,
      framerate: 8,
      destination: [0, yDest, isLast, 16, 16],
    });
    heightSprite += 16;
  }

  newEntity.get('images').parts = newParts;

  return newEntity;
};

export { generateDecor };
