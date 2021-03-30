export default function removeLastForce(entity) {
  const { parts } = entity.get('forces');
  if (parts.length > 1) {
    parts.pop();
  }
}
