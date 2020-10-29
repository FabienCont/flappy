import {createComponentFromModel} from 'core/loadEntities.js';

export default function(entity) {

    let forces = {
        "name": "forces",
        "scope": "common",
        "params": {
            "parts": [{
                "x": 0,
                "y": 1,
                "duration": 200,
                "easing": {
                    "type": "snippets",
                    "scope": "demo",
                    "name": "ease-in"
                },
                "elapsed": 0,
                "ending": null,
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
