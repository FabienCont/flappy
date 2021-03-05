function debugCommands() {
  const { commands } = this.$variables.$debug;
  if (commands) {
    Object.entries(commands).forEach(([key, value]) => {
      this.models.snippets.debug[key](value);
    });
  }
}

export { debugCommands };
