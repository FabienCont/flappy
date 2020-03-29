import * as scenes from 'scenes/index.js';

import {Theatre} from 'core/theatre.js';

var context = require.context('assets/', true, /^\.\/.+\.[a-zA-Z0-9]+$/, 'sync');

const load = () => {

    let assets = [];

    context.keys().forEach((key) => {

        const [type, scope, name] = key.match(/(?!\.\/|\/)(.+?)(?=(?:\.[^\.\/]+$)|\/)/g);

        const asset = {

            'name': name,
            'scope': scope,
            'source': context(key),
            'type': type.substring(0, type.length - 1)
        };

        assets.push(asset);
    });

    return assets
}

new Theatre({

    'assets': load(),
    'container': document.body,
    'expose': true,
    'scenes': scenes,
    'sharp': true
});
