import * as memory from 'modules/memory.js';

export default function handleHitboxScore(entity, collision, entityB) {
  this.$world.remove(entityB);
  this.$variables.score += 1;
  if (this.$variables.score > this.$variables.bestScore) {
    this.$variables.bestScore = this.$variables.score;
    memory.set('bestScore', this.$variables.bestScore);
  }
}
