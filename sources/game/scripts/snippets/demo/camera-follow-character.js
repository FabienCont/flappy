export default function cameraFollowCharacter() {
  if (this.$world && this.$world.entities) {
    const entitiesValues = Object.values(this.$world.entities);
    const character = entitiesValues.find((entity) => entity.name === 'character');
    if (character) {
      return character.get('position').x + 48;
    }
  }
  return cameraFollowCharacter.bind(this);
}
