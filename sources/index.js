import {Theatre} from 'core/theatre.js';

var container = document.body.querySelector('.theatre-container');

new Theatre({
    'container': container,
    'expose': true,
    'sharp': true
});
