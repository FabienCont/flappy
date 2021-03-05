function generateComponents() {
  const { components } = this.params;
  Object.entries(components).forEach(([componentPath, file]) => {
    if (!this.models.components) this.models.components = {};
    if (!this.models.components[file.scope]) this.models.components[file.scope] = {};
    const name = file.name.split('.')[0];
    if (!this.models.components[file.scope][name]) this.models.components[file.scope][name] = () => file.content;
  });
}

export { generateComponents };
