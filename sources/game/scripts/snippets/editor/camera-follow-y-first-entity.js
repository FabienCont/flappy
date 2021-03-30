export default function cameraFollowYFirstEntity() {
  if (this.$world && this.$world.entities) {
    const entitiesValues = Object.values(this.$world.entities);
    if (entitiesValues.length > 0) {
      const firstEntity = entitiesValues[0];
      const pos = firstEntity.get('position');
      if (firstEntity && pos) {
        const { y } = pos;
        return y;
      }
    }
    return cameraFollowYFirstEntity.bind(this);
  }
}
