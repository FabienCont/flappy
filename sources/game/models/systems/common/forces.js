import * as Ease from 'modules/ease.js';

function forces(entities) {
  Object.entries(entities).forEach(([name, entity]) => {
    const forcesComponent = entity.get('forces');
    const positionComponent = entity.get('position');
    const rotateComponent = entity.get('rotate');

    const trashes = [];

    forcesComponent.parts.forEach((force) => {
      const unlimited = force.ending === false;
      const remaining = force.duration - force.elapsed;
      const delta = (unlimited === false && this.delta > remaining) ? remaining : this.delta;

      const progress = (force.elapsed + delta) / force.duration;

      const source = force.easing;
      const easing = (force.easing !== false ? this.models.snippets[source.scope][source.name]() : Ease.linear(1));

      const moved = {

        x: force.x * easing(progress),
        y: force.y * easing(progress),
        z: force.z * easing(progress),
        rotateX: force.rotateX * easing(progress),
        rotateY: force.rotateY * easing(progress),
        rotateZ: force.rotateZ * easing(progress),
      };

      positionComponent.x += moved.x - force.moved.x;
      positionComponent.y += moved.y - force.moved.y;
      positionComponent.z += moved.z - force.moved.z;
      if (rotateComponent) {
        rotateComponent.x += moved.rotateX - force.moved.rotateX;
        rotateComponent.y += moved.rotateY - force.moved.rotateY;
        rotateComponent.z += moved.rotateZ - force.moved.rotateZ;
      }
      force.moved = moved;

      force.elapsed += this.delta;
      if (force.handling !== false) {
        const source = force.handling;
        const handling = this.models.snippets[source.scope][source.name];

        const remove = () => {
          trashes.push(force);
        };

        handling(entity, force.moved.x, force.moved.y, force.moved.z, force.moved.rotateX, force.moved.rotateY, force.moved.rotateZ, force.elapsed, remove);
      }

      if (force.elapsed >= force.duration
            && force.ending !== false
            && trashes.indexOf(force) === -1) {
        const source = force.ending;
        const ending = this.models.snippets[source.scope][source.name];

        ending(entity, force.moved.x, force.moved.y, force.moved.z, force.moved.rotateX, force.moved.rotateY, force.moved.rotateZ, force.elapsed);
        trashes.push(force);
      }
    });

    forcesComponent.parts = forcesComponent.parts.filter((force) => trashes.indexOf(force) === -1);
  });
}

export { forces };
