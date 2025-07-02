/**
 * Утилиты для генерации уникальных артикулов и штрих-кодов для товаров
 */

// Генерация уникального артикула
export const generateUniqueArticle = (
  title: string,
  category: string,
): string => {
  // Получаем префикс категории
  const categoryPrefix = getCategoryPrefix(category);

  // Берем первые 3 буквы названия товара (только латинские и кириллические)
  const titlePrefix = title
    .replace(/[^a-zA-Zа-яА-Я]/g, "")
    .slice(0, 3)
    .toUpperCase();

  // Генерируем уникальную последовательность на основе времени и случайного числа
  const timestamp = Date.now().toString().slice(-6); // Последние 6 цифр timestamp
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // Проверяем на уникальность
  let counter = 0;
  let article = `${categoryPrefix}${titlePrefix}${timestamp}${randomNum}`;

  // Проверяем уникальность среди существующих товаров
  while (isArticleExists(article)) {
    counter++;
    const newRandomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    article = `${categoryPrefix}${titlePrefix}${timestamp}${newRandomNum}${counter}`;
  }

  return article;
};

// Генерация уникального штрих-кода (стандарт EAN-13)
export const generateUniqueBarcode = (): string => {
  // Российский префикс для штрих-кодов: 460-469
  const countryCode = "460";

  // Код производителя (4 цифры)
  const manufacturerCode = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  // Код товара (5 цифр)
  const productCode = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  // Объединяем код без контрольной цифры
  const baseCode = countryCode + manufacturerCode + productCode;

  // Вычисляем контрольную цифру
  const checkDigit = calculateEAN13CheckDigit(baseCode);

  let barcode = baseCode + checkDigit;

  // Проверяем на уникальность
  let counter = 0;
  while (isBarcodeExists(barcode)) {
    counter++;
    const newProductCode = (parseInt(productCode) + counter)
      .toString()
      .padStart(5, "0");
    const newBaseCode = countryCode + manufacturerCode + newProductCode;
    const newCheckDigit = calculateEAN13CheckDigit(newBaseCode);
    barcode = newBaseCode + newCheckDigit;
  }

  return barcode;
};

// Получение префикса категории для артикула
const getCategoryPrefix = (category: string): string => {
  const prefixes: Record<string, string> = {
    electronics: "EL",
    clothing: "CL",
    jewelery: "JW",
    books: "BK",
    home: "HM",
    sports: "SP",
    beauty: "BT",
    toys: "TY",
  };

  return prefixes[category] || "GN"; // GN = General (общее)
};

// Вычисление контрольной цифры для EAN-13
const calculateEAN13CheckDigit = (code: string): string => {
  let sum = 0;

  // Алгоритм EAN-13: умножаем каждую цифру на 1 или 3 попеременно
  for (let i = 0; i < code.length; i++) {
    const digit = parseInt(code[i]);
    const multiplier = i % 2 === 0 ? 1 : 3;
    sum += digit * multiplier;
  }

  // Контрольная цифра - это число, которое нужно прибавить к сумме, чтобы получить кратное 10
  const checkDigit = (10 - (sum % 10)) % 10;

  return checkDigit.toString();
};

// Проверка существования артикула
const isArticleExists = (article: string): boolean => {
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    return products.some((product: any) => product.article === article);
  } catch {
    return false;
  }
};

// Проверка существования штрих-кода
const isBarcodeExists = (barcode: string): boolean => {
  try {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    return products.some((product: any) => product.barcode === barcode);
  } catch {
    return false;
  }
};

// Валидация артикула
export const validateArticle = (article: string): boolean => {
  // Артикул должен быть не менее 8 символов и содержать только буквы и цифры
  const regex = /^[A-Za-zА-Яа-я0-9]{8,}$/;
  return regex.test(article);
};

// Валидация штрих-кода
export const validateBarcode = (barcode: string): boolean => {
  // Проверяем, что это 13-значный штрих-код
  if (!/^\d{13}$/.test(barcode)) {
    return false;
  }

  // Проверяем контрольную цифру
  const baseCode = barcode.slice(0, 12);
  const providedCheckDigit = barcode.slice(12);
  const calculatedCheckDigit = calculateEAN13CheckDigit(baseCode);

  return providedCheckDigit === calculatedCheckDigit;
};

// Форматирование штрих-кода для отображения
export const formatBarcode = (barcode: string): string => {
  if (barcode.length === 13) {
    // Форматируем как EAN-13: 1 234567 890123 4
    return `${barcode.slice(0, 1)} ${barcode.slice(1, 7)} ${barcode.slice(7, 12)} ${barcode.slice(12)}`;
  }
  return barcode;
};

// Генерация QR-кода для товара (возвращает URL для QR-кода)
export const generateProductQRCode = (
  article: string,
  title: string,
): string => {
  const productData = {
    article,
    title,
    url: `${window.location.origin}/product/${article}`,
    generated: new Date().toISOString(),
  };

  const qrData = encodeURIComponent(JSON.stringify(productData));

  // Используем бесплатный API для генерации QR-кода
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
};
