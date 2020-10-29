import {collide} from 'modules/collide.js';
import {Rectangle} from 'modules/shape.js';

function hitbox(entities) {

    const resolvers = [];

    Object.entries(entities).forEach(([nameA, entityA]) => {
      if(nameA==='character'){

        const hitboxComponentA = entityA.get('hitbox');
        const positionComponentA = entityA.get('position');

        const A = new Rectangle(

            positionComponentA.x,
            positionComponentA.y,
            hitboxComponentA.width,
            hitboxComponentA.height
        );

        Object.entries(entities).forEach(([nameB, entityB]) => {

            if (nameA === nameB) {

                return;
            }

            const hitboxComponentB = entityB.get('hitbox');
            const positionComponentB = entityB.get('position');

                const B = new Rectangle(

                    positionComponentB.x,
                    positionComponentB.y,
                    hitboxComponentB.width,
                    hitboxComponentB.height
                );

                if (collide(A, B) === true) {

                      this.load('demo');
                }

        });

      };
    });

    resolvers.forEach((resolver) => {

        resolver();
    });
}

export {hitbox};
