import * as memory from 'modules/memory';

export default function setBestScore() {
  const bestScoreSaved = memory.get('bestScore');
  if (bestScoreSaved !== undefined) {
    return bestScoreSaved;
  } return 0;
}
