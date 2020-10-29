import {createComponentFromModel} from 'core/loadEntities.js';

function commands(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const {commands} = entity.get('commands');

        commands.forEach((command) => {

            switch (command) {

                case 'MOVE_TOP':

                let forces={
                      "name": "forces",
                      "scope":"common",
                      "params": {
                          "parts":[
                              {
                                  "x": 0,
                                  "y": -32,
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
                                  "handling": {
                                      "type": "snippets",
                                      "scope": "demo",
                                      "name": "forces-handling"
                                  }
                              }
                          ]
                      }
                    };
                    let newForces=createComponentFromModel.call(this,forces);

                    entity.add(newForces)

                break;
            }
        });

        entity.remove('commands');
    });
}

export {commands};
