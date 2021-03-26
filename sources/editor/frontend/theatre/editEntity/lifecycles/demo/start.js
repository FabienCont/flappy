import { loadEntities } from 'core/loadEntities';
import { loadControllers } from 'core/loadControllers';
import { loadWorld } from 'core/loadWorld';
import { loadRenderers } from 'core/loadRenderers';
import { loadCameras } from 'core/loadCameras';
import { loadSystems } from 'core/loadSystems';

function start() {
  this.logger.log('start edit entity scene');

  this.$controllers = loadControllers.call(this);

  this.$world = loadWorld.call(this);
  this.$cameras = loadCameras.call(this);
  this.$renderers = loadRenderers.call(this);
  this.$systems = loadSystems.call(this);
  const entities = loadEntities.call(this);
  this.$world.add(entities);
  const getPositionFirstEntity = () => {
    const listEntity = Object.values(this.$world.entities);
    if (listEntity.length > 0) {
      const entity = listEntity[0];
      const position = entity.get('position');
      if (position) {
        return position;
      }
    }
    return { x: 0, y: 0, z: 0 };
  };
  this.$cameras.default.look(() => getPositionFirstEntity().x, () => getPositionFirstEntity().y, () => getPositionFirstEntity().z);
}

export { start };
