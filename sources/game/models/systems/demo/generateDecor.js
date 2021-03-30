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
        const heightMax = 40;
        const randomHeight = Math.random() * (heightMax - 0) + 0;
        newEntity = randomizePipeInfo(newEntity, randomHeight, heightMax, name);
        let newOtherPipe = generateEntities.call(this, [otherPipeInfo.model()])[0];
        newOtherPipe = randomizePipeInfo(newOtherPipe, randomHeight, heightMax, otherPipeName);
        newOtherPipe.get('position').y = otherPipeInfo.defaultY;
        newOtherPipe.get('position').x = otherPipeInfo.maxPosition + otherPipeInfo.distanceBetween;
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

const randomizePipeInfo = function randomizePipeInfo(newEntity, height, heightMax, pipeName) {
  const newParts = [];
  const sizeShadowPipe = { size: { width: 16, height: 12 } };
  const sizePipe = { size: { width: 16, height: 16 } };
  const defaultValue = {
    animation: {
      frame: 0,
      elapsed: 0,
      framerate: 8,
    },
    opacity: 1,
  };

  let spriteEnd = 'pipe_top';
  let direction = 1;
  let pipeHeight = height;

  if (pipeName === 'pipeBottom') {
    spriteEnd = 'pipe_bottom';
    direction = -1;
    pipeHeight = heightMax - height;
    const maxHeightShadow = 12;
    const minHeightShadow = 0;
    const heightPercent = 1 - (height / heightMax);
    const heightShadow = heightPercent * ((maxHeightShadow - minHeightShadow) + minHeightShadow);
    if (heightShadow <= 2) {
      newParts[0] = {
        source: 'pipe_shadow_top',
        destination: { x: 0, y: 6 + heightShadow, z: 0 },
        ...sizeShadowPipe,
        ...defaultValue,
      };
    } else {
      newParts[0] = {
        source: 'pipe_shadow_bottom',
        destination: { x: 0, y: 6 + heightShadow, z: 0 },
        ...sizeShadowPipe,
        ...defaultValue,
      };

      newParts[1] = {
        source: 'pipe_shadow_top',
        destination: { x: 0, y: 18 + heightShadow, z: 0 },
        ...sizeShadowPipe,
        ...defaultValue,
      };
    }
  }

  const hitbox = newEntity.get('hitbox');
  hitbox.height = pipeHeight;
  hitbox.y = (pipeHeight / 2) * direction;
  let heightMidPart = 0;

  const offsetMinPosition = -5 * direction;
  const maxPosWithoutPipeMid = 4 * direction;

  if (pipeHeight > 9) {
    heightMidPart = (pipeHeight);
    newParts[2] = {
      source: 'pipe_mid',
      destination: { x: 0, y: offsetMinPosition + ((heightMidPart / 2) * direction), z: 0 },
      size: {
        width: 16,
        height: heightMidPart,
      },
      ...defaultValue,
    };
  }

  newParts[3] = {
    source: spriteEnd,
    destination: { x: 0, y: offsetMinPosition + (pipeHeight * direction), z: 10 },
    ...sizePipe,
    ...defaultValue,
  };

  let sprite = newEntity.get('sprites');
  if (!sprite)sprite = newEntity.get('images');
  sprite.parts = newParts;

  return newEntity;
};

export { generateDecor };
