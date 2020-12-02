function commands(entities) {
  Object.values(entities).forEach((entity) => {
    const { commands } = entity.get('commands');

    commands.forEach((command) => {
      this.models.snippets[command.scope][command.name](entity);
    });

    entity.remove('commands');
  });
}

export { commands };
