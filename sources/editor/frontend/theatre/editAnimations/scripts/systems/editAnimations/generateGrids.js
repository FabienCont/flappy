import { generateEntities } from 'core/loadEntities';

function generateGrids() {
  if (JSON.stringify(this.saveGrids) !== JSON.stringify(this.params.grids.content)) {
    Object.values(this.$world.entities).forEach((entity) => {
      if (entity.name === 'grid') this.$world.remove(entity);
    });

    const gridModel = this.models.entities.editAnimations.grid();
    this.params.grids.content.forEach((grid) => {
      const entity = generateEntities.call(this, [gridModel])[0];
      const newGrid = entity.get('grid');
      newGrid.x = grid.x;
      newGrid.y = grid.y;
      newGrid.width = grid.width;
      newGrid.height = grid.height;
      newGrid.columns = grid.columns;
      newGrid.rows = grid.rows;

      this.$world.add(entity);
    });

    this.saveGrids = JSON.parse(JSON.stringify(this.params.grids.content));
  }
}

export { generateGrids };
