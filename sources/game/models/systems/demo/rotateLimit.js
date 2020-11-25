function rotateLimit(entities) {
  Object.values(entities).forEach((entity) => {
    const rotate = entity.get('rotate');
    Object.keys(entities).forEach((key) => {
      /* const maxRotate = 70;
      if (Math.abs(rotate[key]) > maxRotate) {
        rotate[key] = Math.sign(rotate[key]) * maxRotate;
      } */
    });
  });
}

export { rotateLimit };
