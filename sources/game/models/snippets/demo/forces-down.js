import {createComponentFromModel} from 'core/loadEntities.js';

export default function(entity) {

    let forces = {
        "name": "forces",
        "scope": "common",
        "params": {
            "parts": [{
                "x": 0,
                "y": 8,
                "duration": 250,
                "easing": {
                    "type": "snippets",
                    "scope": "demo",
                    "name": "ease-in"
                },
                "elapsed": 0,
                "ending": null,
                "handling":null
            }]
        }
    };

    let newForces = createComponentFromModel.call(this, forces);

    entity.get('forces').parts.push(newForces.parts[0]);
  };
