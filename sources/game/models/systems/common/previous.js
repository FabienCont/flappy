function previous(entities) {

    Object.entries(entities).forEach(([name, entity]) => {
        let position=entity.get('position');
        delete position.previous;
        let hitbox=entity.get('hitbox');
        delete hitbox.previous;
        position.previous=position;
        hitbox.previous=hitbox;
    });
}

export {previous};
