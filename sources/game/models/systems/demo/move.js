function move(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const positionComponent = entity.get('position');
        if(positionComponent.x >-200 &&positionComponent.x <0 ){
          positionComponent.x-=1
        }else{
            positionComponent.x+=1
        }
    });
}

export {move};
