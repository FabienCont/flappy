import {createComponentFromModel} from 'core/loadEntities.js';
import {generateEntities} from 'core/loadEntities.js';

export default function (entity, collision) {

    let newEntities=generateEntities.call(this,[this.models.entities.demo.splashEnd()]);

    this.$world.add(newEntities);

    entity.remove('inputs');
    entity.remove('hitbox');
    entity.remove('forces');

    let timeout = {
        "name": "timeout",
        "scope": "common",
        "params": {
            "duration": 2000,
            "elapsed": 0,
            "ending": {
                "type": "snippets",
                "scope": "demo",
                "name": "timeout-ending"
            }
        }
    };

    let forces={
      "name": "forces",
      "scope":"common",
      "params": {
          "parts":[
              {
                  "x": 0,
                  "y": -20,
                  "duration": 200,
                  "easing": {
                      "type": "snippets",
                      "scope": "demo",
                      "name": "ease-out"
                  },
                  "elapsed": 0,
                  "ending": {
                      "type": "snippets",
                      "scope": "demo",
                      "name": "forces-down"
                  },
                  "handling":null
              }
          ]
      }
    };

    let newForces=createComponentFromModel.call(this,forces);
    let newTimeout = createComponentFromModel.call(this, timeout);

    entity.add(newForces);
    entity.add(newTimeout);
};
