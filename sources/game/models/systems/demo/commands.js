import {createComponentFromModel} from 'core/loadEntities.js';

function commands(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const {commands} = entity.get('commands');

        commands.forEach((command) => {

            switch (command) {

                case 'MOVE_TOP':

                this.$infos.started=true;

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

                    let parts=entity.get('forces').parts;
                    if(parts.length>1){
                      parts.pop();
                    }
                    this.assets.sounds.demo.jump().play();
                    entity.get('forces').parts.push(newForces.parts[0]);

                break;
            }
        });

        entity.remove('commands');
    });
}

export {commands};
