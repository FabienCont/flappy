function move(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const positionComponent = entity.get('position');
        positionComponent.x+=1
    });
}

export {move};
