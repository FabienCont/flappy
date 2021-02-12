export default function getDestination() {
  const image = this.assets.images.common.sprite();
  const { naturalWidth } = image;
  const { naturalHeight } = image;
  return [
    0, 0, 0, naturalWidth, naturalHeight,
  ];
}
