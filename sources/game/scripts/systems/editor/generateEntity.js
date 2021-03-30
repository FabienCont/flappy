import { generateEntities } from 'core/loadEntities';

function generateEntity() {
  const { entity } = this.params;
  const stringEntity = JSON.stringify(entity.content);
  if (this.$variables.$debug.saveEntity !== stringEntity && stringEntity !== 'null') {
    Object.values(this.$world.entities).forEach((createdEntity) => {
      this.$world.remove(createdEntity);
    });

    const entityGetter = () => entity.content;
    this.models.entities = {};
    this.models.entities[entity.scope] = {};
    this.models.entities[entity.scope][entity.name.split('.')[0]] = entityGetter;
    try {
      const newEntity = generateEntities.call(this, [this.params.entity.content])[0];
      this.$world.add(newEntity);
    } catch (err) {
      console.log(err);
    }

    this.$variables.$debug.saveEntity = stringEntity;
  }
}

export { generateEntity };
