import { generateEntities } from 'core/loadEntities';

function generateDecor(entities) {
  const birdEntity = Object.values(this.$world.entities).find((entity) => entity.name === 'character');
  const birdPosition = birdEntity.get('position');
  const maxPosBeyondBird = birdPosition.x + 128;
  const minPosition = birdPosition.x - 32;
  const entitiesName = [
    'top',
    'bottom',
    'water',
    'pipeTop',
    'pipeBottom',
    'cloud'];

  if (this.$variables.started) {
    entitiesName.push('checkpoint');
  }

  const decorEntities = {};
  for (let i = 0; i < entitiesName.length; i += 1) {
    const name = entitiesName[i];
    decorEntities[name] = {
      model: this.models.entities.demo[name], width: 64, distanceBetween: 64, maxPosition: minPosition, maxId: '', entities: [], defaultY: 0,
    };
  }

  decorEntities.cloud.width = 160;
  decorEntities.cloud.distanceBetween = 160;
  decorEntities.pipeTop.width = 8;
  decorEntities.pipeBottom.width = 8;
  decorEntities.bottom.width = 32;
  decorEntities.top.width = 32;

  Object.entries(entities).filter(([id, entity]) => {
    const entityName = entity.name;
    const isOut = (entity.get('position').x + decorEntities[entityName].width) < minPosition;
    if (isOut) {
      decorEntities[entityName].defaultY = entity.get('position').y;
      this.$world.remove(entity);
    } else {
      decorEntities[entityName].entities.push(entity);
      if (decorEntities[entityName].maxPosition < (entity.get('position').x)) {
        decorEntities[entityName].maxPosition = entity.get('position').x;
        decorEntities[entityName].maxId = id;
        decorEntities[entityName].defaultY = entity.get('position').y;
      }
    }
    return !isOut;
  });

  if (this.$variables.started && decorEntities.checkpoint.entities.length === 0) {
    const maxPosPipe = decorEntities.pipeTop.maxPosition;
    decorEntities.checkpoint.maxPosition = maxPosPipe;
  }

  const randomHeightDico = {};
  Object.entries(decorEntities).forEach(([name, entityInfo]) => {
    while (maxPosBeyondBird > entityInfo.maxPosition) {
      const newEntities = generateEntities.call(this, [entityInfo.model()]);
      let newEntity = newEntities[0];
      newEntity.get('position').y = entityInfo.defaultY;
      if (this.$variables.started && (name === 'pipeTop' || name === 'pipeBottom')) {
        const otherPipeName = name === 'pipeTop' ? 'pipeBottom' : 'pipeTop';
        const otherPipeInfo = decorEntities[otherPipeName];
        const randomHeight = Math.random() * (55 - 12) + 12;
        newEntity = randomizePipeInfo(newEntity, randomHeight, name);
        let newOtherPipe = generateEntities.call(this, [otherPipeInfo.model()])[0];
        newOtherPipe = randomizePipeInfo(newOtherPipe, randomHeight, otherPipeName);
        newOtherPipe.get('position').x = entityInfo.maxPosition + entityInfo.distanceBetween;
        this.$world.add(newOtherPipe);
        otherPipeInfo.maxPosition += entityInfo.distanceBetween;
        otherPipeInfo.maxId = newOtherPipe.id;
      }
      newEntity.get('position').x = entityInfo.maxPosition + entityInfo.distanceBetween;
      this.$world.add(newEntity);
      entityInfo.maxPosition = newEntity.get('position').x;
      entityInfo.maxId = newEntity.id;
    }
  });
}

const randomizePipeInfo = function (newEntity, height, pipeName) {
  const spaceHeight = 20;
  const frameY = 1;
  const newParts = [];
  let isLast = 0;

  let yDestOffset = 0;
  let spriteName = 'pipe_mid';
  let spriteEnd = 'pipe_bottom';
  let direction = -1;
  let pipeHeight = 96 - (height + spaceHeight);
  const hitbox = newEntity.get('hitbox');
  let heightSprite = 0;

  if (pipeName === 'pipeTop') {
    yDestOffset = -4;
    spriteEnd = 'pipe_top';
    direction = 1;
    pipeHeight = height;
  } else {
    hitbox.y = -pipeHeight + 12;

    const maxHeightShadow = 12;
    const minHeightShadow = 2;
    const heightPercent = 1 - ((height - 12) / 43);
    const heightShadow = heightPercent * ((maxHeightShadow - minHeightShadow) + minHeightShadow);

    if (heightShadow <= 4) {
      newParts[heightShadow] = {
        source: 'pipe_shadow_bottom',
        animation: {
          frame: 0,
          elapsed: 0,
          framerate: 8,
        },
        opacity: 1,
        destination: { x: 0, y: 8 + heightShadow, z: 0 },
        size: { width: 16, height: 12 },
      };
    } else {
      newParts[heightShadow] = {
        source: 'pipe_shadow_top',
        animation: {
          frame: 0,
          elapsed: 0,
          framerate: 8,
        },
        opacity: 1,
        destination: { x: 0, y: -2 + heightShadow, z: 0 },
        size: { width: 16, height: 12 },
      };

      newParts[heightShadow] = {
        source: 'pipe_shadow_bottom',
        animation: {
          frame: 0,
          elapsed: 0,
          framerate: 8,
        },
        opacity: 1,
        destination: { x: 0, y: 10 + heightShadow, z: 0 },
        size: { width: 16, height: 12 },
      };
    }
  }

  hitbox.height = pipeHeight + yDestOffset;

  while (heightSprite < pipeHeight) {
    let yDest = (heightSprite * direction) + yDestOffset;

    if (pipeHeight - heightSprite <= 16) {
      yDest -= ((16 - (pipeHeight - heightSprite)) * direction);
      spriteName = spriteEnd;
      isLast = 1;
    }
    newParts[frameY] = {
      source: spriteName,
      animation: {
        frame: 0,
        elapsed: 0,
        framerate: 8,
      },
      opacity: 1,
      destination: { x: 0, y: yDest, z: isLast },
      size: { width: 16, height: 16 },
    };
    heightSprite += 16;
  }

  let sprite = newEntity.get('sprites');
  if (!sprite)sprite = newEntity.get('images');
  sprite.parts = newParts;

  return newEntity;
};

export { generateDecor };
