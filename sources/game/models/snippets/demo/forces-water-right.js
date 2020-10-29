import {createComponentFromModel} from 'core/loadEntities.js';

export default function(entity) {

    let forces = {
        "name": "forces",
        "scope": "common",
        "params": {
            "parts": [{
                "x": 1,
                "y": 0,
                "duration": 1000,
                "easing": {
                    "type": "snippets",
                    "scope": "demo",
                    "name": "ease-linear"
                },
                "elapsed": 0,
                "ending":  {
                    "type": "snippets",
                    "scope": "demo",
                    "name": "forces-water-left"
                },
                "handling": {
                    "type": "snippets",
                    "scope": "demo",
                    "name": "forces-handling"
                }
            }]
        }
    };

    let newForces = createComponentFromModel.call(this, forces);

    entity.add(newForces)

  };
