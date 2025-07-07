export const generateImage = async (
  prompt: string,
  width: number = 512,
  height: number = 512,
): Promise<string> => {
  // Заглушка для генерации изображения
  // В реальном проекте здесь был бы API вызов для генерации изображений
  return new Promise((resolve) => {
    setTimeout(() => {
      // Возвращаем placeholder изображение
      resolve(
        `https://via.placeholder.com/${width}x${height}/6366F1/FFFFFF?text=${encodeURIComponent(prompt.slice(0, 20))}`,
      );
    }, 2000);
  });
};
