const MAX_IMAGE_DATA_URL_LENGTH = 320_000;
const VALID_IMAGE_DATA_URL_REGEX = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

export async function compressImageForWish(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WebP).');
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Không thể đọc tệp ảnh này. Vui lòng thử ảnh khác.'));
      image.src = objectUrl;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Trình duyệt không hỗ trợ xử lý ảnh.');
    }

    const dimensionSteps = [960, 760, 600, 480];
    const qualitySteps = [0.82, 0.7, 0.58, 0.45];

    for (const maxDim of dimensionSteps) {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const targetWidth = Math.max(1, Math.round(img.width * scale));
      const targetHeight = Math.max(1, Math.round(img.height * scale));

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      for (const quality of qualitySteps) {
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        if (
          dataUrl.length <= MAX_IMAGE_DATA_URL_LENGTH &&
          VALID_IMAGE_DATA_URL_REGEX.test(dataUrl)
        ) {
          return dataUrl;
        }
      }
    }

    throw new Error('Ảnh có dung lượng quá lớn sau khi nén. Vui lòng chọn ảnh nhẹ hơn.');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function isValidWishImageDataUrl(value: string): boolean {
  return (
    value.length >= 20 &&
    value.length <= 350_000 &&
    VALID_IMAGE_DATA_URL_REGEX.test(value)
  );
}
