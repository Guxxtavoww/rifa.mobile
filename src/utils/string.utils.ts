import { deviceLanguage } from '@/constants';

export function limitCharacters(
  text: string,
  maxStringLength?: number
): string {
  const maxLength = maxStringLength ?? 13;

  return text.length > maxLength
    ? `${text.trim().substring(0, maxLength)}...`
    : text;
}

export function capitalize(text: string): string {
  const words = text.trim().split(' ');

  const mappedText = words.map((word) => {
    const [firstLetter, ...rest] = word;

    return firstLetter?.toLocaleUpperCase().concat(...rest);
  });

  return mappedText.join(' ');
}

export const isValidRegex = (
  text: string,
  regex?: RegExp | string
): boolean => {
  if (!regex) return true;

  return new RegExp(regex).test(text);
};

export const formatToCurrency = (value: number | string) => {
  const formater = new Intl.NumberFormat(deviceLanguage, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return formater.format(+value);
};
