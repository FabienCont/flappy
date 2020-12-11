import * as memory from 'modules/memory.js';

export default function handleHitboxScore(entity, collision, entityB) {
  this.$world.remove(entityB);
  const score = this.$infos.scoreEntity.get('score');
  score.value += 1;
  const bestScore = this.$infos.bestScoreEntity.get('score');
  if (score.value > bestScore.value) {
    bestScore.value = score.value;
    memory.set('bestScore', bestScore.value);
  }
}
