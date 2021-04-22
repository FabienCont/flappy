const findDirection = function (from) {
  const entry = Object.entries(from).find(([key, value]) => value === true);
  if (entry) {
    return entry[0];
  } // debugger;
};

const collisionsSorter = function ([collisionA, colliderA], [collisionB, colliderB]) {
  let nbDirectionA = 0;
  let minA = Infinity;

  let nbDirectionB = 0;
  let minB = Infinity;
  Object.values(collisionA.delta).map((values, i) => {
    if (values > 0) {
      nbDirectionA += 1;
      if (values < minA) {
        minA = values;
      }
    }
  });
  Object.values(collisionB.delta).map((values, i) => {
    if (values > 0) {
      nbDirectionB += 1;
      if (values < minB) {
        minB = values;
      }
    }
  });
  if (minA < minB || (minA === minB && nbDirectionA < nbDirectionB)) {
    return -1;
  } if (minB < minA || (minA === minB && nbDirectionB < nbDirectionA)) {
    return 1;
  }
  return 0;
};

export default function (entity, collides) {
  const delta = {
    bottom: 0, top: 0, left: 0, right: 0,
  };

  collides.sort(collisionsSorter).forEach(([collision, entityB], i) => {
    const { from } = collision;
    const direction = findDirection(from);
    if (direction === 'bottom' && collision.delta.bottom > 0 && delta.bottom < collision.delta.bottom) {
      delta.bottom += collision.delta.bottom - delta.bottom;
    } else if (direction === 'top' && collision.delta.top > 0 && delta.top < collision.delta.top) {
      delta.top += collision.delta.top - delta.top;
    } else if (direction === 'left' && collision.delta.left > 0 && delta.left < collision.delta.left) {
      delta.left += collision.delta.left - delta.left;
    } else if (direction === 'right' && collision.delta.right > 0 && delta.right < collision.delta.right) {
      delta.right += collision.delta.right - delta.right;
    }
  });

  if (delta.bottom) {
    const states = entity.get('states');
    if (states && states.values && states.values.grounded) {
      states.values.grounded = 'true';
    }
    entity.get('position').y -= delta.bottom;
  }
  if (delta.top) {
    entity.get('position').y += delta.top;
  }
  if (delta.left) {
    entity.get('position').x += delta.left;
  }
  if (delta.right) {
    entity.get('position').x -= delta.right;
  }
}
