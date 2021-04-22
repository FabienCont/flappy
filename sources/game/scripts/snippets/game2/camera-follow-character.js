export default function cameraFollowCharacter() {
  if (this.$variables.cache && this.$variables.cache.entity) {
    return this.$variables.cache.entity.get('position').x + 48;
  }
  if (this.$world && this.$world.entities) {
    const entitiesValues = Object.values(this.$world.entities);
    const character = entitiesValues.find((entity) => entity.name === 'ninja');
    if (this.$variables.cache && this.$variables.cache.entity) {
      this.$variables.cache.entity = character;
    }
    if (character) {
      return character.get('position').x + 48;
    }
  }
  return cameraFollowCharacter.bind(this);
}
