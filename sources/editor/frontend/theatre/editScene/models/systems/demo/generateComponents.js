function generateComponents() {
  const { components } = this.params;
  const componentsStr = JSON.stringify(components);
  if (this.savedComponents !== componentsStr && componentsStr !== 'null') {
    Object.entries(components).forEach(([componentPath, file]) => {
      if (!this.models.components) this.models.components = {};
      if (!this.models.components[file.scope]) this.models.components[file.scope] = {};
      const name = file.name.split('.')[0];
      if (!this.models.components[file.scope][name]) this.models.components[file.scope][name] = () => file.content;
    });
    this.savedComponents = componentsStr;
  }
}

export { generateComponents };
