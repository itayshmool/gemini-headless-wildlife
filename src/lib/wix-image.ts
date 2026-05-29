export function wixImageToUrl(image: unknown): string | null {
  if (!image) return null;
  if (typeof image === 'string') {
    const match = image.match(/wix:image:\/\/v1\/([^/]+)/);
    return match ? `https://static.wixstatic.com/media/${match[1]}` : null;
  }
  if (typeof image === 'object' && image !== null && 'url' in image) {
    const url = (image as { url: unknown }).url;
    return typeof url === 'string' ? url : null;
  }
  return null;
}

export function productMainImage(product: any): string | null {
  return wixImageToUrl(product?.media?.main?.image)
      ?? (product?.media?.main?._id
            ? `https://static.wixstatic.com/media/${product.media.main._id}`
            : null);
}
