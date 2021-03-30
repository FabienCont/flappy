function debugCommands() {
  const { commands } = this.$variables.$debug;
  if (commands) {
    Object.entries(commands).forEach(([key, value]) => {
      this.scripts.snippets.editor[key](value);
    });
  }
}

export { debugCommands };
