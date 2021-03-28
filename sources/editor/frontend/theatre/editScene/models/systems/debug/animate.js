function animate(entities) {
  Object.entries(entities).forEach(([name, entity]) => {
    const spritesComponent = entity.get('sprites');

    Object.values(spritesComponent.parts).forEach((sprite) => {
      const spriteInfo = sprite.animation;
      try {
        const spritesDef = this.sprites[sprite.source]();
        const { frames } = spritesDef;
        const framerate = spriteInfo.framerate ? spriteInfo.framerate : spritesDef.framerate;

        if (frames.length > 1) {
          spriteInfo.elapsed += this.delta;

          const duration = 1000 / framerate;

          while (spriteInfo.elapsed >= duration) {
            spriteInfo.elapsed -= duration;
            spriteInfo.frame = (spriteInfo.frame === frames.length - 1) ? 0 : spriteInfo.frame + 1;
          }
        }
      } catch (err) {
      }
    });
  });
}

export { animate };
