export default function (entity, collision,entityB) {
  this.$world.remove(entityB);
  let score=this.$world.entities.score.get('score');
  score.value=score.value+1;
  let bestScore=this.$world.entities.bestScore.get('score');
  if(score.value>bestScore.value){
      bestScore.value=score.value;
  }
};
