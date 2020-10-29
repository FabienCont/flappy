function images(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const cameraComponent = entity.get('camera');
        const imagesComponent = entity.get('images');
        const originComponent = entity.get('origin');
        const positionComponent = entity.get('position');

        imagesComponent.parts.forEach((image) => {

            const {destination, framerate, frames, opacity} = image;

            let {source} = image;

            let [x, y, width, height] = frames[image.frame];

            if (typeof source === 'undefined') {

                source = this.assets.images.common['placeholder-8x1']();

                x = x % 8;
                y = y % 1;
                width = 1;
                height = 1;
            }

            cameraComponent.camera.add({

                'source': this.assets.images[source.scope][source.file](),
                'frame': {

                    'x': width * x,
                    'y': height * y,
                    'width': width,
                    'height': height
                },
                'destination': {

                    'x': Math.floor((positionComponent.x + destination[0]) * originComponent.reference.scale() + originComponent.reference.x()),
                    'y': Math.floor((positionComponent.y + destination[1]) * originComponent.reference.scale() + originComponent.reference.y()),
                    'z': Math.floor(positionComponent.z + destination[2] + originComponent.reference.z()),
                    'width': (destination[3] * originComponent.reference.scale()),
                    'height': (destination[4] * originComponent.reference.scale())
                },
                'opacity': cameraComponent.opacity * opacity
            });
        });
    });
}

export {images};
