function generateEntitiesModel() {
  const { entities } = this.params;
  const entitiesStr = JSON.stringify(entities);
  if (this.$variables.$debug.savedEntities !== entitiesStr && entitiesStr !== 'null') {
    Object.entries(entities).forEach(([entityPath, file]) => {
      if (!this.models.entities) this.models.entities = {};
      if (!this.models.entities[file.scope]) this.models.entities[file.scope] = {};
      const name = file.name.split('.')[0];
      if (!this.models.entities[file.scope][name]) this.models.entities[file.scope][name] = () => file.content;
    });
    this.$variables.$debug.savedEntities = entitiesStr;
  }
}

export { generateEntitiesModel };
