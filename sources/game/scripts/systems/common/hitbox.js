import { collide } from 'modules/collide.js';
import { Rectangle } from 'modules/shape.js';

function hitbox(entities) {
  Object.entries(entities).forEach(([nameA, entityA]) => {
    const collides = {};

    const hitboxComponentA = entityA.get('hitbox');
    const positionComponentA = entityA.get('position');

    const collideableA = hitboxComponentA.collideable;

    const collideableTypesA = Object.keys(collideableA);
    if (collideableTypesA.length > 0) {
      Object.entries(entities).forEach(([nameB, entityB]) => {
        if (nameA === nameB) {
          return;
        }

        const hitboxComponentB = entityB.get('hitbox');
        const positionComponentB = entityB.get('position');

        if (collideableTypesA.indexOf(hitboxComponentB.type) !== -1) {
          const A = new Rectangle(

            positionComponentA.x + hitboxComponentA.x - hitboxComponentA.width / 2,
            positionComponentA.y + hitboxComponentA.y - hitboxComponentA.height / 2,
            hitboxComponentA.width,
            hitboxComponentA.height,
          );

          const B = new Rectangle(

            positionComponentB.x + hitboxComponentB.x - hitboxComponentB.width / 2,
            positionComponentB.y + hitboxComponentB.y - hitboxComponentB.height / 2,
            hitboxComponentB.width,
            hitboxComponentB.height,
          );

          if (collide(A, B) === true) {
            const penetration = {

              top: (A.y > B.y && A.y < B.y + B.height) ? B.height - (A.y - B.y) : 0,
              right: (A.x + A.width > B.x && A.x + A.width < B.x + B.width) ? A.x + A.width - B.x : 0,
              bottom: (A.y + A.height > B.y && A.y + A.height < B.y + B.height) ? A.y + A.height - B.y : 0,
              left: (A.x > B.x && A.x < B.x + B.width) ? B.width - (A.x - B.x) : 0,
            };

            const previousPositionComponentA = entityA.get('position').previous;
            const previousPositionComponentB = entityB.get('position').previous;

            const previousHitboxComponentA = entityA.get('hitbox').previous;
            const previousHitboxComponentB = entityB.get('hitbox').previous;

            const previousA = new Rectangle(

              previousPositionComponentA.x + previousHitboxComponentA.x - (previousHitboxComponentA.width / 2),
              previousPositionComponentA.y + previousHitboxComponentA.y - (previousHitboxComponentA.height / 2),
              previousHitboxComponentA.width,
              previousHitboxComponentA.height,
            );

            const previousB = new Rectangle(

              previousPositionComponentB.x + previousHitboxComponentB.x - (previousHitboxComponentB.width / 2),
              previousPositionComponentB.y + previousHitboxComponentB.y - (previousHitboxComponentB.height / 2),
              previousHitboxComponentB.width,
              previousHitboxComponentB.height,
            );

            const previousOverlapX = !((previousA.x + previousA.width - previousB.x).toFixed(3) <= 0 || (previousB.x + previousB.width - previousA.x).toFixed(3) <= 0);
            const previousOverlapY = !((previousA.y + previousA.height - previousB.y).toFixed(3) <= 0 || (previousB.y + previousB.height - previousA.y).toFixed(3) <= 0);

            const top = previousOverlapX === true && previousOverlapY === false && previousA.y > A.y;
            const right = previousOverlapY === true && previousOverlapX === false && previousA.x < A.x;
            const bottom = previousOverlapX === true && previousOverlapY === false && previousA.y < A.y;
            const left = previousOverlapY === true && previousOverlapX === false && previousA.x > A.x;

            const direction = {

              top,
              right,
              bottom,
              left,
            };

            if (previousOverlapX === false
                    && previousOverlapY === false) {
              let minValue = Infinity;
              let directionKey = '';

              if (penetration.top > 0) {
                directionKey = 'top';
                minValue = penetration.top;
              }
              if (penetration.right > 0 && penetration.right < minValue) {
                directionKey = 'right';
                minValue = penetration.right;
              }
              if (penetration.bottom > 0 && penetration.bottom < minValue) {
                directionKey = 'bottom';
                minValue = penetration.bottom;
              }
              if (penetration.left > 0 && penetration.left < minValue) {
                directionKey = 'left';
                minValue = penetration.left;
              }
              if (directionKey !== '') {
                direction[directionKey] = true;
              }
            }

            const collision = {

              delta: penetration,
              from: direction,
            };

            if (!collides[hitboxComponentB.type])collides[hitboxComponentB.type] = [];
            collides[hitboxComponentB.type].push([collision, entityB]);
          }
        }
      });
      collideableTypesA.forEach((key) => {
        if (collides[key] && collideableA[key].collide) {
          const { scope, name } = collideableA[key].collide;
          this.scripts.snippets[scope][name].call(this, entityA, collides[key]);
        } else if (collideableA[key].dodge) {
          const { scope, name } = collideableA[key].dodge;
          this.scripts.snippets[scope][name].call(this, entityA);
        }
      });
    }
  });
}

export { hitbox };
