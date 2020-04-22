import {loadEntities} from 'core/loadEntities';

function start() {

    console.log('start demo scene');
    var entities = loadEntities.call(this);
    this.$world.add(entities);
}

export {start};

    //TODO :load start.json

  /*  ??accèes start.json-> event qui envoie la reference this.$world
    start.json
    ??accèes entities->event  qui envoie this.$world.entities;
    character.json
    ??accèes model character.json->où est la ref?;
    ??accèes model images.json->où est la ref?;
    ??accèes aux sources images;
    ??accèes aux sources datasets;
    ??accèes nom de la scene courant et de toutes les scenes
    ??accèes files update.json render.json start.json destroy.json
    ??accèes liste des systems
    ??start.json -> modify dans la console -> write in disk file
    ??temp / history ??*/
