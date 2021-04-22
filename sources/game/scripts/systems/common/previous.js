function previous(entities) {
  Object.entries(entities).forEach(([name, entity]) => {
    const position = entity.get('position');
    const hitbox = entity.get('hitbox');
    delete position.previous;
    delete hitbox.previous;
    position.previous = JSON.parse(JSON.stringify(position));
    hitbox.previous = JSON.parse(JSON.stringify(hitbox));
  });
}

export { previous };
