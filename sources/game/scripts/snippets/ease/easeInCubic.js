import { easeIn, linear } from 'modules/ease';

export default function () {
  return (x) => {
    if (x > 1) {
      return linear(1)(x);
    }
    return easeIn(3)(x);
  };
}
